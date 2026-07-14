import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { classifyPricing } from "../lib/pricing";
import type { Tool } from "../lib/types";

const ROOT = join(import.meta.dirname, "..");
const TOOLS_PATH = join(ROOT, "data/tools.json");
const SEED_PATH = process.argv[2]
  ? join(process.cwd(), process.argv[2])
  : join(ROOT, "data/seed-ai-expansion.json");
const CACHE_PATH = join(ROOT, "data/.cache/github.json");

type SeedEntry = {
  repo: string;
  categories: string[];
  note?: string;
};

function slugFromRepo(repo: string): string {
  const base = repo.split("/")[1].toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return base;
}

function uniqueSlug(base: string, used: Set<string>): string {
  let slug = base;
  let i = 2;
  while (used.has(slug)) {
    slug = `${base}-${i}`;
    i++;
  }
  used.add(slug);
  return slug;
}

function main() {
  const seed = JSON.parse(readFileSync(SEED_PATH, "utf-8")) as SeedEntry[];
  const tools = JSON.parse(readFileSync(TOOLS_PATH, "utf-8")) as Tool[];
  const cache = existsSync(CACHE_PATH)
    ? (JSON.parse(readFileSync(CACHE_PATH, "utf-8")) as Record<
        string,
        {
          stars: number;
          language: string | null;
          topics: string[];
          license: string | null;
          description: string | null;
          homepage: string | null;
        }
      >)
    : {};

  const byRepo = new Map(tools.map((t) => [t.repo.toLowerCase(), t]));
  const usedIds = new Set(tools.map((t) => t.id));
  let added = 0;
  let skipped = 0;

  for (const entry of seed) {
    if (entry.note?.includes("duplicate") || entry.note?.includes("skip")) {
      skipped++;
      continue;
    }

    const key = entry.repo.toLowerCase();
    const existing = byRepo.get(key);

    if (existing) {
      const merged = new Set([...existing.categories, ...entry.categories]);
      existing.categories = [...merged];
      if (entry.note && !existing.description.ru.includes(entry.note.slice(0, 20))) {
        existing.description.ru = entry.note;
      }
      continue;
    }

    const meta = cache[entry.repo];
    const id = uniqueSlug(slugFromRepo(entry.repo), usedIds);

    const tool: Tool = {
      id,
      name: entry.repo.split("/")[1],
      repo: entry.repo,
      url: meta?.homepage || `https://github.com/${entry.repo}`,
      description: {
        ru: entry.note || meta?.description || "",
        en: meta?.description || entry.note || "",
      },
      categories: entry.categories,
      tags: meta?.topics?.slice(0, 10) ?? [],
      stars: meta?.stars,
      language: meta?.language ?? undefined,
      license: meta?.license ?? undefined,
      featured: false,
      addedAt: new Date().toISOString().slice(0, 10),
      pricing: classifyPricing(entry.repo),
    };

    tools.push(tool);
    byRepo.set(key, tool);
    added++;
  }

  tools.sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0));
  writeFileSync(TOOLS_PATH, JSON.stringify(tools, null, 2) + "\n");
  console.log(`Added ${added} new tools, skipped ${skipped}, total ${tools.length}`);
}

main();
