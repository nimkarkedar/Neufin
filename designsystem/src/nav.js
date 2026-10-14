// Left-panel navigation, in three sections: brand and marketing, the website, and the
// Neufin product. Add, rename or reorder links here.
// `id` becomes the URL hash (#/logo), `page` is the component in src/pages.
// A group without a label lists its links straight under the section.
import Overview from './pages/Overview.jsx';
import LogoPage from './pages/LogoPage.jsx';
import Colour from './pages/Colour.jsx';
import Typography from './pages/Typography.jsx';
import GraphicDevice from './pages/GraphicDevice.jsx';
import Iconography from './pages/Iconography.jsx';
import Photography from './pages/Photography.jsx';
import Illustration from './pages/Illustration.jsx';
import ToneOfVoice from './pages/ToneOfVoice.jsx';
import Applications from './pages/Applications.jsx';
import Presentations from './pages/Presentations.jsx';
import Tokens from './pages/Tokens.jsx';
import WebComponents from './pages/WebComponents.jsx';
import Product from './pages/Product.jsx';

export const nav = [
  {
    section: 'Brand and marketing',
    groups: [
      { group: 'Start', items: [{ id: 'overview', label: 'Overview', page: Overview }] },
      {
        group: 'Brand foundations',
        items: [
          { id: 'logo', label: 'Logo', page: LogoPage },
          { id: 'colour', label: 'Colour', page: Colour },
          { id: 'typography', label: 'Typography', page: Typography },
          { id: 'graphic-device', label: 'Graphic device', page: GraphicDevice },
        ],
      },
      {
        group: 'Imagery',
        items: [
          { id: 'iconography', label: 'Iconography', page: Iconography },
          { id: 'photography', label: 'Photography', page: Photography },
          { id: 'illustration', label: 'Illustration', page: Illustration },
        ],
      },
      { group: 'Voice', items: [{ id: 'tone-of-voice', label: 'Tone of voice', page: ToneOfVoice }] },
      {
        group: 'Examples',
        items: [
          { id: 'applications', label: 'Applications', page: Applications },
          { id: 'presentations', label: 'Presentations', page: Presentations },
        ],
      },
    ],
  },
  {
    section: 'Website',
    groups: [
      {
        items: [
          { id: 'web-components', label: 'Web components', page: WebComponents },
          { id: 'tokens', label: 'Design tokens', page: Tokens },
        ],
      },
    ],
  },
  {
    section: 'Product',
    groups: [{ items: [{ id: 'product', label: 'Neufin product', page: Product, status: 'planned' }] }],
  },
];

export const flatNav = nav.flatMap((s) => s.groups.flatMap((g) => g.items));
