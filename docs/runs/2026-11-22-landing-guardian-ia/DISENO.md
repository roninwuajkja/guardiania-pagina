# DISEÑO — Landing de descarga de IA Guardian

**Dirección:** "Cinemática serena". La oscuridad y la escala de `rockstargames.com/VI`, con la
paleta, la tipografía y la voz de IA Guardian. Nada de neón, violencia ni estética de vigilancia.

**Idea rectora:** la página es un póster de la app. Las capturas reales son la obra; el movimiento
las presenta como stills de cine. El visitante siente escala y cuidado, y en el mismo recorrido
entiende que la privacidad es arquitectura, no marketing.

---

## 1. Tokens

### 1.1 Color

```css
--pine-950: #081B17;   /* fondo base */
--pine-900: #0B241E;   /* superficies */
--pine-800: #123029;   /* tarjetas */
--pine-700: #1B4A3E;   /* bordes fuertes / hover */
--pine-600: #236052;
--sage-500: #5E8F7B;
--sage-300: #A9C6B8;   /* acento principal sobre oscuro */
--sage-100: #E2ECE5;
--paper:    #EEF2ED;   /* texto principal sobre oscuro y hoja clara */
--ink:      #10201B;
--ink-2:    #344A42;
--oxblood:  #A33128;   /* SOLO alertas críticas. En esta landing casi no se usa */
--amber:    #8D620F;
--amber-on-dark: #E4B968; /* ámbar legible sobre pine */
--line:     rgba(226,236,229,.14);
--line-strong: rgba(226,236,229,.28);
--muted:    rgba(233,241,236,.64);
--muted-2:  rgba(233,241,236,.44);
```

Reglas de uso:

- Fondo de página `--pine-950`. Superficies elevadas `--pine-900`/`--pine-800`.
- Acento = `--sage-300`. El ámbar solo para "requiere atención" y el aviso de proyecto.
- Oxblood no se usa como decoración. Si aparece, es una alerta real.
- Texto sobre oscuro: `--paper`; secundario: `--muted`. Sobre claro: `--ink` / `--ink-2`.
- Prohibido el degradado multicolor. Los degradados permitidos van de pine a pine o de sage a
  transparente, siempre sutiles.

### 1.2 Tipografía

```css
--font-display: 'Archivo Variable', 'Archivo', system-ui, sans-serif;
--font-ui:      'Archivo Variable', 'Archivo', system-ui, sans-serif;
--font-mono:    'Spline Sans Mono', ui-monospace, monospace;
```

- **Display:** `font-variation-settings: 'wdth' 80, 'wght' 720;` mayúsculas; `letter-spacing:-.02em`;
  `line-height:.88`. Tamaños:
  - `--d-xl: clamp(3.4rem, 10.2vw, 10.5rem)` (declaración y CTA final)
  - `--d-l:  clamp(2.7rem, 6.4vw, 6.2rem)` (h2)
  - `--d-m:  clamp(1.9rem, 3.4vw, 3.1rem)` (h3 de tarjeta)
  - `--d-s:  clamp(1.35rem, 2vw, 1.8rem)`
- **UI / cuerpo:** `'wdth' 100, 'wght' 400`, 17 px / 1.62, máximo 62 ch. Lead: 20–22 px / 1.5.
- **Eyebrow:** mono 500, 11.5 px, mayúsculas, `letter-spacing:.2em`, color `--sage-300`.
- **Micro:** mono 400, 12 px, `letter-spacing:.08em`, color `--muted`.
- **Botones:** Archivo 600, 15 px, sin mayúsculas forzadas, `letter-spacing:.01em`.
- Prohibido: serif, itálica decorativa, sombras de texto, textos con gradiente.

### 1.3 Espacio y forma

```css
--gutter: clamp(20px, 6vw, 120px);
--max: 1760px;
--section: clamp(96px, 13vw, 190px);
--r-card: 28px;
--r-media: 18px;
--r-pill: 999px;
--shadow-card: 0 30px 80px -40px rgba(0,0,0,.9);
--shadow-poster: 0 60px 160px -60px rgba(0,0,0,.95), 0 0 0 1px rgba(169,198,184,.14);
```

- Rejilla de 12 columnas, gap 24 px (16 en móvil).
- Secciones con `padding-block: var(--section)`.
- Líneas de 1 px como separadores, nunca cajas con borde grueso.
- Radios: tarjetas 28, medios 18, pills 999. No mezclar radios pequeños.

### 1.4 Movimiento (tokens)

