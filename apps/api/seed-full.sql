-- ============================================================
-- FULL SEED: Reliance Finance Limited CMS Content
-- Extracted from old site (commit 1cdfecd)
-- All INSERT OR REPLACE — safe to re-run
-- ============================================================

-- ============================================================
-- 1. HERO SLIDES (5 slides)
-- ============================================================
INSERT OR REPLACE INTO hero_slides (id, title, title_np, description, description_np, image_url, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link, sort_order, is_active) VALUES
(1, 'Go Digital With RFL Smart Banking', 'आरएफएल स्मार्ट बैंकिङको साथ डिजिटल बन्नुहोस्', 'Experience seamless mobile banking, QR payments, and digital transfers anytime, anywhere in Nepal.', 'नेपालमा जुनसुकै समय र जुनसुकै ठाउँमा सहज मोबाइल बैंकिङ, क्यूआर भुक्तानी र डिजिटल स्थानान्तरणको अनुभव लिनुहोस्।', 'https://reliancenepal.com.np/assets/images/hero_digital_banking.png', 'Open Account', '/products/savings', 'View Rates', '/rates', 1, 1),
(2, 'Individual Fixed Deposits', 'व्यक्तिगत मुद्दती निक्षेप', 'Earn higher returns on your hard-earned savings. Open a fixed deposit with flexible tenures and lucrative rates.', 'आफ्नो कडा परिश्रमको बचतमा उच्च प्रतिफल कमाउनुहोस्। लचिलो अवधि र आकर्षक ब्याजदरको साथ मुद्दती निक्षेप खोल्नुहोस्।', 'https://reliancenepal.com.np/assets/images/hero_fixed_deposits.png', 'Learn More', '/products/fixed-deposits', 'Calculate Earnings', '/products/fixed-deposits#calculator', 2, 1),
(3, 'Flexible Home & Auto Loans', 'लचिलो गृह र अटो ऋण', 'Turn your dreams into reality with low-interest home, vehicle, and agricultural loan options customized for you.', 'तपाईंको लागि अनुकूल कम ब्याजदरको गृह, सवारी र कृषि ऋण विकल्पहरूको साथ आफ्नो सपनालाई वास्तविकतामा परिणत गर्नुहोस्।', 'https://reliancenepal.com.np/assets/images/hero_loans.png', 'Explore Loans', '/products/loans', 'EMI Calculator', '/emi', 3, 1),
(4, 'Corporate Governance & Legacy', 'कर्पोरेट प्रशासन र विरासत', 'Guided by transparency, institutional integrity, and compliance under Nepal Rastra Bank regulations for over a decade.', 'पारदर्शिता, संस्थागत अखण्डता र नेपाल राष्ट्र बैंकको नियमनको पालनाद्वारा एक दशकभन्दा बढी समयदेखि मार्गनिर्देशित।', 'https://reliancenepal.com.np/assets/images/hero_governance.png', 'Governance Policies', '/governance', 'Board of Directors', '/about#bod', 4, 1),
(5, 'Fast & Secure Remittance', 'द्रुत र सुरक्षित रेमिट्यान्स', 'Collect international and domestic money transfers easily across our nationwide branch network.', 'हाम्रो देशभरको शाखा सञ्जाल मार्फत सजिलै अन्तर्राष्ट्रिय र आन्तरिक रकम स्थानान्तरण प्राप्त गर्नुहोस्।', 'https://reliancenepal.com.np/assets/images/hero_remittance.png', 'Explore Remittance', '/services#remittance', 'Locate Branches', '/branches', 5, 1);

-- ============================================================
-- 2. OFFERING CARDS (4 cards)
-- ============================================================
INSERT OR REPLACE INTO offering_cards (id, title, title_np, summary, summary_np, icon, badge, badge_np, link_text, link_url, widget_type, sort_order, is_active) VALUES
(1, 'Deposits & Savings', 'निक्षेप र बचत', 'Maximize interest gains with our range of savings accounts and secure high-yield fixed deposit schemes tailored for everyone.', 'सबैको लागि तयार पारिएको बचत खाता र उच्च ब्याजदरको मुद्दती निक्षेप योजनाहरू', 'Wallet', '14+ Options', '१४+ विकल्प', 'Compare Accounts', '/products/savings', 'savings', 1, 1),
(2, 'Loan Schemes', 'ऋण योजनाहरू', 'Fuel personal milestones or corporate expansions with low-interest Home, Auto, Business, and Agricultural credit lines.', 'कम ब्याजदरको गृह, सवारी, व्यवसाय र कृषि ऋणको साथ व्यक्तिगत उपलब्धि वा कर्पोरेट विस्तारलाई प्रोत्साहन गर्नुहोस्।', 'HandHoldingUsd', '9 Credit Lines', '९ क्रेडिट लाइन', 'Explore Credit Options', '/products/loans', 'loans', 2, 1),
(3, 'Digital Channels', 'डिजिटल च्यानलहरू', 'Manage accounts securely with modern mobile wallets, Fonepay QR scanning, and online inward remittance settlement portals.', 'आधुनिक मोबाइल वालेट, फोनपे क्यूआर स्क्यानिङ र अनलाइन रेमिट्यान्स पोर्टलको साथ सुरक्षित रूपमा खाता व्यवस्थापन गर्नुहोस्।', 'MobileScreen', '24/7 Access', '२४/७ पहुँच', 'Explore Services', '/services', 'digital', 3, 1),
(4, 'Offers & Network', 'अफर र सञ्जाल', 'Find branches nationwide and enjoy merchant partner outlets offering exclusive discounts for RFL card holders.', 'देशभर शाखाहरू पत्ता लगाउनुहोस् र आरएफएल कार्ड धारकहरूको लागि विशेष छुट प्रदान गर्ने व्यापारी साझेदार आउटलेटहरूको आनन्द लिनुहोस्।', 'Handshake', '21 Branches', '२१ शाखाहरू', 'Locate Branches', '/branches', 'branches', 4, 1);

-- ============================================================
-- 3. OFFERING LINKS (8 links, 2 per card)
-- ============================================================
INSERT OR REPLACE INTO offering_links (id, card_id, label, label_np, url, sort_order) VALUES
(1, 1, 'Savings Accounts', 'बचत खाताहरू', '/products/savings', 1),
(2, 1, 'Fixed Deposits', 'मुद्दती निक्षेप', '/products/fixed-deposits', 2),
(3, 2, 'Home & Land Loans', 'गृह र जग्गा ऋण', '/products/loans/home-loan', 1),
(4, 2, 'Business & SME Credits', 'व्यवसाय र साना तथा मझौला उद्यम ऋण', '/products/loans/business-loan', 2),
(5, 3, 'Smart Mobile Banking', 'स्मार्ट मोबाइल बैंकिङ', '/services/mobile-banking', 1),
(6, 3, 'connectIPS Transfers', 'कनेक्टआईपीएस स्थानान्तरण', '/services/connect-ips', 2),
(7, 4, 'Merchant Discounts', 'व्यापारी छुटहरू', '/branches', 1),
(8, 4, 'Clearing & Tieups', 'क्लियरिङ र सहकार्य', '/branches#partners', 2);

