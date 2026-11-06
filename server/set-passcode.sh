#!/bin/bash
# Usage: set-passcode.sh NEWPASSCODE (min 8 chars). Changes passcode, rotates cookie secret (logs everyone out), restarts server.
set -e
[ ${#1} -ge 8 ] || { echo "Passcode must be at least 8 characters" >&2; exit 1; }
F="$HOME/Local-Infra/data/key-projects.env"
{ printf 'KEY_PROJECTS_PASSCODE=%s\nKEY_PROJECTS_COOKIE_SECRET=%s\nPORT=8097\n' "$1" "$(openssl rand -hex 24)"; } > "$F.new" && chmod 600 "$F.new" && mv "$F.new" "$F"
launchctl kickstart -k "gui/$(id -u)/com.ensign.key-projects-dashboard"
echo "Passcode updated and server restarted."
