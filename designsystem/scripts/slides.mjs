// Builds the Neufin sales deck template (.pptx, for Google Slides and PowerPoint) from
// src/presentations/deck.js, the same data the Presentations page draws.
// Run: npm run slides  →  public/assets/templates/neufin-sales-deck.pptx
//
// Each layout in deck.js becomes a slide layout ("Neufin · …") with its logo, Stripe and
// text placeholders, so the sales team can apply layouts in Google Slides. Help text for
// each slide goes into its speaker notes.

import { readFileSync, mkdirSync } from 'node:fs';
import pptxgen from 'pptxgenjs';
import sharp from 'sharp';
import { hexOf } from '../src/brand/tokens.js';
import { nucleoIcons } from '../src/brand/icons.generated.js';
import { W, H, FONT, type, colours, layouts, slides, stripePoints, tableCell } from '../src/presentations/deck.js';

const root = new URL('../', import.meta.url);
const out = new URL('public/assets/templates/', root);
mkdirSync(out, { recursive: true });

const IN = (px) => px / 144; // canvas px → inches (1920px = 13.333in)
const PT = (px) => px / 2; // font px → points
const hex = (key) => hexOf(colours[key] ?? key).replace('#', '').toUpperCase();

const png = async (svg, width) => `image/png;base64,${(await sharp(Buffer.from(svg)).resize({ width }).png().toBuffer()).toString('base64')}`;

// Logos from the design system's SVG files, as PNGs at 3× their slide height.
const logoPng = {};
for (const [tone, file] of [['white', 'neufin-horizontal-white.svg'], ['two-colour', 'neufin-horizontal-two-colour.svg']]) {
  const svg = readFileSync(new URL(`public/assets/logo/${file}`, root));
  const meta = await sharp(svg).metadata();
  logoPng[tone] = { data: `image/png;base64,${(await sharp(svg, { density: 600 }).resize({ height: 180 }).png().toBuffer()).toString('base64')}`, ratio: meta.width / meta.height };
}

// Nucleo icons, drawn in one colour. CSS variables in the SVG are resolved to their defaults.
async function iconPng(name, colour) {
  const i = nucleoIcons[name];
  const body = i.body
    .replace(/var\(--icon-color-2, currentColor\)/g, colour)
    .replace(/var\(--[\w-]+,\s*([^)]+)\)/g, '$1')
    .replace(/currentColor/g, colour);
  return png(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${i.viewBox}" width="192" height="192">${body}</svg>`, 192);
}

