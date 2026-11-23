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
    <linearGradient id="${p}-fade-x" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${C.sage300}" stop-opacity="0"/>
      <stop offset=".5" stop-color="${C.sage300}" stop-opacity=".55"/>
      <stop offset="1" stop-color="${C.sage300}" stop-opacity="0"/>
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
function marks(p) {
  const ins = 52;
  const arm = 24;
  const corners = [
    [ins, ins, 1, 1],
    [1600 - ins, ins, -1, 1],
    [ins, 1200 - ins, 1, -1],
    [1600 - ins, 1200 - ins, -1, -1],
  ];
  const g = corners
    .map(
      ([x, y, dx, dy]) =>
        `<path d="M${x} ${y + dy * arm}V${y}H${x + dx * arm}"/>` +
        `<circle cx="${x}" cy="${y}" r="1.7" fill="${C.sage300}" stroke="none" fill-opacity=".45"/>`,
    )
    .join('');
  return `
  <!-- marcas de registro -->
  <g fill="none" stroke="${C.sage300}" stroke-width="1" stroke-opacity=".3">${g}</g>
  <g stroke="${C.sage300}" stroke-width="1" stroke-opacity=".18">
    <path d="M800 40v14M800 1146v14M40 600h14M1546 600h14"/>
    <path d="M52 400h8M52 800h8M1540 400h8M1540 800h8M400 52v8M1200 52v8M400 1148v8M1200 1148v8"/>
  </g>
  <g stroke="${C.sage300}" stroke-width="1" stroke-opacity=".1">
    <path d="M148 96h32M1420 96h32M148 1104h32M1420 1104h32"/>
  </g>`;
}