```css
--ease-out: cubic-bezier(.16,1,.3,1);
--ease-in-out: cubic-bezier(.65,0,.35,1);
--ease-ref: cubic-bezier(.455,.03,.515,.955); /* curva medida en Rockstar */
--t-fast: 180ms;
--t-base: 420ms;
--t-slow: 800ms;
--t-cinema: 1200ms;
```

Duraciones por tipo:

- Hover / foco: 180–260 ms.
- Botones y pills: 320 ms.
- Reveals de texto: 800–1000 ms con 60–90 ms de stagger.
- Cambio de frame en la secuencia: 900 ms.
- Loader: 900 ms de salida.

---

## 2. Estructura de página

```
<html data-motion="auto">
  <div class="grain" aria-hidden>
  <div class="loader" aria-hidden>          (se elimina del DOM al terminar)
  <a class="skip-link">
  <div class="ticker">                      (aria-hidden salvo el texto principal)
  <header class="nav">
  <dialog class="menu">
  <main id="inicio">
    <section class="hero">                   #inicio
    <section class="statement">              #idea
    <section class="sequence">               #producto
    <section class="signals">                #senales
    <section class="promos">                 #panel
    <section class="limits">                 #privacidad
    <section class="download">               #descarga
    <section class="faq">                    #preguntas
  </main>
  <footer class="footer">
</html>
```

`#panel` no lleva entrada en el menú (es parte de "Producto"); el menú enlaza a
Inicio, Producto, Señales, Privacidad, Descarga y Preguntas.

---

## 3. Sección por sección

### 3.1 Ticker

- Alto 42 px, fondo `--pine-900`, borde inferior `--line`.
- Texto mono 10.5 px, tracking `.22em`, `--sage-300`:
  `IA GUARDIAN · VERSIÓN 1.7.17 · YA DISPONIBLE · PRIVACIDAD POR DISEÑO · PROYECTO DE TÍTULO 2026`
- Se repite dos veces en un track flex; animación `ticker 48s linear infinite` de `0` a `-50%`.
- En los extremos, el símbolo de marca en `--sage-300` a 18 % de opacidad, recortado, uno a cada
  lado (como el arte enmascarado de la referencia). Se oculta bajo 768 px.
- Hover: `animation-play-state: paused`. Reduced motion: sin animación, texto centrado.
- La copia duplicada lleva `aria-hidden="true"`.

### 3.2 Loader

- Overlay `position:fixed; inset:0; z-index:100; background:--pine-950`.
- Dos paneles (superior e inferior) que se separan al salir: `translateY(-100%)` y `100%`,
  `900ms var(--ease-out)`, con 40 ms de diferencia.
- Contenido centrado: símbolo reverso (`b-vinculo-symbol.svg` recoloreado a Paper vía CSS mask o
  `<img>` + filtro), 64 px; debajo "IA GUARDIAN" en mono 11 px tracking .28em; debajo una línea de
  160 px que se llena de 0 a 100 % en 900 ms.
- Un barrido diagonal de luz cruza el overlay cada 2.15 s (`--ease-ref`), opacidad máx. 8 %.
- Se muestra solo si `sessionStorage.getItem('ia-guardian-loader') !== '1'`; si ya se vio, no se
  pinta (clase `no-loader` en `<html>` desde un script inline mínimo en `<head>`).
- Se retira cuando se cumplen el mínimo de 900 ms y el evento `load` (o el tope de 1900 ms); las cortinas tardan 800 ms. Al retirarse, agrega `is-ready` a `<html>` para disparar la entrada del hero. La entrada del hero se solapa con la salida de las cortinas: es intencional para que el póster ya esté compuesto cuando la cortina termine de abrir.
- Reduced motion: sin barrido, salida instantánea, `is-ready` inmediato.

### 3.3 Nav

- Fija arriba, debajo del ticker (`top: 42px`), alto 88 px; se compacta a 64 px al pasar 40 vh,
  con fondo `rgba(8,27,23,.72)`, `backdrop-filter: blur(18px)` y borde inferior `--line`.
- Izquierda: lockup horizontal reverso, 148 px de ancho (móvil: símbolo 34 px).
- Derecha: link de texto "Menú" + botón hamburguesa de dos líneas (28×16) que se transforma en X.
- Botón pill "Descargar" (primario) que aparece con `opacity/translateY` a partir de 40 vh.
  En móvil se mantiene siempre visible y compacto ("APK").
- Al hacer clic en hamburguesa: `dialog.showModal()`.

### 3.4 Menú overlay

- `<dialog class="menu">` a pantalla completa, sin padding, `::backdrop` pine 80 % + blur 12 px.
- Split 45 / 55:
  - Izquierda (`--paper`): símbolo de marca 180 px en `--pine-900`, tagline
    "Una guardia que acompaña, no que encierra." y al pie "v1.7.17 · Android 8+".
  - Derecha (`--pine-950`): lista de 6 enlaces en display `--d-m`, mayúsculas, con número mono
    pequeño (`01`…`06`) y flecha que aparece en hover.
