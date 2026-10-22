import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { RingStamp } from "@ds/components/Stamp.jsx";
import cerc from "@/assets/cerc.svg";
import { numbers } from "@/lib/content";
import styles from "./Proof.module.css";

// Every source Neufin supplies, as a stack of round icon tiles.
const sources = [
  { icon: "solar-panel", name: "Solar" },
  { icon: "windmill", name: "Wind" },
  { icon: "leaves", name: "Biomass" },
  { icon: "battery", name: "Battery" },
  { icon: "chart", name: "Exchange power" },
] as const;

// Home page numbers, from Kedar's mock: the title, then one surface holding the figures
// in a row and, below a hairline, the sources (left) and the CERC licence (right), with
// a ring stamp laid over the regulator's emblem.
export function Proof() {
  return (
    <section id="numbers" className={`container ${styles.section}`} aria-labelledby="numbers-title">
      <h2 id="numbers-title" className={styles.title}>
        Cheaper energy. Proven at scale.
      </h2>

      <div className={`surface surface-flat ${styles.card}`}>
        <dl className={styles.figures}>
          {numbers.map((n) => (
            <div key={n.label} className={styles.figure}>
              <dt className={styles.label}>{n.label}</dt>
              <dd className={styles.value}>{n.value}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.bottom}>
          <div className={styles.sources}>
            <span className={styles.stack} role="img" aria-label={sources.map((s) => s.name).join(", ")}>
              {sources.map((s) => (
                <span key={s.name} className={styles.disc}>
                  <IconSvg icon={icons[s.icon]} size={22} />
                </span>
              ))}
            </span>
            <p className={styles.text}>
              <strong>Sources pan-India:</strong> solar, wind, hybrid, biomass, battery and exchange power, across 16
              states.
            </p>
          </div>

          <div className={styles.licence}>
            <p className={styles.text}>
              <strong>Licensed by CERC:</strong> a power trader licensed by the Central Electricity Regulatory
              Commission.
            </p>
            <RingStamp text="Licensed by CERC · Power trading licence · " size={136} className={styles.stamp}>
              {/* The regulator's emblem, in its own colours. */}
              <img src={cerc.src} alt="Central Electricity Regulatory Commission emblem" className={styles.emblem} />
            </RingStamp>
          </div>
        </div>
      </div>
    </section>
  );
}
