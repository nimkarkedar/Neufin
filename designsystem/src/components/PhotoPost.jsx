import { useId } from 'react';
import { asset } from '../brand/asset.js';
import { hexOf } from '../brand/tokens.js';
import { stripePoints, markBand, STRIPE_SLOPE } from './Stripe.jsx';
import { Logo } from './Logo.jsx';

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

const rgb = (hex) => [1, 3, 5].map((i) => (parseInt(hex.slice(i, i + 2), 16) / 255).toFixed(3));
const LUMA = '.2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 0 0 0 1 0';

// Maps the photo's shadows to `dark` and highlights to `light`.
function Duotone({ id, dark, light }) {
  const a = rgb(hexOf(dark));
  const b = rgb(hexOf(light));
  return (
    <filter id={id} colorInterpolationFilters="sRGB" x="0" y="0" width="1" height="1">
      <feColorMatrix type="matrix" values={LUMA} />
      <feComponentTransfer>
        <feFuncR type="table" tableValues={`${a[0]} ${b[0]}`} />
        <feFuncG type="table" tableValues={`${a[1]} ${b[1]}`} />
        <feFuncB type="table" tableValues={`${a[2]} ${b[2]}`} />
      </feComponentTransfer>
    </filter>
  );
}

function Filters({ id }) {
  return (
    <>
      {/* Violet wash: Violet 300 multiplied at 45%. */}
      <filter id={`${id}-wash`} colorInterpolationFilters="sRGB" x="0" y="0" width="1" height="1">
        <feFlood floodColor={hexOf('violet-300')} floodOpacity="0.45" result="f" />
        <feBlend in="SourceGraphic" in2="f" mode="multiply" />
      </filter>
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
function Ribbon({ c, y, kinkX, drop, clip }) {
  const ls = lanes({ y, kinkX, drop, widths: [G, G / 2, G] });
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
    render(c) {
      const row = (c.photo.ribbon ?? [5, 4])[c.portrait ? 0 : 1];
      const r = Ribbon({ c, y: row * G, kinkX: 3 * G, drop: 3 * G });
      return {
        defs: r.defs,
        art: (
          <>
            <Img c={c} filter={c.treatment} />
            {r.art}
            <rect x={0} y={c.H - 2 * G} width={4 * G} height={2 * G} fill={c.field.css} />
          </>
        ),
        text: <Mark c={c} x={G} y={c.H - 2 * G + 62} />,
      };
    },
  },
  {
    id: 'panel',
    label: 'Panel',
    note: 'The photo shares the canvas with a solid panel for the logo and headline. The ribbon runs to the panel edge.',
    treatment: 'natural',
    field: 'warm-white',
    render(c) {
      const box = c.portrait ? [0, 0, W, 9 * G] : [5 * G, 0, 7 * G, c.H];
      const r = c.portrait
        ? Ribbon({ c, y: 3 * G, kinkX: 4 * G, drop: 3 * G, clip: 'box' })
        : Ribbon({ c, y: 3 * G, kinkX: 7 * G, drop: 3 * G, clip: 'box' });
      return {
        defs: <><Clip c={c} name="box" rect={box} />{r.defs}</>,
        art: <><Img c={c} filter={c.treatment} box={box} />{r.art}</>,
        text: c.portrait ? (
          <><Mark c={c} x={G} y={10 * G} /><Head c={c} x={G} y={11.3 * G} w={10 * G} size={80} /></>
        ) : (
          <><Mark c={c} x={G} y={G} /><Head c={c} x={G} y={6.5 * G} w={3.6 * G} size={54} /></>
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
    render(c) {
      const pts = stripePoints({ width: W, y: c.portrait ? 4 * G : 3 * G, thickness: 2 * G, kinkX: 4 * G, drop: 3 * G });
      const b = c.portrait ? TextBlock({ c, x: 0, y: c.H - 5 * G, w: 8 * G, h: 5 * G, size: 70 }) : TextBlock({ c, x: 0, y: c.H - 4 * G, w: 8 * G, h: 4 * G, size: 54 });
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
    render(c) {
      const yL = c.portrait ? 8 * G : 5 * G;
      const kinkX = 5 * G;
      const drop = 2 * G;
      const run = drop / STRIPE_SLOPE;
      const field = [[0, yL], [kinkX, yL], [kinkX + run, yL + drop], [W, yL + drop], [W, c.H], [0, c.H]].map((p) => p.join(',')).join(' ');
      return {
        art: <><Img c={c} filter={c.treatment} /><polygon points={field} fill={c.field.css} /></>,
        text: (
          <>
            <Head c={c} x={G} y={yL + drop + G * 0.55} w={9 * G} size={c.portrait ? 80 : 64} />
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
    render(c) {
      const b = c.portrait ? markBand({ x0: -20, kink: 2 * G, y: G, m: 300, x2: W + 20 }) : markBand({ x0: -20, kink: 2 * G, y: 60, m: 240, x2: W + 20 });
      return {
        defs: <Clip c={c} name="window" points={b.points} />,
        art: <Img c={c} filter={c.treatment} clip="window" />,
        text: (
          <>
            <Mark c={c} right={G} y={c.portrait ? G : 60} />
            <Head c={c} x={G} y={c.portrait ? 10.5 * G : 8.5 * G} w={8 * G} size={c.portrait ? 80 : 60} />
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
    render(c) {
      const h = c.portrait ? 5 * G : 4 * G;
      const b = TextBlock({ c, x: 0, y: c.H - h, w: 7 * G, h, size: c.portrait ? 64 : 54 });
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
  return <g stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.5" style={{ mixBlendMode: 'difference' }}>{lines}</g>;
}

export function PhotoPost({ photo = photos[0], layout = 'ribbon', ratio = 'portrait', treatment, field, headline = 'Power that costs less, from sources you choose.', grid = false }) {
  const id = `pp${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const L = layouts.find((l) => l.id === layout);
  const H = ratio === 'portrait' ? 1350 : 1080;
  const token = field ?? L.field;
  const c = {
    id, H, photo, headline,
    portrait: ratio === 'portrait',
    treatment: L.fixed ? L.treatment : treatment ?? L.treatment,
    field: { token, css: `var(--${token})` },
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
