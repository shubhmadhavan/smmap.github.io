#!/usr/bin/env python3
"""
Re-encode the big India base maps so map pages load faster.

  pip3 install pillow
  python3 tools/optimize_images.py            # dry run: shows the savings
  python3 tools/optimize_images.py --write    # overwrite the files

Dimensions are kept exactly (7680x4320), so every plotted coordinate stays
where it is: Leaflet stretches the image to fixed lat/lng bounds.
A file is only replaced when the new one is smaller. Originals stay in git history.
"""
import io
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / "Map_Images"
FILES = ["India_OS_dark.jpg", "India_OS_Grey.jpg", "India_OS_Green.jpg", "India_OS_baige.jpg"]
QUALITY = 82

write = "--write" in sys.argv
total_before = total_after = 0

for name in FILES:
    path = ROOT / name
    if not path.exists():
        print(f"skip  {name} (not found)")
        continue
    img = Image.open(path)
    size = img.size
    buf = io.BytesIO()
    img.convert("RGB").save(buf, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    before, after = path.stat().st_size, buf.tell()
    assert Image.open(io.BytesIO(buf.getvalue())).size == size
    if after < before:
        total_before += before
        total_after += after
        if write:
            path.write_bytes(buf.getvalue())
        print(f"{'wrote' if write else 'would'} {name}: {before/1e6:.1f} MB -> {after/1e6:.1f} MB")
    else:
        print(f"keep  {name}: already {before/1e6:.1f} MB")

print(f"\nTotal: {total_before/1e6:.1f} MB -> {total_after/1e6:.1f} MB" + ("" if write else "   (dry run; add --write)"))
