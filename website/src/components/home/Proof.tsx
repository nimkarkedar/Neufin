import { RingStamp } from "@ds/components/Stamp.jsx";
import cerc from "@/assets/cerc.svg";
import { numbers } from "@/lib/content";
import { SavingChart } from "./SavingChart";
import styles from "./Proof.module.css";

// The home page's numbers block, from Kedar's mock: the title over two raised White
// boxes of the same height. Left: the five figures and the CERC licence in a grid of six.
// Right: the saving, a bar chart of the price per unit
// (the client's Fuse reference) at the foot of the box. No animation (Kedar).
// `fade` (on by default) brings the home page's Violet 100 top down behind the block; About
// shows the same block without it.
// The statement and the figures grid are the design system's `.statement` and `.figures`.
// TODO: Neufin to confirm the 15% figure.
export function Proof({ fade = true }: { fade?: boolean }) {
  return (
    <section id="numbers" className={`container ${styles.section}`} data-fade={fade || undefined} aria-labelledby="numbers-title">
      <h2 id="numbers-title" className={styles.title}>
        Lower power costs for 30+ businesses
      </h2>

      <div className={styles.cards}>
        <div className={`surface ${styles.facts}`}>
          {/* On phones the cells swipe sideways in one row (design system .figures-scroll). */}
          <div className={`figures-scroll ${styles.grid}`} role="region" aria-label="Neufin in numbers" tabIndex={0}>
            <dl className="figures">
              {numbers.map((n) => (
                <div key={n.label} className="figure">
                  <dt className="figure-label">{n.label}</dt>
                  <dd className="figure-value">{n.value}</dd>
                </div>
              ))}
              <div className={`figure ${styles.licence}`}>
                <dt className={styles.licenceName}>Licensed by CERC</dt>
                <dd>
                  <RingStamp text="Licensed by CERC · Power trading licence · " size={112} className={styles.stamp}>
                    {/* The regulator's emblem, in its own colours. */}
                    <img src={cerc.src} alt="Central Electricity Regulatory Commission emblem" className={styles.emblem} />
                  </RingStamp>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className={`surface ${styles.saving}`}>
          <p className="statement">Our customers already pay 15% less per unit</p>
          <p className="statement-line">Compared with their electricity board rate.</p>

          <SavingChart />
        </div>
      </div>
    </section>
  );
}
