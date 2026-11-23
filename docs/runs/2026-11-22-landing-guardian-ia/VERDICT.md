# Veredicto: 2026-11-22-landing-guardian-ia

## Decisión

**PASS**

## Motivo

El sitio actual cumple el brief y los cuatro `HIGH` del goldfish están cerrados con medición reproducible; no quedan `CRITICAL`, `HIGH` ni `BLOCKER`, solo deuda declarada y un residual de copy `MEDIUM` que no contradice la promesa de privacidad.

## Gates

| Gate | Estado | Evidencia |
|---|---|---|
| **G2** | pass | `html-validate index.html legal.html` → exit 0; `css-tree` → 4/4 CSS OK; `node --check scripts/main.js` → exit 0; `GET /` 200 (38.096 B) y `GET /legal.html` 200 (12.609 B) en `127.0.0.1:4181`; 0 `console.error`, 0 `pageerror`, 0 requests fallidos; 23 `<img>` con `alt`. |
| **G3** | pass | Playwright 390/768/1440/2560: `scrollWidth = clientWidth`, 0 overflow; 4 CTA al APK; `HEAD` del asset 200, `application/vnd.android.package-archive`, 17.929.961 B; axe-core 4.14.1 con reglas por defecto: 0 violaciones en home/legal 390/1440, menú abierto y reduced; LCP 2.476 ms, CLS 0,00006, 23 requests / 712 KB (`perf.json`). **Reserva:** la suite no está versionada; la evidencia vive en `docs/runs/`. |
| **G4** | pass | `GOLDFISH.md` histórico: **APTO, 0 BLOCKER**. Los 4 `HIGH` están cerrados: 0 `mailto:` en home/legal, 3 enlaces a `github.com/roninwuajkja/guardiania/issues` (200; repo público, `has_issues=true`), copy actual «TEXTOS / ENVIADOS» / «No guarda ni envía el texto» / legal «se procesa en memoria y se descarta», axe default 0, política con `Responsable`, fecha 23-11-2026 y `Proveedores` (Firebase/Google, Render, proveedor de IA). **Nota:** `GOLDFISH.md` no trae la sección «Revalidación 2026-11-23» y `TEST-EVIDENCE.md` deja la revalidación pendiente; la re-verificación de los 4 `HIGH` es la de este veredicto, con `CORRECCIONES-GOLDFISH.md` y `TEST-EVIDENCE.md` §G4. |
| **D3** | pass | `AUDITORIA-UI.md`, re-auditoría 2026-11-23: **0 CRITICAL, 0 HIGH, 0 MEDIUM**. Spot-check propio: 8 tiles a 1440; `.brand` y `.nav__menu` 44×44 a 390; `DEMO · DATOS SINTÉTICOS` `display:block` a 390; cifras de la declaración `opacity:1` / `is-in:true` en 1366×768 (p=0,5 y p=0,9; gap cifras→pin 44–48 px, muy por encima del mínimo de 10 px); 0 overflow. |

### Criterios del BRIEF

| # | Criterio | Evidencia | Estado |
|---|---|---|---|
| 1 | Se entiende qué es y qué no hace | Hero («CONTROL PARENTAL PARA ANDROID»), declaración y bloque «Lo que IA Guardian nunca hace»; lectura de contexto cero del goldfish: «el sitio se entiende». No hay test formal de 5 segundos con usuarios. | pass (proxy) |
| 2 | Descarga en ≤ 2 clics | Los 4 CTA de la home apuntan al asset directo del release v1.7.17; `HEAD` 200; QR al mismo asset. | pass |
| 3 | Ningún dato personal real | Capturas rotuladas «DEMO · DATOS SINTÉTICOS»; sin datos de menores reales. Quedan artefactos de demo local (`10.0.2.2`, «marito test 2») como deuda declarada. | pass con deuda |
| 4 | Rendimiento | LCP 2.476 ms / CLS 0,00006 con 1,6 Mbps, 150 ms y CPU 4× (`perf.json`). Margen de 24 ms sobre el umbral: frágil, pero medido. | pass |
| 5 | Accesibilidad | axe 4.14.1 default 0 violaciones en 6 contextos; foco visible; contraste medido 15,8 / 8,9 / 5,1:1. `color-contrast` quedó «incomplete» por fondos con imágenes, cubierto por medición manual. | pass |
| 6 | Movimiento | Loader, reveals, pins, crossfade y reduced motion implementados; contenido completo y legible con `reduce`; sin long tasks en scroll. No hay medición de 60 fps en GPU móvil real. | pass con reserva |
| 7 | 8 recursos de movimiento | Collage, declaración, secuencia de 4 frames, promocards, ticker, loader, menú overlay y toggle de movimiento están implementados y auditados. | pass |
| 8 | Cero archivos nuevos en el repo de IA Guardian | El landing no escribió en `Proyecto de Titulo App - GuarderIA`: los cambios abiertos allí son del 16–18/11, anteriores al run (22/11). El árbol no está limpio por trabajo previo ajeno, así que el «git status limpio» literal no se puede declarar. | pass con salvedad |

## Scorecard

