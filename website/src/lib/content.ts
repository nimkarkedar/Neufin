// Content used on more than one page. Page-only content lives in the page file.
// Wording follows the "Neufin website structure" doc and the prototype in plain words.
import type { LinkCard } from "@/components/sections/Blocks";
import { blogs, publications, solutions, tariffCalculator } from "./site";
import electrician from "@ds/../public/assets/photos/electrician.jpg";
import meters from "@ds/../public/assets/photos/meters.jpg";
import solarSite from "@ds/../public/assets/photos/solar-site.jpg";
import windHills from "@ds/../public/assets/photos/wind-hills.jpg";

// Company numbers from the doc. TODO: confirm before launch.
export const numbers = [
  { value: "30+", label: "customers" },
  { value: "800M", label: "units (kWh) contracted" },
  { value: "16", label: "states covered" },
  { value: "90+", label: "energy plans" },
  { value: "4+ GW", label: "from 30+ suppliers" },
];

// The four ways to cut power cost, as cards. Each page drops its own.
// Covers are design system library photos until Neufin's own arrive (TODO); the note
// describes the photo for screen readers.
const solutionCards: Record<"buy" | "run" | "advisory" | "services", LinkCard> = {
  buy: {
    title: "Buy cheaper power",
    text: "Clean power at a lower price, from 30 days to 15 years, delivered in about 3 months.",
    href: solutions.buy.href,
    cover: { note: "A solar plant being built", icon: "sun", tone: "daylight", image: solarSite },
  },
  run: {
    title: "Run and optimise",
    text: "Improve generation and find hidden ways to save on energy cost, with Lumen.",
    href: solutions.run.href,
    cover: { note: "A wall of electricity meters", icon: "chart", tone: "plain", image: meters },
  },
  advisory: {
    title: "Renewable energy advisory",
    text: "We plan, carry out and help you meet your clean energy targets, for your sites and your suppliers.",
    href: solutions.advisory.href,
    cover: { note: "Wind turbines on green hills", icon: "route", tone: "plain", image: windHills },
  },
  services: {
    title: "Services",
    text: "Meter installs, load changes and electricity board approvals, done for you.",
    href: solutions.services.href,
    cover: { note: "An electrician working on a meter", icon: "wrench", tone: "plain", image: electrician },
  },
};

export const otherSolutions = (exclude: keyof typeof solutionCards) =>
  (Object.keys(solutionCards) as (keyof typeof solutionCards)[]).filter((k) => k !== exclude).map((k) => solutionCards[k]);


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
