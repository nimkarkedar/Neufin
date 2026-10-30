// Plan marks: a small picture for each of Neufin's four energy plan packs, drawn from the
// Stripe (bands at the symbol's 32° with crisp, mitred corners and thin echo lines), so each
// pack is recognisable without using the logo itself (Kedar, 2026-10-30). The shape says what
// the pack does:
//   saver: one step down (the price drops).
//   flexi: down and back up (in and out, no lock-in).
//   max: three bands stepping down together (the most saving).
//   rooftop: a roof pitch at the same angle (power from your own roof).
// Each pack keeps one of the graphic device's colour combinations (`planMarkCombos`), so
// neighbours always differ. Drawn 3:2 and cropped from the centre, so it fills a square tile.
// Used in the plan finder; documented on Web components.

import { STRIPE_SLOPE, offsetPoints } from '../brand/stripe-geometry.js';

const run = (drop) => drop / STRIPE_SLOPE;
const str = (pts) => pts.map((p) => p.map((n) => n.toFixed(1)).join(',')).join(' ');
const band = (centre, t) => str([...offsetPoints(centre, t / 2), ...offsetPoints(centre, -t / 2).reverse()]);

// Centre lines in a 300 × 200 drawing, bleeding past both sides.
const marks = {
  saver: { lines: [[[-20, 60], [95, 60], [95 + run(70), 130], [320, 130]]], t: 36, echoes: 2 },
  flexi: { lines: [[[-20, 70], [41, 70], [41 + run(56), 126], [259 - run(56), 126], [259, 70], [320, 70]]], t: 36, echoes: 2 },
  max: { lines: [40, 80, 120].map((y) => [[-20, y], [102, y], [102 + run(60), y + 60], [320, y + 60]]), t: 22, echoes: 0 },
  rooftop: { lines: [[[-20, 150], [150 - run(70), 150], [150, 80], [150 + run(70), 150], [320, 150]]], t: 36, echoes: 2 },
};

// One graphic device combination per pack.
export const planMarkCombos = {
  saver: { bg: 'var(--violet-900)', fg: 'var(--signal-yellow)' },
  flexi: { bg: 'var(--electric-coral)', fg: 'var(--near-black)' },
  max: { bg: 'var(--electric-violet)', fg: 'var(--signal-yellow)' },
  rooftop: { bg: 'var(--violet-900)', fg: 'var(--electric-coral)' },
};

/** @param {{ kind: 'saver' | 'flexi' | 'max' | 'rooftop', className?: string }} props */
export function PlanMark({ kind, className }) {
  const { lines, t, echoes } = marks[kind];
  const { fg, bg } = planMarkCombos[kind];
  return (
    <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" className={className} style={{ display: 'block', width: '100%', height: '100%', background: bg }} aria-hidden="true">
      {lines.map((centre, i) => (
        <g key={i}>
          {Array.from({ length: echoes }, (_, e) => e + 1).flatMap((e) =>
            [1, -1].map((side) => (
              <polyline
                key={`${e}${side}`}
                points={str(offsetPoints(centre, side * (t / 2 + 14 * e)))}
                fill="none"
                stroke={fg}
                strokeWidth="1.5"
                strokeLinejoin="miter"
                opacity={1 - (e - 1) / echoes}
                vectorEffect="non-scaling-stroke"
              />
            )),
          )}
          <polygon points={band(centre, t)} fill={fg} />
        </g>
      ))}
    </svg>
  );
}
