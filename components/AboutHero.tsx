"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";
import { withBasePath } from "@/lib/base-path";
import { ContactLinks } from "./ContactLinks";

const SERVICES = [
  { ru: "Разработка для бизнеса", en: "Business development" },
  { ru: "Внедрение AI", en: "AI adoption" },
  { ru: "AI-агенты", en: "AI agents" },
  { ru: "RAG", en: "RAG" },
  { ru: "Автоматизация", en: "Automation" },
  { ru: "Интеграции", en: "Integrations" },
  { ru: "Обучение", en: "Training" },
  { ru: "Консультации", en: "Consulting" },
] as const;

const CATALOG_HIGHLIGHTS = [
  {
    ru: "AI-агенты, RAG и автоматизация",
    en: "AI agents, RAG, and automation",
  },
  {
    ru: "Бизнес-системы, аналитика и CRM",
    en: "Business systems, analytics, and CRM",
  },
  {
    ru: "Инфраструктура, dev tools и open-source стек",
    en: "Infrastructure, dev tools, and the open-source stack",
  },
] as const;

type AboutHeroProps = {
  totalTools: number;
  freeCount: number;
  paidCount: number;
};

export function AboutHero({
  totalTools,
  freeCount,
  paidCount,
}: AboutHeroProps) {
  const { t } = useLocale();

  return (
    <section className="mb-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/45 p-5 ring-1 ring-zinc-500/5 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            {t("О каталоге", "About this catalog")}
          </p>
          <h1 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            {t(
              "Каталог open-source проектов для AI, automation и бизнеса",
              "A catalog of open-source projects for AI, automation, and business",
            )}
          </h1>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-zinc-300">
            {t(
              "Я собрал проекты с GitHub в один каталог, чтобы быстрее находить рабочие инструменты под внедрение, обучение и реальные задачи бизнеса.",
              "I assembled GitHub projects into one catalog so it is faster to find useful tools for adoption, learning, and real business work.",
            )}
          </p>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-zinc-400">
              {t(
                "Внутри не только инструменты, но и курсы, гайды, подборки и production-примеры, чтобы можно было не просто выбрать стек, а быстро войти в тему.",
                "It includes not only tools, but also courses, guides, collections, and production examples so you can not just choose a stack, but ramp up fast.",
              )}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-zinc-700/60 bg-zinc-800/80 px-3 py-1 text-sm text-zinc-300">
              {t("Каталог:", "Catalog:")} {totalTools} {t("ресурсов", "resources")}
            </span>
            <span className="rounded-full border border-emerald-900/50 bg-emerald-950/50 px-3 py-1 text-sm text-emerald-300/90">
              {freeCount} {t("бесплатных", "free")}
            </span>
            <span className="rounded-full border border-rose-900/50 bg-rose-950/40 px-3 py-1 text-sm text-rose-300/90">
              {paidCount} {t("freemium / платных", "freemium / paid")}
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {CATALOG_HIGHLIGHTS.map((item) => (
              <div
                key={item.ru}
                className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-4"
              >
                <p className="text-sm leading-relaxed text-zinc-300">
                  {t(item.ru, item.en)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-4 sm:p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[auto_1fr] sm:items-start">
            <Image
              src={withBasePath("/evgeniy-voronchikhin.png")}
              alt={t("Ворончихин Евгений", "Voronchikhin Evgeny")}
              width={144}
              height={144}
              className="mx-auto h-28 w-28 rounded-xl border border-zinc-600/80 object-cover object-[58%_24%] sm:mx-0 sm:h-32 sm:w-32"
              priority
            />

            <div className="min-w-0">
              <p className="text-center text-lg font-semibold text-zinc-50 sm:text-left">
                {t("Ворончихин Евгений", "Voronchikhin Evgeny")}
              </p>
              <p className="mt-1 text-center text-sm leading-relaxed text-zinc-400 sm:text-left">
                {t(
                  "Более 5 лет веду IT- и бизнес-проекты: внедрение AI, автоматизация, RAG, интеграции и продуктовая разработка.",
                  "I have led IT and business projects for 5+ years: AI adoption, automation, RAG, integrations, and product delivery.",
                )}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <ContactLinks className="w-full" />
          </div>

          <div className="mt-5 border-t border-zinc-800/80 pt-5">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
              {t("С чем могу помочь", "What I can help with")}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SERVICES.map((item) => (
                <span
                  key={item.ru}
                  className="rounded-full border border-zinc-700/60 px-2.5 py-1 text-xs text-zinc-400"
                >
                  {t(item.ru, item.en)}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
