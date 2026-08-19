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
const CASES = [
  {
    title: { ru: "Поддержка клиентов 24/7", en: "24/7 customer support" },
    outcome: {
      ru: "AI-агент закрыл до 62% типовых обращений без оператора.",
      en: "An AI agent resolved up to 62% of routine tickets without a human.",
    },
  },
  {
    title: { ru: "Автообработка лидов", en: "Automated lead qualification" },
    outcome: {
      ru: "Время первичного контакта сократилось с 2 часов до 8 минут.",
      en: "First-response time dropped from 2 hours to 8 minutes.",
    },
  },
  {
    title: { ru: "RAG для отдела продаж", en: "Sales team RAG assistant" },
    outcome: {
      ru: "Менеджеры получают точные ответы по продукту за 1 клик.",
      en: "Sales reps get accurate product answers in one click.",
    },
  },
  {
    title: { ru: "Суммаризация созвонов", en: "Meeting summarization pipeline" },
    outcome: {
      ru: "Конспект и action items формируются автоматически после звонка.",
      en: "Summaries and action items are generated after each call.",
    },
  },
  {
    title: { ru: "AI-рекрутер", en: "AI recruiter assistant" },
    outcome: {
      ru: "Скрининг кандидатов ускорился на 40% без потери качества.",
      en: "Candidate screening became 40% faster with no quality drop.",
    },
  },
  {
    title: { ru: "Автоответы в Telegram", en: "Telegram auto-replies" },
    outcome: {
      ru: "Бот обрабатывает FAQ, передавая сложные диалоги человеку.",
      en: "The bot handles FAQs and escalates complex chats to humans.",
    },
  },
  {
    title: { ru: "Генерация коммерческих предложений", en: "Proposal generation" },
    outcome: {
      ru: "Подготовка КП сократилась с 3 часов до 25 минут.",
      en: "Proposal creation time dropped from 3 hours to 25 minutes.",
    },
  },
  {
    title: { ru: "AI-ассистент для юристов", en: "Legal AI copilot" },
    outcome: {
      ru: "Поиск релевантных пунктов договора ускорился в 3 раза.",
      en: "Relevant contract clause search became 3x faster.",
    },
  },
  {
    title: { ru: "Онбординг сотрудников", en: "Employee onboarding assistant" },
    outcome: {
      ru: "Новые сотрудники находят ответы без перегруза HR-команды.",
      en: "New hires self-serve answers without overloading HR.",
    },
  },
  {
    title: { ru: "AI-колл-центр", en: "AI call center routing" },
    outcome: {
      ru: "Распределение звонков по приоритету снизило время ожидания.",
      en: "Priority-based call routing reduced wait times.",
    },
  },
  {
    title: { ru: "Контент-план для маркетинга", en: "Marketing content planner" },
    outcome: {
      ru: "Команда выпускает контент стабильно без ручной рутины.",
      en: "The team ships content consistently with less manual work.",
    },
  },
  {
    title: { ru: "Автоматизация отчётности", en: "Automated reporting" },
    outcome: {
      ru: "Еженедельные отчёты собираются и рассылаются автоматически.",
      en: "Weekly reports are generated and delivered automatically.",
    },
  },
  {
    title: { ru: "Классификация входящих писем", en: "Inbound email triage" },
    outcome: {
      ru: "Письма сортируются по темам и сразу уходят ответственным.",
      en: "Emails are classified by topic and routed instantly.",
    },
  },
  {
    title: { ru: "Мониторинг отзывов клиентов", en: "Review sentiment monitor" },
    outcome: {
      ru: "Негативные сигналы обнаруживаются и эскалируются в тот же день.",
      en: "Negative sentiment is detected and escalated the same day.",
    },
  },
  {
    title: { ru: "AI-помощник для e-commerce", en: "E-commerce recommendation agent" },
    outcome: {
      ru: "Персональные рекомендации увеличили средний чек на 12%.",
      en: "Personalized recommendations increased AOV by 12%.",
    },
  },
  {
    title: { ru: "Обработка документов", en: "Document processing workflow" },
    outcome: {
      ru: "Извлечение данных из PDF и Excel автоматизировано end-to-end.",
      en: "Data extraction from PDFs and spreadsheets is fully automated.",
    },
  },
  {
    title: { ru: "AI для отдела закупок", en: "Procurement analysis agent" },
    outcome: {
      ru: "Сравнение поставщиков и цен выполняется за минуты.",
      en: "Supplier and pricing comparisons now take minutes.",
    },
  },
  {
    title: { ru: "Контроль SLA в саппорте", en: "Support SLA watchdog" },
    outcome: {
      ru: "Просроченные тикеты автоматически поднимаются в приоритет.",
      en: "Overdue tickets are auto-escalated before SLA breaches.",
    },
  },
  {
    title: { ru: "Корпоративный AI-поиск", en: "Enterprise AI search" },
    outcome: {
      ru: "Сотрудники находят внутренние знания в 5 раз быстрее.",
      en: "Employees find internal knowledge 5x faster.",
    },
  },
  {
    title: { ru: "Скоринг заявок", en: "Application scoring assistant" },
    outcome: {
      ru: "Приоритет заявок стал прозрачным и единообразным для команды.",
      en: "Application prioritization became transparent and consistent.",
    },
  },
] as const;

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

      <section className="mb-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 ring-1 ring-zinc-500/5">
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            <h2 className="text-lg font-semibold text-zinc-100">
              {t("Кейсы", "Cases")}
            </h2>
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
            {t(
              "20 примеров внедрения AI-агентов и автоматизации в бизнес-процессы.",
              "20 implementation examples of AI agents and workflow automation.",
            )}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CASES.map((item) => (
            <article
              key={item.title.en}
              className="rounded-xl border border-zinc-800/90 bg-zinc-900/70 p-4"
            >
              <h3 className="text-sm font-semibold text-zinc-100">
                {item.title[locale]}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                {item.outcome[locale]}
              </p>
            </article>
          ))}
        </div>
      </section>

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

      {showFeatured && startHere.length > 0 && (
        <section className="mb-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 ring-1 ring-zinc-500/5">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <h2 className="text-lg font-semibold text-zinc-100">
                {t("С чего начать", "Where to start")}
              </h2>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
              {t(
                "Нормальная стартовая полка: базовый курс по GenAI, курс по агентам, внятный гайд по практике и ещё один сильный курс для закрепления.",
                "A sensible starting shelf: one core GenAI course, one agents course, one practical guide, and one more strong course to round it out.",
              )}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {startHere.map((tool) => (
              <ToolCard key={tool.id} tool={tool} variant="featured" />
            ))}
          </div>
        </section>
      )}

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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {featured.map((tool) => (
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
