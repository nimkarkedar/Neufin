import { fonts } from '../brand/tokens.js';
import { PageHeader, Section } from '../components/ui.jsx';

const scale = [
  { name: 'Display', font: 'display', size: 72, lh: 0.95, weight: 800, track: '-0.02em', sample: 'Cut Energy Cost.' },
  { name: 'H1', font: 'display', size: 48, lh: 1.0, weight: 700, track: '-0.015em', sample: 'On Your Terms.' },
  { name: 'H2', font: 'display', size: 32, lh: 1.1, weight: 700, track: '-0.01em', sample: 'Know what you pay.' },
  { name: 'H3', font: 'display', size: 22, lh: 1.2, weight: 700, track: '0', sample: 'Your monthly usage' },
  { name: 'Body L', font: 'body', size: 20, lh: 1.5, weight: 400, track: '0', sample: 'See where every unit goes and what it costs you, in plain numbers.' },
  { name: 'Body', font: 'body', size: 16, lh: 1.55, weight: 400, track: '0', sample: 'Your bill is split into usage, fixed charges and taxes. Tap any line to see how it was calculated.' },
  { name: 'Small', font: 'body', size: 13, lh: 1.45, weight: 400, track: '0.01em', sample: 'Last updated 5 Oct 2026, 09:40' },
  { name: 'Label', font: 'body', size: 12, lh: 1.3, weight: 600, track: '0', sample: 'Estimated saving' },
];


const Doc = ({ kind, label }) => (
  <div className={`doc doc-${kind}`}>
    <span className="doc-label">{label}</span>
    <h4>Where you can save</h4>
    <p>Your average power cost is ₹11.80 per unit. That is ₹1.35 above the available open access rate.</p>
    <table>
      <tbody>
        <tr><td>Grid</td><td>₹9.40/unit</td></tr>
        <tr><td>Open access</td><td>₹6.85/unit</td></tr>
      </tbody>
    </table>
  </div>
);

export default function Typography() {
  return (
    <>
      <PageHeader
        eyebrow="Brand foundations"
        title="Typography"
        intro="Archivo for titles and the logo. IBM Plex Sans for body. IBM Plex Mono for numbers in select cases. Arial as fallback for body."
      />

      <Section title="Typefaces">
        <div className="grid-4">
          <div className="font-card">
            <div className="font-specimen" style={{ fontFamily: fonts.display.stack, fontWeight: 800 }}>Aa</div>
            <strong>{fonts.display.name}</strong>
            <p>{fonts.display.use}. Weights: Bold 700, ExtraBold 800, Black 900 (large headlines on posts). Falls back to {fonts.display.fallback}.</p>
            <a href="https://fonts.google.com/specimen/Archivo" target="_blank" rel="noreferrer">Google Fonts ↗</a>
          </div>
          <div className="font-card">
            <div className="font-specimen" style={{ fontFamily: fonts.body.stack, fontWeight: 400 }}>Aa</div>
            <strong>{fonts.body.name}</strong>
            <p>{fonts.body.use}. Weights: Light 300, Regular 400, Medium 500, SemiBold 600. Falls back to {fonts.body.fallback}.</p>
            <a href="https://fonts.google.com/specimen/IBM+Plex+Sans" target="_blank" rel="noreferrer">Google Fonts ↗</a>
          </div>
          <div className="font-card">
            <div className="font-specimen num">09</div>
            <strong>{fonts.mono.name}</strong>
            <p>{fonts.mono.use}. Regular 400, Medium 500. Apply with the <code>num</code> class. Falls back to {fonts.mono.fallback}.</p>
            <a href="https://fonts.google.com/specimen/IBM+Plex+Mono" target="_blank" rel="noreferrer">Google Fonts ↗</a>
          </div>
          <div className="font-card">
            <span className="tag">Fallback</span>
            <div className="font-specimen" style={{ fontFamily: fonts.fallback.stack }}>Aa</div>
            <strong>{fonts.fallback.name}</strong>
            <p>{fonts.fallback.use}</p>
            <a href="https://learn.microsoft.com/en-us/typography/font-list/arial" target="_blank" rel="noreferrer">Microsoft ↗</a>
          </div>
        </div>
      </Section>

      <Section title="Type scale" intro="Sentence case everywhere. Uppercase only for labels of one or two words.">
        <div className="type-scale">
          {scale.map((s) => (
            <div key={s.name} className="type-row">
              <div className="type-meta">
                <strong>{s.name}</strong>
                <span>{fonts[s.font].name} · {s.weight}</span>
                <span>{s.size}/{Math.round(s.size * s.lh)} · {s.track}</span>
              </div>
              <div
                className="type-sample"
                style={{ fontFamily: fonts[s.font].stack, fontSize: s.size, lineHeight: s.lh, fontWeight: s.weight, letterSpacing: s.track, textTransform: s.upper ? 'uppercase' : 'none' }}
              >
                {s.sample}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Numbers">
        <div className="rows">
          <div className="row"><span className="row-key">Body</span><p>Grid: ₹9.40/unit. Open access: ₹6.85/unit.</p></div>
          <div className="row"><span className="row-key">With <code>num</code></span><p>Grid: <span className="num">₹9.40</span>/unit. Open access: <span className="num">₹6.85</span>/unit.</p></div>
        </div>
        <p className="caption">Use <code>num</code> for figures that are compared or scanned: tables, tariffs, readings, bill lines. Keep running text in IBM Plex Sans.</p>
      </Section>

      <Section title="Headline style">
        <div className="grid-2">
          <div className="headline-demo" style={{ background: 'var(--violet-900)' }}>
            <span>Cut<br />Energy<br />Cost.</span>
          </div>
          <div className="spec-list">
            <div><span>Case</span><strong>Sentence case</strong></div>
            <div><span>Weight</span><strong>Archivo 800</strong></div>
            <div><span>Leading</span><strong>0.95–1.0</strong></div>
                                  </div>
        </div>
      </Section>

      <Section title="Fallback: Arial">
        <div className="fallback">
          <Doc kind="brand" label="Archivo + IBM Plex Sans" />
          <Doc kind="fallback" label="Arial" />
        </div>
      </Section>
    </>
  );
}
