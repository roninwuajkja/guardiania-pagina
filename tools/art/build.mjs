/**
 * Generador del set de ilustraciones «La guardia invisible».
 * Salida: assets/art/*.svg — SVG estáticos, sin texto visible ni fuentes.
 * Uso: node tools/art/build.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..', '..');
const OUT = path.join(ROOT, 'assets', 'art');
fs.mkdirSync(OUT, { recursive: true });

const C = {
  pine950: '#081B17',
  pine900: '#0B241E',
  pine800: '#123029',
  pine700: '#1B4A3E',
  sage500: '#5E8F7B',
  sage300: '#A9C6B8',
  sage100: '#E2ECE5',
  paper: '#EEF2ED',
  amber: '#8D620F',
  amberOnDark: '#E4B968',
  oxblood: '#A33128',
};

const n = (v) => String(Math.round(v * 100) / 100);
const rad = (d) => (d * Math.PI) / 180;
const pt = (cx, cy, r, deg) => [cx + r * Math.cos(rad(deg)), cy + r * Math.sin(rad(deg))];

/** Arco circular: ángulos en grados, 0° = derecha, sentido horario en pantalla. */
function arc(cx, cy, r, a1, a2) {
  const [x1, y1] = pt(cx, cy, r, a1);
  const [x2, y2] = pt(cx, cy, r, a2);
  const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
  return `M${n(x1)} ${n(y1)}A${r} ${r} 0 ${large} 1 ${n(x2)} ${n(y2)}`;
}

/** Candado de la marca: cuerpo, arco de argolla y ojo. Centro = cuerpo. */
function lock(cx, cy, w, opts = {}) {
  const { stroke = C.sage300, body = C.pine900, sOp = '.78' } = opts;
  const h = w * 0.78;
  const x = cx - w / 2;
  const y = cy - h / 2;
  const sh = w * 0.52;
  const sy = y + h * 0.12;
  return `<g>
      <path d="M${n(cx - sh / 2)} ${n(sy)}v${n(-h * 0.4)}a${n(sh / 2)} ${n(sh / 2)} 0 0 1 ${n(sh)} 0V${n(sy)}" fill="none" stroke="${C.paper}" stroke-opacity=".92" stroke-width="2" stroke-linecap="round"/>
      <rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${n(w * 0.16)}" fill="${body}" fill-opacity=".94" stroke="${stroke}" stroke-opacity="${sOp}" stroke-width="1.8"/>
      <rect x="${n(x + 5)}" y="${n(y + 5)}" width="${n(w - 10)}" height="${n(h - 10)}" rx="${n(w * 0.1)}" fill="none" stroke="${C.paper}" stroke-opacity=".1"/>
      <circle cx="${n(cx)}" cy="${n(y + h * 0.34)}" r="${n(w * 0.058)}" fill="${C.paper}" fill-opacity=".95" stroke="none"/>
      <rect x="${n(cx - w * 0.024)}" y="${n(y + h * 0.34 + w * 0.05)}" width="${n(w * 0.048)}" height="${n(h * 0.2)}" rx="${n(w * 0.024)}" fill="${C.paper}" fill-opacity=".85" stroke="none"/>
    </g>`;
}

/** Constelación determinista: puntos, enlaces cortos y tres anclas. */
function starfield(p, seed = 7, opts = {}) {
  const { x = 80, y = 80, w = 1440, h = 1040, cols = 14, rows = 9, skip = 0.44, links = 9, op = 0.16, ds = 1 } = opts;
  let s = (seed * 2654435761) % 4294967296;
  const rnd = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
  const pts = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (rnd() < skip) continue;
      pts.push([
        x + (i + 0.15 + rnd() * 0.7) * (w / cols),
        y + (j + 0.15 + rnd() * 0.7) * (h / rows),
        (1.1 + rnd() * 1.4) * ds,
      ]);
    }
  }
  const seen = new Set();
  let lines = '';
  for (let k = 0; k < links; k++) {
    const ai = Math.floor(rnd() * pts.length);
    const a = pts[ai];
    let bi = -1;
    let bd = 1e9;
    for (let i = 0; i < pts.length; i++) {
      if (i === ai) continue;
      const d = Math.hypot(pts[i][0] - a[0], pts[i][1] - a[1]);
      if (d > 46 && d < bd) {
        bd = d;
        bi = i;
      }
    }
    if (bi < 0) continue;
    const key = ai < bi ? `${ai}-${bi}` : `${bi}-${ai}`;
    if (seen.has(key)) continue;
    seen.add(key);
    lines += `M${n(a[0])} ${n(a[1])}L${n(pts[bi][0])} ${n(pts[bi][1])}`;
  }
  const dots = pts.map(([px, py, r]) => `<circle cx="${n(px)}" cy="${n(py)}" r="${n(r)}"/>`).join('');
  return `<g mask="url(#${p}-star-mask)">
    <path d="${lines}" fill="none" stroke="${C.sage300}" stroke-opacity="${n(op * 0.55)}" stroke-width="1"/>
    <g fill="${C.sage300}" fill-opacity="${op}">${dots}</g>
    <g fill="${C.paper}" fill-opacity="${n(op * 0.9)}">
      <circle cx="${n(x + w * 0.18)}" cy="${n(y + h * 0.24)}" r="${n(2.4 * ds)}"/>
      <circle cx="${n(x + w * 0.82)}" cy="${n(y + h * 0.68)}" r="${n(2.2 * ds)}"/>
      <circle cx="${n(x + w * 0.66)}" cy="${n(y + h * 0.16)}" r="${n(1.8 * ds)}"/>
    </g>
  </g>`;
}

/** Tarjeta fantasma de fondo. */
function ghostCard(x, y, w, h, opts = {}) {
  const { r = 16, op = 0.09, rot = 0 } = opts;
  return `<g transform="rotate(${rot} ${x + w / 2} ${y + h / 2})" fill="none" stroke="${C.sage300}">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" stroke-opacity="${op}"/>
    <rect x="${x + 12}" y="${y + 12}" width="${w - 24}" height="${h - 24}" rx="${Math.max(4, r - 6)}" stroke-opacity="${op * 0.5}"/>
    <path d="M${x + 26} ${y + h - 34}h${w * 0.42}M${x + 26} ${y + h - 22}h${w * 0.24}" stroke-opacity="${op * 0.7}"/>
    <circle cx="${x + w - 26}" cy="${y + 24}" r="3" fill="${C.sage300}" fill-opacity="${op}" stroke="none"/>
  </g>`;
}

const hBracket = (x1, x2, y, op = 0.14) =>
  `<g stroke="${C.sage300}" stroke-opacity="${op}"><path d="M${x1} ${y}h${x2 - x1}M${x1} ${y - 6}v12M${x2} ${y - 6}v12"/></g>`;
const vBracket = (x, y1, y2, op = 0.14) =>
  `<g stroke="${C.sage300}" stroke-opacity="${op}"><path d="M${x} ${y1}v${y2 - y1}M${x - 6} ${y1}h12M${x - 6} ${y2}h12"/></g>`;
const cross = (x, y, s = 5, op = 0.16) =>
  `<path d="M${x - s} ${y}h${2 * s}M${x} ${y - s}v${2 * s}" stroke="${C.sage300}" stroke-opacity="${op}"/>`;

/** Firma de autor: glifo de Vínculo. */
function signature(x = 1498, y = 1094, s = 24, op = 0.35) {
  const k = s / 256;
  return `<g transform="translate(${x} ${y}) scale(${k})" opacity="${op}">
    <circle cx="128" cy="128" r="88" fill="none" stroke="${C.sage300}" stroke-width="26"
            stroke-dasharray="414 139" transform="rotate(-45 128 128)"/>
    <circle cx="140" cy="140" r="48" fill="none" stroke="${C.sage500}" stroke-width="26"
            stroke-dasharray="226 76" transform="rotate(135 140 140)"/>
    <circle cx="102" cy="102" r="14" fill="${C.sage300}"/>
    <circle cx="226" cy="226" r="12" fill="${C.sage300}"/>
  </g>`;
}

function defs(p, extra = '') {
  return `<defs>
    <radialGradient id="${p}-bg" cx="50%" cy="44%" r="70%">
      <stop offset="0" stop-color="${C.pine900}"/>
      <stop offset="1" stop-color="${C.pine950}"/>
    </radialGradient>
    <radialGradient id="${p}-halo" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${C.sage500}" stop-opacity=".15"/>
      <stop offset=".45" stop-color="${C.sage500}" stop-opacity=".06"/>
      <stop offset="1" stop-color="${C.sage500}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${p}-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${C.sage300}" stop-opacity=".5"/>
      <stop offset=".45" stop-color="${C.sage300}" stop-opacity=".12"/>
      <stop offset="1" stop-color="${C.sage300}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${p}-glow-soft" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${C.sage300}" stop-opacity=".24"/>
      <stop offset=".5" stop-color="${C.sage300}" stop-opacity=".07"/>
      <stop offset="1" stop-color="${C.sage300}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${p}-vignette" cx="50%" cy="48%" r="72%">
      <stop offset=".52" stop-color="${C.pine950}" stop-opacity="0"/>
      <stop offset="1" stop-color="${C.pine950}" stop-opacity=".62"/>
    </radialGradient>
    <radialGradient id="${p}-starfade" cx="50%" cy="46%" r="64%">
      <stop offset="0" stop-color="#fff" stop-opacity=".1"/>
      <stop offset=".5" stop-color="#fff" stop-opacity=".45"/>
      <stop offset="1" stop-color="#fff" stop-opacity="1"/>
    </radialGradient>
    <mask id="${p}-star-mask"><rect width="1600" height="1200" fill="url(#${p}-starfade)"/></mask>
    <pattern id="${p}-grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="${C.sage300}" stroke-width="1" opacity=".05"/>
    </pattern>
    <pattern id="${p}-grid-major" width="200" height="200" patternUnits="userSpaceOnUse">
      <path d="M200 0H0V200" fill="none" stroke="${C.sage300}" stroke-width="1" opacity=".055"/>
    </pattern>
    <pattern id="${p}-dots" width="56" height="56" patternUnits="userSpaceOnUse">
      <circle cx="28" cy="28" r="1.3" fill="${C.sage300}" opacity=".22"/>
    </pattern>
    <linearGradient id="${p}-card" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.pine800}"/>
      <stop offset="1" stop-color="${C.pine900}"/>
    </linearGradient>
    <linearGradient id="${p}-sheen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.paper}" stop-opacity=".06"/>
      <stop offset=".45" stop-color="${C.paper}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="${p}-plate" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.pine800}" stop-opacity=".5"/>
      <stop offset="1" stop-color="${C.pine950}" stop-opacity=".8"/>
    </linearGradient>
    <filter id="${p}-shadow" x="-45%" y="-45%" width="190%" height="200%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000000" flood-opacity=".5"/>
    </filter>
    <filter id="${p}-shadow-lite" x="-45%" y="-45%" width="190%" height="200%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity=".45"/>
    </filter>
    ${extra}
  </defs>`;
}

