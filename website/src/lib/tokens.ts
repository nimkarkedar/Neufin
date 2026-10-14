// Turns the design system tokens (designsystem/src/brand/tokens.js) into the
// :root CSS rendered in <head>. Edit values in the design system, not here.
import { allTokens, breakpoints, fonts, layout, typeScale } from "@ds/brand/tokens.js";
import { STRIPE_SLOPE } from "@ds/components/Stripe.jsx";

export const TABLET_MIN = breakpoints.tablet;
export const DESKTOP_MIN = breakpoints.desktop;

const block = (vars: Record<string, string>) =>
  Object.entries(vars)
    .map(([k, v]) => `${k}:${v};`)
    .join("");

// Mobile first: the base values are for phones; tablet and desktop override them.
// fontVars are the CSS variables next/font creates for the self-hosted files.
export function tokensCss(fontVars: { display: string; body: string; mono: string }) {
  const base: Record<string, string> = {
    ...allTokens(),
    "--font-display": `var(${fontVars.display}), ${fonts.display.stack}`,
    "--font-body": `var(${fontVars.body}), ${fonts.body.stack}`,
    "--font-mono": `var(${fontVars.mono}), ${fonts.mono.stack}`,
    "--grid-margin": `${layout.margin.phone}px`,
    // The Stripe's angle as rise over run, for CSS that draws its edge.
    "--stripe-slope": String(STRIPE_SLOPE),
  };
  const tablet: Record<string, string> = { "--grid-margin": `${layout.margin.tablet}px` };
  const desktop: Record<string, string> = { "--grid-margin": `${layout.margin.desktop}px` };

  // Type styles with a phone size use it below the desktop breakpoint.
  for (const s of typeScale) {
    if (s.mobile) {
      base[`--text-${s.token}-size`] = `${s.mobile}px`;
      desktop[`--text-${s.token}-size`] = `${s.size}px`;
    }
  }

  return [
    `:root{${block(base)}}`,
    `@media (min-width:${breakpoints.tablet}px){:root{${block(tablet)}}}`,
    `@media (min-width:${breakpoints.desktop}px){:root{${block(desktop)}}}`,
  ].join("");
}
