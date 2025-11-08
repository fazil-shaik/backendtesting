#!/usr/bin/env bash
# Lightweight launcher to run the local `crewai` from the ezexample virtualenv
# Ensures we run from the project directory that contains a pyproject.toml

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EZ_DIR="$SCRIPT_DIR/ezexample"
VENV_CREWAI="$EZ_DIR/.venv/bin/crewai"

if [ ! -x "$VENV_CREWAI" ]; then
  echo "Local crewai binary not found at $VENV_CREWAI"
  echo "Activate the virtualenv or install crewai in ezexample/.venv"
  exit 1
fi

cd "$EZ_DIR"
"$VENV_CREWAI" "$@"
