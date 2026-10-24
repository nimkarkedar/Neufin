import { useState } from 'react';
import { breakpoints, layout, motion, radii } from '../brand/tokens.js';
import { PageHeader, Section } from '../components/ui.jsx';
import { RollingFigure } from '../components/RollingFigure.jsx';
import { WhatsAppBadge } from '../components/WhatsAppBadge.jsx';
import { IconSvg } from '../components/Icon.jsx';
import { icons } from '../brand/icons.js';
import { asset } from '../brand/asset.js';

const terms = ['30 days', '1 year', '3 years', '5 years', '15 years'];

function StepSliderDemo({ inverse = false }) {
  const [v, setV] = useState(1);
  return (
    <div className={`step-slider web-action${inverse ? ' step-slider-inverse' : ''}`} style={{ '--steps': terms.length, '--value': v }}>
      <input type="range" min={0} max={terms.length - 1} step={1} value={v} onChange={(e) => setV(+e.target.value)} aria-label="Example contract length" aria-valuetext={terms[v]} />
      <ol className="step-slider-marks">
        {terms.map((t, i) => (
          <li key={t}><button type="button" style={{ '--i': i }} aria-current={i === v} onClick={() => setV(i)}>{t}</button></li>
        ))}
      </ol>
    </div>
  );
}

function OptionTilesDemo({ inverse = false }) {
  return (
    <div className={`option-tiles web-action${inverse ? ' option-tiles-inverse' : ''}`} role="radiogroup" aria-label="Example type of site">
      {[['plant', 'Factory or plant'], ['office', 'Office, hotel, mall or shop']].map(([icon, label], i) => (
        <label key={label} className="option-tile">
          <input type="radio" name={inverse ? 'demo-site-dark' : 'demo-site'} defaultChecked={i === 0} />
          <span className="option-tile-icon"><IconSvg icon={icons[icon]} size={24} /></span>
          {label}
        </label>
      ))}
    </div>
  );
}

