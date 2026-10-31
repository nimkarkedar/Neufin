// Neufin's energy plans: the four plan types, every plan, the site types and the electricity
// board rate by state. A plain module, so server pages can read it too. Used by the home plan
// finder and the Energy plans page.
// TODO: every figure is illustrative; replace with Neufin's supply database (plans, landed
// prices per state, business type and use, modes, delivery times), the board rates per state
// and site type, and the full list of 16 states.

export type PackKind = "hyper" | "smart" | "max" | "rooftop";

// The four plan types, with Kedar's final names (2026-10-31). `points` are three short lines
// in the same order for each (term, investment, what it's for), shown as ticks on Energy
// plans (Kedar: three simple points, Apple-clean; drawn from his lines). `short` and `term`
// are the few words the plan finder shows to compare them; `save` the share below the
// board's price there (in line with the most a plan of that type saves in Maharashtra on
// Energy plans).
export type Pack = { kind: PackKind; name: string; short: string; points: string[]; save: number; term: string };

export const packs: Pack[] = [
  {
    kind: "hyper",
    name: "Hyper Flex",
    short: "Zero investment",
    points: ["3 to 12 months", "Zero investment", "Switch as your needs change"],
    save: 0.11,
    term: "3 to 12 months",
  },
  {
    kind: "smart",
    name: "Smart Saver",
    short: "Medium-term commitment",
    points: ["2 to 5 years", "No investment for 2Y and 3Y", "High savings, medium term"],
    save: 0.21,
    term: "2 to 5 years",
  },
  {
    kind: "max",
    name: "Max Saver",
    short: "Long-term fixed tariff",
    points: ["10 to 25 years", "Part or full ownership", "The lowest fixed price"],
    save: 0.31,
    term: "10 to 25 years",
  },
  {
    kind: "rooftop",
    name: "Rooftop Solar",
    short: "Owned or leased",
    points: ["Up to 25 years", "Lease it, or buy it outright", "Solar on your own roof"],
    save: 0.24,
    term: "Up to 25 years",
  },
];

// Each type of site, with what the board adds per unit for it.
export const sites: { label: string; boardExtra: number }[] = [
  { label: "Factory or plant", boardExtra: 0 },
  { label: "Office, hotel or mall", boardExtra: 0.8 },
];

// Electricity board rate per unit for an industrial site, by state, and the open access
// charges a plan from outside the site pays there (per unit).
export const states: { name: string; board: number; openAccess: number }[] = [
  { name: "Maharashtra", board: 9.4, openAccess: 1.6 },
  { name: "Karnataka", board: 8.6, openAccess: 1.3 },
  { name: "Tamil Nadu", board: 8.9, openAccess: 1.4 },
  { name: "Gujarat", board: 8.2, openAccess: 1.2 },
  { name: "Telangana", board: 8.8, openAccess: 1.5 },
  { name: "Haryana", board: 8.5, openAccess: 1.7 },
  { name: "Rajasthan", board: 8.7, openAccess: 1.4 },
  { name: "Uttar Pradesh", board: 8.9, openAccess: 1.8 },
];

// A pack's lowest price per unit: its saving off the lowest board rate.
export const packFrom = (p: Pack) => Math.min(...states.map((s) => s.board)) * (1 - p.save);

// ---------- Every plan (Energy plans page) ----------

export type Mode = "Third party" | "Group captive" | "Captive" | "Onsite";
export type Technology = "Solar" | "Wind" | "Thermal" | "Exchange" | "Hybrid" | "BESS";

// One plan. `bestFor` is who it suits, in plain words (the brief's "Best for" line);
// `months` is the lock-in; `base` the price per unit at the plant before open access
// charges; `minMonthly` the smallest monthly use it takes, in units; `owned` a plan where the
// buyer owns the plant (the brief: onsite owned plans are never listed, captive owned only
// when Term is All); `investment` what the buyer puts in, if anything.
export type Plan = {
  name: string;
  bestFor: string;
  pack: PackKind;
  months: number;
  tenure: string;
  mode: Mode;
  technology: Technology;
  delivery: string;
  base: number;
  minMonthly: number;
  owned?: boolean;
  investment?: string;
};

const lakh = 1_00_000;

