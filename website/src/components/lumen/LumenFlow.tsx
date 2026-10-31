import type { CSSProperties } from "react";
import { DuoIcon } from "@ds/components/DuoIcon.jsx";
import { LumenLogo } from "@ds/components/LumenLogo.jsx";
import { icons } from "@ds/brand/icons.js";
import styles from "./LumenFlow.module.css";

// How Lumen works, as a process (Kedar, 2026-10-27; Companion's diagram as a loose
// reference): your sites on the left, Lumen in the middle, what you get on the right, on a
// Electric Coral panel with soft moving glows (Violet 900 was too much violet, Daylight too low in contrast). The links are the Neufin band: straight runs that
// step at the Stripe's 32° with crisp corners, converging into Lumen (many sources) and
// fanning out to the results, with light pulsing along them. Desktop draws the bands in one
// SVG on a fixed 1200 × 560 stage, so the angle stays true at every width; phones stack the
// cards with a short pulsing link between them. No motion with reduced motion.
// Figures and alerts are illustrative. TODO: confirm with Neufin.

type IconName = keyof typeof icons;

const sources: { icon: IconName; name: string }[] = [
  { icon: "duo-meter", name: "Meters" },
  { icon: "duo-solar", name: "Solar" },
  { icon: "duo-wind", name: "Wind" },
  { icon: "duo-battery", name: "Batteries" },
  { icon: "duo-bolt", name: "Diesel generators" },
  { icon: "duo-bill", name: "Electricity board bills" },
];

const leaks: { icon: IconName; text: string }[] = [
  { icon: "duo-bill", text: "Bill charged at the wrong tariff" },
  { icon: "duo-solar", text: "Inverter 2 down since Tuesday" },
  { icon: "duo-contract", text: "Supplier short of contracted units" },
];

// Bands in stage units. Slope 60 / 95 = 0.63, the Stripe's 536 / 850.
const bands = [
  "M340 200 H360 L455 260 H470",
  "M340 280 H470",
  "M340 360 H360 L455 300 H470",
  "M730 260 H745 L840 200 H860",
  "M730 280 H860",
  "M730 300 H745 L840 360 H860",
];

export function LumenFlow() {
  return (
    <div className={styles.panel}>
      <div className={styles.stage}>
        {/* Lumen's logo, loud, on the coral over its card, the bulb lighting up as the data
            comes in (Kedar, 2026-10-31). Near Black: White fails 4.5:1 on coral. */}
        <div className={styles.brand}>
          <LumenLogo live height="100%" />
        </div>
        <svg className={styles.links} viewBox="0 0 1200 560" aria-hidden="true">
          {bands.map((d) => (
            <path key={`b${d}`} d={d} className={styles.band} />
          ))}
          {bands.map((d, i) => (
            <path key={`p${d}`} d={d} className={styles.pulse} style={{ "--i": i } as CSSProperties} />
          ))}
          <text x="405" y="176" className={styles.label} textAnchor="middle">
            Live data
          </text>
          <text x="795" y="176" className={styles.label} textAnchor="middle">
            Alerts and fixes
          </text>
        </svg>

        <ol className={styles.cards}>
          <li className={`${styles.card} ${styles.sites}`}>
            <span className="tag">Step 1</span>
            <h3 className={styles.title}>Connect your sites</h3>
            <ul className={styles.rows}>
              {sources.map((s) => (
                <li key={s.name}>
                  <DuoIcon name={s.icon} size={20} />
                  {s.name}
                </li>
              ))}
            </ul>
          </li>

          <li className={`${styles.card} ${styles.lumen}`}>
            <span className="tag">
              Step 2<span className="tag-dot" aria-hidden="true" />
            </span>
            <h3 className={styles.title}>Lumen finds the leaks</h3>
            <p className={styles.text}>Every bill, meter reading and contract term, checked round the clock.</p>
          </li>

          <li className={`${styles.card} ${styles.results}`}>
            <span className="tag">Step 3</span>
            <h3 className={styles.title}>Act on it</h3>
            <ul className={styles.rows}>
              {leaks.map((l) => (
                <li key={l.text}>
                  <DuoIcon name={l.icon} size={20} />
                  {l.text}
                </li>
              ))}
            </ul>
            <div className={styles.saved}>
              <span className={styles.savedLabel}>Saved this month</span>
              <span className={styles.savedValue}>₹2.4 lakh</span>
              <span className={styles.savedLabel}>Across 12 sites. Illustrative.</span>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}