- Entrada: panel derecho `translateX(100%) → 0` 700 ms `--ease-out`; panel izquierdo
  `clip-path: inset(0 100% 0 0) → inset(0)` 800 ms; enlaces stagger 55 ms.
- Cierre: X arriba a la derecha (44×44), Escape, clic en backdrop.
- Foco: primer enlace al abrir; trampa nativa de `<dialog>`; devolver foco al botón al cerrar. Se acepta el paso transitorio por `BODY` entre el último control y el cierre, propio de la trampa nativa.
- Bloquear scroll del body con `overflow:hidden` y compensar el ancho de scrollbar.
- Al pie de la columna derecha: interruptor **Movimiento** (on/off), persistido en
  `localStorage('ia-guardian-motion')`, y texto "ES · Chile".
- El enlace activo (según sección visible) va en `--sage-300` y lleva una flecha persistente a la derecha (no solo color); el resto en `--paper` al 72 %. Al elegir una sección, el foco pasa al destino (`tabindex="-1"`), no a `BODY`.

### 3.5 Hero

**Composición (desktop ≥1024):**

- Altura mínima `100svh` + ticker/nav. Contenido centrado, `padding-top: 150px`.
- Eyebrow centrado: `CONTROL PARENTAL PARA ANDROID`.
- Póster: `--poster-w: min(100%, 1880px, calc((100svh - 380px) * 16 / 9));` centrado, `aspect-ratio:16/9`. A 1440×900 mide 924 px (64 vw) para que el CTA y el chevron queden sobre el pliegue; a 2560×1440 llega a 1880 px.
  - Marco: `padding:8px; border-radius:20px; background:--pine-900; box-shadow:--shadow-poster;
    border:1px solid var(--line-strong)`.
  - Interior: rejilla 12×8, gap 6 px, `border-radius:14px; overflow:hidden; background:--pine-950`.
  - 8 fragmentos:
    1. `web-overview.webp` — cols 1/5, rows 1/5; `object-position: 18% 30%`.
    2. `android-status.webp` — cols 5/8, rows 1/6; `object-position: 50% 22%`.
    3. `web-alerts.webp` — cols 8/11, rows 1/5; `object-position: 55% 45%`.
    4. Panel "PRIVACIDAD / POR DISEÑO" — cols 11/13, rows 1/4: símbolo 56 px + leyenda mono.
    5. `android-pairing.webp` — cols 1/4, rows 5/9; `object-position: 50% 30%`.
    6. `web-pairing.webp` — cols 4/9, rows 5/9; `object-position: 30% 50%`.
    7. `web-mobile.webp` — cols 9/11, rows 5/9; `object-position: 50% 10%`.
    8. Panel "0 / MENSAJES LEÍDOS" — cols 11/13, rows 4/9: "0" en display + leyenda.
  - Los fragmentos 4 y 8 tienen fondo `--pine-800` y borde `--line`; forman la columna derecha y no se cruzan con el lockup.
  - Todas las imágenes: `filter: saturate(.92) contrast(1.04)`; overlay `linear-gradient(180deg,
    rgba(8,27,23,.08), rgba(8,27,23,.42))` encima para unificar.
  - Lockup horizontal reverso al centro: `width:38%; max-width:714px;` con
    `filter: drop-shadow(0 18px 40px rgba(0,0,0,.55))`. Detrás, un scrim radial pine
    (97 % al centro, 86 % al 45 %, transparente al 78 %) para asegurar contraste local.
  - Esquinas: un pequeño "01" mono arriba a la izquierda con scrim local, y "PRIVADO" integrado en el panel de privacidad.
- Fila de metadatos debajo del póster (3 columnas, `align-items:end`, 24 px de separación):
  - Izquierda: eyebrow `YA DISPONIBLE`; valor `Versión 1.7.17 · Android 8+` (16 px, Paper).
  - Centro: botón primario `Descargar APK` (altura 56) + micro `Gratis · 17,9 MB · .apk`.
  - Derecha (alineado a la derecha): eyebrow `PRIVACIDAD POR DISEÑO`; valor
    `Sin analítica. Sin publicidad.`
- Chevron de scroll centrado a 28 px del borde inferior, con "DESLIZA" mono 9 px y animación de
  pulso 1.8 s. Se oculta al pasar 120 px.

