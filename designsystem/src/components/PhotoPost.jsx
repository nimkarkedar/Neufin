import { useId } from 'react';
import { asset } from '../brand/asset.js';
import { stripePoints, markBand, STRIPE_SLOPE } from './Stripe.jsx';
import { Logo } from './Logo.jsx';
import { Duotone, VioletWash } from './PhotoFilters.jsx';

// Photo posts are drawn on a 1080-wide canvas with a 90 px module: 12 columns,
// 15 rows at 4:5 and 12 rows at 1:1. Every overlay and text edge sits on a module line.
// `ribbon` is the grid row where the ribbon starts at [4:5, 1:1], chosen to keep faces clear (default [5, 4]).
export const W = 1080;
export const G = 90;
const u = (n) => `${(n / 10.8).toFixed(3)}cqw`;

export const photos = [
  { id: 'electrician', src: '/assets/photos/electrician.jpg', alt: 'Electrician in a hard hat working on a switch box', align: 'xMinYMid', ribbon: [8, 7] },
  { id: 'solar-site', src: '/assets/photos/solar-site.jpg', alt: 'Solar park under construction, seen from above', align: 'xMidYMid' },
  { id: 'factory-floor', src: '/assets/photos/factory-floor.jpg', alt: 'Workers at tables on a textile factory floor', align: 'xMaxYMid' },
  { id: 'transformer-crew', src: '/assets/photos/transformer-crew.jpg', alt: 'Crew in hard hats installing a transformer', align: 'xMidYMid' },
  { id: 'pylon-sky', src: '/assets/photos/pylon-sky.jpg', alt: 'Transmission tower against a pink and blue sky', align: 'xMaxYMid' },
  { id: 'spinning-mill', src: '/assets/photos/spinning-mill.jpg', alt: 'Worker tending a machine in a spinning mill', align: 'xMidYMid' },
  { id: 'pylon-lattice', src: '/assets/photos/pylon-lattice.jpg', alt: 'Looking up through the steel lattice of a pylon', align: 'xMidYMid' },
  { id: 'pylon-dusk', src: '/assets/photos/pylon-dusk.jpg', alt: 'Transmission tower and power lines against a violet and peach dusk sky', align: 'xMinYMid' },
  // Supplied by Kedar; cropped above the trees and fields for the website's home hero.
  { id: 'pylon-blue-hour', src: '/assets/photos/pylon-blue-hour.jpg', alt: 'A line of transmission towers and poles under a clear blue evening sky', align: 'xMaxYMid' },
  // Supplied by Kedar for the home page's How we keep your price low cards (cropped 4:5).
  { id: 'laptop-software', src: '/assets/photos/laptop-software.jpg', alt: 'Person working in energy software on a laptop', align: 'xMidYMid' },
  // Unsplash License: satyaprakash kumawat, Prestige Lakeside Habitat, Whitefield, Bengaluru (Unsplash ID ky1d-IWCBis),
  // cropped to the city and the dusk sky. Placeholder for the website's Contact header until Neufin's own photos arrive.
  { id: 'bengaluru-night', src: '/assets/photos/bengaluru-night.jpg', alt: 'Bengaluru at dusk from a high floor, the city lights running to the horizon', align: 'xMidYMid' },
  // Supplied by Kedar (2026-10-26), 1200 × 1800, for the Careers What it's like cards.
  { id: 'careers-team-coding', src: '/assets/photos/careers-team-coding.jpg', alt: 'A developer at a desk with code on the screen in an open office', align: 'xMidYMid' },
  { id: 'careers-wind-farm', src: '/assets/photos/careers-wind-farm.jpg', alt: 'Wind turbines on green fields under a deep blue sky', align: 'xMidYMid' },
  { id: 'careers-pylon-dusk', src: '/assets/photos/careers-pylon-dusk.jpg', alt: 'A transmission tower and its wires from below at dusk', align: 'xMidYMid' },
  // Supplied by Kedar (2026-10-26), cropped square to 810 × 810. Careers, Why we started Neufin.
  { id: 'founders-rushil-rahool', src: '/assets/photos/founders-rushil-rahool.jpg', alt: 'Rushil and Rahool, Neufin’s co-founders, smiling on a railway station platform', align: 'xMinYMid' },
  // Supplied by Kedar (2026-10-26), cropped to 1800 × 750. Careers header.
  { id: 'expressway-night', src: '/assets/photos/expressway-night.jpg', alt: 'Light trails on a curving expressway flyover near Pune at dusk, dark hills behind', align: 'xMidYMid' },
  // Unsplash License: Dewang Gupta, New Delhi (Unsplash ID z55PxEI-7t8), cropped to 1800 × 750. Former Careers header placeholder.
  { id: 'pylon-mist-delhi', src: '/assets/photos/pylon-mist-delhi.jpg', alt: 'A pylon and fishermen in a boat on a misty lake at dawn, New Delhi', align: 'xMidYMid' },
  // Unsplash License: litoon dev (Unsplash ID E8pqwxaS6ko), 1600 × 1067. Careers placeholder for the team at work.
  { id: 'engineers-at-screen', src: '/assets/photos/engineers-at-screen.jpg', alt: 'Two engineers looking closely at a computer screen', align: 'xMinYMid' },
  // Supplied by Kedar (2026-10-31), 6000 × 4000, cropped to the left 4500 × 1875 (she sits at about 72% across, clear of the
  // header text) and saved at 3600 × 1500. About header. TODO: credit, and the worker's consent to appear.
  { id: 'factory-worker-edging', src: '/assets/photos/factory-worker-edging.jpg', alt: 'A smiling worker in a blue uniform and hairnet at an over-edging machine on a factory floor', align: 'xMaxYMid' },
  // Supplied by Kedar (2026-10-31), 2090 × 608, saved as is (a 2× file would be 3200px or more). Run and optimise header. TODO: credit.
  { id: 'wind-turbine-sky', src: '/assets/photos/wind-turbine-sky.jpg', alt: 'One wind turbine with red-tipped blades against a clear blue sky', align: 'xMidYMid' },
  // Supplied by Kedar (2026-10-29), 1200 × 1800. Services, Move a meter card. TODO: credit.
  // Supplied by Kedar (2026-10-29), 1122 × 1402. Services, Bill name change card. TODO: credit; it shows MSEDCL's
  // name and logo, a named customer, an address and a QR code (confirm they are sample data and that the board's mark may be shown).
  { id: 'electricity-bill', src: '/assets/photos/electricity-bill.jpg', alt: 'A hand holding a printed electricity bill from the Maharashtra state electricity board', align: 'xMidYMid' },
  // Supplied by Kedar (2026-10-29), 1350 × 1800. Services, Open access card. TODO: credit.
  { id: 'switch-panel', src: '/assets/photos/switch-panel.jpg', alt: 'A red isolator switch and three rocker switches, red, orange and green, on a turquoise panel', align: 'xMidYMid' },
  { id: 'meters-wall', src: '/assets/photos/meters-wall.jpg', alt: 'Rows of grey electricity meter cabinets with padlocks against a brick wall with conduit pipes', align: 'xMidYMid' },
  { id: 'electrician-rack', src: '/assets/photos/electrician-rack.jpg', alt: 'Technician in a high-visibility vest wiring an electrical cabinet', align: 'xMinYMid' },
];

