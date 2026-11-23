# Correcciones UI — 2026-11-22-landing-guardian-ia

**Base:** `C:\Users\Usuario\Desktop\Guardian IA Pagina`  
**URL de verificación:** `http://127.0.0.1:4173/` y `http://127.0.0.1:4173/legal.html`  
**Fecha:** 2026-11-23  
**Alcance:** cierre de los hallazgos de `AUDITORIA-UI.md`. Este documento entrega medidas y capturas; no emite veredicto.

## Método

- Playwright 1.65.1 sobre Chrome `headless`, `deviceScaleFactor: 1`, locale `es-CL`.
- Contextos separados para `prefers-reduced-motion: reduce` y para la simulación de texto al 200 % (raíz de 32 px).
- Capturas de viewport en `capturas/correcciones/`; medición completa en `capturas/correcciones/mediciones-correcciones.json`.
- Se conservó el contrato visual y los componentes aprobados. Los cambios se limitan a los puntos auditados.

---

## CRITICAL — Declaración en alturas cortas

**Cambios**

- El reveal de la declaración ya no depende de la intersección del bloque dentro del pin: el `IntersectionObserver` usa `rootMargin: 0px 0px 0px 0px` y el JS añade `is-in` a los `[data-reveal]` de la sección cuando `--p > 0.05`.
- Título: `clamp(3.4rem, min(10.9vw, 13.5vh), 10.5rem)`, `max-width: 100%`, `overflow-wrap: anywhere`.
- En `@media (max-height: 850px) and (min-width: 1024px)`: `padding-top` del pin a `--header-h + 2px`, lead a 22 px, figuras a 32 px y `margin-top` de figuras a 32 px.
- La transición de los reveals de la declaración se abrevia a 300 ms; las figuras no llevan retardo. Así el estado final no depende de la espera: a los 900 ms ya están en `opacity: 1`.

**Medición con la sección fijada**

| Viewport | Título | Figuras `bottom` | Pin `bottom` | Margen (`pin − 10 − figuras`) | `opacity` | `is-in` |
|---|---:|---:|---:|---:|---:|---|
| 1366×768 | 103,68 px | 719,4 | 768 | **38,6 px** | 1 | true |
| 1440×800 | 108 px | 744,6 | 800 | **45,4 px** | 1 | true |
| 1280×720 | 97,2 px | 683,1 | 720 | **26,9 px** | 1 | true |
| 1024×768 | 103,68 px | 711,3 | 768 | **46,7 px** | 1 | true |
| 1440×900 | 121,5 px | 840,0 | 900 | **50,0 px** | 1 | true |

Las tres cifras (`0 / 38 / 1`) tienen `opacity: 1` en todos los casos. La comprobación estricta a **900 ms** (espera mínima de la auditoría) devuelve `opacity: 1` en los cuatro `[data-reveal]` y `is-in: true` en los cinco viewports. El título no desborda: en 1024×768 va de `108,6` a `915,3`; en 1366×768 de `279,6` a `1086,3`.

**Evidencia:** `01-declaracion-1366x768.png`, `01-declaracion-1440x800.png`, `01-declaracion-1280x720.png`, `01-declaracion-1024x768.png`, `01-declaracion-1440x900.png`.

---

## HIGH

### 1. Targets móviles (390×844)

| Documento | `.brand` | Símbolo | `.nav__menu` |
|---|---:|---:|---:|
| Home | **44×44** | 34×34 | **44×44** |
| Legal | **44×44** | 34×34 | N/A |

El hit area del brand crece con `padding-inline: 5px` y `margin-inline: -5px`; el símbolo conserva 34 px. El botón Menú mide 44×44 y mantiene el burger visual de 28×16 alineado a la derecha. El CTA APK sigue midiendo 63×44.

**Evidencia:** `02-targets-home-390.png`, `02-targets-legal-390.png`.

### 2. Octavo fragmento del collage

Se reinsertó el panel tipográfico `PRIVACIDAD / POR DISEÑO` en la celda libre de la rejilla 12×8 existente, sin recomponer los otros siete fragmentos.

| Viewport | Tiles | `plate-a` | `plate-b` | Lockup | Solape lockup ↔ plate-a / plate-b |
|---|---:|---|---|---|---|
| 1440×900 | **8** | `1027,1, 198,5` · 146,1×184,5 | `1027,1, 389,0` · 146,1×311,5 | `544,7, 385,4` · 350,5×128,2 | **false / false** |
| 2560×1440 | **8** | `1905,7, 199,1` · 305,3×386,1 | `1905,7, 591,2` · 305,3×647,4 | `923,2, 588,4` · 713,6×261,0 | **false / false** |

Recuentos por breakpoint: 1440 y 2560 → 8; 768 → 6 (como antes); 390 → 4 (como antes).

