import { getCategoryStyle } from "@/lib/category-styles";
import { getTagLabel, getDisplayTags } from "@/lib/tag-labels";
import type { Locale } from "@/lib/types";

type TagPillsProps = {
  tags: string[];
  max?: number;
  size?: "sm" | "md";
  locale?: Locale;
};

export function TagPills({
  tags,
  max = 5,
  size = "sm",
  locale = "ru",
}: TagPillsProps) {
  const visible = getDisplayTags(tags, max);
  const rest = getDisplayTags(tags, tags.length).length - visible.length;

  const sizeClass =
    size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm";

  return (
    <div className="flex flex-wrap gap-1">
      {visible.map((tag) => (
        <span
          key={tag}
          className={`max-w-full truncate rounded-full border border-zinc-700/60 bg-zinc-800/90 text-zinc-300 ${sizeClass}`}
          title={tag}
        >
          {getTagLabel(tag, locale)}
        </span>
      ))}
      {rest > 0 && (
        <span
          className={`rounded-full bg-zinc-800/50 text-zinc-500 ${sizeClass}`}
        >
          +{rest}
        </span>
      )}
    </div>
  );
}

export function CategoryPills({
  categories,
  getLabel,
}: {
  categories: string[];
  getLabel: (id: string) => string;
}) {
  const ordered = [
    ...categories.filter((c) => c !== "general-oss"),
    ...categories.filter((c) => c === "general-oss"),
  ];

  return (
    <div className="flex flex-wrap gap-1">
      {ordered.map((cat) => {
        const style = getCategoryStyle(cat);
        return (
          <span
            key={cat}
            className={`inline-flex max-w-full items-center gap-1 truncate rounded-md border px-2 py-0.5 text-xs ${style.bg} ${style.text} ${style.border}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${style.dot}`} />
            {getLabel(cat)}
          </span>
        );
      })}
    </div>
  );
}
