# IA Guardian — landing de descarga

Página estática de **IA Guardian**, app de control parental para Android. Explica qué hace la app —analiza señales en el dispositivo, descarta el texto y envía solo un vector derivado—, ilustra la guardia con un set gráfico propio y lleva al APK v1.7.17 publicado en GitHub Releases.

Proyecto de título 2026, Chile. La landing no tiene backend, analítica, cookies ni publicidad. El motor de riesgo no es un diagnóstico.

## Ejecutar en local

Solo se necesita Python 3 para levantar el servidor; no hay instalación ni build.

```powershell
cd "C:\Users\Usuario\Desktop\Guardian IA Pagina"
python -m http.server 4173 --bind 127.0.0.1
```

Abre <http://127.0.0.1:4173/> y <http://127.0.0.1:4173/legal.html>. Es la misma forma de servir que se usó en las pruebas. Todas las rutas son relativas: la carpeta funciona en la raíz de un dominio o en un subdirectorio.

## Estructura

| Ruta | Qué contiene |
|---|---|
| `index.html` | Home: ticker, nav, menú `<dialog>`, hero-collage, declaración, secuencia de 4 escenas ilustradas, señales, promos, privacidad, descarga y FAQ. |
| `legal.html` | Privacidad y términos, con enlaces desde el footer de la home. |
| `styles/tokens.css` | Variables de color, tipografía, espaciado, tiempos y `@font-face`. |
| `styles/base.css` | Reset, tipografía base, botones, foco, utilidades y grano. |
| `styles/sections.css` | Estilos por sección y responsive. |
| `styles/motion.css` | Loader, reveals, secuencia fijada, parallax y estados de movimiento reducido. |
| `scripts/main.js` | Loader, nav, menú, toggle de movimiento, reveals, contadores, secuencia y FAQ. |
| `assets/brand/` | Marca propia: lockups, símbolos, favicons e iconos PWA. |
| `assets/art/` | Seis ilustraciones vectoriales originales de 1600 × 1200 (`panel`, `alerts`, `pairing`, `agent`, `signals`, `privacy`) y `ambient.svg` (2560 × 1440) para los fondos. Son diagramas de la guardia, sin texto ni datos dentro de la imagen. |
| `tools/art/` | Generadores de desarrollo del set (`build.mjs` y `render.mjs`). No se publican con el sitio. |
| `assets/fonts/` | Archivo Variable y Spline Sans Mono, autoalojadas en WOFF2. |
| `assets/qr-apk.svg` | QR de descarga del APK. |
| `.github/workflows/pages.yml` | Publica el sitio en GitHub Pages sin compilar; excluye `docs/` y el README. |
| `docs/runs/2026-11-22-landing-guardian-ia/` | Brief, plan, diseño, evidencia de pruebas, reportes crudos y capturas del run. |

## Actualizar versión y descarga

La versión no vive en una constante: está escrita en el HTML. Hay **4 enlaces al APK en `index.html`** (nav, hero, bloque de descarga y footer) y **1 en `legal.html`** (footer). Todos apuntan a:

`https://github.com/roninwuajkja/guardiania/releases/download/v1.7.17/app-release.apk`

Para localizar cada cambio:

```powershell
Select-String -Path index.html,legal.html -Pattern "1\.7\.17"
```

