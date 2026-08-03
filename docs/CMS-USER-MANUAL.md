# Reliance Finance CMS — User Manual

**For content editors and administrators** | Version 1.0

---

## 1. Getting Started

### 1.1 Login

1. Open `https://rfil-web.sudeepdhakal.workers.dev/cms/login`
2. Enter your **email** and **password**
3. Click **Sign In**

> If you forgot your password, contact the system administrator.

### 1.2 The Dashboard

After login you land on the **Dashboard** showing quick counts of all content types:

- **Pages** — static pages (About, Governance, etc.)
- **Products** — savings, fixed deposits, loans
- **News** — articles and announcements
- **Media** — uploaded images, PDFs, documents

Use the **left sidebar** to navigate between content sections.

---

## 2. Managing Pages

### 2.1 Create a New Page

1. Click **Pages** in the sidebar
2. Click **+ New Page** (top right)
3. Fill in:
   - **Title** — the page heading
   - **Slug** — URL identifier (auto-generated, lowercase with dashes)
   - **Content** — write using the rich text editor
4. Set **Status**:
   - `Draft` — save without publishing
   - `Published` — visible on the public site
5. Click **Save Draft** or **Publish**

### 2.2 The Editor Toolbar

| Button | Action |
|--------|--------|
| **B / I / U** | Bold, italic, underline |
| **H1–H3** | Heading levels |
| **• List / 1. List** | Bulleted / numbered lists |
| **Link** | Insert hyperlink |
| **Image** | Insert image from URL |
| **Table** | Insert data table |
| **Quote** | Blockquote |
| **Undo / Redo** | Revert / reapply changes |

### 2.3 Edit an Existing Page

1. Go to **Pages**
2. Find the page and click the **pencil** icon
3. Make changes
4. **Save** or **Publish**

### 2.4 SEO Fields

On the right panel, fill in:
- **Meta Title** — appears in Google search results (≤ 60 chars)
- **Meta Description** — summary shown in search results (≤ 160 chars)

> Always fill these for every page — they help customers find you on Google.

---

## 3. Managing Products

Products cover **Savings accounts**, **Fixed Deposits**, and **Loans**.

### 3.1 Add a Product

1. Click **Products** in sidebar
2. Click **+ New Product**
3. Fill in fields:
   - **Title** — product name
   - **Type** — Savings / Fixed Deposit / Loan
   - **Sort Order** — position in listing (lower = higher)
4. Set **Status** and **Save**

> Each product's detailed page is managed via the **Pages** section (slug under `/products/...`).

---

## 4. Managing News

### 4.1 Publish News

1. Click **News** in sidebar
2. Click **+ New**
3. Enter:
   - **Title** and **Slug**
   - **Content** (rich text)
   - **Status** → Published
4. **Save**

News appears on the public **News** page and the homepage's "Latest Highlights" section.

---

## 5. Media Library

### 5.1 Upload Files

1. Click **Media** in sidebar
2. Click **Upload**
3. Select image or document
4. File is stored in Cloudflare R2 and shown in the grid

### 5.2 Use Media in Content

- Click a file to reveal its **Copy URL** button
- Paste the URL into the editor's **Image** or **Link** tool

### 5.3 Delete Media

- Hover a file → click the **trash** icon
- Confirm deletion

> Deleting media also removes it from R2 storage. Deleted files cannot be recovered.

---

## 6. Managing Other Content Types

The CMS sidebar provides editors for:

| Section | What it manages | Public location |
|---------|----------------|-----------------|
| **Services** | Banking services (mobile banking, debit card, remittance...) | `/services/...` |
| **Team** | Staff directory (board, management, HOD...) | `/team/...` |
| **Branches** | Branch locations and contacts | `/branches` |
| **Rates** | Interest rates and charges | `/rates/...` |
| **Notices** | AGM, tender, general notices | `/publications/notices/...` |
| **Reports** | Annual, quarterly, Basel II reports | `/publications/reports/...` |
| **Gallery** | Photo albums | `/gallery` |
| **Downloads** | Forms and brochures | `/downloads` |
| **FAQ** | Frequently asked questions | `/faq` |
| **Careers** | Job listings | `/careers` |

All follow the same pattern: **list → + New → fill fields → Save**.

---

## 7. Handling Enquiries

Customer submissions (contact forms, loan enquiries) appear under **Enquiries** in the sidebar.

- View details by clicking a row
- Update the **status** as you follow up:
  - `New` → `Contacted` → `Processed` → `Closed`

> Respond to enquiries promptly — these are potential customers.

---

## 8. Best Practices

- **Save drafts** frequently while editing long content
- **Preview** before publishing by using the "View" link
- Use **meaningful titles and slugs** (SEO-friendly)
- Always add **alt text** / captions where available
- Fill **SEO fields** for every public page
- **Proofread** before clicking Publish
- Check that **bilingual content** (English / नेपाली) is complete where available

---

## 9. Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't log in | Check email/password; contact admin to reset |
| Changes not visible | Ensure status is **Published** and refresh the page |
| Image not uploading | File may exceed size limit; use a compressed image |
| Page shows 404 | Check the **slug** matches the expected URL |
| Content appears wrong on mobile | Ensure you saved and the browser is up to date |

---

## 10. Support

- **CMS admin**: Contact the technical team
- **System**: Reliance Finance Limited website (`reliancenepal.com.np`)
