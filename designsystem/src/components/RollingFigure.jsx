// Rolling figure: a number whose digits roll to their new value like the reels of a
// counter when the value changes (a price, a bill, a saving). Calm, not a slot-machine
// show: each digit is a 0–9 reel that slides once with ease-out, the reels settling left
// to right a moment apart. Other characters (₹ , . % and words) stay still.
// Styles: `.rolling-figure` in ui.css. Screen readers get the plain value.

const reel = '0123456789'.split('');

/** @param {{ value: string | number, className?: string }} props */
export function RollingFigure({ value, className }) {
  const chars = String(value).split('');
  const n = chars.length;
  return (
    <span className={className ? `rolling-figure ${className}` : 'rolling-figure'}>
      <span className="visually-hidden">{value}</span>
      <span className="rolling-figure-chars" aria-hidden="true">
        {chars.map((c, i) =>
          // Keyed by place from the right, so the ones digit stays the ones digit (and
          // rolls) when the number gains or loses a digit.
          /\d/.test(c) ? (
            <span key={`d${n - i}`} className="rolling-digit" style={{ '--digit': c, '--order': i }}>
              <span className="rolling-reel">
                {reel.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          ) : (
            <span key={`c${n - i}`} className="rolling-char">
              {c}
            </span>
          ),
        )}
      </span>
    </span>
  );
}
