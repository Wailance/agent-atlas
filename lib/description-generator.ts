import {
  getCategoryById,
  getCategoryGroupForId,
  getCategoryGroupName,
} from "./taxonomy";
import { getDisplayTags, getTagLabel } from "./tag-labels";
import { isFreePricing } from "./pricing";
import type { Locale, Tool } from "./types";

function primaryCategoryId(tool: Tool): string {
  return (
    tool.categories.find((c) => c !== "general-oss") ??
    tool.categories[0] ??
    "general-oss"
  );
}

function stripNamePrefix(text: string, name: string): string {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(new RegExp(`^${escaped}\\s*[—–:-]\\s*`, "i"), "").trim();
}

function ensurePeriod(text: string): string {
  const t = text.trim();
  if (!t) return t;
  return /[.!?…]$/.test(t) ? t : `${t}.`;
}

function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function joinList(items: string[], locale: Locale): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0]!;
  if (items.length === 2) {
    return locale === "ru"
      ? `${items[0]} и ${items[1]}`
      : `${items[0]} and ${items[1]}`;
  }
  const head = items.slice(0, -1).join(", ");
  const last = items.at(-1)!;
  return locale === "ru" ? `${head} и ${last}` : `${head}, and ${last}`;
}

function enOpening(tool: Tool, source: string): string {
  const body = capitalize(stripNamePrefix(source, tool.name) || source);
  if (/^(A|An|The)\s/i.test(body)) {
    return ensurePeriod(
      `${tool.name} is ${body.charAt(0).toLowerCase()}${body.slice(1)}`,
    );
  }
  return ensurePeriod(
    `${tool.name}: ${body.charAt(0).toLowerCase()}${body.slice(1)}`,
  );
}

const GENERATED_SOURCE_MARKERS = [
  /\bIn this catalog\b/i,
  /\bListed under\b/i,
  /\bKey topics:\b/i,
  /\bUseful when you need to\b/i,
  /\bProject details:\b/i,
];

function normalizeSourceDescription(text: string, tool: Tool): string {
  let source = stripNamePrefix(text, tool.name).replace(/\s+/g, " ").trim();

  for (const marker of GENERATED_SOURCE_MARKERS) {
    const match = marker.exec(source);
    if (match) {
      source = source.slice(0, match.index).trim();
    }
  }

  source = source.replace(/\s+[.]+$/g, "").trim();
  return source;
}

function inferRuTraits(en: string, tool: Tool): string[] {
  const lower = en.toLowerCase();
  const tags = new Set(tool.tags.map((t) => t.toLowerCase()));
  const traits: string[] = [];
  const voicePattern =
    /\bvoice\b|\bvoices\b|\bspeech\b|\btts\b|text-to-speech|text to speech|speech recognition|transcrib|voice clon|audio generation|audio transcription|\basr\b|\bstt\b/i;

  if (
    tags.has("self-hosted") ||
    tags.has("selfhosted") ||
    /self-host|on your own server|on-prem/i.test(lower)
  ) {
    traits.push("можно развернуть на своём сервере");
  }
  if (/automat|workflow|integrat/i.test(lower) || tags.has("automation")) {
    traits.push("автоматизирует процессы и связывает сервисы");
  }
  if (/\bagent|multi-agent|agentic/i.test(lower) || tags.has("ai-agents")) {
    traits.push("работает с ИИ-агентами");
  }
  if (/rag|retrieval|document|knowledge base|markdown|pdf/i.test(lower)) {
    traits.push("обрабатывает документы и контент для ИИ");
  }
  if (
    tags.has("voice") ||
    tags.has("voice-ai") ||
    tags.has("voice-cloning") ||
    tags.has("speech-recognition") ||
    tags.has("speech-to-text") ||
    tags.has("text-to-speech") ||
    tags.has("tts") ||
    tags.has("asr") ||
    tags.has("stt") ||
    voicePattern.test(lower)
  ) {
    traits.push("подходит для голосовых сценариев");
  }
  if (/scrap|crawl|extract/i.test(lower)) {
    traits.push("собирает и извлекает данные из веба и файлов");
  }
  if (/local|on-device|locally/i.test(lower)) {
    traits.push("можно запускать локально");
  }
  if (/visual|no-code|low-code|drag/i.test(lower)) {
    traits.push("есть визуальный или low-code интерфейс");
  }
  if (/enterprise|business|crm|erp/i.test(lower)) {
    traits.push("ориентирован на бизнес-задачи");
  }

  return traits;
}

function ruOpening(tool: Tool, source: string): string {
  const cat = getCategoryById(primaryCategoryId(tool));
  const catDesc =
    cat?.description.ru ?? "полезный open-source инструмент для практических задач";

  const traits = inferRuTraits(source, tool);
  const base = `${tool.name} — ${catDesc.charAt(0).toLowerCase()}${catDesc.slice(1)}`;

  if (traits.length === 0) return ensurePeriod(base);
  return ensurePeriod(
    `${base}. ${capitalize(traits.slice(0, 2).join(", "))}`,
  );
}

