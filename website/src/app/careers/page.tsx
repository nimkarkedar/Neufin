import Link from "next/link";
import { Roles } from "@/components/careers/Roles";
import { Features, Gallery, LinkCards, Split, Steps } from "@/components/sections/Blocks";
import { HeroArt, PageHero, stripeCombos } from "@/components/sections/PageHero";
import { Placeholder } from "@/components/sections/Placeholder";
import { Section } from "@/components/sections/Section";
import { pageMeta } from "@/lib/meta";
import { about, careers, site } from "@/lib/site";
import styles from "./careers.module.css";

export const metadata = pageMeta(
  "Careers at Neufin Energy",
  "Join Neufin Energy in Bengaluru. Open roles in engineering, business development, commercial, trading, product, marketing and finance.",
  careers.href,
);

export default function Careers() {
  return (
    <>
      <PageHero
        crumbs={[{ label: careers.label }]}
        title="Help us run India’s biggest power build-out"
        lead="Our mission is to turn energy into an advantage for every business. We are a small team, and everyone runs something."
        actions={
          <Link href="#roles" className="btn btn-accent">
            See open roles
          </Link>
        }
        media={<HeroArt combo={stripeCombos.yellowOnViolet900} note="Photo: the team at work" icon="people" tone="dawn" />}
      />

      <Section id="like" tone="white" title="What it's actually like to work here">
        <Features
          items={[
            { icon: "people", title: "Work with people who care", text: "Sharp, curious and committed, and you learn fast from each other." },
            { icon: "target", title: "Own something real", text: "We are small enough that everyone runs something." },
            { icon: "rocket", title: "Learn fast", text: "Energy moves at market speed, so you ship more and learn faster than you would elsewhere." },
          ]}
        />
      </Section>

      <Section id="values" title="How we work">
        <Steps
          items={[
            { title: "Extreme ownership", text: "Own the outcome, with no excuses or blame." },
            { title: "Customer first", text: "Start with the customer, and question any work that adds nothing for them." },
            { title: "Find the fix", text: "Solve, negotiate or work around problems. Don't just report them." },
            { title: "Show respect", text: "Be honest, challenge ideas directly, and commit once we decide." },
          ]}
        />
      </Section>

      <Section id="life" tone="white" title="Life at Neufin">
        {/* TODO: team photos: office, outings, offsites. */}
        <Gallery notes={["the Bengaluru office", "a team outing", "the team", "an offsite"]} />
      </Section>

      <Section id="events" title="Where you'll find us">
        {/* TODO: real events with place and date. */}
        <LinkCards
          items={[1, 2, 3].map((i) => ({
            title: `Event name ${i}`,
            text: "Place · Date",
            href: careers.href,
            cover: { note: "Event photo", icon: "image" as const, tone: (i === 2 ? "dawn" : "daylight") as "dawn" | "daylight" },
            linkLabel: "See photos",
          }))}
        />
      </Section>

      <Section id="roles" tone="white" title="Open roles" lead="Most candidates hear back within a week.">
        <Roles />
      </Section>

      <Section id="why" tone="dark">
        <Split visual={<Placeholder note="Photo: Rushil and Rahool" icon="people" tone="violet" ratio="4 / 3" />}>
          <h2 className="text-h2">Why we started Neufin</h2>
          <div className={styles.letter}>
            <p>
              India is building more power than ever: 225 GW of new capacity between 2027 and 2029, on a grid that is being upgraded as it
              runs. There is no modern software to run any of it.
            </p>
            <p>
              We started Neufin because we believe the next decade of Indian energy will be won by teams that move at software speed
              across markets, rules and customers. If you want to build that, we would love to meet you.
            </p>
            <p className={styles.sign}>Rushil and Rahool, co-founders</p>
          </div>
        </Split>
      </Section>

      <Section id="hiring" title="How we hire" lead="We move fast. Most candidates hear back within a week.">
        <Steps
          items={[
            { title: "Screening call", text: "30 minutes with someone on the team." },
            { title: "Case study", text: "A real problem we have faced." },
            { title: "Deep dive", text: "Walk us through your work, and meet the people you'd work with." },
            { title: "Founders round", text: "A conversation with Rushil and Rahool about where you want to go." },
          ]}
        />
      </Section>

      <Section id="write" tone="white" title="Don't see your role? We still want to hear from you." lead="Tell us what you would build.">
        <div className={styles.write}>
          <a href={`mailto:${site.email}`} className="btn btn-primary">
            Write to us
          </a>
          <Link href={about.href} className="link-arrow">
            About Neufin
          </Link>
        </div>
      </Section>
    </>
  );
}
