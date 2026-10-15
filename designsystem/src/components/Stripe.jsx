// The Stripe: the graphic device lifted from the symbol's diagonal.
// A horizontal band that steps down on the symbol's angle and continues flat.
// Geometry matches the mark: slope 536/850 (~32°), lower edge kinks 0.29t left of the upper edge.

import { STRIPE_SLOPE, STRIPE_KINK_OFFSET, stripePoints } from '../brand/stripe-geometry.js';

export { STRIPE_SLOPE, STRIPE_KINK_OFFSET, stripePoints };

// The Stripe's upper edge as a CSS clip-path: flat, then stepping down at the Stripe
// angle, with everything below filled. kinkX and drop are CSS lengths (px, %, calc()
// or var()), so the step can follow the page grid.
export function stripeEdgeClipPath({ kinkX, drop }) {
  return `polygon(0 0, ${kinkX} 0, calc(${kinkX} + ${drop} / ${STRIPE_SLOPE}) ${drop}, 100% ${drop}, 100% 100%, 0 100%)`;
}

// One band of the symbol, measured in modules (m = band thickness = square terminal size).
// From the mark: left flat 1m, diagonal run 2.734m, drop 1.723m, right flat 0.711m (top edge).
// Pass x2 to extend the right flat (e.g. past the canvas edge to bleed).
// Pass kink to lengthen the left flat (default is 1m, as in the mark).
/** @param {{ x0: number, y: number, m: number, x2?: number, kink?: number }} props */
export function markBand({ x0, y, m, x2, kink: k }) {
  const kink = k ?? x0 + m;
  const run = 2.734 * m;
  const drop = 1.723 * m;
  const off = 0.288 * m;
  const end = x2 ?? kink + run + 0.711 * m;
  const points = [
    [x0, y], [kink, y], [kink + run, y + drop], [end, y + drop],
    [end, y + drop + m], [kink + run - off, y + drop + m], [kink - off, y + m], [x0, y + m],
  ].map((p) => p.map((n) => n.toFixed(1)).join(',')).join(' ');
  // Where the symbol's square terminals sit relative to this band.
  const squareAbove = { x: kink + run - off, y, w: end - (kink + run - off), h: m };
  const squareBelow = { x: x0, y: y + drop, w: m, h: m };
  return { points, squareAbove, squareBelow };
}

// align: how the drawing crops when the box has a different shape (SVG preserveAspectRatio).
// Use 'xMinYMid slice' to keep the turn in view on narrow screens when kinkX is near the left.
/** @param {{ width?: number, height?: number, y?: number, thickness?: number, kinkX?: number, drop?: number, color?: string, bg?: string, align?: string, className?: string, style?: import('react').CSSProperties }} props */
export function Stripe({ width = 800, height = 400, y = 60, thickness = 90, kinkX = 160, drop = 220, color = 'var(--signal-yellow)', bg = 'transparent', align = 'xMidYMid slice', className, style }) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio={align} className={className} style={{ display: 'block', width: '100%', height: '100%', background: bg, ...style }} aria-hidden="true">
      <polygon points={stripePoints({ width, y, thickness, kinkX, drop })} fill={color} />
    </svg>
  );
}
