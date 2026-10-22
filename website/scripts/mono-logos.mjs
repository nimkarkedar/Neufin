// Turns the client and partner logos in ../Logos into single-colour SVGs for the site.
//
// Each SVG is wrapped in a filter that makes every pixel black, with opacity from how
// far its colour is from white: coloured and dark parts become solid, white parts and
// white backgrounds drop out (so white type on a coloured box becomes a cut-out). The
// result is then trimmed to the ink, so every logo sizes from its real edges.
// The site shows them as masks in the current text colour (`LogoWall`).
//
// Run `npm run logos` after adding or replacing a file in ../Logos. Only SVGs are used.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const src = path.resolve(import.meta.dirname, "../../Logos");
const out = path.resolve(import.meta.dirname, "../src/assets/logos");

// Logos drawn in white for dark backgrounds: keep their shape instead.
const shapeOnly = new Set(["partners/tata-power.svg"]);
// Very light colours that need more strength to come out solid.
const strength = { "partners/ecofy.svg": 4, "customers/hitech.svg": 5, "customers/rajdarbaar.svg": 5 };
// Net Zero's leaf is a traced photo: a high strength with a cut-off makes it one solid
// shape while its white background still drops out.
const cutoff = { "partners/net-zero.svg": [9, -0.25] };
// ...and its hatching is closed up (grown, then shrunk, by this many units). Safari
// draws that step differently, so these logos are saved pre-drawn (a sharp image
// inside the SVG) and look the same everywhere.
const close = { "partners/net-zero.svg": 2.5 };
// Parts left out: Rainmatter's light grey "by Zerodha" line (noise at logo size), and
// Net Zero's "Finance", which the supplied file cuts off at the bottom.
const remove = { "investors/rainmatter.svg": /<path class="st[12]"[^>]*\/>/g };
const crop = { "partners/net-zero.svg": { height: 128 } };
// Copies of a customer logo, and Aava, whose SVG holds a textured photo that won't go to one colour.
const skip = new Set(["customers/l-and-t.svg", "partners/yes-bank.svg", "customers/aava.svg"]);

// Ink = s × (1 − average of R, G and B) + offset, from the colour alone; the filter
// then multiplies it by the pixel's own opacity, so soft edges stay soft. The default
// 2.5 makes anything darker than a light grey fully solid.
const inkMatrix = (s = 2.5, offset = 0) => `0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${-s / 3} ${-s / 3} ${-s / 3} 0 ${s + offset}`;
const alphaMatrix = "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0 1";

// Files are saved this many pixels on their long side, so browsers draw them sharp.
const SIZE = 1200;

function wrap(svg, matrix, [x, y, w, h], closeBy) {
  const inner = svg
    .replace(/<\?xml[^>]*>/g, "")
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<svg\b([^>]*)>/, (_, attrs) => {
      const kept = attrs.replace(/\s(width|height|x|y)="[^"]*"/g, "");
      return `<svg${kept} x="0" y="0" width="${w}" height="${h}">`;
    });
  return (b) => {
    const k = SIZE / Math.max(b[2], b[3]);
    const r = (n) => Math.round(n * k * 10) / 10;
    return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${b.join(" ")}" width="${r(b[2])}" height="${r(b[3])}">` +
    `<filter id="mono" x="0" y="0" width="${w}" height="${h}" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">` +
    `<feColorMatrix type="matrix" values="${matrix}" result="ink"/>` +
    `<feComposite in="ink" in2="SourceGraphic" operator="in"/>` +
    (closeBy ? `<feMorphology operator="dilate" radius="${closeBy}"/><feMorphology operator="erode" radius="${closeBy}"/>` : "") +
    `</filter>` +
    `<g filter="url(#mono)">${inner.trim()}</g></svg>\n`
    );
  };
}

function viewBox(svg) {
  const vb = svg.match(/viewBox="([^"]+)"/);
  if (vb) return vb[1].trim().split(/[\s,]+/).map(Number);
  const w = parseFloat(svg.match(/\swidth="([\d.]+)/)[1]);
  const h = parseFloat(svg.match(/\sheight="([\d.]+)/)[1]);
  return [0, 0, w, h];
}

// Bounding box of the visible ink, in the logo's own units.
// The SVG is already SIZE pixels on its long side, so it renders at that size.
async function inkBox(svg, [, , w, h]) {
  const { data, info } = await sharp(Buffer.from(svg))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let [x0, y0, x1, y1] = [info.width, info.height, -1, -1];
  for (let y = 0; y < info.height; y++)
    for (let x = 0; x < info.width; x++)
      if (data[(y * info.width + x) * 4 + 3] > 24) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
  const fx = w / info.width;
  const fy = h / info.height;
  const r = (n) => Math.round(n * 100) / 100;
  return [r(x0 * fx), r(y0 * fy), r((x1 + 1 - x0) * fx), r((y1 + 1 - y0) * fy)];
}

fs.rmSync(out, { recursive: true, force: true });
for (const group of fs.readdirSync(src, { withFileTypes: true })) {
  if (!group.isDirectory()) continue;
  fs.mkdirSync(path.join(out, group.name), { recursive: true });
  for (const file of fs.readdirSync(path.join(src, group.name))) {
    const id = `${group.name}/${file}`;
    if (!file.endsWith(".svg") || skip.has(id)) continue;
    let svg = fs.readFileSync(path.join(src, id), "utf8");
    if (remove[id]) svg = svg.replace(remove[id], "");
    const vb = viewBox(svg);
    const matrix = shapeOnly.has(id) ? alphaMatrix : cutoff[id] ? inkMatrix(...cutoff[id]) : inkMatrix(strength[id]);
    const make = wrap(svg, matrix, vb, close[id]);
    const region = [0, 0, vb[2], crop[id]?.height ?? vb[3]];
    const box = await inkBox(make(region), region);
    let result = make(box);
    if (close[id]) {
      const png = await sharp(Buffer.from(result)).png().toBuffer();
      const [, w, h] = result.match(/width="([\d.]+)" height="([\d.]+)"/);
      result =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">` +
        `<image href="data:image/png;base64,${png.toString("base64")}" width="${w}" height="${h}"/></svg>\n`;
    }
    fs.writeFileSync(path.join(out, id), result);
    console.log(id, box.join(" "));
  }
}
