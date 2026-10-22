import type { CSSProperties } from "react";
import { allLogos, type BrandLogo } from "@/lib/logos";
import { LogoMark } from "./Blocks";
import styles from "./LogoBar.module.css";

// The logo bar: a label, then logos sliding from right to left in one row, fading in
// and out at both ends. Every logo by default; pass `logos` for one group. Use it
// wherever logos are shown, on any page; it takes the text colour, so it works on the
// dark band too. Place it inside a container (a Section does that).
//
// The row is drawn twice so the loop has no gap; the copy is hidden from screen
// readers. Every bar moves at the same speed whatever its length. Hover pauses it;
// with reduced motion it stands still and scrolls sideways instead.
export function LogoBar({ label, logos = allLogos }: { label?: string; logos?: BrandLogo[] }) {
  return (
    <div className={styles.bar}>
      {label && <p className={styles.label}>{label}</p>}
      <div className={styles.viewport}>
        <div className={styles.track} style={{ "--items": logos.length } as CSSProperties}>
          {[false, true].map((copy) => (
            <ul key={String(copy)} className={styles.list} aria-hidden={copy || undefined} aria-label={copy ? undefined : label}>
              {logos.map((l) => (
                <li key={l.name} className={styles.logo}>
                  <LogoMark logo={l} hidden={copy} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
