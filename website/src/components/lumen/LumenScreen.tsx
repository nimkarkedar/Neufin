import type { ReactNode } from "react";
import { DuoIcon } from "@ds/components/DuoIcon.jsx";
import { IconSvg } from "@ds/components/Icon.jsx";
import { LumenLogo } from "@ds/components/LumenLogo.jsx";
import { icons } from "@ds/brand/icons.js";
import styles from "./LumenScreen.module.css";

// Lumen's screens for Run and optimise, drawn in the design system (Kedar, 2026-10-29:
// the product is built next, in these colours). Each screen is the card itself: one White
// surface, no picture in a frame. Figures stay in the text colour (no coloured emphasis);
// status is a tag, chart colours stand for sources only. All figures are illustrative.
// Screen readers get one description per screen (`label`), not the drawn parts.

type LumenScreenKind = "assets" | "contract" | "switching" | "bills";

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <figure role="img" aria-label={label} className={`surface ${styles.screen}`}>
      <div className={styles.appBar}>
        <LumenLogo variant="symbol" height={20} aria-hidden="true" />
        Lumen
      </div>
      {children}
    </figure>
  );
}

function Assets() {
  return (
    <>
      <p className={styles.title}>Site 07 · 1 MWp rooftop solar</p>
      <div className={styles.pair}>
        <div>
          <p className={styles.muted}>Today</p>
          <p className={styles.figure}>
            3,850 <span className={styles.unit}>kWh</span>
          </p>
        </div>
        <div>
          <p className={styles.muted}>Expected</p>
          <p className={styles.figure}>
            4,200 <span className={styles.unit}>kWh</span>
          </p>
        </div>
      </div>
      <span className={`tag ${styles.alert}`}>
        <IconSvg icon={icons["field-error"]} size={14} />
        8% below expected
      </span>
      <ul className={styles.rows}>
        {[
          ["Schedule the next cleaning", "20 Sep", "+190 kWh a day", "+5%"],
          ["Add optimisers", "Fix shading losses", "+160 kWh a day", "+4%"],
        ].map(([name, note, gain, pct]) => (
          <li key={name} className={styles.fix}>
            <span>
              <span className={styles.strong}>{name}</span>
              <span className={styles.muted}>{note}</span>
            </span>
            <span className={styles.end}>
              <span className={styles.strong}>{gain}</span>
              <span className={styles.muted}>{pct}</span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

function Contract() {
  return (
    <>
      <p className={styles.title}>2 MW solar power contract</p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Contract</th>
            <th>Actual</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Price per unit</td>
            <td>₹4.10</td>
            <td>₹4.10</td>
            <td>
              <span className="tag">
                <IconSvg icon={icons.check} size={14} />
                Kept
              </span>
            </td>
          </tr>
          <tr>
            <td>Units this month</td>
            <td>2,40,000</td>
            <td>2,18,000</td>
            <td>
              <span className={`tag ${styles.alert}`}>
                <IconSvg icon={icons["field-error"]} size={14} />
                Short
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.total}>
        <span className={styles.muted}>Shortfall to recover</span>
        <p className={styles.figure}>
          22,000 <span className={styles.unit}>kWh</span>
        </p>
      </div>
    </>
  );
}

// The day's exchange price, in a 900 × 220 plot (an hour is 37.5 wide): the grid's flat
// rate as a dashed line, the exchange as a smooth line through its hourly prices (low at
// midday, high in the evening), and the hours Lumen buys in shaded, 11am to 2pm.
const hourly = [128, 132, 136, 138, 136, 128, 112, 96, 90, 104, 130, 150, 158, 154, 140, 118, 94, 66, 44, 36, 48, 72, 96, 114, 124];
const hourX = (h: number) => h * 37.5;

// A Catmull-Rom curve through the points, as cubic Béziers, so the line has no corners.
function smooth(ys: number[]) {
  const pts = ys.map((y, h) => [hourX(h), y]);
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [p0, p1, p2, p3] = [pts[i - 1] ?? pts[i], pts[i], pts[i + 1], pts[i + 2] ?? pts[i + 1]];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

const price = smooth(hourly);
const ticks = [
  { h: 0, label: "12am" },
  { h: 6, label: "6am" },
  { h: 12, label: "12pm" },
  { h: 18, label: "6pm" },
  { h: 24, label: "12am" },
];

function Switching() {
  return (
    <>
      <div className={styles.head}>
        <p className={styles.title}>Exchange price today</p>
        <span className="tag">
          <span className="tag-dot" aria-hidden="true" />
          Live
        </span>
      </div>
      <div className={styles.legend}>
        <span>
          <i className={styles.keyGrid} /> Grid ₹7.50
        </span>
        <span>
          <i className={styles.keyExchange} /> Exchange
        </span>
      </div>
      <svg className={styles.chart} viewBox="0 0 900 220" preserveAspectRatio="none">
        <rect x={hourX(11)} y="0" width={hourX(3)} height="220" className={styles.buyBand} />
        <line x1="0" y1="72" x2="900" y2="72" className={styles.gridLine} />
        <path d={price} className={styles.priceLine} />
        <circle cx={hourX(12)} cy={hourly[12]} r="9" className={styles.dot} />
      </svg>
      <div className={styles.axis}>
        {ticks.map((t) => (
          <span key={t.h} style={{ left: `${(t.h / 24) * 100}%` }}>
            {t.label}
          </span>
        ))}
      </div>
      <div className={styles.fix}>
        <span>
          <span className={styles.strong}>Lumen buys from the exchange</span>
          <span className={styles.muted}>11am to 2pm</span>
        </span>
        <span className={styles.end}>
          <span className={styles.strong}>₹3.20</span>
          <span className={styles.muted}>a unit</span>
        </span>
      </div>
    </>
  );
}

// Source mix per site, as shares of a bar. Colours from the design system, one per source.
const mix = [
  { key: "solar", name: "Rooftop solar" },
  { key: "battery", name: "Battery" },
  { key: "open", name: "Open access" },
  { key: "exchange", name: "Exchange" },
  { key: "grid", name: "Grid" },
] as const;

const sites = [
  { name: "Gurugram", shares: [36, 10, 27, 8, 19], price: "₹5.04" },
  { name: "Pune", shares: [35, 9, 26, 8, 22], price: "₹5.15" },
  { name: "Bengaluru", shares: [34, 8, 24, 7, 27], price: "₹5.33" },
  { name: "Hyderabad", shares: [33, 8, 23, 7, 29], price: "₹5.40" },
];

function Bills() {
  return (
    <>
      <div className={styles.sources}>
        {(
          [
            ["duo-bill", "Bills"],
            ["duo-meter", "Smart meters"],
            ["duo-nodes", "Sensors"],
          ] as const
        ).map(([icon, name]) => (
          <span key={name} className={styles.source}>
            <DuoIcon name={icon} size={20} />
            {name}
          </span>
        ))}
      </div>
      <div className={styles.head}>
        <p className={styles.title}>All 24 sites</p>
        <span className={styles.muted}>Price per unit</span>
      </div>
      <ul className={styles.rows}>
        {sites.map((s) => (
          <li key={s.name} className={styles.site}>
            <span>{s.name}</span>
            <span className={styles.bar}>
              {s.shares.map((w, i) => (
                <i key={mix[i].key} className={styles[mix[i].key]} style={{ flexGrow: w }} />
              ))}
            </span>
            <span className={styles.strong}>{s.price}</span>
          </li>
        ))}
      </ul>
      <div className={styles.legend}>
        {mix.map((m) => (
          <span key={m.key}>
            <i className={`${styles.key} ${styles[m.key]}`} /> {m.name}
          </span>
        ))}
      </div>
    </>
  );
}

const screens = { assets: Assets, contract: Contract, switching: Switching, bills: Bills };

export function LumenScreen({ kind, label }: { kind: LumenScreenKind; label: string }) {
  const Screen = screens[kind];
  return (
    <Frame label={label}>
      <Screen />
    </Frame>
  );
}
