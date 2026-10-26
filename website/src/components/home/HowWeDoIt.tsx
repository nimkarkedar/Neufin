import Link from "next/link";
import type { CSSProperties } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import laptop from "@ds/../public/assets/photos/laptop-software.jpg";
import electrician from "@ds/../public/assets/photos/electrician-rack.jpg";
import landscape from "@ds/../public/assets/illustrations/energy-landscape.jpg";
import solarSite from "@ds/../public/assets/photos/solar-site.jpg";
import { solutions } from "@/lib/site";
import styles from "./HowWeDoIt.module.css";

// How Neufin keeps the price low, after the plan finder: the three solutions besides
// buying power, as the design system's image cards, from Kedar's mock: Run and optimise
// (Lumen, the software), advisory (market knowledge and 30+ suppliers) and services, so a business
// gets one partner and its site keeps running. Copy follows the Tone of voice page (no
// "smart" or "end to end"; a number where there is one). On hover
// each card's text slides up and its call to action appears (Kedar).
// TODO: Neufin to confirm the lines.
const cards = [
  {
    id: "buy",
    title: "Buy cheaper energy",
    text: "Cut energy cost, on your terms. Choose your tariff, tenure and capacity.",
    href: solutions.buy.href,
    cta: "See energy plans",
    image: solarSite,
    kind: "photo",
  },
  {
    id: "run",
    title: "Run and optimise",
    text: "Lumen watches every meter, plant and bill, and flags faults and overcharges.",
    href: solutions.run.href,
    cta: "See how Lumen works",
    image: laptop,
    kind: "photo",
  },
  {
    id: "advisory",
    title: "Energy advisory",
    text: "We compare 30+ suppliers and tell you which power suits each site.",
    href: solutions.advisory.href,
    cta: "Plan your energy mix",
    image: landscape,
    kind: "art",
  },
  {
    id: "services",
    title: "Services",
    text: "Meters, approvals and paperwork, done for you while your site keeps running.",
    href: solutions.services.href,
    cta: "See what we handle",
    image: electrician,
    kind: "photo",
  },
] as const;

// The illustration on Electric Coral (its own sky, matched in the file), pulled down so its
// foot is cropped by 16% of the card and the sky runs up behind the text (Kedar: more
// breathing space).
const art = { "--image-card-bg": "var(--electric-coral)", "--image-card-art-crop": "16%" } as CSSProperties;

// Other pages reuse the cards under their own heading, leaving out their own solution
// (`exclude`). The home page shows the three besides buying, which the plan finder covers.
export function HowWeDoIt({ title = "How we keep your price low", exclude = "buy" }: { title?: string; exclude?: (typeof cards)[number]["id"] }) {
  return (
    <section className={`container ${styles.section}`} aria-labelledby="how-title">
      <h2 id="how-title" className={styles.title}>
        {title}
      </h2>
      <ul className={styles.cards}>
        {cards.filter((c) => c.id !== exclude).map((c) => (
          <li key={c.title}>
            <Link
              href={c.href}
              className={`image-card ${c.kind === "art" ? "image-card-art image-card-top" : "image-card-wash"}`}
              style={c.kind === "art" ? art : undefined}
            >
              <img src={c.image.src} alt="" />
              <span className="image-card-body">
                <span className="image-card-title">{c.title}</span>
                <span className="image-card-text">{c.text}</span>
                {/* Shown on hover or focus (always on touch screens); the card is the link. */}
                <span className="image-card-cta" aria-hidden="true">
                  {c.cta}
                  <IconSvg icon={icons.arrow} size={18} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
