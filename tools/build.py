#!/usr/bin/env python3
"""
BIOMOMMIE static site builder.
Assembles final static HTML pages (committed to the repo, served as-is by
GitHub Pages — no build step needed after cloning) from:
  tools/templates/shell.html   (the <html>/<head>/<body> wrapper)
  tools/templates/header.html  (shared header, same on every page)
  tools/templates/footer.html  (shared footer, same on every page)
  tools/pages/**.html          (per-page fragments)

Each file in tools/pages mirrors its final location relative to the repo
root, e.g. tools/pages/shop/index.html -> shop/index.html.

A page fragment starts with two marker comments, then its <main> content:
  <!--TITLE: Page Title | BIOMOMMIE-->
  <!--DESC: One sentence meta description.-->
  <!--BODYCLASS: home-->   (optional)
  <main>...</main>

Run: python3 tools/build.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TEMPLATES = ROOT / "tools" / "templates"
PAGES = ROOT / "tools" / "pages"

SHELL = (TEMPLATES / "shell.html").read_text(encoding="utf-8")
HEADER = (TEMPLATES / "header.html").read_text(encoding="utf-8")
FOOTER = (TEMPLATES / "footer.html").read_text(encoding="utf-8")

TITLE_RE = re.compile(r"<!--TITLE:\s*(.*?)-->")
DESC_RE = re.compile(r"<!--DESC:\s*(.*?)-->")
BODYCLASS_RE = re.compile(r"<!--BODYCLASS:\s*(.*?)-->")


def build_page(src: Path):
    rel = src.relative_to(PAGES)
    depth = len(rel.parts) - 1
    base = "../" * depth

    raw = src.read_text(encoding="utf-8")
    title_m = TITLE_RE.search(raw)
    desc_m = DESC_RE.search(raw)
    bodyclass_m = BODYCLASS_RE.search(raw)

    title = title_m.group(1).strip() if title_m else "BIOMOMMIE"
    desc = desc_m.group(1).strip() if desc_m else \
        "BIOMOMMIE — premium baby essentials for comfort, connection and little moments."
    bodyclass = bodyclass_m.group(1).strip() if bodyclass_m else ""

    content = TITLE_RE.sub("", raw)
    content = DESC_RE.sub("", content)
    content = BODYCLASS_RE.sub("", content)
    content = content.strip()

    page_header = HEADER.replace("{{BASE}}", base)
    page_footer = FOOTER.replace("{{BASE}}", base)
    content = content.replace("{{BASE}}", base)

    html = SHELL
    html = html.replace("{{TITLE}}", title)
    html = html.replace("{{DESC}}", desc)
    html = html.replace("{{BODYCLASS}}", bodyclass)
    html = html.replace("{{BASE}}", base)
    html = html.replace("{{HEADER}}", page_header)
    html = html.replace("{{FOOTER}}", page_footer)
    html = html.replace("{{CONTENT}}", content)

    out_path = ROOT / rel
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(html, encoding="utf-8")
    print(f"built  {rel}")


def main():
    pages = sorted(PAGES.rglob("*.html"))
    if not pages:
        print("No pages found in tools/pages/")
        return
    for p in pages:
        build_page(p)
    print(f"\n{len(pages)} pages built.")


if __name__ == "__main__":
    main()
