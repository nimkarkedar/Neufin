import { hexOf } from './tokens.js';
import { nucleoIcons } from './icons.generated.js';

// Nucleo icons in use, by Neufin name. To add one: list it in icon-list.json, then
// run `npm run icons`. Default style: Core outline, 24px grid.
export const icons = nucleoIcons;

// tone: 'light' for icons on light backgrounds, 'neutral' for quiet light surfaces such
// as menus, 'dark' on Near Black or Violet. main colours the icon; accent colours its
// secondary parts (Nucleo's color-2).
export const iconColours = {
  light: { main: hexOf('violet-900'), accent: hexOf('violet-500') },
  neutral: { main: hexOf('near-black'), accent: hexOf('grey-600') },
  dark: { main: hexOf('warm-white'), accent: hexOf('violet-400') },
};