**Entrada (`is-ready`):** cada fragmento arranca con `opacity:0; transform:translateY(26px) scale(1.03);
clip-path: inset(0 0 100% 0)`. Al estar listo, pasa a su estado final en 1100 ms `--ease-out`,
delay `calc(var(--i) * 65ms)`. El lockup entra a los 500 ms con `scale(.96)→1` y `opacity 0→1`.
Los metadatos entran a los 850 ms con 20 px de desplazamiento.

**Scroll:** un `rAF` escribe `--hp` (0→1 en los primeros 90 vh). El póster se traslada `-4vh`,
escala `1 → .94`, opacidad `1 → .25`; el lockup escala `1 → .9` y se desvanece más rápido.
La fila de metadatos sube 30 px y se desvanece. Sin parallax en móvil.

**Fondo del hero:** `--pine-950` con un radial `circle at 50% 78%` de `rgba(94,143,123,.20)` a
transparente, y dos anillos SVG de 1200 px y 1600 px con `stroke: rgba(169,198,184,.10)`,
rotación lenta 180 s. Detrás del póster, sin tapar.

### 3.6 Declaración (`#idea`)

- Track de 180 vh; pin interno `position:sticky; top:0; height:100svh` con contenido centrado.
- Fondo `--pine-950`; anillo orbital de 900 px girando 120 s; resplandor sage al 12 %.
- Eyebrow `LA IDEA`.
- H2 con `font-size: clamp(3.4rem, min(10.9vw, 13.5vh), 10.5rem)`, tres líneas, cada una en un `<span class="line"><span>`:
  1. `LA CONVERSACIÓN`
  2. `NO SALE DEL`
  3. `TELÉFONO.`
  La palabra `NO` va en `--sage-300`.
- Lead (máx. 54 ch): "IA Guardian analiza en el dispositivo de tu hijo, descarta el texto y envía
  solo un vector de señales. Tú recibes alertas que explican qué pasó, sin leer nada."
- Debajo, tres cifras en fila separadas por líneas de 1 px:
  `0` / `mensajes leídos`; `38` / `reglas explicables`; `1` / `vector derivado`.
  Números en display `--d-m`, labels en mono.
- Progreso: al entrar, las líneas se revelan con `clip-path` y 90 ms de stagger; una regla sage de
  1 px se dibuja bajo la línea 2 (`scaleX 0→1`, 900 ms). Con el scroll, el bloque escala
  `0.98 → 1.02` y el anillo gira un poco más. Reduced motion: todo visible, sin sticky.
- Alturas cortas (≤850 px y ancho ≥1024): lead a 22 px, cifras a 32 px y pin a
  `--header-h + 2px`; el bloque debe dejar ≥10 px bajo las cifras dentro del pin.

### 3.7 Secuencia de producto (`#producto`)

- Track de 420 vh en desktop; pin `100svh`. Reduced motion / <640 px: tarjetas apiladas normales.
- Fondo `--pine-950`; en el pin, una capa de fondo por frame: `*-bg.webp` escalada 1.25,
  `filter: blur(40px) brightness(.55) saturate(.8)`, con opacidad cruzada. Usar las imágenes de
  48 px; no aplicar blur en runtime a imágenes grandes.
- Encabezado fijo arriba a la izquierda (dentro del pin): eyebrow `EL PRODUCTO`, H2
  `ASÍ SE VE LA GUARDIA.` en `--d-l`, sub `Cuatro pantallas reales. Datos sintéticos.`
- Los 4 frames ocupan el centro; cada uno:
  - `position:absolute; inset:0;` centrado, `opacity` cruzada.
  - Dispositivo: para capturas web, tarjeta `max-height:72svh; max-width:min(1100px,80vw);
    border-radius:14px; border:1px solid var(--line-strong); box-shadow:--shadow-card;
    overflow:hidden`. Para Android, teléfono `max-height:76svh; border-radius:34px; padding:9px;
    background:#0A0F0D; border:1px solid rgba(169,198,184,.35)`, con pantalla `border-radius:27px`.
  - La imagen entra con `scale(1.04) → 1` y `translateY(12px) → 0` durante su tramo.
  - Pie de frame abajo a la izquierda (máx. 520 px): eyebrow, H3 en `--d-m`, p en 16 px `--muted`.
- Contenido de los frames:

| # | Imagen | Eyebrow | H3 | Texto |
|---|---|---|---|---|
| 01 | `web-overview.webp` | RESUMEN | El día, en una mirada. | Minutos de uso, señales abiertas y dispositivos activos. Sin transcribir una sola conversación. |
| 02 | `web-alerts.webp` | ALERTAS | Cada alerta explica por qué. | La regla que la generó, la severidad y un siguiente paso concreto. Nunca el contenido. |
| 03 | `android-pairing.webp` | VINCULACIÓN | Dos voluntades, un vínculo. | El tutor declara tutela; el menor otorga asentimiento. QR o código de seis dígitos. |
| 04 | `android-status.webp` | AGENTE | El agente muestra lo que ve. | Permisos, última sincronización y un botón para desvincular. Nada oculto. |

