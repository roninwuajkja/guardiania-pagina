# Scroll de la declaración y pie del producto

**Fecha:** 2026-11-23
**Run:** `2026-11-22-landing-guardian-ia`
**Archivos tocados:** `index.html`, `styles/sections.css`, `styles/motion.css`, `scripts/main.js`

No se tocaron los SVG de `assets/art/`, el copy, la descarga ni `legal.html`.

## 1. Declaración `#idea`

- Escritorio con movimiento (≥1024): track de **320vh** y pin sticky de **100svh**. El progreso 0..1 sigue entrando como `--p` desde `update()`.
- La entrada dejó de ser una transición de tiempo y pasó a ser una secuencia scrubbed:
  - líneas 1/2/3 del título: **0.04–0.16 / 0.10–0.22 / 0.16–0.28**;
  - regla bajo «NO SALE DEL»: **0.24–0.36** (`scaleX`);
  - lead: **0.34–0.46** (opacidad + 14 px);
  - figuras: **0.46–0.64** (opacidad + 18 px);
  - contador 38: **0.46–0.68**; contador 1: **0.52–0.72**; el 0 se queda;
  - órbita: **0.60–0.98**, giro de 160°; el punto recorre el anillo;
  - glow: opacidad 0.55 → 1, sube 20 px y escala 1 → 1.04.
- Se añadió un segundo anillo concéntrico de 1180 px, al 8 % de sage, que gira en sentido contrario.
- Banda de progreso al pie del pin: tres segmentos con etiquetas `ANÁLISIS LOCAL` · `EL TEXTO SE DESCARTA` · `SOLO UN VECTOR`, mono 10.5 px, `aria-hidden="true"`, sin caja. El marcador y el relleno se mueven con `--p`; la etiqueta activa sube a opacidad 1 y las inactivas quedan a 0.7 (piso de contraste 5.38:1 sobre `--pine-950`).
- `--sp-line-1`, `--sp-line-2`, `--sp-line-3`, `--sp-rule`, `--sp-lead`, `--sp-figures` y `--sp-orbit` se calculan en `syncStatement()` con los rangos anteriores.
- Los contadores de `.statement` quedaron fuera del `IntersectionObserver`; en desktop los mueve el progreso y en mobile/reduced conservan los valores del HTML (`0`, `38`, `1`).
- **Ancla de entrada:** `.hero__scroll` ahora apunta a `#idea-enter`, un `span` absoluto de 1×1 px, `aria-hidden="true"` y `pointer-events:none`, colocado dentro de `.statement` pero fuera del pin. En desktop con movimiento queda al **31%** de la altura de la sección; en reduced/no-JS y <1024 cae al inicio de la sección para no cortar el título. El `id="idea"` de la sección se conserva.
- **<1024 px, reduced motion y sin JS:** la sección vuelve a `height: auto`, pin `relative`, padding de 100 px y todo el contenido visible. La banda se oculta.

### Verificación del clic en `.hero__scroll`

| Viewport | `--p` al aterrizar | `opacity` del lead | Regla | Título | Overflow | Consola |
|---|---:|---:|---|---|---:|---:|
| 1440×900 | **0.407** | 0.912 | dibujada (`scaleX 1`) | completo | 0 | 0 |
| 1366×768 | **0.399** | 0.868 | dibujada (`scaleX 1`) | completo | 0 | 0 |
| 1024×768 | **0.399** | 0.868 | dibujada (`scaleX 1`) | completo | 0 | 0 |

El hash queda en `#idea-enter` y la sección conserva `id="idea"`. Axe en el aterrizaje: 0 violaciones en los tres viewports.

- **Reduced motion:** el clic aterriza al inicio de la sección (`scrollY 812` a 1440×900), con título, lead y figuras visibles (`opacity 1`) y sin overflow.
- **Sin JS:** el clic navega a `#idea-enter` y el contenido estático queda visible.

## 2. Producto `#producto`

- Arte de cada frame: máximo **560×420** (4:3), con ancho fluido por `100svh` y `aspect-ratio: 4/3`. La imagen no se deforma (`object-fit: cover`, misma proporción).
- El pie dejó de estar anclado a `bottom: 56px`. Ahora se centra verticalmente con el arte (`top` = centro del arte, `translateY(-50%)`).
- A 1440×900 el arte mide 560×420 y el pie arranca en **461.6 px** (escenas 1–3) y **438.6 px** (escena 4), dentro del rango pedido de 420–500 px.
- A 1366×768 y 1024×768 el arte baja a **442.6×332** por la altura disponible; el pie arranca en **420 px** y **430.9–447.3 px** respectivamente, sin acercarse a menos de 80 px del borde inferior.
- A 2560×1440 el arte vuelve a 560×420 y el pie arranca en **437.7–461 px**.
- A 390×844 se conserva la pila: arte 324×243 arriba, pie abajo, contador/riel ocultos y `DEMO` al final.
- Sin solapes título/arte, título/pie ni arte/pie en ninguno de los cinco viewports (intersección 0 en todos los casos).

