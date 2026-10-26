'use client';

import { useLayoutEffect, useRef, useState } from 'react';

// Segmented control: one choice from a short set, Apple-style. A soft track holds the
// options as plain text, and one solid thumb sits behind the chosen one and glides to the
// next when the choice changes, its label changing colour as the thumb arrives. Each option
// is a radio, so arrow keys and screen readers work as with chips. On a dark band pass
// `inverse`. When the set is wider than its space the track scrolls sideways and the chosen
// option scrolls into view. Until the thumb is measured (or without JavaScript) the chosen
// option is filled by CSS instead, so it always shows.
// Styles: `.segmented` in ui.css.

// `small` is the compact size for forms with several sets (the plan finder). `stacked` puts
// the options in a column from desktop (1024px), for a filter sidebar; they stay a row on
// phones. `icons` (one node per option, or null) leads each label with an icon. `label` names
// the group for screen readers; leave it out when a visible legend already does.
/** @param {{ name: string, label?: string, options: string[], value: number, onChange: (i: number) => void, inverse?: boolean, small?: boolean, stacked?: boolean, icons?: import('react').ReactNode[], className?: string }} props */
export function Segmented({ name, label, options, value, onChange, inverse = false, small = false, stacked = false, icons, className }) {
  const track = useRef(null);
  const [thumb, setThumb] = useState(null);

  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    const place = () => {
      const opt = el.querySelectorAll('.segmented-option')[value];
      if (!opt) return;
      setThumb({ left: opt.offsetLeft, top: opt.offsetTop, width: opt.offsetWidth, height: opt.offsetHeight });
      // Keep the chosen option in view when the track scrolls (phones).
      const { scrollLeft, clientWidth, scrollWidth } = el;
      if (scrollWidth > clientWidth && (opt.offsetLeft < scrollLeft || opt.offsetLeft + opt.offsetWidth > scrollLeft + clientWidth)) {
        el.scrollTo({ left: opt.offsetLeft - 16, behavior: 'smooth' });
      }
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(el);
    return () => ro.disconnect();
  }, [value]);

  const classes = ['segmented', inverse && 'segmented-inverse', small && 'segmented-small', stacked && 'segmented-stacked', thumb && 'segmented-ready', className].filter(Boolean).join(' ');
  return (
    <div ref={track} className={classes} role="radiogroup" aria-label={label}>
      {thumb && <span className="segmented-thumb" style={{ '--x': `${thumb.left}px`, '--y': `${thumb.top}px`, '--w': `${thumb.width}px`, '--h': `${thumb.height}px` }} aria-hidden="true" />}
      {options.map((o, i) => (
        <label key={o} className="segmented-option">
          <input type="radio" name={name} checked={value === i} onChange={() => onChange(i)} />
          {icons?.[i] && (
            <span className="segmented-icon" aria-hidden="true">
              {icons[i]}
            </span>
          )}
          {o}
        </label>
      ))}
    </div>
  );
}
