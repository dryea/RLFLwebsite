-- Seed English navigation
INSERT INTO navigation (name, slug, locale) VALUES ('Main Navigation', 'main-nav', 'en');
-- Menu ID will be 1 (first insert)

-- Level 1 items
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, NULL, 'Home', '/', 0);
-- id=1

INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, NULL, 'About', '/about', 1);
-- id=2

INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, NULL, 'Products', '/products', 2);
-- id=3

INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, NULL, 'Rates', '/rates', 3);
-- id=4

INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, NULL, 'Publications', '/publications', 4);
-- id=5

INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, NULL, 'Auction Notice', '/auction-notice', 5);
-- id=6

INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, NULL, 'Services', '/services', 6);
-- id=7

INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, NULL, 'Our Network', '/our-network', 7);
-- id=8

-- About children (id=2 is parent)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 2, 'Introduction', '/about/introduction', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 2, 'Mission & Goals', '/about/mission-goals', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 2, 'Strategic Framework', '/about/strategic-framework', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 2, 'Milestones', '/about/milestones', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 2, 'Capital Structure', '/about/capital-structure', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 2, 'Board of Directors', '/team/board-of-directors', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (1, 2, 'Governance', NULL, 'Governance and leadership structure', 6);
-- id=15 (Governance parent)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 15, 'Committee of Directors', '/committee-of-directors', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 15, 'Management Team', '/team/management-team', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 15, 'Head of Department', '/team/head-of-department', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 15, 'Branch Manager', '/team/branch-manager', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 15, 'Grievance Officer', '/grievance-handling-officer', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 15, 'Sustainable Banking', '/sustainable-banking', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 15, 'Environmental Activities', '/environmental-financial-activities', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 15, 'Compliance Officer', '/compliance-officer', 7);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 15, 'Company Secretary', '/company-secretary', 8);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 15, 'CSR', '/csr', 9);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 2, 'Privacy Policy', '/about/privacy-policy', 7);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 2, 'FAQ', '/faq', 8);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 2, 'Testimonials', '/testimonials', 9);

-- Products children (id=3 is parent)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (1, 3, 'Saving', '/products/savings', 'Explore our savings account options', 0);
-- id=26 (Saving parent)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 26, 'Saving Deposit', '/products/savings', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 26, 'Normal Saving Account', '/products/savings/normal-saving-account', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 26, "Investor's Saving Account", '/products/savings/investor-saving-account', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 26, 'Special Saving Account', '/products/savings/special-saving-account', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 26, 'Student Saving Account', '/products/savings/student-saving-account', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 26, "Shareholder's Saving Account", '/products/savings/shareholder-saving-account', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 26, 'PWD Saving Account', '/products/savings/pwd-saving-account', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 26, 'Dhaulagiri Saving Account', '/products/savings/dhaulagiri-saving-account', 7);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 26, 'Kanchanjunga Saving Account', '/products/savings/kanchanjunga-saving-account', 8);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 26, 'Everest Saving Account', '/products/savings/everest-saving-account', 9);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 26, 'Super Saving Account', '/products/savings/super-saving-account', 10);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 26, 'Gold Saving Account', '/products/savings/gold-saving-account', 11);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 26, 'Diamond Saving Account', '/products/savings/diamond-saving-account', 12);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 26, 'Sarathi Saving Account', '/products/savings/sarathi-saving-account', 13);

INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (1, 3, 'Fixed Deposits', '/products/fixed-deposits', 'Earn guaranteed returns with our fixed deposit plans', 1);
-- id=42 (Fixed parent)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 42, 'Fixed Deposit', '/products/fixed-deposits', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 42, 'Individual Fixed Deposit', '/products/fixed-deposits/individual-fixed-deposit', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 42, 'Corporate Fixed Deposit', '/products/fixed-deposits/corporate-fixed-deposit', 2);

INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (1, 3, 'Loans', '/products/loans', 'Flexible loan solutions for every need', 2);
-- id=46 (Loan parent)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 46, 'Agricultural Loan', '/products/loans/agricultural-loan', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 46, 'Auto Loan', '/products/loans/auto-loan', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 46, 'Hire Purchase Loan', '/products/loans/hire-purchase-loan', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 46, 'Education Loan', '/products/loans/education-loan', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 46, 'Share Loan', '/products/loans/share-loan', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 46, 'Home Loan', '/products/loans/home-loan', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 46, 'FD Loan', '/products/loans/fd-loan', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 46, 'Personal Loan', '/products/loans/personal-loan', 7);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 46, 'Business Loan', '/products/loans/business-loan', 8);

INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (1, 3, 'Tools', NULL, 'Financial calculators and comparison tools', 3);
-- id=56 (Tools parent)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 56, 'Compare Products', '/products/compare', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 56, 'All Calculators', '/calculators', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 56, 'Loan Eligibility', '/loan-eligibility', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 56, 'EMI Calculator', '/emi-calculator', 3);

-- Rates children (id=4 is parent)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 4, 'Interest Rate', '/rates', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 4, 'Base Rate / Spread Rate', '/rates/base-rate-spread-rate', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 4, 'Standard Tariff Charges', '/rates/standard-tariff-charges', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 4, 'Forex Rates', '/rates/forex-rates', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 4, 'Gold / Silver Rates', '/rates/gold-silver', 4);

-- Publications children (id=5 is parent)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (1, 5, 'Notice', NULL, 'Official notices and announcements', 0);
-- id=63 (Notice parent)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 63, 'AGM Notice', '/publications/notices/agm-notice', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 63, 'Dividend Declaration', '/publications/notices/dividend-declaration', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 63, 'Unclaimed Dividend', '/publications/notices/unclaimed-dividend', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 63, 'Right to Information', '/publications/notices/right-to-information', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 63, 'Subsidy Loan List', '/publications/notices/subsidy-loan-list', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 63, 'Tender Notice', '/publications/notices/tender-notice', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 63, 'General Notice', '/publications/notices/general-notice', 6);

INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 5, 'News', '/publications/news', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 5, 'Events', '/publications/events', 2);

INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (1, 5, 'Report', NULL, 'Annual reports, disclosures, and filings', 3);
-- id=72 (Report parent)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 72, 'AGM Minute', '/publications/reports/agm-minute', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 72, 'Annual Report', '/publications/reports/annual-report', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 72, 'Quarterly Reports', '/publications/reports/quarterly-reports', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 72, 'Basel II Disclosure', '/publications/reports/basel-ii-disclosure', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 72, 'SEBON Report', '/publications/reports/sebon-report', 4);

INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 5, 'Training List', '/publications/training-list', 4);

-- Services children (id=7 is parent)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 7, 'Mobile Banking', '/services/mobile-banking', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 7, 'QR Teller', '/services/qr-teller', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 7, 'connectRTGS', '/services/connect-rtgs', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 7, 'CORPORATEPAY', '/services/corporatepay', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 7, 'C-ASBA', '/services/c-asba', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 7, 'Debit Card', '/services/debit-card', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 7, 'ABBS', '/services/abbs', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 7, 'Remittance', '/services/remittance', 7);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 7, 'SMS Banking', '/services/sms-banking', 8);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 7, 'Connect IPS', '/services/connect-ips', 9);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 7, 'Interbank IPS', '/services/interbank-ips', 10);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 7, 'ECC', '/services/ecc', 11);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 7, 'Disabled-Friendly Branch', '/services/disabled-friendly-branch', 12);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 7, '24/7 Account Block', '/services/24-7-account-block', 13);

-- Our Network children (id=8 is parent)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 8, 'Our Partners', '/partner', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 8, 'Branches', '/branches', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 8, 'Contact Us', '/contact', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 8, 'Merchant & Offers', '/merchant-offers', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 8, 'RFL Loan Enquiry', '/loan-enquiry', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 8, 'Book Appointment', '/appointments', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (1, 8, 'Testimonials', '/testimonials', 6);