/** Fondo, retícula, viñeta y halo. */
function base(p, halo = []) {
  return `
  <!-- fondo -->
  <rect width="1600" height="1200" fill="url(#${p}-bg)"/>
  <rect width="1600" height="1200" fill="url(#${p}-grid-major)"/>
  <rect width="1600" height="1200" fill="url(#${p}-grid)"/>
  <rect width="1600" height="1200" fill="url(#${p}-vignette)"/>
  ${halo.map(([cx, cy, r, kind = 'halo']) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${p}-${kind})"/>`).join('\n  ')}`;
}

/** Marcas de registro: esquinas, tick centrales y reglas de borde. */
function marks(p, w = 1600, h = 1200, ins = 52, op = 0.3) {
  const arm = 24;
  const corners = [
    [ins, ins, 1, 1],
    [w - ins, ins, -1, 1],
    [ins, h - ins, 1, -1],
    [w - ins, h - ins, -1, -1],
  ];
  const g = corners
    .map(
      ([x, y, dx, dy]) =>
        `<path d="M${x} ${y + dy * arm}V${y}H${x + dx * arm}"/>` +
        `<circle cx="${x}" cy="${y}" r="1.7" fill="${C.sage300}" stroke="none" fill-opacity="${op * 1.4}"/>`,
    )
    .join('');
  return `
  <!-- marcas de registro -->
  <g fill="none" stroke="${C.sage300}" stroke-width="1" stroke-opacity="${op}">${g}</g>
  <g stroke="${C.sage300}" stroke-width="1" stroke-opacity=".18">
    <path d="M${w / 2} ${ins - 12}v14M${w / 2} ${h - ins + 12}v-14M${ins - 12} ${h / 2}h14M${w - ins + 12} ${h / 2}h-14"/>
    <path d="M${ins} ${h * 0.33}h8M${ins} ${h * 0.67}h8M${w - ins} ${h * 0.33}h-8M${w - ins} ${h * 0.67}h-8M${w * 0.33} ${ins}v8M${w * 0.67} ${ins}v8M${w * 0.33} ${h - ins}v-8M${w * 0.67} ${h - ins}v-8"/>
  </g>`;
}

const wrap = (title, p, body, extra = '') => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1200" width="1600" height="1200" role="img" aria-labelledby="${p}-title">
  <title id="${p}-title">${title}</title>
  ${defs(p, extra)}
${body}
</svg>
`;

/* ─────────────────────────────────────────────────────────────
   01 · PANEL — el panel del tutor
   ───────────────────────────────────────────────────────────── */
