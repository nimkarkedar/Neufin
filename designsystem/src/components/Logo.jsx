import { MARK, NEUFIN, ENERGY } from '../brand/logo-paths.js';

const paths = (list) => list.map((d, i) => <path key={i} d={d} />);

// variant: 'stacked' (primary) | 'horizontal' | 'symbol'
// Colour follows CSS `color`, so set it with a class or the `color` prop.
// markColor sets the symbol separately, for the two-colour logo only.
export function Logo({ variant = 'stacked', color, markColor, height = 48, title = 'Neufin Energy', style, ...rest }) {
  const common = {
    role: 'img',
    'aria-label': title,
    fill: 'currentColor',
    style: { color, height, width: 'auto', display: 'block', ...style },
    ...rest,
  };

  if (variant === 'symbol') {
    return (
      <svg viewBox="0 1.62 49.214 49.214" {...common}>
        <path d={MARK} />
      </svg>
    );
  }

  if (variant === 'horizontal') {
    return (
      <svg viewBox="0 0 270 32" {...common}>
        <g transform="translate(0 0.88) scale(0.4587)"><path d={MARK} fill={markColor} /></g>
        <g transform="translate(-31.76 0)">{paths(NEUFIN)}</g>
        <g transform="translate(87.99 -26.66)">{paths(ENERGY)}</g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 182 58" {...common}>
      <path d={MARK} fill={markColor} />
      {paths(NEUFIN)}
      {paths(ENERGY)}
    </svg>
  );
}