export const treatments = [
  { id: 'natural', label: 'Natural' },
  { id: 'wash', label: 'Violet wash' },
  { id: 'duotone', label: 'Duotone' },
];

export const fields = [
  { token: 'warm-white', label: 'Warm White' },
  { token: 'electric-violet', label: 'Electric Violet' },
  { token: 'violet-900', label: 'Violet 900' },
  { token: 'near-black', label: 'Near Black' },
];

// Parallel lanes of the Stripe, stacked top to bottom. Each lane shifts its kink by the
// Stripe's 0.29 offset so every diagonal edge stays on the same 32° line family.
function lanes({ y, kinkX, drop, widths }) {
  let d = 0;
  return widths.map((t) => {
    const pts = stripePoints({ width: W, y: y + d, thickness: t, kinkX: kinkX - 0.29 * d, drop });
    d += t;
    return pts;
  });
}

function Filters({ id }) {
  return (
    <>
      <VioletWash id={`${id}-wash`} />
      <Duotone id={`${id}-duotone`} dark="violet-900" light="violet-200" />
      {/* Ribbon lanes: the photo seen through violet. The middle lane is lighter. */}
      <Duotone id={`${id}-lane`} dark="violet-900" light="violet-400" />
      <Duotone id={`${id}-lane-light`} dark="violet-500" light="white" />
    </>
  );
}

