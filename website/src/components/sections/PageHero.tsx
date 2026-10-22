import Link from "next/link";
import type { ReactNode } from "react";
import { Stripe } from "@ds/components/Stripe.jsx";
import { site } from "@/lib/site";
import { Placeholder, type IconName, type PlaceholderTone } from "./Placeholder";
import styles from "./PageHero.module.css";

export type Crumb = { label: string; href?: string };

// Inner page hero: breadcrumb, h1, one line, actions; the brand art on the right.
// The breadcrumb also goes out as BreadcrumbList structured data.
export function PageHero({
  crumbs,
  title,
  lead,
  actions,
  media,
}: {
  crumbs: Crumb[];
  title: ReactNode;
  lead: ReactNode;
  actions?: ReactNode;
  media?: ReactNode;
}) {
  const trail = [{ label: "Home", href: "/" }, ...crumbs];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.url}${c.href}` } : {}),
    })),
  };

  return (
    <section className={styles.hero}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={`container ${styles.inner}`} data-media={media ? true : undefined}>
        <div className={styles.text}>
          <nav aria-label="Breadcrumb">
            <ol className={styles.crumbs}>
              {trail.map((c, i) => (
                <li key={c.label}>
                  {c.href && i < trail.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current={i === trail.length - 1 ? "page" : undefined}>{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.lead}>{lead}</p>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
        {media && <div className={styles.media}>{media}</div>}
      </div>
    </section>
  );
}

// The design system's Stripe combinations (Graphic device page), one per page.
export const stripeCombos = {
  yellowOnViolet900: { bg: "var(--violet-900)", fg: "var(--signal-yellow)" },
  yellowOnViolet: { bg: "var(--electric-violet)", fg: "var(--signal-yellow)" },
  blackOnCoral: { bg: "var(--electric-coral)", fg: "var(--near-black)" },
  coralOnViolet900: { bg: "var(--violet-900)", fg: "var(--electric-coral)" },
  violet800OnWhite: { bg: "var(--white)", fg: "var(--violet-800)" },
  warmWhiteOnViolet: { bg: "var(--electric-violet)", fg: "var(--warm-white)" },
  violetOnWarmWhite: { bg: "var(--warm-white)", fg: "var(--electric-violet)" },
} as const;

// Hero art: the page's one Stripe, bleeding off both sides of a rounded block, with
// the photo or screen placeholder sitting over it.
export function HeroArt({
  combo,
  note,
  icon = "image",
  tone = "daylight",
}: {
  combo: { bg: string; fg: string };
  note: string;
  icon?: IconName;
  tone?: PlaceholderTone;
}) {
  return (
    <div className={styles.art} style={{ background: combo.bg }}>
      <div className={styles.stripe}>
        <Stripe width={800} height={600} y={150} thickness={120} kinkX={170} drop={250} color={combo.fg} />
      </div>
      <Placeholder note={note} icon={icon} tone={tone} className={styles.artPhoto} />
    </div>
  );
}
