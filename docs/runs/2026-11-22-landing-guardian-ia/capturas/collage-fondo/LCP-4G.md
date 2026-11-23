# LCP 4G/4× — lockup y preload

Run: `2026-11-22-landing-guardian-ia` · Fecha: 2026-11-23
Sitio: `C:\Users\Usuario\Desktop\Guardian IA Pagina`
Emulación: 1440×900, 1,6 Mbps de bajada, 150 ms de latencia, CPU 4×, caché deshabilitada
Navegador: Microsoft Edge (Chromium) con Playwright 1.65.1

## Cambios aplicados

- `styles/motion.css`: el lockup del hero pasa de `1100 ms + 500 ms de retardo` a
  `hero-lockup-in 400ms var(--ease-out) both` (sin retardo).
- `index.html`: `<link rel="preload" as="image" href="assets/brand/b-vinculo-horizontal-reverse.svg" type="image/svg+xml">`.
- Los dos `<img>` del lockup del hero ya tenían `fetchpriority="high"` (líneas 222–223); no se
  añadió nada que ya estuviera.
- No se tocaron los SVG de `assets/art`, el collage 12×6, el fondo ambiental ni el contenido.

## Medición LCP

Tres pasadas en frío con el mismo `perf.js` del run anterior (servidor local sin caché,
`waitUntil: load`, 3,5 s de observación):

| Pasada | LCP | Elemento | Load |
|---|---:|---|---:|
| 1 | 2.876 ms | `hero__lockup-wide` | 2.578 ms |
| 2 | 2.676 ms | `hero__lockup-wide` | 2.449 ms |
| 3 | 2.688 ms | `hero__lockup-wide` | 2.477 ms |

**Mediana: 2.688 ms.** El elemento sigue siendo `hero__lockup-wide`. **No baja de 2,5 s** en
esta emulación.

## Por qué

El `PerformanceObserver` registra el LCP en el **primer paint**, no en la entrada del lockup:

- El lockup horizontal, con el preload, se descarga entre **0,20 y 0,86 s** (5.065 B).
- Las seis ilustraciones del hero terminan entre **1,22 y 2,19 s**; la fuente Archivo en 2,27 s;
  la ambient en 2,37 s.
- `first-paint` y `first-contentful-paint` caen en **2.68 s**; el LCP del lockup en **2.696 s**,
  antes de que `is-ready` abra la cortina (3,2–3,6 s).
- La cortina y la entrada del lockup ocurren después del registro del LCP. Bajar el tope del
  loader o quitar el retardo del lockup no adelanta ese primer paint: el cuello es la ruta
  crítica de CSS + fuentes + rasterización de los SVG del hero.

El preload del lockup se reutiliza (una sola petición del SVG en caché normal). El preload de
la ambient o del símbolo del loader, probado solo como diagnóstico, no mejoró la mediana y se
revirtió.

## Verificación visual

- **Lockup:** el fade de 400 ms arranca al abrirse la cortina. En la captura de apertura
  (`4g-cortina-0.png`) ya se ve el lockup; a los 200–400 ms queda a opacidad 1. No parpadea ni
  queda invisible. La cortina tarda 800 ms en abrir, así que el lockup termina de aparecer
  antes de que la cortina termine.
- **Collage:** al retirarse el loader, las seis imágenes del hero están `complete` con
  `naturalWidth=1600`, sin ilustraciones a medio cargar. Los tiles conservan su stagger de
  entrada (permitido).
- Capturas: `4g-cortina-0.png`, `4g-cortina-200.png`, `4g-cortina-450.png`,
  `4g-cortina-900.png`, `4g-lockup-1440.png`, `4g-lockup-1440-cache.png`.
- Datos crudos: `lcp-4g.json`, `lcp-4g-cache.json`.

## Conclusión

Los ajustes solicitados están aplicados y el lockup ya no espera 500 ms, pero el LCP sigue en
**≈2,69 s** porque el primer paint del hero es anterior a la cortina y está dominado por la
carga/rasterización de los SVG. Para bajar de 2,5 s sin tocar arte, collage, fondo ni contenido
haría falta optimizar esa ruta crítica (por ejemplo, priorizar/adelantar la ambient y el símbolo
del loader ya se probó sin mejora estable; la alternativa real es reducir el coste de
rasterización de las seis escenas SVG, que queda fuera del alcance de este cambio).
