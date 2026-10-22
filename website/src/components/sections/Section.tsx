import Link from "next/link";
import type { ReactNode } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import styles from "./Section.module.css";

export type Tone = "plain" | "white" | "dark";

// One page section: a heading row on the grid (title left, line or link right on
// desktop), then the content. Tone sets the band: plain (the Warm White page), white,
// or dark (Violet 900, at most one per page).
export function Section({
  id,
  title,
  lead,
  link,
  tone = "plain",
  narrowHead = false,
  children,
}: {
  id?: string;
  title?: ReactNode;
  lead?: ReactNode;
  link?: { label: string; href: string };
  tone?: Tone;
  narrowHead?: boolean;
  children?: ReactNode;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} className={styles.section} data-tone={tone} data-compact={title ? undefined : true} aria-labelledby={title ? headingId : undefined}>
      <div className="container">
        {title && (
          <div className={styles.head} data-narrow={narrowHead || undefined}>
            <h2 id={headingId} className={styles.title}>
              {title}
            </h2>
            {(lead || link) && (
              <div className={styles.aside}>
                {lead && <p className={styles.lead}>{lead}</p>}
                {link && (
                  <Link href={link.href} className="link-arrow">
                    {link.label}
                    <IconSvg icon={icons.arrow} size={20} />
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
