#!/bin/sh
# wrapper entrypoint: delegate to /app/wait-for-db.sh with arguments
set -e

if [ -x "/app/wait-for-db.sh" ]; then
  exec /app/wait-for-db.sh "$@"
else
  echo "/app/wait-for-db.sh not found or not executable"
  exit 127
fi
