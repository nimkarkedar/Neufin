# Neufin design system: notes for Claude

The source of truth for the Neufin brand and every design value the website uses. A Vite + React docs site (`npm run dev`, http://localhost:5173; live at https://nimkarkedar.github.io/Neufin/designsystem/). Folder map and what the website imports: [README.md](README.md). Project guide: [../CLAUDE.md](../CLAUDE.md).

## The rule

Anything the website needs that isn't here gets added here first, documented on its page, then used. Contest hard before adding: prefer a variant or option on what exists. The website must never hand-set a colour, font, size, radius, shadow or duration.

Renaming or removing anything the website imports breaks it: check `cd ../website && npx tsc --noEmit && npx next build` after changes.

## Tokens (`src/brand/tokens.js`)

Applied in the website as CSS variables through `allTokens()` (see `website/src/lib/tokens.ts`).

- **Colour:** `violetScale` (Violet 100–900; Electric Violet #7E22FF is the brand violet, Violet 900 #390080 the dark band), `coreColours` (White, Warm White #F7F5FA page, Near Black #19161F text), `neutrals` (Grey 200 lines, Grey 400/600 secondary text, Grey 800/900; Neutral 100/300 for device chrome), `accentColours` (Signal Yellow #FFC83D, Electric Coral #FF5C45, Energy Mint #00C2A8, Clear Blue), `statusColours` (Error #C2321F), `externalColours` (WhatsApp green, inside the WhatsApp mark only), `gradients` (Violet, Dawn, Daylight).
- **Type:** `fonts` (Archivo for titles, IBM Plex Sans body, IBM Plex Mono numbers via `.num`, Arial fallback), `typeScale` with phone sizes (`mobile`); H2 is 36/800 (28/800 on phones), every section title; Card title 28/800 (24 on phones), every card title.
- **Layout:** `breakpoints` 768 / 1024 / 1280, `layout` (12 columns, 20px gutter, 1276px content, margins 20/32/40, `--section-space` 48/64/80).
- **Shape and depth:** `radii` (S 8, M 12, L 16 for every card, pill), `shadows` (`raised` for cards, `overlay` for menus and card hover), `scrim`.
- **Motion:** `motion` (durations incl. marquee, current, roll, spin; easings). Respect reduced motion.

## Classes (`src/styles/ui.css`, documented on Web components)

Buttons `.btn` + `-primary` (Near Black) / `-secondary` / `-accent` (Electric Violet, once per page) / `.btn-badge`; `.link-arrow`; fields `.text-field`, `.select-field`, `.action-field` (+`-inline`), `.form-field` with `-label` and `-error` and the invalid state; `.surface` (the one large White block: Grey 200 line, radius L, raised shadow); `.pattern-tiles` (a set of ideas as Stripe pattern tiles, `StripePattern`); `.saving-badge`; `.duo-icon-ring`; the global `:focus-visible` ring; `--hover-fill` (Violet 100, every hover fill) and `--grid-lines`; `.statement` + `.statement-line` (one claim in H1 with a Body L line, from the home numbers block) and `.figures` / `.figure` / `-value` / `-label` (the home numbers block's grid of figures, flush in a box); `.card`; `.vertical-card` (the one vertical card, 4:5: `-photo` for a picture filling the card, the default panel for picture-over-White with a flat break; `-media` / `-body` / `-title` / `-text`, title Card title (28/24) and line Body each cut at two lines in a column clear of the arrow; `-go` the round Grey 200 arrow on a clickable card, Electric Violet on hover); `.scroll-row` (sideways rows with snap and prev/next); `.segmented` (+`-small`, `-inverse`), the choice control used everywhere; `.accordion`; `.tag` (+`.tag-dot`); `.avatar` (+`-l`); `.placeholder` (+`-plain` etc.); `.rolling-figure`. Kept documented but unused on the site: `.chips`, `.step-slider`, `.option-tiles`.

## Components (`src/components/`)

`Logo`, `Icon` / `IconSvg` (Nucleo), `DuoIcon` (the website's content icons: hero in a circle or supporting, UI outline-duo, Near Black line, Violet 200 second tone; `.duo-icon*` in ui.css), `StripePattern` (the Stripe as a pattern piece for pattern tiles, `patternCombos`), `Stripe` (`stripeEdgeClipPath`, `STRIPE_SLOPE` = 536/850, about 32°), `Stamp` and `RingStamp`, `RollingFigure`, `Segmented`, `ScrollRow`, `WhatsAppBadge`, `PhotoFilters`, `PhotoPost` (also the photo library list with credits).

## Icons

Nucleo only, listed in `src/brand/icon-list.json`, copied by `npm run icons` (needs Nucleo installed at `~/.nucleo`). Core outline 24px for marketing and documents, UI outline 18px for fields, UI outline-duo (`duo-*`) for the website's content icons through `DuoIcon`. Functional icons one colour, the text colour. Remove an icon from the list when nothing uses it.

## Imagery

- **Photos:** `public/assets/photos/`, each listed in `PhotoPost.jsx` with its source and licence (Kedar's own, or Unsplash License with photographer and ID). Rules on the Photography page: India, real places, no staged stock; text on a photo only on a dark photo, White text 4.5:1 or better.
- **Illustrations:** `public/assets/illustrations/`, shown on the Illustration page: Inspiration (style references for ChatGPT, zip via `npm run references`), Spot illustrations (round, for White art cards: values, hiring, Buy steps), Card illustrations (full 4:5 cards: the four plans). Match the background to the exact token when adding.
- **Illustration prompts:** all wording in `src/illustration/prompt-template.md` (MASTER, KIND: object / icon / scene, FORMAT, COLOURS, CONCEPT), built by `src/illustration/prompt.js` for the Illustration page and read by the `illustration-prompt` skill. Edit the template, not the skill, to change what every prompt says. Lessons: the concept leads and references set style only; never ask ChatGPT for transparency; describe the background positively (negative lists invite the blobs they forbid).

## Other

- Sales deck: `src/presentations/deck.js`, `.pptx` built by `npm run slides`.
- Publish: `npm run deploy` (builds for `/Neufin/designsystem/` and publishes to `gh-pages`).
