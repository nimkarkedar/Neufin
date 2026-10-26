// Pre-push audit for the website and the design system (run by the neufin-push skill).
// Usage: node tools/checks/audit.mjs   (from the repo root or anywhere)
// Prints findings by section; exits 1 if anything in the "must fix" sections is found.
// It finds candidates; Claude still reads each one before deleting or changing anything.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, basename, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const web = join(root, "website/src");
const ds = join(root, "designsystem/src");
const dsPublic = join(root, "designsystem/public/assets");

const walk = (dir, exts) =>
  existsSync(dir)
    ? readdirSync(dir).flatMap((f) => {
        const p = join(dir, f);
        if (f === "node_modules" || f.startsWith(".")) return [];
        return statSync(p).isDirectory() ? walk(p, exts) : !exts || exts.includes(extname(f)) ? [p] : [];
      })
    : [];
const rel = (p) => relative(root, p);
const read = (p) => readFileSync(p, "utf8");

const webCode = walk(web, [".ts", ".tsx", ".js", ".mjs"]);
const webCss = walk(web, [".css"]);
const dsCode = walk(ds, [".js", ".jsx", ".ts", ".tsx"]).filter((p) => !p.includes(".generated."));
const dsCss = walk(ds, [".css"]);
const allSource = [...webCode, ...webCss, ...dsCode, ...dsCss].map((p) => [p, read(p)]);
const haystack = allSource.map(([, t]) => t).join("\n");

let failures = 0;
const section = (title, items, mustFix) => {
  console.log(`\n## ${title}${mustFix ? " (must fix)" : ""}: ${items.length ? items.length : "none"}`);
  items.forEach((i) => console.log("  - " + i));
  if (mustFix) failures += items.length;
};
const strip = (css) => css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
const lineOf = (text, index) => text.slice(0, index).split("\n").length;

