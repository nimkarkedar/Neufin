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
  { name: 'Warm White', token: 'warm-white', hex: '#F7F5FA' },
];

// Neutrals for UI: backgrounds, secondary text and lines.
export const neutrals = [
  { name: 'White', token: 'white', hex: '#FFFFFF', role: 'Page and card background.' },
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
  fallback: { name: 'Arial', stack: 'Arial, sans-serif', use: 'Body fallback. For Windows, system defaults and Office files when the brand fonts are not available. Regular 400, Bold 700.' },
};

export function allTokens() {
  const t = {};
  violetScale.forEach((c) => (t[`--violet-${c.step}`] = c.hex));
  [...coreColours, ...accentColours, ...neutrals].forEach((c) => (t[`--${c.token}`] = c.hex));
  gradients.forEach((g) => (t[`--${g.token}`] = gradientCss(g)));
  t['--font-display'] = fonts.display.stack;
  t['--font-body'] = fonts.body.stack;
  t['--font-mono'] = fonts.mono.stack;
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
