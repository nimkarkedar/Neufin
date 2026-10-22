import Link from "next/link";
import { ModuleTabs } from "@/components/lumen/ModuleTabs";
import { Faq, LinkCards, Steps } from "@/components/sections/Blocks";
import { LogoBar } from "@/components/sections/LogoBar";
import { HeroArt, PageHero, stripeCombos } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { otherSolutions } from "@/lib/content";
import { customerLogos } from "@/lib/logos";
import { pageMeta } from "@/lib/meta";
import { industries, solutions } from "@/lib/site";

export const metadata = pageMeta(
  "Lumen: run and optimise your power",
  "Lumen is Neufin's software. It checks every bill, tracks solar and batteries, holds suppliers to your contract and runs every source at the cheapest time.",
  solutions.run.href,
);

// Lumen × industry pages, picked from the doc's first set.
const lumenIndustries = ["Hotels and resorts", "Auto", "Offices and coworking", "Retail chains"];

export default function RunAndOptimise() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Solutions" }, { label: solutions.run.label }]}
        title="Pay less for the power you already use"
        lead="Lumen is our software. It tracks every site, bill and agreement, and acts when there's money to save."
        actions={
          <>
            {/* TODO: link to the demo scheduling flow once it exists. */}
            <Link href="/contact" className="btn btn-accent">
              Book a demo
            </Link>
            <Link href="#how" className="link-arrow">
              See how it works
            </Link>
          </>
        }
        media={<HeroArt combo={stripeCombos.warmWhiteOnViolet} note="Product screen: Lumen with every site, bill and alert" icon="chart" tone="dawn" />}
      />

      <Section tone="white">
        <LogoBar label="Used by" logos={customerLogos} />
      </Section>

      <Section id="modules" tone="dark" title="Four ways Lumen cuts your power cost" lead="Pick one to see it in Lumen.">
        <ModuleTabs />
      </Section>

      <Section id="industries" title="What Lumen does for your industry" lead="Each industry loses money in different places. Lumen is set up for yours.">
        {/* TODO: three solution points, client logos and a figure per industry. */}
        <LinkCards
          columns={4}
          items={lumenIndustries.map((name) => ({
            title: name,
            text: `What Lumen tracks and fixes for ${name.toLowerCase()}, in one line.`,
            href: industries.find((i) => i.label === name)?.href ?? "/",
            cover: { note: `Photo: a ${name.toLowerCase()} site`, icon: "image" as const, tone: "daylight" as const },
            meta: [{ value: "X%", label: "lower power cost" }],
            linkLabel: `Lumen for ${name.toLowerCase()}`,
          }))}
        />
      </Section>

      <Section id="how" tone="white" title="Up and running in three steps">
        <Steps
          items={[
            { title: "Connect your sites", text: "Meters, solar inverters and your electricity board accounts link to Lumen.", visual: { note: "Diagram: meters, inverters and board portals flowing into Lumen", icon: "nodes", tone: "violet" } },
            { title: "See where money leaks", text: "Lumen flags wrong bills, idle panels and broken contract terms.", visual: { note: "Screen: leak alerts", icon: "magnifier", tone: "dawn" } },
            { title: "Act on it", text: "Fix it in Lumen, or we fix it for you, and watch the saving add up.", visual: { note: "Screen: actions and savings", icon: "coins", tone: "daylight" } },
          ]}
        />
      </Section>

      <Section id="faq" title="Questions about Lumen" narrowHead>
        <Faq
          items={[
            { q: "What do you need to set it up?", a: "Your list of sites, the account numbers on your power bills, and access to your meters and solar inverters." },
            { q: "Do I need new meters?" },
            { q: "Which electricity boards can Lumen fetch bills from?" },
            { q: "Can Lumen track my rooftop solar?" },
            { q: "How much does Lumen cost?" },
            { q: "Is my data safe?" },
          ]}
        />
      </Section>

      <Section id="more" tone="white" title="More ways to cut your power cost">
        <LinkCards items={otherSolutions("run")} />
      </Section>
    </>
  );
}
