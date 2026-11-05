#!/bin/bash
# Daily-safe backup using sqlite3 .backup. Not scheduled until Rob approves.
set -e
D="$HOME/Local-Infra/data"; mkdir -p "$D/backups"
sqlite3 "$D/key-projects.sqlite" ".backup '$D/backups/key-projects-$(date +%Y%m%d).sqlite'"
ls -t "$D"/backups/key-projects-*.sqlite | tail -n +15 | xargs -I{} rm -- {} 2>/dev/null || true
