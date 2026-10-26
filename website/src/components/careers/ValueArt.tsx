import type { CSSProperties } from "react";
import styles from "./ValueArt.module.css";

// The four values as drawn spot illustrations (Kedar's geometric sketches, 2026-10-27), in
// one visual language: an Electric Violet circle, Neufin bands (Violet 900 with a White
// centre line) that run straight and step at the Stripe's 32° (slope 0.63) with crisp
// corners, bleeding off the circle's edge. A Signal Yellow pulse runs along the bands, and
// each piece has one small move of its own. Still with reduced motion. Decorative.
export type ValueKind = "ownership" | "customer" | "solution" | "respect";
// The hiring steps in the same language, on an Electric Coral circle with an Electric Violet
// pulse (Kedar's sketches, 2026-10-27). One band carries the story through the four: it
// plugs into the call, is worked into a report, runs up to the board, and meets over the table.
export type HireKind = "call" | "case" | "deepdive" | "founders";
const hiring: HireKind[] = ["call", "case", "deepdive", "founders"];

// Bands per value, in a 200 × 200 box.
const bands: Record<ValueKind | HireKind, string[]> = {
  // Two paths become one upward movement.
  ownership: ["M-5 176 L90 116 H100 V54", "M205 176 L110 116 H100 V54"],
  // Many bands converge on one building.
  customer: ["M-10 66 H40 L75 88 H126", "M-10 100 H126", "M-10 134 H40 L75 112 H126"],
  // The bands find a way round the obstacle and carry on.
  solution: ["M-10 90 H52 L77 74 H123 L148 90 H210", "M-10 110 H52 L77 126 H123 L148 110 H210"],
  // Two paths from opposite sides meet and move on together.
  respect: ["M-10 54 H35 L85 86 V146", "M210 54 H165 L115 86 V146"],
  // A single band plugs into the screen.
  call: ["M-10 112 H24 L49 96 H80"],
  // Two bands are worked into one, and out comes the report.
  case: ["M-10 62 H30 L80 93.5 H104", "M-10 138 H30 L80 106.5 H104", "M120 100 H134"],
  // The band runs up to the board.
  deepdive: ["M-10 154 H38 L70 134 H104"],
  // From both sides, meeting over the table.
  founders: ["M-10 58 H34 L84 89.5 H100 V102", "M210 58 H166 L116 89.5 H100"],
};

export function ValueArt({ kind, className }: { kind: ValueKind | HireKind; className?: string }) {
  const id = `value-clip-${kind}`;
  const hire = (hiring as string[]).includes(kind);
  return (
    <svg viewBox="0 0 200 200" className={`${styles.art} ${hire ? styles.hire : ""} ${className ?? ""}`} aria-hidden="true">
      <defs>
        <clipPath id={id}>
          <circle cx="100" cy="100" r="96" />
        </clipPath>
      </defs>
      <circle cx="100" cy="100" r="96" className={styles.sky} />
      <g clipPath={`url(#${id})`}>
        {bands[kind].map((d, i) => (
          <g key={d}>
            <path d={d} className={kind === "respect" && i === 1 ? styles.hidden : styles.band} />
            <path d={d} className={kind === "respect" && i === 1 ? styles.lineDark : styles.line} />
            <path d={d} className={styles.pulse} style={{ "--i": i } as CSSProperties} />
          </g>
        ))}

        {kind === "ownership" && <polygon points="100,26 80,56 120,56" className={`${styles.solid} ${styles.arrow}`} />}

        {kind === "customer" && (
          <g>
            <rect x="126" y="62" width="58" height="76" className={styles.solid} />
            <rect x="146" y="88" width="20" height="34" className={`${styles.window} ${styles.glow}`} />
          </g>
        )}

        {kind === "solution" && <rect x="84" y="82" width="32" height="36" className={styles.solid} />}

        {kind === "call" && (
          <g>
            <rect x="118" y="44" width="12" height="10" className={`${styles.solid} ${styles.glow}`} />
            <rect x="72" y="54" width="104" height="76" className={styles.solid} />
            <rect x="80" y="62" width="88" height="60" className={styles.window} />
            <rect x="100" y="80" width="30" height="24" className={styles.solid} />
            <polygon points="130,92 148,81 148,103" className={styles.accent} />
            <rect x="118" y="130" width="12" height="14" className={styles.solid} />
            <rect x="96" y="144" width="56" height="8" className={styles.solid} />
          </g>
        )}

        {kind === "case" && (
          <g>
            <rect x="96" y="86" width="24" height="28" className={styles.solid} />
            <g className={styles.meet}>
              <rect x="132" y="64" width="46" height="72" className={styles.solid} />
              <rect x="140" y="74" width="28" height="6" className={styles.whiteBar} />
              <rect x="140" y="86" width="20" height="6" className={styles.whiteBar} />
              <rect x="140" y="112" width="7" height="14" className={styles.accent} />
              <rect x="151" y="105" width="7" height="21" className={styles.accent} />
              <rect x="162" y="98" width="7" height="28" className={styles.whiteBar} />
            </g>
          </g>
        )}

        {kind === "deepdive" && (
          <g>
            <rect x="50" y="42" width="108" height="80" className={styles.solid} />
            <rect x="58" y="50" width="92" height="64" className={styles.window} />
            <rect x="72" y="88" width="14" height="16" className={styles.solid} />
            <rect x="94" y="76" width="14" height="28" className={styles.solid} />
            <rect x="116" y="62" width="14" height="42" className={`${styles.accent} ${styles.arrow}`} />
            <rect x="104" y="122" width="12" height="42" className={styles.solid} />
            <rect x="80" y="164" width="60" height="8" className={styles.solid} />
          </g>
        )}

        {kind === "founders" && (
          <g>
            <g className={styles.meet}>
              <rect x="85" y="102" width="10" height="10" className={styles.accent} />
              <rect x="105" y="102" width="10" height="10" className={styles.accent} />
            </g>
            <rect x="80" y="112" width="40" height="6" className={styles.solid} />
            <rect x="97" y="118" width="6" height="38" className={styles.solid} />
            <rect x="86" y="156" width="28" height="6" className={styles.solid} />
            <rect x="34" y="84" width="14" height="60" className={styles.solid} />
            <rect x="34" y="118" width="40" height="12" className={styles.window} />
            <rect x="38" y="130" width="6" height="28" className={styles.solid} />
            <rect x="64" y="130" width="6" height="28" className={styles.solid} />
            <rect x="152" y="84" width="14" height="60" className={styles.solid} />
            <rect x="126" y="118" width="40" height="12" className={styles.window} />
            <rect x="130" y="130" width="6" height="28" className={styles.solid} />
            <rect x="156" y="130" width="6" height="28" className={styles.solid} />
          </g>
        )}

        {kind === "respect" && (
          <g className={styles.meet}>
            <rect x="77" y="154" width="46" height="8" className={styles.whiteBar} />
            <rect x="85" y="168" width="30" height="8" className={styles.solid} />
          </g>
        )}
      </g>
    </svg>
  );
}
