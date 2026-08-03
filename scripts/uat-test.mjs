// RFIL Final UAT (User Acceptance Testing) script
// Verifies key user journeys against the deployed site
// Usage: node scripts/uat-test.mjs

const API = "https://rfil-api.sudeepdhakal.workers.dev";
const WEB = "https://rfil-web.sudeepdhakal.workers.dev";

const results = [];
function record(name, pass, detail) {
  results.push({ name, pass });
  console.log(`${pass ? "✓ PASS" : "✗ FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
}

async function get(url) {
  const res = await fetch(url);
  return { status: res.status, text: await res.text() };
}

// ── Public pages return 200 ──
const publicPages = [
  "/",
  "/en/",
  "/np/",
  "/en/about/introduction",
  "/en/about/mission-goals",
  "/en/products/savings",
  "/en/products/fixed-deposits",
  "/en/products/loans",
  "/en/services",
  "/en/rates/interest-rates",
  "/en/publications/news",
  "/en/publications/events",
  "/en/publications/notices/general-notice",
  "/en/publications/reports/annual-report",
  "/en/branches",
  "/en/careers",
  "/en/gallery",
  "/en/downloads",
  "/en/faq",
  "/en/contact",
  "/en/emi-calculator",
  "/en/loan-enquiry",
  "/en/calendar",
  "/en/search",
  "/en/csr",
  "/en/grievance-handling-officer",
  "/en/compliance-officer",
  "/en/sustainable-banking",
  "/en/about/privacy-policy",
  "/en/team/board-of-directors",
  "/sitemap.xml",
  "/robots.txt",
  "/manifest.json",
];

console.log("=== PUBLIC PAGES (expect 200) ===");
for (const p of publicPages) {
  try {
    const r = await get(WEB + p);
    record(`${p}`, r.status === 200, `status ${r.status}`);
  } catch (e) {
    record(`${p}`, false, e.message);
  }
}

// ── Homepage contains key content ──
console.log("\n=== HOMEPAGE CONTENT ===");
try {
  const home = await get(WEB + "/en/");
  const checks = {
    "Brand name present": home.text.includes("Reliance Finance"),
    "Navigation present": home.text.includes("Products") || home.text.includes("Savings"),
    "EMI calculator present": home.text.includes("EMI"),
    "News section present": home.text.includes("News") || home.text.includes("Highlights"),
    "Footer present": home.text.includes("All rights reserved"),
    "Skip link present": home.text.includes("Skip to main content"),
    "Accessibility toolbar present": home.text.includes("Accessibility options"),
  };
  Object.entries(checks).forEach(([k, v]) => record(k, v));
} catch (e) { record("Homepage content", false, e.message); }

// ── SEO / metadata ──
console.log("\n=== SEO & METADATA ===");
try {
  const home = await get(WEB + "/en/");
  record("JSON-LD structured data", home.text.includes("application/ld+json") || home.text.includes("schema.org"));
  record("Canonical link", home.text.includes("rel=\"canonical\""));
  record("Hreflang alternate", home.text.includes("hreflang"));
  record("OG tags", home.text.includes("og:title"));
  record("Twitter card", home.text.includes("twitter:card"));
  record("manifest link", home.text.includes("manifest.json"));
} catch (e) { record("SEO metadata", false, e.message); }

// ── Bilingual content ──
console.log("\n=== BILINGUAL ===");
try {
  const np = await get(WEB + "/np/");
  const en = await get(WEB + "/en/");
  record("Nepali homepage loads", np.status === 200);
  record("NP + EN pages differ", np.text !== en.text);
} catch (e) { record("Bilingual", false, e.message); }

// ── API health ──
console.log("\n=== API ===");
try {
  const health = await get(API + "/api/health");
  record("API health", health.status === 200 && health.text.includes("ok"));
  const services = await get(API + "/api/cms/services");
  record("Services API", services.status === 200);
  const branches = await get(API + "/api/cms/branches");
  record("Branches API", branches.status === 200);
  const search = await get(API + "/api/search?q=loan");
  record("Search API", search.status === 200);
} catch (e) { record("API", false, e.message); }

// ── CMS auth flow ──
console.log("\n=== CMS AUTH ===");
try {
  const bad = await fetch(API + "/api/cms/auth/login", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@rfil.com", password: "wrongpass" }),
  });
  record("Wrong password rejected", bad.status === 401);
  const login = await fetch(API + "/api/cms/auth/login", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@rfil.com", password: "admin123" }),
  });
  record("Correct login works", login.status === 200);
} catch (e) { record("CMS auth", false, e.message); }

// ── Security ──
console.log("\n=== SECURITY ===");
try {
  const evil = await fetch(API + "/api/health", { headers: { Origin: "https://evil.example.com" } });
  record("CORS evil origin blocked", !(evil.headers.get("Access-Control-Allow-Origin") || "").includes("evil"));
  const h = await fetch(API + "/api/health");
  record("HSTS header", !!h.headers.get("strict-transport-security"));
  record("X-Frame-Options", h.headers.get("x-frame-options") === "DENY");
  record("nosniff", h.headers.get("x-content-type-options") === "nosniff");
} catch (e) { record("Security", false, e.message); }

console.log("\n----------------------------------------");
const passed = results.filter(r => r.pass).length;
console.log(`UAT: ${passed}/${results.length} checks passed`);
if (passed === results.length) console.log("ALL CHECKS PASSED ✓ — ready for go-live");
else console.log("Some checks failed — review above");
