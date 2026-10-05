import { useRef, useState } from 'react';
import { asset } from '../brand/asset.js';
import { hexOf, gradients, gradientCss } from '../brand/tokens.js';
import { PageHeader, Section, useCopy } from '../components/ui.jsx';

const gallery = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => asset(`/assets/illustrations/ill-${i}.jpg`));

// How each use shapes the canvas. bg: how the scheme background is applied.
const formats = {
  full: {
    label: 'Full page', bg: 'none',
    note: 'Transparent background. The scheme sets object colours only.',
    spec: () => 'Landscape 3:2 (1536 × 1024). Isolated illustration on a fully transparent background (PNG with alpha), to be placed on a page that already has its own background. No background colour, no floor plane, no frame, no border, no vignette. Only soft shadows directly under the platforms. Keep every element fully inside the canvas with clear space around it.',
  },
  square: {
    label: '1:1 box', bg: 'fill',
    note: 'The whole story fits inside the square. Nothing touches the edges.',
    spec: () => 'Square 1:1 (1024 × 1024). The background colour fills the square. The whole story fits inside with at least 8% clear margin on every side. Nothing is cropped and nothing touches or crosses the edges.',
  },
  circle: {
    label: 'Circle', bg: 'circle',
    note: 'Same as 1:1 box, contained in a circle. Transparent outside the circle.',
    spec: () => 'Square canvas 1:1 (1024 × 1024) with a centred, filled circle 92% of the canvas width. The background colour fills the circle only. Everything outside the circle is fully transparent (PNG with alpha). The whole story fits inside the circle with clear margin from its edge. Nothing crosses the circle edge.',
  },
  social: {
    label: 'Social media', bg: 'fill',
    note: 'Leaves empty space on one side for a headline.',
    spec: ({ size, side }) => `${size === 'portrait' ? 'Portrait 4:5 (1080 × 1350)' : 'Square 1:1 (1080 × 1080)'}. The background colour fills the canvas. Keep the ${side} 40% of the canvas completely empty: clean background only, for a headline to be added later. Place all illustration elements in the remaining 60%, fully inside the canvas.`,
  },
};

const sizes = { square: '1:1', portrait: '4:5' };
const sides = ['top', 'bottom', 'left', 'right'];


// Colour schemes, built from the design tokens. Each: background, two object colours, two accents, one dark for outlines.
const NAMES = {
  white: 'White', 'warm-white': 'Warm White', 'near-black': 'Near Black', 'electric-violet': 'Electric Violet',
  'electric-coral': 'Electric Coral', 'signal-yellow': 'Signal Yellow', 'energy-mint': 'Energy Mint', 'clear-blue': 'Clear Blue',
  'grey-200': 'Grey 200', 'grey-600': 'Grey 600',
};
const nameOf = (t) => NAMES[t] || t.replace('violet-', 'Violet ');
const colour = (t) => `${nameOf(t)} ${hexOf(t)}`;
const grad = (name) => gradients.find((g) => g.name === name);

const LIGHT_FG = { objects: ['white', 'violet-100'], accent: ['electric-violet', 'violet-400'], dark: 'near-black' };
const ON_ACCENT = { objects: ['white', 'warm-white'], accent: ['violet-900', 'electric-violet'], dark: 'near-black' };

