const { chromium } = require("playwright-core");
(async () => {
  const [url, sel, out, ...sizes] = process.argv.slice(2);
  const b = await chromium.launch({ executablePath: "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser", headless: true });
  for (const s of sizes) {
    const [w, h] = s.split("x").map(Number);
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto(url, { waitUntil: "load" }); await p.waitForTimeout(800);
    await (await p.$(sel)).screenshot({ path: `${out}-${w}.png` });
    await p.close();
  }
  await b.close();
})();
