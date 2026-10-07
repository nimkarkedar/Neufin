// Builds illustration prompts from prompt-template.md. All wording lives in the template.
import template from './prompt-template.md?raw';

const body = template.replace(/<!--[\s\S]*?-->/g, '');

// Split on "## NAME" or "## KIND: id" headings.
const blocks = {};
body.split(/^## /m).slice(1).forEach((chunk) => {
  const [heading, ...rest] = chunk.split('\n');
  blocks[heading.trim()] = rest.join('\n').trim();
});

function options(kind) {
  return Object.entries(blocks)
    .filter(([k]) => k.startsWith(`${kind}:`))
    .map(([k, text]) => {
      const label = text.match(/^Label:\s*(.+)$/m)?.[1] ?? k;
      const swatch = text.match(/^Swatch:\s*(.+)$/m)?.[1].split('|').map((v) => v.trim());
      return { id: k.split(':')[1].trim(), label, swatch, text: text.replace(/^(Label|Swatch):.*\n/gm, '').trim() };
    });
}

export const formats = options('FORMAT');
export const schemes = options('COLOURS');

export function buildPrompt({ concept, format, scheme }) {
  const f = formats.find((o) => o.id === format);
  const s = schemes.find((o) => o.id === scheme);
  return [
    blocks.MASTER,
    f.text,
    s.text,
    blocks.CONCEPT.replace('{{concept}}', concept.trim() || 'Describe the concept here.'),
  ].join('\n\n');
}
