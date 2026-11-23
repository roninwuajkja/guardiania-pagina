# Referencia: rockstargames.com/VI

Análisis hecho sobre la página en vivo (Chrome 131, 2560×1323), el DOM y las hojas de estilo.
No se copian assets, fuentes ni textos de Rockstar. Se replica el **sistema de movimiento** y la
**gramática visual** con arte y contenido propios de IA Guardian.

## 1. Estructura de la página

| Bloque | Alto aprox. | Comportamiento |
|---|---|---|
| Ticker superior | 44 px | Franja con arte enmascarado a los lados y texto en mayúsculas; gradiente que cicla color cada 12 s |
| Nav | 100 px | Transparente; logo izquierda, hamburguesa derecha; el botón "Buy Now" aparece recién al salir del hero |
| Hero | 1.323 px | Póster-collage 16:9 centrado, logo encima, fila de metadatos debajo (izquierda / CTA centro / plataformas derecha) |
| Tráiler | 1.893 px | Sección fijada (pin) con still full-bleed; el arte hace zoom y sube la saturación con el scroll |
| Back-of-box | 5.230 px | Secuencia fijada de stills full-bleed que se cruzan (crossfade) durante ~4 pantallas de scroll |
| Promocards | 3.994 px | Tarjetas grandes redondeadas (28 px), imagen full-bleed, texto encima; fila alterna izquierda/derecha |
| Media / People | 1.280 px | Otra tanda de promocards |
| Newswire | 875 px | Lista de noticias con fechas y hover |
| Footer | — | Enlaces legales, newsletter, redes |

## 2. Sistema de movimiento observado

- **Lenis** en `<html class="lenis">`: scroll suavizado, sin scroll-snap.
- **GSAP + ScrollTrigger**: se detecta por los `pin-spacer` generados y los estilos inline
  `translate: none; rotate: none; scale: none; transform: translate(0px, 0px)`.
  - Secciones fijadas con `pin` y un `pin-spacer` que alarga el documento.
  - Progreso ligado al scroll para escala, opacidad, saturación y crossfade.
- **Canvas en el hero**: el póster es un canvas + dos `<picture>` (póster completo y logo).
  Al hacer scroll el póster baja a `opacity ≈ 0` en ~700 px. Hay 10 texturas `shard0…shard9`
  precargadas: el collage se construye por fragmentos y se recompone en la entrada.
- **Loader**: cortina fija a pantalla completa con el logo; un barrido diagonal de luz
  (`top:-40% → 80%`, `left:-40% → 105%`) y un pulso de opacidad de 2,15 s con
  `cubic-bezier(0.455, 0.03, 0.515, 0.955)`. Termina cuando cargan los assets del hero.
- **Ticker**: `--var` de color animadas en 12 s, alternado e infinito.
- **Cards**: reveal escalonado al entrar en viewport, elevación y zoom de imagen en hover,
  botón circular de play que crece.
- **Tipografía**: familia ArtDeco condensada (propietaria). Titulares en mayúsculas,
  tracking amplio, interlineado 0.9–1.0. Eyebrows en versalitas mono/condensadas.
- **Menú**: overlay a pantalla completa partido en dos: arte a la izquierda, lista enorme a la
  derecha. Los enlaces aparecen escalonados; el activo va en un color claro. Incluye un
  interruptor **Motion** (movimiento reducido) y selector de idioma.
- **Tema**: el fondo base es azul-noche `#0C0D1B`; cada track declara `data-theme` y el fondo
  transiciona entre secciones con variables `--…8x` / `--…8z`.
- **Detalles**: chevron de scroll con pulso; botones tipo pill con glow; bordes de 24–28 px;
  márgenes laterales de ~8.5vw; sin cursor personalizado; sin grano visible.

## 3. Traducción a IA Guardian

| Recurso Rockstar | Reemplazo propio |
|---|---|
| Póster-collage ilustrado | Mosaico de capturas reales de la app (datos sintéticos) + lockup de marca al centro |
| ArtDeco condensada | Archivo variable (eje `wdth` 62.5–125) en 78–85 % de ancho, mayúsculas, peso 700 |
| Azul noche + neón rosa | Pine 950 `#081B17` + Sage 300 `#A9C6B8` + Paper; ámbar solo para atención |
| Tráiler con still cinematográfico | Declaración editorial a pantalla completa: "La conversación no sale del teléfono" |
| Back-of-box de 4 stills | Secuencia fijada de 4 pantallas reales: resumen, alertas, vinculación, estado del agente |
| Promocards de ediciones | Panel del tutor / Agente del menor, con capturas y copy de producto |
| Botón "Buy Now" | Pill "Descargar APK" (release v1.7.17, 17,9 MB) |
| Menú overlay con Motion | Mismo patrón, con interruptor de movimiento persistido en `localStorage` |

## 4. Reglas de fidelidad

1. El movimiento no debe secuestrar el scroll: se usa `position: sticky` + progreso por `rAF`,
   no `pin-spacer` ni clonación de DOM.
2. Todo efecto tiene versión reducida: sin pin, sin parallax, sin loader animado.
3. Nada de fuentes ni imágenes de Rockstar. Cero texto copiado.
4. El tono es IA Guardian: calmo, adulto, sin alarmismo ni estética de vigilancia.
5. Datos de demo rotulados como sintéticos, siempre visibles en la secuencia.
