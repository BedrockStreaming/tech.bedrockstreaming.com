#!/usr/bin/env python3
"""Check Article and Talk front matter against the Phase 0 schema."""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ALLOWED_LANGUAGE = {"fr", "en"}
LAYOUTS = {"_articles": {"post"}, "_talks": {"video", "conference"}}


def topics():
    found = []
    for line in (ROOT / "_data" / "topics.yml").read_text(encoding="utf-8").splitlines():
        text = line.split("#", 1)[0].strip()
        if not text or ":" not in text:
            continue
        found.append(text.split(":", 1)[0].strip())
    return set(found)


def unmarked():
    paths = set()
    for line in (ROOT / "script" / "language-unmarked.txt").read_text(encoding="utf-8").splitlines():
        text = line.split("#", 1)[0].strip()
        if text:
            paths.add(text)
    return paths


def front_matter(path):
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return None
    lines = text.splitlines(keepends=True)
    for index in range(1, len(lines)):
        if lines[index].strip() == "---":
            return "".join(lines[1:index])
    return None


def field(fm, key):
    match = re.search(rf"^{re.escape(key)}:[ \t]*(.*)$", fm, re.M)
    if not match:
        return None
    return match.group(1).strip().strip("'\"")


def topic_values(fm):
    match = re.search(r"^topics:\s*\[(.*)\]\s*$", fm, re.M)
    if not match:
        return None
    return [item.strip() for item in match.group(1).split(",") if item.strip()]


def main():
    allowed_topics = topics()
    pending = unmarked()
    errors = []
    seen_pending = set()

    for folder, layouts in LAYOUTS.items():
        for path in sorted((ROOT / folder).glob("*.md")):
            rel = str(path.relative_to(ROOT))
            fm = front_matter(path)
            if fm is None:
                errors.append(f"{rel}: missing front matter")
                continue
            layout = field(fm, "layout")
            if layout not in layouts:
                errors.append(f"{rel}: layout {layout!r} is not valid for {folder}")
            if not field(fm, "date"):
                errors.append(f"{rel}: missing date")
            if not field(fm, "permalink"):
                errors.append(f"{rel}: missing permalink")
            if folder == "_talks" and not field(fm, "eventName"):
                errors.append(f"{rel}: missing eventName")
            for banned in ("lang", "other_language", "tags"):
                if re.search(rf"^{banned}:", fm, re.M):
                    errors.append(f"{rel}: remove {banned}")
            language = field(fm, "language")
            if language is None:
                if rel in pending:
                    seen_pending.add(rel)
                else:
                    errors.append(f"{rel}: missing language")
            elif language not in ALLOWED_LANGUAGE:
                errors.append(f"{rel}: language must be fr or en")
            elif rel in pending:
                errors.append(f"{rel}: language is set, remove it from script/language-unmarked.txt")
            values = topic_values(fm)
            if values is None:
                errors.append(f"{rel}: missing topics")
            else:
                for value in values:
                    if value not in allowed_topics:
                        errors.append(f"{rel}: unknown topic {value}")

    for rel in sorted(pending - seen_pending):
        if not (ROOT / rel).exists():
            errors.append(f"{rel}: listed in script/language-unmarked.txt but the file is gone")

    if errors:
        print(f"{len(errors)} front matter error(s):", file=sys.stderr)
        for error in errors:
            print(f"  {error}", file=sys.stderr)
        return 1
    print(f"front matter ok ({len(pending)} language values still unmarked)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
