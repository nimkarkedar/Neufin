import { Hero } from "@/components/home/Hero";
import { HowWeDoIt } from "@/components/home/HowWeDoIt";
import { Industries } from "@/components/home/Industries";
import { PlanFinder } from "@/components/sections/PlanFinder";
import { Proof } from "@/components/home/Proof";
import { FaqSection } from "@/components/sections/FaqSection";
import { LogoBar } from "@/components/sections/LogoBar";
import { Section } from "@/components/sections/Section";
import styles from "./home.module.css";

// Home page, in order: the photo hero (the page's h1), customer logos, numbers, plan
// finder, how we keep your price low, industries, FAQ. The footer contact card is
// the final step. The page's top is Violet 100, fading to Warm White behind the numbers
// block (Proof). The header is see-through over the hero photo (data-header="overlay").
// No card motion (Kedar: irritating): data-calm turns off the cards' hover lift.
export default function Home() {
  return (
    <div className={styles.plain} data-header="overlay" data-calm>
      <Hero />

      <div className={`container ${styles.logos}`}>
        <LogoBar label="Trusted by businesses, partners and investors across India" />
      </div>

      <Proof />
      <PlanFinder />

      <HowWeDoIt />

      <Section id="industries" title="Built for how your business uses power" tone="dark">
        <Industries />
      </Section>

      {/* TODO: Neufin to answer the open questions and confirm the rest. */}
      <FaqSection
        title="Questions businesses ask us"
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
  );
}
