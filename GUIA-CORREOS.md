# Activar los correos del formulario

## Antes de copiar
Haz una copia de tu proyecto. Luego copia `backend/` y `frontend/` de este zip encima de los tuyos
(reemplaza los archivos). Tu `.env`, si ya existe, no se toca. No hay dependencias nuevas.

## En tu computadora
1. Crea una cuenta en https://resend.com **con vertrixdev@gmail.com** (el correo que recibirá los mensajes).
2. En "API Keys", crea una clave y cópiala.
3. En `backend/`, copia `.env.example` como `.env` y pega la clave en `RESEND_API_KEY`.
4. Terminal 1: `cd backend && npm install && npm run dev`
5. Terminal 2: `cd frontend && npm install && npm run dev`
6. Abre http://localhost:5173, envía el formulario y revisa la bandeja (y spam).

Si falla, la terminal del backend muestra el motivo exacto que devuelve Resend.

## Al publicar
- Frontend y backend se publican como dos servicios (o juntos detrás de un mismo dominio).
- Backend: define las mismas variables del `.env` en el panel del hosting,
  con `ALLOWED_ORIGIN=https://tu-sitio` (sin barra final) y normalmente `TRUST_PROXY=1`.
  Comandos: `npm install && npm run build`, luego `npm start`.
- Frontend: si la API está en otra dirección, define `VITE_API_URL=https://tu-api` antes de `npm run build`.

## Más adelante
`onboarding@resend.dev` es una dirección de pruebas: solo entrega al correo de tu cuenta de Resend.
Para enviar a otros destinatarios (por ejemplo, confirmación automática al cliente) o desde
`contacto@tudominio`, verifica un dominio en https://resend.com/domains y cambia `CONTACT_FROM_EMAIL`.

## Cambiar precios
Textos: `frontend/src/locales/es/translation.json` y `en/translation.json` (`contact.budgets`).
Correo: la tabla `budgets` en `backend/src/index.ts`. Usa el mismo id en los tres.
Los montos en córdobas usan 36.6243 por dólar (tipo oficial 2026).
