# Screenshots and contrast checks

How every Neufin UI change is checked before it is shown to Kedar: screenshots at 390 (phone) and 1440 (laptop), plus 1280 and 1024 when a layout changes there, and a contrast measure for any text on a photo.

Uses `playwright-core` driving the Brave browser already on the Mac (headless Chrome is not installed; headless Brave works through Playwright). Needs `python3` with Pillow for `measure.py`.

```bash
cd tools/screenshots
npm install                      # once
# the website dev server must be running: cd website && npm run dev
```

| Script | What it does |
| --- | --- |
| `node shoot.js <url> <prefix> 390x844 1440x900` | One screenshot of the first screen per size, saved as `<prefix>-<width>.png` |
| `node full.js <url> <prefix> 1440x900` | Full-page screenshot, and prints each section's height and any sideways overflow (should be 0) |
| `node section.js <url> '<selector>' <prefix> 1440x900` | Screenshot of one element, e.g. `'#hiring'` |
| `node hover.js <url> '<selector>' <file.png>` | Screenshot of an element while the pointer is over it (hover states) |
| `python3 measure.py <file.png> x0 y0 x1 y1` | Contrast of White text against the photo behind it in that box: worst, 95th percentile, median. Aim for 4.5:1 or better at the 95th percentile. It counts the soft edges of letters, so the true figure is a little higher. |

Notes:
- Full-page shots sometimes show a grey veil over the top part: a capture artefact, not on the page.
- Save shots outside the repo (a scratch folder) so they aren't committed.
- On macOS, `sips --cropOffset 0 0` is ignored (it crops from the centre); use `1 1`. BSD `sed` has no `\|`; use Python for multi-pattern edits.
