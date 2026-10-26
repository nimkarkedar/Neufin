const { chromium } = require("playwright-core");
(async () => {
  const [url, sel, out] = process.argv.slice(2);
  const b = await chromium.launch({ executablePath: "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(url, { waitUntil: "load" });
  const el = p.locator(sel).first();
  await el.scrollIntoViewIfNeeded(); await el.hover(); await p.waitForTimeout(1200);
  await el.screenshot({ path: out });
  await b.close();
})();