**Evidencia:** `03-collage-1440x900.png`, `03-collage-2560x1440.png`, `09-esquinas-hero.png`.

### 3. Rótulo `DEMO · DATOS SINTÉTICOS`

El rótulo dejó de estar en las listas de `display: none` y se mantiene visible en la secuencia.

| Contexto | `display` | `position` | Rectángulo (x, y, w×h) | En viewport |
|---|---|---|---:|---|
| 390×844 | block | relative | `23,4, 506,5` · 343,2×15,4 | sí |
| 1440×900 | block | absolute | `86,4, 860,6` · 170,4×15,4 | sí |
| Reduced 390×844 | block | relative | `23,4, 506,5` · 343,2×15,4 | sí |
| Reduced 1440×900 | block | relative | `86,4, 540,2` · 1267,2×15,4 | sí |

En móvil queda después de las cuatro tarjetas, con `margin-top: 24px`; en reduced, después del bloque. No se usa `display: none` en ningún contexto.

**Evidencia:** `04-demo-390.png`, `04-demo-1440.png`, `04-demo-reduce-390.png`, `04-demo-reduce-1440.png`.

---

## MEDIUM

### 1. Frames inactivos fuera del árbol de accesibilidad

En el pin de escritorio, el frame activo queda expuesto y los otros tres reciben `aria-hidden="true"` e `inert`:

| Estado | Frame 01 | Frame 02 | Frame 03 | Frame 04 |
|---|---|---|---|---|
| 1440, frame 01 | activo, sin `aria-hidden` | `aria-hidden`, `inert` | `aria-hidden`, `inert` | `aria-hidden`, `inert` |
| 1440, frame 03 | `aria-hidden`, `inert` | `aria-hidden`, `inert` | activo, sin `aria-hidden` | `aria-hidden`, `inert` |
| 390 (apilado) | expuesto | expuesto | expuesto | expuesto |
| Reduced 1440 (apilado) | expuesto | expuesto | expuesto | expuesto |

La exposición se sincroniza al cambiar de frame y al alternar el movimiento.

### 2. Marcador no cromático del menú

Con `#descarga` activo, el enlace tiene `aria-current="location"` y su flecha queda persistente: `opacity: 1`, `transform: matrix(1, 0, 0, 1, 0, 0)`. No depende de hover ni de foco.

**Evidencia:** `05-menu-marker.png`, `05-menu-toggle.png`.

### 3. Foco al destino desde el menú

Clic en Producto → `document.activeElement = SECTION#producto`, menú cerrado, `#producto` a `88 px`, `scrollPaddingTop = 88px`, `scrollY = 2432`. El destino tiene `tabindex="-1"` para recibir foco sin añadirse al orden de tabulación.

**Evidencia:** `05-menu-focus.png`.

### 4. Borde ghost y borde del toggle

- `.btn--ghost`: borde `color(srgb 0.662745 0.776471 0.721569 / 0.5)` (sage al 50 %); contraste compuesto sobre pine-900: **3,26:1**.
- `.motion-toggle__track`: mismo borde sage al 50 %; contraste **3,07:1** sobre pine-800 del track y **3,26:1** sobre pine-900 del menú.

**Evidencia:** `06-ghost.png`, `05-menu-toggle.png`.

### 5. Ticker con movimiento reducido a 390

Solo se muestran los tres primeros spans: `IA GUARDIAN · VERSIÓN 1.7.17`. La copia mide **295,9 px** y queda en `47,0–342,9`, centrada en el track de 390 px. La copia duplicada y la máscara de borde están desactivadas (`display: none` y `mask-image: none`).

**Evidencia:** `07-ticker-reduce-390.png`.

### 6. Texto al 200 % (raíz 32 px) a 390

`scrollWidth = 390` en las 8 secciones y en los 6 acordeones. El título de la declaración mide **338,8 px**, de `25,6` a `364,4`, con `font-size: 42,9 px` y `overflow-wrap: anywhere`.

**Evidencia:** `10-zoom-200-390.png`.

---

## LOW

- `.ext-mark` con `margin-left: 4px` en los cuatro enlaces externos.
- Pasos de descarga alineados a 1440: los tres `h3` en `top 246,1` y `height 60,5`; los tres párrafos en `top 318,6`.
- «Android 8+» unificado en menú, hero y descarga. Metadata final: `17,9 MB · Android 8+ · arm64-v8a · armeabi-v7a · v1.7.17`.
- Alt de `android-status`: secuencia → «Pantalla Android con permisos y última sincronización»; promo → «Pantalla Android con el estado de permisos y la última sincronización». Ya no menciona «desvincular».
- Esquinas del hero con scrim local: fondo `color(srgb 0.0313726 0.105882 0.0901961 / 0.76)` (pine-950 al 76 %) y texto paper al 72 %. En el peor caso (fondo paper bajo el scrim), el texto compone **4,89:1**; sobre las capturas reales queda por encima.

