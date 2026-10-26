"use client";

import Link from "next/link";
import { useId } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { Segmented } from "@ds/components/Segmented.jsx";
import { usePlanChoices } from "@/lib/planChoices";
import styles from "./PlanList.module.css";

// Energy plans (/products/plan-finder): every plan, filtered by state, business type, yearly
// use, term and investment, from the brief's Energy plans table.

type IconName = keyof typeof icons;
type Source = "Solar" | "Wind" | "Solar and wind" | "Battery" | "Daily market";
type Term = "spot" | "short" | "mid" | "long";

// The source's picture: a solar panel, a windmill, a battery, the market's chart. A plan with
// more than one source shows each, overlapping (Kedar, 2026-10-27).
const sourceIcons: Record<Source, IconName[]> = {
  Solar: ["solar-panel"],
  Wind: ["windmill"],
  "Solar and wind": ["solar-panel", "windmill"],
  Battery: ["solar-panel", "battery"],
  "Daily market": ["chart"],
};

// Each plan carries what the brief lists: name, who it suits, the landed price per unit, the
// term, the smallest size, the smallest yearly use and whether it needs an investment.
// TODO: Neufin's real plans (the brief's "exact plans" list), with landed prices per state,
// minimum yearly units (`minYearly`, in units; null until known, so the use filter shows every
// plan) and which plans need an investment (a guess for now: the 15-year plans).
const plans: { name: string; source: Source; bestFor: string; term: string; t: Term; min: string; minYearly: number | null; investment: boolean }[] = [
  { name: "30-day market power", source: "Daily market", bestFor: "Short or changing needs", term: "30 days", t: "spot", min: "0.5 MWp", minYearly: null, investment: false },
  { name: "1-year solar", source: "Solar", bestFor: "Plants that run by day", term: "1 year", t: "mid", min: "0.5 MWp", minYearly: null, investment: false },
  { name: "1-year wind", source: "Wind", bestFor: "Sites that run in the evening and at night", term: "1 year", t: "mid", min: "0.5 MWp", minYearly: null, investment: false },
  { name: "3-year solar", source: "Solar", bestFor: "Plants and offices that run by day", term: "3 years", t: "mid", min: "0.5 MWp", minYearly: null, investment: false },
  { name: "5-year solar and wind", source: "Solar and wind", bestFor: "Sites with steady day and night use", term: "5 years", t: "mid", min: "X MWp", minYearly: null, investment: false },
  { name: "Solar with battery", source: "Battery", bestFor: "Sites with a high evening peak", term: "5 to 15 years", t: "long", min: "X MWp", minYearly: null, investment: false },
  { name: "15-year solar", source: "Solar", bestFor: "The lowest fixed price over the long run", term: "15 years", t: "long", min: "X MWp", minYearly: null, investment: true },
  { name: "15-year solar and wind", source: "Solar and wind", bestFor: "Round-the-clock sites that want a steady price", term: "15 years", t: "long", min: "X MWp", minYearly: null, investment: true },
];

const states = ["Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Telangana", "Haryana", "Rajasthan", "Uttar Pradesh"];
// The brief's two business types; the value is what goes in the link.
const types: { value: string; label: string; icon: IconName }[] = [
  { value: "industrial", label: "Industrial: factories, plants", icon: "plant" },
  { value: "commercial", label: "Commercial: offices, hotels, malls", icon: "office" },
];
// Yearly use, the home plan finder's monthly bands times twelve. `max` in units.
const uses = [
  { value: "any", label: "Any amount", max: Infinity },
  { value: "under-12l", label: "Under 12 lakh units", max: 12_00_000 },
  { value: "12l-60l", label: "12 to 60 lakh units", max: 60_00_000 },
  { value: "60l-2.4cr", label: "60 lakh to 2.4 crore units", max: 2_40_00_000 },
  { value: "over-2.4cr", label: "Over 2.4 crore units", max: Infinity },
];
const terms: { value: Term | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "spot", label: "Spot" },
  { value: "short", label: "Under 1 year" },
  { value: "mid", label: "1–5 years" },
  { value: "long", label: "5+ years" },
];
const investments = [
  { value: "any", label: "Any" },
  { value: "none", label: "None needed" },
  { value: "yes", label: "With investment" },
];

const icon = (name: IconName, size = 20) => <IconSvg icon={icons[name]} size={size} />;
const pick = <T extends { value: string }>(list: T[], value: string | undefined) => list.find((o) => o.value === value) ?? list[0];

// One choice as the design system's segmented control, stacked in the sidebar on desktop.
function Choice({ legend, options, value, onChange }: { legend: string; options: { value: string; label: string; icon?: IconName }[]; value: string; onChange: (v: string) => void }) {
  const name = useId();
  return (
    <fieldset className={styles.field}>
      <legend className={styles.label}>{legend}</legend>
      <Segmented
        name={name}
        options={options.map((o) => o.label)}
        value={Math.max(0, options.findIndex((o) => o.value === value))}
        onChange={(i: number) => onChange(options[i].value)}
        icons={options.some((o) => o.icon) ? options.map((o) => o.icon && <IconSvg key={o.icon} icon={icons[o.icon]} size={18} />) : undefined}
        small
        stacked
      />
    </fieldset>
  );
}

