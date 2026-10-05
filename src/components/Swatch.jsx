import { bestText, contrast, rating, hexOf } from '../brand/tokens.js';
import { useCopy } from './ui.jsx';

export function Swatch({ name, hex, token, role, size = 'md' }) {
  const [copied, copy] = useCopy();
  const fg = bestText(hex);
  const ratio = contrast(hex, fg);
  return (
    <button className={`swatch swatch-${size}`} onClick={() => copy(hex)} title={`Copy ${hex}`}>
      <div className="swatch-chip" style={{ background: hex, color: fg }}>
        <span className="swatch-name">{name}</span>
        <span className="swatch-hex">{copied === hex ? 'Copied' : hex}</span>
      </div>
      <div className="swatch-meta">
        {token && <code>--{token}</code>}
        {role && <p>{role}</p>}
        <span className="swatch-a11y">{fg === hexOf('near-black') ? 'Near Black' : 'Warm White'} text · {ratio.toFixed(1)}:1 · {rating(ratio)}</span>
      </div>
    </button>
  );
}
