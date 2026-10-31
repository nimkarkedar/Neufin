import { asset } from '../brand/asset.js';
import { Logo } from '../components/Logo.jsx';
import { RingStamp, Stamp } from '../components/Stamp.jsx';
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
  // Violet wash: Violet 300 multiplied at 45%, the same treatment as on the Photography page.
  { bg: `linear-gradient(color-mix(in srgb, var(--violet-300) 45%, white), color-mix(in srgb, var(--violet-300) 45%, white)), url(${asset('/assets/photos/wind-hills.jpg')}) center/cover`, blend: 'multiply', fg: 'var(--warm-white)', label: 'Warm White on photography with violet wash' },
];

const downloads = [
  ...['stacked', 'horizontal', 'symbol'].flatMap((v) =>
    ['white', 'black', 'violet'].map((c) => ({ v, c, href: asset(`/assets/logo/neufin-${v}-${c}.svg`) }))),
  ...['stacked', 'horizontal'].map((v) => ({ v, c: 'two-colour', href: asset(`/assets/logo/neufin-${v}-two-colour.svg`) })),
];

const twoColour = { color: 'var(--near-black)', markColor: 'var(--electric-violet)' };

const twoColourRules = [
  ['Colours', 'Symbol in Electric Violet. Wordmark in Near Black. No other pairing.'],
  ['Backgrounds', 'White or Warm White only.'],
  ['Use for', 'Website and product headers, documents, presentations, email signatures, stationery.'],
  ['Everywhere else', 'Use a one-colour logo from Colourways.'],
];

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

      <Section title="Colourways" intro="One solid colour. The only exception is the two-colour logo below.">
        <div className="grid-2">
          {colourways.map((c) => (
            <div key={c.label} className="tile">
              <div className="tile-stage tall" style={{ background: c.bg, backgroundBlendMode: c.blend }}><Logo height={64} color={c.fg} /></div>
              <div className="tile-meta"><strong>{c.label}</strong>{c.primary && <span className="pill">Hero</span>}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Two-colour logo">
        <div className="grid-2">
          <div className="tile">
            <div className="tile-stage tall" style={{ background: 'var(--white)' }}><Logo height={64} {...twoColour} /></div>
            <div className="tile-meta"><strong>On White</strong></div>
          </div>
          <div className="tile">
            <div className="tile-stage tall" style={{ background: 'var(--warm-white)' }}><Logo height={64} {...twoColour} /></div>
            <div className="tile-meta"><strong>On Warm White</strong></div>
          </div>
        </div>
        <div className="rows two-colour-rules">
          {twoColourRules.map(([k, v]) => <div key={k} className="row"><span className="row-key">{k}</span><p>{v}</p></div>)}
        </div>
        <div className="grid-4 two-colour-donts">
          <DoDont kind="dont" caption="Swap the colours.">
            <div className="mini-stage" style={{ background: 'var(--white)' }}><Logo height={36} color="var(--electric-violet)" markColor="var(--near-black)" /></div>
          </DoDont>
          <DoDont kind="dont" caption="Use other colours.">
            <div className="mini-stage" style={{ background: 'var(--white)' }}><Logo height={36} color="var(--near-black)" markColor="var(--electric-coral)" /></div>
          </DoDont>
          <DoDont kind="dont" caption="Place it on colour or dark backgrounds.">
            <div className="mini-stage" style={{ background: 'var(--violet-200)' }}><Logo height={36} {...twoColour} /></div>
          </DoDont>
          <DoDont kind="dont" caption="Place it on photos or gradients.">
            <div className="mini-stage" style={{ background: `url(${asset('/assets/photos/solar.jpg')}) center/cover` }}><Logo height={36} {...twoColour} /></div>
          </DoDont>
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

      <Section title="Stamp" intro="The symbol inside a ring that reads Cut energy cost on your terms. A sign-off, not a logo: it never replaces the logo and never sits next to it.">
        <div className="tile">
          <div className="tile-stage stage-light stamp-demo">
            <Stamp size={160} style={{ color: 'var(--near-black)' }} />
            <div className="stamp-dark"><Stamp size={160} style={{ color: 'var(--warm-white)', opacity: 0.25 }} /></div>
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Where</span><p>Website footer, the back of printed pieces, the last slide of a deck.</p></div>
          <div className="row"><span className="row-key">Colour</span><p>One colour: Near Black or Warm White. On the dark footer, Warm White at 25% opacity.</p></div>
          <div className="row"><span className="row-key">Size</span><p>At least 96px across, so the lettering stays readable.</p></div>
          <div className="row"><span className="row-key">Motion</span><p>On the web, the ring may turn slowly while hovered (<code>--duration-spin</code>, one turn in 16s). The symbol stays upright. No motion when reduced motion is on.</p></div>
          <div className="row"><span className="row-key">Code</span><p><code>{'<Stamp size={160} ringClassName="…" />'}</code> in <code>src/components/Stamp.jsx</code>. SVG download: <a href={asset('/assets/stamp/neufin-stamp.svg')} download>neufin-stamp.svg</a>.</p></div>
        </div>
      </Section>

      <Section title="Ring stamp" intro="A line of text round a circle with an emblem or mark in the centre, like an ink stamp. For proof, such as a licence, laid over the thing it vouches for.">
        <div className="tile">
          <div className="tile-stage stage-light stamp-demo">
            <RingStamp text="Licensed by CERC · Power trading licence · " size={160} style={{ color: 'var(--electric-violet)', transform: 'rotate(-10deg)' }}>
              <Stamp size={48} style={{ color: 'var(--electric-violet)' }} />
            </RingStamp>
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Where</span><p>Proof points on the website, such as the home page's CERC licence (the regulator's emblem in the centre).</p></div>
          <div className="row"><span className="row-key">Text</span><p>Sentence case, a short phrase or two separated by a middle dot, written to fill the ring.</p></div>
          <div className="row"><span className="row-key">Colour</span><p>One colour: Electric Violet on light backgrounds. The centre keeps its own colours.</p></div>
          <div className="row"><span className="row-key">Placement</span><p>Tilted about 10° when laid over something, as a stamp would land. At least 120px across.</p></div>
          <div className="row"><span className="row-key">Code</span><p><code>{'<RingStamp text="…" size={140}>{centre}</RingStamp>'}</code> in <code>src/components/Stamp.jsx</code>.</p></div>
        </div>
      </Section>

      <Section title="Favicon" intro="The browser tab and home screen icon: the White symbol on an Electric Violet tile.">
        <div className="tile">
          <div className="tile-stage stage-light favicon-demo">
            {[64, 32, 16].map((s) => <img key={s} src={asset('/assets/logo/neufin-favicon.svg')} width={s} height={s} alt={`Favicon at ${s}px`} />)}
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Colours</span><p>Symbol in White on Electric Violet. No other pairing.</p></div>
          <div className="row"><span className="row-key">Shape</span><p>A square tile with soft corners (14 on 64). The phone home screen version is a full square; iOS rounds it.</p></div>
          <div className="row"><span className="row-key">Clear space</span><p>The symbol fills 40 of 64, so at least 1x stays clear on every side.</p></div>
          <div className="row"><span className="row-key">Files</span><p><a href={asset('/assets/logo/neufin-favicon.svg')} download>neufin-favicon.svg</a> (browser tab) and <a href={asset('/assets/logo/neufin-apple-icon.png')} download>neufin-apple-icon.png</a> (180 × 180, home screen). The website copies both in <code>scripts/sync-ds-assets.mjs</code>.</p></div>
        </div>
      </Section>

      <Section title="Downloads">
        <div className="download-grid">
          {downloads.map((d) => (
            <a key={d.href} href={d.href} download className="download">
              <span className={`download-chip chip-${d.c}`}><Logo variant={d.v} height={18} markColor={d.c === 'two-colour' ? 'var(--electric-violet)' : undefined} /></span>
              <span>{d.v} · {d.c}</span>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