function panel() {
  const p = 'p';
  const extra = `
    <clipPath id="p-clip-plate"><path d="M500 690H1100L1180 1020H420Z"/></clipPath>
    <linearGradient id="p-area" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.sage300}" stop-opacity=".16"/>
      <stop offset="1" stop-color="${C.sage300}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="p-fade-y" gradientUnits="userSpaceOnUse" x1="0" y1="660" x2="0" y2="1035">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset=".22" stop-color="#fff" stop-opacity="1"/>
      <stop offset=".72" stop-color="#fff" stop-opacity=".85"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <mask id="p-floor-mask"><rect x="0" y="660" width="1600" height="380" fill="url(#p-fade-y)"/></mask>`;

  const cardX = 596;
  const cardY = 336;
  const cardW = 408;
  const cardH = 236;

  const metrics = [
    { x: 1032, y: 340 },
    { x: 1032, y: 456 },
    { x: 1032, y: 572 },
  ];
  const metricCard = ({ x, y }, i) => `
      <g filter="url(#p-shadow-lite)">
        <rect x="${x}" y="${y}" width="148" height="96" rx="14" fill="url(#p-card)" stroke="${C.sage300}" stroke-opacity=".3"/>
      </g>
      <rect x="${x + 18}" y="${y + 18}" width="11" height="11" rx="2.5" fill="none" stroke="${C.sage300}" stroke-opacity=".32"/>
      <rect x="${x + 38}" y="${y + 21}" width="58" height="4" rx="2" fill="${C.sage300}" stroke="none" fill-opacity=".26"/>
      <rect x="${x + 18}" y="${y + 43}" width="42" height="7" rx="3.5" fill="${C.sage300}" stroke="none" fill-opacity=".46"/>
      <rect x="${x + 18}" y="${y + 57}" width="26" height="4" rx="2" fill="${C.sage300}" stroke="none" fill-opacity=".15"/>
      <g fill="${C.sage300}" stroke="none">
        <rect x="${x + 94}" y="${y + 64}" width="7" height="14" rx="1.5" fill-opacity=".2"/>
        <rect x="${x + 106}" y="${y + 54}" width="7" height="24" rx="1.5" fill-opacity=".28"/>
        <rect x="${x + 118}" y="${y + 60}" width="7" height="18" rx="1.5" fill-opacity=".2"/>
        <rect x="${x + 130}" y="${y + 46}" width="7" height="32" rx="1.5" fill-opacity="${i === 2 ? '.62' : '.34'}"/>
      </g>
      ${i === 2 ? `<rect x="${x - 1}" y="${y + 34}" width="2" height="28" fill="${C.amber}" fill-opacity=".95" stroke="none"/>` : ''}`;

  const nodes = [505, 710, 915, 1120];
  const labelW = [58, 74, 46, 64];

  const pl = [500, 690];
  const prr = [1100, 690];
  const pbl = [420, 1020];
  const pbr = [1180, 1020];
  const vp = [800, -550];
  let pgrid = '';
  for (const y of [742, 800, 870, 950]) {
    const t = (y - pl[1]) / (pbl[1] - pl[1]);
    pgrid += `M${n(pl[0] + (pbl[0] - pl[0]) * t)} ${y}H${n(prr[0] + (pbr[0] - prr[0]) * t)}`;
  }
  for (let i = 0; i <= 6; i++) {
    const x = pbl[0] + (pbr[0] - pbl[0]) * (i / 6);
    const t = (pbl[1] - pl[1]) / (pbl[1] - vp[1]);
    pgrid += `M${n(x)} ${pbl[1]}L${n(x + (vp[0] - x) * t)} ${pl[1]}`;
  }

  const body = `${base(p, [[800, 470, 340]])}
  ${starfield(p, 3)}
  <!-- tarjetas fantasma -->
  ${ghostCard(520, 272, 408, 236, { op: 0.05 })}
  ${ghostCard(548, 300, 408, 236, { op: 0.08 })}

  <!-- plano inclinado -->
  <g mask="url(#p-floor-mask)">
    <path d="M500 690H1100L1180 1020H420Z" fill="url(#p-plate)"/>
    <g clip-path="url(#p-clip-plate)">
      <path d="${pgrid}" fill="none" stroke="${C.sage300}" stroke-width="1" stroke-opacity=".11"/>
    </g>
    <path d="M500 690H1100L1180 1020H420Z" fill="none" stroke="${C.sage300}" stroke-opacity=".13"/>
    <path d="M512 702H1088L1166 1008H434Z" fill="none" stroke="${C.sage300}" stroke-opacity=".06" stroke-dasharray="2 8"/>
  </g>

  <!-- órbita: mitad trasera -->
  <g transform="rotate(-14 880 540)" fill="none">
    <ellipse cx="880" cy="540" rx="420" ry="150" stroke="${C.sage300}" stroke-opacity=".12" stroke-dasharray="1 10"/>
    <path d="M460 540A420 150 0 0 1 1300 540" stroke="${C.sage300}" stroke-opacity=".26" stroke-width="1.5"/>
    <ellipse cx="880" cy="540" rx="486" ry="188" stroke="${C.sage300}" stroke-opacity=".07" stroke-dasharray="1 14"/>
  </g>

  <!-- tarjeta secundaria izquierda -->
  <g>
    <rect x="338" y="486" width="170" height="108" rx="12" fill="${C.pine900}" fill-opacity=".55" stroke="${C.sage300}" stroke-opacity=".22"/>
    <rect x="356" y="506" width="72" height="5" rx="2.5" fill="${C.sage300}" fill-opacity=".3"/>
    <rect x="356" y="518" width="46" height="4" rx="2" fill="${C.sage300}" fill-opacity=".14"/>
    <g fill="${C.sage300}">
      <rect x="356" y="540" width="42" height="6" rx="3" fill-opacity=".34"/>
      <rect x="404" y="540" width="24" height="6" rx="3" fill-opacity=".18"/>
      <rect x="434" y="540" width="12" height="6" rx="3" fill-opacity=".1"/>
    </g>
    <rect x="356" y="560" width="92" height="4" rx="2" fill="${C.sage300}" fill-opacity=".14"/>
    <circle cx="482" cy="512" r="3" fill="${C.sage500}" fill-opacity=".7"/>
    <path d="M508 540h78" stroke="${C.sage300}" stroke-opacity=".22" stroke-dasharray="1 5"/>
    <circle cx="588" cy="540" r="2.2" fill="${C.sage300}" fill-opacity=".4"/>
  </g>

  <!-- nota inferior izquierda -->
  <g>
    <rect x="318" y="846" width="212" height="110" rx="12" fill="${C.pine900}" fill-opacity=".4" stroke="${C.sage300}" stroke-opacity=".16"/>
    <rect x="336" y="866" width="58" height="4" rx="2" fill="${C.sage300}" fill-opacity=".24"/>
    <rect x="336" y="878" width="34" height="3" rx="1.5" fill="${C.sage300}" fill-opacity=".12"/>
    <g stroke="${C.sage300}" stroke-opacity=".14">
      <path d="M336 900h176M336 914h140M336 928h96"/>
    </g>
    <circle cx="336" cy="940" r="2.4" fill="${C.sage300}" fill-opacity=".4"/>
  </g>

  <!-- tarjeta principal -->
  <g filter="url(#p-shadow)">
    <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="18" fill="url(#p-card)" stroke="${C.sage300}" stroke-opacity=".42" stroke-width="1.5"/>
  </g>
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="18" fill="url(#p-sheen)" stroke="none"/>
  <rect x="${cardX + 0.5}" y="${cardY + 0.5}" width="${cardW - 1}" height="${cardH - 1}" rx="17.5" fill="none" stroke="${C.paper}" stroke-opacity=".07"/>
  <!-- cabecera -->
  <rect x="620" y="360" width="22" height="22" rx="6" fill="none" stroke="${C.sage300}" stroke-opacity=".45"/>
  <path d="M631 365l5 6-5 6-5-6z" fill="${C.sage500}" fill-opacity=".85" stroke="none"/>
  <rect x="654" y="364" width="148" height="6" rx="3" fill="${C.sage300}" stroke="none" fill-opacity=".52"/>
  <rect x="654" y="378" width="90" height="4" rx="2" fill="${C.sage300}" stroke="none" fill-opacity=".22"/>
  <g fill="${C.sage300}" stroke="none" fill-opacity=".4">
    <circle cx="948" cy="371" r="1.8"/><circle cx="956" cy="371" r="1.8"/><circle cx="964" cy="371" r="1.8"/>
  </g>
  <path d="M620 402H980" stroke="${C.sage300}" stroke-opacity=".12"/>
  <!-- bloque de cifra -->
  <rect x="620" y="424" width="172" height="100" rx="10" fill="${C.pine900}" fill-opacity=".55" stroke="${C.sage300}" stroke-opacity=".13"/>
  <rect x="636" y="444" width="86" height="22" rx="3" fill="${C.paper}" fill-opacity=".9" stroke="none"/>
  <rect x="636" y="478" width="52" height="5" rx="2.5" fill="${C.sage300}" stroke="none" fill-opacity=".3"/>
  <rect x="636" y="492" width="34" height="4" rx="2" fill="${C.sage300}" stroke="none" fill-opacity=".16"/>
  <g fill="${C.sage300}" stroke="none" fill-opacity=".22">
    <rect x="752" y="494" width="2" height="14"/><rect x="760" y="486" width="2" height="22"/><rect x="768" y="474" width="2" height="34"/>
  </g>
  <!-- sparkline -->
  <path d="M812 486L840 472L868 480L896 452L924 462L952 440L980 448V508H812Z" fill="url(#p-area)" stroke="none"/>
  <path d="M812 486L840 472L868 480L896 452L924 462L952 440L980 448" fill="none" stroke="${C.sage300}" stroke-opacity=".72" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="952" cy="440" r="12" fill="url(#p-glow)"/>
  <circle cx="952" cy="440" r="7" fill="none" stroke="${C.sage300}" stroke-opacity=".3"/>
  <circle cx="952" cy="440" r="3.2" fill="${C.paper}" fill-opacity=".95" stroke="none"/>
  <path d="M812 508H980" stroke="${C.sage300}" stroke-opacity=".14"/>
  <g stroke="${C.sage300}" stroke-opacity=".16">
    <path d="M812 508v5M840 508v4M868 508v5M896 508v4M924 508v5M952 508v4M980 508v5"/>
  </g>
  <!-- pie -->
  <g fill="${C.sage300}" stroke="none">
    <circle cx="624" cy="540" r="2.6" fill-opacity=".7"/>
    <rect x="634" y="538" width="46" height="4" rx="2" fill-opacity=".18"/>
    <circle cx="702" cy="540" r="2.6" fill-opacity=".35"/>
    <rect x="712" y="538" width="30" height="4" rx="2" fill-opacity=".12"/>
  </g>
  <path d="M966 534v12M960 540h12" stroke="${C.sage300}" stroke-opacity=".28"/>

  <!-- tarjetas de métricas -->
  ${metrics.map(metricCard).join('\n  ')}

  <!-- línea de tiempo -->
  <g>
    <path d="M480 780H1145" stroke="${C.sage300}" stroke-opacity=".28" stroke-width="1"/>
    <path d="M474 774v12M1151 774v12" stroke="${C.sage300}" stroke-opacity=".2"/>
    <g stroke="${C.sage300}" stroke-opacity=".09">
      <path d="M508 775v10M536 777v6M564 777v6M592 777v6M620 777v6M648 777v6M676 777v6M704 777v6M732 777v6M760 777v6M788 777v6M816 777v6M844 777v6M872 777v6M900 777v6M928 777v6M956 777v6M984 777v6M1012 777v6M1040 777v6M1068 777v6M1096 777v6M1124 777v6"/>
    </g>
    ${nodes
      .map((x, i) => {
        const active = i === 0;
        return `<g>
      ${active ? `<circle cx="${x}" cy="780" r="22" fill="url(#p-glow)"/>` : ''}
      <circle cx="${x}" cy="780" r="9.5" fill="${C.pine950}" fill-opacity=".6" stroke="${C.sage300}" stroke-opacity="${active ? '.5' : '.28'}"/>
      <circle cx="${x}" cy="780" r="${active ? '4.2' : '3.4'}" fill="${active ? C.paper : C.sage500}" fill-opacity="${active ? '.95' : '.85'}" stroke="none"/>
      <path d="M${x} 790v18" stroke="${C.sage300}" stroke-opacity=".16"/>
      <rect x="${x - labelW[i] / 2}" y="813" width="${labelW[i]}" height="3" rx="1.5" fill="${C.sage300}" stroke="none" fill-opacity="${active ? '.34' : '.16'}"/>
    </g>`;
      })
      .join('\n    ')}
  </g>

  <!-- conexiones -->
  <path d="M1006 388h20" stroke="${C.sage300}" stroke-opacity=".22" stroke-dasharray="1 5" stroke-linecap="round"/>
  <circle cx="1026" cy="388" r="2.4" fill="${C.sage300}" fill-opacity=".45" stroke="none"/>
  <path d="M800 578v106" stroke="${C.sage300}" stroke-opacity=".16" stroke-dasharray="1 6" stroke-linecap="round"/>

  <!-- órbita: mitad delantera -->
  <g transform="rotate(-14 880 540)" fill="none">
    <path d="M460 540A420 150 0 0 0 1300 540" stroke="${C.sage300}" stroke-opacity=".3" stroke-width="1.5"/>
    <path d="M583 646A420 150 0 0 0 771.3 684.9" stroke="${C.sage300}" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>
    <circle cx="460" cy="540" r="3" fill="${C.sage300}" fill-opacity=".35" stroke="none"/>
  </g>

  <!-- medición y anclas -->
  ${hBracket(480, 1145, 858, 0.13)}
  ${vBracket(1218, 340, 696, 0.13)}
  ${cross(430, 300, 5, 0.14)}
  ${cross(1190, 300, 5, 0.14)}
  ${cross(430, 930, 5, 0.12)}
  ${marks(p)}${signature(1498, 1094, 24, 0.35)}`;

  return wrap('IA Guardian — panel del tutor', p, body, extra);
}

/* ─────────────────────────────────────────────────────────────
   02 · ALERTS — señales explicadas
   ───────────────────────────────────────────────────────────── */
