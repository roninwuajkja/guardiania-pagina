# Auditoría UI: 2026-11-22-landing-guardian-ia

**Proyecto:** `C:\Users\Usuario\Desktop\Guardian IA Pagina`  
**URLs:** `http://127.0.0.1:4181/` y `http://127.0.0.1:4181/legal.html`  
**Fecha:** 2026-11-23  
**Alcance:** home y `legal.html`, contraste, jerarquía, responsive, foco, teclado, estados, movimiento reducido, anti-slop y rendimiento percibido.

> **Re-auditoría 2026-11-23:** las correcciones se verificaron con medición propia y capturas nuevas. El veredicto vigente está al final, en «Re-auditoría 2026-11-23»; el informe original se conserva como registro y su D3 ya está superado.

## Veredicto — auditoría original (pre-corrección)

**FAIL** — 1 CRITICAL. En los cuatro viewports solicitados (390×844, 768×900, 1440×900, 2560×1440) no hay CRITICAL; al verificar el rango 1024–1439 que declara `DISENO.md` §5 en alturas reales de portátil (1366×768, 1440×800, 1280×720), la declaración oculta la fila de cifras `0 / 38 / 1` y la deja fuera del pin. Por el criterio D3 (0 CRITICAL), no es apto.

## Resumen

La dirección «cinemática serena» está bien ejecutada: collage de capturas reales, Archivo variable, paleta pine/sage, declaración fijada, secuencia de producto, hoja clara de límites y descarga con QR. En los cuatro viewports pedidos no hay overflow horizontal, los pares de texto pasan AA, el menú (`<dialog>`, foco, Escape, scroll lock), el acordeón, el toggle de movimiento y la descarga funcionan; el QR decodifica exactamente al APK y los cinco enlaces externos responden 200. No es apto: la declaración falla en alturas de portátil y quedan tres HIGH de contrato/accesibilidad (targets móviles, octavo fragmento del collage y rótulo DEMO), además de varias medias de semántica y contraste no textual.

## Método y alcance técnico

- Playwright 1.65.1 sobre Brave, `headless`, `deviceScaleFactor: 1`, locale `es-CL`, esperas de 900–1.200 ms tras cada scroll y contextos separados para `prefers-reduced-motion: reduce`.
- Capturas de viewport completas por sección, además de capturas puntuales de 1366×768, 1440×800, 1280×720, 1024×768 y texto al 200 % (raíz 32 px) como comprobaciones extra.
- Contraste calculado con la fórmula WCAG 2.x sobre colores computados; para texto sobre capturas se ocultó el texto, se muestreó el fondo a 2× y se compuso el color real del texto sobre cada píxel.
- Árbol de accesibilidad obtenido por CDP (`Accessibility.getFullAXTree`); el `ariaSnapshot` de Playwright se descartó para el FAQ porque incluye nodos `inert` que Chrome sí elimina del árbol real.
- QR decodificado con OpenCV `QRCodeDetector`; enlaces externos verificados con `HEAD`.
- **No se modificó código ni assets.** Los estilos de prueba (scroll instantáneo, ocultar texto para medir contraste, raíz de 32 px) se aplicaron solo en la pestaña de auditoría.
- Evidencia completa en `capturas/auditoria/`; métricas en `mediciones.json`, `mediciones-extra.json` y `mediciones-resumen.json`.

## Capturas

