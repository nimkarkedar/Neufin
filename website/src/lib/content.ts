// Content used on more than one page. Page-only content lives in the page file.
// Wording follows the "Neufin website structure" doc and the prototype in plain words.
import type { VerticalCardProps } from "@/components/sections/Cards";
import { blogs, publications } from "./site";
import handbookCover from "@/assets/photos/posts/renewable-energy-handbook.jpg";
import energyStackCover from "@/assets/photos/posts/india-energy-stack.jpg";
import storyCover from "@/assets/photos/posts/neufin-story.jpg";
import preSeedCover from "@/assets/photos/posts/pre-seed-round.jpg";
import greentradeCover from "@/assets/photos/posts/greentrade.jpg";

// Company numbers from the doc. TODO: confirm before launch.
export const numbers = [
  { value: "30+", label: "customers" },
  { value: "800M", label: "units (kWh) contracted" },
  { value: "16", label: "states covered" },
  { value: "90+", label: "energy plans" },
  { value: "4+ GW", label: "from 30+ suppliers" },
];

// Neufin's posts as panel cards (cover on top, the content type as the tag), with the covers
// and titles from the current site (neufin.energy/about).
// TODO: link each one once the blog and publications are on Sanity.
export const posts: Record<"handbook" | "energyStack" | "story" | "preSeed" | "greentrade", VerticalCardProps> = {
  handbook: {
    title: "Guide to renewable energy for businesses in India",
    href: publications.href,
    tag: "Handbook",
    image: handbookCover,
  },
  energyStack: {
    title: "The India Energy Stack: a digital infrastructure blueprint for businesses",
    href: publications.href,
    tag: "Research",
    image: energyStackCover,
  },
  story: {
    title: "The Neufin story",
    href: blogs.href,
    tag: "Blog",
    image: storyCover,
  },
  preSeed: {
    title: "Pre-seed round: belief capital to support Neufin’s mission",
    href: blogs.href,
    tag: "Blog",
    image: preSeedCover,
  },
  greentrade: {
    title: "Neufin partners with GreenTrade to help European companies decarbonise India operations",
    href: blogs.href,
    tag: "Blog",
    image: greentradeCover,
  },
};

// Latest from Neufin, on the solution pages.
export const latest: VerticalCardProps[] = [posts.handbook, posts.energyStack, posts.story];

export const publicationsLink = { label: "All publications", href: publications.href };
export const resourcesLink = { label: "All resources", href: blogs.href };