// The Stripe, as a transparent full-slide PNG for a layout's background.
async function stripePng(s) {
  const pts = stripePoints({ width: W, y: s.y, thickness: s.th, kinkX: s.kinkX, drop: s.drop });
  return png(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><polygon points="${pts}" fill="#${hex(s.fill)}"/></svg>`, W);
}

const textOpts = (role, o = {}) => ({
  fontFace: FONT,
  fontSize: PT(type[role].size),
  bold: type[role].font === 'display' || !!o.bold,
  color: hex(o.color ?? 'ink'),
  align: o.align ?? 'left',
  valign: 'top',
  margin: 0,
  lineSpacingMultiple: type[role].lh,
  fit: 'none',
});

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE'; // 13.333 × 7.5 in, 16:9
pres.title = 'Neufin sales deck template';
pres.company = 'Neufo Technologies Private Limited';
pres.theme = { headFontFace: FONT, bodyFontFace: FONT };

/* ---------- Layouts ---------- */

const logoImage = (el) => {
  const lg = logoPng[el.tone];
  return { x: IN(el.x), y: IN(el.y), w: IN(el.h * lg.ratio), h: IN(el.h), data: lg.data };
};

for (const [, L] of Object.entries(layouts)) {
  const objects = [];
  for (const el of L.els) {
    if (el.t === 'stripe') objects.push({ image: { x: 0, y: 0, w: IN(W), h: IN(H), data: await stripePng(el) } });
    if (el.t === 'logo') objects.push({ image: logoImage(el) });
  }
  for (const [name, p] of Object.entries(L.ph)) {
    const box = { x: IN(p.x), y: IN(p.y), w: IN(p.w), h: IN(p.h) };
    if (name === 'pic') objects.push({ placeholder: { options: { name: 'pic', type: 'pic', ...box }, text: '' } });
    else objects.push({ placeholder: { options: { name, type: name === 'title' ? 'title' : 'body', ...box, ...textOpts(p.role, p) }, text: '' } });
  }
  pres.defineSlideMaster({
    title: L.name,
    background: { color: hex(L.bg) },
    objects,
    ...(L.number && {
      slideNumber: { x: IN(L.number.x), y: IN(L.number.y), w: IN(L.number.w), h: IN(L.number.h), fontFace: FONT, fontSize: PT(type.small.size), color: hex('ink2'), align: 'right', margin: 0 },
    }),
  });
}

/* ---------- Slides ---------- */

// Photos are cropped to their frame here, so they never stretch in any app.
const photo = async (src, w, h) => {
  const buf = await sharp(readFileSync(new URL(`public${src}`, root))).resize({ width: Math.round(w * 0.75), height: Math.round(h * 0.75), fit: 'cover' }).jpeg({ quality: 72 }).toBuffer();
  return `image/jpeg;base64,${buf.toString('base64')}`;
};

let section = null;
for (const s of slides) {
  if (s.section !== section) {
    section = s.section;
    pres.addSection({ title: section });
  }
  const slide = pres.addSlide({ masterName: layouts[s.layout].name, sectionTitle: section });
  const L = layouts[s.layout];
  if (s.bg) slide.background = { color: hex(s.bg) };

  if (L.ph.pic && s.pic) {
    const p = L.ph.pic;
    slide.addImage({ data: await photo(s.pic, p.w, p.h), x: IN(p.x), y: IN(p.y), w: IN(p.w), h: IN(p.h), altText: 'Photo' });
  }

  for (const el of s.els) {
    const box = { x: IN(el.x), y: IN(el.y), w: IN(el.w ?? 0), h: IN(el.h ?? 0) };
    if (el.t === 'image') {
      slide.addImage({ data: await photo(el.src, el.w, el.h), ...box, altText: 'Photo' });
    } else if (el.t === 'stripe') {
      slide.addImage({ data: await stripePng(el), x: 0, y: 0, w: IN(W), h: IN(H), altText: 'Neufin Stripe' });
    } else if (el.t === 'logo') {
      slide.addImage({ ...logoImage(el), altText: 'Neufin Energy' });
    } else if (el.t === 'arc') {
      const d = 2 * el.r;
      const toPpt = (a) => (((a - 90) % 360) + 360) % 360;
      slide.addShape(pres.shapes.BLOCK_ARC, {
        x: IN(el.cx - el.r), y: IN(el.cy - el.r), w: IN(d), h: IN(d),
        angleRange: [toPpt(el.a0), toPpt(el.a1)], arcThicknessRatio: el.th / el.r,
        fill: { color: hex(el.fill) }, line: { type: 'none' },
      });
    } else if (el.t === 'seg') {
      slide.addShape(pres.shapes.LINE, {
        x: IN(Math.min(el.x1, el.x2)), y: IN(Math.min(el.y1, el.y2)), w: IN(Math.abs(el.x2 - el.x1)), h: IN(Math.abs(el.y2 - el.y1)),
        flipV: (el.x2 - el.x1) * (el.y2 - el.y1) < 0,
        line: { color: hex(el.colour), width: PT(el.weight) },
      });
    } else if (el.t === 'dot') {
      slide.addShape(pres.shapes.OVAL, { ...box, fill: { color: hex(el.fill) }, line: { type: 'none' } });
    } else if (el.t === 'text') {
      slide.addText(el.text, { ...box, ...textOpts(el.role, el), isTextBox: true });
    } else if (el.t === 'rect') {
      slide.addShape(pres.shapes.RECTANGLE, {
        ...box,
        fill: { color: hex(el.fill), ...(el.alpha != null && { transparency: Math.round((1 - el.alpha) * 100) }) },
        line: el.border ? { color: hex(el.border), width: PT(4) } : { type: 'none' },
      });
    } else if (el.t === 'dash') {
      slide.addShape(pres.shapes.LINE, { ...box, w: IN(el.w ?? 0), h: IN(el.h ?? 0), line: { color: hex(el.colour), width: 1.5, dashType: 'dash' } });
    } else if (el.t === 'cell') {
      slide.addShape(pres.shapes.RECTANGLE, { ...box, fill: { color: hex(el.fill ?? 'surface') }, line: { type: 'none' } });
      slide.addText(el.label, { ...box, ...textOpts('small', { color: 'ink2', align: 'center' }), valign: 'middle', isTextBox: true });
    } else if (el.t === 'icon') {
      slide.addImage({ data: await iconPng(el.name, `#${hex(el.color)}`), x: IN(el.x), y: IN(el.y), w: IN(el.s), h: IN(el.s), altText: el.name });
    } else if (el.t === 'table') {
      const pad = IN(el.role === 'small' ? 18 : 22);
      const side = IN(24);
      const none = { type: 'none' };
      const rows = el.rows.map((row, i) =>
        row.map((cell, j) => {
          const st = tableCell(el, i, j);
          return {
            text: cell,
            options: {
              ...textOpts(el.role, { bold: st.bold, color: st.color, align: el.align?.[j] === 'r' ? 'right' : 'left' }),
              valign: 'middle',
              margin: [pad, side, pad, side],
              fill: st.fill ? { color: hex(st.fill) } : undefined,
              border: [none, none, st.line ? { type: 'solid', pt: 1, color: hex(st.line) } : none, none],
            },
          };
        }),
      );
      slide.addTable(rows, { x: IN(el.x), y: IN(el.y), w: IN(el.w), colW: el.cols.map(IN) });
    }
  }

  // Text frames last, so they sit above photos and the Stripe.
  if (L.ph.title && s.title) slide.addText(s.title, { placeholder: 'title' });
  if (L.ph.body && s.body) slide.addText(s.body, { placeholder: 'body' });

  slide.addNotes(s.notes);
}

const file = new URL('neufin-sales-deck.pptx', out).pathname;
await pres.writeFile({ fileName: file });
console.log(`Wrote ${file}`);
