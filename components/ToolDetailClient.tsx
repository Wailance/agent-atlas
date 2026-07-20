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
import { getToolResourceType } from "@/lib/resource-types";
import {
  CARD_ACCENT_BORDER,
  getGroupAccent,
  getToolPrimaryGroup,
} from "@/lib/ui-theme";
import { formatStars } from "@/lib/tools";
import { CategoryPills, TagPills } from "./TagPills";
import { PricingBadge } from "./PricingBadge";
import { ResourceTypeBadge } from "./ResourceTypeBadge";
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
  const resourceType = getToolResourceType(tool);

  const sections = getToolDetailSections(tool, locale);
  const facts = getToolDetailFacts(tool, locale);

  return (
    <div className="mx-auto max-w-5xl px-3 py-6 sm:px-6 sm:py-8">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-zinc-500 sm:text-sm"
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
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3 sm:gap-4">
            <ToolIcon tool={tool} size="lg" />
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-zinc-100 sm:text-3xl">
                {tool.name}
              </h1>
              <a
                href={`https://github.com/${tool.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block max-w-full break-all font-mono text-xs text-teal-400 hover:text-teal-300 sm:text-sm"
              >
                {tool.repo}
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            <PricingBadge pricing={tool.pricing} locale={locale} />
            {resourceType !== "tool" && (
              <ResourceTypeBadge type={resourceType} locale={locale} />
            )}
            {tool.featured && (
              <span className="rounded-md bg-amber-950 text-amber-400 border border-amber-900 px-2 py-1 text-xs">
                Featured
              </span>
            )}
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-2 text-sm text-zinc-400 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
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

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <a
            href={`https://github.com/${tool.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-zinc-800 px-4 py-2.5 text-center text-sm text-zinc-200 hover:bg-zinc-700 transition-colors sm:text-left"
          >
            GitHub →
          </a>
          {tool.url && !tool.url.includes("github.com") && (
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-teal-700 px-4 py-2.5 text-center text-sm text-white hover:bg-teal-600 transition-colors sm:text-left"
            >
              {t("Сайт проекта", "Project site")} →
            </a>
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-6">
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

        <aside className="min-w-0 space-y-6 lg:sticky lg:top-24 lg:self-start">
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
