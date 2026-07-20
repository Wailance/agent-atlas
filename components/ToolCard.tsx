"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n";
import { getCategoryName } from "@/lib/taxonomy";
import {
  CARD_ACCENT_BORDER,
  getGroupAccent,
  getToolPrimaryGroup,
} from "@/lib/ui-theme";
import { getToolResourceType } from "@/lib/resource-types";
import {
  formatStars,
  getToolExpandedDescription,
  getToolShortDescription,
} from "@/lib/tools";
import { CategoryPills, TagPills } from "./TagPills";
import { PricingBadge } from "./PricingBadge";
import { ResourceTypeBadge } from "./ResourceTypeBadge";
import { ToolIcon } from "./ToolIcon";
import type { Tool } from "@/lib/types";

type ToolCardProps = {
  tool: Tool;
  variant?: "default" | "featured" | "compact";
};

export function ToolCard({ tool, variant = "default" }: ToolCardProps) {
  const { locale, t } = useLocale();
  const shortText = getToolShortDescription(tool, locale);
  const expandedText = getToolExpandedDescription(tool, locale);
  const group = getToolPrimaryGroup(tool);
  const accent = getGroupAccent(group);
  const iconSize = variant === "compact" ? "sm" : "md";
  const resourceType = getToolResourceType(tool);
  const showResourceType = resourceType !== "tool";
  const description =
    variant === "featured" ? shortText : expandedText;

  return (
    <article
      className={`group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-900/60 p-4 border-l-[3px] ${CARD_ACCENT_BORDER[group]} ${accent.cardHoverBorder} transition-colors hover:bg-zinc-900/80`}
    >
      <div className="mb-3 flex items-start gap-3">
        <Link href={`/tools/${tool.id}`} className="shrink-0">
          <ToolIcon tool={tool} size={iconSize} />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <Link href={`/tools/${tool.id}`} className="min-w-0 flex-1">
              <h3
                className={`line-clamp-2 text-[15px] font-semibold leading-snug text-zinc-100 ${accent.titleHover} transition-colors`}
              >
                {tool.name}
              </h3>
              <p className="mt-1 truncate text-xs font-mono text-zinc-500">
                {tool.repo}
              </p>
            </Link>
            <div className="flex shrink-0 flex-wrap items-center gap-1.5">
              <PricingBadge pricing={tool.pricing} locale={locale} />
              {showResourceType && (
                <ResourceTypeBadge type={resourceType} locale={locale} />
              )}
            </div>
          </div>
        </div>
      </div>

      <p
        className={`text-sm leading-relaxed text-zinc-300 ${
          variant === "featured" ? "mb-3 line-clamp-3" : "mb-3 line-clamp-3 flex-1"
        }`}
      >
        {description}
      </p>

      <div className={variant === "featured" ? "mb-3" : "mb-2"}>
        <CategoryPills
          categories={tool.categories}
          getLabel={(id) => getCategoryName(id, locale)}
        />
      </div>

      {variant === "default" && (
        <div className="mb-3">
          <TagPills tags={tool.tags} max={4} locale={locale} />
        </div>
      )}

      <div className="mt-auto flex flex-col gap-2 border-t border-zinc-800/80 pt-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 sm:gap-3">
          <span
            className="tabular-nums text-zinc-400"
            title={t("Звёзды GitHub", "GitHub stars")}
          >
            {formatStars(tool.stars)} {t("звёзд", "stars")}
          </span>
          {tool.language && (
            <span className="rounded bg-zinc-800/80 px-1.5 py-0.5 text-zinc-400">
              {tool.language}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={`https://github.com/${tool.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md border border-zinc-700/80 px-2.5 py-1 text-xs text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
            onClick={(e) => e.stopPropagation()}
          >
            GitHub
          </a>
          {tool.url && !tool.url.includes("github.com") && (
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-zinc-700/80 px-2.5 py-1 text-xs text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
              onClick={(e) => e.stopPropagation()}
            >
              {t("Сайт", "Site")}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