| Viewport | Home | Legal |
|---|---|---|
| 390×844 | `capturas/auditoria/home-390x844-hero.png` · `home-390x844-statement.png` · `home-390x844-sequence-full.png` · `home-390x844-signals.png` · `home-390x844-promos.png` · `home-390x844-limits-chips.png` · `home-390x844-download-qr.png` · `home-390x844-faq-open.png` · `home-390x844-footer.png` · `home-390x844-menu.png` · `home-390x844-reduced-hero.png` · `home-390x844-reduced-sequence.png` · `home-390x844-focus-skip.png` | `legal-390x844-top.png` · `legal-390x844-full.png` |
| 768×900 | `capturas/auditoria/home-768x900-hero.png` · `home-768x900-statement.png` · `home-768x900-sequence-01.png` … `-04.png` · `home-768x900-signals.png` · `home-768x900-promos.png` · `home-768x900-limits-mid.png` · `home-768x900-download-mid.png` · `home-768x900-faq-open.png` · `home-768x900-footer.png` · `home-768x900-menu.png` | `legal-768x900-top.png` · `legal-768x900-full.png` |
| 1440×900 | `capturas/auditoria/home-1440x900-loader.png` · `home-1440x900-hero.png` · `home-1440x900-nav-scrolled.png` · `home-1440x900-statement.png` · `home-1440x900-sequence-01.png` … `-04.png` · `home-1440x900-signals-cards.png` · `home-1440x900-promos.png` · `home-1440x900-limits-mid.png` · `home-1440x900-download-mid.png` · `home-1440x900-faq-open.png` · `home-1440x900-footer.png` · `home-1440x900-menu.png` · `home-1440x900-menu-keyboard-focus.png` · `home-1440x900-reduced-hero.png` · `home-1440x900-reduced-statement.png` · `home-1440x900-reduced-sequence.png` | `legal-1440x900-top.png` · `legal-1440x900-full.png` |
| 2560×1440 | `capturas/auditoria/home-2560x1440-loader.png` · `home-2560x1440-hero.png` · `home-2560x1440-statement.png` · `home-2560x1440-sequence-01.png` … `-04.png` · `home-2560x1440-signals-cards.png` · `home-2560x1440-promos.png` · `home-2560x1440-limits.png` · `home-2560x1440-download-mid.png` · `home-2560x1440-faq-open.png` · `home-2560x1440-footer.png` · `home-2560x1440-menu.png` | `legal-2560x1440-top.png` · `legal-2560x1440-full.png` |

**Extra / hallazgos fuera de la matriz pedida:** `home-1366x768-statement.png`, `home-1440x800-statement.png`, `home-1280x720-statement.png`, `home-1024x768-statement.png`, `home-390x844-zoom200-statement.png`.

## Hallazgos

