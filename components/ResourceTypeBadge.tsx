import { getResourceTypeClass, getResourceTypeLabel } from "@/lib/resource-types";
import type { Locale, ResourceType } from "@/lib/types";

export function ResourceTypeBadge({
  type,
  locale,
}: {
  type: ResourceType;
  locale: Locale;
}) {
  return (
    <span
      className={`rounded-md border px-2 py-0.5 text-xs ${getResourceTypeClass(type)}`}
    >
      {getResourceTypeLabel(type, locale)}
    </span>
  );
}
