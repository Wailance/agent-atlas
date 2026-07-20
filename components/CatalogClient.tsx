"use client";

import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { useLocale } from "@/lib/i18n";
import { parseCatalogSearchParams } from "@/lib/catalog-url";
import {
  countByPricing,
  filterTools,
  getFeaturedTools,
  getLearningTools,
} from "@/lib/tools";
import { categoryGroups, countToolsByGroup } from "@/lib/taxonomy";
import {
  GROUP_ACCENTS,
  PRICING_TAB_ACTIVE,
  PRICING_TAB_IDLE,
} from "@/lib/ui-theme";
import { SearchBar } from "./SearchBar";
import { AboutHero } from "./AboutHero";
import { CategoryFilter } from "./CategoryFilter";
import { ToolCard } from "./ToolCard";
import type { PricingFilter, Tool, ToolFilters } from "@/lib/types";

type CatalogClientProps = {
  allTools: Tool[];
  initialFilters?: Partial<ToolFilters>;
};

export const defaultFilters: ToolFilters = {
  query: "",
  categoryGroup: null,
  category: null,
  pricing: "all",
  sort: "stars",
};

const SEARCH_EXAMPLES = ["RAG", "n8n", "scraping"] as const;

export function CatalogClient({
  allTools,
  initialFilters = {},
}: CatalogClientProps) {
  const { locale, t } = useLocale();
  const [filters, setFilters] = useState<ToolFilters>(() => ({
    ...defaultFilters,
    ...initialFilters,
  }));
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const params = parseCatalogSearchParams(
      Object.fromEntries(new URLSearchParams(window.location.search)),
    );
    if (Object.keys(params).length > 0) {
      // GitHub Pages export cannot await searchParams on the server route.
      // We intentionally sync shareable catalog filters from the URL after mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilters((prev) => ({ ...prev, ...params }));
    }
  }, []);

  const pricingCounts = useMemo(() => countByPricing(allTools), [allTools]);
  const groupCounts = useMemo(() => countToolsByGroup(allTools), [allTools]);

  const fuse = useMemo(
    () =>
      new Fuse(allTools, {
        keys: [
          { name: "name", weight: 0.3 },
          { name: "repo", weight: 0.25 },
          { name: "tags", weight: 0.2 },
          { name: "description.ru", weight: 0.15 },
          { name: "description.en", weight: 0.15 },
        ],
        threshold: 0.4,
        includeScore: true,
      }),
    [allTools],
  );

  const filteredTools = useMemo(() => {
    let base = allTools;
    if (filters.query.trim()) {
      base = fuse.search(filters.query.trim()).map((r) => r.item);
    }
    return filterTools(base, filters);
  }, [allTools, filters, fuse]);

  const featured = useMemo(() => getFeaturedTools(), []);
  const learningPicks = useMemo(() => getLearningTools(), []);

  const updateFilters = (partial: Partial<ToolFilters>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const resetFilters = () => setFilters(defaultFilters);

  const hasActiveFilters =
    Boolean(filters.query.trim()) ||
    filters.categoryGroup !== null ||
    filters.category !== null ||
    filters.pricing !== "all";

  const pricingTabs: { id: PricingFilter; label: string; count: number }[] = [
    {
      id: "all",
      label: t("Все", "All"),
      count: pricingCounts.all,
    },
    {
      id: "free",
      label: t("Бесплатные", "Free"),
      count: pricingCounts.free,
    },
    {
      id: "paid",
      label: t("Freemium / Платные", "Freemium / Paid"),
      count: pricingCounts.paid,
    },
  ];

  const showFeatured =
    !filters.query && !filters.categoryGroup && !filters.category;

  const groupTabs = (
    <>
      <button
        type="button"
        onClick={() => updateFilters({ categoryGroup: null, category: null })}
        className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
          !filters.categoryGroup
            ? "bg-zinc-600 text-white ring-1 ring-zinc-400/30"
            : PRICING_TAB_IDLE
        }`}
      >
        {t("Все разделы", "All sections")}
        <span className="ml-2 opacity-70">{allTools.length}</span>
      </button>
      {categoryGroups.map((group) => {
        const accent = GROUP_ACCENTS[group.id];
        const active = filters.categoryGroup === group.id;
        return (
          <button
            key={group.id}
            type="button"
            onClick={() =>
              updateFilters({
                categoryGroup: group.id,
                category: null,
              })
            }
            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              active ? accent.tabActive : accent.tabIdle
            }`}
          >
            {group.name[locale]}
            <span className="ml-2 opacity-75 tabular-nums">
              {groupCounts[group.id]}
            </span>
          </button>
        );
      })}
    </>
  );

  const pricingTabButtons = pricingTabs.map((tab) => (
    <button
      key={tab.id}
      type="button"
      onClick={() => updateFilters({ pricing: tab.id })}
      className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
        filters.pricing === tab.id
          ? PRICING_TAB_ACTIVE[tab.id]
          : PRICING_TAB_IDLE
      }`}
    >
      {tab.label}
      <span className="ml-2 opacity-70">{tab.count}</span>
    </button>
  ));

  return (
    <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 sm:py-8">
      <AboutHero
        totalTools={allTools.length}
        freeCount={pricingCounts.free}
        paidCount={pricingCounts.paid}
      />

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-100 sm:text-3xl">
            {t("Каталог", "Catalog")}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-zinc-500">
            {t(
              "Фильтруйте по разделам, категориям, цене и поисковому запросу.",
              "Filter by section, category, pricing, and search query.",
            )}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full border border-zinc-700/70 bg-zinc-900/70 px-3 py-1 text-zinc-300">
            {filteredTools.length} {t("найдено", "found")}
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-full border border-zinc-700/70 bg-zinc-900/70 px-3 py-1 text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200"
            >
              {t("Сбросить фильтры", "Reset filters")}
            </button>
          )}
        </div>
      </div>

      <div className="mb-4 hidden lg:flex flex-wrap gap-2">{groupTabs}</div>

      <div className="mb-8 hidden lg:flex flex-wrap gap-2">{pricingTabButtons}</div>

      {showFeatured && featured.length > 0 && (
        <section className="mb-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 ring-1 ring-zinc-500/5">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <h2 className="text-lg font-semibold text-zinc-100">
                {t("Топ-проекты", "Top picks")}
              </h2>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
              {t(
                "Сильная стартовая подборка: инструменты, с которых реально стоит начинать знакомство с AI-стеком, автоматизацией и агентами.",
                "A stronger starting set: the projects worth checking first for AI tooling, automation, and agent workflows.",
              )}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featured.map((tool) => (
              <ToolCard key={tool.id} tool={tool} variant="featured" />
            ))}
          </div>
        </section>
      )}

      {showFeatured && learningPicks.length > 0 && (
        <section className="mb-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 ring-1 ring-zinc-500/5">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <h2 className="text-lg font-semibold text-zinc-100">
                {t("Подборка для обучения", "Learning Picks")}
              </h2>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
              {t(
                "Курсы, гайды и практические подборки, если нужно не просто найти инструмент, а быстро войти в тему и собрать системное понимание.",
                "Courses, guides, and practical collections for building real understanding, not just discovering another tool.",
              )}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {learningPicks.map((tool) => (
              <ToolCard key={tool.id} tool={tool} variant="featured" />
            ))}
          </div>
        </section>
      )}

      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen((open) => !open)}
              className="flex w-full items-center justify-between rounded-xl border border-zinc-700/80 bg-zinc-900/60 px-4 py-3 text-sm font-medium text-zinc-200"
            >
              <span>
                {t("Фильтры", "Filters")}
                {hasActiveFilters && (
                  <span className="ml-2 text-zinc-500">
                    {t("активны", "active")}
                  </span>
                )}
              </span>
              <span className="text-zinc-500">
                {mobileFiltersOpen ? "−" : "+"}
              </span>
            </button>
            {mobileFiltersOpen && (
              <div className="mt-3 space-y-3 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-4">
                <div className="flex gap-2 overflow-x-auto pb-1">{groupTabs}</div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {pricingTabButtons}
                </div>
              </div>
            )}
          </div>

          <SearchBar
            value={filters.query}
            onChange={(query) => updateFilters({ query })}
          />
          <CategoryFilter filters={filters} onChange={updateFilters} />
        </aside>

        <main className="min-w-0">
          {filteredTools.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
              <p className="text-zinc-300 font-medium">
                {t("Ничего не найдено", "Nothing found")}
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                {t(
                  "Попробуйте другой запрос или сбросьте фильтры.",
                  "Try a different query or reset filters.",
                )}
              </p>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-4 rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600 transition-colors"
                >
                  {t("Сбросить фильтры", "Reset filters")}
                </button>
              )}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="text-xs text-zinc-500 w-full mb-1">
                  {t("Примеры:", "Examples:")}
                </span>
                {SEARCH_EXAMPLES.map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() =>
                      updateFilters({
                        ...defaultFilters,
                        query: example,
                      })
                    }
                    className="rounded-full border border-zinc-700 bg-zinc-800/80 px-3 py-1 text-xs text-zinc-300 hover:border-violet-600/50 hover:text-violet-200 transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