| Severidad | Área | Hallazgo | Evidencia | Sugerencia |
|---|---|---|---|---|
| **CRITICAL** | Declaración · Responsive | En 1366×768, 1440×800 y 1280×720 la fila `0 / 38 / 1` **nunca se revela** y queda fuera del pin: `opacity: 0`, sin `is-in` durante todo el tramo; además se clipa 46–62 px. Solo aparece al despinchar la sección, cuando ya se está saliendo. A 1440×900 cabe por solo 13 px. | `capturas/auditoria/home-1366x768-statement.png` y `home-1440x800-statement.png`. Medido: 1366×768 → cifras `top 707 / bottom 816`, pin `768`, `opacity 0`, `is-in false` en p=0…1; al despinchar `top 594`, `opacity 0,99`. 1440×800 → `734–846` con pin 800. 1280×720 → `674–782` con pin 720. A 1440×900 → `760–887`, visible, 13 px de margen. | Disparar el reveal de `.statement__figures` al entrar la **sección**, no por intersección del elemento dentro del pin, y añadir un ajuste para alturas cortas (`@media (max-height: 850px)`): reducir `--d-xl`/lead/padding o permitir altura automática/scroll interno. Verificar 1366×768, 1440×800 y 1280×720. |
| **HIGH** | Accesibilidad · Targets móviles | En 390×844 dos controles quedan por debajo de 44×44: el enlace de marca (`34×44`) y el botón Menú (`32×44`). El de Menú es la navegación principal en móvil. El mismo brand de `legal.html` mide `34×44`. | `capturas/auditoria/home-390x844-hero.png`, `legal-390x844-top.png`. `getBoundingClientRect()`: `.brand` 34×44, `.nav__menu` 32×44. El CTA APK sí mide 63×44. | Ampliar el hit area con padding hasta 44×44, manteniendo el símbolo de 34 px y el burger de 28×16. Aplicar también al brand de legal. |
| **HIGH** | Hero · Contrato | El collage de escritorio tiene **7 fragmentos, no 8**. Falta el panel tipográfico 3 (`PRIVACIDAD / POR DISEÑO`, cols 8/10, rows 1/4) que especifica `DISENO.md` §3.5; los recuentos de 768 (6) y 390 (4) sí coinciden. | `capturas/auditoria/home-1440x900-hero.png` y `home-2560x1440-hero.png`. Medido `poster.tiles = 7`; en DOM existen `overview`, `android`, `alerts`, `android-pairing`, `pairing`, `plate-b` y `mobile`. | Añadir el panel 3 con símbolo 56 px + «PRIVACIDAD / POR DISEÑO» y desplazar `alerts` a cols 10/13. Si se decide dejar 7, actualizar `DISENO.md` y el checklist D2; no dejar la discrepancia. |
| **HIGH** | Secuencia · Divulgación | El rótulo `DEMO · DATOS SINTÉTICOS` se oculta en móvil (`display:none` a ≤639) y en movimiento reducido. La única mención a datos sintéticos queda en el subtítulo del encabezado, que se va con el scroll; `REFERENCIA.md` §4.5 pide que esté siempre visible en la secuencia. | `capturas/auditoria/home-390x844-sequence-full.png` y `home-1440x900-reduced-sequence.png`. En 1440 el rótulo está en `top 861–876`, mono 9,5 px; en 390 y reduced `getComputedStyle(.sequence__demo).display = none`. | Mantener el rótulo visible en móvil (por tarjeta o fijo en el encabezado del pin) y en reduced motion. No ocultarlo con `display:none`. |
| MEDIUM | Accesibilidad · Secuencia | Los 4 frames están en el árbol de accesibilidad aunque 3 tengan `opacity: 0`: no hay `aria-hidden` ni `inert`. El lector de pantalla anuncia las 4 pantallas y el contador dice «01 / 04». | `home-1440x900-sequence-01.png`; medido `opacities [1,0,0,0]`, `aria-hidden=null`, `inert=false`; CDP `Accessibility.getFullAXTree` expone los 4 `h3` y las 4 imágenes. `accesibilidad-secuencia-1440.txt`. | En modo pin, aplicar `aria-hidden="true"`/`inert` a los frames inactivos y retirarlo en el activo. En móvil, al estar todos visibles, dejarlos todos expuestos. Alternativa: tablist con `aria-selected`. |
| MEDIUM | Accesibilidad · Menú | El enlace activo se distingue **solo por color**: sage `rgb(169,198,184)` frente a paper 72 %; entre ambos hay `1,13:1` y la flecha solo aparece en hover/focus, no de forma persistente. `aria-current` existe para AT, pero no hay pista visual no cromática. | `home-1440x900-menu.png` y `home-1440x900-menu-keyboard-focus.png`; colores computados. | Añadir una marca persistente para `[aria-current]`: barra de 2 px sage a la izquierda, flecha visible o subrayado. Mantener `aria-current`. |
| MEDIUM | Teclado · Menú | Al elegir una sección desde el menú, el foco termina en `BODY`, no en el destino: el diálogo se cierra, se hace scroll a Producto, pero el siguiente Tab vuelve al principio de la página. | Medición Playwright: clic en `#producto` → `scrollY 2432`, `#producto` a 88 px, diálogo cerrado, `document.activeElement = BODY`. | Tras cerrar, enfocar el heading/sección destino (`tabindex="-1"`) o devolver el foco al botón Menú; gestionar el foco junto con el scroll. |
| MEDIUM | Contraste · Botón fantasma | El borde de `.btn--ghost` compone `rgb(71,92,86)` sobre pine-900: **2,28:1** (bajo el 3:1 de componentes no textuales). El relleno es 1,02:1; solo el texto identifica el control. | `home-1440x900-promo-a.png`, `home-1440x900-promo-b.png`; `.btn--ghost` con `border-color: rgba(226,236,229,.28)`. | Subir el borde a 3:1 (sage 45–50 % o pine-800 sólido) sin cambiar el estilo de pill; revisar el mismo borde del toggle de movimiento. |
| MEDIUM | Movimiento reducido | Con `prefers-reduced-motion` (y el toggle manual), el ticker a 390 queda sin animación pero **la copia no cabe**: mide 920,5 px en un track de 390; al centrarla queda en x −265 (primer span en −247) y se cortan ambos extremos. Se leen fragmentos («7 · YA DISPONIBLE · PRIVACIDAD POR DISEÑ…»). | `home-390x844-reduced-hero.png`; `animation: none`, track 390 px, copia 920,5 px en x −265, primer span x −247. | En reduce + ≤639, ocultar la copia duplicada, usar una sola copia que quepa o permitir wrap; o sustituir el ticker visual por una línea estática. |
| MEDIUM | Tipografía · Zoom 200 % | Con texto al 200 % (raíz 32 px, simulación) a 390, el documento pasa a 530 px de ancho y el título de la declaración (`515 px`, x −63) queda cortado por `overflow-x: clip`: se pierde texto a ambos lados. | `home-390x844-zoom200-statement.png`; `scrollWidth 530` vs `innerWidth 390`, `title width 515`, `body overflow-x: clip`. | Usar tamaños fluidos que puedan encogerse (`min(2.4rem, 11vw)`), permitir wrap o scroll horizontal en lugar de clip; probar zoom de texto real. Simulación, no zoom de navegador; ver limitaciones. |
| LOW | Contraste · Esquinas del collage | `01` y `PRIVADO` van directos sobre las capturas, sin scrim. El `01` baja a **3,19:1** en 1440 (texto de 10 px); `PRIVADO` a 4,65:1. En 768: 4,91 y 8,76. | `home-1440x900-hero.png`; muestreo 2× del fondo ocultando el rótulo. | Añadir un scrim local o un chip pine semitransparente detrás de las esquinas, o moverlas a una zona sólida. |
| LOW | Hero · Contrato | El póster mide 924,4 px a 1440 (frente a 84vw = 1.209,6) y 1.880 px a 2560 (frente al máximo 1.480); el lockup es 38 % (351 px) frente al 44 % / 640 px. La composición funciona, pero no es el contrato. | `home-1440x900-hero.png`, `home-2560x1440-hero.png`; rects medidos. | Documentar el ajuste por altura o alinear con `min(1480px, 84vw)`; si se mantiene, actualizar `DISENO.md`. |
| LOW | Secuencia · Contrato | El riel es una barra horizontal de 112×3 en la esquina superior derecha, bajo el contador; el diseño pide un riel vertical de 120 px abajo a la derecha. | `home-1440x900-sequence-01.png`; `rail` 112×3 en `top 204`, no 120 px vertical. | Cambiar a riel vertical o actualizar el contrato; el contador ya funciona. |
| LOW | Carga · Coreografía | La entrada del hero arranca **816 ms antes** de que se retire el loader: `is-ready` a 953 ms, retirada a 1.769 ms, animación de tiles 1.100 ms. Los primeros tiles terminan antes de que se abra la cortina. | `home-1440x900-loader.png`; medición temporal. | Disparar `is-ready` al retirar las cortinas o retrasar la animación; si el solape es intencional, documentarlo. |
| LOW | Footer / Descarga · Pulido | «Changelog↗», «GitHub↗» y «Memoria del proyecto↗» no tienen separación entre palabra y flecha; en download el paso 03 parte en 2 líneas y su body empieza 39 px más abajo que el de 01/02; «Android 8+» y «Android 8.0+» conviven. | `home-1440x900-footer.png`, `home-1440x900-download-mid.png`. | `gap`/margen en `.ext-mark`; altura mínima común o filas de grid para los tres pasos; unificar la versión mínima. |
| LOW | Menú · Foco/backdrop | La trampa nativa deja pasar un Tab a `BODY` tras el último control antes de volver al cierre; el diálogo ocupa toda la pantalla, así que no hay backdrop literal y el panel izquierdo no cierra al clic. X y Escape sí cierran. | `menuTrap` medido: `… Movimiento → BODY → Cerrar menú`; captura `home-390x844-menu.png`. | Si se quiere trampa estricta, interceptar Tab en el último control; aceptar/documentar el paso por BODY y añadir cierre en el panel izquierdo si se desea. |
| LOW | Legal · Targets | Los enlaces inline de correo/changelog miden 17 px de alto; el brand de `legal.html` mide 34×44. Los inline están cubiertos por la excepción de WCAG 2.2, pero no por la regla de 44 px de este checklist. | `legal-390x844-top.png`, `legal-1440x900-full.png`; `.text-link` 185,9×17; `.brand` 34×44. | El brand necesita 44 de ancho; para los inline, si se exige 44, aumentar padding vertical sin romper el flujo (o documentar la excepción). |
| LOW | Copy · Alt | El alt de `android-status` dice «…y opción de desvincular», pero el recorte visible en la secuencia/promo no muestra ese botón. | `home-390x844-sequence-card-04.png`; alt en `index.html` / `mediciones-extra.json`. | Ajustar el alt al contenido visible («permisos y última sincronización») o incluir la captura completa. |

