export type Locale = "ru" | "en";

export type Pricing = "free" | "freemium" | "paid";

export type PricingFilter = "all" | "free" | "paid";

export type Tool = {
  id: string;
  name: string;
  repo: string;
  url: string;
  description: { ru: string; en: string };
  categories: string[];
  tags: string[];
  stars?: number;
  language?: string;
  license?: string;
  featured?: boolean;
  addedAt: string;
  pricing: Pricing;
};

export type PendingEntry = {
  repo: string;
  note?: string;
  importedAt: string;
};

export type CategoryGroup = "ai" | "business" | "infrastructure";

export type Category = {
  id: string;
  name: { ru: string; en: string };
  description: { ru: string; en: string };
  group: CategoryGroup;
};

export type SortOption =
  | "name"
  | "nameDesc"
  | "addedAt"
  | "addedAtAsc"
  | "stars"
  | "starsAsc";

export type ToolFilters = {
  query: string;
  categoryGroup: CategoryGroup | null;
  category: string | null;
  pricing: PricingFilter;
  sort: SortOption;
};
