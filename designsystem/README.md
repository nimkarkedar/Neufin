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
| Icons in use: `icon-list.json` (what to copy), `icons.generated.js` (copied SVGs), `icons.js` (names and colours). Run `npm run icons` after editing the list | `src/brand/` |
| Logo paths (generated from `Neufin-logo.svg`) | `src/brand/logo-paths.js` |
| Logo, Icon, Stripe shapes, stamp, photo filters, WhatsApp badge | `src/components/*.jsx` |
| Web components: buttons and text fields | `src/styles/ui.css` |
| Styles for this site only | `src/styles/app.css` |
| Logo downloads, photos, PDF page renders | `public/assets/` |

Source files: `Neufin.pdf`, `Neufin-logo.svg`.

## Used by the website

The website imports these from `designsystem/` at build time. Renaming or removing one breaks the website, so change them here and check the website still builds.

| File | What the website uses |
| --- | --- |
| `src/brand/tokens.js` | `allTokens` (every token as a CSS variable), `fonts`, `typeScale`, `breakpoints`, `layout`, `hexOf` |
| `src/brand/icons.js` | icon names (Nucleo, copied by `npm run icons`) |
| `src/components/Logo.jsx` | `Logo` |
| `src/components/Icon.jsx` | `Icon`, `IconSvg` |
| `src/components/Stripe.jsx` | `stripeEdgeClipPath`, `STRIPE_SLOPE`, `stripePoints` (home chart) |
| `src/components/WhatsAppBadge.jsx` | `WhatsAppBadge` |
| `src/components/Stamp.jsx` | `Stamp` (footer) |
| `src/styles/ui.css` | `.btn`, `.btn-primary`, `.btn-accent`, `.btn-secondary`, `.btn-badge`, `.badge-whatsapp`, `.text-field` and `.action-field` and their parts |
| `public/assets/logo/neufin-symbol-violet.svg` | the browser tab icon |

## Icons

Icons are [Nucleo](https://nucleoapp.com) (licensed; every family except Pixel, Isometric and Arcade). Only the icons listed in `src/brand/icon-list.json` are copied into the repo, by `npm run icons`; the full set is licensed and stays out of it. Running the script needs Nucleo installed once on that computer (`npx @nucleoicons/skills setup --target vanilla --tools claude`). Building the site doesn't.

## Publish

```bash
npm run deploy  # builds for /Neufin/designsystem/ and publishes to gh-pages under designsystem/
```
