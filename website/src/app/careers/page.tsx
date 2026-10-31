import Link from "next/link";
import type { StaticImageData } from "next/image";
import { IconSvg } from "@ds/components/Icon.jsx";
import { ScrollRow } from "@ds/components/ScrollRow.jsx";
import { icons } from "@ds/brand/icons.js";
import expressway from "@ds/../public/assets/photos/expressway-night.jpg";
import founders from "@ds/../public/assets/photos/founders-rushil-rahool.jpg";
// Neufin's own photos (Kedar's Website folder, 2026-10-26), paired as on the current site.
import restaurant from "@/assets/photos/life/restaurant.jpg";
import office from "@/assets/photos/life/office.jpg";
import gokart from "@/assets/photos/life/gokart.jpg";
import life1 from "@/assets/photos/life/life-1.jpg";
import life2 from "@/assets/photos/life/life-2.jpg";
import life3 from "@/assets/photos/life/life-3.jpg";
import life5 from "@/assets/photos/life/life-5.jpg";
import cop28 from "@/assets/photos/events/cop28-dubai.jpg";
import cop29 from "@/assets/photos/events/cop29-baku.jpg";
import iitBombay from "@/assets/photos/events/iit-bombay.jpg";
import energyWeek from "@/assets/photos/events/india-energy-week-goa.jpg";
import mahindra from "@/assets/photos/events/mahindra-policy-paper.jpg";
import { Roles } from "@/components/careers/Roles";
import { PatternTiles, type PatternTile } from "@/components/sections/PatternTiles";
import { ProcessSteps, type ProcessStep } from "@/components/sections/ProcessSteps";
import { Section } from "@/components/sections/Section";
import { StripeHeader } from "@/components/sections/StripeHeader";
import { VerticalCard, cardLayouts } from "@/components/sections/Cards";
import { pageMeta } from "@/lib/meta";
import { about, careers, site } from "@/lib/site";
import styles from "./careers.module.css";

export const metadata = pageMeta(
  "Careers at Neufin Energy",
  "Join Neufin Energy in Bengaluru. Open roles in engineering, business development, commercial, trading, product, marketing and finance.",
  careers.href,
);


// Titles from Kedar (2026-10-26); the team's own photos, paired as on the current site.
const like: { title: string; text: string; photo: StaticImageData; focus: string }[] = [
  { title: "Work with people who care", text: "Sharp, curious people who share what they know, so you learn fast.", photo: restaurant, focus: "50% 35%" },
  { title: "Own something meaningful", text: "We are small, so your work changes what businesses pay for power.", photo: office, focus: "40% 50%" },
  { title: "Move like energy in the grid", text: "Power markets move by the hour, so we decide fast and ship often.", photo: gokart, focus: "50% 60%" },
];

// Copy from Kedar's mock (2026-10-26), as pattern tiles with a duo icon each.
const values: PatternTile[] = [
  { icon: "duo-flag", title: "Extreme ownership", text: "Own the outcome, with no excuses or blame." },
  { icon: "duo-user-heart", title: "Customer obsession", text: "Start with the customer, and make sure our work adds value." },
  { icon: "duo-puzzle", title: "Solution mindset", text: "Solve or work around problems. Don't just report them." },
  { icon: "duo-handshake", title: "Show respect", text: "Be honest, challenge ideas directly, and commit once we decide." },
];

// TODO: more from offsites and site visits as they come.
const life: { photo: StaticImageData; focus: string }[] = [
  { photo: life1, focus: "50% 50%" },
  { photo: life2, focus: "60% 50%" },
  { photo: life3, focus: "50% 60%" },
  { photo: life5, focus: "40% 50%" },
];

// Events, newest first, as on the current site.
const events: { name: string; when: string; photo: StaticImageData; focus: string }[] = [
  { name: "Policy paper launch with Mahindra", when: "Mahindra HQ, Mumbai · October 2025", photo: mahindra, focus: "50% 40%" },
  { name: "IIT Bombay keynote", when: "Energy and sustainability · February 2025", photo: iitBombay, focus: "40% 50%" },
  { name: "COP29", when: "UN climate conference, Baku · November 2024", photo: cop29, focus: "50% 50%" },
  { name: "India Energy Week", when: "Goa · February 2024", photo: energyWeek, focus: "50% 40%" },
  { name: "COP28", when: "UN climate conference, Dubai · December 2023", photo: cop28, focus: "50% 30%" },
];

