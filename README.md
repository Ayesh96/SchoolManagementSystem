# Cedar Grove School Management

School administration for teachers, students, classes, timetables, and fees (PostgreSQL).

## Project layout

- `frontend/` — Vite + React UI (`@workspace/school-management`)
- `backend/` — Express API (`@workspace/api-server`)
- `database/` — Drizzle schema and SQL migrations (`@workspace/db`)

## Docker (recommended)

```bash
docker compose up --build
```

- Frontend: http://localhost:3000 (proxies `/api` to the backend)
- Backend: http://localhost:8080
- Postgres: `localhost:5432` (see `.env.example`)

## Local development (pnpm)

- `pnpm install`
- Start Postgres and set `DATABASE_URL` (see `.env.example`)
- `pnpm --filter @workspace/db run migrate` — apply migrations
- `pnpm --filter @workspace/api-server run dev` — API (`PORT=8080`)
- `pnpm --filter @workspace/school-management run dev` — UI (`PORT=5173`, `BASE_PATH=/`)

## Other commands

- `pnpm run typecheck` — full typecheck
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API client and Zod from OpenAPI
- `pnpm --filter @workspace/db run generate` — create a new migration from schema changes

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod, `drizzle-zod`
- API codegen: Orval (OpenAPI)
