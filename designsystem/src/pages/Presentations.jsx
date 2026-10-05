import { asset } from '../brand/asset.js';
import { Logo } from '../components/Logo.jsx';
import { MARK } from '../brand/logo-paths.js';
import { STRIPE_SLOPE, markBand, stripePoints } from '../components/Stripe.jsx';
import { PageHeader, Section } from '../components/ui.jsx';

// Slides are laid out on a 1280 × 960 (4:3) grid. u() converts grid units to container width units.
const W = 1280;
const H = 960;
const M = 64; // margin
const u = (n) => `${(n / 12.8).toFixed(3)}cqw`;

const META = 'www.neufin.energy | Nov 2026';

// Region above the Stripe's top edge: flat at yL, down at the fixed angle, flat at yR. Used to crop photos.
function aboveStripe({ top, yL, kink, drop }) {
  const run = drop / STRIPE_SLOPE;
  return [[0, top], [W, top], [W, yL + drop], [kink + run, yL + drop], [kink, yL], [0, yL]].map((p) => p.join(',')).join(' ');
}

function Photo({ id, src, points, x = 0, y = 0, w = W, h = H }) {
  return (
    <>
      <clipPath id={id}><polygon points={points} /></clipPath>
      <image href={asset(src)} x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid slice" clipPath={`url(#${id})`} />
    </>
  );
}

function Slide({ n, bg = 'var(--white)', dark = false, art, children }) {
  const ink = dark ? 'var(--warm-white)' : 'var(--near-black)';
  return (
    <div className="slide" style={{ background: bg, color: ink }}>
      {art && <svg viewBox={`0 0 ${W} ${H}`} className="slide-art" aria-hidden="true">{art}</svg>}
      <div className="slide-abs" style={{ left: u(M), top: u(56) }}>
        {dark ? <Logo height={u(44)} color="var(--warm-white)" /> : <Logo height={u(44)} color="var(--near-black)" markColor="var(--electric-violet)" />}
      </div>
      <div className="slide-abs slide-mono" style={{ right: u(M), top: u(66), fontSize: u(18) }}>{META}</div>
      {children}
      <div className="slide-abs slide-mono" style={{ right: u(M), bottom: u(48), fontSize: u(18) }}>{String(n).padStart(2, '0')}</div>
    </div>
  );
}

const T = ({ x = M, y, w = W - 2 * M, size, weight = 800, lh = 1, font = 'display', style, children }) => (
  <div className="slide-abs" style={{ left: u(x), top: u(y), width: u(w), fontSize: u(size), fontWeight: weight, lineHeight: lh, fontFamily: `var(--font-${font})`, letterSpacing: font === 'display' ? '-0.02em' : 0, ...style }}>
    {children}
  </div>
);

/* ---------- Templates ---------- */

function Cover({ n }) {
  return (
    <Slide n={n} bg="var(--electric-violet)" dark art={<polygon points={stripePoints({ width: W, y: 620, thickness: 110, kinkX: 520, drop: 140 })} fill="var(--signal-yellow)" />}>
      <T y={200} size={104} weight={900} lh={0.95} w={1000}>Lower power costs for your 20 offices</T>
      <T y={540} size={28} weight={400} font="body">Proposal for Client name</T>
    </Slide>
  );
}

function Agenda({ n }) {
  const items = ['What you pay today', 'Where you can save', 'Your options', 'How we execute', 'What happens next'];
  return (
    <Slide n={n}>
      <T y={200} size={56} w={400}>Agenda</T>
      <div className="slide-abs slide-list" style={{ left: u(520), top: u(200), width: u(696) }}>
        {items.map((it, i) => (
          <div key={it} style={{ fontSize: u(32), padding: `${u(20)} 0`, borderTop: '1px solid var(--grey-200)' }}>
            <span className="slide-mono" style={{ fontSize: u(20), width: u(80), display: 'inline-block', color: 'var(--grey-600)' }}>{String(i + 1).padStart(2, '0')}</span>{it}
          </div>
        ))}
      </div>
    </Slide>
  );
}

