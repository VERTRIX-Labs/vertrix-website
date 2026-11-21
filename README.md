# VERTRIX Website

Official website and portfolio for VERTRIX, a software development studio in Nicaragua.

## Repository structure

```text
frontend/                 React, TypeScript, and Vite application
  public/images/brand/    Brand assets served by the website
  src/
    components/
    data/
    locales/
    pages/
backend/                  Express contact API
  src/
  .env.example
  tsconfig.json
package.json              Workspace commands
package-lock.json         Shared dependency lockfile
```

Frontend and backend are independent npm workspaces with separate manifests and build configurations. The root manifest only coordinates them.

## Requirements

- Node.js 20.19 or newer
- npm 10 or newer

## Install and run

From the repository root:

```bash
npm install
npm run dev
```

- Website: `http://localhost:5173`
- Contact API: `http://localhost:3001`

Run either workspace by itself:

```bash
npm run dev:frontend
npm run dev:backend
```

The Vite development server proxies `/api` requests to the backend.

## Contact email setup

Copy `backend/.env.example` to `backend/.env` and set a verified Resend sender and API key:

```powershell
Copy-Item backend/.env.example backend/.env
```

Environment variables:

- `PORT`: API port (default `3001`)
- `ALLOWED_ORIGIN`: permitted frontend origin
- `CONTACT_TO_EMAIL`: destination inbox
- `RESEND_API_KEY`: Resend API key
- `CONTACT_FROM_EMAIL`: verified sender address

The API responds with an error when email credentials are missing; it does not report an unsent message as delivered.

## Quality checks

```bash
npm run build
npm run lint
```

Frontend output is written to `frontend/dist/`. The backend compiles to `backend/dist/`; run it in production with `npm run start --workspace backend`.

## Website data

- `frontend/src/data/projects.ts`: confirmed project information. Ecos de Nicaragua is in development; its repository link is included.
- `frontend/src/data/team.ts`: team profiles. Unconfirmed team details remain out of the public interface.
- `frontend/src/locales/`: English and Spanish translations.
- `frontend/public/images/brand/`: website-ready brand assets. Original supplied files are preserved under `source/`.

For deployment, serve `frontend/dist/` with SPA fallback enabled and run the compiled backend as a Node service. Route `/api/contact` to the backend and configure its environment variables.
