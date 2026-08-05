PRAGMA foreign_keys = OFF;

-- ============================================================
-- SEED NOTICES (All 7 categories)
-- ============================================================
INSERT OR REPLACE INTO notices (id, category_id, title, title_np, slug, description, file_url, published_date, status) VALUES
(1, 1, 'Notice for 26th Annual General Meeting (AGM) FY 2080/81', '२६औं वार्षिक साधारण सभा (AGM) आव २०८०/८१ सम्बन्धी सूचना', 'agm-notice-26', 'Official notice inviting all shareholders to the 26th AGM to be held at Kathmandu.', '/assets/sample-notice.pdf', '2025-01-15', 'published'),
(2, 1, 'Notice Regarding Book Closure for 26th AGM & Dividend Eligibility', '२६औं AGM र लाभांश योग्यताका लागि बुक क्लोजर सम्बन्धी सूचना', 'agm-book-closure-26', 'Information regarding share transfer book closure date for upcoming AGM.', '/assets/sample-notice.pdf', '2025-01-05', 'published'),

(3, 2, 'Dividend Declaration Notice for Financial Year 2080/81', 'आर्थिक वर्ष २०८०/८१ को लाभांश घोषणा सूचना', 'dividend-declaration-2080-81', 'Board decision regarding bonus shares and cash dividend distribution for shareholders.', '/assets/sample-notice.pdf', '2024-12-20', 'published'),

(4, 3, 'List of Shareholders with Unclaimed Dividend Up to FY 2079/80', 'आ.व. २०७९/८० सम्मको दावी नगरिएको लाभांश भएका सेयरधनीहरूको सूची', 'unclaimed-dividend-2080', 'Shareholders are requested to submit valid identification to claim overdue dividends.', '/assets/sample-notice.pdf', '2024-11-10', 'published'),

(5, 4, 'Right to Information (RTI) Quarterly Disclosure — Q2 FY 2081/82', 'सूचनाको हक (RTI) त्रैमासिक विवरण — दोस्रो त्रैमास आ.व. २०८१/८२', 'rti-q2-2081', 'Quarterly disclosure published under Section 5(2) of Right to Information Act 2064.', '/assets/sample-notice.pdf', '2025-01-01', 'published'),

(6, 5, 'List of Subsidized Loan Beneficiaries — Q2 FY 2081/82', 'सहुलियतपूर्ण कर्जा प्राप्त गर्ने ऋणीहरूको विवरण — दोस्रो त्रैमास', 'subsidy-loan-2081-q2', 'Disclosure of subsidized credit lines extended under NRB Directives.', '/assets/sample-notice.pdf', '2024-12-30', 'published'),

(7, 6, 'Tender Notice: Supply and Installation of Core Banking System Hardware', 'बोलपत्र सूचना: कोर बैंकिङ सिस्टम हार्डवेयर आपूर्ति तथा जडान', 'tender-cbs-hardware', 'Sealed bids are invited from authorized vendors for enterprise server deployment.', '/assets/sample-notice.pdf', '2025-02-01', 'published'),
(8, 6, 'Invitation for Bids: Interior Decoration & Furnishing for New Branch', 'बोलपत्र आह्वान: नयाँ शाखाको आन्तरिक सजावट तथा फर्निसिङ', 'tender-branch-interior', 'RFP for interior layout and security counter installation.', '/assets/sample-notice.pdf', '2025-01-18', 'published'),

(9, 7, 'Notice Regarding Winter Season Banking Hours', 'हिउँदे यामको बैंकिङ समय सम्बन्धी सूचना', 'general-winter-banking-hours', 'Updated counter operating timings across all 21 branches in Nepal.', '/assets/sample-notice.pdf', '2024-11-15', 'published'),
(10, 7, 'Public Advisory: Beware of Phishing SMS, Fake Social Pages & Unverified OTP Calls', 'सार्वजनिक सतर्कता: फिसिङ एसएमएस र नक्कली सामाजिक सञ्जालबाट बच्नुहोस्', 'general-cyber-security-advisory', 'Important security guidelines for RFL Smart Mobile Banking users.', '/assets/sample-notice.pdf', '2024-10-01', 'published');

-- ============================================================
-- SEED REPORTS (All 5 categories)
-- ============================================================
INSERT OR REPLACE INTO reports (id, category_id, title, title_np, slug, fiscal_year, description, file_url, status, published_at) VALUES
(1, 1, 'Reliance Finance Limited 26th Annual Report (FY 2080/81)', 'रिलायन्स फाइनान्स लिमिटेड २६औं वार्षिक प्रतिवेदन (आ.व. २०८०/८१)', 'annual-report-2080-81', '2080/81', 'Complete audited balance sheet, profit & loss statement, NFRS disclosures, and auditors report.', '/assets/sample-report.pdf', 'published', '2024-12-15'),
(2, 1, 'Reliance Finance Limited 25th Annual Report (FY 2079/80)', 'रिलायन्स फाइनान्स लिमिटेड २५औं वार्षिक प्रतिवेदन (आ.व. २०७९/८०)', 'annual-report-2079-80', '2079/80', 'Audited financial statements and corporate highlights for FY 2079/80.', '/assets/sample-report.pdf', 'published', '2023-12-10'),

(3, 2, 'Un-Audited Financial Results for Q2 FY 2081/82 (Poush 2081)', 'दोस्रो त्रैमासिक अपरिष्कृत वित्तीय विवरण (पुस २०८१)', 'quarterly-report-2081-q2', '2081/82 Q2', 'Quarterly key financial metrics, base rate (8.45%), spread rate, and NPA ratios.', '/assets/sample-report.pdf', 'published', '2025-01-28'),
(4, 2, 'Un-Audited Financial Results for Q1 FY 2081/82 (Ashwin 2081)', 'पहिलो त्रैमासिक अपरिष्कृत वित्तीय विवरण (असोज २०८१)', 'quarterly-report-2081-q1', '2081/82 Q1', 'First quarter financial performance & capital adequacy summary.', '/assets/sample-report.pdf', 'published', '2024-10-25'),

(5, 3, 'Minutes & Resolutions of the 25th Annual General Meeting', '२५औं वार्षिक साधारण सभाको माइन्युट तथा निर्णयहरू', 'agm-minutes-25', '2079/80', 'Approved resolutions regarding dividend distribution and auditor appointment.', '/assets/sample-report.pdf', 'published', '2024-02-10'),

(6, 4, 'Basel II Capital Adequacy Framework Disclosure — Q2 FY 2081/82', 'बासेल II पुँजी कोष सम्बन्धी प्रतिवेदन — दोस्रो त्रैमास आ.व. २०८१/८२', 'basel-ii-disclosure-2081-q2', '2081/82 Q2', 'Risk weighted exposure, Tier I capital ratio, and total capital adequacy breakdown.', '/assets/sample-report.pdf', 'published', '2025-01-29'),

(7, 5, 'SEBON Annual Corporate Governance & Disclosure Report FY 2080/81', 'सेबोन वार्षिक संस्थागत सुशासन प्रतिवेदन आ.व. २०८०/८१', 'sebon-report-2080-81', '2080/81', 'Compliance report submitted to Securities Board of Nepal.', '/assets/sample-report.pdf', 'published', '2024-11-20');
