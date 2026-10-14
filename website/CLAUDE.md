# neufin.energy — build notes

The marketing website for Neufin Energy. This file is the running record of how we build it. Read it before every change and add to it when we agree something new.

@AGENTS.md

## Rules

1. **Mobile first.** Write CSS for a 390px phone first, then add `min-width` queries at the design system breakpoints: 768px tablet, 1024px desktop, 1280px wide (`breakpoints` in tokens.js; `TABLET_MIN` and `DESKTOP_MIN` in `src/lib/tokens.ts`). Check every change at 390px and 1440px. Tap targets at least 48px.
2. **Powered by the Neufin design system.** Every design value comes from `../designsystem` (imported as `@ds/...`): colours, gradients, fonts, the type scale with its phone sizes, the layout grid and margins, breakpoints, radii, shadows, motion, the logo, icons, Stripe shapes, buttons and text fields. Never hard-code a hex value, rgb(), font, type size, radius, shadow or duration here. If something is missing, add it to the design system first (and to its docs), then use it. See "Where design decisions live" below.
3. **SEO rich.** Every page exports `metadata` (title, description, canonical), has one `h1`, uses semantic landmarks, and is added to `src/app/sitemap.ts`. Organisation JSON-LD is in `layout.tsx`; add page-level JSON-LD (Article, FAQ, Breadcrumb) where it applies. Pages are pre-rendered to HTML at build time; use client components only for interaction.
4. **Accessible.** Keyboard and screen reader support for every interactive piece (Escape closes, focus returns, `aria-expanded`, `aria-current`). Respect reduced motion.
5. **Copy** follows the design system's Tone of voice page: plain, factual, numbers over adjectives. No slogans, rhythmic triplets or puffery. Uppercase only for labels of one or two words.
6. **One source for content.** Navigation, footer links and contact details are in `src/lib/site.ts`. The header, footer, sitemap and metadata read from it.

## Stack

- Next.js 16 (App Router, Turbopack), TypeScript, CSS Modules plus `src/app/globals.css`. No Tailwind.
- Built as a static export (`output: "export"` in `next.config.ts`): plain HTML, CSS and JS, no server. Cache Components is off because it doesn't work with a static export.
- Fonts: Archivo, IBM Plex Sans and IBM Plex Mono, self-hosted with `next/font`.
- `globals.css` and then `@ds/styles/ui.css` are the first imports in `layout.tsx`, so component CSS Modules can override them. Keep them first.
- `npm run dev` and `npm run build` first run `scripts/sync-ds-assets.mjs`, which copies files the site serves as-is from the design system (the browser tab icon). Don't edit the copies.
- Blog and forms: Sanity (planned). Blog posts will come from Sanity and be added to the sitemap.
- Preview hosting: GitHub Pages, next to the design system. `npm run deploy` in `website/` builds with `BASE_PATH=/Neufin/website` and publishes `out/` to the `website/` folder of the `gh-pages` branch. Live at https://nimkarkedar.github.io/Neufin/website/. Local dev: `npm run dev`, http://localhost:3000.
- Search engines are blocked (robots.txt disallow + noindex) until the site is built with `SITE_LIVE=true` at launch.

## Layout

- Grid from Figma: 12 columns of 88px with 20px gutters, 1276px content, centred. 4 columns on phones, 8 on tablets.
- `.container` gives the centred width and side margins (20 / 32 / 40px). `.grid` gives the column grid.
- Heading sizes step down on phones (set in `src/lib/tokens.ts`); the design system sizes apply from 1024px.

## Where design decisions live

| Decision | Source | In the website as |
| --- | --- | --- |
| Colours, gradients, fonts, type scale | `designsystem/src/brand/tokens.js` | `var(--violet-600)`, `var(--gradient-dawn)`, `var(--font-body)`, `var(--text-h3-size)` |
| Phone type sizes | `typeScale[].mobile` in tokens.js | applied below 1024px by `src/lib/tokens.ts` |
| Layout grid, margins, breakpoints | `layout`, `breakpoints` in tokens.js | `.container`, `.grid`, `var(--grid-max)`, `var(--grid-gutter)`, `var(--grid-margin)` |
| Radii, shadows, motion | `radii`, `shadows`, `motion` in tokens.js | `var(--radius-m)`, `var(--shadow-overlay)`, `var(--duration-base)`, `var(--ease-out)` |
| Buttons, text fields, WhatsApp badge | `designsystem/src/styles/ui.css`, `WhatsAppBadge.jsx` | `.btn .btn-primary`, `.btn-secondary`, `.btn-badge`, `.text-field` |
| Logo, icons, Stripe shapes, stamp | `designsystem/src/components/` | `<Logo>`, `<Icon>`, `stripeEdgeClipPath`, `var(--stripe-slope)`, `<Stamp>` |
| Site-only: header height, page structure, copy and links | this folder | `--header-h`, components, `src/lib/site.ts` |

