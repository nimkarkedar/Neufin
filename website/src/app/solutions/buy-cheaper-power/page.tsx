import Link from "next/link";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { PlanFinder } from "@/components/sections/PlanFinder";
import { Checks, Faq, Features, LinkCards, Steps, Table } from "@/components/sections/Blocks";
import { HeroArt, PageHero, stripeCombos } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { latest, otherSolutions, resourcesLink } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { customerStories, planFinderHref, solutions, tariffCalculator } from "@/lib/site";

export const metadata = pageMeta(
  "Buy cheaper power for your business",
  "Energy plans from solar, wind, battery and the power market, from 30 days to 15 years and from 0.5 MWp. Pay up to 40% less per unit than your electricity board.",
  solutions.buy.href,
);

export default function BuyCheaperPower() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Solutions" }, { label: solutions.buy.label }]}
        title="Cut your power bill by up to 40%"
        lead="Pick your contract length, source and size. We find the plan, sign it and get power flowing in about 3 months."
        actions={
          <>
            <Link href={planFinderHref} className="btn btn-accent">
              See plans and prices
              <IconSvg icon={icons.arrow} size={20} />
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Get a quote
            </Link>
            <Link href={tariffCalculator.href} className="link-arrow">
              Or try the savings calculator
            </Link>
          </>
        }
        media={<HeroArt combo={stripeCombos.yellowOnViolet900} note="Photo: a solar plant at a factory, with a live price card" icon="sun" />}
      />

      <Section
        id="plans"
        tone="white"
        title="Energy plans that fit how you use power"
        lead="An energy plan is a contract to buy power from a chosen source, at a set price, for a set term."
      >
        <Checks
          items={[
            "Plans from 0.5 MWp",
            "Contracts from 30 days to 15 years",
            "Lowest prices, through bulk buying",
            "Standard terms, agreed in advance",
          ]}
        />
        <div style={{ marginTop: 40 }}>
          <Features
            columns={4}
            items={[
              { icon: "sun", title: "Solar", text: "Fixed-price daytime power. Best for plants and offices that run by day." },
              { icon: "wind", title: "Wind", text: "Power that runs into the evening and night. Best for sites that run round the clock." },
              { icon: "battery", title: "Battery", text: "Solar stored for your evening peak. Best for sites with high evening use." },
              { icon: "chart", title: "Daily market power", text: "Bought each day with no lock-in. Best for short or changing needs." },
            ]}
          />
        </div>
      </Section>

      <PlanFinder />

      <Section
        id="stories"
        tone="white"
        title="Businesses like yours, paying less"
        lead="Each industry uses power differently. Here is what we did for a few."
        link={{ label: "All customer stories", href: customerStories.href }}
      >
        {/* TODO: real stories, figures and client logos. */}
        <LinkCards
          columns={4}
          items={["Auto", "Hotels and resorts", "Offices and coworking", "Real estate and malls"].map((ind) => ({
            title: ind,
            text: `One line on what we did for a ${ind.toLowerCase()} client.`,
            href: customerStories.href,
            tag: "Client name",
            cover: { note: `Photo: a ${ind.toLowerCase()} site`, icon: "image" as const, tone: "daylight" as const },
            meta: [
              { value: "X%", label: "lower cost" },
              { value: "₹N L", label: "saved a year" },
            ],
            linkLabel: "Read story",
          }))}
        />
      </Section>

      <Section
        id="on-your-own"
        title="Buying clean power on your own is slow and rigid"
        lead="With Neufin it takes about 3 months, at a price you choose."
      >
        <Table
          caption="Buying on your own compared with buying through Neufin"
          head={["", "On your own", "With Neufin"]}
          highlight={2}
          rows={[
            ["Price", "High prices that change by generator", "Lowest price, through bulk buying"],
            ["Lock-in", "Long term, from 3 to 15 years", "Your choice, from 30 days to 15 years"],
            ["Terms", "New terms in every quote", "Standard terms, agreed in advance"],
            ["Time to start", "6 to 9 months", "About 3 months"],
            ["Smallest size", "From 1.5 MWp", "From 0.5 MWp"],
          ]}
        />
      </Section>

      <Section id="how" tone="white" title="From your bill to cheaper power">
        <Steps
          items={[
            { title: "Share your power bills", visual: { note: "Screen: uploading a bill", icon: "upload", tone: "violet" } },
            { title: "Get a quote within 48 hours", visual: { note: "Screen: your quote", icon: "file-check", tone: "violet" } },
            { title: "Pick the plan we recommend and sign a standard agreement", visual: { note: "Screen: the agreement", icon: "contract", tone: "violet" } },
            { title: "Power starts in as little as 30 days", text: "Depending on the plan you pick.", visual: { note: "Screen: supply is live", icon: "bolt", tone: "daylight" } },
          ]}
        />
      </Section>

      <Section id="latest" title="Latest from Neufin" link={resourcesLink}>
        <LinkCards items={latest} />
      </Section>

      <Section id="faq" tone="white" title="Questions about buying power" narrowHead>
        <Faq
          items={[
            { q: "Is there a minimum load?", a: "Plans start from 0.5 MWp, for businesses on a high-tension (HT) connection." },
            { q: "What if my load changes?" },
            { q: "What if I have more than one site?", a: "One contract can cover sites across states. We supply in 16 states." },
            { q: "What do you charge?" },
          ]}
        />
      </Section>

      <Section id="more" title="More ways to cut your power cost">
        <LinkCards items={otherSolutions("buy")} />
      </Section>
    </>
  );
}
