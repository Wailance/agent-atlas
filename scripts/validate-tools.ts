import { readFileSync, existsSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dirname, "..");
const TOOLS_PATH = join(ROOT, "data/tools.json");
const TAXONOMY_PATH = join(ROOT, "data/taxonomy.json");
const PENDING_PATH = join(ROOT, "data/pending.json");

type Tool = {
  id: string;
  name: string;
  repo: string;
  url: string;
  description: { ru: string; en: string };
  categories: string[];
  tags: string[];
  addedAt: string;
  pricing?: "free" | "freemium" | "paid";
};

function main() {
  let errors = 0;

  const taxonomy = JSON.parse(
    readFileSync(TAXONOMY_PATH, "utf-8"),
  ) as { id: string; group?: string }[];
  const categoryIds = new Set(taxonomy.map((c) => c.id));

  for (const cat of taxonomy) {
    if (!cat.group) {
      console.error(`Missing group on category: ${cat.id}`);
      errors++;
    }
  }

  const tools = JSON.parse(readFileSync(TOOLS_PATH, "utf-8")) as Tool[];
  const ids = new Set<string>();
  const repos = new Set<string>();

  for (const tool of tools) {
    if (!tool.id || !tool.repo || !tool.name) {
      console.error(`Missing required fields: ${JSON.stringify(tool)}`);
      errors++;
      continue;
    }

    if (!tool.repo.includes("/")) {
      console.error(`Invalid repo format for ${tool.id}: ${tool.repo}`);
      errors++;
    }

    if (ids.has(tool.id)) {
      console.error(`Duplicate id: ${tool.id}`);
      errors++;
    }
    ids.add(tool.id);

    if (repos.has(tool.repo.toLowerCase())) {
      console.error(`Duplicate repo: ${tool.repo}`);
      errors++;
    }
    repos.add(tool.repo.toLowerCase());

    if (!tool.description?.ru || !tool.description?.en) {
      console.error(`Missing description for ${tool.id}`);
      errors++;
    }

    if (!tool.pricing) {
      console.error(`Missing pricing for ${tool.id}`);
      errors++;
    }

    for (const cat of tool.categories) {
      if (!categoryIds.has(cat)) {
        console.error(`Unknown category "${cat}" in ${tool.id}`);
        errors++;
      }
    }
  }

  if (existsSync(PENDING_PATH)) {
    const pending = JSON.parse(readFileSync(PENDING_PATH, "utf-8")) as {
      repo: string;
    }[];
    console.log(`Pending queue: ${pending.length} entries`);
  }

  if (errors === 0) {
    console.log(`Validated ${tools.length} tools — OK`);
  } else {
    console.error(`${errors} validation error(s)`);
    process.exit(1);
  }
}

main();
