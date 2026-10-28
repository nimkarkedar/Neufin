'use client';

import { useEffect, useRef } from 'react';

// Step track: a process told in rows (bill, quote, contract, power) with a rail joining the
// steps' hero circles. While the list is in view, current runs down the rail one step at a
// time: the line draws in Electric Violet to the next circle and that circle lights with a
// ring, so the order reads as "this, then this, then this". Once every step is lit it holds,
// fades back, rests and runs again. The rows themselves never move (no card motion).
// Each step is --duration-step long. Without JavaScript or with reduced motion the rail
// shows in Grey 200, still.
// Markup: <StepTrack as a list> with one <li className="step-track-item"> per step, each
// holding a <StepMark> around its hero DuoIcon. Styles: `.step-track` in ui.css.
/** @param {{ children: import('react').ReactNode, className?: string }} props */
export function StepTrack({ children, className = '' }) {
  const list = useRef(null);

  useEffect(() => {
    const el = list.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = [...el.querySelectorAll(':scope > .step-track-item')];
    const step = parseFloat(getComputedStyle(el).getPropertyValue('--duration-step')) * 1000 || 1200;
    let timer;

    const light = (n) =>
      items.forEach((li, i) => {
        li.toggleAttribute('data-on', i < n);
        li.toggleAttribute('data-out', i < n - 1);
      });

    const run = (n) => {
      el.removeAttribute('data-phase');
      light(n);
      if (n < items.length) {
        timer = setTimeout(() => run(n + 1), step);
        return;
      }
      // All lit: hold, fade back together, clear without a transition, rest, run again.
      timer = setTimeout(() => {
        el.setAttribute('data-phase', 'fade');
        timer = setTimeout(() => {
          el.setAttribute('data-phase', 'reset');
          light(0);
          timer = setTimeout(() => run(1), step);
        }, step);
      }, step * 3);
    };

    const stop = () => {
      clearTimeout(timer);
      el.setAttribute('data-phase', 'reset');
      light(0);
    };

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? (stop(), run(1)) : stop()), { threshold: 0.5 });
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <ol ref={list} className={`step-track ${className}`.trim()}>
      {children}
    </ol>
  );
}

// The step's hero circle with the rail above and below it. Decorative.
/** @param {{ children: import('react').ReactNode }} props */
export function StepMark({ children }) {
  return (
    <span className="step-track-mark" aria-hidden="true">
      <span className="step-track-line" />
      {children}
      <span className="step-track-line" />
    </span>
  );
}
