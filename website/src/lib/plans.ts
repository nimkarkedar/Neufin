// The plan finder's data: Neufin's four energy plan packs, the site types and the electricity
// board rate by state. A plain module, so server pages can read it too (the Energy plans page
// next, Kedar 2026-10-30).
// TODO: every figure is illustrative; replace with Neufin's saving, term and price band for
// each pack, the board rates per state and site type, and the full list of 16 states.

export type PackKind = "saver" | "flexi" | "max" | "rooftop";

// The client's four packs (Kedar's mock, 2026-10-30). `short` is the few words the plan finder
// shows to compare them; `line` is the client's description; `save` the share below the
// board's price.
export type Pack = { kind: PackKind; name: string; short: string; line: string; save: number; term: string };

export const packs: Pack[] = [
  { kind: "saver", name: "Saver", short: "No upfront cost", line: "Buy lower-cost energy, with no upfront investment.", save: 0.2, term: "1 to 3 years" },
  { kind: "flexi", name: "Flexi Saver", short: "No long-term lock-in", line: "Buy energy at competitive prices, with no long-term lock-in.", save: 0.12, term: "From 30 days" },
  { kind: "max", name: "Max Saver", short: "Own a share of a plant", line: "Invest in a share of a solar or wind plant, or own one, for the lowest cost.", save: 0.35, term: "10 to 25 years" },
  { kind: "rooftop", name: "Rooftop", short: "Solar on your own roof", line: "Generate your own solar power on site. Lease the system or buy it outright.", save: 0.3, term: "Up to 25 years" },
];

// Each type of site, with what the board adds per unit for it.
export const sites: { label: string; boardExtra: number }[] = [
  { label: "Factory or plant", boardExtra: 0 },
  { label: "Office, hotel or mall", boardExtra: 0.8 },
];

// Electricity board rate per unit for an industrial site, by state.
export const states: { name: string; board: number }[] = [
  { name: "Maharashtra", board: 9.4 },
  { name: "Karnataka", board: 8.6 },
  { name: "Tamil Nadu", board: 8.9 },
  { name: "Gujarat", board: 8.2 },
  { name: "Telangana", board: 8.8 },
  { name: "Haryana", board: 8.5 },
  { name: "Rajasthan", board: 8.7 },
  { name: "Uttar Pradesh", board: 8.9 },
];

// A pack's lowest price per unit: its saving off the lowest board rate.
export const packFrom = (p: Pack) => Math.min(...states.map((s) => s.board)) * (1 - p.save);
