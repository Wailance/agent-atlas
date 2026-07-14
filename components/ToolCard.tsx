"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n";
import { getCategoryName } from "@/lib/taxonomy";
import {
  CARD_ACCENT_BORDER,
  getGroupAccent,
  getToolPrimaryGroup,
} from "@/lib/ui-theme";
import {
  formatStars,
  getToolExpandedDescription,
  getToolShortDescription,
} from "@/lib/tools";
import { CategoryPills, TagPills } from "./TagPills";
import { PricingBadge } from "./PricingBadge";
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

  return (
    <article
      className={`group flex flex-col rounded-xl border border-zinc-800/90 bg-zinc-900/60 p-4 border-l-[3px] ${CARD_ACCENT_BORDER[group]} ${accent.cardHoverBorder} hover:bg-zinc-900/90 hover:shadow-lg hover:shadow-black/20 transition-all`}
    >
      <div className="mb-2 flex items-start gap-3">
        <Link href={`/tools/${tool.id}`} className="shrink-0">
          <ToolIcon tool={tool} size={iconSize} />
        </Link>
        <div className="min-w-0 flex-1 flex items-start justify-between gap-2">
          <Link href={`/tools/${tool.id}`} className="min-w-0 flex-1">
            <h3
              className={`font-semibold text-zinc-100 ${accent.titleHover} transition-colors truncate`}
            >
              {tool.name}
            </h3>
            <p className="text-xs text-zinc-500 font-mono truncate">{tool.repo}</p>
          </Link>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <PricingBadge pricing={tool.pricing} locale={locale} />
          </div>
        </div>
      </div>

      {variant === "featured" && (
        <p className="mb-2 text-xs leading-relaxed text-zinc-400 line-clamp-2">
          {shortText}
        </p>
      )}

      {variant === "default" && (
        <p className="mb-3 text-sm leading-relaxed text-zinc-300 line-clamp-3 flex-1">
          {expandedText}
        </p>
      )}

      <div className={variant === "featured" ? "mb-2" : "mb-3"}>
        <CategoryPills
          categories={tool.categories}
          getLabel={(id) => getCategoryName(id, locale)}
        />
      </div>

      {variant === "default" && (
        <TagPills tags={tool.tags} max={4} locale={locale} />
      )}

      <div className="mt-3 flex items-center justify-between gap-2 pt-3 border-t border-zinc-800/80">
        <div className="flex items-center gap-3 text-xs text-zinc-500">
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
        <div className="flex gap-2">
          <a
            href={`https://github.com/${tool.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-500 hover:text-teal-400 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            GitHub
          </a>
          {tool.url && !tool.url.includes("github.com") && (
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-500 hover:text-violet-400 transition-colors"
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
