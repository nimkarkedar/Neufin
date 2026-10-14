import { hexOf } from '../brand/tokens.js';

// SVG filters for the photo treatments. Put them inside an <svg><defs> and apply with
// filter="url(#id)". Colours are token names from tokens.js.

const rgb = (hex) => [1, 3, 5].map((i) => (parseInt(hex.slice(i, i + 2), 16) / 255).toFixed(3));
const LUMA = '.2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 0 0 0 1 0';

// Maps the photo's shadows to `dark` and highlights to `light`.
export function Duotone({ id, dark, light }) {
  const a = rgb(hexOf(dark));
  const b = rgb(hexOf(light));
  return (
    <filter id={id} colorInterpolationFilters="sRGB" x="0" y="0" width="1" height="1">
      <feColorMatrix type="matrix" values={LUMA} />
      <feComponentTransfer>
        <feFuncR type="table" tableValues={`${a[0]} ${b[0]}`} />
        <feFuncG type="table" tableValues={`${a[1]} ${b[1]}`} />
        <feFuncB type="table" tableValues={`${a[2]} ${b[2]}`} />
      </feComponentTransfer>
    </filter>
  );
}

// Violet wash: Violet 300 multiplied at 45%.
export function VioletWash({ id }) {
  return (
    <filter id={id} colorInterpolationFilters="sRGB" x="0" y="0" width="1" height="1">
      <feFlood floodColor={hexOf('violet-300')} floodOpacity="0.45" result="f" />
      <feBlend in="SourceGraphic" in2="f" mode="multiply" />
    </filter>
  );
}
