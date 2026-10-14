# neufin.energy — build notes

The marketing website for Neufin Energy. This file is the running record of how we build it. Read it before every change and add to it when we agree something new.

@AGENTS.md

## Rules

1. **Mobile first.** Write CSS for a 390px phone first, then add `min-width` queries: 768px tablet, 1024px desktop (`DESKTOP_MIN` in `src/lib/tokens.ts`). Check every change at 390px and 1440px. Tap targets at least 48px.
2. **Powered by the Neufin design system.** Colours, fonts, the type scale, the logo and icons come from `../designsystem/src` (imported as `@ds/...`). Never hard-code a hex value, font or type size here. If something is missing, add it to the design system first, then use it.
3. **SEO rich.** Every page exports `metadata` (title, description, canonical), has one `h1`, uses semantic landmarks, and is added to `src/app/sitemap.ts`. Organisation JSON-LD is in `layout.tsx`; add page-level JSON-LD (Article, FAQ, Breadcrumb) where it applies. Pages are pre-rendered to HTML at build time; use client components only for interaction.
4. **Accessible.** Keyboard and screen reader support for every interactive piece (Escape closes, focus returns, `aria-expanded`, `aria-current`). Respect reduced motion.
5. **Copy** follows the design system's Tone of voice page: plain, factual, numbers over adjectives. No slogans, rhythmic triplets or puffery. Uppercase only for labels of one or two words.
6. **One source for content.** Navigation, footer links and contact details are in `src/lib/site.ts`. The header, footer, sitemap and metadata read from it.

## Stack

- Next.js 16 (App Router, Turbopack), TypeScript, CSS Modules plus `src/app/globals.css`. No Tailwind.
- Built as a static export (`output: "export"` in `next.config.ts`): plain HTML, CSS and JS, no server. Cache Components is off because it doesn't work with a static export.
- Fonts: Archivo, IBM Plex Sans and IBM Plex Mono, self-hosted with `next/font`.
- `globals.css` is the first import in `layout.tsx`, so component CSS Modules can override global classes like `.btn`. Keep it first.
- Blog and forms: Sanity (planned). Blog posts will come from Sanity and be added to the sitemap.
- Preview hosting: GitHub Pages, next to the design system. `npm run deploy` in `website/` builds with `BASE_PATH=/Neufin/website` and publishes `out/` to the `website/` folder of the `gh-pages` branch. Live at https://nimkarkedar.github.io/Neufin/website/. Local dev: `npm run dev`, http://localhost:3000.
- Search engines are blocked (robots.txt disallow + noindex) until the site is built with `SITE_LIVE=true` at launch.

## Layout

- Grid from Figma: 12 columns of 88px with 20px gutters, 1276px content, centred. 4 columns on phones, 8 on tablets.
- `.container` gives the centred width and side margins (20 / 32 / 40px). `.grid` gives the column grid.
- Heading sizes step down on phones (set in `src/lib/tokens.ts`); the design system sizes apply from 1024px.

## Built so far

- **Header** (`src/components/SiteHeader.tsx`): sticky. Desktop shows the links inline. Solutions, Products, Resources and About open a flyout: icon tile, title, one-line description, and a link to the overview page. Flyouts open on hover (after a 120ms rest, close 250ms after leaving, mouse only) and on click or keyboard. Phones and tablets get a menu button that opens a full-screen panel, where those four expand in place.
- **Footer** (`src/components/SiteFooter.tsx`): first a contact card on white (`FooterContact.tsx`): one card, three blocks with Grey 200 dividers, on one very soft gradient across the whole card (the Dawn gradient under a 60% white wash). On hover a block brightens slightly with a fine white inner line; nothing moves. Only the WhatsApp button is solid; Request a call back is outlined. Blocks: (1) "Send us your latest power bill. We'll show you where the money is going." with Send your bill on WhatsApp; (2) "Speak to a Neufin specialist" with faces and Request a call back, which opens a +91 field and Call me back in place (checked by `src/lib/phone.ts`, sent to `NEXT_PUBLIC_CALLBACK_URL`; unset in the preview, so the form says call-backs aren't connected yet); (3) Contact us with email and phone. Below it, the Near Black area whose top edge steps down at the top right along the Stripe's edge (`stripeEdgeClipPath`; the step starts at column 11 on desktop and the diagonal ends at the content's right edge). Inside: white logo, five link groups on every second column (Solutions, Products, Resources, Company, Social), and a Grey 900 bottom bar with Privacy policy, Terms of use and ©. No animation.
- **Home page**: empty, waiting for the hero design from Kedar.

## Open items

- Real solution and product names and descriptions for the flyouts (placeholders in `site.ts`).
- Email, phone, WhatsApp number and the LinkedIn, Instagram and X links in `site.ts` are dummies. Also confirm the registered company name and address.
- Team photos for the footer card. The four in `src/assets/placeholder-faces/` are free Unsplash photos used as placeholders; replace them and delete that folder.
- Real Streamline Duotone icons to replace the placeholder icons in `designsystem/src/brand/icons.js`.
- Call-backs aren't connected. `src/lib/callback.ts` has the checking code and a ready-to-paste endpoint; connect it to the forms backend (Sanity or a CRM) before launch.
- Pages linked from the nav don't exist yet.
- Buttons are defined here (`.btn` in `globals.css`). Add them to the design system once settled.

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
- 2026-10-14: Preview moved from Vercel to GitHub Pages (Kedar: one place next to the design system; hand the repo to Neufin's engineer). Static export; the call-back endpoint became `src/lib/callback.ts` for the engineer to connect.
