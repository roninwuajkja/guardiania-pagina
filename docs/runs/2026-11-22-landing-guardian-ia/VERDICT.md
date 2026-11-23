# Veredicto: 2026-11-22-landing-guardian-ia

## Decisión

**PASS** — Gates G2/G3/G4/D3 en verde, sin CRITICAL/HIGH/BLOCKER abiertos y con los residuos declarados como límites de demo.

## Gates

| Gate | Estado | Evidencia |
|---|---|---|
| G2 | pass | `html-validate` exit 0; `css-tree` 4/4; `node --check` exit 0; 200 en `/` y `/legal.html`; 0 errores de consola, 0 requests fallidos. |
| G3 | pass | Playwright + axe 4.14.1: 0 violaciones (home/legal, 390/1440, menú y reduced); sin overflow 320–2560; LCP 2.476 ms frío (mediana 2.036) y CLS 0,00006; APK 200, 17.929.961 B, `apksigner` v2/v3 RSA 4096; QR al mismo asset. |
| G4 | pass | GOLDFISH revalidación 2026-11-23: **APTO, 0 BLOCKER, 0 HIGH**; los 4 HIGH se cerraron y verificaron sin leer las correcciones. |
| D3 | pass | AUDITORIA-UI re-auditoría: **PASS, 0 CRITICAL / 0 HIGH / 0 MEDIUM**; cifras visibles en 5 alturas, holgura mínima 28 px. |

## Scorecard

| Eje | Puntuación | Evidencia |
|---|---|---|
| Correctitud | 4/5 | Cumple el brief: explica, muestra producto, descarga en un clic. Criterio 1 validado por lectura de contexto cero, no por test cronometrado de 5 s. |
| Completitud | 4/5 | Alcance «Dentro» cubierto; «transiciones de tema» resuelto como cambio de superficie, sin tema claro/oscuro (declarado N/A en la auditoría). |
| Calidad | 4/5 | Sistema propio y anti-slop pass; LCP pasa por 24 ms y quedan LOW visuales (placas a 2560, riel, esquina `01`). |
| Seguridad | 4/5 | Estática, sin formularios, analítica ni terceros; sin críticos. Abiertos: Issues público y sin CSP (LOW/MEDIUM). |
| Operabilidad | 4/5 | Un comando para servir, sin build; Pages configurado. Sin suite versionada ni CI: verificación no reproducible. |
| Documentación | 5/5 | Brief, plan, diseño, evidencia, auditoría y goldfish completos; README con actualización de versión/checksum/QR y límites. |
| Mantenibilidad | 4/5 | Tokens y CSS separados, JS 15,3 KB; versión escrita 17 veces y checksum manual, mitigado por checklist. |

## Hallazgos bloqueantes

**Ninguno.** 0 CRITICAL/HIGH en D3, 0 BLOCKER/HIGH en G4, sin seguridad grave abierta. La página declara demo, datos sintéticos y canal de contacto no habilitado: no hay promesa falsa.

## Deuda aceptada

- Issues público como canal de derechos; buzones `.cl` previstos, no operativos.
- Responsable por alias; faltan domicilio, región y transferencias de Firebase/Render.
- Sin suite de tests versionada ni CI; `docs/runs/` no se publica.
- Capturas de demo local (`10.0.2.2:8000`, «marito test 2»), rotuladas como demo.
- Sin `og:*`/canonical/robots/404/manifest ni `LICENSE`.
- LOW de pulido: placas a 2560, riel horizontal, contraste de esquina, coreografía loader/hero, flechas del footer, trampa nativa del menú.
- Sin CSP; Android físico, lector de pantalla y GPU móvil no probados.

## Siguiente acción

`ship` — publicar el sitio con el workflow de Pages y verificar URL y descarga. Antes de datos reales: responsable/domicilio, canal privado, CSP y auditoría de seguridad.
