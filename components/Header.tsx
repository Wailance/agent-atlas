"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n";
import { ContactLinks } from "./ContactLinks";
import { SiteLogo } from "./SiteLogo";

export function Header() {
  const { locale, setLocale, t } = useLocale();

  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <SiteLogo className="h-9 w-9 transition-colors group-hover:border-teal-700/60" />
          <div>
            <div className="text-sm font-semibold text-zinc-100 group-hover:text-teal-300 transition-colors">
              {t("Ворончихин Евгений", "Voronchikhin Evgeny")}
            </div>
            <div className="text-xs text-zinc-500 hidden sm:block">
              {t("Каталог AI-инструментов", "AI tools catalog")}
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <ContactLinks layout="row" className="hidden sm:flex" />

          <div className="flex rounded-lg border border-zinc-700/80 overflow-hidden bg-zinc-900/50">
            <button
              type="button"
              onClick={() => setLocale("ru")}
              className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                locale === "ru"
                  ? "bg-teal-600 text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              RU
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                locale === "en"
                  ? "bg-teal-600 text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
