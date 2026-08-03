// Simple load test for RFIL workers
// Usage: node scripts/load-test.mjs [url] [concurrency] [duration_seconds]
// Example: node scripts/load-test.mjs https://rfil-web.sudeepdhakal.workers.dev/en/ 50 30

const target = process.argv[2] || "https://rfil-web.sudeepdhakal.workers.dev/en/";
const concurrency = parseInt(process.argv[3] || "50", 10);
const durationSec = parseInt(process.argv[4] || "30", 10);

const urls = [
  "https://rfil-api.sudeepdhakal.workers.dev/api/health",
  "https://rfil-web.sudeepdhakal.workers.dev/en/",
  "https://rfil-web.sudeepdhakal.workers.dev/en/about/introduction",
  "https://rfil-web.sudeepdhakal.workers.dev/en/products/savings",
  "https://rfil-web.sudeepdhakal.workers.dev/en/services",
  "https://rfil-web.sudeepdhakal.workers.dev/emi-calculator",
  "https://rfil-web.sudeepdhakal.workers.dev/en/contact",
  "https://rfil-api.sudeepdhakal.workers.dev/api/cms/services",
  "https://rfil-api.sudeepdhakal.workers.dev/api/cms/branches",
  "https://rfil-api.sudeepdhakal.workers.dev/api/search?q=loan",
];

let completed = 0;
let failed = 0;
const latencies = [];
let running = 0;
const startTime = Date.now();
const deadline = startTime + durationSec * 1000;

async function worker() {
  while (Date.now() < deadline) {
    const url = urls[Math.floor(Math.random() * urls.length)];
    const t0 = Date.now();
    try {
      const res = await fetch(url);
      const ms = Date.now() - t0;
      latencies.push(ms);
      completed++;
      if (res.status >= 400) failed++;
    } catch (e) {
      failed++;
      completed++;
    }
  }
}

console.log(`Load test: ${concurrency} concurrent, ${durationSec}s against ${target}`);
console.log("Note: 429 responses = rate limiter protecting against single-IP bursts (expected in load tests)");
console.log("----------------------------------------");

const workers = Array.from({ length: concurrency }, () => worker());
await Promise.all(workers);

const elapsed = (Date.now() - startTime) / 1000;
const rps = completed / elapsed;
const sorted = [...latencies].sort((a, b) => a - b);
const p50 = sorted[Math.floor(sorted.length * 0.5)] || 0;
const p95 = sorted[Math.floor(sorted.length * 0.95)] || 0;
const p99 = sorted[Math.floor(sorted.length * 0.99)] || 0;
const avg = latencies.reduce((a, b) => a + b, 0) / (latencies.length || 1);

console.log(`Requests: ${completed} in ${elapsed.toFixed(1)}s`);
console.log(`Throughput: ${rps.toFixed(1)} req/s`);
console.log(`Errors: ${failed} (${((failed / completed) * 100).toFixed(2)}%)`);
console.log("Latency (ms):");
console.log(`  avg: ${avg.toFixed(0)}  p50: ${p50}  p95: ${p95}  p99: ${p99}`);
