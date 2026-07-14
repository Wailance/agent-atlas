import { getCategoryById } from "./taxonomy";
import {
  getToolDescription,
  getToolExpandedDescription,
} from "./descriptions";
import { getDisplayTags, getTagLabel } from "./tag-labels";
import { getRepoOwner } from "./repo-icon";
import type { Locale, Tool } from "./types";

export type ToolDetailSection = {
  titleRu: string;
  titleEn: string;
  paragraphs: string[];
  bullets: string[];
};

function primaryCategoryId(tool: Tool): string {
  return (
    tool.categories.find((c) => c !== "general-oss") ??
    tool.categories[0] ??
    "general-oss"
  );
}

function isThinDescription(text: string, tool: Tool): boolean {
  if (!text) return true;
  if (text.length < 80) return true;
  const prefix = new RegExp(
    `^${tool.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*[—–-]\\s*`,
    "i",
  );
  return prefix.test(text) && text.length < 140;
}

function softenEnForRu(en: string): string {
  return en
    .replace(/Retrieval-Augmented Generation/gi, "поиск по документам")
    .replace(/\bRAG\b/g, "поиск по документам")
    .replace(/\bLLM(s)?\b/g, "языковые модели")
    .replace(/multi-agent/gi, "несколько ИИ-агентов")
    .replace(/self-hosted/gi, "на своём сервере")
    .replace(/open-source/gi, "с открытым кодом")
    .replace(/Free Software/gi, "свободное ПО")
    .replace(/web applications?/gi, "веб-приложения")
    .replace(/network services?/gi, "сетевые сервисы")
    .replace(/workflow/gi, "рабочие процессы")
    .replace(/automation/gi, "автоматизация")
    .replace(/integrations?/gi, "интеграции");
}

function supplementalParagraph(tool: Tool, locale: Locale): string | null {
  const en = tool.description.en?.trim() ?? "";
  const ru = tool.description.ru?.trim() ?? "";
  const main = getToolDescription(tool, locale);

  if (!en) return null;

  if (locale === "en") {
    if (en !== main && en.length > main.length + 30) return en;
    return null;
  }

  if (isThinDescription(ru, tool) || en.length > ru.length + 25) {
    const body = softenEnForRu(en);
    const sentence = body.endsWith(".") ? body : `${body}.`;
    if (sentence.toLowerCase() === main.toLowerCase()) return null;
    return sentence;
  }

  return null;
}

function categoryParagraph(tool: Tool, locale: Locale): string | null {
  const ids = tool.categories.filter((c) => c !== "general-oss");
  const list = ids.length > 0 ? ids : tool.categories;

  const parts = list
    .map((id) => getCategoryById(id))
    .filter(Boolean)
    .map((cat) => {
      const name = cat!.name[locale];
      const desc = cat!.description[locale];
      return locale === "ru"
        ? `«${name}» — ${desc.charAt(0).toLowerCase()}${desc.slice(1)}`
        : `"${name}" — ${desc}`;
    });

  if (parts.length === 0) return null;

  return locale === "ru"
    ? `В каталоге отнесён к ${parts.length === 1 ? "разделу" : "разделам"}: ${parts.join("; ")}.`
    : `Catalog ${parts.length === 1 ? "category" : "categories"}: ${parts.join("; ")}.`;
}

function popularityParagraph(tool: Tool, locale: Locale): string | null {
  const stars = tool.stars ?? 0;
  if (stars < 1000) return null;

  const formatted =
    stars >= 1000 ? `${Math.round(stars / 1000)}k+` : String(stars);

  return locale === "ru"
    ? `На GitHub у проекта более ${formatted} звёзд — это один из заметных репозиториев в своей нише.`
    : `The repository has ${formatted} GitHub stars — a well-known project in its space.`;
}