-- ============================================================
-- 4. SITE STATS (3 stats)
-- ============================================================
INSERT OR REPLACE INTO site_stats (id, label, label_np, value, suffix, sort_order, is_active) VALUES
(1, 'Active Branches', 'सक्रिय शाखाहरू', '21', '+', 1, 1),
(2, 'Happy Customers', 'सन्तुष्ट ग्राहकहरू', '100k', '+', 2, 1),
(3, 'Years of Legacy', 'वर्षको विरासत', '17', '+', 3, 1);

-- ============================================================
-- 5. APP BANNER
-- ============================================================
INSERT OR REPLACE INTO app_banner (id, title, title_np, description, description_np, image_url, android_url, ios_url, badge_text, is_active) VALUES
(1, 'Download Reliance Finance Smart App', 'रिलायन्स फाइनान्स स्मार्ट एप डाउनलोड गर्नुहोस्', 'Access your savings account, execute instant Fonepay QR transfers, pay standard utilities bill, and check loan details with our state-of-the-art secure mobile banking app.', 'आफ्नो बचत खाता पहुँच गर्नुहोस्, तत्काल फोनपे क्यूआर स्थानान्तरण गर्नुहोस्, उपयोगिता बिल भुक्तानी गर्नुहोस्, र हाम्रो अत्याधुनिक सुरक्षित मोबाइल बैंकिङ एप मार्फत ऋण विवरणहरू जाँच गर्नुहोस्।', 'https://reliancenepal.com.np/assets/images/reliance/mobilebankingWebImage.png', 'https://play.google.com/store/apps/details?id=com.f1soft.reliancefinance', 'https://apps.apple.com/np/app/reliance-finance-smart/id1554035637', 'Go Digital', 1);

-- ============================================================
-- 6. PRODUCTS - SAVINGS (14 products, category_id=1)
-- ============================================================
INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, interest_rate_info, status, sort_order) VALUES
(1, 1, 'normal-saving-account', 'Normal Saving Account', 'सामान्य बचत खाता', 'Designed for daily transactions and liquid funds with attractive interest payouts. Perfect for general individuals starting their savings habits.', '["Free Mobile Banking (1st Year)","Free statement facility","Daily transaction access","ATM card issued"]', '["Nepali citizen aged 16+","Minimum balance NPR 100","Valid citizenship/passport"]', 100, '2.75% p.a.', 'published', 1);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, interest_rate_info, status, sort_order) VALUES
(2, 1, 'investors-saving-account', 'Investor''s Saving Account', 'लगानीकर्ता बचत खाता', 'Tailored for equity market operators, share brokers, and active traders. Offers specialized integrations with Demat facilities.', '["Demat Account Setup assistance","C-ASBA activation enabled","Automatic dividend credits routing","Free statement booklets","ABBS privileges across all branches"]', '["Nepali citizen aged 18+","Minimum balance NPR 100","Demat BOID confirmation","Valid citizenship/passport"]', 100, '2.75% p.a.', 'published', 2);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, interest_rate_info, status, sort_order) VALUES
(3, 1, 'student-saving-account', 'Student Saving Account', 'विद्यार्थी बचत खाता', 'Cultivate savings discipline in children and teenagers. Zero balance features with access to basic digital channels for studies.', '["Higher interest rate to promote academic savings","Free mobile banking and SMS alerts","Waiver of processing fee on future education loan setups","Free debit card for students aged 16+"]', '["Student ID Card or Admission fee receipt","Birth Certificate copy (for minors under 16)","Citizenship and PP photo of Parent/Guardian","Guardian authorization forms"]', 500, '3.25% p.a.', 'published', 3);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, interest_rate_info, status, sort_order) VALUES
(4, 1, 'khutruke-saving-account', 'Khutruke Saving Account', 'खुत्रुके बचत खाता', 'Traditional small saving pocket account designed to promote micro-saving habits among young adults and homemakers.', '["Flexible cash deposits at any counter","Encourages small daily/weekly micro-savings","Free passbook and statements","Interest credited quarterly on daily balance"]', '["Nepali citizen aged 16+","Minimum balance NPR 500","Valid citizenship/passport"]', 500, '3.00% p.a.', 'published', 4);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, interest_rate_info, status, sort_order) VALUES
(5, 1, 'special-saving-account', 'Special Saving Account', 'विशेष बचत खाता', 'Premium savings tier yielding higher monthly payouts. Designed for high net-worth professionals seeking secure liquid placement.', '["High yield interest rates","Free Visa Debit Card (issuance and 1st year fee waived)","Free statement facility","ABBS withdrawal fee waiver","Free cheque books"]', '["Nepali citizen aged 18+","Minimum balance NPR 1,000","Professional/Employment ID or business registration","Valid citizenship/passport"]', 1000, '3.50% p.a.', 'published', 5);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, interest_rate_info, status, sort_order) VALUES
(6, 1, 'shareholders-saving-account', 'Shareholder''s Saving Account', 'सेयरधनी बचत खाता', 'Exclusive account for RFL shareholders. Perfect for dividend payouts and investment-linked capital credits.', '["Direct dividend credits into account","Waived fees on cheque books and statements","Priority counter services at head office","Easy loan against shares setup"]', '["RFL Share certificate or Demat holding statement showing RFL stocks","Citizenship Certificate copy","Two passport-size photos"]', 1000, '3.50% p.a.', 'published', 6);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, interest_rate_info, status, sort_order) VALUES
(7, 1, 'pwd-saving-account', 'PWD Saving Account', 'अपाङ्गता भएका व्यक्ति बचत खाता', 'Highly customized banking facility for Persons With Disabilities (PWD). Delivering accessible and dedicated service standards.', '["True zero balance account requirement","Highest standard savings interest rates","Priority counter services and dedicated support","Free debit card and mobile banking"]', '["Disability Certificate issued by government agency","Citizenship Certificate copy","Two passport-size photos","Guardian details if applicable"]', 0, '4.00% p.a.', 'published', 7);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, interest_rate_info, status, sort_order) VALUES
(8, 1, 'dhaulagiri-saving-account', 'Dhaulagiri Saving Account', 'धौलागिरी बचत खाता', 'Mountain peak premium account providing increased interest yield and complimentary financial tools.', '["Elevated interest payouts","Free Mobile Banking and SMS alerts","Free statement facility","ABBS service enabled across all branches"]', '["Nepali citizen aged 18+","Minimum balance NPR 5,000","Valid citizenship/passport"]', 5000, '4.25% p.a.', 'published', 8);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, interest_rate_info, status, sort_order) VALUES
(9, 1, 'kanchanjunga-saving-account', 'Kanchanjunga Saving Account', 'कञ्चनजङ्घा बचत खाता', 'Medium-high savings tier offering special rates and any branch banking service (ABBS) privileges.', '["Premium interest rates","Free cheque books and statement facility","Free ABBS facility","50% discount on locker facility (subject to availability)"]', '["Nepali citizen aged 18+","Minimum balance NPR 10,000","Valid citizenship/passport"]', 10000, '4.50% p.a.', 'published', 9);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, interest_rate_info, status, sort_order) VALUES
(10, 1, 'everest-saving-account', 'Everest Saving Account', 'सगरमाथा बचत खाता', 'Our peak savings account delivering top-tier interest rates for private individual accounts.', '["Highest standard individual savings rate","Free Debit Card for the first year","Free Mobile Banking","Free unlimited cheque books","Locker facility annual charge discount of 50%"]', '["Nepali citizen aged 18+","Minimum balance NPR 20,000","PAN Card copy","Valid citizenship/passport"]', 20000, '4.75% p.a.', 'published', 10);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, interest_rate_info, status, sort_order) VALUES
(11, 1, 'super-saving-account', 'Super Saving Account', 'सुपर बचत खाता', 'Premium product built for senior executives, entrepreneurs, and high-balance individuals.', '["Super interest yield rate","Free Visa Debit Card and Mobile Banking","Priority service with dedicated relations officer","50% discount on locker security deposit"]', '["Nepali citizen aged 18+","Minimum balance NPR 25,000","PAN Card copy","Source of income document"]', 25000, '5.00% p.a.', 'published', 11);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, interest_rate_info, status, sort_order) VALUES
(12, 1, 'gold-saving-account', 'Gold Saving Account', 'गोल्ड बचत खाता', 'High capital savings placement combining yield optimization and transaction efficiency.', '["Gold standard interest rate yields","Free Visa Debit Card renewals and Mobile Banking","Free utility bill payments coordination","Free cheque books and statements"]', '["Nepali citizen aged 18+","Minimum balance NPR 50,000","PAN Card copy","Source of funds declaration"]', 50000, '5.25% p.a.', 'published', 12);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, interest_rate_info, status, sort_order) VALUES
(13, 1, 'diamond-saving-account', 'Diamond Saving Account', 'डायमन्ड बचत खाता', 'Exclusive account providing concierge-level teller support and top savings yields.', '["Elite interest rates","Free unlimited ABBS nationwide","Free Visa Debit Card and Mobile Banking","75% discount on locker annual charges"]', '["Nepali citizen aged 18+","Minimum balance NPR 100,000","PAN Card copy","Formal source of funds disclosure"]', 100000, '5.50% p.a.', 'published', 13);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, interest_rate_info, status, sort_order) VALUES
(14, 1, 'sarathi-saving-account', 'Sarathi Saving Account', 'सारथी बचत खाता', 'Specialized savings scheme for institutions and community leaders desiring corporate integration.', '["Maximum savings interest yield","Dedicated corporate desk services","Free corporate online banking portals","Free unlimited cheque books and statements","Locker annual fee fully waived"]', '["Organizational Registration Certificate copy","Board Resolution to open account","PAN/VAT Certificate copy","Citizenship copies of all authorized operators"]', 200000, '5.75% p.a.', 'published', 14);

