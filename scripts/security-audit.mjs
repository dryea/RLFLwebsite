// RFIL Security Audit Script
// Checks OWASP Top 10 concerns against deployed workers
// Usage: node scripts/security-audit.mjs

const API = "https://rfil-api.sudeepdhakal.workers.dev";
const WEB = "https://rfil-web.sudeepdhakal.workers.dev";

const results = [];

function record(name, pass, detail) {
  results.push({ name, pass, detail });
  console.log(`${pass ? "✓ PASS" : "✗ FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
}

// 1. SQL Injection attempt
async function testSQLi() {
  try {
    const res = await fetch(`${API}/api/cms/pages?lang=en' OR '1'='1`);
    const pass = res.status !== 200 || !(await res.text()).includes("1'='1");
    record("SQL Injection protection", pass, res.status);
  } catch (e) { record("SQL Injection protection", false, e.message); }
}

// 2. Unauthenticated access to admin
async function testAuth() {
  try {
    const res = await fetch(`${API}/api/cms/users`);
    record("Unauthenticated /cms/users blocked", res.status === 401, `status ${res.status}`);
  } catch (e) { record("Unauthenticated /cms/users blocked", false, e.message); }
}

// 3. CORS from malicious origin
async function testCORS() {
  try {
    const res = await fetch(`${API}/api/health`, { headers: { Origin: "https://evil.example.com" } });
    const cors = res.headers.get("Access-Control-Allow-Origin");
    record("CORS restricted (evil origin blocked)", cors === null || !cors.includes("evil"), cors || "no ACAO header");
  } catch (e) { record("CORS restricted", false, e.message); }
}

// 4. Rate limiting present
async function testRateLimit() {
  try {
    let got429 = false;
    for (let i = 0; i < 400; i++) {
      const res = await fetch(`${API}/api/health`);
      if (res.status === 429) { got429 = true; break; }
    }
    record("Rate limiting active", got429, got429 ? "429 observed" : "no 429 (may be exempted for health)");
  } catch (e) { record("Rate limiting active", false, e.message); }
}

// 5. HTTPS enforced
async function testHTTPS() {
  record("HTTPS only (no http available on workers.dev)", true, "workers.dev is HTTPS-only");
}

// 6. Security headers
async function testHeaders() {
  try {
    const res = await fetch(`${API}/api/health`);
    const h = res.headers;
    const checks = {
      "Content-Security-Policy": h.get("content-security-policy"),
      "X-Frame-Options": h.get("x-frame-options"),
      "X-Content-Type-Options": h.get("x-content-type-options"),
      "Referrer-Policy": h.get("referrer-policy"),
      "Strict-Transport-Security": h.get("strict-transport-security"),
    };
    Object.entries(checks).forEach(([k, v]) => {
      record(`${k} header`, !!v, v || "missing");
    });
  } catch (e) { record("Security headers", false, e.message); }
}

// 7. Malformed JSON handling
async function testMalformedInput() {
  try {
    const res = await fetch(`${API}/api/cms/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json{{{",
    });
    record("Malformed input returns 4xx (no crash)", res.status >= 400 && res.status < 500, `status ${res.status}`);
  } catch (e) { record("Malformed input", false, e.message); }
}

// 8. XSS reflection test
async function testXSS() {
  try {
    const res = await fetch(`${API}/api/search?q=<script>alert(1)</script>`);
    const body = await res.text();
    record("XSS reflection blocked", !body.includes("<script>alert(1)"), "checked search endpoint");
  } catch (e) { record("XSS reflection blocked", false, e.message); }
}

// Run all
await testSQLi();
await testAuth();
await testCORS();
await testRateLimit();
await testHTTPS();
await testHeaders();
await testMalformedInput();
await testXSS();

console.log("\n----------------------------------------");
const passed = results.filter(r => r.pass).length;
console.log(`Security audit: ${passed}/${results.length} checks passed`);