| Cambio | Dónde |
|---|---|
| URL del APK | Los 4 enlaces de `index.html` y el del footer de `legal.html`. |
| Tag del release | Enlace «Ver el release en GitHub», en `#descarga`. |
| Versión visible | Ticker (copia visible y `sr-only`), menú, hero, botón de descarga, metadata y texto de términos en `legal.html`. `1.7.17` aparece 12 veces en `index.html` y 5 en `legal.html`. |
| Peso, Android mínimo y ABIs | Línea `download__meta` en `#descarga` (hoy: 17,9 MB · Android 8.0+ · arm64-v8a · armeabi-v7a). |
| QR | Regenerar `assets/qr-apk.svg` con `qrcode` apuntando al nuevo asset y revisar la leyenda bajo el QR. |
| Checksum | Actualizar el `<details>` «Verificar el APK» en `#descarga` con el SHA-256 del asset y la huella SHA-256 del certificado. |
| Ilustraciones | Reemplazar los seis SVG de `assets/art/` manteniendo `viewBox="0 0 1600 1200"` y las dimensiones declaradas en cada `<img>` para no introducir CLS; `ambient.svg` es el fondo de 2560 × 1440. Para regenerarlos: `node tools/art/build.mjs`; los previews PNG se generan con `node tools/art/render.mjs`. No hay capturas de interfaz. |

## Publicación

**Sitio publicado:** <https://roninwuajkja.github.io/guardiania-pagina/> · **Repositorio:** <https://github.com/roninwuajkja/guardiania-pagina> (público).

Es un sitio estático: se publica la carpeta tal cual, sin compilar. La carpeta incluye `.github/workflows/pages.yml`, que publica **solo** `index.html`, `legal.html`, `assets/`, `styles/` y `scripts/`. Si lo recreas: sube el repositorio a GitHub, entra en **Settings → Pages** y elige **GitHub Actions** como fuente; el workflow se dispara con cada push a `main` o a mano.

El workflow no publica `docs/runs/` ni el README, así que la evidencia interna del run no queda expuesta en el sitio. También puedes servir la raíz de la rama si prefieres no usar Actions, pero en ese caso `docs/` quedaría público.

No hay service worker, redirecciones, variables de entorno ni reescrituras. Mantén juntos `index.html`, `legal.html`, `styles/`, `scripts/` y `assets/`. Los enlaces externos son a GitHub (release, changelog, repositorio, issues), al atlas del proyecto y, cuando el dominio esté habilitado, a los correos de `legal.html`.

## Assets y fuentes

- **Ilustraciones:** seis escenas SVG (`panel`, `alerts`, `pairing`, `agent`, `signals`, `privacy`) de 1600 × 1200 y `ambient.svg` de 2560 × 1440 para los fondos, dibujadas por código desde `tools/art/build.mjs`. No hay capturas de la app ni imágenes de terceros: cada escena es un diagrama de la guardia sin texto, cuentas ni datos dentro de la imagen. La secuencia las rotula como «DEMO · DATOS SINTÉTICOS».
- **Marca:** los archivos `b-vinculo-*`, favicons e iconos PWA son marca propia del proyecto.
- **Fuentes:** Archivo Variable (latín y latín extendido) para display/UI y Spline Sans Mono para etiquetas y microcopy. Se sirven desde `assets/fonts/`, sin CDN; están bajo SIL Open Font License 1.1 y el texto de la licencia está en `assets/fonts/OFL-Archivo.txt` y `assets/fonts/OFL-SplineSansMono.txt`.
- **QR:** generado con la librería `qrcode`; según `TEST-EVIDENCE.md` §3.2 apunta al mismo asset del release. La leyenda visible muestra `github.com/roninwuajkja/guardiania/releases`.
- No hay imágenes, videos ni librerías de iconos de terceros: las ilustraciones viven en `assets/art/` y los gráficos de sección son SVG en línea.

## Accesibilidad y movimiento