- Esquina superior derecha: `01 / 04` en mono; cambia con el frame.
- Bajo el contador, riel horizontal de 112×3 px con 4 marcas; la activa en sage mide 28×3 px. En ≤639 se oculta porque las tarjetas ya muestran su orden.
- Rótulo `DEMO · DATOS SINTÉTICOS` siempre visible: abajo a la izquierda en desktop, en flujo después de los frames en móvil y reduced. Nunca `display:none`.
- Crossfade: cada frame ocupa 25 % del progreso; opacidad 1 en su centro, 0 en los extremos, con
  solape del 8 %. El frame entrante además escala 1.02→1.
- En móvil: `.sequence__pin` deja de ser sticky; cada frame es una tarjeta con su imagen y su pie,
  separadas 20 px. El riel y el contador se ocultan.

### 3.8 Señales (`#senales`)

- Eyebrow `SEÑALES`, H2 `POCAS, CLARAS, EXPLICABLES.` (`--d-l`), lead máximo 56 ch:
  "El motor combina reglas deterministas con una evaluación de IA que solo recibe el vector
  derivado. Si no hay proveedor configurado, opera en modo heurístico."
- 3 tarjetas en fila (gap 20), `--pine-800`, borde `--line`, radio 28, padding 32, altura mínima
  380. Cada tarjeta:
  - Visual abstracto de 120 px de alto (CSS puro, sin imágenes):
    1. **Nada de texto:** una burbuja de chat de 64×44 con líneas, que se disuelve en 6 puntos
       sage; animación al hover: las líneas se desvanecen y los puntos se separan.
    2. **38 reglas:** 5 filas de 1 px con etiquetas mono (`GROOMING`, `SELF_HARM`, `NOCTURNO`…)
       que se encienden en secuencia de 120 ms al entrar.
    3. **Revocable:** un anillo de 96 px que se abre en dos arcos y libera dos puntos; al hover se
       separan 10 px.
  - H3 en `--d-s`, texto 15.5 px `--muted`, y un enlace "Ver el detalle" con flecha (ancla a
    `#descarga` o al repo; usar `#producto` para no salir del sitio).
- Hover: `translateY(-4px)`, borde `--line-strong`, visual con `scale(1.03)`, 420 ms.
- Reveal escalonado 90 ms.

### 3.9 Promocards (`#panel`)

- Dos tarjetas grandes, una por fila, radio 28, `overflow:hidden`, `min-height:clamp(520px, 62vw, 720px)`,
  borde `--line`, separadas 20 px.
- Cada una: mitad imagen (55 %), mitad texto (45 %), con overlay de pine 80 % sobre la imagen.
- Tarjeta A: imagen `web-overview.webp` a la izquierda, `object-position: 20% 20%`; texto a la
  derecha: eyebrow `PANEL DEL TUTOR`, H3 `TODO LO QUE NECESITAS SABER. NADA QUE NO DEBAS LEER.`
  (`--d-l`), p "Alertas, equipos y ajustes desde el navegador o el teléfono. Sesiones con cookies
  httpOnly, CSRF y actualización en vivo.", pill secundario `Ver el producto` → `#producto`.
- Tarjeta B: texto a la izquierda, imagen `android-status.webp` a la derecha,
  `object-position: 50% 15%`; eyebrow `AGENTE DEL MENOR`, H3 `UN AVISO PERMANENTE. UN BOTÓN PARA
  SALIR.`, p "El menor ve qué se comparte y cuándo. Puede desvincularse sin pedir permiso, y el
  tutor lo sabe al instante.", pill `Cómo funciona` → `#senales`.
- La imagen interna hace parallax de 20 px con el scroll (sin parallax en móvil).
- Hover: la imagen escala 1.03 y el pill se ilumina; 600 ms.

### 3.10 Límites (`#privacidad`)

- Hoja clara a sangre con márgenes laterales de 16 px y radio 32: `background:--paper;
  color:--ink; padding-block: clamp(64px,9vw,130px)`.
