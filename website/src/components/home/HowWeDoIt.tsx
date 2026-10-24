import Link from "next/link";
import type { CSSProperties } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import laptop from "@ds/../public/assets/photos/laptop-software.jpg";
import electrician from "@ds/../public/assets/photos/electrician-rack.jpg";
import landscape from "@ds/../public/assets/illustrations/energy-landscape.jpg";
import { solutions } from "@/lib/site";
import styles from "./HowWeDoIt.module.css";

// How Neufin keeps the price low, after the plan finder: the three solutions besides
// buying power, as the design system's image cards, from Kedar's mock. Smart tech (Lumen
// and the software), advisory (market knowledge and supplier connections), and service
// end to end, so a business gets one partner and its operations don't pause. On hover
// each card's text slides up and its call to action appears (Kedar).
// TODO: Neufin to confirm the lines.
const cards = [
  {
    title: "Smart energy",
    text: "Lumen and our software track every site and bill, and show where to save.",
    href: solutions.run.href,
    cta: "Explore Lumen",
    image: laptop,
    kind: "photo",
  },
  {
    title: "Energy advisory",
    text: "We know the market and the suppliers, so we source the right power for you.",
    href: solutions.advisory.href,
    cta: "Plan your energy mix",
    image: landscape,
    kind: "art",
  },
  {
    title: "Services",
    text: "Meters, approvals and paperwork, done end to end without pausing your work.",
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

export function HowWeDoIt() {
  return (
    <section className={`container ${styles.section}`} aria-labelledby="how-title">
      <h2 id="how-title" className={styles.title}>
        How we keep your price low
      </h2>
      <ul className={styles.cards}>
        {cards.map((c) => (
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
