# Papel sobre pine — iteración de superficies claras

Run: `2026-11-22-landing-guardian-ia` · Fecha: 2026-11-23
Alcance: señales, promos, descarga y FAQ. Sin tocar hero, declaración `#idea`, secuencia `#producto`, copy, ilustraciones, QR, legal ni JS.

Servidor: `python -m http.server 4191` en `127.0.0.1`
Navegador: Microsoft Edge (Chromium) con Playwright 1.65.1 · axe-core 4.14.1

## Dirección aplicada

Islas de papel dentro de la página oscura. El papel es `#f7f9f4`, la tinta es pine (`--ink`/`--ink-2`), las reglas son hairline de tinta al 14 %/28 %, los radios 22–28 y la sombra es un halo contenido. Las etiquetas mono van en `--pine-600`; los enlaces y acciones en `--pine-700`/`--pine-900`. No se introdujo blanco clínico en las cards grandes: solo el QR usa `#fff`.

## Archivos

- `styles/tokens.css` — nuevos tokens de card.
- `styles/sections.css` — señales, promos, descarga y FAQ.
- `styles/motion.css` — etiquetas de reglas, hover del borde de señales y hover del CTA de promos.
- `docs/runs/2026-11-22-landing-guardian-ia/capturas/papel/` — 75 capturas, `reporte.json` y este resumen.
- Sin cambios en HTML, `scripts/main.js`, assets ni `legal.html`.

### Tokens añadidos

```css
--card-bg: #f7f9f4;
--card-line: rgba(16, 32, 27, 0.14);
--card-line-strong: rgba(16, 32, 27, 0.28);
--card-shadow: 0 24px 60px -40px rgba(0, 0, 0, 0.55);
```

### Señales

- Card en `--card-bg`, borde `--card-line`, texto `--ink`, radio 28 y sombra de card.
- Título `--ink`; párrafo `--ink-2`; enlace `--pine-700` con hover `--pine-900`.
- Puntos y anillo en `--pine-600`; líneas en `--card-line-strong`; etiquetas `--ink-2` y, al revelarse, `--pine-600`.
- La burbuja oscura se conserva como acento.
- Foco: enlace con outline `--pine-700` y offset 3 px; card con outline `--pine-700` a `-2px` para que el anillo quede sobre papel y no sobre pine-950.

### Promos

- `.promo__body` en `--card-bg` y texto `--ink`; eyebrow `--pine-600`; h3 `--ink`; párrafo `--ink-2`.
- Hairline de separación: izquierda en la promo A, derecha en la B; en ≤639 se retira y pasa a borde superior.
- CTA ghost: borde `--card-line-strong`, texto `--pine-900`; hover/foco con relleno `--pine-900`, texto `--paper` y borde pine.
- Se mantiene el arte a sangre, 55/45 y 45/55 (50/50 en tablet), el `overflow:hidden` y las ilustraciones intactas.
- Foco visible `--pine-700` dentro del body.

### Descarga

- `.download__row` convertido en card de papel: borde `--card-line`, radio 28, padding `clamp(24px, 3.5vw, 44px)`, sombra de card y texto `--ink`.
- Release `--pine-700` (hover `--pine-900`); metadata `--ink-2`; summary `--pine-700` y abierto `--pine-900`; cuerpo de verificación en `--paper` con borde `--card-line` y `code` en `--ink`.
- QR en tile `#fff`, borde `--card-line`, sin sombra; título y URL en `--ink`.
- El botón primario sage, el titular, los pasos y el aviso no se tocaron.

### FAQ

- Lista de papel: borde `--card-line`, radio 28, padding `8px clamp(20px, 3vw, 36px)` y sombra de card.
- Ítems con borde inferior `--card-line`; el último sin borde.
- Trigger `--ink` (hover `--pine-600`), icono `currentColor`, respuesta `--ink-2`.
- El ítem abierto recibe un fondo `color-mix(in srgb, var(--sage-100) 45%, transparent)` con radio 12 mediante `::before` e inset `4px -12px`: no altera el layout ni tapa las reglas.
- El intro de la izquierda sigue oscuro y sticky.

## Verificación

### Viewports

Medido con Playwright sobre Edge. En todos: `overflowX = 0`, 0 errores de consola y 0 requests fallidos.

