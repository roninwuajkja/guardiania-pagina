# Dirección de arte — ilustraciones gráficas

**Iteración:** reemplazar las capturas de interfaz por un set de ilustraciones vectoriales propias.
**Objetivo:** que la landing se vea como un póster cinematográfico de IA Guardian, no como una galería de screenshots.

## Concepto

**«La guardia invisible».** Diagramas técnicos nocturnos: la arquitectura de privacidad y las
señales del producto convertidas en formas. Nada de personas, nada de texto dentro de la imagen,
nada de capturas de pantalla. Cada escena es una pieza de grabado técnico: líneas finas, geometría
precisa, un foco claro y mucho aire.

## Sistema visual

- **Formato:** 1600 × 1200 px (4:3), SVG vectorial. Área segura central del 60 %: el foco debe
  sobrevivir a recortes 1:1, 0.7:1 y 1.5:1 que hace la landing.
- **Fondo:** Pine 950 `#081B17`, con un degradado radial muy suave a Pine 900 `#0B241E`.
- **Líneas:** Sage 300 `#A9C6B8` al 45–80 %, grosores 1, 1.5 y 2 px. Formas principales en
  Pine 800/700; highlights en Paper `#EEF2ED` al 90 %.
- **Acentos:** Sage 500 `#5E8F7B` para nodos; Amber `#8D620F` solo para atención; Oxblood `#A33128`
  una sola vez, en la escena de alertas, como punto crítico.
- **Textura:** retícula de 40 px al 4–6 % de opacidad, marcas de registro en las esquinas, un halo
  radial detrás del foco. Nada de grano pesado ni ruido.
- **Profundidad:** planos apilados con sombras suaves (no glassmorphism), líneas de conexión
  punteadas, pequeños nodos luminosos.
- **Prohibido:** texto dentro del SVG, personas, caras, robots, escudos genéricos, iconos de stock,
  degradados multicolor, neón, 3D fotorrealista, imágenes raster generadas por IA.
- **Marca:** cada escena lleva el glifo de Vínculo (corte pequeño) en una esquina, a 24 px y 35 %
  de opacidad, como firma de autor.

## Las seis escenas

1. **`panel.svg` — El panel del tutor.**
   Un plano inclinado con tarjetas flotantes: una tarjeta grande de resumen, tres tarjetas de
   métricas y una línea de tiempo con cuatro nodos. Un anillo orbital abraza el conjunto. Sin
   cifras legibles: rectángulos y líneas que sugieren datos.
2. **`alerts.svg` — Señales explicadas.**
   Una tarjeta de alerta en primer plano con un borde ámbar y un nodo óxido; detrás, una traza de
   reglas: una línea quebrada que conecta nodos y se ramifica. Un pequeño vector de flecha señala
   el siguiente paso. La única mancha óxido del set.
3. **`pairing.svg` — Dos voluntades.**
   Dos teléfonos en silueta enfrentados, unidos por un arco punteado; en el centro, una retícula QR
   abstracta de 5×5 módulos. Dos nodos (tutor y menor) en los extremos del arco, uno Sage y otro
   Paper. El espacio entre ambos es el asentimiento.
4. **`agent.svg` — El agente.**
   Un teléfono en silueta vertical, rodeado por tres anillos concéntricos de permisos; un candado
   pequeño formado por dos arcos de la marca en el centro. Líneas de pulso hacia arriba, como
   señales que suben sin texto.
5. **`signals.svg` — La conversación no sale.**
   Un teléfono emitiendo arcos concéntricos que se convierten en un vector: una flecha que sale del
   teléfono y se resuelve en puntos y barras. Un límite punteado alrededor del teléfono marca el
   borde de lo que no sale.
6. **`privacy.svg` — Privacidad por diseño.**
   El glifo de Vínculo a gran escala: dos órbitas y dos puntos, una de ellas convertida en candado.
   Un campo de puntos y una retícula de coordenadas. La pieza más gráfica y vacía del set: el sello
   de la marca.

## Uso en la página

- **Hero:** seis tiles del collage usan las seis escenas con `object-fit: cover` y foco centrado.
  Las dos placas tipográficas (`PRIVACIDAD / POR DISEÑO` y `0 / TEXTOS ENVIADOS`) se mantienen.
- **Secuencia:** cuatro frames a 4:3, sin marco de navegador ni carcasa de teléfono: la ilustración
  es la pieza. Panel, alerts, pairing y agent.
- **Promos:** panel para el tutor y agent para el menor, con `object-fit: cover`.
- **Fondos de la secuencia:** se retiran los respaldos borrosos de screenshots; el pin usa un
  resplandor radial y las ilustraciones aportan el color.

## Entrega

- Seis SVG en `assets/art/`, sin `<text>`, con `viewBox="0 0 1600 1200"`.
- Preview PNG de cada escena en `docs/runs/2026-11-22-landing-guardian-ia/capturas/arte/` para
  revisión.
- Un `assets/art/README.md` breve con el inventario y la paleta.
