import { asset } from '../brand/asset.js';
import { useState } from 'react';
import { PageHeader, Section, Callout } from '../components/ui.jsx';

const photos = [
  { src: asset('/assets/photos/meters.jpg'), alt: 'Rows of electricity meters', theme: 'Meters' },
  { src: asset('/assets/photos/solar.jpg'), alt: 'Solar panels against a pale sky', theme: 'Solar' },
  { src: asset('/assets/photos/wind-turbine.jpg'), alt: 'Wind turbine above open land', theme: 'Wind' },
  { src: asset('/assets/photos/wind-hills.jpg'), alt: 'Wind turbines on green hills', theme: 'Landscape' },
];

const treatments = [
  { id: 'none', label: 'Natural' },
  { id: 'violet', label: 'Violet wash' },
  { id: 'duotone', label: 'Duotone' },
];

export default function Photography() {
  const [treat, setTreat] = useState('violet');
  return (
    <>
      <PageHeader
        eyebrow="Imagery"
        title="Photography"
      />

      <Section title="Treatment">
        <div className="seg">
          {treatments.map((t) => (
            <button key={t.id} className={treat === t.id ? 'active' : ''} onClick={() => setTreat(t.id)}>{t.label}</button>
          ))}
        </div>
        <div className="grid-2">
          {photos.slice(1, 3).map((p) => (
            <div key={p.src} className={`treat treat-${treat}`}><img src={p.src} alt={p.alt} /></div>
          ))}
        </div>
        <Callout tone="note">Violet wash: multiply Violet 300 at about 45% over the photo. Duotone: map shadows to Violet 900 and highlights to Violet 200.</Callout>
      </Section>
    </>
  );
}
