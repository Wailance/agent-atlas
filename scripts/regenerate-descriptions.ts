import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { generateToolDescriptionPair } from "../lib/description-generator";
import type { Tool } from "../lib/types";

const ROOT = join(import.meta.dirname, "..");
const TOOLS_PATH = join(ROOT, "data/tools.json");
const CACHE_PATH = join(ROOT, "data/.cache/github.json");

type GitHubCache = Record<
  string,
  { description: string | null; fetchedAt?: string }
>;

function loadGithubCache(): GitHubCache {
  if (!existsSync(CACHE_PATH)) return {};
  return JSON.parse(readFileSync(CACHE_PATH, "utf-8")) as GitHubCache;
}

function main() {
  const tools = JSON.parse(readFileSync(TOOLS_PATH, "utf-8")) as Tool[];
  const cache = loadGithubCache();
  let updated = 0;

  for (const tool of tools) {
    const githubDesc = cache[tool.repo]?.description ?? null;
    const next = generateToolDescriptionPair(tool, githubDesc);

    if (
      tool.description.en !== next.en ||
      tool.description.ru !== next.ru
    ) {
      tool.description.en = next.en;
      tool.description.ru = next.ru;
      updated++;
    }
  }

  writeFileSync(TOOLS_PATH, JSON.stringify(tools, null, 2) + "\n");
  console.log(
    `Regenerated descriptions for ${updated}/${tools.length} tools`,
  );
}

main();
