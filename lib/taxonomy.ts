import taxonomyData from "@/data/taxonomy.json";
import type { Category, CategoryGroup, Locale } from "./types";

export const categories = taxonomyData as Category[];

export const categoryGroups: {
  id: CategoryGroup;
  name: { ru: string; en: string };
}[] = [
  {
    id: "ai",
    name: { ru: "AI и агенты", en: "AI & Agents" },
  },
  {
    id: "business",
    name: { ru: "Бизнес", en: "Business" },
  },
  {
    id: "infrastructure",
    name: { ru: "Инфраструктура", en: "Infrastructure" },
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoryName(id: string, locale: Locale): string {
  const cat = getCategoryById(id);
  return cat?.name[locale] ?? id;
}

export function getCategoriesByGroup(group: CategoryGroup): Category[] {
  return categories.filter((c) => c.group === group);
}

export function getCategoryGroupName(
  group: CategoryGroup,
  locale: Locale,
): string {
  return categoryGroups.find((g) => g.id === group)?.name[locale] ?? group;
}

export function getCategoryGroupForId(id: string): CategoryGroup | undefined {
  return getCategoryById(id)?.group;
}

export function countToolsByGroup(
  allTools: { categories: string[] }[],
): Record<CategoryGroup, number> {
  const counts: Record<CategoryGroup, number> = {
    ai: 0,
    business: 0,
    infrastructure: 0,
  };

  for (const tool of allTools) {
    const groups = new Set<CategoryGroup>();
    for (const catId of tool.categories) {
      const group = getCategoryGroupForId(catId);
      if (group) groups.add(group);
    }
    for (const group of groups) {
      counts[group]++;
    }
  }

  return counts;
}
