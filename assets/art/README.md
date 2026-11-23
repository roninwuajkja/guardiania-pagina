# Arte — «La guardia invisible»

Set de seis ilustraciones vectoriales para la landing de IA Guardian y un fondo ambiental para
las secciones oscuras. Diagramas técnicos nocturnos: la arquitectura de privacidad y las señales
del producto convertidas en formas. Sin personas, sin texto visible, sin capturas de interfaz.

- **Lienzo:** 1600 × 1200 (4:3), `viewBox="0 0 1600 1200"` en las seis escenas.
- **Fondo ambiental:** 2560 × 1440 (16:9), `viewBox="0 0 2560 1440"`.
- **Formato:** SVG estático generado por código (`tools/art/build.mjs`), sin fuentes ni imágenes
  raster. Los PNG de `capturas/arte/` son solo previews de revisión.
- **Foco:** lo esencial de cada escena vive dentro del 60 % central (320–1280 × 240–960); las
  capas de densidad se extienden hacia los bordes a baja opacidad para que el marco no quede vacío.
- **Firma:** glifo de Vínculo de 24 px al 35 % en la esquina inferior derecha de cada escena;
  38 px al 30 % en el fondo ambiental (misma proporción sobre un lienzo 1.6×).

## Inventario

| Archivo | Escena | Uso en la página | Peso |
|---|---|---|---|
| `panel.svg` | El panel del tutor: tarjeta de resumen, tres métricas, línea de tiempo, plano inclinado y órbita. | Collage del hero, secuencia 01, promo del tutor. | 21,2 KB |
| `alerts.svg` | Señales explicadas: tarjeta de alerta con borde ámbar, nodo óxido, traza de reglas y tarjeta en cola. | Collage del hero, secuencia 02, apoyo de «Señales». | 18,1 KB |
| `pairing.svg` | Dos voluntades: dos teléfonos de 200 × 350 enfrentados, arco punteado y QR central de 206 px. | Collage del hero, secuencia 03. | 20,8 KB |
| `agent.svg` | El agente: teléfono de 210 × 370 con pantalla de permisos, tres anillos, candado y tarjetas de permiso. | Collage del hero, secuencia 04, promo del menor. | 17,4 KB |
| `signals.svg` | La conversación no sale: teléfono de 210 × 370, límite punteado, arcos, flecha, puntos y barras. | Hero / apoyo de la declaración. | 17,9 KB |
| `privacy.svg` | Privacidad por diseño: glifo a gran escala, dos órbitas, un punto, un candado y bloques de datos. | Hero / apoyo de «Límites». | 13,7 KB |
| `ambient.svg` | Fondo orbital: constelaciones, arcos, retícula, tarjetas fantasma y reglas de medición. | Fondo de secciones oscuras (ver «Ambient»). | 14,1 KB |

Total ≈ 123 KB. Cada archivo usa un prefijo propio de `id` (`p-`, `a-`, `pr-`, `ag-`, `s-`,
`pv-`, `am-`), así que pueden inlinarse juntos sin colisiones.

## Sistema visual

- **Fondo:** Pine 950 `#081B17` con un radial suave de Pine 900 `#0B241E` a Pine 950 y viñeta.
- **Retícula:** 40 px al 5 % y retícula mayor de 200 px al 5,5 %, en Sage 300.
- **Constelaciones:** campos de puntos deterministas con enlaces cortos, enmascarados para
  atenuarse en el centro y ganar presencia en los bordes. No compiten con el foco.
- **Capas de densidad:** tarjetas fantasma, tarjetas secundarias, trazas, arcos, anillos, nodos,
  marcas de medición y cruces de referencia. Todas entre el 4 % y el 30 %.
- **Marcas de registro:** escuadras en las cuatro esquinas (52 px de margen), ticks en los
  medios ejes y reglas de borde.
- **Halo:** radial Sage 500 detrás del foco de cada escena.
- **Líneas:** 1 px para detalle, 1,5–2 px para estructura; 45–90 % en lo narrativo y 4–12 % en
  la retícula.
- **Profundidad:** planos apilados (bisel Pine 800 con pantalla Pine 950), sombras suaves,
  conectores punteados y nodos con halo.
- **Sin grano, sin ruido, sin degradados multicolor.**

### Teléfonos

Los tres dispositivos se rehicieron con proporción real (0,57) y pantalla abstracta:

