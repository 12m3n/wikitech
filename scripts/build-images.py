"""
Fetch, treat and optimise every photograph used on the site.

Two treatments:

  * "ground"  — dimmed, for the images sitting behind dark sections. No colour
                cast: white type sits on top, so these only need to be dark.
  * "card"    — left as shot. These are meant to look like photographs.

Everything is emitted as WebP at the size it is actually displayed, with a
base64 blur placeholder so nothing pops in.
"""
import base64
import hashlib
import io
import os
import shutil
import urllib.request

from PIL import Image, ImageEnhance

OUT = "public/img"
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
# Downloaded originals live outside the repo tree (see .gitignore). They are a
# convenience cache only — delete it and the script just downloads again.
CACHE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".cache", "pexels")

# slot: (pexels id, treatment, width, height)
ASSETS = {
    # --- grounds behind the dark sections (people at work, not hardware) --
    "bg/hero":            (8204363,  "ground", 1920, 1080),
    "bg/infrastructure":  (1181316,  "ground", 1600, 900),
    "bg/ai":              (6805161,  "ground", 1600, 900),
    "bg/why-us":          (7693692,  "ground", 1600, 900),
    "bg/final-cta":       (7580644,  "ground", 1600, 900),
    "bg/about":           (7658405,  "ground", 1600, 900),
    "bg/contact":         (34362334, "ground", 1600, 760),

    # --- service cards ---------------------------------------------------
    "service/erp":            (577195,  "card", 800, 500),
    "service/infrastructure": (2881229, "card", 800, 500),
    "service/accounting":     (164686,  "card", 800, 500),
    "service/tax":            (8872719, "card", 800, 500),
    "service/integrations":   (4487383, "card", 800, 500),
    "service/ai":             (5125366, "card", 800, 500),
    "service/forecasting":    (6801636, "card", 800, 500),
    "service/marketing":      (6476590, "card", 800, 500),

    # --- ERP implementation method --------------------------------------
    "phase/blueprint":   (34573691, "card", 640, 400),
    "phase/re-engineer": (6615107,  "card", 640, 400),
    "phase/migrate":     (5480781,  "card", 640, 400),
    "phase/train":       (8761327,  "card", 640, 400),
    "phase/hypercare":   (8134067,  "card", 640, 400),

    # --- monthly accounting cycle ---------------------------------------
    "cycle/transactions": (7680696, "card", 640, 400),
    "cycle/ap-ar":        (7111490, "card", 640, 400),
    "cycle/bookkeeping":  (8297034, "card", 640, 400),
    "cycle/close":        (7581018, "card", 640, 400),
    "cycle/reporting":    (7876380, "card", 640, 400),

    # --- marketing funnel -------------------------------------------------
    "funnel/demand":  (6476787,  "card", 640, 400),
    "funnel/capture": (7109316,  "card", 640, 400),
    "funnel/qualify": (7948070,  "card", 640, 400),
    "funnel/crm":     (12969403, "card", 640, 400),

    # --- case studies -----------------------------------------------------
    "case/multi-entity-erp":       (2760286, "card", 900, 500),
    "case/ot-it-visibility":       (6034676, "card", 900, 500),
    "case/storefront-to-ledger":   (4484073, "card", 900, 500),
    "case/offshore-pod":           (8761330, "card", 900, 500),
    "case/invoice-ocr":            (4277794, "card", 900, 500),
    "case/multi-jurisdiction-tax": (7545333, "card", 900, 500),
}


def source(pid):
    """Download once, keep it out of the repo."""
    os.makedirs(CACHE, exist_ok=True)
    path = os.path.join(CACHE, f"{pid}.jpg")
    if not os.path.exists(path):
        url = f"https://images.pexels.com/photos/{pid}/pexels-photo-{pid}.jpeg?cs=tinysrgb&w=2000"
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=90) as r, open(path, "wb") as f:
            f.write(r.read())
    return Image.open(path).convert("RGB")


