#!/usr/bin/env python3
"""
Build the 长仿宋 web font used by the Chinese engineering pages.

Source: 朱雀仿宋 Zhuque Fangsong (TrionesType, SIL OFL 1.1), merged from the
@chinese-fonts/zqfs package into archive/fonts/ZhuqueFangsong-Regular.woff2 (not deployed).

What it does:
  1. collects every CJK character / full-width punctuation used in the engineering
     sources (so the file stays a few dozen KB),
  2. subsets the font to those characters,
  3. narrows the glyphs horizontally (WIDTH) to imitate 长仿宋 per GB/T 14691,
  4. writes public/fonts/zhuque-fs-eng.woff2.

Re-run after adding Chinese text to the engineering pages:
    pip install fonttools brotli
    python3 scripts/subset-fangsong.py
"""
import pathlib
import re

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / 'archive/fonts/ZhuqueFangsong-Regular.woff2'
OUT = ROOT / 'public/fonts/zhuque-fs-eng.woff2'
SCAN = [
    *ROOT.glob('src/components/engineering/*.tsx'),
    ROOT / 'src/data/engineeringSheets.ts',
]
WIDTH = 0.82  # GB/T 14691 长仿宋 is ~0.7 of the height; 0.82 stays readable on screen

CJK = re.compile(r'[　-〿㐀-䶿一-鿿＀-￯—…·‘’“”]')


def main() -> None:
    chars = set()
    for f in SCAN:
        chars.update(CJK.findall(f.read_text(encoding='utf-8')))
    font = TTFont(SRC)
    have = set(font.getBestCmap())
    keep = sorted(c for c in chars if ord(c) in have)
    missing = sorted(c for c in chars if ord(c) not in have)

    opts = subset.Options()
    opts.layout_features = []
    opts.name_IDs = ['*']
    opts.notdef_outline = True
    sub = subset.Subsetter(opts)
    sub.populate(text=''.join(keep))
    sub.subset(font)

    # narrow every glyph: outlines and advance widths
    glyf, hmtx = font['glyf'], font['hmtx']
    for name in font.getGlyphOrder():
        g = glyf[name]
        if g.numberOfContours > 0:
            coords = g.coordinates
            for i, (x, y) in enumerate(coords):
                coords[i] = (round(x * WIDTH), y)
            g.recalcBounds(glyf)
        elif g.isComposite():
            for comp in g.components:
                comp.x = round(comp.x * WIDTH)
            g.recalcBounds(glyf)
        adv, lsb = hmtx[name]
        hmtx[name] = (round(adv * WIDTH), round(lsb * WIDTH))
    font['hhea'].advanceWidthMax = max(a for a, _ in hmtx.metrics.values())

    OUT.parent.mkdir(parents=True, exist_ok=True)
    font.flavor = 'woff2'
    font.save(OUT)
    print(f'{len(keep)} glyphs -> {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB)')
    if missing:
        print('not in font (falls back to system):', ''.join(missing))


if __name__ == '__main__':
    main()
