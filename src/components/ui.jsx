import { useState } from 'react';

export function PageHeader({ eyebrow, title, intro }) {
  return (
    <header className="page-header">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1>{title}</h1>
      {intro && <p className="lede">{intro}</p>}
    </header>
  );
}

export function Section({ title, intro, children, id }) {
  return (
    <section className="section" id={id}>
      {title && <h2>{title}</h2>}
      {intro && <p className="section-intro">{intro}</p>}
      {children}
    </section>
  );
}

export function Callout({ tone = 'note', title, children }) {
  return (
    <aside className={`callout callout-${tone}`}>
      {title && <strong className="callout-title">{title}</strong>}
      <div>{children}</div>
    </aside>
  );
}

export function DoDont({ kind, children, caption }) {
  return (
    <figure className={`dodont dodont-${kind}`}>
      <div className="dodont-stage">{children}</div>
      <figcaption>
        <span className="dodont-label">{kind === 'do' ? 'Do' : 'Don’t'}</span> {caption}
      </figcaption>
    </figure>
  );
}

export function useCopy() {
  const [copied, setCopied] = useState(null);
  const copy = (text) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied((c) => (c === text ? null : c)), 1200);
    });
  };
  return [copied, copy];
}

export function Figure({ src, alt, caption, className = '' }) {
  return (
    <figure className={`figure ${className}`}>
      <img src={src} alt={alt} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

// Shows the first `initial` items, with a button to reveal the rest.
export function ShowMore({ items, initial = 4, label = (n) => `Show all ${n}`, closeLabel = 'Show fewer' }) {
  const [open, setOpen] = useState(false);
  const shown = open ? items : items.slice(0, initial);
  return (
    <>
      {shown}
      {items.length > initial && (
        <button className="more-btn" onClick={() => setOpen(!open)}>
          {open ? closeLabel : label(items.length)}
        </button>
      )}
    </>
  );
}
