import Link from "next/link";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
// TODO: Neufin's own photo; a library photo stands in.
import solarPanels from "@ds/../public/assets/photos/solar.jpg";
import { ContactReach } from "@/components/contact/ContactReach";
import { PlanList, PlanTitle } from "@/components/plans/PlanList";
import { FaqSection } from "@/components/sections/FaqSection";
import { QuoteSteps } from "@/components/sections/QuoteSteps";
import { Section } from "@/components/sections/Section";
import { StripeHeader } from "@/components/sections/StripeHeader";
import { numbers } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { planFinderHref } from "@/lib/site";
import styles from "./plans.module.css";

export const metadata = pageMeta(
  "Energy plans: every plan, with the price",
  "Every Neufin energy plan with its landed price per unit. Filter by state, business type, yearly use, term and investment, then get a quote.",
  planFinderHref,
);

const count = (label: string) => numbers.find((n) => n.label.includes(label))?.value;

// Energy plans, from the brief's Energy plans table (CME Group as a loose reference): the
// header with the facts line, the filters and plans (choices carried in from the visitor's
// link and kept), how it works, the FAQ, then "Not sure which plan fits?" with the short
// call-back form as the close (the footer contact card is hidden here, as on Sell energy).
export default function PlanFinderPage() {
  return (
    <>
      <StripeHeader
        crumbs={[{ label: "Energy plans" }]}
        title={<PlanTitle />}
        lead="Choose your tariff, tenure and capacity. See what you would pay per unit before you talk to anyone."
        actions={
          <>
            <p className={styles.facts}>
              {count("energy plans")} plans · {count("states")} states · Lock in from 30 days to 15 years · From 0.5 MWp
            </p>
            <Link href="#not-sure" className="link-arrow">
              Not sure which plan fits? We&apos;ll recommend one
              <IconSvg icon={icons.arrow} size={20} />
            </Link>
          </>
        }
        photo={solarPanels}
        focus="50% 100%"
        over
      />

      <Section id="plans" title="Find your plan">
        <PlanList />
      </Section>

      {/* Backgrounds alternate down the page (Kedar, 2026-10-29): plans on the page, steps on
          White, FAQ on the page, then the call-back on White as the close. */}
      <QuoteSteps white />

      {/* TODO: Neufin to answer the open questions; "Why is there a price range?" to confirm. */}
      <FaqSection
        title="Questions about energy plans"
        items={[
          { q: "What is an energy plan?", a: "A contract to buy power at a fixed price, for as long as you need, from 30 days to 15 years." },
          { q: "Why is there a price range?", a: "The price depends on your state, your site and the term you choose. Your quote gives the exact figure." },
          { q: "Are these prices final?", a: "No. They are indicative bands; your quote has the final price." },
          { q: "Can I combine plans, for example solar by day and battery for evenings?" },
          { q: "Can different sites be on different plans, or in different states?", a: "One contract can cover sites across states. We supply in 16 states." },
          { q: "What if my load changes during the term?" },
          // TODO: link "clean power meters" to the ABT metering page once it is built (brief).
          { q: "Do I need new meters?", a: "Clean power needs a two-way (ABT) meter. If you don't have one, we supply, install and get it approved." },
          { q: "What happens when my term ends?" },
        ]}
      />

      {/* The close: the page's own call-back, so the footer's contact card is hidden here. */}
      <Section id="not-sure" tone="white" title="Not sure which plan fits?" lead="Our team will recommend a plan for your sites.">
        <ContactReach short />
      </Section>
    </>
  );
}