## Checklist

| Área | Estado | Nota |
|---|---|---|
| Jerarquía | pass | Un foco visual claro por sección; un solo `<h1>` sr-only; h2/h3 sin saltos. El `#panel` se rotula con un h3 (no hay h2 propio); el h2 del menú está en un `<dialog>` cerrado y no se expone. |
| Contraste | partial | Texto: paper/pine-950 15,74; sage/pine-950 9,71; muted/pine-950 6,91; muted/pine-900 6,55; muted/pine-800 5,96; ink/paper 14,91; ink-2/paper 8,42; tachado 4,56; pie de secuencia 6,36–15,49. Fallan: borde ghost 2,28, esquina `01` 3,19 y estado activo del menú a 1,13 entre estados. |
| Espaciado | pass | Escala `--section`, gutters y gaps 20/24 consistentes; el paso 03 de descarga queda desalineado 39 px a 1440 (LOW). |
| Tipografía | partial | Body 17/1,62, lead 19–21, display Archivo; medidas 56–64 ch; micro 9–12 px. A 200 % de texto el título de la declaración se corta (MEDIUM). |
| Responsive | fail | Sin overflow horizontal en 390/768/1440/2560; el layout de la declaración oculta las cifras en 1366×768, 1440×800 y 1280×720 (CRITICAL), y el 1440×900 pasa por 13 px. |
| Tap targets | fail | En 390: `.brand` 34×44 y `.nav__menu` 32×44; el resto ≥44 (CTA APK 63×44, enlaces del menú 58, FAQ 60, footer 44, toggle 44). En 768/1440 todos pasan. |
| Foco | pass / partial | Foco visible `2px sage` (8,9–9,7:1) y `pine-700` sobre paper (8,86:1); skip, menú, FAQ y CTA lo muestran. El foco se pierde a BODY al navegar desde el menú (MEDIUM) y la trampa nativa pasa por BODY (LOW). |
| Teclado | partial | Skip link → main, menú con Enter, enlaces, toggle, FAQ, descarga y footer funcionan; Escape cierra y devuelve al botón. Falla el destino del foco tras elegir sección en el menú. |
| Estados | pass | Loader, menú abierto/cerrado, FAQ abierto/cerrado (inert correcto: el árbol AX no expone respuestas cerradas), nav compacto/CTA, toggle Activado/Reducido y hover de cards existen. No hay vistas de datos, formularios, vacío/error/éxito: N/A. |
| Formularios | N/A | No hay campos ni formularios; el contacto es `mailto:`. |
| Copy | pass | Copy real y específico; sin lorem ipsum ni jerga vacía. Consistencia menor: Android 8+ / 8.0+; alt de `android-status` sobredeclara. |
| Anti-slop | pass | Sistema propio (pine/sage, Archivo, grano, anillos, collage real), sin gradientes genéricos, glassmorphism gratuito ni cards idénticas. El collage pierde el 8.º fragmento, pero la dirección no es slop. |
| Movimiento | partial | Reduced motion desactiva loader, pins, parallax y reveals; el contenido completo aparece. Quedan el ticker cortado a 390 y el rótulo DEMO oculto; la entrada del hero empieza 816 ms antes de retirar el loader (LOW). |
| Rendimiento percibido | pass con reserva | 23 recursos, 723.681 B, CLS 0, sin long tasks en el scroll programático (0 en los 4 viewports; frame medio 5,6–6,6 ms en headless). El blur del nav/secuencia y el grano no se probaron en GPU móvil real. |
| Imágenes | pass | Las 21 imágenes cargan (`naturalWidth > 0`), con dimensiones, WebP, fondos de 48 px y `loading=lazy` fuera del hero; sin roturas. El QR decodifica al APK exacto y el asset responde 200 (17.929.961 B). |
| Overflow | pass | `scrollWidth = innerWidth` en 390/768/1440/2560; `overflow-x: clip`; las decoraciones que sobresalen (ticker, anillos, orbit, wordmark) están recortadas. El zoom de texto 200 % sí desborda (MEDIUM). |
| Legal | pass / partial | Estructura, contraste y jerarquía correctos; h1 visible, TOC, h2/h3, footer y anclas. Brand 34×44 en 390 y enlaces inline de 17 px (excepción inline). |
| Screen reader | partial | Landmarks, nombres accesibles, alt, `aria-current`, `aria-expanded`, `inert` del FAQ correctos. Los 4 frames de la secuencia se exponen a la vez (MEDIUM). |
| Tema | N/A | Solo existe tema oscuro; no hay toggle claro/oscuro. La hoja de límites es una superficie clara, no un tema. |

