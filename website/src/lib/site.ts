// Site-wide content: name, URLs, navigation and footer links.
// Header, footer, metadata, sitemap and structured data all read from here.
import type { icons } from "@ds/brand/icons.js";

export type IconName = keyof typeof icons;
export type NavLink = { label: string; href: string };
export type MenuItem = NavLink & { description?: string; icon?: IconName };
// A column is either all icon items (icon, label, note) or all plain links, never mixed.
// Column titles are one or two words: they are set as uppercase labels.
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
  email: "contact@neufin.co",
  phone: "+91 98251 30769",
  // TODO: dummy WhatsApp number and social links; replace before launch.
  // WhatsApp number in international format, digits only.
  whatsapp: "6594602555",
  linkedin: "https://www.linkedin.com/company/neufin-energy",
  instagram: "https://www.instagram.com/neufin.energy",
  x: "https://x.com/neufinenergy",
};

// Menu, from the "Neufin website structure" doc (the source of truth for content).
const solutions = {
  buy: { label: "Buy cheaper power", href: "/solutions/buy-cheaper-power" },
  run: { label: "Run and optimise my power", href: "/solutions/run-and-optimise" },
  advisory: { label: "Renewable energy advisory", href: "/solutions/renewable-energy-advisory" },
  services: { label: "Services", href: "/solutions/services" },
  sell: { label: "Sell energy", href: "/solutions/sell-energy" },
};

export const industries: NavLink[] = [
  { label: "Manufacturing", href: "/industries/manufacturing" },
  { label: "Hotels and resorts", href: "/industries/hotels-and-resorts" },
  { label: "Real estate and malls", href: "/industries/real-estate-and-malls" },
  { label: "Offices and coworking", href: "/industries/offices-and-coworking" },
  { label: "Banks and finance", href: "/industries/banks-and-finance" },
  { label: "Retail chains", href: "/industries/retail-chains" },
];

export const services: NavLink[] = [
  { label: "Clean power meters (ABT)", href: "/solutions/services/abt-metering" },
  { label: "Meter installation", href: "/solutions/services/meter-installation" },
  { label: "Meter shifting", href: "/solutions/services/meter-shifting" },
  { label: "Connection name change", href: "/solutions/services/name-change" },
  { label: "Load increase or decrease", href: "/solutions/services/load-change" },
  { label: "Maximum demand change", href: "/solutions/services/contract-demand-change" },
  { label: "Clean power approvals", href: "/solutions/services/open-access-approvals" },
  { label: "Rooftop solar net metering", href: "/solutions/services/net-metering" },
];

// Energy plans and Lumen are the same pages as Buy cheaper power and Run and optimise.
const energyPlans: NavLink = { label: "Energy plans", href: solutions.buy.href };
const supplyMap: NavLink = { label: "Plan finder", href: "/products/plan-finder" };
const lumen: NavLink = { label: "Lumen", href: solutions.run.href };
const lumenModules: NavLink[] = [
  { label: "Bill management", href: "/products/lumen/bill-management" },
  { label: "Solar and battery tracking", href: "/products/lumen/solar-and-battery-tracking" },
  { label: "Contract tracking", href: "/products/lumen/contract-tracking" },
  { label: "Automatic source switching", href: "/products/lumen/source-switching" },
];

const blogs: NavLink = { label: "Blogs", href: "/blog" };
const publications: NavLink = { label: "Publications", href: "/publications" };
const tariffCalculator: NavLink = { label: "Savings calculator", href: "/tools/savings-calculator" };
const stateGuides: NavLink = { label: "State guides", href: "/tools/state-guides" };
const customerStories: NavLink = { label: "Customer stories", href: "/customer-stories" };
const about: NavLink = { label: "About", href: "/about" };
const careers: NavLink = { label: "Careers", href: "/careers" };

export const contactLink: NavLink = { label: "Contact us", href: "/contact" };

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
            { ...solutions.buy, icon: "bolt", description: "Energy plans for your sites." },
            { ...solutions.run, icon: "meter", description: "Pay less for the power you already use." },
            { ...solutions.advisory, icon: "leaf", description: "A clear plan to reach your clean power goals." },
            { ...solutions.services, icon: "wrench", description: "Meter work and electricity board approvals, done for you." },
          ],
        },
        { title: "By industry", items: industries },
      ],
      aside: {
        label: "For suppliers",
        title: "Sell energy",
        text: "Power producers, solar and wind developers, builders and partners: sell your power to businesses that need it.",
        link: { label: "Sell energy with Neufin", href: solutions.sell.href },
      },
    },
  },
  {
    label: "Products",
    href: "/products",
    menu: {
      columns: [
        {
          title: "Plans",
          items: [
            { ...energyPlans, icon: "bolt", description: "See every plan you can buy, with the price." },
            { ...supplyMap, icon: "map", description: "Compare every plan available in your state." },
          ],
        },
        {
          title: "Software",
          items: [
            { ...lumen, icon: "meter", description: "Track and run every site's power in one place." },
            { ...lumenModules[0], icon: "bill", description: "Every bill fetched and checked, at every site." },
            { ...lumenModules[1], icon: "battery", description: "Output, upkeep and faults, caught early." },
            { ...lumenModules[2], icon: "contract", description: "Bills checked against your power contract." },
            { ...lumenModules[3], icon: "nodes", description: "Uses grid, solar, wind, diesel or battery, whichever is cheapest." },
          ],
        },
      ],
      aside: {
        label: "Lumen",
        title: "See Lumen on your own sites",
        text: "Lumen tracks every site, bill and agreement, and acts when there's money to save.",
        // TODO: link to the demo scheduling flow once it exists.
        link: { label: "Book a demo", href: "/contact" },
      },
    },
  },
  {
    label: "Resources",
    href: "/resources",
    menu: {
      columns: [
        {
          title: "Learn",
          items: [
            // TODO: confirm the Blogs note; the doc gives none.
            { ...blogs, icon: "news", description: "Notes on power prices, rules and markets." },
            { ...publications, icon: "book", description: "Reports, guides and research papers." },
          ],
        },
        {
          title: "Tools",
          items: [
            { ...tariffCalculator, icon: "calculator", description: "Compare your electricity board rate with our plans." },
            // TODO: confirm the State guides note; the doc gives none.
            { ...stateGuides, icon: "location", description: "Rules and charges for buying clean power in your state." },
          ],
        },
      ],
      aside: {
        label: "Featured",
        title: "Renewable energy handbook",
        // TODO: confirm this line with Neufin.
        text: "A plain guide to buying clean power for your business.",
        link: { label: "Get the handbook", href: "/publications/renewable-energy-handbook" },
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

// Footer columns, from the doc. The footer links to every page so search engines find them.
export const footerGroups: { title: string; links: NavLink[] }[] = [
  { title: "Solutions by need", links: Object.values(solutions) },
  { title: "Products", links: [energyPlans, supplyMap, lumen, ...lumenModules] },
  { title: "Solutions by industry", links: industries },
  { title: "Services", links: services },
  { title: "Resources", links: [blogs, publications, tariffCalculator, customerStories] },
  { title: "Company", links: [about, careers, contactLink] },
  {
    title: "Reports and documents",
    // TODO: link each to its PDF once supplied.
    links: [
      // TODO: spell out "IES" once Neufin confirms the full name.
      { label: "IES report", href: "/publications/ies-report" },
      { label: "Renewable energy handbook", href: "/publications/renewable-energy-handbook" },
      { label: "PF Form 5A", href: "/documents/pf-form-5a" },
      { label: "Power trading licence", href: "/documents/power-trading-licence" },
    ],
  },
];
