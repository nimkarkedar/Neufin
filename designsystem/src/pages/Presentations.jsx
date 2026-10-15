import { asset } from '../brand/asset.js';
import { Logo } from '../components/Logo.jsx';
import { IconSvg } from '../components/Icon.jsx';
import { icons } from '../brand/icons.js';
import { PageHeader, Section } from '../components/ui.jsx';
import { W, H, FONT, type, colours, slides, elementsFor, stripePoints, tableCell } from '../presentations/deck.js';

// Sales deck layouts, drawn from src/presentations/deck.js, the same data that builds
// the Google Slides template (scripts/slides.mjs). Change the deck there, not here.

const TEMPLATE_FILE = '/assets/templates/neufin-sales-deck.pptx'; // built by `npm run slides`
const TEMPLATE_URL = 'https://docs.google.com/presentation/d/1oJ07NpZMQnlWUKFNbMUSVRdZ7UYV6cCQjtIAYXCtYJc/edit'; // the .pptx, converted in Google Drive

const u = (n) => `${(n / (W / 100)).toFixed(3)}cqw`;
const c = (key) => `var(--${colours[key] ?? key})`;
const font = `${FONT}, Helvetica, sans-serif`;

function Text({ x, y, w, h, role, text, color = 'ink', bold, align = 'left' }) {
  const r = type[role];
  const heading = r.font === 'display';
  return (
    <div
      className="slide-abs"
      style={{
        left: u(x), top: u(y), width: u(w), minHeight: u(h),
        fontFamily: font, fontSize: u(r.size), lineHeight: r.lh,
        fontWeight: heading || bold ? 700 : 400, letterSpacing: heading ? '-0.01em' : 0,
        color: c(color), textAlign: align, whiteSpace: 'pre-line',
      }}
    >
      {text}
    </div>
  );
}

