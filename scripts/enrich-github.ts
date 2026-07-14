import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
} from "fs";
import { join } from "path";
import { execSync } from "child_process";
import { classifyPricing } from "../lib/pricing";

const ROOT = join(import.meta.dirname, "..");
const TOOLS_PATH = join(ROOT, "data/tools.json");
const PENDING_PATH = join(ROOT, "data/pending.json");
const CACHE_DIR = join(ROOT, "data/.cache");
const CACHE_PATH = join(CACHE_DIR, "github.json");

type Tool = {
  id: string;
  name: string;
  repo: string;
  url: string;
  description: { ru: string; en: string };
  categories: string[];
  tags: string[];
  stars?: number;
  language?: string;
  license?: string;
  featured?: boolean;
  addedAt: string;
  pricing: "free" | "freemium" | "paid";
};

type PendingEntry = {
  repo: string;
  note?: string;
  importedAt: string;
};

type GitHubCache = Record<
  string,
  {
    stars: number;
    language: string | null;
    topics: string[];
    license: string | null;
    description: string | null;
    homepage: string | null;
    fetchedAt: string;
  }
>;

function slugFromRepo(repo: string): string {
  return repo.split("/")[1].toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function fetchRepo(repo: string): GitHubCache[string] | null {
  try {
    const raw = execSync(`gh api "repos/${repo}" --jq '.'`, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    });
    const data = JSON.parse(raw) as {
      stargazers_count: number;
      language: string | null;
      topics: string[];
      license: { spdx_id: string } | null;
      description: string | null;
      homepage: string | null;
    };
    return {
      stars: data.stargazers_count,
      language: data.language,
      topics: data.topics ?? [],
      license: data.license?.spdx_id ?? null,
      description: data.description,
      homepage: data.homepage || null,
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    console.warn(`  Failed to fetch ${repo}`);
    return null;
  }
}

function loadCache(): GitHubCache {
  if (!existsSync(CACHE_PATH)) return {};
  return JSON.parse(readFileSync(CACHE_PATH, "utf-8")) as GitHubCache;
}

function saveCache(cache: GitHubCache) {
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2) + "\n");
}

function enrichTool(tool: Tool, cache: GitHubCache): Tool {
  const meta = cache[tool.repo];
  if (!meta) return tool;

  const tags = new Set([...tool.tags, ...meta.topics.slice(0, 8)]);

  return {
    ...tool,
    pricing: classifyPricing(tool.repo),
    stars: meta.stars,
    language: meta.language ?? tool.language,
    license: meta.license ?? tool.license,
    tags: [...tags],
    url:
      tool.url.includes("github.com") && meta.homepage
        ? meta.homepage
        : tool.url,
    description: {
      ru: tool.description.ru || meta.description || "",
      en: tool.description.en || meta.description || "",
    },
  };
}

function pendingToTool(entry: PendingEntry, cache: GitHubCache): Tool | null {
  const meta = cache[entry.repo];
  if (!meta) return null;

  return {
    id: slugFromRepo(entry.repo),
    name: entry.repo.split("/")[1],
    repo: entry.repo,
    url: meta.homepage || `https://github.com/${entry.repo}`,
    description: {
      ru: entry.note || meta.description || "",
      en: meta.description || entry.note || "",
    },
    categories: ["general-oss"],
    tags: meta.topics.slice(0, 10),
    stars: meta.stars,
    language: meta.language ?? undefined,
    license: meta.license ?? undefined,
    featured: false,
    addedAt: entry.importedAt,
    pricing: classifyPricing(entry.repo),
  };
}

function main() {
  const promotePending = process.argv.includes("--promote-pending");
  const changedOnly = process.argv.includes("--changed-only");

  const cache = loadCache();
  const tools = JSON.parse(readFileSync(TOOLS_PATH, "utf-8")) as Tool[];

  const reposToFetch = new Set<string>();
  for (const t of tools) reposToFetch.add(t.repo);

  if (promotePending && existsSync(PENDING_PATH)) {
    const pending = JSON.parse(
      readFileSync(PENDING_PATH, "utf-8"),
    ) as PendingEntry[];
    for (const p of pending) reposToFetch.add(p.repo);
  }

  let fetched = 0;
  for (const repo of reposToFetch) {
    if (changedOnly && cache[repo]) {
      const age =
        Date.now() - new Date(cache[repo].fetchedAt).getTime();
      if (age < 24 * 60 * 60 * 1000) continue;
    }
    console.log(`Fetching ${repo}...`);
    const meta = fetchRepo(repo);
    if (meta) {
      cache[repo] = meta;
      fetched++;
    }
    if (fetched % 10 === 0 && fetched > 0) {
      saveCache(cache);
    }
  }
  saveCache(cache);
  console.log(`Fetched ${fetched} repos`);

  const enrichedTools = tools.map((t) => enrichTool(t, cache));
  writeFileSync(TOOLS_PATH, JSON.stringify(enrichedTools, null, 2) + "\n");
  console.log(`Updated ${enrichedTools.length} tools`);

  if (promotePending && existsSync(PENDING_PATH)) {
    const pending = JSON.parse(
      readFileSync(PENDING_PATH, "utf-8"),
    ) as PendingEntry[];
    const existingIds = new Set(enrichedTools.map((t) => t.repo.toLowerCase()));
    const remaining: PendingEntry[] = [];
    let promoted = 0;

    for (const entry of pending) {
      if (existingIds.has(entry.repo.toLowerCase())) {
        remaining.push(entry);
        continue;
      }
      const tool = pendingToTool(entry, cache);
      if (tool) {
        enrichedTools.push(tool);
        existingIds.add(entry.repo.toLowerCase());
        promoted++;
      } else {
        remaining.push(entry);
      }
    }

    writeFileSync(TOOLS_PATH, JSON.stringify(enrichedTools, null, 2) + "\n");
    writeFileSync(PENDING_PATH, JSON.stringify(remaining, null, 2) + "\n");
    console.log(`Promoted ${promoted} pending entries to tools.json`);
  }
}

main();
