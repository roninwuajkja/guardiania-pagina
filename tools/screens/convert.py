"""Convierte las capturas de tools/screens/out a los assets del sitio.

Uso:
    python tools/screens/convert.py

Requiere Pillow. Regenera PNG, WebP y los respaldos de 48 px para la secuencia.
"""
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter

base = Path(__file__).resolve().parents[2]
out = Path(__file__).resolve().parent / "out"
screens = base / "assets" / "screens"

jobs = [
    ("web-pairing.png", "web-pairing", None),
    ("web-alerts.png", "web-alerts", None),
    ("android-pairing-raw.png", "android-pairing", (1100, 2449)),
    ("android-status.png", "android-status", None),
]

for source, name, size in jobs:
    image = Image.open(out / source).convert("RGB")
    if size:
        image = image.resize(size, Image.LANCZOS)
    image.save(screens / f"{name}.png", "PNG")
    image.save(screens / f"{name}.webp", "WEBP", quality=90, method=6)

    width, height = image.size
    backdrop = image.resize((48, max(1, round(height * 48 / width))), Image.LANCZOS)
    backdrop = backdrop.filter(ImageFilter.GaussianBlur(3))
    backdrop = ImageEnhance.Brightness(backdrop).enhance(0.55)
    backdrop = ImageEnhance.Color(backdrop).enhance(1.15)
    backdrop.save(screens / f"{name}-bg.webp", "WEBP", quality=55, method=6)
    print(name, image.size)
