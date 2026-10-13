#!/bin/sh
set -eu

echo "Running database migrations..."
pnpm --filter @workspace/db run migrate

echo "Starting API server..."
exec node --enable-source-maps ./backend/dist/index.mjs
