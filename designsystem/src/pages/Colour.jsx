import { violetScale, coreColours, accentColours, neutrals, hexOf, bestText, contrast, rating } from '../brand/tokens.js';
import { Swatch } from '../components/Swatch.jsx';
import { GradientSwatches, GradientExamples, gradientRules } from '../components/Gradients.jsx';
import { PageHeader, Section, useCopy } from '../components/ui.jsx';

// Compositions: columns (weight) of stacked cells (weight). Percentages are derived from the weights.
const compositions = [
  {
    name: 'Brand',
    use: 'Logo, campaigns, merchandise',
    columns: [
      { w: 66, cells: [['electric-violet', 1]] },
      { w: 34, cells: [['near-black', 1], ['warm-white', 1]] },
    ],
  },
  {
    name: 'Product',
    use: 'App, web, dashboards',
    columns: [
      { w: 55, cells: [['warm-white', 1]] },
      { w: 20, cells: [['near-black', 1]] },
      { w: 16, cells: [['electric-violet', 1]] },
      { w: 9, cells: [['energy-mint', 1], ['electric-coral', 1], ['signal-yellow', 1]] },
    ],
  },
  {
    name: 'Social media & communication',
    use: 'Posts, ads, posters, presentations',
    columns: [
      { w: 68, cells: [['electric-violet', 1]] },
      { w: 24, cells: [['near-black', 1]] },
      { w: 8, cells: [['electric-coral', 1], ['signal-yellow', 3]] },
    ],
  },
];

const colourByToken = Object.fromEntries([...coreColours, ...accentColours].map((c) => [c.token, c]));

function shares(columns) {
  const out = [];
  columns.forEach(({ w, cells }) => {
    const total = cells.reduce((a, [, cw]) => a + cw, 0);
    cells.forEach(([token, cw]) => out.push([token, Math.round((w * cw) / total)]));
  });
  return out.sort((a, b) => b[1] - a[1]);
}

function Composition({ name, use, columns }) {
  const first = colourByToken[columns[0].cells[0][0]];
  return (
    <figure className="comp">
      <div className="comp-map">
        {columns.map((col, i) => (
          <div key={i} className="comp-col" style={{ flex: col.w }}>
            {col.cells.map(([token, cw]) => (
              <div key={token} className={`comp-cell ${token === 'warm-white' ? 'comp-cell-light' : ''}`} style={{ flex: cw, background: `var(--${token})` }} title={colourByToken[token].name} />
            ))}
          </div>
        ))}
        <span className="comp-label" style={{ color: bestText(first.hex) }}>{name}</span>
      </div>
      <figcaption className="comp-legend">
        <span className="comp-use">{use}</span>
        <ul>
          {shares(columns).map(([token, pct]) => (
            <li key={token}><i style={{ background: `var(--${token})` }} />{colourByToken[token].name}<b>{pct}%</b></li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}

// Text on background, by token name.
const pairs = [
  ['warm-white', 'electric-violet'], ['warm-white', 'near-black'], ['near-black', 'warm-white'], ['electric-violet', 'warm-white'],
  ['warm-white', 'violet-900'], ['signal-yellow', 'violet-900'], ['near-black', 'electric-coral'], ['warm-white', 'electric-coral'],
  ['near-black', 'energy-mint'], ['near-black', 'signal-yellow'], ['warm-white', 'clear-blue'], ['violet-900', 'violet-100'],
].map(([f, b]) => [hexOf(f), hexOf(b)]);

function Scale() {
  const [copied, copy] = useCopy();
  return (
    <div className="scale">
      {violetScale.map((c) => (
        <button key={c.step} className="scale-step" style={{ background: c.hex, color: bestText(c.hex) }} onClick={() => copy(c.hex)}>
          <strong>{c.step}</strong>
          <span>{c.alias && <>{c.alias}<br /></>}{copied === c.hex ? 'Copied' : c.hex}</span>
        </button>
      ))}
    </div>
  );
}

export default function Colour() {
  return (
    <>
      <PageHeader
        eyebrow="Brand foundations"
        title="Colour"
        intro="Click a swatch to copy its hex."
      />

      <Section title="Core">
        <div className="swatch-grid swatch-grid-lg">{coreColours.map((c) => <Swatch key={c.token} {...c} size="lg" />)}</div>
      </Section>

      <Section title="Accents">
        <div className="swatch-grid">{accentColours.map((c) => <Swatch key={c.token} {...c} />)}</div>
      </Section>

      <Section title="Neutrals" intro="For UI only: backgrounds, secondary text and lines.">
        <div className="swatch-grid">{neutrals.map((c) => <Swatch key={c.token} {...c} />)}</div>
      </Section>

      <Section title="Violet scale">
        <Scale />
      </Section>

      <Section title="Gradients" intro="Soft tints of the brand colours. Click to copy the token.">
        <GradientSwatches />
        <div className="rows grad-rules">
          {gradientRules.map(([k, v]) => <div key={k} className="row"><span className="row-key">{k}</span><p>{v}</p></div>)}
        </div>
        <GradientExamples />
      </Section>

      <Section title="Proportion" intro="How much of each colour to use, by context. Area on screen or page, approximate.">
        <div className="comps">
          {compositions.map((c) => <Composition key={c.name} {...c} />)}
        </div>
      </Section>

      <Section title="Accessible pairings" intro="WCAG 2.x. Body text needs 4.5:1. Large text needs 3:1.">
        <div className="pair-grid">
          {pairs.map(([fg, bg]) => {
            const r = contrast(fg, bg);
            const grade = rating(r);
            return (
              <div key={fg + bg} className="pair" style={{ background: bg, color: fg }}>
                <span className="pair-sample">Aa</span>
                <span className="pair-info">{fg} on {bg}</span>
                <span className={`pair-grade grade-${grade.replace(' ', '-').toLowerCase()}`}>{r.toFixed(1)}:1 · {grade}</span>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
