# Ship: 2026-11-22-landing-guardian-ia

## Entregable local

- **Sitio:** `C:\Users\Usuario\Desktop\Guardian IA Pagina`
- **Entrada:** `index.html` y `legal.html`
- **Assets:** `assets/` (marca, capturas WebP, fuentes OFL, QR del APK)
- **Código:** `styles/` y `scripts/main.js`, sin dependencias ni build
- **Documentación:** `README.md`
- **Publicación:** `.github/workflows/pages.yml` publica solo el sitio (no `docs/` ni el README)

### Ver en local

```powershell
cd "C:\Users\Usuario\Desktop\Guardian IA Pagina"
python -m http.server 4173 --bind 127.0.0.1
```

Abrir <http://127.0.0.1:4173/> y <http://127.0.0.1:4173/legal.html>.

## Qué se construyó

Landing estática de una página para IA Guardian, control parental Android con privacidad por
diseño. Traduce la gramática cinematográfica de `rockstargames.com/VI` (póster-collage, tipografía
condensada, secciones fijadas, secuencia de stills, menú partido) a la paleta pine/sage y a la voz
calma del producto. Sin assets, fuentes ni textos de Rockstar.

Incluye: loader de dos cortinas, ticker, nav compacto, menú `<dialog>` partido, hero-collage de 8
fragmentos, declaración fijada con cifras, secuencia de 4 pantallas con crossfade y riel, tarjetas
de señales, promocards, hoja clara de límites, descarga con QR y metadatos, FAQ acordeón, footer,
`legal.html`, reduced motion y toggle de movimiento persistente.

## Estado de gates

| Gate | Estado | Evidencia |
|---|---|---|
| G0 | pass | Directiva del usuario y `BRIEF.md` |
| G1 | pass | `PLAN.md` |
| D1 | pass | `DISENO.md` y `REFERENCIA.md` |
| G2 | pass | HTML/CSS/JS válidos; 0 errores de consola; 0 overflow; `TEST-EVIDENCE.md` |
| D2 | pass | 10 secciones y componentes con estados; `DISENO.md` |
| G3 | pass | Playwright, axe, enlaces, LCP 2.476 ms y CLS 0,00006 |
| D3 | pass | `AUDITORIA-UI.md`: re-auditoría PASS, 0 CRITICAL, 0 HIGH y 0 MEDIUM |
| G4 | pass | `GOLDFISH.md`: APTO con 0 BLOCKER; los 4 HIGH de publicación quedaron cerrados y la revalidación 2026-11-23 confirma 0 HIGH abiertos. Evidencia en `CORRECCIONES-GOLDFISH.md`. |
| G5 | pass | `VERDICT.md`: PASS; scorecard 4/4/4/4/4/5/4 y deuda aceptada documentada |
| G6 | pass | Repo público `roninwuajkja/guardiania-pagina` y Pages desplegado en https://roninwuajkja.github.io/guardiania-pagina/ |

## Publicación

Repo propuesto: `roninwuajkja/guardiania-pagina` (público), con GitHub Pages desde Actions.
La creación del repositorio público requiere confirmación escrita del usuario; el sitio ya está
listo para publicarse. No se toca el repositorio de la app ni el atlas: este landing es un proyecto
separado y no cambia módulos de arquitectura.

## Deuda aceptada

- Sin prueba en un Android físico ni instalación del APK; el goldfish validó firma v2/v3, RSA 4096 y metadata con `apksigner`/`aapt`.
- Los buzones `@guardiania.cl` están previstos pero el dominio no está habilitado; el canal operativo es GitHub Issues, público y apto para demo, no para solicitudes con datos reales.
- La formalización del responsable legal/domicilio y la región de transferencia de Firebase/Render quedan declaradas como pendientes antes de operar con datos reales.
- Capturas con datos sintéticos y de demo local (`10.0.2.2`), rotuladas.
- Texto legal es un resumen de proyecto de título, no asesoría legal.
- Sin licencia explícita para el código del sitio; las fuentes OFL sí incluyen su licencia.
- Sin suite de tests versionada ni CI de calidad; la evidencia está en `docs/runs/`.
- Composición de las placas del collage a 2560 px y metadatos sociales (`og:image`) quedan como
  pulido posterior.

## Preflight (2026-11-23T14:38:31.485Z)
- G5: pass
- Repo git: ok
- Rama actual: main
- Secretos: ninguno detectado

## CI (2026-11-23T14:38:59.409Z)
- Omitido: stack no reconocido

## Repositorio (2026-11-23T14:41:06.237Z)
- URL: https://github.com/roninwuajkja/guardiania-pagina
- Visibilidad: public
- Owner: roninwuajkja

## Pages (2026-11-23T14:42Z)
- URL: https://roninwuajkja.github.io/guardiania-pagina/
- Repo: https://github.com/roninwuajkja/guardiania-pagina
- Workflow: `.github/workflows/pages.yml`; run 45196993318, build 5 s + deploy 9 s, success.
- Primer intento 45196855124: fallo al crear el sitio Pages con el `GITHUB_TOKEN`. Se habilito Pages por API (`build_type=workflow`) y se relanzo el workflow.
- Verificacion publica: home 200 (38.096 B), legal 200 (12.809 B), CSS/JS/WebP/SVG 200; Playwright 390/1440: 0 errores de consola, 0 requests fallidos, sin overflow, 8 tiles, descarga al APK correcta; legal sin `mailto:` y con 3 enlaces a GitHub Issues.
