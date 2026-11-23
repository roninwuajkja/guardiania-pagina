# Integración de las ilustraciones

**Objetivo:** sustituir todas las capturas de interfaz por las seis ilustraciones de `assets/art/`,
adaptando la estructura de la secuencia y las promos. No cambiar el resto del diseño aprobado.

## 1. Hero

| Tile | Asset nuevo | `object-position` |
|---|---|---|
| `hero__tile--overview` | `assets/art/panel.svg` | 50% 50% |
| `hero__tile--android` | `assets/art/agent.svg` | 50% 50% |
| `hero__tile--alerts` | `assets/art/alerts.svg` | 50% 50% |
| `hero__tile--android-pairing` | `assets/art/pairing.svg` | 50% 50% |
| `hero__tile--pairing` | `assets/art/privacy.svg` | 50% 50% |
| `hero__tile--mobile` | `assets/art/signals.svg` | 50% 50% |

- `width="1600" height="1200"` en las seis.
- Elimina los `object-position` y filtros tuneados para screenshots; deja `object-fit: cover` y un
  filtro suave (`saturate(.98) contrast(1.02)`) o ninguno.
- Baja el velo `hero__poster-wash` a una viñeta sutil: las ilustraciones ya son oscuras.
- `aria-label` del póster: «Collage de ilustraciones de IA Guardian con el logotipo de la marca al centro».
- Mantén las dos placas tipográficas y el lockup.

## 2. Secuencia

- Quita `.sequence__backs` (los respaldos borrosos de screenshots) y deja un resplandor radial
  suave en `.sequence__pin`.
- Cada frame pasa de `.sequence__device` + captura a:
  ```html
  <div class="sequence__art">
    <img src="assets/art/panel.svg" alt="Ilustración del panel del tutor" width="1600" height="1200" loading="lazy">
  </div>
  ```
  Escenas: `panel`, `alerts`, `pairing`, `agent`.
- CSS:
  - `.sequence__art`: `position:absolute; top:calc(var(--header-h) + 200px); right:var(--edge); width:min(720px,50vw); aspect-ratio:4/3; border:1px solid var(--line-strong); border-radius:18px; overflow:hidden; background:var(--pine-900); box-shadow:var(--shadow-card);`
  - `img { width:100%; height:100%; object-fit:cover; }`
  - Elimina o deja sin uso `.sequence__device*`; no debe quedar ninguna captura en el HTML.
  - `.sequence__frame::after`: baja a un viñeteado del 20 % o elimínalo (el pie está a la izquierda).
- Sub: «Cuatro escenas de la guardia. Datos sintéticos.»
- Alt: «Ilustración del panel del tutor», «Ilustración de una alerta explicada», «Ilustración de
  la vinculación entre tutor y menor», «Ilustración del agente del menor con permisos».
- 640–1023: art `width:50vw`, `max-height:42svh`, aspect 4/3.
- ≤639 y reduced/`scripting:none`: el frame es una tarjeta con el arte a ancho completo y el pie
  debajo. Actualiza las reglas que hoy apuntan a `.sequence__device` para que apunten a
  `.sequence__art`.

## 3. Promos

- Promo A: `assets/art/panel.svg`; alt «Ilustración del panel del tutor».
- Promo B: `assets/art/agent.svg`; alt «Ilustración del agente del menor».
- `.promo__media img`: `object-fit: cover; object-position: center;` para ambas. En la B elimina
  el `contain`, el padding, el borde y el radio de teléfono (ya no es una captura).
- Suaviza el overlay de la media para que la ilustración se vea; mantén el degradado hacia el
  panel de texto.

## 4. Copia y limpieza

- `index.html`: 0 referencias a `assets/screens/`.
- Borra `assets/screens/` y `tools/screens/` del proyecto publicado (las capturas históricas quedan
  en `docs/runs/...`).
- README:
  - «Pantallas» → «Ilustraciones»; `assets/art/`; sin generador de screenshots.
  - La tabla de estructura y la de actualización.
  - «Assets y fuentes»: ilustraciones vectoriales originales, sin capturas de producción.
- `ITERACION-2026-11-23.md`: añade la sección de ilustraciones y la retirada de capturas.
- `ART-DIRECTION.md` queda como referencia del set.

## 5. Verificación

- 1440/768/390/2560: las seis ilustraciones cargan (`naturalWidth=1600`), sin overflow ni consola.
- Secuencia: arte y pie sin solape; crossfade; riel; contador; demo label.
- Promos: arte cubre la media sin deformarse; texto legible.
- Axe 0 en home/legal; `html-validate`/`css-tree` OK.
- La página no debe contener ninguna imagen de `assets/screens` ni referencias muertas.
- Capturas nuevas para el run y deploy de Pages.


## 6. Ajuste por feedback — collage y fondo

El usuario reportó que los teléfonos se ven demasiado largos y que el primer collage y el fondo se sienten vacíos.

### Collage 12×6

Mantén el póster 16:9, pero cambia la rejilla interior de 12×8 a **12×6** para que los tiles sean cuadrados o apaisados, no tiras verticales:

| Tile | Cols | Rows |
|---|---|---|
| overview | 1/5 | 1/4 |
| android | 5/8 | 1/4 |
| alerts | 8/11 | 1/4 |
| plate-a (privacidad) | 11/13 | 1/3 |
| android-pairing | 1/4 | 4/7 |
| pairing | 4/9 | 4/7 |
| mobile | 9/11 | 4/7 |
| plate-b (0) | 11/13 | 3/7 |

- Mantén el lockup, las dos placas, el marco y el foco centrado.
- El póster conserva 16:9 y su ancho; los tiles dejan de ser altos.
- Revisa 1440/2560: el lockup no debe pisar las placas; los tiles no deben cortar teléfonos de forma extrema.

### Fondo con contenido

- Añade `assets/art/ambient.svg` como capa de fondo del hero (detrás del póster y de los anillos), a sangre y con opacidad controlada.
- Añade una capa ambiental sutil en las secciones oscuras (statement, secuencia, señales, promos, descarga, FAQ) para que el pine no quede plano. Puede ser la misma ambient con `background-attachment` fijo o capas por sección; la hoja clara de límites queda opaca encima.
- Mantén la legibilidad: líneas al 10–25 %, sin tapar texto ni capturas; el contenido sigue siendo el protagonista.

### Verificación

- Collage: 8 tiles, sin teléfonos estirados, lockup/placas sin solape, 1440/2560.
- Fondo: la ambient carga, no introduce overflow ni tapa el contenido; el contraste del texto se mantiene.
- Axe 0, sin consola, sin requests fallidos.
