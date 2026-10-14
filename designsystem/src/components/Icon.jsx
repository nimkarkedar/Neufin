import { icons, iconColours } from '../brand/icons.js';

// Draws one Nucleo icon from its copied SVG body. icon: { viewBox, body }.
/** @param {{ icon: { viewBox: string, body: string }, size?: number, title?: string } & import('react').SVGProps<SVGSVGElement>} props */
export function IconSvg({ icon, size = 24, title, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg" viewBox={icon.viewBox} width={size} height={size}
      role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}
      dangerouslySetInnerHTML={{ __html: icon.body }}
      {...rest}
    />
  );
}

// name: a key of `icons`. tone: 'light' | 'neutral' | 'dark'. Decorative by default.
/** @param {{ name: keyof typeof icons, tone?: 'light' | 'neutral' | 'dark', size?: number, title?: string } & import('react').SVGProps<SVGSVGElement>} props */
export function Icon({ name, tone = 'light', size = 24, style, ...rest }) {
  const c = iconColours[tone];
  return <IconSvg icon={icons[name]} size={size} style={{ color: c.main, '--icon-color-2': c.accent, ...style }} {...rest} />;
}