| Eje | Puntuación | Evidencia |
|---|---|---|
| **Correctitud** | 4/5 | Hace lo que el brief pide: 10 bloques, legal, descarga directa, 8 fragmentos, responsive 320–2560, reduced motion y toggle. La promesa de privacidad es verificable en legal y FAQ. Residual: `index.html:378` dice «se descarta en memoria antes de calcular el vector», orden técnicamente imposible. |
| **Completitud** | 4/5 | Alcance del `PLAN.md` completo (P0–P7); faltan `og:*`/Twitter/canonical, `LICENSE`, suite versionada y CI, todos declarados como deuda. El workflow de Pages publica solo el sitio. |
| **Calidad** | 4/5 | Sistema visual propio y coherente (pine/sage, Archivo, grano, collage real), sin dependencias externas, 0 errores de consola, 8 tiles, targets 44×44. CSS de 89,6 KB sin comprimir frente al techo de 40 KB del `PLAN.md`; assets muertos y contrato de diseño desactualizado. |
| **Seguridad** | 4/5 | Sin backend, secretos, analítica ni scripts de terceros; enlaces externos con `rel="noopener"`. APK re-verificado con `apksigner verify --verbose` → esquemas v2/v3 `true`, RSA 4096, SHA-256 del asset `2719ee…8524`, certificado `2790d6…4687`; `aapt dump badging` → `versionName 1.7.17`, `versionCode 26`, `minSdk 26`, `targetSdk 35`. Sin CSP/`Referrer-Policy`; GitHub Issues es un canal público para derechos de privacidad; Actions usa tags, no SHA. |
| **Operabilidad** | 4/5 | Sin build: `python -m http.server` sirve la carpeta y ambas páginas responden 200; `README.md` y `.github/workflows/pages.yml` están. Sin smoke/CI versionado, workflow no ejercitado y landing sin repositorio Git propio. |
| **Documentación** | 3/5 | `TEST-EVIDENCE`, `CORRECCIONES`, `CORRECCIONES-GOLDFISH` y la auditoría son detallados y con mediciones. Pero `DISENO.md` sigue hablando de «mensajes leídos» y «sin leer nada», `SHIP.md` marca G4/G5 como pendientes, y las capturas de la re-auditoría muestran el copy anterior. `log.ndjson` termina en `reaudit.requested`. |
| **Mantenibilidad** | 3/5 | HTML/CSS/JS nativos, tokens y secciones separadas, un solo `main.js`; legible. Pero `sections.css` pesa 54,3 KB, hay assets muertos copiados a Pages, el contrato de diseño divergió del sitio y no hay tests ni licencia. |

Un 1 o 2 en cualquier eje obligaría a FAIL; ningún eje baja de 3.

## Hallazgos bloqueantes

| Severidad | Hallazgo | Dónde | Qué hacer |
|---|---|---|---|
| — | **Ninguno.** 0 `CRITICAL`, 0 `HIGH`, 0 `BLOCKER`. Los cuatro `HIGH` históricos del goldfish están cerrados y re-verificados. | — | — |

El residual de copy de la tarjeta de señales es `MEDIUM`, no `HIGH`: no afirma «no lee nada» ni oculta el procesamiento; la página legal y el FAQ sí dicen «se procesa en memoria y se descarta». Se recomienda corregirlo antes de producción, no bloquea el ship de este demo.

## Deuda aceptada

**Declarada y aceptada por el run/usuario (`SHIP.md`, `README.md`, `state.json`):**

- Suite de tests no versionada y sin CI de calidad; la evidencia vive en `docs/runs/`.
- `og:*`, Twitter Card, `canonical`, `manifest`, `robots.txt`, `sitemap.xml` y `404.html` ausentes.
- `LICENSE` del código, el copy y la marca ausente; solo las fuentes OFL tienen licencia.
- Capturas de demo local con `http://10.0.2.2:8000` y cuenta «marito test 2»; rotuladas como demo, pero inconsistentes con la persona sintética Camila/Matías/Sofía.
- Composición de las placas del collage a 2560 px (305×386/647, símbolo de 56 px) y columnas que no coinciden con `DISENO.md` §3.5.
- Texto legal como resumen de proyecto de título, no asesoría legal; sin prueba en Android físico ni instalación del APK.
- Sin CSP ni `Referrer-Policy`; GitHub Pages no permite todas las cabeceras.
- Carrera nav/ticker, hash/historial sin actualizar, marcador de sección en FAQ, assets muertos, landing sin `.git` y workflow no ejercitado.

**Observaciones nuevas de este veredicto, no bloqueantes:**

- **MEDIUM · Copy técnico:** `index.html:378` — «El texto se descarta en memoria antes de calcular el vector» invierte el orden. Debe decir: «El texto se procesa en memoria para derivar el vector y se descarta; no se almacena ni se envía».
- **MEDIUM · Legal:** el «Responsable del tratamiento» es «el autor del proyecto, identificado en el repositorio», sin nombre legal ni domicilio; el propio texto dice que se formalizarán antes de operar con datos reales. GitHub Issues es operativo, pero público: no es un canal confidencial para solicitudes con datos personales.
- **MEDIUM · Presupuesto CSS:** 89,6 KB sin comprimir frente a «CSS < 40 KB» del `PLAN.md`. `TEST-EVIDENCE.md` lo reinterpreta como 15,1 KB gzip; la reinterpretación no está aceptada explícitamente por el usuario.
- **MEDIUM · G4:** no hubo segunda pasada del goldfish después de las correcciones; el cierre de los 4 `HIGH` se verificó aquí, no en un nuevo informe del goldfish.
- **LOW · Documentación:** `DISENO.md`, `SHIP.md` y las capturas de la re-auditoría D3 no reflejan el copy actual; `log.ndjson` no registra la re-auditoría ni G4.
- **LOW · Medición:** no hay test formal de 5 segundos; LCP pasa por 24 ms y se midió en local; no hay FPS en GPU móvil real.

## Siguiente acción

**Ship (G6).** Actualizar `SHIP.md` con G4/G5 en pass y publicar en el repositorio que confirme el usuario; no hay que reabrir G2, G3, G4 ni D3.

Antes de operar con datos reales de menores (fuera de este demo): corregir el `MEDIUM` de copy de la tarjeta de señales y formalizar responsable legal, domicilio y un canal confidencial de derechos. Eso es deuda de producción, no del ship de la landing.
