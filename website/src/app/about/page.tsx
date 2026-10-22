import Link from "next/link";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { LinkCards, LogoRow, People, Split, Stats } from "@/components/sections/Blocks";
import { HeroArt, PageHero, stripeCombos } from "@/components/sections/PageHero";
import { Placeholder } from "@/components/sections/Placeholder";
import { LogoBar } from "@/components/sections/LogoBar";
import { Section } from "@/components/sections/Section";
import { financeLogos, investorLogos, supplierLogos } from "@/lib/logos";
import { numbers } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { about, blogs, careers, planFinderHref } from "@/lib/site";
import styles from "./about.module.css";

export const metadata = pageMeta(
  "About Neufin Energy",
  "Neufin Energy helps businesses buy, run and track power. Founded in 2024 in Bengaluru by Rahool Gadkari and Rushil Noronha. Licensed to trade power across India.",
  about.href,
);

export default function About() {
  return (
    <>
      <PageHero
        crumbs={[{ label: about.label }]}
        title="Powering the future of business"
        lead="Our mission is to turn energy into an advantage for every business."
        actions={
          <>
            <Link href={planFinderHref} className="btn btn-accent">
              See plans and prices
            </Link>
            <Link href={careers.href} className="link-arrow">
              Or join the team
            </Link>
          </>
        }
        media={<HeroArt combo={stripeCombos.warmWhiteOnViolet} note="Photo: the team at the Bengaluru office" icon="people" tone="dawn" />}
      />

      <Section id="story" tone="white">
        <Split visual={<Placeholder note="Photo: Rahool and Rushil" icon="people" tone="dawn" ratio="4 / 3" />}>
          <h2 className="text-h2">Our story</h2>
          <div className={styles.prose}>
            <p>
              We started Neufin Energy in September 2024 to make energy work for businesses. Data centres, factories and fast-growing
              cities have sharply raised India&apos;s demand for power, and the market needs a rethink.
            </p>
            <p>
              Markets and technology have moved on, but businesses haven&apos;t had the tools to buy and sell power at the speed of the
              market. Our software closes that gap and gives businesses of every size real choice.
            </p>
            <p>
              Neufin Energy is based in Bengaluru. It was founded by childhood friends Rahool Gadkari and Rushil Noronha, who have built
              and grown businesses from the ground up.
            </p>
          </div>
        </Split>
      </Section>

      <Section id="numbers" title="Neufin in numbers" narrowHead>
        <Stats items={[...numbers.slice(0, 4), { value: "30+", label: "suppliers" }, { value: "4+ GW", label: "supply network" }]} />
      </Section>

      <Section id="team" tone="white" title="The people behind Neufin">
        {/* TODO: names, roles, photos and LinkedIn links for the team. */}
        <People
          items={[
            { name: "Rahool Gadkari", role: "Co-founder", href: "#" },
            { name: "Rushil Noronha", role: "Co-founder", href: "#" },
            ...Array.from({ length: 6 }, () => ({ name: "Name", role: "Role", href: "#" })),
          ]}
        />
      </Section>

      <Section id="investors" title="Backed by leading investors" narrowHead>
        <LogoBar logos={investorLogos} />
        <ul className={styles.angels}>
          {Array.from({ length: 3 }, (_, i) => (
            <li key={i}>
              <strong>Name</strong> Founder, Company
            </li>
          ))}
        </ul>
      </Section>

      <Section id="licence" tone="dark">
        <div className={styles.licence}>
          <span className={styles.licenceIcon}>
            <IconSvg icon={icons.certificate} size={32} />
          </span>
          <div>
            <h2 className="text-h2">Licensed to trade power</h2>
            <p className={styles.licenceText}>
              We hold an inter-state power trading licence (Category V) from the Central Electricity Regulatory Commission. We sign and
              supply under our own licence.
            </p>
            {/* TODO: link to the licence PDF. */}
            <Link href="/documents/power-trading-licence" className="link-arrow">
              View the licence
              <IconSvg icon={icons.arrow} size={20} />
            </Link>
          </div>
        </div>
      </Section>

      <Section id="partners" tone="white" title="Partners and press" narrowHead>
        <div className={styles.logoGroups}>
          <LogoBar label="Power suppliers" logos={supplierLogos} />
          <LogoBar label="Finance partners" logos={financeLogos} />
          {/* TODO: press logos. */}
          <LogoRow label="In the press" names={["Publication", "Publication", "Publication"]} />
        </div>
      </Section>

      <Section id="latest" title="Latest from Neufin" link={{ label: "All posts", href: blogs.href }}>
        {/* TODO: company posts from the blog. */}
        <LinkCards
          items={[
            { title: "Why we started Neufin", href: blogs.href, tag: "Company", cover: { note: "Cover image", icon: "news", tone: "dawn" }, linkLabel: "Read" },
            { title: "Funding news", href: blogs.href, tag: "News", cover: { note: "Cover image", icon: "news", tone: "violet" }, linkLabel: "Read" },
            { title: "A new partnership", href: blogs.href, tag: "News", cover: { note: "Cover image", icon: "news", tone: "daylight" }, linkLabel: "Read" },
          ]}
        />
      </Section>
    </>
  );
}
