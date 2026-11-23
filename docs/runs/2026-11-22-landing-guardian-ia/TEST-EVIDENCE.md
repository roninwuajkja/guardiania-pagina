# TEST-EVIDENCE — Landing de descarga de IA Guardian

**Run:** 2026-11-22-landing-guardian-ia
**Fecha:** 2026-11-23
**Sitio:** `C:\Users\Usuario\Desktop\Guardian IA Pagina`
**Servidor:** `python -m http.server 4173 --bind 127.0.0.1`

## Alcance de la prueba

Es un sitio estático sin build ni lógica de negocio. No aplica cobertura de unidades.
La suite cubre:

1. Carga de la home y de `legal.html`.
2. Descarga: los 4 enlaces al APK apuntan al asset correcto y responden 200.
3. Navegación: menú `<dialog>`, foco, Escape, bloqueo de scroll, enlaces del menú.
4. Contenido: FAQ, acordeón, `aria-expanded`, una abierta a la vez.
5. Movimiento: loader, reveals, secuencia fijada, riel, reduced motion y toggle.
6. Responsive: 320, 360, 390, 640, 768, 1024, 1280, 1440, 1920 y 2560.
7. Accesibilidad: axe-core WCAG 2.0/2.1/2.2 A y AA.
8. Enlaces y assets: 25 archivos locales, 5 enlaces externos.
9. Rendimiento: LCP, CLS y peso con red 4G simulada y CPU 4×.

## G2 — Build

| Comprobación | Comando | Resultado |
|---|---|---|
| HTML válido | `npx html-validate index.html legal.html` | exit 0, 0 errores |
| CSS parseable | `css-tree.parse` sobre los 4 archivos | OK |
| JS sintaxis | `node --check scripts/main.js` | exit 0 |
| Servidor | `python -m http.server 4173` | HTTP 200 en `/` y `/legal.html` |
| Consola | Playwright, 3 viewports | 0 `console.error`, 0 `pageerror` |
| Requests | Playwright | 0 fallidos |
| Imágenes | Playwright | 0 rotas, 23 `<img>` con `alt` |

No hay paso de compilación: los archivos se sirven tal cual. El "build verde" es la
validación estática más el servidor local.

## G3 — Suite de humo

**Herramientas:** Playwright 1.65.1 con Microsoft Edge (Chromium), axe-core 4.14.1,
servidor HTTP de Node, Windows 11.

### 3.1 Carga y responsive

- 390×844, 1440×900, 2560×1440: `document.documentElement.scrollWidth === clientWidth`.
- Barrido adicional 320, 360, 640, 768, 1024, 1280, 1920: sin overflow.
- Una sola `<h1>` por página.
- Loader: visible a 250 ms, dos cortinas, se retira antes de 1,2 s; `sessionStorage`
  evita repetirlo en la misma sesión.
- Sin JS o con `main.js` bloqueado: el fallback retira el loader y muestra el contenido.

### 3.2 Descarga

- Los 4 CTA (nav, hero, bloque final, footer) apuntan a
  `https://github.com/roninwuajkja/guardiania/releases/download/v1.7.17/app-release.apk`.
- `HEAD` al asset: `200`, `application/vnd.android.package-archive`,
  `17.929.961` bytes.
- Release, changelog, repositorio y atlas: `200`.
- QR generado con `qrcode` apunta al mismo asset.
- Verificación independiente del APK (goldfish, build-tools 35.0.0): el archivo descargado es un APK real, `cl.guardiania.agent`, `versionName 1.7.17`, `versionCode 26`, `minSdk 26`, `targetSdk 35`, ABIs `arm64-v8a` y `armeabi-v7a`. `apksigner` valida esquemas **v2 y v3**, certificado RSA 4096 `CN=IA Guardian, OU=Titulo, O=GuardianIA, L=Santiago, ST=RM, C=CL`.
- SHA-256 del asset: `2719eeaaaf673ef4e7d9917690b4dd94cfac1e4d576abb3187e9b1e2dfc98524`. SHA-256 del certificado: `2790d68383b8e29eb67d26ed064acf82eab823dc2d642901c31ce0fac5504687`.
- El QR decodifica exactamente a la URL del APK.

### 3.3 Navegación y controles

- Menú: `showModal()`, foco al primer enlace, Tab atrapado, Escape cierra,
  foco devuelto al botón, `overflow` bloqueado, `aria-expanded` correcto.
- Toggle de movimiento: alterna `data-motion`, persiste en `localStorage`,
  actualiza `aria-pressed` y el texto "Activado/Reducido".
- FAQ: una respuesta abierta a la vez; `aria-expanded="true"` y panel visible;
  cierre por teclado; `inert` en paneles cerrados.
- Anclas internas: 0 rotas; IDs únicos.

### 3.4 Accesibilidad

