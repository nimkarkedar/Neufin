import Link from "next/link";
import { IconSvg } from "@ds/components/Icon.jsx";
import { ScrollRow } from "@ds/components/ScrollRow.jsx";
import { icons } from "@ds/brand/icons.js";
// TODO: Neufin's own photo; a library photo stands in.
import pylonDusk from "@ds/../public/assets/photos/careers-pylon-dusk.jpg";
import artSolar from "@ds/../public/assets/illustrations/plan-solar.jpg";
import artWind from "@ds/../public/assets/illustrations/plan-wind.jpg";
import artBattery from "@ds/../public/assets/illustrations/plan-battery.jpg";
import artExchange from "@ds/../public/assets/illustrations/plan-exchange.jpg";
import { HowWeDoIt } from "@/components/home/HowWeDoIt";
import { QuoteSteps } from "@/components/sections/QuoteSteps";
import { stories, storyCard } from "@/lib/stories";
import { VerticalCard, cardLayouts } from "@/components/sections/Cards";
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


// The four kinds of plan, from the brief, as panel cards on Kedar's illustrations (3:2, on
// White), each with its own crop.
const plans = [
  { title: "Solar", text: "Fixed-price daytime energy, for sites that run by day.", art: artSolar, focus: "50% 50%" },
  { title: "Wind", text: "Energy into the evening and night, for round-the-clock sites.", art: artWind, focus: "10% 50%" },
  { title: "Battery", text: "Solar stored for your evening peak, for high evening loads.", art: artBattery, focus: "50% 50%" },
  { title: "Daily market", text: "Bought daily on the power exchange, with no lock-in.", art: artExchange, focus: "50% 50%" },
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

      {/* What a plan is in one White box, then the four kinds as panel cards in a sideways row. */}
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
          <ScrollRow label="Kinds of energy plan" className={cardLayouts.row}>
            {plans.map((p) => (
              <VerticalCard key={p.title} image={p.art} focus={p.focus} title={p.title} text={p.text} />
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
        <ScrollRow label="Customer stories" className={cardLayouts.row}>
          {stories.slice(0, 4).map((s, i) => (
            <VerticalCard key={i} {...storyCard(s)} />
          ))}
        </ScrollRow>
      </Section>

      <QuoteSteps />

      <Section id="latest" title="Neu from Neufin Energy" link={resourcesLink}>
        <ul className={cardLayouts.three}>
          {latest.map((p) => (
            <li key={p.title}>
              <VerticalCard {...p} />
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
