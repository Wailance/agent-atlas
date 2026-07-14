import type { Tool, Locale } from "./types";
import { getCategoryById } from "./taxonomy";

const CYRILLIC = /[а-яА-ЯёЁ]/;

function hasCyrillic(text: string): boolean {
  return CYRILLIC.test(text);
}

function primaryCategoryId(tool: Tool): string {
  return tool.categories.find((c) => c !== "general-oss") ?? tool.categories[0] ?? "general-oss";
}

function looksTooTechnical(text: string): boolean {
  const jargon =
    /\b(RAG|LLM|MCP|API-first|headless|orchestrat|self-hosted|workflow|multi-agent|Retrieval-Augmented|agentic|observability)\b/i;
  return jargon.test(text) && latinRatio(text) > 0.2;
}

function softenTechnicalRu(text: string): string {
  return text
    .replace(/Retrieval-Augmented Generation/gi, "поиск по вашим документам")
    .replace(/\bRAG\b/g, "поиск по документам")
    .replace(/\bLLM(s)?\b/g, "языковые модели")
    .replace(/multi-agent/gi, "несколько ИИ-агентов")
    .replace(/self-hosted/gi, "на своём сервере")
    .replace(/workflow/gi, "процесс")
    .replace(/headless CMS/gi, "CMS без готового сайта")
    .replace(/no-code\/low-code/gi, "без кода или с минимумом кода")
    .replace(/open-source/gi, "с открытым кодом");
}

function latinRatio(text: string): number {
  const latin = text.match(/[a-zA-Z]/g)?.length ?? 0;
  return latin / Math.max(text.length, 1);
}

function buildFromCategory(tool: Tool): string {
  const cat = getCategoryById(primaryCategoryId(tool));
  const hint =
    cat?.description.ru ?? "Полезный инструмент с открытым исходным кодом.";
  return `${tool.name} — ${hint.charAt(0).toLowerCase()}${hint.slice(1)}`;
}

export function buildSimpleRuDescription(tool: Tool): string {
  return buildFromCategory(tool);
}

function stripNamePrefix(text: string, name: string): string {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(new RegExp(`^${escaped}\\s*[—–-]\\s*`, "i"), "").trim();
}

function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const FEATURED_SHORT: Record<string, { ru: string; en: string }> = {
  ragflow: {
    ru: "ИИ ищет ответы в ваших документах и файлах",
    en: "AI search over your documents and files",
  },
  "deer-flow": {
    ru: "Несколько ИИ-агентов для сложных исследовательских задач",
    en: "Multi-agent flows for deep research tasks",
  },
  scrapling: {
    ru: "Парсинг сайтов с обходом блокировок",
    en: "Web scraping with anti-bot handling",
  },
  goose: {
    ru: "ИИ-помощник для кода в терминале и IDE",
    en: "AI coding assistant in terminal and IDE",
  },
  "scrapegraph-ai": {
    ru: "Парсинг сайтов на базе языковых моделей",
    en: "LLM-powered web scraping pipelines",
  },
  "9router": {
    ru: "Маршрутизация запросов между разными ИИ-моделями",
    en: "Route requests across AI model providers",
  },
  dyad: {
    ru: "Собирает приложения с ИИ без сложной настройки",
    en: "Build AI apps with minimal setup",
  },
  pipecat: {
    ru: "Голосовые боты и разговорный ИИ в реальном времени",
    en: "Real-time voice bots and conversational AI",
  },
  "parallel-code": {
    ru: "Несколько ИИ параллельно помогают с кодом",
    en: "Parallel AI agents for coding tasks",
  },
  rolecraft: {
    ru: "Роли и сценарии для ИИ-агентов в разработке",
    en: "Roles and playbooks for dev AI agents",
  },
};

export function getToolShortDescription(tool: Tool, locale: Locale): string {
  const curated = FEATURED_SHORT[tool.id];
  if (curated) return curated[locale];

  const full = getToolDescription(tool, locale);
  const body = stripNamePrefix(full, tool.name) || full;
  const sentence = body.split(/[.!?]/)[0]?.trim() ?? body;
  if (sentence.length <= 100) return capitalize(sentence);
  return `${capitalize(sentence.slice(0, 97).trim())}…`;
}

export function getToolExpandedDescription(tool: Tool, locale: Locale): string {
  const main = getToolDescription(tool, locale);
  const en = tool.description.en?.trim() ?? "";

  if (locale === "en") {
    if (!en || en === main) return main;
    const sentences = en.split(/(?<=[.!?])\s+/).filter(Boolean);
    if (sentences.length > 1) {
      return `${main} ${sentences.slice(1).join(" ")}`.trim();
    }
    return main;
  }

  const extras: string[] = [];
  const lowerEn = en.toLowerCase();

  if (/self-hosted|on-prem|local first/i.test(en) && !/сервер|сво/i.test(main)) {
    extras.push("Можно установить у себя");
  }
  if (/document|pdf|file|markdown/i.test(en) && !/файл|документ/i.test(main)) {
    extras.push("Работает с документами и файлами");
  }
  if (/\bagent/i.test(en) && !/агент/i.test(main)) {
    extras.push("Поддерживает ИИ-агентов");
  }
  if (/voice|speech|audio|tts/i.test(en) && !/голос|реч/i.test(main)) {
    extras.push("Подходит для голосовых сценариев");
  }
  if (/workflow|automation|integrat/i.test(en) && !/автомат|процесс|интеграц/i.test(main)) {
    extras.push("Связывается с другими сервисами");
  }
  if (/open.?source/i.test(lowerEn) && !/открыт/i.test(main)) {
    extras.push("Открытый исходный код");
  }

  if (extras.length === 0) return main;
  const tail = extras.join(". ");
  const base = main.endsWith(".") ? main : `${main}.`;
  return `${base} ${tail}.`;
}

export function getToolDescription(tool: Tool, locale: Locale): string {
  if (locale === "en") {
    return tool.description.en || tool.description.ru || "";
  }

  const ru = tool.description.ru?.trim() ?? "";
  const en = tool.description.en?.trim() ?? "";

  if (tool.featured && ru && hasCyrillic(ru)) {
    return softenTechnicalRu(ru);
  }

  if (
    ru &&
    ru !== en &&
    hasCyrillic(ru) &&
    !looksTooTechnical(ru) &&
    latinRatio(ru) < 0.22
  ) {
    return ru;
  }

  if (ru && hasCyrillic(ru) && latinRatio(ru) < 0.35) {
    return softenTechnicalRu(ru);
  }

  return buildFromCategory(tool);
}
