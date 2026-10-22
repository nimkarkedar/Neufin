import Link from "next/link";
import { HeroArt, PageHero, stripeCombos } from "@/components/sections/PageHero";
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
      <PageHero
        crumbs={[{ label: customerStories.label }]}
        // TODO: total saved, in crore, for the headline.
        title="₹X crore saved by 30+ businesses that switched"
        lead="From factories and hotels to offices and malls, businesses across India pay less for power with Neufin."
        actions={
          <Link href={planFinderHref} className="btn btn-accent">
            See plans and prices
          </Link>
        }
        media={<HeroArt combo={stripeCombos.coralOnViolet900} note="Photo: a client's team at their site" icon="people" tone="dawn" />}
      />
      <Section id="stories" title="Stories by industry" narrowHead>
        <StoryList />
      </Section>
    </>
  );
}