function Img({ c, filter, clip, box = [0, 0, W, c.H] }) {
  return (
    <image
      href={asset(c.photo.src)}
      x={box[0]} y={box[1]} width={box[2]} height={box[3]}
      preserveAspectRatio={`${c.photo.align} slice`}
      filter={filter && filter !== 'natural' ? `url(#${c.id}-${filter})` : undefined}
      clipPath={clip ? `url(#${c.id}-${clip})` : undefined}
    />
  );
}

function Clip({ c, name, points, rect }) {
  return (
    <clipPath id={`${c.id}-${name}`}>
      {points ? <polygon points={points} /> : <rect x={rect[0]} y={rect[1]} width={rect[2]} height={rect[3]} />}
    </clipPath>
  );
}

// The ribbon: three lanes of the Stripe that turn the photo violet where they cross it.
// The lanes split the thickness t 2 : 1 : 2, so the default 2.5 modules gives 90, 45 and 90.
function Ribbon({ c, y, kinkX, drop, t = 2.5 * G, clip }) {
  const ls = lanes({ y, kinkX, drop, widths: [(t * 2) / 5, t / 5, (t * 2) / 5] });
  return {
    defs: ls.map((p, i) => <Clip key={i} c={c} name={`lane${i}`} points={p} />),
    art: (
      <g clipPath={clip ? `url(#${c.id}-${clip})` : undefined}>
        {ls.map((_, i) => <Img key={i} c={c} filter={i === 1 ? 'lane-light' : 'lane'} clip={`lane${i}`} />)}
      </g>
    ),
  };
}

function Mark({ c, x, y, right, h = 56 }) {
  const light = c.field.token === 'warm-white';
  return (
    <div className="post-logo" style={{ left: x != null ? u(x) : undefined, right: right != null ? u(right) : undefined, top: u(y) }}>
      <Logo height={u(h)} color={light ? 'var(--near-black)' : 'var(--warm-white)'} markColor={light ? 'var(--electric-violet)' : undefined} />
    </div>
  );
}

function Head({ c, x, y, w, size }) {
  const ink = c.field.token === 'warm-white' ? 'var(--near-black)' : 'var(--warm-white)';
  return <div className="post-head" style={{ left: u(x), top: u(y), width: u(w), fontSize: u(size), lineHeight: 1, color: ink }}>{c.headline}</div>;
}

// A solid block on the grid with the logo and headline inside.
function TextBlock({ c, x, y, w, h, size }) {
  return {
    art: <rect x={x} y={y} width={w} height={h} fill={c.field.css} />,
    text: (
      <>
        <Mark c={c} x={x + G} y={y + G * 0.6} />
        <Head c={c} x={x + G} y={y + G * 1.65} w={w - G * 1.5} size={size} />
      </>
    ),
  };
}

// Slider controls for the Try it playground, in canvas px. Each layout lists its own; the values reach
// render as c.v. min and max can depend on the other values (v). Values are continuous so the post
// tracks the thumb; the defaults are the layouts as designed, on the grid.
const slider = (key, label, min, max) => (value) => ({ key, label, min, max, value });
const thickness = slider('t', 'Thickness', 1.5 * G, 4 * G);
const drop = slider('drop', 'Drop', G, 6 * G);
const turn = slider('turn', 'Turn point', 0, 8 * G);
const position = (bottom) => slider('y', 'Position', (v) => -v.t / 2, (v) => bottom(v) - v.drop - v.t / 2);
const blockSize = slider('block', 'Block size', 3 * G, 8 * G);
const textSize = slider('size', 'Text size', 40, 120);
const stripeSliders = (c, { y, t, kinkX, bottom = () => c.H }) => [thickness(t), drop(3 * G), turn(kinkX), position(bottom)(y)];
const windowHead = (c) => (c.portrait ? 10.5 * G : 8.5 * G);

