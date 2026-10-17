import { breakpoints, layout, motion, radii } from '../brand/tokens.js';
import { PageHeader, Section } from '../components/ui.jsx';
import { WhatsAppBadge } from '../components/WhatsAppBadge.jsx';
import { IconSvg } from '../components/Icon.jsx';
import { icons } from '../brand/icons.js';

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
            <button type="button" className="btn btn-primary btn-badge"><WhatsAppBadge />Send your bill on WhatsApp</button>
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
          </div>
        </div>
        <div className="rows spec-inline">
          <div className="row"><span className="row-key">Use</span><p>A choice and the button that acts on it, as one unit. The home page state picker.</p></div>
          <div className="row"><span className="row-key">Shape</span><p>One white pill with the raised shadow; the button sits inside it, 6px in. Near Black border on focus.</p></div>
          <div className="row"><span className="row-key">Phones</span><p>The choice and the button stack, each full width.</p></div>
          <div className="row"><span className="row-key">Code</span><p><code>.action-field</code>, <code>.action-field-choice</code> around a <code>select</code>, then a <code>.btn</code>.</p></div>
        </div>
      </Section>

      <Section title="Layout">
        <div className="spec-list spec-inline">
          <div><span>Content width</span><strong>{layout.maxWidth}px</strong></div>
          <div><span>Columns</span><strong>{layout.columns.desktop} desktop, {layout.columns.tablet} tablet, {layout.columns.phone} phone</strong></div>
          <div><span>Gutter</span><strong>{layout.gutter}px</strong></div>
          <div><span>Side margin</span><strong>{layout.margin.phone} / {layout.margin.tablet} / {layout.margin.desktop}px</strong></div>
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
          <div><span>Raised shadow</span><strong>Cards and tiles on hover, lifted 4px</strong></div>
          <div><span>Overlay shadow</span><strong>Menus that float over the page</strong></div>
          <div><span>Scrim</span><strong>Near Black at 24% over the page behind an open menu (the header's mega menu)</strong></div>
          <div><span>Durations</span><strong>{motion.fast} / {motion.base} / {motion.slow}</strong></div>
          <div><span>Spin</span><strong>{motion.spin} a turn, for the stamp's ring on hover</strong></div>
          <div><span>Draw</span><strong>{motion.draw}, once, for a chart line drawing itself in</strong></div>
          <div><span>Easing</span><strong>Ease-out for things opening</strong></div>
        </div>
      </Section>
    </>
  );
}
