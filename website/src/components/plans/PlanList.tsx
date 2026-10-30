"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "@ds/components/Check.jsx";
import { IconSvg } from "@ds/components/Icon.jsx";
import { PlanMark } from "@ds/components/PlanMark.jsx";
import { icons } from "@ds/brand/icons.js";
import { usePlanChoices } from "@/lib/planChoices";
import { packs, type PackKind } from "@/lib/plans";
import styles from "./PlanList.module.css";

// Energy plans (/products/plan-finder): every plan, filtered by state, business type, yearly
// use, term and investment, from the brief's Energy plans table. Rebuilt after Kedar's review
// (2026-10-29: "keep it simple"; an Upwork-style filter column as a loose reference): filters
// as plain groups of checkboxes and radios from the design system, the plans as a calm table
// to scan on desktop ("a glorified Excel") and as cards on smaller screens. The four packs
// from the plan finder (2026-10-30) sort the plans: a row of plan pills above the plans (beside
// the Filters button on phones), and each plan's mark beside its name.

type Term = "spot" | "short" | "mid" | "long";
type Plan = { name: string; pack: PackKind; bestFor: string; term: string; t: Term; min: string; minYearly: number | null; investment: boolean };

// Each plan carries what the brief lists: name, who it suits, the landed price per unit, the
// term, the smallest size, the smallest yearly use and whether it needs an investment.
// TODO: Neufin's real plans (the brief's "exact plans" list), with landed prices per state,
// minimum yearly units (`minYearly`, in units; null until known, so the use filter shows every
// plan), which plans need an investment (a guess for now: the 15-year plans) and which pack
// each plan belongs to (a guess: 30-day is Flexi Saver, no-investment terms Saver, plans with
// an investment Max Saver; the rooftop plan is a placeholder).
const plans: Plan[] = [
  { name: "30-day market power", pack: "flexi", bestFor: "Short or changing needs", term: "30 days", t: "spot", min: "0.5 MWp", minYearly: null, investment: false },
  { name: "1-year solar", pack: "saver", bestFor: "Plants that run by day", term: "1 year", t: "mid", min: "0.5 MWp", minYearly: null, investment: false },
  { name: "1-year wind", pack: "saver", bestFor: "Sites that run in the evening and at night", term: "1 year", t: "mid", min: "0.5 MWp", minYearly: null, investment: false },
  { name: "3-year solar", pack: "saver", bestFor: "Plants and offices that run by day", term: "3 years", t: "mid", min: "0.5 MWp", minYearly: null, investment: false },
  { name: "5-year solar and wind", pack: "saver", bestFor: "Sites with steady day and night use", term: "5 years", t: "mid", min: "X MWp", minYearly: null, investment: false },
  { name: "Solar with battery", pack: "saver", bestFor: "Sites with a high evening peak", term: "5 to 15 years", t: "long", min: "X MWp", minYearly: null, investment: false },
  { name: "15-year solar", pack: "max", bestFor: "The lowest fixed price over the long run", term: "15 years", t: "long", min: "X MWp", minYearly: null, investment: true },
  { name: "15-year solar and wind", pack: "max", bestFor: "Round-the-clock sites that want a steady price", term: "15 years", t: "long", min: "X MWp", minYearly: null, investment: true },
  { name: "Rooftop solar", pack: "rooftop", bestFor: "Sites with free roof space", term: "Up to 25 years", t: "long", min: "X kWp", minYearly: null, investment: false },
];

const states = ["Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Telangana", "Haryana", "Rajasthan", "Uttar Pradesh"];
// The brief's two business types; the value is what goes in the link.
const types = [
  { value: "industrial", label: "Industrial", hint: "Factories, plants" },
  { value: "commercial", label: "Commercial", hint: "Offices, hotels, malls" },
];
// Yearly use, the home plan finder's monthly bands times twelve. `max` in units.
const uses = [
  { value: "any", label: "Any amount", max: Infinity },
  { value: "under-12l", label: "Under 12 lakh units", max: 12_00_000 },
  { value: "12l-60l", label: "12 to 60 lakh units", max: 60_00_000 },
  { value: "60l-2.4cr", label: "60 lakh to 2.4 crore units", max: 2_40_00_000 },
  { value: "over-2.4cr", label: "Over 2.4 crore units", max: Infinity },
];
// Checkboxes: none ticked means every plan.
const terms: { value: Term; label: string }[] = [
  { value: "spot", label: "30 days" },
  { value: "short", label: "Under 1 year" },
  { value: "mid", label: "1 to 5 years" },
  { value: "long", label: "5+ years" },
];
const investments = [
  { value: "none", label: "No investment" },
  { value: "yes", label: "With investment" },
];

