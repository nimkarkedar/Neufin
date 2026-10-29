import { DuoIcon } from "@ds/components/DuoIcon.jsx";
import type { IconName } from "@/lib/site";
import styles from "./IconGrid.module.css";

// A few short items in one White box (.surface), in the home numbers block's family: cells
// on the line colour with a 1px gap, so the lines run edge to edge; each cell the design
// system's hero duo icon (in a Warm White circle that turns White as the cell turns
// Violet 100 under the pointer), an H3 title and one line, with generous space (Kedar,
// 2026-10-27, from an Apple reference). Colour only: the cells never move. Used for the
// four kinds of plan on Buy cheaper power (two across) and the four problems on Renewable
// energy advisory (four across from desktop).
// `columns` is the count from desktop; tablets show two, phones one. `swipe`: on phones the
// items are separate cards in a sideways row instead of a stack (`label` names the row).
export type IconGridItem = { icon: IconName; title: string; text: string };

type IconGridProps = { items: IconGridItem[]; columns?: 2 | 4; className?: string; swipe?: boolean; label?: string };

export function IconGrid({ items, columns = 2, className = "", swipe = false, label }: IconGridProps) {
  return (
    <ul
      className={`surface ${styles.grid} ${swipe ? "scroll-row-phone" : ""} ${className}`}
      data-columns={columns}
      data-swipe={swipe || undefined}
      aria-label={swipe ? label : undefined}
      tabIndex={swipe ? 0 : undefined}
    >
      {items.map((it) => (
        <li key={it.title} className={`duo-icon-host ${styles.cell}`}>
          <DuoIcon name={it.icon} hero className={styles.icon} />
          <h3 className={styles.title}>{it.title}</h3>
          <p className={styles.text}>{it.text}</p>
        </li>
      ))}
    </ul>
  );
}
