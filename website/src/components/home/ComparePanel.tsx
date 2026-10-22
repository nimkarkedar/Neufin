"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon, IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { STRIPE_SLOPE, stripePoints } from "@ds/components/Stripe.jsx";
import styles from "./ComparePanel.module.css";

// Before and after, for a typical industrial site (illustrative, no real client).
// Two identical layouts are stacked: before (grid power, mostly coal, on White) and
// after (Neufin: open access and solar, on Violet 100). A handle reveals the after
// layer from the right; dragging it left sweeps across the bars, so the bill drops.
// A price line runs across both: high on the before side, stepping down at the angle
// of the N exactly where the handle is, then low. The step moves with the handle.

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Monthly bill in ₹ lakh.
const beforeBills = [24.6, 26.3, 25.1, 23.8, 24.9, 25.7, 26.4, 25.2, 24.1, 23.6, 24.8, 25.5];
const afterBills = [16.1, 16.9, 16.4, 15.2, 15.8, 16.7, 17.2, 16.3, 15.6, 15.1, 16.0, 16.6];
// Bar scale in ₹ lakh. It starts above zero so the drop is big enough to read. The
// chart is representational: no axis or month labels, one figure per side.
const scaleMin = 8;
const scaleMax = 28;
const toHeight = (v: number) => (v - scaleMin) / (scaleMax - scaleMin);
const avg = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
const levelBefore = avg(beforeBills);
const levelAfter = avg(afterBills);
const cut = Math.round((1 - 6.2 / 9.4) * 100);

type Side = {
  key: "before" | "after";
  eyebrow: string;
  title: string;
  icon: "plant" | "bolt";
  bills: number[];
  perUnit: string;
  mix: { label: string; share: number; tone: "fossil" | "fossil2" | "green" | "green2" | "grid" }[];
};

const sides: Side[] = [
  {
    key: "before",
    eyebrow: "Before",
    title: "Grid power",
    icon: "plant",
    bills: beforeBills,
    perUnit: "₹9.40",
    mix: [
      { label: "Coal", share: 72, tone: "fossil" },
      { label: "Gas", share: 16, tone: "fossil2" },
      { label: "Renewables", share: 12, tone: "green" },
    ],
  },
  {
    key: "after",
    eyebrow: "After",
    title: "With Neufin",
    icon: "bolt",
    bills: afterBills,
    perUnit: "₹6.20",
    mix: [
      { label: "Solar", share: 46, tone: "green" },
      { label: "Wind", share: 28, tone: "green2" },
      { label: "Grid", share: 26, tone: "grid" },
    ],
  },
];

// Chart box size and the handle's x within it, in px. Null until measured.
type Line = { w: number; h: number; x: number } | null;

function PriceLine({ line, tone }: { line: Line; tone: "before" | "after" }) {
  if (!line) return null;
  const { w, h, x } = line;
  const yHigh = h * (1 - toHeight(levelBefore));
  const drop = h * (toHeight(levelBefore) - toHeight(levelAfter));
  const run = drop / STRIPE_SLOPE;
  const t = w > 500 ? 6 : 4;
  // The diagonal ends at the handle, so the price has fully dropped where After begins.
  const points = stripePoints({ width: w, y: yHigh - t / 2, thickness: t, kinkX: x - run, drop });
  return (
    <svg className={styles.priceLine} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <polygon points={points} className={styles[`line_${tone}`]} />
      {tone === "after" && x + 72 < w && (
        <text x={x + 16} y={yHigh + drop - 14} className={styles.cutLabel}>
          −{cut}%
        </text>
      )}
    </svg>
  );
}