-- ============================================================
-- 6b. PRODUCTS - FIXED DEPOSITS (3 products, category_id=2)
-- ============================================================
INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, min_amount, max_tenure, interest_rate_info, status, sort_order) VALUES
(15, 2, 'individual-fixed-deposit', 'Individual Fixed Deposit', 'व्यक्तिगत मुद्दती निक्षेप', 'Maximize interest gains on your personal savings. Secure a fixed yield over flexible tenures starting from 3 months to over 5 years. Payouts can be credited quarterly, monthly, or at maturity.', '["Interest Rate: Up to 6.25% p.a.","Loan facility against FD (up to 90% of principal)","Compounding interest posting options","Automatic renewal facility available","Complimentary savings account linkage"]', 10000, '5 years', 'Up to 6.25% p.a.', 'published', 1);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, min_amount, max_tenure, interest_rate_info, status, sort_order) VALUES
(16, 2, 'corporate-fixed-deposit', 'Corporate Fixed Deposit', 'कर्पोरेट मुद्दती निक्षेप', 'Tailored capital placement for trusts, corporations, cooperatives, and institutional funds. Offers high-yield returns with customized liquidity withdrawal protocols.', '["Interest Rate: Up to 5.75% p.a.","Institutional relationship manager","Specialized audit balance disclosures","Interest credited quarterly to corporate accounts","Easy overdraft facilities against corporate FD"]', 100000, '5 years', 'Up to 5.75% p.a.', 'published', 2);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, min_amount, max_tenure, interest_rate_info, status, sort_order) VALUES
(17, 2, 'remittance-fixed-deposit', 'Remittance Fixed Deposit', 'रेमिट्यान्स मुद्दती निक्षेप', 'Exclusive deposit scheme for non-resident Nepalis (NRN) sending hard-earned money back home. RFL rewards NRNs with a premium additional interest rate.', '["Interest Rate: Up to 7.25% p.a. (+1.0% Premium)","Remote account opening from overseas","Priority customer support access","Interest payout directly credited to savings or repatriated","Paperless document collection"]', 50000, '5 years', 'Up to 7.25% p.a.', 'published', 3);