**Evidencia:** `08-pasos.png`, `08-descarga-meta.png`, `08-footer.png`, `09-esquinas-hero.png`.

---

## Comprobaciones de cierre

| Comprobación | Resultado |
|---|---|
| `html-validate` (index, legal) | **HTML válido**, exit 0 |
| `css-tree` (4 archivos) | **4/4 OK**; `sections.css` 52.737 B |
| `node --check scripts/main.js` | **OK** |
| axe-core (home desktop, home mobile, legal desktop, legal mobile) | **0 violaciones** |
| Consola y red (home 1440, home 390, legal 390, scroll completo) | **0 errores**, 0 requests fallidos, 0 imágenes rotas |
| Overflow 320, 360, 390, 640, 768, 1024, 1280, 1366, 1440, 1920, 2560 | `scrollWidth = innerWidth` en todos |
| Movimiento reducido | Contenido completo; frames apilados y expuestos; ticker legible |

## Archivos tocados

- `index.html` — `tabindex="-1"` en secciones, panel `plate-a`, alts, metadata y arquitecturas.
- `styles/base.css` — `overflow-wrap` de encabezados y borde ghost.
- `styles/sections.css` — declaración, collage, targets, DEMO, marcador del menú, borde del toggle, ticker y LOW.
- `styles/motion.css` — reduced, ticker, DEMO y transiciones.
- `scripts/main.js` — observer de la declaración, exposición de frames y foco/scroll desde el menú.
- `docs/runs/2026-11-22-landing-guardian-ia/capturas/correcciones/` — 27 capturas, `mediciones-correcciones.json` y `mediciones-reauditoria-d3.json`.
- `docs/runs/2026-11-22-landing-guardian-ia/CORRECCIONES.md` — este documento.

---

## Addendum — Re-auditoría D3 PASS

La re-auditoría reportó **D3 PASS** con 0 CRITICAL y 0 HIGH. Quedaban dos puntos; se corrigieron solo esos dos.

### A. Ticker en `prefers-reduced-motion` de 640 a 919 px

Las reglas de `span:nth-child(n + 4) { display: none }` y `mask-image: none` salieron de `@media (max-width: 639px)` y ahora aplican a cualquier ancho cuando `data-motion="reduce"`, también en el bloque de sistema `prefers-reduced-motion: reduce`. El track queda a `width: 100%` y centrado; la copia duplicada sigue oculta.

| Viewport | Track | Copia | Primer span | Último span | `mask` | Duplicada | `scrollWidth` |
|---|---:|---|---|---|---|---|---:|
| 390 | 390 | 47,0–342,9 (295,9) | 65,0–159,8 | 204,4–324,9 | none | none | 390 |
| 768 | 768 | 236,0–531,9 (295,9) | 254,0–348,8 | 393,4–513,9 | none | none | 768 |
| 1440 (extra) | 1440 | 572,0–867,9 (295,9) | 590,0–684,8 | 729,4–849,9 | none | none | 1440 |

En 390 y 768 el primer y el último span quedan dentro del viewport (`firstInside` y `lastInside` true), sin corte.

**Evidencia:** `11-ticker-reduce-390.png`, `11-ticker-reduce-768.png`.

### B. Foco programático de sección

Regla añadida en `styles/base.css`:

```css
main section[tabindex="-1"]:focus {
  outline: none;
}
```

Medición tras activar Producto con teclado desde el menú: `document.activeElement = SECTION#producto`, menú cerrado, `sectionFocus = true`, `sectionFocusVisible = true`, `outline-style = none` y ninguna captura muestra marco alrededor de la sección. El `outline-width` computado queda en `3px` por el shorthand, pero `outline-style: none` no pinta ninguna línea.

Los controles conservan su outline global de 2 px sage con offset 3 px:

| Control | `:focus-visible` | `outline-style` | `outline-width` | `outline-color` |
|---|---|---|---|---|
| Enlace de marca | true | solid | 2 px | sage-300 |
| Botón Menú | true | solid | 2 px | sage-300 |
| Disparador FAQ | true | solid | 2 px | sage-300 |
| Enlace del menú | true | solid | 2 px | sage-300 |

**Evidencia:** `12-foco-seccion-producto.png`, `12-foco-control-menu.png`.

### Comprobaciones de esta ronda

- `css-tree` 4/4 OK; `html-validate` HTML válido; `node --check` OK.
- axe-core: 0 violaciones en home desktop/mobile y legal desktop/mobile.
- Solo se modificaron `styles/motion.css` y `styles/base.css`; no se tocó HTML, JS, componentes ni otros estilos.
