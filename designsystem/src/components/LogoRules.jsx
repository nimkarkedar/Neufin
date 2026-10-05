import { MARK, NEUFIN, ENERGY } from '../brand/logo-paths.js';

// x = the symbol's square terminal, in stacked-logo units (logo is 182 × 58).
const X = 11.07;
const LW = 182;
const LH = 58;

const LogoPaths = ({ fill, opacity }) => (
  <g fill={fill} opacity={opacity}>
    <path d={MARK} />
    {[...NEUFIN, ...ENERGY].map((d, i) => <path key={i} d={d} />)}
  </g>
);

export function ClearSpace() {
  const sq = [
    [-X, LH / 2 - X / 2], [LW, LH / 2 - X / 2],
    [LW / 2 - X / 2, -X], [LW / 2 - X / 2, LH],
  ];
  return (
    <svg viewBox={`${-X - 14} ${-X - 14} ${LW + 2 * X + 28} ${LH + 2 * X + 28}`} className="rule-art" role="img" aria-label="Clear space of x around the logo">
      <rect x={-X} y={-X} width={LW + 2 * X} height={LH + 2 * X} fill="none" stroke="var(--violet-400)" strokeWidth="0.4" strokeDasharray="1.5 1.5" />
      {sq.map(([x, y], i) => <rect key={i} x={x} y={y} width={X} height={X} fill="var(--violet-200)" />)}
      <LogoPaths fill="var(--near-black)" />
      <rect x={38.14} y={1.62} width={X} height={X} fill="var(--electric-violet)" />
      {[...sq, [38.14, 1.62]].map(([x, y], i) => (
        <text key={i} x={x + X / 2} y={y + X / 2 + 1.6} textAnchor="middle" fontSize="4.6" fill={i === 4 ? 'var(--warm-white)' : 'var(--near-black)'} fontFamily="var(--font-body)">x</text>
      ))}
    </svg>
  );
}

// A canvas with the logo at each allowed position. Solid = example, faint = also allowed.
function Canvas({ w, h, L, bg, fg, centred }) {
  const s = L / LH;
  const lw = LW * s;
  const m = 3 * X * s;
  const spots = centred
    ? [[(w - lw) / 2, (h - L) / 2]]
    : [[m, m], [w - m - lw, m], [m, h - m - L], [w - m - lw, h - m - L]];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="rule-art" role="img" aria-label={centred ? 'Logo centred' : 'Logo in any corner'}>
      <rect width={w} height={h} fill={bg} stroke="var(--line)" strokeWidth="1" />
      {!centred && <rect x={m} y={m} width={w - 2 * m} height={h - 2 * m} fill="none" stroke="var(--violet-300)" strokeWidth="1" strokeDasharray="4 4" />}
      {spots.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}><LogoPaths fill={fg} opacity={i === 0 ? 1 : 0.18} /></g>
      ))}
    </svg>
  );
}

export function Placement() {
  return (
    <div className="placement">
      <figure><Canvas w={400} h={500} L={44} bg="var(--warm-white)" fg="var(--near-black)" /><figcaption>Post · any corner</figcaption></figure>
      <figure><Canvas w={640} h={360} L={44} bg="var(--warm-white)" fg="var(--near-black)" /><figcaption>Slide, page · any corner</figcaption></figure>
      <figure><Canvas w={400} h={500} L={80} bg="var(--electric-violet)" fg="var(--warm-white)" centred /><figcaption>Cover · centred, on solid colour only</figcaption></figure>
    </div>
  );
}