function SectionDivider({ n }) {
  return (
    <Slide n={n} bg="var(--violet-900)" dark art={<polygon points={stripePoints({ width: W, y: 560, thickness: 120, kinkX: 700, drop: 160 })} fill="var(--electric-violet)" />}>
      <T y={220} size={28} weight={400} font="mono">02</T>
      <T y={280} size={104} weight={900} lh={0.95} w={1000}>Where you can save</T>
    </Slide>
  );
}

function TextBullets({ n }) {
  return (
    <Slide n={n}>
      <T y={180} size={56} w={1000}>Why wind fits this site</T>
      <T y={300} size={30} weight={400} font="body" lh={1.45} w={520}>
        Your rooftop solar already covers almost all daytime demand. Most of the remaining grid power is used after sunset.
      </T>
      <ul className="slide-abs slide-ul" style={{ left: u(680), top: u(300), width: u(536), fontSize: u(30) }}>
        <li>78% of grid power is used at night and in the evening</li>
        <li>Wind generates most when solar stops</li>
        <li>More solar will not save much here</li>
        <li>Group captive open access is the proven route</li>
      </ul>
    </Slide>
  );
}

function Steps({ n }) {
  const steps = [
    ['Share your bills', 'The last six months for each site.'],
    ['We model the numbers', 'Tariff, tenure, capacity and supplier options.'],
    ['You choose', 'We recommend. You decide the terms.'],
    ['We execute', 'Contracts, approvals and go-live.'],
  ];
  return (
    <Slide n={n}>
      <T y={180} size={56}>What happens next</T>
      <ol className="slide-abs slide-ol" style={{ left: u(M), top: u(320), width: u(W - 2 * M), fontSize: u(30) }}>
        {steps.map(([k, v]) => <li key={k}><strong>{k}</strong><span>{v}</span></li>)}
      </ol>
    </Slide>
  );
}

function SymbolPhoto({ n }) {
  // Photo seen through the symbol: the mark, scaled up and bled off the right and bottom edges.
  const s = 13.6;
  return (
    <Slide n={n} bg="var(--warm-white)" art={
      <>
        <clipPath id="sym"><path d={MARK} transform={`translate(560 190) scale(${s})`} /></clipPath>
        <image href={asset('/assets/photos/solar.jpg')} x="480" y="140" width="820" height="820" preserveAspectRatio="xMidYMid slice" clipPath="url(#sym)" />
      </>
    }>
      <T y={300} size={80} weight={900} lh={0.95} w={440} style={{ color: 'var(--violet-900)' }}>Your power bill should not be a mystery.</T>
    </Slide>
  );
}

function ImagePlaceholder({ n }) {
  return (
    <Slide n={n} art={<polygon points={stripePoints({ width: W, y: 330, thickness: 300, kinkX: 120, drop: 300 })} fill="var(--warm-white)" />}>
      <T y={340} size={80} weight={900} lh={0.95} w={480}>Your power bill should not be a mystery.</T>
      <div className="slide-abs slide-ph" style={{ left: u(640), top: u(200), width: u(576), height: u(636), borderRadius: u(16), fontSize: u(22) }}>
        <svg viewBox="0 0 24 24" width="20%" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="16" /><circle cx="9" cy="10" r="2" /><path d="M3 18l6-5 4 3 3-2 5 4" /></svg>
        <span>Image · 576 × 636</span>
      </div>
    </Slide>
  );
}

function ImageHeadline({ n }) {
  return (
    <Slide n={n} art={<Photo id="hero" src="/assets/photos/solar.jpg" points={aboveStripe({ top: 140, yL: 420, kink: 260, drop: 300 })} y={140} h={H - 140} />}>
      <T y={760} size={80} weight={900} lh={0.95} w={1000}>Your power bill should not be a mystery.</T>
    </Slide>
  );
}