-- ============================================================
-- 6c. PRODUCTS - LOANS (9 products, category_id=3)
-- ============================================================
INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, max_amount, max_tenure, interest_rate_info, status, sort_order) VALUES
(18, 3, 'home-loan', 'Home Loan', 'गृह ऋण', 'Build your new home, buy an apartment, or renovate your existing building. We offer long-term loan terms with affordable monthly payments.', '["Financing: Up to 60% of valuation","Repayment Tenure: Up to 25 years","Competitive spreads","Easy EMI options","Available for home construction, land purchase, or renovation"]', '["Nepali citizen aged 21-65","Stable income source","Property documents (Lalpurja, Naksa, Char Killa)","Tax clearance certificate"]', 500000, 50000000, '25 years', 'From 9.5% p.a.', 'published', 1);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, max_amount, max_tenure, interest_rate_info, status, sort_order) VALUES
(19, 3, 'auto-loan', 'Auto Loan', 'अटो ऋण', 'Finance your personal car, light cargo carrier, or green electric vehicles (EV) with attractive loan schemes.', '["EV Funding: Up to 80%","ICE Vehicle Funding: Up to 50%","Term: Up to 7 years","Special interest rates for eco-transports","Financing for new and reconditioned vehicles"]', '["Nepali citizen aged 21-65","Valid driving license","Proforma invoice from authorized dealer","Income source documents"]', 500000, 10000000, '7 years', 'From 10.0% p.a.', 'published', 2);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, max_amount, max_tenure, interest_rate_info, status, sort_order) VALUES
(20, 3, 'business-loan', 'Business Loan', 'व्यवसाय ऋण', 'Working capital term loans, bank guarantees, and overdraft facilities to manage your trade stock or expand assets.', '["Overdraft limit options","Flexible annual renewals","Custom collateral evaluations","Bank guarantees and Letters of Credit (L/C) services","Financing up to 70% of valuation"]', '["Firm/Company Registration Certificate","PAN/VAT Registration Certificate","Audited Financial Statements (last 2 years)","Board Resolution for loan authorization"]', 1000000, 50000000, '15 years', 'From 11.0% p.a.', 'published', 3);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, max_amount, max_tenure, interest_rate_info, status, sort_order) VALUES
(21, 3, 'agricultural-loan', 'Agricultural Loan', 'कृषि ऋण', 'Funding crop production, cold-storages, horticulture, and livestock operations. Subsidized interest limits as approved by central bank.', '["Subsidized NRB rate parameters","Flexible seasonal repayments","Free financial consultation","Financing for crop production and modern agriculture assets"]', '["Nepali citizen aged 21-65","Agricultural land ownership documents","Farm Registration Certificate (if commercial)","Detailed Project Report for commercial farms"]', 100000, 10000000, '10 years', 'Subsidized NRB rates', 'published', 4);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, max_amount, max_tenure, interest_rate_info, status, sort_order) VALUES
(22, 3, 'education-loan', 'Education Loan', 'शिक्षा ऋण', 'Fund admission, college tuition, airfare, and maintenance for children going for university degrees abroad.', '["Payment directly to college registry","Moratorium during study periods","Co-applicant guarantees","Financing up to 80% of total estimated cost","Loan tenure up to 15 years"]', '["Nepali citizen aged 18+","Offer Letter from educational institution","Academic transcripts","Collateral property documents","Income source documents of co-applicants"]', 500000, 15000000, '15 years', 'From 11.0% p.a.', 'published', 5);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, max_amount, max_tenure, interest_rate_info, status, sort_order) VALUES
(23, 3, 'fd-loan', 'FD Loan', 'एफडी ऋण', 'Urgent cash loans backed against your fixed deposit certificates. Fast-processing with zero documentation barriers.', '["Loan: Up to 90% of FD value","Rate: +2.0% above FD certificate yield","Instant payout within hours","No complex income source documentation required","Flexible repayment aligned with FD maturity"]', '["Original RFL Fixed Deposit Certificate","Citizenship Certificate copy","Two passport-size photos","Duly filled FD Loan Application form"]', 10000, 5000000, 'Aligned with FD', 'FD rate + 2.0% p.a.', 'published', 6);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, max_amount, max_tenure, interest_rate_info, status, sort_order) VALUES
(24, 3, 'hire-purchase-loan', 'Hire Purchase Loan', 'हायर पर्चेज ऋण', 'Asset financing options for heavy construction excavators, loaders, transport buses, and trailers.', '["Direct payouts to licensed dealers","Amortization mapped with earnings","Sound security valuation rules","Financing up to 70% of vehicle cost","Flexible amortization plans"]', '["Nepali citizen aged 21-65","Proforma invoice from authorized distributor","Business registration or route permit","Collateral property documents"]', 500000, 20000000, '7 years', 'From 12.5% p.a.', 'published', 7);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, max_amount, max_tenure, interest_rate_info, status, sort_order) VALUES
(25, 3, 'share-loan', 'Share Loan', 'सेयर ऋण', 'Pledge your listed corporate equities block as collateral. Access immediate cash limits matching NEPSE indexes.', '["Margin limits matching NRB rules","Direct broker account credit setups","Transparent portfolio valuation updates","Financing up to 70% of 180-day average market price","Loan tenure of 1 year with easy renewal"]', '["Nepali citizen aged 18+","Demat Account holding shares","PAN Card copy","Income source declaration"]', 200000, 10000000, '1 year (Renewable)', 'From 12.5% p.a.', 'published', 8);

INSERT OR REPLACE INTO products (id, category_id, slug, title, title_np, summary, features, eligibility, min_amount, max_amount, max_tenure, interest_rate_info, status, sort_order) VALUES
(26, 3, 'personal-loan', 'Personal Loan', 'व्यक्तिगत ऋण', 'Secure term credit loans backed by household properties to cover family emergency operations, marriages, or travels.', '["General individual applications","Minimum audit checks","Simple amortization guidelines","No strict usage restrictions","Flexible repayment schedules up to 10 years"]', '["Nepali citizen aged 21-65","Land/House ownership certificate","Char Killa (boundary certificate)","Income source document","Tax clearance certificate"]', 200000, 5000000, '10 years', 'From 14.0% p.a.', 'published', 9);

-- ============================================================
-- 7. SERVICES (14 services)
-- ============================================================
INSERT OR REPLACE INTO services (id, slug, title, title_np, summary, icon, status, sort_order) VALUES
(1, 'mobile-banking', 'Mobile Banking', 'मोबाइल बैंकिङ', 'Manage your accounts on the go with our secure mobile banking app. Available 24/7 for all your banking needs including Fonepay QR, fund transfers, bill payments, and balance inquiries.', 'smartphone', 'published', 1);

INSERT OR REPLACE INTO services (id, slug, title, title_np, summary, icon, status, sort_order) VALUES
(2, 'connect-ips', 'connectIPS Transfers', 'कनेक्टआईपीएस स्थानान्तरण', 'Instant inter-bank fund transfers via the connectIPS payment gateway. Send money to any bank account in Nepal securely.', 'globe', 'published', 2);

INSERT OR REPLACE INTO services (id, slug, title, title_np, summary, icon, status, sort_order) VALUES
(3, 'fonepay-qr', 'Fonepay QR Payment', 'फोनपे क्यूआर भुक्तानी', 'Scan and pay at thousands of merchant outlets across Nepal using Fonepay QR. Cashless, contactless, and convenient.', 'qrCode', 'published', 3);

INSERT OR REPLACE INTO services (id, slug, title, title_np, summary, icon, status, sort_order) VALUES
(4, 'remittance', 'Remittance Service', 'रेमिट्यान्स सेवा', 'Receive international and domestic money transfers through our nationwide branch network. Fast, secure, and reliable remittance settlement.', 'send', 'published', 4);

INSERT OR REPLACE INTO services (id, slug, title, title_np, summary, icon, status, sort_order) VALUES
(5, 'internet-banking', 'Internet Banking', 'इन्टरनेट बैंकिङ', 'Access your accounts from any web browser. View statements, transfer funds, pay bills, and manage your finances online.', 'monitor', 'published', 5);