## Built so far

- **Header** (`src/components/SiteHeader.tsx`): sticky, White; its bottom line appears only after scrolling, so at the top it runs into the page's White-to-Warm-White fade. Desktop shows the links inline. Solutions, Products, Resources and About open a flyout: icon tile (Warm White, neutral design system icon at 24px), title, one-line description, and a link to the overview page. Flyouts open on hover (after a 120ms rest, close 250ms after leaving, mouse only) and on click or keyboard. Phones and tablets get a menu button that opens a full-screen panel, where those four expand in place.
- **Footer** (`src/components/SiteFooter.tsx`): first a contact card (White, on the Warm White page) (`FooterContact.tsx`): one card, three blocks with Grey 200 dividers, each block on its own layer of the design system's Violet gradient at 20% opacity; hovering a block (or keyboard focus inside it) fades that block's gradient to 50% over `--duration-slow` with ease-in-out, so the fade is visible from start to end rather than front-loaded, and the block lifts 4px out of the card with the design system's raised shadow and rounded corners. Only the WhatsApp button is solid; Request a call back is outlined. Blocks: (1) "Send us your latest power bill. We'll show you where the money is going." with Send your bill on WhatsApp; (2) "Speak to a Neufin specialist" with faces and Request a call back, which opens a +91 field and Call me back in place (checked by `src/lib/phone.ts`, sent to `NEXT_PUBLIC_CALLBACK_URL`; unset in the preview, so the form says call-backs aren't connected yet); (3) Contact us with email and phone. Below it, the Near Black area whose top edge steps down at the top right along the Stripe's edge (`stripeEdgeClipPath`; the step starts at column 11 on desktop and the diagonal ends at the content's right edge). Inside: white logo, five link groups on every second column (Solutions, Products, Resources, Company, Social), the stamp in the cell after the last group (ring turns on hover), and a Grey 900 bottom bar with Privacy policy, Terms of use and ©.
- **Home page hero** (`src/components/home/`): from Kedar's mock. Centred headline "Cut Energy Cost. On Your Terms." (one sentence per line), his supporting line, then the state picker as the design system's action field with See my options in the accent button (Electric Violet), and links to the bill checker and WhatsApp. Below, a before-and-after slider (`ComparePanel.tsx`) standing in for the product: two identical layouts stacked, Before (grid power, mostly coal: greys on White) and After (with Neufin, mostly renewables: Violet 100 with Electric Violet, a design system illustration combo). Dragging the handle (pointer, touch or arrow keys) reveals After from the right and sweeps across the monthly bars, so the bill drops. Each side's title, figures and energy mix sit on its own half, so neither covers the other with the handle in the middle. A price line runs across both layers: flat and high (Near Black) on Before, stepping down at the N's slope (the Stripe, `stripePoints`) so the drop ends exactly at the handle, then flat and low (Electric Violet) with a −34% tag. The step moves with the handle. The bar scale starts at ₹8 lakh so the drop reads; the figures carry exact amounts. Kept quiet: thin soft bars, figures at H3, the accent only in bars, line and mix. On load the handle glides once from 82% to the middle (skipped with reduced motion). No client names; the caption says the figures are illustrative.
- **Home page below the hero**: an 800px empty spacer (`src/app/page.module.css`), on purpose, so the page scrolls while the next blocks are designed. Shrink it as blocks are added.

## Open items

- Real solution and product names and descriptions for the flyouts (placeholders in `site.ts`).
- Email, phone, WhatsApp number and the LinkedIn, Instagram and X links in `site.ts` are dummies. Also confirm the registered company name and address.
- Team photos for the footer card. The four in `src/assets/placeholder-faces/` are free Unsplash photos used as placeholders; replace them and delete that folder.
- Call-backs aren't connected. `src/lib/callback.ts` has the checking code and a ready-to-paste endpoint; connect it to the forms backend (Sanity or a CRM) before launch.
- Pages linked from the nav don't exist yet, nor does `/options` (the hero picker's target).
- Hero slider figures (bills, cost per unit, energy mix) are illustrative; get Neufin's approval of the example numbers, or replace with the real product.

