import Link from "next/link";
import { Faq, Features, LinkCards, LogoRow, Steps, type Feature } from "@/components/sections/Blocks";
import { LogoBar } from "@/components/sections/LogoBar";
import { HeroArt, PageHero, stripeCombos } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { otherSolutions } from "@/lib/content";
import { customerLogos } from "@/lib/logos";
import { pageMeta } from "@/lib/meta";
import { services, solutions } from "@/lib/site";

export const metadata = pageMeta(
  "Meter, load and electricity board services",
  "Clean power (ABT) meters, meter installs and moves, load and maximum demand changes, clean power approvals and net metering, done for you in your state.",
  solutions.services.href,
);

// One line and an icon per service, in the order of the services list in site.ts.
const details: Omit<Feature, "title" | "link">[] = [
  { icon: "meter", text: "The two-way meters you need to buy clean power, tested and approved by your electricity board." },
  { icon: "bolt", text: "New smart meters supplied, installed and approved, so you can track use closely." },
  { icon: "map-pin", text: "Move your meter when your site layout changes." },
  { icon: "pen", text: "Update the name on your connection after a sale or merger." },
  { icon: "sliders", text: "Raise or lower your connected load." },
  { icon: "chart", text: "Match your maximum demand to your real use, and cut demand charges and penalties." },
  { icon: "stamp", text: "We file your clean power (open access) application and follow it up until it is approved." },
  { icon: "solar-panel", text: "Get net metering approved for your rooftop solar." },
];

export default function Services() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Solutions" }, { label: solutions.services.label }]}
        title="Site and electricity board work, done for you"
        lead="From clean power meters to board approvals, we do the site work and the paperwork. Open to businesses that don't buy power from us."
        actions={
          <>
            <Link href="/contact" className="btn btn-accent">
              Get a quote
            </Link>
            <Link href={solutions.buy.href} className="link-arrow">
              Or buy cheaper power
            </Link>
          </>
        }
        media={<HeroArt combo={stripeCombos.coralOnViolet900} note="Photo: a technician installing a meter" icon="wrench" />}
      />

      <Section tone="white">
        <LogoBar label="Customers" logos={customerLogos} />
        <div style={{ marginTop: 28 }}>
          {/* TODO: partner logos. */}
          <LogoRow label="Hardware partners" names={["Schneider", "urjamatters", "Ripple", "Polaris"]} />
        </div>
      </Section>

      <Section id="all" title="Every site and board job, in one place" lead="Pick a service to see what it needs and how long it takes in your state.">
        <Features
          items={services.map((s, i) => ({ ...details[i], title: s.label, link: { label: "Learn more", href: s.href } }))}
        />
      </Section>

      <Section id="how" tone="white" title="Three steps, with no chasing the board">
        <Steps
          items={[
            { title: "Send us your documents", text: "Your site details, connection number and the papers we ask for." },
            { title: "We do the work", text: "We supply and install the hardware, and file with your electricity board." },
            { title: "Tested and approved", text: "We test the hardware and confirm every approval before we hand over." },
          ]}
        />
      </Section>

      <Section id="faq" title="Questions about services" narrowHead>
        <Faq
          items={[
            { q: "Do I have to buy power from you?", a: "No. Our services are open to any business, on a quote." },
            { q: "Which states do you cover?" },
            { q: "How long does it take?" },
          ]}
        />
      </Section>

      <Section id="more" tone="white" title="Lower your power cost with Neufin">
        <LinkCards items={otherSolutions("services")} />
      </Section>
    </>
  );
}
