#!/bin/bash
# Launch wrapper: loads env (passcode) and starts the server.
cd "$(dirname "$0")/.." || exit 1
set -a; . "$HOME/Local-Infra/data/key-projects.env"; set +a
exec "${NODE_BIN:-$(command -v node || echo /opt/homebrew/bin/node)}" server/index.js
