import type { Pricing } from "@/lib/types";
import { pricingLabel } from "@/lib/pricing";

export function PricingBadge({
  pricing,
  locale,
}: {
  pricing: Pricing;
  locale: "ru" | "en";
}) {
  const styles: Record<Pricing, string> = {
    free: "bg-emerald-950 text-emerald-400 border-emerald-900",
    freemium: "bg-amber-950 text-amber-400 border-amber-900",
    paid: "bg-rose-950 text-rose-400 border-rose-900",
  };

  return (
    <span
      className={`rounded-md px-2 py-0.5 text-xs border ${styles[pricing]}`}
    >
      {pricingLabel(pricing, locale)}
    </span>
  );
}
