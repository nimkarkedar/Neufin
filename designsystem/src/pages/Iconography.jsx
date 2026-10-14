import { asset } from '../brand/asset.js';
import { PageHeader, Section, Figure } from '../components/ui.jsx';
import { icons } from '../brand/icons.js';
import { Icon } from '../components/Icon.jsx';

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
          {Object.keys(icons).map((name) => (
            <figure key={name} className="icon-cell">
              <Icon name={name} size={32} />
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
