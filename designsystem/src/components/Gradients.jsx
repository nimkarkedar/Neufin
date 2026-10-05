import { gradients, gradientCss } from '../brand/tokens.js';
import { Logo } from './Logo.jsx';
import { useCopy } from './ui.jsx';

const byName = Object.fromEntries(gradients.map((g) => [g.name, g]));
const u = (n) => `${(n / 10.8).toFixed(3)}cqw`;

export function GradientSwatches() {
  const [copied, copy] = useCopy();
  return (
    <div className="grad-grid">
      {gradients.map((g) => (
        <button key={g.name} className="grad" onClick={() => copy(`var(--${g.token})`)} title={`Copy var(--${g.token})`}>
          <span className="grad-fill" style={{ background: gradientCss(g) }} />
          <strong>{g.name}</strong>
          <span className="grad-stops">{copied === `var(--${g.token})` ? 'Copied' : g.stops.join(' · ')}</span>
        </button>
      ))}
    </div>
  );
}

export const gradientRules = [
  ['Violet', 'Default. Brand and marketing moments.'],
  ['Dawn', 'Savings, results and success.'],
  ['Daylight', 'Product, reports and data covers.'],
  ['Use for', 'Large backgrounds: social posts, presentation covers and section dividers, website section backgrounds, empty states.'],
  ['Text', 'Near Black only. It passes AA on every gradient.'],
  ['Direction', 'Top to bottom. Rotate 90° only when used as a horizontal band or rule.'],
  ['One per layout', 'Do not combine gradients, and do not place one next to a photograph.'],
  ['Fixed', 'Do not change the colours, mid point, angle or opacity. Do not create new gradients.'],
  ['Not for', 'Buttons, icons, charts, small UI elements or behind the Stripe. Use solid colours there.'],
];

export function GradientExamples() {
  return (
    <div className="grad-examples">
      <figure>
        <div className="post" style={{ aspectRatio: '4 / 5', background: gradientCss(byName.Violet) }}>
          <div className="post-logo" style={{ left: u(80), top: u(80) }}><Logo height={u(64)} color="var(--near-black)" /></div>
          <div className="post-head" style={{ left: u(80), bottom: u(110), width: u(860), fontSize: u(104), lineHeight: 0.95, color: 'var(--near-black)', fontWeight: 800 }}>
            Your power bill should not be a mystery.
          </div>
        </div>
        <figcaption>Social post · Violet</figcaption>
      </figure>
      <figure>
        <div className="post" style={{ aspectRatio: '16 / 9', background: gradientCss(byName.Daylight) }}>
          <div className="post-line" style={{ left: u(70), top: u(70), fontSize: u(28), color: 'var(--near-black)' }}>Energy review · September</div>
          <div className="post-head" style={{ left: u(70), bottom: u(70), width: u(700), fontSize: u(72), lineHeight: 1, color: 'var(--near-black)', fontWeight: 800 }}>
            Where you can save
          </div>
          <div className="post-logo" style={{ right: u(70), bottom: u(70) }}><Logo height={u(44)} color="var(--near-black)" /></div>
        </div>
        <figcaption>Presentation cover · Daylight</figcaption>
      </figure>
      <figure>
        <div className="post grad-product" style={{ aspectRatio: '4 / 5', background: gradientCss(byName.Dawn) }}>
          <div className="grad-card">
            <span>Saved this month</span>
            <strong><span className="num">₹4.2</span> lakh</strong>
            <span>Your new tariff is live.</span>
          </div>
        </div>
        <figcaption>Product empty state or summary · Dawn</figcaption>
      </figure>
    </div>
  );
}
