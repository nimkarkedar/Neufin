---
name: neufin-push
description: Pre-commit pass for Neufin, run every time before committing or pushing to git (and before "push" = commit, push, deploy both previews). Removes unused code, design and files; snaps everything to the design system and its tokens with no duplicates; checks spacing, alignment and type consistency; runs a WCAG 2.1 AA audit; records decisions in the right MD files; then stamps the changes so the commit hook lets them through. Use whenever Kedar says push, commit, or "push to git".
---

# Neufin push: clean, consistent, accessible, documented

Kedar's rule (2026-10-27): no commit goes in without this pass. A hook (`.claude/settings.json` → `tools/checks/commit-gate.mjs`) blocks `git commit` until step 7 has stamped the current changes; any edit after the stamp means running the pass again (steps 1–6 on what changed, then stamp).

Work on **what changed in this session first** (`git status`, `git diff HEAD --stat`), then anything the audit finds elsewhere. Fix what you can; anything that needs Kedar's call goes in the report, not a silent change. Read every candidate before deleting it: the audit finds candidates, it doesn't decide.

Run the scripts from the repo root, with the website dev server on (`cd website && npm run dev`):

```bash
node tools/checks/audit.mjs          # unused code and files, hand-set values, type/colour/spacing inventories, TODOs
node tools/checks/a11y.mjs           # axe-core WCAG 2.1 AA on every page at 390 and 1440 (needs the dev server)
```

(First time on a machine: `cd tools/checks && npm install`.)

## 1. Remove what nothing uses

- **Code:** unused components, exports, props, options and branches; CSS classes nothing reads (audit: "CSS module classes nothing uses", "Exports nothing else imports"); commented-out code and `console.log`; options added for a trial that was rejected. An export used only inside its own file: drop the `export`.
- **Design:** tokens, classes and components in `designsystem/` that neither site uses. Remove them, or keep them documented as unused only if Kedar decided so (the docs say which: e.g. `.chips`, `.step-slider`, `.option-tiles`).
- **Files:** images, illustrations and assets nothing references (audit: "Image and asset files nothing references"); icons in `icon-list.json` nothing uses (remove, then `npm run icons` in `designsystem/`); scratch files, old variants, duplicated photos. Inspiration images on the Illustration page are referenced by number, so check before deleting them.
- Keep TODO pockets: they are placeholders waiting for Neufin or Kedar, not dead code.

## 2. Everything from the design system, nothing duplicated

- **Tokens only.** No hex, rgb, font family, font size, line height, letter spacing, radius, shadow or duration hand-set in `website/` (audit: "Hand-set values", must fix). Images are the only exception. A value the tokens lack goes into `designsystem/src/brand/tokens.js` first.
- **Distinctly new → design system.** Anything made in this session that is a genuinely new pattern (used, or likely to be used, in more than one place) moves into the design system: a class in `designsystem/src/styles/ui.css` or a component in `designsystem/src/components/`, documented on its page (Web components, Colour, Iconography, Illustration…), then used from there.
- **Slightly different → snap.** If something is a near-copy of an existing atom, molecule or organism (a card, tag, button, section head, list row, avatar, band), don't keep a variant: change it to use the existing piece, or, if the new version is the better one Kedar approved, update the existing piece and move every use to it. Two things that look nearly the same is the bug.
- **Shared website blocks first** (`website/src/components/sections/`: Section, StripeHeader, Cards, Blocks, FaqSection, PlanFinder, LogoBar; the footer contact card): a page-only copy of one of these goes.
- Compare page CSS modules with each other for the same rule written twice (same title style, same paragraph style, same grid): move it to the shared component or the design system.

## 3. Spacing, alignment and breathing room

Check at 390 and 1440 (`tools/screenshots`, see its README) and with the audit's spacing inventory:

- Section padding is `--section-space` (sections 160px apart on desktop); section title to content 20px desktop / 16px phones; card padding 24×20 / 32 / 40px; lines inside cards run edge to edge.
- Spacing sits on the 4px grid: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80 (audit: "Spacing values off the 4px grid"). 1–3px hairlines and optical nudges are fine; anything else off-grid gets snapped unless it was a deliberate, logged decision (e.g. the step tag's 10px).
- Left edges line up on the 12-column grid; titles on one line across the content on desktop; text in the same role sits the same distance from what's around it on every page.
- Measure gaps when in doubt (bounding boxes in the browser), don't eyeball. Compare each changed section with its neighbours and with the same block on other pages.

## 4. Accessibility: WCAG 2.1 AA

- Run `node tools/checks/a11y.mjs`. Fix every real serious or critical issue. Known axe misreads, to confirm by screenshot rather than "fix": the footer's link text (its Near Black background is a clipped shape axe can't see) and the chosen segmented option (White text on the moving thumb).
- Text on photos and gradients axe can't judge: measure with `tools/screenshots/measure.py` (White text 4.5:1 for body, 3:1 for large text: 24px, or 18.7px bold). Pick another photo or crop rather than darken a wash.
- Also check by hand on what changed: one `h1` per page and headings in order; images have `alt` (decorative ones `alt=""` / `aria-hidden`); every control works by keyboard with a visible focus; labels on fields; motion stops with reduced motion; tap targets at least 48px; nothing scrolls sideways at 390.
- Known open gap (logged, Kedar accepted): field borders (Grey 200) are 1.3:1. Coral cards with White 16px lines are 3.05:1; report if new ones appear.

## 5. Fewer type styles, colours and weights

- Read the audit's inventories (font sizes, weights, families, text colours). Every font size is a type scale token; every text colour is a role (`--ink`, `--ink-2`, or White / Warm White on dark bands), not a raw palette colour picked per element.
- Each new style must earn its place: if a new size, weight or colour appears once or twice (the audit shows where), snap it to an existing one. Body text: regular, semibold for emphasis. Titles: the scale's weights. No coloured words or figures.
- Prefer removing a variation over adding a token. If two near-identical styles exist (e.g. two "H3-size paragraph" rules), make them one shared style.

## 6. Document the decisions

- `website/CLAUDE.md`: Decisions log (dated, what and why, Kedar's words where he gave them) and Built so far if a block changed; Open items when something waits on Neufin.
- `STATUS.md`: the page's state and open questions.
- `designsystem/CLAUDE.md` and the design system's own pages for anything added to or removed from the design system.
- `WORKING-WITH-KEDAR.md` only for a new standing rule or preference.
- Commit messages split like the history: "Design system: …" and "Website: …".

## 7. Build, stamp, commit

```bash
cd website && npx tsc --noEmit && npx eslint src && npx next build
cd ../designsystem && npx vite build
cd .. && node tools/checks/commit-gate.mjs --stamp
```

Then commit (split as above). For "push": push to `main`, `npm run deploy` in `website/` and `designsystem/`, and check the live pages.

## Report to Kedar

Short and plain: what was removed, what moved into or snapped to the design system, spacing and accessibility fixes, what's left for him (with screenshots' full paths), and the commits.
