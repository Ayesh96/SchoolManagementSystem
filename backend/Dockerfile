FROM node:24-alpine AS build

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json tsconfig.json ./
COPY backend/package.json ./backend/
COPY backend/packages/api-zod/package.json ./backend/packages/api-zod/
COPY database/package.json ./database/

RUN pnpm install --frozen-lockfile

COPY backend ./backend
COPY backend/packages/api-zod ./backend/packages/api-zod
COPY database ./database

RUN pnpm --filter @workspace/api-server run build

FROM node:24-alpine

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json tsconfig.json ./
COPY backend/package.json ./backend/
COPY backend/packages/api-zod/package.json ./backend/packages/api-zod/
COPY database/package.json ./database/

RUN pnpm install --frozen-lockfile

COPY --from=build /app/backend/dist ./backend/dist
COPY backend/docker-entrypoint.sh ./backend/docker-entrypoint.sh
COPY backend/packages/api-zod ./backend/packages/api-zod
COPY database ./database

RUN chmod +x ./backend/docker-entrypoint.sh

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

ENTRYPOINT ["./backend/docker-entrypoint.sh"]