function alerts() {
  const p = 'a';
  const extra = `
    <clipPath id="a-clip-card"><rect x="420" y="376" width="568" height="344" rx="22"/></clipPath>
    <radialGradient id="a-halo-warm" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${C.amber}" stop-opacity=".16"/>
      <stop offset=".5" stop-color="${C.amber}" stop-opacity=".06"/>
      <stop offset="1" stop-color="${C.amber}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="a-halo-crit" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${C.oxblood}" stop-opacity=".5"/>
      <stop offset=".4" stop-color="${C.oxblood}" stop-opacity=".18"/>
      <stop offset="1" stop-color="${C.oxblood}" stop-opacity="0"/>
    </radialGradient>`;

  const rows = [
    { y: 478, pill: C.amber, op: '.4' },
    { y: 522, pill: C.sage300, op: '.26' },
    { y: 566, pill: C.sage300, op: '.16' },
  ];
  const row = ({ y, pill, op }, i) => `
    <g>
      <rect x="444" y="${y}" width="20" height="20" rx="5" fill="none" stroke="${C.sage300}" stroke-opacity=".26"/>
      <circle cx="454" cy="${y + 10}" r="2.2" fill="${C.sage300}" fill-opacity=".45" stroke="none"/>
      <rect x="478" y="${y + 3}" width="${168 - i * 18}" height="5" rx="2.5" fill="${C.sage300}" stroke="none" fill-opacity=".32"/>
      <rect x="478" y="${y + 14}" width="${102 - i * 12}" height="4" rx="2" fill="${C.sage300}" stroke="none" fill-opacity=".15"/>
      <rect x="854" y="${y + 0}" width="110" height="20" rx="10" fill="${i === 0 ? C.amber : C.sage300}" fill-opacity="${i === 0 ? '.07' : '.03'}" stroke="${pill}" stroke-opacity="${op}"/>
      <rect x="870" y="${y + 8}" width="52" height="4" rx="2" fill="${pill}" stroke="none" fill-opacity="${i === 0 ? '.55' : '.3'}"/>
      <circle cx="944" cy="${y + 10}" r="2.4" fill="${pill}" stroke="none" fill-opacity="${i === 0 ? '.8' : '.35'}"/>
    </g>`;

  const body = `${base(p, [[700, 530, 520], [700, 530, 330, 'halo-warm']])}
  ${starfield(p, 5)}
  ${ghostCard(528, 296, 568, 344, { op: 0.04 })}
  ${ghostCard(500, 316, 568, 344, { op: 0.065 })}
  ${ghostCard(472, 336, 568, 344, { op: 0.1 })}

  <!-- arco de fondo -->
  <circle cx="700" cy="540" r="392" fill="none" stroke="${C.sage300}" stroke-opacity=".06"/>

  <!-- traza de reglas -->
  <g fill="none" stroke="${C.sage300}" stroke-linecap="square">
    <path d="M252 930H336V740" stroke-opacity=".34" stroke-width="1.5"/>
    <path d="M336 740H420" stroke-opacity=".3" stroke-width="1.5" stroke-dasharray="1 6"/>
    <path d="M420 740H1120V520H1292V356" stroke-opacity=".34" stroke-width="1.5"/>
    <path d="M1120 740H1256V846" stroke-opacity=".3" stroke-width="1.5"/>
    <path d="M1256 846v34" stroke-opacity=".22" stroke-width="1.5" stroke-dasharray="1 6"/>
    <path d="M1120 640H1200V700" stroke-opacity=".16" stroke-width="1.5" stroke-dasharray="1 6"/>
    <path d="M1200 700h40" stroke-opacity=".12" stroke-width="1.5" stroke-dasharray="1 6"/>
    <path d="M229 930v26M1117 700h26M1064 520h56M1292 334v-22" stroke-opacity=".14"/>
  </g>
  <g fill="${C.pine950}" stroke="${C.sage300}">
    <circle cx="252" cy="930" r="5" stroke-opacity=".5"/>
    <circle cx="336" cy="740" r="4" stroke-opacity=".4"/>
    <circle cx="1120" cy="740" r="5" stroke-opacity=".5"/>
    <circle cx="1256" cy="846" r="4" stroke-opacity=".35"/>
    <circle cx="1200" cy="700" r="3" stroke-opacity=".28"/>
  </g>
  <g fill="${C.sage500}" stroke="none">
    <circle cx="1120" cy="520" r="3.4" fill-opacity=".8"/>
    <circle cx="1120" cy="740" r="2.2" fill-opacity=".9"/>
  </g>
  <g fill="none" stroke="${C.sage300}">
    <circle cx="1292" cy="356" r="14" stroke-opacity=".3"/>
    <circle cx="1292" cy="356" r="4" fill="${C.paper}" fill-opacity=".9" stroke="none"/>
    <rect x="1030" y="734" width="12" height="12" stroke-opacity=".24"/>
    <rect x="722" y="734" width="8" height="8" stroke-opacity=".16"/>
  </g>
  <!-- bus: marcas sobre la traza -->
  <g stroke="${C.sage300}" stroke-opacity=".11">
    <path d="M460 734v12M500 734v12M540 734v12M580 734v12M620 734v12M660 734v12M700 734v12M740 734v12M780 734v12M820 734v12M860 734v12M900 734v12"/>
  </g>

  <!-- tarjeta en cola -->
  <g>
    <rect x="286" y="786" width="252" height="158" rx="16" fill="${C.pine900}" fill-opacity=".55" stroke="${C.sage300}" stroke-opacity=".2"/>
    <rect x="306" y="806" width="66" height="5" rx="2.5" fill="${C.sage300}" fill-opacity=".28"/>
    <rect x="306" y="818" width="44" height="4" rx="2" fill="${C.sage300}" fill-opacity=".13"/>
    <g>
      <circle cx="312" cy="850" r="2.4" fill="${C.sage300}" fill-opacity=".35"/>
      <rect x="326" y="847" width="120" height="5" rx="2.5" fill="${C.sage300}" fill-opacity=".2"/>
      <circle cx="312" cy="878" r="2.4" fill="${C.sage300}" fill-opacity=".22"/>
      <rect x="326" y="875" width="88" height="4" rx="2" fill="${C.sage300}" fill-opacity=".14"/>
    </g>
    <rect x="306" y="906" width="84" height="18" rx="9" fill="none" stroke="${C.sage300}" stroke-opacity=".18"/>
    <circle cx="382" cy="915" r="2" fill="${C.sage300}" fill-opacity=".3"/>
    <rect x="404" y="906" width="56" height="18" rx="9" fill="none" stroke="${C.sage300}" stroke-opacity=".1"/>
  </g>

  <!-- tarjeta de alerta -->
  <g filter="url(#a-shadow)">
    <rect x="420" y="376" width="568" height="344" rx="22" fill="url(#a-card)"/>
  </g>
  <rect x="420" y="376" width="568" height="344" rx="22" fill="none" stroke="${C.amber}" stroke-opacity=".95" stroke-width="2"/>
  <rect x="424.5" y="380.5" width="559" height="335" rx="18.5" fill="none" stroke="${C.sage300}" stroke-opacity=".08"/>
  <g clip-path="url(#a-clip-card)">
    <rect x="420" y="376" width="568" height="180" fill="url(#a-sheen)" stroke="none"/>
    <!-- nodo crítico -->
    <circle cx="466" cy="424" r="46" fill="url(#a-halo-crit)" stroke="none"/>
    <circle cx="466" cy="424" r="17" fill="none" stroke="${C.oxblood}" stroke-opacity=".34"/>
    <circle cx="466" cy="424" r="7" fill="${C.oxblood}" stroke="none"/>
    <circle cx="463.6" cy="421.6" r="1.6" fill="${C.paper}" fill-opacity=".75" stroke="none"/>
  </g>
  <!-- cabecera -->
  <rect x="498" y="412" width="196" height="7" rx="3.5" fill="${C.sage300}" stroke="none" fill-opacity=".55"/>
  <rect x="498" y="428" width="128" height="4" rx="2" fill="${C.sage300}" stroke="none" fill-opacity=".24"/>
  <rect x="862" y="408" width="102" height="24" rx="12" fill="${C.amber}" fill-opacity=".07" stroke="${C.amber}" stroke-opacity=".4"/>
  <rect x="878" y="417" width="48" height="5" rx="2.5" fill="${C.amberOnDark}" stroke="none" fill-opacity=".55"/>
  <circle cx="944" cy="420" r="2.6" fill="${C.amberOnDark}" stroke="none" fill-opacity=".8"/>
  <path d="M444 460H964" stroke="${C.sage300}" stroke-opacity=".12"/>

  ${rows.map(row).join('\n  ')}

  <path d="M444 606H964" stroke="${C.sage300}" stroke-opacity=".12"/>
  <!-- siguiente paso -->
  <circle cx="452" cy="652" r="8" fill="none" stroke="${C.sage300}" stroke-opacity=".3"/>
  <circle cx="452" cy="652" r="2.6" fill="${C.sage300}" fill-opacity=".6" stroke="none"/>
  <rect x="472" y="644" width="128" height="5" rx="2.5" fill="${C.sage300}" stroke="none" fill-opacity=".3"/>
  <rect x="472" y="656" width="86" height="4" rx="2" fill="${C.sage300}" stroke="none" fill-opacity=".14"/>
  <g fill="none" stroke="${C.paper}" stroke-opacity=".8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M862 646v22h80"/>
    <path d="M934 660l8 8-8 8"/>
  </g>
  <g fill="none" stroke="${C.sage300}" stroke-opacity=".18">
    <path d="M850 634v46" stroke-dasharray="1 5"/>
  </g>
  <!-- escala de severidad -->
  <g stroke="${C.sage300}" stroke-opacity=".18">
    <path d="M1014 424v180"/>
    <path d="M1008 424h12M1014 469h12M1014 514h12M1014 559h12M1008 604h12"/>
  </g>
  <circle cx="1020" cy="469" r="3" fill="${C.amber}" fill-opacity=".8"/>

  <!-- medición y anclas -->
  ${hBracket(420, 988, 768, 0.12)}
  ${vBracket(1044, 376, 720, 0.1)}
  ${cross(310, 350, 5, 0.14)}
  ${cross(1330, 420, 5, 0.12)}
  ${marks(p)}${signature(1498, 1094, 24, 0.35)}`;

  return wrap('IA Guardian — señales explicadas', p, body, extra);
}

/* ─────────────────────────────────────────────────────────────
   03 · PAIRING — dos voluntades
   ───────────────────────────────────────────────────────────── */
