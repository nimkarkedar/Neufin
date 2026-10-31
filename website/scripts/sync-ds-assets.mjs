// Copies design system files the website serves as-is, so they are never edited here.
// Runs before `npm run dev` and `npm run build` (see package.json).
import { copyFileSync } from "node:fs";

const files = [
  // The favicon: the White symbol on an Electric Violet tile (Logo page, Favicon).
  ["../designsystem/public/assets/logo/neufin-favicon.svg", "src/app/icon.svg"],
  // The same on a full square for phone home screens (iOS rounds the corners itself).
  ["../designsystem/public/assets/logo/neufin-apple-icon.png", "src/app/apple-icon.png"],
];

for (const [from, to] of files) copyFileSync(new URL(`../${from}`, import.meta.url), new URL(`../${to}`, import.meta.url));
