import { PageHeader, Section, Callout } from '../components/ui.jsx';
import { icons, iconColours } from '../brand/icons.js';
import { hexOf } from '../brand/tokens.js';
import { Icon, IconSvg } from '../components/Icon.jsx';
import { nucleoSamples } from '../brand/icon-samples.generated.js';

// What each family is for. Keyed by family, or family + fill where the fills differ.
const uses = {
  'core outline': ['Core, outline', 'The default. Website, marketing and documents.'],
  'core glyph': ['Core, glyph', 'Filled Core. Selected and active states, or where an outline gets too thin.'],
  'ui outline': ['UI, outline', 'Product interface: buttons, fields, menus, tables. 18px grid.'],
  'ui outline-duo': ['UI, outline duo', 'Product interface, with a soft second tone for feature lists and empty states.'],
  'ui glyph': ['UI, glyph', 'Filled UI. Selected and active states in the product.'],
  'ui glyph-duo': ['UI, glyph duo', 'Filled UI with a soft second tone. Navigation and feature tiles in the product.'],
  sharp: ['Sharp', 'Hard edges and square ends. For layouts built around the Stripe. Never in the same set as Core.'],
  micro: ['Micro', 'Very small sizes, 12 to 16px: badges, tags, inline with small text.'],
  'social-media': ['Social media', 'Social links only. One colour.'],
  flags: ['Flags', 'Country pickers and phone prefixes. Keep the flag colours.'],
  'credit-cards': ['Credit cards', 'Payment methods. Keep the card colours.'],
  glass: ['Glass', 'Spot illustrations on the product\'s hero moments. Never as interface icons.'],
  cursors: ['Cursors', 'Custom cursors in the product only.'],
};

const v = (name, alpha = '') => hexOf(name) + alpha;

// Brand colours, including Glass, which takes CSS variables instead of currentColor.
const familyColours = {
  light: {
    color: v('violet-900'),
    '--icon-color-2': v('violet-500'),
    '--nc-gradient-1-color-1': v('violet-400'),
    '--nc-gradient-1-color-2': v('violet-800'),
    '--nc-gradient-2-color-1': v('violet-100'),
    '--nc-gradient-2-color-2': v('violet-300'),
    '--nc-light': v('white'),
  },
  dark: {
    color: v('warm-white'),
    '--icon-color-2': v('violet-400'),
    '--nc-gradient-1-color-1': v('violet-300'),
    '--nc-gradient-1-color-2': v('violet-700'),
    '--nc-gradient-2-color-1': v('violet-100'),
    '--nc-gradient-2-color-2': v('violet-400'),
    '--nc-light': v('white'),
  },
};

function SampleRow({ set, tone }) {
  return (
    <div className={`icon-strip icon-strip-${tone}`} style={familyColours[tone]}>
      {set.icons.map((icon) => (
        <figure key={icon.label} className="icon-sample">
          <IconSvg icon={icon} size={32} />
          <figcaption>{icon.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function Iconography() {
  return (
    <>
      <PageHeader
        eyebrow="Imagery"
        title="Iconography"
        intro="Nucleo icons. Every Nucleo family is available except Pixel, Isometric and Arcade. Core outline is the default."
      />

      <Section title="Default style" intro="Core outline on a 24px grid. These are the icons the website uses now.">
        <div className="icon-strip icon-strip-light">
          {Object.keys(icons).map((name) => (
            <figure key={name} className="icon-sample">
              <Icon name={name} size={32} />
              <figcaption>{name}</figcaption>
            </figure>
          ))}
        </div>
        <div className="icon-strip icon-strip-neutral">
          {Object.keys(icons).map((name) => (
            <figure key={name} className="icon-sample">
              <Icon name={name} tone="neutral" size={32} />
              <figcaption>{name}</figcaption>
            </figure>
          ))}
        </div>
        <div className="icon-strip icon-strip-dark">
          {Object.keys(icons).map((name) => (
            <figure key={name} className="icon-sample">
              <Icon name={name} tone="dark" size={32} />
              <figcaption>{name}</figcaption>
            </figure>
          ))}
        </div>
        <div className="spec-list spec-inline">
          <div><span>Source</span><strong><a href="https://nucleoapp.com" target="_blank" rel="noreferrer">Nucleo</a>, licensed (all families)</strong></div>
          <div><span>Light tone</span><strong>Violet 900, second tone Violet 500</strong></div>
          <div><span>Neutral tone</span><strong>Near Black, second tone Grey 600. Menus and other quiet surfaces</strong></div>
          <div><span>Dark tone</span><strong>Warm White, second tone Violet 400. On Near Black or Violet</strong></div>
          <div><span>Grid and stroke</span><strong>24 × 24, 2px stroke, square corners</strong></div>
          <div><span>Sizes</span><strong>16, 20, 24, 32, 48</strong></div>
        </div>
      </Section>

      <Section title="Families" intro="Each family has a job. Use one family per set of icons, so a row or a menu never mixes styles.">
        {nucleoSamples.map((set) => {
          const key = uses[`${set.family} ${set.fill}`] ? `${set.family} ${set.fill}` : set.family;
          const [name, use] = uses[key];
          return (
            <div key={key} className="icon-family">
              <div className="icon-family-head">
                <strong>{name}</strong>
                <span>{use}</span>
                {set.size && <code>{set.size}</code>}
              </div>
              <SampleRow set={set} tone="light" />
              <SampleRow set={set} tone="dark" />
            </div>
          );
        })}
        <Callout title="Not used">Pixel, Isometric and Arcade. Neufin never uses pixel-art or isometric styles.</Callout>
      </Section>

      <Section title="Rules">
        <div className="rows">
          <div className="row"><span className="row-key">One family per set</span><p>Icons shown together come from one family and one fill. Glyph may stand in for outline only to show a selected state.</p></div>
          <div className="row"><span className="row-key">Colour</span><p>Use one of the three tones: light (violet), neutral (Near Black and Grey 600) or dark. Navigation menus use neutral, so icons don't compete with the content. Flags and card logos keep their own colours.</p></div>
          <div className="row"><span className="row-key">Size</span><p>Use the family's own grid, or a multiple of it. Don't change stroke widths.</p></div>
          <div className="row"><span className="row-key">With text</span><p>An icon sits next to its label, never in place of it, unless the meaning is universal (close, menu, search).</p></div>
          <div className="row"><span className="row-key">Accessibility</span><p>Icons next to a label are hidden from screen readers. An icon on its own gets a <code>title</code>.</p></div>
        </div>
      </Section>

      <Section title="Adding an icon">
        <ol className="plain-list">
          <li>Find it in the Nucleo app, or ask Claude, which searches the Nucleo library directly.</li>
          <li>Add it to <code>src/brand/icon-list.json</code> with a Neufin name, its family, label, fill and size.</li>
          <li>Run <code>npm run icons</code>. This copies only the listed icons into the repo, because the full Nucleo set is licensed and stays out of it.</li>
          <li>Use it: <code>{'<Icon name="bolt" />'}</code>, with <code>tone="dark"</code> on Near Black or Violet.</li>
        </ol>
        <p className="caption">Running the script needs Nucleo installed once on that computer: <code>npx @nucleoicons/skills setup --target vanilla --tools claude</code>. Building the site doesn't.</p>
      </Section>
    </>
  );
}
