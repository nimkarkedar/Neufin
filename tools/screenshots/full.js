const { chromium } = require("playwright-core");
(async () => {
  const [url, out, ...sizes] = process.argv.slice(2);
  const b = await chromium.launch({ executablePath: "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser", headless: true });
  for (const s of sizes) {
    const [w, h] = s.split("x").map(Number);
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto(url, { waitUntil: "load" });
    await p.waitForTimeout(1200);
    await p.screenshot({ path: `${out}-${w}-full.png`, fullPage: true });
    const folds = await p.evaluate(() => [...document.querySelectorAll("main > section, main section[id]")].map((s) => `${s.id || s.getAttribute("aria-label") || s.className.slice(0, 20)}:${Math.round(s.getBoundingClientRect().height)}`));
    console.log(w, folds.join("  "));
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    console.log(w, "page overflow-x:", overflow);
    await p.close();
  }
  await b.close();
})();
