#!/usr/bin/env bash
# Avvia il Boardroom. Porta di default 8060 (override: PORT=xxxx ./run.sh)
set -e
cd "$(dirname "$0")"
PORT="${PORT:-8060}"
exec .venv/bin/uvicorn app:app --host 0.0.0.0 --port "$PORT"
