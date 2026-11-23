# Iteración 2026-11-23 — icono del favicon y pantallas nuevas

**Petición:** que la página muestre el icono del favicon y que las capturas se regeneren con cuentas coherentes para cada escenario.

## Cambios

### 1. Icono del favicon en el nav

- `.brand-symbol` usa `assets/brand/b-vinculo-symbol-small.svg` (el corte pequeño, equivalente al favicon) en vez del símbolo completo.
- El nav muestra el icono solo en todos los breakpoints (desktop y móvil); el lockup horizontal se retiró del nav y se conserva en el hero y el footer.
- Hit area 44×44, icono 34×34, `aria-label="IA Guardian, inicio"` y foco visible intactos.

### 2. Pantallas nuevas y coherentes

Se regeneraron las cuatro pantallas que no cuadraban con el resto:

| Pantalla | Cuenta / escenario | Cambio |
|---|---|---|
| `web-pairing` | Camila (tutora) → Matías (13) | Antes decía «Antonia»; ahora «PARA MATÍAS · 13 AÑOS», QR de demo y código 970 016 |
| `web-alerts` | Camila, Matías y Sofía | Antes era una vista oscura con datos de prueba; ahora es la vista clara del panel con 7 alertas explicables |
| `android-pairing` | Matías (teléfono) | URL del panel de producción `https://guardiania-74l4.onrender.com`, sin `10.0.2.2:8000`; marca de órbita actual |
| `android-status` | Matías (teléfono) y Camila (tutora) | Antes «marito test 2 / Tutor: Mario» y escudo antiguo; ahora «Teléfono de Matías / Tutora: Camila Rojas», órbita actual, permisos y sección «Qué se comparte» |

`web-overview` y `web-mobile` se conservaron porque ya usaban Camila, Matías y Sofía.

### 3. Herramientas

- `tools/screens/` contiene los HTML/CSS de las cuatro pantallas, el QR de demo, `render.cjs` (Playwright) y `convert.py` (Pillow → WebP + respaldos de 48 px).
- Las imágenes se generan a 1440/1100 px y se sirven en WebP; los PNG de origen quedan en `assets/screens/`.

### 4. Textos

- El `aria-label` del póster ya no dice «capturas reales»: dice «pantallas de la interfaz».
- El subtítulo de la secuencia aclara «Cuatro pantallas de la demo local. Datos sintéticos.».
- El README documenta que son reconstrucciones de demo, no capturas de producción, y cómo regenerarlas.

## Unificación de la marca (segunda pasada)

El primer cambio dejó el corte del favicon solo en el nav; el loader, el menú, el ticker, el watermark de descarga, la placa del póster y los lockups del hero/footer seguían usando el símbolo completo. Se unificó todo el chrome:

- `.symbol-mask` (loader, ticker, menú, placa, watermark) usa `b-vinculo-symbol-small.svg`.
- Los lockups `b-vinculo-horizontal-reverse.svg` y `b-vinculo-stacked-reverse.svg` usan el corte pequeño junto al wordmark.
- `favicon.ico` y `apple-touch-icon.png` se regeneraron desde el corte pequeño; `favicon.svg` ya lo usaba.
- El símbolo completo solo permanece dentro de las pantallas de la app (UI del producto en las capturas), no en el chrome de la landing.

Verificado en loader, hero, menú y footer a 1440: el glyph es el mismo del favicon, sin overflow ni errores. `html-validate` y `css-tree` OK.

## Verificación

- 1440×900 y 390×844: 0 errores de consola, 0 requests fallidos, 0 imágenes rotas, sin overflow.
- Las imágenes cargan con las dimensiones declaradas (1440×1000, 1440×1411, 1100×2449, 1440×3120) y sus respaldos de 48 px.
- Axe 4.14.1 con reglas por defecto: 0 violaciones en home y legal a 390/1440.
- Nav: icono visible en 390/1440/2560, hit area 44×44, foco 2 px sage.
- Rendimiento: LCP 2,46–2,51 s (mediana 2,49), CLS 0,00006, 791 KB en 24 requests; el incremento de ~80 KB viene de las pantallas nuevas.
- `html-validate`, `css-tree` y `node --check` OK.

## Nota

Las pantallas son reconstrucciones de la interfaz con datos sintéticos, no capturas de producción. La app real puede variar en detalles de implementación; la landing las rotula como demo. Los gates D3/G4/G5 del run siguen vigentes para el contenido; esta iteración es visual y se verificó con las comprobaciones de arriba.
