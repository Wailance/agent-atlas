import type { Locale, ResourceType, Tool } from "./types";

export function getToolResourceType(tool: Tool): ResourceType {
  if (tool.resourceType) return tool.resourceType;

  const repo = tool.repo.toLowerCase();
  const tags = new Set(tool.tags.map((tag) => tag.toLowerCase()));

  if (tool.categories.includes("ai-courses")) return "course";
  if (tags.has("awesome-list") || repo.includes("awesome-")) return "awesome-list";
  if (tags.has("guide") || repo.includes("guide")) return "guide";
  if (tags.has("playbook") || tags.has("production")) return "playbook";
  if (tags.has("examples") || tags.has("projects") || tags.has("notebooks")) {
    return "examples";
  }

  return "tool";
}

export function getResourceTypeLabel(
  type: ResourceType,
  locale: Locale,
): string {
  const labels: Record<ResourceType, { ru: string; en: string }> = {
    tool: { ru: "Инструмент", en: "Tool" },
    course: { ru: "Курс", en: "Course" },
    guide: { ru: "Гайд", en: "Guide" },
    "awesome-list": { ru: "Подборка", en: "Awesome list" },
    examples: { ru: "Примеры", en: "Examples" },
    playbook: { ru: "Production", en: "Playbook" },
  };

  return labels[type][locale];
}

export function getResourceTypeClass(type: ResourceType): string {
  const styles: Record<ResourceType, string> = {
    tool: "bg-zinc-800/80 text-zinc-300 border-zinc-700/80",
    course: "bg-cyan-950/80 text-cyan-200 border-cyan-700/80",
    guide: "bg-blue-950/80 text-blue-200 border-blue-700/80",
    "awesome-list": "bg-fuchsia-950/80 text-fuchsia-200 border-fuchsia-700/80",
    examples: "bg-violet-950/80 text-violet-200 border-violet-700/80",
    playbook: "bg-emerald-950/80 text-emerald-200 border-emerald-700/80",
  };

  return styles[type];
}
