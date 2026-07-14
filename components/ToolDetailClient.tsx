"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n";
import { buildCatalogHref } from "@/lib/catalog-url";
import {
  getCategoryGroupForId,
  getCategoryGroupName,
  getCategoryName,
} from "@/lib/taxonomy";
import {
  getToolDetailFacts,
  getToolDetailSections,
} from "@/lib/tool-detail-content";
import {
  CARD_ACCENT_BORDER,
  getGroupAccent,
  getToolPrimaryGroup,
} from "@/lib/ui-theme";
import { formatStars } from "@/lib/tools";
import { CategoryPills, TagPills } from "./TagPills";
import { PricingBadge } from "./PricingBadge";
import { ToolCard } from "./ToolCard";
import { ToolIcon } from "./ToolIcon";
import type { Tool } from "@/lib/types";

type ToolDetailClientProps = {
  tool: Tool;
  similar: Tool[];
};

function DetailSection({
  title,
  paragraphs,
  bullets,
}: {
  title: string;
  paragraphs: string[];
  bullets: string[];
}) {
  return (
    <section className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-6 sm:p-7">
      <h2 className="text-base font-semibold text-zinc-100 mb-4">{title}</h2>
      {paragraphs.length > 0 && (
        <div className="space-y-3">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-[15px] leading-relaxed text-zinc-300"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}
      {bullets.length > 0 && (
        <ul
          className={`space-y-2 ${paragraphs.length > 0 ? "mt-4" : ""}`}
        >
          {bullets.map((item) => (
            <li
              key={item}
              className="flex gap-2.5 text-[15px] leading-relaxed text-zinc-400"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500/80" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function ToolDetailClient({ tool, similar }: ToolDetailClientProps) {
  const { locale, t } = useLocale();
  const group = getToolPrimaryGroup(tool);
  const accent = getGroupAccent(group);
  const primaryCategory =
    tool.categories.find((c) => c !== "general-oss") ?? tool.categories[0];
  const categoryGroup = primaryCategory
    ? getCategoryGroupForId(primaryCategory)
    : undefined;

  const sections = getToolDetailSections(tool, locale);
  const facts = getToolDetailFacts(tool, locale);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-zinc-500"
      >
        <Link href="/" className="hover:text-teal-400 transition-colors">
          {t("Каталог", "Catalog")}
        </Link>
        {categoryGroup && (
          <>
            <span aria-hidden>/</span>
            <Link
              href={buildCatalogHref({ categoryGroup })}
              className="hover:text-teal-400 transition-colors"
            >
              {getCategoryGroupName(categoryGroup, locale)}
            </Link>
          </>
        )}
        {primaryCategory && (
          <>
            <span aria-hidden>/</span>
            <Link
              href={buildCatalogHref({ category: primaryCategory })}
              className="text-zinc-300 hover:text-teal-400 transition-colors"
            >
              {getCategoryName(primaryCategory, locale)}
            </Link>
          </>
        )}
      </nav>

      <div
        className={`mb-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 sm:p-8 border-l-[4px] ${CARD_ACCENT_BORDER[group]} ring-1 ${accent.cardRing}`}
      >
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div className="flex min-w-0 items-start gap-4">
            <ToolIcon tool={tool} size="lg" />
            <div className="min-w-0">
              <h1 className="text-3xl font-bold text-zinc-100">{tool.name}</h1>
              <a
                href={`https://github.com/${tool.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block font-mono text-sm text-teal-400 hover:text-teal-300"
              >
                {tool.repo}
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <PricingBadge pricing={tool.pricing} locale={locale} />
            {tool.featured && (
              <span className="rounded-md bg-amber-950 text-amber-400 border border-amber-900 px-2 py-1 text-xs">
                Featured
              </span>
            )}
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-400">
          <span>
            {formatStars(tool.stars)} {t("звёзд GitHub", "GitHub stars")}
          </span>
          {tool.language && <span>{tool.language}</span>}
          {tool.license && tool.license !== "NOASSERTION" && (
            <span>{tool.license}</span>
          )}
          <span>
            {t("Добавлен", "Added")}: {tool.addedAt}
          </span>
        </div>

        <CategoryPills
          categories={tool.categories}
          getLabel={(id) => getCategoryName(id, locale)}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6 min-w-0">
          {sections.map((section) => (
            <DetailSection
              key={section.titleRu}
              title={t(section.titleRu, section.titleEn)}
              paragraphs={section.paragraphs}
              bullets={section.bullets}
            />
          ))}

          {tool.tags.length > 0 && (
            <section className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-6 sm:p-7">
              <h2 className="text-base font-semibold text-zinc-100 mb-4">
                {t("Все теги", "All tags")}
              </h2>
              <TagPills tags={tool.tags} max={30} size="md" locale={locale} />
            </section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
            <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wide mb-4">
              {t("Сведения", "Details")}
            </h2>
            <dl className="space-y-3">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs text-zinc-500">{fact.label}</dt>
                  <dd className="mt-0.5 text-sm text-zinc-200 break-all">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-2">
            <a
              href={`https://github.com/${tool.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-zinc-800 px-4 py-2.5 text-center text-sm text-zinc-200 hover:bg-zinc-700 transition-colors"
            >
              GitHub →
            </a>
            {tool.url && !tool.url.includes("github.com") && (
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-teal-700 px-4 py-2.5 text-center text-sm text-white hover:bg-teal-600 transition-colors"
              >
                {t("Сайт проекта", "Project site")} →
              </a>
            )}
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-zinc-200 mb-4">
            {t("Похожие проекты", "Similar projects")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {similar.map((s) => (
              <ToolCard key={s.id} tool={s} variant="compact" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