export const plans: Plan[] = [
  { name: "Hyper Flex 3M", bestFor: "Trying open access for the first time", pack: "hyper", months: 3, tenure: "3 months", mode: "Third party", technology: "Exchange", delivery: "From 30 days", base: 7.2, minMonthly: 1 * lakh },
  { name: "Hyper Flex 6M", bestFor: "Seasonal or changing loads", pack: "hyper", months: 6, tenure: "6 months", mode: "Third party", technology: "Thermal", delivery: "From 30 days", base: 7.0, minMonthly: 1 * lakh },
  { name: "Hyper Flex 12M", bestFor: "A year of savings with no long lock-in", pack: "hyper", months: 12, tenure: "12 months", mode: "Third party", technology: "Hybrid", delivery: "30 to 45 days", base: 6.8, minMonthly: 1 * lakh },
  { name: "Smart Saver 2Y", bestFor: "Plants that run by day", pack: "smart", months: 24, tenure: "2 years", mode: "Third party", technology: "Solar", delivery: "1 to 2 months", base: 6.3, minMonthly: 1 * lakh },
  { name: "Smart Saver 3Y", bestFor: "Sites that run in the evening and at night", pack: "smart", months: 36, tenure: "3 years", mode: "Third party", technology: "Wind", delivery: "1 to 2 months", base: 6.0, minMonthly: 1 * lakh },
  { name: "Smart Saver 5Y", bestFor: "Steady use, day and night", pack: "smart", months: 60, tenure: "5 years", mode: "Group captive", technology: "Hybrid", delivery: "3 to 4 months", base: 5.7, minMonthly: 5 * lakh, investment: "An equity share in the plant" },
  { name: "Max Saver 10Y", bestFor: "Round-the-clock sites that want a fixed price", pack: "max", months: 120, tenure: "10 years", mode: "Group captive", technology: "Hybrid", delivery: "6 to 9 months", base: 5.4, minMonthly: 5 * lakh, investment: "An equity share in the plant" },
  { name: "Max Saver 15Y", bestFor: "Sites with a high evening peak", pack: "max", months: 180, tenure: "15 years", mode: "Group captive", technology: "BESS", delivery: "9 to 12 months", base: 5.2, minMonthly: 5 * lakh, investment: "An equity share in the plant" },
  { name: "Max Saver 25Y", bestFor: "The lowest price over the long run", pack: "max", months: 300, tenure: "25 years", mode: "Captive", technology: "Hybrid", delivery: "12 to 18 months", base: 4.9, minMonthly: 20 * lakh, owned: true, investment: "The whole plant" },
  { name: "Rooftop Solar Lease", bestFor: "Sites with free roof space", pack: "rooftop", months: 300, tenure: "Up to 25 years", mode: "Onsite", technology: "Solar", delivery: "2 to 3 months", base: 7.1, minMonthly: 0 },
  { name: "Rooftop Solar Own", bestFor: "Free roof space and capital to invest", pack: "rooftop", months: 300, tenure: "Up to 25 years", mode: "Onsite", technology: "Solar", delivery: "2 to 3 months", base: 6.6, minMonthly: 0, owned: true, investment: "The whole system" },
];

// The brief's filters: monthly use (optional) and term.
export const uses = [
  { value: "any", label: "Any amount", max: Infinity },
  { value: "under-1l", label: "Under 1 lakh units", max: 1 * lakh - 1 },
  { value: "1l-5l", label: "1 to 5 lakh units", max: 5 * lakh },
  { value: "5l-20l", label: "5 to 20 lakh units", max: 20 * lakh },
  { value: "over-20l", label: "Over 20 lakh units", max: Infinity },
];

export const terms = [
  { value: "all", label: "All", min: 0, max: Infinity },
  { value: "upto-1y", label: "Up to 1 year", min: 0, max: 12 },
  { value: "1-5y", label: "1 to 5 years", min: 13, max: 60 },
  { value: "5-10y", label: "5 to 10 years", min: 61, max: 120 },
  { value: "10y-plus", label: "10+ years", min: 121, max: Infinity },
];

export type PlanQuote = Plan & { price: number; saving: number };

// The plans to list for a site, of the plan types ticked (all when `kinds` is left out), by
// the brief's rules: only plans priced below the board's
// rate; onsite owned plans never; captive owned plans only when Term is All; then by saving,
// the largest first.
export function plansFor({ state, commercial, use, term, kinds }: { state: string; commercial: boolean; use: string; term: string; kinds?: PackKind[] }): PlanQuote[] {
  const s = states.find((x) => x.name === state) ?? states[0];
  const board = s.board + (commercial ? sites[1].boardExtra : 0);
  const u = uses.find((x) => x.value === use) ?? uses[0];
  const t = terms.find((x) => x.value === term) ?? terms[0];
  return plans
    .filter((p) => !kinds || kinds.includes(p.pack))
    .filter((p) => !(p.owned && p.mode === "Onsite"))
    .filter((p) => !(p.owned && p.mode === "Captive" && t.value !== "all"))
    .filter((p) => p.months >= t.min && p.months <= t.max)
    .filter((p) => p.minMonthly <= u.max)
    .map((p) => {
      const price = p.base + (p.mode === "Onsite" ? 0 : s.openAccess);
      return { ...p, price, saving: (board - price) / board };
    })
    .filter((p) => p.price < board)
    .sort((a, b) => b.saving - a.saving);
}
