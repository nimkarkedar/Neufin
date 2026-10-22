import Link from "next/link";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { Hero } from "@/components/home/Hero";
import { Industries } from "@/components/home/Industries";
import { PlanFinder } from "@/components/home/PlanFinder";
import { Proof } from "@/components/home/Proof";
import { Checks, Faq, LinkCards, LogoRow, Split } from "@/components/sections/Blocks";
import { LogoBar } from "@/components/sections/LogoBar";
import { Placeholder } from "@/components/sections/Placeholder";
import { Section } from "@/components/sections/Section";
import { allSolutions, latest, resourcesLink } from "@/lib/content";
import { investorLogos } from "@/lib/logos";
import { customerStories, lumenModules, sellEnergyHref, solutions } from "@/lib/site";
import styles from "./home.module.css";

// Home page. The hero holds the page's h1. Order agreed from Kedar's wireframe:
// hero, customers, plan finder, why Neufin, what we do, Lumen, industries,
// investors and press, latest, FAQ. The footer contact card is the final step.

// Everything below the plan finder is hidden for now (Kedar, 2026-10-22): an empty page to think
// in. Set to true to bring the sections back as they were.
const showSections = false;

export default function Home() {
  return (
    <>
      <Hero />
      <div className={`container ${styles.logos}`}>
        <LogoBar label="Trusted by businesses, partners and investors across India" />
      </div>

      <Proof />
      <PlanFinder />

      {/* Clean empty space while the sections are hidden. */}
      {!showSections && <div aria-hidden="true" style={{ height: "70vh" }} />}

      {showSections && (
      <>

      <Section
        id="what-we-do"
        title="One partner for all your power"
        lead="Buyers come with different needs. Start with yours."
        link={{ label: "Selling power? Sell with Neufin", href: sellEnergyHref }}
      >
        <LinkCards items={allSolutions} columns={4} />
      </Section>

      <Section id="lumen" tone="dark">
        <Split
          visual={<Placeholder note="Product screen: Lumen across all your sites, bills and alerts" icon="chart" tone="violet" ratio="4 / 3" />}
        >
          <h2 className="text-h2">Lumen: pay less for the power you already use</h2>
          <p style={{ marginTop: 16, color: "var(--ink-2)", fontSize: "var(--text-body-l-size)" }}>
            Lumen tracks every site, bill and agreement, and acts when there&apos;s money to save.
          </p>
          <div style={{ marginTop: 28 }}>
            <Checks items={lumenModules.map((m) => m.label)} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 24px", alignItems: "center", marginTop: 32 }}>
            {/* TODO: link to the demo scheduling flow once it exists. */}
            <Link href="/contact" className="btn btn-secondary">
              Book a demo
            </Link>
            <Link href={solutions.run.href} className="link-arrow">
              About Lumen
              <IconSvg icon={icons.arrow} size={20} />
            </Link>
          </div>
        </Split>
      </Section>

      <Section
        id="industries"
        title="Built for how your business uses power"
        lead="Each industry uses power differently. See what we do for yours."
        link={{ label: "All customer stories", href: customerStories.href }}
      >
        <Industries />
      </Section>

      <Section id="backers" tone="white" title="Backed by leading investors" narrowHead>
        {/* TODO: press logos; the doc allows dropping press if there is none yet. */}
        <LogoBar label="Investors" logos={investorLogos} />
        <div style={{ marginTop: 32 }}>
          <LogoRow label="In the press" names={["Publication", "Publication", "Publication", "Publication"]} />
        </div>
      </Section>

      <Section id="latest" title="Latest from Neufin" link={resourcesLink}>
        <LinkCards items={latest} />
      </Section>

      <Section id="faq" tone="white" title="Questions businesses ask us" narrowHead>
        <Faq
          items={[
            { q: "How much do you charge?" },
            { q: "What is the smallest site you work with?", a: "Plans start from 0.5 MWp, for businesses on a high-tension (HT) connection." },
            { q: "Do you supply homes?", a: "No. We work with businesses: factories, hotels, offices, malls and retail chains." },
            { q: "Which states do you cover?", a: "We supply across 16 states. Pick yours in the plan finder above to see plans." },
          ]}
        />
      </Section>
      </>
      )}
    </>
  );
}
