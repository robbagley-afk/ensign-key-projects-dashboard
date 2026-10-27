#!/usr/bin/env python3
"""
Ensign Key Projects Dashboard - Daily 5:00 PM Delegated Assignment Notifier
Checks for newly delegated tasks/projects and sends notification emails to assignees.
"""

import os
import sys
import json
import time
import argparse
import subprocess
import tempfile
import urllib.request
from datetime import datetime

# State manifest to prevent duplicate notifications
STATE_DIR = os.path.expanduser("~/.local/state/ensign-key-projects")
MANIFEST_FILE = os.path.join(STATE_DIR, "notified_delegations.json")
LOCAL_DATA_FILE = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "projects.json"
)
LIVE_API_URL = "https://ensign-key-projects-dashboard.vercel.app/api/projects"
DASHBOARD_BASE_URL = "https://ensign-key-projects-dashboard.vercel.app"

# Ensign College CIS Team Roster Email Mappings
TEAM_EMAIL_MAP = {
    "rob bagley": "robbagley@ensign.edu",
    "mike ray": "mray@ensign.edu",
    "gregory fox": "gregoryfox@ensign.edu",
    "rodrigo moll": "rodrigomoll@ensign.edu",
    "victor mendoza": "rodrigomoll@ensign.edu",
    "karla groom": "kgroom@ensign.edu",
    "joseph bonilla": "jbonilla@ensign.edu",
    "joseph bonilla abarca": "jbonilla@ensign.edu",
    "paula": "pgutierrez@ensign.edu",
    "maria gutierrez": "pgutierrez@ensign.edu",
    "aqeel emmanuel": "aemmanuel@ensign.edu",
    "aqeel": "aemmanuel@ensign.edu",
    "kurt jones": "kjones@ensign.edu",
    "alvaro mendiola": "amendiola@ensign.edu",
    "miguel santo": "msanto@ensign.edu",
    "beverly chapman": "bchapman@ensign.edu",
    "brenda wyatt": "bwyatt@ensign.edu",
    "dandy alan de leon": "ddeleon@ensign.edu",
    "debbie whitney": "dwhitney@ensign.edu",
    "dennis watson": "dwatson@ensign.edu",
    "deo datus maganga": "dmaganga@ensign.edu",
    "douglas whitney": "dowhitney@ensign.edu",
    "erere iwhi": "eiwhi@ensign.edu",
    "fernando munoz": "fmunoz@ensign.edu",
    "gessica velasco": "gvelasco@ensign.edu",
    "grover vasquez": "gvasquez@ensign.edu",
    "ismael rodriguez": "irodriguez@ensign.edu",
    "joel velarde": "jvelarde@ensign.edu",
    "jorge bracamontes": "jbracamontes@ensign.edu",
    "julio jaramillo": "jjaramillo@ensign.edu",
    "kevin strawn": "kstrawn@ensign.edu",
    "roy wyatt": "rwyatt@ensign.edu",
    "stan neeleman": "sneeleman@ensign.edu",
    "thomas wang": "twang@ensign.edu",
    "trudy robinson": "trobinson@ensign.edu",
}


