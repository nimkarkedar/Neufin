# Working with Kedar

Standing rules and preferences, gathered from his reviews. Most are also in `website/CLAUDE.md` (Rules, Decisions log) and the `neufin-ui` skill; this is the short version, plus how he likes to work.

## How he works

- He sends page briefs as screenshots of the brief's tables, mocks, and reference sites. Build mocks as drawn; raise concerns separately, as questions.
- References (Ramp, Reel, Companion, Apple) are for ideas only. "Don't follow it blindly. Use your judgement, the design system and the other pages."
- He wants pages "slick, cool, modern", "clean as we have been so far", with "the same finish and love" as the home page and Careers. Not "the first obvious option".
- Leave clear pockets where you need his input (placeholders marked TODO) and list them at the end.
- He decides; give a recommendation, not a survey. When he asks "what does this mean / just tell, don't make", answer only.
- Before every commit, run the `neufin-push` skill: remove what's unused, snap everything to the design system, check spacing, accessibility and type variations, document decisions (Kedar, 2026-10-27).
- He asks before anything goes to git. "Push" means commit, push and deploy both previews, then check the live page.
- When he says "keep it on local", don't commit or deploy.

## Design rules (non-negotiable)

- **Design system first.** Every value comes from `designsystem` tokens: no hex, rgb, font, size, radius, shadow or duration hand-set in `website/`. Anything new goes into the design system and its docs first.
- **Reuse before building.** Before building a section from a brief row, check the home page and the shared blocks (footer contact card, numbers block, plan finder, FAQ, solution cards, industries block, shared photo and art cards). Reuse and flag what the brief wants that the block lacks. He caught a custom About close that duplicated the footer contact card: "Why did you create something new?"
- **One family per page.** Few card types, one section head (H2 on one line, the line under it on the left, never hanging in the right pocket), limited backgrounds (Warm White page, at most one Violet 900 band, White for contrast). Nine sections that each look different is "random and non-cohesive".
- **No coloured emphasis.** Never colour some words of a sentence or a big figure (e.g. one phrase or "225 GW" in violet). "Old school. Kids do it." Emphasis comes from size, weight and space.
- **Icons:** Nucleo only, one colour (the text colour). Never hand-drawn SVGs or emoji. Kedar now prefers his own spot illustrations over icons in cards.
- **No card motion:** no hover lift, tilt, fade or rise on scroll. A soft colour change or a deeper shadow is fine. Meaningful motion (the current along the hero wires) is the exception.
- **Stripes:** the graphic device (bands that step at 32° with crisp corners), at most two per layout.
- **Sentence case everywhere.** No uppercase eyebrow labels. No "01 / 02" step numbers.
- **Copy:** plain, factual, numbers over adjectives, per the Tone of voice page. No two-beat slogans ("X. Y."); where the brief insists on one, keep it and say so.
- **Folds:** a simple section fits one laptop screen (1440 × 900, ideally 1280 × 800). Use sideways rows (`ScrollRow`) when cards don't fit.
- **Mobile first.** Check 390 and 1440 before showing.
- **Text on photos:** only on dark photos, White text 4.5:1 or better (measure it). Pick another photo rather than darkening the wash.
- **Accessibility:** WCAG AA, keyboard and screen reader support, reduced motion respected.

## Things he has rejected (don't bring back)

Gradient shades that read left-to-right, oversized headers, staged stock photos, coloured words or figures, 01/02 numbering, thin climbing lines, uppercase eyebrows, two-line forced section titles, outlined chips (replaced by the segmented control), a drawn laptop or product mock that looks comical, the red edge on rounded rows ("ugly"), a stat without context ("225 GW … what does it even mean?").

## Illustrations

- Generated in ChatGPT from the design system's Illustration page (or the `illustration-prompt` skill), with 3–5 Inspiration images attached for style.
- The concept leads; the references set style only. Bands step at 32° with crisp corners.
- Round spot illustrations go in White art cards; full-card illustrations (4:5) go in image cards with the text at the top.
- He supplies finished images; save them in `designsystem/public/assets/illustrations/`, list them on the Illustration page, and match the background to the exact token.

## Writing for him

Plain English, short, no jargon. Say what changed, what you checked, and what you need from him. Name screenshot files with their full path.
