---
name: verify
description: Cómo compilar, servir y verificar esta app (React+Vite estática) en este VPS sin sudo ni docker.
---

# Verificar instagramprofile

App React 18 + Vite. Sin backend: todo el estado es local.

## Build + servir

```bash
npm run build
npx vite preview --port 4199 --strictPort   # sirve dist/ (correr en background)
```

## Navegador headless (este VPS no tiene sudo ni acceso a docker)

Playwright se instala en el scratchpad (`npm i playwright && npx playwright install chromium`),
pero al chromium le faltan libs del sistema. Se resuelven sin root:

```bash
mkdir -p debs libroot && cd debs
apt-get download libatk1.0-0t64 libatk-bridge2.0-0t64 libatspi2.0-0t64 \
  libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2t64 \
  libxrender1 libxi6
for f in *.deb; do dpkg -x "$f" ../libroot; done
cd .. && LD_LIBRARY_PATH=$PWD/libroot/usr/lib/x86_64-linux-gnu node script.mjs
```

## Flujos que vale la pena recorrer

- Desktop 1400px: rail lateral (4 secciones), formulario visible, editar bio → mockup se actualiza en vivo.
- Móvil 390px: tab bar inferior (5 tabs, "Editar" central); el form del sidebar está oculto — usa selectores `.content ...` (los del `.sidebar` existen en el DOM pero invisibles, y Playwright se cuelga esperándolos).
- Foto: `setInputFiles` con buffer PNG → abre `.crop-modal` → confirmar → `.photo-upload.has-photo` (avatar circular 96px, sin borde punteado) → "Reajustar encuadre" reabre el crop.
- Resize móvil→desktop con tab Editar activo: debe normalizar a Perfil.

## Gotchas

- Los emoji de la bio se ven como tofu en headless (faltan fuentes emoji en el VPS) — no es bug de la app.
- Cuidado con `aspect-ratio` + `max-height` en CSS: el max se transfiere por el ratio y encoge el ancho (bug ya corregido dos veces: dropzone y reel).
