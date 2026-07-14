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
    tabActive: "bg-teal-600 text-white shadow-sm shadow-teal-900/40 ring-1 ring-teal-400/40",
    tabIdle:
      "bg-zinc-900/80 text-zinc-400 border border-teal-900/50 hover:border-teal-600/50 hover:text-teal-200",
    cardRing: "ring-teal-500/20",
    cardHoverBorder: "hover:border-teal-600/40",
    titleHover: "group-hover:text-teal-300",
    sectionBadge: "bg-teal-950 text-teal-300 border-teal-800",
    filterActive: "bg-teal-600 text-white ring-1 ring-teal-400/30",
  },
  business: {
    tabActive:
      "bg-violet-600 text-white shadow-sm shadow-violet-900/40 ring-1 ring-violet-400/40",
    tabIdle:
      "bg-zinc-900/80 text-zinc-400 border border-violet-900/50 hover:border-violet-600/50 hover:text-violet-200",
    cardRing: "ring-violet-500/20",
    cardHoverBorder: "hover:border-violet-600/40",
    titleHover: "group-hover:text-violet-300",
    sectionBadge: "bg-violet-950 text-violet-300 border-violet-800",
    filterActive: "bg-violet-600 text-white ring-1 ring-violet-400/30",
  },
  infrastructure: {
    tabActive:
      "bg-amber-600 text-white shadow-sm shadow-amber-900/40 ring-1 ring-amber-400/40",
    tabIdle:
      "bg-zinc-900/80 text-zinc-400 border border-amber-900/50 hover:border-amber-600/50 hover:text-amber-200",
    cardRing: "ring-amber-500/20",
    cardHoverBorder: "hover:border-amber-600/40",
    titleHover: "group-hover:text-amber-300",
    sectionBadge: "bg-amber-950 text-amber-300 border-amber-800",
    filterActive: "bg-amber-600 text-white ring-1 ring-amber-400/30",
  },
};

export const PRICING_TAB_ACTIVE: Record<string, string> = {
  all: "bg-zinc-600 text-white ring-1 ring-zinc-400/30",
  free: "bg-emerald-600 text-white shadow-sm shadow-emerald-900/30 ring-1 ring-emerald-400/30",
  paid: "bg-rose-600 text-white shadow-sm shadow-rose-900/30 ring-1 ring-rose-400/30",
};

export const PRICING_TAB_IDLE =
  "bg-zinc-900/80 text-zinc-400 border border-zinc-700/80 hover:border-zinc-500 hover:text-zinc-200";

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