def load_projects():
    """Load projects from local data/projects.json or live Vercel endpoint."""
    if os.path.exists(LOCAL_DATA_FILE):
        try:
            with open(LOCAL_DATA_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"[Warning] Failed to read local projects.json: {e}", file=sys.stderr)

    try:
        req = urllib.request.Request(
            LIVE_API_URL, headers={"User-Agent": "KeyProjectsNotifier/1.0"}
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        print(f"[Error] Failed to fetch live projects API: {e}", file=sys.stderr)
        return []


def load_manifest():
    """Load set of already notified delegation keys."""
    os.makedirs(STATE_DIR, exist_ok=True)
    if os.path.exists(MANIFEST_FILE):
        try:
            with open(MANIFEST_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"[Warning] Corrupt manifest, initializing fresh: {e}", file=sys.stderr)
    return {}


def save_manifest(manifest):
    """Save updated notification manifest."""
    os.makedirs(STATE_DIR, exist_ok=True)
    tmp_path = MANIFEST_FILE + ".tmp"
    with open(tmp_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    os.replace(tmp_path, MANIFEST_FILE)


def resolve_email(name):
    """Resolve coworker name to email address."""
    clean = (name or "").lower().strip()
    for key, email in TEAM_EMAIL_MAP.items():
        if key in clean or clean in key:
            return email
    # Default fallback to Rob Bagley
    return "robbagley@ensign.edu"


def send_email_via_mail_app(to_email, subject, body_text):
    """Send an email using macOS Mail.app via AppleScript."""
    temp_dir = tempfile.gettempdir()
    ts = int(time.time())
    pid = os.getpid()
    body_file = os.path.join(temp_dir, f"kp_notify_body_{pid}_{ts}.txt")
    script_file = os.path.join(temp_dir, f"kp_notify_script_{pid}_{ts}.applescript")

    try:
        with open(body_file, "w", encoding="utf-8") as bf:
            bf.write(body_text)

        safe_subject = subject.replace('"', '\\"')
        safe_body_file = body_file.replace("'", "'\\''")

        applescript_content = f"""tell application "Mail"
  set bodyText to do shell script "cat '{safe_body_file}'"
  set msg to make new outgoing message with properties {{subject:"{safe_subject}", content:bodyText, visible:false}}
  tell msg
    make new to recipient with properties {{address:"{to_email}"}}
  end tell
  send msg
end tell
"""
        with open(script_file, "w", encoding="utf-8") as sf:
            sf.write(applescript_content)

        proc = subprocess.run(
            ["osascript", script_file],
            capture_output=True,
            text=True,
            timeout=15,
        )
        if proc.returncode == 0:
            print(f"[Success] Email delivered to {to_email} (Subject: {subject})")
            return True
        else:
            print(
                f"[Error] Mail.app AppleScript error: {proc.stderr.strip()}",
                file=sys.stderr,
            )
            return False
    except Exception as e:
        print(f"[Error] Email dispatch exception: {e}", file=sys.stderr)
        return False
    finally:
        for fpath in (body_file, script_file):
            try:
                if os.path.exists(fpath):
                    os.remove(fpath)
            except OSError:
                pass


def run_notifier(dry_run=False, seed_only=False):
    """Check projects and notify newly delegated assignments."""
    projects = load_projects()
    manifest = load_manifest()
    now_str = datetime.now().isoformat()

    print(
        f"[{now_str}] Running Daily Delegated Assignment Notifier (DryRun={dry_run}, Seed={seed_only})"
    )

    if not projects:
        print("[Notice] No projects found to process.")
        return

    newly_delegated_count = 0

    for p in projects:
        if p.get("isRemoved"):
            continue

        lead = (p.get("delegatedLead") or p.get("delegatedOwner") or "").strip()
        # If not delegated to a coworker, skip
        if not lead or lead.lower() in ("rob bagley", "rob", "none"):
            continue

        key = f"{p['id']}:{lead.lower()}"

        if key in manifest:
            # Already notified
            continue

        if seed_only:
            manifest[key] = {
                "id": p["id"],
                "title": p["title"],
                "lead": lead,
                "seeded_at": now_str,
            }
            continue

        # Prepare Notification
        to_email = resolve_email(lead)
        card_link = f"{DASHBOARD_BASE_URL}/?id={p['id']}"
        subject = f"New Task Assignment: {p['title']}"
        body = f"""You have a new assignment. Please click this link to see the details on the Key Projects Dashboard:
{card_link}

Project: {p['title']}
Assigned Lead: {lead}
Department: {p.get('department', 'Career Services')}
Due Date: {p.get('dueDate', 'TBD')}
Priority: {p.get('quadrant', 'Q1')}
"""

        print(
            f"-> Found new delegated task: '{p['title']}' assigned to '{lead}' ({to_email})"
        )

        if dry_run:
            print(f"   [DRY RUN] Would send email to: {to_email}")
            print(f"   [DRY RUN] Subject: {subject}")
            print(f"   [DRY RUN] Body: {body.strip()}\n")
            newly_delegated_count += 1
            manifest[key] = {
                "id": p["id"],
                "title": p["title"],
                "lead": lead,
                "to_email": to_email,
                "notified_at": now_str,
                "dry_run": True,
            }
        else:
            success = send_email_via_mail_app(to_email, subject, body)
            if success:
                newly_delegated_count += 1
                manifest[key] = {
                    "id": p["id"],
                    "title": p["title"],
                    "lead": lead,
                    "to_email": to_email,
                    "notified_at": now_str,
                }
            else:
                print(
                    f"   [Warning] Failed to send email for {p['id']}, will retry on next run."
                )

    if not dry_run:
        save_manifest(manifest)

    print(
        f"[{datetime.now().isoformat()}] Completed. Notified {newly_delegated_count} new assignment(s)."
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Daily 5:00 PM Delegated Assignment Notifier"
    )
    parser.add_argument(
        "--dry-run", action="store_true", help="Print actions without sending emails"
    )
    parser.add_argument(
        "--seed",
        action="store_true",
        help="Mark all currently delegated tasks as already notified",
    )
    args = parser.parse_args()

    run_notifier(dry_run=args.dry_run, seed_only=args.seed)
