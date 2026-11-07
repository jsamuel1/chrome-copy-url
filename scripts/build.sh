#!/usr/bin/env bash
# Package only the files the extension needs into dist/:
#   copy-page-url-<version>.zip        for GitHub and Load unpacked: its manifest carries the Store
#                                      item's public key, so every unpacked copy gets the Store's ID
#                                      (and keeps its settings when loaded from another folder)
#   copy-page-url-<version>-store.zip  for the Chrome Web Store, which does not accept a manifest key
# Prints the path of the first.
set -euo pipefail
cd "$(dirname "$0")/.."

version=$(node -p 'require("./manifest.json").version')
out="dist/copy-page-url-${version}.zip"
store="dist/copy-page-url-${version}-store.zip"
files=(manifest.json background.js offscreen.html offscreen.js
  icons/icon-16.png icons/icon-32.png icons/icon-48.png icons/icon-128.png LICENSE)

rm -rf dist && mkdir -p dist/stage
zip -q -X "$store" "${files[@]}"

cp --parents "${files[@]}" dist/stage 2>/dev/null || for f in "${files[@]}"; do mkdir -p "dist/stage/$(dirname "$f")"; cp "$f" "dist/stage/$f"; done
if [ -f extension-key.txt ]; then
  node -e '
    const fs = require("fs");
    const key = fs.readFileSync("extension-key.txt", "utf8").replace(/-----(BEGIN|END) PUBLIC KEY-----/g, "").replace(/\s+/g, "");
    const m = JSON.parse(fs.readFileSync("dist/stage/manifest.json", "utf8"));
    m.key = key;
    fs.writeFileSync("dist/stage/manifest.json", JSON.stringify(m, null, 2) + "\n");
  '
fi
(cd dist/stage && zip -q -X "../$(basename "$out")" "${files[@]}")
rm -rf dist/stage

echo "$out"
