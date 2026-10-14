import { breakpoints, layout, motion, radii } from '../brand/tokens.js';
import { PageHeader, Section } from '../components/ui.jsx';
import { WhatsAppBadge } from '../components/WhatsAppBadge.jsx';

// Web components shared with the marketing website. Styles: src/styles/ui.css.
export default function WebComponents() {
  return (
    <>
      <PageHeader eyebrow="Website" title="Web components" intro="Source: src/styles/ui.css and src/brand/tokens.js. The marketing website uses these files directly." />

      <Section title="Buttons">
        <div className="tile">
          <div className="tile-stage stage-light web-demo">
            <button type="button" className="btn btn-primary">See my options</button>
            <button type="button" className="btn btn-secondary">Request a call back</button>
            <button type="button" className="btn btn-primary btn-badge"><WhatsAppBadge />Send your bill on WhatsApp</button>
          </div>
        </div>
        <div className="rows spec-inline">
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

      <Section title="Layout">
        <div className="spec-list spec-inline">
          <div><span>Content width</span><strong>{layout.maxWidth}px</strong></div>
          <div><span>Columns</span><strong>{layout.columns.desktop} desktop, {layout.columns.tablet} tablet, {layout.columns.phone} phone</strong></div>
          <div><span>Gutter</span><strong>{layout.gutter}px</strong></div>
          <div><span>Side margin</span><strong>{layout.margin.phone} / {layout.margin.tablet} / {layout.margin.desktop}px</strong></div>
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
          <div><span>Raised shadow</span><strong>Cards and tiles on hover</strong></div>
          <div><span>Overlay shadow</span><strong>Menus that float over the page</strong></div>
          <div><span>Durations</span><strong>{motion.fast} / {motion.base} / {motion.slow}</strong></div>
          <div><span>Easing</span><strong>Ease-out for things opening</strong></div>
        </div>
      </Section>
    </>
  );
}
