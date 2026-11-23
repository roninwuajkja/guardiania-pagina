# Goldfish: 2026-11-22-landing-guardian-ia

## Veredicto

**APTO (G4: 0 BLOCKER).**

El sitio se entiende, se sirve y su descarga principal funciona. **No está listo para publicarse** hasta cerrar los cuatro `HIGH`: el dominio de contacto legal no existe, la promesa central de privacidad se contradice con el propio copy, la afirmación de “0 violaciones axe a 1440” es falsa y la política legal no identifica responsable ni terceros que el APK sí declara.

## Qué hace el proyecto

Landing estática en español de Chile para **IA Guardian**, una app Android de control parental que analiza señales en el dispositivo del menor y, según el copy, envía solo un vector derivado en vez del texto. Está dirigida a tutores de menores con Android: explica el producto, muestra cuatro pantallas de demo con datos sintéticos, resume privacidad y límites, y ofrece el APK v1.7.17 alojado en GitHub Releases, con QR, requisitos y FAQ. Es un proyecto de título 2026, sin build, backend propio en la landing, analítica ni cookies.

## Cómo se corre

No hay instalación ni build: no existe `package.json`, `pyproject.toml`, `go.mod` ni equivalente. Se sirve la carpeta tal cual.

```bash
cd "C:\Users\Usuario\Desktop\Guardian IA Pagina"
python -m http.server 4183 --bind 127.0.0.1
```

Resultado: **éxito**. `GET /` devolvió `200` con 37.432 bytes; `GET /legal.html` devolvió `200` con 11.248 bytes. También serví la carpeta padre en `4184` y comprobé `GET /Guardian%20IA%20Pagina/` y `/legal.html`: ambos `200`, así que las rutas relativas funcionan en subdirectorio.

## Cómo se prueba

**No documentado como suite ejecutable.** El README describe verificaciones manuales y remite a `docs/runs/` para la evidencia, pero no hay comando de tests, runner, `package.json` ni script de humo versionado (el propio README lo admite en la línea 102). Los JSON y capturas del run no se publican con el sitio.

Verificaciones independientes que sí ejecuté:

```bash
node --check scripts/main.js
# HTML: POST a https://validator.w3.org/nu/?out=json con index.html y legal.html
# Enlaces: curl -sIL a repo, release, changelog y atlas
# APK: curl -sIL; descarga; aapt dump badging; apksigner verify --print-certs
# QR: reconstrucción de la matriz del SVG y decodificación con OpenCV
# Axe 4.14.1: inyectado desde CDN en la página servida (no forma parte del repo)
```

Resultado: **sin tests del proyecto; mis comprobaciones pasan salvo los hallazgos de abajo.** `node --check` sin errores; W3C: 0 errores en home y legal (7 avisos informativos de `<section>` sin encabezado, todos con `aria-labelledby`); enlaces externos 200; APK real y firmado; QR correcto; axe 0 en 390, 0 en legal y **1 violación `serious` en home a 1440**.

## Checklist de lo que funciona