function buildUseCases(tool: Tool, locale: Locale): string[] {
  const en = (tool.description.en ?? "").toLowerCase();
  const tags = new Set(tool.tags.map((t) => t.toLowerCase()));
  const cases: { ru: string; en: string; match: boolean }[] = [
    {
      match:
        tags.has("self-hosted") ||
        tags.has("selfhosted") ||
        /self-host|own server|on-prem|hosted on your own/i.test(en),
      ru: "Запуск на собственном сервере — контроль данных и без зависимости от SaaS",
      en: "Self-hosting for data control without SaaS lock-in",
    },
    {
      match:
        tags.has("automation") ||
        tags.has("workflow") ||
        /automat|workflow|integrat/i.test(en),
      ru: "Автоматизация рутины и связка сервисов между собой",
      en: "Automating repetitive work and connecting services",
    },
    {
      match: tags.has("ai-agents") || tags.has("agent") || /\bagent/i.test(en),
      ru: "Сценарии с ИИ-агентами и умными ассистентами",
      en: "AI agent and assistant workflows",
    },
    {
      match: tags.has("rag") || /retrieval|document|knowledge base/i.test(en),
      ru: "Работа с документами, базой знаний и поиском по контенту",
      en: "Documents, knowledge bases, and content search",
    },
    {
      match:
        tags.has("privacy") ||
        tags.has("privacy-first") ||
        /privacy|private/i.test(en),
      ru: "Проекты, где важны приватность и хранение данных у себя",
      en: "Privacy-sensitive setups with local data",
    },
    {
      match:
        tags.has("developer-tools") ||
        tags.has("cli") ||
        tags.has("ide") ||
        /developer|coding|ide|terminal/i.test(en),
      ru: "Повседневная работа разработчиков и инженеров",
      en: "Day-to-day developer and engineering work",
    },
    {
      match:
        tags.has("crm") ||
        tags.has("erp") ||
        tags.has("ecommerce") ||
        /business|enterprise|crm|erp|commerce/i.test(en),
      ru: "Бизнес-процессы: продажи, учёт, операционка",
      en: "Business operations: sales, accounting, ops",
    },
    {
      match: tags.has("analytics") || tags.has("bi") || /analytics|dashboard/i.test(en),
      ru: "Аналитика, отчёты и визуализация данных",
      en: "Analytics, reporting, and dashboards",
    },
  ];

  return cases
    .filter((c) => c.match)
    .slice(0, 5)
    .map((c) => (locale === "ru" ? c.ru : c.en));
}

function buildHighlights(tool: Tool, locale: Locale): string[] {
  return getDisplayTags(tool.tags, 12).map((tag) => {
    const label = getTagLabel(tag, locale);
    return label;
  });
}

export function getToolDetailSections(
  tool: Tool,
  locale: Locale,
): ToolDetailSection[] {
  const overviewParagraphs = [
    getToolExpandedDescription(tool, locale),
    supplementalParagraph(tool, locale),
    categoryParagraph(tool, locale),
    popularityParagraph(tool, locale),
  ].filter((p): p is string => Boolean(p));

  const highlights = buildHighlights(tool, locale);
  const useCases = buildUseCases(tool, locale);

  const sections: ToolDetailSection[] = [
    {
      titleRu: "О проекте",
      titleEn: "About",
      paragraphs: overviewParagraphs,
      bullets: [],
    },
  ];

  if (highlights.length > 0) {
    sections.push({
      titleRu: "Ключевые темы",
      titleEn: "Key topics",
      paragraphs: [
        locale === "ru"
          ? "По тегам и описанию на GitHub проект связан с такими направлениями:"
          : "Based on GitHub topics and description, this project relates to:",
      ],
      bullets: highlights,
    });
  }

  if (useCases.length > 0) {
    sections.push({
      titleRu: "Когда пригодится",
      titleEn: "When it helps",
      paragraphs: [],
      bullets: useCases,
    });
  }

  const cat = getCategoryById(primaryCategoryId(tool));
  if (cat) {
    sections.push({
      titleRu: "Место в каталоге",
      titleEn: "In this catalog",
      paragraphs: [
        locale === "ru"
          ? `${tool.name} собран в каталоге как инструмент для задач в области «${cat.name.ru}». ${cat.description.ru.charAt(0).toUpperCase()}${cat.description.ru.slice(1)}.`
          : `${tool.name} is listed here under "${cat.name.en}". ${cat.description.en}`,
      ],
      bullets: tool.categories
        .filter((id) => id !== "general-oss")
        .map((id) => {
          const c = getCategoryById(id);
          return c ? c.name[locale] : id;
        }),
    });
  }

  return sections;
}

export function getToolDetailFacts(
  tool: Tool,
  locale: Locale,
): { label: string; value: string }[] {
  const t = (ru: string, en: string) => (locale === "ru" ? ru : en);
  const facts: { label: string; value: string }[] = [
    {
      label: t("Владелец", "Owner"),
      value: getRepoOwner(tool.repo),
    },
    {
      label: t("Репозиторий", "Repository"),
      value: tool.repo,
    },
  ];

  if (tool.stars) {
    facts.push({
      label: t("Звёзды GitHub", "GitHub stars"),
      value: tool.stars.toLocaleString(locale === "ru" ? "ru-RU" : "en-US"),
    });
  }

  if (tool.language) {
    facts.push({ label: t("Язык", "Language"), value: tool.language });
  }

  if (tool.license && tool.license !== "NOASSERTION") {
    facts.push({ label: t("Лицензия", "License"), value: tool.license });
  }

  facts.push({
    label: t("В каталоге с", "In catalog since"),
    value: tool.addedAt,
  });

  return facts;
}
