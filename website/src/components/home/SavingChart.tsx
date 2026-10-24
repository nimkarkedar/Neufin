"use client";

import { useEffect, useRef, useState } from "react";
import { states } from "@/lib/plans";
import styles from "./Proof.module.css";

// The numbers block's saving chart, from the client's Fuse reference: the electricity
// board's average rate across the plan finder's states, and Neufin's, 15% lower (the
// statement above it). Computed from the plan finder's data, so the two never disagree.
// Bars from ₹0 (an honest baseline), each named inside the bar with its price beside it,
// so it reads without colour or a legend. When the chart first comes into view the bars
// reveal from ₹0 and the prices fade in, once (Kedar); the card itself stays still. Without JavaScript or
// with reduced motion the bars simply show.
const board = states.reduce((sum, s) => sum + s.board, 0) / states.length;
const bars = [
  { name: "Electricity board", value: board, brand: false },
  { name: "With Neufin", value: board * 0.85, brand: true },
];
const scaleMax = 10;
const ticks = [0, 3, 6, 9];

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
      <div className={styles.plot}>
        <ol className={styles.ticks} aria-hidden="true">
          {ticks.map((t) => (
            <li key={t} style={{ left: `${(t / scaleMax) * 100}%` }}>
              ₹{t}
            </li>
          ))}
        </ol>
        <dl className={styles.bars}>
          {bars.map((b) => (
            <div key={b.name} className={styles.bar} data-brand={b.brand || undefined}>
              {/* The bar itself, its name inside (Kedar). */}
              <dt className={styles.fill} style={{ width: `${(b.value / scaleMax) * 100}%` }}>
                {b.name}
              </dt>
              <dd className={styles.price}>₹{b.value.toFixed(2)}</dd>
            </div>
          ))}
        </dl>
      </div>
      <figcaption className={styles.caption}>Average price per unit across our plan finder&apos;s states. Illustrative.</figcaption>
    </figure>
  );
}
