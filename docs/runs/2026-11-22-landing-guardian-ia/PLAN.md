# PLAN — Landing de descarga de IA Guardian

**Run:** 2026-11-22-landing-guardian-ia
**Base:** `C:\Users\Usuario\Desktop\Guardian IA Pagina`
**Entrada:** `BRIEF.md`, `REFERENCIA.md`, `DESIGN.md` del producto, `brand/GUIDELINES.md`

## Fases

| # | Fase | Entregable | Gate | Responsable |
|---|---|---|---|---|
| P0 | Setup | carpetas, assets optimizados, QR, fuentes, run | — | capataz |
| P1 | Esqueleto | `index.html` con las 10 secciones, `styles/tokens.css`, `base.css` | G2 | `disenador-ui` |
| P2 | Piezas | `styles/sections.css`, `styles/motion.css`, `scripts/main.js` | G2 | `disenador-ui` |
| P3 | Responsive | 360/768/1024/1440/2560 sin overflow ni saltos | G2 | `disenador-ui` |
| P4 | Test | smoke Playwright, axe, capturas 3 breakpoints | G3 / D3 | capataz + `auditor-ui` |
| P5 | Corrección | hallazgos critical/high cerrados | G2/G3/D3 | `disenador-ui` |
| P6 | Contexto cero | repo explicable y ejecutable sin pistas | G4 | `goldfish` |
| P7 | Veredicto | PASS/FAIL con scorecard | G5 | `veredicto` |
| P8 | Ship | sitio servido + workflow Pages + `SHIP.md` | G6 | capataz |

## Tareas de construcción

### P1 — Esqueleto

1. `index.html` semántico: skip link, header/ticker/nav, `main` con `#inicio`, `#idea`,
   `#producto`, `#senales`, `#panel`, `#privacidad`, `#descarga`, `#preguntas`, footer.
2. `legal.html` con el mismo shell y contenido de privacidad/términos.
3. `styles/tokens.css`: colores, tipos, espacios, easings, radios, sombras, capas.
4. `styles/base.css`: reset, tipografía, contenedores, botones, foco, utilidades, grano.
5. `assets/` ya poblado. No inventar imágenes ni descargar arte de terceros.

### P2 — Piezas y movimiento

1. Loader de dos cortinas, mínimo 900 ms, máximo 2200 ms, una sola vez por sesión.
2. Ticker infinito con copia `aria-hidden` y pausa en hover.
3. Nav: pill de descarga que aparece a 40 vh; menú `<dialog>` partido 45/55 con foco atrapado.
4. Hero-collage 12×8 con 8 fragmentos, lockup al centro y parallax por `--hp`.
5. Declaración fijada (`sticky`) con reveal por líneas y anillo orbitando.
6. Secuencia fijada de 4 pantallas con crossfade, riel de progreso y rótulo de datos sintéticos.
7. Tarjetas de señales con hover y reveal escalonado.
8. Promocards partidas en dos, con parallax leve de la imagen.
9. Bloque de límites en hoja clara, con tachados que se dibujan y chips que aparecen.
10. Descarga con QR, metadatos, pasos y nota legal.
11. FAQ acordeón accesible.
12. Footer con lockup, columnas y nota de proyecto.

### P3 — Responsive

- 360–639: una columna; collage de 4 fragmentos; secuencia sin pin (tarjetas apiladas);
  menú a pantalla completa; tipografía clamp; sin parallax.
- 640–1023: collage 6 fragmentos; secuencia con pin corto (250 vh).
- 1024+: collage completo; pin de 400 vh; promocards alternadas.
- 1920+: contenedor máximo 1760 px; el resto respira.

### P4 — Verificación

```powershell
npx serve . -l 4173
node tools/smoke.mjs           # Playwright: carga, sin errores de consola, descarga correcta
npx @axe-core/cli http://localhost:4173 --exit
```

Capturas en 390×844, 1440×900 y 2560×1440 para `AUDITORIA-UI.md`.

## Riesgos

| Riesgo | Mitigación |
|---|---|
| Sticky + JS pesado en móvil | Sin pin bajo 640 px; solo `IntersectionObserver`; `rAF` único |
| Contraste bajo en textos sobre capturas | Overlay pine 70–88 % y texto siempre en Paper |
| El hero-collage se ve como captura de pantalla | Recortes con `object-position`, marco pine, duotono suave y lockup encima |
| Carga inicial pesada | WebP, backdrops de 48 px, `loading=lazy`, fuentes precargadas |
| Menú rompe scroll o foco | `<dialog>` nativo + bloqueo de scroll + restauración de foco |
| Reduced motion deja contenido invisible | Estados finales por defecto; el JS solo agrega clases |
| Enlaces de descarga rotos | URL directa al asset v1.7.17 verificada por API |

## Criterios de aceptación técnicos

- HTML válido, sin dependencias externas ni CDN.
- JS < 18 KB sin minificar; CSS < 40 KB.
- Cero `console.error` en carga y scroll completo.
- Un solo `<h1>`; jerarquía de encabezados sin saltos.
- Todos los controles con nombre accesible y foco visible.
- `prefers-reduced-motion: reduce` y toggle manual persistentes.
- Descarga del hero y del bloque final apuntan al mismo asset.
- Nada escrito fuera de `C:\Users\Usuario\Desktop\Guardian IA Pagina`.
