"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./Proof.module.css";

// The numbers block's saving chart, from the client's Fuse reference: the price per unit
// as a share of the electricity board's rate (100%), and Neufin's, 15% lower (the
// statement above it). Shares, not rupee amounts (Kedar), as rates vary by state.
// No figures on the chart (Kedar): the board's bar runs the full width, Neufin's is
// shorter by the saving, named inside, with "X% less" inside its end. When the chart first comes into view the bars
// reveal from 0% and the prices fade in, once (Kedar); the card itself stays still. Without JavaScript or
// with reduced motion the bars simply show.
const saving = 15; // TODO: Neufin to confirm (the statement above uses it too).
const bars = [
  { name: "Electricity board", value: 100, brand: false },
  { name: "With Neufin", value: 100 - saving, brand: true },
];

export function SavingChart() {
  const ref = useRef<HTMLElement>(null);
  // "armed": collapsed and waiting; "in": grown. Stays unset (bars shown) until mounted.
  const [state, setState] = useState<"armed" | "in" | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setState("armed");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setState("in");
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure ref={ref} className={styles.chart} data-state={state}>
      <dl className={styles.bars}>
        {bars.map((b) => (
          <div key={b.name} className={styles.bar} data-brand={b.brand || undefined}>
            {/* The bar itself, its name inside (Kedar). */}
            <dt className={styles.fill} style={{ width: `${b.value}%` }}>
              {b.name}
            </dt>
            {b.brand && (
              <dd className={styles.price} style={{ "--end": `${b.value}%` } as CSSProperties}>
                {saving}% less
              </dd>
            )}
          </div>
        ))}
      </dl>
      <figcaption className={styles.caption}>Price per unit, compared with the electricity board&apos;s rate.</figcaption>
    </figure>
  );
}