INSERT OR REPLACE INTO services (id, slug, title, title_np, summary, icon, status, sort_order) VALUES
(6, 'sms-banking', 'SMS Banking', 'एसएमएस बैंकिङ', 'Get instant account alerts and perform basic banking transactions via SMS. Stay updated on all account activities in real time.', 'messageSquare', 'published', 6);

INSERT OR REPLACE INTO services (id, slug, title, title_np, summary, icon, status, sort_order) VALUES
(7, 'atm-debit-card', 'ATM / Debit Card', 'एटीएम / डेबिट कार्ड', 'EMV chip-enabled Visa debit cards for secure transactions at ATMs and POS terminals across Nepal and internationally.', 'creditCard', 'published', 7);

INSERT OR REPLACE INTO services (id, slug, title, title_np, summary, icon, status, sort_order) VALUES
(8, 'any-branch-banking', 'Any Branch Banking (ABBS)', 'जुनसुकै शाखा बैंकिङ', 'Conduct banking transactions at any RFL branch nationwide. Cash deposits, withdrawals, and statement requests from any location.', 'building2', 'published', 8);

INSERT OR REPLACE INTO services (id, slug, title, title_np, summary, icon, status, sort_order) VALUES
(9, 'bill-payment', 'Bill Payment Service', 'बिल भुक्तानी सेवा', 'Pay utility bills including electricity, water, internet, telephone, and insurance premiums through our digital channels or at any branch.', 'receipt', 'published', 9);

INSERT OR REPLACE INTO services (id, slug, title, title_np, summary, icon, status, sort_order) VALUES
(10, 'locker-facility', 'Locker Facility', 'लकर सुविधा', 'Secure safe deposit lockers available at select branches for storing valuable documents, jewelry, and important belongings.', 'shield', 'published', 10);

INSERT OR REPLACE INTO services (id, slug, title, title_np, summary, icon, status, sort_order) VALUES
(11, 'demat-casba', 'Demat & C-ASBA', 'डिम्याट र सी-आस्बा', 'Open Demat accounts and apply for IPOs seamlessly through C-ASBA. Integrated stock market participation services for investors.', 'barChart3', 'published', 11);

INSERT OR REPLACE INTO services (id, slug, title, title_np, summary, icon, status, sort_order) VALUES
(12, 'trade-finance', 'Trade Finance', 'व्यापार वित्त', 'Bank guarantees, Letters of Credit (L/C), and other trade financing solutions to facilitate domestic and international business transactions.', 'briefcase', 'published', 12);

INSERT OR REPLACE INTO services (id, slug, title, title_np, summary, icon, status, sort_order) VALUES
(13, 'online-account-opening', 'Online Account Opening', 'अनलाइन खाता खोल्ने', 'Open your savings account from the comfort of your home. Paperless application with digital document upload and instant approval.', 'userPlus', 'published', 13);

INSERT OR REPLACE INTO services (id, slug, title, title_np, summary, icon, status, sort_order) VALUES
(14, 'customer-support', 'Customer Support Center', 'ग्राहक सहायता केन्द्र', 'Dedicated customer support team available during banking hours. Reach us by phone, email, or visit any branch for personalized assistance.', 'headphones', 'published', 14);

-- ============================================================
-- 8. BRANCHES (7 major branches)
-- ============================================================
INSERT OR REPLACE INTO branches (id, name, name_np, address, phone, email, latitude, longitude, region, banking_hours, sort_order, is_active) VALUES
(1, 'Kamaladi Head Office', 'कमलादी प्रमुख कार्यालय', 'Reliance Bhawan, Kamaladi, Kathmandu', '+977-01-5361104', 'info@reliancenepal.com.np', 27.7172, 85.3240, 'head-office', 'Sun-Thu: 10:00 AM - 5:00 PM', 1, 1);

INSERT OR REPLACE INTO branches (id, name, name_np, address, phone, email, latitude, longitude, region, banking_hours, sort_order, is_active) VALUES
(2, 'Butwal Branch', 'बुटवल शाखा', 'Butwal-11, Rupandehi, Lumbini Province', '+977-071-550992', 'butwal@reliancenepal.com.np', 27.6958, 83.4496, 'lumbini', 'Sun-Thu: 10:00 AM - 5:00 PM', 2, 1);

INSERT OR REPLACE INTO branches (id, name, name_np, address, phone, email, latitude, longitude, region, banking_hours, sort_order, is_active) VALUES
(3, 'Pokhara Branch', 'पोखरा शाखा', 'Pokhara-8, Kaski, Gandaki Province', '+977-061-538188', 'pokhara@reliancenepal.com.np', 28.2096, 83.9856, 'gandaki', 'Sun-Thu: 10:00 AM - 5:00 PM', 3, 1);

INSERT OR REPLACE INTO branches (id, name, name_np, address, phone, email, latitude, longitude, region, banking_hours, sort_order, is_active) VALUES
(4, 'Kohalpur Branch', 'कोहलपुर शाखा', 'Kohalpur-5, Banke, Lumbini Province', '+977-081-542131', 'kohalpur@reliancenepal.com.np', 28.1910, 81.6907, 'lumbini', 'Sun-Thu: 10:00 AM - 5:00 PM', 4, 1);

INSERT OR REPLACE INTO branches (id, name, name_np, address, phone, email, latitude, longitude, region, banking_hours, sort_order, is_active) VALUES
(5, 'Biratnagar Branch', 'विराटनगर शाखा', 'Biratnagar-13, Morang, Koshi Province', '+977-021-471234', 'biratnagar@reliancenepal.com.np', 26.4545, 87.2718, 'koshi', 'Sun-Thu: 10:00 AM - 5:00 PM', 5, 1);

INSERT OR REPLACE INTO branches (id, name, name_np, address, phone, email, latitude, longitude, region, banking_hours, sort_order, is_active) VALUES
(6, 'Bharatpur Branch', 'भरतपुर शाखा', 'Bharatpur-10, Chitwan, Bagmati Province', '+977-056-591234', 'bharatpur@reliancenepal.com.np', 27.6833, 84.4333, 'bagmati', 'Sun-Thu: 10:00 AM - 5:00 PM', 6, 1);

INSERT OR REPLACE INTO branches (id, name, name_np, address, phone, email, latitude, longitude, region, banking_hours, sort_order, is_active) VALUES
(7, 'Lalitpur Branch', 'ललितपुर शाखा', 'Pulchowk, Lalitpur, Bagmati Province', '+977-01-5534567', 'lalitpur@reliancenepal.com.np', 27.6762, 85.3240, 'bagmati', 'Sun-Thu: 10:00 AM - 5:00 PM', 7, 1);

