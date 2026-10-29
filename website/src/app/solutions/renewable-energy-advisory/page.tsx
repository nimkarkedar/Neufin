import Link from "next/link";
import { DuoIcon } from "@ds/components/DuoIcon.jsx";
import { IconSvg } from "@ds/components/Icon.jsx";
import { ScrollRow } from "@ds/components/ScrollRow.jsx";
import { icons } from "@ds/brand/icons.js";
// TODO: Neufin's own photos; library photos stand in.
import windFarm from "@ds/../public/assets/photos/careers-wind-farm.jpg";
import transformerCrew from "@ds/../public/assets/photos/transformer-crew.jpg";
import { ContactReach } from "@/components/contact/ContactReach";
import { HowWeDoIt } from "@/components/home/HowWeDoIt";
// The industries block's panel (text left, photo right), reused for the suppliers.
import panel from "@/components/home/Industries.module.css";
import boxes from "@/components/sections/Boxes.module.css";
import { VerticalCard, cardLayouts, type VerticalCardProps } from "@/components/sections/Cards";
import { FaqSection } from "@/components/sections/FaqSection";
import { IconGrid, type IconGridItem } from "@/components/sections/IconGrid";
import { Section } from "@/components/sections/Section";
import { StripeHeader } from "@/components/sections/StripeHeader";
import { posts, publicationsLink } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { contactLink, planFinderHref, publications, solutions, type IconName } from "@/lib/site";
import { stories, storyCard } from "@/lib/stories";

export const metadata = pageMeta(
  "Renewable energy advisory",
  "An energy transition plan for your business: we plan, carry out and help you meet your clean energy targets, for your sites and your suppliers, across 16 states.",
  solutions.advisory.href,
);

// Renewable energy advisory, in the brief's order (the "Neufin website structure" doc,
// Solutions: Renewable energy advisory). Laid out so no two neighbouring sections share a
// pattern (Kedar, 2026-10-27, after "cards everywhere"; agreed on a block wireframe): photo
// header, the problems in the icon grid, the one-partner statement and services in two
// boxes on a White band, the suppliers in the industries panel on the Violet 900 band, the
// one card row (stories), the publications as the site's post cards on White, the FAQ, the shared solution
// cards, and the call-back close with the advisory lead (the footer card is hidden here).
// TODO: brief rows 4 and 7 to add (not in the screenshots Kedar sent).

// What stalls a business's targets: the brief's four problems with Kedar's edits
// (2026-10-27), in the shared icon grid, four across from desktop.
const problems: IconGridItem[] = [
  { icon: "duo-location", title: "Regulations change by state", text: "Open access, banking and green tariffs differ in each state." },
  { icon: "duo-scale", title: "Contracts and offerings are hard to compare", text: "Each comes with a different price, term and structure." },
  { icon: "duo-shield", title: "Contracts hide risk", text: "Clauses on curtailment, banking and exit can cost you later." },
  // The brief's "~75%" in words. TODO: Neufin to confirm the figure and its source.
  { icon: "duo-people", title: "Suppliers drive most emissions", text: "About 75% of your footprint sits with your suppliers." },
];

// What Neufin does for a business's own sites, as title-only rows with the brief's titles
// (Kedar: too much text; the titles say enough). Only the two with a page of their own carry
// a link (Energy plans: View prices; existing sources: Lumen).
const services: { icon: IconName; title: string; link?: { label: string; href: string } }[] = [
  { icon: "duo-check", title: "Detailed facilities audits" },
  { icon: "duo-bolt", title: "Energy plans for all your sites", link: { label: "View prices", href: planFinderHref } },
  { icon: "duo-coins", title: "Own vs lease" },
  { icon: "duo-meter", title: "Optimise existing sources", link: { label: "See Lumen", href: solutions.run.href } },
  { icon: "duo-leaf", title: "Green tariff" },
];

// Help for a business's suppliers: the brief's three, as points beside one photo.
const suppliers: { icon: IconName; title: string }[] = [
  { icon: "duo-people", title: "Bring suppliers on board" },
  { icon: "duo-nodes", title: "Group small suppliers" },
  { icon: "duo-contract", title: "Structure their contracts" },
];

