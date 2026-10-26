# Pre-push checks

Used by the `neufin-push` skill (`.claude/skills/neufin-push/SKILL.md`) before every commit.

- `audit.mjs`: unused CSS classes, exports, files and icons; values hand-set instead of tokens (must fix); type, colour and spacing inventories; TODO pockets. `node tools/checks/audit.mjs`
- `a11y.mjs`: axe-core WCAG 2.1 AA on every website page at 390 and 1440, in Brave. Needs the dev server. `node tools/checks/a11y.mjs [baseUrl]`
- `commit-gate.mjs`: `--stamp` records the checked changes; as the PreToolUse hook in `.claude/settings.json` it blocks a commit while any changed file differs from the stamp.

Setup: `cd tools/checks && npm install` (axe-core, playwright-core; Brave as in tools/screenshots).
