import type { ReactNode } from "react";
import { SECTION_EYEBROW, SURFACE_PANEL } from "@/lib/ui-theme";

type GlowVariant = "cyan-violet" | "emerald-amber" | "violet-cyan";

type SurfaceSectionProps = {
  children: ReactNode;
  className?: string;
  glow?: GlowVariant | false;
  padding?: "none" | "sm" | "md";
};

const GLOW_STYLES: Record<GlowVariant, [string, string]> = {
  "cyan-violet": [
    "pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl",
    "pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl",
  ],
  "emerald-amber": [
    "pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl",
    "pointer-events-none absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl",
  ],
  "violet-cyan": [
    "pointer-events-none absolute -right-20 -top-16 h-52 w-52 rounded-full bg-violet-500/10 blur-3xl",
    "pointer-events-none absolute -bottom-16 right-8 h-44 w-44 rounded-full bg-cyan-500/8 blur-3xl",
  ],
};

const PADDING: Record<NonNullable<SurfaceSectionProps["padding"]>, string> = {
  none: "",
  sm: "p-4 sm:p-5",
  md: "p-4 sm:p-6",
};

export function SurfaceSection({
  children,
  className = "",
  glow = "cyan-violet",
  padding = "md",
}: SurfaceSectionProps) {
  const glowOrbs = glow ? GLOW_STYLES[glow] : null;

  return (
    <section className={`${SURFACE_PANEL} ${PADDING[padding]} ${className}`}>
      {glowOrbs && (
        <>
          <div aria-hidden className={glowOrbs[0]} />
          <div aria-hidden className={glowOrbs[1]} />
        </>
      )}
      <div className="relative">{children}</div>
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-4 flex flex-wrap items-end justify-between gap-4 ${className}`}
    >
      <div className="max-w-2xl">
        {eyebrow && <p className={SECTION_EYEBROW}>{eyebrow}</p>}
        <h2
          className={`${eyebrow ? "mt-1.5" : ""} text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl`}
        >
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
