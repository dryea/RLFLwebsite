// RFIL Product Migration Script
// Scrapes all product pages from the old site, extracts content & images,
// uploads images to R2, and updates the D1 products table.
//
// Usage:
//   node scripts/migrate-products.mjs            (dry run - prints plan)
//   node scripts/migrate-products.mjs --apply    (uploads + updates DB)
//
// Requires: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID in env
// and wrangler CLI configured.

import { execSync } from "node:child_process";

const OLD_SITE = "https://reliancenepal.com.np";
const API = "https://rfil-api.sudeepdhakal.workers.dev";

const APPLY = process.argv.includes("--apply");

// slug -> { oldUrl, category, title }
const products = [
  // Savings (14)
  { slug: "normal-saving-account", oldUrl: "/deposit/normal-saving-account", category: "savings" },
  { slug: "investors-saving-account", oldUrl: "/deposit/investor-s-saving-account", category: "savings" },
  { slug: "special-saving-account", oldUrl: "/deposit/special-saving-account", category: "savings" },
  { slug: "student-saving-account", oldUrl: "/deposit/student-saving-account", category: "savings" },
  { slug: "shareholders-saving-account", oldUrl: "/deposit/shareholder-s-saving-account", category: "savings" },
  { slug: "pwd-saving-account", oldUrl: "/deposit/pwd-saving-account", category: "savings" },
  { slug: "dhaulagiri-saving-account", oldUrl: "/deposit/dhaulagiri-saving-account", category: "savings" },
  { slug: "kanchanjunga-saving-account", oldUrl: "/deposit/kanchanjunga-saving-account", category: "savings" },
  { slug: "everest-saving-account", oldUrl: "/deposit/everest-saving-account", category: "savings" },
  { slug: "super-saving-account", oldUrl: "/deposit/super-saving-account", category: "savings" },
  { slug: "gold-saving-account", oldUrl: "/deposit/gold-saving-account", category: "savings" },
  { slug: "diamond-saving-account", oldUrl: "/deposit/diamond-saving-account", category: "savings" },
  { slug: "sarathi-saving-account", oldUrl: "/deposit/sarathi-saving-account", category: "savings" },
  { slug: "khutruke-saving-account", oldUrl: "/deposit/khutruke-saving-account", category: "savings" },
  // Fixed Deposits (2 on old site; remittance-FD not present)
  { slug: "individual-fixed-deposit", oldUrl: "/deposit/individual-fixed-deposit", category: "fixed-deposits" },
  { slug: "corporate-fixed-deposit", oldUrl: "/deposit/corporate-fixed-deposit", category: "fixed-deposits" },
  // Keep remittance-FD as an extra product (no old-site page; content stays empty)
  { slug: "remittance-fixed-deposit", oldUrl: "/deposit/remittance-fixed-deposit", category: "fixed-deposits" },
  // Loans (9)
  { slug: "home-loan", oldUrl: "/loan/home-loan", category: "loans" },
  { slug: "auto-loan", oldUrl: "/loan/auto-loan", category: "loans" },
  { slug: "business-loan", oldUrl: "/loan/business-loan", category: "loans" },
  { slug: "agricultural-loan", oldUrl: "/loan/agricultural-loan", category: "loans" },
  { slug: "education-loan", oldUrl: "/loan/education-loan", category: "loans" },
  { slug: "fd-loan", oldUrl: "/loan/fd-loan", category: "loans" },
  { slug: "hire-purchase-loan", oldUrl: "/loan/hire-purchase-loan", category: "loans" },
  { slug: "share-loan", oldUrl: "/loan/share-loan", category: "loans" },
  { slug: "personal-loan", oldUrl: "/loan/personal-loan", category: "loans" },
];

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function extractListItems(html, headerText) {
  // Find <h4>/<h5> headerText followed by a <ul><li>...</li></ul> list
  const re = new RegExp(`<h[45][^>]*>\\s*${headerText}\\s*<\\/h[45]>(.*?)(?:<\\/ul>)`, "is");
  const m = html.match(re);
  if (!m) return [];
  const items = [...m[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
    .map((x) => stripHtml(x[1]))
    .filter(Boolean);
  return items;
}

function extractParagraph(html, headerText) {
  // Find <h4>/<h5> headerText followed by a <p>...</p>
  const re = new RegExp(`<h[45][^>]*>\\s*${headerText}\\s*<\\/h[45]>(.*?)(?:<\\/p>)`, "is");
  const m = html.match(re);
  if (!m) return null;
  return stripHtml(m[1]);
}

function extractFeatures(html) {
  const items = extractListItems(html, "Features");
  if (items.length > 0) return items;
  // Fallback: split paragraph by <br> or commas
  const para = extractParagraph(html, "Features");
  if (para) return para.split(/,|\|/).map((s) => s.trim()).filter(Boolean);
  return [];
}

function extractBanner(html) {
  // Banner image from page header
  const m = html.match(/url\(([^)]*banner_image[^)]*)\)/);
  return m ? m[1] : null;
}

function extractEntryContent(html) {
  // Find the entry_content div and capture until "END SECTION" comment or the next major section
  const s = html.indexOf('entry_content');
  if (s < 0) return null;
  // Find start of the content div's inner content
  const divOpen = html.indexOf("<div", s);
  const start = html.indexOf(">", divOpen) + 1;
  // Capture until the END SECTION TEACHER / next section marker
  const endMarker = html.indexOf("<!-- END SECTION", start);
  const end = endMarker > 0 ? endMarker : start + 4000;
  const raw = html.substring(start, end);
  // Trim trailing nav/divs — keep everything but remove trailing empty wrappers
  let content = raw.trim();
  // Remove the trailing </div> stack that closes the section
  content = content.replace(/<\/div>\s*(<\/div>\s*)+$/i, "");
  return content;
}

