"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { Logo } from "@ds/components/Logo.jsx";
import { RingStamp } from "@ds/components/Stamp.jsx";
import { RollingFigure } from "@ds/components/RollingFigure.jsx";
import { hexOf } from "@ds/brand/tokens.js";
import { icons } from "@ds/brand/icons.js";
import { plans, sites, states, terms, uses } from "@/components/sections/PlanFinder";
import { planFinderHref } from "@/lib/site";
import styles from "./PlanFinder.module.css";

// The home page's plan finder, from Kedar's directional mock: a full-width Electric Violet band
// holding the title and one White box. Left: the state as a dropdown, the type of site as option
// tiles with icons, monthly use and contract length as step sliders. Right: the answer
// laid out like an electricity bill, the board's column next to Neufin's, then the
// saving with its percentage as a Signal Yellow badge that pops whenever a choice
// changes. Priced exactly like the light plan finder on Buy cheaper power (same data).
// TODO: every figure is illustrative; Neufin to supply real bands (see PlanFinder.tsx).

// Short stop labels for the use slider, in lakh units; the full band shows beside the
// field's label.
const useMarks = ["Under 1", "1–5", "5–20", "Over 20"];
const tileIcons = ["plant", "office"] as const;

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const rate = (n: number) => `₹${n.toFixed(2)}`;
// A yearly amount in lakh, or in crore from ₹1 crore (never "₹1,200 lakh").
const lakh = (n: number) =>
  n >= 1_00_00_000
    ? `₹${(n / 1_00_00_000).toLocaleString("en-IN", { maximumFractionDigits: 1 })} crore`
    : `₹${(n / 1_00_000).toLocaleString("en-IN", { maximumFractionDigits: 1 })} lakh`;

// A small down arrow before each of Neufin's figures: the price drops against the board's.
const Drop = () => (
  <span className={styles.drop}>
    <IconSvg icon={icons.drop} size={16} />
    <span className="visually-hidden">Lower: </span>
  </span>
);

