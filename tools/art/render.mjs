/**
 * Previews PNG 1600×1200 de assets/art/*.svg mediante Edge headless (file://).
 * Uso: node tools/art/render.mjs
 * Salida: docs/runs/2026-11-22-landing-guardian-ia/capturas/arte/
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve(import.meta.dirname, '..', '..');
const RUN = path.join(ROOT, 'docs', 'runs', '2026-11-22-landing-guardian-ia', 'capturas', 'arte');
const SHOTS = path.join(ROOT, 'tools', 'art', 'shots');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
fs.mkdirSync(RUN, { recursive: true });
fs.mkdirSync(SHOTS, { recursive: true });

const files = ['panel', 'alerts', 'pairing', 'agent', 'signals', 'privacy'];
const url = (f) => pathToFileURL(path.join(ROOT, 'assets', 'art', `${f}.svg`)).href;

const page = (body, w, h) => `<!doctype html><meta charset="utf-8">
<style>html,body{margin:0;background:#081B17;overflow:hidden}img{display:block;width:${w}px;height:${h}px}</style>
${body}`;
const shoot = (html, w, h, out) => {
  const tmp = path.join(SHOTS, `_${path.basename(out, '.png')}.html`);
  fs.writeFileSync(tmp, html, 'utf8');
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-proxy-server',
    '--allow-file-access-from-files',
    '--no-first-run',
    '--disable-extensions',
    '--force-device-scale-factor=1',
    '--virtual-time-budget=1500',
    `--window-size=${w},${h}`,
    `--screenshot=${out}`,
    pathToFileURL(tmp).href,
  ];
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      execFileSync(EDGE, args, { stdio: 'ignore', timeout: 30000 });
      if (fs.existsSync(out) && fs.statSync(out).size > 10000) return;
    } catch (e) {
      if (attempt === 3) throw e;
    }
  }
};

for (const f of files) {
  const out = path.join(RUN, `${f}.png`);
  shoot(page(`<img src="${url(f)}" alt="">`, 1600, 1200), 1600, 1200, out);
  console.log(f.padEnd(9), `${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
}

// la hoja de contacto se compone aparte (PIL) para evitar el escalado de Edge en ventanas grandes
