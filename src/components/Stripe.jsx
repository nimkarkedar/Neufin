// The Stripe: the graphic device lifted from the symbol's diagonal.
// A horizontal band that steps down on the symbol's angle and continues flat.
// Geometry matches the mark: slope 536/850 (~32°), lower edge kinks 0.29t left of the upper edge.

export const STRIPE_SLOPE = 536 / 850;

export function stripePoints({ width, y, thickness: t, kinkX, drop }) {
  const run = drop / STRIPE_SLOPE;
  const off = t * 0.29;
  return [
    [-1, y], [kinkX, y], [kinkX + run, y + drop], [width + 1, y + drop],
    [width + 1, y + drop + t], [kinkX + run - off, y + drop + t], [kinkX - off, y + t], [-1, y + t],
  ].map((p) => p.join(',')).join(' ');
}

// One band of the symbol, measured in modules (m = band thickness = square terminal size).
// From the mark: left flat 1m, diagonal run 2.734m, drop 1.723m, right flat 0.711m (top edge).
// Pass x2 to extend the right flat (e.g. past the canvas edge to bleed).
// Pass kink to lengthen the left flat (default is 1m, as in the mark).
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

export function Stripe({ width = 800, height = 400, y = 60, thickness = 90, kinkX = 160, drop = 220, color = 'var(--signal-yellow)', bg = 'transparent', className, style }) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" className={className} style={{ display: 'block', width: '100%', height: '100%', background: bg, ...style }} aria-hidden="true">
      <polygon points={stripePoints({ width, y, thickness, kinkX, drop })} fill={color} />
    </svg>
  );
}