function pairing() {
  const p = 'pr';
  const extra = `
    <radialGradient id="pr-band" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${C.sage300}" stop-opacity=".1"/>
      <stop offset=".55" stop-color="${C.sage300}" stop-opacity=".045"/>
      <stop offset="1" stop-color="${C.sage300}" stop-opacity="0"/>
    </radialGradient>`;

  const qr = [
    [1, 1, 0, 0, 1],
    [1, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 1],
    [1, 0, 0, 1, 1],
  ];
  const qx = 707;
  const qy = 507;
  const cell = 34;
  const gap = 4;
  const mods = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const x = qx + c * (cell + gap);
      const y = qy + r * (cell + gap);
      mods.push(
        qr[r][c]
          ? `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="3" fill="${C.sage300}" fill-opacity=".48" stroke="none"/>`
          : `<rect x="${x + 0.5}" y="${y + 0.5}" width="${cell - 1}" height="${cell - 1}" rx="3" fill="none" stroke="${C.sage300}" stroke-opacity=".16"/>`,
      );
    }
  }

  const screen = (side, x, y) => {
    const cx = x + 100;
    const sx = x + 26;
    const sw = 148;
    return `
      <circle cx="${cx}" cy="${y + 70}" r="76" fill="url(#pr-glow-soft)"/>
      <rect x="${sx}" y="${y + 40}" width="94" height="6" rx="3" fill="${C.sage300}" fill-opacity=".4"/>
      <rect x="${sx}" y="${y + 53}" width="54" height="4" rx="2" fill="${C.sage300}" fill-opacity=".16"/>
      <rect x="${sx}" y="${y + 74}" width="${sw}" height="62" rx="9" fill="${C.pine800}" fill-opacity=".4" stroke="${C.sage300}" stroke-opacity=".16"/>
      <rect x="${sx + 12}" y="${y + 88}" width="78" height="5" rx="2.5" fill="${C.sage300}" fill-opacity=".3"/>
      <rect x="${sx + 12}" y="${y + 100}" width="50" height="4" rx="2" fill="${C.sage300}" fill-opacity=".14"/>
      <rect x="${sx + 12}" y="${y + 114}" width="24" height="4" rx="2" fill="${C.sage300}" fill-opacity="${side === 'left' ? '.22' : '.14'}"/>
      <circle cx="${sx + sw - 16}" cy="${y + 104}" r="4" fill="${side === 'left' ? C.sage500 : C.paper}" fill-opacity=".8"/>
      <rect x="${sx}" y="${y + 146}" width="${sw}" height="50" rx="9" fill="${C.pine800}" fill-opacity=".26" stroke="${C.sage300}" stroke-opacity=".1"/>
      <rect x="${sx + 12}" y="${y + 158}" width="62" height="4" rx="2" fill="${C.sage300}" fill-opacity=".2"/>
      <rect x="${sx + 12}" y="${y + 170}" width="90" height="3" rx="1.5" fill="${C.sage300}" fill-opacity=".1"/>
      <g fill="${C.sage300}" fill-opacity=".18">
        <circle cx="${sx + 8}" cy="${y + 222}" r="3"/><circle cx="${sx + 24}" cy="${y + 222}" r="3"/>
        <circle cx="${sx + 40}" cy="${y + 222}" r="3"/><circle cx="${sx + 56}" cy="${y + 222}" r="3"/>
      </g>
      ${
        side === 'left'
          ? `<circle cx="${cx}" cy="${y + 276}" r="18" fill="none" stroke="${C.sage300}" stroke-opacity=".4"/>
             <path d="M${cx - 7} ${y + 276}l5 6 10 -12" fill="none" stroke="${C.paper}" stroke-opacity=".85" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`
          : `${lock(cx, y + 278, 40, { sOp: '.62' })}`
      }
    `;
  };

  const phone = (x, rot, cxp, side) => `
  <g transform="rotate(${rot} ${cxp} 585)">
    <g filter="url(#pr-shadow-lite)">
      <rect x="${x}" y="410" width="200" height="350" rx="31" fill="${C.pine800}" stroke="${C.sage300}" stroke-opacity=".5" stroke-width="2"/>
    </g>
    <rect x="${x + 8}" y="418" width="184" height="334" rx="24" fill="${C.pine950}" stroke="${C.sage300}" stroke-opacity=".12"/>
    ${screen(side, x + 8, 418)}
    <rect x="${x + 78}" y="422" width="44" height="4" rx="2" fill="${C.sage300}" fill-opacity=".28"/>
    <rect x="${x + 80}" y="744" width="40" height="3" rx="1.5" fill="${C.sage300}" fill-opacity=".2"/>
    <rect x="${side === 'left' ? x - 5 : x + 185}" y="530" width="5" height="40" rx="2.5" fill="${C.sage300}" fill-opacity=".16"/>
    <path d="M${side === 'left' ? x + 186 : x + 14} 450v270" stroke="${C.sage300}" stroke-opacity=".14" stroke-width="2"/>
  </g>`;

  const body = `${base(p, [[800, 590, 470], [800, 590, 300]])}
  ${starfield(p, 7)}
  <!-- columna de asentimiento -->
  <ellipse cx="800" cy="590" rx="210" ry="330" fill="url(#pr-band)"/>
  <ellipse cx="800" cy="590" rx="404" ry="252" fill="none" stroke="${C.sage300}" stroke-opacity=".07" stroke-dasharray="1 12"/>
  ${ghostCard(300, 330, 184, 320, { op: 0.07 })}
  ${ghostCard(1116, 690, 184, 280, { op: 0.06 })}

  <!-- teléfonos -->
  ${phone(440, 6, 540, 'left')}
  ${phone(960, -6, 1060, 'right')}

  <!-- arco superior -->
  <g fill="none" stroke-linecap="round">
    <path d="M640 470C720 296 880 296 960 470" stroke="${C.sage300}" stroke-opacity=".5" stroke-width="1.5" stroke-dasharray="1 9"/>
    <path d="M640 700C720 860 880 860 960 700" stroke="${C.sage300}" stroke-opacity=".14" stroke-width="1.5" stroke-dasharray="1 9"/>
    <path d="M640 470h-12M960 470h12" stroke="${C.sage300}" stroke-opacity=".25"/>
  </g>
  <!-- nodos tutor / menor -->
  <g>
    <circle cx="640" cy="470" r="26" fill="url(#pr-glow)"/>
    <circle cx="640" cy="470" r="10" fill="${C.pine950}" fill-opacity=".7" stroke="${C.sage300}" stroke-opacity=".4"/>
    <circle cx="640" cy="470" r="4.6" fill="${C.sage500}" stroke="none"/>
    <circle cx="960" cy="470" r="30" fill="url(#pr-glow)"/>
    <circle cx="960" cy="470" r="10" fill="${C.pine950}" fill-opacity=".7" stroke="${C.paper}" stroke-opacity=".55"/>
    <circle cx="960" cy="470" r="4.6" fill="${C.paper}" stroke="none"/>
  </g>

  <!-- retícula QR -->
  <g>
    <rect x="697" y="497" width="206" height="206" rx="14" fill="${C.pine950}" fill-opacity=".55" stroke="${C.sage300}" stroke-opacity=".22" stroke-width="1.5"/>
    ${mods.join('\n    ')}
    <g fill="none" stroke="${C.sage300}" stroke-opacity=".32">
      <path d="M689 523v-34h34M911 523v-34h-34M689 677v34h34M911 677v34h-34"/>
    </g>
    <path d="M707 726h186" stroke="${C.sage300}" stroke-opacity=".16"/>
    <path d="M707 722v8M893 722v8" stroke="${C.sage300}" stroke-opacity=".16"/>
  </g>

  <!-- líneas de asentimiento -->
  <g fill="none" stroke="${C.sage300}" stroke-opacity=".34" stroke-dasharray="1 6" stroke-linecap="round">
    <path d="M642 600h48M910 600h48"/>
  </g>
  <g fill="${C.sage300}" stroke="none" fill-opacity=".35">
    <circle cx="638" cy="600" r="2.4"/><circle cx="914" cy="600" r="2.4"/>
  </g>

  <!-- tira de consentimiento -->
  <g>
    <rect x="628" y="812" width="344" height="86" rx="14" fill="${C.pine900}" fill-opacity=".45" stroke="${C.sage300}" stroke-opacity=".14"/>
    <g fill="${C.sage300}">
      <circle cx="654" cy="842" r="3" fill-opacity=".5"/>
      <rect x="668" y="839" width="78" height="5" rx="2.5" fill-opacity=".24"/>
      <circle cx="654" cy="866" r="2.2" fill-opacity=".26"/>
      <rect x="668" y="864" width="120" height="4" rx="2" fill-opacity=".14"/>
    </g>
    <rect x="812" y="836" width="66" height="20" rx="10" fill="none" stroke="${C.sage300}" stroke-opacity=".22"/>
    <rect x="888" y="836" width="58" height="20" rx="10" fill="none" stroke="${C.sage300}" stroke-opacity=".14"/>
    <path d="M812 878h134" stroke="${C.sage300}" stroke-opacity=".12"/>
    ${lock(920, 870, 26, { sOp: '.5' })}
  </g>

  <!-- fragmentos -->
  <g fill="none" stroke="${C.sage300}" stroke-opacity=".14">
    <rect x="320" y="760" width="10" height="10" rx="2"/>
    <rect x="348" y="792" width="7" height="7" rx="1.5"/>
    <rect x="1236" y="390" width="9" height="9" rx="2"/>
    <rect x="1214" y="356" width="6" height="6" rx="1"/>
  </g>

  <!-- medición y anclas -->
  ${hBracket(440, 1160, 928, 0.12)}
  ${vBracket(1252, 410, 760, 0.11)}
  ${cross(360, 330, 5, 0.14)}
  ${cross(1240, 300, 5, 0.12)}
  ${marks(p)}${signature(1498, 1094, 24, 0.35)}`;

  return wrap('IA Guardian — dos voluntades', p, body, extra);
}

/* ─────────────────────────────────────────────────────────────
   04 · AGENT — el agente
   ───────────────────────────────────────────────────────────── */
