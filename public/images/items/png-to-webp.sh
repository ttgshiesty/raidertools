#!/bin/bash

set -e

QUALITY=90

find . -type f -iname "*.png" | while read -r file; do
  output="${file%.*}.webp"

  echo "Converting: $file -> $output"

  if cwebp -q "$QUALITY" "$file" -o "$output"; then
    if [ -f "$output" ] && [ -s "$output" ]; then
      rm "$file"
      echo "Deleted PNG: $file"
    else
      echo "WebP failed or empty, keeping PNG: $file"
    fi
  else
    echo "Failed converting, keeping PNG: $file"
  fi
done

echo "Done."