export const layouts = [
  {
    id: 'plain',
    label: 'Photo only',
    hidden: true,
    treatment: 'natural',
    field: 'warm-white',
    render: (c) => ({ art: <Img c={c} filter={c.treatment} /> }),
  },
  {
    id: 'ribbon',
    label: 'Ribbon',
    note: 'The Stripe in three lanes crosses the photo. Inside the lanes the photo turns violet. Logo on a block, no headline.',
    treatment: 'natural',
    field: 'warm-white',
    controls: (c) => [
      ...stripeSliders(c, { y: (c.photo.ribbon ?? [5, 4])[c.portrait ? 0 : 1] * G, t: 2.5 * G, kinkX: 3 * G }),
      slider('block', 'Logo block', 2 * G, 4 * G)(2 * G),
    ],
    render(c) {
      const { y, t, turn: kinkX, drop: d, block } = c.v;
      const r = Ribbon({ c, y, t, kinkX, drop: d });
      const k = block / (2 * G);
      return {
        defs: r.defs,
        art: (
          <>
            <Img c={c} filter={c.treatment} />
            {r.art}
            <rect x={0} y={c.H - block} width={2 * block} height={block} fill={c.field.css} />
          </>
        ),
        text: <Mark c={c} x={G * k} y={c.H - block + 62 * k} h={56 * k} />,
      };
    },
  },
  {
    id: 'panel',
    label: 'Panel',
    note: 'The photo shares the canvas with a solid panel for the logo and headline. The ribbon runs to the panel edge.',
    treatment: 'natural',
    field: 'warm-white',
    controls: (c) => [
      c.portrait ? slider('panel', 'Panel size', 5 * G, 9 * G)(6 * G) : slider('panel', 'Panel size', 4 * G, 7 * G)(5 * G),
      ...stripeSliders(c, { y: 3 * G, t: 2.5 * G, kinkX: c.portrait ? 4 * G : 7 * G, bottom: (v) => (c.portrait ? c.H - v.panel : c.H) }),
      textSize(c.portrait ? 80 : 54),
    ],
    render(c) {
      const { y, t, turn: kinkX, drop: d, panel, size } = c.v;
      const top = c.H - panel;
      const box = c.portrait ? [0, 0, W, top] : [panel, 0, W - panel, c.H];
      const r = Ribbon({ c, y, t, kinkX, drop: d, clip: 'box' });
      return {
        defs: <><Clip c={c} name="box" rect={box} />{r.defs}</>,
        art: <><Img c={c} filter={c.treatment} box={box} />{r.art}</>,
        text: c.portrait ? (
          <><Mark c={c} x={G} y={top + G} /><Head c={c} x={G} y={top + 2.3 * G} w={10 * G} size={size} /></>
        ) : (
          <><Mark c={c} x={G} y={G} /><Head c={c} x={G} y={6.5 * G} w={panel - 1.4 * G} size={size} /></>
        ),
      };
    },
  },
  {
    id: 'lens',
    label: 'Lens',
    note: 'The whole photo in duotone, with natural colour only inside the Stripe.',
    treatment: 'duotone',
    fixed: true,
    field: 'electric-violet',
    controls: (c) => [
      ...stripeSliders(c, { y: c.portrait ? 4 * G : 3 * G, t: 2 * G, kinkX: 4 * G }),
      blockSize(c.portrait ? 5 * G : 4 * G),
      textSize(c.portrait ? 70 : 54),
    ],
    render(c) {
      const { y, t, turn: kinkX, drop: d, block, size } = c.v;
      const pts = stripePoints({ width: W, y, thickness: t, kinkX, drop: d });
      const b = TextBlock({ c, x: 0, y: c.H - block, w: 8 * G, h: block, size });
      return {
        defs: <Clip c={c} name="lens" points={pts} />,
        art: <><Img c={c} filter="duotone" /><Img c={c} clip="lens" />{b.art}</>,
        text: b.text,
      };
    },
  },
  {
    id: 'cut',
    label: 'Cut',
    note: 'A solid field cuts into the photo along the Stripe’s step. The headline sits below the step.',
    treatment: 'natural',
    field: 'electric-violet',
    controls: (c) => [
      drop(2 * G),
      turn(5 * G),
      slider('y', 'Position', 0, (v) => c.H - v.drop - 5 * G)(c.portrait ? 8 * G : 5 * G),
      textSize(c.portrait ? 80 : 64),
    ],
    render(c) {
      const { y: yL, turn: kinkX, drop: d, size } = c.v;
      const run = d / STRIPE_SLOPE;
      const field = [[0, yL], [kinkX, yL], [kinkX + run, yL + d], [W, yL + d], [W, c.H], [0, c.H]].map((p) => p.join(',')).join(' ');
      return {
        art: <><Img c={c} filter={c.treatment} /><polygon points={field} fill={c.field.css} /></>,
        text: (
          <>
            <Head c={c} x={G} y={yL + d + G * 0.55} w={9 * G} size={size} />
            <Mark c={c} x={G} y={c.H - G - 56} />
          </>
        ),
      };
    },
  },
  {
    id: 'window',
    label: 'Window',
    note: 'The photo shows only through one band of the symbol, on a solid canvas.',
    treatment: 'natural',
    field: 'violet-900',
    controls: (c) => [
      slider('m', 'Thickness', 150, 330)(c.portrait ? 300 : 240),
      turn(2 * G),
      slider('y', 'Position', (v) => -v.m / 2, (v) => windowHead(c) - 2.723 * v.m)(c.portrait ? G : 60),
      textSize(c.portrait ? 80 : 60),
    ],
    render(c) {
      const { m, turn: kink, y, size } = c.v;
      const b = markBand({ x0: -20, kink, y, m, x2: W + 20 });
      return {
        defs: <Clip c={c} name="window" points={b.points} />,
        art: <Img c={c} filter={c.treatment} clip="window" />,
        text: (
          <>
            <Mark c={c} right={G} y={c.portrait ? G : 60} />
            <Head c={c} x={G} y={windowHead(c)} w={8 * G} size={size} />
          </>
        ),
      };
    },
  },
  {
    id: 'blocks',
    label: 'Blocks',
    note: 'Solid blocks on the grid cover part of the photo. A Signal Yellow square sits corner to corner with the text block, like the symbol’s square ends.',
    treatment: 'wash',
    field: 'electric-violet',
    controls: (c) => [blockSize(c.portrait ? 5 * G : 4 * G), textSize(c.portrait ? 64 : 54)],
    render(c) {
      const { block: h, size } = c.v;
      const b = TextBlock({ c, x: 0, y: c.H - h, w: 7 * G, h, size });
      return {
        art: <><Img c={c} filter={c.treatment} />{b.art}<rect x={7 * G} y={c.H - h - G} width={G} height={G} fill="var(--signal-yellow)" /></>,
        text: b.text,
      };
    },
  },
];

