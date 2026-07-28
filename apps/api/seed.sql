-- Seed: Default roles
INSERT OR IGNORE INTO roles (id, name, description, permissions) VALUES 
(1, 'super-admin', 'Full access to everything', '{"pages":["create","read","update","delete","publish","schedule"],"products":["create","read","update","delete","publish","schedule"],"services":["create","read","update","delete","publish","schedule"],"branches":["create","read","update","delete","publish"],"rates":["create","read","update","delete","publish"],"team":["create","read","update","delete","publish"],"news":["create","read","update","delete","publish","schedule"],"events":["create","read","update","delete","publish","schedule"],"notices":["create","read","update","delete","publish","schedule"],"reports":["create","read","update","delete","publish"],"gallery":["create","read","update","delete","publish"],"downloads":["create","read","update","delete","publish"],"faq":["create","read","update","delete","publish"],"careers":["create","read","update","delete","publish"],"media":["create","read","update","delete"],"users":["create","read","update","delete"],"roles":["create","read","update","delete"],"settings":["read","update"],"enquiries":["read","update","delete"],"calendar":["create","read","update","delete"],"auctions":["create","read","update","delete","publish"],"merchants":["create","read","update","delete","publish"]}'),
(2, 'admin', 'All CRUD + publish + user management', '{"pages":["create","read","update","delete","publish","schedule"],"products":["create","read","update","delete","publish","schedule"],"services":["create","read","update","delete","publish","schedule"],"branches":["create","read","update","delete","publish"],"rates":["create","read","update","delete","publish"],"team":["create","read","update","delete","publish"],"news":["create","read","update","delete","publish","schedule"],"events":["create","read","update","delete","publish","schedule"],"notices":["create","read","update","delete","publish","schedule"],"reports":["create","read","update","delete","publish"],"gallery":["create","read","update","delete","publish"],"downloads":["create","read","update","delete","publish"],"faq":["create","read","update","delete","publish"],"careers":["create","read","update","delete","publish"],"media":["create","read","update","delete"],"users":["create","read","update","delete"],"settings":["read","update"],"enquiries":["read","update","delete"],"calendar":["create","read","update","delete"],"auctions":["create","read","update","delete","publish"],"merchants":["create","read","update","delete","publish"]}');

-- Seed: Product categories
INSERT OR IGNORE INTO product_categories (id, slug, name, name_np, type, sort_order) VALUES
(1, 'savings', 'Savings Accounts', 'बचत खाता', 'savings', 1),
(2, 'fixed-deposits', 'Fixed Deposits', 'मुद्दती निक्षेप', 'fixed', 2),
(3, 'loans', 'Loans', 'ऋण', 'loan', 3);

-- Seed: Rate categories
INSERT OR IGNORE INTO rate_categories (id, slug, name, type, sort_order) VALUES
(1, 'savings', 'Savings Interest Rates', 'savings', 1),
(2, 'fixed', 'Fixed Deposit Interest Rates', 'fixed', 2),
(3, 'loan', 'Loan Interest Rates', 'loan', 3),
(4, 'tariff', 'Standard Tariff & Charges', 'tariff', 4),
(5, 'forex', 'Forex Rates', 'forex', 5);

-- Seed: Team categories
INSERT OR IGNORE INTO team_categories (id, slug, name, sort_order) VALUES
(1, 'board-of-directors', 'Board of Directors', 1),
(2, 'management-team', 'Management Team', 2),
(3, 'head-of-department', 'Head of Department', 3),
(4, 'branch-managers', 'Branch Managers', 4);

-- Seed: Notice categories
INSERT OR IGNORE INTO notice_categories (id, slug, name) VALUES
(1, 'agm-notice', 'AGM Notice'),
(2, 'dividend-declaration', 'Dividend Declaration'),
(3, 'unclaimed-dividend', 'Unclaimed Dividend'),
(4, 'right-to-information', 'Right to Information'),
(5, 'subsidy-loan-list', 'Subsidy Loan List'),
(6, 'tender-notice', 'Tender Notice'),
(7, 'general-notice', 'General Notice');

-- Seed: Report categories
INSERT OR IGNORE INTO report_categories (id, slug, name) VALUES
(1, 'annual-report', 'Annual Report'),
(2, 'quarterly-reports', 'Quarterly Reports'),
(3, 'agm-minute', 'AGM Minute'),
(4, 'basel-ii-disclosure', 'Basel II Disclosure'),
(5, 'sebon-report', 'SEBON Report');

-- Seed: FAQ categories
INSERT OR IGNORE INTO faq_categories (id, slug, name) VALUES
(1, 'general', 'General'),
(2, 'savings', 'Savings Accounts'),
(3, 'loans', 'Loans'),
(4, 'digital-banking', 'Digital Banking');

-- Seed: Media folders
INSERT OR IGNORE INTO media_folders (id, name) VALUES
(1, 'banners'),
(2, 'products'),
(3, 'team'),
(4, 'gallery'),
(5, 'documents');

-- Seed: Download categories
INSERT OR IGNORE INTO download_categories (id, slug, name, sort_order) VALUES
(1, 'forms', 'Forms', 1),
(2, 'brochures', 'Brochures', 2),
(3, 'applications', 'Applications', 3);
