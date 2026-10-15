// Neufin sales deck: every layout, as data. One source for two outputs:
//  - the Presentations page renders it (src/pages/Presentations.jsx)
//  - scripts/slides.mjs builds the Google Slides / PowerPoint template from it
// Plain JS (no JSX), so Node can import it.
//
// Canvas 1920 × 1080 (16:9). All numbers are pixels on that canvas.
// In the .pptx, 1px = 1/144 inch and font px ÷ 2 = pt (so 32px = 16pt).

import { stripePoints } from '../brand/stripe-geometry.js';

export const W = 1920;
export const H = 1080;
export const M = 96; // margin, all sides
export const G = 24; // gutter
const STEP = 146; // one column (122) + gutter
export const col = (i) => M + i * STEP; // left edge of column i (0–11)
export const span = (n) => n * STEP - G; // width of n columns
const FULL = span(12); // 1728

// One font: Arial, the design system's fallback for Office files, so decks look the
// same on every computer and in Google Slides, PowerPoint, Keynote and PDF.
// Titles use Arial Bold, text Arial Regular. Four sizes, two weights. Nothing else.
export const FONT = 'Arial';
export const type = {
  display: { size: 96, lh: 1.05, font: 'display', note: 'Covers, dividers, closing, one big number' },
  title: { size: 56, lh: 1.15, font: 'display', note: 'Slide titles, figures in cards' },
  body: { size: 32, lh: 1.35, font: 'body', note: 'Everything you read' },
  small: { size: 24, lh: 1.4, font: 'body', note: 'Dense tables, chart labels, footnotes' },
};

// Text and fill colours, by design system token.
export const colours = {
  ink: 'near-black',
  ink2: 'grey-600',
  white: 'white',
  accent: 'electric-violet',
  yellow: 'signal-yellow',
  surface: 'warm-white',
  line: 'grey-200',
  muted: 'grey-400',
  tint: 'violet-100',
  accent2: 'violet-300',
  dark: 'near-black',
};

// Content area on the content layout.
const TOP = 288;
const BOTTOM = 944;

/* ---------- Layouts: the frame each slide sits on ---------- */

const brandStripe = (y, kinkX, th = 120) => ({ t: 'stripe', y, th, kinkX, drop: 180, fill: 'yellow' });
const logoTop = (tone = 'white') => ({ t: 'logo', x: M, y: 80, h: 56, tone });
const logoFoot = (x = M, tone = 'two-colour') => ({ t: 'logo', x, y: 994, h: 32, tone });

export const layouts = {
  brand: {
    name: 'Neufin · Cover',
    bg: 'accent',
    els: [
      logoTop(),
      brandStripe(720, 760, 160),
    ],
    ph: {
      title: { x: M, y: 256, w: span(9), h: 220, role: 'display', color: 'white' },
      body: { x: M, y: 520, w: span(9), h: 96, role: 'body', color: 'white' },
    },
  },
  divider: {
    name: 'Neufin · Section divider',
    bg: 'accent',
    els: [
      logoTop(),
      brandStripe(760, 1060),
    ],
    ph: {
      body: { x: M, y: 312, w: span(4), h: 48, role: 'body', color: 'white' },
      title: { x: M, y: 376, w: span(10), h: 220, role: 'display', color: 'white' },
    },
  },
  content: {
    name: 'Neufin · Content',
    bg: 'white',
    els: [logoFoot()],
    number: { x: W - M - 120, y: 994, w: 120, h: 34 },
    ph: {
      title: { x: M, y: 88, w: FULL, h: 136, role: 'title', color: 'ink' },
    },
  },
  image: {
    name: 'Neufin · Text and image',
    bg: 'white',
    els: [logoFoot()],
    ph: {
      title: { x: M, y: 88, w: span(5), h: 272, role: 'title', color: 'ink' },
      body: { x: M, y: 400, w: span(5), h: 400, role: 'body', color: 'ink2' },
      pic: { x: W / 2, y: 0, w: W / 2, h: H },
    },
  },
  imageLeft: {
    name: 'Neufin · Image and text',
    bg: 'white',
    els: [logoFoot(col(7))],
    ph: {
      title: { x: col(7), y: 88, w: span(5), h: 272, role: 'title', color: 'ink' },
      body: { x: col(7), y: 400, w: span(5), h: 400, role: 'body', color: 'ink2' },
      pic: { x: 0, y: 0, w: W / 2, h: H },
    },
  },
  // Plain Electric Violet, for a single punchy message drawn with the Stripe.
  violet: {
    name: 'Neufin · Violet',
    bg: 'accent',
    els: [logoFoot(M, 'white')],
    ph: {
      title: { x: M, y: 88, w: FULL, h: 136, role: 'title', color: 'white' },
    },
  },
  // Full-bleed photo. The photo, its shade and the logo are on the slide (above the
  // layout), so they stay on top; only the text frames are in the layout.
  photo: {
    name: 'Neufin · Full photo',
    bg: 'dark',
    els: [],
    ph: {
      title: { x: M, y: 640, w: span(9), h: 220, role: 'display', color: 'white' },
      body: { x: M, y: 880, w: span(8), h: 96, role: 'body', color: 'white' },
    },
  },
  photoCover: {
    name: 'Neufin · Cover with photo',
    bg: 'accent',
    els: [],
    ph: {
      title: { x: M, y: 616, w: span(7), h: 220, role: 'display', color: 'white' },
      body: { x: M, y: 852, w: span(7), h: 48, role: 'body', color: 'white' },
    },
  },
};

