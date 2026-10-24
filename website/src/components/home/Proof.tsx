import Link from "next/link";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { RingStamp } from "@ds/components/Stamp.jsx";
import cerc from "@/assets/cerc.svg";
import pylon from "@/assets/pylon-neon.png";
import { numbers } from "@/lib/content";
import { customerStories } from "@/lib/site";
import styles from "./Proof.module.css";

// Every source Neufin supplies, as a stack of round icon tiles.
const sources = [
  { icon: "solar-panel", name: "Solar" },
  { icon: "windmill", name: "Wind" },
  { icon: "leaves", name: "Biomass" },
  { icon: "battery", name: "Battery" },
  { icon: "chart", name: "Exchange power" },
] as const;

// The home page's numbers block, from Kedar's mock: the title over two raised White
// boxes that fill one screen on desktop. Left: the five figures and the CERC licence in a
// grid of six, then the sources. Right: the saving in one line, a link to the customer
// stories, and the pylon illustration cut by the box's edges. No animation (Kedar).
// TODO: Neufin to confirm the 15% figure.
export function Proof() {
  return (
    <section id="numbers" className={`container ${styles.section}`} aria-labelledby="numbers-title">
      <h2 id="numbers-title" className={styles.title}>
        Lower power costs for 30+ businesses
      </h2>

      <div className={styles.cards}>
        <div className={`surface ${styles.facts}`}>
          <dl className={styles.grid}>
            {numbers.map((n) => (
              <div key={n.label} className={styles.cell}>
                <dt className={styles.label}>{n.label}</dt>
                <dd className={styles.value}>{n.value}</dd>
              </div>
            ))}
            <div className={`${styles.cell} ${styles.licence}`}>
              <dt className={styles.licenceName}>Licensed by CERC</dt>
              <dd>
                <RingStamp text="Licensed by CERC · Power trading licence · " size={112} className={styles.stamp}>
                  {/* The regulator's emblem, in its own colours. */}
                  <img src={cerc.src} alt="Central Electricity Regulatory Commission emblem" className={styles.emblem} />
                </RingStamp>
              </dd>
            </div>
          </dl>

          <div className={styles.sources}>
            <span className={styles.stack} role="img" aria-label={sources.map((s) => s.name).join(", ")}>
              {sources.map((s) => (
                <span key={s.name} className={styles.disc}>
                  <IconSvg icon={icons[s.icon]} size={20} />
                </span>
              ))}
            </span>
            <p className={styles.text}>
              <strong className={styles.textTitle}>We buy power across 16 states</strong>
              Solar, wind, hybrid, biomass, battery and exchange power
            </p>
          </div>
        </div>

        <div className={`surface ${styles.saving}`}>
          <p className={styles.statement}>Our customers already pay 15% less per unit</p>
          <Link href={customerStories.href} className={`btn btn-primary ${styles.action}`}>
            Read customer stories
          </Link>
          <img src={pylon.src} alt="" className={styles.art} />
        </div>
      </div>
    </section>
  );
}