- [x] Home y `legal.html` responden 200 en local.
- [x] Las 56 referencias locales de `index.html` y las 26 de `legal.html` existen; 0 rutas faltantes.
- [x] 21 `<img>` en home y 2 en legal, todas con atributo `alt` (14 decorativas con `alt=""`); las imágenes diferidas cargan al entrar en viewport.
- [x] 0 errores de consola en la carga de home.
- [x] Sin overflow horizontal: `scrollWidth` 390/390 a 390 px y 1425/1425 a 1440 px.
- [x] Menú `<dialog>`: abre, cierra con Escape, atrapa foco, devuelve foco al botón y bloquea scroll.
- [x] FAQ: una respuesta abierta a la vez, `aria-expanded` correcto e `inert` en paneles cerrados.
- [x] Movimiento reducido: sin loader, sin animaciones, los 4 frames de producto apilados y legibles; el toggle muestra “Reducido” y `aria-pressed="false"`.
- [x] Descarga: los 4 enlaces de home y el 1 de legal apuntan al mismo asset; `HEAD` final 200, `Content-Length: 17929961`, `Content-Type: application/vnd.android.package-archive`, `Content-Disposition: attachment; filename=app-release.apk`.
- [x] El archivo descargado es un ZIP/APK real; `apksigner` verifica esquemas **v2 y v3**, certificado `CN=IA Guardian, OU=Titulo, O=GuardianIA, L=Santiago, ST=RM, C=CL`, RSA 4096.
- [x] Metadata del APK coincide: `cl.guardiania.agent`, `versionName 1.7.17`, `versionCode 26`, `minSdk 26` (Android 8.0), `targetSdk 35`, ABIs `arm64-v8a` y `armeabi-v7a`.
- [x] El QR decodifica exactamente `https://github.com/roninwuajkja/guardiania/releases/download/v1.7.17/app-release.apk`.
- [x] Enlaces externos vivos: repositorio, release v1.7.17, `CHANGELOG.md` y atlas devuelven 200.
- [x] Consistencia de versión: `1.7.17` aparece 12 veces en `index.html` y 5 en `legal.html`; no hay versiones mezcladas.
- [x] Sin analítica ni scripts de terceros: todas las peticiones de la página son locales; solo usa `localStorage` para `ia-guardian-motion` y `sessionStorage` para el loader.
- [x] HTML válido y JS parseable; la página funciona desde raíz o subdirectorio.
- [x] Existe workflow de GitHub Pages que publica solo `index.html`, `legal.html`, `assets/`, `styles/` y `scripts/`, sin `docs/`.
- [x] Assets de marca y fuentes están autoalojados; las licencias OFL de Archivo y Spline Sans Mono están incluidas.

## Huecos

