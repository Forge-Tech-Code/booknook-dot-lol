"""PNG icons from public/favicon.svg. Run by hand; commit the output.

    uv run --with cairosvg --with Pillow python3 scripts/build-icons.py
"""
from pathlib import Path
import cairosvg

PUBLIC = Path(__file__).resolve().parent.parent / "public"
svg = (PUBLIC / "favicon.svg").read_bytes()
for name, size in [("favicon-32.png", 32), ("apple-touch-icon.png", 180), ("icon-192.png", 192), ("icon-512.png", 512)]:
    cairosvg.svg2png(bytestring=svg, write_to=str(PUBLIC / name), output_width=size, output_height=size)
    print(name, size)
