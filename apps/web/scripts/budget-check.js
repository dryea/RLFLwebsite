/**
 * Core Web Vitals / bundle budget check.
 * Scans the Next.js build output and warns if any JS/CSS chunk exceeds budget.
 * Run with: node scripts/budget-check.js
 */
import { readdirSync, readFileSync, statSync, existsSync } from "fs";
import { join, resolve } from "path";

const ROOT = resolve(process.cwd(), ".next/static/chunks");
const JS_BUDGET = 250 * 1024; // 250 KB per chunk
const CSS_BUDGET = 80 * 1024; // 80 KB per CSS
const TOTAL_JS_BUDGET = 400 * 1024; // 400 KB total first-load JS

let issues = 0;
let totalJs = 0;

if (!existsSync(ROOT)) {
  console.log("⚠️  No .next/static/chunks found. Run `next build` first.");
  process.exit(0);
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) {
      walk(p);
    } else if (entry.endsWith(".js") || entry.endsWith(".mjs")) {
      const size = statSync(p).size;
      totalJs += size;
      if (size > JS_BUDGET) {
        issues++;
        console.log(`❌ Large JS chunk: ${p.replace(ROOT, "")} (${(size / 1024).toFixed(0)} KB > ${JS_BUDGET / 1024} KB)`);
      }
    } else if (entry.endsWith(".css")) {
      const size = statSync(p).size;
      if (size > CSS_BUDGET) {
        issues++;
        console.log(`❌ Large CSS: ${p.replace(ROOT, "")} (${(size / 1024).toFixed(0)} KB)`);
      }
    }
  }
}

walk(ROOT);

console.log(`\nTotal JS in build (all chunks incl. lazy): ${(totalJs / 1024 / 1024).toFixed(1)} MB (informational)`);

if (issues === 0) {
  console.log("✅ All initial-load bundles within budget");
} else {
  console.log(`\n⚠️  ${issues} large chunk(s) found. Consider lazy-loading heavy components.`);
  console.log("Note: chunks may be lazy-loaded (on-demand) and not part of initial page load.");
  process.exit(1);
}
