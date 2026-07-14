import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type { Tool } from "../lib/types";

const ROOT = join(import.meta.dirname, "..");
const TOOLS_PATH = join(ROOT, "data/tools.json");
const MAP_PATH = process.argv[2]
  ? join(process.cwd(), process.argv[2])
  : join(ROOT, "data/reclassify-general-oss.json");

type ReclassifyEntry = {
  repo: string;
  categories: string[];
  remove?: string[];
};

function main() {
  const mapping = JSON.parse(readFileSync(MAP_PATH, "utf-8")) as ReclassifyEntry[];
  const tools = JSON.parse(readFileSync(TOOLS_PATH, "utf-8")) as Tool[];
  const byRepo = new Map(tools.map((t) => [t.repo.toLowerCase(), t]));

  let updated = 0;

  for (const entry of mapping) {
    const tool = byRepo.get(entry.repo.toLowerCase());
    if (!tool) {
      console.warn(`Not found: ${entry.repo}`);
      continue;
    }

    const remove = new Set(entry.remove ?? ["general-oss"]);
    const next = new Set(tool.categories.filter((c) => !remove.has(c)));
    for (const cat of entry.categories) {
      next.add(cat);
    }
    tool.categories = [...next];
    updated++;
    console.log(`${entry.repo} → ${tool.categories.join(", ")}`);
  }

  writeFileSync(TOOLS_PATH, JSON.stringify(tools, null, 2) + "\n");
  console.log(`Reclassified ${updated} tools`);
}

main();
