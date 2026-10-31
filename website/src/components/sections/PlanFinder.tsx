"use client";

import Link from "next/link";
import { useState } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { PlanMark } from "@ds/components/PlanMark.jsx";
import { RollingFigure } from "@ds/components/RollingFigure.jsx";
import { Segmented } from "@ds/components/Segmented.jsx";
import { icons } from "@ds/brand/icons.js";
import { packFrom, packs, sites, states, type Pack } from "@/lib/plans";
import { planFinderHref } from "@/lib/site";
import styles from "./PlanFinder.module.css";

// The plan finder, the same on every page that shows it (home, Buy cheaper power), from the
// client's mock and Kedar's pick of three options (2026-10-30): an Electric Violet band, the
// title, and one White box holding Neufin's four energy plan packs and the saving calculator
// as one piece. The packs are tabs, each with a radio circle, its plan mark (design system
// `PlanMark`) and the same few facts to compare; the chosen pack turns White and joins the
// calculator (on the left from 1024px, a sideways strip on top below that). The calculator:
// state, business type and monthly use, then the board's bill against the pack's, the
// monthly saving with its % badge, and Get a call back. Under the packs, Try on your own goes
// to the full plan list with the chosen pack and state set. Data in src/lib/plans.ts (illustrative).

const uses = [25_000, 50_000, 1_00_000, 2_00_000, 3_00_000, 5_00_000, 10_00_000, 20_00_000, 30_00_000];

const pct = (p: Pack) => `${Math.round(p.save * 100)}%`;
const from = (p: Pack) => `from ₹${packFrom(p).toFixed(2)} a unit`;
// Amounts in words (Kedar): ₹5.6 lakh, ₹1.2 crore; under a lakh in rupees.
const amount = (n: number) => {
  const fmt = (v: number) => v.toLocaleString("en-IN", { maximumFractionDigits: 1 });
  if (n >= 1_00_00_000) return `₹${fmt(n / 1_00_00_000)} crore`;
  if (n >= 1_00_000) return `₹${fmt(n / 1_00_000)} lakh`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
};
// The Energy plans page's monthly use band for an amount, so its filters start where this left off.
const useBand = (n: number) => (n < 1_00_000 ? "under-1l" : n <= 5_00_000 ? "1l-5l" : n <= 20_00_000 ? "5l-20l" : "over-20l");
const units = (n: number) => (n >= 1_00_000 ? `${(n / 1_00_000).toLocaleString("en-IN")} lakh units` : `${n.toLocaleString("en-IN")} units`);