function agent() {
  const p = 'ag';
  const extra = `
    <linearGradient id="ag-floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.sage500}" stop-opacity=".1"/>
      <stop offset="1" stop-color="${C.sage500}" stop-opacity="0"/>
    </linearGradient>`;

  const gates = [110, 210, 310].map((a) => {
    const [x1, y1] = pt(800, 585, 252, a);
    const [x2, y2] = pt(800, 585, 276, a);
    return `<path d="M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}"/>`;
  });

  const chip = (x, y, rot = 0, op = 0.26) => `
    <g transform="rotate(${rot} ${x + 80} ${y + 46})">
      <rect x="${x}" y="${y}" width="160" height="92" rx="12" fill="${C.pine900}" fill-opacity=".5" stroke="${C.sage300}" stroke-opacity="${op}"/>
      <rect x="${x + 16}" y="${y + 18}" width="12" height="12" rx="3" fill="none" stroke="${C.sage300}" stroke-opacity="${op * 1.3}"/>
      <rect x="${x + 38}" y="${y + 21}" width="62" height="4" rx="2" fill="${C.sage300}" fill-opacity="${op * 1.1}"/>
      <rect x="${x + 16}" y="${y + 44}" width="90" height="4" rx="2" fill="${C.sage300}" fill-opacity="${op * 0.7}"/>
      <rect x="${x + 16}" y="${y + 56}" width="54" height="3" rx="1.5" fill="${C.sage300}" fill-opacity="${op * 0.4}"/>
      <rect x="${x + 112}" y="${y + 66}" width="30" height="10" rx="5" fill="none" stroke="${C.sage300}" stroke-opacity="${op * 0.8}"/>
      <circle cx="${x + 96}" cy="${y + 24}" r="2.4" fill="${C.sage500}" fill-opacity=".7"/>
    </g>`;

  const body = `${base(p, [[800, 560, 480], [800, 585, 320]])}
  ${starfield(p, 11)}
  ${ghostCard(300, 250, 190, 250, { op: 0.06 })}
  ${ghostCard(1130, 760, 210, 220, { op: 0.06 })}

  <!-- suelo -->
  <ellipse cx="800" cy="900" rx="270" ry="48" fill="url(#ag-floor)"/>
  <path d="M540 900H1060" stroke="${C.sage300}" stroke-opacity=".13"/>
  <path d="M600 930H1000" stroke="${C.sage300}" stroke-opacity=".07"/>
  <g stroke="${C.sage300}" stroke-opacity=".12">
    <path d="M580 894v12M800 898v14M1020 894v12"/>
  </g>

  <!-- anillos de permisos -->
  <g fill="none">
    <circle cx="800" cy="585" r="215" stroke="${C.sage300}" stroke-opacity=".28" stroke-dasharray="1 8"/>
    <path d="${arc(800, 585, 272, 85, 400)}" stroke="${C.sage300}" stroke-opacity=".38" stroke-width="1.5"/>
    <g stroke="${C.sage300}" stroke-opacity=".34">${gates.join('')}</g>
    <circle cx="800" cy="585" r="330" stroke="${C.sage300}" stroke-opacity=".16" stroke-dasharray="1 12"/>
    <circle cx="800" cy="585" r="392" stroke="${C.sage300}" stroke-opacity=".06"/>
    <g stroke="${C.sage300}" stroke-opacity=".1">
      ${Array.from({ length: 24 }, (_, i) => {
        const a = i * 15;
        const [x1, y1] = pt(800, 585, 338, a);
        const [x2, y2] = pt(800, 585, 348, a);
        return `<path d="M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}"/>`;
      }).join('')}
    </g>
  </g>
  <!-- nodos de permiso -->
  <g>
    ${[110, 210, 310]
      .map((a) => {
        const [x, y] = pt(800, 585, 272, a);
        return `<circle cx="${n(x)}" cy="${n(y)}" r="4.4" fill="${C.sage500}" fill-opacity=".9" stroke="none"/>
        <circle cx="${n(x)}" cy="${n(y)}" r="11" fill="none" stroke="${C.sage300}" stroke-opacity=".28"/>`;
      })
      .join('')}
    <circle cx="800" cy="253" r="3" fill="${C.sage300}" fill-opacity=".4" stroke="none"/>
    <circle cx="1067" cy="668" r="2.4" fill="${C.sage300}" fill-opacity=".3" stroke="none"/>
  </g>

  <!-- pulsos -->
  <g fill="none" stroke-linecap="round">
    <path d="${arc(800, 400, 62, 202, 338)}" stroke="${C.sage300}" stroke-opacity=".5" stroke-width="1.5"/>
    <path d="${arc(800, 400, 96, 206, 334)}" stroke="${C.sage300}" stroke-opacity=".32" stroke-width="1.5"/>
    <path d="${arc(800, 400, 130, 210, 330)}" stroke="${C.sage300}" stroke-opacity=".18" stroke-width="1.5"/>
  </g>
  <circle cx="800" cy="338" r="2.8" fill="${C.paper}" fill-opacity=".85" stroke="none"/>
  <g stroke="${C.sage300}" stroke-opacity=".2" stroke-dasharray="1 7" stroke-linecap="round">
    <path d="M744 370v-58M856 370v-40"/>
  </g>
  <g fill="${C.sage300}" stroke="none" fill-opacity=".45">
    <circle cx="744" cy="312" r="2.4"/><circle cx="856" cy="330" r="2.4"/>
  </g>

  <!-- tarjetas de permiso -->
  ${chip(492, 500, -2, 0.26)}
  ${chip(948, 636, 2, 0.22)}
  <path d="M652 560l48 -18" stroke="${C.sage300}" stroke-opacity=".18" stroke-dasharray="1 6"/>
  <path d="M948 690l-82 30" stroke="${C.sage300}" stroke-opacity=".16" stroke-dasharray="1 6"/>
  <circle cx="703" cy="541" r="2.2" fill="${C.sage300}" fill-opacity=".4"/>
  <circle cx="864" cy="721" r="2.2" fill="${C.sage300}" fill-opacity=".4"/>

  <!-- teléfono -->
  <g filter="url(#ag-shadow)">
    <rect x="695" y="400" width="210" height="370" rx="32" fill="${C.pine800}" stroke="${C.sage300}" stroke-opacity=".52" stroke-width="2"/>
  </g>
  <rect x="703" y="408" width="194" height="354" rx="25" fill="${C.pine950}" stroke="${C.sage300}" stroke-opacity=".1"/>
  <!-- pantalla -->
  <circle cx="800" cy="500" r="92" fill="url(#ag-glow-soft)"/>
  <rect x="733" y="438" width="94" height="5" rx="2.5" fill="${C.sage300}" fill-opacity=".38"/>
  <rect x="733" y="450" width="56" height="4" rx="2" fill="${C.sage300}" fill-opacity=".14"/>
  <circle cx="864" cy="442" r="2.6" fill="${C.sage300}" fill-opacity=".4"/>
  ${lock(800, 535, 76)}
  <g fill="${C.sage300}">
    <rect x="733" y="628" width="10" height="10" rx="2.5" fill-opacity=".2"/>
    <rect x="753" y="630" width="104" height="4" rx="2" fill-opacity=".28"/>
    <rect x="733" y="656" width="10" height="10" rx="2.5" fill-opacity=".14"/>
    <rect x="753" y="658" width="82" height="4" rx="2" fill-opacity=".2"/>
    <rect x="733" y="684" width="10" height="10" rx="2.5" fill-opacity=".1"/>
    <rect x="753" y="686" width="64" height="4" rx="2" fill-opacity=".14"/>
  </g>
  <rect x="733" y="712" width="72" height="18" rx="9" fill="none" stroke="${C.sage300}" stroke-opacity=".24"/>
  <rect x="818" y="712" width="54" height="18" rx="9" fill="none" stroke="${C.sage300}" stroke-opacity=".14"/>
  <!-- carcasa -->
  <rect x="776" y="414" width="48" height="4" rx="2" fill="${C.sage300}" fill-opacity=".26"/>
  <rect x="780" y="742" width="40" height="3" rx="1.5" fill="${C.sage300}" fill-opacity=".2"/>
  <path d="M695 470h-5v44M905 470h5v44" stroke="${C.sage300}" stroke-opacity=".2" stroke-width="3" stroke-linecap="round"/>

  <!-- medición y anclas -->
  ${hBracket(560, 1040, 948, 0.12)}
  ${vBracket(1134, 400, 770, 0.11)}
  ${cross(520, 300, 5, 0.14)}
  ${cross(1090, 320, 5, 0.12)}
  ${cross(520, 860, 5, 0.11)}
  ${marks(p)}${signature(1498, 1094, 24, 0.35)}`;

  return wrap('IA Guardian — el agente', p, body, extra);
}

/* ─────────────────────────────────────────────────────────────
   05 · SIGNALS — la conversación no sale
   ───────────────────────────────────────────────────────────── */
