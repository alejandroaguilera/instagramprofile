# Instagram Photo Preview — contexto del proyecto

App para previsualizar cómo se ve una foto de perfil nueva en los distintos contextos de Instagram (perfil, historias, feed/reel, DMs, notificaciones, comentarios, búsqueda) antes de subirla de verdad. React 18 + Vite, 100% estática: todo el estado vive en el navegador, no hay backend ni se envía nada a ningún servidor (y la UI lo promete explícitamente — mantener esa garantía).

**Mantener este archivo actualizado**: en cada ronda de cambios, actualizar la sección Changelog y, si cambió la arquitectura o una decisión, la sección correspondiente. Este archivo es la fuente de contexto entre sesiones.

## Arquitectura

- **Sin router.** `src/App.jsx` tiene todo el estado global: `profile` (datos + `photoUrl`/`originalPhotoUrl`), `activeSection`, `direction` (para transiciones) y el flujo de subida/crop (`fileInputRef`, `cropSrc`).
- **Secciones/tabs** definidas en `src/sections.jsx`: perfil, historias, feed, interacciones + `EDIT_TAB` (editar, solo móvil). Navegación con `SideNav` (rail lateral desktop) y `TabBar` (barra inferior móvil); ambos llaman `selectSection` de App.
- **`src/components/SectionView.jsx`** hace switch por sección y monta los mockups de `src/components/mockups/` (8 mockups que comparten el shell `.mockup-card`).
- **Primitivos** en `src/components/`: `Avatar` (con variantes, ver abajo), `VerifiedBadge`, `PhotoCropModal`, `ProfileForm`.
- **Responsive**: breakpoint 768px (`useMediaQuery`). En desktop el formulario está siempre visible en el sidebar y el tab "editar" no existe (un `useEffect` normaliza a perfil). En móvil el form del sidebar sigue en el DOM pero oculto — en tests usar selectores `.content ...`.
- **Tokens de diseño** en `src/index.css`: colores (`--accent` azul IG), espaciado escala 4px, radios, sombras y movimiento (`--dur-fast` 150ms, `--dur` 200ms, `--dur-slow` 320ms, `--ease-out`). Usar tokens, no valores sueltos.

## Decisiones tomadas (no rehacer sin razón)

- **Flujo de subida/crop centralizado en `App.jsx`** (jul 2026): el input file oculto, `cropSrc` y `PhotoCropModal` viven en App, no en `ProfileForm`. Razón: el flujo se dispara desde tres lugares (form desktop, form móvil "editar", y click en el avatar del mockup de perfil) y antes había input+modal duplicados por instancia del form. `ProfileForm` recibe `onPickFile`, `onDropFile`, `onReadjust` como props. `originalPhotoUrl` guarda la imagen sin recortar para "Reajustar encuadre".
- **`Avatar` tiene tres modos**: normal (`<div>` con ring de story opcional), clicable (prop `onClick` → renderiza `<button>` accesible con `ariaLabel`, hover scale), y `plain` (solo el círculo de la imagen, sin padding/ring — para contextos con anillo propio como el disco de audio del reel: disco de 36px con borde 3px → avatar `plain size={30}`).
- **Transiciones entre tabs**: slide horizontal direccional (320ms) según `NAV_ORDER` en App (el orden del TabBar móvil: perfil, historias, editar, feed, interacciones). El remount que dispara la animación es el `key={section}` del `.section-panel`. `prefers-reduced-motion` desactiva todas las animaciones (`index.css`) — es intencional, no quitarlo; si alguien "no ve" las transiciones, revisar ese ajuste de su OS primero.
- **Repos/deploy**: rama `master` (no `main`). Dockerfile de producción = build estático servido por nginx.

## Verificar

Skill del proyecto: `.claude/skills/verify` (build + `vite preview --port 4199` + Playwright headless; el VPS no tiene sudo/docker — el truco de las libs de Chromium está documentado ahí). Gotchas conocidos: emoji salen como tofu en headless (faltan fuentes, no es bug); cuidado con `aspect-ratio` + `max-height` (encoge el ancho — ya mordió dos veces).

## Deploy

Dokploy en este mismo VPS, deploy automático NO — hay que dispararlo:

```bash
git push   # rama master
curl -s -X POST "$DOKPLOY_URL/api/application.deploy" \
  -H "x-api-key: $DOKPLOY_TOKEN" -H "Content-Type: application/json" \
  -d '{"applicationId": "L0V-aQ0v7mswpqWCmXXzz"}'
```

En vivo: **https://instagramprofile.mrhapps.mx** — confirmar con `curl` que sirve el bundle nuevo antes de reportar como listo.

## Changelog

- **2026-03-21** — App inicial: formulario de perfil + 8 mockups de contextos de Instagram (PR #2).
- **2026-06-26** — Crop y zoom de la foto antes de aplicarla (`PhotoCropModal`); `originalPhotoUrl` permite reajustar el encuadre sin re-subir (PR #3).
- **2026-07-09** — Dockerfile de producción (nginx estático).
- **2026-07-19** — Rediseño: navegación estilo Instagram (rail desktop / tab bar móvil con tab "Editar" central), secciones en vez de una sola página, tokens de diseño, fix del preview de foto.
- **2026-07-19** — Feedback de uso: (1) el avatar del mockup de perfil abre el flujo de subida al tocarlo (flujo de crop centralizado en App); (2) disco de audio del reel concéntrico (variante `plain` de Avatar); (3) transiciones direccionales perceptibles entre tabs (320ms, según orden de navegación).
