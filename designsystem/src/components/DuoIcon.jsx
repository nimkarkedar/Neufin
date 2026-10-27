import { icons } from '../brand/icons.js';
import { IconSvg } from './Icon.jsx';

// The website's content icon (Kedar, 2026-10-27): a Nucleo UI outline-duo icon whose line is
// the text colour and whose second tone is Violet 200, the line held at about 2px at any
// size. Two styles, one family:
// - hero: the icon (32px) in a 64px Warm White circle, leading a block (a grid cell, a
//   module, a menu item; `size="m"` is a 48px circle with a 24px icon). Inside an element
//   with .duo-icon-host the circle turns White while that element is hovered or focused.
// - supporting (the default): the icon alone (24px, or `size` in px), beside text.
// Functional icons (arrows, close, fields, the FAQ plus) stay plain IconSvg.
// name: a `duo-*` key of `icons`. Decorative: the text beside it carries the meaning.
/** @param {{ name: keyof typeof icons, hero?: boolean, size?: 'l' | 'm' | number, className?: string }} props */
export function DuoIcon({ name, hero = false, size, className = '' }) {
  const px = hero ? (size === 'm' ? 24 : 32) : typeof size === 'number' ? size : 24;
  const classes = ['duo-icon', hero && 'duo-icon-hero', hero && size === 'm' && 'duo-icon-m', className].filter(Boolean).join(' ');
  return (
    <span className={classes} style={{ '--nucleo-stroke-width': 36 / px }}>
      <IconSvg icon={icons[name]} size={px} />
    </span>
  );
}
