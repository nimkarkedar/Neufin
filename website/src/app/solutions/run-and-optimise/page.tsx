import Link from "next/link";
import { DuoIcon } from "@ds/components/DuoIcon.jsx";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
// TODO: Neufin's own photo; a library photo stands in.
import teamCoding from "@ds/../public/assets/photos/careers-team-coding.jpg";
import { HowWeDoIt } from "@/components/home/HowWeDoIt";
import { Industries } from "@/components/home/Industries";
import { LumenFlow } from "@/components/lumen/LumenFlow";
import { LumenScreen } from "@/components/lumen/LumenScreen";
import { Split } from "@/components/sections/Blocks";
import { FaqSection } from "@/components/sections/FaqSection";
import { LogoBar } from "@/components/sections/LogoBar";
import { Section } from "@/components/sections/Section";
import { StripeHeader } from "@/components/sections/StripeHeader";
import { customerLogos } from "@/lib/logos";
import { pageMeta } from "@/lib/meta";
import { lumenModules, solutions } from "@/lib/site";
import styles from "./run.module.css";

export const metadata = pageMeta(
  "Lumen: run and optimise your energy",
  "Lumen is Neufin's software. It improves solar and battery output, holds suppliers to your contract, runs every source at the cheapest time and checks every bill.",
  solutions.run.href,
);

// Run and optimise, in the brief's order (the "Neufin website structure" doc, Solutions:
// Run and optimise my energy), with the finish of the other pages: the text-on-photo
// header, the logo bar, the standard H2 head, the home page's industries block on the
// page's one Violet 900 band, the shared FAQ and solution cards, and the footer's contact
// card as the last step.

// TODO: link to the demo scheduling flow once it exists.
const demoHref = "/contact";

// The four modules, in the brief's order, with its lines. Names are the nav's plain names
// (site.ts). Each row: the module on one side, its Lumen screen on the other, alternating
// (the client's Ramp reference). Lumen's screens are drawn in the design system
// (`LumenScreen`), each one the card itself. Figures in them are illustrative.
const modules = [
  {
    ...lumenModules[1],
    line: "Get more energy from your solar and batteries. Lumen tracks output and maintenance, and spots faults early.",
    screen: "assets" as const,
    alt: "Lumen screen for a 1 MWp rooftop solar site: 3,850 kWh today against 4,200 kWh expected, 8% below, with two fixes, the next cleaning and optimisers, and the energy each adds.",
  },
  {
    ...lumenModules[2],
    line: "Lumen checks that your power contract's terms are kept, and helps you recover money when they are broken.",
    screen: "contract" as const,
    alt: "Lumen screen for a 2 MW solar power contract: the price is kept, the units are 22,000 kWh short.",
  },
  {
    ...lumenModules[3],
    line: "Lumen schedules your grid, solar, wind, diesel and batteries, and buys from the exchange when it is cheaper.",
    screen: "switching" as const,
    alt: "Lumen screen of today's exchange price: Lumen buys from 11am to 2pm, when the exchange is at ₹3.20 a unit against the grid's ₹7.50.",
  },
  {
    ...lumenModules[0],
    line: "Lumen fetches and checks every bill at every site, so you pay only for what you used, with no penalties or hidden charges.",
    screen: "bills" as const,
    alt: "Lumen screen: bills, smart meters and sensors feed one list of sites, each with its mix of sources and price per unit.",
  },
];


export default function RunAndOptimise() {
  return (
    <>
      <StripeHeader
        crumbs={[{ label: "Products" }, { label: solutions.run.label }]}
        title="Generate more. Pay less."
        lead="Software that improves generation and finds hidden opportunities to save on energy cost."
        actions={
          <Link href={demoHref} className="btn btn-accent">
            Book a demo
            <IconSvg icon={icons.arrow} size={20} />
          </Link>
        }
        photo={teamCoding}
        focus="50% 55%"
        over
      />

      <LogoBar label="Used by businesses across India" logos={customerLogos} underHeader />

      <Section id="modules" title="Four ways Lumen cuts your energy cost">
        <div className={styles.modules}>
          {modules.map((m, i) => (
            <Split
              key={m.href}
              flip={i % 2 === 1}
              visual={<LumenScreen kind={m.screen} label={m.alt} />}
            >
              <DuoIcon name={m.icon} hero />
              <h3 className={styles.moduleName}>{m.label}</h3>
              <p className={styles.moduleLine}>{m.line}</p>
              {/* TODO: the Lumen module pages don't exist yet. */}
              <Link href={m.href} className="link-arrow">
                More on {m.label.toLowerCase()}
                <IconSvg icon={icons.arrow} size={20} />
              </Link>
            </Split>
          ))}
        </div>
      </Section>

      <Section id="industries" tone="dark" title="See what Lumen can do for your industry">
        <Industries lumen />
      </Section>

      <Section id="how" title="Up and running in three steps">
        <LumenFlow />
      </Section>

      {/* TODO: Neufin to answer the open questions. */}
      <FaqSection
        title="Questions about Lumen"
        items={[
          { q: "What do you need for setup?", a: "Your list of sites, the account numbers on your power bills, and access to your meters and solar inverters." },
          { q: "Do I need new meters?" },
          { q: "Which electricity boards can you fetch bills from?" },
          { q: "Can you track my rooftop solar?" },
          { q: "How much does Lumen cost?" },
          { q: "Is my data safe?" },
        ]}
      />

      <HowWeDoIt title="More ways to cut your energy cost" exclude="run" />
    </>
  );
}
