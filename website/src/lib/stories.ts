// Customer stories, shared by the Customer stories page and the sections that point to it.
// A plain module (not a client component), so server pages can read it.
import { customerStories } from "./site";

// TODO: real clients, figures and story pages (one template: client and sites,
// the problem, what we did, result in numbers, client quote).
export const stories = [
  { ind: "Auto", value: "X%", label: "lower power cost across N plants" },
  { ind: "Hotels and resorts", value: "₹X L", label: "saved in year one" },
  { ind: "Offices and coworking", value: "X%", label: "lower power cost, N sites, N states" },
  { ind: "Banks and finance", value: "X%", label: "lower power cost" },
  { ind: "Real estate and malls", value: "₹X L", label: "saved a year" },
  { ind: "Plastics", value: "X%", label: "lower power cost" },
  { ind: "Steel", value: "X%", label: "lower power cost" },
  { ind: "Retail chains", value: "₹X L", label: "saved a year" },
  { ind: "Hotels and resorts", value: "X%", label: "lower power cost" },
];

// One story as a card, the same everywhere stories show (Customer stories, Buy cheaper power).
export const storyCard = (s: (typeof stories)[number], i: number) => ({
  title: "Client name",
  href: customerStories.href,
  tag: s.ind,
  cover: { note: `Photo: a ${s.ind.toLowerCase()} site, with the client's logo`, icon: "image" as const, tone: (i % 3 === 1 ? "dawn" : "daylight") as "dawn" | "daylight" },
  meta: [{ value: s.value, label: s.label }],
  linkLabel: "Read story",
});
