// Site-wide content: name, URLs, navigation and footer links.
// Header, footer, metadata, sitemap and structured data all read from here.
import type { icons } from "@ds/brand/icons.js";

export type IconName = keyof typeof icons;
type NavLink = { label: string; href: string };
type MenuItem = NavLink & { description?: string; icon?: IconName };
// A column is either all icon items (icon, label, note) or all plain links, never mixed.
// Column titles are short labels in sentence case.
export type MenuColumn = { title: string; items: MenuItem[] };
// The Warm White panel on the right of a flyout: one thing to point at.
export type MenuAside = { label: string; title: string; text: string; link: NavLink };
export type NavItem = NavLink & {
  // Items with a menu open a flyout instead of navigating. `href` is the section's
  // URL prefix, used to mark the item as current.
  menu?: { columns: MenuColumn[]; aside: MenuAside };
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
  // Email and phone from the website structure doc.
  email: "contact@neufin.energy",
  phone: "+91 98251 30769",
  // TODO: dummy WhatsApp number and social links; replace before launch.
  // WhatsApp number in international format, digits only.
  whatsapp: "6594602555",
  linkedin: "https://www.linkedin.com/company/neufin-energy",
  instagram: "https://www.instagram.com/neufin.energy",
  x: "https://x.com/neufinenergy",
};

// Neufin's one office, from its Google Maps listing (Kedar, 2026-10-25).
export const office = {
  name: "Mumbai office",
  address: ["Lodha Supremus, 710 A", "near Lodha New Cuffe Parade, Wadala", "Mumbai, Maharashtra 400037"],
};
const officeQuery = encodeURIComponent(`Neufin Energy, ${office.address.join(", ")}, India`);
export const officeMapHref = `https://www.google.com/maps/search/?api=1&query=${officeQuery}`;
export const officeMapEmbed = `https://www.google.com/maps?q=${officeQuery}&output=embed`;

// Menu, from the "Neufin website structure" doc (the source of truth for content).
export const solutions = {
  buy: { label: "Buy cheaper power", href: "/solutions/buy-cheaper-power" },
  run: { label: "Run and optimise my power", href: "/solutions/run-and-optimise" },
  advisory: { label: "Renewable energy advisory", href: "/solutions/renewable-energy-advisory" },
  services: { label: "Services", href: "/solutions/services" },
  sell: { label: "Sell energy", href: "/solutions/sell-energy" },
};


// From the home page wireframe (Kedar, 2026-10-22): manufacturing split into its three biggest trades.
export const industries: NavLink[] = [
  { label: "Auto", href: "/industries/auto" },
  { label: "Plastics", href: "/industries/plastics" },
  { label: "Steel", href: "/industries/steel" },
  { label: "Hotels and resorts", href: "/industries/hotels-and-resorts" },
  { label: "Real estate and malls", href: "/industries/real-estate-and-malls" },
  { label: "Offices and coworking", href: "/industries/offices-and-coworking" },
  { label: "Banks and finance", href: "/industries/banks-and-finance" },
  { label: "Retail chains", href: "/industries/retail-chains" },
];

// The services, in the brief's order and with its names (Solutions: Services, All services).
// TODO: the service pages (and one per state, for search) don't exist yet.
export const services: NavLink[] = [
  { label: "ABT metering", href: "/solutions/services/abt-metering" },
  { label: "Smart meter installation", href: "/solutions/services/smart-meter-installation" },
  { label: "Move your existing meter", href: "/solutions/services/meter-shifting" },
  { label: "Electricity bill name change", href: "/solutions/services/name-change" },
  { label: "Contract demand change", href: "/solutions/services/contract-demand-change" },
  { label: "Open access approvals", href: "/solutions/services/open-access-approvals" },
  { label: "Net metering", href: "/solutions/services/net-metering" },
];

// Energy plans: every plan in one place (the plan finder page). Phase 1 (Kedar, 2026-10-27).
const energyPlans: NavLink = { label: "Energy plans", href: "/products/plan-finder" };
// Lumen's modules, with the icon and line the Products menu and the home page's Lumen
// block both show.
export const lumenModules: (MenuItem & { icon: IconName; description: string })[] = [
  { label: "Bill management", href: "/products/lumen/bill-management", icon: "duo-bill", description: "Every bill fetched and checked, at every site." },
  { label: "Solar and battery tracking", href: "/products/lumen/solar-and-battery-tracking", icon: "duo-battery", description: "Output, upkeep and faults, caught early." },
  { label: "Contract tracking", href: "/products/lumen/contract-tracking", icon: "duo-contract", description: "Bills checked against your power contract." },
  { label: "Automatic source switching", href: "/products/lumen/source-switching", icon: "duo-nodes", description: "Uses grid, solar, wind, diesel or battery, whichever is cheapest." },
];

export const blogs: NavLink = { label: "Blog", href: "/blog" };
export const publications: NavLink = { label: "Publications", href: "/publications" };
export const customerStories: NavLink = { label: "Customer stories", href: "/customer-stories" };
export const about: NavLink = { label: "About", href: "/about" };
export const careers: NavLink = { label: "Careers", href: "/careers" };

export const planFinderHref = energyPlans.href;

export const contactLink: NavLink = { label: "Contact us", href: "/contact" };

// Phase 1 pages only (Kedar, 2026-10-27): Home, the five solutions, Energy plans, Blog,
// Publications, Customer stories, About, Careers, Contact. Industry, Lumen module, tool and
// document pages come later, so the menu doesn't link to them yet.
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Solutions",
    href: "/solutions",
    menu: {
      columns: [
        {
          title: "For businesses",
          items: [
            { ...solutions.buy, icon: "duo-bolt", description: "Energy plans for your sites." },
            { ...solutions.run, icon: "duo-meter", description: "Pay less for the power you already use." },
            { ...solutions.advisory, icon: "duo-leaf", description: "A clear plan to reach your clean power goals." },
            { ...solutions.services, icon: "duo-wrench", description: "Meter work and electricity board approvals, done for you." },
          ],
        },
      ],
      aside: {
        label: "For suppliers",
        title: "Sell energy",
        text: "Power producers, solar and wind developers, builders and partners: sell your power to businesses that need it.",
        link: { label: "Sell energy with Neufin", href: solutions.sell.href },
      },
    },
  },
  energyPlans,
  {
    label: "Resources",
    href: "/resources",
    menu: {
      columns: [
        {
          title: "Learn",
          items: [
            // TODO: confirm the Blog note; the doc gives none.
            { ...blogs, icon: "duo-news", description: "Notes on power prices, rules and markets." },
            { ...publications, icon: "duo-book", description: "Reports, guides and research papers." },
          ],
        },
      ],
      aside: {
        label: "Featured",
        title: "Renewable energy handbook",
        // TODO: confirm this line with Neufin.
        text: "A plain guide to buying clean power for your business.",
        link: { label: "See publications", href: publications.href },
      },
    },
  },
  customerStories,
  about,
  careers,
];

export const telHref = `tel:${site.phone.replace(/\s/g, "")}`;
export const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Neufin, I would like to send you my power bill.")}`;

export const legalLinks: NavLink[] = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export const socialLinks: NavLink[] = [
  { label: "LinkedIn", href: site.linkedin },
  { label: "Twitter", href: site.x },
  { label: "Instagram", href: site.instagram },
];

// Footer columns: every Phase 1 page, so search engines find them all.
export const footerGroups: { title: string; links: NavLink[] }[] = [
  { title: "Solutions", links: Object.values(solutions) },
  { title: "Resources", links: [energyPlans, blogs, publications, customerStories] },
  { title: "Company", links: [about, careers, contactLink] },
];
