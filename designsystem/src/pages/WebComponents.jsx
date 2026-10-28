import { DuoIcon } from '../components/DuoIcon.jsx';
import { StripePattern, patternCombos } from '../components/StripePattern.jsx';
import { useRef, useState } from 'react';
import { breakpoints, layout, motion, radii } from '../brand/tokens.js';
import { PageHeader, Section } from '../components/ui.jsx';
import { RollingFigure } from '../components/RollingFigure.jsx';
import { WhatsAppBadge } from '../components/WhatsAppBadge.jsx';
import { Segmented } from '../components/Segmented.jsx';
import { ScrollRow } from '../components/ScrollRow.jsx';
import { StepMark, StepTrack } from '../components/StepTrack.jsx';
import { IconSvg } from '../components/Icon.jsx';
import { icons } from '../brand/icons.js';
import { asset } from '../brand/asset.js';

const terms = ['30 days', '1 year', '3 years', '5 years', '15 years'];

const industriesDemo = ['Auto', 'Plastics', 'Steel', 'Hotels and resorts', 'Real estate and malls'];

function SegmentedDemo({ inverse = false }) {
  const [v, setV] = useState(0);
  return <Segmented name={inverse ? 'seg-dark' : 'seg-light'} label="Example industry" options={industriesDemo} value={v} onChange={setV} inverse={inverse} />;
}

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