// The hiring steps, as the shared process rows with a duo icon each.
const hiring: ProcessStep[] = [
  { icon: "duo-phone", title: "Screening call", text: "30 minutes with someone on the team." },
  { icon: "duo-clipboard", title: "Case study", text: "A real problem we've actually faced." },
  { icon: "duo-presentation", title: "Deep dive", text: "Walk us through your work. Meet the people you'd work with." },
  { icon: "duo-handshake", title: "Founders round", text: "A conversation with Rushil and Rahool: vision, ambition, alignment." },
];

// Careers tells one story, fold by fold: the opportunity (header), why we started (the founders' letter,
// opening with the mission), what it's like, how we work, life at Neufin and where you'll find us, how
// we hire, the roles, and a last call to write in. Every card is the shared
// VerticalCard (components/sections/Cards), photo or panel, so every section reads as one family.
// Sections share the standard H2 head and sit on the Warm White page, except How we work
// (the one Electric Violet band) and Open roles (Violet 100). Rows of photo cards that don't fit
// scroll sideways; the hiring steps are the shared process rows.

export default function Careers() {
  return (
    <>
      <StripeHeader
        crumbs={[{ label: careers.label }]}
        title="India’s energy decade. Your opportunity."
        lead="We are a small team in Bengaluru, and everyone runs something."
        actions={
          <>
            <Link href="#roles" className="btn btn-accent">
              View open roles
              <IconSvg icon={icons.arrow} size={20} />
            </Link>
            <Link href="#hiring" className="link-arrow">
              How we hire
            </Link>
          </>
        }
        photo={expressway}
        focus="50% 100%"
        tallPhone
        over
      />

      <Section id="why" title="Why we started Neufin">
        <div className={styles.story}>
          <div className={styles.founders}>
            <VerticalCard look="photo" image={founders} focus="30% 50%" />
          </div>
          <div className={styles.letter}>
            {/* The mission opens the letter (Kedar, 2026-10-27; it floated as a section of its own). */}
            <p className={styles.missionText}>Our mission is to turn energy into a competitive advantage for every business.</p>
            <p>
              India is in the middle of the largest energy build-out in human history: 225 GW of new power capacity between 2027 and
              2029, on a grid that is being upgraded and expanded in real time. And there is no modern software to run any of it.
            </p>
            <p>
              We started Neufin Energy because we believe the next decade of Indian energy will be won by teams who can move at software
              speed across markets, regulation and customer support.
            </p>
            <p>If you want to build that, at the speed it deserves, we’d love to meet you.</p>
            <p className={styles.sign}>
              Rushil and Rahool
              <span>Co-founders, Neufin Energy</span>
            </p>
          </div>
        </div>
      </Section>

      <Section id="like" title="What it’s actually like to work here">
        {/* Still cards, so the row itself takes focus for keyboard scrolling on phones. */}
        <ul className={cardLayouts.threeSwipe} aria-label="What it's like to work here" tabIndex={0}>
          {like.map((l) => (
            <li key={l.title}>
              <VerticalCard look="photo" image={l.photo} focus={l.focus} title={l.title} text={l.text} />
            </li>
          ))}
        </ul>
      </Section>

      {/* On the page, not a band: the tiles carry the colour. */}
      <Section id="values" title="How we work: our values">
        <PatternTiles items={values} swipe label="Our values" />
      </Section>

      <Section id="life" title="Life at Neufin">
        <ScrollRow label="Life at Neufin" className={cardLayouts.row}>
          {life.map((l) => (
            <VerticalCard key={l.photo.src} look="photo" image={l.photo} focus={l.focus} />
          ))}
        </ScrollRow>
      </Section>

      <Section id="events" title="On the ground. At the table.">
        <ScrollRow label="Events" className={cardLayouts.row}>
          {events.map((e) => (
            <VerticalCard key={e.name} look="photo" image={e.photo} focus={e.focus} title={e.name} text={e.when} />
          ))}
        </ScrollRow>
      </Section>

      <ProcessSteps id="hiring" title="Our hiring process" lead="We move fast. Most candidates hear back within a week." steps={hiring} link={{ label: "View open roles", href: "#roles" }} />

      <Section id="roles" tone="tint" title="Open roles">
        <Roles />
      </Section>

      <Section id="write" tone="white" title="Don’t see your role? We still want to hear from you." lead="Tell us what you would build.">
        <div className={styles.write}>
          <a href={`mailto:${site.email}?subject=${encodeURIComponent("What I would build at Neufin")}`} className="btn btn-primary">
            Write to us
            <IconSvg icon={icons.arrow} size={20} />
          </a>
          <Link href={about.href} className="link-arrow">
            About Neufin
          </Link>
        </div>
      </Section>
    </>
  );
}
