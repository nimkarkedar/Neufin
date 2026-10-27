import type { CSSProperties, ReactNode } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import type { BrandLogo } from "@/lib/logos";
import styles from "./Blocks.module.css";

// Content blocks shared by every page. Each is built from design system pieces:
// tokens, .surface, .tag, .link-arrow, .accordion, Nucleo icons and placeholders.

// ---------- A row of logos (name placeholders until the SVGs arrive) ----------

// Logos in the text colour, each covering the same area, so wide wordmarks get
// shorter and square marks taller. Plain names stand in where there is no logo yet.
const logoSize = ({ ratio }: BrandLogo) =>
  ({ "--logo-w": Math.sqrt(ratio), "--logo-h": 1 / Math.sqrt(ratio) }) as CSSProperties;

// One logo, sized from the parent's --logo-size (the side of a square mark).
export function LogoMark({ logo, hidden }: { logo: BrandLogo; hidden?: boolean }) {
  return (
    <span
      role={hidden ? undefined : "img"}
      aria-label={hidden ? undefined : logo.name}
      className={styles.logoMark}
      style={{ ...logoSize(logo), maskImage: `url(${logo.src})` }}
    />
  );
}

export function LogoRow({
  label,
  logos,
  names,
  center,
}: {
  label?: string;
  logos?: BrandLogo[];
  names?: string[];
  center?: boolean;
}) {
  return (
    <div className={styles.logoRow} data-center={center || undefined}>
      {label && <p className={styles.logoLabel}>{label}</p>}
      <ul className={styles.logos}>
        {logos?.map((l) => (
          <li key={l.name} className={styles.logo}>
            <LogoMark logo={l} />
          </li>
        ))}
        {names?.map((n, i) => (
          <li key={`${n}-${i}`} className={styles.logoName}>
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------- FAQ: the design system accordion, plus FAQPage data for answered ones ----------

type Qa = { q: string; a?: string };

export function Faq({ items }: { items: Qa[] }) {
  const answered = items.filter((i) => i.a);
  const jsonLd = answered.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: answered.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
      }
    : null;
  return (
    <div className={`accordion ${styles.faq}`}>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      {items.map((i) => (
        <details key={i.q} name="faq">
          <summary>
            {i.q}
            <span className="accordion-icon">
              <IconSvg icon={icons.plus} size={20} />
            </span>
          </summary>
          {/* TODO: questions without an answer are waiting for Neufin's wording. */}
          <p className="accordion-answer">{i.a ?? "Answer to come from the Neufin team."}</p>
        </details>
      ))}
    </div>
  );
}

export function Split({ children, visual, flip = false }: { children: ReactNode; visual: ReactNode; flip?: boolean }) {
  return (
    <div className={styles.split} data-flip={flip || undefined}>
      <div className={styles.splitText}>{children}</div>
      <div className={styles.splitVisual}>{visual}</div>
    </div>
  );
}

// ---------- A checklist ----------

export function Checks({ items }: { items: string[] }) {
  return (
    <ul className={styles.checks}>
      {items.map((t) => (
        <li key={t}>
          <span className={styles.check}>
            <IconSvg icon={icons.check} size={16} />
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}
