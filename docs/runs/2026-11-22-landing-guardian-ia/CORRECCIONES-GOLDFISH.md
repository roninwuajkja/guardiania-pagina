# Correcciones GOLDFISH — 2026-11-22-landing-guardian-ia

**Base:** `C:\Users\Usuario\Desktop\Guardian IA Pagina`  
**URL de verificación:** `http://127.0.0.1:4173/` y `http://127.0.0.1:4173/legal.html`  
**Fecha:** 2026-11-23  
**Alcance:** HIGH 1–4 y MEDIUM 1–4 de `GOLDFISH.md`. Este documento entrega medidas y capturas; no emite veredicto.

## HIGH 1 · Contacto legal

- `legal.html` ya no usa `mailto:`. Los dos enlaces de privacidad y seguridad apuntan a `https://github.com/roninwuajkja/guardiania/issues` con el texto **“GitHub Issues del proyecto”**.
- Se añadió: “El buzón `privacidad@guardiania.cl` está previsto para producción; el dominio aún no está habilitado. Para este demo, el canal operativo es GitHub Issues.”
- La promesa de respuesta quedó: “Respondemos en el repositorio; para operar con datos reales se debe habilitar el canal legal.”
- Medición: `document.querySelectorAll('a[href^="mailto:"]').length = 0` en home y legal; dos enlaces `GitHub Issues` enlazan a `/issues`.

**Evidencia:** `05-legal-1440-full.png`, `05-legal-390-full.png`, `05-legal-1440.png`.

## HIGH 2 · Promesa de privacidad

Se unificó el copy con la definición “el texto se procesa en memoria, se descarta y no se almacena ni se transmite”:

| Ubicación | Texto actual |
|---|---|
| Panel del hero (`plate-b`) | `TEXTOS / ENVIADOS` con el `0` visible |
| Cifra de la declaración | `textos enviados` |
| Fila de límites | `No guarda ni envía el texto de los mensajes.` |
| FAQ · pregunta | `¿La app guarda los mensajes de mi hijo?` |
| FAQ · respuesta | `No. Lee metadatos de notificaciones en el teléfono, deriva señales y descarta el texto antes de enviar el vector. El texto no se almacena ni se transmite.` |
| Legal · Qué nunca se recolecta | `El agente lee metadatos de notificaciones en el dispositivo para derivar señales; el texto se procesa en memoria y se descarta, no se almacena ni se envía.` |

También se cambió “sin leer nada” por “sin exponer conversaciones” y “Nunca el contenido” por “Nunca el texto”. Medición: `hasOldFigure = false`, `hasOldLimit = false`; no quedan “mensajes leídos” ni “No lee el contenido”.

**Evidencia:** `01-home-hero-1440.png`, `02-home-statement-1440.png`, `03-home-limits-1440.png`, `07-faq-nojs-1440.png`, `07-faq-nojs-390.png`.

## HIGH 3 · Axe `label-content-name-mismatch`

`aria-label` de `.hero__scroll` pasó de “Bajar a la idea” a **“Desliza para bajar a la idea”**, que contiene el texto visible “DESLIZA”.

**Axe 4.14.1, reglas por defecto (`axe.run(document)`):**

| Contexto | Violaciones |
|---|---:|
| Home 1440×900 | **0** |
| Home 390×844 | **0** |
| Legal 1440×900 | **0** |
| Legal 390×844 | **0** |

No aparece `label-content-name-mismatch` ni otra regla por defecto. Medición en `mediciones-goldfish.json`.

## HIGH 4 · Política legal

- Bajo el lead: **“Última actualización: 23 de noviembre de 2026 · Versión 1.0”**.
- Nueva subsección **Responsable** con el texto solicitado, enlace al repositorio y a GitHub Issues.
- **Base de licitud:** consentimiento del tutor y asentimiento del menor; interés superior del niño.
- **Proveedores** ampliado con Firebase Cloud Messaging (Google), Render y proveedor de IA opcional (Groq, Gemini, OpenAI o Anthropic), y la aclaración de que ninguno recibe texto, fotos ni contactos en claro.
- Se mantiene el cierre: “Resumen de proyecto de título; no constituye asesoría legal.”

Medición: legal a 1440 mide 4095 px de alto; `scrollWidth` 1440/1440 y 390/390; sin overflow. Textos `Responsable`, `Base de licitud`, `Proveedores` y `GitHub Issues del proyecto` presentes.

**Evidencia:** `05-legal-1440-full.png`, `05-legal-390-full.png`.

## MEDIUM 1 · FAQ sin JavaScript