/** Firma de autor: glifo de Vínculo, 24 px, 35 %. */
function signature(p) {
  return `
  <!-- firma: Vínculo 24 px -->
  <g transform="translate(1498 1094) scale(0.09375)" opacity=".35">
    <circle cx="128" cy="128" r="88" fill="none" stroke="${C.sage300}" stroke-width="26"
            stroke-dasharray="414 139" transform="rotate(-45 128 128)"/>
    <circle cx="140" cy="140" r="48" fill="none" stroke="${C.sage500}" stroke-width="26"
            stroke-dasharray="226 76" transform="rotate(135 140 140)"/>
    <circle cx="102" cy="102" r="14" fill="${C.sage300}"/>
    <circle cx="226" cy="226" r="12" fill="${C.sage300}"/>
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
    <linearGradient id="p-fade-y" gradientUnits="userSpaceOnUse" x1="0" y1="660" x2="0" y2="1035">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset=".22" stop-color="#fff" stop-opacity="1"/>
      <stop offset=".72" stop-color="#fff" stop-opacity=".85"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <mask id="p-floor-mask"><rect x="0" y="660" width="1600" height="380" fill="url(#p-fade-y)"/></mask>
    <linearGradient id="p-area" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.sage300}" stop-opacity=".16"/>
      <stop offset="1" stop-color="${C.sage300}" stop-opacity="0"/>
    </linearGradient>`;

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

  <!-- conexión tarjeta / métricas -->
  <path d="M1006 388h20" stroke="${C.sage300}" stroke-opacity=".22" stroke-dasharray="1 5" stroke-linecap="round"/>
  <circle cx="1026" cy="388" r="2.4" fill="${C.sage300}" fill-opacity=".45" stroke="none"/>
  <path d="M800 578v106" stroke="${C.sage300}" stroke-opacity=".16" stroke-dasharray="1 6" stroke-linecap="round"/>

  <!-- órbita: mitad delantera -->
  <g transform="rotate(-14 880 540)" fill="none">
    <path d="M460 540A420 150 0 0 0 1300 540" stroke="${C.sage300}" stroke-opacity=".3" stroke-width="1.5"/>
    <path d="M583 646A420 150 0 0 0 771.3 684.9" stroke="${C.sage300}" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>
  </g>
  ${marks(p)}${signature(p)}`;

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
  <!-- traza de reglas -->
  <g fill="none" stroke="${C.sage300}" stroke-linecap="square">
    <path d="M252 930H336V740" stroke-opacity=".34" stroke-width="1.5"/>
    <path d="M336 740H420" stroke-opacity=".3" stroke-width="1.5" stroke-dasharray="1 6"/>
    <path d="M420 740H1120V520H1292V356" stroke-opacity=".34" stroke-width="1.5"/>
    <path d="M1120 740H1256V846" stroke-opacity=".3" stroke-width="1.5"/>
    <path d="M1256 846v34" stroke-opacity=".22" stroke-width="1.5" stroke-dasharray="1 6"/>
    <!-- derivaciones cortas -->
    <path d="M229 930v26M1117 700h26M1064 520h56M1292 334v-22" stroke-opacity=".14"/>
  </g>
  <g fill="${C.pine950}" stroke="${C.sage300}">
    <circle cx="252" cy="930" r="5" stroke-opacity=".5"/>
    <circle cx="336" cy="740" r="4" stroke-opacity=".4"/>
    <circle cx="1120" cy="740" r="5" stroke-opacity=".5"/>
    <circle cx="1256" cy="846" r="4" stroke-opacity=".35"/>
  </g>
  <g fill="${C.sage500}" stroke="none">
    <circle cx="1120" cy="520" r="3.4" fill-opacity=".8"/>
    <circle cx="1120" cy="740" r="2.2" fill-opacity=".9"/>
  </g>
  <g fill="none" stroke="${C.sage300}">
    <circle cx="1292" cy="356" r="14" stroke-opacity=".3"/>
    <circle cx="1292" cy="356" r="4" fill="${C.paper}" fill-opacity=".9" stroke="none"/>
    <rect x="1030" y="734" width="12" height="12" stroke-opacity=".24"/>
  </g>
  <!-- bus: marcas sobre la traza -->
  <g stroke="${C.sage300}" stroke-opacity=".11">
    <path d="M460 734v12M500 734v12M540 734v12M580 734v12M620 734v12M660 734v12M700 734v12M740 734v12"/>
  </g>

  <!-- tarjetas en cola -->
  <rect x="500" y="316" width="568" height="344" rx="22" fill="none" stroke="${C.sage300}" stroke-opacity=".07" stroke-dasharray="2 6"/>
  <rect x="472" y="336" width="568" height="344" rx="22" fill="none" stroke="${C.sage300}" stroke-opacity=".11"/>

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

  <!-- marcas sueltas -->
  <g stroke="${C.sage300}" stroke-opacity=".18">
    <path d="M336 470h14M336 486h8M330 470v16"/>
    <path d="M1330 690h18M1330 706h10"/>
  </g>
  <g fill="none" stroke="${C.sage300}" stroke-opacity=".16">
    <rect x="1318" y="470" width="22" height="22" rx="3"/>
    <rect x="1324" y="476" width="10" height="10" rx="2"/>
  </g>
  ${marks(p)}${signature(p)}`;

  return wrap('IA Guardian — señales explicadas', p, body, extra);
}

/* ─────────────────────────────────────────────────────────────
   03 · PAIRING — dos voluntades
   ───────────────────────────────────────────────────────────── */
