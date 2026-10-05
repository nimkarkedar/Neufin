# Neufin Brand

The source of truth for the Neufin Energy brand and product: logo, colour, typography, graphic device, imagery, tone of voice, examples and design tokens.

Live site: https://nimkarkedar.github.io/neufin-brand/

## Run locally

```bash
npm install
npm run dev     # http://localhost:5173
```

## Where things live

| What | Where |
| --- | --- |
| Left-panel links | `src/nav.js` |
| Pages (right panel) | `src/pages/*.jsx` |
| Brand tokens (colours, fonts) | `src/brand/tokens.js` |
| Logo paths (generated from `Neufin-logo.svg`) | `src/brand/logo-paths.js` |
| Logo downloads, photos, PDF page renders | `public/assets/` |

Source files: `Neufin.pdf`, `Neufin-logo.svg`.

## Publish

```bash
npm run deploy  # builds for /neufin-brand/ and pushes to the gh-pages branch
```
