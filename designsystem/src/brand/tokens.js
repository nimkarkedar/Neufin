// Single source of truth for Neufin brand tokens.
// Every value here is applied as a CSS custom property on :root (see applyTokens)
// and is what the Colour / Typography / Tokens pages render from.

export const violetScale = [
  { step: 900, hex: '#390080' },
  { step: 800, hex: '#5A00C8', alias: 'Deep Violet' },
  { step: 700, hex: '#6800E8' },
  { step: 600, hex: '#7E22FF', alias: 'Electric Violet' },
  { step: 500, hex: '#9754FF' },
  { step: 400, hex: '#B27FFF' },
  { step: 300, hex: '#CAA7FF' },
  { step: 200, hex: '#DFCAFF' },
  { step: 100, hex: '#F0E6FF' },
];

export const coreColours = [
  { name: 'Electric Violet', token: 'electric-violet', hex: '#7E22FF', role: 'Same as Violet 600.' },
  { name: 'Near Black', token: 'near-black', hex: '#19161F' },
  { name: 'Warm White', token: 'warm-white', hex: '#F7F5FA', role: 'Page background on the website.' },
];

// Neutrals for UI: backgrounds, secondary text and lines.
export const neutrals = [
  { name: 'White', token: 'white', hex: '#FFFFFF', role: 'Main navigation, cards, menus and fields on Warm White.' },
  { name: 'Grey 200', token: 'grey-200', hex: '#E6E2EC', role: 'Lines and borders on light.' },
  { name: 'Grey 400', token: 'grey-400', hex: '#9C95A8', role: 'Secondary text on dark.' },
  { name: 'Grey 600', token: 'grey-600', hex: '#5F5A68', role: 'Secondary text on light.' },
  { name: 'Grey 800', token: 'grey-800', hex: '#3A3443', role: 'Chips and active states on dark.' },
  { name: 'Grey 900', token: 'grey-900', hex: '#2A2631', role: 'Lines and hover states on dark.' },
];

export const accentColours = [
  { name: 'Electric Coral', token: 'electric-coral', hex: '#FF5C45' },
  { name: 'Signal Yellow', token: 'signal-yellow', hex: '#FFC83D' },
  { name: 'Energy Mint', token: 'energy-mint', hex: '#00C2A8' },
  { name: 'Clear Blue', token: 'clear-blue', hex: '#2D7FF9' },
];

// Fixed gradients, top to bottom. Tints of the brand colours. Near Black text passes AA on every stop.
export const gradients = [
  { name: 'Violet', token: 'gradient-violet', stops: ['#BDAEF7', '#DACEF8', '#F3EEFC'] },
  { name: 'Dawn', token: 'gradient-dawn', stops: ['#C4B6F5', '#E3D9EC', '#FBEBCB'] },
  { name: 'Daylight', token: 'gradient-daylight', stops: ['#B2CAF5', '#CADEEA', '#CFF0E5'] },
];

export const gradientCss = (g, angle = 180) => `linear-gradient(${angle}deg, ${g.stops[0]} 0%, ${g.stops[1]} 50%, ${g.stops[2]} 100%)`;

export const fonts = {
  display: { name: 'Archivo', stack: "'Archivo', system-ui, -apple-system, 'Segoe UI', Arial, sans-serif", use: 'Titles, headlines and the logotype', fallback: 'the system font (San Francisco on Apple, Segoe UI on Windows)' },
  body: { name: 'IBM Plex Sans', stack: "'IBM Plex Sans', Arial, sans-serif", use: 'Body copy, UI text', fallback: 'Arial' },
  mono: { name: 'IBM Plex Mono', stack: "'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace", fallback: 'the system monospace font', use: 'Numbers in select cases: tables, tariffs, meter readings' },
  fallback: { name: 'Arial', stack: 'Arial, sans-serif', use: 'Fallback. For Windows, system defaults and Office files when the brand fonts are not available, and the only font in the sales deck template, which is shared across machines. Regular 400, Bold 700.' },
};

// Type scale. `size` is desktop px (from the desktop breakpoint up); `mobile` is the
// size below it, where a style steps down on small screens.
export const typeScale = [
  { name: 'Display', token: 'display', font: 'display', size: 72, mobile: 44, lh: 0.95, weight: 800, track: '-0.02em' },
  { name: 'H1', token: 'h1', font: 'display', size: 48, mobile: 36, lh: 1.0, weight: 700, track: '-0.015em' },
  { name: 'H2', token: 'h2', font: 'display', size: 32, mobile: 28, lh: 1.1, weight: 700, track: '-0.01em' },
  { name: 'H3', token: 'h3', font: 'display', size: 22, mobile: 20, lh: 1.2, weight: 700, track: '0' },
  { name: 'Body L', token: 'body-l', font: 'body', size: 20, mobile: 18, lh: 1.5, weight: 400, track: '0' },
  { name: 'Body', token: 'body', font: 'body', size: 16, lh: 1.55, weight: 400, track: '0' },
  { name: 'Small', token: 'small', font: 'body', size: 13, lh: 1.45, weight: 400, track: '0.01em' },
  { name: 'Label', token: 'label', font: 'body', size: 12, lh: 1.3, weight: 600, track: '0' },
];