| Severidad | Hallazgo | Evidencia | Sugerencia |
|---|---|---|---|
| **HIGH** | El dominio de los correos legales no existe: `privacidad@guardiania.cl` y `seguridad@guardiania.cl` no pueden recibir solicitudes. | `nslookup guardiania.cl` devuelve `Non-existent domain`; `Resolve-DnsName guardiania.cl -Type MX/A/NS` no devuelve nada, mientras `github.com` resuelve. `legal.html` líneas 108 y 140 usan esos buzones y prometen acuse en 5 días hábiles. | Registrar el dominio y habilitar buzones reales, o reemplazar por un canal verificado (formulario, correo institucional) antes de publicar. |
| **HIGH** | La promesa central de privacidad se contradice con el propio copy: “No lee el contenido de los mensajes” y “0 mensajes leídos” frente a “el texto se descarta en memoria antes de calcular el vector”. | `index.html` línea 270 (`0 mensajes leídos`), 468 (`No lee el contenido de los mensajes`), 377 y 594 (`el texto se descarta`); `legal.html` línea 82 dice que nunca se recolecta el texto. La captura `android-status.webp` muestra “El texto se descarta en el teléfono”. | Cambiar a formulaciones verificables: “No guarda ni transmite el texto”, “0 mensajes almacenados/enviados”. Aclarar que el texto de notificaciones se procesa en memoria y se descarta. Revisar todo el copy con la misma definición. |
| **HIGH** | Hay una violación de accesibilidad `serious` a 1440 px: el enlace “DESLIZA” tiene nombre accesible “Bajar a la idea”, que no contiene el texto visible (WCAG 2.5.3, Label in Name). | Axe 4.14.1 sobre home a 1440×900: `label-content-name-mismatch`, impacto `serious`, nodo `.hero__scroll`. `index.html` línea 247: texto visible `DESLIZA`, `aria-label="Bajar a la idea"`. El README línea 81 afirma 0 violaciones a 1440. | Usar `aria-label="Desliza: bajar a la idea"` o quitar el `aria-label` y dejar que el texto visible sea el nombre. Reejecutar axe y corregir el README. |
| **HIGH** | La política legal no identifica al responsable del tratamiento ni la fecha de vigencia, y omite terceros que el APK sí declara (Firebase/Google y el hosting del backend). | `legal.html` no contiene nombre legal, RUT, domicilio, responsable ni “última actualización”. El manifiesto del APK declara `com.google.firebase.messaging.FirebaseMessagingService`, `FirebaseInstanceIdReceiver`, `FirebaseInitProvider` y `com.google.android.c2dm.permission.RECEIVE`; `classes.dex` contiene `https://guardiania-74l4.onrender.com/`. La política solo menciona “proveedor de IA” y “servidor del proyecto”. | Añadir responsable, domicilio, fecha de vigencia, base legal, transferencias y subencargados (hosting, push/Firebase, proveedor de IA). Verificar si Firebase transporta contenido o solo tokens. |
| **MEDIUM** | No hay suite de tests reproducible ni CI de calidad; la evidencia vive en `docs/runs/`, que no se publica. | No existe `package.json`, `playwright.config`, `tests/` ni comando de test. README línea 102: “El script de humo no está versionado en esta carpeta”. | Versionar un smoke test (servidor local, enlaces, axe, overflow, descarga) y ejecutarlo en GitHub Actions antes de publicar. |
| **MEDIUM** | El toggle “Movimiento” puede quedar en estado híbrido e inconsistente cuando el sistema operativo pide movimiento reducido. | Con `prefers-reduced-motion: reduce`, al pulsar el toggle queda `data-motion="auto"` y `aria-pressed="true"`, pero `ticker` y `hero` siguen sin animación (`animationName: none`), el scroll sigue `auto` y el `sequence` mide 5342 px con 3 frames marcados `aria-hidden` aunque visibles. El CSS `@media (prefers-reduced-motion: reduce)` sigue aplicando. | O se desactiva el toggle cuando el SO pide reducción, o se elimina el `@media` duplicado y se controla todo por `data-motion`, manteniendo visible/AT coherentes. |
| **MEDIUM** | Sin JavaScript, la FAQ queda visualmente colapsada y no se puede abrir. | `sections.css` línea 2004: `.faq__panel { grid-template-rows: 0fr }`; la expansión depende de `html.js-fallback` añadido por JS. `@media (scripting: none)` no incluye una regla para `.faq__panel`. Derivado del CSS; no lo verifiqué en un navegador con JS desactivado. | Usar `<details>/<summary>` o añadir en `@media (scripting: none)` `.faq__panel { grid-template-rows: 1fr }` y ocultar el icono. |
| **MEDIUM** | Las capturas de producto muestran una dirección de emulador (`http://10.0.2.2:8000`) en la pantalla de vinculación, aunque el APK apunta a un backend público. | `assets/screens/android-pairing.webp` muestra “Dirección del panel: http://10.0.2.2:8000” y “Emulador 10.0.2.2:8000”; `classes.dex` contiene `https://guardiania-74l4.onrender.com/`. | Regenerar la captura con la URL de producción o un campo vacío, y rotularla como demo. |
| **MEDIUM** | No se publica checksum ni huella de firma del APK, pese a que se promete “APK firmado” y se distribuye fuera de Play Store. | El sitio no incluye SHA-256 ni fingerprint; `apksigner` calcula certificado SHA-256 `2790d68383b8e29eb67d26ed064acf82eab823dc2d642901c31ce0fac5504687`. | Publicar SHA-256 del asset y huella del certificado junto al botón, y enlazar instrucciones de verificación. |
| **LOW** | El menú móvil puede quedar tapado por el ticker durante la transición de 220 ms al volver arriba, y el clic en el botón falla si se hace en ese instante. | En una prueba tras `scrollTo(0,0)`, el clic devolvió “ticker__copy … is on top of it at (345,32)”; en carga limpia el botón está en y=63,5 y funciona. El nav pasa de `top:0` a `top:42px` con transición de 220 ms y el ticker tiene `z-index:70` frente a `60`. | Subir el nav por encima del ticker o retirar el `top` animado; no es reproducible en carga limpia, pero es un fallo real de carrera. |
| **LOW** | Al navegar desde el menú no se actualiza el hash de la URL ni el historial. | `main.js` líneas 175-180 hacen `preventDefault` y `scrollTo`; tras pulsar “Preguntas”, `location.hash` queda vacío y no hay entrada de historial. | Usar `history.pushState` o dejar la navegación nativa con `scroll-behavior: smooth`. |
| **LOW** | El indicador de sección actual se pierde en la FAQ. | A `scrollY` 12016, los `<section id="faq-a1">`…`faq-a6` son los últimos bajo el marcador; el alias solo mapea `idea` y `panel`, así que ningún `[data-navlink]` recibe `aria-current` (en `#senales` sí funciona). | Filtrar a secciones de primer nivel o mapear `faq-a*` a `#preguntas`. |
| **LOW** | No hay `LICENSE` para el código, el copy ni la marca; solo están las licencias OFL de las fuentes. | Inventario sin `LICENSE`, `COPYING` ni aviso equivalente; `assets/fonts/OFL-*.txt` cubre solo las fuentes. | Añadir una licencia explícita para el sitio y otra nota para marca/capturas, o declarar “todos los derechos reservados”. |
| **LOW** | Faltan metadatos de compartición y publicación: no hay Open Graph/Twitter Card, `manifest.webmanifest`, `robots.txt`, `sitemap.xml` ni `404.html`; los iconos PWA están sin manifiesto. | `index.html` solo tiene `title`, `description`, `theme-color` y favicons; no hay `og:*`, `twitter:*` ni `<link rel="manifest">`. Los `icon-192.png`, `icon-512.png` y `maskable-512.png` no se referencian. | Añadir OG/Twitter, manifiesto si se quieren instalar los iconos, `robots.txt`/sitemap y una 404 propia. |
| **LOW** | Hay assets muertos y peso innecesario en el repo/artefacto. | Sin referencias: `b-vinculo-horizontal.svg`, `b-vinculo-stacked.svg`, `b-vinculo-symbol-reverse.svg`, `b-vinculo-symbol-small*.svg`, `b-vinculo-wordmark.svg`, `favicon-32.png`, iconos PWA, 3 `k3k*.woff2` (47 KB), 5 PNG de capturas (1,4 MB), `web-mobile-bg.webp` y `web-pairing-bg.webp`. El workflow copia todos los `assets/brand` y `assets/fonts`, incluidos los no usados. | Eliminar o mover a una carpeta de origen no publicada; copiar solo lo referenciado. |
| **LOW** | La carpeta no es un repositorio Git y el workflow de Pages no se puede ejercitar desde esta copia. | `git ls-files` devuelve `fatal: not a git repository`; existe `.github/workflows/pages.yml`, pero no hay `.git`, remoto ni historial. | Inicializar/versionar el repo antes de publicar y probar el workflow en una rama de staging. |
| **LOW** | La landing no define CSP ni cabeceras de endurecimiento; el backend sí las tiene. | `index.html` y `legal.html` no tienen `Content-Security-Policy` ni `Referrer-Policy`; el backend `guardiania-74l4.onrender.com` responde con CSP, `X-Frame-Options`, `nosniff` y `Permissions-Policy`. La landing usa scripts inline, así que una CSP requeriría hashes. | Añadir al menos CSP por `<meta>` con hashes y `Referrer-Policy`; asumir que GitHub Pages no permite todas las cabeceras. |

