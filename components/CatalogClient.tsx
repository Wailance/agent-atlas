"use client";

import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { useLocale } from "@/lib/i18n";
import { parseCatalogSearchParams } from "@/lib/catalog-url";
import {
  countByPricing,
  filterTools,
  getFeaturedTools,
  getStartHereTools,
} from "@/lib/tools";
import { categoryGroups, countToolsByGroup } from "@/lib/taxonomy";
import {
  GROUP_ACCENTS,
  PRICING_TAB_ACTIVE,
  PRICING_TAB_IDLE,
  BTN_GHOST,
  PILL_BADGE,
  SECTION_EYEBROW,
  SURFACE_INNER,
} from "@/lib/ui-theme";
import { SearchBar } from "./SearchBar";
import { AboutHero } from "./AboutHero";
import { CasesCarousel } from "./CasesCarousel";
import { CategoryFilter } from "./CategoryFilter";
import { SectionHeader, SurfaceSection } from "./SurfaceSection";
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
  const startHere = useMemo(() => getStartHereTools(), []);

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
        className={`shrink-0 px-4 py-2 text-sm font-medium transition-all ${
          !filters.categoryGroup
            ? "rounded-full bg-zinc-600 text-white ring-1 ring-zinc-400/30"
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
            className={`shrink-0 px-4 py-2 text-sm font-medium transition-all ${
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
      className={`shrink-0 px-4 py-2 text-sm font-medium transition-all ${
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

      <CasesCarousel />

      <SurfaceSection className="mb-8" glow="emerald-amber">
        <SectionHeader
          eyebrow={t("Open Source", "Open Source")}
          title={t("Каталог", "Catalog")}
          description={t(
            "Фильтруйте по разделам, категориям, цене и поисковому запросу.",
            "Filter by section, category, pricing, and search query.",
          )}
          action={
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className={PILL_BADGE}>
                {filteredTools.length} {t("найдено", "found")}
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className={`${BTN_GHOST} px-3 py-1 text-zinc-400 hover:text-zinc-200`}
                >
                  {t("Сбросить фильтры", "Reset filters")}
                </button>
              )}
            </div>
          }
        />

        <div className="mb-4 hidden flex-wrap gap-2 lg:flex">{groupTabs}</div>

        <div className="mb-8 hidden flex-wrap gap-2 lg:flex">{pricingTabButtons}</div>

        {showFeatured && startHere.length > 0 && (
          <div className={`mb-8 ${SURFACE_INNER} p-5`}>
            <div className="mb-4">
              <p className={SECTION_EYEBROW}>{t("Старт", "Start")}</p>
              <h3 className="mt-1 text-lg font-semibold text-zinc-100">
                {t("С чего начать", "Where to start")}
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
                {t(
                  "Базовый курс по GenAI, курс по агентам, практический гайд и ещё один сильный курс.",
                  "A core GenAI course, an agents course, a practical guide, and one more strong course.",
                )}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {startHere.map((tool) => (
                <ToolCard key={tool.id} tool={tool} variant="featured" />
              ))}
            </div>
          </div>
        )}

        {showFeatured && featured.length > 0 && (
          <div className={`mb-8 ${SURFACE_INNER} p-5`}>
            <div className="mb-4">
              <p className={`${SECTION_EYEBROW} text-amber-400/90`}>
                {t("Подборка", "Curated")}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-zinc-100">
                {t("Топ-проекты", "Top picks")}
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
                {t(
                  "Инструменты, с которых стоит начинать знакомство с AI-стеком и автоматизацией.",
                  "Projects worth checking first for AI tooling and automation.",
                )}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {featured.map((tool) => (
                <ToolCard key={tool.id} tool={tool} variant="featured" />
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen((open) => !open)}
                className={`flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-zinc-200 ${SURFACE_INNER}`}
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
                <div className={`mt-3 space-y-3 p-4 ${SURFACE_INNER}`}>
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
              <div className={`p-12 text-center ${SURFACE_INNER}`}>
                <p className="font-medium text-zinc-300">
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
                    className="mt-4 rounded-full bg-cyan-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-cyan-600"
                  >
                    {t("Сбросить фильтры", "Reset filters")}
                  </button>
                )}
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <span className="mb-1 w-full text-xs text-zinc-500">
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
                      className="rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1 text-xs text-zinc-300 transition-colors hover:border-cyan-600/50 hover:text-cyan-200"
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
      </SurfaceSection>
    </div>
  );
}
