import Link from "next/link";
import type { StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import { stripeEdgeClipPath } from "@ds/components/Stripe.jsx";
import { site } from "@/lib/site";
import styles from "./StripeHeader.module.css";

type Crumb = { label: string; href?: string };

// The design system's Stripe combinations (Graphic device page); a page without a photo
// fills the stepped block with one.
const stripeCombos = {
  yellowOnViolet900: { bg: "var(--violet-900)", fg: "var(--signal-yellow)" },
  yellowOnViolet: { bg: "var(--electric-violet)", fg: "var(--signal-yellow)" },
  blackOnCoral: { bg: "var(--electric-coral)", fg: "var(--near-black)" },
  coralOnViolet900: { bg: "var(--violet-900)", fg: "var(--electric-coral)" },
  violet800OnWhite: { bg: "var(--white)", fg: "var(--violet-800)" },
  warmWhiteOnViolet: { bg: "var(--electric-violet)", fg: "var(--warm-white)" },
  violetOnWarmWhite: { bg: "var(--warm-white)", fg: "var(--electric-violet)" },
} as const;

// The photo's top edge is the Stripe: high on the left, stepping down at the start of
// column 8 on desktop (--kink and --drop in StripeHeader.module.css).
const edge = stripeEdgeClipPath({ kinkX: "var(--kink)", drop: "var(--drop)" });

// Every page's breadcrumb goes out as BreadcrumbList structured data, shown or not.
function breadcrumbData(crumbs: Crumb[]) {
  const trail = [{ label: "Home", href: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.url}${c.href}` } : {}),
    })),
  };
}

// Inner page header (Kedar, 2026-10-26): the title, an optional line and actions, then a
// full-width photo whose top edge steps down along the Stripe, like the home hero panel and
// the footer. Much shorter than the home hero. The breadcrumb shows only on pages two levels
// deep or more (a top-level page's trail only repeats its title and the nav): the trail
// from tablets up, a link back to the parent on phones. Without a photo the stepped block
// takes a Stripe colour combination.
export function StripeHeader({
  crumbs,
  title,
  lead,
  actions,
  photo,
  focus = "50% 50%",
  focusPhone,
  tallPhone,
  combo = stripeCombos.violetOnWarmWhite,
  over = false,
}: {
  // The text on the photo in White (Contact, Careers, About; Kedar, 2026-10-26). Needs a dark photo.
  over?: boolean;
  crumbs: Crumb[];
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  photo?: StaticImageData;
  focus?: string;
  // Phones show a narrow slice of the photo: which part (object-position), if not `focus`.
  focusPhone?: string;
  // Phones: the photo 40% taller than the box, cut at the top (Contact's bright horizon).
  tallPhone?: boolean;
  combo?: { bg: string; fg: string };
}) {
  const trail = [{ label: "Home", href: "/" }, ...crumbs];
  const deep = crumbs.length > 1;
  // The nearest page above this one that has a link (Home at least).
  const parent = trail.slice(0, -1).reverse().find((c) => c.href)!;

  const picture = photo && (
    <>
      <img src={photo.src} alt="" style={{ "--focus": focus, "--focus-phone": focusPhone } as CSSProperties} />
      {/* The design system's Violet wash, as on the home page's photos. */}
      <span className={styles.wash} />
    </>
  );

  return (
    <section className={styles.header} data-over={over || undefined} data-tall-phone={(over && tallPhone) || undefined}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData(crumbs)) }} />
      {over && (
        <div className={styles.backdrop} style={{ clipPath: edge, background: photo ? undefined : combo.fg }} aria-hidden="true">
          {picture}
          {/* An even Violet 900 layer, so White text reads; the photo must be dark. */}
          <span className={styles.shade} />
        </div>
      )}
      <div className={`container ${styles.head}`}>
        {deep && (
          <>
            <nav aria-label="Breadcrumb" className={styles.trail}>
              <ol className={styles.crumbs}>
                {trail.map((c, i) => (
                  <li key={c.label}>
                    {c.href && i < trail.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current={i === trail.length - 1 ? "page" : undefined}>{c.label}</span>}
                  </li>
                ))}
              </ol>
            </nav>
            <Link href={parent.href!} className={styles.back}>
              <IconSvg icon={icons.arrow} size={20} />
              {parent.label}
            </Link>
          </>
        )}
        <h1 className={styles.title}>{title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      {!over && (
        <div className={styles.photo} style={{ clipPath: edge, background: photo ? undefined : combo.fg }} aria-hidden="true">
          {picture}
        </div>
      )}
    </section>
  );
}