function Layer({ side, line, barsRef }: { side: Side; line: Line; barsRef?: React.Ref<HTMLDivElement> }) {
  return (
    <div className={`${styles.layer} ${styles[side.key]}`}>
      <div className={styles.head}>
        <span className={styles.tile}>
          <Icon name={side.icon} tone="neutral" size={24} />
        </span>
        <p className={styles.headText}>
          <span className={styles.eyebrow}>{side.eyebrow}</span>
          {side.title}
        </p>
      </div>

      <dl className={styles.stats}>
        <dt>Cost per unit</dt>
        <dd>
          <span className={styles.big}>{side.perUnit}</span> /kWh
        </dd>
      </dl>

      <div ref={barsRef} className={styles.bars}>
        {side.bills.map((v, i) => (
          <span key={months[i]} className={styles.bar} style={{ height: `${toHeight(v) * 100}%` }} />
        ))}
        <PriceLine line={line} tone={side.key} />
      </div>

      <div className={styles.mix}>
        <div className={styles.mixBar}>
          {side.mix.map((m) => (
            <span key={m.label} className={styles[m.tone]} style={{ width: `${m.share}%` }} />
          ))}
        </div>
        <p className={styles.mixKey}>
          {side.mix.map((m) => (
            <span key={m.label}>
              <i className={styles[m.tone]} />
              {m.label}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

const clamp = (n: number) => Math.min(96, Math.max(4, n));

export function ComparePanel() {
  // Handle position, as a percentage of the panel's width from the left.
  const [pos, setPos] = useState(82);
  const [dragging, setDragging] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const bars = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ panelW: number; left: number; w: number; h: number } | null>(null);

  // Measure the chart box, so the price line can be drawn in px and meet the handle.
  useLayoutEffect(() => {
    const measure = () => {
      const p = stage.current?.getBoundingClientRect();
      const b = bars.current?.getBoundingClientRect();
      if (p && b) setBox({ panelW: p.width, left: b.left - p.left, w: b.width, h: b.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stage.current) ro.observe(stage.current);
    return () => ro.disconnect();
  }, []);

  // A one-off glide on load, from the right to the middle, so it reads as draggable.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPos(50);
      return;
    }
    const from = 82;
    const to = 50;
    const duration = 1200;
    let start = 0;
    let frame = 0;
    const tick = (now: number) => {
      start ||= now;
      const k = Math.min(1, (now - start) / duration);
      setPos(from + (to - from) * (1 - Math.pow(1 - k, 3)));
      if (k < 1) frame = requestAnimationFrame(tick);
    };
    const delay = setTimeout(() => (frame = requestAnimationFrame(tick)), 400);
    return () => {
      clearTimeout(delay);
      cancelAnimationFrame(frame);
    };
  }, []);

  const moveTo = (clientX: number) => {
    const r = stage.current?.getBoundingClientRect();
    if (r) setPos(clamp(((clientX - r.left) / r.width) * 100));
  };

  const line: Line = box && { w: box.w, h: box.h, x: (pos / 100) * box.panelW - box.left };

  return (
    <figure className={styles.figure}>
      <div
        ref={stage}
        className={`surface ${styles.panel}`}
        data-dragging={dragging || undefined}
        style={{ ["--pos" as string]: `${pos}%` }}
        onPointerDown={(e) => {
          setDragging(true);
          e.currentTarget.setPointerCapture(e.pointerId);
          moveTo(e.clientX);
        }}
        onPointerMove={(e) => dragging && moveTo(e.clientX)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        <Layer side={sides[0]} line={line} barsRef={bars} />
        <div className={styles.afterClip}>
          <Layer side={sides[1]} line={line} />
        </div>

        <div
          className={styles.handle}
          role="slider"
          tabIndex={0}
          aria-label="Compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(100 - pos)}
          aria-valuetext={`${Math.round(100 - pos)}% showing after`}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => clamp(p - 5));
            else if (e.key === "ArrowRight") setPos((p) => clamp(p + 5));
            else return;
            e.preventDefault();
          }}
        >
          <span className={styles.knob} aria-hidden="true">
            <IconSvg icon={icons.drag} size={24} />
          </span>
        </div>
      </div>
      <figcaption className={styles.caption}>Illustrative figures for a typical industrial site. Drag to compare.</figcaption>
    </figure>
  );
}
