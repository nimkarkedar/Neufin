---
name: neufin-ui
description: Checklist to run before building or changing anything visual for Neufin — a website section, component, control, icon, colour, shadow or layout on neufin.energy (website/) or in the design system (designsystem/). Use whenever a task touches UI, even a small tweak.
---

# Neufin UI checklist

Kedar's standing rules. Run through all of them before writing UI code, and again before showing the result.

## 0. Ground every answer in the sources. Don't bluff.

Kedar caught a confident answer that skipped part of the story: "How we keep your price low" was built with three cards, and buying in bulk, the main lever, was left out. Before you build, answer, count or recommend anything about Neufin, read the sources. Never answer from memory or from the page you happen to be looking at.

1. **Goal and objective.** The site sells clean, cheaper power to Indian businesses (C&I buyers) and earns trust: what Neufin is, proof at scale, try your own price, how it's done, who it's for, the product, then questions. Every section has to serve that story, in that order.
2. **The brief.** The "Neufin website structure" Google Doc (docs.google.com/document/d/1mLphIMEQlN_s88qfLivp_tzssxTZOliUTyKe8GRTWBs) is the source of truth for content: sitemap, menu, solutions, page sections and copy. `website/src/lib/site.ts` and `content.ts` mirror it. Check both before saying how many of anything there are.
3. **Tone of voice.** `designsystem/src/pages/ToneOfVoice.jsx`: plain, factual, numbers over adjectives, no slogans or "X. Y." headlines, sentence case.
4. **Design system.** Tokens, classes and components (section 2 below) and its pages (Colour, Typography, Iconography, Photography, Illustration, Graphic device, Web components).
5. **Decisions already made.** `website/CLAUDE.md` (rules, Built so far, Decisions log).

Then check that the answer holds together as one brand: the same story, voice, shapes and colours from section to section and page to page. If a source is missing or unclear, or two of them disagree, say so and ask. Don't fill the gap with a confident guess. When you count or list things ("three ways", "four solutions"), name the source you counted from.

## 1. Icons are Nucleo, every time

Neufin owns the full Nucleo licence: every family except Pixel, Isometric and Arcade.

- Find icons with the `nucleo-icons` skill or the local catalogue in `~/.nucleo/skills/<family>/icons.json`. Never hand-draw an SVG icon, use emoji, or use another icon set.
- Pick the family by job, as on the design system's Iconography page:
  - Core outline 24px is the default for marketing pages and menu tiles.
  - UI outline or outline-duo 18px is for product-style UI: fields, buttons, tables.
  - Keep one family per set, so a row or a menu never mixes styles.
- To add one: put it in `designsystem/src/brand/icon-list.json`, run `npm run icons` in `designsystem/`, then use `<Icon>` or `<IconSvg icon={icons[name]}>`.
- Every icon on the website is one colour: the text colour (Near Black, Warm White on the dark band). Never Electric Violet, never two-tone (no outline-duo, no second tone). Never hex.
- If you find a hand-drawn icon in the code, flag it and offer to swap it for Nucleo.

## 2. The design system first: contest hard before adding anything

Before writing CSS or a component, list what already exists and use it:

- **Tokens** (`designsystem/src/brand/tokens.js`): colours, gradients, type scale, layout, breakpoints, radii, shadows (`raised`, `overlay`), `scrim`, motion.
- **Classes** (`designsystem/src/styles/ui.css`):
  - Buttons: `.btn` with `-primary`, `-secondary` or `-accent` (accent once per page), plus `.btn-badge`.
  - Fields: `.text-field`, `.action-field` (select or input), `.select-field` (with `.select-field-icon`).
  - Choice controls: `.chips`/`.chip`, `.step-slider`, `.option-tiles`. On a dark panel add `.step-slider-inverse` / `.option-tiles-inverse`, and set the panel's own shades with `--on-dark-surface`, `--on-dark-line`, `--on-dark-muted` (greys by default).
  - Blocks: `.surface`, the one style for every large content block.
- **Components** (`designsystem/src/components/`): `Logo`, `Icon`/`IconSvg`, `Stripe` (`stripeEdgeClipPath`, `markBand`, `STRIPE_SLOPE`), `Stamp` and `RingStamp` (round text stamp, e.g. the CERC and transparent pricing stamps), `RollingFigure` (figures that roll when they change), `WhatsAppBadge`, `PhotoFilters`.

Only when nothing fits:

1. Write down why the existing piece can't do the job. Prefer a variant or an option on it over a new piece.
2. If it's really needed, add it to the design system: a token in `tokens.js`, a class in `ui.css` or a component in `components/`.
3. Document it on its design system page (Web components, Colour, Iconography…).
4. Only then use it in the website.

Never hard-code a hex value, `rgb()`, font, type size, radius, shadow or duration in `website/`.

## 3. Page-level checks (from Kedar's reviews)

- **References:** the client likes https://ramp.com/ and https://reel.energy/. They are light, calm and product-like. Check each section against them.
- **Height:** a simple section fits one screen at 1440 × 900, heading included.
- **Shape:** one shape language. Fields and buttons are pills, tiles use soft radii, nothing sharp mixed in.
- **Colour:** judge it against the whole page, not the section. Don't let violet take over. The home page's one coloured band is the plan finder (Electric Violet, White box inside); don't add dark or coloured panels elsewhere unless Kedar asks.
- **Large blocks** all use `.surface`, so they sit at the same height.
- **Section titles:** always the H2 token (36px / 800 on desktop, 28px / 800 on phones), on one line across the full width of the card below it on desktop (Kedar, 2026-10-24), left-aligned, 20px above the card (16px on phones). A link beside a title sits at the right end of the row. The exception is the home FAQ, which keeps two columns (title on 1–4, wrapping; questions on 6–12). Check each section still fits 1280 × 800 below the header. Never set a title size by hand.
- **Cards:** every card is radius L (16px) with the raised shadow (`.surface`, `.image-card`). An image or panel inset inside a padded card takes radius L minus the padding (8px inset → radius S). A card that is itself a link responds without moving: its shadow deepens to the overlay shadow and its picture eases in by 4% (`.image-card`).
- **No card motion:** cards and boxes stay still. No tilt, hover lift, or fade or rise in on scroll or load (Kedar finds it irritating). A soft colour change, a deeper shadow or a picture easing in inside the card on hover is fine. Meaningful motion, like the current along the hero's wires, is the exception; ask before adding any.
- **Consistency with neighbours:** before showing, put the section next to the ones above and below it and compare: title size (always H2), title-to-block gap, section padding, card padding, and lines inside cards (edge to edge, never inset in one card and full in another).
- **Stripes:** at most two per layout. On the home page the hero panel's top edge and the footer edge already use them.
- **Copy:** plain words with no industry terms in nav, flyouts or footer, and headlines as plain sentences, never "X. Y." slogans.
- **No uppercase labels:** no small spaced-out capitals or "eyebrow" captions over headings, anywhere. Labels are sentence case.
- **Mocks:** build Kedar's mock as drawn and raise concerns as questions.
- **Before showing:** screenshot at 390px and 1440px.

Record any new decision in `website/CLAUDE.md` (Built so far and the Decisions log).
