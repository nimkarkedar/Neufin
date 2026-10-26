import { ScrollRow } from "@ds/components/ScrollRow.jsx";
// TODO: Neufin's own photo; a library photo stands in (credit in the design system's photo list).
import pylonMist from "@ds/../public/assets/photos/pylon-mist-delhi.jpg";
import { Proof } from "@/components/home/Proof";
import { VerticalCard, cardLayouts } from "@/components/sections/Cards";
import { LogoBar } from "@/components/sections/LogoBar";
import { Section } from "@/components/sections/Section";
import { StripeHeader } from "@/components/sections/StripeHeader";
import { investorLogos, supplierLogos } from "@/lib/logos";
import { angels, team } from "@/lib/people";
import { pageMeta } from "@/lib/meta";
import { posts } from "@/lib/content";
import { about, blogs } from "@/lib/site";
import styles from "./about.module.css";

export const metadata = pageMeta(
  "About Neufin Energy",
  "Neufin Energy helps businesses buy, run and track power. Founded in 2024 in Bengaluru by Rahool Gadkari and Rushil Noronha. Licensed to trade power across India.",
  about.href,
);

// About tells Neufin's story in the brief's order (the "Neufin website structure" doc,
// About), with the same finish as Careers and the home page: the text-on-photo header, the
// standard H2 head, the shared vertical cards, the home page's numbers block as it is,
// then the footer's contact card as the last step, as on
// the home page.

// TODO: press coverage: publication, headline, date and link.
const press = [1, 2, 3].map(() => ({ outlet: "Publication", headline: "Headline of the article about Neufin", date: "Month 2026" }));

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

export default function About() {
  return (
    <>
      <StripeHeader
        crumbs={[{ label: about.label }]}
        title="Powering the future of business"
        lead="Our mission is to turn energy into a competitive advantage for every business."
        photo={pylonMist}
        focus="50% 75%"
        over
      />

      {/* The brief's story paragraph in plain words, read as one story (Kedar, 2026-10-27).
          The founders' sentence leads The people behind Neufin below. */}
      <Section id="story" title="Our story">
        <div className={styles.story}>
          <p className={styles.storyText}>
            We launched Neufin Energy in September 2024 to make energy work for businesses. Data centres, factories and fast-growing
            industry have sharply raised India’s appetite for power. Markets and technology have moved on, but most businesses still
            can’t buy and sell power at the market’s speed. Our software closes that gap, so businesses of every size choose how and
            when they buy power.
          </p>
        </div>
      </Section>

      <Proof fade={false} />

      <Section
        id="team"
        title="The people behind Neufin"
        lead="Founded in Bengaluru by childhood friends Rahool Gadkari and Rushil Noronha, who have built and grown businesses from the ground up."
      >
        <ScrollRow label="The team" className={cardLayouts.row}>
          {team.map((p) => (
            <VerticalCard key={p.name} look="photo" image={p.photo} focus={p.focus} title={p.name} text={p.role} href={p.linkedin} label="on LinkedIn" />
          ))}
        </ScrollRow>
      </Section>

      <Section id="investors" tone="white" title="Backed by leading investors">
        <LogoBar label="Institutional investors" logos={investorLogos} />
        {/* Angels by name and company, never by company logo alone (Neufin, 2026-10-27). */}
        <div className={styles.angels}>
          <p className={styles.groupLabel}>Angel investors</p>
          <ul className={styles.angelList}>
            {angels.map((a) => (
              <li key={a.name} className={styles.angel}>
                <span className="avatar">{a.photo ? <img src={a.photo.src} alt="" /> : initials(a.name)}</span>
                <span>
                  <span className={styles.angelName}>{a.name}</span>
                  <span className={styles.angelRole}>{a.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="partners" title="Partners and press">
        <LogoBar label="Power suppliers" logos={supplierLogos} />
        <div className={styles.press}>
          <p className={styles.groupLabel}>In the press</p>
          <ul className={`surface ${styles.pressList}`}>
            {press.map((p, i) => (
              <li key={i} className={styles.pressItem}>
                <div>
                  <span className="tag">{p.outlet}</span>
                  <p className={styles.pressTitle}>{p.headline}</p>
                  <p className={styles.pressMeta}>{p.date}</p>
                </div>
                {/* TODO: link to the article. */}
                <a href="#partners" className="link-arrow">
                  Read the article
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="latest" title="Neu from Neufin Energy" link={{ label: "All posts", href: blogs.href }}>
        <ul className={cardLayouts.three}>
          {[posts.story, posts.preSeed, posts.greentrade].map((p) => (
            <li key={p.title}>
              <VerticalCard {...p} />
            </li>
          ))}
        </ul>
      </Section>

    </>
  );
}
