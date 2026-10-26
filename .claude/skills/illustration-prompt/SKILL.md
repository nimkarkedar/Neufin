---
name: illustration-prompt
description: Write a ChatGPT image prompt for a Neufin illustration from a concept, what it shows (object, icon or scene), a format and a colour scheme. Use when the user asks for an illustration prompt, a graphic prompt, or runs /illustration-prompt.
---

# Neufin illustration prompt

Produces one prompt to paste into ChatGPT together with the Neufin reference images.

## Source

All wording comes from `designsystem/src/illustration/prompt-template.md`. Read it fresh every time. Do not use wording from memory. The Illustration page on the design system site builds its prompts from the same file, so edits there change both.

## Inputs

Ask only for what is missing:

1. **Concept**: the story or message the visual should carry.
2. **What it shows**: one of the template's `## KIND:` blocks (Stand-alone object, Icon-like symbol, Scene). If the user doesn't say, pick the one the concept points to and name it in the line above the prompt: a thing ("a meter that…") is an object, an idea or action ("ownership", "growth") is a symbol, a place ("a plant that…") is a scene. Never default to a scene.
3. **What to create**: one of the template's `## FORMAT:` blocks (Social media post, Square graphic, Circle graphic, Full page graphic).
4. **Colour scheme**: one of the template's `## COLOURS:` blocks (White, Warm White, Violet 100, Electric Violet, Violet 900, Near Black, Signal Yellow, Electric Coral, Energy Mint, Clear Blue, or the Violet, Dawn and Daylight gradients).

If the user gives the concept, format and colour scheme in one message, do not ask anything.

## Steps

1. Read the template.
2. Assemble, in order: the `MASTER` block, the chosen `KIND` block, the chosen `FORMAT` block, the chosen `COLOURS` block, then the `CONCEPT` block. Drop the `Label:` and `Swatch:` lines.
3. Replace `{{concept}}` with a sharpened version of the user's concept. The user's description is the brief; the reference images are not:
   - Keep to the subject the user described, in their terms. Add nothing they did not ask for or clearly need. Never bring in towers, pylons, factories, warehouses, roads, flyovers or skylines because the references show them.
   - State the one message in a sentence, then name the hero subject, then say how the Neufin bands tell the message (straight runs that step at 32° with crisp corners: converging, stepping down, rising, breaking, steady), or how a few bands build the object or symbol itself.
   - For an object or symbol, describe its shape simply and say it stands alone on the plain background. For a scene, give the viewpoint (low, cropped by the edge) and only the places the user named.
   - Never include people. If the concept mentions a person, show their place, work or object instead (for example a plant head becomes the plant).
   - Two to four sentences. No adjectives that do not change the picture.
4. Output the full prompt in one fenced code block, with nothing before it except one line naming the format and colour scheme.
5. After the block, one line: attach 3–5 images from `designsystem/public/assets/illustrations/inspiration/` (or Download all on the Illustration page) in ChatGPT before sending. The images set the style; the prompt sets the subject.

## Changing the prompt

When the user wants the prompt to behave differently every time (for example "never add people" or "make bands thicker"), edit `prompt-template.md`, not this skill. Show them the changed lines. Change this skill only for how the concept is rewritten or how inputs are asked.
