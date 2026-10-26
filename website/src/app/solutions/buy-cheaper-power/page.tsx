import Link from "next/link";
import type { CSSProperties } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { ScrollRow } from "@ds/components/ScrollRow.jsx";
import { icons } from "@ds/brand/icons.js";
// TODO: Neufin's own photo; a library photo stands in.
import pylonDusk from "@ds/../public/assets/photos/careers-pylon-dusk.jpg";
import artSolar from "@ds/../public/assets/illustrations/plan-solar.jpg";
import artWind from "@ds/../public/assets/illustrations/plan-wind.jpg";
import artBattery from "@ds/../public/assets/illustrations/plan-battery.jpg";
import artExchange from "@ds/../public/assets/illustrations/plan-exchange.jpg";
import stepBill from "@ds/../public/assets/illustrations/step-bill.png";
import stepQuote from "@ds/../public/assets/illustrations/step-quote.png";
import stepAgreement from "@ds/../public/assets/illustrations/step-agreement.png";
import stepPower from "@ds/../public/assets/illustrations/step-power.png";
import { HowWeDoIt } from "@/components/home/HowWeDoIt";
import { LinkCards } from "@/components/sections/Blocks";
import { stories, storyCard } from "@/lib/stories";
import { ArtCard, PhotoCard, cardLayouts } from "@/components/sections/Cards";
import { FaqSection } from "@/components/sections/FaqSection";
import { PlanFinder } from "@/components/sections/PlanFinder";
import { Section } from "@/components/sections/Section";
import { StripeHeader } from "@/components/sections/StripeHeader";
import { latest, resourcesLink } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { customerStories, solutions } from "@/lib/site";
import styles from "./buy.module.css";

export const metadata = pageMeta(
  "Buy cheaper power for your business",
  "Energy plans from solar, wind, battery and the power exchange, from 30 days to 15 years and from 0.5 MWp. Cut your energy bill by up to 30%.",
  solutions.buy.href,
);

// Buy cheaper power, in the brief's order (the "Neufin website structure" doc, Solutions:
// Buy cheaper energy), built from what the site already has: the text-on-photo header, the
// shared cards, the plan finder, the home page's FAQ and solution cards, and the footer's
// contact card as the last step.


// The four kinds of plan, from the brief, each on a full-card illustration (Kedar's art on
// Energy Mint). `crop` pulls the art down so the text above it stays clear.
// `crop` places the art on phones (4:5 cards), `cropWide` in the 2 × 2 grid beside the box from 1280px.
const plans = [
  { title: "Solar", text: "Fixed-price daytime energy, for sites that run by day.", art: artSolar, crop: "0%", cropWide: "36%" },
  { title: "Wind", text: "Energy into the evening and night, for round-the-clock sites.", art: artWind, crop: "12%", cropWide: "54%" },
  { title: "Battery", text: "Solar stored for your evening peak, for high evening loads.", art: artBattery, crop: "4%", cropWide: "42%" },
  { title: "Spot, from the exchange", text: "Bought daily with no lock-in, for flexible loads or short terms.", art: artExchange, crop: "6%", cropWide: "46%" },
];


// From first call to cheaper energy, from the brief, with Kedar's spot illustrations.
// TODO: Neufin to confirm the durations (48 hours and 30 days are the brief's).
const steps = [
  { title: "Share your electricity bills", text: "Send them on WhatsApp or by email. That is all we need to start.", duration: "5 minutes", art: stepBill },
  { title: "Get a quote within 48 hours", text: "We compare plans across 30+ suppliers and send you a price.", duration: "Within 48 hours", art: stepQuote },
  { title: "Sign a standard agreement", text: "Pick the plan we recommend. The terms are agreed in advance.", duration: "1 day", art: stepAgreement },
  { title: "Power starts in as little as 30 days", text: "Depending on the plan you pick.", duration: "From 30 days", art: stepPower },
];

export default function BuyCheaperPower() {
  return (
    <>
      <StripeHeader
        crumbs={[{ label: "Solutions" }, { label: solutions.buy.label }]}
        title="Cut your energy bill by up to 30%"
        lead="Choose your tariff, tenure and capacity."
        actions={
          <Link href="#compare" className="btn btn-accent">
            View prices
            <IconSvg icon={icons.arrow} size={20} />
          </Link>
        }
        photo={pylonDusk}
        focus="50% 20%"
        over
      />

      {/* One fold: what a plan is on the left (like the home numbers block's left box), the
          four kinds as a 2 × 2 of illustrated cards on the right. */}
      <Section id="plans" title="Energy plans that fit every business">
        <div className={styles.plans}>
          <div className={`surface ${styles.explain}`}>
            <p className={styles.explainText}>
              An energy plan is a contract to buy power at a fixed price, for as long as you need, from 30 days to 15 years. We buy in
              bulk from 30+ suppliers, so you pay less per unit than you do your electricity board. Plans start from 0.5 MWp.
            </p>
            <Link href="#compare" className="btn btn-primary">
              See your price
              <IconSvg icon={icons.arrow} size={20} />
            </Link>
          </div>
          <ScrollRow label="Kinds of energy plan" controls={false} className={`${cardLayouts.four} ${styles.kinds}`}>
            {plans.map((p) => (
              <div
                key={p.title}
                className={`image-card image-card-static image-card-art image-card-top ${styles.plan}`}
                style={{ "--crop": p.crop, "--crop-wide": p.cropWide } as CSSProperties}
              >
                <img src={p.art.src} alt="" />
                <div className="image-card-body">
                  <h3 className="image-card-title">{p.title}</h3>
                  <p className="image-card-text">{p.text}</p>
                </div>
              </div>
            ))}
          </ScrollRow>
        </div>
      </Section>

      <div id="compare">
        {/* TODO (brief): yearly use, the electricity board by name, and the price type (changes with tariff orders vs fixed). */}
        <PlanFinder title="See what you’d save against your electricity board" />
      </div>

      <Section id="stories" title="Businesses like yours, paying less" link={{ label: "All customer stories", href: customerStories.href }}>
        {/* The same cards as the Customer stories page, which this section links to. */}
        <LinkCards columns={4} items={stories.slice(0, 4).map(storyCard)} />
      </Section>

      <Section id="how" title="From first call to cheaper energy">
        <ScrollRow label="How it works" controls={false} className={cardLayouts.four}>
          {steps.map((s, i) => (
            <ArtCard key={s.title} {...s} step={i + 1} />
          ))}
        </ScrollRow>
      </Section>

      <Section id="latest" title="Neu from Neufin Energy" link={resourcesLink}>
        <ul className={cardLayouts.three}>
          {latest.map((l) => (
            <li key={l.title}>
              <PhotoCard title={l.title} text={l.text} note={l.cover?.note} href={l.href} cta={l.linkLabel} />
            </li>
          ))}
        </ul>
      </Section>

      {/* TODO: Neufin to answer the open questions. */}
      <FaqSection
        title="Questions about buying energy"
        items={[
          { q: "Is there a minimum load requirement?", a: "Plans start from 0.5 MWp, for businesses on a high-tension (HT) connection." },
          { q: "What if my load changes?" },
          { q: "What if I have multiple sites?", a: "One contract can cover sites across states. We supply in 16 states." },
          { q: "What do you charge?" },
        ]}
      />

      <HowWeDoIt title="More ways to cut your energy cost" />
    </>
  );
}
