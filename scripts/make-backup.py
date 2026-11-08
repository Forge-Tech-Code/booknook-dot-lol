"""Turn one user's synced library into BookNook backup zips, one per look.

Input is a JSON file: {"books": [<rows of public.books>], "prefs": {<user_settings.prefs>}},
as read (read-only) from the BookNook Supabase project. Writes
scripts/.work/backup-<mood>-<light|dark>.zip, each identical except for the
theme, so importing one with "replace" puts the emulator in that look.

Format: booknook app/src/main/java/dev/forgetech/booknook/data/backup/BackupFormat.kt (v1).
Notes and photo covers (cover_path, private bucket) are left out on purpose.

    uv run python3 scripts/make-backup.py rows.json
"""
import json
import sys
import zipfile
from datetime import datetime
from pathlib import Path

MOODS = ["DUSK", "RAINY_CAFE", "FOREST", "MIDNIGHT", "SEASIDE"]
WORK = Path(__file__).resolve().parent / ".work"


def ms(ts):
    return None if ts is None else int(datetime.fromisoformat(ts.replace("Z", "+00:00")).timestamp() * 1000)


def main(path):
    data = json.loads(Path(path).read_text())
    rows = [r for r in data["books"] if not r.get("deleted_at")]
    prefs = data.get("prefs") or {}
    ids = {r["id"]: i + 1 for i, r in enumerate(rows)}
    books = [
        {
            "id": ids[r["id"]], "olWorkKey": r.get("ol_work_key"), "isbn13": r.get("isbn13"),
            "title": r["title"], "authors": r.get("authors") or [], "coverUrl": r.get("cover_url"),
            "coverFile": None, "publisher": r.get("publisher"), "publishYear": r.get("publish_year"),
            "pageCount": r.get("page_count"), "subjects": r.get("subjects") or [],
            "description": r.get("description"), "shelf": r["shelf"], "rating": r.get("rating"),
            "addedAt": ms(r["added_at"]), "shelvedAt": ms(r["shelved_at"]), "updatedAt": ms(r["updated_at"]),
            "finishedAt": ms(r.get("finished_at")),
        }
        for r in rows
    ]
    # Settings sync as strings: comma-separated lists (SettingsRepository.kt).
    split = lambda v: [x for x in (v if isinstance(v, list) else (v or "").split(",")) if x.strip()]
    top = [ids[u] for u in split(prefs.get("top_order")) if u in ids]
    shelf_order = split(prefs.get("shelf_order"))
    WORK.mkdir(exist_ok=True)
    for mood in MOODS:
        for mode in ["LIGHT", "DARK"]:
            file = {
                "format": "booknook-backup", "version": 1, "exportedAt": int(datetime.now().timestamp() * 1000),
                "mood": mood, "themeMode": mode, "shelfOrder": shelf_order, "topOrder": top,
                "books": books, "notes": [],
            }
            out = WORK / f"backup-{mood.lower()}-{mode.lower()}.zip"
            with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
                z.writestr("booknook.json", json.dumps(file, indent=2))
    print(f"{len(books)} books, top {len(top)} -> {WORK}")


if __name__ == "__main__":
    main(sys.argv[1])
