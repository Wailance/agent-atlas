import type { Locale } from "./types";

/** Skip noisy GitHub topics in UI. */
const HIDDEN_TAGS = new Set([
  "awesome",
  "awesome-list",
  "star",
  "stars",
  "github",
  "javascript",
  "typescript",
  "python",
  "rust",
  "go",
  "java",
  "docker",
  "kubernetes",
  "open-source",
  "opensource",
  "oss",
  "hacktoberfest",
  "deprecated",
]);

const TAG_LABELS: Record<string, { ru: string; en: string }> = {
  ai: { ru: "ИИ", en: "AI" },
  "ai-agents": { ru: "ИИ-агенты", en: "AI agents" },
  agent: { ru: "Агент", en: "Agent" },
  agents: { ru: "Агенты", en: "Agents" },
  "agentic-ai": { ru: "ИИ-агенты", en: "Agentic AI" },
  llm: { ru: "Языковые модели", en: "LLM" },
  llms: { ru: "Языковые модели", en: "LLMs" },
  rag: { ru: "Поиск по документам", en: "RAG" },
  chatbot: { ru: "Чат-бот", en: "Chatbot" },
  chatbots: { ru: "Чат-боты", en: "Chatbots" },
  "self-hosted": { ru: "Свой сервер", en: "Self-hosted" },
  automation: { ru: "Автоматизация", en: "Automation" },
  workflow: { ru: "Процессы", en: "Workflow" },
  workflows: { ru: "Процессы", en: "Workflows" },
  "no-code": { ru: "Без кода", en: "No-code" },
  "low-code": { ru: "Мало кода", en: "Low-code" },
  crm: { ru: "CRM", en: "CRM" },
  erp: { ru: "ERP", en: "ERP" },
  cms: { ru: "CMS", en: "CMS" },
  "headless-cms": { ru: "Headless CMS", en: "Headless CMS" },
  analytics: { ru: "Аналитика", en: "Analytics" },
  dashboard: { ru: "Дашборд", en: "Dashboard" },
  dashboards: { ru: "Дашборды", en: "Dashboards" },
  bi: { ru: "BI-отчёты", en: "BI" },
  scraping: { ru: "Парсинг", en: "Scraping" },
  "web-scraping": { ru: "Парсинг сайтов", en: "Web scraping" },
  crawler: { ru: "Краулер", en: "Crawler" },
  crawling: { ru: "Сбор данных", en: "Crawling" },
  "data-extraction": { ru: "Извлечение данных", en: "Data extraction" },
  ecommerce: { ru: "Интернет-магазин", en: "E-commerce" },
  "e-commerce": { ru: "Интернет-магазин", en: "E-commerce" },
  marketing: { ru: "Маркетинг", en: "Marketing" },
  email: { ru: "Email", en: "Email" },
  newsletter: { ru: "Рассылки", en: "Newsletter" },
  "project-management": { ru: "Задачи и проекты", en: "Project management" },
  kanban: { ru: "Канбан", en: "Kanban" },
  productivity: { ru: "Продуктивность", en: "Productivity" },
  finance: { ru: "Финансы", en: "Finance" },
  accounting: { ru: "Учёт", en: "Accounting" },
  invoicing: { ru: "Счета", en: "Invoicing" },
  database: { ru: "База данных", en: "Database" },
  sql: { ru: "SQL", en: "SQL" },
  postgresql: { ru: "PostgreSQL", en: "PostgreSQL" },
  api: { ru: "API", en: "API" },
  "rest-api": { ru: "REST API", en: "REST API" },
  graphql: { ru: "GraphQL", en: "GraphQL" },
  webhook: { ru: "Webhooks", en: "Webhooks" },
  webhooks: { ru: "Webhooks", en: "Webhooks" },
  monitoring: { ru: "Мониторинг", en: "Monitoring" },
  observability: { ru: "Наблюдаемость", en: "Observability" },
  devops: { ru: "DevOps", en: "DevOps" },
  security: { ru: "Безопасность", en: "Security" },
  privacy: { ru: "Приватность", en: "Privacy" },
  voice: { ru: "Голос", en: "Voice" },
  tts: { ru: "Синтез речи", en: "TTS" },
  speech: { ru: "Речь", en: "Speech" },
  multimodal: { ru: "Мультимодальный", en: "Multimodal" },
  telegram: { ru: "Telegram", en: "Telegram" },
  mcp: { ru: "MCP", en: "MCP" },
  cli: { ru: "Терминал", en: "CLI" },
  ide: { ru: "IDE", en: "IDE" },
  vscode: { ru: "VS Code", en: "VS Code" },
  "developer-tools": { ru: "Для разработчиков", en: "Developer tools" },
  "internal-tools": { ru: "Внутренние сервисы", en: "Internal tools" },
  spreadsheet: { ru: "Таблицы", en: "Spreadsheet" },
  wiki: { ru: "Wiki", en: "Wiki" },
  "knowledge-base": { ru: "База знаний", en: "Knowledge base" },
  "document-management": { ru: "Документы", en: "Documents" },
  collaboration: { ru: "Совместная работа", en: "Collaboration" },
  "team-chat": { ru: "Командный чат", en: "Team chat" },
  video: { ru: "Видео", en: "Video" },
  scheduling: { ru: "Запись на встречи", en: "Scheduling" },
  surveys: { ru: "Опросы", en: "Surveys" },
  forms: { ru: "Формы", en: "Forms" },
  "feature-flags": { ru: "Флаги функций", en: "Feature flags" },
  "a-b-testing": { ru: "A/B-тесты", en: "A/B testing" },
  "machine-learning": { ru: "Машинное обучение", en: "Machine learning" },
  "deep-learning": { ru: "Глубокое обучение", en: "Deep learning" },
  nlp: { ru: "Обработка текста", en: "NLP" },
  "computer-vision": { ru: "Компьютерное зрение", en: "Computer vision" },
  ocr: { ru: "Распознавание текста", en: "OCR" },
  pdf: { ru: "PDF", en: "PDF" },
  markdown: { ru: "Markdown", en: "Markdown" },
  "vector-database": { ru: "Векторная БД", en: "Vector DB" },
  embeddings: { ru: "Эмбеддинги", en: "Embeddings" },
  local: { ru: "Локально", en: "Local" },
  "privacy-first": { ru: "Без слежки", en: "Privacy-first" },
  alternative: { ru: "Альтернатива", en: "Alternative" },
  "zapier-alternative": { ru: "Аналог Zapier", en: "Zapier alternative" },
  "airtable-alternative": { ru: "Аналог Airtable", en: "Airtable alternative" },
  "notion-alternative": { ru: "Аналог Notion", en: "Notion alternative" },
  "slack-alternative": { ru: "Аналог Slack", en: "Slack alternative" },
};

function humanizeTag(tag: string): string {
  return tag.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getTagLabel(tag: string, locale: Locale): string {
  const key = tag.toLowerCase();
  const mapped = TAG_LABELS[key];
  if (mapped) return mapped[locale];
  return humanizeTag(tag);
}

export function shouldShowTag(tag: string): boolean {
  const key = tag.toLowerCase();
  if (HIDDEN_TAGS.has(key)) return false;
  if (key.length > 28) return false;
  return true;
}

export function getDisplayTags(tags: string[], max = 4): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const tag of tags) {
    if (!shouldShowTag(tag)) continue;
    const key = tag.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(tag);
    if (result.length >= max) break;
  }

  return result;
}

export function getDisplayTagLabels(tags: string[], locale: Locale, max = 4): string[] {
  return getDisplayTags(tags, max).map((tag) => getTagLabel(tag, locale));
}
