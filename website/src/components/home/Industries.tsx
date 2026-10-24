"use client";

import Link from "next/link";
import type { StaticImageData } from "next/image";
import auto from "@ds/../public/assets/photos/factory-floor.jpg";
import banks from "@ds/../public/assets/photos/industry-banks.jpg";
import hotels from "@ds/../public/assets/photos/industry-hotels.jpg";
import malls from "@ds/../public/assets/photos/industry-malls.jpg";
import offices from "@ds/../public/assets/photos/industry-offices.jpg";
import plastics from "@ds/../public/assets/photos/industry-plastics.jpg";
import retail from "@ds/../public/assets/photos/industry-retail.jpg";
import steel from "@ds/../public/assets/photos/industry-steel.jpg";
import { useState } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { LogoMark } from "@/components/sections/Blocks";
import { customerLogos, type BrandLogo } from "@/lib/logos";
import { industries } from "@/lib/site";
import styles from "./Industries.module.css";

const byName = (...names: string[]) => customerLogos.filter((l) => names.includes(l.name));

// What Neufin does for each industry, keyed by the label in site.ts.
// Photos: design system library and Unsplash (Unsplash License), cropped to one 3:2 shape;
// TODO: Neufin to confirm the lines and which customer sits where, and send their own photos.
const content: Record<string, { title: string; text: string; photo: { image: StaticImageData; alt: string }; logos: BrandLogo[] }> = {
  Auto: {
    title: "Fixed power cost for round-the-clock production",
    text: "Lock your price for 1 to 15 years, so a board rate revision doesn't move your cost per vehicle.",
    photo: { image: auto, alt: "Workers on a factory floor" },
    logos: byName("Mahindra", "Benteler"),
  },
  Plastics: {
    title: "Lower cost for power-heavy moulding and extrusion",
    text: "Cover your base load with clean power at a fixed price, and see every machine's share of the bill in Lumen.",
    photo: { image: plastics, alt: "Rows of moulding machines on a factory floor" },
    logos: [],
  },
  Steel: {
    title: "Predictable cost for energy-intensive melting and rolling",
    text: "Long-term contracts fix your price for up to 15 years, so market swings stay out of your margins.",
    photo: { image: steel, alt: "Molten metal being poured in a foundry" },
    logos: byName("Hi-Tech"),
  },
  "Hotels and resorts": {
    title: "Clean power for every property, on one contract",
    text: "Buy for all your hotels together and see each property's use and bill in one place.",
    photo: { image: hotels, alt: "A resort pool with sun umbrellas" },
    logos: byName("Club Mahindra"),
  },
  "Real estate and malls": {
    title: "Lower common-area cost and green claims you can show",
    text: "Supply clean power to your malls and parks, with the source of every unit on record for your reports.",
    photo: { image: malls, alt: "A shopping mall atrium with escalators" },
    logos: byName("Rajdarbar Realty"),
  },
  "Offices and coworking": {
    title: "One power plan across all your centres",
    text: "Move every centre in a state to clean power at a lower rate, with one partner for bills and approvals.",
    photo: { image: offices, alt: "People working at a long table in an open office" },
    logos: byName("Smartworks"),
  },
  "Banks and finance": {
    title: "Clean power for branches, offices and data centres",
    text: "Meet your clean energy targets across every site, with the approvals and paperwork done for you.",
    photo: { image: banks, alt: "A glass office tower against a blue sky" },
    logos: byName("YES BANK", "L&T Finance"),
  },
  "Retail chains": {
    title: "Lower power cost across hundreds of stores",
    text: "Group your stores by state to qualify for clean power plans, and see every store's bill in one place.",
    photo: { image: retail, alt: "Inside a beauty store in a shopping mall" },
    logos: [],
  },
};

// Industries on the home page: the design system's choice chips pick an industry (the
// row fades at the edge on phones to show it scrolls), and one White surface shows what
// Neufin does for it (left) next to its photo (right), with the customers from that
// industry and a link to the industry's own page.
export function Industries() {
  const [current, setCurrent] = useState(0);
  const ind = industries[current];
  const c = content[ind.label];

  return (
    <div>
      <div className="chips chips-row chips-row-hint" role="radiogroup" aria-label="Industry">
        {industries.map((i, n) => (
          <label key={i.href} className="chip">
            <input type="radio" name="industry" checked={current === n} onChange={() => setCurrent(n)} />
            {i.label}
          </label>
          ))}
      </div>

      <div className={`surface ${styles.panel}`} aria-live="polite">
        <div className={styles.text}>
          <h3 className={styles.title}>{c.title}</h3>
          <p className={styles.line}>{c.text}</p>


          <div className={styles.foot}>
            {c.logos.length > 0 && (
              <>
                <p className={styles.footLabel}>Customers from this industry</p>
                <ul className={styles.logos}>
                  {c.logos.map((l) => (
                    <li key={l.name}>
                      <LogoMark logo={l} />
                    </li>
                  ))}
                </ul>
              </>
            )}
            {/* TODO: the industry pages don't exist yet. */}
            <Link href={ind.href} className="link-arrow">
              See how we work with {ind.label.toLowerCase()}
              <IconSvg icon={icons.arrow} size={20} />
            </Link>
          </div>
        </div>

        <img src={c.photo.image.src} alt={c.photo.alt} className={styles.photo} />
      </div>
    </div>
  );
}
