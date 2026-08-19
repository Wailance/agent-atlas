"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CASE_STUDIES } from "@/lib/cases";
import { withBasePath } from "@/lib/base-path";
import { useLocale } from "@/lib/i18n";

const ACCENT_STYLES = {
  teal: {
    metric: "text-teal-300",
    ring: "ring-teal-500/30",
    pill: "border-teal-800/80 bg-teal-950/60 text-teal-200",
    glow: "from-teal-500/20",
  },
  violet: {
    metric: "text-violet-300",
    ring: "ring-violet-500/30",
    pill: "border-violet-800/80 bg-violet-950/60 text-violet-200",
    glow: "from-violet-500/20",
  },
  amber: {
    metric: "text-amber-300",
    ring: "ring-amber-500/30",
    pill: "border-amber-800/80 bg-amber-950/60 text-amber-200",
    glow: "from-amber-500/20",
  },
  rose: {
    metric: "text-rose-300",
    ring: "ring-rose-500/30",
    pill: "border-rose-800/80 bg-rose-950/60 text-rose-200",
    glow: "from-rose-500/20",
  },
  cyan: {
    metric: "text-cyan-300",
    ring: "ring-cyan-500/30",
    pill: "border-cyan-800/80 bg-cyan-950/60 text-cyan-200",
    glow: "from-cyan-500/20",
  },
} as const;

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CasesCarousel() {
  const { locale, t } = useLocale();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const caseCount = CASE_STUDIES.length;

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8);

    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length === 0) return;

    let closest = 0;
    let minDistance = Number.POSITIVE_INFINITY;
    for (let i = 0; i < cards.length; i++) {
      const distance = Math.abs(cards[i]!.offsetLeft - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closest = i;
      }
    }
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector("article");
    const gap = 16;
    const step = (card?.clientWidth ?? 400) + gap;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section className="relative mb-8 overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900/90 via-zinc-950/95 to-zinc-900/80 p-4 ring-1 ring-zinc-500/10 sm:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl"
      />

      <div className="relative mb-4 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-400/90">
            {t("Портфолио", "Portfolio")}
          </p>
          <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            {t("Мои кейсы", "My case studies")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {t(
              `${caseCount} проектов, которые я внедрял: AI-агенты, RAG, автоматизация и интеграции.`,
              `${caseCount} projects I delivered: AI agents, RAG, automation, and integrations.`,
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            aria-label={t("Предыдущий кейс", "Previous case")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900/80 text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            aria-label={t("Следующий кейс", "Next case")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900/80 text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="relative flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {CASE_STUDIES.map((item) => {
          const accent = ACCENT_STYLES[item.accent];
          return (
            <article
              key={item.id}
              className={`group flex w-[84vw] max-w-[400px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-950/80 ring-1 ${accent.ring} transition duration-300 hover:-translate-y-0.5 hover:border-zinc-700/90 hover:shadow-xl hover:shadow-black/30 sm:w-[380px] lg:w-[400px]`}
            >
              <div className="relative h-28 shrink-0 overflow-hidden sm:h-32">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={withBasePath(item.image)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${accent.glow} to-transparent opacity-60`}
                />
                <div className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-full border border-zinc-700/70 bg-zinc-950/85 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-200 backdrop-blur-sm">
                  <span className="line-clamp-1">{item.industry[locale]}</span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <div className="flex shrink-0 items-end justify-between gap-3 border-b border-zinc-800/80 pb-2.5">
                  <p className={`text-2xl font-semibold leading-none tracking-tight ${accent.metric}`}>
                    {item.metric.value}
                  </p>
                  <p className="max-w-[52%] text-right text-xs leading-snug text-zinc-400">
                    {item.metric.label[locale]}
                  </p>
                </div>

                <h3 className="mt-2.5 line-clamp-2 h-[2.75rem] text-base font-semibold leading-snug text-zinc-50">
                  {item.title[locale]}
                </h3>
                <p className="mt-2 line-clamp-3 h-[4.125rem] text-sm leading-relaxed text-zinc-400">
                  {item.summary[locale]}
                </p>

                <div className="mt-auto flex min-h-[3.25rem] flex-wrap content-end gap-1.5 pt-3">
                  {item.stack.map((tag) => (
                    <span
                      key={tag}
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium leading-none ${accent.pill}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-zinc-500">
          {activeIndex + 1} / {caseCount}
        </p>
        <p className="text-xs text-zinc-600">
          {t("Листайте карусель", "Scroll the carousel")}
        </p>
      </div>
    </section>
  );
}
