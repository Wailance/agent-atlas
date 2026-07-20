"use client";

import { useLocale } from "@/lib/i18n";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  const { t } = useLocale();

  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t(
          "Поиск по названию, repo, тегам...",
          "Search by name, repo, tags...",
        )}
        className="w-full rounded-lg border border-zinc-700/80 bg-zinc-900/80 pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500/70 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-shadow"
      />
    </div>
  );
}
