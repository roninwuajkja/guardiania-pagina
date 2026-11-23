# Iteración 2026-11-23 — icono del favicon, ilustraciones y retirada de capturas

**Petición:** que la página muestre el icono del favicon, que las capturas se regeneren con cuentas coherentes para cada escenario y, después, que la landing deje de parecer una galería de pantallas y use un set de ilustraciones propio.

## Cambios

### 1. Icono del favicon en el nav

- `.brand-symbol` usa `assets/brand/b-vinculo-symbol-small.svg` (el corte pequeño, equivalente al favicon) en vez del símbolo completo.
- El nav muestra el icono solo en todos los breakpoints (desktop y móvil); el lockup horizontal se retiró del nav y se conserva en el hero y el footer.
- Hit area 44×44, icono 34×34, `aria-label="IA Guardian, inicio"` y foco visible intactos.

### 2. Pantallas nuevas y coherentes

Se regeneraron las cuatro pantallas que no cuadraban con el resto:

| Pantalla | Cuenta / escenario | Cambio |
|---|---|---|
| `web-pairing` | Camila (tutora) → Matías (13) | Antes decía «Antonia»; ahora «PARA MATÍAS · 13 AÑOS», QR de demo y código 970 016 |
| `web-alerts` | Camila, Matías y Sofía | Antes era una vista oscura con datos de prueba; ahora es la vista clara del panel con 7 alertas explicables |
| `android-pairing` | Matías (teléfono) | URL del panel de producción `https://guardiania-74l4.onrender.com`, sin `10.0.2.2:8000`; marca de órbita actual |
| `android-status` | Matías (teléfono) y Camila (tutora) | Antes «marito test 2 / Tutor: Mario» y escudo antiguo; ahora «Teléfono de Matías / Tutora: Camila Rojas», órbita actual, permisos y sección «Qué se comparte» |

`web-overview` y `web-mobile` se conservaron porque ya usaban Camila, Matías y Sofía. Estas seis pantallas se retiraron después, al integrar las ilustraciones; la tabla queda como registro del paso anterior.

### 3. Herramientas (retiradas)

- `tools/screens/` contenía los HTML/CSS de las cuatro pantallas, el QR de demo, `render.cjs` (Playwright) y `convert.py` (Pillow → WebP + respaldos de 48 px); `assets/screens/` guardaba los PNG y WebP resultantes.
- Las imágenes se generaban a 1440/1100 px y se servían en WebP.
- Ambos directorios se retiraron al integrar las ilustraciones. El set actual vive en `assets/art/` y se genera con `tools/art/`; no queda ningún generador de capturas en el proyecto.

### 4. Textos

- El `aria-label` del póster describe el collage de ilustraciones, no capturas.
- El subtítulo de la secuencia dice «Cuatro escenas de la guardia. Datos sintéticos.».
- El README documenta las ilustraciones vectoriales y ya no habla de pantallas ni de capturas de producción.

## Unificación de la marca (segunda pasada)

El primer cambio dejó el corte del favicon solo en el nav; el loader, el menú, el ticker, el watermark de descarga, la placa del póster y los lockups del hero/footer seguían usando el símbolo completo. Se unificó todo el chrome:

- `.symbol-mask` (loader, ticker, menú, placa, watermark) usa `b-vinculo-symbol-small.svg`.
- Los lockups `b-vinculo-horizontal-reverse.svg` y `b-vinculo-stacked-reverse.svg` usan el corte pequeño junto al wordmark.
- `favicon.ico` y `apple-touch-icon.png` se regeneraron desde el corte pequeño; `favicon.svg` ya lo usaba.
- El símbolo completo ya no aparece en la landing: todo el chrome, incluidos loader, ticker, menú, placa del póster, watermark y lockups, usa el corte pequeño.

Verificado en loader, hero, menú y footer a 1440: el glyph es el mismo del favicon, sin overflow ni errores. `html-validate` y `css-tree` OK.

## Ilustraciones propias

Se sustituyeron las capturas por el set «La guardia invisible»: seis SVG de 1600 × 1200 en `assets/art/` (`panel`, `alerts`, `pairing`, `agent`, `signals`, `privacy`), sin texto ni personas dentro de la imagen y con el foco en el 60 % central. El detalle del sistema visual está en `ART-DIRECTION.md` y en `assets/art/README.md`.

- **Hero:** los seis tiles usan las seis escenas con `object-fit: cover`, foco centrado, `width/height 1600/1200`, filtro suave y un velo convertido en viñeta. Se mantienen las dos placas tipográficas y el lockup; el `aria-label` pasó a «Collage de ilustraciones de IA Guardian con el logotipo de la marca al centro».
- **Secuencia:** se retiraron `.sequence__backs` y las carcasas `.sequence__device`; cada frame usa `.sequence__art`, una pieza 4:3 con marco fino, radio 18 y pie a la izquierda. Escenas: panel, alerts, pairing y agent. El subtítulo dice «Cuatro escenas de la guardia. Datos sintéticos.» y cada imagen tiene alt propio. El pin usa un resplandor radial en vez de respaldos borrosos.
- **Promos:** `panel` para el tutor y `agent` para el menor, ambas con `object-fit: cover`, sin marco de teléfono en la B y con el overlay suavizado para que la ilustración se vea.
- **Responsive y estados:** en ≤639, movimiento reducido y sin JS, el frame es una tarjeta con el arte a ancho completo y el pie debajo; el contador y el riel se ocultan, y las cuatro escenas quedan apiladas y legibles.
- **Movimiento:** el crossfade de frames y el parallax de promos se conservan; el arte entra con un desplazamiento mínimo en escritorio y se detiene por completo con `prefers-reduced-motion`.

## Retirada de capturas