// Web layout. 12 columns of 88px with 20px gutters on desktop (1276px of content),
// 8 columns on tablets and 4 on phones. Margins are the space either side of the content.
export const breakpoints = { tablet: 768, desktop: 1024, wide: 1280 };
export const layout = {
  maxWidth: 1276,
  gutter: 20,
  columns: { phone: 4, tablet: 8, desktop: 12 },
  margin: { phone: 20, tablet: 32, desktop: 40 },
};

// Corner radii. Pill (999px) is for buttons and fields.
export const radii = { xs: 4, s: 8, m: 12, l: 16, pill: 999 };

// Shadows, drawn in Near Black. Raised: cards and tiles on hover. Overlay: menus and
// popovers that float over the page.
const rgbOf = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(' ');
const ink = rgbOf(coreColours.find((c) => c.token === 'near-black').hex);
export const shadows = {
  raised: `0 1px 2px rgb(${ink} / 0.04), 0 12px 32px -8px rgb(${ink} / 0.16)`,
  overlay: `0 1px 2px rgb(${ink} / 0.04), 0 8px 24px -6px rgb(${ink} / 0.08), 0 32px 64px -16px rgb(${ink} / 0.14)`,
};

// Motion. Most UI changes use `base`; menus opening use `slow` with ease-out.
// `spin` is one full turn of the stamp's ring, slow enough to read the words.
// `draw` is a line or shape drawing itself in once, such as a chart's trend line.
export const motion = {
  easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  fast: '0.15s',
  base: '0.25s',
  slow: '0.4s',
  spin: '16s',
  draw: '1.2s',
};

// Colours that are not Neufin's but appear inside third-party marks only.
export const externalColours = [
  { name: 'WhatsApp green', token: 'whatsapp', hex: '#25D366', role: 'Only inside the WhatsApp mark.' },
];

export function allTokens() {
  const t = {};
  violetScale.forEach((c) => (t[`--violet-${c.step}`] = c.hex));
  [...coreColours, ...accentColours, ...neutrals].forEach((c) => (t[`--${c.token}`] = c.hex));
  gradients.forEach((g) => (t[`--${g.token}`] = gradientCss(g)));
  t['--font-display'] = fonts.display.stack;
  t['--font-body'] = fonts.body.stack;
  t['--font-mono'] = fonts.mono.stack;
  typeScale.forEach((s) => {
    t[`--text-${s.token}-size`] = `${s.size}px`;
    t[`--text-${s.token}-lh`] = String(s.lh);
    t[`--text-${s.token}-weight`] = String(s.weight);
    t[`--text-${s.token}-track`] = s.track;
  });
  t['--grid-max'] = `${layout.maxWidth}px`;
  t['--grid-gutter'] = `${layout.gutter}px`;
  t['--grid-margin'] = `${layout.margin.phone}px`;
  Object.entries(radii).forEach(([k, v]) => (t[`--radius-${k}`] = `${v}px`));
  Object.entries(shadows).forEach(([k, v]) => (t[`--shadow-${k}`] = v));
  t['--ease-out'] = motion.easeOut;
  t['--duration-fast'] = motion.fast;
  t['--duration-base'] = motion.base;
  t['--duration-slow'] = motion.slow;
  t['--duration-spin'] = motion.spin;
  t['--duration-draw'] = motion.draw;
  externalColours.forEach((c) => (t[`--${c.token}`] = c.hex));
  return t;
}

export function applyTokens(el = document.documentElement) {
  Object.entries(allTokens()).forEach(([k, v]) => el.style.setProperty(k, v));
}

// WCAG 2.x contrast helpers, used to label every swatch with a legible text colour.
function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

// Hex lookup by token name, for anything that needs the raw value (contrast maths).
export const hexOf = (token) => {
  const all = [...coreColours, ...accentColours, ...neutrals, ...violetScale.map((v) => ({ token: `violet-${v.step}`, hex: v.hex }))];
  return all.find((c) => c.token === token)?.hex;
};

export function bestText(bg) {
  const light = hexOf('warm-white');
  const dark = hexOf('near-black');
  return contrast(bg, light) >= contrast(bg, dark) ? light : dark;
}

export function rating(ratio) {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA Large';
  return 'Fail';
}