function Slider({
  id,
  label,
  marks,
  valueText,
  value,
  onChange,
}: {
  id: string;
  label: string;
  marks: string[];
  valueText: string;
  value: number;
  onChange: (i: number) => void;
}) {
  return (
    <div className={styles.field}>
      <div className={styles.fieldHead}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <span className={styles.fieldValue} aria-hidden="true">
          {valueText}
        </span>
      </div>
      <div
        className="step-slider"
        style={{ "--steps": marks.length, "--value": value } as CSSProperties}
      >
        <input
          id={id}
          type="range"
          min={0}
          max={marks.length - 1}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-valuetext={valueText}
        />
        <ol className="step-slider-marks" aria-hidden="true">
          {marks.map((m, i) => (
            <li key={m}>
              <button
                type="button"
                tabIndex={-1}
                style={{ "--i": i } as CSSProperties}
                aria-current={i === value}
                onClick={() => onChange(i)}
              >
                {m}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function PlanFinder() {
  const [term, setTerm] = useState(1);
  const [use, setUse] = useState(1);
  const [site, setSite] = useState(0);
  const [state, setState] = useState(0);
  // How many times a choice has changed: the badge pops on each change, not on load.
  const [changes, setChanges] = useState(0);
  const change = (set: (v: number) => void) => (v: number) => {
    set(v);
    setChanges((n) => n + 1);
  };

  const units = uses[use].units;
  const board = states[state].board + sites[site].boardExtra;
  const best = plans[term]
    .map((p) => ({ ...p, price: p.price - uses[use].discount }))
    .sort((a, b) => a.price - b.price)[0];
  const boardBill = units * board;
  const neufinBill = units * best.price;
  const saved = boardBill - neufinBill;
  const percent = Math.round((saved / boardBill) * 100);

  return (
    <div className={styles.band}>
      <section className={`container ${styles.section}`} aria-labelledby="plans-title">
        <h2 id="plans-title" className={styles.title}>
          See your price before you talk to us
        </h2>

        <div className={`surface ${styles.card}`}>
          <form className={styles.inputs} onSubmit={(e) => e.preventDefault()}>
            <label className={styles.field}>
              <span className={styles.label}>Your state</span>
              <span className="select-field">
                <span className="select-field-icon">
                  <IconSvg icon={icons["field-location"]} size={18} />
                </span>
                <select value={state} onChange={(e) => change(setState)(Number(e.target.value))}>
                  {states.map((s, i) => (
                    <option key={s.name} value={i}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </span>
            </label>

            <fieldset className={styles.field}>
              <legend className={styles.label}>Type of site</legend>
              <div className={`option-tiles ${styles.tiles}`}>
                {sites.map((s, i) => (
                  <label key={s.label} className="option-tile">
                    <input type="radio" name="v4-site" checked={site === i} onChange={() => change(setSite)(i)} />
                    <span className="option-tile-icon">
                      <IconSvg icon={icons[tileIcons[i]]} size={24} />
                    </span>
                    {s.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <Slider
              id="v4-use"
              label="Monthly power use"
              marks={useMarks}
              valueText={uses[use].label}
              value={use}
              onChange={change(setUse)}
            />
            <Slider
              id="v4-term"
              label="Contract length"
              marks={terms}
              valueText={terms[term]}
              value={term}
              onChange={change(setTerm)}
            />
          </form>

          <div className={styles.bill} aria-live="polite">
            <div className={styles.billHead}>
              <p className={styles.billTitle}>Your monthly power bill</p>
              <p className={styles.billMeta}>
                <RollingFigure value={units.toLocaleString("en-IN")} /> units · {states[state].name}
              </p>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="visually-hidden">Bill line</span>
                  </th>
                  <th scope="col">Electricity board</th>
                  <th scope="col" className={styles.neufin}>
                    {/* The two-colour logo; phones: the symbol alone. */}
                    <Logo
                      variant="horizontal"
                      height={18}
                      markColor={hexOf("electric-violet")}
                      title="With Neufin Energy"
                      className={`${styles.logo} ${styles.logoWide}`}
                    />
                    <Logo
                      variant="symbol"
                      height={24}
                      color={hexOf("electric-violet")}
                      title="With Neufin Energy"
                      className={`${styles.logo} ${styles.logoNarrow}`}
                    />
                    <span className={styles.planName}>
                      {best.name} · {best.fixed ? "fixed price" : "no lock-in"}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Price per unit</th>
                  <td>
                    <RollingFigure value={rate(board)} />
                  </td>
                  <td className={styles.neufin}>
                    <Drop />
                    <RollingFigure value={rate(best.price)} />
                  </td>
                </tr>
                <tr>
                  <th scope="row">Energy charges</th>
                  <td>
                    <RollingFigure value={inr(boardBill)} />
                  </td>
                  <td className={styles.neufin}>
                    <Drop />
                    <RollingFigure value={inr(neufinBill)} />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className={styles.foot}>
              {/* The saving right under the table, then the actions on their own row at the
                  bottom of the box. */}
              <div className={styles.saving}>
                <p className={styles.savingFigure}>
                  You save{" "}
                  <span className={styles.amount}>
                    <RollingFigure value={inr(saved)} />
                    <span aria-hidden="true">/mon</span>
                    <span className="visually-hidden"> a month</span>
                  </span>
                </p>
                <p className={styles.savingNote}>
                  <span>
                    <RollingFigure value={lakh(saved * 12)} /> a year
                  </span>
                  {/* Keyed on the change count, so the badge pops again on every change. */}
                  <span key={changes} className={styles.badge} data-pop={changes > 0 || undefined}>
                    {percent}% less
                  </span>
                </p>
              </div>
              <div className={styles.actions}>
                {/* TODO: send the four choices with the quote request once the form exists. */}
                <Link href="/contact" className="btn btn-accent">
                  Get a quote
                </Link>
                <Link href={planFinderHref} className={`link-arrow ${styles.more}`}>
                  See every plan
                  <IconSvg icon={icons.arrow} size={20} />
                </Link>
              </div>

            </div>

            {/* A large ring stamp sunk into the box's bottom right corner (the box crops it), like the CERC stamp in the numbers
                block: the bill icon in the middle. Still, no motion.
                TODO: Neufin to confirm "No hidden charges". */}
            <span className={styles.stamp} role="img" aria-label="Transparent pricing, no hidden charges">
              <RingStamp text="Transparent pricing · No hidden charges · " size={232}>
                <IconSvg icon={icons.bill} size={64} />
              </RingStamp>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
