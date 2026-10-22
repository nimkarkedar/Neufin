import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { IconSvg } from "@ds/components/Icon.jsx";
import { icons } from "@ds/brand/icons.js";
import type { BrandLogo } from "@/lib/logos";
import { Placeholder, type IconName, type PlaceholderTone } from "./Placeholder";
import styles from "./Blocks.module.css";

// Content blocks shared by every page. Each is built from design system pieces:
// tokens, .surface, .tag, .link-arrow, .accordion, Nucleo icons and placeholders.

const cols = (n: number) => ({ "--cols": n }) as CSSProperties;

const Arrow = () => <IconSvg icon={icons.arrow} size={20} />;

// ---------- Feature cards: icon, title, a line, optional link ----------

export type Feature = { icon: IconName; title: string; text: string; link?: { label: string; href: string } };

export function Features({ items, columns = 3 }: { items: Feature[]; columns?: 2 | 3 | 4 }) {
  return (
    <ul className={styles.features} style={cols(columns)}>
      {items.map((f) => (
        <li key={f.title} className={`card ${styles.feature}`}>
          <span className={styles.iconTile}>
            <IconSvg icon={icons[f.icon]} size={24} />
          </span>
          <h3 className={styles.cardTitle}>{f.title}</h3>
          <p className={styles.cardText}>{f.text}</p>
          {f.link && (
            <Link href={f.link.href} className={`link-arrow ${styles.cardLink}`}>
              {f.link.label}
              <Arrow />
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

// ---------- Numbered steps, optionally with a visual ----------

export type Step = { title: string; text?: string; visual?: { note: string; icon?: IconName; tone?: PlaceholderTone } };

export function Steps({ items }: { items: Step[] }) {
  return (
    <ol className={styles.steps} style={cols(items.length)}>
      {items.map((s, i) => (
        <li key={s.title} className={styles.step}>
          <span className={styles.stepNo} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={styles.stepTitle}>{s.title}</h3>
          {s.text && <p className={styles.cardText}>{s.text}</p>}
          {s.visual && (
            <Placeholder note={s.visual.note} icon={s.visual.icon} tone={s.visual.tone} ratio="4 / 3" className={styles.stepVisual} />
          )}
        </li>
      ))}
    </ol>
  );
}

// ---------- Big numbers ----------

export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className={styles.stats} style={cols(items.length)}>
      {items.map((s) => (
        <div key={s.label} className={styles.stat}>
          <dt className={styles.statLabel}>{s.label}</dt>
          <dd className={styles.statValue}>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

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

export type Qa = { q: string; a?: string };

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

// ---------- Link cards: other solutions, resources, stories ----------

export type LinkCard = {
  title: string;
  text?: string;
  href: string;
  tag?: string;
  cover?: { note: string; icon?: IconName; tone?: PlaceholderTone };
  meta?: { value: string; label: string }[];
  linkLabel?: string;
};

export function LinkCards({ items, columns = 3 }: { items: LinkCard[]; columns?: 2 | 3 | 4 }) {
  return (
    <ul className={styles.linkCards} style={cols(columns)}>
      {items.map((c, i) => (
        <li key={`${c.title}-${i}`}>
          <Link href={c.href} className={`card ${styles.linkCard}`}>
            {c.cover && <Placeholder note={c.cover.note} icon={c.cover.icon} tone={c.cover.tone} ratio="16 / 10" className={styles.cover} />}
            <span className={styles.linkBody}>
              {c.tag && <span className="tag">{c.tag}</span>}
              <span className={styles.cardTitle}>{c.title}</span>
              {c.text && <span className={styles.cardText}>{c.text}</span>}
              {c.meta && (
                <span className={styles.meta}>
                  {c.meta.map((m) => (
                    <span key={m.label}>
                      <strong>{m.value}</strong> {m.label}
                    </span>
                  ))}
                </span>
              )}
              <span className={`link-arrow ${styles.cardLink}`}>
                {c.linkLabel ?? "Learn more"}
                <Arrow />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// ---------- A two-column split: text and a visual ----------

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

// ---------- A comparison table; one column can be marked as Neufin's ----------

export function Table({
  head,
  rows,
  highlight,
  caption,
}: {
  head: string[];
  rows: string[][];
  highlight?: number;
  caption?: string;
}) {
  return (
    <div className={`surface ${styles.tableWrap}`}>
      <table className={styles.table}>
        {caption && <caption className="visually-hidden">{caption}</caption>}
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={h || i} scope="col" data-hl={i === highlight || undefined}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) =>
                i === 0 ? (
                  <th key={i} scope="row">
                    {c}
                  </th>
                ) : (
                  <td key={i} data-hl={i === highlight || undefined}>
                    {c}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------- People: portrait, name, role, LinkedIn ----------

export function People({ items }: { items: { name: string; role: string; href?: string }[] }) {
  return (
    <ul className={styles.people}>
      {items.map((p, i) => (
        <li key={`${p.name}-${i}`} className={styles.person}>
          {/* TODO: team photos. */}
          <Placeholder note="Portrait" icon="people" tone="dawn" ratio="1 / 1" className={styles.portrait} />
          <span className={styles.personName}>{p.name}</span>
          <span className={styles.personRole}>{p.role}</span>
          {p.href && (
            <a href={p.href} target="_blank" rel="noopener" className={styles.personLink} aria-label={`${p.name} on LinkedIn`}>
              <IconSvg icon={icons.linkedin} size={20} />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

// ---------- Gallery: a row of photo placeholders, the first one wide ----------

export function Gallery({ notes }: { notes: string[] }) {
  return (
    <ul className={styles.gallery}>
      {notes.map((n, i) => (
        <li key={n}>
          <Placeholder note={`Photo: ${n}`} icon="image" tone={i % 2 ? "dawn" : "daylight"} className={styles.galleryItem} />
        </li>
      ))}
    </ul>
  );
}