function pairing() {
  const p = 'pr';
  const extra = `
    <radialGradient id="pr-band" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${C.sage300}" stop-opacity=".09"/>
      <stop offset=".55" stop-color="${C.sage300}" stop-opacity=".04"/>
      <stop offset="1" stop-color="${C.sage300}" stop-opacity="0"/>
    </radialGradient>`;

  const qr = [
    [1, 1, 0, 0, 1],
    [1, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 1],
    [1, 0, 0, 1, 1],
  ];
  const qx = 722;
  const qy = 522;
  const cell = 28;
  const gap = 4;
  const mods = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const x = qx + c * (cell + gap);
      const y = qy + r * (cell + gap);
      mods.push(
        qr[r][c]
          ? `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="2.5" fill="${C.sage300}" fill-opacity=".58" stroke="none"/>`
          : `<rect x="${x + 0.5}" y="${y + 0.5}" width="${cell - 1}" height="${cell - 1}" rx="2" fill="none" stroke="${C.sage300}" stroke-opacity=".16"/>`,
      );
    }
  }

  const phone = (x, y, rot, cxp, cyp, side) => `
  <g transform="rotate(${rot} ${cxp} ${cyp})">
    <g filter="url(#pr-shadow-lite)">
      <rect x="${x}" y="${y}" width="188" height="556" rx="30" fill="${C.pine800}" fill-opacity=".95" stroke="${C.sage300}" stroke-opacity=".5" stroke-width="2"/>
    </g>
    <rect x="${x + 9}" y="${y + 9}" width="170" height="538" rx="22" fill="${C.pine950}" fill-opacity=".92" stroke="${C.sage300}" stroke-opacity=".12"/>
    <rect x="${x + 52}" y="${y + 14}" width="44" height="4" rx="2" fill="${C.sage300}" stroke="none" fill-opacity=".3"/>
    <rect x="${x + 64}" y="${y + 532}" width="40" height="3" rx="1.5" fill="${C.sage300}" stroke="none" fill-opacity=".22"/>
    <rect x="${side === 'left' ? x - 6 : x + 184}" y="${y + 210}" width="5" height="44" rx="2.5" fill="${C.sage300}" fill-opacity=".16" stroke="none"/>
    <path d="M${side === 'left' ? x + 181 : x + 7} ${y + 34}v488" stroke="${C.sage300}" stroke-opacity=".26" stroke-width="2"/>
  </g>`;

  const body = `${base(p, [[800, 590, 470], [800, 590, 300]])}
  <!-- columna de asentimiento -->
  <ellipse cx="800" cy="590" rx="196" ry="316" fill="url(#pr-band)"/>

  <!-- teléfonos -->
  ${phone(406, 322, 6, 500, 600, 'left')}
  ${phone(1006, 322, -6, 1100, 600, 'right')}

  <!-- arco superior -->
  <g fill="none" stroke-linecap="round">
    <path d="M608 468C690 292 910 292 992 468" stroke="${C.sage300}" stroke-opacity=".5" stroke-width="1.5" stroke-dasharray="1 9"/>
    <path d="M608 732C690 908 910 908 992 732" stroke="${C.sage300}" stroke-opacity=".13" stroke-width="1.5" stroke-dasharray="1 9"/>
    <path d="M608 468h-14M992 468h14" stroke="${C.sage300}" stroke-opacity=".25"/>
  </g>
  <!-- nodos tutor / menor -->
  <g>
    <circle cx="608" cy="468" r="26" fill="url(#pr-glow)"/>
    <circle cx="608" cy="468" r="10" fill="${C.pine950}" fill-opacity=".7" stroke="${C.sage300}" stroke-opacity=".4"/>
    <circle cx="608" cy="468" r="4.6" fill="${C.sage500}" stroke="none"/>
    <circle cx="992" cy="468" r="30" fill="url(#pr-glow)"/>
    <circle cx="992" cy="468" r="10" fill="${C.pine950}" fill-opacity=".7" stroke="${C.paper}" stroke-opacity=".55"/>
    <circle cx="992" cy="468" r="4.6" fill="${C.paper}" stroke="none"/>
  </g>

  <!-- retícula QR -->
  <g>
    <rect x="714" y="514" width="172" height="172" rx="12" fill="${C.pine950}" fill-opacity=".55" stroke="${C.sage300}" stroke-opacity=".22" stroke-width="1.5"/>
    ${mods.join('\n    ')}
    <g fill="none" stroke="${C.sage300}" stroke-opacity=".3">
      <path d="M706 538v-32h32M894 538v-32h-32M706 662v32h32M894 662v32h-32"/>
    </g>
    <path d="M722 712h156" stroke="${C.sage300}" stroke-opacity=".16"/>
    <path d="M722 708v8M878 708v8" stroke="${C.sage300}" stroke-opacity=".16"/>
  </g>

  <!-- líneas de asentimiento -->
  <g fill="none" stroke="${C.sage300}" stroke-opacity=".34" stroke-dasharray="1 6" stroke-linecap="round">
    <path d="M636 600h62M902 600h62"/>
  </g>
  <g fill="${C.sage300}" stroke="none" fill-opacity=".35">
    <circle cx="632" cy="600" r="2.4"/><circle cx="902" cy="600" r="2.4"/>
  </g>

  <!-- marcas de medida -->
  <g fill="none" stroke="${C.sage300}" stroke-opacity=".14">
    <path d="M714 730h172M714 724v12M886 724v12"/>
    <path d="M800 712v10"/>
    <circle cx="800" cy="596" r="150" stroke-opacity=".07" stroke-dasharray="1 12"/>
  </g>
  ${marks(p)}${signature(p)}`;

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

  const gates = [100, 200, 300].map((a) => {
    const [x1, y1] = pt(800, 596, 246, a);
    const [x2, y2] = pt(800, 596, 270, a);
    return `<path d="M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}"/>`;
  });

  const body = `${base(p, [[800, 560, 480], [800, 596, 300]])}
  <!-- suelo -->
  <ellipse cx="800" cy="922" rx="250" ry="46" fill="url(#ag-floor)"/>
  <path d="M560 922H1040" stroke="${C.sage300}" stroke-opacity=".13"/>
  <g stroke="${C.sage300}" stroke-opacity=".12">
    <path d="M600 916v12M800 920v14M1000 916v12"/>
  </g>

  <!-- anillos de permisos -->
  <g fill="none">
    <circle cx="800" cy="596" r="196" stroke="${C.sage300}" stroke-opacity=".26" stroke-dasharray="1 8"/>
    <path d="${arc(800, 596, 258, 85, 400)}" stroke="${C.sage300}" stroke-opacity=".36" stroke-width="1.5"/>
    <g stroke="${C.sage300}" stroke-opacity=".34">${gates.join('')}</g>
    <circle cx="800" cy="596" r="322" stroke="${C.sage300}" stroke-opacity=".15" stroke-dasharray="1 12"/>
    <g stroke="${C.sage300}" stroke-opacity=".1">
      ${Array.from({ length: 24 }, (_, i) => {
        const a = i * 15;
        const [x1, y1] = pt(800, 596, 330, a);
        const [x2, y2] = pt(800, 596, 340, a);
        return `<path d="M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}"/>`;
      }).join('')}
    </g>
    <circle cx="800" cy="596" r="356" stroke="${C.sage300}" stroke-opacity=".07"/>
  </g>
  <!-- nodos de permiso -->
  <g>
    ${[100, 200, 300]
      .map((a) => {
        const [x, y] = pt(800, 596, 258, a);
        return `<circle cx="${n(x)}" cy="${n(y)}" r="4.4" fill="${C.sage500}" fill-opacity=".9" stroke="none"/>
        <circle cx="${n(x)}" cy="${n(y)}" r="11" fill="none" stroke="${C.sage300}" stroke-opacity=".28"/>`;
      })
      .join('')}
  </g>

  <!-- pulsos -->
  <g fill="none" stroke-linecap="round">
    <path d="${arc(800, 344, 74, 202, 338)}" stroke="${C.sage300}" stroke-opacity=".5" stroke-width="1.5"/>
    <path d="${arc(800, 344, 108, 206, 334)}" stroke="${C.sage300}" stroke-opacity=".32" stroke-width="1.5"/>
    <path d="${arc(800, 344, 142, 210, 330)}" stroke="${C.sage300}" stroke-opacity=".18" stroke-width="1.5"/>
  </g>
  <circle cx="800" cy="270" r="3" fill="${C.paper}" fill-opacity=".85" stroke="none"/>
  <g stroke="${C.sage300}" stroke-opacity=".2" stroke-dasharray="1 7" stroke-linecap="round">
    <path d="M744 300v-64M856 300v-40"/>
  </g>
  <g fill="${C.sage300}" stroke="none" fill-opacity=".45">
    <circle cx="744" cy="232" r="2.4"/><circle cx="856" cy="256" r="2.4"/>
  </g>

  <!-- teléfono -->
  <g filter="url(#ag-shadow)">
    <rect x="700" y="310" width="200" height="580" rx="32" fill="${C.pine800}" stroke="${C.sage300}" stroke-opacity=".52" stroke-width="2"/>
  </g>
  <rect x="709" y="319" width="182" height="562" rx="24" fill="${C.pine950}" fill-opacity=".92" stroke="${C.sage300}" stroke-opacity=".1"/>
  <rect x="778" y="324" width="44" height="4" rx="2" fill="${C.sage300}" stroke="none" fill-opacity=".28"/>
  <rect x="780" y="862" width="40" height="3" rx="1.5" fill="${C.sage300}" stroke="none" fill-opacity=".2"/>
  <path d="M700 400h-5v44M900 400h5v44" stroke="${C.sage300}" stroke-opacity=".2" stroke-width="3" stroke-linecap="round"/>

  <!-- candado -->
  <g>
    <circle cx="800" cy="607" r="120" fill="url(#ag-glow-soft)"/>
    <g fill="none" stroke="${C.sage300}" stroke-width="1">
      <path d="${arc(800, 607, 66, 55, 200)}" stroke-opacity=".38"/>
      <path d="${arc(800, 607, 66, 235, 380)}" stroke-opacity=".24"/>
    </g>
    ${lock(800, 615, 74)}
  </g>
  ${marks(p)}${signature(p)}`;

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
    { x: 1090, h: 140 },
    { x: 1122, h: 84 },
    { x: 1154, h: 200 },
    { x: 1186, h: 112 },
    { x: 1218, h: 62 },
  ];

  const body = `${base(p, [[600, 600, 470], [540, 600, 320]])}
  <!-- límite de lo que no sale -->
  <g fill="none" stroke-linecap="round">
    <path d="${arc(540, 600, 268, 7, 353)}" stroke="${C.sage300}" stroke-opacity=".3" stroke-width="1.5" stroke-dasharray="1 10"/>
    <g stroke="${C.sage300}" stroke-opacity=".26">
      <path d="M806 633l9 5M806 567l9-5"/>
        ${[45, 135, 225, 315]
          .map((a) => {
            const [x1, y1] = pt(540, 600, 258, a);
            const [x2, y2] = pt(540, 600, 278, a);
            return `<path d="M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}"/>`;
          })
          .join('')}
    </g>
    <!-- puerta ámbar -->
    <circle cx="806" cy="567" r="34" fill="url(#s-halo-warm)" stroke="none"/>
    <circle cx="806" cy="567" r="13" fill="none" stroke="${C.amber}" stroke-opacity=".45"/>
    <circle cx="806" cy="567" r="4" fill="${C.amber}" stroke="none"/>
  </g>

  <!-- teléfono -->
  <g filter="url(#s-shadow-lite)">
    <rect x="388" y="340" width="200" height="520" rx="30" fill="${C.pine800}" stroke="${C.sage300}" stroke-opacity=".5" stroke-width="2"/>
  </g>
  <rect x="397" y="349" width="182" height="502" rx="22" fill="${C.pine950}" fill-opacity=".92" stroke="${C.sage300}" stroke-opacity=".1"/>
  <rect x="466" y="354" width="44" height="4" rx="2" fill="${C.sage300}" stroke="none" fill-opacity=".26"/>
  <rect x="468" y="832" width="40" height="3" rx="1.5" fill="${C.sage300}" stroke="none" fill-opacity=".18"/>
  <!-- conversación retenida -->
  <g fill="${C.sage300}" stroke="none">
    <rect x="420" y="400" width="128" height="6" rx="3" fill-opacity=".2"/>
    <rect x="420" y="416" width="86" height="6" rx="3" fill-opacity=".14"/>
    <rect x="420" y="432" width="104" height="6" rx="3" fill-opacity=".18"/>
    <g fill-opacity=".16">
      <circle cx="428" cy="476" r="3"/><circle cx="448" cy="476" r="3"/><circle cx="468" cy="476" r="3"/>
      <circle cx="488" cy="476" r="3"/><circle cx="508" cy="476" r="3"/>
    </g>
    <rect x="420" y="508" width="62" height="5" rx="2.5" fill-opacity=".1"/>
  </g>
  <g fill="none" stroke="${C.sage300}" stroke-opacity=".1">
    <rect x="420" y="392" width="140" height="56" rx="10"/>
  </g>

  <!-- arcos -->
  <g fill="none" stroke-linecap="round">
    <path d="${arc(588, 600, 70, -52, 52)}" stroke="${C.sage300}" stroke-opacity=".55" stroke-width="1.5"/>
    <path d="${arc(588, 600, 116, -52, 52)}" stroke="${C.sage300}" stroke-opacity=".4" stroke-width="1.5"/>
    <path d="${arc(588, 600, 162, -52, 52)}" stroke="${C.sage300}" stroke-opacity=".26" stroke-width="1.5"/>
    <path d="${arc(588, 600, 208, -52, 52)}" stroke="${C.sage300}" stroke-opacity=".16" stroke-width="1.5"/>
  </g>

  <!-- vector que sale -->
  <g fill="none" stroke-linecap="round">
    <path d="M616 600H966" stroke="${C.paper}" stroke-opacity=".9" stroke-width="2.4"/>
    <path d="M956 588l14 12-14 12" stroke="${C.paper}" stroke-opacity=".9" stroke-width="2"/>
    <path d="M986 600h22" stroke="${C.paper}" stroke-opacity=".55" stroke-width="2" stroke-dasharray="6 8"/>
  </g>
  <g fill="${C.sage300}" stroke="none">
    <circle cx="1024" cy="608" r="2.6" fill-opacity=".55"/>
    <circle cx="1042" cy="620" r="2.2" fill-opacity=".45"/>
    <circle cx="1058" cy="636" r="3" fill-opacity=".6"/>
    <circle cx="1074" cy="652" r="2.4" fill-opacity=".4"/>
  </g>
  <circle cx="1024" cy="608" r="8" fill="none" stroke="${C.sage300}" stroke-opacity=".2"/>
  <circle cx="1082" cy="664" r="3.6" fill="${C.paper}" fill-opacity=".8" stroke="none"/>

  <!-- vector derivado: barras -->
  <g>
    <path d="M1072 710H1248" stroke="${C.sage300}" stroke-opacity=".22"/>
    <g stroke="${C.sage300}" stroke-opacity=".16">
      <path d="M1072 704v12M1248 704v12"/>
    </g>
    ${bars
      .map(
        (b) =>
          `<rect x="${b.x}" y="${710 - b.h}" width="16" height="${b.h}" fill="${C.sage300}" fill-opacity="${b.h === 200 ? '.32' : '.16'}" stroke="none"/>`,
      )
      .join('\n    ')}
    <rect x="1154" y="${710 - 200 - 5}" width="16" height="3" fill="${C.paper}" fill-opacity=".9" stroke="none"/>
    <path d="M1098 710v-140M1130 710v-84M1162 710v-200M1194 710v-112M1226 710v-62" stroke="${C.sage300}" stroke-opacity=".1" stroke-dasharray="1 5"/>
  </g>

  <!-- fragmentos descartados -->
  <g fill="none" stroke="${C.sage300}" stroke-opacity=".12">
    <rect x="300" y="740" width="8" height="8" rx="1"/>
    <rect x="330" y="772" width="6" height="6" rx="1"/>
    <rect x="356" y="726" width="5" height="5" rx="1"/>
  </g>

  <!-- medidas -->
  <g stroke="${C.sage300}" stroke-opacity=".14">
    <path d="M388 892h200M388 886v12M588 886v12"/>
    <path d="M800 892v-16"/>
  </g>
  <circle cx="540" cy="600" r="5" fill="none" stroke="${C.sage300}" stroke-opacity=".22"/>
  <path d="M540 586v8M540 606v8M526 600h8M546 600h8" stroke="${C.sage300}" stroke-opacity=".2"/>
  ${marks(p)}${signature(p)}`;

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

  const body = `${base(p, [[800, 560, 600], [812, 500, 340]])}
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
    <circle cx="812" cy="478" r="170" fill="url(#pv-glow-soft)"/>
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
  ${marks(p)}${signature(p)}`;

  return wrap('IA Guardian — privacidad por diseño', p, body, extra);
}

const files = {
  'panel.svg': panel(),
  'alerts.svg': alerts(),
  'pairing.svg': pairing(),
  'agent.svg': agent(),
  'signals.svg': signals(),
  'privacy.svg': privacy(),
};

for (const [name, svg] of Object.entries(files)) {
  const file = path.join(OUT, name);
  fs.writeFileSync(file, svg, 'utf8');
  console.log(name.padEnd(12), `${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB`);
}