## Qué me confundió

- El README afirma “0 violaciones axe a 390 y 1440”, pero a 1440 encontré una violación `serious` en `.hero__scroll`. No sé si la evidencia del run excluyó ese CTA o si el CSS cambió después; la afirmación, tal como está, no se sostiene.
- “No lee el contenido de los mensajes” y “0 mensajes leídos” conviven con “el texto se descarta en memoria”. No queda claro si “leer” significa “leer para el tutor”, “almacenar” o “procesar”. Para una app de menores, la ambigüedad es material.
- El README dice que sin JS el fallback “muestra el contenido”, pero la FAQ sigue cerrada por CSS si el scripting está desactivado. El fallback existe solo si el JS alcanza a añadir `js-fallback`.
- El toggle “Movimiento” dice “Activado” incluso cuando el sistema operativo sigue imponiendo reducción; no sé si la intención es respetar siempre al SO o permitir override. Hoy hace una mezcla.
- La pantalla de vinculación de las capturas muestra `10.0.2.2:8000` (emulador), pero el APK contiene un backend público en Render. No sé si es un default de desarrollo o una captura de una build antigua.
- El README presenta `docs/runs/` como la evidencia completa, pero esa carpeta no se publica y el script que produjo los JSON no está versionado. Para un tercero, las métricas de LCP/CLS/axe no son reproducibles.

## Limitaciones de esta validación

