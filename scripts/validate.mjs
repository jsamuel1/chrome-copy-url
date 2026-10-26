// Static checks for the extension package (no dependencies; run with `node scripts/validate.mjs`).
// Usage: node scripts/validate.mjs [expected-version]   e.g. in CI on tag v1.2.3 → "1.2.3"
import { readFileSync, existsSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";

const errors = [];
const fail = (msg) => errors.push(msg);

let manifest;
try {
  manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
} catch (e) {
  console.error(`manifest.json is not valid JSON: ${e.message}`);
  process.exit(1);
}

if (manifest.manifest_version !== 3) fail("manifest_version must be 3");
if (!/^\d+(\.\d+){0,3}$/.test(manifest.version ?? "")) fail(`invalid version "${manifest.version}"`);
if ((manifest.name ?? "").length > 75) fail("name must be ≤ 75 characters");
if (!manifest.description || manifest.description.length > 132) fail("description is required and must be ≤ 132 characters");

const expected = process.argv[2]?.replace(/^v/, "");
if (expected && expected !== manifest.version) {
  fail(`tag version ${expected} does not match manifest version ${manifest.version}`);
}

// Every file the manifest points at must exist.
const referenced = [
  manifest.background?.service_worker,
  ...Object.values(manifest.icons ?? {}),
  ...Object.values(manifest.action?.default_icon ?? {}),
  "offscreen.html",
].filter(Boolean);
for (const f of referenced) if (!existsSync(f)) fail(`missing file referenced by manifest: ${f}`);
if (!manifest.icons?.["128"]) fail("a 128px icon is required for the Chrome Web Store");

// Scripts loaded by offscreen.html must exist too.
for (const [, src] of readFileSync("offscreen.html", "utf8").matchAll(/<script[^>]+src="([^"]+)"/g)) {
  if (!existsSync(src)) fail(`offscreen.html loads missing script: ${src}`);
}

// Syntax-check every JS file.
for (const f of ["background.js", "offscreen.js"]) {
  try {
    execFileSync(process.execPath, ["--check", f], { stdio: "pipe" });
  } catch (e) {
    fail(`syntax error in ${f}: ${e.stderr}`);
  }
}

if (!manifest.commands?.["copy-url"]?.suggested_key) fail('missing "copy-url" command shortcut');

for (const f of Object.values(manifest.icons ?? {})) {
  if (existsSync(f) && statSync(f).size === 0) fail(`empty icon: ${f}`);
}

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log(`✓ ${manifest.name} ${manifest.version} is valid`);
