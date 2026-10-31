import Link from "next/link";
import { DuoIcon } from "@ds/components/DuoIcon.jsx";
import { IconSvg } from "@ds/components/Icon.jsx";
import { ScrollRow } from "@ds/components/ScrollRow.jsx";
import { icons } from "@ds/brand/icons.js";
// TODO: Neufin's own photo; a library photo stands in.
// TODO: Neufin's own photo; a library photo stands in.
import pylonDusk from "@ds/../public/assets/photos/careers-pylon-dusk.jpg";
import { HowWeDoIt } from "@/components/home/HowWeDoIt";
import { QuoteSteps } from "@/components/sections/QuoteSteps";
import { stories, storyCard } from "@/lib/stories";
import { VerticalCard, cardLayouts } from "@/components/sections/Cards";
import { FaqSection } from "@/components/sections/FaqSection";
import { IconGrid, type IconGridItem } from "@/components/sections/IconGrid";
import { PlanFinder } from "@/components/sections/PlanFinder";
import { Section } from "@/components/sections/Section";
import { StripeHeader } from "@/components/sections/StripeHeader";
import { latest, resourcesLink } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { customerStories, planFinderHref, solutions, type IconName } from "@/lib/site";
import boxes from "@/components/sections/Boxes.module.css";

export const metadata = pageMeta(
  "Buy cheaper power for your business",
  "Energy plans from solar, wind, battery and the power exchange, from 30 days to 15 years and from 0.5 MWp. Cut your energy bill by up to 30%.",
  solutions.buy.href,
);

// Buy cheaper power, in the brief's order (the "Neufin website structure" doc, Solutions:
// Buy cheaper energy), built from what the site already has: the text-on-photo header, the
// shared cards, the plan finder, the home page's FAQ and solution cards, and the footer's
// contact card as the last step.



// What an energy plan is, from the paragraph that was here (Kedar: as points with icons).
const points: { icon: IconName; text: string }[] = [
  { icon: "duo-contract", text: "A contract to buy power at a fixed price" },
  { icon: "duo-calendar", text: "For as long as you need, from 30 days to 15 years" },
  { icon: "duo-coins", text: "Bought in bulk from 30+ suppliers, so you pay less per unit than your electricity board" },
  { icon: "duo-bolt", text: "Plans start from 0.5 MWp" },
];

// The four kinds of plan, from the brief, each with a duo icon for its source (solar panel,
// wind, battery, the market chart).
const kinds: IconGridItem[] = [
  { title: "Solar", icon: "duo-solar", text: "Fixed-price daytime energy, for sites that run by day." },
  { title: "Wind", icon: "duo-wind", text: "Energy into the evening and night, for round-the-clock sites." },
  { title: "Battery", icon: "duo-battery", text: "Solar stored for your evening peak, for high evening loads." },
  { title: "Daily market", icon: "duo-chart", text: "Bought daily on the power exchange, with no lock-in." },
];

export default function BuyCheaperPower() {
  return (
    <>
      <StripeHeader
        crumbs={[{ label: "Products" }, { label: solutions.buy.label }]}
        title="Cut your energy bill by up to 30%"
        lead="Choose your tariff, tenure and capacity."
        actions={
          <Link href={planFinderHref} className="btn btn-accent">
            View prices
            <IconSvg icon={icons.arrow} size={20} />
          </Link>
        }
        photo={pylonDusk}
        focus="50% 40%"
        over
      />

      {/* Two White boxes of the same height, in the home numbers block's family (Kedar,
          2026-10-27): what a plan is as four points, then the four kinds of plan in a 2 × 2
          grid with lines edge to edge, each cell filling with Violet 100 under the pointer. */}
      <Section id="plans" title="Energy plans that fit every business">
        <div className={boxes.boxes}>
          <div className={`surface ${boxes.about}`}>
            <ul className={boxes.points}>
              {points.map((p) => (
                <li key={p.text}>
                  <DuoIcon name={p.icon} hero />
                  {p.text}
                </li>
              ))}
            </ul>
            <Link href="#compare" className="btn btn-primary">
              See your price
              <IconSvg icon={icons.arrow} size={20} />
            </Link>
          </div>
          <IconGrid items={kinds} swipe label="Kinds of plan" />
        </div>
      </Section>

      {/* TODO (brief): yearly use, the electricity board by name, and the price type (changes with tariff orders vs fixed). */}
      <PlanFinder title="See what you’d save against your electricity board" />

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
        <ul className={cardLayouts.threeSwipe}>
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
