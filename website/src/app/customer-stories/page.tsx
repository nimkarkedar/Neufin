import Link from "next/link";
import { StripeHeader } from "@/components/sections/StripeHeader";
// TODO: Neufin's own photo; a library photo stands in.
import factoryFloorPhoto from "@ds/../public/assets/photos/factory-floor.jpg";
import { Section } from "@/components/sections/Section";
import { StoryList } from "@/components/stories/StoryList";
import { pageMeta } from "@/lib/meta";
import { customerStories, planFinderHref } from "@/lib/site";

export const metadata = pageMeta(
  "Customer stories",
  "How factories, hotels, offices and malls across India pay less for power with Neufin, in numbers.",
  customerStories.href,
);

export default function CustomerStories() {
  return (
    <>
      <StripeHeader
        crumbs={[{ label: customerStories.label }]}
        // TODO: total saved, in crore, for the headline.
        title="₹X crore saved by 30+ businesses that switched"
        lead="From factories and hotels to offices and malls, businesses across India pay less for power with Neufin."
        actions={
          <Link href={planFinderHref} className="btn btn-accent">
            See plans and prices
          </Link>
        }
        photo={factoryFloorPhoto}
      />
      <Section id="stories" title="Stories by industry" narrowHead>
        <StoryList />
      </Section>
    </>
  );
}