- axe-core 4.14.1 con las **reglas por defecto** (además de los tags `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa`): **0 violaciones** en home 390/1440, `legal.html` 390/1440, menú abierto y modo reducido. La primera pasada se limitó a tags WCAG y no incluyó `label-content-name-mismatch`; la pasada del goldfish detectó 1 `serious` en `.hero__scroll` (texto visible «DESLIZA» fuera del `aria-label`). Se corrigió el nombre accesible y la corrida final con reglas por defecto da 0.
- Foco visible en todos los interactivos.
- Contraste: Paper/pine 15,8:1; sage 300/pine 8,9:1; texto secundario 5,1:1.
- Imágenes decorativas con `alt=""`; capturas con `alt` descriptivo.
- Un solo `<h1>`; jerarquía sin saltos.
- `prefers-reduced-motion`: sin loader animado, sin pin, 4 frames apilados,
  0 reveals ocultos.

### 3.5 Rendimiento

Medición con Edge headless, viewport 1440×900, red simulada 1,6 Mbps de bajada,
150 ms de latencia y CPU 4× más lenta:

| Métrica | Valor | Umbral | Estado |
|---|---|---|---|
| LCP | 2.476 ms (pasada en frío) · mediana 2.036 ms en 3 pasadas | < 2.500 ms | PASS |
| CLS | 0,00006 | < 0,1 | PASS |
| Long tasks | 1 en carga, 0 en scroll | — | PASS |
| Peso total | 712 KB / 23 requests | — | OK |
| JS | 15,3 KB | < 18 KB | PASS |
| CSS | 87 KB sin comprimir (15,1 KB gzip) | < 40 KB gzip | PASS |

El LCP es el lockup SVG. La primera medición quedó en 2.508 ms; se bajó el tope del
loader de 2.200 a 1.900 ms y la cortina de salida de 960 a 800 ms, y se marcaron el
lockup y la primera captura con `fetchpriority="high"`. La pasada en frío posterior
quedó en 2.476 ms y la mediana de tres pasadas en 2.036 ms. GitHub Pages sirve con
compresión, por lo que el peso real de CSS/JS será menor.

## D3 — Correcciones post-auditoría

La auditoría independiente (`AUDITORIA-UI.md`) devolvió FAIL con 1 CRITICAL y 3 HIGH.
Corregidos y medidos de nuevo:

### CRITICAL · Declaración en alturas cortas

Causa: el bloque no cabía en el pin y el `rootMargin: -8%` impedía el reveal de las cifras.
Se escaló el título con `min(10.9vw, 13.5vh)`, se redujeron márgenes/padding en
`max-height: 850px` y el observer pasó a `rootMargin: 0`.

| Viewport | Cifras bottom | Pin bottom | Margen | opacity / is-in |
|---|---:|---:|---:|---|
| 1366×768 | 729 | 768 | 39 px | 1 / true |
| 1440×800 | 755 | 800 | 45 px | 1 / true |
| 1280×720 | 692 | 720 | 28 px | 1 / true |
| 1024×768 | 721 | 768 | 47 px | 1 / true |
| 1440×900 | 852 | 900 | 48 px | 1 / true |

### HIGH

| Hallazgo | Corrección | Evidencia |
|---|---|---|
| Targets móviles 34×44 / 32×44 | Hit area a 44×44 sin cambiar símbolo ni burger, home y legal | `brand 44×44`, `nav__menu 44×44` a 390 |
| Collage de 7 fragmentos | Panel de privacidad en 11/13×1/4; alerts a 8/11; «0» en 11/13×4/9 | `document.querySelectorAll('.hero__tile').length = 8`; 0 intersecciones lockup ↔ plates a 1440 y 2560 |
| Rótulo DEMO oculto | `display:block` siempre; en flujo tras los frames en móvil/reduced | 390 y reduced: `display:block`; 1440: abajo-izquierda |

### MEDIUM

| Hallazgo | Corrección | Evidencia |
|---|---|---|
| 4 frames en el árbol AX | `aria-hidden` + `inert` en inactivos; activo expuesto; todos expuestos en móvil/reduced | frame 02: activo sin aria, otros 3 `aria-hidden=true`, `inert=true` |
| Activo del menú solo por color | Flecha persistente sage en `[aria-current]` | `menu__arrow opacity:1`, `transform:none`, `color: sage-300` |
| Foco a BODY desde el menú | `tabindex="-1"` en secciones y foco al destino | clic en Producto → `activeElement = SECTION#producto` |
| Borde ghost 2,28:1 | Sage al 50 % | contraste compuesto 3,26:1 |
| Ticker reduced cortado | Tratamiento de 3 spans centrados en reduced para todo ancho; duplicado oculto y máscara desactivada | 390: 65–325; 768: 254–514; 1440: 590–850; `scrollWidth = innerWidth` en los tres |
| Zoom 200 % recorta el título | `max-width:100%`, `overflow-wrap:anywhere`, tope en vw | scrollWidth 390, título 26–364 px |
| Foco programático dibujaba un marco de sección | `main section[tabindex="-1"]:focus { outline:none }`; controles conservan su outline | `SECTION#producto` sin outline; Tab en brand/menu/CTA con 2 px sage |

