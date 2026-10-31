import { SYMBOL, LUMEN, BY_NEUFIN } from '../brand/lumen-logo-paths.js';

const paths = (list) => list.map((d, i) => <path key={i} d={d} />);

// SYMBOL is the bulb, then its rays: right, top, top right, left, top left. `--i` orders the
// rays left to right, so `live` switches them on in a sweep.
const RAY_ORDER = [4, 2, 3, 0, 1];

function Symbol() {
  const [bulb, ...rays] = SYMBOL;
  return (
    <>
      <path d={bulb} />
      {rays.map((d, i) => <path key={i} d={d} className="lumen-logo-ray" style={{ '--i': RAY_ORDER[i] }} />)}
    </>
  );
}

// Lumen, Neufin Energy's software: an endorsed sub-brand (Lumen page).
// variant: 'full' (the bulb, Lumen and By Neufin Energy; the default) | 'symbol' (the bulb alone).
// One colour, which follows CSS `color`: White or Near Black only.
// live: the rays switch on in a sweep every `--duration-current` (still with reduced motion).
/** @param {{ variant?: 'full' | 'symbol', color?: string, height?: number | string, title?: string, live?: boolean } & import('react').SVGProps<SVGSVGElement>} props */
export function LumenLogo({ variant = 'full', color, height = 48, title = 'Lumen by Neufin Energy', live = false, className, style, ...rest }) {
  const common = {
    role: 'img',
    'aria-label': title,
    fill: 'currentColor',
    className: [live && 'lumen-logo-live', className].filter(Boolean).join(' ') || undefined,
    style: { color, height, width: 'auto', display: 'block', ...style },
    ...rest,
  };

  if (variant === 'symbol') {
    return <svg viewBox="0.219 0.218 51.709 53.369" {...common}><Symbol /></svg>;
  }

  return (
    <svg viewBox="0 0 186 58" {...common}>
      <Symbol />
      {paths(LUMEN)}
      {paths(BY_NEUFIN)}
    </svg>
  );
}
