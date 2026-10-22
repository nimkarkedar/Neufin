import Link from "next/link";
import { Faq, Features, Stats, Steps } from "@/components/sections/Blocks";
import { LogoBar } from "@/components/sections/LogoBar";
import { HeroArt, PageHero, stripeCombos } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { customerLogos, supplierLogos } from "@/lib/logos";
import { pageMeta } from "@/lib/meta";
import { solutions } from "@/lib/site";

export const metadata = pageMeta(
  "Sell your power to businesses",
  "For power producers, solar and wind developers, EPCs and channel partners. Credit-checked business buyers across 16 states, one standard contract, under Neufin's trading licence.",
  solutions.sell.href,
);

// Testimonials from the wireframe wait for real quotes (agreed 2026-10-22).
export default function SellEnergy() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Solutions" }, { label: solutions.sell.label }]}
        title="Sell your power to businesses that need it"
        lead="For power producers, solar and wind developers, builders and channel partners. We bring credit-checked business buyers and sign under our own trading licence."
        actions={
          <Link href="/contact" className="btn btn-accent">
            Talk to us
          </Link>
        }
        media={<HeroArt combo={stripeCombos.yellowOnViolet} note="Photo: a solar or wind plant" icon="solar-panel" />}
      />

      <Section id="proof" tone="dark" title="Developers sell to businesses across India through Neufin">
        <Stats
          items={[
            { value: "30+", label: "suppliers" },
            { value: "4+ GW", label: "supply network" },
            { value: "16", label: "states" },
          ]}
        />
        <div style={{ marginTop: 48, display: "grid", gap: 28 }}>
          <LogoBar label="Our suppliers" logos={supplierLogos} />
          <LogoBar label="Our buyers" logos={customerLogos} />
        </div>
      </Section>

      <Section id="what-you-get" title="What you get with Neufin">
        <Features
          items={[
            { icon: "shield", title: "Credit-checked buyers", text: "Business buyers you would not reach alone, matched to your plant's output." },
            { icon: "handshake", title: "One partner", text: "One point of contact across all buyers, from contract to payments and compliance." },
            { icon: "clock", title: "Less work", text: "We handle approvals, meters and the rest. Nothing for you to follow up." },
          ]}
        />
      </Section>

      <Section id="ways" tone="white" title="Sell on your terms" link={{ label: "Talk to us", href: "/contact" }}>
        <Features
          items={[
            { icon: "calendar-check", title: "Long-term contract", text: "10 to 25 years. Best for new plants that need financing." },
            { icon: "calendar", title: "Short-term contract", text: "3 months to 5 years. Best for plants already running." },
            { icon: "chart", title: "Trade through us", text: "Flexible. Best for power you haven't sold yet." },
          ]}
        />
      </Section>

      <Section id="how" title="Your first buyer, then a better one">
        <Steps
          items={[
            { title: "Tell us about your plant, once" },
            { title: "We match you with buyers in our network" },
            { title: "Sign one standard contract with us" },
            { title: "We learn from each deal to get you a better one next time" },
          ]}
        />
      </Section>

      <Section id="faq" tone="white" title="Questions from suppliers" narrowHead>
        <Faq
          items={[
            { q: "How do you set the price?" },
            { q: "How do you find buyers?", a: "From our network of business buyers across 16 states. Every buyer is credit-checked." },
            { q: "Can I sell part of a plant?" },
            { q: "What do you charge?" },
          ]}
        />
      </Section>
    </>
  );
}
