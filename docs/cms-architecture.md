# RFIL Custom CMS — Architecture Deep Dive

## 1. Permissions & Roles Model

### Permission Structure

Every content type has 6 permission actions:

```json
{
  "pages":        ["create", "read", "update", "delete", "publish", "schedule"],
  "products":     ["create", "read", "update", "delete", "publish", "schedule"],
  "services":     ["create", "read", "update", "delete", "publish", "schedule"],
  "branches":     ["create", "read", "update", "delete", "publish", null],
  "rates":        ["create", "read", "update", "delete", "publish", null],
  "team":         ["create", "read", "update", "delete", "publish", null],
  "news":         ["create", "read", "update", "delete", "publish", "schedule"],
  "events":       ["create", "read", "update", "delete", "publish", "schedule"],
  "notices":      ["create", "read", "update", "delete", "publish", "schedule"],
  "reports":      ["create", "read", "update", "delete", "publish", null],
  "gallery":      ["create", "read", "update", "delete", "publish", null],
  "downloads":    ["create", "read", "update", "delete", "publish", null],
  "faq":          ["create", "read", "update", "delete", "publish", null],
  "careers":      ["create", "read", "update", "delete", "publish", null],
  "applications": ["read", "update", "delete", null, null, null],
  "media":        ["create", "read", "update", "delete", null, null],
  "users":        ["create", "read", "update", "delete", null, null],
  "roles":        ["create", "read", "update", "delete", null, null],
  "settings":     ["read", "update", null, null, null, null],
  "enquiries":    ["read", "update", "delete", null, null, null],
  "calendar":     ["create", "read", "update", "delete", null, null],
  "auctions":     ["create", "read", "update", "delete", "publish", null],
  "merchants":    ["create", "read", "update", "delete", "publish", null],
  "seo":          ["read", "update", null, null, null, null],
  "analytics":    ["read", null, null, null, null, null]
}
```

### Built-in Roles

| Role      | Scope                                      |
|-----------|--------------------------------------------|
| Super Admin | Full access to everything               |
| Admin     | All CRUD + publish + user management       |
| Editor    | CRUD + publish on content, no users/roles  |
| Author    | Create + edit own content, cannot publish  |
| Reviewer  | Read + comment, can approve for publish    |
| Publisher | Read + publish/schedule (no edit)          |

Custom roles are fully configurable via the CMS Roles UI.

---

## 2. CMS UI — Key Screens

