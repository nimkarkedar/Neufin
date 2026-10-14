// Site-wide content: name, URLs, navigation and footer links.
// Header, footer, metadata, sitemap and structured data all read from here.
import type { icons } from "@ds/brand/icons.js";

export type IconName = keyof typeof icons;
export type NavLink = { label: string; href: string };
export type MenuItem = NavLink & { description: string; icon: IconName };
export type NavItem = NavLink & {
  // Items with a menu open a flyout instead of navigating. `href` is the overview page.
  menu?: { title: string; items: MenuItem[]; overviewLabel: string };
};

// Search engines may index the site only when SITE_LIVE=true (set it at launch).
// Until then every deployment, including previews, is marked noindex.
export const isLive = process.env.SITE_LIVE === "true";

export const site = {
  name: "Neufin Energy",
  shortName: "Neufin",
  url: "https://neufin.energy",
  locale: "en_IN",
  description:
    "Neufin finds the right power deal for your business, gets it running and keeps the numbers in check.",
  // TODO: dummy contact details and social links; replace before launch.
  email: "contact@neufin.energy",
  phone: "+65 9460 2555",
  // WhatsApp number in international format, digits only.
  whatsapp: "6594602555",
  linkedin: "https://www.linkedin.com/company/neufin-energy",
  instagram: "https://www.instagram.com/neufin.energy",
  x: "https://x.com/neufinenergy",
};

// TODO: the menu items below are placeholders until the solutions and products are named.
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Solutions",
    href: "/solutions",
    menu: {
      title: "Solutions",
      overviewLabel: "See all solutions",
      items: [
        { label: "Open access power", href: "/solutions/open-access", icon: "bolt", description: "Buy power directly from generators at a lower rate per unit." },
        { label: "Solar", href: "/solutions/solar", icon: "sun", description: "Rooftop and captive solar sized to what your site uses." },
        { label: "Bill audit", href: "/solutions/bill-audit", icon: "bill", description: "Find billing errors and charges you should not be paying." },
      ],
    },
  },
  {
    label: "Products",
    href: "/products",
    menu: {
      title: "Products",
      overviewLabel: "See all products",
      items: [
        { label: "Energy dashboard", href: "/products/dashboard", icon: "chart", description: "Usage, cost and savings for every site in one view." },
        { label: "Bill checker", href: "/products/bill-checker", icon: "meter", description: "Every bill checked line by line when it arrives." },
      ],
    },
  },
  {
    label: "Resources",
    href: "/resources",
    menu: {
      title: "Resources",
      overviewLabel: "See all resources",
      items: [
        { label: "Blog", href: "/blog", icon: "news", description: "Notes on tariffs, open access and power markets." },
        { label: "Guides", href: "/resources/guides", icon: "book", description: "How open access works, step by step." },
      ],
    },
  },
  { label: "Customer stories", href: "/customer-stories" },
  {
    label: "About",
    href: "/about",
    menu: {
      title: "Company",
      overviewLabel: "More about Neufin",
      items: [
        { label: "About us", href: "/about", icon: "people", description: "Who we are and how we work." },
        { label: "Careers", href: "/careers", icon: "briefcase", description: "Open roles at Neufin." },
      ],
    },
  },
];

export const contactLink: NavLink = { label: "Contact", href: "/contact" };

export const telHref = `tel:${site.phone.replace(/\s/g, "")}`;
export const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Neufin, I would like to send you my power bill.")}`;

export const legalLinks: NavLink[] = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of use", href: "/terms" },
];

const menuLinks = (label: string): NavLink[] =>
  mainNav.find((n) => n.label === label)?.menu?.items.map(({ label, href }) => ({ label, href })) ?? [];

export const footerGroups: { title: string; links: NavLink[] }[] = [
  { title: "Solutions", links: menuLinks("Solutions") },
  { title: "Products", links: menuLinks("Products") },
  { title: "Resources", links: [...menuLinks("Resources"), { label: "Customer stories", href: "/customer-stories" }] },
  { title: "Company", links: [...menuLinks("About"), contactLink] },
  {
    title: "Social",
    links: [
      { label: "LinkedIn", href: site.linkedin },
      { label: "Instagram", href: site.instagram },
      { label: "X", href: site.x },
    ],
  },
];