| Escena | Cuerpo | Pantalla | Contenido |
|---|---|---|---|
| `pairing` | 200 × 350 | 184 × 334 | Cabecera, dos tarjetas, fila de puntos y sello (visto bueno en el tutor, candado en el menor). |
| `agent` | 210 × 370 | 194 × 354 | Cabecera, candado central, tres filas de permisos y dos píldoras. |
| `signals` | 210 × 370 | 194 × 354 | Dos mensajes, fila de puntos, corte de texto descartado y bloque local. |

## Paleta aplicada

| Token | Hex | Uso |
|---|---|---|
| `--pine-950` | `#081B17` | Fondo base, pantallas de teléfono, viñeta. |
| `--pine-900` | `#0B241E` | Centro del fondo, cuerpo del candado, tarjetas secundarias. |
| `--pine-800` | `#123029` | Tarjetas, biseles de teléfono, plano inclinado. |
| `--sage-500` | `#5E8F7B` | Nodos, halo, arcos internos. |
| `--sage-300` | `#A9C6B8` | Líneas, retícula, formas de dato. |
| `--paper` | `#EEF2ED` | Único highlight por escena (cifra, nodo, flecha, argolla). |
| `--amber` | `#8D620F` | Acento de atención: borde de alerta, píldora, umbral de salida, marca de métrica. |
| `--amber-on-dark` | `#E4B968` | Detalle de la píldora crítica en `alerts.svg`. |
| `--oxblood` | `#A33128` | Solo en `alerts.svg`: el nodo crítico. |
| — | `#000000` | Solo sombras (`feDropShadow`), nunca como color visible. |

No se usan colores fuera de los tokens de `DISENO.md`. Pine 700 quedó disponible pero no fue
necesario: la jerarquía se resuelve con Pine 800/900/950 y los dos verdes de acento.

## Ambient

`ambient.svg` es un fondo, no una escena: no tiene un foco único y mantiene el centro relativamente
calmo. Está pensado para secciones oscuras a sangre.

- Órbitas y trazas al 10–18 %; retícula al 3,5–5 %; tarjetas fantasma al 7–12 %.
- Constelaciones distribuidas por todo el lienzo, con máscara radial para no ensuciar el centro.
- Regla de medición inferior y corchete vertical derecho como anclas técnicas.
- Fondo opaco Pine 950/900: no requiere `blend-mode` ni scrim adicional.

Uso sugerido:

```css
.ambient {
  background: url("assets/art/ambient.svg") center / cover no-repeat;
}
```

No se creó `ambient-hero.svg`. El hero ya tiene su póster, el lockup y dos anillos propios; un
segundo fondo protagonista competiría con la marca. Si se necesita más presencia, el mismo
`ambient.svg` puede ir detrás del hero con opacidad baja.

## Previews

`docs/runs/2026-11-22-landing-guardian-ia/capturas/arte/`

- `panel.png`, `alerts.png`, `pairing.png`, `agent.png`, `signals.png`, `privacy.png` — 1600 × 1200.
- `ambient.png` — 2560 × 1440.
- `_contacto.png` — hoja de contacto 1920 × 960 con las seis escenas.

## Integración

- Escenas: `<img src="assets/art/panel.svg" width="1600" height="1200" alt="…">`.
- Ambient: `<img src="assets/art/ambient.svg" width="2560" height="1440" alt="">` como fondo
  decorativo, o `background-image` con `center / cover`.
- En collage y promos: `object-fit: cover; object-position: 50% 50%`. El foco está centrado;
  `alerts` tolera `47% 50%`, `signals` `55% 50%` y `privacy` `50% 48%`.
- Si se inlinan, conservar el `viewBox` y no reescribir los `id`: ya están prefijados.
- Los archivos no dependen de fuentes ni de recursos externos; se pueden cachear como estáticos.

## Regenerar

```bash
node tools/art/build.mjs      # reescribe assets/art/*.svg
node tools/art/render.mjs     # previews PNG con Edge headless
```

Ambos scripts son herramientas de desarrollo y no forman parte del sitio. No agregar
dependencias al proyecto por ellos.

## Procedencia y licencias

- Dibujo 100 % propio, generado por código a partir de la geometría descrita en este documento
  y en `ART-DIRECTION.md`.
- Sin imágenes raster, sin IA generativa, sin fotografías, sin iconos de terceros y sin fuentes
  embebidas.
- El glifo de la firma deriva de `assets/brand/b-vinculo-symbol.svg` (marca propia del proyecto).

## Pendiente

- Integración en `index.html`, `styles/` y `scripts/`: la hace otro agente; este set no toca
  el código del sitio.
- Decidir en qué secciones oscuras se usa `ambient.svg` y con qué opacidad.
- Validar el recorte real de cada tile del collage cuando el otro agente reemplace las capturas
  por estas ilustraciones.
