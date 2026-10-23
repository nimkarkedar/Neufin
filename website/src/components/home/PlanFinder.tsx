"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { Logo } from "@ds/components/Logo.jsx";
import { RollingFigure } from "@ds/components/RollingFigure.jsx";
import { hexOf } from "@ds/brand/tokens.js";
import { icons } from "@ds/brand/icons.js";
import { planFinderHref } from "@/lib/site";
import styles from "./PlanFinder.module.css";

// Home page plan finder. Left (30%): four dropdowns. Right (70%): the answer laid out
// like an electricity bill, the board's column next to Neufin's, so the saving reads
// the way a buyer already reads their bill.
// TODO: every figure below is illustrative; replace with Neufin's price bands per state,
// contract length and site type, and the full list of 16 states.

type IconName = keyof typeof icons;

const terms = ["30 days", "1 year", "3 years", "5 years", "15 years"];

// Each band is billed at a typical monthly use inside it.
const uses = [
  { label: "Under 1 lakh units", units: 75_000, discount: 0 },
  { label: "1 to 5 lakh units", units: 3_00_000, discount: 0 },
  { label: "5 to 20 lakh units", units: 10_00_000, discount: 0.1 },
  { label: "Over 20 lakh units", units: 25_00_000, discount: 0.2 },
];

const sites: { label: string; icon: IconName; boardExtra: number }[] = [
  { label: "Factory or plant", icon: "field-plant", boardExtra: 0 },
  { label: "Office, hotel, mall or shop", icon: "field-office", boardExtra: 0.8 },
];

// Electricity board rate per unit for an industrial site, by state.
const states: { name: string; board: number }[] = [
  { name: "Maharashtra", board: 9.4 },
  { name: "Karnataka", board: 8.6 },
  { name: "Tamil Nadu", board: 8.9 },
  { name: "Gujarat", board: 8.2 },
  { name: "Telangana", board: 8.8 },
  { name: "Haryana", board: 8.5 },
  { name: "Rajasthan", board: 8.7 },
  { name: "Uttar Pradesh", board: 8.9 },
];

type Plan = { name: string; price: number; fixed: boolean };

const plans: Plan[][] = [
  [
    { name: "Daily market power", price: 7.4, fixed: false },
    { name: "Short-term solar and wind", price: 7.7, fixed: true },
    { name: "Short-term solar", price: 7.9, fixed: true },
  ],
  [
    { name: "1-year solar", price: 6.9, fixed: true },
    { name: "1-year wind", price: 7.2, fixed: true },
    { name: "Daily market power", price: 7.4, fixed: false },
  ],
  [
    { name: "3-year solar", price: 6.4, fixed: true },
    { name: "3-year solar and wind", price: 6.7, fixed: true },
    { name: "Solar with battery", price: 7.3, fixed: true },
  ],
  [
    { name: "5-year solar and wind", price: 6.2, fixed: true },
    { name: "5-year solar", price: 6.3, fixed: true },
    { name: "Solar with battery", price: 7.1, fixed: true },
  ],
  [
    { name: "15-year solar", price: 5.6, fixed: true },
    { name: "15-year solar and wind", price: 5.9, fixed: true },
    { name: "Solar with battery", price: 6.8, fixed: true },
  ],
];

// A small down arrow before each of Neufin's figures: the price drops against the board's.
const Drop = () => (
  <span className={styles.drop}>
    <IconSvg icon={icons.drop} size={16} />
    <span className="visually-hidden">Lower: </span>
  </span>
);

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const rate = (n: number) => `₹${n.toFixed(2)}`;
const lakh = (n: number) => `₹${(n / 1_00_000).toLocaleString("en-IN", { maximumFractionDigits: 1 })} lakh`;

function Choice({
  label,
  icon,
  options,
  value,
  onChange,
}: {
  label: string;
  icon: IconName;
  options: string[];
  value: number;
  onChange: (i: number) => void;
}) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <span className="select-field">
        <span className="select-field-icon">
          <IconSvg icon={icons[icon]} size={18} />
        </span>
        <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
          {options.map((o, i) => (
            <option key={o} value={i}>
              {o}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}

export function PlanFinder({ children }: { children?: ReactNode }) {
  const [term, setTerm] = useState(1);
  const [use, setUse] = useState(1);
  const [site, setSite] = useState(0);
  const [state, setState] = useState(0);

  const units = uses[use].units;
  const board = states[state].board + sites[site].boardExtra;
  const options = plans[term]
    .map((p) => ({ ...p, price: p.price - uses[use].discount }))
    .sort((a, b) => a.price - b.price);
  const best = options[0];
  const boardBill = units * board;
  const neufinBill = units * best.price;
  const saved = boardBill - neufinBill;
  const percent = Math.round((saved / boardBill) * 100);

  return (
    <section className={styles.section} aria-labelledby="plans-title">
      <div className="container">
        <div className={styles.head}>
          <h2 id="plans-title" className={styles.title}>
            See your price before you talk to us
          </h2>
        </div>

        <div className={`surface surface-flat ${styles.card}`}>
          <form className={styles.inputs} onSubmit={(e) => e.preventDefault()}>
            <p className={styles.panelTitle}>Your site</p>
            <Choice label="Your state" icon="field-location" options={states.map((s) => s.name)} value={state} onChange={setState} />
            <Choice label="Type of site" icon={sites[site].icon} options={sites.map((s) => s.label)} value={site} onChange={setSite} />
            <Choice label="Monthly power use" icon="field-gauge" options={uses.map((u) => u.label)} value={use} onChange={setUse} />
            <Choice label="Contract length" icon="field-calendar" options={terms} value={term} onChange={setTerm} />
          </form>

          <div className={styles.bill} aria-live="polite">
            <div className={styles.billHead}>
              <p className={styles.panelTitle}>Your monthly power bill</p>
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
                    {/* Horizontal logo at 18px (minimum 16px). Phones: the symbol alone, as the
                        column is too narrow for the full logo at its minimum size. */}
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

            <div className={styles.saving}>
              {/* Two styles only: the saving as one large line, the detail as one small line. */}
              <p className={styles.savingFigure}>
                You save <RollingFigure value={inr(saved)} />
              </p>
              <p className={styles.savingNote}>
                a month · <RollingFigure value={lakh(saved * 12)} /> a year · <RollingFigure value={`${percent}%`} /> less
              </p>
            </div>

            <div className={styles.actions}>
              {/* TODO: send the four choices with the quote request once the form exists. */}
              <Link href="/contact" className="btn btn-primary">
                Get a quote
              </Link>
              <Link href={planFinderHref} className={styles.more}>
                See every plan
                <IconSvg icon={icons.arrow} size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* TODO: the prices are illustrative; Neufin to supply real bands before launch. */}

        {/* Optional follow-on content inside the same band (the home page's next steps). */}
        {children}
      </div>
    </section>
  );
}
