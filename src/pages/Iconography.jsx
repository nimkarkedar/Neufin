import { asset } from '../brand/asset.js';
import { PageHeader, Section, Figure } from '../components/ui.jsx';

// Placeholder line icons drawn in the house style until the Streamline SVGs are added.
const sample = {
  bolt: 'M13 3 5 14h6l-1 7 8-11h-6l1-7Z',
  meter: 'M4 15a8 8 0 1 1 16 0M12 15l4-5M3 19h18',
  leaf: 'M5 19C5 10 10 5 19 5c0 9-5 14-14 14Zm0 0 7-7',
  bill: 'M6 3h12v18l-3-2-3 2-3-2-3 2V3Zm3 5h6m-6 4h6m-6 4h3',
  home: 'M4 11 12 4l8 7v9H4v-9Zm6 9v-5h4v5',
  chart: 'M4 20V10m6 10V4m6 16v-7m4 7H2',
};

export default function Iconography() {
  return (
    <>
      <PageHeader
        eyebrow="Imagery"
        title="Iconography"
        intro="Streamline Duotone icons."
      />

      <Section title="Style">
        <div className="icon-row">
          {Object.entries(sample).map(([name, d]) => (
            <figure key={name} className="icon-cell">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="var(--violet-900)" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter">
                <path d={d} fill="var(--violet-100)" />
              </svg>
              <figcaption>{name}</figcaption>
            </figure>
          ))}
        </div>
        <div className="spec-list spec-inline">
          <div><span>Source</span><strong><a href="https://www.streamlinehq.com/icons/streamline-duotone" target="_blank" rel="noreferrer">Streamline Duotone</a> (licence to be purchased)</strong></div>
          <div><span>Stroke</span><strong>Violet 900 on light, Warm White on dark</strong></div>
          <div><span>Fill (duotone)</span><strong>Violet 100 on light, Violet 700 on dark</strong></div>
          <div><span>Grid</span><strong>24 × 24, 1.75px stroke, square caps</strong></div>
          <div><span>Sizes</span><strong>16, 20, 24, 32, 48</strong></div>
        </div>
      </Section>

      <Section title="Reference set">
        <Figure src={asset('/assets/icons-reference.png')} alt="Streamline Duotone icon set reference" caption="Streamline Duotone." className="figure-narrow" />
      </Section>
    </>
  );
}
