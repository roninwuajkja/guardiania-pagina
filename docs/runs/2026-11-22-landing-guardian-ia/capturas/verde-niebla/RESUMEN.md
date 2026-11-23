# Verde niebla — superficie de cards

Run: `2026-11-22-landing-guardian-ia` · Fecha: 2026-11-23
Alcance: solo la superficie de las cards de señales, promos, descarga y FAQ. Sin tocar hero, declaración, secuencia, hoja de límites, copy, layout, assets, QR ni legal.

Servidor: `python -m http.server 4191` en `127.0.0.1`
Navegador: Microsoft Edge (Chromium) con Playwright 1.65.1 · axe-core 4.14.1

## Tono final

| Token | Valor |
|---|---|
| `--card-bg` | **#E6EFE9** |
| `--card-line` | `rgba(16, 32, 27, 0.16)` |
| `--card-line-strong` | `rgba(16, 32, 27, 0.30)` |
| `--card-shadow` | sin cambios |

El verde niebla sustituye al papel cálido `#F7F9F4`. Los hairlines suben de 0.14/0.28 a 0.16/0.30 porque el fondo es ligeramente más profundo; las reglas siguen siendo finas y no compiten con el contenido.

## Ajustes

- **FAQ abierto:** el velo sage-100 al 45 % era casi indistinguible sobre el nuevo tono. Ahora usa `color-mix(in srgb, #F8FBF7 65%, transparent)`; sobre `#E6EFE9` da un efectivo `#F2F7F2` (1,08:1). Conserva radio 12, inset `4px -12px` y no mueve el layout. La X y la respuesta visible siguen marcando el estado; el velo lo refuerza.
- **Botón sage de descarga:** sage-300 sobre `#E6EFE9` mide 1,56:1. Se revisó en 1440 y 390: conserva forma de pill, tamaño de 64 px, icono y etiqueta pine-950 sobre sage (9,71:1). No se añadió borde para no romper el patrón de botones planos; la etiqueta y la escala identifican el control.
- **QR:** el tile `#fff` sobre `#E6EFE9` mide 1,17:1, pero el borde `--card-line` lo delimita y el código negro sobre blanco es el contenido real. Se mantiene el tile blanco.
- **CTA outline de promos:** borde `--card-line-strong` (1,88:1 sobre card) y texto `--pine-900` (13,92:1). Se lee sin cambios.
- **`styles/motion.css`:** revisado; no había transiciones atadas al blanco cálido. El hover del CTA ya se resolvía con pine-900/paper, el borde de señales con `--card-line-strong` y el trigger de FAQ con pine-600. Sin cambios.

## Verificación

### Viewports

| Viewport | Overflow X | Errores consola | Requests fallidos | axe home | axe legal |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 0 | 0 | 0 | 0 | 0 |
| 390 × 844 | 0 | 0 | 0 | 0 | 0 |
| 1024 × 768 | 0 | 0 | 0 | — | — |
| 2560 × 1440 | 0 | 0 | 0 | — | — |

### Contraste WCAG

| Par | Ratio | AA texto normal |
|---|---:|---|
| ink / card-bg | **14,37:1** | Sí |
| ink-2 / card-bg | **8,12:1** | Sí |
| pine-600 / card-bg | **6,24:1** | Sí |
| pine-700 / card-bg | **8,54:1** | Sí |

Apoyo: pine-900/card-bg 13,92:1; pine-950/sage-300 9,71:1; `card-line` 0.16/card 1,37:1; `card-line-strong` 0.30/card 1,88:1; velo del FAQ abierto/card 1,08:1.

### Axe, reducido y sin JS

- axe-core 4.14.1, reglas por defecto: **0 violaciones** en home y `legal.html` a 1440 y 390.
- Movimiento reducido (1440 y 390): cards en `rgb(230, 239, 233)`, texto ink/ink-2, enlaces pine-700; sin overflow.
- Sin JavaScript (1440 y 390): cards en `rgb(230, 239, 233)` y textos legibles; loader oculto, sin overflow ni errores.
- Tap targets sin cambios: enlaces 44+, CTA 44, release 44, summary 44, FAQ 60.

### Estático

| Comprobación | Resultado |
|---|---|
| `npx html-validate@11.21.1 index.html legal.html` | exit 0 |
| `css-tree` 3.2.1 sobre `tokens.css`, `base.css`, `sections.css`, `motion.css` | 4/4 OK |
| `node --check scripts/main.js` | exit 0 |

## Capturas

En `docs/runs/2026-11-22-landing-guardian-ia/capturas/verde-niebla/`:

- **1440×900 y 390×844:** `[w]-senales` y `-completa`; `[w]-promo-a` / `-b` y `-completa`; `[w]-descarga`, `-card` y `-card-completa`; `[w]-faq`, `-completa`, `-faq-abierta` y `-faq-lista-abierta`.
- **1024×768 y 2560×1440:** las mismas secciones (señales, promos, descarga y FAQ cerrada/abierta), con el mismo juego de capturas.
- **Estados:** `1440-senales-foco`, `1440-promo-hover`; `[w]-descarga-verificar` a 1440 y 390 (detalle de hashes abierto); `[w]-reduced-senales`, `[w]-reduced-faq`, `[w]-reduced-descarga`; `[w]-nojs-senales`, `[w]-nojs-faq` a 1440 y 390.
- `reporte.json` incluye viewports, estilos computados, foco, hover, axe, contraste, FAQ abierto, reducido, sin JS, estáticos y la lista de capturas.

## Notas

- No se introdujeron colores nuevos: el velo del FAQ usa el `#F8FBF7` indicado; todo lo demás sigue en tokens pine/ink/sage/paper.
- No se publicó nada.
- El ajuste es solo de superficie: no cambia copy, layout, assets, QR, descarga, legal ni el bloque cinematográfico.
