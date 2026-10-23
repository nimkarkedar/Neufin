import Link from "next/link";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { Hero } from "@/components/home/Hero";
import { Industries } from "@/components/home/Industries";
import { Lumen } from "@/components/home/Lumen";
import { PlanFinder } from "@/components/home/PlanFinder";
import { Proof } from "@/components/home/Proof";
import { Faq, LinkCards } from "@/components/sections/Blocks";
import { LogoBar } from "@/components/sections/LogoBar";
import { Section } from "@/components/sections/Section";
import { otherSolutions } from "@/lib/content";
import { contactLink } from "@/lib/site";
import styles from "./home.module.css";

// Home page. The hero holds the page's h1. Order: hero, customer logos, numbers, plan
// finder with the other solutions, industries, Lumen, FAQ. The footer contact card is
// the final step.

// Every band on the page flat on the Warm White page for now (Kedar, 2026-10-23: to see
// the page and think), except the hero's violet panel and the footer's contact card.
// Set to false to bring back the Dawn, Daylight and White bands and the top fade.
const plainBackgrounds = true;

export default function Home() {
  return (
    <div className={plainBackgrounds ? styles.plain : undefined}>
      <Hero />
      <div className={`container ${styles.logos}`}>
        <LogoBar label="Trusted by businesses, partners and investors across India" />
      </div>

      <Proof />
      <PlanFinder>
        {/* After the price, how Neufin delivers it: the other three solutions. */}
        <div className={styles.next}>
          <h2 className={styles.nextTitle}>How we keep your price low</h2>
          <LinkCards items={otherSolutions("buy")} />
        </div>
      </PlanFinder>

      <Section id="industries" title="Built for how your business uses energy">
        <Industries />
      </Section>

      <Lumen />

      {/* FAQs: two columns on desktop, the title (and a way to ask more) on the page
          background on the left, the questions in a White box on the right. */}
      <section id="faq" className={styles.faqSection} aria-labelledby="faq-title">
        <div className={`container ${styles.faq}`}>
          <div className={styles.faqSide}>
            <h2 id="faq-title" className={styles.faqTitle}>
              Questions businesses ask us
            </h2>
            <Link href={contactLink.href} className="link-arrow">
              Ask us something else
              <IconSvg icon={icons.arrow} size={20} />
            </Link>
          </div>
          {/* TODO: Neufin to answer the open questions and confirm the rest. */}
          <div className={`surface surface-flat ${styles.faqBox}`}>
            <Faq
              items={[
                { q: "How much can my business save?", a: "Businesses pay up to 40% less per unit than their electricity board rate. See your own price in the plan finder above." },
                { q: "What is the smallest site you work with?", a: "Plans start from 0.5 MWp, for businesses on a high-tension (HT) connection." },
                { q: "Which states do you cover?", a: "We supply across 16 states. Pick yours in the plan finder above to see plans." },
                { q: "How long does it take to switch?", a: "About 3 months from signing to the first unit of clean power, depending on your state's approvals." },
                { q: "Do I need a new meter?", a: "Clean power needs a two-way (ABT) meter. If you don't have one, we supply, install and get it approved." },
                { q: "What happens if the plant makes less power than planned?" },
                { q: "How much do you charge?" },
                { q: "Do you supply homes?", a: "No. We work with businesses: factories, hotels, offices, malls and retail chains." },
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
