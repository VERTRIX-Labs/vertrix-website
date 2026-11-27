---
name: jeremy-workflow
description: Workflow de desarrollo para la rama jeremy. Siempre antes de iniciar una sesión o tarea sincronizar la rama principal (main), trabajar únicamente en la rama local jeremy, y antes de subir cambios traer los cambios de main para evitar interferencias.
---

# Workflow de desarrollo (rama jeremy)

Antes de iniciar cualquier sesión o tarea, ejecutar siempre los siguientes pasos:

1. Traer los cambios de la rama principal:
   - `git fetch origin`
   - `git checkout main`
   - `git pull origin main`
2. Cambiar a la rama de desarrollo local:
   - `git checkout jeremy`
   - (si no existe localmente: `git checkout -b jeremy origin/jeremy`)
3. Integrar los últimos cambios de main en jeremy si corresponde:
   - `git merge main` (o `git rebase main` según convención del equipo).

Reglas:
- Nunca trabajar directamente sobre `main`; todo el desarrollo se hace en la rama local `jeremy`.
- Antes de cada nueva tarea, repetir el paso 1 para asegurar que `main` esté actualizada.
- Antes de subir cualquier cambio al repositorio, traer los cambios de la rama principal para evitar interferencias:
  - `git fetch origin`
  - `git checkout main`
  - `git pull origin main`
  - `git checkout jeremy`
  - `git merge main` (o `git rebase main`)
- Al finalizar, subir los cambios con `git push origin jeremy`.
- Si hay cambios locales sin commitear, usar stash antes de cambiar de rama y restaurarlos después.