// The publications as the site's post cards (as on About and Buy cheaper power).
// TODO: the IES report's cover and link once it is on Sanity.
const reads: VerticalCardProps[] = [posts.handbook, posts.energyStack, { title: "IES report", tag: "Report", href: publications.href }];

export default function Advisory() {
  return (
    <>
      <StripeHeader
        crumbs={[{ label: "Solutions" }, { label: solutions.advisory.label }]}
        title="Get an actionable energy transition plan for your business"
        lead="We plan, carry out and help you meet your clean energy targets, for your sites and your suppliers."
        // A plain button to Contact, as on Sell energy (Kedar, 2026-10-27: no email field).
        actions={
          <Link href={contactLink.href} className="btn btn-accent">
            Talk to us
            <IconSvg icon={icons.arrow} size={20} />
          </Link>
        }
        photo={windFarm}
        focus="50% 62%"
        over
      />

      <Section id="problems" title="Making an energy roadmap is hard, we know">
        <IconGrid items={problems} columns={4} swipe label="What makes a roadmap hard" />
      </Section>

      <Section id="your-sites" tone="white" title="One partner on your path to 100% clean energy">
        <div className={boxes.boxes}>
          {/* One claim in the home numbers block's statement style, and the button. */}
          <div className={`surface ${boxes.about}`}>
            <p className="statement">One team plans and runs your switch, in 16 states</p>
            <Link href={contactLink.href} className="btn btn-primary">
              Talk to us
              <IconSvg icon={icons.arrow} size={20} />
            </Link>
          </div>
          <ul className={`surface ${boxes.rows}`}>
            {services.map((s) => (
              <li key={s.title} className={boxes.row}>
                <DuoIcon name={s.icon} hero />
                <span className={`${boxes.rowText} ${boxes.rowTitle}`}>{s.title}</span>
                {s.link && (
                  <span className={boxes.rowEnd}>
                    <Link href={s.link.href} className="link-arrow">
                      {s.link.label}
                      <IconSvg icon={icons.arrow} size={20} />
                    </Link>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="suppliers" tone="dark" title="Help your suppliers switch to clean energy">
        <div className={`surface ${panel.panel}`}>
          <div className={panel.text}>
            <h3 className={boxes.cardTitle}>Most of your emissions sit with them</h3>
            {/* The same points as the services rows above: icon in its circle and a title. */}
            <ul className={`${boxes.points} ${boxes.pointsLead}`}>
              {suppliers.map((s) => (
                <li key={s.title}>
                  <DuoIcon name={s.icon} hero />
                  <span className={boxes.rowTitle}>{s.title}</span>
                </li>
              ))}
            </ul>
            <div className={panel.foot}>
              <Link href={contactLink.href} className="btn btn-primary">
                Talk to us
                <IconSvg icon={icons.arrow} size={20} />
              </Link>
            </div>
          </div>
          <img src={transformerCrew.src} alt="Engineers at a transformer on a site" className={panel.photo} style={{ objectPosition: "50% 30%", contain: "size" }} />
        </div>
      </Section>

      <Section id="work" title="Trusted by large enterprises" link={{ label: "All customer stories", href: "/customer-stories" }}>
        {/* The page's one card row: the same cards as Customer stories and Buy cheaper power. */}
        <ScrollRow label="Customer stories" className={cardLayouts.row}>
          {stories.slice(0, 4).map((s, i) => (
            <VerticalCard key={i} {...storyCard(s)} />
          ))}
        </ScrollRow>
      </Section>

      <Section id="research" tone="white" title="Neu from Neufin Energy" link={publicationsLink}>
        <ul className={cardLayouts.threeSwipe}>
          {reads.map((r) => (
            <li key={r.title}>
              <VerticalCard {...r} />
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

      {/* The brief's close: Talk to us, call our team, a named advisory lead. The footer's
          contact card is hidden on this page (FooterContactRow).
          TODO: "30%" is one of the savings figures Neufin must settle; the advisory lead. */}
      <Section id="talk" tone="white" title="Why wait? Buy 30% cheaper energy starting today">
        <ContactReach short topic="your energy transition plan" leadRole="Advisory lead" />
      </Section>
    </>
  );
}
