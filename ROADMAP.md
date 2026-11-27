# Roadmap VERTRIX Website — 5 personas, 5 ramas

Plan de trabajo para repartir el desarrollo entre 5 personas. Cada persona tiene una rama
propia, creada desde `main` actualizado, y entrega su trabajo por Pull Request.

## Reglas del equipo

- `main` es la rama estable: nadie hace commits directos ahí.
- Cada persona trabaja **solo** en su rama personal.
- Antes de cada push: `git fetch --all --prune`, actualizar `main`, hacer `git merge main`
  en la rama personal y resolver conflictos (ver skill `git-workflow`).
- Todo cambio entra a `main` por Pull Request con al menos **1 revisión** de otra persona.
- Nadie hace `push --force` ni `reset --hard` sobre ramas compartidas.
- Un PR solo se aprueba si `npm run lint` y `npm run build` pasan.

## Resumen

| # | Persona | Área | Rama | Prioridad |
|---|---------|------|------|-----------|
| 1 | Francisco | Frontend / UI-UX | `francisco` | Alta |
| 2 | _(nombre)_ | Backend / API y correos | `backend` | Alta |
| 3 | _(nombre)_ | Contenido e i18n | `contenido` | Media |
| 4 | _(nombre)_ | SEO, rendimiento y accesibilidad | `seo` | Media |
| 5 | _(nombre)_ | QA, deploy y documentación | `qa-deploy` | Alta |

Crear cada rama una sola vez desde `main`:

```bash
git checkout main
git pull --ff-only origin main
git checkout -b <rama>
git push -u origin <rama>
```

---

## Persona 1 — Francisco · Frontend / UI-UX (`francisco`)

**Objetivo:** dejar la interfaz consistente, responsive y sin detalles pendientes.

- [ ] Revisar responsive en 360, 768 y 1280 px (Header, Hero, Projects, Team, Contact).
- [ ] Unificar estados `hover`, `focus` y transiciones entre secciones.
- [ ] Revisar el texto y la jerarquía del Hero (pendiente en `frontend/CAMBIOS.md`).
- [ ] Añadir estados vacíos y de error en `ProjectsPage` y en el formulario.
- [ ] Verificar animaciones con `prefers-reduced-motion` y el cursor personalizado.
- [ ] Revisar consistencia de espaciados y tipografías en `index.css` / `App.css`.

**Archivos:** `frontend/src/sections/*`, `frontend/src/components/*`,
`frontend/src/pages/*`, `frontend/src/index.css`, `frontend/src/App.css`

**Entregable:** UI sin desbordes ni saltos en móvil/desktop, build y lint en verde.

---

## Persona 2 — Backend / API y correos (`backend`)

**Objetivo:** endurecer la API de contacto y dejarla lista para producción.

- [ ] Añadir rate limiting por IP en `/api/contact`.
- [ ] Validar y sanear campos, con límites de longitud y tipos.
- [ ] Añadir `GET /api/health` para monitoreo.
- [ ] Unificar errores en JSON (`{ "error": "..." }`) y logs sin datos sensibles.
- [ ] Verificar dominio en Resend y actualizar `CONTACT_FROM_EMAIL`.
- [ ] Probar el envío real (éxito, error de credenciales, payload inválido).

**Archivos:** `backend/src/index.ts`, `backend/.env.example`, `GUIA-CORREOS.md`

**Entregable:** endpoint documentado y probado; errores claros; guía de correos actualizada.

---

## Persona 3 — Contenido e i18n (`contenido`)

**Objetivo:** completar la información pública del sitio en español e inglés.

- [ ] Añadir los perfiles de los 3 integrantes que faltan y bajar `PENDING_MEMBERS`.
- [ ] Revisar la bio de Edgard y el texto del Hero.
- [ ] Actualizar/agregar proyectos en `projects.ts` (con capturas y enlaces).
- [ ] Verificar paridad de claves entre `locales/en` y `locales/es`.
- [ ] Revisar precios: `contact.budgets` en ambos JSON y la tabla `budgets` del backend.

**Archivos:** `frontend/src/data/team.ts`, `frontend/src/data/projects.ts`,
`frontend/src/locales/en/translation.json`, `frontend/src/locales/es/translation.json`,
`backend/src/index.ts` (solo tabla de precios)

**Entregable:** contenido completo y coherente en ambos idiomas, sin claves faltantes.

---

## Persona 4 — SEO, rendimiento y accesibilidad (`seo`)

**Objetivo:** mejorar posicionamiento, velocidad y accesibilidad.

- [ ] Alcanzar Lighthouse ≥ 90 en `/`, `/projects` y detalle de proyecto.
- [ ] Metadatos por ruta (title, description, OG) usando `usePageTitle`.
- [ ] Actualizar `sitemap.xml` y añadir `canonical` por página.
- [ ] Optimizar imágenes (WebP/AVIF, `loading="lazy"`, tamaños correctos).
- [ ] Accesibilidad: contraste, foco visible, `aria-*` y navegación por teclado.
- [ ] Añadir datos estructurados (Organization / WebSite).

**Archivos:** `frontend/index.html`, `frontend/src/hooks/usePageTitle.ts`,
`frontend/src/components/SmartImage.tsx`, `frontend/public/*`, `frontend/src/index.css`

**Entregable:** informe Lighthouse y checklist de accesibilidad adjuntos al PR.

---

## Persona 5 — QA, deploy y documentación (`qa-deploy`)

**Objetivo:** automatizar la calidad y publicar el sitio.

- [ ] Crear CI en GitHub Actions: `npm ci`, `npm run lint`, `npm run build` en cada PR.
- [ ] Escribir checklist de pruebas manuales (formulario, idioma, rutas, 404).
- [ ] Desplegar frontend (SPA fallback) y backend (variables de entorno).
- [ ] Configurar dominio y HTTPS; confirmar que `vertrix.dev` es el dominio real.
- [ ] Actualizar README: deploy, variables y flujo de ramas.
- [ ] Revisar PRs de las otras 4 personas.

**Archivos:** `.github/workflows/*`, `README.md`, `GUIA-CORREOS.md`, `ROADMAP.md`

**Entregable:** CI activo, sitio accesible en producción y documentación al día.

---

## Plan por semanas

| Semana | Foco | Personas |
|--------|------|----------|
| 1 | Crear ramas, contenido inicial, CI base | 3 y 5 |
| 2 | Pulido de UI, hardening de API, SEO base | 1, 2 y 4 |
| 3 | Integración, pruebas cruzadas y staging | Todas |
| 4 | Deploy a producción, documentación y cierre | 5 + revisión de todas |

## Dependencias entre ramas

- `contenido` → `seo`: los metadatos por ruta dependen de los textos finales.
- `backend` → `contenido`: los precios deben coincidir entre API y traducciones.
- `qa-deploy` → todas: el CI y el deploy se validan al final de cada PR.

## Definición de "terminado"

- Lint y build pasan sin errores.
- PR revisado y aprobado por otra persona.
- Sin conflictos con `main`.
- Probado en local (móvil y desktop).
- Documentación afectada actualizada.