/* ---------- Building blocks ---------- */

const text = (x, y, w, h, role, value, o = {}) => ({ t: 'text', x, y, w, h, role, text: value, color: 'ink', ...o });
const rect = (x, y, w, h, fill, o = {}) => ({ t: 'rect', x, y, w, h, fill, ...o });
const rule = (x, y, w, colour = 'line', weight = 2) => ({ t: 'rect', x, y, w, h: weight, fill: colour });
const lineHeight = (role) => Math.round(type[role].size * type[role].lh);

// A grid of equal logo cells. Logos sit centred in each cell, never stretched.
function logoGrid({ x, y, cols, rows, w, cellH, label = 'Logo' }) {
  const cellW = (w - (cols - 1) * G) / cols;
  const out = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      out.push({ t: 'cell', x: x + c * (cellW + G), y: y + r * (cellH + G), w: cellW, h: cellH, label });
    }
  }
  return out;
}

// Client logo placeholder: a White cell, for co-branded covers.
const clientLogo = (x, y) => ({ t: 'cell', x, y, w: 280, h: 96, label: 'Client logo', fill: 'white' });

// A Stripe used as a field: everything below its top edge, filled.
const field = (y, kinkX, drop, fill) => ({ t: 'stripe', y, th: 2000, kinkX, drop, fill });

// Line segment and dot for line charts.
const seg = (x1, y1, x2, y2, colour, weight) => ({ t: 'seg', x1, y1, x2, y2, colour, weight });
const dot = (x, y, r, fill) => ({ t: 'dot', x: x - r, y: y - r, w: 2 * r, h: 2 * r, fill });

// Label and value on one line, value right-aligned.
const pair = (x, y, w, label, value, o = {}) => [
  text(x, y, w * 0.55, lineHeight('body'), 'body', label, { color: 'ink2' }),
  text(x + w * 0.45, y, w * 0.55, lineHeight('body'), 'body', value, { align: 'right', ...o }),
];

/* ---------- Slides ---------- */