function GridLines({ H }) {
  const lines = [];
  for (let x = G; x < W; x += G) lines.push(<line key={`x${x}`} x1={x} y1={0} x2={x} y2={H} />);
  for (let y = G; y < H; y += G) lines.push(<line key={`y${y}`} x1={0} y1={y} x2={W} y2={y} />);
  return <g className="post-grid-lines" stroke="var(--white)" strokeOpacity="0.55" strokeWidth="1.5" style={{ mixBlendMode: 'difference' }}>{lines}</g>;
}

const bound = (b, v, c) => (typeof b === 'function' ? b(v, c) : b);

// The layout's sliders with their live ranges, and the clamped values to draw with. `adjust` holds
// only the values someone has moved; the rest follow the layout's defaults (the ribbon's follows the photo).
export function postControls({ layout = 'ribbon', photo = photos[0], ratio = 'portrait', adjust = {} }) {
  const c = { photo, portrait: ratio === 'portrait', H: ratio === 'portrait' ? 1350 : 1080 };
  const list = layouts.find((l) => l.id === layout).controls?.(c) ?? [];
  const v = Object.fromEntries(list.map((s) => [s.key, adjust[s.key] ?? s.value]));
  const range = (s) => [bound(s.min, v, c), bound(s.max, v, c)];
  for (let pass = 0; pass < 2; pass += 1) {
    list.forEach((s) => { const [lo, hi] = range(s); v[s.key] = Math.min(hi, Math.max(lo, v[s.key])); });
  }
  const sliders = list.map((s) => { const [min, max] = range(s); return { key: s.key, label: s.label, min, max, value: v[s.key] }; });
  return { sliders, values: v };
}

