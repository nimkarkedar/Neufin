"use client";

import Link from "next/link";
import { useState } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { Logo } from "@ds/components/Logo.jsx";
import { RingStamp } from "@ds/components/Stamp.jsx";
import { RollingFigure } from "@ds/components/RollingFigure.jsx";
import { Segmented } from "@ds/components/Segmented.jsx";
import { hexOf } from "@ds/brand/tokens.js";
import { icons } from "@ds/brand/icons.js";
import { plans, sites, states, terms, uses } from "@/lib/plans";
import { planFinderHref } from "@/lib/site";
import styles from "./PlanFinder.module.css";

// The plan finder, the same on every page that shows it (home, Buy cheaper power), from
// Kedar's directional mock: a full-width Electric Violet band holding the title and one
// White box. Left: the state as a dropdown, then type of site, monthly use and contract
// length as the design system's small segmented control, each set on one line (Kedar). Right: the answer laid out like an
// electricity bill, the board's column next to Neufin's, then the saving with its
// percentage as a Signal Yellow badge that pops whenever a choice changes.
// Prices from src/lib/plans.ts (illustrative).

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
// The saving in words (Kedar): ₹35 lakh, ₹2.85 lakh, ₹1.2 crore; under a lakh in rupees.
const short = (n: number) => {
  const fmt = (v: number) => v.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  if (n >= 1_00_00_000) return `₹${fmt(n / 1_00_00_000)} crore`;
  if (n >= 1_00_000) return `₹${fmt(n / 1_00_000)} lakh`;
  return inr(n);
};
const rate = (n: number) => `₹${n.toFixed(2)}`;

// A small down arrow before each of Neufin's figures: the price drops against the board's.
const Drop = () => (
  <span className={styles.drop}>
    <IconSvg icon={icons.drop} size={16} />
    <span className="visually-hidden">Lower: </span>
  </span>
);

// One choice as the design system's small segmented control (the thumb glides to the
// choice), under a visible legend; scrolls sideways where a screen is too narrow.
function Choice({
  name,
  label,
  options,
  value,
  onChange,
}: {
  name: string;
  label: string;
  options: string[];
  value: number;
  onChange: (i: number) => void;
}) {
  return (
    <fieldset className={styles.field}>
      <legend className={styles.label}>{label}</legend>
      <Segmented name={name} options={options} value={value} onChange={onChange} small className={styles.choice} />
    </fieldset>
  );
}

export function PlanFinder({ title = "See your price before you talk to us" }: { title?: string }) {
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
      <section className={`container ${styles.section}`} aria-labelledby="price-title">
        <h2 id="price-title" className={styles.title}>
          {title}
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
            <Choice name="pf-site" label="Type of site" options={sites.map((x) => x.label)} value={site} onChange={change(setSite)} />
            <Choice name="pf-use" label="Monthly power use, in units" options={uses.map((x) => x.label)} value={use} onChange={change(setUse)} />
            <Choice name="pf-term" label="Contract length" options={terms} value={term} onChange={change(setTerm)} />
          </form>

          <div className={styles.bill} aria-live="polite">
            <p className={styles.billTitle}>Your monthly power bill</p>

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
              </tbody>
            </table>

            <div className={styles.foot}>
              {/* The saving right under the table, then the actions on their own row at the
                  bottom of the box. */}
              <div className={styles.saving}>
                <p className={styles.savingFigure}>
                  You save{" "}
                  <span className={styles.amount}>
                    <RollingFigure value={short(saved)} />
                    <span aria-hidden="true">/mon</span>
                    <span className="visually-hidden"> a month</span>
                  </span>
                </p>
                <p className={styles.savingNote}>
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
              <RingStamp text="Transparent pricing · No hidden charges · " size={186}>
                <IconSvg icon={icons.bill} size={52} />
              </RingStamp>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