- Eyebrow en `--pine-700`, H2 `LO QUE IA GUARDIAN NUNCA HACE.` en `--ink`.
- Dos columnas (1.15 / .85):
  - Izquierda: 4 filas de 84 px con línea inferior `rgba(16,32,27,.14)`. Cada fila: icono de
    círculo tachado 20 px, texto en 22 px Archivo 500 y, al revelarse, una línea de 2 px `--ink`
    al 45 % que se dibuja de izquierda a derecha en 700 ms (delay 120 ms entre filas).
    1. No lee el contenido de los mensajes.
    2. No guarda capturas de pantalla.
    3. No escucha el micrófono.
    4. No rastrea la ubicación.
  - Derecha: panel `--pine-900` radio 24, padding 32, texto Paper. Eyebrow sage `LO QUE SÍ ENVÍA`.
    Chips en grid 2×3: `categoría`, `flags anonimizados`, `minutos de uso`, `conteos`,
    `hora local`, `hash con sal`. Chips: borde `--line-strong`, radio 999, mono 12 px, padding
    8×14. Al entrar, pop escalonado 60 ms.
    Cierre: "Un vector. Sin texto, sin fotos, sin contactos en claro." en 14 px `--muted`.
- Nota al pie de la hoja: "El motor de riesgo no es un diagnóstico ni reemplaza una conversación
  familiar." en mono 11.5 px `--ink-2`.

### 3.11 Descarga (`#descarga`)

- Fondo `--pine-950`; detrás, el símbolo de marca a 900 px en `rgba(169,198,184,.04)` y dos anillos.
- Eyebrow `DESCARGA`, H2 `LLEVA LA GUARDIA A TU TELÉFONO.` en `--d-xl` (3 líneas máx.).
- Lead: "APK firmado, sin Play Store. Instálalo en el teléfono del tutor y vincula el del menor."
- Fila central:
  - Izquierda: botón primario grande `Descargar APK v1.7.17` (altura 64, padding 0 36) con icono
    de descarga; debajo, link secundario `Ver el release en GitHub ↗`.
    Metadata en mono: `17,9 MB · Android 8.0+ · arm64-v8a · v1.7.17`.
  - Derecha: tarjeta Paper de 232×272 con el QR (`assets/qr-apk.svg`) 168×168, texto
    "Escanea desde tu Android" en ink y `github.com/…/releases` en mono 9 px. Sombra suave.
- Pasos en 3 columnas con línea superior de 1 px: `01 Instala el APK` / `02 Crea la cuenta del
  tutor` / `03 Vincula el teléfono del menor`, cada uno con una frase de 12 palabras.
- Aviso en bloque `--pine-900` con borde ámbar al 30 %: "Proyecto de título. Los datos de la demo
  son sintéticos. Antes de operar con datos reales de menores se requiere revisión legal chilena y
  auditoría de seguridad independiente."
- Aparición: H2 por líneas, QR con `rotate(-2deg) → 0` y escala .94→1, botón con glow.

### 3.12 FAQ (`#preguntas`)

- Dos columnas: izquierda sticky (eyebrow `PREGUNTAS`, H2 `ANTES DE INSTALAR.`), derecha lista de
  6 acordeones separados por líneas.
- Cada ítem: botón full-width, 64 px, texto 18 px Archivo 500, icono `+` que rota 45° al abrir;
  respuesta 16 px `--muted` máx. 64 ch, con `grid-template-rows: 0fr → 1fr` 420 ms.
- Solo uno abierto a la vez. Primer ítem cerrado por defecto.
- Preguntas:
  1. ¿Necesito crear una cuenta? — Sí. La cuenta del tutor se verifica por correo y guarda el
     historial de consentimientos.
  2. ¿La app lee los mensajes de mi hijo? — No. Lee metadatos de notificaciones y uso de apps; el
     texto se descarta en memoria antes de calcular el vector.
  3. ¿Funciona sin internet? — El agente captura y encola en SQLCipher; sincroniza cuando vuelve
     la conexión.
  4. ¿Qué pasa si mi hijo no acepta? — La vinculación exige su asentimiento. Sin él no hay vínculo,
     y puede desvincularse cuando quiera.
  5. ¿Es un diagnóstico? — No. Es una herramienta para conversar; no reemplaza a un profesional.
  6. ¿Dónde están mis datos? — En el servidor del proyecto, con exportación y eliminación de cuenta.
     La demo usa datos sintéticos.

### 3.13 Footer

- Fondo `--pine-900`, borde superior `--line`, padding 80/48.
- Fila superior: lockup horizontal reverso 180 px a la izquierda; a la derecha, 3 columnas de
  enlaces (Producto / Legal / Proyecto) con títulos mono.
- Debajo, línea de 1 px y una fila: "© 2026 IA Guardian · Proyecto de Título · Hecho en Chile" y
  "Sin analítica. Sin publicidad." en mono 11 px `--muted-2`.
- Al fondo, wordmark gigante `IA GUARDIAN` en `--pine-800` recortado por el borde inferior
  (decorativo, `aria-hidden`), 180 px de alto, opacidad 100 %. Un cierre de escala.
