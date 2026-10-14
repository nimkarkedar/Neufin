import { hexOf } from './tokens.js';

// Placeholder line icons drawn in the house style until the Streamline SVGs are added.
// 24 × 24 grid. Each path is stroked, and closed shapes take the duotone fill.
export const icons = {
  bolt: 'M13 3 5 14h6l-1 7 8-11h-6l1-7Z',
  meter: 'M4 15a8 8 0 1 1 16 0M12 15l4-5M3 19h18',
  leaf: 'M5 19C5 10 10 5 19 5c0 9-5 14-14 14Zm0 0 7-7',
  bill: 'M6 3h12v18l-3-2-3 2-3-2-3 2V3Zm3 5h6m-6 4h6m-6 4h3',
  home: 'M4 11 12 4l8 7v9H4v-9Zm6 9v-5h4v5',
  chart: 'M4 20V10m6 10V4m6 16v-7m4 7H2',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-6v3m0 14v3M2 12h3m14 0h3M4.9 4.9 7 7m10 10 2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1',
  book: 'M4 4h7a2 2 0 0 1 1 1v15a2 2 0 0 0-2-1H4V4Zm16 0h-7a2 2 0 0 0-1 1v15a2 2 0 0 1 2-1h6V4Z',
  news: 'M4 4h13v16H6a2 2 0 0 1-2-2V4Zm13 5h3v9a2 2 0 0 1-4 0M8 8h5m-5 4h5m-5 4h3',
  people: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 10a7 7 0 0 1 14 0m1-10a3 3 0 1 0 0-6m5 16a6 6 0 0 0-4-5.6',
  briefcase: 'M3 8h18v12H3V8Zm6 0V5h6v3m-6 5h6',
};

// tone: 'light' for icons on light backgrounds, 'dark' on Near Black or Violet.
export const iconColours = {
  light: { stroke: hexOf('violet-900'), fill: hexOf('violet-100') },
  dark: { stroke: hexOf('warm-white'), fill: hexOf('violet-700') },
};