- No instalé el APK en un Android físico ni ejecuté el flujo real de cuenta, verificación por correo, vinculación o consentimiento. Solo verifiqué metadata, firma, permisos declarados y que el backend responde.
- No verifiqué el contenido de las 38 reglas ni que el texto se descarte realmente en el código de la app; eso requiere auditoría del APK y del backend.
- No probé la creación de cuenta ni el envío de notificaciones. La raíz del backend agotó 40 s (cold start) y `/api/health` devolvió 404 con el servidor vivo; no concluyo que el flujo completo funcione.
- No probé el despliegue real en GitHub Pages porque esta copia no es un repositorio Git.
- No probé los correos: el dominio no resuelve, así que no hay MX que probar.
- No medí LCP/CLS con red 4G ni CPU 4×; el servidor local y la caché del navegador no son representativos.
- La comprobación de “sin JS” es derivada del CSS/JS, no la ejecuté en un navegador con scripting desactivado.
- El servidor `python -m http.server` entrega `.webp` y `.woff2` como `application/octet-stream`; Chrome los cargó, pero no es un MIME de producción. GitHub Pages sí sirve los tipos correctos.

## Entorno

- SO: Windows 11 (win32)
- Runtime: Python 3.12.10; Node v24.22.1; Brave (automatización); Android build-tools 35.0.0 (`aapt`, `apksigner`)
- Fecha: 2026-11-23


## Anexo

VerificaciÃ³n independiente con contexto cero sobre el sitio servido en `http://127.0.0.1:4181/` (2026-11-23). No se modificÃ³ cÃ³digo ni assets. No se contrastÃ³ con el informe principal para no contaminar la lectura; si alguno de estos puntos ya estÃ¡ listado, tÃ³mese como confirmaciÃ³n independiente.

| Severidad | Hallazgo | Evidencia | Sugerencia |
|---|---|---|---|
| HIGH | El dominio de los correos legales no existe: `privacidad@guardiania.cl` y `seguridad@guardiania.cl` no pueden recibir solicitudes de derechos ni reportes de incidentes. | `Resolve-DnsName guardiania.cl -Type A` (y `MX`, `NS`) devuelve Â«El nombre DNS no existeÂ» contra el resolver local, `1.1.1.1` y `8.8.8.8`; `Invoke-WebRequest https://guardiania.cl/` falla en resoluciÃ³n. Los enlaces estÃ¡n en `legal.html:108` y `legal.html:140`, con plazos de respuesta de 5 y 20 dÃ­as hÃ¡biles. | Publicar un buzÃ³n real en un dominio operable (o un formulario de contacto) antes de invitar a descargar; si no existe, retirar los plazos y declarar el canal como no operativo. |
| MEDIUM | Las capturas de producto muestran un build de desarrollo y una persona distinta a la demo: la pantalla de vinculaciÃ³n apunta a `http://10.0.2.2:8000` y la de estado muestra Â«marito test 2 / Tutor: MarioÂ», mientras el resto de la landing usa la persona sintÃ©tica Camila/MatÃ­as/SofÃ­a. | `assets/screens/android-pairing.webp` (usada en `index.html:202` y `index.html:329`) muestra el endpoint de emulador; `assets/screens/android-status.webp` (usada en `index.html:192`, `index.html:340` y `index.html:439`) muestra Â«marito test 2Â». El README y la secciÃ³n de producto afirman datos sintÃ©ticos y Â«DEMO Â· DATOS SINTÃ‰TICOSÂ». | Regenerar las capturas con el panel pÃºblico y una sola persona sintÃ©tica, o rotularlas visiblemente como build de desarrollo. |
| LOW | No hay metadatos sociales ni `canonical`: al compartir el enlace (el canal natural de una landing de descarga) no hay tÃ­tulo, descripciÃ³n ni imagen de preview. | `index.html:3-20` y `legal.html:3-18` solo tienen `meta description`, `theme-color`, favicons y preloads; no hay `og:*`, `twitter:*` ni `rel="canonical"`. | AÃ±adir `og:title`, `og:description`, `og:image` (1200Ã—630), `og:url`, `twitter:card` y canonical en ambas pÃ¡ginas. |
| LOW | Sin JavaScript, las respuestas del FAQ y 3 de las 4 pantallas de producto quedan ocultas: el CSS las colapsa y solo `scripts/main.js` las abre. | `.faq__panel { grid-template-rows: 0fr }` en `styles/sections.css:2004`, `.sequence__frame { opacity: 0 }` en `styles/sections.css:1118`, y los toggles viven en `scripts/main.js:298-307`. No hay `<noscript>` ni `<details>`. | Usar `<details>/<summary>` para el FAQ o un fallback `<noscript>` que muestre respuestas y los cuatro frames. |