const pick = <T extends { value: string }>(list: T[], value: string | undefined) => list.find((o) => o.value === value) ?? list[0];
// A checkbox filter travels in the link as a comma list ("term=spot,mid").
const list = (value: string | undefined) => (value ? value.split(",").filter(Boolean) : []);

type Filters = { pack: string; terms: string[]; investments: string[]; max: number };

const matches = (p: Plan, f: Filters) =>
  (!f.pack || p.pack === f.pack) &&
  (!f.terms.length || f.terms.includes(p.t)) &&
  (!f.investments.length || f.investments.includes(p.investment ? "yes" : "none")) &&
  (p.minYearly === null || p.minYearly <= f.max);

// The page title, naming the state once the visitor has given one (brief: "When state is
// known: Every energy plan in [state], with the price").
export function PlanTitle() {
  const [choices] = usePlanChoices();
  return <>{choices.state ? `Every energy plan in ${choices.state}, with the price` : "Every energy plan, with the price"}</>;
}

// Filters in a sticky column on the left from desktop; on phones and tablets they fold away
// behind a Filters button. Choices start from the visitor's link or last visit (usePlanChoices).
export function PlanList() {
  const [choices, choose] = usePlanChoices();
  const [open, setOpen] = useState(false);
  const state = states.includes(choices.state ?? "") ? choices.state! : states[0];
  const type = pick(types, choices.type);
  const use = pick(uses, choices.use);
  const pack = packs.some((k) => k.kind === choices.pack) ? choices.pack! : "";
  const filters: Filters = { pack, terms: list(choices.term), investments: list(choices.investment), max: use.max };
  const shown = plans.filter((p) => matches(p, filters));
  const active = filters.terms.length + filters.investments.length + (use.value === "any" ? 0 : 1);
  // How many plans a box would show if ticked, given the other filters.
  const countWith = (key: "terms" | "investments", value: string) => plans.filter((p) => matches(p, { ...filters, [key]: [value] })).length;
  // How many plans a pack pill would show, given the other filters.
  const countPack = (value: string) => plans.filter((p) => matches(p, { ...filters, pack: value })).length;
  const plural = (n: number) => `${n} ${n === 1 ? "plan" : "plans"}`;
  const toggle = (current: string[], value: string) => (current.includes(value) ? current.filter((v) => v !== value) : [...current, value]).join(",");
  const quote = `/contact/?${new URLSearchParams({ state, ...(choices.email ? { email: choices.email } : {}) })}`;

  return (
    <div className={styles.layout}>
      {/* The packs as plan pills, the same as the plan finder's; on phones and tablets the
          Filters button leads the row (Kedar). */}
      <div className={styles.bar}>
        <button type="button" className={`btn btn-secondary ${styles.toggle}`} aria-expanded={open} aria-controls="plan-filters" onClick={() => setOpen(!open)}>
          {active ? `Filters (${active})` : "Filters"}
          <IconSvg icon={icons["field-chevron"]} size={18} className={styles.chevron} />
        </button>
        <fieldset className={`plan-pills ${styles.pills}`}>
          <legend className="visually-hidden">Plan type</legend>
          {[{ kind: "" as const, name: "All plans" }, ...packs].map((k) => (
            <label key={k.kind || "all"} className="plan-pill" data-on={pack === k.kind || undefined}>
              <input type="radio" name="plan-pack" className="visually-hidden" checked={pack === k.kind} onChange={() => choose({ pack: k.kind })} />
              {k.kind && (
                <span className="plan-pill-mark">
                  <PlanMark kind={k.kind} />
                </span>
              )}
              <span>
                {k.name}
                <span className="plan-pill-sub">{plural(countPack(k.kind))}</span>
              </span>
            </label>
          ))}
        </fieldset>
      </div>

      <aside id="plan-filters" className={styles.filters} data-open={open || undefined} aria-label="Filter plans">
        {active > 0 && (
          <button type="button" className={styles.clear} onClick={() => choose({ term: "", investment: "", use: "" })}>
            Clear filters
          </button>
        )}

        <div className={styles.groups}>
          <label className="filter-group">
            <span className="filter-group-title">Your state</span>
            <span className="select-field">
              <select value={state} onChange={(e) => choose({ state: e.target.value })}>
                {states.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </span>
          </label>

          <fieldset className="filter-group">
            <legend className="filter-group-title">Business type</legend>
            <div>
              {types.map((o) => (
                <Check key={o.value} type="radio" name="plan-type" label={o.label} hint={o.hint} checked={type.value === o.value} onChange={() => choose({ type: o.value })} />
              ))}
            </div>
          </fieldset>

          <fieldset className="filter-group">
            <legend className="filter-group-title">Contract length</legend>
            <div>
              {terms.map((o) => (
                <Check key={o.value} label={o.label} count={countWith("terms", o.value)} checked={filters.terms.includes(o.value)} onChange={() => choose({ term: toggle(filters.terms, o.value) })} />
              ))}
            </div>
          </fieldset>

          <fieldset className="filter-group">
            <legend className="filter-group-title">Investment</legend>
            <div>
              {investments.map((o) => (
                <Check
                  key={o.value}
                  label={o.label}
                  count={countWith("investments", o.value)}
                  checked={filters.investments.includes(o.value)}
                  onChange={() => choose({ investment: toggle(filters.investments, o.value) })}
                />
              ))}
            </div>
          </fieldset>

          <label className="filter-group">
            <span className="filter-group-title">Yearly use</span>
            <span className="select-field">
              <select value={use.value} onChange={(e) => choose({ use: e.target.value })}>
                {uses.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </span>
          </label>
        </div>
      </aside>

      <div className={styles.results}>
        <p className={styles.count} aria-live="polite">
          {shown.length} {shown.length === 1 ? "plan" : "plans"} in {state}. Prices are indicative; your quote has the final price.
        </p>

        {shown.length ? (
          <>
            {/* Desktop: one table to scan and compare. */}
            <div className={`surface ${styles.tableBox}`}>
              <table className="data-table">
                <caption className="visually-hidden">Energy plans in {state}</caption>
                <thead>
                  <tr>
                    <th scope="col">Plan</th>
                    <th scope="col" className="data-table-num">
                      Price per unit
                    </th>
                    <th scope="col">Contract length</th>
                    <th scope="col">Size from</th>
                    <th scope="col">Yearly use from</th>
                    <th scope="col">Investment</th>
                    <th scope="col">
                      <span className="visually-hidden">Quote</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((p) => (
                    <tr key={p.name}>
                      <th scope="row" className={styles.planCell}>
                        <span className={styles.planName}>
                          <span className={styles.mark}>
                            <PlanMark kind={p.pack} />
                          </span>
                          <span>
                            <span className={styles.name}>{p.name}</span>
                            <span className={styles.note}>{p.bestFor}</span>
                          </span>
                        </span>
                      </th>
                      <td className={`data-table-num ${styles.price}`}>
                        <span className={styles.note}>from</span> ₹X.XX
                      </td>
                      <td>{p.term}</td>
                      <td>{p.min}</td>
                      <td>X lakh units</td>
                      <td>{p.investment ? "Needed" : "None"}</td>
                      <td className={styles.quoteCell}>
                        <Link href={quote} className="data-table-go">
                          <span className="visually-hidden">Get a quote for {p.name}</span>
                          <IconSvg icon={icons.arrow} size={20} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Phones and tablets: each plan a compact card, the whole card the link to a quote. */}
            <ul className={styles.cards}>
              {shown.map((p) => (
                <li key={p.name}>
                  <Link href={quote} className={`surface ${styles.card}`}>
                    <span className={styles.cardHead}>
                      <span className={styles.planName}>
                        <span className={styles.mark}>
                          <PlanMark kind={p.pack} />
                        </span>
                        <span>
                          <span className={styles.name}>{p.name}</span>
                          <span className={styles.note}>{p.bestFor}</span>
                        </span>
                      </span>
                      <span className={styles.cardPrice}>
                        <span className={styles.price}>from ₹X.XX</span>
                        <span className={styles.note}>a unit</span>
                      </span>
                    </span>
                    <span className={styles.cardFoot}>
                      <span className={styles.note}>
                        {p.term} · from {p.min} · from X lakh units a year · {p.investment ? "Investment needed" : "No investment"}
                      </span>
                      <span className="data-table-go">
                        <span className="visually-hidden">Get a quote for {p.name}</span>
                        <IconSvg icon={icons.arrow} size={20} />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className={`surface ${styles.empty}`}>
            <p>We don&apos;t have a plan that matches these filters yet. Send us your details and we&apos;ll find one for you.</p>
            <Link href="#not-sure" className="btn btn-primary">
              Get a quote
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