// 1. Hand-set design values in the website (every value must come from a token).
const handSet = [];
// A value is hand-set when, with every var(...) removed, it still holds a raw number with a
// unit (px, rem, em, ms, s), or a colour. Zero, 50% (circles) and sub-millisecond
// reduced-motion overrides are fine.
const props = /(?:^|[\s;{])(color|background(?:-color)?|border(?:-[a-z]+)?(?:-color)?|outline(?:-color)?|fill|stroke|font-family|font-size|line-height|letter-spacing|border(?:-[a-z]+)*-radius|box-shadow|transition(?:-duration)?|animation(?:-duration)?):\s*([^;]+);/g;
const raw = (prop, value) => {
  const v = value.replace(/var\([^()]*(?:\([^()]*\)[^()]*)*\)/g, "").replace(/!important/, "");
  if (/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\(/.test(v)) return "colour";
  if (prop === "font-family" && /[a-z]/i.test(v.replace(/inherit|\s|,/g, ""))) return "font family";
  if (/^(?:transition|animation)/.test(prop)) {
    const d = [...v.matchAll(/(\d*\.?\d+)(m?s)\b/g)].filter(([, n, u]) => (u === "s" ? n * 1000 : +n) >= 1);
    return d.length ? "duration" : null;
  }
  if (/^border(?:-[a-z]+)?$/.test(prop) && !/radius/.test(prop)) return null; // widths like 1px are fine
  const nums = [...v.matchAll(/(\d*\.?\d+)(px|rem|em)\b/g)].filter(([, n]) => +n !== 0);
  return nums.length ? prop.replace(/-.*/, "") === "font" ? "font size" : prop : null;
};
for (const p of webCss) {
  const t = strip(read(p));
  for (const m of t.matchAll(props)) {
    const what = raw(m[1], m[2]);
    if (what) handSet.push(`${rel(p)}:${lineOf(t, m.index)} ${what}: ${m[1]}: ${m[2].trim()}`);
  }
}
for (const p of webCode) {
  const t = read(p);
  for (const m of t.matchAll(/style=\{\{[^}]*\}\}/g))
    if (/#[0-9a-fA-F]{3,8}\b|rgba?\(|\d+px/.test(m[0])) handSet.push(`${rel(p)}:${lineOf(t, m.index)} inline style: ${m[0]}`);
  for (const m of t.matchAll(/(?:fill|stroke|color)="#[0-9a-fA-F]{3,8}"/g)) handSet.push(`${rel(p)}:${lineOf(t, m.index)} colour attribute: ${m[0]}`);
}
section("Hand-set values in website/ (use a design system token)", handSet, true);

// 2. Unused CSS module classes.
const unusedClasses = [];
for (const p of [...webCss, ...dsCss].filter((p) => p.endsWith(".module.css"))) {
  // Classes inside :global(...) belong to the design system, not this module.
  const css = strip(read(p)).replace(/:global\([^)]*\)/g, "");
  const names = new Set([...css.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((m) => m[1]));
  const file = basename(p);
  const users = allSource.filter(([q, t]) => q !== p && t.includes(file));
  // A module re-exported under another name (export { styles as cardLayouts }) is read through it.
  const aliases = users.flatMap(([, t]) => [...t.matchAll(/export\s*\{\s*styles\s+as\s+(\w+)/g)].map((m) => m[1]));
  const code = [...users.map(([, t]) => t), ...allSource.filter(([, t]) => aliases.some((a) => t.includes(a + "."))).map(([, t]) => t)]
    .join("\n")
    .replace(new RegExp(`\\b(?:${aliases.join("|") || "\\$none"})\\.`, "g"), "styles.");
  const dynamic = /styles\[[^"'\]]/.test(code);
  for (const n of names) {
    if (/^\d/.test(n)) continue;
    const used = code.includes(`styles.${n}`) || code.includes(`styles["${n}"]`) || code.includes(`styles['${n}']`);
    if (!used) unusedClasses.push(`${rel(p)} .${n}${dynamic ? " (file also uses styles[...]; check by hand)" : ""}`);
  }
}
section("CSS module classes nothing uses", unusedClasses, false);

// 3. Unused files: assets, photos, illustrations.
const assetFiles = [
  ...walk(join(root, "website/src/assets")),
  ...walk(join(root, "website/public")),
  ...walk(join(dsPublic, "photos")),
  ...walk(join(dsPublic, "illustrations")),
].filter((p) => !p.includes("/assets/logos/") && !basename(p).startsWith("."));
const unusedAssets = assetFiles.filter((p) => !haystack.includes(basename(p))).map(rel);
section("Image and asset files nothing references", unusedAssets, false);

// 4. Unused icons in the design system's icon list.
const iconList = JSON.parse(read(join(ds, "brand/icon-list.json"))).icons;
const unusedIcons = Object.keys(iconList).filter((name) => {
  const pats = [`icons.${name}`, `icons["${name}"]`, `"${name}"`, `'${name}'`, `icon="${name}"`];
  return !allSource.some(([p, t]) => !p.endsWith("icon-list.json") && pats.some((s) => t.includes(s)));
});
section("Icons in icon-list.json nothing uses (remove, then npm run icons)", unusedIcons, false);

// 5. Exports nothing imports (website lib and components).
const unusedExports = [];
for (const p of webCode.filter((p) => /\/(lib|components)\//.test(p))) {
  const t = read(p);
  for (const m of t.matchAll(/export\s+(?:async\s+)?(?:const|function|type|interface|class)\s+([A-Za-z_]\w*)/g)) {
    const name = m[1];
    const elsewhere = allSource.some(([q, s]) => q !== p && new RegExp(`\\b${name}\\b`).test(s));
    const inside = (t.match(new RegExp(`\\b${name}\\b`, "g")) || []).length > 1;
    if (!elsewhere) unusedExports.push(`${rel(p)} ${name}${inside ? " (used inside its own file: drop the export)" : ""}`);
  }
}
section("Exports nothing else imports", unusedExports, false);

// 6. Leftovers: commented-out JSX/code blocks and console.log.
const leftovers = [];
for (const p of [...webCode, ...dsCode]) {
  const t = read(p);
  for (const m of t.matchAll(/console\.log\(/g)) leftovers.push(`${rel(p)}:${lineOf(t, m.index)} console.log`);
  for (const m of t.matchAll(/\{\/\*\s*<[A-Za-z]/g)) leftovers.push(`${rel(p)}:${lineOf(t, m.index)} commented-out JSX`);
  for (const m of t.matchAll(/^\s*\/\/\s*(?:const|let|import|export|return|<)\s/gm)) leftovers.push(`${rel(p)}:${lineOf(t, m.index)} commented-out code`);
}
section("Leftover debug or commented-out code", leftovers, false);

// 7. Inventories to minimise: type, colour and spacing variations in the website.
const tally = (re) => {
  const map = new Map();
  for (const p of webCss)
    for (const m of strip(read(p)).matchAll(re)) {
      const v = m[1].trim();
      map.set(v, [...(map.get(v) || []), rel(p)]);
    }
  return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
};
const show = (title, entries) =>
  section(title, entries.map(([v, files]) => `${v}  ×${files.length}${files.length <= 2 ? "  (" + [...new Set(files)].join(", ") + ")" : ""}`), false);
show("Font sizes in use (fewer is better)", tally(/font-size:\s*([^;]+);/g));
show("Font weights in use (fewer is better)", tally(/font-weight:\s*([^;]+);/g));
show("Font families in use", tally(/font-family:\s*([^;]+);/g));
show("Text colours in use (fewer is better)", tally(/(?<![-\w])color:\s*([^;]+);/g));

const spacing = new Map();
for (const p of webCss)
  for (const m of strip(read(p)).matchAll(/(?:^|[\s;{])((?:padding|margin|gap|row-gap|column-gap|inset|top|bottom|left|right)(?:-[a-z-]+)?):\s*([^;]+);/g))
    for (const px of m[2].matchAll(/(-?\d*\.?\d+)px/g)) {
      const n = Math.abs(Number(px[1]));
      if (n === 0) continue;
      spacing.set(n, [...(spacing.get(n) || []), `${rel(p)} ${m[1]}`]);
    }
// 1–3px are hairlines and optical nudges; everything else should sit on the 4px grid.
const offScale = [...spacing.entries()].filter(([n]) => n > 3 && n % 4 !== 0 && n < 1000).sort((a, b) => a[0] - b[0]);
section(
  "Spacing values off the 4px grid (snap to 4/8/12/16/20/24/32/40/48/64/80)",
  offScale.flatMap(([n, uses]) => [...new Set(uses)].map((u) => `${n}px  ${u}`)),
  false,
);
section(
  "Spacing values in use",
  [...spacing.entries()].sort((a, b) => a[0] - b[0]).map(([n, uses]) => `${n}px ×${uses.length}`),
  false,
);

// 8. TODO pockets (informational: list them for Kedar).
const todos = allSource.flatMap(([p, t]) => [...t.matchAll(/TODO[:\s]([^\n*]{0,90})/g)].map((m) => `${rel(p)}: ${m[1].trim()}`));
section("TODO pockets (list for Kedar, don't remove)", todos, false);

console.log(`\n${failures ? `✖ ${failures} must-fix finding(s)` : "✓ no must-fix findings"} (review the rest by hand)`);
process.exit(failures ? 1 : 0);
