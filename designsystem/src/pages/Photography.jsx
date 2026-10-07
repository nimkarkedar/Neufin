import { useState } from 'react';
import { asset } from '../brand/asset.js';
import { PageHeader, Section, Callout, DoDont } from '../components/ui.jsx';
import { PhotoPost, photos, layouts, treatments, fields } from '../components/PhotoPost.jsx';

const ratios = [
  { id: 'portrait', label: '4:5 · 1080 × 1350' },
  { id: 'square', label: '1:1 · 1080 × 1080' },
];

const shown = layouts.filter((l) => !l.hidden);
const byId = (id) => photos.find((p) => p.id === id);

// Which photo each layout is shown with in the Layouts section.
const examples = [
  { layout: 'ribbon', photo: 'electrician' },
  { layout: 'panel', photo: 'solar-site', headline: 'Solar power, bought at a fixed price.' },
  { layout: 'lens', photo: 'pylon-sky', headline: 'Know what every unit costs.' },
  { layout: 'cut', photo: 'factory-floor', headline: 'Lower energy costs for every shift.' },
  { layout: 'window', photo: 'pylon-lattice', headline: 'Contracts from 30 days to 15 years.' },
  { layout: 'blocks', photo: 'transformer-crew', headline: 'Power for plants across India.' },
];

function Seg({ items, value, onChange }) {
  return (
    <div className="seg">
      {items.map((o) => <button key={o.id} className={value === o.id ? 'active' : ''} onClick={() => onChange(o.id)}>{o.label}</button>)}
    </div>
  );
}