function signals() {
  const p = 's';
  const extra = `
    <radialGradient id="s-halo-warm" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${C.amber}" stop-opacity=".18"/>
      <stop offset=".5" stop-color="${C.amber}" stop-opacity=".07"/>
      <stop offset="1" stop-color="${C.amber}" stop-opacity="0"/>
    </radialGradient>`;

  const bars = [
    { x: 1090, h: 108 },
    { x: 1122, h: 68 },
    { x: 1154, h: 156 },
    { x: 1186, h: 92 },
    { x: 1218, h: 54 },
  ];

  const body = `${base(p, [[600, 565, 470], [540, 565, 320]])}
  ${starfield(p, 13)}
  ${ghostCard(250, 300, 190, 230, { op: 0.06 })}
  ${ghostCard(1120, 250, 200, 210, { op: 0.05 })}

  <!-- límite de lo que no sale -->
  <g fill="none" stroke-linecap="round">
    <path d="${arc(435, 565, 260, 7, 353)}" stroke="${C.sage300}" stroke-opacity=".32" stroke-width="1.5" stroke-dasharray="1 10"/>
    <g stroke="${C.sage300}" stroke-opacity=".26">
      <path d="M695 598l10 6M695 532l10-6"/>
        ${[45, 135, 225, 315]
          .map((a) => {
            const [x1, y1] = pt(435, 565, 250, a);
            const [x2, y2] = pt(435, 565, 270, a);
            return `<path d="M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}"/>`;
          })
          .join('')}
    </g>
    <!-- umbral ámbar -->
    <circle cx="696" cy="531" r="34" fill="url(#s-halo-warm)" stroke="none"/>
    <circle cx="696" cy="531" r="13" fill="none" stroke="${C.amber}" stroke-opacity=".45"/>
    <circle cx="696" cy="531" r="4" fill="${C.amber}" stroke="none"/>
  </g>

  <!-- teléfono -->
  <g filter="url(#s-shadow-lite)">
    <rect x="330" y="380" width="210" height="370" rx="31" fill="${C.pine800}" stroke="${C.sage300}" stroke-opacity=".5" stroke-width="2"/>
  </g>
  <rect x="338" y="388" width="194" height="354" rx="24" fill="${C.pine950}" stroke="${C.sage300}" stroke-opacity=".1"/>
  <!-- pantalla: conversación retenida -->
  <circle cx="435" cy="436" r="80" fill="url(#s-glow-soft)"/>
  <rect x="356" y="420" width="150" height="42" rx="9" fill="${C.pine800}" fill-opacity=".38" stroke="${C.sage300}" stroke-opacity=".14"/>
  <rect x="368" y="432" width="96" height="5" rx="2.5" fill="${C.sage300}" fill-opacity=".28"/>
  <rect x="368" y="444" width="58" height="3" rx="1.5" fill="${C.sage300}" fill-opacity=".13"/>
  <rect x="356" y="472" width="116" height="36" rx="9" fill="${C.pine800}" fill-opacity=".28" stroke="${C.sage300}" stroke-opacity=".1"/>
  <rect x="368" y="484" width="66" height="4" rx="2" fill="${C.sage300}" fill-opacity=".2"/>
  <rect x="368" y="494" width="40" height="3" rx="1.5" fill="${C.sage300}" fill-opacity=".1"/>
  <g fill="${C.sage300}" fill-opacity=".18">
    <circle cx="366" cy="530" r="3"/><circle cx="382" cy="530" r="3"/><circle cx="398" cy="530" r="3"/>
    <circle cx="414" cy="530" r="3"/><circle cx="430" cy="530" r="3"/>
  </g>
  <!-- corte: el texto se descarta -->
  <g stroke="${C.sage300}" stroke-opacity=".2" stroke-dasharray="2 7">
    <path d="M356 566h66M452 566h58"/>
  </g>
  <path d="M438 558v16M424 558v16" stroke="${C.sage300}" stroke-opacity=".26"/>
  <rect x="356" y="592" width="74" height="5" rx="2.5" fill="${C.sage300}" fill-opacity=".16"/>
  <rect x="356" y="606" width="46" height="4" rx="2" fill="${C.sage300}" fill-opacity=".09"/>
  <rect x="356" y="706" width="58" height="4" rx="2" fill="${C.sage300}" fill-opacity=".12"/>
  <rect x="356" y="646" width="124" height="44" rx="9" fill="${C.pine800}" fill-opacity=".22" stroke="${C.sage300}" stroke-opacity=".08"/>
  <rect x="368" y="658" width="56" height="4" rx="2" fill="${C.sage300}" fill-opacity=".14"/>
  <rect x="368" y="670" width="84" height="3" rx="1.5" fill="${C.sage300}" fill-opacity=".08"/>
  <rect x="492" y="664" width="8" height="8" rx="2" fill="${C.sage300}" fill-opacity=".14"/>
  <rect x="466" y="414" width="48" height="4" rx="2" fill="${C.sage300}" fill-opacity=".26"/>
  <rect x="480" y="742" width="40" height="3" rx="1.5" fill="${C.sage300}" fill-opacity=".2"/>
  <path d="M330 470h-5v40M540 470h5v40" stroke="${C.sage300}" stroke-opacity=".2" stroke-width="3" stroke-linecap="round"/>

  <!-- arcos -->
  <g fill="none" stroke-linecap="round">
    <path d="${arc(540, 565, 60, -52, 52)}" stroke="${C.sage300}" stroke-opacity=".55" stroke-width="1.5"/>
    <path d="${arc(540, 565, 105, -52, 52)}" stroke="${C.sage300}" stroke-opacity=".4" stroke-width="1.5"/>
    <path d="${arc(540, 565, 150, -52, 52)}" stroke="${C.sage300}" stroke-opacity=".26" stroke-width="1.5"/>
    <path d="${arc(540, 565, 195, -52, 52)}" stroke="${C.sage300}" stroke-opacity=".16" stroke-width="1.5"/>
  </g>

  <!-- vector que sale -->
  <g fill="none" stroke-linecap="round">
    <path d="M575 565H966" stroke="${C.paper}" stroke-opacity=".9" stroke-width="2.4"/>
    <path d="M956 553l14 12-14 12" stroke="${C.paper}" stroke-opacity=".9" stroke-width="2"/>
    <path d="M986 565h22" stroke="${C.paper}" stroke-opacity=".55" stroke-width="2" stroke-dasharray="6 8"/>
  </g>
  <g fill="${C.sage300}" stroke="none">
    <circle cx="1024" cy="573" r="2.6" fill-opacity=".55"/>
    <circle cx="1042" cy="585" r="2.2" fill-opacity=".45"/>
    <circle cx="1058" cy="601" r="3" fill-opacity=".6"/>
    <circle cx="1074" cy="617" r="2.4" fill-opacity=".4"/>
  </g>
  <circle cx="1024" cy="573" r="8" fill="none" stroke="${C.sage300}" stroke-opacity=".2"/>
  <circle cx="1082" cy="629" r="3.6" fill="${C.paper}" fill-opacity=".8" stroke="none"/>

  <!-- vector derivado: barras -->
  <g>
    <path d="M1072 706H1248" stroke="${C.sage300}" stroke-opacity=".22"/>
    <g stroke="${C.sage300}" stroke-opacity=".16">
      <path d="M1072 700v12M1248 700v12"/>
    </g>
    ${bars
      .map(
        (b) =>
          `<rect x="${b.x}" y="${706 - b.h}" width="16" height="${b.h}" fill="${C.sage300}" fill-opacity="${b.h === 156 ? '.32' : '.16'}" stroke="none"/>`,
      )
      .join('\n    ')}
    <rect x="1154" y="${706 - 156 - 5}" width="16" height="3" fill="${C.paper}" fill-opacity=".9" stroke="none"/>
    <path d="M1098 706v-108M1130 706v-68M1162 706v-156M1194 706v-92M1226 706v-54" stroke="${C.sage300}" stroke-opacity=".1" stroke-dasharray="1 5"/>
    <rect x="1072" y="730" width="176" height="4" rx="2" fill="${C.sage300}" fill-opacity=".08"/>
  </g>

  <!-- tarjeta vectorial secundaria -->
  <g>
    <rect x="1056" y="780" width="212" height="126" rx="12" fill="${C.pine900}" fill-opacity=".5" stroke="${C.sage300}" stroke-opacity=".14"/>
    <rect x="1074" y="798" width="64" height="4" rx="2" fill="${C.sage300}" fill-opacity=".22"/>
    <g fill="${C.sage300}">
      ${Array.from({ length: 24 }, (_, i) => {
        const cx = 1080 + (i % 8) * 21;
        const cy = 824 + Math.floor(i / 8) * 20;
        return `<circle cx="${cx}" cy="${cy}" r="${1.4 + ((i * 7) % 3) * 0.6}" fill-opacity="${0.08 + ((i * 5) % 4) * 0.04}"/>`;
      }).join('')}
    </g>
    <rect x="1074" y="884" width="42" height="4" rx="2" fill="${C.sage300}" fill-opacity=".12"/>
    <circle cx="1240" cy="806" r="2.4" fill="${C.sage500}" fill-opacity=".6"/>
  </g>

  <!-- cola bajo el teléfono -->
  <g>
    <rect x="330" y="820" width="150" height="48" rx="10" fill="${C.pine900}" fill-opacity=".4" stroke="${C.sage300}" stroke-opacity=".12"/>
    <rect x="346" y="834" width="52" height="4" rx="2" fill="${C.sage300}" fill-opacity=".2"/>
    <rect x="346" y="846" width="80" height="3" rx="1.5" fill="${C.sage300}" fill-opacity=".1"/>
    <circle cx="456" cy="842" r="2.4" fill="${C.sage300}" fill-opacity=".32"/>
    <rect x="330" y="880" width="110" height="10" rx="5" fill="none" stroke="${C.sage300}" stroke-opacity=".1"/>
    <rect x="450" y="880" width="34" height="10" rx="5" fill="none" stroke="${C.sage300}" stroke-opacity=".07"/>
  </g>

  <!-- fragmentos descartados -->
  <g fill="none" stroke="${C.sage300}" stroke-opacity=".12">
    <rect x="250" y="700" width="8" height="8" rx="1"/>
    <rect x="280" y="732" width="6" height="6" rx="1"/>
    <rect x="306" y="686" width="5" height="5" rx="1"/>
  </g>

  <!-- medición y anclas -->
  ${hBracket(330, 1268, 950, 0.11)}
  ${vBracket(1284, 490, 706, 0.1)}
  ${cross(260, 330, 5, 0.14)}
  ${cross(1250, 330, 5, 0.11)}
  ${cross(260, 900, 5, 0.1)}
  ${marks(p)}${signature(1498, 1094, 24, 0.35)}`;

  return wrap('IA Guardian — la conversación no sale', p, body, extra);
}

/* ─────────────────────────────────────────────────────────────
   06 · PRIVACY — privacidad por diseño
   ───────────────────────────────────────────────────────────── */
function privacy() {
  const p = 'pv';
  const extra = `
    <radialGradient id="pv-dotmask" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#fff" stop-opacity="1"/>
      <stop offset=".52" stop-color="#fff" stop-opacity=".55"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <mask id="pv-dots-mask">
      <rect width="1600" height="1200" fill="url(#pv-dotmask)"/>
    </mask>`;

  const ticks = (cx, cy) => {
    let d = '';
    for (let i = -8; i <= 8; i++) {
      if (i === 0) continue;
      const x = cx + i * 72;
      const len = i % 4 === 0 ? 9 : 4;
      d += `M${x} ${cy - len}v${len * 2}`;
    }
    for (let i = -6; i <= 6; i++) {
      if (i === 0) continue;
      const y = cy + i * 72;
      const len = i % 3 === 0 ? 9 : 4;
      d += `M${cx - len} ${y}h${len * 2}`;
    }
    return d;
  };

  const body = `${base(p, [[800, 560, 620], [812, 470, 340]])}
  ${starfield(p, 17)}
  ${ghostCard(256, 262, 224, 144, { op: 0.07, rot: -3 })}
  ${ghostCard(1128, 806, 246, 158, { op: 0.06, rot: 2 })}

  <!-- campo de puntos -->
  <g>
    <rect width="1600" height="1200" fill="url(#${p}-dots)" mask="url(#${p}-dots-mask)"/>
  </g>

  <!-- retícula de coordenadas -->
  <g fill="none" stroke="${C.sage300}">
    <path d="M800 0V1200M0 570H1600" stroke-opacity=".07" stroke-dasharray="1 14"/>
    <path d="${ticks(800, 570)}" stroke-opacity=".15"/>
    <circle cx="800" cy="570" r="4" fill="${C.sage300}" fill-opacity=".4" stroke="none"/>
    <circle cx="800" cy="570" r="394" stroke-opacity=".07"/>
    <circle cx="800" cy="570" r="436" stroke-opacity=".05" stroke-dasharray="1 16"/>
  </g>

  <!-- órbita mayor -->
  <g transform="translate(800 570) scale(1.22) translate(-800 -570)">
  <g fill="none" stroke-linecap="round">
    <path d="${arc(800, 570, 300, 322, 268 + 360)}" stroke="${C.sage300}" stroke-opacity=".62" stroke-width="1.5"/>
    <path d="${arc(800, 570, 314, 330, 250 + 360)}" stroke="${C.sage300}" stroke-opacity=".12" stroke-dasharray="1 10"/>
    <circle cx="789.5" cy="270.2" r="3" fill="${C.sage300}" stroke="none" fill-opacity=".5"/>
    <!-- órbita menor -->
    <path d="${arc(870, 640, 170, 250, 220 + 360)}" stroke="${C.sage500}" stroke-opacity=".55" stroke-width="1.5"/>
    <circle cx="739.8" cy="530.7" r="2.6" fill="${C.sage300}" stroke="none" fill-opacity=".45"/>
    <!-- radios de medida -->
    <g stroke="${C.sage300}" stroke-opacity=".12">
      <path d="M800 570L1010 640"/>
      <circle cx="800" cy="570" r="228" stroke-opacity=".06" stroke-dasharray="1 14"/>
    </g>
  </g>

  <!-- terminal superior: punto -->
  <g>
    <circle cx="1036" cy="385" r="46" fill="url(#pv-glow-soft)"/>
    <circle cx="1036" cy="385" r="20" fill="none" stroke="${C.sage300}" stroke-opacity=".28"/>
    <circle cx="1036" cy="385" r="9" fill="${C.paper}" fill-opacity=".92" stroke="none"/>
  </g>

  <!-- terminal menor: candado -->
  <g>
    <circle cx="812" cy="478" r="120" fill="url(#pv-glow-soft)" fill-opacity=".6"/>
    <circle cx="812" cy="478" r="92" fill="none" stroke="${C.sage300}" stroke-opacity=".12"/>
    ${lock(812, 478, 96)}
  </g>

  <!-- marcas de medida -->
  <g fill="none" stroke="${C.sage300}" stroke-opacity=".16">
    <path d="M500 570h22M1078 570h22"/>
    <path d="M800 246v18M800 876v18"/>
  </g>
  <g fill="none" stroke="${C.sage300}" stroke-opacity=".12">
    <rect x="1188" y="884" width="26" height="26"/>
    <rect x="1195" y="891" width="12" height="12"/>
  </g>
  <g stroke="${C.sage300}" stroke-opacity=".18">
    <path d="M300 890h40M300 884v12M340 884v12"/>
  </g>
  </g>

  <!-- bloques de datos -->
  <g fill="none" stroke="${C.sage300}" stroke-opacity=".18">
    <rect x="330" y="700" width="18" height="18" rx="3"/>
    <rect x="1250" y="410" width="16" height="16" rx="3"/>
    <rect x="1086" y="900" width="14" height="14" rx="2"/>
  </g>
  <g stroke="${C.sage300}" stroke-opacity=".13" stroke-dasharray="1 7">
    <path d="M348 700L520 606M1250 418L1060 508M1094 900L990 760"/>
  </g>
  <g fill="${C.sage300}" fill-opacity=".3">
    <circle cx="330" cy="700" r="2.4"/><circle cx="1250" cy="410" r="2.2"/><circle cx="1086" cy="900" r="2"/>
  </g>

  <!-- medición y anclas -->
  ${hBracket(560, 1040, 920, 0.12)}
  ${vBracket(1204, 330, 820, 0.1)}
  ${cross(360, 340, 5, 0.14)}
  ${cross(1220, 300, 5, 0.11)}
  ${cross(420, 940, 5, 0.1)}
  ${marks(p)}${signature(1498, 1094, 24, 0.35)}`;

  return wrap('IA Guardian — privacidad por diseño', p, body, extra);
}

