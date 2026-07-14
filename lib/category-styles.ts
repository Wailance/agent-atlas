import type { Category } from "./types";

export type CategoryStyle = {
  bg: string;
  text: string;
  border: string;
  dot: string;
};

export const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  "coding-agents": {
    bg: "bg-violet-950/80",
    text: "text-violet-300",
    border: "border-violet-800/80",
    dot: "bg-violet-400",
  },
  "agent-harness": {
    bg: "bg-purple-950/80",
    text: "text-purple-300",
    border: "border-purple-800/80",
    dot: "bg-purple-400",
  },
  "app-builders": {
    bg: "bg-fuchsia-950/80",
    text: "text-fuchsia-300",
    border: "border-fuchsia-800/80",
    dot: "bg-fuchsia-400",
  },
  "rag-context": {
    bg: "bg-indigo-950/80",
    text: "text-indigo-300",
    border: "border-indigo-800/80",
    dot: "bg-indigo-400",
  },
  "web-scraping": {
    bg: "bg-cyan-950/80",
    text: "text-cyan-300",
    border: "border-cyan-800/80",
    dot: "bg-cyan-400",
  },
  "voice-multimodal": {
    bg: "bg-sky-950/80",
    text: "text-sky-300",
    border: "border-sky-800/80",
    dot: "bg-sky-400",
  },
  "llm-gateways": {
    bg: "bg-blue-950/80",
    text: "text-blue-300",
    border: "border-blue-800/80",
    dot: "bg-blue-400",
  },
  "mcp-skills": {
    bg: "bg-teal-950/80",
    text: "text-teal-300",
    border: "border-teal-800/80",
    dot: "bg-teal-400",
  },
  "telegram-bridges": {
    bg: "bg-sky-950/80",
    text: "text-sky-200",
    border: "border-sky-700/80",
    dot: "bg-sky-300",
  },
  observability: {
    bg: "bg-slate-800/80",
    text: "text-slate-300",
    border: "border-slate-600/80",
    dot: "bg-slate-400",
  },
  "self-hosted": {
    bg: "bg-emerald-950/80",
    text: "text-emerald-300",
    border: "border-emerald-800/80",
    dot: "bg-emerald-400",
  },
  "analytics-bi": {
    bg: "bg-amber-950/80",
    text: "text-amber-300",
    border: "border-amber-800/80",
    dot: "bg-amber-400",
  },
  "automation-workflows": {
    bg: "bg-orange-950/80",
    text: "text-orange-300",
    border: "border-orange-800/80",
    dot: "bg-orange-400",
  },
  "spreadsheets-data": {
    bg: "bg-lime-950/80",
    text: "text-lime-300",
    border: "border-lime-800/80",
    dot: "bg-lime-400",
  },
  "websites-cms": {
    bg: "bg-rose-950/80",
    text: "text-rose-300",
    border: "border-rose-800/80",
    dot: "bg-rose-400",
  },
  "crm-sales": {
    bg: "bg-pink-950/80",
    text: "text-pink-300",
    border: "border-pink-800/80",
    dot: "bg-pink-400",
  },
  "marketing-email": {
    bg: "bg-red-950/80",
    text: "text-red-300",
    border: "border-red-800/80",
    dot: "bg-red-400",
  },
  "project-management": {
    bg: "bg-yellow-950/80",
    text: "text-yellow-300",
    border: "border-yellow-800/80",
    dot: "bg-yellow-400",
  },
  "finance-accounting": {
    bg: "bg-green-950/80",
    text: "text-green-300",
    border: "border-green-800/80",
    dot: "bg-green-400",
  },
  ecommerce: {
    bg: "bg-emerald-950/80",
    text: "text-emerald-200",
    border: "border-emerald-700/80",
    dot: "bg-emerald-300",
  },
  "document-collaboration": {
    bg: "bg-blue-950/80",
    text: "text-blue-200",
    border: "border-blue-700/80",
    dot: "bg-blue-300",
  },
  "low-code-internal": {
    bg: "bg-violet-950/80",
    text: "text-violet-200",
    border: "border-violet-700/80",
    dot: "bg-violet-300",
  },
  "erp-operations": {
    bg: "bg-stone-900/80",
    text: "text-stone-300",
    border: "border-stone-700/80",
    dot: "bg-stone-400",
  },
  "api-tools": {
    bg: "bg-zinc-800/80",
    text: "text-zinc-300",
    border: "border-zinc-600/80",
    dot: "bg-zinc-400",
  },
  "database-admin": {
    bg: "bg-indigo-950/80",
    text: "text-indigo-200",
    border: "border-indigo-700/80",
    dot: "bg-indigo-300",
  },
  communication: {
    bg: "bg-cyan-950/80",
    text: "text-cyan-200",
    border: "border-cyan-700/80",
    dot: "bg-cyan-300",
  },
  "general-oss": {
    bg: "bg-zinc-900/80",
    text: "text-zinc-400",
    border: "border-zinc-700/80",
    dot: "bg-zinc-500",
  },
};

const DEFAULT_STYLE: CategoryStyle = {
  bg: "bg-zinc-900/80",
  text: "text-zinc-300",
  border: "border-zinc-700/80",
  dot: "bg-zinc-500",
};

export function getCategoryStyle(categoryId: string): CategoryStyle {
  return CATEGORY_STYLES[categoryId] ?? DEFAULT_STYLE;
}

export function getCategoryPillClass(categoryId: string): string {
  const s = getCategoryStyle(categoryId);
  return `${s.bg} ${s.text} ${s.border} border`;
}