## Handover to Neufin's engineer

The repo (github.com/nimkarkedar/Neufin) holds two projects: `designsystem/` (Vite + React) and `website/` (this site). The website imports tokens, logo, icons and shapes from `../designsystem/src`, so keep the two folders side by side.

- Run: `cd website && npm install && npm run dev`.
- Content to replace: everything marked TODO (`grep -rn TODO src`), the dummies in `src/lib/site.ts` and the placeholder faces.
- Production hosting needs a server for forms and the Sanity blog. On a server host (for example Vercel with root directory `website`): remove `output`, `trailingSlash` and `images` from `next.config.ts`, unset `BASE_PATH`, optionally turn Cache Components back on, add `src/app/api/callback/route.ts` as shown in `src/lib/callback.ts`, and set `NEXT_PUBLIC_CALLBACK_URL=/api/callback` and `SITE_LIVE=true`.
- Point `neufin.energy` at the production host. `site.url` in `site.ts` is already `https://neufin.energy`.

## Decisions log

- 2026-10-13: Started the site. Header and footer first, from the Figma reference. Flyouts open on click, not hover. Type scale and icons moved into the design system so both sites share them.
- 2026-10-13: Flyouts made compact: 340px wide, 16px item titles, 13px descriptions, 36px icon tiles. Keep menus small; size was the first complaint.
- 2026-10-13: Flyouts open on hover as well as click. Footer logo is black (single colour). The Stripe is used once, as the footer's last element; the graphic device rules allow at most two per layout.
- 2026-10-14: Footer redesigned around the Stripe, from Kedar's mock: logo on the Stripe, legal line in the lower band, Violet 800. WhatsApp green (#25D366) is allowed only inside the WhatsApp mark, as a third-party logo.
- 2026-10-14: Legal line moved from the lower band to under the logo on wide screens; on their own in the lower band the links looked stranded. Phones keep the legal line as the last row.
- 2026-10-14: Privacy and Terms go in the white pocket bottom-left, as in Kedar's mock; © stays under the logo. When Kedar supplies a layout, build it as drawn and raise concerns separately.
- 2026-10-14: Legal row is Privacy policy, Terms of use and © on one line in the white pocket (Kedar's mock). Checked: the diagonal stays at least 50px clear of it from 1280px up.
- 2026-10-14: Added the Stripe flow animation: current running along the line. Paths are computed from the design system's STRIPE_SLOPE and STRIPE_KINK_OFFSET, so they stay inside the shape at every width.
- 2026-10-14: Flow animation changed from light streaks with tails (read as organic) to upright brand squares in groups. Kedar's choice. No glows or tails in motion graphics.
- 2026-10-14: Squares didn't work either. Flow is now flowing dashes in four lanes, starting from the logo. Kedar's choice.
- 2026-10-14: Dashes didn't work either. Flow is now the light sweep. Kedar's choice after trying streaks, squares and dashes.
- 2026-10-14: Home hero built from Kedar's directional mock. Supporting line uses the Tone of voice page's approved sentence instead of the mock's three-sentence line, per the no-slogan rule; Kedar to confirm.
- 2026-10-14: Hero made shorter: it must not fill a laptop's first screen. Photo height follows the screen height (desktop clamp(240px, 30vh, 320px)), tighter gaps, supporting line on one row. At 1440 × 900 the hero ends at about 650px.
- 2026-10-14: Footer Stripe is Violet 900 (#390080), Kedar's call. Photo filters (duotone, violet wash) moved to `designsystem/src/components/PhotoFilters.jsx` so the site shares them.
- 2026-10-14: Hero and the variations page deleted; the home page is empty until Kedar sends the exact hero design. The `pylon-dusk` photo stays in the design system library.
- 2026-10-14: Footer redone from Kedar's directional mock: dark footer with a Stripe-edge corner, contact bar, five link groups, bottom bar. Tweaks: Near Black and Grey 900 from the design system, faces on the bar without a white box, tighter link spacing, Social group added. The Stripe band, light sweep, CTA cards and WhatsApp button are gone.
- 2026-10-14: Footer contact block is a call-back field (main action) plus Send your bill on WhatsApp (second). A plain "call us" number was left out; it belongs on the Contact page. Kedar's choice.
- 2026-10-14: Contact moved out of the dark footer into a three-column card above it (Kedar's mock). Request a call back opens the phone field in place rather than linking away. Pill buttons and Grey 200 dividers per the design system.
- 2026-10-14: Contact card blocks get the design system gradients (Daylight, Violet, Dawn) and a hover glow. Stays one card (Kedar: no separate cards). Button hierarchy: WhatsApp solid, call back outlined, contact details as links. Text on the gradients is Near Black; grey only for large bold text, where it still passes contrast.
- 2026-10-14: Contact card uses one gradient across all three blocks, super soft (Dawn under a 60% white wash). Kedar: same gradient across, soft and elegant. Prefer quiet surfaces over colourful ones.
- 2026-10-14: Contact card gradient is now Violet at 50% opacity, fading to 100% on hover (Kedar's call). Only the gradient layer fades, so the text stays full strength. The per-block hover brighten is removed so there is one hover effect.
- 2026-10-14: Correction: the hover is per block, not the whole card. Each block fades its own gradient from 50% to 100%; the others stay at 50%.
- 2026-10-14: Icons are now Nucleo (Kedar bought the full licence; every family except Pixel, Isometric and Arcade, which Neufin never uses). Default: Core outline 24. The header flyout icons use the same names, now drawn from Nucleo. New icons: add to `designsystem/src/brand/icon-list.json`, run `npm run icons` in `designsystem/`.
- 2026-10-14: Page background is Warm White (#F7F5FA), Kedar's call. The main navigation (header bar and phone menu) stays White, as do cards, flyouts and fields (Kedar). Design system colour roles updated to match.
- 2026-10-14: Footer stamp ("Cut energy cost on your terms", Kedar's artwork) is the design system's `Stamp` component. Warm White at 25% opacity in the cell after the Social group. Its ring turns while hovered (`--duration-spin`, 16s a turn) and stops where it is; the symbol stays upright. No motion with reduced motion on.
- 2026-10-14: Flyout and phone-menu icons follow the design system's Iconography page: Core outline at 24px, neutral tone (Near Black, Grey 600 second tone) on Warm White tiles with a Grey 200 line (40px). Violet tiles were too violet (Kedar); the neutral tone was added to the design system for menus.
- 2026-10-14: Contact card blocks rise on hover (Kedar): 4px lift, `--shadow-raised`, all corners rounded, over `--duration-slow` ease-out. The card no longer clips its blocks (no overflow hidden); the first and last blocks round their own outer corners instead. No lift with reduced motion.
- 2026-10-14: Page top fades from White (the navigation) into Warm White over the first 80% of the screen, then flat Warm White (Kedar). Set on `body` in globals.css; it scrolls away with the page. The header's bottom line shows only once the page is scrolled (or the phone menu is open), so at the top the White runs on unbroken.
- 2026-10-14: Home hero built from Kedar's mock. See my options uses the new design system accent button (Electric Violet, once per page); the picker is the new design system action field. The product panel simulates a bill in Indian terms (₹ lakh, kWh, FY April–March, MSEDCL, HT industrial) and the chart's trend is the Stripe at the N's slope. Kedar kept his supporting line (three short sentences) as drawn.
- 2026-10-14: Hero panel redone as a before-and-after slider (Kedar: the bill chart was too literal; the Stripe trend line is gone). Before is brown energy in greys, after is green energy in Energy Mint on Near Black, never violet. Generic "typical industrial site", no client or discom names. Reference: Reel's platform comparison.
- 2026-10-14: Slider made quieter (Kedar: too loud) and the N brought back as the price line stepping down at the handle (Kedar: the price cut wasn't coming through).
- 2026-10-14: After side is Violet 100 with Electric Violet (Kedar picked it from a demo of the design system's illustration combos: Near Black/Mint, Signal Yellow, Coral, Mint, Violet 100, Dawn). Calmest of the set; the demo switcher is removed.
- 2026-10-14: About's flyout opens leftwards below 1280px; it was running off the screen at 1024px.
- 2026-10-14: Block gradient softened to 20% at rest, 50% on hover (Kedar).
- 2026-10-14: Preview moved from Vercel to GitHub Pages (Kedar: one place next to the design system; hand the repo to Neufin's engineer). Static export; the call-back endpoint became `src/lib/callback.ts` for the engineer to connect.
- 2026-10-14: Audit: everything the site used that wasn't in the design system moved there (layout grid, breakpoints, phone type sizes, radii, shadows, motion, buttons, text field, WhatsApp badge and colour, tab icon). The site now has no hard-coded colours, sizes, radii, shadows or durations. The design system is organised in three sections: brand and marketing, website, product (planned).
