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
