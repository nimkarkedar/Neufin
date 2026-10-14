# Neufin design system

The source of truth for Neufin Energy, in three sections:

1. **Brand and marketing**: logo, colour, typography, graphic device, imagery, tone of voice, and examples.
2. **Website**: web components (buttons, text fields, layout, radius, shadow, motion) and design tokens. The marketing website in `../website` uses these files directly.
3. **Product**: planned. Guidelines for the Neufin product are added when its design starts.

Live site: https://nimkarkedar.github.io/Neufin/designsystem/

## Run locally

```bash
cd designsystem
npm install
npm run dev     # http://localhost:5173
```

## Where things live

| What | Where |
| --- | --- |
| Left-panel sections and links | `src/nav.js` |
| Pages (right panel) | `src/pages/*.jsx` |
| Tokens: colours, gradients, fonts, type scale (desktop and phone sizes), layout grid and breakpoints, radii, shadows, motion | `src/brand/tokens.js` |
| Line icons (placeholders until the Streamline set is bought) | `src/brand/icons.js` |
| Logo paths (generated from `Neufin-logo.svg`) | `src/brand/logo-paths.js` |
| Logo, Icon, Stripe shapes, photo filters, WhatsApp badge | `src/components/*.jsx` |
| Web components: buttons and text fields | `src/styles/ui.css` |
| Styles for this site only | `src/styles/app.css` |
| Logo downloads, photos, PDF page renders | `public/assets/` |

Source files: `Neufin.pdf`, `Neufin-logo.svg`.

## Used by the website

The website imports these from `designsystem/` at build time. Renaming or removing one breaks the website, so change them here and check the website still builds.

| File | What the website uses |
| --- | --- |
| `src/brand/tokens.js` | `allTokens` (every token as a CSS variable), `fonts`, `typeScale`, `breakpoints`, `layout`, `hexOf` |
| `src/brand/icons.js` | icon names |
| `src/components/Logo.jsx` | `Logo` |
| `src/components/Icon.jsx` | `Icon` |
| `src/components/Stripe.jsx` | `stripeEdgeClipPath`, `STRIPE_SLOPE` |
| `src/components/WhatsAppBadge.jsx` | `WhatsAppBadge` |
| `src/styles/ui.css` | `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-badge`, `.badge-whatsapp`, `.text-field` and its parts |
| `public/assets/logo/neufin-symbol-violet.svg` | the browser tab icon |

## Publish

```bash
npm run deploy  # builds for /Neufin/designsystem/ and publishes to gh-pages under designsystem/
```
