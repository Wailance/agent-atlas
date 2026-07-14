import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dirname, "..");
const TOOLS_PATH = join(ROOT, "data/tools.json");
const PENDING_PATH = join(ROOT, "data/pending.json");

type PendingEntry = {
  repo: string;
  note?: string;
  importedAt: string;
};

type ImportEntry = {
  repo: string;
  note?: string;
};

function loadExistingRepos(): Set<string> {
  const repos = new Set<string>();
  if (existsSync(TOOLS_PATH)) {
    const tools = JSON.parse(readFileSync(TOOLS_PATH, "utf-8")) as {
      repo: string;
    }[];
    for (const t of tools) repos.add(t.repo.toLowerCase());
  }
  if (existsSync(PENDING_PATH)) {
    const pending = JSON.parse(readFileSync(PENDING_PATH, "utf-8")) as {
      repo: string;
    }[];
    for (const p of pending) repos.add(p.repo.toLowerCase());
  }
  return repos;
}

function normalizeRepo(raw: string): string | null {
  const ghMatch = raw.match(/github\.com\/([^/]+)\/([^/#?]+)/i);
  if (ghMatch) return `${ghMatch[1]}/${ghMatch[2]}`;

  const slashMatch = raw.match(/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)$/);
  if (slashMatch) return `${slashMatch[1]}/${slashMatch[2]}`;

  return null;
}

function main() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.error("Usage: tsx scripts/import-repos.ts <repos.json>");
    console.error("Format: [{ \"repo\": \"owner/name\", \"note\": \"...\" }]");
    process.exit(1);
  }

  const absPath = inputPath.startsWith("/")
    ? inputPath
    : join(process.cwd(), inputPath);

  if (!existsSync(absPath)) {
    console.error(`File not found: ${absPath}`);
    process.exit(1);
  }

  const entries = JSON.parse(readFileSync(absPath, "utf-8")) as ImportEntry[];
  const existing = loadExistingRepos();
  const pending = JSON.parse(
    existsSync(PENDING_PATH) ? readFileSync(PENDING_PATH, "utf-8") : "[]",
  ) as PendingEntry[];

  const pendingRepos = new Set(pending.map((p) => p.repo.toLowerCase()));
  let added = 0;

  for (const entry of entries) {
    const repo = normalizeRepo(entry.repo);
    if (!repo) {
      console.warn(`Skipping invalid repo: ${entry.repo}`);
      continue;
    }

    const key = repo.toLowerCase();
    if (existing.has(key) || pendingRepos.has(key)) continue;

    pending.push({
      repo,
      note: entry.note,
      importedAt: new Date().toISOString().slice(0, 10),
    });
    pendingRepos.add(key);
    added++;
  }

  writeFileSync(PENDING_PATH, JSON.stringify(pending, null, 2) + "\n");
  console.log(
    `Processed ${entries.length} entries, added ${added} new to pending (${pending.length} total pending)`,
  );
}

main();