export function PhotoPost({ photo = photos[0], layout = 'ribbon', ratio = 'portrait', treatment, field, headline = 'Power that costs less, from sources you choose.', grid = false, adjust }) {
  const id = `pp${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const L = layouts.find((l) => l.id === layout);
  const H = ratio === 'portrait' ? 1350 : 1080;
  const token = field ?? L.field;
  const c = {
    id, H, photo, headline,
    portrait: ratio === 'portrait',
    treatment: L.fixed ? L.treatment : treatment ?? L.treatment,
    field: { token, css: `var(--${token})` },
    v: postControls({ layout, photo, ratio, adjust }).values,
  };
  const { defs, art, text } = L.render(c);
  return (
    <div className="post" style={{ aspectRatio: `${W} / ${H}`, background: c.field.css }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="post-art" aria-label={photo.alt}>
        <defs><Filters id={id} />{defs}</defs>
        {art}
        {grid && <GridLines H={H} />}
      </svg>
      {text}
    </div>
  );
}

const blobToDataUrl = (blob) => new Promise((resolve, reject) => {
  const r = new FileReader();
  r.onload = () => resolve(r.result);
  r.onerror = () => reject(r.error);
  r.readAsDataURL(blob);
});

// An SVG as a standalone image: token variables become their values, since an image can't see the page's CSS.
async function svgImage(svg) {
  const root = getComputedStyle(document.documentElement);
  const markup = new XMLSerializer().serializeToString(svg).replace(/var\(--([\w-]+)\)/g, (_, n) => root.getPropertyValue(`--${n}`).trim());
  const url = URL.createObjectURL(new Blob([markup], { type: 'image/svg+xml' }));
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

// Draws a headline line by line where the browser broke it, read from each character's box,
// so the PNG wraps exactly as the post on screen.
function drawHead(ctx, head, box, k) {
  const cs = getComputedStyle(head);
  const size = parseFloat(cs.fontSize) * k;
  ctx.font = `${cs.fontWeight} ${size}px ${cs.fontFamily}`;
  ctx.fillStyle = cs.color;
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${(parseFloat(cs.letterSpacing) || 0) * k}px`;
  ctx.textBaseline = 'alphabetic';
  const ascent = ctx.measureText(head.textContent).fontBoundingBoxAscent;
  const lines = [];
  const range = document.createRange();
  const walker = document.createTreeWalker(head, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    for (let i = 0; i < n.length; i += 1) {
      range.setStart(n, i);
      range.setEnd(n, i + 1);
      const r = range.getClientRects()[0];
      const ch = n.data[i];
      const last = lines.at(-1);
      if (r && /\S/.test(ch) && (!last || Math.abs(r.top - last.top) > r.height / 2)) lines.push({ top: r.top, left: r.left, text: ch });
      else if (last) last.text += ch;
    }
  }
  lines.forEach((l) => ctx.fillText(l.text.replace(/\s+/g, ' ').trim(), (l.left - box.left) * k, (l.top - box.top) * k + ascent));
}

// Saves a rendered PhotoPost as a PNG at `scale` times the 1080 canvas, with the full photo file and
// without the grid. The art and logos are drawn as SVG images and the headline as canvas text.
export async function downloadPost(post, filename, scale = 2) {
  await document.fonts.ready;
  const box = post.getBoundingClientRect();
  const k = (W * scale) / box.width;
  const canvas = document.createElement('canvas');
  canvas.width = W * scale;
  canvas.height = Math.round(box.height * k);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = getComputedStyle(post).backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const art = post.querySelector('.post-art').cloneNode(true);
  art.querySelectorAll('.post-grid-lines').forEach((g) => g.remove());
  art.setAttribute('width', canvas.width);
  art.setAttribute('height', canvas.height);
  const photoUrls = new Map();
  for (const img of art.querySelectorAll('image')) {
    const href = img.getAttribute('href');
    if (!photoUrls.has(href)) photoUrls.set(href, await fetch(href).then((r) => r.blob()).then(blobToDataUrl));
    img.setAttribute('href', photoUrls.get(href));
  }
  ctx.drawImage(await svgImage(art), 0, 0, canvas.width, canvas.height);

  for (const logo of post.querySelectorAll('.post-logo svg')) {
    const r = logo.getBoundingClientRect();
    const copy = logo.cloneNode(true);
    copy.removeAttribute('style');
    copy.setAttribute('color', getComputedStyle(logo).color);
    copy.setAttribute('width', r.width * k);
    copy.setAttribute('height', r.height * k);
    ctx.drawImage(await svgImage(copy), (r.left - box.left) * k, (r.top - box.top) * k, r.width * k, r.height * k);
  }
  post.querySelectorAll('.post-head').forEach((head) => drawHead(ctx, head, box, k));

  const png = await new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('PNG export failed'))), 'image/png'));
  const a = document.createElement('a');
  a.href = URL.createObjectURL(png);
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
