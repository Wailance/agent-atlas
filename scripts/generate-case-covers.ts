import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { CASE_STUDIES, type CaseStudy } from "../lib/cases";

const OUT_DIR = join(process.cwd(), "public", "cases");

const ACCENT_GRADIENTS: Record<
  CaseStudy["accent"],
  { from: string; to: string; glow: string; icon: string }
> = {
  teal: { from: "#0f766e", to: "#042f2e", glow: "#2dd4bf", icon: "#ccfbf1" },
  violet: { from: "#6d28d9", to: "#2e1065", glow: "#a78bfa", icon: "#ede9fe" },
  amber: { from: "#b45309", to: "#451a03", glow: "#fbbf24", icon: "#fef3c7" },
  rose: { from: "#be123c", to: "#4c0519", glow: "#fb7185", icon: "#ffe4e6" },
  cyan: { from: "#0891b2", to: "#083344", glow: "#22d3ee", icon: "#cffafe" },
};

const ILLUSTRATIONS: Record<string, string> = {
  "enterprise-rag": `
    <rect x="0" y="24" width="88" height="112" rx="10" fill="currentColor" opacity="0.18"/>
    <rect x="18" y="8" width="88" height="112" rx="10" fill="currentColor" opacity="0.28"/>
    <rect x="36" y="0" width="88" height="112" rx="10" fill="currentColor" opacity="0.42"/>
    <circle cx="170" cy="118" r="34" fill="none" stroke="currentColor" stroke-width="8" opacity="0.85"/>
    <line x1="194" y1="142" x2="228" y2="176" stroke="currentColor" stroke-width="8" stroke-linecap="round" opacity="0.85"/>
    <rect x="228" y="168" width="72" height="48" rx="12" fill="currentColor" opacity="0.35"/>
    <line x1="244" y1="188" x2="284" y2="188" stroke="#042f2e" stroke-width="4" stroke-linecap="round"/>
    <line x1="244" y1="204" x2="268" y2="204" stroke="#042f2e" stroke-width="4" stroke-linecap="round"/>
  `,
  "voice-clinic": `
    <rect x="20" y="20" width="120" height="200" rx="28" fill="currentColor" opacity="0.25"/>
    <circle cx="80" cy="176" r="10" fill="currentColor" opacity="0.5"/>
    <path d="M48 52h64v88H48z" fill="currentColor" opacity="0.45"/>
    <path d="M170 70c18 14 28 34 28 58s-10 44-28 58" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" opacity="0.8"/>
    <path d="M198 48c28 22 44 54 44 88s-16 66-44 88" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" opacity="0.55"/>
    <path d="M226 26c38 30 60 74 60 122s-22 92-60 122" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" opacity="0.35"/>
  `,
  "sales-agents": `
    <path d="M40 20 L160 20 L120 92 L80 92 Z" fill="currentColor" opacity="0.35"/>
    <path d="M62 92 L138 92 L108 164 L92 164 Z" fill="currentColor" opacity="0.5"/>
    <path d="M84 164 L116 164 L100 236 L100 236 Z" fill="currentColor" opacity="0.75"/>
    <circle cx="100" cy="252" r="10" fill="currentColor"/>
    <path d="M188 40h56v24h-56zM188 88h56v24h-56zM188 136h56v24h-56z" fill="currentColor" opacity="0.45"/>
    <path d="M260 52l24 12-24 12v-24z" fill="currentColor" opacity="0.8"/>
    <path d="M260 100l24 12-24 12v-24z" fill="currentColor" opacity="0.8"/>
    <path d="M260 148l24 12-24 12v-24z" fill="currentColor" opacity="0.8"/>
  `,
  "logistics-ocr": `
    <rect x="24" y="36" width="160" height="200" rx="12" fill="currentColor" opacity="0.25"/>
    <line x1="48" y1="76" x2="160" y2="76" stroke="currentColor" stroke-width="6" opacity="0.7"/>
    <line x1="48" y1="108" x2="136" y2="108" stroke="currentColor" stroke-width="6" opacity="0.55"/>
    <line x1="48" y1="140" x2="152" y2="140" stroke="currentColor" stroke-width="6" opacity="0.55"/>
    <rect x="12" y="20" width="184" height="232" rx="8" fill="none" stroke="currentColor" stroke-width="6" opacity="0.85"/>
    <path d="M12 20 L196 236 M196 20 L12 236" stroke="currentColor" stroke-width="4" opacity="0.35"/>
    <rect x="208" y="156" width="72" height="56" rx="8" fill="currentColor" opacity="0.45"/>
    <path d="M224 184h40M224 200h28" stroke="#451a03" stroke-width="4" stroke-linecap="round"/>
  `,
  "legal-ma": `
    <rect x="28" y="48" width="132" height="176" rx="10" fill="currentColor" opacity="0.28"/>
    <line x1="52" y1="88" x2="136" y2="88" stroke="currentColor" stroke-width="5" opacity="0.65"/>
    <line x1="52" y1="118" x2="120" y2="118" stroke="currentColor" stroke-width="5" opacity="0.5"/>
    <rect x="72" y="148" width="44" height="16" rx="4" fill="currentColor" opacity="0.75"/>
    <path d="M196 40 L196 220 M176 40 L216 40" stroke="currentColor" stroke-width="10" stroke-linecap="round" opacity="0.85"/>
    <path d="M156 220 L236 220" stroke="currentColor" stroke-width="10" stroke-linecap="round" opacity="0.85"/>
    <circle cx="196" cy="130" r="28" fill="none" stroke="currentColor" stroke-width="6" opacity="0.55"/>
  `,
  "ecom-telegram": `
    <path d="M48 56h112v136H48z" fill="currentColor" opacity="0.25"/>
    <path d="M72 88h64v16H72zM72 120h48v16H72z" fill="currentColor" opacity="0.45"/>
    <path d="M88 168c0 16 12 28 28 28h16l20 20v-20c16 0 28-12 28-28V96H88v72z" fill="currentColor" opacity="0.55"/>
    <path d="M196 52 L244 76 L196 100 L208 76 Z" fill="currentColor" opacity="0.85"/>
    <path d="M176 108 L260 148 L176 188 L192 148 Z" fill="currentColor" opacity="0.45"/>
  `,
  "hr-screening": `
    <rect x="24" y="32" width="96" height="128" rx="8" fill="currentColor" opacity="0.3"/>
    <circle cx="72" cy="68" r="18" fill="currentColor" opacity="0.55"/>
    <rect x="48" y="96" width="48" height="8" rx="4" fill="currentColor" opacity="0.45"/>
    <rect x="136" y="48" width="96" height="128" rx="8" fill="currentColor" opacity="0.22"/>
    <circle cx="184" cy="84" r="18" fill="currentColor" opacity="0.4"/>
    <path d="M160 148 L208 148 L184 176 Z" fill="currentColor" opacity="0.65"/>
    <path d="M228 72 L252 96 L228 120 L236 96 Z" fill="currentColor" opacity="0.85"/>
  `,
  "predictive-factory": `
    <circle cx="88" cy="120" r="52" fill="none" stroke="currentColor" stroke-width="10" opacity="0.55"/>
    <circle cx="88" cy="120" r="16" fill="currentColor" opacity="0.75"/>
    <rect x="72" y="104" width="32" height="32" rx="4" fill="currentColor" opacity="0.35"/>
    <path d="M168 200 L168 88 L248 120 L168 152 Z" fill="currentColor" opacity="0.45"/>
    <path d="M184 56 L216 56 L200 92 Z" fill="currentColor" opacity="0.85"/>
    <path d="M168 208 L248 208" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity="0.5"/>
  `,
  "fintech-compliance": `
    <path d="M120 40 L200 40 L200 200 L120 200 Z" fill="currentColor" opacity="0.22"/>
    <path d="M136 72h64M136 104h48M136 136h56" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity="0.55"/>
    <path d="M228 68 L228 188 L188 188 L228 148 L268 188 L228 188" fill="none" stroke="currentColor" stroke-width="8" stroke-linejoin="round" opacity="0.85"/>
    <circle cx="228" cy="108" r="52" fill="none" stroke="currentColor" stroke-width="6" opacity="0.35"/>
  `,
  "slack-knowledge": `
    <rect x="32" y="56" width="120" height="152" rx="12" fill="currentColor" opacity="0.28"/>
    <path d="M56 96h72M56 128h56M56 160h64" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity="0.55"/>
    <path d="M184 48h48v48h-48z" fill="currentColor" opacity="0.45"/>
    <path d="M232 48h48v48h-48z" fill="currentColor" opacity="0.35"/>
    <path d="M184 96h48v48h-48z" fill="currentColor" opacity="0.75"/>
    <path d="M232 96h48v48h-48z" fill="currentColor" opacity="0.35"/>
  `,
  "crm-proposals": `
    <rect x="36" y="40" width="128" height="168" rx="10" fill="currentColor" opacity="0.28"/>
    <path d="M60 80h80M60 112h64M60 144h72" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity="0.55"/>
    <rect x="184" y="72" width="88" height="112" rx="8" fill="currentColor" opacity="0.45"/>
    <text x="206" y="140" fill="#2e1065" font-size="42" font-weight="700">PDF</text>
    <circle cx="228" cy="48" r="16" fill="currentColor" opacity="0.85"/>
  `,
  "meeting-intel": `
    <rect x="48" y="64" width="144" height="96" rx="12" fill="currentColor" opacity="0.35"/>
    <polygon points="88,112 88,144 120,128" fill="#083344"/>
    <rect x="208" y="48" width="56" height="56" rx="8" fill="currentColor" opacity="0.45"/>
    <path d="M208 128h16M208 152h28M208 176h20" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity="0.75"/>
    <path d="M248 128l16 8-16 8v-16z" fill="currentColor" opacity="0.85"/>
  `,
  "rfp-procurement": `
    <rect x="40" y="32" width="112" height="152" rx="10" fill="currentColor" opacity="0.28"/>
    <rect x="64" y="16" width="64" height="24" rx="6" fill="currentColor" opacity="0.55"/>
    <rect x="184" y="72" width="24" height="96" rx="4" fill="currentColor" opacity="0.45"/>
    <rect x="216" y="48" width="24" height="120" rx="4" fill="currentColor" opacity="0.65"/>
    <rect x="248" y="96" width="24" height="72" rx="4" fill="currentColor" opacity="0.85"/>
  `,
  "churn-radar": `
    <circle cx="120" cy="120" r="72" fill="none" stroke="currentColor" stroke-width="8" opacity="0.35"/>
    <circle cx="120" cy="120" r="48" fill="none" stroke="currentColor" stroke-width="6" opacity="0.45"/>
    <circle cx="120" cy="120" r="24" fill="none" stroke="currentColor" stroke-width="4" opacity="0.65"/>
    <line x1="120" y1="120" x2="176" y2="72" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity="0.85"/>
    <path d="M184 160 L216 128 L248 176 L280 144" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>
  `,
  "vision-qa": `
    <rect x="48" y="72" width="112" height="88" rx="8" fill="currentColor" opacity="0.35"/>
    <path d="M64 160 L144 160 L120 208 L88 208 Z" fill="currentColor" opacity="0.55"/>
    <circle cx="104" cy="112" r="24" fill="none" stroke="currentColor" stroke-width="6" opacity="0.75"/>
    <circle cx="104" cy="112" r="8" fill="currentColor"/>
    <path d="M184 88 L248 88 L248 152 L184 152 Z" fill="currentColor" opacity="0.28"/>
    <path d="M200 104 L232 136 M232 104 L200 136" stroke="currentColor" stroke-width="8" stroke-linecap="round" opacity="0.85"/>
  `,
  "med-reports": `
    <rect x="40" y="48" width="120" height="160" rx="10" fill="currentColor" opacity="0.28"/>
    <path d="M88 72v48M64 96h48" stroke="currentColor" stroke-width="10" stroke-linecap="round" opacity="0.75"/>
    <rect x="184" y="56" width="96" height="128" rx="8" fill="currentColor" opacity="0.4"/>
    <path d="M200 96h64M200 128h48M200 160h56" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity="0.65"/>
  `,
  "content-factory": `
    <rect x="32" y="40" width="88" height="112" rx="8" fill="currentColor" opacity="0.28"/>
    <rect x="56" y="64" width="88" height="112" rx="8" fill="currentColor" opacity="0.4"/>
    <rect x="80" y="88" width="88" height="112" rx="8" fill="currentColor" opacity="0.55"/>
    <path d="M200 56h64v16h-64zM200 96h48v16h-48zM200 136h56v16h-56z" stroke="currentColor" stroke-width="8" stroke-linecap="round" opacity="0.75"/>
    <path d="M184 176 L248 176 L216 208 Z" fill="currentColor" opacity="0.85"/>
  `,
  "support-l1": `
    <path d="M72 88c0-28 24-48 52-48h16c28 0 52 20 52 48v32H72V88z" fill="currentColor" opacity="0.45"/>
    <rect x="56" y="120" width="112" height="24" rx="12" fill="currentColor" opacity="0.65"/>
    <rect x="184" y="56" width="96" height="72" rx="10" fill="currentColor" opacity="0.35"/>
    <path d="M200 88h64M200 112h40" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity="0.75"/>
    <circle cx="232" cy="168" r="28" fill="currentColor" opacity="0.85"/>
    <path d="M224 168h16M232 160v16" stroke="#451a03" stroke-width="4" stroke-linecap="round"/>
  `,
  "real-estate-leads": `
    <rect x="88" y="72" width="64" height="128" fill="currentColor" opacity="0.35"/>
    <rect x="56" y="104" width="48" height="96" fill="currentColor" opacity="0.28"/>
    <rect x="136" y="96" width="56" height="104" fill="currentColor" opacity="0.45"/>
    <path d="M48 200h176" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity="0.55"/>
    <path d="M216 56c24 0 44 20 44 44 0 32-44 72-44 72s-44-40-44-72c0-24 20-44 44-44z" fill="currentColor" opacity="0.85"/>
    <circle cx="216" cy="100" r="12" fill="#4c0519"/>
  `,
  "onboarding-academy": `
    <path d="M48 96 L152 48 L256 96 L152 144 Z" fill="currentColor" opacity="0.45"/>
    <rect x="120" y="144" width="64" height="72" fill="currentColor" opacity="0.35"/>
    <rect x="184" y="168" width="88" height="64" rx="12" fill="currentColor" opacity="0.55"/>
    <path d="M200 192h56M200 212h40" stroke="#083344" stroke-width="4" stroke-linecap="round"/>
    <circle cx="72" cy="192" r="20" fill="currentColor" opacity="0.75"/>
  `,
  "mcp-dev-team": `
    <rect x="32" y="48" width="176" height="128" rx="12" fill="currentColor" opacity="0.28"/>
    <path d="M48 80h144M48 112h96M48 144h112" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity="0.55"/>
    <path d="M232 72 L272 96 L232 120 V72Z" fill="currentColor" opacity="0.75"/>
    <rect x="224" y="136" width="56" height="40" rx="8" fill="currentColor" opacity="0.45"/>
    <path d="M236 156h32" stroke="#042f2e" stroke-width="4" stroke-linecap="round"/>
  `,
  "marketplace-reports": `
    <rect x="48" y="128" width="28" height="72" rx="4" fill="currentColor" opacity="0.45"/>
    <rect x="88" y="96" width="28" height="104" rx="4" fill="currentColor" opacity="0.65"/>
    <rect x="128" y="64" width="28" height="136" rx="4" fill="currentColor" opacity="0.85"/>
    <path d="M184 88h72v72h-72z" fill="currentColor" opacity="0.35"/>
    <path d="M196 104h20l12 12-20 20-12-12z" fill="currentColor" opacity="0.75"/>
    <circle cx="220" cy="176" r="16" fill="currentColor" opacity="0.55"/>
  `,
  "delivery-whatsapp": `
    <rect x="40" y="96" width="112" height="72" rx="8" fill="currentColor" opacity="0.35"/>
    <circle cx="56" cy="168" r="16" fill="currentColor" opacity="0.55"/>
    <circle cx="136" cy="168" r="16" fill="currentColor" opacity="0.55"/>
    <path d="M184 56 L248 88 L184 120 L200 88 Z" fill="currentColor" opacity="0.85"/>
    <rect x="168" y="136" width="96" height="64" rx="12" fill="currentColor" opacity="0.4"/>
    <path d="M184 160h64M184 180h40" stroke="#083344" stroke-width="4" stroke-linecap="round"/>
  `,
  "competitor-radar": `
    <circle cx="104" cy="120" r="56" fill="none" stroke="currentColor" stroke-width="8" opacity="0.45"/>
    <circle cx="104" cy="120" r="8" fill="currentColor" opacity="0.85"/>
    <path d="M104 64 L104 24 M104 176 L104 216 M48 120 L8 120 M160 120 L200 120" stroke="currentColor" stroke-width="4" opacity="0.35"/>
    <rect x="184" y="72" width="56" height="32" rx="6" fill="currentColor" opacity="0.55"/>
    <rect x="184" y="120" width="72" height="32" rx="6" fill="currentColor" opacity="0.75"/>
    <text x="196" y="94" fill="#451a03" font-size="16" font-weight="700">-12%</text>
  `,
  "product-copy-ai": `
    <rect x="48" y="72" width="96" height="96" rx="8" fill="currentColor" opacity="0.35"/>
    <path d="M64 96h64M64 120h48M64 144h56" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity="0.55"/>
    <rect x="168" y="48" width="112" height="144" rx="10" fill="currentColor" opacity="0.28"/>
    <path d="M184 80h80M184 108h56M184 136h72M184 164h40" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity="0.75"/>
    <path d="M248 176 L272 188 L248 200 L256 188 Z" fill="currentColor" opacity="0.85"/>
  `,
  "1c-telegram-alerts": `
    <ellipse cx="88" cy="176" rx="48" ry="16" fill="currentColor" opacity="0.35"/>
    <rect x="40" y="72" width="96" height="104" rx="8" fill="currentColor" opacity="0.45"/>
    <path d="M64 96h48M64 120h32" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity="0.65"/>
    <path d="M184 56c24 0 44 16 44 36v56c0 20-20 36-44 36h-8l-20 20v-20h-16c-24 0-44-16-44-36V92c0-20 20-36 44-36h44z" fill="currentColor" opacity="0.75"/>
    <circle cx="216" cy="88" r="12" fill="#4c0519"/>
  `,
  "client-knowledge-bot": `
    <rect x="40" y="56" width="120" height="144" rx="12" fill="currentColor" opacity="0.28"/>
    <path d="M64 96h72M64 128h56M64 160h64" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity="0.55"/>
    <path d="M200 72 L248 72 L264 120 L200 120 Z" fill="currentColor" opacity="0.45"/>
    <rect x="200" y="136" width="80" height="64" rx="12" fill="currentColor" opacity="0.65"/>
    <path d="M216 160h48M216 180h32" stroke="#2e1065" stroke-width="4" stroke-linecap="round"/>
    <circle cx="240" cy="104" r="10" fill="currentColor" opacity="0.85"/>
  `,
};

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function coverSvg(caseStudy: CaseStudy): string {
  const palette = ACCENT_GRADIENTS[caseStudy.accent];
  const uid = caseStudy.id.replace(/[^a-z0-9-]/gi, "");
  const illustration =
    ILLUSTRATIONS[caseStudy.id] ??
    `<circle cx="160" cy="120" r="72" fill="currentColor" opacity="0.35"/>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540" role="img" aria-label="${escapeXml(caseStudy.title.en)}">
  <defs>
    <linearGradient id="bg-${uid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.from}"/>
      <stop offset="100%" stop-color="${palette.to}"/>
    </linearGradient>
    <radialGradient id="orb-${uid}" cx="30%" cy="20%" r="70%">
      <stop offset="0%" stop-color="${palette.glow}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${palette.glow}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid-${uid}" width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#ffffff" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="960" height="540" fill="url(#bg-${uid})"/>
  <rect width="960" height="540" fill="url(#grid-${uid})"/>
  <rect width="960" height="540" fill="url(#orb-${uid})"/>
  <g transform="translate(560 130) scale(1.15)" fill="${palette.icon}" color="${palette.icon}">
    ${illustration}
  </g>
  <rect x="0" y="420" width="960" height="120" fill="#09090b" fill-opacity="0.25"/>
</svg>`;
}

mkdirSync(OUT_DIR, { recursive: true });

for (const caseStudy of CASE_STUDIES) {
  const path = join(OUT_DIR, `${caseStudy.id}.svg`);
  writeFileSync(path, coverSvg(caseStudy), "utf8");
}

console.log(`Generated ${CASE_STUDIES.length} case covers in ${OUT_DIR}`);