/* ─────────────────────────────────────────────────────────────
   07 · AMBIENT — fondo orbital para secciones oscuras (2560×1440)
   ───────────────────────────────────────────────────────────── */
function ambient() {
  const p = 'am';
  const W = 2560;
  const H = 1440;
  const extra = `
    <radialGradient id="am-bg" cx="50%" cy="46%" r="72%">
      <stop offset="0" stop-color="${C.pine900}"/>
      <stop offset="1" stop-color="${C.pine950}"/>
    </radialGradient>
    <radialGradient id="am-halo" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${C.sage500}" stop-opacity=".1"/>
      <stop offset=".55" stop-color="${C.sage500}" stop-opacity=".04"/>
      <stop offset="1" stop-color="${C.sage500}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="am-star-fade" cx="50%" cy="46%" r="66%">
      <stop offset="0" stop-color="#fff" stop-opacity=".18"/>
      <stop offset=".55" stop-color="#fff" stop-opacity=".5"/>
      <stop offset="1" stop-color="#fff" stop-opacity="1"/>
    </radialGradient>
    <mask id="am-star-mask"><rect width="${W}" height="${H}" fill="url(#am-star-fade)"/></mask>
    <pattern id="am-grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0H0V64" fill="none" stroke="${C.sage300}" stroke-width="1.4" opacity=".035"/>
    </pattern>
    <pattern id="am-grid-major" width="320" height="320" patternUnits="userSpaceOnUse">
      <path d="M320 0H0V320" fill="none" stroke="${C.sage300}" stroke-width="1.4" opacity=".05"/>
    </pattern>`;

  const body = `
  <!-- fondo -->
  <rect width="${W}" height="${H}" fill="url(#am-bg)"/>
  <rect width="${W}" height="${H}" fill="url(#am-grid-major)"/>
  <rect width="${W}" height="${H}" fill="url(#am-grid)"/>
  <circle cx="1320" cy="700" r="980" fill="url(#am-halo)"/>

  ${starfield(p, 23, { x: 120, y: 80, w: 2320, h: 1280, cols: 22, rows: 13, skip: 0.5, links: 14, op: 0.22, ds: 1.7 })}

  <!-- órbitas -->
  <g transform="rotate(-14 1500 760)" fill="none">
    <ellipse cx="1500" cy="760" rx="1150" ry="600" stroke="${C.sage300}" stroke-opacity=".13" stroke-width="2"/>
    <ellipse cx="1500" cy="760" rx="1182" ry="620" stroke="${C.sage300}" stroke-opacity=".06" stroke-dasharray="2 18"/>
    <path d="M318 760A1150 600 0 0 0 2682 760" stroke="${C.sage300}" stroke-opacity=".18" stroke-width="2.5"/>
    <circle cx="2270" cy="1100" r="5" fill="${C.sage500}" fill-opacity=".75" stroke="none"/>
    <circle cx="2270" cy="1100" r="14" stroke="${C.sage300}" stroke-opacity=".22"/>
    <circle cx="700" cy="430" r="3.4" fill="${C.sage300}" fill-opacity=".4" stroke="none"/>
  </g>
  <g transform="rotate(16 900 520)" fill="none">
    <ellipse cx="900" cy="520" rx="760" ry="380" stroke="${C.sage300}" stroke-opacity=".08" stroke-width="1.5"/>
    <ellipse cx="900" cy="520" rx="800" ry="402" stroke="${C.sage300}" stroke-opacity=".04" stroke-dasharray="2 16"/>
  </g>
  <circle cx="1280" cy="720" r="960" fill="none" stroke="${C.sage300}" stroke-opacity=".05"/>
  <circle cx="1280" cy="720" r="700" fill="none" stroke="${C.sage300}" stroke-opacity=".035" stroke-dasharray="1 18"/>

  <!-- tarjetas fantasma -->
  ${ghostCard(250, 250, 330, 200, { op: 0.12, rot: -3, r: 20 })}
  ${ghostCard(2020, 300, 310, 190, { op: 0.11, rot: 3, r: 20 })}
  ${ghostCard(1840, 1080, 320, 200, { op: 0.1, rot: -2, r: 20 })}
  ${ghostCard(620, 1080, 280, 170, { op: 0.09, rot: 2, r: 18 })}
  ${ghostCard(1180, 180, 240, 140, { op: 0.07, rot: 0, r: 16 })}

  <!-- trazas y señales -->
  <g fill="none" stroke="${C.sage300}" stroke-linecap="round">
    <path d="M170 420H420V640H690" stroke-opacity=".18" stroke-width="1.5"/>
    <path d="M690 640V820H980" stroke-opacity=".12" stroke-width="1.5" stroke-dasharray="2 12"/>
    <path d="M1420 260H1700V180H1980" stroke-opacity=".16" stroke-width="1.5" stroke-dasharray="2 12"/>
    <path d="M2180 880H2380V1040" stroke-opacity=".16" stroke-width="1.5"/>
    <path d="M1600 1180H1880V1300" stroke-opacity=".1" stroke-width="1.5" stroke-dasharray="2 12"/>
  </g>
  <g fill="${C.pine950}" stroke="${C.sage300}" stroke-opacity=".2">
    <circle cx="170" cy="420" r="4.5"/>
    <circle cx="690" cy="640" r="4"/>
    <circle cx="1420" cy="260" r="4"/>
    <circle cx="2180" cy="880" r="4"/>
    <circle cx="1880" cy="1300" r="3.5"/>
  </g>

  <!-- regla inferior -->
  <g stroke="${C.sage300}" stroke-opacity=".1">
    <path d="M220 1300H2340"/>
    <path d="M220 1294v12M1400 1294v12M2340 1294v12"/>
    ${Array.from({ length: 13 }, (_, i) => {
      const x = 220 + i * 160;
      return `<path d="M${x} 1297v6"/>`;
    }).join('')}
    ${Array.from({ length: 6 }, (_, i) => {
      const x = 380 + i * 320;
      return `<path d="M${x} 1292v16"/>`;
    }).join('')}
  </g>
  <g stroke="${C.sage300}" stroke-opacity=".1">
    <path d="M2380 320v780M2374 320h12M2374 1100h12"/>
  </g>

  <!-- cruces de referencia -->
  <g stroke="${C.sage300}" stroke-opacity=".14">
    <path d="M760 400h24M772 388v24M1740 980h24M1752 968v24M2060 150h20M2070 140v20M360 940h20M370 930v20"/>
  </g>

  <!-- marcas de registro -->
  <g fill="none" stroke="${C.sage300}" stroke-width="1.4" stroke-opacity=".22">
    <path d="M64 104V64h40M2496 104V64h-40M64 1336v40h40M2496 1336v40h-40"/>
    <circle cx="64" cy="64" r="2" fill="${C.sage300}" stroke="none" fill-opacity=".4"/>
    <circle cx="2496" cy="64" r="2" fill="${C.sage300}" stroke="none" fill-opacity=".4"/>
    <circle cx="64" cy="1376" r="2" fill="${C.sage300}" stroke="none" fill-opacity=".4"/>
    <circle cx="2496" cy="1376" r="2" fill="${C.sage300}" stroke="none" fill-opacity=".4"/>
  </g>
  ${signature(2470, 1322, 38, 0.3)}`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="am-title">
  <title id="am-title">IA Guardian — fondo orbital</title>
  <defs>${extra}</defs>
${body}
</svg>
`;
}

const files = {
  'panel.svg': panel(),
  'alerts.svg': alerts(),
  'pairing.svg': pairing(),
  'agent.svg': agent(),
  'signals.svg': signals(),
  'privacy.svg': privacy(),
  'ambient.svg': ambient(),
};

for (const [name, svg] of Object.entries(files)) {
  const file = path.join(OUT, name);
  fs.writeFileSync(file, svg, 'utf8');
  console.log(name.padEnd(12), `${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB`);
}
