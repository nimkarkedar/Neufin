import Form from "next/form";
import type { CSSProperties } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { stripeEdgeClipPath } from "@ds/components/Stripe.jsx";
import sky from "@ds/../public/assets/photos/pylon-blue-hour.jpg";
import styles from "./Hero.module.css";

// The panel's top edge is the Stripe: high on the left, stepping down after column 8.
const edge = stripeEdgeClipPath({ kinkX: "var(--kink)", drop: "var(--drop)" });

// The power lines in the photo, traced in its own pixels (1640 × 760), each drawn the way
// the current runs: the three long wires down from the top left into the big pylon, then
// the two on the right down to the poles. `start` is when the wire fires, as a share of
// the loop, so the surge crosses the sky from left to right.
const wires: { points: number[][]; start: number }[] = [
  { start: 0, points: [[230, 0], [262, 23], [294, 49], [326, 73], [358, 97], [390, 121], [422, 145], [454, 168], [486, 192], [518, 216], [550, 240], [582, 264], [614, 287], [646, 311], [678, 334], [710, 357], [742, 378], [774, 399], [806, 417], [838, 435], [870, 450], [898, 462]] },
  { start: 0.015, points: [[439, 0], [471, 27], [503, 56], [535, 84], [567, 111], [599, 138], [631, 165], [663, 190], [695, 215], [727, 240], [759, 263], [791, 285], [823, 305], [855, 323], [887, 340], [919, 353], [923, 354]] },
  { start: 0.03, points: [[556, 3], [588, 32], [620, 61], [652, 88], [684, 113], [716, 138], [748, 161], [780, 182], [812, 201], [844, 218], [876, 232], [908, 242], [940, 250], [972, 251], [988, 250]] },
  { start: 0.07, points: [[1538, 1], [1533, 33], [1529, 65], [1525, 97], [1520, 129], [1516, 161], [1512, 193], [1507, 225], [1503, 257], [1498, 289], [1493, 321], [1488, 353], [1482, 385], [1476, 417], [1468, 449], [1458, 481], [1451, 505]] },
  { start: 0.085, points: [[1642, 240], [1632, 272], [1621, 304], [1610, 336], [1599, 368], [1587, 400], [1575, 432], [1559, 460]] },
];

const pulses = wires.map(({ points, start }) => {
  const length = points.slice(1).reduce((sum, [x, y], j) => sum + Math.hypot(x - points[j][0], y - points[j][1]), 0);
  return {
    d: `M${points.map((p) => p.join(" ")).join(" L")}`,
    style: { "--length": Math.round(length), "--start": start } as CSSProperties,
  };
});

// Home hero, from Kedar's direction: the blue-hour pylon photo under the design
// system's Violet wash, running up behind the see-through header (the page sets
// data-header="overlay"); the headline on the open sky on the left, the pylons on the
// right, and the line and work email on the panel along the bottom, in the page's colour.
// Current runs along the photo's wires. The text is still on load (Kedar: no rise-in).
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      {/* The photo and the pulses share one frame, cropped like a cover image around a
          focal point, so the pulses stay on the wires at every size. */}
      <div className={styles.photo} aria-hidden="true">
        <div className={styles.frame}>
          <img src={sky.src} alt="" />
          {/* The design system's Violet wash, under the pulses so the flashes stay bright. */}
          <span className={styles.wash} />
          <svg viewBox="0 0 1640 760">
            {/* Glow: a wide and a tight blur of the flash, each doubled, under the sharp flash. */}
            <filter id="sky-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3" result="near" />
              <feGaussianBlur stdDeviation="9" result="far" />
              <feMerge>
                <feMergeNode in="far" />
                <feMergeNode in="far" />
                <feMergeNode in="near" />
                <feMergeNode in="near" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <g filter="url(#sky-glow)">
              {pulses.map((p) => (
                <path key={p.d} d={p.d} style={p.style} />
              ))}
            </g>
          </svg>
        </div>
      </div>

      <div className={`container ${styles.head}`}>
        <h1 id="hero-title" className={styles.title}>
          {/* One sentence per line, so a line never breaks across the full stop. */}
          <span>Cut Energy Cost.</span> <span>On Your Terms.</span>
        </h1>
      </div>

      <div className={styles.panel} style={{ clipPath: edge }}>
        <div className="container">
          {/* One sentence per line, as in the headline. */}
          <p className={styles.lead}>
            <span>Businesses pay up to 40% less per unit.</span> <span>We&apos;ll send your quote within 48 hours.</span>
          </p>

          {/* TODO: /contact takes the email; connect it to the forms backend. */}
          <Form action="/contact" className={`action-field action-field-inline ${styles.signup}`}>
            <label className="action-field-choice">
              <span className="visually-hidden">Work email</span>
              <input type="email" name="email" placeholder="Enter your work email" autoComplete="email" required />
            </label>
            <button type="submit" className="btn btn-primary">
              Get my quote
              <IconSvg icon={icons.arrow} size={20} />
            </button>
          </Form>
        </div>
      </div>
    </section>
  );
}