function Select({ label, icon: name, options, value, onChange }: { label: string; icon: IconName; options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <span className="select-field">
        <span className="select-field-icon">
          <IconSvg icon={icons[name]} size={18} />
        </span>
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

// The page title, naming the state once the visitor has given one (brief: "When state is
// known: Every energy plan in [state], with the price").
export function PlanTitle() {
  const [choices] = usePlanChoices();
  return <>{choices.state ? `Every energy plan in ${choices.state}, with the price` : "Every energy plan, with the price"}</>;
}

// The plan list: filters in a narrow sticky column on the left from desktop, the plans on the
// right as full-width rows whose figures line up, so they can be compared down the page. On
// phones the filters come first and each plan is a card. Filters start from the visitor's
// link or last visit (usePlanChoices). Get a quote shows on the first plan, and on the others
// while hovered or focused (always on touch screens).
export function PlanList() {
  const [choices, choose] = usePlanChoices();
  const state = states.includes(choices.state ?? "") ? choices.state! : states[0];
  const type = pick(types, choices.type);
  const use = pick(uses, choices.use);
  const term = pick(terms, choices.term);
  const investment = pick(investments, choices.investment);

  const shown = plans.filter(
    (p) =>
      (term.value === "all" || p.t === term.value) &&
      (investment.value === "any" || p.investment === (investment.value === "yes")) &&
      (p.minYearly === null || p.minYearly <= use.max),
  );
  const quote = `/contact/?${new URLSearchParams({ state, ...(choices.email ? { email: choices.email } : {}) })}`;

  return (
    <div className={styles.layout}>
      <aside className={styles.filters} aria-label="Filter plans">
        <Select label="Your state" icon="field-location" options={states.map((s) => ({ value: s, label: s }))} value={state} onChange={(v) => choose({ state: v })} />
        <Choice legend="Business type" options={types} value={type.value} onChange={(v) => choose({ type: v })} />
        <Select label="Yearly use" icon="field-gauge" options={uses} value={use.value} onChange={(v) => choose({ use: v })} />
        <Choice legend="Contract length" options={terms} value={term.value} onChange={(v) => choose({ term: v })} />
        <Choice legend="Investment" options={investments} value={investment.value} onChange={(v) => choose({ investment: v })} />
      </aside>

      <div className={styles.results}>
        <p className={styles.count} aria-live="polite">
          Showing {shown.length} {shown.length === 1 ? "plan" : "plans"}. Prices are indicative bands; your quote has the final price.
        </p>

        {shown.length ? (
          <ul className={styles.list}>
            {shown.map((p) => (
              <li key={p.name} className={`card ${styles.plan}`}>
                <div className={styles.who}>
                  <span className={styles.sources} aria-label={p.source} role="img">
                    {sourceIcons[p.source].map((n) => (
                      <span key={n} className={styles.sourceIcon}>
                        {icon(n)}
                      </span>
                    ))}
                  </span>
                  <div>
                    <h3 className={styles.name}>{p.name}</h3>
                    <p className={styles.note}>{p.bestFor}</p>
                  </div>
                </div>
                <dl className={styles.facts}>
                  {/* Price above the term (Kedar): what it costs, then for how long. */}
                  <div className={styles.pair}>
                    <dt className="visually-hidden">Landed price per unit</dt>
                    <dd className={styles.price}>
                      <span className={styles.note}>From</span> ₹X.XX <span className={styles.note}>a unit</span>
                    </dd>
                    <dt className="visually-hidden">Contract length</dt>
                    <dd className={styles.fact}>
                      {icon("calendar")}
                      {p.term}
                    </dd>
                  </div>
                  {/* How big: the smallest plant, then the smallest yearly use. */}
                  <div className={styles.pair}>
                    <dt className="visually-hidden">Smallest size</dt>
                    <dd className={styles.fact}>
                      {icon("bolt")}
                      <span>
                        <span className={styles.note}>From</span> {p.min}
                      </span>
                    </dd>
                    <dt className="visually-hidden">Smallest yearly use</dt>
                    <dd className={styles.fact}>
                      {icon("meter")}
                      <span>
                        X lakh units <span className={styles.note}>a year</span>
                      </span>
                    </dd>
                  </div>
                  <div className={styles.pair}>
                    <dt className="visually-hidden">Investment</dt>
                    <dd className={styles.fact}>
                      {icon("coins")}
                      {p.investment ? "Investment needed" : "No investment"}
                    </dd>
                  </div>
                </dl>
                <Link href={quote} className={`btn btn-secondary ${styles.cta}`}>
                  Get a quote
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className={`card ${styles.empty}`}>
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