Verificado sin hallazgos en esta pasada: APK real (`HEAD` 200, `application/vnd.android.package-archive`, 17.929.961 bytes, 17,9 MB), QR decodificado con OpenCV y apunta exactamente a ese APK v1.7.17, home y legal sin overflow horizontal ni errores de consola a 390Ã—844 y 1440Ã—900, menÃº y FAQ operativos, y `prefers-reduced-motion` deja legibles los contadores y los cuatro frames.


## Revalidación 2026-11-23

**Alcance:** solo los 4 HIGH del informe anterior y regresiones. No leí `CORRECCIONES-GOLDFISH.md` ni `capturas/goldfish/`: validé contra el sitio servido en `http://127.0.0.1:4181/`. No levanté otro servidor.

**Nota de método:** la primera carga de `legal.html` en el navegador sirvió una copia vieja desde caché (mostraba 3 `mailto:`). Tras `reload` con `ignoreCache`, la respuesta fue la versión nueva. Todas las comprobaciones de abajo usan la versión nueva; el `mailto` viejo no existe en el archivo servido.

### Estado de los 4 HIGH

| HIGH original | Estado | Evidencia de esta revalidación | Residuo |
|---|---|---|---|
| Contacto legal roto (`guardiania.cl` inexistente) | **CERRADO** | `mailto:` = 0 en `index.html` y `legal.html`. `legal.html` usa 3 enlaces operativos a `https://github.com/roninwuajkja/guardiania/issues` (Responsable, Derechos y contacto, Contacto). La API de GitHub devuelve `has_issues: true`; `/issues` y `/issues/new` responden 200. `privacidad@guardiania.cl` solo aparece como `<code>` y se declara “previsto para producción; el dominio aún no está habilitado”. No hay promesa de respuesta por ese buzón. | **MEDIUM:** GitHub Issues es público; sirve como canal de demo, no como canal confidencial para solicitudes de datos reales. La página lo acota a demo y pide habilitar el canal legal antes de operar. |
| Copy de privacidad contradictorio (“no lee” / “mensajes leídos” vs “descarta el texto”) | **CERRADO** | `index.html:210` dice `TEXTOS / ENVIADOS`; `:271` dice `textos enviados`; `:469` dice “No guarda ni envía el texto de los mensajes”; `:266` dice “sin exponer conversaciones”; `:599-604` pregunta “¿La app guarda los mensajes?” y responde que lee metadatos, deriva señales y descarta el texto antes de enviar el vector, sin almacenarlo ni transmitirlo. `legal.html:102` dice “el texto se procesa en memoria y se descarta, no se almacena ni se envía”. Búsqueda sin coincidencias para “no lee”, “mensajes leídos” y “sin leer”. | La afirmación sigue sin auditoría de código independiente; es una limitación de verificación, no una contradicción de copy. |
| Violación axe `label-content-name-mismatch` en `.hero__scroll` | **CERRADO** | Axe 4.14.1 con reglas por defecto: 0 violaciones en home 390×844 y 1440×900; 0 en legal 390 y 1440; 0 con menú abierto a 390 y 1440; 0 en modo reducido a 1440. `.hero__scroll` tiene texto visible `DESLIZA` y `aria-label="Desliza para bajar a la idea"`, que contiene el texto visible. | Ninguno. |
| Legal sin fecha, responsable, base ni terceros | **CERRADO para el alcance demo** | `legal.html:72`: “Última actualización: 23 de noviembre de 2026 · Versión 1.0”. Sección `Responsable` en `:82-84` con autor identificado en el repositorio y `Base de licitud` (consentimiento del tutor, asentimiento del menor, interés superior del niño). `Proveedores` en `:120` nombra Firebase Cloud Messaging (Google), Render y proveedor de IA opcional (Groq, Gemini, OpenAI o Anthropic). | **MEDIUM:** el responsable se identifica por alias de GitHub, no por nombre/domicilio; la misma sección dice que “el responsable legal, domicilio y base de licitud se formalizarán” y la línea siguiente ya declara la base; no se indica región/transferencia internacional de Render/Firebase. La página declara el estado de demo y prohíbe datos reales, por lo que no lo mantengo como HIGH de publicación demo. Para operar con datos reales sigue siendo un requisito. |

### Regresiones comprobadas

