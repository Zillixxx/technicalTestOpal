#!/bin/sh
# wait-for-db.sh

# Usage: wait-for-db.sh HOST PORT TIMEOUT -- <command...>
# Example: ./wait-for-db.sh db 5432 30 -- sh -c 'npx prisma migrate deploy && npm start'

HOST=${1:-db}
PORT=${2:-5432}
TIMEOUT=${3:-30}

echo "Waiting for ${HOST}:${PORT} (timeout: ${TIMEOUT}s)..."

start=$(date +%s)
while ! nc -z "${HOST}" "${PORT}"; do
  now=$(date +%s)
  elapsed=$((now - start))

  if [ ${elapsed} -gt ${TIMEOUT} ]; then
    echo "Database unavailable after ${TIMEOUT}s"
    exit 1
  fi

  echo "Still waiting... (${elapsed}s elapsed)"
  sleep 1
done

echo "Database is ready!"

# Shift the three arguments so $@ contains the command to execute
shift 3

# Execute the given command
exec "$@"