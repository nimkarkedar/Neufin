// Customer stories, shared by the Customer stories page and the sections that point to it.
// A plain module (not a client component), so server pages can read it.
import type { VerticalCardProps } from "@/components/sections/Cards";
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

// One story as a panel card (the shared VerticalCard), the same everywhere stories show:
// the industry as the tag, the client as the title, the result as the line.
// TODO: a photo of each client's site, with their logo.
export const storyCard = (s: (typeof stories)[number]): VerticalCardProps => ({
  tag: s.ind,
  title: "Client name",
  text: `${s.value} ${s.label}`,
  href: customerStories.href,
});
