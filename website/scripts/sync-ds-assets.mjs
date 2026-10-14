// Copies design system files the website serves as-is, so they are never edited here.
// Runs before `npm run dev` and `npm run build` (see package.json).
import { copyFileSync } from "node:fs";

const files = [
  // The browser tab icon: the Neufin symbol in Electric Violet.
  ["../designsystem/public/assets/logo/neufin-symbol-violet.svg", "src/app/icon.svg"],
];

for (const [from, to] of files) copyFileSync(new URL(`../${from}`, import.meta.url), new URL(`../${to}`, import.meta.url));
