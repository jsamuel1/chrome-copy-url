#!/usr/bin/env bash
# Package only the files the extension needs into dist/copy-page-url-<version>.zip
set -euo pipefail
cd "$(dirname "$0")/.."

version=$(node -p 'require("./manifest.json").version')
out="dist/copy-page-url-${version}.zip"

rm -rf dist && mkdir -p dist
zip -q -X "$out" manifest.json background.js offscreen.html offscreen.js \
  icons/icon-16.png icons/icon-32.png icons/icon-48.png icons/icon-128.png LICENSE

echo "$out"