- `lang="es-CL"`, skip link, un solo `<h1>`, foco visible y jerarquía de encabezados sin saltos.
- Menú con `<dialog>` nativo: foco atrapado, cierre con Escape, retorno de foco y bloqueo de scroll.
- FAQ con `aria-expanded`, una respuesta abierta a la vez e `inert` en paneles cerrados.
- `prefers-reduced-motion` desactiva loader animado, pin y reveals; los 4 frames quedan apilados y todo el contenido es legible.
- La declaración `#idea` usa un track de 320vh en escritorio: líneas, regla, párrafo, cifras y órbita avanzan con el scroll (scrubbed). En móvil, movimiento reducido y sin JS se muestra estática y completa.
- El toggle «Movimiento» persiste en `localStorage` (`ia-guardian-motion`) y actualiza `aria-pressed`.
- Sin JS, el fallback retira el loader a los 3 s y muestra el contenido. El loader se muestra una vez por sesión (`sessionStorage`).
- Verificado con axe-core 4.14.1 con las reglas por defecto (incluye `label-content-name-mismatch`) además de WCAG 2.0/2.1/2.2 A y AA: 0 violaciones en home y legal a 390 y 1440 px, con menú abierto y en modo reducido. Contraste medido: 15,8:1, 8,9:1 y 5,1:1.
- Responsive probado de 320 a 2560 px sin overflow horizontal.

## Límites

- Los datos de la demo son sintéticos. Antes de operar con datos reales de menores se requiere revisión legal chilena y auditoría de seguridad independiente.
- Las alertas son señales para conversar; no son un diagnóstico ni reemplazan a un profesional.
- El canal operativo de privacidad y seguridad es <https://github.com/roninwuajkja/guardiania/issues>. Los buzones `privacidad@guardiania.cl` y `seguridad@guardiania.cl` están previstos para producción; el dominio aún no está habilitado.
- No se probó en un Android físico ni se instaló el APK: se verificó con `HEAD` (200, `application/vnd.android.package-archive`, 17.929.961 bytes). El goldfish sí validó la firma con `apksigner`: esquemas v2 y v3, RSA 4096, certificado `CN=IA Guardian, OU=Titulo, O=GuardianIA, L=Santiago, ST=RM, C=CL`. SHA-256 del asset: `2719eeaaaf673ef4e7d9917690b4dd94cfac1e4d576abb3187e9b1e2dfc98524`.
- El texto legal es un resumen de proyecto de título; no constituye asesoría legal.

## Pruebas y artefactos

La evidencia completa está en `docs/runs/2026-11-22-landing-guardian-ia/`:

- `TEST-EVIDENCE.md` — alcance, resultados y limitaciones de la suite.
- `AUDITORIA-UI.md` — auditoría visual independiente, re-auditoría y veredicto D3.
- `CORRECCIONES.md` — cierre medido de los hallazgos.
- `ITERACION-2026-11-23.md` — icono del favicon, ilustraciones propias y retirada de las capturas de interfaz.
- `report.json` — salida cruda de Playwright (consola, overflow, axe, menú).
- `perf.json` — medición de rendimiento con red 4G simulada y CPU 4×.
- `capturas/` — capturas de home, producto, privacidad, descarga, menú y legal en 390, 768, 1440 y 2560 px.
- `capturas/ilustraciones/` — capturas del set nuevo a 1440, 768, 390 y 2560, estados reducido y sin JS, `reporte.json` con las medidas y `RESUMEN.md`.
- `BRIEF.md`, `PLAN.md`, `DISENO.md`, `REFERENCIA.md`, `log.ndjson` y `state.json` (etapa y gates del run).

Resumen verificado el 2026-11-23: HTML válido, CSS y JS parseables, 0 errores de consola, 0 requests fallidos, todas las imágenes con `alt`, 4 CTA al APK en la home, enlaces externos con 200, 0 violaciones de axe con reglas por defecto, APK real y firmado (v2/v3, RSA 4096), SHA-256 `2719ee…8524`, y las seis escenas + ambient (≈123 KB) en lugar de capturas. Rendimiento con las ilustraciones y el fondo: LCP 2,69 s en 4G simulada, CLS 0,00006 y 403 KB en 20 requests; la versión anterior con capturas pesaba 791 KB. Auditoría UI independiente con re-auditoría PASS (0 critical, 0 high, 0 medium). El script de humo no está versionado en esta carpeta; los resultados quedan en los JSON del run.

_Última actualización de este README: 2026-11-23._