## Qué no pude verificar

- **axe-core / auditoría automática WCAG**: no está instalado en el entorno; hice comprobaciones manuales, DOM, CDP AX y contraste calculado. Un axe limpio no probaría conformidad, pero aquí ni siquiera se ejecutó.
- **Lector de pantalla real** (NVDA/VoiceOver): solo árbol AX vía CDP; no verifiqué la experiencia hablada, el orden de lectura real ni la trampa de foco con AT.
- **Dispositivo móvil real / GPU**: el jank del `backdrop-filter` (nav 18 px), del blur de fondos de la secuencia y del grano fijo no se puede concluir desde headless; el test de scroll no reprodujo un móvil de gama baja.
- **Scroll lock con scrollbar clásica**: el headless usa scrollbars overlay; `bodyPadRight` midió 0. En Windows con scrollbar de 15 px no comprobé el salto real al abrir el menú.
- **Touch real**: no probé gestos, hover atascado ni safe-area/notch; el `viewport-fit=cover` no lleva `env(safe-area-inset-*)` en el ticker/nav.
- **APK**: verifiqué URL, tamaño y tipo (`200`, 17.929.961 B, `application/vnd.android.package-archive`), y que el QR apunta a esa URL; no verifiqué la firma del APK ni la promesa «APK firmado».
- **Buzones** `privacidad@guardiania.cl` y `seguridad@guardiania.cl`: no verificables; no envían correo.
- **320 px, landscape y móviles cortos** (p. ej. 390×667): no auditados; el menú de 287 + 557 px y la declaración sugieren riesgo, pero no hay captura.
- **Legal al 200 % de texto**: no probado; la hoja de 760 px y el h1 de 2,5 rem podrían desbordar igual que la home.
- **Todos los hover**: no capturé cada estado hover/focus de las cards, promos y botones; revisé CSS y algunos focos, no la matriz completa.
- **Tema claro**: no existe; no aplica.
- **LCP real del hero**: el LCP medido (88 ms) es el logo del loader, no el póster; el loader tapa la métrica. No es una medida útil de la entrada del hero.

