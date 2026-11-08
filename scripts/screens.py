"""Raw emulator captures -> the WebP screenshots the site uses.

Reads scripts/.work/raw/<mood>-<light|dark>-<screen>.png (1080x2400 screencaps)
and writes public/screens/<mood>-<light|dark>-<screen>-<w>.webp at each width in
WIDTHS, which must match SCREEN_WIDTHS in src/images.js.

    uv run -q --with Pillow python3 scripts/screens.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "scripts" / ".work" / "raw"
OUT = ROOT / "public" / "screens"
WIDTHS = [360, 720]

OUT.mkdir(parents=True, exist_ok=True)
for src in sorted(RAW.glob("*.png")):
    img = Image.open(src).convert("RGB")
    for w in WIDTHS:
        h = round(img.height * w / img.width)
        img.resize((w, h), Image.LANCZOS).save(OUT / f"{src.stem}-{w}.webp", "WEBP", quality=82, method=6)
    print(src.stem)