export function PlanFinder({ title = "Energy plans to fit your business goals" }: { title?: string }) {
  const [pick, setPick] = useState(0);
  const [state, setState] = useState(0);
  const [site, setSite] = useState(0);
  const [use, setUse] = useState(4);
  // How many times a choice has changed: the badge pops on each change, not on load.
  const [changes, setChanges] = useState(0);
  const change = (set: (v: number) => void) => (v: number) => {
    set(v);
    setChanges((n) => n + 1);
  };

  const pack = packs[pick];
  const board = uses[use] * (states[state].board + sites[site].boardExtra);
  const neufin = board * (1 - pack.save);
  const saved = board - neufin;

  return (
    <div id="compare" className={styles.band}>
      <section className={`container ${styles.section}`} aria-labelledby="price-title">
        <h2 id="price-title" className={styles.title}>
          {title}
        </h2>

        <div className={styles.tool}>
          <fieldset className={`${styles.tabs} plan-pills`}>
            <legend className="visually-hidden">Choose a plan</legend>
            {packs.map((p, i) => (
              <label key={p.kind} className={`${styles.tab} plan-pill check-radio`} data-on={pick === i || undefined}>
                {/* The design system's radio circle: the plain sign that one of these is picked. */}
                <input type="radio" name="pf-pack" className="check-input" checked={pick === i} onChange={() => change(setPick)(i)} />
                <span className={`check-box ${styles.radio}`} aria-hidden="true" />
                <span className={`${styles.tile} plan-pill-mark`}>
                  <PlanMark kind={p.kind} />
                </span>
                <span className={styles.tabWords}>
                  <span className={styles.tabHead}>
                    <span className={styles.tabName}>{p.name}</span>
                    <span className={`${styles.tabPct} plan-pill-sub`}>{pct(p)} less</span>
                  </span>
                  {/* The same few facts on every pack, so they compare at a glance; nothing opens on
                      selection (Kedar). Laptops only: the phone strip stays compact. */}
                  <span className={styles.tabCompare}>
                    <span>{p.short}</span>
                    <span className={styles.tabMeta}>
                      {p.term} · {from(p)}
                    </span>
                  </span>
                </span>
              </label>
            ))}
          </fieldset>

          <div className={styles.panel}>
            <form className={styles.inputs} onSubmit={(e) => e.preventDefault()}>
              {/* Phones: the chosen pack's facts, which the strip has no room for. */}
              <p className={styles.panelLine}>
                {pack.short} · {pack.term} · {from(pack)}
              </p>
              <div className={styles.panelHead}>
                <h3 className={styles.panelTitle}>Your saving with {pack.name}</h3>
                <span className="tag">
                  <span className="tag-dot" aria-hidden="true" />
                  Updates as you choose
                </span>
              </div>

              <div className={styles.fieldRow}>
                <label className={styles.field}>
                  <span className={styles.label}>State</span>
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
                  <legend className={styles.label}>Business type</legend>
                  <Segmented name="pf-site" options={sites.map((s) => s.label)} value={site} onChange={change(setSite)} small />
                </fieldset>
              </div>

              <div className={styles.field}>
                <div className={styles.useHead}>
                  <label htmlFor="pf-use" className={styles.label}>
                    Monthly power use
                  </label>
                  <span className={styles.useValue}>{units(uses[use])}</span>
                </div>
                <div className="step-slider" style={{ "--steps": uses.length, "--value": use } as React.CSSProperties}>
                  <input
                    id="pf-use"
                    type="range"
                    min={0}
                    max={uses.length - 1}
                    step={1}
                    value={use}
                    aria-valuetext={units(uses[use])}
                    onChange={(e) => change(setUse)(Number(e.target.value))}
                  />
                  <ol className="step-slider-marks" aria-hidden="true">
                    {[0, uses.length - 1].map((i) => (
                      <li key={i} style={{ "--i": i } as React.CSSProperties}>
                        <button type="button" tabIndex={-1} aria-current={use === i} onClick={() => change(setUse)(i)}>
                          {units(uses[i])}
                        </button>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </form>

            <div className={styles.result} aria-live="polite">
              <dl className={styles.bars}>
                <div className={styles.barRow}>
                  <dt>Your electricity board</dt>
                  <dd>
                    <RollingFigure value={`${amount(board)} a month`} />
                  </dd>
                  <span className={`${styles.bar} ${styles.barBoard}`} style={{ "--w": 1 } as React.CSSProperties} aria-hidden="true" />
                </div>
                <div className={styles.barRow}>
                  <dt>With {pack.name}</dt>
                  <dd>
                    <RollingFigure value={`${amount(neufin)} a month`} />
                  </dd>
                  <span className={`${styles.bar} ${styles.barNeufin}`} style={{ "--w": 1 - pack.save } as React.CSSProperties} aria-hidden="true" />
                </div>
              </dl>

              <div className={styles.saving}>
                <p className={styles.savingFigure}>
                  You save{" "}
                  <span className={styles.savingAmount}>
                    <RollingFigure value={amount(saved)} />
                    <span className={styles.savingUnit}> a month</span>
                  </span>
                </p>
                {/* Keyed on the change count, so the badge pops again on every change. */}
                <span key={changes} className="saving-badge" data-pop={changes > 0 || undefined}>
                  {pct(pack)} less
                </span>
              </div>
              <div className={styles.foot}>
                <p className={styles.note}>About {amount(saved * 12)} a year. Indicative: your price depends on your use, site and contract.</p>
                {/* TODO: send the choices and the pack with the call-back request once the form exists. */}
                <Link href="/contact" className={`btn btn-primary ${styles.cta}`}>
                  Get a call back
                </Link>
              </div>
            </div>
          </div>

          {/* For everyone the four packs don't fit; the panel's Get a call back covers a custom plan. */}
          <div className={styles.custom}>
            <p className={styles.customTitle}>Need a different mix?</p>
            <Link href={`${planFinderHref}?${new URLSearchParams({ state: states[state].name, type: site ? "commercial" : "industrial", use: useBand(uses[use]) })}`} className={`btn btn-secondary ${styles.customCta}`}>
              Try on your own
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
