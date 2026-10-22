"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { Placeholder } from "@/components/sections/Placeholder";
import { lumenModules } from "@/lib/site";
import styles from "./ModuleTabs.module.css";

type IconName = keyof typeof icons;

// Lumen's four modules as tabs: the list on the left, the module's screen on the right.
// Arrow keys move between tabs (WAI-ARIA tabs pattern).
const notes: { icon: IconName; line: string }[] = [
  { icon: "bill", line: "Lumen fetches and checks every bill at every site, so you pay only for what you used, with no penalties or hidden charges." },
  { icon: "battery", line: "Get more power from your solar and batteries. Lumen tracks output and upkeep, and spots faults early." },
  { icon: "contract", line: "Lumen checks every bill against your power contract, and helps you recover money when terms are broken." },
  { icon: "nodes", line: "Lumen runs grid, solar, wind, diesel and batteries by time of day, and buys from the market when it is cheaper." },
];

export function ModuleTabs() {
  const [current, setCurrent] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (current + step + notes.length) % notes.length;
    setCurrent(next);
    refs.current[next]?.focus();
  };

  const m = lumenModules[current];
  return (
    <div className={styles.wrap}>
      <div role="tablist" aria-label="Lumen modules" aria-orientation="vertical" className={styles.list} onKeyDown={onKey}>
        {lumenModules.map((mod, i) => (
          <button
            key={mod.href}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`module-tab-${i}`}
            aria-selected={current === i}
            aria-controls="module-panel"
            tabIndex={current === i ? 0 : -1}
            className={styles.tab}
            onClick={() => setCurrent(i)}
          >
            <span className={styles.icon}>
              <IconSvg icon={icons[notes[i].icon]} size={24} />
            </span>
            <span>
              <span className={styles.name}>{mod.label}</span>
              <span className={styles.line}>{notes[i].line}</span>
            </span>
          </button>
        ))}
      </div>
      <div role="tabpanel" id="module-panel" aria-labelledby={`module-tab-${current}`} className={styles.panel}>
        <Placeholder note={`Product screen: ${m.label} in Lumen`} icon={notes[current].icon} tone="violet" className={styles.screen} />
        <Link href={m.href} className="link-arrow">
          Explore {m.label.toLowerCase()}
          <IconSvg icon={icons.arrow} size={20} />
        </Link>
      </div>
    </div>
  );
}
