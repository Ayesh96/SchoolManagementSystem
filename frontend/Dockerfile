FROM node:24-slim AS build

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json tsconfig.json ./
COPY frontend/package.json ./frontend/
COPY frontend/packages/api-client-react/package.json ./frontend/packages/api-client-react/

RUN pnpm install --frozen-lockfile

COPY frontend ./frontend

ENV NODE_ENV=production
ENV PORT=4173
ENV BASE_PATH=/

RUN pnpm --filter @workspace/school-management run build

FROM nginx:1.27-alpine

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/dist/public /usr/share/nginx/html

EXPOSE 80
