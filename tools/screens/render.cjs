const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..', '..');
const PORT = 4192;
const OUT = path.join(ROOT, 'tools', 'screens', 'out');
fs.mkdirSync(OUT, { recursive: true });
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const f = path.join(ROOT, decodeURIComponent(p));
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(f).pipe(res);
});

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const browser = await chromium.launch({ channel: 'msedge' });
  const shots = [
    { file: 'web-pairing.html', out: 'web-pairing.png', width: 1440, height: 1000, dpr: 1 },
    { file: 'web-alerts.html', out: 'web-alerts.png', width: 1440, height: 1411, dpr: 1 },
    { file: 'android-pairing.html', out: 'android-pairing-raw.png', width: 448, height: 997, dpr: 3 },
    { file: 'android-status.html', out: 'android-status.png', width: 480, height: 1040, dpr: 3 }
  ];
  for (const s of shots) {
    const ctx = await browser.newContext({ viewport: { width: s.width, height: s.height }, deviceScaleFactor: s.dpr, locale: 'es-CL' });
    const page = await ctx.newPage();
    await page.goto(`http://localhost:${PORT}/tools/screens/${s.file}`, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT, s.out) });
    const meta = await page.evaluate(() => ({ h: document.documentElement.scrollHeight, w: document.documentElement.scrollWidth }));
    console.log(s.out, meta);
    await ctx.close();
  }
  await browser.close();
  server.close();
})().catch(e => { console.error(e); process.exit(1); });