-- ============================================================
-- 9. FAQ ENTRIES
-- ============================================================
INSERT OR REPLACE INTO faqs (id, category_id, question, question_np, answer, answer_np, sort_order, is_active) VALUES
(1, 1, 'What is the minimum balance required to open a savings account?', 'बचत खाता खोल्नको लागि न्यूनतम ब्यालेन्स कति चाहिन्छ?', 'The minimum balance varies by account type. Our Normal Saving Account requires just NPR 100, while premium accounts like Dhaulagiri (NPR 5,000) and Everest (NPR 20,000) have higher minimums. PWD accounts have zero balance requirement.', 'खाताको प्रकार अनुसार न्यूनतम ब्यालेन्स फरक हुन्छ। हाम्रो सामान्य बचत खाताको लागि मात्र NPR 100 चाहिन्छ, जबकि प्रिमियम खाताहरू जस्तै धौलागिरी (NPR ५,०००) र सगरमाथा (NPR २०,०००) को उच्च न्यूनतम छ।', 1, 1);

INSERT OR REPLACE INTO faqs (id, category_id, question, question_np, answer, answer_np, sort_order, is_active) VALUES
(2, 1, 'What documents are needed to open an account?', 'खाता खोल्नको लागि के कागजात चाहिन्छ?', 'You will need a valid citizenship certificate or passport, two passport-size photos, and a utility bill as address proof. Additional documents may be required depending on the account type.', 'तपाईंलाई वैध नागरिकता प्रमाणपत्र वा राहदानी, दुईवटा पासपोर्ट साइजको फोटो र ठेगाना प्रमाणको रूपमा उपयोगिता बिल चाहिन्छ। खाताको प्रकार अनुसार अतिरिक्त कागजात आवश्यक हुन सक्छ।', 2, 1);

INSERT OR REPLACE INTO faqs (id, category_id, question, question_np, answer, answer_np, sort_order, is_active) VALUES
(3, 1, 'What are the banking hours?', 'बैंकिङ समय के हो?', 'Our branches are open Sunday through Thursday from 10:00 AM to 5:00 PM. We are closed on Fridays, Saturdays, and public holidays.', 'हाम्रा शाखाहरू आइतबारदेखि बिहीबारसम्म बिहान १०:०० बजेदेखि साँझ ५:०० बजेसम्म खुला रहन्छन्। हामी शुक्रबार, शनिबार र सार्वजनिक बिदामा बन्द रहन्छौं।', 3, 1);

INSERT OR REPLACE INTO faqs (id, category_id, question, question_np, answer, answer_np, sort_order, is_active) VALUES
(4, 2, 'What is the interest rate on savings accounts?', 'बचत खातामा ब्याजदर कति छ?', 'Interest rates range from 2.75% p.a. for Normal Saving Account to 5.75% p.a. for Sarathi Saving Account. Rates are posted quarterly on the minimum quarterly balance.', 'ब्याजदर सामान्य बचत खाताको लागि २.७५% प्रतिवर्षदेखि सारथी बचत खाताको लागि ५.७५% प्रतिवर्षसम्म हुन्छ। ब्याज त्रैमासिक रूपमा न्यूनतम त्रैमासिक ब्यालेन्समा पोस्ट गरिन्छ।', 1, 1);

INSERT OR REPLACE INTO faqs (id, category_id, question, question_np, answer, answer_np, sort_order, is_active) VALUES
(5, 2, 'Can I open a joint savings account?', 'के म संयुक्त बचत खाता खोल्न सक्छु?', 'Yes, joint savings accounts are available with multiple operation modes: either or survivor, jointly, and former or survivor. Both applicants need to provide valid documents.', 'हो, संयुक्त बचत खाता धेरै सञ्चालन मोडहरूसँग उपलब्ध छ: एक वा उत्तरजीवी, संयुक्त र पूर्व वा उत्तरजीवी। दुबै आवेदकहरूले वैध कागजातहरू प्रदान गर्न आवश्यक छ।', 2, 1);

INSERT OR REPLACE INTO faqs (id, category_id, question, question_np, answer, answer_np, sort_order, is_active) VALUES
(6, 2, 'How is interest calculated on Fixed Deposits?', 'मुद्दती निक्षेपमा ब्याज कसरी गणना गरिन्छ?', 'Interest on Fixed Deposits is calculated based on the principal amount, the applicable interest rate for the chosen tenure, and the deposit period. Interest can be paid monthly, quarterly, or at maturity. Use our FD calculator on the website for precise estimates.', 'मुद्दती निक्षेपको ब्याज मूल रकम, चयन गरिएको अवधिको लागि लागू ब्याजदर र निक्षेप अवधिको आधारमा गणना गरिन्छ। ब्याज मासिक, त्रैमासिक वा परिपक्वतामा भुक्तानी गर्न सकिन्छ। सटीक अनुमानको लागि हाम्रो वेबसाइटमा रहेको एफडी क्याल्कुलेटर प्रयोग गर्नुहोस्।', 3, 1);

INSERT OR REPLACE INTO faqs (id, category_id, question, question_np, answer, answer_np, sort_order, is_active) VALUES
(7, 3, 'What is the maximum loan tenure available?', 'उपलब्ध अधिकतम ऋण अवधि कति हो?', 'The maximum loan tenure depends on the loan type. Home loans offer up to 25 years, auto loans up to 7 years, business loans up to 15 years, and personal loans up to 10 years.', 'अधिकतम ऋण अवधि ऋणको प्रकारमा निर्भर गर्दछ। गृह ऋणले २५ वर्षसम्म, अटो ऋण ७ वर्षसम्म, व्यवसाय ऋण १५ वर्षसम्म र व्यक्तिगत ऋण १० वर्षसम्मको अवधि प्रदान गर्दछ।', 1, 1);

INSERT OR REPLACE INTO faqs (id, category_id, question, question_np, answer, answer_np, sort_order, is_active) VALUES
(8, 3, 'What documents are required for a Home Loan?', 'गृह ऋणको लागि के कागजात चाहिन्छ?', 'For a Home Loan, you need citizenship certificate, passport-size photos, land ownership certificate (Lalpurja), approved building design (Naksa Pass), Char Killa (boundary certificate), income source documents, and tax clearance certificate.', 'गृह ऋणको लागि, तपाईंलाई नागरिकता प्रमाणपत्र, पासपोर्ट साइज फोटो, जग्गा धनीपुष्टि प्रमाणपत्र (लालपुर्जा), स्वीकृत भवन डिजाइन (नक्सा पास), चार किल्ला (सीमा प्रमाणपत्र), आय स्रोत कागजात र कर छर्टिफिकेट चाहिन्छ।', 2, 1);

