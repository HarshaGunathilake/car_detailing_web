#!/usr/bin/env node
/**
 * Fails if src/data/images.ts and scripts/image-sources.json disagree, or if a
 * listed file is missing from public/images/.
 *
 * Runs before every build (hard failure) and before `npm run dev` with --warn,
 * where it prints a notice and lets the server start. A missing file renders as
 * a black box rather than an error, so the notice is what tells you why.
 */
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const warnOnly = process.argv.includes("--warn");
const { images: sources } = JSON.parse(
  await fs.readFile(path.join(root, "scripts", "image-sources.json"), "utf8"),
);
const ts = await fs.readFile(path.join(root, "src", "data", "images.ts"), "utf8");

const used = new Set([...ts.matchAll(/\$\{dir\}\/([^`]+)`/g)].map((m) => m[1]));
const listed = new Set(Object.keys(sources));

const problems = [];
for (const name of used) if (!listed.has(name)) problems.push(`${name} is used but has no source entry`);
for (const name of listed) if (!used.has(name)) problems.push(`${name} has a source entry but is unused`);

const missing = [...listed].filter((n) => !existsSync(path.join(root, "public", "images", n)));

if (problems.length) {
  console.error("Image manifest is out of sync:");
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}

if (missing.length) {
  const say = warnOnly ? console.warn : console.error;
  say(
    `\n${warnOnly ? "WARNING" : "ERROR"}: ${missing.length} of ${listed.size} image files are missing from public/images/.`,
  );
  say("Those slots will render as empty black boxes until you run:\n");
  say("    npm run fetch:images\n");
  if (missing.length <= 8) for (const m of missing) say(`  missing: ${m}`);
  if (!warnOnly) process.exit(1);
  console.warn("Starting anyway.\n");
}

console.log(`Images OK: ${listed.size} files present and accounted for.`);
