// Customer, partner and investor logos, from the Logos folder next to this project.
// The files in src/assets/logos are single-colour copies made by `npm run logos`;
// never edit them by hand. Shown by LogoBar (and LogoRow) in the text colour.
import benteler from "@/assets/logos/customers/benteler-automotive.svg";
import clubMahindra from "@/assets/logos/customers/club-mahindra.svg";
import hitech from "@/assets/logos/customers/hitech.svg";
import hubergroup from "@/assets/logos/customers/hubergroup.svg";
import ltFinance from "@/assets/logos/customers/lt-finance.svg";
import mahindra from "@/assets/logos/customers/mahindra.svg";
import rajdarbar from "@/assets/logos/customers/rajdarbaar.svg";
import smartworks from "@/assets/logos/customers/smart-works.svg";
import yesBank from "@/assets/logos/customers/yes-bank.svg";
import threeOne4 from "@/assets/logos/investors/3one4-capital.svg";
import betterCapital from "@/assets/logos/investors/better-capital.svg";
import goodCapital from "@/assets/logos/investors/good-capital.svg";
import rainmatter from "@/assets/logos/investors/rainmatter.svg";
import candi from "@/assets/logos/partners/candi.svg";
import cleanmax from "@/assets/logos/partners/cleanmax.svg";
import ecofy from "@/assets/logos/partners/ecofy.svg";
import fourthPartner from "@/assets/logos/partners/fourth-partner-energy.svg";
import icici from "@/assets/logos/partners/icici-bank.svg";
import netZero from "@/assets/logos/partners/net-zero.svg";
import ravindra from "@/assets/logos/partners/ravindra-energy.svg";
import sunsure from "@/assets/logos/partners/sunsure.svg";
import tataCapital from "@/assets/logos/partners/tata-capital.svg";
import tataPower from "@/assets/logos/partners/tata-power.svg";

type StaticSvg = { src: string; width: number; height: number };
export type BrandLogo = { name: string; src: string; ratio: number };

const logo = (name: string, file: StaticSvg): BrandLogo => ({
  name,
  src: file.src,
  ratio: file.width / file.height,
});

export const customerLogos = [
  logo("Mahindra", mahindra),
  logo("L&T Finance", ltFinance),
  logo("YES BANK", yesBank),
  logo("Club Mahindra", clubMahindra),
  logo("Smartworks", smartworks),
  logo("Benteler", benteler),
  logo("hubergroup", hubergroup),
  logo("Hi-Tech", hitech),
  logo("Rajdarbar Realty", rajdarbar),
];

// Power suppliers Neufin buys from.
export const supplierLogos = [
  logo("Tata Power", tataPower),
  logo("CleanMax", cleanmax),
  logo("Fourth Partner Energy", fourthPartner),
  logo("Sunsure", sunsure),
  logo("Ravindra Energy", ravindra),
  logo("Candi", candi),
];

// Banks and lenders that finance plants for Neufin's customers.
export const financeLogos = [
  logo("ICICI Bank", icici),
  logo("YES BANK", yesBank),
  logo("Tata Capital", tataCapital),
  logo("Ecofy", ecofy),
  logo("Net Zero Finance", netZero),
];

// Institutional investors only (Neufin, 2026-10-27). Angel investors' company logos are
// never shown without the investor's name, so they are not in any logo bar.
export const investorLogos = [
  logo("Better Capital", betterCapital),
  logo("Good Capital", goodCapital),
  logo("Rainmatter by Zerodha", rainmatter),
  logo("3one4 Capital", threeOne4),
];

// Every logo once, for the logo bar: customers, suppliers, finance partners (YES BANK is
// already a customer), then investors.
export const allLogos = [
  ...customerLogos,
  ...supplierLogos,
  ...financeLogos.filter((l) => l.name !== "YES BANK"),
  ...investorLogos,
];