### 2.1 Dashboard
```
┌──────────────────────────────────────────────────────┐
│  DASHBOARD                                           │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐       │
│  │Pages │ │News  │ │Jobs  │ │Enq.  │ │Media │       │
│  │ 45   │ │ 12   │ │ 3    │ │ 28   │ │ 340  │       │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘       │
│                                                       │
│  Recent Activity                    Pending Tasks     │
│  ┌────────────────────────┐  ┌──────────────────┐   │
│  │ John edited "About Us" │  │ 3 pages in draft │   │
│  │ Sita published news #5 │  │ 2 pending reviews│   │
│  │ Ram uploaded 8 images  │  │ 1 scheduled      │   │
│  └────────────────────────┘  └──────────────────┘   │
│                                                       │
│  Enquiries Trend (Chart.js)                           │
│  ┌────────────────────────────────────────────────┐  │
│  │ ████████████                                    │  │
│  │ ████████████████                                │  │
│  │ ████████████████████                            │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

### 2.2 Page Editor
```
┌──────────────────────────────────────────────────────────┐
│ ← Pages  /  Editing: About Us                            │
├──────────────────────────────────────────────────────────┤
│ [EN ⚡] [NP ⚡]  (Language tabs — content is separate)    │
├──────────────────────────────────────────────────────────┤
│ Slug: /about/introduction               [Auto-generate]  │
│ Title: [Introduction ___________________________]        │
│ Template: [Default ▼]                                    │
│                                                          │
│ ┌─────────────────────────────────────────────────────┐  │
│ │ TipTap Editor (WYSIWYG)                             │  │
│ │                                                     │  │
│ │ / Heading / Bold / Italic / Link / Image / Table   │  │
│ │ ─────────────────────────────────────────────────── │  │
│ │                                                     │  │
│ │ Welcome to Reliance Finance...                      │  │
│ │                                                     │  │
│ └─────────────────────────────────────────────────────┘  │
│                                                          │
├────────────────────────────────┬─────────────────────────┤
│  STATUS                        │  SEO                    │
│  ○ Draft                       │  Meta Title: [...]      │
│  ● Published (Mar 15, 2026)    │  Meta Desc: [...]       │
│  ○ Scheduled [📅]              │  Keywords: [...]        │
│                                │  OG Image: [Select]     │
│  VERSION HISTORY               │                         │
│  v5 — Mar 15, 2026 by John     │  BANNER IMAGE           │
│  v4 — Mar 10, 2026 by Ram      │  [Current: banner.jpg]  │
│  v3 — Feb 28, 2026 by Sita     │  [Change] [Remove]     │
│  [Restore]                     │                         │
│                                │  PARENT PAGE            │
│  SCHEDULE                      │  [About Us ▼]           │
│  Publish at: [📅____] [🕐__]  │  Sort Order: [3]        │
│                                │                         │
├────────────────────────────────┴─────────────────────────┤
│  [💾 Save Draft]  [📤 Save & Publish]  [🗑 Delete]     │
└──────────────────────────────────────────────────────────┘
```

### 2.3 Media Library
```
┌──────────────────────────────────────────────────────────┐
│  Media Library                          [Upload Files]   │
├──────────────────────────────────────────────────────────┤
│  [Search...]         Grid view │ List view               │
│                                                          │
│  Folders:                                                │
│  📁 / (root)                                             │
│  ┣ 📁 banners                                            │
│  ┣ 📁 products                                           │
│  ┣ 📁 team                                               │
│  ┣ 📁 gallery                                            │
│  ┃ ┣ 📁 16th-agm                                         │
│  ┃ ┗ 📁 events                                           │
│  ┗ 📁 documents                                          │
│                                                          │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐                            │
│  │ img│ │ img│ │ img│ │ img│                            │
│  │    │ │    │ │    │ │    │                            │
│  │name│ │name│ │name│ │name│                            │
│  └────┘ └────┘ └────┘ └────┘                            │
│                                                          │
│  Click image → Sidebar with:                             │
│  - Preview (multiple sizes: sm/md/lg/original)           │
│  - Alt text [input]                                      │
│  - Caption [input]                                       │
│  - File info (type, dimensions, size)                    │
│  - URL copy button                                       │
│  - [Replace] [Delete]                                    │
└──────────────────────────────────────────────────────────┘
```

### 2.4 Product Template Editor
```
┌──────────────────────────────────────────────────────────┐
│ ← Products  /  Editing: Home Loan                        │
├──────────────────────────────────────────────────────────┤
│ [EN ⚡] [NP ⚡]                                           │
├──────────────────────────────────────────────────────────┤
│ Category: [Loan ▼]                        Sort: [5]      │
│ Slug: /loans/home-loan                    [Auto]         │
│ Title: [Home Loan ____________________________]          │
│ Summary: [_______________________________]               │
│                                                          │
│ ┌─────────────────────────────────────────────────────┐  │
│ │ Content (TipTap)                                     │  │
│ └─────────────────────────────────────────────────────┘  │
│                                                          │
│ ┌─ Features ──────────────────────────────────────────┐  │
│ │ + [Competitive interest rates         ] [✕]        │  │
│ │ + [Long repayment tenure up to 30 yrs ] [✕]        │  │
│ │ + [Minimal documentation              ] [✕]        │  │
│ │ [+ Add feature]                                    │  │
│ └─────────────────────────────────────────────────────┘  │
│                                                          │
│ ┌─ Eligibility ───────────────────────────────────────┐  │
│ │ + [Nepali citizen aged 21-65         ] [✕]        │  │
│ │ + [Stable income source              ] [✕]        │  │
│ │ [+ Add]                                           │  │
│ └─────────────────────────────────────────────────────┘  │
│                                                          │
│ ┌─ Documents Required ────────────────────────────────┐  │
│ │ + [Citizenship copy                    ] [✕]        │  │
│ │ + [Salary slip last 3 months           ] [✕]        │  │
│ │ [+ Add]                                           │  │
│ └─────────────────────────────────────────────────────┘  │
│                                                          │
│ Min Amount: [Rs. 500,000]   Max Amount: [Rs. 5,000,000] │
│ Max Tenure: [30 years]                                   │
│ Interest Rate Info: [As per NRB directives...]           │
│                                                          │
│ Icon: [Select Icon ▼]  Banner: [Select Image]           │
│                                                          │
│ SEO Meta: [...]                                          │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  [💾 Save Draft]  [📤 Save & Publish]                   │
└──────────────────────────────────────────────────────────┘
```

### 2.5 Rate Management
```
┌──────────────────────────────────────────────────────────┐
│  Rates → Savings   [Add New Rate]  [Import CSV]         │
├──────────────────────────────────────────────────────────┤
│  Effective Date: 2083/04/01     Status: Active           │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ Product Name              │ Rate  │ Tenure          │ │
│  ├─────────────────────────────────────────────────────┤ │
│  │ Normal Saving Account     │ 5.50% │ —               │ │
│  │ Investor's Saving Account │ 6.00% │ —               │ │
│  │ Special Saving Account    │ 6.25% │ —               │ │
│  │ ...                       │       │                 │ │
│  │ [+ Add Row]                                        │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                          │
│  [💾 Save]  [Publish as New Version]                     │
│                                                          │
│  ── Version History ──                                   │
│  v3 2083/04/01 (current)  v2 2082/10/01  v1 2082/04/01 │
│                                                          │
│  Click version → preview snapshot of that period's rates │
└──────────────────────────────────────────────────────────┘
```

### 2.6 Enquiry Management
```
┌──────────────────────────────────────────────────────────┐
│  Enquiries → Loan Enquiries   [Export CSV]               │
├──────────────────────────────────────────────────────────┤
│  [All] [New 12] [Contacted 8] [Processed 5] [Closed 3]   │
│                                                          │
│  ┌────┬────────┬──────────┬────────┬─────────┬────────┐ │
│  │ #  │ Name   │ Loan Type│ Amount │ Branch  │ Status │ │
│  ├────┼────────┼──────────┼────────┼─────────┼────────┤ │
│  │ 28 │ Ram P. │ Home     │ 50L    │ Kamaladi│ New    │ │
│  │ 27 │ Sita G.│ Auto     │ 15L    │ Kotesh. │ Cont.  │ │
│  │ 26 │ Hari   │ Personal │ 5L     │ Online  │ Proc.  │ │
│  └────┴────────┴──────────┴────────┴─────────┴────────┘ │
│                                                          │
│  Click row → Detail panel:                               │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ Ram P. — 28                    Status: [New ▼]     │ │
│  │ Contact: ram@email.com / 98XXXXXXXX                 │ │
│  │ Loan: Home Loan, Rs. 50,00,000                      │ │
│  │ Branch: Kamaladi                                    │ │
│  │ Remarks: Wants to discuss repayment options          │ │
│  │ Submitted: 2026-07-26 14:30                         │ │
│  │                                                     │ │
│  │ Actions: [Mark Contacted] [Assign To ▼] [Delete]   │ │
│  └─────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## 3. CMS Workflow: Draft → Review → Publish

