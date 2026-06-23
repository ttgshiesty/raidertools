#!/usr/bin/env python3
"""
Rename files by replacing underscores with hyphens.

Default = dry run only.
Run with --apply to actually rename.

Examples:
  cd items
  python3 rename_underscores_to_dashes.py
  python3 rename_underscores_to_dashes.py --apply

Or from project root:
  python3 rename_underscores_to_dashes.py items
  python3 rename_underscores_to_dashes.py items --apply
"""

from __future__ import annotations

import argparse
from pathlib import Path
import sys


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Rename files so underscores become hyphens."
    )
    parser.add_argument(
        "folder",
        nargs="?",
        default=".",
        help="Folder to scan. Default: current folder.",
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Actually rename files. Without this, it only previews.",
    )
    parser.add_argument(
        "--recursive",
        action="store_true",
        help="Scan subfolders too.",
    )
    parser.add_argument(
        "--all",
        action="store_true",
        help="Rename all file types. Default only renames .json files.",
    )
    args = parser.parse_args()

    root = Path(args.folder).expanduser().resolve()

    if not root.exists():
        print(f"ERROR: folder does not exist: {root}", file=sys.stderr)
        return 1

    if not root.is_dir():
        print(f"ERROR: not a folder: {root}", file=sys.stderr)
        return 1

    pattern = "**/*" if args.recursive else "*"
    files = [p for p in root.glob(pattern) if p.is_file()]

    if not args.all:
        files = [p for p in files if p.suffix == ".json"]

    planned: list[tuple[Path, Path]] = []

    for old_path in sorted(files):
        new_name = old_path.name.replace("_", "-")

        if new_name == old_path.name:
            continue

        new_path = old_path.with_name(new_name)
        planned.append((old_path, new_path))

    if not planned:
        print("No files need renaming.")
        return 0

    errors = False
    seen_targets: dict[Path, Path] = {}

    for old_path, new_path in planned:
        if new_path.exists() and new_path != old_path:
            print(f"COLLISION: {old_path.name} -> {new_path.name} already exists")
            errors = True

        if new_path in seen_targets:
            print(
                f"COLLISION: both {seen_targets[new_path].name} and {old_path.name} "
                f"would become {new_path.name}"
            )
            errors = True
        else:
            seen_targets[new_path] = old_path

    if errors:
        print("\nStopped. Fix collisions before renaming.")
        return 1

    print("Planned renames:")
    for old_path, new_path in planned:
        print(f"  {old_path.name} -> {new_path.name}")

    print(f"\nTotal: {len(planned)} file(s)")

    if not args.apply:
        print("\nDry run only. Run again with --apply to rename.")
        return 0

    for old_path, new_path in planned:
        old_path.rename(new_path)

    print("\nDone.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
