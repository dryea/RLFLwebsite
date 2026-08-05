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

const totalMb = (totalJs / 1024 / 1024).toFixed(1);
console.log(`\nTotal JS: ${totalMb} MB`);
if (totalJs > TOTAL_JS_BUDGET) {
  issues++;
  console.log(`❌ Total JS over budget (${totalMb} MB)`);
} else {
  console.log(`✅ Total JS within budget`);
}

if (issues === 0) {
  console.log("✅ All bundles within budget");
} else {
  console.log(`\n⚠️  ${issues} budget issue(s) found. Consider code-splitting large pages.`);
  process.exit(1);
}
