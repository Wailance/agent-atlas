import {
  getToolDescription as getLocalizedDescription,
  getToolExpandedDescription,
  getToolShortDescription,
} from "./descriptions";
import toolsData from "@/data/tools.json";
import { getCategoryGroupForId } from "./taxonomy";
import type { Tool, ToolFilters, Locale, PricingFilter } from "./types";
import { isFreePricing, isPaidPricing } from "./pricing";

export const tools = toolsData as Tool[];

export function getToolById(id: string): Tool | undefined {
  return tools.find((t) => t.id === id);
}

export const FEATURED_DISPLAY_LIMIT = 8;

export function getFeaturedTools(): Tool[] {
  return tools
    .filter((t) => t.featured)
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, FEATURED_DISPLAY_LIMIT);
}

export function getSimilarTools(tool: Tool, limit = 4): Tool[] {
  const tagSet = new Set(tool.tags);
  return tools
    .filter((t) => t.id !== tool.id)
    .map((t) => ({
      tool: t,
      score: t.tags.filter((tag) => tagSet.has(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ tool: t }) => t);
}

export function filterByPricing(toolsList: Tool[], pricing: PricingFilter): Tool[] {
  if (pricing === "all") return toolsList;
  if (pricing === "free") {
    return toolsList.filter((t) => isFreePricing(t.pricing));
  }
  return toolsList.filter((t) => isPaidPricing(t.pricing));
}

export function filterTools(allTools: Tool[], filters: ToolFilters): Tool[] {
  let result = filterByPricing(allTools, filters.pricing);

  if (filters.categoryGroup) {
    result = result.filter((t) =>
      t.categories.some(
        (cat) => getCategoryGroupForId(cat) === filters.categoryGroup,
      ),
    );
  }

  if (filters.category) {
    result = result.filter((t) => t.categories.includes(filters.category!));
  }

  const star = (t: Tool) => t.stars ?? 0;

  switch (filters.sort) {
    case "addedAt":
      result.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
      break;
    case "addedAtAsc":
      result.sort((a, b) => a.addedAt.localeCompare(b.addedAt));
      break;
    case "nameDesc":
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "stars":
      result.sort((a, b) => star(b) - star(a) || a.name.localeCompare(b.name));
      break;
    case "starsAsc":
      result.sort((a, b) => star(a) - star(b) || a.name.localeCompare(b.name));
      break;
    case "name":
    default:
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  return result;
}

export function countByPricing(allTools: Tool[]) {
  return {
    all: allTools.length,
    free: allTools.filter((t) => isFreePricing(t.pricing)).length,
    paid: allTools.filter((t) => isPaidPricing(t.pricing)).length,
  };
}

export function getToolDescription(tool: Tool, locale: Locale): string {
  return getLocalizedDescription(tool, locale);
}

export { getToolShortDescription, getToolExpandedDescription };

export function formatStars(stars?: number): string {
  if (!stars) return "—";
  if (stars >= 1000) return `${(stars / 1000).toFixed(stars >= 10000 ? 0 : 1)}k`;
  return String(stars);
}
