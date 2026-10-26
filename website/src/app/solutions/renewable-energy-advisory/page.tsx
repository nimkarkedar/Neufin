import { ScrollRow } from "@ds/components/ScrollRow.jsx";
// TODO: Neufin's own photos; library photos stand in.
import windFarm from "@ds/../public/assets/photos/careers-wind-farm.jpg";
import transformerCrew from "@ds/../public/assets/photos/transformer-crew.jpg";
import solarPanels from "@ds/../public/assets/photos/solar.jpg";
import factoryFloor from "@ds/../public/assets/photos/factory-floor.jpg";
import engineersAtScreen from "@ds/../public/assets/photos/engineers-at-screen.jpg";
import windHills from "@ds/../public/assets/photos/wind-hills.jpg";
import { HowWeDoIt } from "@/components/home/HowWeDoIt";
import { VerticalCard, cardLayouts } from "@/components/sections/Cards";
import { EmailAction } from "@/components/sections/EmailAction";
import { FaqSection } from "@/components/sections/FaqSection";
import { Section } from "@/components/sections/Section";
import { StripeHeader } from "@/components/sections/StripeHeader";
import { posts, publicationsLink } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { planFinderHref, publications, solutions } from "@/lib/site";
import { stories, storyCard } from "@/lib/stories";

export const metadata = pageMeta(
  "Renewable energy advisory",
  "An energy transition plan for your business: we plan, carry out and help you meet your clean energy targets, for your sites and your suppliers, across 16 states.",
  solutions.advisory.href,
);

// Renewable energy advisory, in the brief's order (the "Neufin website structure" doc,
// Solutions: Renewable energy advisory), with the finish of Buy cheaper power and Run and
// optimise: the text-on-photo header, the shared vertical cards (photo and panel), the story cards, the
// shared FAQ and solution cards, and the footer's contact card as the last step (the
// brief's final call to action, "Why wait? …", is that card's heading).
// TODO: brief rows 4 and 7 to add (not in the screenshots Kedar sent).

// What stalls a business's targets, as panel cards. TODO: an illustration per card from Kedar.
const problems = [
  { title: "Rules vary by state", text: "Open access, banking and green tariffs differ in each state." },
  { title: "Offers differ", text: "Each comes with a different price, term and structure." },
  { title: "Contracts hide risk", text: "Clauses on curtailment, banking and exit can cost you later." },
  { title: "Supplier emissions", text: "About 75% of your footprint sits with your suppliers." },
];

// What Neufin does for the sites a business runs, as photo cards in a sideways row. The two
// that have a page of their own link to it (energy plans to the prices, as the brief asks).
const ownSites = [
  { title: "Detailed site audits", text: "A technical and regulatory audit of every site, against current rules.", image: transformerCrew, focus: "50% 30%" },
  { title: "Energy plans", text: "A range of plans to fit each site's needs.", image: solarPanels, href: planFinderHref },
  { title: "Own or lease", text: "Financial models that fit your budget.", image: factoryFloor, focus: "15% 50%" },
  { title: "Use what you have", text: "Raise your clean energy share from the sources you already run.", image: engineersAtScreen, href: solutions.run.href },
  { title: "Green tariff", text: "Switch to your electricity board's green tariff. We handle the filing.", image: windHills },
];

// Help for a business's suppliers, as panel cards. TODO: an illustration per card from Kedar.
const suppliers = [
  { title: "Sign suppliers up", text: "We reach out, explain and bring them on board." },
  { title: "Pool demand", text: "Plans that pool small suppliers' demand for better prices." },
  { title: "Fair contracts", text: "Power contract terms that work for small suppliers." },
];

export default function Advisory() {
  return (
    <>
      <StripeHeader
        crumbs={[{ label: "Solutions" }, { label: solutions.advisory.label }]}
        title="Get an actionable energy transition plan for your business"
        lead="We plan, carry out and help you meet your clean energy targets, for your sites and your suppliers."
        actions={<EmailAction label="Talk to us" />}
        photo={windFarm}
        focus="50% 62%"
        over
      />

      <Section id="problems" title="Making an energy roadmap is hard, we know">
        <ScrollRow label="What stalls clean energy targets" className={cardLayouts.row}>
          {problems.map((p) => (
            <VerticalCard key={p.title} title={p.title} text={p.text} />
          ))}
        </ScrollRow>
      </Section>

      <Section id="your-sites" title="One partner on your path to 100% clean energy">
        <ScrollRow label="What we do for your sites" className={cardLayouts.row}>
          {ownSites.map((s) => (
            <VerticalCard key={s.title} look="photo" {...s} />
          ))}
        </ScrollRow>
      </Section>

      <Section id="suppliers" tone="dark" title="Help your suppliers switch to clean energy" lead="Most of your emissions sit with them.">
        <ul className={cardLayouts.three}>
          {suppliers.map((s) => (
            <li key={s.title}>
              <VerticalCard title={s.title} text={s.text} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="work" title="Trusted by large enterprises" link={{ label: "All customer stories", href: "/customer-stories" }}>
        {/* The same cards as the Customer stories page and Buy cheaper power. */}
        <ScrollRow label="Customer stories" className={cardLayouts.row}>
          {stories.slice(0, 4).map((s, i) => (
            <VerticalCard key={i} {...storyCard(s)} />
          ))}
        </ScrollRow>
      </Section>

      <Section id="research" title="Neu from Neufin Energy" link={publicationsLink}>
        {/* TODO: the IES report and state analysis papers once they are on Sanity. */}
        <ul className={cardLayouts.three}>
          {[posts.handbook, posts.energyStack, { title: "IES report", href: publications.href, tag: "Report" }].map((p) => (
            <li key={p.title}>
              <VerticalCard {...p} />
            </li>
          ))}
        </ul>
      </Section>

      {/* TODO: Neufin to answer the open questions. */}
      <FaqSection
        title="Questions about advisory"
        items={[
          { q: "How much does a clean energy plan cost?" },
          { q: "How long does it take?" },
          { q: "Do we have to buy energy through Neufin?" },
          { q: "Which states do you cover?", a: "We work across 16 states." },
          { q: "How do you track progress against our targets?" },
        ]}
      />

      <HowWeDoIt title="Already have a plan? Let us carry it out" exclude="advisory" />
    </>
  );
}
