# Arte — «La guardia invisible»

Set de seis ilustraciones vectoriales para la landing de IA Guardian. Diagramas técnicos
nocturnos: la arquitectura de privacidad y las señales del producto convertidas en formas.
Sin personas, sin texto visible, sin capturas de interfaz.

- **Lienzo:** 1600 × 1200 (4:3), `viewBox="0 0 1600 1200"`.
- **Formato:** SVG estático generado por código (`tools/art/build.mjs`), sin fuentes ni imágenes
  raster. Los PNG de `capturas/arte/` son solo previews de revisión.
- **Foco:** todo lo esencial vive dentro del 60 % central (320–1280 × 240–960), para aguantar
  recortes 1:1, 0.7:1 y 1.5:1 del collage.
- **Firma:** glifo de Vínculo de 24 px al 35 % en la esquina inferior derecha de cada escena.

## Inventario

| Archivo | Escena | Uso en la página | Peso |
|---|---|---|---|
| `panel.svg` | El panel del tutor: tarjeta de resumen, tres métricas, línea de tiempo de cuatro nodos y órbita. | Collage del hero, secuencia 01, promo del tutor. | 15,0 KB |
| `alerts.svg` | Señales explicadas: tarjeta de alerta con borde ámbar, nodo óxido y traza de reglas ramificada. | Collage del hero, secuencia 02. | 12,2 KB |
| `pairing.svg` | Dos voluntades: dos teléfonos en silueta, arco punteado y retícula QR 5×5. | Collage del hero, secuencia 03. | 11,5 KB |
| `agent.svg` | El agente: teléfono vertical, tres anillos de permisos, candado y pulsos. | Collage del hero, secuencia 04, promo del menor. | 9,9 KB |
| `signals.svg` | La conversación no sale: límite punteado, arcos y vector que se resuelve en puntos y barras. | Collage del hero. | 10,0 KB |
| `privacy.svg` | Privacidad por diseño: el glifo a gran escala, dos órbitas, un punto y un candado. | Collage del hero. | 8,6 KB |

Total: ~67 KB. Los seis archivos comparten prefijo de `id` propio (`p-`, `a-`, `pr-`, `ag-`, `s-`,
`pv-`), así que pueden inlinarse juntos sin colisiones.

## Sistema visual

- **Fondo:** Pine 950 `#081B17` con un radial suave de Pine 900 `#0B241E` a Pine 950 y viñeta.
- **Retícula:** 40 px al 5 % y retícula mayor de 200 px al 5,5 %, en Sage 300.
- **Marcas de registro:** escuadras en las cuatro esquinas (52 px de margen), ticks en los
  medios ejes y reglas de borde.
- **Halo:** radial Sage 500 detrás del foco de cada escena.
- **Líneas:** 1 px para detalle, 1,5–2 px para estructura; opacidades 45–90 % en lo narrativo y
  4–12 % en la retícula.
- **Profundidad:** planos apilados (p. ej. bisel Pine 800 con pantalla Pine 950) y sombras
  suaves; conectores punteados y nodos con halo.
- **Sin grano, sin ruido, sin degradados multicolor.**

## Paleta aplicada

| Token | Hex | Uso |
|---|---|---|
| `--pine-950` | `#081B17` | Fondo base, pantallas de teléfono, viñeta. |
| `--pine-900` | `#0B241E` | Centro del fondo, cuerpo del candado. |
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

## Previews

`docs/runs/2026-11-22-landing-guardian-ia/capturas/arte/`

- `panel.png`, `alerts.png`, `pairing.png`, `agent.png`, `signals.png`, `privacy.png` — 1600 × 1200.
- `_contacto.png` — hoja de contacto 1920 × 960 para revisar coherencia.

## Integración

- Usar `<img src="assets/art/panel.svg" width="1600" height="1200" alt="…">`.
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

## Integración en la landing

- Integradas en `index.html`: las seis escenas en el collage del hero, cuatro en la secuencia (`panel`, `alerts`, `pairing`, `agent`) y `panel`/`agent` en las promos.
- Recortes validados a 1440, 768, 390 y 2560: el foco central sobrevive en los tiles 1:1 y 0.7:1; en la secuencia y las promos se usa `object-fit: cover` con foco centrado.
- Los tiles del collage declaran `width="1600" height="1200"` y un filtro suave; el velo del hero quedó como viñeta.
- La integración no altera los SVG ni los scripts de `tools/art/`.