function TryIt() {
  const [photo, setPhoto] = useState(photos[0].id);
  const [layout, setLayout] = useState('ribbon');
  const [ratio, setRatio] = useState('portrait');
  const [treatment, setTreatment] = useState(null);
  const [field, setField] = useState(null);
  const [grid, setGrid] = useState(true);
  const [headline, setHeadline] = useState('Power that costs less, from sources you choose.');
  const L = layouts.find((l) => l.id === layout);
  const pickLayout = (id) => { setLayout(id); setTreatment(null); setField(null); };
  return (
    <div className="pp-try">
      <div className="pp-try-stage">
        <PhotoPost photo={byId(photo)} layout={layout} ratio={ratio} treatment={treatment ?? undefined} field={field ?? undefined} headline={headline} grid={grid} />
      </div>
      <div className="pp-try-controls">
        <div className="gen-field">
          <span>Photo</span>
          <div className="pp-thumbs">
            {photos.map((p) => (
              <button key={p.id} className={photo === p.id ? 'active' : ''} onClick={() => setPhoto(p.id)} aria-label={p.alt} title={p.alt}>
                <img src={asset(p.src)} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="gen-field"><span>Layout</span><Seg items={shown} value={layout} onChange={pickLayout} /></div>
        <div className="gen-field"><span>Size</span><Seg items={ratios} value={ratio} onChange={setRatio} /></div>
        <div className="gen-field">
          <span>Treatment</span>
          {L.fixed ? <p className="caption">Lens always uses duotone.</p> : <Seg items={treatments} value={treatment ?? L.treatment} onChange={setTreatment} />}
        </div>
        <div className="gen-field">
          <span>Block colour</span>
          <div className="pg-combos">
            {fields.map((f) => (
              <button key={f.token} title={f.label} aria-label={f.label} className={(field ?? L.field) === f.token ? 'active' : ''} style={{ background: `var(--${f.token})` }} onClick={() => setField(f.token)} />
            ))}
          </div>
        </div>
        <label className="gen-field">
          <span>Headline</span>
          <textarea rows={2} value={headline} onChange={(e) => setHeadline(e.target.value)} />
        </label>
        <label className="pp-check"><input type="checkbox" checked={grid} onChange={(e) => setGrid(e.target.checked)} /> Show grid</label>
      </div>
    </div>
  );
}

export default function Photography() {
  const [ratio, setRatio] = useState('portrait');
  return (
    <>
      <PageHeader eyebrow="Imagery" title="Photography" intro="Real photos placed on the Neufin grid, with the Stripe and violet over them." />

      <Section title="Choosing photos">
        <ul className="plain-list">
          <li>Real places and real work: plants, sites, factory floors and grid equipment, in India where possible.</li>
          <li>People busy with the task, not posing or looking at the camera.</li>
          <li>Natural light and true colour. No staged stock, light bulbs, glowing hands or handshakes.</li>
          <li>Strong lines, such as rows of panels, pylons, pipes or cables, and room to crop to 4:5 and 1:1.</li>
        </ul>
        <div className="pp-library">
          {photos.map((p) => <img key={p.id} src={asset(p.src)} alt={p.alt} loading="lazy" />)}
        </div>
      </Section>

      <Section title="Grid" intro="12 columns of 90 px on a 1080 px width: 12 × 15 modules at 4:5 and 12 × 12 at 1:1. Every overlay, block and text edge sits on a module line.">
        <div className="pp-pair">
          <PhotoPost photo={byId('solar-site')} layout="panel" ratio="portrait" headline="Solar power, bought at a fixed price." grid />
          <PhotoPost photo={byId('solar-site')} layout="panel" ratio="square" headline="Solar power, bought at a fixed price." grid />
        </div>
      </Section>

      <Section title="Treatment" intro="One treatment per photo. Natural is the default.">
        <div className="grid-3">
          {treatments.map((t) => (
            <figure key={t.id} className="pp-fig">
              <PhotoPost photo={byId('solar-site')} layout="plain" ratio="square" treatment={t.id} />
              <figcaption>{t.label}</figcaption>
            </figure>
          ))}
        </div>
        <Callout tone="note">Violet wash: Violet 300 multiplied at 45%. Duotone: shadows to Violet 900, highlights to Violet 200. Inside the ribbon, the photo is mapped to Violet 900 and Violet 400, and the middle lane to Violet 500 and white.</Callout>
      </Section>

      <Section title="Rules">
        <div className="grid-3">
          <DoDont kind="do" caption="Keep faces and the main subject clear of overlays.">
            <PhotoPost photo={byId('electrician')} layout="ribbon" ratio="square" />
          </DoDont>
          <DoDont kind="dont" caption="Put text straight on the photo. Text sits on a solid block or field.">
            <div className="post pp-bad" style={{ aspectRatio: '1 / 1' }}>
              <img src={asset(byId('factory-floor').src)} alt="" />
              <div className="post-head" style={{ left: '8cqw', top: '10cqw', width: '80cqw', fontSize: '9cqw', color: 'var(--warm-white)' }}>Lower energy costs for every shift.</div>
            </div>
          </DoDont>
          <DoDont kind="dont" caption="Curve the bands or use any angle other than 32°.">
            <div className="post pp-bad" style={{ aspectRatio: '1 / 1' }}>
              <img src={asset(byId('pylon-sky').src)} alt="" />
              <svg viewBox="0 0 300 300" className="post-art" aria-hidden="true">
                <path d="M-5 150 C80 150 120 60 305 90 V130 C130 100 90 190 -5 190Z" fill="var(--electric-violet)" opacity="0.85" />
              </svg>
            </div>
          </DoDont>
        </div>
      </Section>

      <Section title="Layouts">
        <Seg items={ratios} value={ratio} onChange={setRatio} />
        <div className="post-grid">
          {examples.map((e) => {
            const L = layouts.find((l) => l.id === e.layout);
            return (
              <figure key={e.layout} className="post-fig">
                <PhotoPost photo={byId(e.photo)} layout={e.layout} ratio={ratio} headline={e.headline} />
                <figcaption><strong>{L.label}</strong>{L.note}</figcaption>
              </figure>
            );
          })}
        </div>
      </Section>

      <Section title="Try it" intro="Pick a photo and a layout. Overlays stay on the grid and at 32°.">
        <TryIt />
      </Section>
    </>
  );
}
