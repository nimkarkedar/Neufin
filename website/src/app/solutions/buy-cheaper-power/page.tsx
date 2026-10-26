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
import { Table } from "@/components/sections/Blocks";
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

// What an energy plan is, in four parts, so the term needs no explaining (the brief's
// note): the brief's four points, each as one part of the plan.
const planParts = [
  { label: "What you buy", value: "Solar, wind, battery or exchange power" },
  { label: "At what price", value: "The lowest per unit, through bulk buying" },
  { label: "For how long", value: "From 30 days to 15 years" },
  { label: "How much", value: "From 0.5 MWp" },
];

// The four kinds of plan, from the brief, each on a full-card illustration (Kedar's art on
// Energy Mint). `crop` pulls the art down so the text above it stays clear.
const plans = [
  { title: "Solar", text: "Fixed-price daytime energy. Best for plants and offices that run by day.", art: artSolar, crop: "0%" },
  { title: "Wind", text: "Energy that runs into the evening and night. Best for sites that run round the clock.", art: artWind, crop: "12%" },
  { title: "Battery", text: "Solar stored for your evening peak. Best for sites with high evening loads.", art: artBattery, crop: "4%" },
  { title: "Spot, from the exchange", text: "Bought daily from the exchange with no lock-in. Best for flexible loads or short terms.", art: artExchange, crop: "6%" },
];

// TODO: real stories, figures and client names.
const stories = ["Auto", "Hotels and resorts", "Offices and coworking", "Real estate and malls"].map((ind) => ({
  title: "X% lower energy cost",
  text: `Client name · ${ind}`,
  note: `Photo: a ${ind.toLowerCase()} site`,
}));

// From first call to cheaper energy, from the brief, with Kedar's spot illustrations.
const steps = [
  { title: "Share your electricity bills", text: "Send them on WhatsApp or by email. That is all we need to start.", art: stepBill },
  { title: "Get a quote within 48 hours", text: "We compare plans across 30+ suppliers and send you a price.", art: stepQuote },
  { title: "Sign a standard agreement", text: "Pick the plan we recommend. The terms are agreed in advance.", art: stepAgreement },
  { title: "Power starts in as little as 30 days", text: "Depending on the plan you pick.", art: stepPower },
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

      <Section id="plans" title="Energy plans that fit every business" lead="An energy plan is a contract to buy power. It has four parts.">
        <dl className={`surface ${styles.parts}`}>
          {planParts.map((p) => (
            <div key={p.label} className={styles.part}>
              <dt className={styles.partLabel}>{p.label}</dt>
              <dd className={styles.partValue}>{p.value}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.kinds}>
          <ScrollRow label="Kinds of energy plan" controls={false} className={cardLayouts.four}>
            {plans.map((p) => (
              <div
                key={p.title}
                className={`image-card image-card-static image-card-art image-card-top ${styles.plan}`}
                style={{ "--image-card-art-crop": p.crop } as CSSProperties}
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
        <ScrollRow label="Customer stories" className={cardLayouts.row}>
          {stories.map((s) => (
            <PhotoCard key={s.text} {...s} href={customerStories.href} cta="Read the story" />
          ))}
        </ScrollRow>
      </Section>

      <Section id="on-your-own" tone="white" title="Buying clean power on your own is slow and rigid" lead="With Neufin it takes as little as 30 days, at a price you choose.">
        <Table
          caption="Buying on your own compared with buying through Neufin"
          head={["", "On your own", "With Neufin"]}
          highlight={2}
          rows={[
            ["Price", "High prices that change by generator", "Lowest price, through bulk buying"],
            ["Lock-in", "Long term, from 3 to 15 years", "Your choice, from 30 days to 15 years"],
            ["Terms", "New terms in every quote", "Standard terms, agreed in advance"],
            ["Time to start", "6 to 9 months", "As little as 30 days"],
            ["Smallest size", "From 1.5 MWp", "From 0.5 MWp"],
          ]}
        />
      </Section>

      <Section id="how" title="From first call to cheaper energy">
        {/* One step higher each time, at the Stripe's angle, as on Careers. */}
        <ScrollRow label="How it works" controls={false} className={`${cardLayouts.four} ${cardLayouts.climb}`}>
          {steps.map((s, i) => (
            <div key={s.title} className={cardLayouts.step} style={{ "--i": i, "--n": steps.length } as CSSProperties}>
              <ArtCard {...s} />
            </div>
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
