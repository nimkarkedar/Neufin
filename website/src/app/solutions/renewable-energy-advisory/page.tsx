import Link from "next/link";
import { Checks, Faq, Features, LinkCards, Split, Steps, Table } from "@/components/sections/Blocks";
import { EmailAction } from "@/components/sections/EmailAction";
import { HeroArt, PageHero, stripeCombos } from "@/components/sections/PageHero";
import { Placeholder } from "@/components/sections/Placeholder";
import { Section } from "@/components/sections/Section";
import { otherSolutions, publicationsLink } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { customerStories, planFinderHref, publications, solutions } from "@/lib/site";

export const metadata = pageMeta(
  "Renewable energy advisory",
  "A clear, costed plan to move your sites and your suppliers to clean power, across 16 states. We plan it, carry it out and track it.",
  solutions.advisory.href,
);

export default function Advisory() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Solutions" }, { label: solutions.advisory.label }]}
        title="Get a clear plan to move your business to clean power"
        lead="We plan, carry out and track your move to clean power, for your sites and your suppliers."
        actions={
          <>
            <EmailAction label="Talk to us" />
            <Link href={publications.href} className="link-arrow">
              Read our publications
            </Link>
          </>
        }
        media={<HeroArt combo={stripeCombos.blackOnCoral} note="Illustration: a roadmap from today to 100% clean power" icon="route" tone="dawn" />}
      />

      <Section id="problem" tone="white" title="Making a clean power plan is hard" lead="Targets are set at the top. The detail sits in every site and every supplier.">
        <Features
          columns={4}
          items={[
            { icon: "map-pin", title: "Rules change by state", text: "Open access, banking and green tariffs differ in each state." },
            { icon: "scale", title: "Options are hard to compare", text: "Each comes with a different price, term and structure." },
            { icon: "contract", title: "Contracts hide risk", text: "Clauses on curtailment, banking and exit can cost you later." },
            { icon: "truck", title: "Suppliers drive most emissions", text: "About 75% of your footprint sits with your suppliers." },
          ]}
        />
      </Section>

      <Section id="your-sites" title="One partner for your path to 100% clean power" lead="For every site you run, from the first audit to power flowing.">
        <Features
          items={[
            { icon: "magnifier", title: "Site audits", text: "A technical and regulatory audit across all your sites, against the latest rules." },
            { icon: "bolt", title: "Energy plans for every site", text: "A plan to fit each site's load, state and budget.", link: { label: "See plans and prices", href: planFinderHref } },
            { icon: "coins", title: "Own or lease", text: "Financial models that fit your budget." },
            { icon: "meter", title: "Get more from what you have", text: "Raise your clean power share from the sources you already run.", link: { label: "About Lumen", href: solutions.run.href } },
            { icon: "leaf", title: "Green tariff", text: "Switch to your electricity board's green tariff. We do everything from filing to checking." },
          ]}
        />
      </Section>

      <Section id="what-fits" tone="white" title="Which source fits which site" lead="The right mix for each site's load, state and budget.">
        <Table
          caption="Which power source fits which kind of site"
          head={["Site", "For example", "Best fit", "Contract length"]}
          rows={[
            ["Runs by day", "Plants, offices", "Solar", "1 to 15 years"],
            ["Runs round the clock", "Hotels, plants that never stop", "Wind, or solar and wind", "1 to 15 years"],
            ["High use in the evening", "Malls, retail chains", "Solar with battery", "3 to 15 years"],
            ["Short or changing needs", "Seasonal or new sites", "Daily market power", "From 30 days"],
          ]}
        />
      </Section>

      <Section id="suppliers" tone="dark">
        <Split visual={<Placeholder note="Diagram: you, your main suppliers, and one shared energy plan" icon="nodes" tone="violet" ratio="4 / 3" />}>
          <h2 className="text-h2">Help your suppliers switch to clean power</h2>
          <p style={{ marginTop: 16, color: "var(--ink-2)", fontSize: "var(--text-body-l-size)" }}>Most of your emissions sit with them. We help them go clean.</p>
          <div style={{ marginTop: 28 }}>
            <Checks items={["We reach out, explain and sign them up", "We pool small suppliers for better prices", "We write contracts that work for small suppliers"]} />
          </div>
        </Split>
      </Section>

      <Section id="work" title="Work we've done for large businesses" link={{ label: "All customer stories", href: customerStories.href }}>
        {/* TODO: real stories and figures. */}
        <LinkCards
          columns={4}
          items={[
            { title: "Story headline", href: customerStories.href, tag: "Client name", meta: [{ value: "X%", label: "clean power share" }, { value: "N", label: "sites" }], linkLabel: "Read story" },
            { title: "Story headline", href: customerStories.href, tag: "Client name", meta: [{ value: "X%", label: "clean power share" }, { value: "N", label: "suppliers switched" }], linkLabel: "Read story" },
            { title: "Story headline", href: customerStories.href, tag: "Client name", meta: [{ value: "₹X Cr", label: "saved" }, { value: "N", label: "states" }], linkLabel: "Read story" },
            { title: "Story headline", href: customerStories.href, tag: "Client name", meta: [{ value: "X%", label: "result" }], linkLabel: "Read story" },
          ].map((c, i) => ({ ...c, title: `${c.title} ${i + 1}`, cover: { note: "Client logo on a site photo", icon: "image" as const, tone: (i % 2 ? "dawn" : "daylight") as "dawn" | "daylight" } }))}
        />
      </Section>

      <Section id="how" tone="white" title="From study to supply">
        {/* TODO: Neufin to confirm what each stage covers and how long it takes. */}
        <Steps
          items={[
            { title: "Scope", text: "We agree the sites, the targets and the timeline." },
            { title: "Study", text: "We audit your sites, bills, contracts and suppliers." },
            { title: "Plan", text: "A roadmap with sources, cost and timing for each site." },
            { title: "Carry out", text: "We sign, supply and track progress against your targets." },
          ]}
        />
      </Section>

      <Section id="research" title="Research from Neufin" link={publicationsLink}>
        <LinkCards
          items={[
            { title: "IES report", text: "Our research report.", href: "/publications/ies-report", tag: "Report", cover: { note: "Report cover", icon: "file", tone: "violet" }, linkLabel: "Get the report" },
            { title: "Renewable energy handbook", text: "A plain guide to buying clean power.", href: "/publications/renewable-energy-handbook", tag: "Guide", cover: { note: "Handbook cover", icon: "book", tone: "dawn" }, linkLabel: "Get the handbook" },
            { title: "State analysis title", text: "A policy paper on one state's rules.", href: publications.href, tag: "Policy paper", cover: { note: "Paper cover", icon: "map", tone: "daylight" }, linkLabel: "Read" },
          ]}
        />
      </Section>

      <Section id="faq" tone="white" title="Questions about advisory" narrowHead>
        <Faq
          items={[
            { q: "How much does a clean power plan cost?" },
            { q: "How long does it take?" },
            { q: "Do we have to buy power through Neufin?" },
            { q: "Which states do you cover?", a: "We work across 16 states." },
            { q: "How do you track progress against our targets?" },
          ]}
        />
      </Section>

      <Section id="more" title="Already have a plan? We can carry it out">
        <LinkCards items={otherSolutions("advisory")} />
      </Section>
    </>
  );
}