INSERT OR REPLACE INTO faqs (id, category_id, question, question_np, answer, answer_np, sort_order, is_active) VALUES
(9, 3, 'Can I get a loan against my Fixed Deposit?', 'के म मेरो मुद्दती निक्षेपको बिरूद्ध ऋण लिन सक्छु?', 'Yes, you can obtain a loan up to 90% of your FD principal amount at an interest rate of FD yield + 2.0% p.a. Processing is instant with minimal documentation.', 'हो, तपाईं FD उपज + २.०% प्रतिवर्षको ब्याजदरमा आफ्नो FD मूल रकमको ९०% सम्म ऋण प्राप्त गर्न सक्नुहुन्छ। न्यूनतम कागजातको साथ प्रशोधन तत्काल हुन्छ।', 3, 1);

INSERT OR REPLACE INTO faqs (id, category_id, question, question_np, answer, answer_np, sort_order, is_active) VALUES
(10, 4, 'How do I download the Reliance Finance Smart App?', 'म कसरी रिलायन्स फाइनान्स स्मार्ट एप डाउनलोड गर्न सक्छु?', 'You can download the app from the Google Play Store (Android) or Apple App Store (iOS). Search for "Reliance Finance Smart" or use the download links on our website.', 'तपाईं गुगल प्ले स्टोर (एन्ड्रोइड) वा एप्पल एप स्टोर (आईओएस) बाट एप डाउनलोड गर्न सक्नुहुन्छ। "Reliance Finance Smart" खोज्नुहोस् वा हाम्रो वेबसाइटमा डाउनलोड लिङ्कहरू प्रयोग गर्नुहोस्।', 1, 1);

INSERT OR REPLACE INTO faqs (id, category_id, question, question_np, answer, answer_np, sort_order, is_active) VALUES
(11, 4, 'What can I do with the mobile banking app?', 'मोबाइल बैंकिङ एपले के गर्न सक्छ?', 'The app allows you to check balances, view statements, transfer funds, make Fonepay QR payments, pay utility bills, manage FD accounts, and apply for loans.', 'एपले तपाईंलाई ब्यालेन्स जाँच गर्न, स्टेटमेन्ट हेर्न, रकम स्थानान्तरण गर्न, फोनपे क्यूआर भुक्तानी गर्न, उपयोगिता बिल तिर्न, FD खाताहरू व्यवस्थापन गर्न र ऋणको लागि आवेदन दिन अनुमति दिन्छ।', 2, 1);

INSERT OR REPLACE INTO faqs (id, category_id, question, question_np, answer, answer_np, sort_order, is_active) VALUES
(12, 4, 'Is mobile banking secure?', 'के मोबाइल बैंकिङ सुरक्षित छ?', 'Yes, our mobile banking app uses end-to-end encryption, multi-factor authentication, and biometric login (fingerprint/face recognition) to ensure your transactions and data are completely secure.', 'हो, हाम्रो मोबाइल बैंकिङ एपले तपाईंको कारोबार र डेटा पूर्ण रूपमा सुरक्षित छ भनी सुनिश्चित गर्न एन्ड-टु-एन्ड इन्क्रिप्सन, बहु-कारक प्रमाणीकरण र बायोमेट्रिक लगइन (फिंगरप्रिन्ट/अनुहार पहिचान) प्रयोग गर्दछ।', 3, 1);

-- ============================================================
-- 10. TEAM MEMBERS
-- ============================================================
-- Board of Directors (category_id=1)
INSERT OR REPLACE INTO team_members (id, category_id, name, name_np, designation, designation_np, sort_order, is_active) VALUES
(1, 1, 'Mr. Rajendra Bahadur Thapa', 'राजेन्द्र बहादुर थापा', 'Chairman', 'अध्यक्ष', 1, 1);

INSERT OR REPLACE INTO team_members (id, category_id, name, name_np, designation, designation_np, sort_order, is_active) VALUES
(2, 1, 'Mr. Pradeep Kumar Shrestha', 'प्रदीप कुमार श्रेष्ठ', 'Vice Chairman', 'उपाध्यक्ष', 2, 1);

INSERT OR REPLACE INTO team_members (id, category_id, name, name_np, designation, designation_np, sort_order, is_active) VALUES
(3, 1, 'Mr. Rameshwor Rijal', 'रामेश्वर रिजाल', 'Director', 'सञ्चालक', 3, 1);

INSERT OR REPLACE INTO team_members (id, category_id, name, name_np, designation, designation_np, sort_order, is_active) VALUES
(4, 1, 'Mr. Bishnu Prasad Neupane', 'विष्णु प्रसाद न्यौपाने', 'Independent Director', 'स्वतन्त्र सञ्चालक', 4, 1);

INSERT OR REPLACE INTO team_members (id, category_id, name, name_np, designation, designation_np, sort_order, is_active) VALUES
(5, 1, 'Mr. Ramesh Kumar Agrawal', 'रमेश कुमार अग्रवाल', 'Director', 'सञ्चालक', 5, 1);

-- Management Team (category_id=2)
INSERT OR REPLACE INTO team_members (id, category_id, name, name_np, designation, designation_np, sort_order, is_active) VALUES
(6, 2, 'Mr. Binod Kumar Shrestha', 'विनोद कुमार श्रेष्ठ', 'Chief Executive Officer', 'प्रमुख कार्यकारी अधिकृत', 1, 1);

INSERT OR REPLACE INTO team_members (id, category_id, name, name_np, designation, designation_np, sort_order, is_active) VALUES
(7, 2, 'Mr. Dipendra Koirala', 'दीपेन्द्र कोइराला', 'Chief Financial Officer', 'प्रमुख वित्तीय अधिकृत', 2, 1);

INSERT OR REPLACE INTO team_members (id, category_id, name, name_np, designation, designation_np, sort_order, is_active) VALUES
(8, 2, 'Mr. Sagar Dahal', 'सागर दाहाल', 'Chief Operating Officer', 'प्रमुख सञ्चालन अधिकृत', 3, 1);

INSERT OR REPLACE INTO team_members (id, category_id, name, name_np, designation, designation_np, sort_order, is_active) VALUES
(9, 2, 'Mr. Prakash Raut', 'प्रकाश राउत', 'Chief Risk Officer', 'प्रमुख जोखिम अधिकृत', 4, 1);

-- Head of Departments (category_id=3)
INSERT OR REPLACE INTO team_members (id, category_id, name, name_np, designation, designation_np, sort_order, is_active) VALUES
(10, 3, 'Mr. Anil Sharma', 'अनिल शर्मा', 'Head of Retail Banking', 'खुद्रा बैंकिङ प्रमुख', 1, 1);

INSERT OR REPLACE INTO team_members (id, category_id, name, name_np, designation, designation_np, sort_order, is_active) VALUES
(11, 3, 'Ms. Sunita Adhikari', 'सुनीता अधिकारी', 'Head of Credit Administration', 'ऋण प्रशासन प्रमुख', 2, 1);

INSERT OR REPLACE INTO team_members (id, category_id, name, name_np, designation, designation_np, sort_order, is_active) VALUES
(12, 3, 'Mr. Mahesh Acharya', 'महेश आचार्य', 'Head of Information Technology', 'सूचना प्रविधि प्रमुख', 3, 1);

