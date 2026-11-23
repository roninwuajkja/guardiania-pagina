# Collage 12×6 y fondo ambiental — verificación

Run: `2026-11-22-landing-guardian-ia` · Fecha: 2026-11-23
Servidor: `python -m http.server 4191 --bind 127.0.0.1`
Navegador: Microsoft Edge (Chromium) con Playwright 1.65.1 · axe-core 4.14.1

## 1. Qué se implementó

- **Collage 12×6** en `.hero__poster-inner` con las áreas de `INTEGRACION-ARTE.md` §6:
  `overview 1/5×1/4`, `android 5/8×1/4`, `alerts 8/11×1/4`, `plate-a 11/13×1/3`,
  `android-pairing 1/4×4/7`, `pairing 4/9×4/7`, `mobile 9/11×4/7`, `plate-b 11/13×3/7`.
- **Póster 16:9 estable**: el interior pasa a `position:absolute; inset:0` para que el alto
  no dependa del contenido. Sin ese cambio, a 1440×800 la placa forzaba 746×507 (ratio 1,47).
- **Placas fluidas**: símbolo, gap, padding y etiqueta usan `cqi` con topes, de modo que el
  texto cabe sin recortes cuando el póster baja de 900 px de alto.
- **Fondo del hero**: `div.hero__ambient` a sangre, detrás de anillos y póster, opacidad 0,62.
- **Fondo de secciones oscuras**: `div.ambient` fijo, `z-index:-1`, a sangre, con la misma
  `ambient.svg` al 100 % (sus líneas ya están al 10–18 %). Las secciones `statement`,
  `sequence`, `signals`, `promos`, `limits`, `download` y `faq` pasan a fondo transparente;
  la hoja de límites conserva `--paper` opaco y las tarjetas/promos/footer sus fondos.
- **Tablet**: para que el lockup no pise la placa «0» a 768, `plate-b` va a `10/13` y
  `mobile` a `7/10` en 640–1023. A 1440/2560 no cambia nada.
- **Alto muy corto**: a ≤680 px de alto (≥1024) se oculta solo el símbolo de `plate-a`;
  la etiqueta sigue visible. No afecta a 1440×900 ni a 2560×1440.

No se modificaron los SVG de `assets/art/`, la tipografía, el menú, el contenido ni el CTA de la
descarga, ni `legal.html`. El fondo de `#descarga` sí recibe la capa ambiental pedida en §6.

## 2. Medidas del collage

### 2.1 Geometría por tile

**1440 × 900** — póster 924,44 × 519,98 (16:9), 6 filas de 78,66 px.

| Tile | Caja (px) | Ratio |
|---|---|---:|
| overview | 298,14 × 247,98 | 1,202 |
| android | 222,11 × 247,98 | 0,896 |
| plate-a | 146,08 × 163,33 | 0,894 |
| alerts | 222,11 × 247,98 | 0,896 |
| android-pairing | 222,11 × 248,00 | 0,896 |
| pairing | 374,17 × 248,00 | 1,509 |
| plate-b | 146,08 × 332,66 | 0,439 |
| mobile | 146,08 × 248,00 | 0,589 |

**2560 × 1440** — póster 1880 × 1057,5 (16:9), 6 filas de 168,25 px.

| Tile | Caja (px) | Ratio |
|---|---|---:|
| overview | 616,66 × 516,75 | 1,193 |
| android | 461,00 × 516,75 | 0,892 |
| plate-a | 305,34 × 342,50 | 0,892 |
| alerts | 461,00 × 516,75 | 0,892 |
| android-pairing | 461,00 × 516,75 | 0,892 |
| pairing | 772,33 × 516,75 | 1,495 |
| plate-b | 305,34 × 691,00 | 0,442 |
| mobile | 305,33 × 516,75 | 0,591 |

Los seis tiles con arte usan `object-fit: cover`, `object-position: 50% 50%` e imágenes
`1600×1200` completas. Ningún teléfono se estira. El tile `mobile` mide 0,589 porque así
lo fija §6 y coincide con la proporción real del teléfono del arte (0,57); `plate-b` es una
columna tipográfica, no una escena con teléfono.

### 2.2 Intersecciones y desborde

| Viewport | Tiles | Lockup ↔ plate-a | Lockup ↔ plate-b | plate-a ↔ plate-b | Overflow X | Consola |
|---|---:|---:|---:|---:|---:|---:|
| 1440 × 900 | 8 | 0 px² | 0 px² | 0 px² | 0 | 0 |
| 2560 × 1440 | 8 | 0 px² | 0 px² | 0 px² | 0 | 0 |
| 390 × 844 | 4 | n/a (sin placas) | n/a | n/a | 0 | 0 |
| 768 × 900 | 6 | n/a (sin plate-a) | 0 px² | n/a | 0 | 0 |

