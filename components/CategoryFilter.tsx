"use client";

import {
  categories,
  categoryGroups,
  getCategoriesByGroup,
  getCategoryGroupForId,
} from "@/lib/taxonomy";
import { useLocale } from "@/lib/i18n";
import type { CategoryGroup, SortOption, ToolFilters } from "@/lib/types";

type CategoryFilterProps = {
  filters: ToolFilters;
  onChange: (filters: Partial<ToolFilters>) => void;
};

const SORT_OPTIONS: { value: SortOption; ru: string; en: string }[] = [
  { value: "name", ru: "Имя А → Я", en: "Name A → Z" },
  { value: "nameDesc", ru: "Имя Я → А", en: "Name Z → A" },
  { value: "stars", ru: "Звёзды ↓", en: "Stars ↓" },
  { value: "starsAsc", ru: "Звёзды ↑", en: "Stars ↑" },
  { value: "addedAt", ru: "Дата ↓ (новые)", en: "Date ↓ (newest)" },
  { value: "addedAtAsc", ru: "Дата ↑ (старые)", en: "Date ↑ (oldest)" },
];

export function CategoryFilter({ filters, onChange }: CategoryFilterProps) {
  const { locale, t } = useLocale();

  const visibleCategories = filters.categoryGroup
    ? getCategoriesByGroup(filters.categoryGroup)
    : categories;

  return (
    <div className="space-y-4 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-4 ring-1 ring-violet-500/5">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-400 uppercase tracking-wide">
          {t("Категория", "Category")}
        </label>
        <select
          value={filters.category ?? ""}
          onChange={(e) => {
            const category = e.target.value || null;
            onChange({
              category,
              categoryGroup: category
                ? (getCategoryGroupForId(category) ?? null)
                : filters.categoryGroup,
            });
          }}
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:border-violet-500/70 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
        >
          <option value="">{t("Все категории", "All categories")}</option>
          {filters.categoryGroup ? (
            visibleCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name[locale]}
              </option>
            ))
          ) : (
            categoryGroups.map((group) => (
              <optgroup key={group.id} label={group.name[locale]}>
                {getCategoriesByGroup(group.id as CategoryGroup).map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name[locale]}
                  </option>
                ))}
              </optgroup>
            ))
          )}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-400 uppercase tracking-wide">
          {t("Сортировка", "Sort by")}
        </label>
        <select
          value={filters.sort}
          onChange={(e) =>
            onChange({ sort: e.target.value as ToolFilters["sort"] })
          }
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:border-violet-500/70 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {t(option.ru, option.en)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
