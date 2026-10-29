import styles from "./LumenMixArt.module.css";

// The Run and optimise solution card's picture (Kedar, 2026-10-29: the dashboard screenshot
// was too real and too busy). One day of a site's power as stacked bars, hour by hour, in
// the source colours of the Lumen screens: open access and the exchange all day, solar
// filling the middle, the battery taking over the evening peak, the grid shrinking where
// Lumen switches. The two peak windows are shaded. No labels: the card's title says it.
// Drawn in a 400 × 500 frame (the card's 4:5); the chart keeps to the top, clear of the text.

type Hour = [open: number, exchange: number, solar: number, battery: number, grid: number];

const hours: Hour[] = [
  [40, 18, 0, 0, 10],
  [38, 20, 0, 0, 12],
  [36, 16, 4, 0, 26],
  [40, 8, 14, 0, 36],
  [44, 6, 30, 0, 30],
  [50, 6, 44, 0, 20],
  [52, 10, 52, 0, 14],
  [52, 12, 54, 0, 12],
  [52, 10, 50, 0, 14],
  [50, 8, 40, 0, 20],
  [48, 6, 26, 0, 30],
  [46, 6, 12, 0, 40],
  [44, 10, 0, 30, 22],
  [44, 12, 0, 32, 18],
  [46, 14, 0, 28, 16],
  [42, 20, 0, 0, 14],
  [40, 22, 0, 0, 10],
];

const sources = ["open", "exchange", "solar", "battery", "grid"] as const;
const peaks = [
  [2, 4],
  [12, 14],
];

const left = 32;
const pitch = 336 / hours.length;
const barW = 14;
const base = 272;
const unit = 1.7;
const barX = (i: number) => left + i * pitch + (pitch - barW) / 2;

export function LumenMixArt() {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={styles.art}>
      {peaks.map(([from, to]) => (
        <rect key={from} x={barX(from) - 4} y={40} width={barX(to) - barX(from) + barW + 8} height={base - 40} className={styles.peak} />
      ))}
      {[base - 70, base - 140, base - 210].map((y) => (
        <line key={y} x1={left} x2={left + 336} y1={y} y2={y} className={styles.rule} />
      ))}
      {hours.map((hour, i) => {
        let top = base;
        return hour.map((v, s) => {
          if (!v) return null;
          top -= v * unit;
          return <rect key={`${i}-${s}`} x={barX(i)} y={top} width={barW} height={v * unit} className={styles[sources[s]]} />;
        });
      })}
      <line x1={left} x2={left + 336} y1={base} y2={base} className={styles.axis} />
    </svg>
  );
}
