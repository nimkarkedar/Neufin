import { useState } from 'react';
import { Stripe, markBand } from '../components/Stripe.jsx';
import { PageHeader, Section, DoDont } from '../components/ui.jsx';

const combos = [
  { bg: 'var(--violet-900)', fg: 'var(--signal-yellow)', label: 'Signal Yellow on Violet 900' },
  { bg: 'var(--electric-violet)', fg: 'var(--signal-yellow)', label: 'Signal Yellow on Electric Violet' },
  { bg: 'var(--electric-coral)', fg: 'var(--near-black)', label: 'Near Black on Coral' },
  { bg: 'var(--violet-900)', fg: 'var(--electric-coral)', label: 'Coral on Violet 900' },
  { bg: 'var(--white)', fg: 'var(--violet-800)', label: 'Violet 800 on white' },
  { bg: 'var(--electric-violet)', fg: 'var(--warm-white)', label: 'Warm White on Electric Violet' },
  { bg: 'var(--warm-white)', fg: 'var(--electric-violet)', label: 'Electric Violet on Warm White' },
];

const formats = [
  { id: 'portrait', label: '4:5 · 1080 × 1350', h: 1350 },
  { id: 'square', label: '1:1 · 1080 × 1080', h: 1080 },
];

// Shapes. Each draws into a 1080-wide canvas of height h from its slider values.
const shapes = [
  {
    name: 'Stripe',
    note: 'Edge to edge.',
    sliders: [
      { key: 't', label: 'Thickness', min: 112, max: 320, value: 160 },
      { key: 'drop', label: 'Drop', min: 120, max: 600, value: 360 },
      { key: 'turn', label: 'Turn point', min: 0, max: 600, value: 240 },
      // Range follows the canvas. At either end, half of the flat part still shows.
      { key: 'y', label: 'Position', min: (v) => -v.t / 2, max: (v, h) => h - v.drop - v.t / 2, value: 200 },
    ],
    draw: (v, h, fg) => <Stripe width={1080} height={h} y={v.y} thickness={v.t} kinkX={v.turn} drop={v.drop} color={fg} />,
  },
  {
    name: 'Band',
    note: 'Starts inside the canvas with a square end, bleeds off the right edge.',
    sliders: [
      { key: 'm', label: 'Thickness', min: 112, max: 260, value: 154 },
      { key: 'x', label: 'Start', min: 0, max: 600, value: 400 },
      { key: 'y', label: 'Position', min: (v) => -v.m / 2, max: (v, h) => h - 2.223 * v.m, value: 50 },
    ],
    draw: (v, h, fg) => {
      const b = markBand({ x0: v.x, y: v.y, m: v.m, x2: 1100 });
      return <svg viewBox={`0 0 1080 ${h}`}><polygon points={b.points} fill={fg} /></svg>;
    },
  },
];

const bound = (b, v, h) => (typeof b === 'function' ? Math.round(b(v, h)) : b);

function Playground({ shape, h }) {
  const [raw, setV] = useState(() => Object.fromEntries(shape.sliders.map((s) => [s.key, s.value])));
  // Clamp every value to its current range (ranges can depend on other sliders and the canvas size).
  const v = { ...raw };
  shape.sliders.forEach((s) => { v[s.key] = Math.min(bound(s.max, v, h), Math.max(bound(s.min, v, h), v[s.key])); });
  const [combo, setCombo] = useState(combos[shape.name === 'Stripe' ? 0 : 6]);
  return (
    <figure className="pg">
      <div className="pg-stage" style={{ aspectRatio: `1080 / ${h}`, background: combo.bg }}>{shape.draw(v, h, combo.fg)}</div>
      <figcaption>
        <strong>{shape.name}</strong>
        <span className="caption">{shape.note}</span>
        <div className="pg-combos">
          {combos.map((c) => (
            <button key={c.label} title={c.label} aria-label={c.label} className={c === combo ? 'active' : ''} style={{ background: c.bg }} onClick={() => setCombo(c)}>
              <i style={{ background: c.fg }} />
            </button>
          ))}
        </div>
        {shape.sliders.map((s) => (
          <label key={s.key} className="pg-slider">
            <span>{s.label}</span>
            <input type="range" min={bound(s.min, v, h)} max={bound(s.max, v, h)} value={v[s.key]} onChange={(e) => setV({ ...v, [s.key]: +e.target.value })} />
          </label>
        ))}
      </figcaption>
    </figure>
  );
}

export default function GraphicDevice() {
  const [fmt, setFmt] = useState(formats[0]);

  return (
    <>
      <PageHeader
        eyebrow="Brand foundations"
        title="Graphic device: the Stripe"
        intro="One band of the symbol, enlarged."
      />

      <Section title="Colour combinations">
        <div className="grid-2">
          {combos.map((c) => (
            <div key={c.label} className="tile">
              <div className="tile-stage tall stripe-stage" style={{ background: c.bg, outline: c.bg === 'var(--white)' ? '1px solid var(--line)' : 'none' }}>
                <Stripe width={600} height={300} y={40} thickness={70} kinkX={120} drop={150} color={c.fg} />
              </div>
              <div className="tile-meta"><strong>{c.label}</strong></div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Rules">
        <div className="grid-3">
          <DoDont kind="do" caption="Bleed the Stripe off at least one edge.">
            <div className="mini-stage" style={{ background: 'var(--violet-900)', padding: 0 }}><Stripe width={300} height={160} y={20} thickness={34} kinkX={70} drop={70} /></div>
          </DoDont>
          <DoDont kind="dont" caption="Change the angle or curve the corners.">
            <div className="mini-stage" style={{ background: 'var(--violet-900)', padding: 0 }}>
              <svg viewBox="0 0 300 160" style={{ width: '100%', height: '100%' }}><path d="M-1 30 H60 Q120 30 170 120 H301 V154 H160 Q105 64 50 64 H-1Z" fill="var(--signal-yellow)" /></svg>
            </div>
          </DoDont>
          <DoDont kind="dont" caption="Use more than two Stripes in a layout, except in pattern pieces.">
            <div className="mini-stage" style={{ background: 'var(--violet-900)', padding: 0, position: 'relative' }}>
              {[0, 40, 80].map((o) => <div key={o} style={{ position: 'absolute', inset: 0 }}><Stripe width={300} height={160} y={o - 10} thickness={18} kinkX={60 + o} drop={60} /></div>)}
            </div>
          </DoDont>
        </div>
      </Section>

      <Section title="Try it" intro="The angle stays fixed. Pick a size, a colour combination and adjust the shape.">
        <div className="seg">
          {formats.map((f) => <button key={f.id} className={fmt.id === f.id ? 'active' : ''} onClick={() => setFmt(f)}>{f.label}</button>)}
        </div>
        <div className="pg-grid">
          {shapes.map((sh) => <Playground key={sh.name} shape={sh} h={fmt.h} />)}
        </div>
      </Section>
    </>
  );
}