function DialogDemo() {
  const ref = useRef(null);
  return (
    <>
      <button type="button" className="btn btn-secondary" onClick={() => ref.current?.showModal()}>Open the dialog</button>
      <dialog ref={ref} className="dialog" aria-labelledby="demo-dialog-title" onClick={(e) => e.target === ref.current && ref.current.close()}>
        <button type="button" className="dialog-close" aria-label="Close" onClick={() => ref.current?.close()}>
          <IconSvg icon={icons.close} size={24} />
        </button>
        <div style={{ padding: 40 }}>
          <h3 id="demo-dialog-title">Request a call back</h3>
          <p style={{ marginTop: 8 }}>On the website this holds the Contact page's form.</p>
        </div>
      </dialog>
    </>
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
          <div className="row"><span className="row-key">States</span><p>Near Black border on focus. Invalid: a 2px line in the Error colour (#C2321F), kept while the field has focus, always with a message under it (see Form field).</p></div>
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

      <Section title="Form field">
        <div className="tile">
          <div className="tile-stage stage-light web-demo">
            <div className="form-field web-field">
              <label htmlFor="demo-company" className="form-field-label">Company</label>
              <span className="text-field"><input id="demo-company" className="text-field-input" placeholder="Company name" /></span>
            </div>
            <div className="form-field web-field">
              <label htmlFor="demo-email" className="form-field-label">Work email</label>
              <span className="text-field" data-invalid>
                <input id="demo-email" className="text-field-input" type="email" defaultValue="priya@company" aria-invalid="true" aria-describedby="demo-email-error" />
              </span>
              <p id="demo-email-error" className="form-field-error"><IconSvg icon={icons['field-error']} size={16} />Enter an email like you@company.com.</p>
            </div>
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Use</span><p>Every labelled field in a form, such as the Contact page's form.</p></div>
          <div className="row"><span className="row-key">Label</span><p>Always visible above the field: Small, semibold, Grey 600, 6px above. Never a placeholder in place of a label. If every field is required, say so once under the form's title ("All fields are required.").</p></div>
          <div className="row"><span className="row-key">Error</span><p>One line under the field, 20px in to line up with the field's text: Small, semibold, in the Error colour with the UI outline circle-warning icon at 16px in the same colour. Words and icon, never colour alone. Say how to fix it ("Enter a 10-digit Indian mobile number."), not just that it's wrong.</p></div>
          <div className="row"><span className="row-key">When</span><p>Messages appear when the form is sent, and focus moves to the first field with an error. After that, each message updates as the person types or leaves the field. Don't flag a field before the person has tried to send.</p></div>
          <div className="row"><span className="row-key">Code</span><p><code>.form-field</code> around a <code>.form-field-label</code> (a <code>label</code> with <code>for</code>), the field, and a <code>.form-field-error</code> with an id. Put <code>data-invalid</code> on the field, and <code>aria-invalid</code> and <code>aria-describedby</code> (the message's id) on the input. A message that appears without a send, such as after a network failure, goes in a <code>role="alert"</code> container.</p></div>
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
          <div className="row"><span className="row-key">Small</span><p>Add <code>.chips-small</code> for a compact form with several sets of choices (the plan finder) or a tab row (industries): 32px tall, Small text, quieter. Unchosen chips are Warm White with Grey 600 text and no line; the chosen one is solid Near Black with White text. Pair with <code>.chips-row</code> so each set stays on one line.</p></div>
          <div className="row"><span className="row-key">On dark</span><p>On a Violet 900 or Near Black band add <code>.chips-inverse</code>: unchosen chips are see-through with a faint White line and Violet 100 text; the chosen one is solid White with Near Black text (a black chip would sink into the band). The home page's industries row.</p></div>
          <div className="row"><span className="row-key">Code</span><p><code>.chips</code> (plus <code>.chips-row</code> for tabs, <code>.chips-small</code> for compact forms, <code>.chips-inverse</code> on dark) around <code>.chip</code> labels, each holding a radio input. Arrow keys move the choice.</p></div>
        </div>
        <div className="tile">
          <div className="tile-stage stage-light web-demo">
            <div className="chips chips-row chips-small" role="radiogroup" aria-label="Example contract length, small">
              {['30 days', '1 year', '3 years', '5 years', '15 years'].map((t) => (
                <label key={t} className="chip"><input type="radio" name="demo-term-s" defaultChecked={t === '1 year'} />{t}</label>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Segmented control">
        <div className="tile">
          <div className="tile-stage stage-light web-demo"><SegmentedDemo /></div>
        </div>
        <div className="tile">
          <div className="tile-stage stage-dark web-demo"><SegmentedDemo inverse /></div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Use</span><p>One choice from a short set that switches what's shown, such as the home page's industries, the plan finder's choices, and the filters on Customer stories, Careers and the plan list. Calmer than a row of outlined chips: one track, plain text, one solid thumb.</p></div>
          <div className="row"><span className="row-key">Interaction</span><p>The thumb glides to the new choice (slow, ease-out) and the label's colour follows; hovering an option darkens (light) or whitens (inverse) its label. Arrow keys move the choice. When the set is wider than its space the track scrolls sideways and the chosen option scrolls into view. No slide with reduced motion.</p></div>
          <div className="row"><span className="row-key">Shape</span><p>Pill track with 4px inset, options 40px tall (<code>small</code>: 32px, Small text, 14px either side and 2px apart, for forms with several sets such as the plan finder). Light: Near Black 5% track (shows on White and Warm White), Near Black thumb, Grey 600 labels, White when chosen. Inverse (on Violet 900 or Near Black): White 10% track, White thumb, Violet 100 labels, Near Black when chosen.</p></div>
          <div className="row"><span className="row-key">Code</span><p><code>&lt;Segmented name label options value onChange inverse small stacked icons /&gt;</code> (label optional when a visible legend names the group) from <code>components/Segmented.jsx</code>; styles <code>.segmented</code>, <code>.segmented-inverse</code>, <code>.segmented-stacked</code>, <code>.segmented-icon</code> in ui.css.</p></div>
          <div className="row"><span className="row-key">Stacked</span><p>For a filter sidebar (the plan list): from desktop the options sit in a column, each a full-width row, and the thumb glides up and down; on phones they stay a row. <code>icons</code> leads each option with a Nucleo icon in the label's colour (one per option, or several side by side, e.g. solar panel and windmill).</p></div>
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

      <Section title="Statement and figures">
        <div className="tile">
          <div className="tile-stage stage-light web-demo" style={{ display: 'grid', gap: 20, alignItems: 'stretch' }}>
            <div className="surface" style={{ padding: 32 }}>
              <p className="statement">Our customers already pay 15% less per unit</p>
              <p className="statement-line">Compared with their electricity board rate.</p>
            </div>
            <div className="surface" style={{ overflow: 'hidden' }}>
              <dl className="figures">
                <div className="figure"><dt className="figure-label">states covered</dt><dd className="figure-value">16</dd></div>
                <div className="figure"><dt className="figure-label">energy plans</dt><dd className="figure-value">90+</dd></div>
                <div className="figure"><dt className="figure-label">from 30+ suppliers</dt><dd className="figure-value">4+ GW</dd></div>
              </dl>
            </div>
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Statement</span><p>One claim set large inside a box, from the home numbers block: H1 in Archivo, at most 22 characters a line, then one line in Body L and the secondary colour. One per box, with the box's button at its foot. Used on the home page, About, Renewable energy advisory (also as the title inside the suppliers panel). <code>.statement</code>, <code>.statement-line</code>.</p></div>
          <div className="row"><span className="row-key">Figures</span><p>Key figures in a grid, flush inside a box with no padding: the figure in H1 over its label, labels given two lines of room so figures in a row share a baseline, lines between cells edge to edge. Two a row on phones (an odd last figure takes the row), three from tablets; padding 24 / 32px. A cell fills with Violet 100 under the pointer, colour only. Used on the home page, About, Sell energy and Renewable energy advisory. <code>.figures</code>, <code>.figure</code>, <code>.figure-value</code>, <code>.figure-label</code>.</p></div>
        </div>
      </Section>

      <Section title="Pattern tiles">
        <div className="tile">
          <div className="tile-stage stage-light web-demo" style={{ display: 'block' }}>
            <ul className="pattern-tiles" style={{ '--cols': 4 }}>
              {[['duo-flag', 'Extreme ownership'], ['duo-user-heart', 'Customer obsession'], ['duo-puzzle', 'Solution mindset'], ['duo-handshake', 'Show respect']].map(([icon, title], i) => (
                <li key={title}>
                  <div className="pattern-tile-art">
                    <StripePattern fg={patternCombos[i].fg} bg={patternCombos[i].bg}><DuoIcon name={icon} hero /></StripePattern>
                  </div>
                  <h3 className="pattern-tile-title">{title}</h3>
                  <p className="pattern-tile-text">One line under the title, on the page.</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Use</span><p>A set of three or four ideas (values, what a supplier gets) that would otherwise be a row of cards waiting for art. Not for links or anything clickable: the tiles are pictures.</p></div>
          <div className="row"><span className="row-key">Tile</span><p>The Stripe as a pattern piece (<code>StripePattern</code>): one solid band at the symbol's angle with crisp corners, six thin echo lines either side fading outward, bleeding off both edges, in the device's colour combinations in a fixed order (Signal Yellow on Violet 900, Near Black on Coral, Warm White on Electric Violet, Coral on Violet 900), so neighbours always differ. The idea's hero duo icon sits on the band's diagonal in a White circle ringed in the tile's colour, like a node on a wire. Radius L, 4:5 from tablets, 3:2 on phones.</p></div>
          <div className="row"><span className="row-key">Words</span><p>Under the tile, on the page: the title in Card title, the line in Body and the secondary colour. No White panel, so the set reads differently from the cards. One row from desktop (<code>--cols</code>), two a row on tablets. <code>.pattern-tiles</code>, <code>.pattern-tile-art</code>, <code>-title</code>, <code>-text</code>.</p></div>
        </div>
      </Section>

      <Section title="Arrow link, tag and avatar">
        <div className="tile">
          <div className="tile-stage stage-light web-demo" style={{ alignItems: 'center' }}>
            <a className="link-arrow" href="#arrow" onClick={(e) => e.preventDefault()}>See every plan<IconSvg icon={icons.arrow} size={20} /></a>
            <span className="tag">Guide</span>
            <span className="tag">Hotels and resorts</span>
            <span className="tag">30 minutes<span className="tag-dot" /></span>
            <span className="avatar">RN</span>
            <span className="avatar avatar-l">RG</span>
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Arrow link</span><p>A text link to the next page, with the Nucleo arrow that nudges right on hover. Never the main action. <code>.link-arrow</code>.</p></div>
          <div className="row"><span className="row-key">Tag</span><p>A small label for a content type, a group, a step or a duration. It hugs its text, and can take a 14px icon or a live dot (<code>.tag-dot</code>, Energy Mint with a soft pulsing glow, still with reduced motion) for a duration. Sentence case, never uppercase, not clickable. <code>.tag</code>.</p></div>
          <div className="row"><span className="row-key">Avatar</span><p>A person's round photo beside their name, 48px (<code>.avatar-l</code> 64px), with a Grey 200 ring. Without a photo it shows their initials in Archivo on Warm White, so a row of people stays one family. Put an <code>img</code> inside, or the initials. <code>.avatar</code>.</p></div>
        </div>
      </Section>

      <Section title="Step track">
        <div className="tile">
          <div className="tile-stage stage-light web-demo">
            <StepTrack className="surface step-track-demo">
              {[['duo-bill', 'Share your bills'], ['duo-coins', 'Get a quote'], ['duo-contract', 'Sign the contract'], ['duo-bolt', 'Power starts']].map(([icon, title]) => (
                <li key={title} className="step-track-item">
                  <StepMark><DuoIcon name={icon} hero /></StepMark>
                  <strong>{title}</strong>
                </li>
              ))}
            </StepTrack>
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Use</span><p>A process told in rows, where order and speed matter: the website's process steps (Kedar, 2026-10-28). Each step's hero duo icon sits on a 2px Grey 200 rail that joins it to the next. No step numbers: the rail carries the order.</p></div>
          <div className="row"><span className="row-key">Motion</span><p>While the list is in view, current runs down the rail one step per <code>--duration-step</code> ({motion.step}): the line draws in Electric Violet to the next circle, then that circle lights with a 2px ring. All lit, it holds, fades back together, rests and runs again. The rows never move. Still, with the grey rail only, with reduced motion or without JavaScript.</p></div>
          <div className="row"><span className="row-key">Markup</span><p><code>StepTrack</code> renders the list; each <code>li.step-track-item</code> holds a <code>StepMark</code> around its hero <code>DuoIcon</code>. Set <code>--step-track-pad</code> to the rows' padding above and below so the rail runs edge to edge. <code>.step-track</code>, <code>-item</code>, <code>-mark</code>, <code>-line</code>.</p></div>
        </div>
      </Section>

      <Section title="Dialog and toast">
        <div className="tile">
          <div className="tile-stage stage-light web-demo" style={{ alignItems: 'center' }}>
            <DialogDemo />
            {/* The toast is fixed to the screen on the website; here it sits in the stage. */}
            <p className="toast" role="status" style={{ position: 'static', translate: 'none', animation: 'none' }}>
              <span className="toast-icon"><IconSvg icon={icons.check} size={20} /></span>
              Thanks, we'll call you within one business day.
            </p>
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Dialog</span><p>A modal window for a short task that shouldn't take the visitor off the page, such as the call-back form. The native <code>{'<dialog>'}</code> opened with <code>showModal()</code>, so focus stays inside, Escape closes it and focus returns to the button that opened it. White, radius L, the overlay shadow over the scrim, a round close button top right (Nucleo close, 48px). Full screen on phones. Fades in and rises 8px; still with reduced motion. <code>.dialog</code>, <code>.dialog-close</code>.</p></div>
          <div className="row"><span className="row-key">Toast</span><p>A one-line confirmation after something is sent, only when nothing else on screen says so (the call-back dialog closes on send; the Contact page shows its own thank-you card instead). Near Black with White text and a White 16% hairline, so it still shows over the Near Black footer; a check in an Energy Mint circle, radius L, the overlay shadow, bottom centre. Rises in, stays about 5 seconds, fades out (<code>data-leaving</code>). <code>role="status"</code> so screen readers hear it. Never carries an action. <code>.toast</code>, <code>.toast-icon</code>.</p></div>
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

      <Section title="Vertical card">
        <div className="tile">
          <div className="tile-stage stage-light" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, alignItems: 'start' }}>
            <div className="vertical-card vertical-card-photo">
              <div className="vertical-card-media"><img src={asset('/assets/photos/careers-team-coding.jpg')} alt="" /></div>
              <div className="vertical-card-body">
                <div className="vertical-card-words">
                  <h3 className="vertical-card-title">Own something meaningful</h3>
                  <p className="vertical-card-text">Metering, electricity board approvals across India and hardware installation</p>
                </div>
              </div>
            </div>
            <a href="#vertical-card" className="vertical-card vertical-card-photo" onClick={(e) => e.preventDefault()}>
              <span className="vertical-card-media"><img src={asset('/assets/photos/careers-team-coding.jpg')} alt="" /></span>
              <span className="vertical-card-body">
                <span className="vertical-card-words">
                  <span className="vertical-card-title">Own something meaningful</span>
                  <span className="vertical-card-text">Metering, electricity board approvals across India and hardware installation</span>
                </span>
                <span className="vertical-card-go"><IconSvg icon={icons.arrow} size={20} /></span>
              </span>
            </a>
            <div className="vertical-card">
              <div className="vertical-card-media"><img src={asset('/assets/illustrations/plan-wind.jpg')} alt="" style={{ objectPosition: '50% 80%' }} /></div>
              <div className="vertical-card-body">
                <div className="vertical-card-words">
                  <span className="tag">Step 3</span>
                  <h3 className="vertical-card-title">Own something meaningful</h3>
                  <p className="vertical-card-text">Metering, electricity board approvals across India and hardware installation</p>
                </div>
              </div>
            </div>
            <a href="#vertical-card" className="vertical-card" onClick={(e) => e.preventDefault()}>
              <span className="vertical-card-media"><img src={asset('/assets/illustrations/plan-wind.jpg')} alt="" style={{ objectPosition: '50% 80%' }} /></span>
              <span className="vertical-card-body">
                <span className="vertical-card-words">
                  <span className="tag">Step 3</span>
                  <span className="vertical-card-title">Own something meaningful</span>
                  <span className="vertical-card-text">Metering, electricity board approvals across India and hardware installation</span>
                </span>
                <span className="vertical-card-go"><IconSvg icon={icons.arrow} size={20} /></span>
              </span>
            </a>
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Use</span><p>Every vertical card on the site (Kedar, 2026-10-27): two looks, each still or clickable. No other vertical card, no round spot illustrations or icons in cards.</p></div>
          <div className="row"><span className="row-key">Photo</span><p><code>.vertical-card-photo</code>: the picture fills the card under the Violet wash (Violet 300 multiplied at 45%) with a Near Black shade rising from the foot; White title and line at the bottom, on the left.</p></div>
          <div className="row"><span className="row-key">Panel</span><p>The default: the picture across the top with a flat, straight foot (the Stripe step was dropped as too playful: Kedar, 2026-10-27, mature and simple as on Apple), then a White panel with an optional <code>.tag</code> (a step, an industry, a content type), the title and the line. In a row of cards (<code>.vertical-card-row</code> on the grid or the ScrollRow) the panels share one height, the tallest in the row, so pictures line up and no card keeps spare room unless a neighbour needs it.</p></div>
          <div className="row"><span className="row-key">Text</span><p>Title in the Card title style (28px, 24px on phones), line Body (16px), the same on every card. Both keep to a left column clear of the arrow, each cut after two lines with an ellipsis, and sit at the foot of the panel.</p></div>
          <div className="row"><span className="row-key">Clickable</span><p>An <code>a.vertical-card</code> with <code>.vertical-card-go</code>, a round arrow (40 / 44px) on the line's row, bottoms aligned, Grey 200 at rest. The card stays still: the arrow turns Electric Violet with a White arrow and stays put, the shadow deepens to the overlay shadow and the picture eases in by 4%. Reduced motion: no zoom. A still card is a <code>div</code> with real headings and answers nothing.</p></div>
          <div className="row"><span className="row-key">Placeholder</span><p>Without a picture the media is plain Near Black.</p></div>
          <div className="row"><span className="row-key">Code</span><p><code>.vertical-card</code> holding <code>.vertical-card-media</code> (an <code>img</code>, alt empty) and <code>.vertical-card-body</code> with <code>.vertical-card-words</code> (an optional <code>.tag</code>, <code>.vertical-card-title</code>, <code>.vertical-card-text</code>) and, on a link, <code>.vertical-card-go</code> in its own column. Shape 4:5, radius L, padding 24 / 32px. On desktop cards are a third of the content width: three across, or a sideways scroll row for more.</p></div>
        </div>
      </Section>

      <Section title="Scroll row">
        <div className="tile">
          <div className="tile-stage stage-light web-demo" style={{ display: 'block', overflow: 'hidden', padding: '24px' }}>
            <ScrollRow label="Example photos">
              {['Photo: the office', 'Photo: a team lunch', 'Photo: the offsite', 'Photo: a site visit', 'Photo: demo day'].map((n) => (
                <div key={n} className="placeholder placeholder-dawn" style={{ aspectRatio: '4 / 5' }}><span className="placeholder-icon"><IconSvg icon={icons.people} size={24} /></span><span className="placeholder-note">{n}</span></div>
              ))}
            </ScrollRow>
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Use</span><p>A set of like cards that doesn't fit the width, such as team photos or events on Careers, or a short sequence on phones. Never for the main content of a page, and never auto-playing.</p></div>
          <div className="row"><span className="row-key">Behaviour</span><p>Cards keep their width and snap into place; the next one peeks in at the edge. Previous and next buttons (48px, round, the secondary button's colours) sit under the row on the right from tablets up and grey out at either end; phones swipe. The row takes keyboard focus and scrolls with the arrow keys. Smooth scrolling is off with reduced motion.</p></div>
          <div className="row"><span className="row-key">Code</span><p><code>{'<ScrollRow label="…">'}</code> around the cards (components/ScrollRow.jsx, styles <code>.scroll-row</code> in ui.css). Card width: <code>--scroll-item</code> on the row (default 80%).</p></div>
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
          <div><span>Hover fill</span><strong><code>--hover-fill</code>, Violet 100: the one colour for anything that fills under the pointer (figure cells, icon grid cells, FAQ questions and an open one, link rows, menu items and the current menu item). Never a second hover colour on a page</strong></div>
          <div><span>Focus</span><strong><code>:focus-visible</code> (ui.css, every element): a 2px Electric Violet ring, 3px outside, radius XS, for keyboard focus</strong></div>
          <div><span>Grid lines</span><strong><code>--grid-lines</code>: a faint vertical grid (Near Black 7%, 80px apart) to set behind a diagram, as on Run and optimise's how it works</strong></div>
          <div><span>Saving badge</span><strong><code>.saving-badge</code>: the percentage saved, Signal Yellow with Near Black H3 text, radius S; with <code>data-pop</code> (re-keyed on change) it swells and sends out a fading yellow ring. Still with reduced motion. The plan finder's answer</strong></div>
          <div><span>Icon ring</span><strong><code>.duo-icon-ring</code>: a 2px White ring round a hero duo icon so overlapping icons (a plan's two sources) stay apart</strong></div>
          <div><span>Scrim</span><strong>Near Black at 24% over the page behind an open menu (the header's mega menu)</strong></div>
          <div><span>Durations</span><strong>{motion.fast} / {motion.base} / {motion.slow}</strong></div>
          <div><span>Spin</span><strong>{motion.spin} a turn, for the stamp's ring on hover</strong></div>
          <div><span>Draw</span><strong>{motion.draw}, once, for a chart line drawing itself in</strong></div>
          <div><span>Roll</span><strong>{motion.roll}, for a figure's digits rolling to a new value</strong></div>
          <div><span>Step</span><strong>{motion.step}, for one step of a process lighting in turn along its rail</strong></div>
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