function extractRateTable(html) {
  // Find an HTML table near "Fixed Deposit" / tenure content
  const re = /<table[^>]*border[^>]*>[\s\S]*?<\/table>/i;
  const m = html.match(re);
  if (m) return m[0];
  return null;
}

async function scrapeProduct(p) {
  const url = `${OLD_SITE}${p.oldUrl}`;
  const res = await fetch(url);
  const html = await res.text();

  // Title from h1
  const titleMatch = html.match(/<h1[^>]*>\s*([^<]+)/);
  const title = titleMatch ? titleMatch[1].trim() : p.slug;

  // Summary/intro paragraph
  const introMatch = html.match(/<p[^>]*>\s*([^<]{40,})/);
  const summary = introMatch ? stripHtml(introMatch[1]) : null;

  const listFeatures = extractListItems(html, "Features");
  const rateTable = extractRateTable(html);
  const entry = extractEntryContent(html);

  let content;
  if (rateTable && (p.category === "fixed-deposits" || /Fixed Deposit/i.test(title))) {
    // Fixed deposit: keep the rate table
    const intro = extractParagraph(html, "Features");
    content = `${intro ? `<p>${intro}</p>` : ""}${rateTable}`;
  } else if (listFeatures.length > 0) {
    content = `<ul>${listFeatures.map((f) => `<li>${f}</li>`).join("")}</ul>`;
  } else if (entry) {
    content = entry;
  }

  const features = extractFeatures(html);
  const banner = extractBanner(html);
  const interestRateInfo = features.find((f) => /interest rate/i.test(f)) || null;
  const minAmount = (features.find((f) => /minimum balance/i.test(f)) || "").match(/Rs[\s,]*([\d.]+)/i)?.[1] || null;

  return { slug: p.slug, category: p.category, title, summary, content, features, banner, interestRateInfo, minAmount };
}

async function uploadToR2(remoteUrl, filename) {
  const res = await fetch(remoteUrl);
  if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const flatName = filename.replace(/\//g, "-");
  const tmpFile = `C:/Users/sudeep/AppData/Local/Temp/opencode/rfl-${flatName}`;
  const { writeFileSync, existsSync, mkdirSync } = await import("node:fs");
  if (!existsSync("C:/Users/sudeep/AppData/Local/Temp/opencode")) {
    mkdirSync("C:/Users/sudeep/AppData/Local/Temp/opencode", { recursive: true });
  }
  writeFileSync(tmpFile, buf);
  execSync(`npx wrangler r2 object put rfil-media/${filename} --file="${tmpFile}"`, { stdio: "inherit" });
  return filename;
}

async function run() {
  console.log(`Scraping ${products.length} products from ${OLD_SITE}`);
  console.log(APPLY ? "MODE: APPLY (will upload + update DB)" : "MODE: DRY RUN");

  const scraped = [];
  for (const p of products) {
    try {
      const data = await scrapeProduct(p);
      scraped.push(data);
      console.log(`✓ ${p.slug}: "${data.title}" — ${data.features.length} features, content:${data.content ? data.content.length : 0}ch, banner: ${data.banner ? "yes" : "no"}`);
    } catch (e) {
      console.log(`✗ ${p.slug}: ${e.message}`);
    }
  }

  if (!APPLY) {
    console.log("\n[Dry run complete. Run with --apply to upload images & update DB.]");
    return;
  }

  // Upload banners to R2
  console.log("\n=== Uploading banners to R2 ===");
  for (const d of scraped) {
    if (d.banner) {
      try {
        const filename = `products/${d.slug}-banner.png`;
        await uploadToR2(d.banner, filename);
        d.bannerR2 = filename;
        console.log(`✓ uploaded ${d.slug} banner`);
      } catch (e) {
        console.log(`✗ ${d.slug} banner upload failed: ${e.message}`);
      }
    }
  }

  // Update D1 products — write to a .sql file to avoid shell escaping issues
  console.log("\n=== Updating D1 products ===");
  const { writeFileSync } = await import("node:fs");
  const sqlLines = [];
  for (const d of scraped) {
    const featuresJson = JSON.stringify(d.features).replace(/'/g, "''");
    const bannerUrl = d.bannerR2 ? `https://rfil-api.sudeepdhakal.workers.dev/api/media/${d.bannerR2}` : "";
    const esc = (s) => (s == null ? "" : String(s).replace(/'/g, "''"));
    const minAmount = d.minAmount ? Number(d.minAmount) : null;
    const interestInfo = esc(d.interestRateInfo);
    sqlLines.push(
      `UPDATE products SET title='${esc(d.title)}', summary='${esc(d.summary)}', content='${esc(d.content)}', ` +
      `features='${featuresJson}', banner_image='${esc(bannerUrl)}', interest_rate_info='${interestInfo}', ` +
      `min_amount=${minAmount ?? "NULL"}, status='published' WHERE slug='${d.slug}';`
    );
  }
  const sqlFile = `C:/Users/sudeep/AppData/Local/Temp/opencode/products-update.sql`;
  writeFileSync(sqlFile, sqlLines.join("\n"), "utf8");
  try {
    execSync(`npx wrangler d1 execute rfil-db --remote --file="${sqlFile}"`, { stdio: "inherit" });
    console.log(`✓ applied ${sqlLines.length} product updates`);
  } catch (e) {
    console.log(`✗ SQL apply failed: ${e.message}`);
  }

  console.log("\nMigration complete!");
}

run().catch(console.error);
