"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n";
import { BTN_GHOST } from "@/lib/ui-theme";
import { ContactLinks } from "./ContactLinks";
import { SiteLogo } from "./SiteLogo";

export function Header() {
  const { locale, setLocale, t } = useLocale();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <SiteLogo className="h-9 w-9 rounded-xl ring-1 ring-zinc-700/50 transition-all group-hover:border-teal-700/60 group-hover:ring-cyan-500/30" />
          <div>
            <div className="text-sm font-semibold text-zinc-100 transition-colors group-hover:text-cyan-300">
              {t("Ворончихин Евгений", "Voronchikhin Evgeny")}
            </div>
            <div className="hidden text-xs text-zinc-500 sm:block">
              {t("Каталог AI-инструментов", "AI tools catalog")}
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <ContactLinks layout="row" className="hidden sm:flex" />

          <div className={`flex overflow-hidden rounded-full ${BTN_GHOST} p-0.5`}>
            <button
              type="button"
              onClick={() => setLocale("ru")}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                locale === "ru"
                  ? "bg-cyan-600 text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              RU
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                locale === "en"
                  ? "bg-cyan-600 text-white"
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