```
[DRAFT] ──autosave──→ [DRAFT]
   │                        │
   │ Save Draft             │ Submit for Review
   ▼                        ▼
[DRAFT] ──────────────→ [IN REVIEW]
                           │    │
                     Approve │    │ Reject
                           ▼    ▼
                     [PUBLISHED] [DRAFT]
                        │
                   Schedule?
                        │
                        ▼
                   [SCHEDULED] ──→ [PUBLISHED] (at cron trigger)
```

- **Autosave**: Every 30s, saves to local IndexedDB + syncs to server as draft
- **Versioning**: Every explicit save creates a version entry
- **Scheduling**: Uses Cloudflare Workers Cron Triggers to publish at specified time
- **Notifications**: Email notification sent to reviewers when content is submitted

---

## 4. TipTap Editor Configuration

Extensions enabled:
- Document, Paragraph, Text, Heading (h1-h6)
- Bold, Italic, Underline, Strike, Code
- BulletList, OrderedList, TaskList
- Link (with URL validation)
- Image (with media library picker)
- Table (with resize handles)
- Blockquote, CodeBlock
- HorizontalRule, HardBreak
- TextAlign (left, center, right)
- Color, Highlight
- Typography (smart quotes, em dash)
- Placeholder
- CharacterCount

Custom extensions:
- **NepaliDatePicker** — inline calendar date insertion
- **RateTable** — embed dynamic rate table by category
- **ProductGrid** — embed product grid by type
- **NoticeList** — embed recent notices
- **FileDownload** — embed download file link
- **Button** — CTA button with link
- **Accordion** — collapsible content block
- **Tabs** — tabbed content block
- **Counter** — animated number counter (for stats)

