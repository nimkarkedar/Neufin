import { icons, iconColours } from '../brand/icons.js';

// name: a key of `icons`. tone: 'light' | 'dark'. Decorative by default.
/** @param {{ name: keyof typeof icons, tone?: 'light' | 'dark', size?: number, title?: string } & import('react').SVGProps<SVGSVGElement>} props */
export function Icon({ name, tone = 'light', size = 24, title, ...rest }) {
  const c = iconColours[tone];
  return (
    <svg
      viewBox="0 0 24 24" width={size} height={size} fill="none"
      stroke={c.stroke} strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter"
      role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}
      {...rest}
    >
      <path d={icons[name]} fill={c.fill} />
    </svg>
  );
}
