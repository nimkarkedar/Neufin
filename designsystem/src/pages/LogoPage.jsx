import { asset } from '../brand/asset.js';
import { Logo } from '../components/Logo.jsx';
import { ClearSpace, Placement } from '../components/LogoRules.jsx';
import { PageHeader, Section, DoDont, Figure } from '../components/ui.jsx';

const lockups = [
  { variant: 'stacked', name: 'Primary (stacked)', note: 'Default lockup. Use whenever there is room.', h: 72 },
  { variant: 'horizontal', name: 'Horizontal', note: 'For narrow, wide spaces: headers, footers, email signatures.', h: 34 },
  { variant: 'symbol', name: 'Symbol', note: 'App icons, favicons, merchandise, social avatars.', h: 72 },
];

const colourways = [
  { bg: 'var(--electric-violet)', fg: 'var(--warm-white)', label: 'Warm White on Electric Violet', primary: true },
  { bg: 'var(--near-black)', fg: 'var(--warm-white)', label: 'Warm White on Near Black' },
  { bg: 'var(--warm-white)', fg: 'var(--near-black)', label: 'Near Black on Warm White' },
  { bg: 'var(--warm-white)', fg: 'var(--electric-violet)', label: 'Electric Violet on Warm White' },
  { bg: `url(${asset('/assets/photos/wind-hills.jpg')}) center/cover`, fg: 'var(--warm-white)', label: 'Warm White on calm photography' },
];

const downloads = ['stacked', 'horizontal', 'symbol'].flatMap((v) =>
  ['white', 'black', 'violet'].map((c) => ({ v, c, href: asset(`/assets/logo/neufin-${v}-${c}.svg`) })));

export default function LogoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Brand foundations"
        title="Logo"
      />

      <Section title="Lockups">
        <div className="grid-3">
          {lockups.map((l) => (
            <div key={l.variant} className="tile">
              <div className="tile-stage stage-light"><Logo variant={l.variant} height={l.h} color="var(--near-black)" /></div>
              <div className="tile-meta"><strong>{l.name}</strong><p>{l.note}</p></div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Colourways" intro="The logo is always one solid colour.">
        <div className="grid-2">
          {colourways.map((c) => (
            <div key={c.label} className="tile">
              <div className="tile-stage tall" style={{ background: c.bg }}><Logo height={64} color={c.fg} /></div>
              <div className="tile-meta"><strong>{c.label}</strong>{c.primary && <span className="pill">Hero</span>}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Construction">
        <div className="grid-2">
          <Figure src={asset('/assets/photos/logo-construction.jpg')} alt="Neufin symbol on its construction grid" caption="Symbol construction grid (from the brand PDF)." />
          <div className="spec-list">
            <div><span>Grid</span><strong>3 columns × 5 rows</strong></div>
            <div><span>Module (x)</span><strong>Square terminal width</strong></div>
            <div><span>Band angle</span><strong>≈ 32° (rise 536 / run 850)</strong></div>
            <div><span>Clear space</span><strong>1x on all sides</strong></div>
            <div><span>Min. size, stacked</span><strong>24px / 12mm tall</strong></div>
            <div><span>Min. size, horizontal</span><strong>16px / 8mm tall</strong></div>
            <div><span>Min. size, symbol</span><strong>16px / 8mm</strong></div>
          </div>
        </div>
      </Section>

      <Section title="Clear space">
        <div className="clearspace"><ClearSpace /></div>
        <p className="caption">x is the square in the symbol. Keep x clear on every side.</p>
      </Section>

      <Section title="Placement">
        <Placement />
        <p className="caption">Keep at least 3x from the edges.</p>
      </Section>

      <Section title="Misuse">
        <div className="grid-3">
          <DoDont kind="do" caption="Use an approved colourway with strong contrast.">
            <div className="mini-stage" style={{ background: 'var(--electric-violet)' }}><Logo height={44} color="var(--warm-white)" /></div>
          </DoDont>
          <DoDont kind="dont" caption="Stretch, squash or skew the logo.">
            <div className="mini-stage stage-light"><Logo height={44} color="var(--near-black)" style={{ transform: 'scaleX(1.5)' }} /></div>
          </DoDont>
          <DoDont kind="dont" caption="Rotate the logo or the symbol.">
            <div className="mini-stage stage-light"><Logo height={44} color="var(--near-black)" style={{ transform: 'rotate(-12deg)' }} /></div>
          </DoDont>
          <DoDont kind="dont" caption="Recolour it in accent colours or gradients.">
            <div className="mini-stage stage-light"><Logo height={44} color="var(--electric-coral)" /></div>
          </DoDont>
          <DoDont kind="dont" caption="Place it on low-contrast colours.">
            <div className="mini-stage" style={{ background: 'var(--violet-400)' }}><Logo height={44} color="var(--violet-200)" /></div>
          </DoDont>
          <DoDont kind="dont" caption="Add shadows, outlines or effects.">
            <div className="mini-stage stage-light"><Logo height={44} color="var(--electric-violet)" style={{ filter: 'drop-shadow(3px 3px 0 var(--signal-yellow))' }} /></div>
          </DoDont>
        </div>
      </Section>

      <Section title="Downloads">
        <div className="download-grid">
          {downloads.map((d) => (
            <a key={d.href} href={d.href} download className="download">
              <span className={`download-chip chip-${d.c}`}><Logo variant={d.v} height={18} /></span>
              <span>{d.v} · {d.c}</span>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