// Web components shared with the marketing website. Styles: src/styles/ui.css.
export default function WebComponents() {
  return (
    <>
      <PageHeader eyebrow="Website" title="Web components" intro="Source: src/styles/ui.css and src/brand/tokens.js. The marketing website uses these files directly." />

      <Section title="Buttons">
        <div className="tile">
          <div className="tile-stage stage-light web-demo">
            <button type="button" className="btn btn-accent">See my options<IconSvg icon={icons.arrow} size={20} /></button>
            <button type="button" className="btn btn-primary">Call me back</button>
            <button type="button" className="btn btn-secondary">Request a call back</button>
            <button type="button" className="btn btn-primary btn-badge"><WhatsAppBadge />Contact us on WhatsApp</button>
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Accent</span><p>Solid Electric Violet. Once per page, for the page's main action, such as See my options in the home page hero.</p></div>
          <div className="row"><span className="row-key">Primary</span><p>Solid Near Black. One per block or card, for the main action.</p></div>
          <div className="row"><span className="row-key">Secondary</span><p>White with a Grey 200 outline. Every other action.</p></div>
          <div className="row"><span className="row-key">Shape</span><p>Pill, 48px tall, label on one line.</p></div>
          <div className="row"><span className="row-key">Badge</span><p>A 32px round badge sits 8px in from the start of the button.</p></div>
          <div className="row"><span className="row-key">WhatsApp green</span><p>Only inside the WhatsApp badge.</p></div>
        </div>
      </Section>

      <Section title="Text field">
        <div className="tile">
          <div className="tile-stage stage-light web-demo">
            <span className="text-field web-field">
              <span className="text-field-prefix">+91</span>
              <input className="text-field-input" type="tel" inputMode="numeric" placeholder="Your mobile number" aria-label="Example mobile number" />
            </span>
            <span className="text-field web-field" data-invalid>
              <span className="text-field-prefix">+91</span>
              <input className="text-field-input" type="tel" inputMode="numeric" defaultValue="12345" aria-label="Example invalid mobile number" />
            </span>
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Shape</span><p>White pill, 48px tall, Grey 200 border.</p></div>
          <div className="row"><span className="row-key">Numbers</span><p>IBM Plex Mono, with a fixed prefix such as +91.</p></div>
          <div className="row"><span className="row-key">States</span><p>Near Black border on focus, Electric Coral when the value is invalid.</p></div>
        </div>
      </Section>

      <Section title="Select field">
        <div className="tile">
          <div className="tile-stage stage-light web-demo">
            <label className="select-field web-field">
              <span className="visually-hidden">Your state</span>
              <select defaultValue="Maharashtra"><option>Maharashtra</option><option>Gujarat</option><option>Karnataka</option></select>
            </label>
            <label className="select-field web-field">
              <span className="visually-hidden">Contract length</span>
              <span className="select-field-icon"><IconSvg icon={icons['field-calendar']} size={18} /></span>
              <select defaultValue="1 year"><option>30 days</option><option>1 year</option><option>3 years</option></select>
            </label>
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Use</span><p>A dropdown in a form, such as Your state in the home page plan finder.</p></div>
          <div className="row"><span className="row-key">Shape</span><p>The action field's choice on its own: white pill, 48px tall, Grey 200 border, chevron in Near Black. Near Black border on focus.</p></div>
          <div className="row"><span className="row-key">Code</span><p><code>.select-field</code> label around a <code>select</code>. Optional icon: a <code>.select-field-icon</code> before the select (UI outline at 18px in Near Black, one colour like every icon on the site; it says what the field is).</p></div>
        </div>
      </Section>

      <Section title="Choice chips">
        <div className="tile">
          <div className="tile-stage stage-light web-demo">
            <div className="chips" role="radiogroup" aria-label="Example contract length">
              {['30 days', '1 year', '3 years', '5 years', '15 years'].map((t) => (
                <label key={t} className="chip"><input type="radio" name="demo-term" defaultChecked={t === '1 year'} />{t}</label>
              ))}
            </div>
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Use</span><p>One choice from a short set (up to about six), shown all at once, such as a contract length. Longer lists use the select field.</p></div>
          <div className="row"><span className="row-key">Shape</span><p>White pill, 48px tall, Grey 200 line. The chosen chip is solid Near Black with white text.</p></div>
          <div className="row"><span className="row-key">Tabs</span><p>For a set of tabs, such as industries or teams, add <code>.chips-row</code>: always one line, scrolling sideways when the chips don't fit, never wrapping onto a second line. Add <code>.chips-row-hint</code> to fade its right edge on phones and tablets, so people can see it scrolls.</p></div>
          <div className="row"><span className="row-key">Code</span><p><code>.chips</code> (plus <code>.chips-row</code> for tabs) around <code>.chip</code> labels, each holding a radio input. Arrow keys move the choice.</p></div>
        </div>
      </Section>

      <Section title="Step slider">
        <div className="tile">
          <div className="tile-stage stage-light web-demo"><StepSliderDemo /></div>
        </div>
        <div className="tile">
          <div className="tile-stage stage-dark web-demo"><StepSliderDemo inverse /></div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Use</span><p>A choice along an ordered scale with a few fixed stops, such as a contract length or a monthly use band.</p></div>
          <div className="row"><span className="row-key">Shape</span><p>6px pill track, filled in Near Black up to the handle. The handle is a 22px circle with a white edge and the raised shadow, matching the pill shapes of buttons and fields. Labels under each stop; the chosen one is Near Black and bold. On phones only the end labels show, so put the chosen value in words beside the field's label.</p></div>
          <div className="row"><span className="row-key">Code</span><p><code>.step-slider</code> with <code>--steps</code> and <code>--value</code>, around a range input and <code>.step-slider-marks</code> (buttons with <code>--i</code>). Arrow keys step; labels can be clicked.</p></div>
          <div className="row"><span className="row-key">On dark</span><p>On Grey 900 or darker, add <code>.step-slider-inverse</code>: White fill and handle on a Grey 800 track, labels in Grey 400 with the chosen one White. On a coloured dark panel, set <code>--on-dark-surface</code> (the panel's colour), <code>--on-dark-line</code> and <code>--on-dark-muted</code> on the panel (Violet 900, 800 and 300 on Violet 900).</p></div>
        </div>
      </Section>

      <Section title="Option tiles">
        <div className="tile">
          <div className="tile-stage stage-light web-demo"><OptionTilesDemo /></div>
        </div>
        <div className="tile">
          <div className="tile-stage stage-dark web-demo"><OptionTilesDemo inverse /></div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Use</span><p>One choice from two to four options that read better as pictures, such as a type of site.</p></div>
          <div className="row"><span className="row-key">Shape</span><p>White tile, 64px tall, Grey 200 line, 48px icon tile in Warm White. Chosen: Near Black outline and a Near Black icon tile with a white icon.</p></div>
          <div className="row"><span className="row-key">Code</span><p><code>.option-tiles</code> around <code>.option-tile</code> labels, each holding a radio input and an <code>.option-tile-icon</code>.</p></div>
          <div className="row"><span className="row-key">On dark</span><p>On Grey 900 or darker, add <code>.option-tiles-inverse</code>: see-through tiles with a Grey 800 line and White text. Chosen: a White outline and a White icon tile with a Near Black icon.</p></div>
        </div>
      </Section>

      <Section title="Arrow link and tag">
        <div className="tile">
          <div className="tile-stage stage-light web-demo" style={{ alignItems: 'center' }}>
            <a className="link-arrow" href="#arrow" onClick={(e) => e.preventDefault()}>See every plan<IconSvg icon={icons.arrow} size={20} /></a>
            <span className="tag">Guide</span>
            <span className="tag">Hotels and resorts</span>
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Arrow link</span><p>A text link to the next page, with the Nucleo arrow that nudges right on hover. Never the main action. <code>.link-arrow</code>.</p></div>
          <div className="row"><span className="row-key">Tag</span><p>A small label for a content type or a group. Sentence case, never uppercase, not clickable. <code>.tag</code>.</p></div>
        </div>
      </Section>

      <Section title="Rolling figure">
        <div className="tile">
          <div className="tile-stage stage-light web-demo">
            <RollingFigureDemo />
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Use</span><p>A figure that changes when someone changes a choice, such as the price and saving in the plan finder. Its digits roll to the new value, so the change is seen, not just swapped.</p></div>
          <div className="row"><span className="row-key">Motion</span><p>Each digit is a 0–9 reel that slides once over <code>--duration-roll</code> ({motion.roll}) with ease-out; the reels settle left to right a moment apart. Symbols and words stay still. No bounce, blur or flashing. No motion with reduced motion on.</p></div>
          <div className="row"><span className="row-key">Code</span><p><code>{'<RollingFigure value="₹7,50,000" />'}</code> in <code>src/components/RollingFigure.jsx</code>; styles <code>.rolling-figure</code> in ui.css. Takes the font of where it sits.</p></div>
        </div>
      </Section>

      <Section title="Accordion">
        <div className="tile">
          <div className="tile-stage stage-light" style={{ display: 'block' }}>
            <div className="accordion" style={{ maxWidth: 560 }}>
              {['Is there a minimum size?', 'Which states do you cover?'].map((q, i) => (
                <details key={q} open={i === 0}>
                  <summary>{q}<span className="accordion-icon"><IconSvg icon={icons.plus} size={20} /></span></summary>
                  <p className="accordion-answer">Plans start from 0.5 MWp. We supply across 16 states.</p>
                </details>
              ))}
            </div>
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Use</span><p>Questions and answers, such as a page's FAQ.</p></div>
          <div className="row"><span className="row-key">Hover</span><p>The whole item (question and open answer) is White on hover and while open, filling exactly the space between its lines with square edges. The list and its lines reach past the text by the same amount the rows pad in (16px; to the screen edges on phones), so questions stay aligned. The round icon's line darkens on hover.</p></div>
          <div className="row"><span className="row-key">Code</span><p><code>.accordion</code> around <code>details</code>; each <code>summary</code> ends with an <code>.accordion-icon</code> holding the Nucleo plus, which turns into a cross when open. Answer in <code>.accordion-answer</code>.</p></div>
        </div>
      </Section>

      <Section title="Image card">
        <div className="tile">
          <div className="tile-stage stage-light" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, alignItems: 'start' }}>
            <a href="#image-card" className="image-card image-card-wash" onClick={(e) => e.preventDefault()}>
              <img src={asset('/assets/photos/laptop-software.jpg')} alt="" />
              <span className="image-card-body">
                <span className="image-card-title">Smart energy</span>
                <span className="image-card-text">Photo, Violet wash, text at the bottom.</span>
                <span className="image-card-cta" aria-hidden="true">Explore Lumen<IconSvg icon={icons.arrow} size={18} /></span>
              </span>
            </a>
            <a href="#image-card" className="image-card image-card-art image-card-top" style={{ '--image-card-bg': 'var(--electric-coral)', '--image-card-art-crop': '16%' }} onClick={(e) => e.preventDefault()}>
              <img src={asset('/assets/illustrations/energy-landscape.jpg')} alt="" />
              <span className="image-card-body">
                <span className="image-card-title">Energy advisory</span>
                <span className="image-card-text">Illustration anchored low, text at the top.</span>
                <span className="image-card-cta" aria-hidden="true">Plan your energy mix<IconSvg icon={icons.arrow} size={18} /></span>
              </span>
            </a>
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Use</span><p>A row of tall cards that each lead to a page, where the picture carries the message (the home page's How we keep your price low). Title and one short line, centred, with lots of air, in the manner of Apple's cards. Three to a row on desktop, stacked on phones.</p></div>
          <div className="row"><span className="row-key">Hover</span><p>The card stays still (no lift, tilt or fade): its raised shadow deepens to the overlay shadow and the picture inside eases in by 4% over 0.8s, and the call to action (<code>.image-card-cta</code>, a White pill with an arrow) fades in; with the text at the bottom, the text slides up to make room. Same on keyboard focus. Touch screens always show the pill. Reduced motion: no zoom or slide, only the fade.</p></div>
          <div className="row"><span className="row-key">Photo</span><p><code>.image-card-wash</code> adds the Violet wash (Violet 300 multiplied at 45%). Text sits at the bottom over a soft Near Black shade so White text reads.</p></div>
          <div className="row"><span className="row-key">Illustration</span><p><code>.image-card-art .image-card-top</code>: the art anchored to the bottom, its foot cropped by <code>--image-card-art-crop</code> (a share of the card's height) on its own sky colour (<code>--image-card-bg</code>, a token, e.g. Electric Coral), so the sky runs up behind the text at the top.</p></div>
          <div className="row"><span className="row-key">Code</span><p><code>a.image-card</code> holding an <code>img</code> (alt empty: the title names the link) and <code>.image-card-body</code> with <code>.image-card-title</code> (H2 size), <code>.image-card-text</code> and <code>.image-card-cta</code> (aria-hidden: a cue, not a second link). Shape 4:5, radius L, padding 24 / 40px.</p></div>
        </div>
      </Section>

      <Section title="Media placeholder">
        <div className="tile">
          <div className="tile-stage stage-light" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
            {[['', 'image', 'Photo: a plant at golden hour'], ['placeholder-dawn', 'people', 'Team photo'], ['placeholder-violet', 'chart', 'Lumen screen'], ['placeholder-dark', 'palette', 'Illustration']].map(([v, ic, note]) => (
              <div key={note} className={`placeholder ${v}`}><span className="placeholder-icon"><IconSvg icon={icons[ic]} size={24} /></span><span className="placeholder-note">{note}</span></div>
            ))}
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Use</span><p>Holds the place of a photo, illustration or product screen until the real one arrives. The note says what goes there, in plain words.</p></div>
          <div className="row"><span className="row-key">Colour</span><p>A design system gradient: Daylight (default) for places and clean energy, Dawn for people, Violet for product screens, Violet 900 (<code>-dark</code>) for illustrations on brand moments. Plain (<code>-plain</code>, flat Warm White, the note only and no icon) where the placeholder sits on a gradient or among other colour.</p></div>
          <div className="row"><span className="row-key">Code</span><p><code>.placeholder</code> with <code>.placeholder-icon</code> (a Nucleo icon) and <code>.placeholder-note</code>.</p></div>
        </div>
      </Section>

      <Section title="Action field">
        <div className="tile">
          <div className="tile-stage stage-light web-demo">
            <form className="action-field web-action" onSubmit={(e) => e.preventDefault()}>
              <label className="action-field-choice">
                <span className="visually-hidden">Your state</span>
                <select defaultValue="Maharashtra"><option>Maharashtra</option><option>Gujarat</option><option>Karnataka</option></select>
              </label>
              <button type="submit" className="btn btn-accent">See my options<IconSvg icon={icons.arrow} size={20} /></button>
            </form>
            <form className="action-field web-action" onSubmit={(e) => e.preventDefault()}>
              <label className="action-field-choice">
                <span className="visually-hidden">Work email</span>
                <input type="email" placeholder="Your work email" autoComplete="email" />
              </label>
              <button type="submit" className="btn btn-accent">Get a quote<IconSvg icon={icons.arrow} size={20} /></button>
            </form>
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Use</span><p>A choice or an entry and the button that acts on it, as one unit. A state picker, or the home page's work email with Get a quote.</p></div>
          <div className="row"><span className="row-key">Shape</span><p>One white pill with the raised shadow; the button sits inside it, 6px in. Near Black border on focus.</p></div>
          <div className="row"><span className="row-key">Phones</span><p>The choice and the button stack, each full width. On a coloured panel (the home hero's Electric Violet), add <code>.action-field-inline</code> so the button stays inside the pill and drops its arrow on phones; keep the entry and the button label short.</p></div>
          <div className="row"><span className="row-key">Code</span><p><code>.action-field</code> (plus <code>.action-field-inline</code> on colour), <code>.action-field-choice</code> around a <code>select</code> or an <code>input</code>, then a <code>.btn</code>.</p></div>
        </div>
      </Section>

      <Section title="Layout">
        <div className="spec-list spec-inline">
          <div><span>Content width</span><strong>{layout.maxWidth}px</strong></div>
          <div><span>Columns</span><strong>{layout.columns.desktop} desktop, {layout.columns.tablet} tablet, {layout.columns.phone} phone</strong></div>
          <div><span>Gutter</span><strong>{layout.gutter}px</strong></div>
          <div><span>Side margin</span><strong>{layout.margin.phone} / {layout.margin.tablet} / {layout.margin.desktop}px</strong></div>
          <div><span>Section space</span><strong>{layout.section.phone} / {layout.section.tablet} / {layout.section.desktop}px</strong></div>
          <div><span>Page background</span><strong>Warm White. The top fades from the navigation's White into Warm White over the first 80% of the screen</strong></div>
          <div><span>Breakpoints</span><strong>Tablet {breakpoints.tablet}, desktop {breakpoints.desktop}, wide {breakpoints.wide}px</strong></div>
        </div>
      </Section>

      <Section title="Radius, shadow and motion">
        <div className="web-shadows">
          <div className="web-shadow" style={{ boxShadow: 'var(--shadow-raised)' }}>Raised</div>
          <div className="web-shadow" style={{ boxShadow: 'var(--shadow-overlay)' }}>Overlay</div>
        </div>
        <div className="spec-list spec-inline">
          <div><span>Radius</span><strong>{Object.entries(radii).map(([k, v]) => `${k} ${v}`).join(', ')}</strong></div>
          <div><span>Raised shadow</span><strong>Surfaces (large content blocks) at rest; cards and tiles on hover, lifted 4px</strong></div>
          <div><span>Surface</span><strong><code>.surface</code>: White, Grey 200 line, radius l, raised shadow. Every large content block on a page uses it. Every card carries the raised shadow.</strong></div>
          <div><span>Card</span><strong><code>.card</code>: White, Grey 200 line, radius l, no shadow. For smaller blocks in a row: features, links to pages, plans</strong></div>
          <div><span>Overlay shadow</span><strong>Menus that float over the page</strong></div>
          <div><span>Scrim</span><strong>Near Black at 24% over the page behind an open menu (the header's mega menu)</strong></div>
          <div><span>Durations</span><strong>{motion.fast} / {motion.base} / {motion.slow}</strong></div>
          <div><span>Spin</span><strong>{motion.spin} a turn, for the stamp's ring on hover</strong></div>
          <div><span>Draw</span><strong>{motion.draw}, once, for a chart line drawing itself in</strong></div>
          <div><span>Roll</span><strong>{motion.roll}, for a figure's digits rolling to a new value</strong></div>
          <div><span>Marquee</span><strong>{motion.marquee} a loop, for a sliding logo strip. Pauses on hover; still with reduced motion</strong></div>
          <div><span>Current</span><strong>{motion.current} a loop, for current along the power lines in a photo (home hero): a Violet 100 flash with a soft glow shoots along the wires in the first tenth, then rests. None with reduced motion</strong></div>
          <div><span>Easing</span><strong>Ease-out for things opening</strong></div>
        </div>
      </Section>
    </>
  );
}

// Rolling figure demo: each press picks another saving.
function RollingFigureDemo() {
  const values = ['₹7,50,000', '₹3,12,400', '₹11,08,950', '₹96,300'];
  const [i, setI] = useState(0);
  return (
    <div style={{ display: 'grid', gap: 16, justifyItems: 'start' }}>
      <RollingFigure value={values[i]} className="rolling-demo" />
      <button type="button" className="btn btn-secondary" onClick={() => setI((i + 1) % values.length)}>
        Change the value
      </button>
    </div>
  );
}
