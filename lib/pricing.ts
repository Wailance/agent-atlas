export type Pricing = "free" | "freemium" | "paid";

/** Subscription or commercial-first — no meaningful free tier. */
export const PAID_REPOS = new Set([
  "warpdotdev/warp",
]);

/** Open-source with free self-host, paid cloud or enterprise tiers. */
export const FREEMIUM_REPOS = new Set([
  // AI / agents
  "langgenius/dify",
  "langfuse/langfuse",
  "mem0ai/mem0",
  "firecrawl/firecrawl",
  "continuedev/continue",
  "crewaiinc/crewai",
  "openhands/openhands",
  "mastra-ai/mastra",
  "open-webui/open-webui",
  "berriai/litellm",
  "e2b-dev/e2b",
  "portkey-ai/gateway",
  "infiniflow/ragflow",
  "flowiseai/flowise",
  "langflow-ai/langflow",
  "lobehub/lobe-chat",
  "copilotkit/copilotkit",
  "chainlit/chainlit",
  "microsoft/autogen-studio",
  "pipedreamhq/pipedream",
  "arize-ai/phoenix",
  "confident-ai/deepeval",
  "canner/wrenai",
  // Automation
  "n8n-io/n8n",
  "activepieces/activepieces",
  "windmill-labs/windmill",
  "temporalio/temporal",
  "kestra-io/kestra",
  "camunda/camunda",
  "bonitasoft/bonita-engine",
  "automatisch/automatisch",
  // Analytics / BI
  "posthog/posthog",
  "plausible/analytics",
  "matomo-org/matomo",
  "metabase/metabase",
  "grafana/grafana",
  "growthbook/growthbook",
  "signoz/signoz",
  "highlight/highlight",
  "hyperdxio/hyperdx",
  "openobserve/openobserve",
  "lightdash/lightdash",
  "cube-js/cube",
  "evidentlyai/evidently",
  "umami-software/umami",
  "dubinc/dub",
  // CRM / marketing / comms
  "calcom/cal.com",
  "formbricks/formbricks",
  "novuhq/novu",
  "chatwoot/chatwoot",
  "twentyhq/twenty",
  "mautic/mautic",
  "useplunk/plunk",
  "frappe/crm",
  "frappe/helpdesk",
  // PM
  "makeplane/plane",
  "openproject/openproject",
  "leantime/leantime",
  // Finance
  "getlago/lago",
  "ghostfolio/ghostfolio",
  "maybe-finance/maybe",
  "killbill/killbill",
  "akaunting/akaunting",
  "invoiceninja/invoiceninja",
  "bigcapitalhq/bigcapital",
  // Low-code / internal tools
  "appsmithorg/appsmith",
  "tooljet/tooljet",
  "budibase/budibase",
  "illacloud/illa-builder",
  "nocobase/nocobase",
  "builderio/builder",
  "plasmicapp/plasmic",
  "webiny/webiny",
  "refinedev/refine",
  "lowdefy/lowdefy",
  // CMS / headless
  "strapi/strapi",
  "directus/directus",
  "payloadcms/payload",
  "sanity-io/sanity",
  "keystonejs/keystone",
  "tinacms/tinacms",
  // E-commerce
  "medusajs/medusa",
  "saleor/saleor",
  "vendure-ecommerce/vendure",
  "shopware/shopware",
  "magento/magento2",
  // Data / infra platforms
  "supabase/supabase",
  "hasura/graphql-engine",
  "bytebase/bytebase",
  "airbytehq/airbyte",
  "meltano/meltano",
  "cloudquery/cloudquery",
  "steampipe-io/steampipe",
  "clickhouse/clickhouse",
  "questdb/questdb",
  "timescale/timescaledb",
  // API tools
  "hoppscotch/hoppscotch",
  "kong/insomnia",
  "scalar/scalar",
  "kong/kong",
  "tyktechnologies/tyk",
  "apache/apisix",
  // ERP
  "frappe/erpnext",
  "frappe/hrms",
  "odoo/odoo",
  "ever-co/ever-gauzy",
  // Dev platforms
  "jetify-com/devbox",
  "wasp-lang/wasp",
  "reflex-dev/reflex",
]);

export function classifyPricing(repo: string): Pricing {
  const key = repo.toLowerCase();
  if (PAID_REPOS.has(key)) return "paid";
  if (FREEMIUM_REPOS.has(key)) return "freemium";
  return "free";
}

export function isPaidPricing(pricing: Pricing): boolean {
  return pricing === "paid" || pricing === "freemium";
}

export function isFreePricing(pricing: Pricing): boolean {
  return pricing === "free";
}

export function pricingLabel(pricing: Pricing, locale: "ru" | "en"): string {
  const labels: Record<Pricing, { ru: string; en: string }> = {
    free: { ru: "Бесплатный", en: "Free" },
    freemium: { ru: "Freemium", en: "Freemium" },
    paid: { ru: "Платный", en: "Paid" },
  };
  return labels[pricing][locale];
}