INSERT OR REPLACE INTO team_members (id, category_id, name, name_np, designation, designation_np, sort_order, is_active) VALUES
(13, 3, 'Mr. Suman Khatiwada', 'सुमन खतिवडा', 'Head of Compliance & AML', 'अनुपालन तथा एएमएल प्रमुख', 4, 1);

INSERT OR REPLACE INTO team_members (id, category_id, name, name_np, designation, designation_np, sort_order, is_active) VALUES
(14, 3, 'Ms. Radhika Poudel', 'राधिका पौडेल', 'Head of Marketing & Communications', 'मार्केटिङ तथा सञ्चार प्रमुख', 5, 1);

-- ============================================================
-- 11. NEWS ITEMS (5 from old homepage)
-- ============================================================
INSERT OR REPLACE INTO news (id, category_id, title, title_np, slug, summary, image, status, published_at, is_featured) VALUES
(1, NULL, '16th Annual General Meeting Successfully Conducted', '१६औं वार्षिक साधारण सभा सफलतापूर्वक सम्पन्न', '16th-annual-general-meeting-2026', 'Reliance Finance Limited successfully hosted its 16th AGM, resolving major dividend distributions and capital layouts for the next fiscal period.', 'https://reliancenepal.com.np/uploads/gallery/thumb/2af8e77f6c67fcff8a96dde882f428c18e61d4b4.jpg', 'published', '2026-01-14', 1);

INSERT OR REPLACE INTO news (id, category_id, title, title_np, slug, summary, image, status, published_at, is_featured) VALUES
(2, NULL, 'Official Onboarding of NPS National Card Switch', 'एनपीएस राष्ट्रिय कार्ड स्विचको आधिकारिक अनबोर्डिङ', 'nps-national-card-switch-onboarding', 'We are delighted to onboard the NPS National Card Switch and launch the all-new NepalPay card system, offering robust retail transactions.', 'https://reliancenepal.com.np/uploads/gallery/thumb/6f918727ddaa5191bb40f5158314f9b8db70a4bd.jpg', 'published', '2025-05-18', 1);

INSERT OR REPLACE INTO news (id, category_id, title, title_np, slug, summary, image, status, published_at, is_featured) VALUES
(3, NULL, 'Unveiling RFL Calendar for New Year 2082', 'नयाँ वर्ष २०८२ को लागि आरएफएल क्यालेन्डर अनावरण', 'rfl-calendar-2082', 'Reliance Finance management team unveiled the official calendar for Nepali New Year 2082 featuring highlights of cultural sites.', 'https://reliancenepal.com.np/uploads/gallery/thumb/418804719c6d246ae6897666025277e035cfe922.jpg', 'published', '2025-04-03', 0);

INSERT OR REPLACE INTO news (id, category_id, title, title_np, slug, summary, image, status, published_at, is_featured) VALUES
(4, NULL, 'AML/CFT Compliance Training Conducted', 'एएमएल/सीएफटी अनुपालन तालिम सम्पन्न', 'aml-cft-compliance-training', 'A comprehensive Anti-Money Laundering and Combating Financing of Terrorism compliance program was successfully completed by staff members.', 'https://reliancenepal.com.np/uploads/gallery/thumb/17d3790b4d6530b13c7b63b0c3e7913e5c0bfd42.jpg', 'published', '2024-02-03', 0);

INSERT OR REPLACE INTO news (id, category_id, title, title_np, slug, summary, image, status, published_at, is_featured) VALUES
(5, NULL, 'Real Estate Expo Bhrikutimandap Attendance', 'भृकुटीमण्डप रियल इस्टेट एक्सपोमा सहभागिता', 'real-estate-expo-bhrikutimandap', 'RFL marked a prominent presence in the Kathmandu Real Estate Expo at Stall A15, providing direct loan consultancies on spot.', 'https://reliancenepal.com.np/uploads/gallery/thumb/41d4b57ab15d5a51adca131706a2854d51ad4bc0.jpg', 'published', '2023-12-31', 0);

-- ============================================================
-- 12. CSR ACTIVITIES (3 from old homepage)
-- ============================================================
INSERT OR REPLACE INTO csr_activities (id, title, title_np, summary, summary_np, image_url, date, link_url, sort_order, is_active) VALUES
(1, 'Kohalpur Branch COVID Food Bank Relief Drive', 'कोहलपुर शाखा कोभिड खाद्य बैंक राहत अभियान', 'Providing direct food item distribution and survival relief materials to vulnerable families of Kohalpur Municipality during lockdowns.', 'लकडाउनको समयमा कोहलपुर नगरपालिकाका कमजोर परिवारहरूलाई प्रत्यक्ष खाद्यान्न वितरण र राहत सामग्री प्रदान गर्दै।', 'https://reliancenepal.com.np/uploads/news/thumb/cb63cb6bdd9316027c801d2ae88a24bd8fc098a4.jpg', '2021-06-09', '/csr?id=kohalpur-food', 1, 1);

INSERT OR REPLACE INTO csr_activities (id, title, title_np, summary, summary_np, image_url, date, link_url, sort_order, is_active) VALUES
(2, 'Free Eye Check-Up & Cataract Surgery Camp', 'निःशुल्क आँखा जाँच र मोतियाबिन्दु शल्यक्रिया शिविर', 'In association with Lions Club International, RFL organized an eye health camp in Lalitpur, restoring vision for 43 senior citizens.', 'लायन्स क्लब इन्टरनेसनलको सहकार्यमा, आरएफएलले ललितपुरमा आँखा स्वास्थ्य शिविर आयोजना गरी ४३ जना ज्येष्ठ नागरिकको दृष्टि पुनर्स्थापना गर्यो।', 'https://reliancenepal.com.np/uploads/news/thumb/9e6d1ff2a714b9d6b07a9ef4fb29d7f35272a292.jpg', '2021-03-13', '/csr?id=eye-camp-lalitpur', 2, 1);

INSERT OR REPLACE INTO csr_activities (id, title, title_np, summary, summary_np, image_url, date, link_url, sort_order, is_active) VALUES
(3, 'Primary School Bag Handover Drive Solukhumbu', 'सोलुखुम्बु प्राथमिक विद्यालय झोला हस्तान्तरण अभियान', 'Distributing study materials and school bags to children in Solukhumbu district, encouraging primary education access.', 'सोलुखुम्बु जिल्लाका बालबालिकालाई अध्ययन सामग्री र स्कुल झोला वितरण गर्दै प्रारम्भिक शिक्षामा पहुँच प्रोत्साहन गर्ने।', 'https://reliancenepal.com.np/uploads/news/thumb/7e85ee09a12d83b4ca49924b6db4b8a76ec2c5da.jpg', '2019-10-15', '/csr?id=school-bag-solukhumbu', 3, 1);