export const slides = [
  {
    id: 'guide',
    section: 'Start here',
    name: 'How to use this template',
    layout: 'content',
    title: 'How to use this template',
    els: [
      ...[
        ['Write each title as the point the slide makes.', '“Open access saves ₹3.3 Cr a year”, not “Savings”.'],
        ['One idea per slide.', 'If a slide needs two titles, make it two slides.'],
        ['Keep to the sizes in the layouts.', 'If text doesn’t fit, cut words. Don’t make it smaller.'],
        ['Violet is for Neufin.', 'Our figures, our option, the recommendation. Everything else is black or grey.'],
        ['Read the speaker notes.', 'Every slide explains when to use it and what to change. Delete this slide before sending.'],
      ].flatMap(([k, v], i) => {
        const y = TOP + i * 128;
        return [
          rule(M, y, FULL),
          text(M, y + 28, span(1), 48, 'body', String(i + 1).padStart(2, '0'), { color: 'accent' }),
          text(col(1), y + 28, span(5), 48, 'body', k, { bold: true }),
          text(col(6), y + 28, span(6), 96, 'body', v, { color: 'ink2' }),
        ];
      }),
    ],
    notes:
      'Start here. Duplicate this file for each new deck, then delete this slide.\n\nTo add a slide: Slide > New slide, or duplicate the closest example below and change the words. To change a slide’s frame: Slide > Apply layout > a “Neufin ·” layout.\n\nEverything is in Arial (Bold for titles), so the deck looks the same on every computer and in PowerPoint or PDF. Don’t change the font.',
  },

  /* ----- Open ----- */
  {
    id: 'cover-photo',
    section: 'Open',
    name: 'Cover with photo',
    layout: 'photoCover',
    title: 'Lower power costs\nfor your offices',
    body: 'Proposal for Company name · October 2026',
    els: [
      { t: 'image', x: 0, y: 0, w: W, h: 780, src: '/assets/photos/pylon-sky.jpg' },
      field(560, 1180, 140, 'accent'),
      { t: 'stripe', y: 524, th: 36, kinkX: 1180 + 36 * 0.29, drop: 140, fill: 'yellow' },
      { t: 'logo', x: M, y: 968, h: 48, tone: 'white' },
      clientLogo(W - M - 280, 944),
    ],
    notes:
      'The default first slide. Photo above, Electric Violet below, split along the Stripe.\n\nTitle: what the client gets, in their words, on two lines: “Lower power costs for your 20 offices”, not “Renewable energy proposal”. Second line: who it’s for and the month.\n\nClient logo: click the white cell, Insert > Image, and fit their logo inside it with space around. If you don’t have a clean logo, delete the cell; never use a blurry one.\n\nPhoto: click it, Replace image, pick one from the design system’s Photography page. Keep the sky or a plain area at the top.',
  },
  {
    id: 'cover',
    section: 'Open',
    name: 'Cover',
    layout: 'brand',
    title: 'Lower power costs\nfor your offices',
    body: 'Proposal for Company name · October 2026',
    els: [clientLogo(W - M - 280, 64)],
    notes:
      'Plain cover, when you have no good photo. Title says what the client gets, in their words, on two lines. Second line: who it’s for and the month.\n\nClient logo: fit it inside the white cell top right, or delete the cell.',
  },
  {
    id: 'agenda',
    section: 'Open',
    name: 'Agenda',
    layout: 'content',
    title: 'Agenda',
    els: ['What you pay today', 'Where you can save', 'Your options', 'How we deliver', 'Next steps'].flatMap((it, i) => {
      const y = TOP + i * 120;
      return [
        rule(col(4), y, span(8)),
        text(col(4), y + 32, span(1), 48, 'body', String(i + 1).padStart(2, '0'), { color: 'ink2' }),
        text(col(5), y + 32, span(7), 48, 'body', it),
      ];
    }),
    notes: 'Use only for decks longer than ten slides. Up to six items, each a few words. Match the items to your section dividers.',
  },
  {
    id: 'divider',
    section: 'Open',
    name: 'Section divider',
    layout: 'divider',
    title: 'Where you can save',
    body: '02',
    els: [],
    notes: 'Opens a section in a longer deck. Number on the first line, section name below, as on the agenda. Skip dividers in decks under ten slides.',
  },

  /* ----- Who we are ----- */
  {
    id: 'reasons',
    section: 'Who we are',
    name: 'Six facts',
    layout: 'content',
    title: 'Why companies buy power through Neufin',
    els: [
      ['bolt', 'Up to 40% lower cost', 'Renewable power below the grid tariff'],
      ['calendar', '30 days to 15 years', 'Contract lengths to suit your plans'],
      ['leaf', 'Solar, wind and hybrid', 'Plus biomass, storage and exchange power'],
      ['location', '16 states', 'One partner for all your sites'],
      ['shield', 'Licensed trader', 'CERC Category V trading licence'],
      ['chart', 'One platform', 'Every unit tracked in Lumen'],
    ].flatMap(([icon, k, v], i) => {
      const x = col((i % 3) * 4);
      const y = TOP + Math.floor(i / 3) * 336;
      return [
        rule(x, y, span(4)),
        { t: 'icon', x, y: y + 40, s: 48, name: icon, color: 'accent' },
        text(x, y + 120, span(4), 48, 'body', k, { bold: true }),
        text(x, y + 172, span(4) - 24, 96, 'body', v, { color: 'ink2' }),
      ];
    }),
    notes: 'Use as the one “about us” slide in a first meeting. Keep six facts or remove a row to make three. Each fact: a short claim we can prove, then one line. Update the numbers (states, suppliers) when they change.',
  },
  {
    id: 'logos',
    section: 'Who we are',
    name: 'Customer logos',
    layout: 'content',
    title: 'Companies across India buy power through Neufin',
    els: logoGrid({ x: M, y: TOP, cols: 4, rows: 3, w: FULL, cellH: 192 }),
    notes:
      'Twelve cells on a fixed grid. To add a logo: click a cell, then Insert > Image, and fit the logo inside the cell with space around it. Never stretch a logo or change its colours. Pick logos the client will recognise, ideally from their industry.\n\nFewer than twelve? Delete a whole row, not single cells, so the grid stays even. Only use logos of customers who have agreed.',
  },
  {
    id: 'logo-groups',
    section: 'Who we are',
    name: 'Customers, partners, investors',
    layout: 'content',
    title: 'Backed by customers, suppliers and investors',
    els: ['Customers', 'Power partners', 'Investors'].flatMap((label, i) => {
      const y = TOP + i * 224;
      return [
        text(M, y, span(3), 48, 'body', label, { bold: true }),
        ...logoGrid({ x: M, y: y + 56, cols: 6, rows: 1, w: FULL, cellH: 136 }),
      ];
    }),
    notes:
      'Use when the client asks who we are. Three rows of six on the same grid, so logos line up in columns. Fit each logo inside its cell with space around it; never stretch it. Delete a row you don’t need, then move the rows below up so the gaps stay equal.',
  },
  {
    id: 'quote',
    section: 'Who we are',
    name: 'Customer quote',
    layout: 'content',
    bg: 'surface',
    title: 'What customers say',
    els: [
      text(M, TOP, span(10), 220, 'display', '“We cut our power bill by a third in the first year.”'),
      { t: 'stripe', y: 704, th: 96, kinkX: 300, drop: 110, fill: 'accent' },
      text(col(7), 576, span(5), 48, 'body', 'Name Surname', { bold: true }),
      text(col(7), 624, span(5), 48, 'body', 'Head of Facilities, Company', { color: 'ink2' }),
    ],
    notes: 'Quote a real customer, word for word, with their permission. One sentence that fits on two lines at this size; cut the rest. Name and role on the right, above the Stripe. No photo needed.',
  },

  /* ----- The problem and our approach ----- */
  {
    id: 'photo',
    section: 'Problem and approach',
    name: 'Full photo with text',
    layout: 'photo',
    title: 'Built for sites that\nrun around the clock',
    body: 'Factories, offices, hospitals and data centres across 16 states.',
    els: [
      { t: 'image', x: 0, y: 0, w: W, h: H, src: '/assets/photos/spinning-mill.jpg' },
      { t: 'rect', x: 0, y: 0, w: W, h: H, fill: 'dark', alpha: 0.45 },
      { t: 'logo', x: M, y: 80, h: 56, tone: 'white' },
    ],
    notes: 'One big statement over a photo, to open a section or change pace. Keep it to two lines and one supporting sentence.\n\nThe photo sits under a Near Black shade so white text stays readable. To change it: click the photo (below the shade), Replace image. Pick a darker photo or one with a plain lower half.',
  },
  {
    id: 'image',
    section: 'Problem and approach',
    name: 'Text and photo',
    layout: 'image',
    title: 'Renewable power now costs less than the grid',
    body: 'In most states, solar and wind bought through open access land below the grid tariff, even after transmission and wheeling charges.',
    pic: '/assets/photos/wind-hills.jpg',
    els: [],
    notes: 'One message with one photo, text on the left. To change the photo: click it, then Replace image. Use photos from the design system’s Photography page: real Indian sites, no stock handshakes. Keep the text to two or three lines.',
  },
  {
    id: 'image-left',
    section: 'Problem and approach',
    name: 'Photo and text',
    layout: 'imageLeft',
    title: 'We deliver the project, not just the contract',
    body: 'Our team handles the agreement, the metering and the DISCOM approvals until power starts flowing.',
    pic: '/assets/photos/solar-site.jpg',
    els: [],
    notes: 'The mirror of “Text and photo”. Alternate the two so a deck doesn’t feel repetitive. Same rules: one message, two or three lines, a real photo.',
  },
  {
    id: 'timeline',
    section: 'Problem and approach',
    name: 'Before and after timeline',
    layout: 'content',
    title: 'Renewable power in three months, not a year',
    els: [
      ...['Decide to buy', 'Find suppliers', 'Compare quotes', 'Negotiate', 'Sign and connect'].flatMap((s, i) => [
        rule(col(i * 2.4), TOP + 24, span(2.4) - 0, 'line', 2),
        text(col(i * 2.4), TOP + 48, span(2.4), 96, 'body', s, { color: 'ink2' }),
      ]),
      text(M, TOP + 200, span(4), 48, 'body', 'Typical: 12 to 15 months', { bold: true }),
      rect(M, TOP + 256, FULL, 56, 'muted'),
      text(M, TOP + 376, span(4), 48, 'body', 'With Neufin: about 3 months', { bold: true, color: 'accent' }),
      rect(M, TOP + 432, Math.round(FULL / 4.5), 56, 'accent'),
      text(M, TOP + 528, span(9), 96, 'body', 'Contracts are pre-negotiated with our suppliers, so you choose terms instead of chasing quotes.', { color: 'ink2' }),
    ],
    notes: 'Shows the problem and our answer on one slide. Change the stages or months to match the client’s story. Keep the grey bar for their way and the violet bar for ours.',
  },
  {
    id: 'process',
    section: 'Problem and approach',
    name: 'Four steps',
    layout: 'content',
    title: 'We handle it end to end',
    els: [
      ['Design', 'We model your sites and the right mix of sources, in a day.'],
      ['Discover', 'Choose from 100+ pre-negotiated contracts with 30+ suppliers.'],
      ['Deliver', 'We handle the agreement, metering and DISCOM approvals.'],
      ['Optimise', 'Lumen tracks every unit and keeps your cost per unit low.'],
    ].flatMap(([k, v], i) => {
      const x = col(i * 3);
      return [
        rule(x, TOP, span(3), i === 0 ? 'accent' : 'line', 4),
        text(x, TOP + 40, span(3), 48, 'body', String(i + 1).padStart(2, '0'), { color: 'accent' }),
        text(x, TOP + 104, span(3), 72, 'title', k),
        text(x, TOP + 200, span(3) - 16, 220, 'body', v, { color: 'ink2' }),
      ];
    }),
    notes: 'How we work, in four steps. Use the same four words everywhere: Design, Discover, Deliver, Optimise. Keep each description to one sentence. To show where a client is today, move the violet line to that step.',
  },
  {
    id: 'compare',
    section: 'Problem and approach',
    name: 'Comparison table',
    layout: 'content',
    title: 'Ready-to-sign contracts instead of months of quotes',
    els: [
      {
        t: 'table', x: M, y: TOP, w: FULL, role: 'body', cols: [440, 644, 644], hl: 2,
        rows: [
          ['', 'Typical market', 'Neufin'],
          ['Price', 'Changes by supplier', 'Pre-negotiated, bulk pricing'],
          ['Contract length', '3 to 15 years', 'Spot, 3 months, 1 to 15 years'],
          ['Time to sign', '6 to 9 months', 'About 3 months'],
          ['Smallest size', '1.5 MWp', '0.5 MWp'],
          ['Terms', 'Different for each supplier', 'Shared before you start'],
        ],
      },
    ],
    notes: 'Us against the usual way. Neufin is always the last column and the only one tinted violet. Write facts, not adjectives. Up to six rows; use plain words instead of ticks and crosses.',
  },
  {
    id: 'offerings',
    section: 'Problem and approach',
    name: 'Two side by side',
    layout: 'content',
    title: 'Two ways to work with us',
    els: [
      ['Energy Networks', 'We buy renewable power for you, from design to supply.', ['Open access: group captive and third party', 'Rooftop and ground-mounted solar', 'Exchange power and storage']],
      ['Advisory', 'We plan your energy transition and report on it.', ['Techno-commercial and regulatory advice', 'Supplier and asset due diligence', 'Moving your suppliers to renewables']],
    ].flatMap(([k, lead, items], i) => {
      const x = col(i * 6);
      const w = span(6);
      return [
        rect(x, TOP, w, 600, 'surface'),
        text(x + 48, TOP + 48, w - 96, 72, 'title', k),
        text(x + 48, TOP + 136, w - 96, 96, 'body', lead),
        ...items.flatMap((it, j) => [
          rect(x + 48, TOP + 300 + j * 72 + 16, 12, 12, 'accent'),
          text(x + 84, TOP + 300 + j * 72, w - 132, 48, 'body', it, { color: 'ink2' }),
        ]),
      ];
    }),
    notes: 'Two offers, products or options side by side. Same structure in both panels: name, one sentence, three points. For three options with prices, use “Three options” instead.',
  },

  /* ----- The client's numbers ----- */
  {
    id: 'key-number',
    section: 'Client’s numbers',
    name: 'Big number and table',
    layout: 'content',
    title: 'You spend ₹42 Cr a year on power across 18 sites',
    els: [
      text(M, TOP, span(4), 120, 'display', '₹42 Cr', { color: 'accent' }),
      text(M, TOP + 128, span(3), 96, 'body', 'A year, across 18 sites in 6 states', { color: 'ink2' }),
      {
        t: 'table', x: col(4), y: TOP, w: span(8), role: 'small', cols: [300, 160, 220, 240, 224], align: ['l', 'r', 'r', 'r', 'r'],
        rows: [
          ['State', 'Sites', 'Demand', 'Units a month', '₹ per kWh'],
          ['Maharashtra', '7', '7.6 MVA', '12.0 L', '8.4–18.9'],
          ['Tamil Nadu', '4', '3.9 MVA', '5.2 L', '8.6–15.8'],
          ['Gujarat', '2', '2.4 MW', '3.8 L', '10.2'],
          ['Karnataka', '2', '1.8 MVA', '2.6 L', '9.1'],
          ['Others', '3', '3.2 MVA', '4.9 L', '6.1–11.0'],
        ],
      },
    ],
    notes:
      'Starts the client’s part of the deck: what they spend today, from the bills they shared. One big number on the left, the breakdown on the right.\n\nFigures here are examples. Replace every one, and check totals add up. Write money as ₹ with Cr or L; units as kWh, MW or MVA.',
  },
  {
    id: 'price-drop',
    section: 'Client’s numbers',
    name: 'Price drop',
    layout: 'violet',
    title: 'Your cost per unit drops by a third',
    els: [
      { t: 'stripe', y: 430, th: 150, kinkX: 760, drop: 260, fill: 'yellow' },
      text(M, 296, span(6), 110, 'display', '₹9.40', { color: 'white' }),
      text(M, 608, span(6), 48, 'body', 'Grid tariff today, per kWh', { color: 'white' }),
      text(col(7), 566, span(5), 110, 'display', '₹6.20', { color: 'white', align: 'right' }),
      text(col(7), 868, span(5), 48, 'body', 'With Neufin, per kWh', { color: 'white', align: 'right' }),
    ],
    notes: 'The one number that matters, drawn with the Stripe: the price steps down at the angle of the Neufin symbol. Use once per deck, for the headline saving.\n\nChange the two prices and the title. Keep the old price on the left and the new one on the right; don’t move the Stripe.',
  },
  {
    id: 'columns',
    section: 'Client’s numbers',
    name: 'Column chart',
    layout: 'content',
    title: 'Your monthly bill falls by a third after the switch',
    els: (() => {
      const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
      const bills = [24.6, 26.3, 25.1, 23.8, 24.9, 25.7, 16.8, 16.2, 15.9, 16.6, 17.1, 16.4];
      const x0 = M + 96;
      const x1 = M + FULL;
      const base = 868;
      const k = (base - 340) / 30;
      const slot = (x1 - x0) / 12;
      return [
        rect(col(8), 260, 20, 20, 'muted'),
        text(col(8) + 32, 252, span(2), 36, 'small', 'Grid tariff', { color: 'ink2' }),
        rect(col(10), 260, 20, 20, 'accent'),
        text(col(10) + 32, 252, span(2), 36, 'small', 'With Neufin', { color: 'ink2' }),
        ...[10, 20, 30].flatMap((v) => [
          rule(x0, base - v * k, x1 - x0, 'line', 2),
          text(M, base - v * k - 18, 80, 36, 'small', `${v} L`, { color: 'ink2', align: 'right' }),
        ]),
        rule(x0, base, x1 - x0, 'ink2', 2),
        ...bills.flatMap((v, i) => [
          rect(x0 + slot * i + (slot - 64) / 2, base - v * k, 64, v * k, i < 6 ? 'muted' : 'accent'),
          text(x0 + slot * i, base + 16, slot, 36, 'small', months[i], { color: 'ink2', align: 'center' }),
        ]),
      ];
    })(),
    notes: 'Change over time, month by month. Grey bars for before, violet for after Neufin. Up to 12 bars.\n\nThe bars are shapes, so edit them directly: change each bar’s height so 10 L is the same height everywhere (the grey lines are 10, 20, 30 L). Replace the example months and values.',
  },
  {
    id: 'donut',
    section: 'Client’s numbers',
    name: 'Donut chart',
    layout: 'content',
    title: 'Two thirds of your power will come from the sun and wind',
    els: (() => {
      const cx = M + 360;
      const cy = 616;
      const parts = [['Solar', 46, 'accent'], ['Wind', 22, 'accent2'], ['Grid', 32, 'line']];
      let a = 0;
      const arcs = parts.map(([, v, fill]) => {
        const el = { t: 'arc', cx, cy, r: 300, th: 96, a0: a * 3.6 + 1, a1: (a + v) * 3.6 - 1, fill };
        a += v;
        return el;
      });
      return [
        ...arcs,
        text(cx - 200, cy - 74, 400, 110, 'display', '68%', { color: 'accent', align: 'center' }),
        text(cx - 200, cy + 40, 400, 36, 'small', 'from renewables', { color: 'ink2', align: 'center' }),
        ...parts.flatMap(([k, v, fill], i) => {
          const y = TOP + 96 + i * 112;
          return [
            rule(col(6), y, span(6)),
            rect(col(6), y + 40, 24, 24, fill),
            text(col(6) + 48, y + 32, span(4), 48, 'body', k),
            text(col(10), y + 32, span(2), 48, 'body', `${v}%`, { align: 'right' }),
          ];
        }),
        text(col(6), TOP + 96 + 3 * 112 + 32, span(6), 96, 'body', 'Solar and wind through open access. The rest from the grid, mostly at night.', { color: 'ink2' }),
      ];
    })(),
    notes: 'Parts of a whole, such as the power mix. Three parts at most; group the rest as “Other”. Violet for Neufin’s sources, grey for the grid.\n\nThe ring is three arc shapes: drag each yellow handle to change its size, and keep the gaps. Update the big number and the list to match.',
  },
  {
    id: 'line',
    section: 'Client’s numbers',
    name: 'Line chart',
    layout: 'content',
    title: 'Grid prices keep rising. Your contract price doesn’t.',
    els: (() => {
      const years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031];
      const grid = [7.2, 7.5, 7.9, 8.2, 8.6, 9.0, 9.4, 9.9, 10.3, 10.8, 11.3];
      const x0 = M + 96;
      const x1 = M + FULL - 300;
      const base = 860;
      const top = 340;
      const k = (base - top) / 12;
      const X = (i) => x0 + ((x1 - x0) * i) / 10;
      const Y = (v) => base - v * k;
      const now = 5;
      return [
        ...[4, 8, 12].flatMap((v) => [
          rule(x0, Y(v), x1 - x0, 'line', 2),
          text(M, Y(v) - 18, 80, 36, 'small', `₹${v}`, { color: 'ink2', align: 'right' }),
        ]),
        rule(x0, base, x1 - x0, 'ink2', 2),
        { t: 'dash', x: X(now), y: top - 24, w: 0, h: base - top + 24, colour: 'muted' },
        text(X(now) + 12, top - 40, 160, 36, 'small', 'Today', { color: 'ink2' }),
        ...years.map((yr, i) => text(X(i) - 60, base + 16, 120, 36, 'small', String(yr), { color: 'ink2', align: 'center' })),
        ...grid.slice(1).map((v, i) => seg(X(i), Y(grid[i]), X(i + 1), Y(v), 'ink', 4)),
        seg(X(now), Y(6.3), X(10), Y(6.3), 'accent', 6),
        dot(X(10), Y(11.3), 10, 'ink'),
        dot(X(now), Y(6.3), 10, 'accent'),
        dot(X(10), Y(6.3), 10, 'accent'),
        text(x1 + 32, Y(11.3) - 24, 268, 48, 'body', 'Grid ₹11.30', { bold: true }),
        text(x1 + 32, Y(6.3) - 24, 268, 48, 'body', 'Neufin ₹6.30', { bold: true, color: 'accent' }),
        text(M, 924, FULL, 36, 'small', 'Grid tariff after 2026 projected at 5% a year. ₹ per kWh.', { color: 'ink2' }),
      ];
    })(),
    notes: 'A trend over time: what they pay now against what they would pay with us. Black line for the grid, violet for Neufin. Two lines at most.\n\nThe lines are shapes: move each point’s end to its new value, using the ₹4, ₹8 and ₹12 lines as a guide. Always say which values are projections.',
  },
  {
    id: 'waterfall',
    section: 'Client’s numbers',
    name: 'Price build-up',
    layout: 'content',
    title: 'Open access lands ₹2.49 below the grid rate',
    els: (() => {
      const steps = [
        ['PPA tariff', 4.5, 'base'],
        ['Losses', 0.55, 'add'],
        ['Transmission', 0.15, 'add'],
        ['Wheeling', 0.5, 'add'],
        ['Cross-subsidy', 0.38, 'add'],
        ['Other', 0.21, 'add'],
        ['Landed', 6.29, 'total'],
        ['Grid rate', 8.78, 'grid'],
      ];
      const base = BOTTOM - 96;
      const k = 56; // px per ₹
      const slot = FULL / steps.length;
      const barW = 136;
      let run = 0;
      const out = [rule(M, base, FULL, 'ink', 2)];
      steps.forEach(([label, v, kind], i) => {
        const x = M + i * slot + (slot - barW) / 2;
        const from = kind === 'add' ? run : 0;
        const to = kind === 'add' ? run + v : v;
        if (kind === 'base' || kind === 'total') run = v;
        if (kind === 'add') run += v;
        const y = base - to * k;
        const h = (to - from) * k;
        const fill = kind === 'grid' ? 'ink' : kind === 'add' ? 'muted' : 'accent';
        out.push(rect(x, y, barW, h, fill));
        out.push(text(M + i * slot, y - 44, slot, 36, 'small', kind === 'add' ? `+${v.toFixed(2)}` : `₹${v.toFixed(2)}`, { align: 'center' }));
        out.push(text(M + i * slot, base + 16, slot, 36, 'small', label, { align: 'center', color: 'ink2' }));
      });
      const gridTop = base - 8.78 * k;
      const landedX = M + 6 * slot;
      out.push({ t: 'dash', x: landedX + 24, y: gridTop, w: slot - 24, colour: 'ink' });
      out.push(text(landedX + slot / 2 - 140, gridTop + 16, 280, 40, 'small', '₹2.49 less per unit', { align: 'center', color: 'accent', bold: true }));
      return out;
    })(),
    notes:
      'Shows how the open-access price is built up, ending against the grid rate. Violet bars are Neufin’s price; grey bars are the charges added on top; the black bar is what they pay today.\n\nThe bars are shapes, so you can change them directly: edit the labels, then resize each bar so 1 ₹ = the same height everywhere. Replace the example values with the client’s.',
  },
  {
    id: 'table-lines',
    section: 'Client’s numbers',
    name: 'Table, full width',
    layout: 'content',
    title: 'Open access saves ₹3.8 Cr a year across six sites',
    els: [
      {
        t: 'table', x: M, y: TOP, w: FULL, role: 'small', cols: [340, 300, 260, 240, 260, 328],
        align: ['l', 'l', 'r', 'r', 'r', 'r'], accentCols: [4], boldCols: [5], totalRow: true,
        rows: [
          ['Site', 'State', 'Units a month', 'Grid ₹/kWh', 'Neufin ₹/kWh', 'Annual saving'],
          ['Pune office', 'Maharashtra', '2.1 L', '10.80', '6.60', '₹1.06 Cr'],
          ['Mumbai office', 'Maharashtra', '1.8 L', '11.40', '6.70', '₹1.02 Cr'],
          ['Ahmedabad office', 'Gujarat', '1.2 L', '10.20', '6.40', '₹0.55 Cr'],
          ['Chennai office', 'Tamil Nadu', '1.4 L', '9.60', '6.10', '₹0.59 Cr'],
          ['Noida office', 'Uttar Pradesh', '0.9 L', '8.80', '6.30', '₹0.27 Cr'],
          ['Bengaluru office', 'Karnataka', '0.8 L', '9.40', '6.50', '₹0.28 Cr'],
          ['Total', '', '8.2 L', '', '', '₹3.77 Cr'],
        ],
      },
    ],
    notes: 'Full-width table for site-by-site numbers. Thin grey lines between rows, numbers right-aligned, Neufin’s column in violet, total in the last row on Warm White.\n\nUp to eight rows; put longer lists in an appendix. Add or remove rows with right-click > Insert row / Delete row so the style carries over.',
  },
  {
    id: 'table-striped',
    section: 'Client’s numbers',
    name: 'Table, striped',
    layout: 'content',
    title: 'Pick the contract length that suits your plans',
    els: [
      {
        t: 'table', x: M, y: TOP, w: FULL, role: 'body', variant: 'striped', cols: [340, 340, 260, 300, 488], hlRow: 3,
        rows: [
          ['Contract', 'Length', 'Investment', '₹ per kWh', 'Best for'],
          ['Exchange', 'Day to day', 'None', 'Market price', 'Trying open access'],
          ['Short term', '3 months to 1 year', 'None', '7.0–8.0', 'Flexible needs'],
          ['Medium term', '3 to 5 years', 'None', '6.5–7.2', 'Most offices'],
          ['Long term', '10 to 15 years', 'Optional', '5.8–6.6', 'Lowest price per unit'],
          ['Group captive', '20 to 25 years', '26% equity', '5.5–6.7', 'Large, steady demand'],
        ],
      },
    ],
    notes: 'Full-width table with soft stripes instead of lines, for options or plans read across a row. The row we recommend is tinted violet.\n\nUp to six rows. To move the recommendation, change the violet row back to white or Warm White and tint the new one Violet 100.',
  },
  {
    id: 'screening',
    section: 'Client’s numbers',
    name: 'Site screening',
    layout: 'content',
    title: '8 of your 20 sites can switch to open access now',
    els: [
      ...[['20', 'sites checked', 'ink'], ['8', 'ready to switch', 'accent'], ['12', 'not yet', 'ink2']].flatMap(([n, l, c], i) => [
        text(col(i * 3), TOP - 16, span(1) + 40, 72, 'title', n, { color: c }),
        text(col(i * 3) + 112, TOP, span(2), 48, 'body', l, { color: 'ink2' }),
      ]),
      {
        t: 'table', x: M, y: TOP + 96, w: FULL, role: 'small', cols: [380, 260, 260, 220, 608],
        yesCol: 3,
        rows: [
          ['Site', 'State', 'DISCOM', 'Ready', 'Why not yet'],
          ['Pune office', 'Maharashtra', 'MSEDCL', 'Yes', ''],
          ['Ahmedabad office', 'Gujarat', 'Torrent Power', 'Yes', ''],
          ['Chennai office', 'Tamil Nadu', 'TNPDCL', 'Yes', ''],
          ['Nashik office', 'Maharashtra', 'MSEDCL', 'Not yet', 'Consumption too low for open access'],
          ['Mumbai office', 'Maharashtra', 'BEST', 'Not yet', 'DISCOM doesn’t allow open access'],
          ['Kolkata office', 'West Bengal', 'WBSEDCL', 'Not yet', 'State rules not yet favourable'],
        ],
      },
    ],
    notes:
      'Which of the client’s sites qualify. Title gives the answer. Counts on top, then sites below: “Yes” rows first, in violet. Up to seven rows here; put the full list in an appendix slide using the same table.\n\nNever show customer numbers or account numbers on a slide.',
  },

  /* ----- Options ----- */
  {
    id: 'options',
    section: 'Options',
    name: 'Three options',
    layout: 'content',
    title: 'Three ways to buy power for your Maharashtra sites',
    els: [
      ...[
        ['Group captive', 'Solar and wind hybrid', '6.55–6.69', [['PPA tariff', '₹4.00'], ['Annual saving', '₹3.3 Cr'], ['Investment', '₹1.2 Cr equity'], ['Term', '25 years']], true],
        ['Third party', 'Solar', '9.29–12.22', [['PPA tariff', '₹4.00'], ['Annual saving', '₹0.7 Cr'], ['Investment', 'None'], ['Term', '20–25 years']], false],
        ['Third party', 'Solar and wind hybrid', '9.34–11.96', [['PPA tariff', '₹4.00'], ['Annual saving', '₹1.4 Cr'], ['Investment', 'None'], ['Term', '20–25 years']], false],
      ].flatMap(([k, sub, num, rows, rec], i) => {
        const x = col(i * 4);
        const w = span(4);
        const pad = 40;
        const top = TOP + 48;
        return [
          rec ? text(x, TOP - 8, w, 40, 'small', 'Recommended', { color: 'accent', bold: true }) : null,
          rect(x, top, w, 560, rec ? 'white' : 'surface', rec ? { border: 'accent' } : {}),
          text(x + pad, top + 40, w - 2 * pad, 48, 'body', k, { bold: true }),
          text(x + pad, top + 88, w - 2 * pad, 48, 'body', sub, { color: 'ink2' }),
          text(x + pad, top + 168, w - 2 * pad, 72, 'title', num, { color: rec ? 'accent' : 'ink' }),
          text(x + pad, top + 240, w - 2 * pad, 40, 'small', 'Landed tariff, ₹ per kWh', { color: 'ink2' }),
          ...rows.flatMap(([l, v], j) => [rule(x + pad, top + 304 + j * 60, w - 2 * pad), ...pair(x + pad, top + 316 + j * 60, w - 2 * pad, l, v)]),
        ].filter(Boolean);
      }),
      text(M, TOP + 632, FULL, 40, 'small', 'Indicative tariffs for discussion only, not an offer. Final tariffs depend on capacity, sites, supplier, contract and charges at signing.', { color: 'ink2' }),
    ],
    notes:
      'Options for one state or group of sites. Up to three cards. Put the one we recommend first, with the violet outline and “Recommended”; the others stay grey.\n\nFigures are examples. Keep the same four rows in every card so they compare line by line. Keep the footnote whenever tariffs are shown.',
  },

  /* ----- Close ----- */
  {
    id: 'next',
    section: 'Close',
    name: 'Next steps',
    layout: 'content',
    title: 'Next steps',
    els: [
      ['This week', 'Share 12 months of bills for each site', 'You'],
      ['Week 2', 'Detailed model and supplier shortlist', 'Neufin'],
      ['Week 4', 'Choose an option and sign the term sheet', 'You and Neufin'],
      ['Month 3', 'Power supply starts', 'Neufin'],
    ].flatMap(([when, what, who], i) => {
      const y = TOP + i * 136;
      return [
        rule(M, y, FULL),
        text(M, y + 40, span(3), 48, 'body', when, { color: 'accent', bold: true }),
        text(col(3), y + 40, span(6), 48, 'body', what),
        text(col(9), y + 40, span(3), 48, 'body', who, { color: 'ink2', align: 'right' }),
      ];
    }),
    notes: 'End every proposal with dates and owners, agreed in the meeting if you can. Up to five rows. The first step should be one the client can do this week.',
  },
  {
    id: 'closing',
    section: 'Close',
    name: 'Closing',
    layout: 'brand',
    title: 'Send us your\nlatest power bill',
    body: 'We’ll show you what you could save.',
    els: [
      text(col(7), 922, span(5), 44, 'body', 'Firstname Lastname', { bold: true }),
      text(col(7), 966, span(5), 44, 'body', 'name@neufin.energy · +91 00000 00000'),
    ],
    notes: 'Last slide. One request in the title, one line on what happens next, and your name, email and phone on the Stripe. Not “Thank you” and not “Questions?”.',
  },
];

// Soft tables: thin Grey 200 lines (or Warm White stripes), grey header, no outer border.
export function tableCell(el, i, j) {
  const last = i === el.rows.length - 1;
  const head = i === 0;
  const yes = !head && j === el.yesCol && el.rows[i][j] === 'Yes';
  const total = el.totalRow && last;
  const hlRow = i === el.hlRow;
  return {
    bold: head || yes || total || hlRow || (!head && el.boldCols?.includes(j)),
    color: head ? 'ink2' : yes || el.accentCols?.includes(j) ? 'accent' : j === el.yesCol ? 'ink2' : 'ink',
    fill: hlRow ? 'tint' : j === el.hl ? 'tint' : total ? 'surface' : el.variant === 'striped' && !head && i % 2 === 1 ? 'surface' : null,
    line: el.variant === 'striped' || last ? null : 'line',
  };
}

// Every slide with its layout's fixed elements first, ready to draw.
export function elementsFor(slide) {
  const L = layouts[slide.layout];
  return { layout: L, els: [...L.els, ...slide.els] };
}

export { stripePoints };
