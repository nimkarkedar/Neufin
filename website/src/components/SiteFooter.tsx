import Link from "next/link";
import { Logo } from "@ds/components/Logo.jsx";
import { stripeEdgeClipPath } from "@ds/components/Stripe.jsx";
import { footerGroups, legalLinks, site } from "@/lib/site";
import { FooterContact } from "./FooterContact";
import styles from "./SiteFooter.module.css";

const year = new Date().getFullYear();

// The footer's top edge steps down at the top right along the Stripe's edge. The turn
// point and drop are CSS variables in SiteFooter.module.css, tied to the page grid.
const edge = stripeEdgeClipPath({ kinkX: "var(--kink)", drop: "var(--drop)" });

const isExternal = (href: string) => href.startsWith("http");

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.contactRow}`}>
        <FooterContact />
      </div>

      <div className={styles.dark}>
        <div className={styles.field} style={{ clipPath: edge }} aria-hidden="true" />

        <div className={`container grid ${styles.main}`}>
          <Link href="/" className={styles.logo} aria-label={`${site.name} home`}>
            <Logo variant="stacked" height="100%" title={site.name} />
          </Link>

          <nav aria-label="Footer" className={styles.groups}>
            {footerGroups.map((g) => (
              <div key={g.title} className={styles.group}>
                <h2 className={styles.groupTitle}>{g.title}</h2>
                <ul>
                  {g.links.map((l) => (
                    <li key={l.href}>
                      {isExternal(l.href) ? (
                        <a href={l.href} target="_blank" rel="noopener">
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href}>{l.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <div className={`container text-small ${styles.bottomInner}`}>
            <ul className={styles.legal}>
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
            {/* TODO: registered company name and address. */}
            <p>
              © {year} {site.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