const schemeList = [
  { id: 'white', label: 'White', bg: 'white', ...LIGHT_FG },
  { id: 'warm', label: 'Warm White', bg: 'warm-white', ...LIGHT_FG },
  { id: 'mist', label: 'Violet 100', bg: 'violet-100', objects: ['white', 'violet-200'], accent: ['electric-violet', 'violet-500'], dark: 'violet-900' },
  { id: 'violet', label: 'Electric Violet', bg: 'electric-violet', objects: ['white', 'violet-200'], accent: ['violet-400', 'violet-700'], dark: 'violet-900' },
  { id: 'deep', label: 'Violet 900', bg: 'violet-900', objects: ['white', 'violet-300'], accent: ['electric-violet', 'violet-400'], dark: 'near-black' },
  { id: 'black', label: 'Near Black', bg: 'near-black', objects: ['white', 'grey-200'], accent: ['electric-violet', 'violet-400'], dark: 'near-black' },
  { id: 'yellow', label: 'Signal Yellow', bg: 'signal-yellow', objects: ['white', 'warm-white'], accent: ['electric-violet', 'violet-400'], dark: 'near-black' },
  { id: 'coral', label: 'Electric Coral', bg: 'electric-coral', ...ON_ACCENT },
  { id: 'mint', label: 'Energy Mint', bg: 'energy-mint', ...ON_ACCENT },
  { id: 'blue', label: 'Clear Blue', bg: 'clear-blue', ...ON_ACCENT },
  { id: 'g-violet', label: 'Violet gradient', gradient: 'Violet', ...LIGHT_FG },
  { id: 'g-dawn', label: 'Dawn gradient', gradient: 'Dawn', ...LIGHT_FG },
  { id: 'g-daylight', label: 'Daylight gradient', gradient: 'Daylight', ...LIGHT_FG },
];

const schemes = Object.fromEntries(schemeList.map((sc) => {
  const g = sc.gradient && grad(sc.gradient);
  return [sc.id, {
    ...sc,
    swatch: g ? gradientCss(g) : `var(--${sc.bg})`,
    background: g ? `a soft vertical gradient, ${g.stops[0]} at the top, ${g.stops[1]} in the middle, ${g.stops[2]} at the bottom` : `flat solid ${colour(sc.bg)}`,
    objects: `Platforms and objects in ${colour(sc.objects[0])} and ${colour(sc.objects[1])}. Accents in ${colour(sc.accent[0])} and ${colour(sc.accent[1])}. Outlines and dark details in ${colour(sc.dark)}.`,
  }];
}));

function colourSpec(scheme, format) {
  const how = formats[format].bg;
  const bg = how === 'none' ? 'Background: none. Fully transparent.'
    : how === 'circle' ? `Circle fill: ${scheme.background}. Outside the circle: transparent.`
    : `Background: ${scheme.background}, edge to edge. Gradients only on the background, never on objects.`;
  return `${bg}\n${scheme.objects}`;
}



const INTRO = `Create an illustration for Neufin Energy, a company that helps Indian businesses buy and manage electricity.

HOW TO READ THIS PROMPT
- STORY is the brief and decides WHAT to draw. Draw what it asks for, nothing more.
- STYLE, COLOURS, FORMAT and RULES decide HOW it looks. Follow them exactly.`;

const STYLE = `STYLE (fixed)
- Isometric illustration, true 30° isometric projection. Flat vector shapes, thin even outlines, slightly rounded corners.
- The subject stands on a floating rounded square platform with a soft shadow beneath.
- Minimal shading: one light and one mid tone per surface. No gradients on objects, no textures, no glow, no 3D rendering, no photorealism.
- If people appear: simplified figures with no facial detail, dressed for their role, varied in gender, age and build, in an Indian workplace.
- No text, letters, numbers or logos anywhere in the image.`;

const CONTENT = `CONTENT (from the story only)
- Draw exactly what the story describes. Do not add objects, buildings, people, trees, extra platforms or connecting lines the story does not mention or clearly need.
- If the story names one subject, show that one subject on a single platform.
- Only if the story describes several connected parts, give each part its own platform and link them with thin lines and small hollow circle nodes.
- Interpret the story literally first, then choose the clearest composition and viewing angle for it.`;

const RULES = `RULES
- Use only the colours listed above. No other colours.
- Keep it uncluttered, with generous empty space. When in doubt, leave it out.
- Consistent line weight and lighting throughout, light from the top left.
- Calm, professional and credible. Not playful or cartoonish.`;

function buildPrompt({ story, format, bg, size, side }) {
  return [
    INTRO,
    STYLE,
    CONTENT,
    `COLOURS\n${colourSpec(schemes[bg], format)}`,
    `FORMAT\n${formats[format].spec({ size, side })}`,
    `STORY\n${story.trim() || 'Describe the story here.'}`,
    RULES,
  ].join('\n\n');
}

