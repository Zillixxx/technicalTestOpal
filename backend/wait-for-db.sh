#!/usr/bin/env sh
# wait-for-db.sh

# Usage: ./wait-for-db.sh <host> <port> <timeout> <command...>
HOST=${1:-db}
PORT=${2:-5432}
TIMEOUT=${3:-30}

echo "Waiting for $HOST:$PORT (timeout: ${TIMEOUT}s)..."

start=$(date +%s)
while ! nc -z "$HOST" "$PORT"; do
  now=$(date +%s)
  elapsed=$((now - start))

  if [ $elapsed -gt $TIMEOUT ]; then
    echo "Database unavailable after ${TIMEOUT}s"
    exit 1
  fi

  echo "Still waiting... (${elapsed}s elapsed)"
  sleep 1
done

echo "Database is ready!"

# Remove the 3 first arguments before executing the real command
shift 3

# Execute the passed command
exec "$@"