## Medidas principales

| Viewport | Alto `.statement` | Arte | Pie `top` | Hueco figuras→banda (p=1) | Solapes |
|---|---:|---:|---:|---:|---:|
| 1440×900 | 2880 px (320vh) | 560×420 | 461.6 / 438.6 | 32.1 px | 0 |
| 1366×768 | 2457.6 px (320vh) | 442.6×332 | 420.0 | 41.5 px | 0 |
| 1024×768 | 2457.6 px (320vh) | 442.6×332 | 447.3 / 430.9 | 48.8 px | 0 |
| 390×844 | 617.6 px (73.2vh, sin pin) | 324×243 | — (pila) | — (banda oculta) | 0 |
| 2560×1440 | 4608 px (320vh) | 560×420 | 461.0 / 437.7 | 236.7 px | 0 |

Progreso leído en desktop: `0.000`, `0.400`, `0.700`, `1.000`. En p=0.7 y p=1 los contadores leen `0 / 38 / 1`. En mobile el track no existe: la sección mide 617.6 px, el pin es `relative` y los cuatro cortes documentan el paso de la sección.

## Reduced motion

| Viewport | Alto `.statement` | Pin | Banda | Contadores | Título/lead/figuras |
|---|---:|---|---|---|---|
| 1440×900 | 834.4 px | relative | none | 0 / 38 / 1 | visibles, `opacity:1`, transform none |
| 390×844 | 617.6 px | relative | none | 0 / 38 / 1 | visibles, `opacity:1`, transform none |

El contenido termina a 100 px del borde inferior del pin: no hay hueco gigante ni contenido oculto. La secuencia queda en tarjetas relativas con el pie debajo del arte.

## Sin JavaScript

Capturas `1440x900-idea-nojs.png`, `390x844-idea-nojs.png`, `1440x900-producto-nojs.png` y `390x844-producto-nojs.png`: título, lead, figuras y contadores visibles; banda oculta; secuencia apilada.

## Verificación

- **Overflow horizontal:** 0 px en los cinco viewports.
- **Consola:** 0 errores en home (5 viewports) y legal (1440 / 390).
- **Requests fallidos:** 0 en home y legal.
- **axe-core 4.14.1, reglas por defecto:** 0 violaciones en home a 1440×900, 1366×768, 1024×768, 390×844 y 2560×1440; 0 en `legal.html` a 1440 y 390 (35–45 checks pasados por corrida).
- **`html-validate` 11.21.1:** OK en `index.html` y `legal.html`.
- **`css-tree` 3.2.1:** OK en `tokens.css`, `base.css`, `sections.css` y `motion.css`.
- **`node --check scripts/main.js`:** OK.
- **Playwright 1.65.1 + Microsoft Edge:** mediciones y capturas de este informe.

## Evidencia

- `reporte.json`: medidas completas por viewport, progreso, cajas, huecos, opacidades de la banda, contadores, axe y errores.
- `1440x900-idea-{000,040,070,100}.png`
- `1366x768-idea-{000,040,070,100}.png`
- `1024x768-idea-{000,040,070,100}.png`
- `390x844-idea-{000,040,070,100}.png`
- `2560x1440-idea-{000,040,070,100}.png`
- `1440x900-producto-{01,02,03,04}.png`, `1366x768-producto-{01..04}.png`, `1024x768-producto-{01..04}.png`, `2560x1440-producto-{01..04}.png`
- `390x844-producto-{01,03}.png`
- Clic del hero: `1440x900-idea-clic.png`, `1366x768-idea-clic.png`, `1024x768-idea-clic.png`, `1440x900-idea-clic-reduced.png`, `1440x900-idea-clic-nojs.png`
- Reduced: `1440x900-idea-reduced.png`, `390x844-idea-reduced.png`, `1440x900-producto-reduced.png`, `390x844-producto-reduced.png`
- Sin JS: `1440x900-idea-nojs.png`, `390x844-idea-nojs.png`, `1440x900-producto-nojs.png`, `390x844-producto-nojs.png`

## Nota

Para que la banda cupiera a 1366×768 se ajustó, solo en `(max-height: 850px) and (min-width: 1024px)`, el título de la declaración a `12.6vh` y el lead a 16–18 px. A 1440×900 no aplica. La banda no se ocultó a 768 porque el hueco medido es positivo (41.5 px).

No se publicó nada.
