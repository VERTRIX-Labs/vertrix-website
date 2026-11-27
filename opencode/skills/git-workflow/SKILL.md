---
name: Flujo de trabajo Git
description: Usar al iniciar cualquier sesión o tarea en este repositorio y antes de subir cambios. Trae los últimos cambios de la rama principal (main) y asegura que todo el trabajo se haga en la rama local francisco, sincronizando con main antes de cada push para evitar interferencias.
---

# Flujo de trabajo Git

## Al iniciar cada sesión o tarea

Antes de leer, editar o crear archivos, prepara el repositorio:

1. Revisa el estado actual: `git status -sb`.
   - Si hay cambios locales sin confirmar, **no los descartes**. Pregunta al usuario qué hacer.
2. Trae los cambios del remoto: `git fetch --all --prune`.
3. Actualiza `main` local sin crear merges: `git checkout main` y luego `git pull --ff-only origin main`.
4. Vuelve a la rama de trabajo: `git checkout francisco`.
5. Integra los cambios de `main` en `francisco`: `git merge main`.
   - Si hay conflictos, detente y pídele al usuario que decida cómo resolverlos.
6. Verifica con `git status -sb` que estás en `francisco` y al día con `origin/francisco`.

Si la rama `francisco` no existe todavía, créala desde `main` actualizado con `git checkout -b francisco`.

## Reglas

- Trabaja **siempre** en la rama local `francisco`. Nunca hagas commits directamente en `main`.
- `main` solo se actualiza desde `origin/main` con fast-forward; no lo modifiques localmente.
- Publica el trabajo con `git push origin francisco` (la rama ya tiene upstream configurado), **solo después** de sincronizar con `main`.
- No uses `git push --force` ni `git reset --hard` sin confirmación explícita del usuario.
- No borres ni sobrescribas cambios locales que no hayas hecho tú: investígalos y pregunta primero.

## Antes de subir cambios al repositorio

Siempre que vayas a hacer `git push`, primero sincroniza con la rama principal para evitar interferencias:

1. Revisa el estado y los cambios: `git status -sb` y `git diff`.
   - Si hay cambios locales sin confirmar, no los descartes; pregunta al usuario.
2. Haz commit de los cambios con un mensaje descriptivo.
3. Trae los cambios del remoto: `git fetch --all --prune`.
4. Actualiza `main` local: `git checkout main` y luego `git pull --ff-only origin main`.
5. Vuelve a la rama de trabajo: `git checkout francisco`.
6. Integra `main` en `francisco`: `git merge main`.
   - Si hay conflictos, detente, resuélvelos solo con la aprobación del usuario y **no subas nada** hasta que el merge esté limpio.
7. Verifica que estás al día: `git status -sb`.
8. Solo entonces sube los cambios: `git push origin francisco`.

Nunca subas cambios sin haber actualizado `main` e integrado sus cambios en `francisco` en ese mismo momento.

## Antes de terminar una tarea

- Revisa `git status` y `git diff` para confirmar que los cambios son los esperados.
- Haz commits pequeños y con mensajes descriptivos.
- Sube la rama con `git push origin francisco` cuando el usuario lo pida o cuando la tarea lo requiera, siguiendo la sección anterior.