function Stats({ n }) {
  const stats = [
    ['₹18–25 Cr', 'Potential annual saving across all sites'],
    ['77.9%', 'Of your consumption is at night and in the evening'],
    ['28–30%', 'Lower cost per unit with open access'],
  ];
  return (
    <Slide n={n}>
      <T y={180} size={56}>What we found</T>
      <div className="slide-abs slide-stats" style={{ left: u(M), top: u(340), width: u(W - 2 * M), gap: u(24) }}>
        {stats.map(([n, l]) => (
          <div key={n} style={{ background: 'var(--warm-white)', padding: u(36), minHeight: u(300) }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: u(60), color: 'var(--electric-violet)', letterSpacing: '-0.02em', lineHeight: 1, whiteSpace: 'nowrap' }}>{n}</div>
            <div style={{ fontSize: u(26), marginTop: u(24), lineHeight: 1.35 }}>{l}</div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function TableSlide({ n }) {
  const rows = [['Pune', '7.80', '5.60', '28%'], ['Ahmedabad', '8.20', '5.90', '28%'], ['Noida', '7.60', '5.40', '29%'], ['Chennai', '8.00', '5.70', '29%'], ['Nashik', '7.90', '5.50', '30%']];
  return (
    <Slide n={n}>
      <T y={180} size={56}>Cost per unit by site</T>
      <table className="slide-abs slide-table" style={{ left: u(M), top: u(320), width: u(W - 2 * M), fontSize: u(26) }}>
        <thead>
          <tr><th>Site</th><th>Current ₹/unit</th><th className="hl">With Neufin ₹/unit</th><th>Saving</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}><td>{r[0]}</td><td className="num">{r[1]}</td><td className="num hl">{r[2]}</td><td className="num strong">{r[3]}</td></tr>
          ))}
        </tbody>
      </table>
    </Slide>
  );
}

