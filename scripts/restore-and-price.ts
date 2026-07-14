import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { classifyPricing } from "../lib/pricing";
import type { Tool } from "../lib/types";

const ROOT = join(import.meta.dirname, "..");
const TOOLS_PATH = join(ROOT, "data/tools.json");
const REMOVED_PATH = join(ROOT, "data/removed-paid.json");
const CACHE_PATH = join(ROOT, "data/.cache/github.json");
const SEED_PATH = join(ROOT, "data/seed-repos.json");

function slugFromRepo(repo: string): string {
  return repo.split("/")[1].toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

type CacheEntry = {
  stars: number;
  language: string | null;
  topics: string[];
  license: string | null;
  description: string | null;
  homepage: string | null;
};

function restoreTool(
  repo: string,
  categories: string[],
  note: string | undefined,
  cache: Record<string, CacheEntry>,
): Tool | null {
  const meta = cache[repo];
  if (!meta) return null;

  const id = slugFromRepo(repo);
  return {
    id,
    name: repo.split("/")[1],
    repo,
    url: meta.homepage || `https://github.com/${repo}`,
    description: {
      ru: note || meta.description || "",
      en: meta.description || note || "",
    },
    categories,
    tags: meta.topics.slice(0, 10),
    stars: meta.stars,
    language: meta.language ?? undefined,
    license: meta.license ?? undefined,
    featured: false,
    addedAt: "2026-07-14",
    pricing: classifyPricing(repo),
  };
}

function main() {
  const current = JSON.parse(readFileSync(TOOLS_PATH, "utf-8")) as Tool[];
  const removed = JSON.parse(readFileSync(REMOVED_PATH, "utf-8")) as {
    id: string;
    repo: string;
    categories: string[];
  }[];
  const cache = JSON.parse(readFileSync(CACHE_PATH, "utf-8")) as Record<
    string,
    CacheEntry
  >;
  const seed = JSON.parse(readFileSync(SEED_PATH, "utf-8")) as {
    repo: string;
    note?: string;
  }[];
  const seedNotes = Object.fromEntries(
    seed.map((s) => [s.repo.toLowerCase(), s.note]),
  );

  const byRepo = new Map<string, Tool>();

  for (const tool of current) {
    byRepo.set(tool.repo.toLowerCase(), {
      ...tool,
      pricing: tool.pricing ?? classifyPricing(tool.repo),
    });
  }

  for (const ref of removed) {
    const key = ref.repo.toLowerCase();
    if (byRepo.has(key)) continue;
    const restored = restoreTool(
      ref.repo,
      ref.categories,
      seedNotes[key],
      cache,
    );
    if (restored) byRepo.set(key, restored);
  }

  const tools = [...byRepo.values()].map((t) => ({
    ...t,
    pricing: t.pricing ?? classifyPricing(t.repo),
  }));

  tools.sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0));
  writeFileSync(TOOLS_PATH, JSON.stringify(tools, null, 2) + "\n");

  const counts = { free: 0, freemium: 0, paid: 0 };
  for (const t of tools) counts[t.pricing!]++;
  console.log(`Restored ${tools.length} tools`, counts);
}

main();