function Table(el) {
  const { x, y, w, role, cols, rows, align = [] } = el;
  const r = type[role];
  const pad = role === 'small' ? 18 : 22;
  return (
    <table className="slide-abs slide-table" style={{ left: u(x), top: u(y), width: u(w), fontSize: u(r.size), lineHeight: r.lh, fontFamily: font }}>
      <colgroup>{cols.map((cw, i) => <col key={i} style={{ width: u(cw) }} />)}</colgroup>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => {
              const st = tableCell(el, i, j);
              return (
                <td
                  key={j}
                  style={{
                    padding: `${u(pad)} ${u(24)}`,
                    textAlign: align[j] === 'r' ? 'right' : 'left',
                    fontWeight: st.bold ? 700 : 400,
                    color: c(st.color),
                    background: st.fill ? c(st.fill) : undefined,
                    borderBottom: st.line ? `${u(2)} solid ${c(st.line)}` : 'none',
                  }}
                >
                  {cell}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Arc of a ring, angles in degrees clockwise from 12 o'clock.
function arcPath({ cx, cy, r, th, a0, a1 }) {
  const pt = (a, rad) => [cx + rad * Math.sin((a * Math.PI) / 180), cy - rad * Math.cos((a * Math.PI) / 180)];
  const large = a1 - a0 > 180 ? 1 : 0;
  const ri = r - th;
  const [x0, y0] = pt(a0, r);
  const [x1, y1] = pt(a1, r);
  const [x2, y2] = pt(a1, ri);
  const [x3, y3] = pt(a0, ri);
  return `M${x0} ${y0} A${r} ${r} 0 ${large} 1 ${x1} ${y1} L${x2} ${y2} A${ri} ${ri} 0 ${large} 0 ${x3} ${y3}Z`;
}

const Art = ({ children }) => <svg viewBox={`0 0 ${W} ${H}`} className="slide-art" aria-hidden="true">{children}</svg>;

function El({ el }) {
  const box = { left: u(el.x), top: u(el.y), width: u(el.w), height: u(el.h) };
  switch (el.t) {
    case 'text':
      return <Text {...el} />;
    case 'rect':
      return <div className="slide-abs" style={{ ...box, background: c(el.fill), opacity: el.alpha, boxShadow: el.border ? `inset 0 0 0 ${u(4)} ${c(el.border)}` : undefined }} />;
    case 'dot':
      return <div className="slide-abs" style={{ ...box, background: c(el.fill), borderRadius: '50%' }} />;
    case 'image':
      return <img className="slide-abs" src={asset(el.src)} alt="" style={{ ...box, objectFit: 'cover' }} />;
    case 'stripe':
      return <Art><polygon points={stripePoints({ width: W, y: el.y, thickness: el.th, kinkX: el.kinkX, drop: el.drop })} fill={c(el.fill)} /></Art>;
    case 'arc':
      return <Art><path d={arcPath(el)} fill={c(el.fill)} /></Art>;
    case 'seg':
      return <Art><line x1={el.x1} y1={el.y1} x2={el.x2} y2={el.y2} stroke={c(el.colour)} strokeWidth={el.weight} /></Art>;
    case 'dash':
      return <Art><line x1={el.x} y1={el.y} x2={el.x + el.w} y2={el.y + (el.h ?? 0)} stroke={c(el.colour)} strokeWidth="3" strokeDasharray="12 9" /></Art>;
    case 'cell':
      return (
        <div className="slide-abs slide-cell" style={{ ...box, fontSize: u(type.small.size), fontFamily: font, background: el.fill ? c(el.fill) : undefined }}>
          {el.label}
        </div>
      );
    case 'icon':
      return <IconSvg icon={icons[el.name]} size="100%" className="slide-abs" style={{ left: u(el.x), top: u(el.y), width: u(el.s), height: u(el.s), color: c(el.color), '--icon-color-2': c(el.color) }} />;
    case 'logo':
      return (
        <div className="slide-abs" style={{ left: u(el.x), top: u(el.y), height: u(el.h) }}>
          {el.tone === 'white'
            ? <Logo variant="horizontal" height="100%" color="var(--white)" />
            : <Logo variant="horizontal" height="100%" color="var(--near-black)" markColor="var(--electric-violet)" />}
        </div>
      );
    case 'table':
      return <Table {...el} />;
    default:
      return null;
  }
}

function SlideView({ slide, n }) {
  const { layout } = elementsFor(slide);
  const ph = layout.ph;
  return (
    <div className="slide slide-wide" style={{ background: c(slide.bg ?? layout.bg) }}>
      {layout.els.map((e, i) => <El key={`l${i}`} el={e} />)}
      {ph.pic && slide.pic && <El el={{ t: 'image', ...ph.pic, src: slide.pic }} />}
      {slide.els.map((e, i) => <El key={i} el={e} />)}
      {ph.title && <Text {...ph.title} text={slide.title} />}
      {ph.body && slide.body && <Text {...ph.body} text={slide.body} />}
      {layout.number && <Text {...layout.number} role="small" color="ink2" align="right" text={String(n)} />}
    </div>
  );
}

const basics = [
  ['Size', '16:9, the Google Slides default. Designed on a 1920 × 1080 grid: 12 columns, 96 margins, 24 gutters.'],
  ['Font', 'Arial only, the design system’s fallback for Office files. Decks are shared, downloaded and opened on machines without Archivo or IBM Plex, and Arial looks the same everywhere: Google Slides, PowerPoint, Keynote and PDF.'],
  ['Type', 'Four sizes, two weights. Arial Bold at 48 pt (covers, dividers, big numbers) and 28 pt (titles). Arial Regular at 16 pt for text, and 12 pt only for dense tables, chart labels and footnotes. No capitals for emphasis, nothing smaller than 12 pt.'],
  ['Colour', 'Near Black and Grey 600 for text. Electric Violet for Neufin: our figures, our option, the recommendation. Covers, dividers and the closing slide are Electric Violet with the Signal Yellow Stripe.'],
  ['Titles', 'Each title is the point of the slide, in a sentence: “Open access saves ₹3.3 Cr a year”, not “Savings”. One idea per slide.'],
  ['Numbers', '₹ with Cr or L (₹42 Cr, ₹96 L). Units as kWh, MW, MVA. Ranges with an en dash: 6.55–6.69.'],
  ['Logos', 'Always in a fixed grid of equal cells. Fit each logo inside its cell with space around it. Never stretch or recolour. Remove whole rows, not single cells. The client’s logo goes only in its White cell on the covers.'],
  ['Stripe', 'The Neufin Stripe appears on covers, dividers, the quote, the price drop and the closing slide, always at the symbol’s angle. Don’t draw new ones; duplicate a slide that has one.'],
  ['Tables and charts', 'Soft: thin Grey 200 lines or Warm White stripes, grey headers, numbers right-aligned. Charts are shapes, so they stay editable in Google Slides.'],
  ['Help text', 'Every slide has help text in its speaker notes: when to use it and what to change.'],
];

const sections = [...new Set(slides.map((s) => s.section))];

export default function Presentations() {
  return (
    <>
      <PageHeader eyebrow="Examples" title="Presentations" intro="The sales deck template. Every layout below is a slide in the Google Slides template, with help text in its speaker notes." />

      <Section title="Basics">
        <div className="rows">
          {basics.map(([k, v]) => <div key={k} className="row"><span className="row-key">{k}</span><p>{v}</p></div>)}
          <div className="row"><span className="row-key">Template</span><p><a href={TEMPLATE_URL} target="_blank" rel="noreferrer">Open the Google Slides template</a>. For each new deck: File › Make a copy. Also as <a href={asset(TEMPLATE_FILE)} download>PowerPoint (.pptx)</a>.</p></div>
        </div>
      </Section>

      {sections.map((sec) => (
        <Section key={sec} title={sec}>
          <div className="slide-grid">
            {slides.map((s, i) => s.section === sec && (
              <figure key={s.id} className="slide-fig">
                <SlideView slide={s} n={i + 1} />
                <figcaption>
                  <strong>{s.name}</strong>
                  <span className="slide-notes">{s.notes}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}

