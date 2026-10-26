import Link from "next/link";
import { PlanList, PlanSuggest } from "@/components/plans/PlanList";
import { StripeHeader } from "@/components/sections/StripeHeader";
// TODO: Neufin's own photo; a library photo stands in.
import pylonLatticePhoto from "@ds/../public/assets/photos/pylon-lattice.jpg";
import { Section } from "@/components/sections/Section";
import { pageMeta } from "@/lib/meta";
import { planFinderHref } from "@/lib/site";

export const metadata = pageMeta(
  "Plan finder: every energy plan, with prices",
  "Every Neufin energy plan in one place, with a price band per unit. Filter by state, source and contract length.",
  planFinderHref,
);

export default function PlanFinderPage() {
  return (
    <>
      <StripeHeader
        crumbs={[{ label: "Products" }, { label: "Plan finder" }]}
        title="Every energy plan, in one place"
        lead="All our plans with a price band. Filter by state, source and contract length, then get a quote for the one that fits."
        actions={
          <Link href="/contact" className="btn btn-accent">
            Get a quote
          </Link>
        }
        photo={pylonLatticePhoto}
      />

      <Section id="plans" title="Find your plan" narrowHead>
        <PlanList />
      </Section>

      <Section
        id="not-sure"
        tone="white"
        title="Not sure which plan fits?"
        lead="Answer two questions and we suggest a plan. A specialist checks it against your bill before you sign."
      >
        <PlanSuggest />
      </Section>
    </>
  );
}
