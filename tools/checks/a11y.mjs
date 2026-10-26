// WCAG 2.1 AA check of every website page with axe-core, at 390 and 1440, in Brave.
// Usage: node tools/checks/a11y.mjs [baseUrl]   (default http://localhost:3000, run `npm run dev` in website/ first)
// Exits 1 on any serious or critical violation. Text on photos and colour on gradients can't be
// judged by axe ("incomplete"); those are listed for a manual check with tools/screenshots/measure.py.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { chromium } from "playwright-core";

const here = dirname(fileURLToPath(import.meta.url));
const appDir = join(here, "../../website/src/app");
const axeSource = readFileSync(createRequire(import.meta.url).resolve("axe-core/axe.min.js"), "utf8");
const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

// Every static route under website/src/app (folders with a page.tsx, no [params]).
const routes = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) !f.startsWith("[") && !f.startsWith("(") && walk(p);
    else if (f === "page.tsx") routes.push("/" + relative(appDir, dir).replace(/\\/g, "/"));
  }
};
walk(appDir);

const browser = await chromium.launch({ executablePath: "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser", headless: true });
let serious = 0;
// The same element on many pages (header, footer, shared blocks) is listed once, with where it shows.
const found = new Map();
const manualChecks = [];
for (const route of routes.map((r) => (r === "/" ? "/" : r + "/")).sort()) {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: width < 768 ? 844 : 900 } });
    await page.goto(base + route, { waitUntil: "load" });
    await page.waitForTimeout(600);
    await page.addScriptTag({ content: axeSource });
    const result = await page.evaluate(() =>
      // eslint-disable-next-line no-undef
      axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] }, resultTypes: ["violations", "incomplete"] }),
    );
    for (const v of result.violations) {
      if (["serious", "critical"].includes(v.impact)) serious += v.nodes.length;
      for (const n of v.nodes) {
        const target = n.target.join(" ").replace(/__[A-Za-z0-9_-]+/g, "");
        const key = `${v.id}|${target}`;
        const entry = found.get(key) ?? { v, target, why: n.failureSummary?.split("\n")[1]?.trim() ?? "", where: new Set() };
        entry.where.add(`${route}@${width}`);
        found.set(key, entry);
      }
    }
    const manual = result.incomplete.filter((v) => v.id === "color-contrast");
    if (manual.length) manualChecks.push(`${route} @${width}: ${manual[0].nodes.length} element(s)`);
    await page.close();
  }
}
await browser.close();
const byRule = new Map();
for (const e of found.values()) byRule.set(e.v.id, [...(byRule.get(e.v.id) ?? []), e]);
for (const [id, entries] of byRule) {
  console.log(`\n✖ [${entries[0].v.impact}] ${id}: ${entries[0].v.help} (${entries.length} element(s))`);
  for (const e of entries) {
    const where = [...e.where];
    console.log(`  - ${e.target}\n      ${e.why}\n      on ${where.length > 4 ? `${where.length} page views (${where.slice(0, 3).join(", ")} …)` : where.join(", ")}`);
  }
}
if (manualChecks.length) console.log(`\n? Colour contrast axe couldn't judge (text on photos or gradients): measure with tools/screenshots/measure.py\n  ${manualChecks.join("\n  ")}`);
console.log(`\n${serious ? `✖ ${serious} serious or critical issue(s)` : "✓ no serious or critical axe issues"} across ${routes.length} pages at 390 and 1440`);
process.exit(serious ? 1 : 0);
