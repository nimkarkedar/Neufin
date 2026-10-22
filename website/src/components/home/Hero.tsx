import Form from "next/form";
import type { CSSProperties } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { stripeEdgeClipPath } from "@ds/components/Stripe.jsx";
import pylon from "@ds/../public/assets/photos/pylon-dusk-hero.jpg";
// import { ComparePanel } from "./ComparePanel";
import styles from "./Hero.module.css";

// The Electric Violet panel's top edge is the Stripe: high on the left, stepping down at
// the Stripe angle after column 5, so the photo shows above it on the right.
const edge = stripeEdgeClipPath({ kinkX: "var(--kink)", drop: "var(--drop)" });

// The power lines in the photo, traced in its own pixels (1273 × 612), each drawn from
// the bottom left towards the pylon and on, the way the current runs.
const wires = [
  [[-3, 575], [107, 480], [200, 400], [292, 320], [382, 240], [470, 160], [554, 80], [634, 0]],
  [[120, 612], [260, 500], [385, 400], [480, 320], [582, 232], [633, 205], [828, 102], [1008, 0]],
  [[295, 612], [640, 382], [768, 292], [883, 195], [1038, 95], [1213, 0]],
  [[405, 612], [640, 457], [818, 320], [848, 287], [1063, 192], [1273, 90]],
  [[620, 612], [758, 537], [983, 387], [1080, 330], [1103, 320], [1273, 270]],
];

// One flash per wire: a single dash, with a gap longer than the wire, shoots from one
// end to the other. The wires fire a moment apart, so the flash reads as one surge.
const pulses = wires.map((points, i) => {
  const length = points.slice(1).reduce((sum, [x, y], j) => sum + Math.hypot(x - points[j][0], y - points[j][1]), 0);
  return {
    d: `M${points.map((p) => p.join(" ")).join(" L")}`,
    style: { "--length": Math.round(length), "--start": i * 0.02 } as CSSProperties,
  };
});

// Home hero, from Kedar's mock: one rounded card with the dusk pylon photo on top and the
// headline, line and work email on the violet panel. Current runs along the photo's power lines.
export function Hero() {
  return (
    <section className={`container ${styles.hero}`} aria-labelledby="hero-title">
      <div className={styles.card}>
        {/* Decorative photo, kept to its top right on narrow screens so the pylon
            stays in view; the pulses are drawn in the photo's pixels and cropped the same way. */}
        <div className={styles.photo} aria-hidden="true">
          <img src={pylon.src} alt="" />
          <svg viewBox="0 0 1273 612" preserveAspectRatio="xMaxYMin slice">
            {/* Glow: a wide and a tight blur of the flash, each doubled, under the sharp flash. */}
            <filter id="hero-glow" x="-10%" y="-10%" width="120%" height="120%">
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
            <g filter="url(#hero-glow)">
              {pulses.map((p) => (
                <path key={p.d} d={p.d} style={p.style} />
              ))}
            </g>
          </svg>
        </div>

        <div className={styles.panel} style={{ clipPath: edge }}>
          <h1 id="hero-title" className={styles.title}>
            {/* One sentence per line, so a line never breaks across the full stop. */}
            Cut Energy Cost. <br />
            On Your Terms.
          </h1>
          <p className={styles.lead}>Choose your tenure, tariff and capacity.</p>

          {/* TODO: /contact takes the email; connect it to the forms backend. */}
          <Form action="/contact" className={`action-field action-field-inline ${styles.signup}`}>
            <label className="action-field-choice">
              <span className="visually-hidden">Work email</span>
              <input type="email" name="email" placeholder="Enter your work email" autoComplete="email" required />
            </label>
            <button type="submit" className="btn btn-accent">
              Get started
              <IconSvg icon={icons.arrow} size={20} />
            </button>
          </Form>
        </div>
      </div>

      {/* Before-and-after slider, hidden for now (Kedar, 2026-10-22). Bring back with:
      <div className={styles.preview}>
        <ComparePanel />
      </div>
      */}
    </section>
  );
}
