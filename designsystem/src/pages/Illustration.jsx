import { useRef, useState } from 'react';
import { asset } from '../brand/asset.js';
import { formats, schemes, buildPrompt } from '../illustration/prompt.js';
import { PageHeader, Section, useCopy } from '../components/ui.jsx';

// Inspiration grid, 2 × 3. Files live in public/assets/illustrations/inspiration/. Add a number here when its file is added
// (empty slots show as blank tiles), then run `npm run references` to rebuild the Download all zip.
const filled = [1, 2, 3, 4, 5, 6];
const inspiration = [1, 2, 3, 4, 5, 6].map((i) => (filled.includes(i) ? asset(`/assets/illustrations/inspiration/${i}.jpg`) : null));

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
  const [format, setFormat] = useState(formats[0].id);
  const [scheme, setScheme] = useState(schemes[0].id);
  const [prompt, setPrompt] = useState('');
  const [toast, setToast] = useState(null);
  const [run, setRun] = useState(0);
  const [copied, copy] = useCopy();
  const timer = useRef();
  const outRef = useRef();

  const generate = () => {
    setPrompt(buildPrompt({ concept, format, scheme }));
    setRun((r) => r + 1);
    const f = formats.find((o) => o.id === format).label;
    const s = schemes.find((o) => o.id === scheme).label;
    setToast(`Prompt generated · ${f} · ${s}`);
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
          <li>Write the concept, pick what to create and the colour scheme, then generate and copy the prompt.</li>
          <li>In ChatGPT, attach 3–5 images from Inspiration, paste the prompt and send. The images set the style. The prompt sets the subject.</li>
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

      <Section title="Create a prompt">
        <div className="gen">
          <label className="gen-field">
            <span>1. Concept</span>
            <textarea rows={4} value={concept} onChange={(e) => setConcept(e.target.value)} placeholder="Example: A factory buys power from several solar and wind sources and gets one bill." />
          </label>
          <div className="gen-field">
            <span>2. What to create</span>
            <Choice items={formats} value={format} onChange={setFormat} />
          </div>
          <div className="gen-field">
            <span>3. Colour scheme</span>
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