function BarChart({ n }) {
  const bars = [['Night', '10 pm – 6 am', 49.6, 'var(--violet-800)'], ['Evening', '6 pm – 10 pm', 28.3, 'var(--violet-500)'], ['Morning and afternoon', '6 am – 6 pm', 18.6, 'var(--grey-400)'], ['Solar hours', '9 am – 5 pm', 3.5, 'var(--grey-400)']];
  return (
    <Slide n={n}>
      <T y={180} size={56}>When you use power</T>
      <T y={260} size={26} weight={400} font="body" style={{ color: 'var(--grey-600)' }}>Share of annual consumption</T>
      <div className="slide-abs" style={{ left: u(M), top: u(380), width: u(W - 2 * M) }}>
        {bars.map(([k, t, v, c]) => (
          <div key={k} className="slide-bar" style={{ height: u(110), gap: u(24) }}>
            <div style={{ width: u(330) }}>
              <div style={{ fontSize: u(26), fontWeight: 600 }}>{k}</div>
              <div className="slide-mono" style={{ fontSize: u(18), color: 'var(--grey-600)' }}>{t}</div>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: u(16) }}>
              <div style={{ width: `${v * 1.6}%`, height: u(56), background: c }} />
              <span className="slide-mono" style={{ fontSize: u(26) }}>{v}%</span>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function DonutChart({ n }) {
  const parts = [['Wind', 40, 'var(--violet-800)'], ['Grid', 35, 'var(--grey-400)'], ['Solar', 25, 'var(--violet-400)']];
  const r = 150;
  const C = 2 * Math.PI * r;
  let acc = 0;
  return (
    <Slide n={n} art={
      <g transform="translate(400 560) rotate(-90)">
        {parts.map(([k, v, c]) => {
          const len = (v / 100) * C;
          const el = <circle key={k} r={r} fill="none" stroke={c} strokeWidth="80" strokeDasharray={`${len - 4} ${C - len + 4}`} strokeDashoffset={-acc} />;
          acc += len;
          return el;
        })}
      </g>
    }>
      <T y={180} size={56}>Recommended power mix</T>
      <T x={300} y={520} w={200} size={44} style={{ textAlign: 'center' }}>₹6.10</T>
      <T x={300} y={575} w={200} size={20} weight={400} font="body" style={{ textAlign: 'center', color: 'var(--grey-600)' }}>blended per unit</T>
      <div className="slide-abs" style={{ left: u(720), top: u(420), width: u(496) }}>
        {parts.map(([k, v, c]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: u(20), fontSize: u(30), padding: `${u(20)} 0`, borderTop: '1px solid var(--grey-200)' }}>
            <i style={{ width: u(28), height: u(28), background: c }} />{k}<span className="slide-mono" style={{ marginLeft: 'auto' }}>{v}%</span>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function Logos({ n }) {
  return (
    <Slide n={n}>
      <T y={180} size={56}>Our customers</T>
      <div className="slide-abs slide-logos" style={{ left: u(M), top: u(340), width: u(W - 2 * M), gap: u(24) }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={{ height: u(200), fontSize: u(20) }}>Customer logo</div>
        ))}
      </div>
    </Slide>
  );
}

function Closing({ n }) {
  return (
    <Slide n={n} bg="var(--electric-violet)" dark art={<polygon points={stripePoints({ width: W, y: 640, thickness: 110, kinkX: 160, drop: 160 })} fill="var(--warm-white)" />}>
      <T y={230} size={88} weight={900} lh={0.95} w={1050}>Send us your latest power bill.</T>
      <T y={450} size={32} weight={400} font="body" w={900}>We will show you where the money is going.</T>
      <T y={540} size={22} weight={400} font="mono">name@neufin.energy · www.neufin.energy</T>
    </Slide>
  );
}

const templates = [
  ['Cover', 'First slide. Title and who it is for.', Cover],
  ['Agenda', 'Up to six items.', Agenda],
  ['Section divider', 'Opens each section. Number and section title.', SectionDivider],
  ['Text and bullets', 'Short paragraph with an unordered list. Up to five bullets.', TextBullets],
  ['Numbered steps', 'Ordered list for a sequence. Up to five steps.', Steps],
  ['Image and headline', 'One message with a photo cropped by the Stripe.', ImageHeadline],
  ['Photo in symbol', 'One message with a photo seen through the symbol.', SymbolPhoto],
  ['Image placeholder', 'Headline with a framed image. Replace the placeholder with a photo.', ImagePlaceholder],
  ['Stats', 'Three numbers at most.', Stats],
  ['Table', 'Comparisons. Highlight the Neufin column.', TableSlide],
  ['Bar chart', 'Shares and rankings. Violet for what matters, grey for the rest.', BarChart],
  ['Donut chart', 'Mix or split of a whole. Three parts at most.', DonutChart],
  ['Logos', 'Customers or partners. Up to eight.', Logos],
  ['Closing', 'Last slide. One next step and contact.', Closing],
];

const basics = [
  ['Size', '4:3, 1280 × 960'],
  ['Margins', '64 on all sides'],
  ['Header', 'Logo top left. Website and date top right in IBM Plex Mono. Slide number bottom right.'],
  ['Type', 'Headlines Archivo 900 at 80–104. Titles Archivo 800 at 56. Body IBM Plex Sans at 26–32. Labels and numbers IBM Plex Mono at 18–26. In PowerPoint without the brand fonts, use Arial.'],
  ['Logo', 'Two-colour on White. Warm White on Electric Violet and Violet 900.'],
  ['Images', 'Crop only with the Stripe profile or the Band, at the fixed angle.'],
];

export default function Presentations() {
  return (
    <>
      <PageHeader eyebrow="Examples" title="Presentations" />

      <Section title="Basics">
        <div className="rows">
          {basics.map(([k, v]) => <div key={k} className="row"><span className="row-key">{k}</span><p>{v}</p></div>)}
        </div>
      </Section>

      <Section title="Templates">
        <div className="slide-grid">
          {templates.map(([name, use, C], i) => (
            <figure key={name} className="slide-fig">
              <C n={i + 1} />
              <figcaption><strong>{name}</strong> {use}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </>
  );
}
