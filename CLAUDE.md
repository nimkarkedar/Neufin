# Neufin: project guide for Claude

Neufin Energy is an Indian company that helps businesses (commercial and industrial buyers) buy cleaner, cheaper power and run it well: energy plans from solar, wind, battery and the power exchange, Lumen (its software), renewable energy advisory, and metering and approval services. It holds a CERC inter-state power trading licence. Offices: Bengaluru (team), Mumbai (registered office card on Contact).

Kedar Nimkar (Patterns) is the designer and owns this repo. The client team at Neufin includes the co-founders Rushil Noronha and Rahool Gadkari. Kedar reviews every change visually and is exacting about consistency.

This folder holds everything for the brand and the website. Read this file, then the file for the part you are working on:

| Part | Folder | Read first |
| --- | --- | --- |
| How to work with Kedar (rules, taste, past corrections) | here | [WORKING-WITH-KEDAR.md](WORKING-WITH-KEDAR.md) |
| Where every page stands, open questions, what's next | here | [STATUS.md](STATUS.md) |
| Design system (brand, tokens, components, docs site) | `designsystem/` | [designsystem/CLAUDE.md](designsystem/CLAUDE.md), [designsystem/README.md](designsystem/README.md) |
| Website (neufin.energy, Next.js) | `website/` | [website/CLAUDE.md](website/CLAUDE.md): rules, stack, Built so far, and the full Decisions log |
| UI checklist skill (run before any UI task) | `.claude/skills/neufin-ui/` | [SKILL.md](.claude/skills/neufin-ui/SKILL.md) |
| Illustration prompt skill | `.claude/skills/illustration-prompt/` | [SKILL.md](.claude/skills/illustration-prompt/SKILL.md) |
| Screenshot and contrast tools | `tools/screenshots/` | [README.md](tools/screenshots/README.md) |
| Client logos (source SVGs) | `Logos/` | processed by `website/scripts/mono-logos.mjs` |

@WORKING-WITH-KEDAR.md
@STATUS.md

## Sources of truth, in order

1. **The brief**: the "Neufin website structure" Google Doc (docs.google.com/document/d/1mLphIMEQlN_s88qfLivp_tzssxTZOliUTyKe8GRTWBs): sitemap, menu, page sections, draft copy. Kedar also pastes its page tables as screenshots; strike-throughs in them are his edits, so use the replacement text.
2. **The design system** (`designsystem/`): tokens, classes, components and its doc pages (Colour, Typography, Iconography, Photography, Illustration, Graphic device, Tone of voice, Web components).
3. **Decisions already made**: `website/CLAUDE.md` (Rules, Built so far, Decisions log). Read it before changing anything; add to it after.
4. **Client references**: ramp.com and reel.energy (light, calm, product-like). References are for ideas, never to copy (Kedar).

If two sources disagree or one is missing, say so and ask. Don't fill gaps with confident guesses.

## Run, check, publish

```bash
cd designsystem && npm install && npm run dev   # http://localhost:5173
cd website && npm install && npm run dev        # http://localhost:3000 (reads ../designsystem directly)
```

- Check before showing: `cd website && npx tsc --noEmit && npx eslint src`, then screenshots at 390 and 1440 (tools/screenshots). Before pushing, `npx next build` in `website/` and `npx vite build` in `designsystem/`.
- Git: one repo, github.com/nimkarkedar/Neufin, branch `main`. Kedar asks before anything is pushed. Commits are split like the history: "Design system: …" and "Website: …".
- Previews (GitHub Pages, `gh-pages` branch): `npm run deploy` inside `website/` and inside `designsystem/`. Pushing to git does not update the previews; when Kedar says "push", also deploy both, then check the live page (it takes a minute or two).
  - Website: https://nimkarkedar.github.io/Neufin/website/ (hidden from search engines until launch)
  - Design system: https://nimkarkedar.github.io/Neufin/designsystem/
- Keep local when Kedar says "keep it on local": no commit, no push, no deploy.

## Machine setup the new account needs

- **Nucleo icons**: licensed full set (every family except Pixel, Isometric, Arcade), installed at `~/.nucleo` on Kedar's Mac. The `nucleo-icons` MCP server and skills (`nucleo-icons`, `nucleo-customize`) were set up in the personal Claude account; set them up again (`npx @nucleoicons/skills setup --target vanilla --tools claude`). Without them, pick icons from `~/.nucleo/skills/<family>/icons.json`.
- **Screenshots**: Brave browser plus `npm install` in `tools/screenshots/`; Pillow for `python3` (`pip3 install Pillow`; numpy is not installed).
- **Photos**: Unsplash search is bot-blocked. Find a photo page with web search, read the page for the `images.unsplash.com` URL and licence (Unsplash License only, never Unsplash+), download with curl, and log the photographer and photo ID in `designsystem/src/components/PhotoPost.jsx`.
- `.claude/settings.local.json` is personal and not in git; the two skills in `.claude/skills/` are.