- Se borraron `assets/screens/` y `tools/screens/` del proyecto. No quedan referencias a `assets/screens` en HTML, CSS, JS ni README.
- Las capturas de pantalla del run se conservan como evidencia histórica en `docs/runs/2026-11-22-landing-guardian-ia/capturas/`; los informes de auditoría y goldfish no se reescribieron.
- `tools/art/` se mantiene como generador de desarrollo del set, fuera de la publicación de Pages.

## Verificación de la iteración de pantallas

- 1440×900 y 390×844: 0 errores de consola, 0 requests fallidos, 0 imágenes rotas, sin overflow.
- Las imágenes cargan con las dimensiones declaradas (1440×1000, 1440×1411, 1100×2449, 1440×3120) y sus respaldos de 48 px.
- Axe 4.14.1 con reglas por defecto: 0 violaciones en home y legal a 390/1440.
- Nav: icono visible en 390/1440/2560, hit area 44×44, foco 2 px sage.
- Rendimiento: LCP 2,46–2,51 s (mediana 2,49), CLS 0,00006, 791 KB en 24 requests; el incremento de ~80 KB viene de las pantallas nuevas.
- `html-validate`, `css-tree` y `node --check` OK.

## Verificación de las ilustraciones

Medido el 2026-11-23 con Playwright 1.65.1 sobre Microsoft Edge, servidor local y axe-core 4.14.1 con las reglas por defecto.

| Comprobación | Resultado |
|---|---|
| 1440×900, 768×900, 390×844 y 2560×1440 | 12 imágenes de arte por página (6 del hero, 4 de la secuencia y 2 de las promos), todas con `naturalWidth=1600` y `naturalHeight=1200`; 0 rotas, 0 errores de consola, 0 requests fallidos y `overflowX=0`. |
| Secuencia a 1440 y 2560 | Arte 720×540; pie 420×176,8 (escena 4: 420×222,8); intersección arte↔pie **0**; contador 01–04 y riel 0–3 sincronizados; un solo frame activo, los otros con `aria-hidden` e `inert`; rótulo DEMO visible. |
| Secuencia a 768 | Arte 384×288; pie 307,2×137,3–141,9; intersección **0**; contador y riel visibles; DEMO visible. |
| Secuencia a 390 | Cuatro tarjetas apiladas, arte 324×243 cada una; intersección **0**; contador y riel ocultos; DEMO visible al final. |
| Movimiento reducido (1440 y 390) | Cuatro frames con `opacity: 1` y `position: relative`; intersección **0**; contador y riel ocultos; DEMO visible al hacer scroll. |
| Sin JavaScript (1440 y 390) | Cuatro frames apilados con `opacity: 1`; intersección **0**; DEMO `display: block`; loader oculto. |
| Promos | `panel` y `agent` con natural 1600×1200, ratio 1,333, `object-fit: cover` y caja de imagen = caja de media: 696×718 a 1440, 337×518 a 768, 348×320/348×360 a 390 y 967×718 a 2560. Sin solape media↔texto. |
| Axe | 0 violaciones en home y `legal.html` a 390 y 1440. |
| Rendimiento | LCP 2,32 s, CLS 0,00006, 346 KB en 19 requests; la versión con capturas pesaba 791 KB. |
| Estático | `html-validate` exit 0; `css-tree` 4/4; `node --check scripts/main.js` exit 0. |
| Referencias | 0 apariciones de `assets/screens` en HTML, CSS, JS y README. |

Evidencia: `capturas/ilustraciones/` (capturas por viewport, reducido y sin JS), `reporte.json` y `RESUMEN.md`.

## Nota

Las ilustraciones son diagramas propios del proyecto, no capturas de producción: no contienen texto, cuentas ni datos reales. Las capturas históricas se conservan solo como evidencia en `docs/runs/.../capturas/`; la página ya no las usa. Los gates D3/G4/G5 del run siguen vigentes para el contenido; esta iteración es visual y se verificó con las comprobaciones de arriba.


## Feedback: teléfonos, primer collage y fondo

El usuario reportó que los teléfonos de las ilustraciones eran demasiado largos, que el primer collage se sentía alargado y que el fondo quedaba vacío.

### Arte

- `pairing`: teléfonos de 200×350 (ratio 0,57), más juntos, QR de 206, pantallas con contenido y tira de consentimiento. `agent` y `signals`: teléfonos 210×370 con pantallas de permisos/mensajes y más elementos.
- Las seis escenas se densificaron con tarjetas fantasma, nodos, trazas, corchetes y constelaciones; el foco sigue siendo el elemento de mayor contraste.
- Nuevo `assets/art/ambient.svg` (2560×1440) con órbitas, constelaciones, tarjetas fantasma y retícula al 10–25 %.

### Collage y fondo

- Rejilla del póster de 12×8 a **12×6**: tiles cuadrados/apaísados; el póster conserva 16:9, lockup y placas. Ajuste tablet 640–1023 para que el lockup no pise la placa «0».
- Ambient a sangre detrás del póster y capa fija en las secciones oscuras; la hoja clara de límites queda opaca. Los tiles y placas usan `cqi` para no recortarse.

### Rendimiento

- LCP **2,69 s** (mediana de 3 pasadas; 4G 1,6 Mbps/150 ms, CPU 4×), CLS 0,00006, **403 KB en 20 requests**. El elemento LCP es el lockup del hero; el loader quedó en 1500 ms y el lockup entra sin retardo con fade de 400 ms. Sigue 0,19 s sobre el objetivo de 2,5 s por la ruta crítica CSS/fuentes y la rasterización de los seis SVG del collage; se acepta como costo de la densidad visual.
- 12 imágenes de arte por página, 0 referencias a capturas, 8 tiles, sin solape arte/pie, axe 0 en home/legal, `html-validate`/`css-tree`/`node --check` OK.