| Viewport | Overflow X | Errores consola | Requests fallidos | axe home | axe legal |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 0 | 0 | 0 | 0 | 0 |
| 390 × 844 | 0 | 0 | 0 | 0 | 0 |
| 768 × 900 | 0 | 0 | 0 | — | — |
| 1024 × 768 | 0 | 0 | 0 | — | — |
| 2560 × 1440 | 0 | 0 | 0 | — | — |

Además, 320 y 360 px: `overflowX = 0`.

### Contraste WCAG

| Par | Ratio | AA texto normal |
|---|---:|---|
| ink / card-bg | **15,92:1** | Sí |
| ink-2 / card-bg | **8,99:1** | Sí |
| pine-600 / card-bg | **6,91:1** | Sí |
| pine-700 / card-bg | **9,45:1** | Sí |

Pares de apoyo: pine-900/card-bg 15,41:1; ink/paper 14,91:1; ink-2/paper 8,42:1; pine-600/paper 6,47:1; pine-700/paper 8,86:1.

### Axe, movimiento reducido y sin JS

- axe-core 4.14.1, reglas por defecto: **0 violaciones** en home y `legal.html` a 1440 y 390.
- Movimiento reducido (1440 y 390): cards con fondo `rgb(247, 249, 244)`, texto `rgb(16, 32, 27)`, párrafos `ink-2`, enlaces pine-700 y labels ink-2. Sin overflow, sin errores.
- Sin JavaScript (1440 y 390): mismas superficies claras y textos legibles; `opacity: 1`, loader oculto, sin overflow ni errores.
- Tap targets ≥ 44 px: enlaces de señal 44,3; CTA de promo 44; release 44; summary 44; triggers FAQ 60. El QR no es interactivo.

### Estático

| Comprobación | Resultado |
|---|---|
| `npx html-validate@11.21.1 index.html legal.html` | exit 0 |
| `css-tree` 3.2.1 sobre `tokens.css`, `base.css`, `sections.css`, `motion.css` | 4/4 OK |
| `node --check scripts/main.js` | exit 0 |

## Capturas

En `docs/runs/2026-11-22-landing-guardian-ia/capturas/papel/`:

- **1440×900**: `1440-senales`, `1440-senales-completa`, `1440-promo-a`, `1440-promo-b`, `1440-descarga`, `1440-descarga-card`, `1440-descarga-verificar`, `1440-faq`, `1440-faq-abierta`, `1440-faq-completa`, `1440-senales-foco`, `1440-promo-hover`.
- **390×844 / 768×900 / 1024×768 / 2560×1440**: `[w]-senales`, `[w]-senales-completa`, `[w]-promo-a[-completa]`, `[w]-promo-b[-completa]`, `[w]-descarga`, `[w]-descarga-card[-completa]`, `[w]-faq[-completa]`, `[w]-faq-abierta`.
- **Estados**: `[w]-reduced-senales`, `[w]-reduced-faq`, `[w]-reduced-descarga`, `[w]-nojs-senales`, `[w]-nojs-faq` a 1440 y 390.
- `reporte.json` contiene viewports, estilos computados, foco, hover, axe, contraste, reducido, sin JS, chequeos estáticos y la lista de capturas.

## Concesiones de diseño

- En la card de señal, el anillo de foco de la card es interior (`outline-offset: -2px`). Un anillo exterior pine-700 caería sobre pine-950 (1,78:1) y sería invisible; el enlace conserva su outline exterior de 3 px sobre papel.
- El CTA de promo ya no se ilumina con halo sage sobre el cuerpo claro: en hover de card se rellena de pine-900 con texto paper. Es la traducción legible del gesto anterior.
- En ≤639 la promo apila el arte y el cuerpo; el borde lateral del body se sustituye por un hairline superior. El arte conserva su degradado inferior existente, por lo que el corte arte/papel queda como una costura oscura deliberada.
- El ítem abierto de FAQ se resalta con un `::before` que sangra 12 px dentro del padding de la lista: se lee como fila seleccionada sin mover contenido.
- El QR es la única superficie `#fff`; se mantiene el tile blanco pedido sobre el papel cálido.
- La retícula 2+1 de señales en tablet y la proporción 55/45 se conservan tal como estaban.

No se publicó nada.