## D3 — auditoría original (pre-corrección)

**FAIL** — 1 CRITICAL.

- **CRITICAL:** declaración sin cifras visibles en 1366×768, 1440×800 y 1280×720 (contenido oculto por `opacity: 0` y fuera del pin). En la matriz literal de cuatro capturas hay 0 CRITICAL; el fallo aparece al comprobar el rango 1024–1439 declarado en `DISENO.md` §5 en alturas reales. No lo rebajo.
- **HIGH que bloquean:** (1) targets móviles de 34×44 y 32×44 en 390; (2) rótulo `DEMO · DATOS SINTÉTICOS` ausente en móvil y reduced; (3) collage de escritorio con 7 fragmentos en vez de 8.
- El resto de MEDIUM/LOW no bloquea el flujo de descarga, pero debe entrar en la corrección antes de G5: foco tras el menú, frames inactivos en el árbol AX, color-only del activo, borde ghost 2,28:1, ticker reduced, zoom 200 %.

## Re-auditoría 2026-11-23

**Alcance:** verificación puntual de los cuatro bloques corregidos y de sus regresiones; no se rehízo la auditoría completa. **No se modificaron código ni assets.**

**Método:** Playwright 1.65.1 sobre Brave, viewports 390×844, 768×900, 1440×900 y 2560×1440; declaración medida en 1366×768, 1440×800, 1280×720, 1024×768 y 1440×900 en seis progresos del pin (`p=0,10…0,99`); contextos separados para `prefers-reduced-motion: reduce`; contraste calculado sobre colores computados; QR con OpenCV; enlaces con `HEAD`. Capturas y JSON en `capturas/auditoria/reauditoria/` (`mediciones-reauditoria.json`).

### Verificación de los hallazgos

