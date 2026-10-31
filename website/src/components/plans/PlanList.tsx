"use client";

import Link from "next/link";
import { useState } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { PlanMark } from "@ds/components/PlanMark.jsx";
import { icons } from "@ds/brand/icons.js";
import { usePlanChoices } from "@/lib/planChoices";
import { packs, plansFor, states, terms, uses, type PackKind, type PlanQuote } from "@/lib/plans";
import styles from "./PlanList.module.css";

// Energy plans (/products/plan-finder), the brief's rows 4 and 5 (Kedar, 2026-10-31; CME
// Group as a loose reference). The job: view and compare plans in plain words and shortlist
// by what each is best for. The filters sit in a bar above the plans, so the table takes the
// full width: four dropdowns side by side (state, business type, monthly use, term), then the
// four plan types as toggle pills (checkboxes), all on to start, to narrow the comparison;
// every row keeps its height as plans come and go, so the table doesn't jump. Then every
// plan side by side, each a column, in one table that scrolls sideways, the largest saving on
// the left: its name, what it's best for, the most it saves in the chosen state and whether
// it needs an investment; View details opens the rest (tenure, landed price, mode, technology,
// delivery, investment). Then the central Get your quote today. Choices come from the
// visitor's link or last visit, and are kept (usePlanChoices).

const types = [
  { value: "industrial", label: "Industrial (factories, plants)" },
  { value: "commercial", label: "Commercial (offices, hotels, malls)" },
];

const pick = <T extends { value: string }>(list: T[], value: string | undefined, fallback: T) => list.find((o) => o.value === value) ?? fallback;
const rupees = (n: number) => `₹${n.toFixed(2)}`;
const percent = (n: number) => `${Math.round(n * 100)}%`;
const allKinds = packs.map((p) => p.kind);

// The rows that open under View details, in the brief's order.
const details: { label: string; value: (p: PlanQuote) => string }[] = [
  { label: "Tenure", value: (p) => p.tenure },
  { label: "Landed price per unit", value: (p) => `From ${rupees(p.price)}` },
  { label: "Mode", value: (p) => p.mode },
  { label: "Technology", value: (p) => p.technology },
  { label: "Delivery", value: (p) => p.delivery },
  { label: "Investment", value: (p) => p.investment ?? "None" },
];

function Select({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <span className="select-field">
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}

export function PlanList() {
  const [choices, choose] = usePlanChoices();
  const [more, setMore] = useState(false);
  const [open, setOpen] = useState(false);
  // TODO: detect the state from the visitor's location (needs a location service); the
  // brief's default is Maharashtra.
  const state = states.some((s) => s.name === choices.state) ? choices.state! : "Maharashtra";
  const type = pick(types, choices.type, types[0]);
  const use = pick(uses, choices.use, uses[0]);
  const term = pick(terms, choices.term, terms[0]);
  const picked = (choices.types ?? "").split(",").filter((k): k is PackKind => allKinds.includes(k as PackKind));
  const kinds = picked.length ? picked : allKinds;
  const base = { state, commercial: type.value === "commercial", use: use.value, term: term.value };
  const shown = plansFor({ ...base, kinds });
  const toggle = (kind: PackKind) => {
    const next = kinds.includes(kind) ? kinds.filter((k) => k !== kind) : [...kinds, kind];
    if (next.length) choose({ types: next.length === allKinds.length ? "" : next.join(",") });
  };
  const quote = `/contact/?${new URLSearchParams({ state, ...(choices.email ? { email: choices.email } : {}) })}`;

  return (
    <div className={styles.layout}>
      {/* Phones: the bar folds away behind a Filters button, so the plans come first. */}
      <button type="button" className={`btn btn-secondary ${styles.toggle}`} aria-expanded={open} aria-controls="plan-filters" onClick={() => setOpen(!open)}>
        Filters
        <IconSvg icon={icons["field-chevron"]} size={18} className={styles.chevron} />
      </button>

      <div id="plan-filters" className={styles.bar} data-open={open || undefined} role="group" aria-label="Filter plans">
        <div className={styles.fields}>
          <Select label="State" value={state} options={states.map((s) => ({ value: s.name, label: s.name }))} onChange={(v) => choose({ state: v })} />
          <Select label="Business type" value={type.value} options={types} onChange={(v) => choose({ type: v })} />
          <Select label="Monthly use (optional)" value={use.value} options={uses} onChange={(v) => choose({ use: v })} />
          <Select label="Term" value={term.value} options={terms} onChange={(v) => choose({ term: v })} />
        </div>

        <fieldset className={styles.kinds}>
          <legend className={styles.fieldLabel}>Plan types</legend>
          <div className={`plan-pills ${styles.kindList}`}>
            {packs.map((p) => {
              const on = kinds.includes(p.kind);
              // The last type on stays on, so there is always something to compare.
              const last = on && kinds.length === 1;
              return (
                <label key={p.kind} className="plan-pill plan-pill-toggle" data-on={on || undefined}>
                  <input type="checkbox" className="visually-hidden" checked={on} disabled={last} onChange={() => toggle(p.kind)} />
                  <span className="plan-pill-mark">
                    <PlanMark kind={p.kind} />
                  </span>
                  {p.name}
                  <span className="plan-pill-check" aria-hidden="true">
                    <IconSvg icon={icons.check} size={16} />
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>


      {shown.length ? (
        <>
          <div className="surface">
            <div className="data-table-scroll" tabIndex={0} role="region" aria-label={`Energy plans in ${state}, side by side`}>
              <table className="data-table data-table-compare">
                <caption className="visually-hidden">Energy plans in {state}, the largest saving first</caption>
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="visually-hidden">Plan</span>
                    </th>
                    {shown.map((p) => (
                      <th key={p.name} scope="col">
                        <span className={styles.planHead}>
                          <span className={styles.mark}>
                            <PlanMark kind={p.pack} />
                          </span>
                          <span className={`data-table-two ${styles.name}`}>{p.name}</span>
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Best for</th>
                    {shown.map((p) => (
                      <td key={p.name}>
                        <span className="data-table-two">{p.bestFor}</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Saves up to</th>
                    {shown.map((p) => (
                      <td key={p.name} className={styles.saving}>
                        {percent(p.saving)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Investment required</th>
                    {shown.map((p) => (
                      <td key={p.name}>{p.investment ? "Yes" : "No"}</td>
                    ))}
                  </tr>
                  <tr>
                    <td colSpan={shown.length + 1} className="data-table-more">
                      <button type="button" aria-expanded={more} aria-controls="plan-details" onClick={() => setMore(!more)}>
                        {more ? "Hide details" : "View details"}
                        <IconSvg icon={icons["field-chevron"]} size={18} />
                      </button>
                    </td>
                  </tr>
                </tbody>
                <tbody id="plan-details" hidden={!more}>
                  {details.map((d) => (
                    <tr key={d.label}>
                      <th scope="row">{d.label}</th>
                      {shown.map((p) => (
                        <td key={p.name}>
                          <span className="data-table-two">{d.value(p)}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.cta}>
            <Link href={quote} className="btn btn-primary">
              Get your quote today
              <IconSvg icon={icons.arrow} size={20} />
            </Link>
          </div>
        </>
      ) : (
        <div className={`surface ${styles.empty}`}>
          <p>We don&apos;t have a plan that matches your filters. Send us your details and we&apos;ll find one for you.</p>
          <Link href="/contact/" className="btn btn-primary">
            Contact us
          </Link>
        </div>
      )}
    </div>
  );
}
