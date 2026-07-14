"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";

const COMPETENCIES = [
  { ru: "Управление проектами", en: "Project management" },
  { ru: "AI и автоматизация", en: "AI & automation" },
  { ru: "Корпоративные внедрения", en: "Enterprise delivery" },
  { ru: "Преподавание", en: "Teaching" },
] as const;

export function AboutHero() {
  const { t } = useLocale();

  return (
    <section className="mb-8 border-b border-zinc-800/80 pb-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
        <Image
          src="/evgeniy-voronchikhin.png"
          alt={t("Ворончихин Евгений", "Voronchikhin Evgeny")}
          width={80}
          height={80}
          className="h-20 w-20 shrink-0 rounded-lg object-cover object-top grayscale-[20%]"
          priority
        />

        <div className="min-w-0 flex-1 space-y-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 sm:text-[1.75rem]">
              {t("Ворончихин Евгений", "Voronchikhin Evgeny")}
            </h1>
            <p className="mt-1 text-[15px] text-zinc-500">
              {t(
                "Project Manager · преподаватель AI-агентов",
                "Project Manager · AI agents instructor",
              )}
            </p>
          </div>

          <p className="max-w-xl text-[15px] leading-relaxed text-zinc-400">
            {t(
              "Более пяти лет веду IT- и бизнес-проекты: от государственных платформ и SaaS до интеграций и внедрения AI. Преподаю в онлайн-школе, работаю с распределёнными командами.",
              "Five years leading IT and business projects — from government platforms and SaaS to integrations and AI adoption. I teach online and work with distributed teams.",
            )}
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {COMPETENCIES.map((item) => (
              <li
                key={item.ru}
                className="text-sm text-zinc-500 before:mr-2 before:text-zinc-600 before:content-['—']"
              >
                {t(item.ru, item.en)}
              </li>
            ))}
          </ul>

          <p className="max-w-xl text-[15px] leading-relaxed text-zinc-500">
            {t(
              "Этот сайт — мой рабочий каталог open-source проектов с GitHub: AI-агенты, автоматизация, бизнес-софт и инфраструктура. Собираю проверенные инструменты для проектов и занятий — чтобы быстро найти и выбрать решение под конкретную задачу.",
              "This site is my working catalog of open-source GitHub projects: AI agents, automation, business software, and infrastructure. I curate tools I use in projects and teaching — so you can quickly find the right solution for a specific task.",
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
