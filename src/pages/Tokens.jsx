import { allTokens } from '../brand/tokens.js';
import { PageHeader, Section, useCopy } from '../components/ui.jsx';

export default function Tokens() {
  const [copied, copy] = useCopy();
  const tokens = allTokens();
  const css = `:root {\n${Object.entries(tokens).map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}`;

  return (
    <>
      <PageHeader
        eyebrow="Product"
        title="Design tokens"
        intro="Source: src/brand/tokens.js"
      />

      <Section title="All tokens">
        <table className="token-table">
          <thead><tr><th>Token</th><th>Value</th><th /></tr></thead>
          <tbody>
            {Object.entries(tokens).map(([k, v]) => (
              <tr key={k} onClick={() => copy(`var(${k})`)}>
                <td><code>{k}</code></td>
                <td><code>{v}</code></td>
                <td>{v.startsWith('#') || v.startsWith('linear') ? <span className="token-dot" style={{ background: v }} /> : <span style={{ fontFamily: v }}>Aa</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="caption">Click a row to copy <code>var(--token)</code>.{copied && <strong> Copied {copied}</strong>}</p>
      </Section>

      <Section title="CSS">
        <div className="code-block">
          <button onClick={() => copy(css)}>{copied === css ? 'Copied' : 'Copy'}</button>
          <pre>{css}</pre>
        </div>
      </Section>
    </>
  );
}
