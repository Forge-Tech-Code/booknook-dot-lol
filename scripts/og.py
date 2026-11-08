"""public/og.png (1200x630 link preview): the Lo-fi Dusk day hero, screenshotted
with headless Firefox from a running `npm run preview`, with the text below the
window replaced by a clean tagline strip.

    npm run build && npx vite preview --port 4317 &
    uv run -q --with Pillow python3 scripts/og.py
"""
import subprocess, tempfile
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = Path.home() / "repositories/f0rg3t3ch@git.doopnet.cloud/booknook/app/src/main/res/font"
tmp = Path(tempfile.mkdtemp())
raw_png = tmp / "raw.png"
subprocess.run(["firefox", "--headless", "--profile", str(tmp), "--no-remote", "--window-size=1240,700",
                "--screenshot", str(raw_png), "http://localhost:4317/?mood=dusk&mode=light"], check=True, timeout=90)
raw = Image.open(raw_png).convert("RGB")
bg = raw.getpixel((5, 695))
im = raw.crop((20, 10, 1220, 640))
# Fade the page below the window into plain background, left of the phone.
mask = Image.new("L", im.size, 0)
x1 = 826
for y in range(470, 630):
    for x in range(x1):
        a = min(255, int((y - 470) / 30 * 255))
        mask.putpixel((x, y), a if x < x1 - 14 else int(a * (x1 - x) / 14))
im = Image.composite(Image.new("RGB", im.size, bg), im, mask)
d = ImageDraw.Draw(im)
f1 = ImageFont.truetype(str(FONTS / "fredoka.ttf"), 36)
f2 = ImageFont.truetype(str(FONTS / "nunito.ttf"), 26)
for f, w in ((f1, 500), (f2, 700)):
    try:
        f.set_variation_by_axes([w])
    except Exception:
        pass
d.text((42, 506), "Your books on three little shelves.", font=f1, fill="#3A2A35")
d.text((42, 566), "booknook.lol  ·  $0.99 on Google Play", font=f2, fill="#B4566B")
im.save(ROOT / "public/og.png", optimize=True)
print("public/og.png")
