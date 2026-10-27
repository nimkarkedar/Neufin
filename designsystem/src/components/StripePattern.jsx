// The Stripe as a pattern piece (the graphic device page allows more than two Stripes in a
// pattern): one solid band stepping at the symbol's angle with crisp corners, and thin
// echo lines running parallel above and below it, fading towards the edges, all bleeding
// off both sides. Drawn for the pattern tile (`.pattern-tile` in ui.css): a set of ideas
// (values, what you get) each in one of the device's colour combinations.

import { STRIPE_SLOPE, stripePoints } from '../brand/stripe-geometry.js';

const W = 400;
const H = 500;
// The node's box in drawing units: room for the 88-unit circle (`.pattern-tile-art`) and its
// ring, about 67px on a 300px-wide tile.
const NODE = 120;

// Offset a polyline sideways by d (positive = up and to the right of the band), keeping
// mitred, crisp corners, so every echo runs exactly parallel to the band.
function offsetPolyline(points, d) {
  const segs = [];
  for (let i = 0; i < points.length - 1; i += 1) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const len = Math.hypot(x2 - x1, y2 - y1);
    // Normal pointing up (negative y) for a left-to-right segment.
    const nx = (y2 - y1) / len;
    const ny = -(x2 - x1) / len;
    segs.push([[x1 + nx * d, y1 + ny * d], [x2 + nx * d, y2 + ny * d]]);
  }
  const out = [segs[0][0]];
  for (let i = 0; i < segs.length - 1; i += 1) {
    const [[ax, ay], [bx, by]] = segs[i];
    const [[cx, cy], [dx, dy]] = segs[i + 1];
    const den = (ax - bx) * (cy - dy) - (ay - by) * (cx - dx);
    const t = ((ax - cx) * (cy - dy) - (ay - cy) * (cx - dx)) / den;
    out.push([ax + t * (bx - ax), ay + t * (by - ay)]);
  }
  out.push(segs[segs.length - 1][1]);
  return out.map((p) => p.map((n) => n.toFixed(1)).join(',')).join(' ');
}

// drop: how far the band steps. The band is placed so the middle of its diagonal is the
// drawing's centre, where children (an icon in its circle) sit like a node on a wire; the
// drawing crops from the centre, so the node stays centred in the tile at any shape.
/** @param {{ fg: string, bg: string, drop?: number, thickness?: number, lines?: number, gap?: number, className?: string, children?: import('react').ReactNode }} props */
export function StripePattern({ fg, bg, drop = 150, thickness = 64, lines = 6, gap = 26, className, children }) {
  const run = drop / STRIPE_SLOPE;
  const kinkX = W / 2 - run / 2;
  const mid = H / 2 - drop / 2;
  const y = mid - thickness / 2;
  // The band's centre line, from bleed to bleed.
  const centre = [[-40, mid], [kinkX, mid], [kinkX + run, mid + drop], [W + 40, mid + drop]];
  const echoes = [];
  for (let i = 1; i <= lines; i += 1) {
    const d = thickness / 2 + gap * i;
    const opacity = 1 - (i - 1) / lines;
    echoes.push({ d, opacity }, { d: -d, opacity });
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className={className} style={{ display: 'block', width: '100%', height: '100%', background: bg, '--tile-bg': bg }} aria-hidden="true">
      {echoes.map((e) => (
        <polyline key={e.d} points={offsetPolyline(centre, e.d)} fill="none" stroke={fg} strokeWidth="1.5" strokeLinejoin="miter" opacity={e.opacity} vectorEffect="non-scaling-stroke" />
      ))}
      <polygon points={stripePoints({ width: W + 40, y, thickness, kinkX, drop })} fill={fg} />
      {children && (
        <foreignObject x={kinkX + run / 2 - NODE / 2} y={mid + drop / 2 - NODE / 2} width={NODE} height={NODE}>
          <div style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%' }}>{children}</div>
        </foreignObject>
      )}
    </svg>
  );
}

// The device's colour combinations for pattern tiles (from the Graphic device page), in the
// order a set uses them, so neighbouring tiles always differ.
export const patternCombos = [
  { bg: 'var(--violet-900)', fg: 'var(--signal-yellow)' },
  { bg: 'var(--electric-coral)', fg: 'var(--near-black)' },
  { bg: 'var(--electric-violet)', fg: 'var(--warm-white)' },
  { bg: 'var(--violet-900)', fg: 'var(--electric-coral)' },
];
