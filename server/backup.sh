#!/bin/bash
# Daily backup: sqlite3 .backup to local dir, then a verified copy to OneDrive (CIS archives).
set -e
D="$HOME/Local-Infra/data"; mkdir -p "$D/backups"
F="key-projects-$(date +%Y%m%d).sqlite"
sqlite3 "$D/key-projects.sqlite" ".backup '$D/backups/$F'"
ls -t "$D"/backups/key-projects-*.sqlite | tail -n +15 | xargs -I{} rm -- {} 2>/dev/null || true
OD="$HOME/Library/CloudStorage/OneDrive-EnsignCollege/2 - Areas ODrive/CIS - General/4 - Archives/Dashboard - Key Projects CIS"
if [ -d "$OD" ]; then
  cp "$D/backups/$F" "$OD/$F.tmp" && mv "$OD/$F.tmp" "$OD/$F"
  if [ "$(shasum -a 256 < "$D/backups/$F")" = "$(shasum -a 256 < "$OD/$F")" ]; then echo "onedrive copy verified $F"; else echo "ONEDRIVE COPY MISMATCH $F" >&2; exit 1; fi
  ls -t "$OD"/key-projects-*.sqlite | tail -n +31 | xargs -I{} rm -- {} 2>/dev/null || true
else
  echo "OneDrive folder missing, skipped offsite copy" >&2
fi
