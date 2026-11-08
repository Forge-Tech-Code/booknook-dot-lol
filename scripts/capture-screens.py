"""Drive the emulator through every look and capture the five screens.

Needs: AVD booknook running, the debug APK installed, animations off, demo mode
on, the app SIGNED OUT (an import with "Replace all" while signed in replaces
the synced account too), and the zips from make-backup.py in scripts/.work/.
Writes scripts/.work/raw/<mood>-<mode>-<screen>.png; then run screens.py.

    python3 scripts/capture-screens.py              # all ten looks
    python3 scripts/capture-screens.py forest:dark  # just one
"""
import re, subprocess, sys, time, xml.etree.ElementTree as ET
from pathlib import Path
WORK = Path(__file__).resolve().parent / ".work"
ADB = str(Path.home() / "Android/Sdk/platform-tools/adb")
PKG = "dev.forgetech.booknook.debug"
RAW = WORK / "raw"; RAW.mkdir(parents=True, exist_ok=True)
def sh(*a): return subprocess.run([ADB, "shell", *a], capture_output=True, text=True).stdout
def nodes():
    sh("uiautomator", "dump", "/sdcard/ui.xml")
    for n in ET.fromstring(sh("cat", "/sdcard/ui.xml")).iter("node"):
        t, d = n.get("text", ""), n.get("content-desc", "")
        if t or d: yield t, d, list(map(int, re.findall(r"\d+", n.get("bounds"))))
def find(p, i=0):
    r = re.compile(p, re.I); h = [b for t, d, b in nodes() if r.search(t) or r.search(d)]
    return h[i] if len(h) > i else None
def tap(p, i=0, tries=4):
    for _ in range(tries):
        b = find(p, i)
        if b: sh("input", "tap", str((b[0]+b[2])//2), str((b[1]+b[3])//2)); return
        time.sleep(1)
    raise SystemExit(f"not found: {p}")
def swipe(y1, y2, ms=400): sh("input", "swipe", "540", str(y1), "540", str(y2), str(ms))
def shot(name):
    time.sleep(1.5)
    (RAW / f"{name}.png").write_bytes(subprocess.run([ADB, "exec-out", "screencap", "-p"], capture_output=True).stdout)
    print(" ", name, flush=True)
def back(): sh("input", "keyevent", "KEYCODE_BACK"); time.sleep(1.2)

def look(mood, mode):
    sh("rm", "-f", "/sdcard/Download/*.zip")
    subprocess.run([ADB, "push", str(WORK / f"backup-{mood}-{mode}.zip"), "/sdcard/Download/"], capture_output=True)
    sh("am", "force-stop", PKG); sh("monkey", "-p", PKG, "-c", "android.intent.category.LAUNCHER", "1"); time.sleep(3)
    tap("^Settings$"); time.sleep(1.2); swipe(2000, 400, 300); time.sleep(1)
    tap("^Import$"); time.sleep(2)
    f = f"^backup-{mood}-{mode}\\.zip$"
    if not find(f):
        if find("Show roots"): tap("Show roots"); time.sleep(1.5); tap("^Downloads$"); time.sleep(2.5)
        for _ in range(3):
            if find(f): break
            swipe(2000, 900, 400); time.sleep(1)
    tap(f); time.sleep(1.5); tap("^Replace all$"); time.sleep(3)
    back(); time.sleep(10)  # covers
    pre = f"{mood}-{mode}"
    shot(f"{pre}-home")
    swipe(1700, 1100); time.sleep(2); shot(f"{pre}-shelf")
    swipe(600, 1800, 300); time.sleep(1)
    tap("Reading stats"); time.sleep(2.5); swipe(2000, 600, 1500); time.sleep(2); shot(f"{pre}-stats")
    tap("^Pachinko$"); time.sleep(4); shot(f"{pre}-book")
    back(); back()
    tap("^Settings$"); time.sleep(2); shot(f"{pre}-themes")

looks = [a.split(":") for a in sys.argv[1:]] or [(m, d) for m in ["dusk", "rainy_cafe", "forest", "midnight", "seaside"] for d in ["light", "dark"]]
for m, d in looks:
    print(m, d, flush=True); look(m, d)
