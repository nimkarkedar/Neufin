"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import styles from "./PlanList.module.css";

// Plan finder: filter every plan by state, site type, source and term.
// TODO: Neufin's real plan list with price bands per state; the eight states.

type IconName = keyof typeof icons;
type Source = "Solar" | "Wind" | "Solar and wind" | "Battery" | "Daily market";
type Term = "short" | "mid" | "long";

const plans: { name: string; source: Source; icon: IconName; bestFor: string; term: string; t: Term; min: string; feature: string }[] = [
  { name: "30-day market power", source: "Daily market", icon: "chart", bestFor: "short or changing needs", term: "From 30 days", t: "short", min: "0.5 MWp", feature: "No lock-in" },
  { name: "1-year solar", source: "Solar", icon: "sun", bestFor: "plants that run by day", term: "1 year", t: "mid", min: "0.5 MWp", feature: "Fixed daytime price" },
  { name: "1-year wind", source: "Wind", icon: "wind", bestFor: "sites that run round the clock", term: "1 year", t: "mid", min: "0.5 MWp", feature: "Evening and night power" },
  { name: "3-year solar", source: "Solar", icon: "sun", bestFor: "plants and offices that run by day", term: "3 years", t: "mid", min: "0.5 MWp", feature: "Fixed for 3 years" },
  { name: "5-year solar and wind", source: "Solar and wind", icon: "leaf", bestFor: "sites with steady day and night use", term: "5 years", t: "mid", min: "X MWp", feature: "Solar and wind together" },
  { name: "Solar with battery", source: "Battery", icon: "battery", bestFor: "sites with high evening use", term: "5 to 15 years", t: "long", min: "X MWp", feature: "Evening peak covered" },
  { name: "15-year solar", source: "Solar", icon: "sun", bestFor: "the lowest fixed price over the long run", term: "15 years", t: "long", min: "X MWp", feature: "Lowest fixed price" },
  { name: "15-year solar and wind", source: "Solar and wind", icon: "leaf", bestFor: "round-the-clock sites that want a steady price", term: "15 years", t: "long", min: "X MWp", feature: "Round-the-clock supply" },
];

const states = ["Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Telangana", "Haryana", "Rajasthan", "Uttar Pradesh"];
const siteTypes = ["Factory or plant", "Office, hotel, mall or shop"];
const sources: ("All" | Source)[] = ["All", "Solar", "Wind", "Solar and wind", "Battery", "Daily market"];
const terms: { label: string; key: Term | null }[] = [
  { label: "Any length", key: null },
  { label: "Under 1 year", key: "short" },
  { label: "1 to 5 years", key: "mid" },
  { label: "Over 5 years", key: "long" },
];

function Chips<T extends string>({ legend, options, value, onChange }: { legend: string; options: T[]; value: T; onChange: (v: T) => void }) {
  const name = useId();
  return (
    <fieldset className={styles.field}>
      <legend className={styles.label}>{legend}</legend>
      <div className="chips">
        {options.map((o) => (
          <label key={o} className="chip">
            <input type="radio" name={name} checked={value === o} onChange={() => onChange(o)} />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Select({ label, icon, options, value, onChange }: { label: string; icon: IconName; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <span className="select-field">
        <span className="select-field-icon">
          <IconSvg icon={icons[icon]} size={18} />
        </span>
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </span>
    </label>
  );
}

export function PlanList() {
  const [state, setState] = useState(states[0]);
  const [site, setSite] = useState(siteTypes[0]);
  const [source, setSource] = useState<(typeof sources)[number]>("All");
  const [term, setTerm] = useState(terms[0].label);

  const termKey = terms.find((t) => t.label === term)?.key;
  const shown = plans.filter((p) => (source === "All" || p.source === source) && (!termKey || p.t === termKey));

  return (
    <div>
      <div className={`surface ${styles.filters}`}>
        <div className={styles.selects}>
          <Select label="Your state" icon="field-location" options={states} value={state} onChange={setState} />
          <Select label="Type of site" icon={site === siteTypes[0] ? "field-plant" : "field-office"} options={siteTypes} value={site} onChange={setSite} />
        </div>
        <Chips legend="Source" options={sources} value={source} onChange={setSource} />
        <Chips legend="Contract length" options={terms.map((t) => t.label)} value={term} onChange={setTerm} />
      </div>

      <p className={styles.count} aria-live="polite">
        {shown.length} {shown.length === 1 ? "plan" : "plans"} for a {site.toLowerCase()} in {state}. Prices are indicative bands; your quote has the final price.
      </p>

      {shown.length ? (
        <ul className={styles.list}>
          {shown.map((p) => (
            <li key={p.name} className={`card ${styles.plan}`}>
              <div className={styles.planHead}>
                <span className={styles.planIcon}>
                  <IconSvg icon={icons[p.icon]} size={24} />
                </span>
                <span className="tag">{p.source}</span>
              </div>
              <h3 className={styles.planName}>{p.name}</h3>
              <p className={styles.bestFor}>Best for {p.bestFor}.</p>
              <dl className={styles.facts}>
                <div>
                  <dt>Term</dt>
                  <dd>{p.term}</dd>
                </div>
                <div>
                  <dt>Smallest size</dt>
                  <dd>{p.min}</dd>
                </div>
                <div>
                  <dt>Price per unit</dt>
                  <dd className={styles.price}>₹X.XX to ₹Y.YY</dd>
                </div>
                <div>
                  <dt>Key feature</dt>
                  <dd>{p.feature}</dd>
                </div>
              </dl>
              <Link href="/contact" className={`btn btn-secondary ${styles.planCta}`}>
                Get a quote
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>No plans match these filters. Try another source or contract length.</p>
      )}
    </div>
  );
}

// "Not sure?": two questions, one suggested plan.
const usesForSuggest = ["Under 50,000 units a month", "50,000 to 2 lakh units a month", "Over 2 lakh units a month"];
const runs = [
  { label: "Daytime only", plan: "Solar", why: "Daytime power at a fixed price matches when your site runs." },
  { label: "Round the clock", plan: "Solar and wind", why: "Wind keeps power coming in the evening and at night." },
  { label: "High use in the evening", plan: "Solar with battery", why: "A battery stores solar for your evening peak." },
];

export function PlanSuggest() {
  const [use, setUse] = useState(usesForSuggest[1]);
  const [run, setRun] = useState(runs[0].label);
  const pick = runs.find((r) => r.label === run)!;
  const term = use === usesForSuggest[0] ? "a 1-year" : "a 3 to 5-year";
  return (
    <div className={`surface ${styles.suggest}`}>
      <div className={styles.suggestInputs}>
        <Select label="Monthly use" icon="field-gauge" options={usesForSuggest} value={use} onChange={setUse} />
        <Select label="When does your site run?" icon="clock" options={runs.map((r) => r.label)} value={run} onChange={setRun} />
      </div>
      <div className={styles.suggestAnswer} aria-live="polite">
        <p className={styles.label}>We suggest</p>
        <p className={styles.suggestPlan}>
          {pick.plan}, on {term} plan
        </p>
        <p className={styles.bestFor}>{pick.why}</p>
        <Link href="/contact" className="btn btn-primary">
          Get a quote for this plan
        </Link>
      </div>
    </div>
  );
}
