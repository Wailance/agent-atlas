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

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=960&h=540&q=80`;

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "enterprise-rag",
    industry: { ru: "Retail · 40k документов", en: "Retail · 40k documents" },
    title: {
      ru: "Корпоративный RAG поверх Confluence и SharePoint",
      en: "Enterprise RAG over Confluence and SharePoint",
    },
    summary: {
      ru: "Индексация регламентов, прайсов и инструкций. Сотрудники ищут ответы в Slack-боте с цитатами из источника.",
      en: "Indexed policies, price lists, and SOPs. Employees query a Slack bot with source citations.",
    },
    metric: {
      value: "12 сек",
      label: { ru: "вместо 3 мин поиска", en: "down from 3 min search" },
    },
    stack: ["RAG", "Qdrant", "LangChain", "Slack"],
    image: unsplash("photo-1551288049-bebda4e38f71"),
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
      value: "800+",
      label: { ru: "звонков в день", en: "calls per day" },
    },
    stack: ["Voice AI", "Twilio", "n8n", "CRM"],
    image: unsplash("photo-1576091160399-112ba8d25d1f"),
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
      value: "+28%",
      label: { ru: "SQL → demo", en: "SQL → demo" },
    },
    stack: ["Agents", "HubSpot", "OpenAI", "n8n"],
    image: unsplash("photo-1460925895917-afdab827c52f"),
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
      value: "15k",
      label: { ru: "документов / мес", en: "docs / month" },
    },
    stack: ["OCR", "Python", "PostgreSQL", "1C API"],
    image: unsplash("photo-1586528116311-ad8dd3c8310d"),
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
      value: "15 мин",
      label: { ru: "первичный review", en: "initial review" },
    },
    stack: ["RAG", "Claude", "PDF", "Notion"],
    image: unsplash("photo-1589829545856-d10d557cf95f"),
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
      value: "+18%",
      label: { ru: "recovery корзин", en: "cart recovery" },
    },
    stack: ["Telegram", "Retail CRM", "LLM", "Webhooks"],
    image: unsplash("photo-1472851294608-062f824d29cc"),
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
      value: "1200",
      label: { ru: "CV / неделя", en: "CVs / week" },
    },
    stack: ["HRIS", "Embeddings", "Email", "Sheets"],
    image: unsplash("photo-1521737711867-e3b97375f590"),
    accent: "teal",
  },
  {
    id: "predictive-factory",
    industry: { ru: "Manufacturing · завод", en: "Manufacturing · plant floor" },
    title: {
      ru: "Predictive maintenance по телеметрии станков",
      en: "Predictive maintenance from machine telemetry",
    },
    summary: {
      ru: "Аномалии вибрации и температуры → алерт мастеру до простоя линии.",
      en: "Vibration and temperature anomalies alert supervisors before line downtime.",
    },
    metric: {
      value: "−37%",
      label: { ru: "внеплановые простои", en: "unplanned downtime" },
    },
    stack: ["IoT", "TimescaleDB", "Grafana", "Alerts"],
    image: unsplash("photo-1581091226825-a6a2a5aee158"),
    accent: "amber",
  },
  {
    id: "fintech-compliance",
    industry: { ru: "FinTech · compliance", en: "FinTech · compliance" },
    title: {
      ru: "Мониторинг транзакций и regulatory alerts",
      en: "Transaction monitoring and regulatory alerts",
    },
    summary: {
      ru: "LLM + rules engine: новые паттерны в ленте операций, авто-draft для compliance-офицера.",
      en: "LLM plus rules engine flags new patterns and drafts notes for compliance officers.",
    },
    metric: {
      value: "4×",
      label: { ru: "быстрее triage", en: "faster triage" },
    },
    stack: ["Rules", "LLM", "Kafka", "Audit log"],
    image: unsplash("photo-1611974789855-9c784a0eeed7"),
    accent: "rose",
  },
  {
    id: "slack-knowledge",
    industry: { ru: "Enterprise · 200+ сотрудников", en: "Enterprise · 200+ employees" },
    title: {
      ru: "Slack-бот внутренних знаний и onboarding",
      en: "Slack internal knowledge and onboarding bot",
    },
    summary: {
      ru: "Wiki, Notion и Google Drive в одном ответе. Новый сотрудник не теряется в первую неделю.",
      en: "Wiki, Notion, and Drive in one answer. New hires stop getting lost in week one.",
    },
    metric: {
      value: "5×",
      label: { ru: "быстрее поиск", en: "faster search" },
    },
    stack: ["RAG", "Slack", "Notion API", "Drive"],
    image: unsplash("photo-1600880292203-757bb62b4baf"),
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
      value: "3ч → 20м",
      label: { ru: "на одно КП", en: "per proposal" },
    },
    stack: ["CRM", "Templates", "LLM", "PDF"],
    image: unsplash("photo-1556761175-5973dc0f32e7"),
    accent: "violet",
  },
  {
    id: "meeting-intel",
    industry: { ru: "Remote · product-команда", en: "Remote · product team" },
    title: {
      ru: "Meeting intelligence: 50+ созвонов в неделю",
      en: "Meeting intelligence: 50+ calls per week",
    },
    summary: {
      ru: "Транскрипт, решения, owners и задачи в Jira — без «кто что обещал на созвоне».",
      en: "Transcripts, decisions, owners, and Jira tasks — no more «who promised what».",
    },
    metric: {
      value: "−6ч",
      label: { ru: "ручных notes / нед", en: "manual notes / week" },
    },
    stack: ["Whisper", "Zoom", "Jira", "Notion"],
    image: unsplash("photo-1517245386807-bb43f82c33c4"),
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
      value: "−70%",
      label: { ru: "время на разбор", en: "analysis time" },
    },
    stack: ["PDF", "Excel", "LLM", "Sheets"],
    image: unsplash("photo-1454165804606-c3d57bc86b40"),
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
      value: "−22%",
      label: { ru: "churn за квартал", en: "quarterly churn" },
    },
    stack: ["Product analytics", "LLM", "CRM", "Slack"],
    image: unsplash("photo-1543286386-713bdd548375"),
    accent: "rose",
  },
  {
    id: "vision-qa",
    industry: { ru: "Manufacturing · QC линия", en: "Manufacturing · QC line" },
    title: {
      ru: "Computer vision QA на конвейере",
      en: "Computer vision QA on the assembly line",
    },
    summary: {
      ru: "Дефекты упаковки и маркировки ловятся на линии, брак уходит в quarantine автоматически.",
      en: "Packaging and label defects caught inline; rejects routed to quarantine automatically.",
    },
    metric: {
      value: "99.1%",
      label: { ru: "precision дефектов", en: "defect precision" },
    },
    stack: ["CV", "Edge", "Python", "MES"],
    image: unsplash("photo-1565514020169-026b8b86f7f7"),
    accent: "cyan",
  },
  {
    id: "med-reports",
    industry: { ru: "Healthcare · диагностика", en: "Healthcare · diagnostics" },
    title: {
      ru: "Структурирование медицинских отчётов",
      en: "Medical report structuring pipeline",
    },
    summary: {
      ru: "PDF заключений → поля для MIS: диагноз, рекомендации, контрольные сроки.",
      en: "PDF conclusions become MIS fields: diagnosis, recommendations, follow-up dates.",
    },
    metric: {
      value: "−55%",
      label: { ru: "ручной ввод", en: "manual entry" },
    },
    stack: ["OCR", "HL7", "Python", "Review UI"],
    image: unsplash("photo-1579684385127-1ef15a5088d2"),
    accent: "teal",
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
      value: "30",
      label: { ru: "единиц / неделя", en: "assets / week" },
    },
    stack: ["Brand KB", "LLM", "Buffer", "Notion"],
    image: unsplash("photo-1432888622747-4eb4546a0d9a"),
    accent: "violet",
  },
  {
    id: "support-l1",
    industry: { ru: "Support · SaaS 10k+ users", en: "Support · SaaS 10k+ users" },
    title: {
      ru: "L1 deflection: база знаний + agent handoff",
      en: "L1 deflection: knowledge base plus agent handoff",
    },
    summary: {
      ru: "Типовые тикеты закрываются ботом с логами; сложное уходит оператору с полным контекстом.",
      en: "Routine tickets close with logs; complex ones reach agents with full context.",
    },
    metric: {
      value: "62%",
      label: { ru: "deflection L1", en: "L1 deflection" },
    },
    stack: ["Zendesk", "RAG", "LLM", "Macros"],
    image: unsplash("photo-1521791136064-7986c2920216"),
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
      value: "+34%",
      label: { ru: "конверсия в показ", en: "viewing conversion" },
    },
    stack: ["CRM", "Scoring", "Telegram", "Maps API"],
    image: unsplash("photo-1486406146926-c627a92ad1ab"),
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
      value: "−14 дн",
      label: { ru: "time-to-productivity", en: "time-to-productivity" },
    },
    stack: ["LMS", "Telegram", "Quiz", "Analytics"],
    image: unsplash("photo-1522202176988-66273c2fd55f"),
    accent: "cyan",
  },
];
