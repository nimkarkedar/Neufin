import { IconSvg } from './Icon.jsx';
import { icons } from '../brand/icons.js';

// Checkbox and radio: a native input (visually hidden, so keyboard and screen readers work as
// usual) with a drawn box beside its label, and an optional count after it, e.g. a filter
// option "1–5 years (3)". Checkbox for "any of these", radio for "one of these". With `hint`,
// the label is semibold with a Small secondary line under it ("Industrial" / "Factories,
// plants"), for options that need a word of explanation.
// Styles: `.check` in ui.css. Every other prop goes to the input (checked, onChange, name…).
/** @param {{ type?: 'checkbox' | 'radio', label: import('react').ReactNode, hint?: import('react').ReactNode, count?: number } & import('react').InputHTMLAttributes<HTMLInputElement>} props */
export function Check({ type = 'checkbox', label, hint, count, ...input }) {
  return (
    <label className={`check${type === 'radio' ? ' check-radio' : ''}${hint ? ' check-with-hint' : ''}`}>
      <input type={type} className="check-input" {...input} />
      <span className="check-box" aria-hidden="true">
        {type === 'checkbox' && <IconSvg icon={icons.check} size={14} />}
      </span>
      <span className="check-label">
        {label}
        {count != null && <span className="check-count"> ({count})</span>}
        {hint && <span className="check-hint">{hint}</span>}
      </span>
    </label>
  );
}
