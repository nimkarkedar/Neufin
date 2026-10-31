import { asset } from '../brand/asset.js';
import { contrast, hexOf } from '../brand/tokens.js';
import { SYMBOL, LUMEN, BY_NEUFIN } from '../brand/lumen-logo-paths.js';
import { LumenLogo } from '../components/LumenLogo.jsx';
import { PageHeader, Section, DoDont } from '../components/ui.jsx';

// Lumen, Neufin Energy's software, as an endorsed sub-brand (Kedar, 2026-10-31).
// Source artwork: designsystem/Lumen-logo.svg; paths in src/brand/lumen-logo-paths.js.

const lockups = [
  { variant: 'full', name: 'Logo', note: 'The bulb, Lumen and By Neufin Energy. Use it everywhere there is room.', h: 72 },
  { variant: 'symbol', name: 'Bulb', note: 'Only where the name Lumen sits right beside it in text: a menu item, the product’s app bar, an app icon, a favicon.', h: 72 },
];

// Every pairing passes 4.5:1, so the small endorsement line reads at AA. White on Energy Mint
// (2.3:1) and on Clear Blue (3.8:1) fail, so both take Near Black. Electric Coral stays a Neufin
// colour (Kedar): never Lumen's own background, only a Neufin coral panel showing Lumen at work,
// with the logo in Near Black (5.8:1; White is 3.1:1).
const colourways = [
  { bg: 'electric-violet', fg: 'white', label: 'White on Electric Violet', primary: true },
  { bg: 'signal-yellow', fg: 'near-black', label: 'Near Black on Signal Yellow' },
  { bg: 'energy-mint', fg: 'near-black', label: 'Near Black on Energy Mint' },
  { bg: 'clear-blue', fg: 'near-black', label: 'Near Black on Clear Blue' },
  { bg: 'near-black', fg: 'white', label: 'White on Near Black' },
  { bg: 'white', fg: 'near-black', label: 'Near Black on White' },
];

const ratio = (bg, fg) => `${contrast(hexOf(bg), hexOf(fg)).toFixed(1)}:1`;

// The website's text-on-photo header (StripeHeader `over`): the photo, the Violet wash
// (Violet 300 multiplied at 45%), then Violet 900 at 35%. Contact's dark city photo.
const photoStage = {
  background: [
    'linear-gradient(color-mix(in srgb, var(--violet-900) 35%, transparent), color-mix(in srgb, var(--violet-900) 35%, transparent))',
    'linear-gradient(color-mix(in srgb, var(--violet-300) 45%, white), color-mix(in srgb, var(--violet-300) 45%, white))',
    `url(${asset('/assets/photos/bengaluru-night.jpg')}) 50% 0%/auto 200%`,
  ].join(', '),
  backgroundBlendMode: 'normal, multiply, normal',
};

const relationship = [
  ['What Lumen is', 'Neufin Energy’s software: it checks every bill, holds suppliers to their contracts, tracks solar and batteries, and switches to the cheapest source. A product inside the Neufin brand, not a separate company.'],
  ['Kind of sub-brand', 'Endorsed. Lumen has its own name and mark, and always carries By Neufin Energy.'],
  ['Who leads', 'Neufin. The Neufin logo marks every surface: the website header and footer, decks, documents. The Lumen logo sits inside them, on Lumen’s own page, its screens and Lumen material.'],
  ['The two together', 'Never side by side as a pair, joined by a line or a plus, or at the same size. When both are on one surface, Neufin signs off in its usual place and Lumen is the subject, well apart.'],
  ['Colour', 'One colour: White or Near Black, on the solid colours below. Electric Coral stays a Neufin colour: never Lumen’s own background (a cover, a tile, the product). Where a Neufin coral panel shows Lumen at work, as in Run and optimise’s How it works, the logo is Near Black (5.8:1); White is 3.1:1 and fails.'],
  ['Endorsement line', 'Part of the logo. Never remove it, retype it or change its words. The bulb alone only where the name is beside it in text.'],
  ['Shape', 'The band across the bulb steps at the Stripe’s angle (536 / 850, 32.2°) and keeps one thickness round the step, built like the Neufin symbol. That is the family link: don’t redraw it. The rays and the base are centred on the bulb.'],
];

const naming = [
  ['Write', 'Lumen, with a capital L, like any name. On a page that isn’t about Lumen, the first mention says what it is: “Lumen, Neufin’s software”.'],
  ['Don’t write', 'LUMEN, Lumen™, Neufin Lumen, the Lumen app, Lumen platform.'],
  ['By Neufin Energy', 'Lives in the logo. Running text doesn’t repeat it.'],
];

