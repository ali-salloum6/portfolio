// Renders the portfolio case diagrams: SVG (kit.js + specs.js) → 2x screenshot → WebP in public/images.
// Usage: node scripts/case-diagrams/render-all.cjs [name ...]   (names are the keys of window.SPECS in specs.js)
// Playwright isn't a dependency of this repo; point PLAYWRIGHT_PATH at any installed copy.
const path = require("path");
const fs = require("fs");
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "/Users/ali/dev/life/future-country-plans/job-search/career-ops/node_modules/playwright");
const sharp = require(path.join(__dirname, "../../node_modules/sharp"));
const dir = __dirname;
const out = process.env.OUT_DIR || path.join(dir, "../../public/images");
const previews = path.join(dir, "previews");
fs.mkdirSync(previews, { recursive: true });
(async () => {
  const specsSrc = fs.readFileSync(path.join(dir, "specs.js"), "utf8");
  const all = [...specsSrc.matchAll(/^\s{2}"?([a-z0-9-]+)"?:\s*\{\s*file:/gm)].map((m) => m[1]);
  const names = process.argv.slice(2).length ? process.argv.slice(2) : all;
  const browser = await chromium.launch();
  for (const name of names) {
    const page = await (await browser.newContext({ deviceScaleFactor: 2, viewport: { width: 1700, height: 1400 } })).newPage();
    await page.goto("file://" + path.join(dir, "page.html") + "?d=" + name, { waitUntil: "networkidle" });
    await page.waitForFunction(() => document.title.startsWith("ready:"));
    await page.evaluate(() => document.fonts.ready);
    const meta = await page.evaluate((n) => ({ file: window.SPECS[n].file, w: window.SPECS[n].opts?.width || 1600, h: window.SPECS[n].opts?.height || 900, outW: window.SPECS[n].outW }), name);
    const png = await page.locator("#art").screenshot({ type: "png", scale: "device" });
    const outW = meta.outW || (meta.w === 1600 ? 1920 : Math.round(meta.w * 0.77));
    const outH = Math.round((outW * meta.h) / meta.w);
    await sharp(png).resize(outW, outH).webp({ quality: 84, effort: 6 }).toFile(path.join(out, meta.file));
    await sharp(png).resize(Math.round(meta.w * 0.6), Math.round(meta.h * 0.6)).png().toFile(path.join(previews, `preview-${name}.png`));
    console.log(`${name} -> ${path.relative(process.cwd(), path.join(out, meta.file))} ${outW}x${outH}`);
    await page.close();
  }
  await browser.close();
})();