const Chips = ({ s }) => (
  <span className="scheme-chip" style={{ background: s.swatch }}><i style={{ background: `var(--${s.accent[0]})` }} /></span>
);

export default function Illustration() {
  const [story, setStory] = useState('');
  const [format, setFormat] = useState('square');
  const [bg, setBg] = useState('white');
  const [size, setSize] = useState('portrait');
  const [side, setSide] = useState('top');
  const [prompt, setPrompt] = useState('');
  const [toast, setToast] = useState(null);
  const [run, setRun] = useState(0);
  const timer = useRef();
  const outRef = useRef();

  const generate = () => {
    setPrompt(buildPrompt({ story, format, bg, size, side }));
    setRun((r) => r + 1);
    const extra = format === 'social' ? ` ${sizes[size]} · text ${side}` : '';
    setToast(`Prompt generated · ${formats[format].label}${extra} · ${schemes[bg].label}`);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2600);
    requestAnimationFrame(() => outRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
  };
  const [copied, copy] = useCopy();

  return (
    <>
      <PageHeader eyebrow="Imagery" title="Illustration" />

      <Section title="Style">
        <div className="ill-grid">
          {gallery.map((src, i) => <img key={src} src={src} alt={`Neufin illustration example ${i + 1}`} loading="lazy" />)}
        </div>
        <div className="rows ill-rules">
          <div className="row"><span className="row-key">Projection</span><p>Isometric. Objects on floating platforms, joined by thin network lines.</p></div>
          <div className="row"><span className="row-key">Subjects</span><p>Only what the story asks for. Nothing added.</p></div>
          <div className="row"><span className="row-key">People</span><p>Minimal, no facial detail, dressed for their role. Varied. Three at most.</p></div>
          <div className="row"><span className="row-key">Never</span><p>Text inside the image, colours outside the chosen scheme, gradients on objects, photorealism.</p></div>
        </div>
      </Section>

      <Section title="Prompt generator" intro="Describe the story, choose where it will be used, then copy the prompt into ChatGPT.">
        <div className="gen">
          <label className="gen-field">
            <span>Story</span>
            <textarea rows={4} value={story} onChange={(e) => setStory(e.target.value)} placeholder="Example: A plant head is confused by a power bill that is ₹84,000 higher than last month. Neufin finds the cause: demand charges on unused capacity." />
          </label>
          <div className="gen-field">
            <span>Use</span>
            <div className="seg">
              {Object.entries(formats).map(([k, v]) => <button key={k} className={format === k ? 'active' : ''} onClick={() => setFormat(k)}>{v.label}</button>)}
            </div>
            <p className="gen-note">{formats[format].note}</p>
          </div>
          {format === 'social' && (
            <div className="gen-row">
              <div className="gen-field">
                <span>Size</span>
                <div className="seg">
                  {Object.entries(sizes).map(([k, v]) => <button key={k} className={size === k ? 'active' : ''} onClick={() => setSize(k)}>{v}</button>)}
                </div>
              </div>
              <div className="gen-field">
                <span>Space for text</span>
                <div className="seg">
                  {sides.map((sd) => <button key={sd} className={side === sd ? 'active' : ''} onClick={() => setSide(sd)}>{sd[0].toUpperCase() + sd.slice(1)}</button>)}
                </div>
              </div>
            </div>
          )}
          <div className="gen-field">
            <span>Colour scheme</span>
            <div className="scheme-pick">
              {Object.entries(schemes).map(([k, v]) => <button key={k} className={bg === k ? 'active' : ''} onClick={() => setBg(k)}><Chips s={v} />{v.label}</button>)}
            </div>
          </div>
          <div><button className="gen-btn" onClick={generate}>Generate prompt</button></div>
          {prompt && (
            <div ref={outRef} key={run} className="code-block gen-fresh">
              <button onClick={() => copy(prompt)}>{copied === prompt ? 'Copied' : 'Copy'}</button>
              <pre className="gen-out">{prompt}</pre>
            </div>
          )}
        </div>
      </Section>
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}