def cover(im, w, h):
    """Crop to the target aspect from the centre, then resize."""
    tr, sr = w / h, im.width / im.height
    if sr > tr:
        nw = int(im.height * tr)
        im = im.crop(((im.width - nw) // 2, 0, (im.width + nw) // 2, im.height))
    else:
        nh = int(im.width / tr)
        im = im.crop((0, (im.height - nh) // 2, im.width, (im.height + nh) // 2))
    return im.resize((w, h), Image.LANCZOS)


def treat(im, kind):
    if kind == "ground":
        # Dim only. Flattening the contrast a little stops busy detail from
        # fighting the headline that sits over it.
        im = ImageEnhance.Contrast(im).enhance(0.92)
        return ImageEnhance.Brightness(im).enhance(0.62)
    # card: the photograph as shot, with a touch of life so it does not read flat
    im = ImageEnhance.Color(im).enhance(1.06)
    return ImageEnhance.Contrast(im).enhance(1.04)


def blur_uri(im):
    tiny = im.resize((14, max(1, int(14 * im.height / im.width))), Image.LANCZOS)
    buf = io.BytesIO()
    tiny.save(buf, "WEBP", quality=40)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()


# Start clean so superseded hashes do not pile up in the repo.
if os.path.isdir(OUT):
    shutil.rmtree(OUT)

manifest, total = {}, 0
for slot, (pid, kind, w, h) in ASSETS.items():
    im = treat(cover(source(pid), w, h), kind)

    buf = io.BytesIO()
    im.save(buf, "WEBP", quality=74 if kind == "ground" else 78, method=6)
    data = buf.getvalue()

    # Content hash in the filename: a changed picture gets a new URL, so no
    # cache anywhere can serve the old one.
    digest = hashlib.sha256(data).hexdigest()[:8]
    path = f"{OUT}/{slot}.{digest}.webp"
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as f:
        f.write(data)

    total += len(data)
    manifest[slot] = {
        "src": f"/img/{slot}.{digest}.webp",
        "width": w,
        "height": h,
        "blurDataURL": blur_uri(im),
        "credit": f"pexels:{pid}",
    }
    print(f"{slot:34s} {w}x{h} {len(data)/1024:7.1f} KB  {digest}")

# --- the typed manifest the app imports -----------------------------------
lines = [
    "// AUTO-GENERATED by scripts/build-images.py - do not edit by hand.",
    f"// {len(ASSETS)} photographs from Pexels (free for commercial use, no attribution",
    "// required). Sources are listed in CREDITS.md.",
    "",
    "export type SiteImage = {",
    "  src: string;",
    "  width: number;",
    "  height: number;",
    "  blurDataURL: string;",
    "};",
    "",
    "export const images = {",
]
for k in sorted(manifest):
    v = manifest[k]
    lines += [
        f'  "{k}": {{',
        f'    src: "{v["src"]}",',
        f'    width: {v["width"]},',
        f'    height: {v["height"]},',
        "    blurDataURL:",
        f'      "{v["blurDataURL"]}",',
        "  },",
    ]
lines += [
    "} as const satisfies Record<string, SiteImage>;",
    "",
    "export type ImageKey = keyof typeof images;",
]
with open("src/data/images.ts", "w", encoding="utf-8") as f:
    f.write("\n".join(lines) + "\n")

# --- the credit record -----------------------------------------------------
credits = [
    "# Image credits",
    "",
    "All photographs are from [Pexels](https://www.pexels.com), used under the",
    "[Pexels License](https://www.pexels.com/license/): free for commercial use, no",
    "attribution required. They are recorded here anyway so any image can be traced",
    "back to its source or swapped out later.",
    "",
    "Each was cropped to its display size and re-encoded as WebP by",
    "`scripts/build-images.py`. Section backdrops (`bg/*`) are additionally dimmed;",
    "card images are otherwise unmodified.",
    "",
    "| Slot | Source |",
    "|---|---|",
]
for k in sorted(manifest):
    pid = manifest[k]["credit"].split(":")[1]
    credits.append(f"| `{k}` | https://www.pexels.com/photo/{pid}/ |")
credits += [
    "",
    "The corporate seal in `public/brand/` is derived from the client-supplied",
    "`wikitech group logo.jpeg` by `scripts/extract-logo.py`.",
    "",
]
with open("CREDITS.md", "w", encoding="utf-8") as f:
    f.write("\n".join(credits))

print(f"\n{len(ASSETS)} images, {total/1024/1024:.2f} MB total")
print("wrote src/data/images.ts and CREDITS.md")
