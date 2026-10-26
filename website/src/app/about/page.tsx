import Link from "next/link";
import { IconSvg } from "@ds/components/Icon.jsx";
import { ScrollRow } from "@ds/components/ScrollRow.jsx";
import { RingStamp } from "@ds/components/Stamp.jsx";
import { icons } from "@ds/brand/icons.js";
// TODO: Neufin's own photo; a library photo stands in (credit in the design system's photo list).
import pylonMist from "@ds/../public/assets/photos/pylon-mist-delhi.jpg";
import cerc from "@/assets/cerc.svg";
import { Proof } from "@/components/home/Proof";
import { LogoMark } from "@/components/sections/Blocks";
import { ArtCard, PhotoCard, cardLayouts } from "@/components/sections/Cards";
import { LogoBar } from "@/components/sections/LogoBar";
import { Section } from "@/components/sections/Section";
import { StripeHeader } from "@/components/sections/StripeHeader";
import { investorLogos, supplierLogos } from "@/lib/logos";
import { pageMeta } from "@/lib/meta";
import { about, blogs } from "@/lib/site";
import styles from "./about.module.css";

export const metadata = pageMeta(
  "About Neufin Energy",
  "Neufin Energy helps businesses buy, run and track power. Founded in 2024 in Bengaluru by Rahool Gadkari and Rushil Noronha. Licensed to trade power across India.",
  about.href,
);

// About tells Neufin's story in the brief's order (the "Neufin website structure" doc,
// About), with the same finish as Careers and the home page: the text-on-photo header, the
// standard H2 head, the shared photo and art cards, the home page's numbers block as it is,
// one Violet 900 band (the licence), then the footer's contact card as the last step, as on
// the home page.

// Our story, told in three beats from the brief's paragraph. TODO: Kedar's spot illustrations.
const story = [
  {
    title: "Demand for power is soaring",
    text: "Data centres, factories and fast-growing industry have sharply raised India’s appetite for energy.",
    note: "Illustration: demand rising",
  },
  {
    title: "Businesses can’t keep up",
    text: "Markets and technology have moved on, but businesses still can’t buy and sell power at the market’s speed.",
    note: "Illustration: a gap opening",
  },
  {
    title: "Our software closes the gap",
    text: "We give businesses of every size the choice of how and when they buy power.",
    note: "Illustration: bands meeting",
  },
];

// TODO: the team: a portrait, name, role and LinkedIn link for each person.
const team: { name: string; role: string; linkedin?: string }[] = [
  { name: "Rahool Gadkari", role: "Co-founder" },
  { name: "Rushil Noronha", role: "Co-founder" },
  ...Array.from({ length: 4 }, () => ({ name: "Name", role: "Role" })),
];

// TODO: Neufin to confirm which investors are funds and which logos are angels' companies,
// and to name each angel and their role.
const angelCompanies = ["McKinsey & Company", "Groww", "Jupiter", "Practo", "Urban Ladder"];
const funds = investorLogos.filter((l) => !angelCompanies.includes(l.name));
const angels = investorLogos.filter((l) => angelCompanies.includes(l.name));

// TODO: press coverage: publication, headline, date and link.
const press = [1, 2, 3].map(() => ({ outlet: "Publication", headline: "Headline of the article about Neufin", date: "Month 2026" }));

// TODO: company posts from the blog (Sanity).
const posts = [
  { title: "Why we started Neufin", text: "Company · Month 2026", note: "Cover image" },
  { title: "Funding news", text: "News · Month 2026", note: "Cover image" },
  { title: "A new partnership", text: "News · Month 2026", note: "Cover image" },
];

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

      <Section id="story" title="Our story" lead="We launched Neufin Energy in September 2024 to make energy work for businesses.">
        <ul className={cardLayouts.three}>
          {story.map((s) => (
            <li key={s.title}>
              <ArtCard {...s} />
            </li>
          ))}
        </ul>
      </Section>

      <Proof fade={false} />

      <Section
        id="team"
        title="The people behind Neufin"
        lead="Founded in Bengaluru by childhood friends Rahool Gadkari and Rushil Noronha, who have built and grown businesses from the ground up."
      >
        <ScrollRow label="The team" className={cardLayouts.row}>
          {team.map((p, i) => (
            <PhotoCard key={i} note="Portrait" title={p.name} text={p.role} href={p.linkedin} cta="LinkedIn" />
          ))}
        </ScrollRow>
      </Section>

      <Section id="investors" tone="white" title="Backed by leading investors">
        <LogoBar label="Funds" logos={funds} />
        <div className={styles.angels}>
          <p className={styles.groupLabel}>Angel investors</p>
          <ul className={`surface ${styles.angelGrid}`}>
            {angels.map((a) => (
              <li key={a.name} className={styles.angel}>
                <LogoMark logo={a} />
                <p>
                  <span className={styles.angelName}>Name</span>
                  <span className={styles.angelRole}>Role, {a.name}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="licence" tone="dark" title="Licensed to trade energy">
        <div className={`surface ${styles.licence}`}>
          <div className={styles.licenceBody}>
            <p className={styles.licenceLead}>
              We hold an inter-state power trading licence from the Central Electricity Regulatory Commission, so we sign and supply
              under our own licence.
            </p>
            <dl className={styles.facts}>
              <div>
                <dt>Issued by</dt>
                <dd>Central Electricity Regulatory Commission (CERC)</dd>
              </div>
              <div>
                <dt>Licence</dt>
                <dd>Inter-state trading, Category V</dd>
              </div>
              {/* TODO: licence number and validity from the licence document. */}
              <div>
                <dt>Licence number</dt>
                <dd>To come</dd>
              </div>
              <div>
                <dt>Valid until</dt>
                <dd>To come</dd>
              </div>
            </dl>
            {/* TODO: link to the licence PDF. */}
            <Link href="/documents/power-trading-licence" className="link-arrow">
              View the licence
              <IconSvg icon={icons.arrow} size={20} />
            </Link>
          </div>
          <div className={styles.seal} aria-hidden="true">
            <span className={styles.sealPos}>
              <RingStamp text="Licensed by CERC · Inter-state trading · Category V · " size={320}>
                <img src={cerc.src} alt="" className={styles.emblem} />
              </RingStamp>
            </span>
          </div>
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
          {posts.map((p) => (
            <li key={p.title}>
              <PhotoCard {...p} href={blogs.href} cta="Read the post" />
            </li>
          ))}
        </ul>
      </Section>

    </>
  );
}
