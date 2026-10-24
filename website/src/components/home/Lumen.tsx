import Link from "next/link";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { Section } from "@/components/sections/Section";
import { contactLink, lumenModules, solutions } from "@/lib/site";
import { LumenDashboard } from "./LumenDashboard";
import styles from "./Lumen.module.css";

// Lumen on the home page, on the page's Violet 900 band (Kedar: break up the long light
// scroll; like the plan finder's Electric Violet band, with a White box inside): the title
// in Warm White, the content in one White surface. Inside, as in the industries card: the line,
// Lumen's four modules (each with its Products-menu icon and line) and the actions on
// the left; on the right, a representational Lumen (web app, phone alerts, a bill) cut by
// the card's right and bottom edges (Kedar's Ramp reference, 2026-10-23).
export function Lumen() {
  return (
    <Section id="lumen" title="Lumen: pay less for the power you already use" tone="dark">
      <div className={`surface ${styles.panel}`}>
        <div className={styles.text}>
          <p className={styles.lead}>Lumen tracks every site, bill and agreement, and acts when there&apos;s money to save.</p>

          <ul className={styles.modules}>
            {lumenModules.map((m) => (
              <li key={m.href}>
                <span className={styles.tile}>
                  <IconSvg icon={icons[m.icon]} size={22} />
                </span>
                <strong>{m.label}</strong>
                <span className={styles.moduleText}>{m.description}</span>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            {/* TODO: link to the demo scheduling flow once it exists. */}
            <Link href={`${contactLink.href}?topic=demo`} className="btn btn-primary">
              Book a demo
            </Link>
            <Link href={solutions.run.href} className="link-arrow">
              About Lumen
              <IconSvg icon={icons.arrow} size={20} />
            </Link>
          </div>
        </div>

        <div className={styles.shot}>
          <LumenDashboard />
        </div>
      </div>
    </Section>
  );
}
