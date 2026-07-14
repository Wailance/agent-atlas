import { getCategoryGroupForId } from "./taxonomy";
import type { CategoryGroup, PricingFilter, ToolFilters } from "./types";

const VALID_GROUPS = new Set<CategoryGroup>(["ai", "business", "infrastructure"]);
const VALID_PRICING = new Set<PricingFilter>(["all", "free", "paid"]);

function param(
  params: Record<string, string | string[] | undefined>,
  key: string,
): string | undefined {
  const value = params[key];
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0];
  return undefined;
}

export function parseCatalogSearchParams(
  params: Record<string, string | string[] | undefined>,
): Partial<ToolFilters> {
  const partial: Partial<ToolFilters> = {};
  const category = param(params, "category");
  const group = param(params, "group") as CategoryGroup | undefined;
  const pricing = param(params, "pricing") as PricingFilter | undefined;
  const query = param(params, "q");

  if (category) {
    partial.category = category;
    partial.categoryGroup = getCategoryGroupForId(category) ?? null;
  } else if (group && VALID_GROUPS.has(group)) {
    partial.categoryGroup = group;
  }

  if (pricing && VALID_PRICING.has(pricing)) {
    partial.pricing = pricing;
  }

  if (query) {
    partial.query = query;
  }

  return partial;
}

export function buildCatalogHref(
  partial: Partial<
    Pick<ToolFilters, "category" | "categoryGroup" | "pricing" | "query">
  >,
): string {
  const sp = new URLSearchParams();

  if (partial.category) {
    sp.set("category", partial.category);
  } else if (partial.categoryGroup) {
    sp.set("group", partial.categoryGroup);
  }

  if (partial.pricing && partial.pricing !== "all") {
    sp.set("pricing", partial.pricing);
  }

  if (partial.query?.trim()) {
    sp.set("q", partial.query.trim());
  }

  const qs = sp.toString();
  return qs ? `/?${qs}` : "/";
}
