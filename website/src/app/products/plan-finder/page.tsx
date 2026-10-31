// TODO: Neufin's own photo; a library photo stands in.
import solarPanels from "@ds/../public/assets/photos/solar.jpg";
import { PlanMark } from "@ds/components/PlanMark.jsx";
import { ContactReach } from "@/components/contact/ContactReach";
import { PlanList } from "@/components/plans/PlanList";
import { Checks } from "@/components/sections/Blocks";
import { FaqSection } from "@/components/sections/FaqSection";
import { QuoteSteps, planSteps } from "@/components/sections/QuoteSteps";
import { Section } from "@/components/sections/Section";
import { StripeHeader } from "@/components/sections/StripeHeader";
import { numbers } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { packs } from "@/lib/plans";
import { planFinderHref } from "@/lib/site";
import styles from "./plans.module.css";

export const metadata = pageMeta(
  "Energy plans: the best priced plans for your business",
  "Every Neufin energy plan side by side, with what it saves in your state. Filter by state, business type, monthly use and term, then get a quote.",
  planFinderHref,
);

const count = (label: string) => numbers.find((n) => n.label.includes(label))?.value;

// Energy plans, from the brief's Energy plans table (Kedar, 2026-10-31; CME Group as a loose
// reference), in its order: the header with the facts line, what an energy plan is, the four
// plans, the filters and every plan side by side (choices carried in from the visitor's link
// and kept), how it works, Not sure which plan is right (the short call-back form), then the
// FAQ. The footer contact card is hidden here, as on Sell energy.
export default function PlanFinderPage() {
  return (
    <>
      {/* TODO: "30% savings" is one of the savings figures Neufin must settle (15%, 27%, 30%, up to 40%). */}
      <StripeHeader
        crumbs={[{ label: "Energy plans" }]}
        title="Best priced energy plans"
        lead="Find the right plan for your business."
        actions={
          <p className={styles.facts}>
            {count("energy plans")} plans · {count("states")} states · Up to 30% savings
          </p>
        }
        photo={solarPanels}
        focus="50% 100%"
        over
      />

      <Section id="what" title="What is an energy plan?">
        <p className={`lead-text ${styles.what}`}>
          Our energy plans give businesses a simple, low-cost way to buy power. Choose your tenure, tariff and capacity to get started, and our experts guide
          you through the rest. Power can start in as little as 30 days. It&apos;s as simple as choosing a mobile phone plan.
        </p>
      </Section>

      {/* The four plans, with Kedar's final names, each three short ticks in the same order
          (term, investment, what it's for), so they compare at a glance. */}
      <Section id="types" tone="white" title="Preview of our plans">
        <ul className={`${styles.types} scroll-row-phone`} tabIndex={0} aria-label="The four plan types">
          {packs.map((p) => (
            <li key={p.kind} className={`surface ${styles.type}`}>
              <span className={styles.typeMark}>
                <PlanMark kind={p.kind} />
              </span>
              <h3 className={styles.typeName}>{p.name}</h3>
              <Checks items={p.points} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="plans" title="Find your plan">
        <PlanList />
      </Section>

      <QuoteSteps white title="Get your personalised quote today" items={planSteps} />

      <Section id="not-sure" title="Not sure which plan is right for your business?" lead="Our specialists will recommend a plan for your needs.">
        <ContactReach short />
      </Section>

      {/* TODO: Neufin to answer the open questions and confirm the answers given; link
          "Do I need new meters?" to the ABT metering page once it is built (brief). */}
      <FaqSection
        title="Questions about energy plans"
        white
        items={[
          { q: "Why is there a price range?", a: "The price depends on your state, your site and the term you choose. Your quote gives the exact figure." },
          { q: "Are these prices final?", a: "No. They are indicative; your quote has the final price." },
          { q: "Can I combine plans, for example solar by day and battery for evenings?" },
          { q: "Can different sites be on different plans, or in different states?", a: "Yes. One contract can cover sites across states. We supply in 16 states." },
          { q: "What if my load changes during the term?" },
          { q: "Do I need new meters?", a: "Clean power needs a two-way (ABT) meter. If you don't have one, we supply, install and get it approved." },
          { q: "What happens when my term ends?" },
        ]}
      />
    </>
  );
}
