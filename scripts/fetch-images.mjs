#!/usr/bin/env node
/**
 * Downloads every photograph listed in scripts/image-sources.json into
 * public/images/. Run once after cloning:
 *
 *   npm run fetch:images
 *
 * Files that already exist are left alone, so re-running is safe and a Luxor
 * original dropped in by hand is never overwritten. Pass --force to refetch.
 */
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "images");
const force = process.argv.includes("--force");

const { images } = JSON.parse(
  await fs.readFile(path.join(root, "scripts", "image-sources.json"), "utf8"),
);

await fs.mkdir(outDir, { recursive: true });

const pad = Math.max(...Object.keys(images).map((n) => n.length));
let downloaded = 0;
let skipped = 0;
const failed = [];

async function get(url, attempt = 1) {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "luxor-car-detailing/1.0 (+asset fetch)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const type = res.headers.get("content-type") || "";
    if (!type.startsWith("image/")) throw new Error(`not an image (${type})`);
    return Buffer.from(await res.arrayBuffer());
  } catch (err) {
    if (attempt < 3) {
      await new Promise((r) => setTimeout(r, attempt * 800));
      return get(url, attempt + 1);
    }
    throw err;
  }
}

for (const [name, url] of Object.entries(images)) {
  const dest = path.join(outDir, name);
  if (!force && existsSync(dest)) {
    skipped++;
    console.log(`  skip     ${name.padEnd(pad)}  already present`);
    continue;
  }
  try {
    const buf = await get(url);
    await fs.writeFile(dest, buf);
    downloaded++;
    console.log(`  saved    ${name.padEnd(pad)}  ${(buf.length / 1024).toFixed(0)} KB`);
  } catch (err) {
    failed.push({ name, url, reason: err.message });
    console.error(`  FAILED   ${name.padEnd(pad)}  ${err.message}`);
  }
}

console.log(`\n${downloaded} downloaded, ${skipped} already present, ${failed.length} failed.`);

if (failed.length) {
  console.error("\nCould not fetch:");
  for (const f of failed) console.error(`  ${f.name}\n    ${f.url}\n    ${f.reason}`);
  console.error("\nSave those by hand into public/images/ under the names above.");
  process.exit(1);
}