// x = the cap height of the B in By Neufin Energy, in logo units (the logo is 186 × 58).
const X = 11.72;
const LW = 186;
const LH = 58;

function ClearSpace() {
  const sq = [
    [-X, LH / 2 - X / 2], [LW, LH / 2 - X / 2],
    [LW / 2 - X / 2, -X], [LW / 2 - X / 2, LH],
  ];
  return (
    <svg viewBox={`${-X - 14} ${-X - 14} ${LW + 2 * X + 28} ${LH + 2 * X + 28}`} className="rule-art" role="img" aria-label="Clear space of x around the Lumen logo">
      <rect x={-X} y={-X} width={LW + 2 * X} height={LH + 2 * X} fill="none" stroke="var(--violet-400)" strokeWidth="0.4" strokeDasharray="1.5 1.5" />
      {sq.map(([x, y], i) => <rect key={i} x={x} y={y} width={X} height={X} fill="var(--violet-200)" />)}
      {/* x measured beside the B: a bracket the height of its capital. */}
      <path d={`M52.6 42.34H54.6M53.6 42.34V54.06M52.6 54.06H54.6`} stroke="var(--electric-violet)" strokeWidth="0.5" fill="none" />
      <text x={49.6} y={49.8} textAnchor="middle" fontSize="4.6" fill="var(--electric-violet)" fontFamily="var(--font-body)">x</text>
      <g fill="var(--near-black)">{[...SYMBOL, ...LUMEN, ...BY_NEUFIN].map((d, i) => <path key={i} d={d} />)}</g>
      {sq.map(([x, y], i) => (
        <text key={i} x={x + X / 2} y={y + X / 2 + 1.6} textAnchor="middle" fontSize="4.6" fill="var(--near-black)" fontFamily="var(--font-body)">x</text>
      ))}
    </svg>
  );
}

// Misuse pieces drawn from the paths: without the endorsement line, and in two colours.
const NoEndorsement = () => (
  <svg viewBox="0 0 186 54" style={{ height: 36, width: 'auto', display: 'block' }} fill="var(--near-black)" aria-hidden="true">
    {[...SYMBOL, ...LUMEN].map((d, i) => <path key={i} d={d} />)}
  </svg>
);

const TwoColour = () => (
  <svg viewBox="0 0 186 58" style={{ height: 44, width: 'auto', display: 'block' }} aria-hidden="true">
    <g fill="var(--electric-violet)">{SYMBOL.map((d, i) => <path key={i} d={d} />)}</g>
    <g fill="var(--near-black)">{[...LUMEN, ...BY_NEUFIN].map((d, i) => <path key={i} d={d} />)}</g>
  </svg>
);

const downloads = ['full', 'symbol'].flatMap((v) =>
  ['white', 'black'].map((c) => ({ v, c, href: asset(`/assets/logo/lumen-${v}-${c}.svg`) })));

