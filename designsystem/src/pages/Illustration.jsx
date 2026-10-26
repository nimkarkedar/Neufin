import { useRef, useState } from 'react';
import { asset } from '../brand/asset.js';
import { kinds, formats, schemes, buildPrompt } from '../illustration/prompt.js';
import { PageHeader, Section, useCopy } from '../components/ui.jsx';

// Inspiration grid, 2 × 3. Files live in public/assets/illustrations/inspiration/. Add a number here when its file is added
// (empty slots show as blank tiles), then run `npm run references` to rebuild the Download all zip.
const filled = [1, 2, 3, 4, 5, 6];
const inspiration = [1, 2, 3, 4, 5, 6].map((i) => (filled.includes(i) ? asset(`/assets/illustrations/inspiration/${i}.jpg`) : null));

// Spot illustrations supplied by Kedar (2026-10-26), in public/assets/illustrations/.
const spots = [
  { file: 'value-ownership.png', label: 'An arrow rising out of a road between blocks: extreme ownership' },
  { file: 'value-customer.png', label: 'Power lines running into a factory: customer obsession' },
  { file: 'value-solution.png', label: 'Lines winding round a block to reach a building: a solution mindset' },
  { file: 'value-respect.png', label: 'Two flyovers meeting at one point: respect' },
  { file: 'hire-call.png', label: 'A video call at a desk: screening call' },
  { file: 'hire-case.png', label: 'Working through charts at a laptop: case study' },
  { file: 'hire-deep-dive.png', label: 'Presenting charts to a small room: deep-dive interview' },
  { file: 'hire-founders.png', label: 'Three people talking at a table: founders round' },
  { file: 'step-bill.png', label: 'A power bill on bands of power: share your bills' },
  { file: 'step-quote.png', label: 'A bill with a 48-hour timer: get a quote' },
  { file: 'step-agreement.png', label: 'A pen signing a page: sign the agreement' },
  { file: 'step-power.png', label: 'A calendar with a power badge: power starts' },
];

// Full-card illustrations supplied by Kedar (2026-10-26), in public/assets/illustrations/:
// 4:5, on Energy Mint (recoloured to the exact token), shown as image cards with the text at the top.
const cardArt = [
  { file: 'plan-solar.jpg', label: 'A solar panel on a band of power: solar plans' },
  { file: 'plan-wind.jpg', label: 'A wind turbine where bands meet: wind plans' },
  { file: 'plan-battery.jpg', label: 'A battery with bands running in and out: battery plans' },
  { file: 'plan-exchange.jpg', label: 'A band stepping up and down like a daily price: exchange plans' },
];

