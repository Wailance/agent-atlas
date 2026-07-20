import {
  getToolDescription as getLocalizedDescription,
  getToolExpandedDescription,
  getToolShortDescription,
} from "./descriptions";
import toolsData from "@/data/tools.json";
import { getCategoryGroupForId } from "./taxonomy";
import { getToolResourceType } from "./resource-types";
import type { Tool, ToolFilters, Locale, PricingFilter } from "./types";
import { isFreePricing, isPaidPricing } from "./pricing";

export const tools = toolsData as Tool[];
export const FEATURED_DISPLAY_LIMIT = 8;
export const LEARNING_DISPLAY_LIMIT = 6;

const CURATED_FEATURED_IDS = [
  "n8n",
  "ollama",
  "markitdown",
  "firecrawl",
  "dify",
  "browser-use",
  "openhands",
  "open-webui",
] as const;

export function getToolById(id: string): Tool | undefined {
  return tools.find((t) => t.id === id);
}

export function getFeaturedTools(): Tool[] {
  const ranked = CURATED_FEATURED_IDS.map((id) => getToolById(id)).filter(
    (tool): tool is Tool => Boolean(tool),
  );

  if (ranked.length > 0) {
    return ranked.slice(0, FEATURED_DISPLAY_LIMIT);
  }

  return tools
    .filter((t) => t.featured)
    .sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0) || a.name.localeCompare(b.name))
    .slice(0, FEATURED_DISPLAY_LIMIT);
}

export function getLearningTools(limit = LEARNING_DISPLAY_LIMIT): Tool[] {
  return tools
    .filter(
      (tool) =>
        tool.categories.includes("ai-courses") || getToolResourceType(tool) !== "tool",
    )
    .sort((a, b) => {
      const typeA = getToolResourceType(a);
      const typeB = getToolResourceType(b);
      const typePriority = (type: string) =>
        type === "course" ? 0 : type === "guide" ? 1 : type === "playbook" ? 2 : 3;
      return (
        typePriority(typeA) - typePriority(typeB) ||
        (b.stars ?? 0) - (a.stars ?? 0) ||
        a.name.localeCompare(b.name)
      );
    })
    .slice(0, limit);
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
