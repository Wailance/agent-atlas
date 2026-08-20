export type CaseStudy = {
  id: string;
  industry: { ru: string; en: string };
  title: { ru: string; en: string };
  summary: { ru: string; en: string };
  metric: { value: string; label: { ru: string; en: string } };
  stack: string[];
  image: string;
  accent: "teal" | "violet" | "amber" | "rose" | "cyan";
};

const caseImage = (id: string) => `/cases/${id}.png`;

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "listok-reports",
    industry: { ru: "CRM · фитнес и EdTech", en: "CRM · fitness and EdTech" },
    title: {
      ru: "Listok Reports: sync, выгрузки и AI-отчёты",
      en: "Listok Reports: sync, exports, and AI reports",
    },
    summary: {
      ru: "Синхронизация Listok API → SQLite, 4 типа xlsx по филиалам, zip в Object Storage, YandexGPT-аналитика и web-dashboard с live-статусом пайплайна.",
      en: "Listok API sync into SQLite, four xlsx report types per branch, zip to Object Storage, YandexGPT analytics, and a web dashboard with live pipeline status.",
    },
    metric: {
      value: "−3 ч",
      label: { ru: "ручных выгрузок / нед", en: "manual exports / week" },
    },
    stack: ["Python", "Listok API", "YandexGPT", "S3"],
    image: caseImage("listok-reports"),
    accent: "amber",
  },
  {
    id: "enterprise-rag",
    industry: { ru: "Retail · внутр. база знаний", en: "Retail · internal knowledge base" },
    title: {
      ru: "Корпоративный RAG поверх Confluence и SharePoint",
      en: "Enterprise RAG over Confluence and SharePoint",
    },
    summary: {
      ru: "Индексация регламентов, прайсов и инструкций. Сотрудники ищут ответы в Slack-боте с цитатами из источника.",
      en: "Indexed policies, price lists, and SOPs. Employees query a Slack bot with source citations.",
    },
    metric: {
      value: "~30 сек",
      label: { ru: "вместо 2–3 мин", en: "down from 2–3 min" },
    },
    stack: ["RAG", "Qdrant", "LangChain", "Slack"],
    image: caseImage("enterprise-rag"),
    accent: "teal",
  },
  {
    id: "voice-clinic",
    industry: { ru: "Healthcare · сеть клиник", en: "Healthcare · clinic network" },
    title: {
      ru: "Голосовой AI-ресепшн и запись на приём",
      en: "Voice AI reception and appointment booking",
    },
    summary: {
      ru: "Обрабатывает входящие звонки, уточняет услугу, свободные слоты и передаёт сложные кейсы администратору.",
      en: "Handles inbound calls, clarifies services and slots, escalates edge cases to staff.",
    },
    metric: {
      value: "~45%",
      label: { ru: "типовых звонков без оператора", en: "routine calls without agent" },
    },
    stack: ["Voice AI", "Twilio", "n8n", "CRM"],
    image: caseImage("voice-clinic"),
    accent: "cyan",
  },
  {
    id: "sales-agents",
    industry: { ru: "B2B SaaS · отдел продаж", en: "B2B SaaS · sales team" },
    title: {
      ru: "Multi-agent воронка: лид → квалификация → demo",
      en: "Multi-agent funnel: lead → qualify → demo",
    },
    summary: {
      ru: "Три агента работают цепочкой: обогащают CRM, пишут follow-up и бронируют слоты без ручного копипаста.",
      en: "Three chained agents enrich CRM, draft follow-ups, and book demos without manual copy-paste.",
    },
    metric: {
      value: "+16%",
      label: { ru: "SQL → demo", en: "SQL → demo" },
    },
    stack: ["Agents", "HubSpot", "OpenAI", "n8n"],
    image: caseImage("sales-agents"),
    accent: "violet",
  },
  {
    id: "logistics-ocr",
    industry: { ru: "Logistics · 3PL оператор", en: "Logistics · 3PL operator" },
    title: {
      ru: "OCR-поток для накладных и актов приёмки",
      en: "OCR pipeline for waybills and receipts",
    },
    summary: {
      ru: "PDF и сканы автоматически попадают в ERP: позиции, суммы, контрагенты — с ручной проверкой только аномалий.",
      en: "PDFs and scans flow into ERP with line items and totals; humans only review anomalies.",
    },
    metric: {
      value: "−4 ч",
      label: { ru: "ручного ввода / день", en: "manual entry / day" },
    },
    stack: ["OCR", "Python", "PostgreSQL", "1C API"],
    image: caseImage("logistics-ocr"),
    accent: "amber",
  },
  {
    id: "legal-ma",
    industry: { ru: "Legal · M&A сделки", en: "Legal · M&A deals" },
    title: {
      ru: "Copilot для due diligence и red flags в договорах",
      en: "Due diligence copilot and contract red flags",
    },
    summary: {
      ru: "120-страничные SPA разбираются по рискам: сроки, штрафы, exclusivity, change of control.",
      en: "120-page SPAs scanned for risk: deadlines, penalties, exclusivity, change of control.",
    },
    metric: {
      value: "2 ч → 35 м",
      label: { ru: "первичный review", en: "initial review" },
    },
    stack: ["RAG", "Claude", "PDF", "Notion"],
    image: caseImage("legal-ma"),
    accent: "rose",
  },
  {
    id: "ecom-telegram",
    industry: { ru: "E-commerce · D2C бренд", en: "E-commerce · D2C brand" },
    title: {
      ru: "Telegram-бот продаж и recovery брошенных корзин",
      en: "Telegram sales bot and cart recovery",
    },
    summary: {
      ru: "Персональные офферы, статус заказа и upsell в мессенджере — без отдельного приложения.",
      en: "Personal offers, order status, and upsell in messenger — no separate app needed.",
    },
    metric: {
      value: "+11%",
      label: { ru: "recovery корзин", en: "cart recovery" },
    },
    stack: ["Telegram", "Retail CRM", "LLM", "Webhooks"],
    image: caseImage("ecom-telegram"),
    accent: "violet",
  },
  {
    id: "hr-screening",
    industry: { ru: "HR Tech · массовый найм", en: "HR Tech · high-volume hiring" },
    title: {
      ru: "AI-скрининг резюме и shortlist за один проход",
      en: "AI resume screening and one-pass shortlist",
    },
    summary: {
      ru: "Сопоставление с матрицей компетенций, скoring по must-have и авто-письма отказа/инвайта.",
      en: "Competency matrix matching, must-have scoring, and auto reject/invite emails.",
    },
    metric: {
      value: "−3 ч",
      label: { ru: "скрининга / день", en: "screening / day" },
    },
    stack: ["HRIS", "Embeddings", "Email", "Sheets"],
    image: caseImage("hr-screening"),
    accent: "teal",
  },
  {
    id: "support-sla",
    industry: { ru: "Support · SaaS", en: "Support · SaaS" },
    title: {
      ru: "Контроль SLA в саппорте",
      en: "Support SLA watchdog",
    },
    summary: {
      ru: "Просроченные тикеты автоматически поднимаются в приоритет до нарушения SLA — менеджер видит риск в Slack.",
      en: "Overdue tickets auto-escalate before SLA breaches — managers see risk in Slack.",
    },
    metric: {
      value: "−35%",
      label: { ru: "нарушений SLA", en: "SLA breaches" },
    },
    stack: ["Zendesk", "n8n", "Slack", "Rules"],
    image: caseImage("support-sla"),
    accent: "amber",
  },
  {
    id: "email-triage",
    industry: { ru: "Operations · входящий поток", en: "Operations · inbound queue" },
    title: {
      ru: "Классификация входящих писем",
      en: "Inbound email triage",
    },
    summary: {
      ru: "Письма сортируются по темам и маршрутизируются ответственным без ручной пересылки из общего ящика.",
      en: "Emails are classified by topic and routed to owners without manual forwarding.",
    },
    metric: {
      value: "8 мин",
      label: { ru: "вместо ~45 мин", en: "down from ~45 min" },
    },
    stack: ["Email", "LLM", "n8n", "CRM"],
    image: caseImage("email-triage"),
    accent: "rose",
  },
  {
    id: "slack-knowledge",
    industry: { ru: "Enterprise · ~50 человек", en: "Enterprise · ~50 people" },
    title: {
      ru: "Slack-бот внутренних знаний и onboarding",
      en: "Slack internal knowledge and onboarding bot",
    },
    summary: {
      ru: "Wiki, Notion и Google Drive в одном ответе. Новый сотрудник не теряется в первую неделю.",
      en: "Wiki, Notion, and Drive in one answer. New hires stop getting lost in week one.",
    },
    metric: {
      value: "−50%",
      label: { ru: "время на поиск", en: "search time" },
    },
    stack: ["RAG", "Slack", "Notion API", "Drive"],
    image: caseImage("slack-knowledge"),
    accent: "cyan",
  },
  {
    id: "crm-proposals",
    industry: { ru: "Sales · enterprise deals", en: "Sales · enterprise deals" },
    title: {
      ru: "Генерация КП из CRM и прайса за 20 минут",
      en: "CRM-to-proposal generation in 20 minutes",
    },
    summary: {
      ru: "Подтягивает SKU, скидки, SLA и кейсы клиента — менеджер только правит финальный PDF.",
      en: "Pulls SKUs, discounts, SLA, and client proof — rep only edits the final PDF.",
    },
    metric: {
      value: "2 ч → 30 м",
      label: { ru: "на одно КП", en: "per proposal" },
    },
    stack: ["CRM", "Templates", "LLM", "PDF"],
    image: caseImage("crm-proposals"),
    accent: "violet",
  },
  {
    id: "meeting-intel",
    industry: { ru: "Remote · product-команда", en: "Remote · product team" },
    title: {
      ru: "Meeting intelligence для product-команды",
      en: "Meeting intelligence for a product team",
    },
    summary: {
      ru: "Транскрипт, решения, owners и задачи в Jira — без «кто что обещал на созвоне».",
      en: "Transcripts, decisions, owners, and Jira tasks — no more «who promised what».",
    },
    metric: {
      value: "−3,5 ч",
      label: { ru: "ручных notes / нед", en: "manual notes / week" },
    },
    stack: ["Whisper", "Zoom", "Jira", "Notion"],
    image: caseImage("meeting-intel"),
    accent: "teal",
  },
  {
    id: "rfp-procurement",
    industry: { ru: "Procurement · тендеры", en: "Procurement · RFPs" },
    title: {
      ru: "RFP-анализ и сравнение поставщиков",
      en: "RFP analysis and vendor comparison",
    },
    summary: {
      ru: "80-страничные тендеры → таблица критериев, рисков и цен для закупочной комиссии.",
      en: "80-page RFPs become criterion tables with risks and pricing for the committee.",
    },
    metric: {
      value: "−45%",
      label: { ru: "время на разбор", en: "analysis time" },
    },
    stack: ["PDF", "Excel", "LLM", "Sheets"],
    image: caseImage("rfp-procurement"),
    accent: "amber",
  },
  {
    id: "churn-radar",
    industry: { ru: "SaaS · subscription", en: "SaaS · subscription" },
    title: {
      ru: "Churn radar и playbooks для CS",
      en: "Churn radar and CS playbooks",
    },
    summary: {
      ru: "Сигналы usage + support tickets → приоритетный список клиентов «на грани» с готовым сценарием.",
      en: "Usage plus support signals → prioritized at-risk list with ready playbooks.",
    },
    metric: {
      value: "−11%",
      label: { ru: "churn за квартал", en: "quarterly churn" },
    },
    stack: ["Product analytics", "LLM", "CRM", "Slack"],
    image: caseImage("churn-radar"),
    accent: "rose",
  },
  {
    id: "document-workflow",
    industry: { ru: "Back-office · документы", en: "Back-office · documents" },
    title: {
      ru: "Обработка документов PDF и Excel",
      en: "PDF and Excel document processing",
    },
    summary: {
      ru: "Извлечение полей из PDF и таблиц Excel автоматизировано end-to-end — в CRM попадают только аномалии.",
      en: "Field extraction from PDFs and Excel is automated end-to-end — only anomalies need review.",
    },
    metric: {
      value: "−4 ч",
      label: { ru: "ручного ввода / день", en: "manual entry / day" },
    },
    stack: ["OCR", "Python", "Excel", "CRM"],
    image: caseImage("document-workflow"),
    accent: "cyan",
  },
  {
    id: "review-sentiment",
    industry: { ru: "E-commerce · клиентский опыт", en: "E-commerce · customer experience" },
    title: {
      ru: "Мониторинг отзывов клиентов",
      en: "Customer review sentiment monitor",
    },
    summary: {
      ru: "Негативные сигналы в отзывах и соцсетях обнаруживаются и эскалируются в тот же день с готовым draft ответа.",
      en: "Negative signals in reviews and social posts are flagged same-day with a draft response.",
    },
    metric: {
      value: "−42%",
      label: { ru: "время реакции", en: "response time" },
    },
    stack: ["LLM", "Scraping", "Slack", "n8n"],
    image: caseImage("review-sentiment"),
    accent: "rose",
  },
  {
    id: "content-factory",
    industry: { ru: "Marketing · контент-команда", en: "Marketing · content team" },
    title: {
      ru: "Контент-фабрика: бриф → посты → публикация",
      en: "Content factory: brief → posts → publish",
    },
    summary: {
      ru: "Единый бриф размножается в LinkedIn, Telegram и email с учётом tone of voice бренда.",
      en: "One brief becomes LinkedIn, Telegram, and email variants in brand tone of voice.",
    },
    metric: {
      value: "13–16",
      label: { ru: "постов / неделя", en: "posts / week" },
    },
    stack: ["Brand KB", "LLM", "Buffer", "Notion"],
    image: caseImage("content-factory"),
    accent: "violet",
  },
  {
    id: "support-l1",
    industry: { ru: "Support · SaaS", en: "Support · SaaS" },
    title: {
      ru: "L1 deflection: база знаний + agent handoff",
      en: "L1 deflection: knowledge base plus agent handoff",
    },
    summary: {
      ru: "Типовые тикеты закрываются ботом с логами; сложное уходит оператору с полным контекстом.",
      en: "Routine tickets close with logs; complex ones reach agents with full context.",
    },
    metric: {
      value: "~50%",
      label: { ru: "deflection L1", en: "L1 deflection" },
    },
    stack: ["Zendesk", "RAG", "LLM", "Macros"],
    image: caseImage("support-l1"),
    accent: "amber",
  },
  {
    id: "real-estate-leads",
    industry: { ru: "Real Estate · девелопмент", en: "Real Estate · development" },
    title: {
      ru: "Scoring лидов и маршрутизация брокерам",
      en: "Lead scoring and broker routing",
    },
    summary: {
      ru: "Бюджет, срок, район и источник → приоритет и лучший брокер в CRM за секунды.",
      en: "Budget, timeline, district, and source → priority and best broker in seconds.",
    },
    metric: {
      value: "+16%",
      label: { ru: "конверсия в показ", en: "viewing conversion" },
    },
    stack: ["CRM", "Scoring", "Telegram", "Maps API"],
    image: caseImage("real-estate-leads"),
    accent: "rose",
  },
  {
    id: "onboarding-academy",
    industry: { ru: "EdTech · корп. обучение", en: "EdTech · corporate learning" },
    title: {
      ru: "Academy-бот: онбординг и проверка знаний",
      en: "Academy bot: onboarding and knowledge checks",
    },
    summary: {
      ru: "Микро-уроки, квизы и сертификаты в Telegram — HR видит прогресс по отделам.",
      en: "Micro-lessons, quizzes, and certs in Telegram — HR tracks progress by team.",
    },
    metric: {
      value: "−10 дн",
      label: { ru: "до выхода на задачи", en: "to first tasks" },
    },
    stack: ["LMS", "Telegram", "Quiz", "Analytics"],
    image: caseImage("onboarding-academy"),
    accent: "cyan",
  },
  {
    id: "mcp-dev-team",
    industry: { ru: "DevTools · продуктовая команда", en: "DevTools · product team" },
    title: {
      ru: "MCP-сервер для внутренних API и документации",
      en: "MCP server for internal APIs and docs",
    },
    summary: {
      ru: "Разработчики вызывают корпоративные сервисы из Cursor и Claude Desktop без переключения контекста.",
      en: "Developers call corporate services from Cursor and Claude Desktop without context switching.",
    },
    metric: {
      value: "−26%",
      label: { ru: "рутины в dev support", en: "dev support routine" },
    },
    stack: ["MCP", "FastAPI", "OpenAPI", "Cursor"],
    image: caseImage("mcp-dev-team"),
    accent: "teal",
  },
  {
    id: "marketplace-reports",
    industry: { ru: "Marketplace · селлер", en: "Marketplace · seller" },
    title: {
      ru: "Автоотчёты по Ozon и Wildberries",
      en: "Automated Ozon and Wildberries reports",
    },
    summary: {
      ru: "Ежедневная сводка по SKU, марже и остаткам уходит в Telegram и Google Sheets без ручной выгрузки.",
      en: "Daily SKU, margin, and stock summaries go to Telegram and Sheets without manual exports.",
    },
    metric: {
      value: "−3 ч",
      label: { ru: "аналитики / нед", en: "analytics / week" },
    },
    stack: ["Python", "API", "Sheets", "Telegram"],
    image: caseImage("marketplace-reports"),
    accent: "violet",
  },
  {
    id: "telegram-faq",
    industry: { ru: "B2B · мессенджер", en: "B2B · messenger" },
    title: {
      ru: "Автоответы в Telegram",
      en: "Telegram auto-replies",
    },
    summary: {
      ru: "Бот закрывает FAQ и типовые вопросы, сложные диалоги передаёт менеджеру с полным контекстом.",
      en: "The bot handles FAQs and routine questions; complex chats reach a manager with full context.",
    },
    metric: {
      value: "~52%",
      label: { ru: "типовых диалогов", en: "routine chats" },
    },
    stack: ["Telegram", "LLM", "n8n", "CRM"],
    image: caseImage("telegram-faq"),
    accent: "cyan",
  },
  {
    id: "competitor-radar",
    industry: { ru: "Retail · e-commerce", en: "Retail · e-commerce" },
    title: {
      ru: "Радар цен и ассортимента конкурентов",
      en: "Competitor pricing and assortment radar",
    },
    summary: {
      ru: "Парсинг витрин + LLM-сводка изменений: что подняли, что сняли, где просели по цене.",
      en: "Storefront scraping plus LLM change digest: price hikes, delistings, and gaps.",
    },
    metric: {
      value: "~65",
      label: { ru: "SKU в мониторинге", en: "SKUs monitored" },
    },
    stack: ["Scraping", "LLM", "PostgreSQL", "Metabase"],
    image: caseImage("competitor-radar"),
    accent: "amber",
  },
  {
    id: "product-copy-ai",
    industry: { ru: "E-commerce · контент", en: "E-commerce · content" },
    title: {
      ru: "AI-копирайт карточек товаров под маркетплейсы",
      en: "AI product copy for marketplaces",
    },
    summary: {
      ru: "Бриф + характеристики → заголовок, буллеты и SEO-блок с учётом правил площадки.",
      en: "Brief plus specs become titles, bullets, and SEO blocks per marketplace rules.",
    },
    metric: {
      value: "×2,5",
      label: { ru: "быстрее публикация", en: "faster publishing" },
    },
    stack: ["LLM", "Templates", "Sheets", "Review"],
    image: caseImage("product-copy-ai"),
    accent: "rose",
  },
  {
    id: "1c-telegram-alerts",
    industry: { ru: "ERP · производство", en: "ERP · manufacturing" },
    title: {
      ru: "1C → Telegram: алерты по заказам и складу",
      en: "1C to Telegram: order and warehouse alerts",
    },
    summary: {
      ru: "Критичные события из 1C мгновенно уходят ответственным в Telegram с ссылкой на документ.",
      en: "Critical 1C events instantly reach owners in Telegram with a document link.",
    },
    metric: {
      value: "2–4 мин",
      label: { ru: "от события до алерта", en: "event to alert" },
    },
    stack: ["1C", "REST", "n8n", "Telegram"],
    image: caseImage("1c-telegram-alerts"),
    accent: "teal",
  },
  {
    id: "client-knowledge-bot",
    industry: { ru: "Consulting · B2B клиент", en: "Consulting · B2B client" },
    title: {
      ru: "Чат-бот на базе знаний клиента под NDA",
      en: "NDA client knowledge chatbot",
    },
    summary: {
      ru: "Загрузили регламенты и FAQ — команда клиента задаёт вопросы в web-чате с цитатами из источников.",
      en: "Uploaded policies and FAQs — client team queries a web chat with source citations.",
    },
    metric: {
      value: "−32%",
      label: { ru: "повторных вопросов", en: "repeat questions" },
    },
    stack: ["RAG", "Private LLM", "PDF", "Web UI"],
    image: caseImage("client-knowledge-bot"),
    accent: "violet",
  },
];
