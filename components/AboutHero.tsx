"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useLocale } from "@/lib/i18n";

const TELEGRAM_URL = "https://t.me/Eugeny_Nickolaevich";
const TELEGRAM_HANDLE = "@Eugeny_Nickolaevich";

const SERVICES = [
  { ru: "Проекты", en: "Projects" },
  { ru: "Разработка для бизнеса", en: "Business development" },
  { ru: "Внедрение AI", en: "AI adoption" },
  { ru: "AI-агенты", en: "AI agents" },
  { ru: "RAG", en: "RAG" },
  { ru: "Автоматизация", en: "Automation" },
  { ru: "Корпоративные внедрения", en: "Enterprise delivery" },
  { ru: "Интеграции", en: "Integrations" },
  { ru: "Веб-разработка", en: "Web development" },
  { ru: "Управление проектами", en: "Project management" },
  { ru: "SaaS", en: "SaaS" },
  { ru: "Обучение", en: "Training" },
  { ru: "Консультации", en: "Consulting" },
] as const;

type AboutHeroProps = {
  totalTools: number;
  freeCount: number;
  paidCount: number;
};

function BlockCard({
  title,
  children,
  accent = "zinc",
}: {
  title: string;
  children: ReactNode;
  accent?: "zinc" | "teal" | "violet";
}) {
  const accentClass =
    accent === "teal"
      ? "border-l-teal-500/60 ring-teal-500/5"
      : accent === "violet"
        ? "border-l-violet-500/60 ring-violet-500/5"
        : "border-l-zinc-600 ring-zinc-500/5";

  return (
    <article
      className={`rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 sm:p-7 border-l-[3px] ring-1 ${accentClass}`}
    >
      <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-5">
        {title}
      </h2>
      {children}
    </article>
  );
}

export function AboutHero({
  totalTools,
  freeCount,
  paidCount,
}: AboutHeroProps) {
  const { t } = useLocale();

  return (
    <section className="mb-8">
      <BlockCard title={t("О каталоге", "About this catalog")} accent="violet">
        <div className="space-y-4">
          <div className="max-w-3xl space-y-4">
            <p className="text-[15px] leading-relaxed text-zinc-300">
              {t(
                "Я собрал этот каталог open-source проектов с GitHub, чтобы вам было проще найти нужный инструмент — для работы, бизнеса или экспериментов с AI.",
                "I put together this catalog of open-source GitHub projects to help you find the right tool — for work, business, or AI experiments.",
              )}
            </p>
            <p className="text-[15px] leading-relaxed text-zinc-400">
              {t(
                "Здесь — AI-агенты, RAG, автоматизация (n8n и аналоги), бизнес-системы (CRM, ERP, аналитика), инфраструктура и dev-tools. К каждому проекту — ссылка на GitHub; у многих есть отдельный сайт.",
                "Inside you'll find AI agents, RAG, automation (n8n and similar), business systems (CRM, ERP, analytics), infrastructure, and dev tools. Each card links to GitHub; many projects have their own site.",
              )}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="rounded-full bg-zinc-800/80 px-3 py-1 text-sm text-zinc-300 border border-zinc-700/60">
                {totalTools} {t("проектов", "projects")}
              </span>
              <span className="rounded-full bg-emerald-950/60 px-3 py-1 text-sm text-emerald-300/90 border border-emerald-900/50">
                {freeCount} {t("бесплатных", "free")}
              </span>
              <span className="rounded-full bg-rose-950/50 px-3 py-1 text-sm text-rose-300/90 border border-rose-900/50">
                {paidCount} {t("freemium / платных", "freemium / paid")}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-700/50 bg-zinc-950/80 p-4 sm:p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[auto_1fr_auto] sm:grid-rows-[auto_auto] sm:items-start sm:gap-x-5 sm:gap-y-3">
              <Image
                src="/evgeniy-voronchikhin.png"
                alt={t("Ворончихин Евгений", "Voronchikhin Evgeny")}
                width={144}
                height={144}
                className="mx-auto h-32 w-32 shrink-0 rounded-xl object-cover object-[58%_24%] border border-zinc-600/80 sm:col-start-1 sm:row-span-2 sm:row-start-1 sm:mx-0 sm:h-36 sm:w-36"
                priority
              />

              <p className="text-center text-lg font-semibold text-zinc-50 sm:col-start-2 sm:row-start-1 sm:text-left">
                {t("Ворончихин Евгений", "Voronchikhin Evgeny")}
              </p>

              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-white transition-colors sm:col-start-3 sm:row-start-1 sm:w-auto sm:justify-self-end"
              >
                {t("Написать", "Message")}
                <span className="font-mono text-xs font-normal text-zinc-600">
                  {TELEGRAM_HANDLE}
                </span>
              </a>

              <div className="sm:col-span-2 sm:col-start-2 sm:row-start-2">
                <p className="mb-2 text-center text-xs font-medium uppercase tracking-wide text-zinc-500 sm:text-left">
                  {t("С чем могу помочь", "What I can help with")}
                </p>
                <div className="flex flex-wrap justify-center gap-1.5 sm:justify-start">
                  {SERVICES.map((item) => (
                    <span
                      key={item.ru}
                      className="rounded-full border border-zinc-700/50 px-2.5 py-1 text-xs text-zinc-500"
                    >
                      {t(item.ru, item.en)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-zinc-800/70 pt-5">
              <p className="mb-3 text-sm font-medium text-zinc-300">
                {t("Обо мне", "About me")}
              </p>
              <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
                <p>
                  {t(
                    "Более пяти лет веду IT- и бизнес-проекты: от государственных платформ и SaaS до веб-разработки, интеграций и внедрения AI. Работал с распределёнными командами — от идеи и прототипа до запуска и сопровождения в production.",
                    "For over five years I've led IT and business projects — from government platforms and SaaS to web development, integrations, and AI adoption. I've worked with distributed teams from idea and prototype through launch and production support.",
                  )}
                </p>
                <p>
                  {t(
                    "Занимаюсь разработкой решений для бизнеса: автоматизация процессов, AI-агенты, RAG, связка open-source инструментов в рабочие системы. Помогаю выбрать стек под задачу и спланировать внедрение.",
                    "I build business solutions: process automation, AI agents, RAG, and wiring open-source tools into production systems. I help teams pick the right stack and plan rollouts.",
                  )}
                </p>
                <p>
                  {t(
                    "Обучаю и консультирую: помогаю разобраться с AI, автоматизацией и open-source инструментами под вашу задачу.",
                    "I teach and consult — helping you work through AI, automation, and open-source tools for your specific needs.",
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </BlockCard>
    </section>
  );
}
