// Turns the design system tokens (designsystem/src/brand/tokens.js) into the
// :root CSS rendered in <head>. Edit values in the design system, not here.
import { allTokens, fonts, typeScale } from "@ds/brand/tokens.js";

// Mobile first: phones get these smaller heading sizes, and the design system's
// own sizes apply from the desktop breakpoint up.
const mobileSizes: Record<string, number> = {
  display: 44,
  h1: 36,
  h2: 28,
  h3: 20,
  "body-l": 18,
};

export const DESKTOP_MIN = 1024;

const block = (vars: Record<string, string>) =>
  Object.entries(vars)
    .map(([k, v]) => `${k}:${v};`)
    .join("");

// fontVars are the CSS variables next/font creates for the self-hosted files.
export function tokensCss(fontVars: { display: string; body: string; mono: string }) {
  const base: Record<string, string> = {
    ...allTokens(),
    "--font-display": `var(${fontVars.display}), ${fonts.display.stack}`,
    "--font-body": `var(${fontVars.body}), ${fonts.body.stack}`,
    "--font-mono": `var(${fontVars.mono}), ${fonts.mono.stack}`,
  };
  const desktop: Record<string, string> = {};
  for (const s of typeScale) {
    const mobile = mobileSizes[s.token];
    if (mobile) {
      base[`--text-${s.token}-size`] = `${mobile}px`;
      desktop[`--text-${s.token}-size`] = `${s.size}px`;
    }
  }
  return `:root{${block(base)}}@media (min-width:${DESKTOP_MIN}px){:root{${block(desktop)}}}`;
}
