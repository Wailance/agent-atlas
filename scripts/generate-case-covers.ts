import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { CASE_STUDIES, type CaseStudy } from "../lib/cases";

const OUT_DIR = join(process.cwd(), "public", "cases");

const ACCENT_GRADIENTS: Record<
  CaseStudy["accent"],
  { from: string; to: string; glow: string }
> = {
  teal: { from: "#0f766e", to: "#042f2e", glow: "#2dd4bf" },
  violet: { from: "#6d28d9", to: "#2e1065", glow: "#a78bfa" },
  amber: { from: "#b45309", to: "#451a03", glow: "#fbbf24" },
  rose: { from: "#be123c", to: "#4c0519", glow: "#fb7185" },
  cyan: { from: "#0891b2", to: "#083344", glow: "#22d3ee" },
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
  const seed = caseStudy.id
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const orbX = 680 + (seed % 120);
  const orbY = 80 + (seed % 100);
  const gridOpacity = 0.08 + (seed % 5) * 0.01;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540" role="img" aria-label="${escapeXml(caseStudy.title.en)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.from}"/>
      <stop offset="100%" stop-color="${palette.to}"/>
    </linearGradient>
    <radialGradient id="orb" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${palette.glow}" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="${palette.glow}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#ffffff" stroke-opacity="${gridOpacity}" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="960" height="540" fill="url(#bg)"/>
  <rect width="960" height="540" fill="url(#grid)"/>
  <circle cx="${orbX}" cy="${orbY}" r="210" fill="url(#orb)"/>
  <circle cx="120" cy="420" r="160" fill="${palette.glow}" fill-opacity="0.12"/>
  <circle cx="820" cy="460" r="90" fill="#fafafa" fill-opacity="0.06"/>
</svg>`;
}

mkdirSync(OUT_DIR, { recursive: true });

for (const caseStudy of CASE_STUDIES) {
  const path = join(OUT_DIR, `${caseStudy.id}.svg`);
  writeFileSync(path, coverSvg(caseStudy), "utf8");
}

console.log(`Generated ${CASE_STUDIES.length} case covers in ${OUT_DIR}`);