function Choice({ items, value, onChange }) {
  return (
    <div className="choice">
      {items.map((o) => (
        <button key={o.id} className={value === o.id ? 'active' : ''} onClick={() => onChange(o.id)}>
          {o.swatch && <i style={{ background: o.swatch[0] }}><b style={{ background: o.swatch[1] }} /></i>}
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function Illustration() {
  const [concept, setConcept] = useState('');
  const [kind, setKind] = useState(kinds[0].id);
  const [format, setFormat] = useState(formats[0].id);
  const [scheme, setScheme] = useState(schemes[0].id);
  const [prompt, setPrompt] = useState('');
  const [toast, setToast] = useState(null);
  const [run, setRun] = useState(0);
  const [copied, copy] = useCopy();
  const timer = useRef();
  const outRef = useRef();

  const generate = () => {
    setPrompt(buildPrompt({ concept, kind, format, scheme }));
    setRun((r) => r + 1);
    const k = kinds.find((o) => o.id === kind).label;
    const f = formats.find((o) => o.id === format).label;
    const s = schemes.find((o) => o.id === scheme).label;
    setToast(`Prompt generated · ${k} · ${f} · ${s}`);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2600);
    requestAnimationFrame(() => outRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
  };

  return (
    <>
      <PageHeader eyebrow="Imagery" title="Illustration" />

      <Section title="How it works">
        <ul className="plain-list">
          <li>Illustrations are flat, built from the bands of the Neufin logo, in violets and Warm White with one small accent at most. No people, no text.</li>
          <li>Every illustration uses the graphic device: thick parallel bands that run straight and step at the Stripe's 32° angle with a crisp corner. The bands carry the message.</li>
          <li>The concept decides the subject. Describe it plainly; nothing else is added. Towers, factories and roads appear only when the concept names them.</li>
          <li>Write the concept, pick what it shows (a stand-alone object, an icon-like symbol or a scene), what to create and the colour scheme, then generate and copy the prompt.</li>
          <li>In ChatGPT, attach 3–5 images from Inspiration, paste the prompt and send. The images set the style only: colour and how the bands are drawn. The prompt sets the subject.</li>
          <li>Keep the results you like. They get added to Inspiration and make the next ones more consistent.</li>
        </ul>
      </Section>

      <Section title="Inspiration">
        <p className="insp-all"><a href={asset('/assets/illustrations/neufin-references.zip')} download>Download all</a></p>
        <div className="insp-grid">
          {inspiration.map((src, i) => (src ? (
            <figure key={i} className="insp-item">
              <img src={src} alt={`Illustration inspiration ${i + 1}`} loading="lazy" />
              <a href={src} download={`neufin-reference-${i + 1}.jpg`} className="insp-dl">Download</a>
            </figure>
          ) : <div key={i} className="insp-empty" />))}
        </div>
      </Section>

      <Section title="Spot illustrations" intro="Round spots on Electric Coral, one idea each, for cards that carry a single thought. In use on the website's Careers page: How we work (one per value, on Electric Coral) Our hiring process (one per step, on Signal Yellow), and Buy cheaper power's steps (on Electric Coral). Transparent PNG, shown at 160 to 200px.">
        <div className="insp-grid">
          {spots.map((s) => (
            <figure key={s.file} className="insp-item">
              <img src={asset(`/assets/illustrations/${s.file}`)} alt={s.label} loading="lazy" />
            </figure>
          ))}
        </div>
      </Section>

      <Section title="Card illustrations" intro="Full-card art, 4:5, one subject in the lower part and open sky at the top for the card's title and line. In use on the website's Buy cheaper power page, Energy plans that fit every business, on Energy Mint with Near Black text (White fails contrast on mint).">
        <div className="insp-grid">
          {cardArt.map((s) => (
            <figure key={s.file} className="insp-item">
              <img src={asset(`/assets/illustrations/${s.file}`)} alt={s.label} loading="lazy" />
            </figure>
          ))}
        </div>
      </Section>

      <Section title="Create a prompt">
        <div className="gen">
          <label className="gen-field">
            <span>1. Concept</span>
            <textarea rows={4} value={concept} onChange={(e) => setConcept(e.target.value)} placeholder="Example: A factory buys power from several solar and wind sources and gets one bill." />
          </label>
          <div className="gen-field">
            <span>2. What it shows</span>
            <Choice items={kinds} value={kind} onChange={setKind} />
          </div>
          <div className="gen-field">
            <span>3. What to create</span>
            <Choice items={formats} value={format} onChange={setFormat} />
          </div>
          <div className="gen-field">
            <span>4. Colour scheme</span>
            <Choice items={schemes} value={scheme} onChange={setScheme} />
          </div>
          <div><button className="gen-btn" onClick={generate}>Generate prompt</button></div>
          {prompt && (
            <div ref={outRef} key={run} className="code-block gen-fresh">
              <button onClick={() => copy(prompt)}>{copied === prompt ? 'Copied' : 'Copy'}</button>
              <pre className="gen-out">{prompt}</pre>
            </div>
          )}
          {prompt && <p className="gen-note">Attach 3–5 images from Inspiration before sending.</p>}
        </div>
      </Section>

      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}