export default function LumenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Brand foundations"
        title="Lumen"
        intro="Lumen is Neufin Energy’s software, and the one sub-brand. It has its own name and mark and always carries By Neufin Energy, so it reads as a Neufin product."
      />

      <Section title="Lockups">
        <div className="grid-2">
          {lockups.map((l) => (
            <div key={l.variant} className="tile">
              <div className="tile-stage stage-light"><LumenLogo variant={l.variant} height={l.h} color="var(--near-black)" /></div>
              <div className="tile-meta"><strong>{l.name}</strong><p>{l.note}</p></div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Brand relationship">
        <div className="rows">
          {relationship.map(([k, v]) => <div key={k} className="row"><span className="row-key">{k}</span><p>{v}</p></div>)}
        </div>
      </Section>

      <Section title="Colourways" intro="One colour, White or Near Black, chosen so the endorsement line passes WCAG AA (4.5:1). White on Energy Mint (2.3:1) and on Clear Blue (3.8:1) fail, so both take Near Black. Electric Coral stays a Neufin colour: Lumen appears on it only inside a Neufin coral panel, in Near Black (5.8:1).">
        <div className="grid-2">
          {colourways.map((c) => (
            <div key={c.label} className="tile">
              <div className="tile-stage tall" style={{ background: `var(--${c.bg})` }}><LumenLogo height={64} color={`var(--${c.fg})`} /></div>
              <div className="tile-meta"><strong>{c.label}</strong>{c.primary && <span className="pill">Hero</span>}<p>{ratio(c.bg, c.fg)}</p></div>
            </div>
          ))}
          <div className="tile">
            <div className="tile-stage tall" style={photoStage}><LumenLogo height={64} color="var(--white)" /></div>
            <div className="tile-meta"><strong>White on a dark photo</strong><p>With the website header’s Violet wash and Violet 900 layer; on sky, clear of lights (7.3:1 here). Measure every use: 4.5:1 or better behind the endorsement line.</p></div>
          </div>
        </div>
      </Section>

      <Section title="Construction">
        <div className="grid-2">
          <div className="clearspace"><ClearSpace /></div>
          <div className="spec-list">
            <div><span>Parts</span><strong>Bulb, Lumen, By Neufin Energy</strong></div>
            <div><span>Band angle</span><strong>32.2°, the Stripe’s (rise 536 / run 850)</strong></div>
            <div><span>Band thickness</span><strong>The same on the slope as on the flat</strong></div>
            <div><span>Module (x)</span><strong>Height of the B in By Neufin Energy</strong></div>
            <div><span>Clear space</span><strong>1x on all sides</strong></div>
            <div><span>Min. size, logo</span><strong>32px / 12mm tall</strong></div>
            <div><span>Min. size, bulb</span><strong>16px / 6mm</strong></div>
          </div>
        </div>
        <p className="caption">Below 32px the endorsement line stops being readable: use the bulb with the name in text beside it.</p>
      </Section>

      <Section title="Motion" intro="Where Lumen is shown at work, the bulb lights up: its five rays dim and switch back on one after another, left to right, once every 4 seconds, then hold. The bulb and the words stay still.">
        <div className="tile">
          <div className="tile-stage tall stage-light"><LumenLogo live height={72} color="var(--near-black)" /></div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Where</span><p>Once per page, where Lumen does its work, such as over the Lumen card in Run and optimise’s How it works. Not in menus, headers or lists.</p></div>
          <div className="row"><span className="row-key">Timing</span><p><code>--duration-current</code> (4s), the same loop as the current along the website’s bands; each ray starts half of <code>--duration-fast</code> after the one before.</p></div>
          <div className="row"><span className="row-key">Reduced motion</span><p>Still.</p></div>
          <div className="row"><span className="row-key">Code</span><p><code>{'<LumenLogo live />'}</code>; the rays carry <code>.lumen-logo-ray</code>, animated by <code>.lumen-logo-live</code> in ui.css.</p></div>
        </div>
      </Section>

      <Section title="Naming in copy">
        <div className="rows">
          {naming.map(([k, v]) => <div key={k} className="row"><span className="row-key">{k}</span><p>{v}</p></div>)}
        </div>
      </Section>

      <Section title="Misuse">
        <div className="grid-3">
          <DoDont kind="do" caption="Use an approved colourway.">
            <div className="mini-stage" style={{ background: 'var(--electric-violet)' }}><LumenLogo height={44} color="var(--white)" /></div>
          </DoDont>
          <DoDont kind="dont" caption="Drop the endorsement line.">
            <div className="mini-stage stage-light"><NoEndorsement /></div>
          </DoDont>
          <DoDont kind="dont" caption="Use White on Energy Mint or Clear Blue: the small line fails contrast.">
            <div className="mini-stage" style={{ background: 'var(--energy-mint)' }}><LumenLogo height={44} color="var(--white)" /></div>
          </DoDont>
          <DoDont kind="dont" caption="Use White on Electric Coral (3.1:1), or make coral Lumen’s own colour.">
            <div className="mini-stage" style={{ background: 'var(--electric-coral)' }}><LumenLogo height={44} color="var(--white)" /></div>
          </DoDont>
          <DoDont kind="dont" caption="Colour the bulb and the words differently.">
            <div className="mini-stage stage-light"><TwoColour /></div>
          </DoDont>
          <DoDont kind="dont" caption="Stretch, rotate or add effects.">
            <div className="mini-stage stage-light"><LumenLogo height={44} color="var(--near-black)" style={{ transform: 'scaleX(1.4)' }} /></div>
          </DoDont>
        </div>
      </Section>

      <Section title="Downloads">
        <div className="download-grid">
          {downloads.map((d) => (
            <a key={d.href} href={d.href} download className="download">
              <span className={`download-chip chip-${d.c}`}><LumenLogo variant={d.v} height={18} /></span>
              <span>{d.v === 'full' ? 'logo' : 'bulb'} · {d.c === 'black' ? 'near black' : 'white'}</span>
            </a>
          ))}
        </div>
        <p className="caption">Code: <code>{'<LumenLogo variant="full" height={48} />'}</code> in <code>src/components/LumenLogo.jsx</code>; colour follows CSS <code>color</code>.</p>
      </Section>
    </>
  );
}