- Enlaces: Descargar APK, Changelog, GitHub, Privacidad, Términos, Memoria del proyecto.
  Los externos con `rel="noopener"` y `↗`.

### 3.14 `legal.html`

- Mismo ticker, nav simplificado (logo + volver), footer.
- Contenedor de 760 px, Paper sobre pine, radio 28, padding 48.
- H1 `Privacidad y términos.`; dos secciones con anclas `#privacidad` y `#terminos`.
- Resumen en lenguaje claro: qué se recolecta (vector derivado, cuenta, dispositivo), qué nunca se
  recolecta (texto, capturas, audio, ubicación), retención, derechos (exportar/eliminar),
  consentimiento del menor, contacto. Cerrar con "Resumen de proyecto de título; no constituye
  asesoría legal."
- Sin animaciones pesadas; tipografía y colores del sistema.

---

## 4. Sistema de movimiento — implementación

Sin librerías. Un solo `scripts/main.js` (módulo IIFE), ~250 líneas.

1. **`prefers-reduced-motion`** y `localStorage` definen `html[data-motion="reduce"]` antes del
   primer paint (script inline de 6 líneas en `<head>`). Todo el CSS de movimiento vive bajo
   `html:not([data-motion="reduce"])` o usa `@media (prefers-reduced-motion: no-preference)`.
   Los estados finales son el default: si el JS falla, la página se ve completa y legible.
2. **Reveals:** `IntersectionObserver` con `threshold:.12`, `rootMargin:'0px 0px -8% 0px'`.
   Agrega `.is-in` y se desconecta. Stagger por `style="--d:120ms"`.
3. **Contadores:** `[data-count]` anima de 0 al valor en 1200 ms con `easeOutExpo`; si el valor es
   0, no anima.
4. **Progreso de escenas:** un único `rAF` con `passive` scroll. Para cada `[data-scene]`, calcula
   `p = clamp((scrollY - top) / (height - vh), 0, 1)` y escribe `--p` en el elemento. El CSS hace
   el resto. Nada de `getBoundingClientRect` por elemento en cada frame: cachear top/height en
   `resize` con debounce 150 ms.
5. **Secuencia:** con `--p`, el JS calcula el índice `i = clamp(floor(p * 4), 0, 3)` y aplica
   `.is-active` al frame; el crossfade lo hace CSS con `transition: opacity 900ms`.
6. **Hero:** `--hp` en `.hero` con el mismo rAF.
7. **Menú:** `<dialog>`, `showModal`, foco al primer enlace, cierre con Escape/backdrop/X,
   `html.is-locked` para el scroll. Restaura foco.
8. **Acordeón:** botones con `aria-expanded`; cierra los demás; `hidden` se gestiona con altura.
9. **Motion toggle:** alterna `data-motion`, guarda en localStorage, actualiza `aria-pressed`.
   Al activar reduce: quita `.is-in`? No: deja todo visible y detiene animaciones.
10. **Botones magnéticos:** solo `(hover:hover) and (pointer:fine)`; traslación máx. 5 px.
11. **Ticker:** CSS puro; se pausa con hover y con `data-motion="reduce"`.
12. **Loader:** script bloqueante mínimo decide si se pinta; el resto espera `window.load` o 2200 ms.

**Prohibido:** scroll hijacking, `preventDefault` en wheel/touch, `requestAnimationFrame` por
elemento, `will-change` permanente en más de 12 nodos, `filter: blur()` animado en scroll.

---

## 5. Responsive

| Breakpoint | Cambios |
|---|---|
| ≤ 639 | 1 columna; hero 3:4 con 4 fragmentos (1, 2, 5, 8); sin lockup gigante (usa stacked 62 %); metadatos en 2 filas; sin pin en secuencia; promos apiladas imagen arriba; hoja clara con padding 28; footer 2 columnas |
| 640–1023 | hero 16:9 con 6 fragmentos; nav 72 px; secuencia pin 260 vh; tarjetas de señales 2+1; promos texto/imagen 50/50 |
| 1024–1439 | base completa; nav 88; secuencia 380 vh |
| ≥ 1440 | contenedor 1760; tipografía al máximo; secuencia 420 vh; promos 55/45 |
| ≥ 2200 | gutter mayor, no escalar tipografía más allá de 10.5rem |

Reglas: nada de scroll horizontal; `min-width:0` en hijos de grid; imágenes con `aspect-ratio`;
`100svh` en vez de `100vh`; `clamp()` en todo tamaño.

---

## 6. Accesibilidad