A 1440 el lockup mide 350,52 × 128,19 y termina en x=895,26; las placas empiezan en
x=1027,14 (separación 131,9 px). A 2560 el lockup mide 713,63 × 260,97 y termina en
x=1636,81; las placas empiezan en x=1905,66 (separación 268,8 px).

### 2.3 Móvil y tablet

- **390 × 844:** póster 350 × 466,66 (3:4), 4 tiles (`overview` 195,5×187,09;
  `android` 138,5×263,55; `android-pairing` 167×263,56; `mobile` 167×187,11).
  Lockup apilado 180,95 × 167,03 al centro.
- **768 × 900:** póster 675,84 × 380,16 (16:9), 6 tiles. `plate-b` 160,5×178,7;
  lockup 256,0×93,6, sin intersección.

## 3. Fondo ambiental

| Capa | Posición | Opacidad | z-index | pointer-events | Tamaño medido |
|---|---|---:|---:|---|---|
| `.hero__ambient` | absolute, inset 0 | 0,62 | 0 | none | 1440×900 / 2560×1461,6 / 390×852,9 |
| `.ambient` | fixed, inset 0 | 1 | −1 | none | viewport (1440×900, 2560×1440, 390×844) |

- `ambient.svg`: **HTTP 200**, `image/svg+xml`, 14.425 bytes. Una sola petición CSS,
  compartida por las dos capas (transfer 14.725 B).
- La capa fija queda detrás de todo el contenido; los hit-test sobre títulos y párrafos de
  `statement`, `sequence`, `signals`, `promos`, `limits`, `download`, `faq` y la fila de
  metadatos del hero devuelven el texto, nunca la capa ambiental.
- La hoja de `limits` sigue opaca en `--paper`; las tarjetas, promos y footer conservan sus
  fondos. No se añadió ningún color nuevo.
- Contraste: axe 0 violaciones. Los textos conservan los tokens de `DISENO.md`.

## 4. Accesibilidad y estático

| Comprobación | Resultado |
|---|---|
| axe-core 4.14.1, reglas por defecto, home 1440 y 390 | 0 violaciones |
| axe-core 4.14.1, reglas por defecto, `legal.html` 1440 y 390 | 0 violaciones |
| `npx html-validate index.html legal.html` | exit 0, 0 errores |
| `css-tree.parse` sobre los 4 CSS | 4/4 OK |
| `node --check scripts/main.js` | exit 0 |
| Consola / `pageerror` / requests fallidos / HTTP ≥ 400 | 0 en los 4 viewports |
| Imágenes del collage | 8/8 en 1440 y 2560, 4/4 en 390, `naturalWidth=1600`, `complete=true` |
| Movimiento reducido a 1440 | 8 tiles, opacidad 1, póster 924,4×520, 0 overflow, 0 consola |

## 5. Capturas

- `1440x900-hero.png`, `2560x1440-hero.png`, `390x844-hero.png`, `768x900-hero.png`.
- `1440-statement.png`, `1440-sequence.png`, `1440-signals.png`, `1440-promos.png`,
  `1440-limits.png`, `1440-download.png`, `1440-faq.png`.
- `reporte.json` — medidas crudas (tiles, intersecciones, overflow, consola, recursos, axe).

## 6. Comprobación extra de alturas

Con el interior absoluto, el póster mantiene 16:9 en portátiles cortos:

| Viewport | Póster | Ratio | Placa privacidad | Recorte |
|---|---|---|---:|---|
| 1440 × 800 | 746,7 × 420 | 1,7778 | 116,5 × 130,1 | 0 |
| 1366 × 768 | 689,8 × 388 | 1,7778 | 107,0 × 119,4 | 0 |
| 1280 × 720 | 604,4 × 340 | 1,7778 | 92,8 × 103,4 | 0 (etiqueta en 3 líneas) |

A 1024×600 el diseño queda fuera de su rango de altura; el símbolo de `plate-a` se oculta y
la etiqueta cabe, pero el hero completo no está pensado para 600 px.

## 7. Pendiente

- No se probó en Safari/Firefox ni en dispositivos físicos; la evidencia es Edge/Chromium
  headless. Las capas usan `container-type`, `cqi` y `color-mix`, disponibles en navegadores
  modernos.
- A 1024×600 (altura fuera del rango probado del diseño) el hero queda comprimido; no afecta
  a 1440×900, 2560×1440, 390×844 ni 768×900.
