import type { CategoryGroup, Tool } from "./types";
import { getCategoryGroupForId } from "./taxonomy";

export type GroupAccent = {
  tabActive: string;
  tabIdle: string;
  cardRing: string;
  cardHoverBorder: string;
  titleHover: string;
  sectionBadge: string;
  filterActive: string;
};

export const GROUP_ACCENTS: Record<CategoryGroup, GroupAccent> = {
  ai: {
    tabActive: "rounded-full bg-teal-600 text-white shadow-sm shadow-teal-900/40 ring-1 ring-teal-400/40",
    tabIdle:
      "rounded-full bg-zinc-900/80 text-zinc-400 border border-teal-900/50 hover:border-teal-600/50 hover:text-teal-200",
    cardRing: "ring-teal-500/20",
    cardHoverBorder: "hover:border-teal-600/40",
    titleHover: "group-hover:text-teal-300",
    sectionBadge: "bg-teal-950 text-teal-300 border-teal-800",
    filterActive: "bg-teal-600 text-white ring-1 ring-teal-400/30",
  },
  business: {
    tabActive:
      "rounded-full bg-violet-600 text-white shadow-sm shadow-violet-900/40 ring-1 ring-violet-400/40",
    tabIdle:
      "rounded-full bg-zinc-900/80 text-zinc-400 border border-violet-900/50 hover:border-violet-600/50 hover:text-violet-200",
    cardRing: "ring-violet-500/20",
    cardHoverBorder: "hover:border-violet-600/40",
    titleHover: "group-hover:text-violet-300",
    sectionBadge: "bg-violet-950 text-violet-300 border-violet-800",
    filterActive: "bg-violet-600 text-white ring-1 ring-violet-400/30",
  },
  infrastructure: {
    tabActive:
      "rounded-full bg-amber-600 text-white shadow-sm shadow-amber-900/40 ring-1 ring-amber-400/40",
    tabIdle:
      "rounded-full bg-zinc-900/80 text-zinc-400 border border-amber-900/50 hover:border-amber-600/50 hover:text-amber-200",
    cardRing: "ring-amber-500/20",
    cardHoverBorder: "hover:border-amber-600/40",
    titleHover: "group-hover:text-amber-300",
    sectionBadge: "bg-amber-950 text-amber-300 border-amber-800",
    filterActive: "bg-amber-600 text-white ring-1 ring-amber-400/30",
  },
};

export const PRICING_TAB_ACTIVE: Record<string, string> = {
  all: "rounded-full bg-zinc-600 text-white ring-1 ring-zinc-400/30",
  free: "rounded-full bg-emerald-600 text-white shadow-sm shadow-emerald-900/30 ring-1 ring-emerald-400/30",
  paid: "rounded-full bg-rose-600 text-white shadow-sm shadow-rose-900/30 ring-1 ring-rose-400/30",
};

export const PRICING_TAB_IDLE =
  "rounded-full border border-zinc-700/80 bg-zinc-900/80 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200";

export const CARD_ACCENT_BORDER: Record<CategoryGroup, string> = {
  ai: "border-l-teal-500/70",
  business: "border-l-violet-500/70",
  infrastructure: "border-l-amber-500/70",
};

export function getToolPrimaryGroup(tool: Tool): CategoryGroup {
  const preferred =
    tool.categories.find((c) => c !== "general-oss") ?? tool.categories[0];
  return getCategoryGroupForId(preferred ?? "general-oss") ?? "infrastructure";
}

export function getGroupAccent(group: CategoryGroup): GroupAccent {
  return GROUP_ACCENTS[group];
}

/** Shared “cases block” surface styling */
export const SURFACE_PANEL =
  "relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900/90 via-zinc-950/95 to-zinc-900/80 ring-1 ring-zinc-500/10";

export const SURFACE_INNER =
  "rounded-2xl border border-zinc-800/90 bg-zinc-950/80 ring-1 ring-zinc-500/10";

export const SECTION_EYEBROW =
  "text-xs font-medium uppercase tracking-[0.2em] text-cyan-400/90";

export const PILL_BADGE =
  "rounded-full border border-zinc-700/70 bg-zinc-900/70 px-3 py-1 text-sm text-zinc-300";

export const BTN_GHOST =
  "rounded-full border border-zinc-700/80 bg-zinc-900/80 text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800";

export const INPUT_SURFACE =
  "rounded-xl border border-zinc-700/80 bg-zinc-950/80 text-zinc-100 placeholder:text-zinc-500 focus:border-cyan-500/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-shadow";