| Hallazgo original | Estado | Medición propia | Evidencia |
|---|---|---|---|
| **CRITICAL** · cifras de la declaración ocultas en portátiles | **Corregido** | En las 5 alturas, en los 6 progresos del pin: `opacity 1`, `is-in true`, `bottom ≤ pin bottom − 10`. Holgura mínima: 1366×768 39 px; 1440×800 45 px; 1280×720 **28 px**; 1024×768 47 px; 1440×900 48 px. La holgura máxima fue 60 px. El título pasó a `clamp(3.4rem, min(10.9vw, 13.5vh), 10.5rem)` y hay ajuste `max-height: 850px`. | `reauditoria/statement-1366x768.png`, `statement-1280x720.png`, `statement-1440x800.png`, `statement-1024x768.png`, `statement-1440x900.png`; `statement` en `mediciones-reauditoria.json`. |
| **HIGH** · targets móviles | **Corregido** | 390 home: `.brand` **44×44**, `.nav__menu` **44×44**, `.nav__cta` 62,5×44. 390 legal: `.brand` **44×44**, `.nav__back` 72,9×44; no hay `.nav__menu` en legal (nav simplificado). | `reauditoria/home-390-targets.png`, `legal-390-targets.png`, `home-390-hero.png`. |
| **HIGH** · collage de 8 fragmentos | **Corregido** | 1440: **8 tiles** visibles; `plate-a` 146,1×184,5 y `plate-b` 146,1×311,5; lockup 350,5×128,2; intersección con lockup **0** en ambas. 2560: **8 tiles**; `plate-a` 305,3×386,1, `plate-b` 305,4×647,5; lockup 713,6×261; intersección **0**. Ambas placas muestran su texto. | `reauditoria/hero-1440-collage.png`, `hero-2560-collage.png`. |
| **HIGH** · rótulo DEMO oculto | **Corregido** | 390 auto y 390 reduced: `.sequence__demo` `display:block`, `position:relative`, 343,2×15,4 en y 732,5; el último frame termina en 708,5; intersección **0**; dentro de `.sequence`. 1440 reduced: 1267,2×15,4 en y 697,2; último frame 673,2; intersección **0**. | `reauditoria/demo-390-auto.png`, `demo-390-reduced.png`, `demo-1440-reduced.png`. |
| **MEDIUM** · frames inactivos en el árbol AX | **Corregido** | 1440 auto: 1 frame expuesto, 3 con `aria-hidden="true"` e `inert`; el activo sin ambos. 390 auto, 1440 reduced y 390 reduced: **4 expuestos**, sin `aria-hidden`/`inert`; los cuatro con `opacity:1` en los modos apilados. | `reauditoria/sequence-1440-frame2.png`, `sequence-390-all.png`, `sequence-1440-reduced.png`. |
| **MEDIUM** · enlace activo del menú solo por color | **Corregido** | `[aria-current="location"]` = `#inicio`; su `.menu__arrow` tiene `opacity:1`, `transform:matrix(1,0,0,1,0,0)` y 20×20 visibles; las cinco flechas restantes tienen `opacity:0`. | `reauditoria/menu-1440-marker.png`, `menu-390-marker.png`. |
| **MEDIUM** · foco perdido tras elegir sección en el menú | **Corregido** | 1440: `activeElement` = `SECTION#producto`, `focus-visible` true, `scrollY 2432`, `#producto` a 88 px, diálogo cerrado y sin `is-locked`. 390: `SECTION#producto`, `scrollY 1407`, `#producto` a 64 px. | `reauditoria/focus-producto-1440.png`, `focus-producto-390.png`. |
| **MEDIUM** · borde ghost < 3:1 | **Corregido** | Borde `sage 50 %`; compuesto sobre el fondo del botón: **3,29:1**; sobre pine-900: **3,23:1**. El texto sigue en 14,44:1. | `reauditoria/ghost-1440.png`. |
| **MEDIUM** · ticker reduced cortado | **Corregido** | 768 reduced: copia **295,9 px** centrada en x 236–531,9 (centro 383,9; viewport 384), duplicado `none`, `animation:none`; solo se muestran `IA GUARDIAN`, `·`, `VERSIÓN 1.7.17`; **sin corte** y `scrollWidth 768 = innerWidth`. Controles: 390 x 47–342,9 (centro 194,9/195) y 1440 x 572–867,9 (centro 720/720), también sin corte y con `scrollWidth = innerWidth`. 0 errores de consola. | `reauditoria/ticker-reduced-768-fixed.png`, `ticker-reduced-390-fixed.png`, `ticker-reduced-1440-fixed.png`; `mediciones-ticker-fixed.json` y `tickerFixed` en `mediciones-reauditoria.json`. |
| **MEDIUM** · zoom 200 % recorta el título | **Corregido** | 390 con raíz 32 px: `scrollWidth 390 = innerWidth`; título de declaración x 25,6–364,4 (338,8 px, fuente 42,9 px); download/FAQ/signals dentro de 20–370. Sin recorte ni scroll horizontal. | `reauditoria/zoom200-390-statement.png`. |
| **Regresiones** · 4 viewports, contraste, menú/FAQ/reduced, QR/enlaces | **Sin regresiones** | 390/768/1440/2560: `scrollWidth = innerWidth`; 0 `console.error`, 0 `pageerror`, 0 peticiones fallidas; 21 imágenes, 0 rotas; 1 `h1`; sin IDs duplicados. Contraste: hero 15,74; signal 5,96; promo 6,55; limits 14,91; FAQ 6,91; footer 6,55; ticker 8,91. Menú abre/cierra/Escape/scroll lock/foco; FAQ un solo abierto e inert correcto; reduced sin loader, sin pins, con frames expuestos y DEMO visible. Legal 390 brand 44×44, «Volver» 72,9×44; 1440 brand 148×54,1. QR decodifica al APK; APK/release/changelog/GitHub/atlas 200. Los 4 `[data-download]` apuntan al mismo APK. | `reauditoria/home-390-hero.png`, `home-768-hero.png`, `home-1440-hero.png`, `home-2560-hero.png`, `faq-1440.png`, `reduced-390-hero.png`, `legal-390-reaudit.png`, `legal-1440-reaudit.png`, `qr-390.png`. |

