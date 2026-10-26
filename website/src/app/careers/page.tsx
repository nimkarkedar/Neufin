import Link from "next/link";
import type { StaticImageData } from "next/image";
import { IconSvg } from "@ds/components/Icon.jsx";
import { ScrollRow } from "@ds/components/ScrollRow.jsx";
import { icons } from "@ds/brand/icons.js";
// TODO: Neufin's own photos; Unsplash and library photos stand in (credits in the design system's photo list).
import expressway from "@ds/../public/assets/photos/expressway-night.jpg";
import founders from "@ds/../public/assets/photos/founders-rushil-rahool.jpg";
import teamCoding from "@ds/../public/assets/photos/careers-team-coding.jpg";
import windFarm from "@ds/../public/assets/photos/careers-wind-farm.jpg";
import pylonDusk from "@ds/../public/assets/photos/careers-pylon-dusk.jpg";
import artOwnership from "@ds/../public/assets/illustrations/value-ownership.png";
import artCustomer from "@ds/../public/assets/illustrations/value-customer.png";
import artSolution from "@ds/../public/assets/illustrations/value-solution.png";
import artRespect from "@ds/../public/assets/illustrations/value-respect.png";
import artCall from "@ds/../public/assets/illustrations/hire-call.png";
import artCase from "@ds/../public/assets/illustrations/hire-case.png";
import artDeepDive from "@ds/../public/assets/illustrations/hire-deep-dive.png";
import { Roles } from "@/components/careers/Roles";
import { Section } from "@/components/sections/Section";
import { StripeHeader } from "@/components/sections/StripeHeader";
import { ArtCard, PhotoCard, cardLayouts } from "@/components/sections/Cards";
import { pageMeta } from "@/lib/meta";
import { about, careers, site } from "@/lib/site";
import styles from "./careers.module.css";

export const metadata = pageMeta(
  "Careers at Neufin Energy",
  "Join Neufin Energy in Bengaluru. Open roles in engineering, business development, commercial, trading, product, marketing and finance.",
  careers.href,
);


// Titles and photos from Kedar (2026-10-26).
const like: { title: string; text: string; photo: StaticImageData; focus: string }[] = [
  { title: "Work with people who care", text: "Sharp, curious people who share what they know, so you learn fast.", photo: teamCoding, focus: "50% 40%" },
  { title: "Own something meaningful", text: "We are small, so you run work that changes what businesses pay for power.", photo: windFarm, focus: "45% 40%" },
  { title: "Move like energy in the grid", text: "Power markets change by the hour, so we decide quickly and ship often.", photo: pylonDusk, focus: "50% 35%" },
];

// Kedar's mock (2026-10-26): a spot illustration per value, copy as in the mock.
const values: { art: StaticImageData; title: string; text: string }[] = [
  { art: artOwnership, title: "Extreme ownership", text: "Own the outcome, with no excuses or blame." },
  { art: artCustomer, title: "Customer obsession", text: "Start with the customer, and make sure our work adds value." },
  { art: artSolution, title: "Have a solution mindset", text: "Solve or work around problems. Don't just report them." },
  { art: artRespect, title: "Show respect", text: "Be honest, challenge ideas directly, and commit once we decide." },
];

// TODO: team photos from Neufin: office, outings and offsites.
const life = ["the Bengaluru office", "a team outing", "the offsite", "lunch with the team", "a site visit"];

// TODO: real events: photo, place, event name and date.
const events = [1, 2, 3, 4].map((i) => ({ name: `Event name ${i}`, when: "Place · Month 2026" }));

// Icon-like spot illustrations from Kedar (2026-10-27; no people). TODO: the founders round one.
const hiring: { art?: StaticImageData; note?: string; title: string; text: string }[] = [
  { art: artCall, title: "Screening call", text: "30 minutes with someone on the team." },
  { art: artCase, title: "Case study", text: "A real problem we've actually faced." },
  { art: artDeepDive, title: "Deep-dive interview", text: "Walk us through your work. Meet the people you'd work with." },
  { note: "Illustration: founders round", title: "Founders round", text: "A conversation with Rushil and Rahool: vision, ambition, alignment." },
];

// Careers tells one story, fold by fold: the opportunity (header), why we exist (mission),
// why we started, what it's like, how we work, life at Neufin and where you'll find us, how
// we hire, the roles, and a last call to write in. It is built from the two shared cards
// (PhotoCard, ArtCard in components/sections/Cards), so every section reads as one family.
// Sections share the standard H2 head and sit on the Warm White page, except How we work
// (the one Violet 900 band) and Open roles (Violet 100). Rows of photo cards that don't fit
// scroll sideways; the hiring steps sit flat in one row, each with its step tag.

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
        focus="50% 0%"
        over
      />

      <section className={styles.mission} aria-label="Our mission">
        <div className="container">
          <p className={styles.missionText}>Our mission is to turn energy into a competitive advantage for every business.</p>
        </div>
      </section>

      <Section id="why" title="Why we started Neufin">
        <div className={styles.story}>
          <div className={styles.founders}>
            <PhotoCard photo={founders} focus="30% 50%" />
          </div>
          <div className={styles.letter}>
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
        <ul className={cardLayouts.three}>
          {like.map((l) => (
            <li key={l.title}>
              <PhotoCard {...l} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="values" tone="dark" title="How we work: our values">
        <ScrollRow label="How we work" controls={false} className={cardLayouts.four}>
          {values.map((v) => (
            <ArtCard key={v.title} {...v} centred />
          ))}
        </ScrollRow>
      </Section>

      <Section id="life" title="Life at Neufin">
        <ScrollRow label="Life at Neufin" className={cardLayouts.row}>
          {life.map((n) => (
            <PhotoCard key={n} note={`Photo: ${n}`} />
          ))}
        </ScrollRow>
      </Section>

      <Section id="events" title="On the ground. At the table.">
        <ScrollRow label="Events" className={cardLayouts.row}>
          {events.map((e) => (
            <PhotoCard key={e.name} note="Event photo" title={e.name} text={e.when} />
          ))}
        </ScrollRow>
      </Section>

      <Section id="hiring" title="Our hiring process" lead="We move fast. Most candidates hear back within a week.">
        <ScrollRow label="Hiring steps" controls={false} className={cardLayouts.four}>
          {hiring.map((h, i) => (
            <ArtCard key={h.title} {...h} step={i + 1} />
          ))}
        </ScrollRow>
      </Section>

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
