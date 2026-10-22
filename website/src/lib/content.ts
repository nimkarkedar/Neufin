// Content used on more than one page. Page-only content lives in the page file.
// Wording follows the "Neufin website structure" doc and the prototype in plain words.
import type { LinkCard } from "@/components/sections/Blocks";
import { blogs, publications, solutions, tariffCalculator } from "./site";

// Company numbers from the doc. TODO: confirm before launch.
export const numbers = [
  { value: "30+", label: "customers" },
  { value: "800M", label: "units (kWh) contracted" },
  { value: "16", label: "states covered" },
  { value: "90+", label: "energy plans" },
  { value: "4+ GW", label: "from 30+ suppliers" },
];

// The four ways to cut power cost, as cards. Each page drops its own.
const solutionCards: Record<"buy" | "run" | "advisory" | "services", LinkCard> = {
  buy: {
    title: "Buy cheaper power",
    text: "Clean power at a lower price, from 30 days to 15 years, delivered in about 3 months.",
    href: solutions.buy.href,
    cover: { note: "Photo: a solar plant supplying a factory", icon: "sun", tone: "daylight" },
  },
  run: {
    title: "Run and optimise",
    text: "Pay less for the power you already use. Lumen checks every bill and runs every source.",
    href: solutions.run.href,
    cover: { note: "Product screen: Lumen across all your sites", icon: "chart", tone: "violet" },
  },
  advisory: {
    title: "Renewable energy advisory",
    text: "We plan, carry out and track your move to clean power, for your sites and your suppliers.",
    href: solutions.advisory.href,
    cover: { note: "Illustration: a roadmap from today to 100% clean power", icon: "route", tone: "dawn" },
  },
  services: {
    title: "Services",
    text: "Meter installs, load changes and electricity board approvals, done for you.",
    href: solutions.services.href,
    cover: { note: "Photo: a technician installing a meter", icon: "wrench", tone: "daylight" },
  },
};

export const otherSolutions = (exclude: keyof typeof solutionCards) =>
  (Object.keys(solutionCards) as (keyof typeof solutionCards)[]).filter((k) => k !== exclude).map((k) => solutionCards[k]);

export const allSolutions = Object.values(solutionCards);

// Latest from Neufin. TODO: real posts once the blog is on Sanity.
export const latest: LinkCard[] = [
  {
    title: "Renewable energy handbook",
    text: "A plain guide to buying clean power for your business.",
    href: "/publications/renewable-energy-handbook",
    tag: "Guide",
    cover: { note: "Handbook cover", icon: "book", tone: "dawn" },
    linkLabel: "Get the handbook",
  },
  {
    title: tariffCalculator.label,
    text: "Compare your electricity board rate with our plans.",
    href: tariffCalculator.href,
    tag: "Tool",
    cover: { note: "Calculator screen", icon: "calculator", tone: "violet" },
    linkLabel: "Try it",
  },
  {
    title: "Blog post title",
    text: "One line on what the post covers.",
    href: blogs.href,
    tag: "Blog",
    cover: { note: "Blog cover image", icon: "news", tone: "daylight" },
    linkLabel: "Read",
  },
];

export const publicationsLink = { label: "All publications", href: publications.href };
export const resourcesLink = { label: "All resources", href: blogs.href };
