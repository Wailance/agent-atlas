import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import {
  buildSimpleRuDescription,
  getToolDescription,
} from "../lib/descriptions";
import type { Tool } from "../lib/types";

const TOOLS_PATH = join(import.meta.dirname, "..", "data/tools.json");

function main() {
  const tools = JSON.parse(readFileSync(TOOLS_PATH, "utf-8")) as Tool[];
  let updated = 0;

  for (const tool of tools) {
    const next = tool.featured
      ? getToolDescription(tool, "ru")
      : buildSimpleRuDescription(tool);

    if (tool.description.ru !== next) {
      tool.description.ru = next;
      updated++;
    }
  }

  writeFileSync(TOOLS_PATH, JSON.stringify(tools, null, 2) + "\n");
  console.log(`Localized ${updated} Russian descriptions (${tools.length} total)`);
}

main();
