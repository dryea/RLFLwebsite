-- 0015_add_quick_actions.sql
-- Homepage quick actions strip (hero shortcuts): CMS-configurable links.

CREATE TABLE IF NOT EXISTS quick_actions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL,
  label_np TEXT,
  description TEXT,
  description_np TEXT,
  href TEXT NOT NULL,
  icon TEXT DEFAULT 'user-plus',
  is_highlight INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Seed defaults matching the previous hardcoded hero quick actions
INSERT INTO quick_actions (label, label_np, description, description_np, href, icon, is_highlight, sort_order, is_active) VALUES
('Open Account', 'खाता खोल्नुहोस्', 'Savings or FD', 'बचत वा मुद्दती', '/open-account', 'user-plus', 1, 0, 1),
('EMI Calculator', 'EMI क्याल्कुलेटर', 'Estimate your EMI', 'किस्ता अनुमान', '/emi-calculator', 'calculator', 0, 1, 1),
('Interest Rates', 'ब्याज दरहरू', 'Live rate updates', 'नवीनतम दरहरू', '/rates', 'trending-up', 0, 2, 1),
('Find Branch', 'शाखा खोज्नुहोस्', 'Nearest location', 'नजिकको शाखा', '/branches', 'map-pin', 0, 3, 1),
('Loan Enquiry', 'ऋण सोधपुछ', 'Apply instantly', 'तुरुन्त आवेदन', '/loan-enquiry', 'phone-call', 0, 4, 1);
