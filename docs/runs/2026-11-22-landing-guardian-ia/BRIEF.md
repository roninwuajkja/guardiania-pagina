---
visibility: public
issues: false
release: false
ui: true
assets: true
---

# BRIEF â€” Landing de descarga de IA Guardian

**Run:** 2026-11-22-landing-guardian-ia
**Proyecto:** `C:\Users\Usuario\Desktop\Guardian IA Pagina`
**Estado:** aprobado por directiva del usuario (2026-11-22)

## Problema

IA Guardian tiene APK publicado en GitHub Releases, pero no tiene una pÃ¡gina pÃºblica que lo
presente. Un tutor que recibe el enlace del repositorio no entiende en 30 segundos quÃ© hace la
app, quÃ© no hace, ni cÃ³mo instalarla. La descarga queda escondida en un README tÃ©cnico.

## Objetivo

Publicar una landing estÃ¡tica, en espaÃ±ol de Chile, que:

1. Explique la propuesta de privacidad en una sola pantalla.
2. Muestre el producto real con capturas de la app.
3. Lleve a la descarga del APK v1.7.17 en menos de dos clics.
4. Se sienta tan cinematogrÃ¡fica y cuidada como `rockstargames.com/VI`, sin copiar sus assets,
   fuentes ni textos.

## Audiencia

Tutores (padres o apoderados) de 30â€“50 aÃ±os en Chile, con uno a tres hijos de 8â€“15 aÃ±os que usan
Android. Llegan desde el celular, en una sesiÃ³n corta, con una pregunta: "Â¿esto quÃ© es y quÃ©
tanto invade la privacidad de mi hijo?". Audiencia secundaria: el jurado de la defensa de tÃ­tulo
y desarrolladores que evalÃºan el proyecto.

## Alcance

**Dentro**

- Sitio estÃ¡tico sin build: HTML, CSS y JS nativos.
- Home con 10 bloques narrativos y pÃ¡ginas legales (`legal.html`).
- Loader de entrada, menÃº overlay, ticker, hero-collage, secuencia fijada, reveals, acordeÃ³n,
  contadores, botones magnÃ©ticos y transiciones de tema.
- Descarga directa del APK v1.7.17 y enlace a GitHub Releases.
- Responsive de 360 px a 2560 px, WCAG 2.2 AA, `prefers-reduced-motion` e interruptor de motion.
- Workflow de GitHub Pages que publica solo el sitio.

**Fuera**

- Backend, analÃ­tica, cookies, newsletter real, pagos, login.
- Video de producto (no existe material grabado).
- Capturas nuevas de la app: se usan las existentes en `docs/screenshots`.
- TraducciÃ³n a otros idiomas.
- Registro de dominio o creaciÃ³n de repositorio remoto (requiere confirmaciÃ³n aparte).

## Criterios de Ã©xito

| # | Criterio | MediciÃ³n |
|---|---|---|
| 1 | Un visitante nuevo entiende quÃ© es y quÃ© no hace | Test de 5 segundos sobre el hero + bloque "Lo que nunca hace" |
| 2 | Descarga en â‰¤ 2 clics desde el hero | El CTA del hero apunta directo al asset del release |
| 3 | NingÃºn dato personal real | Solo capturas con datos sintÃ©ticos; rÃ³tulo visible |
| 4 | Rendimiento | LCP < 2,5 s en 4G simulada; sin CLS perceptible |
| 5 | Accesibilidad | Cero violaciones crÃ­ticas de axe; foco visible; contraste AA |
| 6 | Movimiento | 60 fps en desktop; en mÃ³vil y reduced-motion todo el contenido es legible sin efectos |
| 7 | Fidelidad a la referencia | Los 8 recursos de movimiento de `REFERENCIA.md` estÃ¡n implementados |
| 8 | Cero archivos nuevos en el repo de IA Guardian | `git status` del repo original limpio |

## Restricciones

- Ruta Ãºnica de trabajo: `C:\Users\Usuario\Desktop\Guardian IA Pagina`.
- No se escribe nada en el root del repo `Proyecto de Titulo App - GuarderIA`.
- Marca: Pine 950 / Pine 700 / Sage 500 / Sage 300 / Paper / Ink / Oxblood / Amber.
- TipografÃ­a: Archivo (variable, OFL) + Spline Sans Mono (OFL).
- Voz: calma, adulta, sin alarmismo. EspaÃ±ol de Chile.
- El motor de riesgo no es diagnÃ³stico; decirlo.
- Datos de demo sintÃ©ticos, rotulados.

## DecisiÃ³n de direcciÃ³n

Se replica la **gramÃ¡tica cinematogrÃ¡fica** de la referencia (oscuridad, tipografÃ­a condensada,
pÃ³ster-collage, secciones fijadas, secuencia de stills, menÃº partido) y se traduce a la paleta y
voz de IA Guardian. No se replica la estÃ©tica de neÃ³n, violencia ni el tono de videojuego.

