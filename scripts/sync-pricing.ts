import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { classifyPricing } from "../lib/pricing";
import type { Tool } from "../lib/types";

const TOOLS_PATH = join(import.meta.dirname, "..", "data/tools.json");

function main() {
  const tools = JSON.parse(readFileSync(TOOLS_PATH, "utf-8")) as Tool[];
  const counts = { free: 0, freemium: 0, paid: 0 };
  let changed = 0;

  for (const tool of tools) {
    const next = classifyPricing(tool.repo);
    if (tool.pricing !== next) {
      changed++;
    }
    tool.pricing = next;
    counts[next]++;
  }

  writeFileSync(TOOLS_PATH, JSON.stringify(tools, null, 2) + "\n");
  console.log(`Synced pricing for ${tools.length} tools (${changed} updated)`);
  console.log(counts);
}

main();
