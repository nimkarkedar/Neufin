'use client';

import { useEffect, useRef, useState } from 'react';
import { IconSvg } from './Icon.jsx';
import { icons } from '../brand/icons.js';

// Scroll row: a row of cards wider than the screen, scrolled sideways, such as photos or
// events. Cards keep their width and snap into place, and the next one peeks in at the edge
// so it's clear there is more. Two round buttons (previous, next) move it one card at a time
// and grey out at either end; touch, trackpad and keyboard (the row takes focus, then arrow
// keys) scroll it too. No autoplay.
// Styles: `.scroll-row` in ui.css. Set each card's width with --scroll-item on the row.
/** @param {{ label: string, children: import('react').ReactNode, className?: string, controls?: boolean }} props */
export function ScrollRow({ label, children, className, controls = true }) {
  const row = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const update = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, []);

  const move = (dir) => {
    const el = row.current;
    const item = el?.firstElementChild;
    if (!el || !item) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * (item.getBoundingClientRect().width + gap), behavior: still ? 'auto' : 'smooth' });
  };

  return (
    <div className={['scroll-row-wrap', className].filter(Boolean).join(' ')}>
      {controls && (
        <div className="scroll-row-controls">
          <button type="button" className="scroll-row-button" onClick={() => move(-1)} disabled={edge.start} aria-label={`Previous: ${label}`}>
            <IconSvg icon={icons.arrow} size={20} style={{ transform: 'scaleX(-1)' }} />
          </button>
          <button type="button" className="scroll-row-button" onClick={() => move(1)} disabled={edge.end} aria-label={`Next: ${label}`}>
            <IconSvg icon={icons.arrow} size={20} />
          </button>
        </div>
      )}
      <div ref={row} className="scroll-row" role="region" aria-label={label} tabIndex={0}>
        {children}
      </div>
    </div>
  );
}
