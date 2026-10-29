import Link from "next/link";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { StripeHeader } from "@/components/sections/StripeHeader";
// TODO: Neufin's own photo; a library photo stands in.
import millPhoto from "@ds/../public/assets/photos/spinning-mill.jpg";
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
        title="₹X crore saved. 30+ businesses already switched."
        lead="From factories and hotels to offices and malls, Indian businesses pay less for energy with Neufin Energy."
        actions={
          <Link href={planFinderHref} className="btn btn-accent">
            See plans and prices
            <IconSvg icon={icons.arrow} size={20} />
          </Link>
        }
        photo={millPhoto}
        focus="50% 40%"
        over
      />
      <Section id="stories" title="Stories by industry" narrowHead>
        <StoryList />
      </Section>
    </>
  );
}
