import type { CSSProperties } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { Logo } from "@ds/components/Logo.jsx";
import { hexOf } from "@ds/brand/tokens.js";
import { icons } from "@ds/brand/icons.js";
import styles from "./LumenDashboard.module.css";

// A quiet, representational Lumen, drawn in the design system: the web app in a browser
// window and two alerts on a phone, with grey lines standing in for most of the text.
// Kept minimal on purpose (Kedar, 2026-10-23); to be replaced by the real Lumen screens.
// TODO: the figure and alerts are illustrative.

const nav = ["chart", "bill", "contract", "solar-panel", "nodes"] as const;

// Monthly saving, as bar heights out of 100; the last bar is this month.
const months = [42, 48, 46, 55, 58, 62, 60, 68, 72, 78];

const alerts = [
  { icon: "bill", title: "Pune over-billed" },
  { icon: "solar-panel", title: "Chennai solar low" },
] as const;

// A grey line standing in for a line of text.
const Line = ({ width }: { width: string }) => <span className={styles.line} style={{ width }} />;

export function LumenDashboard() {
  return (
    <div className={styles.stage} role="img" aria-label="Lumen: your monthly saving across every site, and alerts when something needs attention">
      <div className={styles.window} aria-hidden="true">
        <div className={styles.windowBar}>
          <span className={styles.dots}>
            <span />
            <span />
            <span />
          </span>
          <span className={styles.windowTitle}>Lumen</span>
        </div>

        <div className={styles.app}>
          <nav className={styles.sidebar}>
            <Logo variant="symbol" height={18} color={hexOf("electric-violet")} />
            <ul>
              {nav.map((icon, i) => (
                <li key={icon} data-current={i === 0 || undefined}>
                  <IconSvg icon={icons[icon]} size={18} />
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.main}>
            <span className={styles.small}>Saved this month, all sites</span>
            <strong className={styles.figure}>₹11.4 L</strong>

            <div className={styles.chart}>
              {months.map((h, i) => (
                <span
                  key={i}
                  className={styles.bar}
                  data-current={i === months.length - 1 || undefined}
                  style={{ "--h": h } as CSSProperties}
                />
              ))}
            </div>

            <div className={styles.rows}>
              <Line width="56%" />
              <Line width="38%" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.phone} aria-hidden="true">
        <span className={styles.speaker} />
        <p className={styles.phoneTitle}>Alerts</p>
        <ul className={styles.alerts}>
          {alerts.map((a) => (
            <li key={a.title}>
              <span className={styles.alertIcon}>
                <IconSvg icon={icons[a.icon]} size={18} />
              </span>
              <span className={styles.alertText}>
                <strong>{a.title}</strong>
                <Line width="80%" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
