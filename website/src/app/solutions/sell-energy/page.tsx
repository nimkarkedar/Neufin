import Link from "next/link";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
// TODO: Neufin's own photos; library photos stand in.
import headerPhoto from "@ds/../public/assets/photos/industry-steel.jpg";
import solarSite from "@ds/../public/assets/photos/solar-site.jpg";
import windHills from "@ds/../public/assets/photos/wind-hills.jpg";
import engineersAtScreen from "@ds/../public/assets/photos/engineers-at-screen.jpg";
import { ContactReach } from "@/components/contact/ContactReach";
import { VerticalCard, cardLayouts } from "@/components/sections/Cards";
import { FaqSection } from "@/components/sections/FaqSection";
import { LogoBar } from "@/components/sections/LogoBar";
import { PatternTiles, type PatternTile } from "@/components/sections/PatternTiles";
import { Section } from "@/components/sections/Section";
import { StripeHeader } from "@/components/sections/StripeHeader";
import { customerLogos, supplierLogos } from "@/lib/logos";
import { pageMeta } from "@/lib/meta";
import { contactLink, solutions } from "@/lib/site";
import styles from "./sell.module.css";

export const metadata = pageMeta(
  "Sell your energy to businesses",
  "For power producers and developers: verified, credit-checked business buyers across 16 states, one partner from contract to payments, and the approvals and meters handled.",
  solutions.sell.href,
);

// Sell energy, for suppliers, in the brief's order (the "Neufin website structure" doc,
// Solutions: Sell energy), with the finish of the other solution pages. It closes on its
// own call-back block with the named supply lead (the brief's final call to action), so the
// footer's contact card, which is for buyers, is hidden here (`FooterContactRow`).
// TODO: brief row 5 (not in the screenshots Kedar sent). The testimonials (row 6) wait for
// real quotes from developers, with name, firm and photo (agreed 2026-10-22).

// What a supplier gets, as pattern tiles with a duo icon each.
const gets: PatternTile[] = [
  { icon: "duo-shield", title: "Verified buyers", text: "Credit-checked business buyers, matched to your plant's output." },
  { icon: "duo-handshake", title: "One partner", text: "One contact for every buyer, from contract to payment." },
  { icon: "duo-clipboard", title: "Less work", text: "We handle approvals, meters and paperwork for you." },
];

// The ways to sell, one card each.
const ways = [
  { title: "Long-term (PPA)", text: "10 to 25 years. Best for new plants that need financing.", photo: solarSite },
  { title: "Short-term", text: "3 months to 5 years. Best for plants already running.", photo: windHills },
  { title: "Trade through us", text: "Best for power you haven't sold yet.", photo: engineersAtScreen },
];

// The brief's three figures for suppliers.
const proof = [
  { value: "30+", label: "suppliers" },
  { value: "4+ GW", label: "supply network" },
  { value: "16", label: "states" },
];

export default function SellEnergy() {
  return (
    <>
      <StripeHeader
        crumbs={[{ label: "Solutions" }, { label: solutions.sell.label }]}
        title="Sell your energy faster"
        lead="Verified business buyers, so you can generate while we take care of the rest."
        actions={
          <Link href={contactLink.href} className="btn btn-accent">
            Talk to us
            <IconSvg icon={icons.arrow} size={20} />
          </Link>
        }
        photo={headerPhoto}
        focus="50% 50%"
        over
      />

      <Section id="proof" title="Developers sell to India's top businesses through Neufin">
        <div className={`surface ${styles.proof}`}>
          {/* The home numbers block's figures grid (design system `.figures`), flush at the top. */}
          <dl className="figures">
            {proof.map((n) => (
              <div key={n.label} className="figure">
                <dt className="figure-label">{n.label}</dt>
                <dd className="figure-value">{n.value}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.logos}>
            <LogoBar label="Our suppliers" logos={supplierLogos} />
            <LogoBar label="Our buyers" logos={customerLogos} />
          </div>
        </div>
      </Section>

      <Section id="what-you-get" title="Work with Neufin Energy">
        <PatternTiles items={gets} />
      </Section>

      <Section id="ways" title="Sell on your terms" link={{ label: "Talk to us", href: contactLink.href }}>
        <ul className={cardLayouts.three}>
          {ways.map((w) => (
            <li key={w.title}>
              <VerticalCard look="photo" image={w.photo} title={w.title} text={w.text} />
            </li>
          ))}
        </ul>
      </Section>

      {/* TODO: Neufin to answer the open questions. */}
      <FaqSection
        title="Questions from suppliers"
        items={[
          { q: "How do you set the price?" },
          { q: "How do you find buyers?", a: "From our network of business buyers across 16 states. Every buyer is credit-checked." },
          { q: "Can I sell part of a plant?" },
          { q: "What do you charge?" },
        ]}
      />

      <Section id="talk" tone="white" title="Let's find buyers for your plant">
        <ContactReach short topic="selling your energy" leadRole="Supply lead" />
      </Section>
    </>
  );
}