function categorySentence(tool: Tool, locale: Locale): string | null {
  const cat = getCategoryById(primaryCategoryId(tool));
  if (!cat) return null;

  const group = getCategoryGroupForId(cat.id);
  const groupName = group ? getCategoryGroupName(group, locale) : null;

  if (locale === "ru") {
    const groupPart = groupName ? ` в разделе «${groupName}»` : "";
    return ensurePeriod(
      `В каталоге${groupPart} отнесён к «${cat.name.ru}»: ${cat.description.ru.charAt(0).toLowerCase()}${cat.description.ru.slice(1)}`,
    );
  }

  const groupPart = groupName ? ` (${groupName})` : "";
  return ensurePeriod(
    `In this catalog${groupPart}, listed as “${cat.name.en}”: ${cat.description.en}`,
  );
}

function tagsSentence(tool: Tool, locale: Locale): string | null {
  const labels = getDisplayTags(tool.tags, 6).map((tag) =>
    getTagLabel(tag, locale),
  );
  if (labels.length < 2) return null;

  if (locale === "ru") {
    return ensurePeriod(`Ключевые темы: ${joinList(labels, locale)}`);
  }
  return ensurePeriod(`Key topics: ${joinList(labels, locale)}`);
}

function practicalSentence(tool: Tool, locale: Locale): string | null {
  if (locale === "ru") {
    const parts: string[] = [];
    if (isFreePricing(tool.pricing)) {
      parts.push("бесплатный open-source проект");
    } else if (tool.pricing === "freemium") {
      parts.push("есть бесплатный tier и платные возможности");
    }
    if ((tool.stars ?? 0) >= 5000) {
      const label =
        (tool.stars ?? 0) >= 1000
          ? `${Math.round((tool.stars ?? 0) / 1000)}k+`
          : String(tool.stars);
      parts.push(`на GitHub ${label} звёзд`);
    }
    if (tool.language) {
      parts.push(`основной стек — ${tool.language}`);
    }
    if (parts.length === 0) return null;
    return ensurePeriod(`Проект: ${joinList(parts, locale)}`);
  }

  const parts: string[] = [];
  if (isFreePricing(tool.pricing)) parts.push("free open-source");
  else if (tool.pricing === "freemium") parts.push("freemium model");
  if ((tool.stars ?? 0) >= 5000) {
    const label =
      (tool.stars ?? 0) >= 1000
        ? `${Math.round((tool.stars ?? 0) / 1000)}k+`
        : String(tool.stars);
    parts.push(`${label} GitHub stars`);
  }
  if (tool.language) parts.push(`built mainly in ${tool.language}`);
  if (parts.length === 0) return null;
  return ensurePeriod(`Project details: ${joinList(parts, locale)}`);
}

function buildUseCaseSentence(
  tool: Tool,
  locale: Locale,
  source: string,
): string | null {
  const traits =
    locale === "ru" ? inferRuTraits(source, tool) : inferEnTraits(source, tool);
  if (traits.length < 2) return null;

  const slice = traits.slice(0, 3);
  if (locale === "ru") {
    return ensurePeriod(`Подходит, если нужно: ${joinList(slice, locale)}`);
  }
  return ensurePeriod(`Useful when you need to ${joinList(slice, locale)}`);
}

function inferEnTraits(en: string, tool: Tool): string[] {
  const lower = en.toLowerCase();
  const tags = new Set(tool.tags.map((t) => t.toLowerCase()));
  const traits: string[] = [];
  const voicePattern =
    /\bvoice\b|\bvoices\b|\bspeech\b|\btts\b|text-to-speech|text to speech|speech recognition|transcrib|voice clon|audio generation|audio transcription|\basr\b|\bstt\b/i;

  if (tags.has("self-hosted") || /self-host|on-prem/i.test(lower)) {
    traits.push("self-host on your infrastructure");
  }
  if (/automat|workflow/i.test(lower) || tags.has("automation")) {
    traits.push("automate workflows");
  }
  if (/\bagent|agentic/i.test(lower)) {
    traits.push("build AI agents");
  }
  if (/rag|retrieval|document/i.test(lower)) {
    traits.push("work with documents and RAG");
  }
  if (/scrap|crawl/i.test(lower)) {
    traits.push("collect web data");
  }
  if (
    tags.has("voice") ||
    tags.has("voice-ai") ||
    tags.has("voice-cloning") ||
    tags.has("speech-recognition") ||
    tags.has("speech-to-text") ||
    tags.has("text-to-speech") ||
    tags.has("tts") ||
    tags.has("asr") ||
    tags.has("stt") ||
    voicePattern.test(lower)
  ) {
    traits.push("run voice AI scenarios");
  }

  return traits;
}

export function generateToolDescription(
  tool: Tool,
  locale: Locale,
  githubDescription?: string | null,
): string {
  const source =
    normalizeSourceDescription(githubDescription?.trim() || "", tool) ||
    normalizeSourceDescription(tool.description.en?.trim() || "", tool) ||
    getCategoryById(primaryCategoryId(tool))?.description.en ||
    "Open-source software project";

  const opening =
    locale === "en" ? enOpening(tool, source) : ruOpening(tool, source);

  const sentences = [
    opening,
    ...(locale === "en" ? [categorySentence(tool, locale)] : []),
    tagsSentence(tool, locale),
    buildUseCaseSentence(tool, locale, source),
    practicalSentence(tool, locale),
  ].filter((s): s is string => Boolean(s));

  return sentences.join(" ");
}

export function generateToolDescriptionPair(
  tool: Tool,
  githubDescription?: string | null,
): { en: string; ru: string } {
  return {
    en: generateToolDescription(tool, "en", githubDescription),
    ru: generateToolDescription(tool, "ru", githubDescription),
  };
}