---

## 5. Key CMS Views (List + Detail Patterns)

Every CMS module follows the same pattern:

### List View (`/cms/{resource}`)
```
[Search...]  [Filter by status/category/lang]  [+ Add New]
┌──────────────────────────────────────────────────────────┐
│ Sortable Table or Grid                                    │
│ Actions: Edit | Duplicate | Delete | Toggle Status        │
│ Bulk: Select all → Publish | Unpublish | Delete          │
└──────────────────────────────────────────────────────────┘
[Pagination: < 1 2 3 ... 10 >]
```

### Detail View (`/cms/{resource}/[id]`)
```
Back button + Resource name
┌─────────────────┬──────────────────────────────────────┐
│ Language tabs   │ Sidebar:                             │
│ (EN / NP)       │   Status selector                    │
│                 │   Slug (auto)                        │
│ Main Form       │   Schedule picker                    │
│ (dynamic per    │   Version history                    │
│  resource)      │   SEO meta fields                    │
│                 │   Featured image                      │
│                 │   Sort order                          │
├─────────────────┴──────────────────────────────────────┤
│ [Cancel]  [Save Draft]  [Save & Publish]               │
└────────────────────────────────────────────────────────┘
```

---

## 6. File Structure for CMS Components

```
src/components/cms/
├── layout/
│   ├── CMSLayout.tsx          # Shell with sidebar + header + content
│   ├── CMSSidebar.tsx         # Navigation sidebar with permission filtering
│   ├── CMSHeader.tsx          # Top bar: user menu, notifications, search
│   └── CMSBreadcrumb.tsx
│
├── common/
│   ├── DataTable.tsx          # Sortable, filterable, paginated table
│   ├── DataGrid.tsx           # Card/grid view alternative
│   ├── SearchInput.tsx
│   ├── FilterBar.tsx          # Status/category/date filter chips
│   ├── BulkActions.tsx
│   ├── Pagination.tsx
│   ├── EmptyState.tsx
│   ├── ConfirmDialog.tsx
│   └── Toast.tsx
│
├── forms/
│   ├── FormBuilder.tsx        # Dynamic form renderer from schema
│   ├── FormField.tsx
│   ├── TipTapEditor.tsx       # WYSIWYG editor wrapper
│   ├── ImageUploader.tsx      # Drag-and-drop upload to R2
│   ├── MediaPicker.tsx        # Modal grid to select existing media
│   ├── SlugInput.tsx          # Auto-generate + manual override
│   ├── LanguageTabs.tsx       # EN/NP content toggles
│   ├── StatusSelector.tsx     # Draft/Published/Scheduled radio
│   ├── SchedulePicker.tsx     # Date/time picker for scheduling
│   ├── SortOrderInput.tsx
│   └── ArrayField.tsx         # Dynamic array (features, docs, etc.)
│
├── editors/
│   ├── PageEditor.tsx
│   ├── ProductEditor.tsx
│   ├── ServiceEditor.tsx
│   ├── TeamEditor.tsx
│   ├── BranchEditor.tsx
│   ├── RateEditor.tsx
│   ├── NewsEditor.tsx
│   ├── NoticeEditor.tsx
│   ├── ReportEditor.tsx
│   ├── GalleryEditor.tsx
│   ├── FAQEditor.tsx
│   ├── CareerEditor.tsx
│   ├── CalendarEditor.tsx
│   ├── AuctionEditor.tsx
│   └── MerchantEditor.tsx
│
├── widgets/
│   ├── DashboardStats.tsx
│   ├── RecentActivity.tsx
│   ├── VersionHistory.tsx     # Timeline of versions with restore
│   ├── SEOFields.tsx          # Meta title, description, OG image
│   ├── EnquiryDetail.tsx      # Side panel for enquiry view
│   └── ApplicationManager.tsx # Job application review workflow
│
└── auth/
    ├── RoleGuard.tsx           # Wraps component: checks permission
    ├── LoginPage.tsx
    └── ForgotPassword.tsx
```
