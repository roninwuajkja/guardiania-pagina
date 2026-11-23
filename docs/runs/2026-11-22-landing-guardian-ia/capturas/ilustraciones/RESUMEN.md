# Ilustraciones — verificación de integración

Run: `2026-11-22-landing-guardian-ia` · Fecha: 2026-11-23
Servidor: `python -m http.server` en `127.0.0.1:4191`
Navegador: Microsoft Edge (Chromium) con Playwright 1.65.1 · axe-core 4.14.1

## Set integrado

Seis SVG de 1600 × 1200 en `assets/art/`: `panel`, `alerts`, `pairing`, `agent`, `signals` y `privacy`. Peso total ≈ 67 KB.

- **Hero:** seis tiles con `object-fit: cover`, `object-position: 50% 50%`, `width="1600" height="1200"`, filtro `saturate(.98) contrast(1.02)` y viñeta. Se conservan las dos placas y el lockup.
- **Secuencia:** `.sequence__art` 4:3 con marco de 1 px y radio 18; escenas `panel`, `alerts`, `pairing` y `agent`. Sin `.sequence__backs` ni carcasas de dispositivo.
- **Promos:** `panel` en la A y `agent` en la B, ambas con `cover`, sin marco de teléfono.

## Medidas por viewport

| Viewport | Imágenes de arte | `naturalWidth` | Rotas | Overflow X | Errores de consola | Requests fallidos |
|---|---:|---:|---:|---:|---:|---:|
| 1440 × 900 | 12 | 1600 × 1200 | 0 | 0 | 0 | 0 |
| 768 × 900 | 12 | 1600 × 1200 | 0 | 0 | 0 | 0 |
| 390 × 844 | 12 | 1600 × 1200 | 0 | 0 | 0 | 0 |
| 2560 × 1440 | 12 | 1600 × 1200 | 0 | 0 | 0 | 0 |

Las 12 son las seis del hero, las cuatro de la secuencia y las dos de las promos. Todas se cargan también con `loading="lazy"` al recorrer la página.

## Secuencia

| Viewport | Marco de arte | Pie | Intersección arte↔pie | Contador | Riel | DEMO |
|---|---|---|---:|---|---|---|
| 1440 × 900 | 720 × 540 | 420 × 176,8 (escena 4: 222,8) | 0 | 01–04 | 0–3 | Visible |
| 768 × 900 | 384 × 288 | 307,2 × 137,3–141,9 | 0 | 01–04 | 0–3 | Visible |
| 390 × 844 | 324 × 243 por tarjeta | 324 × 142,6–146,4 | 0 | Oculto | Oculto | Visible al final |
| 2560 × 1440 | 720 × 540 | 420 × 177,9 (escena 4: 224,5) | 0 | 01–04 | 0–3 | Visible |

En 1440/768/2560 hay un solo frame activo por escena; los otros quedan con `aria-hidden="true"` e `inert`. El crossfade conserva la clase `is-active` sincronizada con contador y riel. En 390 los cuatro frames quedan apilados y visibles.

## Movimiento reducido y sin JavaScript

| Estado | Frames | Opacidad | Intersección arte↔pie | Contador / riel | DEMO | Overflow X |
|---|---:|---|---:|---|---|---:|
| `prefers-reduced-motion` 1440 | 4 apilados | 1 | 0 | Ocultos | Visible al hacer scroll | 0 |
| `prefers-reduced-motion` 390 | 4 apilados | 1 | 0 | Ocultos | Visible al hacer scroll | 0 |
| Sin JS 1440 | 4 apilados | 1 | 0 | Ocultos | `display: block` | 0 |
| Sin JS 390 | 4 apilados | 1 | 0 | Ocultos | `display: block` | 0 |

El loader queda oculto sin JS y los cuatro frames se leen en orden, con el arte a ancho completo y el pie debajo.

## Promos

| Viewport | Media | Caja de imagen | `object-fit` | Ratio de origen | Solape media↔texto |
|---|---|---|---|---|---:|
| 1440 × 900 | 695,9 × 718 | 696 × 718 | `cover` | 1,333 | 0 |
| 768 × 900 | 336,9 × 518 | 337 × 518 | `cover` | 1,333 | 0 |
| 390 × 844 (A) | 348 × 320 | 348 × 320 | `cover` | 1,333 | 0 |
| 390 × 844 (B) | 348 × 360 | 348 × 360 | `cover` | 1,333 | 0 |
| 2560 × 1440 | 966,9 × 718 | 967 × 718 | `cover` | 1,333 | 0 |

Ambas promos usan `panel` / `agent`, sin padding, borde ni radio de teléfono en la B. El overlay se suavizó hacia el panel de texto.

## Accesibilidad y estático

- **axe-core 4.14.1, reglas por defecto:** 0 violaciones en home y `legal.html` a 390 y 1440.
- **`html-validate`:** exit 0 para `index.html` y `legal.html`.
- **`css-tree`:** 4/4 archivos OK.
- **`node --check scripts/main.js`:** exit 0.
- **Referencias:** 0 apariciones de `assets/screens` o `tools/screens` en HTML, CSS, JS y README.

## Capturas

- `1440-hero.png`, `768-hero.png`, `390-hero.png`, `2560-hero.png`.
- `1440-secuencia-01..04.png`, `768-secuencia-01.png`, `2560-secuencia-01.png`, `390-secuencia.png`, `390-secuencia-demo.png`.
- `1440-promo-a.png`, `1440-promo-b.png`, `768-promo-a.png`, `768-promo-b.png`, `390-promo-a.png`, `390-promo-b.png`, `2560-promo-a.png`, `2560-promo-b.png`.
- `1440-reduced-secuencia.png`, `1440-reduced-secuencia-completa.png`, `390-reduced-secuencia.png`, `390-reduced-secuencia-completa.png`.
- `1440-nojs-secuencia.png`, `1440-nojs-secuencia-completa.png`, `390-nojs-secuencia.png`, `390-nojs-secuencia-completa.png`.
- `reporte.json` — datos crudos de las comprobaciones.
