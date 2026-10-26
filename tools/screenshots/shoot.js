// Usage: node shoot.js <url> <outPrefix> <width>x<height>... — full-page-top screenshots via Brave.
const { chromium } = require("playwright-core");
(async () => {
  const [url, out, ...sizes] = process.argv.slice(2);
  const browser = await chromium.launch({ executablePath: "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser", headless: true });
  for (const s of sizes) {
    const [w, h] = s.split("x").map(Number);
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${out}-${w}.png` });
    await page.close();
  }
  await browser.close();
})();