- Skip link visible al foco, primer elemento del body.
- Un solo `<h1>` (el lockup del hero lleva `aria-label="IA Guardian"` y el h1 es visually-hidden
  con "IA Guardian — control parental para Android").
- Contraste: Paper sobre pine 950 = 15.8:1; sage 300 sobre pine 950 = 8.9:1; muted 64 % = 5.1:1.
  Nunca bajar de 4.5:1 en texto < 24 px.
- Foco: `outline: 2px solid var(--sage-300); outline-offset: 3px` en todo interactivo.
- Targets ≥ 44×44. Iconos con `aria-hidden`. Imágenes con `alt` descriptivo o `alt=""` si son
  decorativas (los fragmentos del collage son decorativos; el póster tiene un `aria-label`).
- `<dialog>` con `aria-labelledby`; el botón de menú con `aria-expanded`.
- Los frames inactivos de la secuencia llevan `aria-hidden="true"` + `inert`; el activo queda expuesto. En móvil y reduced, los cuatro quedan expuestos.
- Acordeón con `aria-controls`, `aria-expanded` y región.
- `prefers-reduced-motion` completo; toggle manual en el menú. En reduce + ≤639 el ticker muestra solo `IA GUARDIAN · VERSIÓN 1.7.17` centrado, sin marquesina.
- Sin autoplay de audio/video. Sin animaciones que destellen más de 3 veces por segundo.
- El texto no depende del color: la severidad y los estados llevan etiqueta.
- Orden de tabulación = orden visual.

---

## 7. Assets

| Archivo | Uso |
|---|---|
| `assets/brand/b-vinculo-horizontal-reverse.svg` | Nav y footer |
| `assets/brand/b-vinculo-stacked-reverse.svg` | Menú / hero móvil |
| `assets/brand/b-vinculo-symbol.svg` | Paneles tipográficos, watermark, loader |
| `assets/brand/b-vinculo-symbol-small.svg` | Favicon / nav móvil |
| `assets/brand/favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `icon-192/512.png` | Head / PWA |
| `assets/screens/*.webp` | Collage, secuencia, promos |
| `assets/screens/*-bg.webp` (48 px) | Fondos de la secuencia |
| `assets/qr-apk.svg` | Descarga |
| `assets/fonts/archivo-var-latin*.woff2` | Display/UI |
| `assets/fonts/R70Bj…woff2` (Spline Sans Mono) | Eyebrows/micro |

No se agregan imágenes generadas ni de terceros. Los logos de Android se representan con texto
(`ANDROID 8+`), no con el robot de Google.

---

## 8. Checklist D2

- [ ] Tokens en `styles/tokens.css`; nada de colores hardcodeados fuera de tokens.
- [ ] Hero con 8 fragmentos y entrada escalonada.
- [ ] Loader con dos cortinas y salida de 900 ms.
- [ ] Ticker infinito con copia `aria-hidden`.
- [ ] Menú `<dialog>` con foco, Escape y toggle de movimiento.
- [ ] Declaración sticky con reveal por líneas.
- [ ] Secuencia de 4 frames con crossfade, contador y rótulo sintético.
- [ ] 3 tarjetas de señales con visual CSS y hover.
- [ ] 2 promocards con parallax leve.
- [ ] Hoja clara de límites con tachados dibujados.
- [ ] Descarga con QR, metadata y 3 pasos.
- [ ] FAQ acordeón accesible.
- [ ] Footer con wordmark gigante.
- [ ] `legal.html` enlazada.
- [ ] 360/768/1440/2560 sin overflow.
- [ ] Reduced motion y toggle manual.
- [ ] Cero dependencias externas.


---

## 1.7 Superficies de papel (iteración 2026-11-23)

El pine sigue siendo el lienzo; las secciones de contenido ganan islas de papel para bajar la saturación sin perder la identidad.

```css
--card-bg: #E6EFE9; /* verde niebla */
--card-line: rgba(16, 32, 27, 0.16);
--card-line-strong: rgba(16, 32, 27, 0.30);
--card-shadow: 0 24px 60px -40px rgba(0, 0, 0, 0.55);
```

- Señales: tres cards de papel, tinta pine, bubble oscuro como acento.
- Promos: cuerpo de papel y arte oscuro, costura de 1px.
- Descarga: bloque de descarga en card de papel; QR en tile blanco.
- FAQ: lista en card de papel; ítem abierto con velo sage-100.
- Límites: la hoja existente sigue en `--paper`.
- Hero, declaración y secuencia permanecen oscuros: son el bloque cinematográfico.

Reglas: ink/ink-2/pine-600/pine-700 sobre `--card-bg`; sage-500 no se usa para texto pequeño; el foco visible en papel es pine-700.