### LOW corregidos

`.ext-mark` con separación; pasos de descarga alineados; «Android 8.0+» unificado;
alt de `android-status` ajustado; scrim local en la esquina `01`.

## G4 — Correcciones del goldfish

El goldfish con contexto cero dio **APTO G4 (0 BLOCKER)** pero marcó 4 HIGH de publicación. Cerrados:

| HIGH | Corrección | Verificación |
|---|---|---|
| Dominio `guardiania.cl` inexistente; correos muertos | `legal.html` usa GitHub Issues como canal operativo y declara el buzón como previsto, no habilitado; sin `mailto:` | 0 `mailto:`; enlaces a `github.com/roninwuajkja/guardiania/issues` 200 |
| «No lee los mensajes» / «0 mensajes leídos» contradice el procesamiento en memoria | «TEXTOS / ENVIADOS», «textos enviados», «No guarda ni envía el texto»; FAQ y legal explican que se procesa en memoria y se descarta | `index.html` sin «leídos»; legal con la aclaración |
| Axe `label-content-name-mismatch` en `.hero__scroll` | `aria-label="Desliza para bajar a la idea"` | axe 4.14.1 con reglas por defecto: 0 en home y legal a 390/1440 |
| Política sin responsable, fecha ni terceros | Sección «Responsable», fecha/versión, base de licitud, Firebase/Google, Render y proveedor de IA | `legal.html` renderizada; 0 errores de consola |

Extras del goldfish:

| Punto | Estado |
|---|---|
| Checksum del APK | `<details>` en `#descarga` con SHA-256 `2719ee…8524` y certificado `2790d6…4687`; `apksigner` validó v2/v3, RSA 4096 |
| FAQ sin JS | `@media (scripting: none)` expande las 6 respuestas; verificado con JS desactivado |
| Frames sin JS | Los 4 frames quedan apilados y visibles (`opacity:1`) sin JS |
| Toggle híbrido | Deshabilitado y en «Reducido por el sistema» cuando el SO pide reducción |
| Captura de emulador | Subtítulo «Cuatro pantallas de la demo local. Datos sintéticos.» |
| Suite reproducible / OG / LICENSE | Deuda aceptada; ver `VERDICT.md` |

Pendiente de revalidación por el goldfish al cierre de este documento.

## G6 — Publicación

- Repo público: <https://github.com/roninwuajkja/guardiania-pagina>
- Sitio: <https://roninwuajkja.github.io/guardiania-pagina/>
- Workflow `.github/workflows/pages.yml`, run `45196993318`: build 5 s + deploy 9 s, success.
- Primer run `45196855124` falló al crear el sitio Pages con el `GITHUB_TOKEN`; se habilitó Pages por API (`build_type=workflow`) y se relanzó.
- Verificación pública: home 200 (38.096 B), `legal.html` 200 (12.809 B), CSS/JS/WebP/SVG 200.
- Playwright sobre la URL pública, 390×844 y 1440×900: 0 errores de consola, 0 requests fallidos, sin overflow, 8 tiles, descarga al APK correcta; legal con 0 `mailto:` y 3 enlaces a GitHub Issues.
- Capturas: `capturas/public-home-1440.png`, `capturas/public-legal-1440.png`.

## Cobertura de flujos críticos

| Flujo | Cubierto |
|---|---|
| Llegar a la landing y entender qué es | Sí (hero + declaración) |
| Descargar el APK desde el hero | Sí (href verificado) |
| Descargar desde el bloque final / nav / footer | Sí (4 enlaces) |
| Abrir y cerrar el menú con teclado | Sí |
| Leer una respuesta del FAQ | Sí |
| Navegar con movimiento reducido | Sí |
| Consultar privacidad y términos | Sí (`legal.html`) |
| Volver desde legal a la home | Sí |

No hay formularios, login ni pagos en la landing; no hay flujos adicionales.

## Limitaciones conocidas

- No se probó en un teléfono Android físico; solo en Chromium con viewports móviles.
- El APK no se instaló en este run; se verificó por `HEAD` y por el tamaño del asset.
- Las capturas de la app son sintéticas (rótulo visible en la secuencia).
- El motor de riesgo es heurístico; la landing lo declara.
- Los correos de privacidad/seguridad son los documentados en el repo; no se verificó
  que el buzón esté operativo.

## Evidencia

- `capturas/` — capturas de home, secuencia, límites, descarga, menú y legal.
- `report.json` — salida cruda de Playwright (consola, overflow, axe, menú).
- `perf.json` — salida cruda de la medición de rendimiento.
