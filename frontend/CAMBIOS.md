# Cambios en el frontend de VERTRIX

## Arreglos
- ContactForm: el mensaje de éxito nunca aparecía (`event.currentTarget` es null tras el `await`, el `reset()` lanzaba error y caía en "error"). Corregido.
- Texto de éxito del formulario sin mensajes de desarrollo; el tipo de proyecto y presupuesto ahora se envían como ids (no texto traducido).
- `<html lang>` y meta description cambian con el idioma; el idioma inicial sigue al navegador.
- Enlaces a secciones (`/#about`) navegan con el router, sin recargar.
- El cursor nativo solo se oculta si el cursor personalizado está activo (y no en inputs).
- Todos los textos pasaron a los JSON de traducción (Explore/Social, etiquetas del detalle, etc.). Se quitó el duplicado "Más de $6,000+".

## Diseño
- Tipografía: Space Grotesk (títulos), Inter (texto), JetBrains Mono (etiquetas), autoalojadas con @fontsource.
- Contraste y tamaños mínimos de texto subidos; menú de 8 a 6 enlaces.
- Hero con mejor jerarquía; el logo ahora también se ve en móvil.
- Proyecto destacado con portada real, insignia "En desarrollo", captura en marco de navegador y galería de las 6 leyendas.
- Equipo: tarjeta de integrante + tarjeta "Más integrantes pronto".

## Rendimiento / SEO / código
- Imágenes de marca: ~5 MB -> ~0.3 MB (WebP), sin duplicados. Se quitó `dist/` y `brand/source/`.
- Open Graph + Twitter card + apple-touch-icon (og:image apunta a https://vertrix.dev; ajusta si el dominio es otro).
- HomePage dividido en `src/sections/*`; CSS consolidado (sin reglas duplicadas); skip link, aria-pressed, Esc cierra el menú, MotionConfig respeta reduced-motion.

## Pantallas esqueleto (carga)
- `index.html`: esqueleto visible antes de que cargue React.
- Páginas con `React.lazy` + `Suspense` (el JS inicial bajó de ~493 KB a ~233 KB); `Layout` muestra un esqueleto distinto según la ruta (`components/Skeletons.tsx`).
- `SmartImage`: las imágenes muestran un brillo (shimmer) y aparecen con fundido al cargar.

## Pendiente (contenido tuyo)
- Perfiles de los otros 3 integrantes (`src/data/team.ts`, y bajar `PENDING_MEMBERS`).
- Revisar la bio de Edgard y el texto del hero, que reescribí.