- [x] `GET /` 200 (38.096 bytes) y `GET /legal.html` 200 (12.609 bytes) en `4181`.
- [x] Sin `mailto:` en ninguna de las dos páginas; 3 enlaces a Issues en legal.
- [x] 56 referencias locales en home y 27 en legal; 0 rutas faltantes.
- [x] Sin overflow horizontal: `scrollWidth` 390/390 a 390 px y 1425/1425 a 1440 px.
- [x] Menú 390: abre, `aria-expanded="true"`, bloquea scroll; Escape cierra, libera scroll y devuelve foco al botón.
- [x] FAQ con JS: `aria-expanded` e `inert` correctos; la respuesta nueva abre a 126 px de alto.
- [x] Movimiento reducido: `data-motion="reduce"`, toggle `disabled`, estado “Reducido por el sistema”, sin animaciones de ticker/hero y los 4 frames visibles (0 con `aria-hidden`/`inert`). Sin el layout híbrido anterior.
- [x] Checksum y huella visibles en `#descarga` dentro de “Verificar el APK”: SHA-256 `2719eeaa…8524` y certificado `2790d683…4687`. Coinciden con el APK descargado y con `apksigner`. A 390 el bloque envuelve sin overflow; a 1440 no se solapa con el QR.
- [x] APK: `HEAD` final 200, `Content-Length: 17929961`, `Content-Type: application/vnd.android.package-archive`; los 4 enlaces de home y el 1 de legal siguen apuntando al mismo asset v1.7.17.
- [x] Versión consistente: 12 apariciones de `1.7.17` en `index.html`, 5 en `legal.html`; subtítulo “Cuatro pantallas de la demo local. Datos sintéticos.”.
- [x] Sin errores de consola en la carga de home; imágenes sin fallos.
- [x] HTML: 0 errores W3C en home y legal (home conserva 7 avisos informativos de `<section>` con `aria-labelledby`); `node --check scripts/main.js` OK.
- [x] Enlaces externos: Issues 200; release 200. Repo, changelog y atlas ya habían respondido 200 y no cambiaron.
- [x] Axe: 0 violaciones en todos los estados enumerados arriba, incluyendo menú abierto y reducido.

**Sin regresiones HIGH nuevas.** La página legal creció de 4.873 a 5.658 px de alto a 390, pero mantiene 0 violaciones axe, sin overflow y con la hoja de 350 px legible.

### Residuos que no cierran esta revalidación

- **MEDIUM:** el canal de derechos es GitHub Issues, público. Aceptable para una demo, inadecuado para solicitudes con datos personales reales.
- **MEDIUM:** redacción legal: “responsable legal, domicilio y base de licitud se formalizarán” convive con “Base de licitud: …”; aclarar qué queda pendiente (domicilio/representación) y quitar la base de la lista de pendientes. Añadir región/transferencia de Render y Firebase.
- **MEDIUM:** sigue sin haber suite de tests reproducible ni script de humo versionado; la evidencia manual no se ejecuta en CI.
- **MEDIUM:** la captura de vinculación sigue mostrando `http://10.0.2.2:8000`; el subtítulo “demo local” ahora contextualiza el build, pero la captura no es de producción.
- **LOW:** el fallback de FAQ sin JS está en `styles/motion.css:1161` (`@media (scripting: none) .faq__panel { grid-template-rows: 1fr }`). Verificado en código; no lo reejecuté en un navegador con JavaScript desactivado porque la automatización usada no expone ese modo. Queda como limitación de verificación, no como regresión observada.
- **LOW:** los hallazgos LOW anteriores (licencia, metadatos sociales, assets muertos, indicador de navegación en FAQ, hash de URL) no formaban parte de esta revalidación y no los reabro aquí.

### Veredicto G4 nuevo

**APTO. 0 BLOCKER. 0 HIGH abiertos.** Los 4 HIGH quedan cerrados con la evidencia anterior. El sitio es publicable **como demo**; no lo es para operar con datos reales de menores hasta formalizar responsable/domicilio, habilitar un canal privado de derechos, definir región/transferencias y completar la auditoría de seguridad.

_Revalidación: 2026-11-23. Servidor: `http://127.0.0.1:4181/`. Navegador: Brave automatizado; axe-core 4.14.1 desde CDN (solo para la comprobación, no forma parte del sitio)._