La regla `@media (scripting: none)` ya existía en `styles/motion.css` con `.faq__panel { grid-template-rows: 1fr; }` y `.faq__icon { display: none; }`; se verificó con JavaScript desactivado:

- 1440: seis paneles con alturas `75,2 / 75,2 / 75,2 / 75,2 / 49,6 / 75,2` px.
- 390: seis paneles con alturas `75,2 / 126,4 / 75,2 / 100,8 / 75,2 / 100,8` px.
- `faq__icon` con `display: none`; loader con `display: none`; `scrollWidth` 1440/390.

**Evidencia:** `07-faq-nojs-1440.png`, `07-faq-nojs-390.png`.

## MEDIUM 2 · Toggle de movimiento híbrido

Con `prefers-reduced-motion: reduce`, el toggle queda deshabilitado, `aria-pressed="false"` y muestra **“Reducido por el sistema”**:

| Contexto | `data-motion` | `disabled` | `aria-pressed` | Estado |
|---|---|---|---|---|
| 390 reduce | reduce | true | false | Reducido por el sistema |
| 768 reduce | reduce | true | false | Reducido por el sistema |
| 1440 reduce | reduce | true | false | Reducido por el sistema |
| 1440 normal | auto | false | true | Activado |
| Tras clic a reducir | reduce | false | false | Reducido |
| Tras segundo clic | auto | false | true | Activado |
| SO cambia a reduce | reduce | true | false | Reducido por el sistema |
| SO vuelve a normal | auto | false | true | Activado |

El pie del menú no desborda: `clientWidth/scrollWidth` 342/342 a 390, 346/346 a 768 y 648/648 a 1440. El toggle mide 307,1×44, 247,6×44 y 307,1×44 respectivamente.

**Evidencia:** `06-toggle-reduce-390.png`, `06-toggle-reduce-768.png`.

## MEDIUM 3 · Subtítulo de la secuencia

Texto actual: **“Cuatro pantallas de la demo local. Datos sintéticos.”**; visible en `04-home-sequence-sub-1440.png`.

## MEDIUM 4 · Checksum en la descarga

`<details class="download__verify">` con `<summary>Verificar el APK</summary>` y dos hashes en `<code>` mono, seleccionables:

- `SHA-256: 2719eeaaaf673ef4e7d9917690b4dd94cfac1e4d576abb3187e9b1e2dfc98524`
- `Certificado SHA-256: 2790d68383b8e29eb67d26ed064acf82eab823dc2d642901c31ce0fac5504687`
- `Verificado con apksigner: esquemas v2 y v3, RSA 4096.`

Medición: cerrado por defecto; abierto muestra `body` de 141 px a 1440 y 192 px a 390. Los hashes miden 483,8 px a 1440 (una línea) y 316 px a 390 (con wrap); `scrollWidth` 1440/1440 y 390/390.

**Evidencia:** `08-checksum-1440.png`, `08-checksum-390.png`.

## Comprobaciones de cierre

- `html-validate` index + legal: **HTML válido**.
- `css-tree`: **4/4 OK**.
- `node --check scripts/main.js`: **OK**.
- Axe 4.14.1 por defecto: **0 violaciones** en los cuatro contextos.
- Consola/red con scroll completo: **0 errores**, 0 requests fallidos, 0 imágenes rotas en 1440, 768 y 390.
- Overflow: `scrollWidth = innerWidth` en 1440, 768 y 390 con el checksum abierto.
- Legal renderizada y sin overflow en 1440 y 390.

## Archivos tocados

- `index.html` — copy de privacidad, `aria-label`, subtítulo, `<details>` de checksum y script de movimiento system-first.
- `legal.html` — contacto, fecha, Responsable, Base de licitud, Proveedores y script system-first.
- `scripts/main.js` — toggle deshabilitado con reduce del sistema y re-evaluación al cambiar el SO.
- `styles/sections.css` — estados del toggle, fecha legal y estilos del checksum.
- `docs/runs/2026-11-22-landing-guardian-ia/capturas/goldfish/` — 13 capturas y `mediciones-goldfish.json`.
- `docs/runs/2026-11-22-landing-guardian-ia/CORRECCIONES-GOLDFISH.md` — este documento.

## Pendiente

No se tocaron los LOW de `GOLDFISH.md` (carrera nav/ticker, hash/historial, marcador de FAQ, licencia, OG/manifest/robots, assets muertos, git, CSP) ni el MEDIUM de suite de tests, porque no formaban parte de esta corrección. La verificación en dispositivo Android real y la firma del APK siguen fuera de alcance.
