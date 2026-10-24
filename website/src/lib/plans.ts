// The plan finder's prices: contract lengths, monthly use bands, site types, electricity
// board rates by state and Neufin's plans. A plain module, so the plan finder (a client
// component) and the numbers block's saving chart (server) share one source.
// TODO: every figure is illustrative; replace with Neufin's price bands per state,
// contract length and site type, and the full list of 16 states.

export const terms = ["30 days", "1 year", "3 years", "5 years", "15 years"];

// Monthly use bands in lakh units (the field's label says "in units"), each billed at a
// typical monthly use inside it.
export const uses = [
  { label: "Under 1 lakh", units: 75_000, discount: 0 },
  { label: "1–5 lakh", units: 3_00_000, discount: 0 },
  { label: "5–20 lakh", units: 10_00_000, discount: 0.1 },
  { label: "Over 20 lakh", units: 25_00_000, discount: 0.2 },
];

// Each type of site, with what the board adds per unit for it.
export const sites: { label: string; boardExtra: number }[] = [
  { label: "Factory or plant", boardExtra: 0 },
  { label: "Office, hotel, mall or shop", boardExtra: 0.8 },
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

export type Plan = { name: string; price: number; fixed: boolean };

export const plans: Plan[][] = [
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
