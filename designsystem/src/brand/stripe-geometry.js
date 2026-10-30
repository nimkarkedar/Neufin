// Stripe geometry without React, so Node scripts (such as the slide builder) can use it.
// Slope 536/850 (~32°), lower edge kinks 0.29t left of the upper edge, as in the mark.

export const STRIPE_SLOPE = 536 / 850;
// The lower edge turns this many thicknesses left of the upper edge.
export const STRIPE_KINK_OFFSET = 0.29;

export function stripePoints({ width, y, thickness: t, kinkX, drop }) {
  const run = drop / STRIPE_SLOPE;
  const off = t * STRIPE_KINK_OFFSET;
  return [
    [-1, y], [kinkX, y], [kinkX + run, y + drop], [width + 1, y + drop],
    [width + 1, y + drop + t], [kinkX + run - off, y + drop + t], [kinkX - off, y + t], [-1, y + t],
  ].map((p) => p.join(',')).join(' ');
}

// Offset a polyline sideways by d (positive = up and to the right of a left-to-right line),
// keeping mitred, crisp corners, so a band's edges and echo lines run exactly parallel to its
// centre line. At the Stripe's angle the corner shift is the mark's 0.29 of the thickness.
export function offsetPoints(points, d) {
  const segs = [];
  for (let i = 0; i < points.length - 1; i += 1) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const len = Math.hypot(x2 - x1, y2 - y1);
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
  return out;
}