### Hallazgos restantes

**CRITICAL restantes: 0.**  
**HIGH restantes: 0.**  
**MEDIUM restantes: 0.**

El MEDIUM anterior del ticker reduced se cerró: 768 muestra `IA GUARDIAN · VERSIÓN 1.7.17` centrado, sin corte, con duplicado oculto y `scrollWidth = innerWidth`; 390 y 1440 de control también pasan sin corte. La medición está en `capturas/auditoria/reauditoria/mediciones-ticker-fixed.json` y la captura en `ticker-reduced-768-fixed.png`.

**LOW restantes (no bloquean el D3 original, pero conviene pulir):**

- **Indicador de foco de la sección:** el foco está correcto (`activeElement` es `#producto`), pero el `outline` global de 2 px rodea la sección completa: a 1440 se ve como una línea superior de 2 px y a 390 queda bajo el nav o fuera del viewport. Si se quiere un indicador localizado, enfocar el `h2` o estilizar `section:focus-visible` con una marca más contenida. Evidencia: `focus-producto-1440.png`, `focus-producto-390.png`.
- **DEMO en el flujo:** a 390/reduced el rótulo queda al final de las cuatro tarjetas, no junto a cada frame; cumple el criterio revisado («dentro del flujo… sin tapar»), pero no el «siempre visible» literal de `REFERENCIA.md` §4.5. Evidencia: `sequence-390-all.png`, `demo-390-auto.png`.
- **Composición de las placas a 2560:** `plate-a`/`plate-b` son 305×386/647 con símbolo de 56 px y label de 10,5 px, dejando mucho vacío; además `plate-a` está en cols 11/13 y `alerts` en 8/11, no en las cols 8/10 y 10/13 de `DISENO.md` §3.5. Presencia y no intersección: correctas; composición: LOW.
- **Ticker reduced:** en reduced se ocultan los spans 4–9 en todos los anchos y solo se leen «IA GUARDIAN · VERSIÓN 1.7.17»; el `sr-only` conserva el anuncio completo. En 768 es exactamente el texto solicitado; en 1440 también se muestra ese subset aunque cabría más. Es una decisión de encaje, no un corte; LOW de contenido.
- **LOW históricos no re-medidos en esta pasada:** la esquina `01` sobre la captura (3,19:1 medido en la auditoría original), la escala del póster, el riel horizontal, la coreografía loader/hero, las flechas del footer, la trampa nativa del menú y los enlaces inline de legal. No forman parte de los CRITICAL/HIGH/MEDIUM corregidos y no los reaudité uno a uno; se mantienen como deuda de pulido. En las capturas nuevas se ve el riel horizontal y la escala del póster sin cambios.

### D3 — re-auditoría 2026-11-23

**PASS** — 0 CRITICAL, 0 HIGH, 0 MEDIUM. El MEDIUM del ticker reduced se cerró en 768 (y en los controles 390/1440): copia de 295,9 px centrada, duplicado oculto, `scrollWidth = innerWidth`, sin corte. Quedan LOW de pulido, sin bloqueo.
