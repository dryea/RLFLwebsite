-- Seed Nepali navigation (parent IDs offset by 105 from English)
-- English IDs: Home=1, About=2, Products=3, Rates=4, Publications=5, Auction=6, Services=7, Network=8
-- English sub-IDs: Governance=15, Saving=29, Tools=58, Notice=68, Report=78
-- Nepali IDs: Home=106, About=107, Products=108, Rates=109, Publications=110, Auction=111, Services=112, Network=113
-- Nepali sub-IDs: Governance=120, Saving=134, Fixed=149, Loan=153, Tools=163, Notice=173, Report=183

-- Level 1
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'गृहपृष्ठ', '/', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'बारे', '/about', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'उत्पादनहरू', '/products', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'दरहरू', '/rates', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'प्रकाशनहरू', '/publications', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'लिलाम सूचना', '/auction-notice', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'सेवाहरू', '/services', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'हाम्रो सञ्जाल', '/our-network', 7);

-- About children (parent = 107)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 107, 'परिचय', '/about/introduction', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 107, 'लक्ष्य र उद्देश्य', '/about/mission-goals', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 107, 'रणनीतिक ढाँचा', '/about/strategic-framework', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 107, 'उपलब्धिहरू', '/about/milestones', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 107, 'पुँजी संरचना', '/about/capital-structure', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 107, 'संचालक समिति', '/team/board-of-directors', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (2, 107, 'सुशासन', NULL, 'सुशासन र नेतृत्व संरचना', 6);
-- Governance = id 120
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 120, 'संचालक समिति', '/committee-of-directors', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 120, 'व्यवस्थापन टोली', '/team/management-team', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 120, 'विभाग प्रमुख', '/team/head-of-department', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 120, 'शाखा प्रबन्धक', '/team/branch-manager', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 120, 'गुनासो अधिकृत', '/grievance-handling-officer', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 120, 'दिगो बैंकिङ', '/sustainable-banking', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 120, 'वातावरणीय गतिविधि', '/environmental-financial-activities', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 120, 'अनुपालन अधिकृत', '/compliance-officer', 7);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 120, 'कम्पनी सचिव', '/company-secretary', 8);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 120, 'CSR', '/csr', 9);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 107, 'गोपनीयता नीति', '/about/privacy-policy', 7);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 107, 'प्रायः सोधिने प्रश्न', '/faq', 8);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 107, 'ग्राहक अनुभव', '/testimonials', 9);

-- Products children (parent = 108)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (2, 108, 'बचत', '/products/savings', 'हाम्रा बचत खाता विकल्पहरू अन्वेषण गर्नुहोस्', 0);
-- Saving = id 134
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 134, 'बचत निक्षेप', '/products/savings', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 134, 'सामान्य बचत खाता', '/products/savings/normal-saving-account', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 134, 'लगानीकर्ता बचत खाता', '/products/savings/investor-saving-account', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 134, 'विशेष बचत खाता', '/products/savings/special-saving-account', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 134, 'विद्यार्थी बचत खाता', '/products/savings/student-saving-account', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 134, 'सेयरधनी बचत खाता', '/products/savings/shareholder-saving-account', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 134, 'अपाङ्ग बचत खाता', '/products/savings/pwd-saving-account', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 134, 'धौलागिरी बचत खाता', '/products/savings/dhaulagiri-saving-account', 7);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 134, 'कञ्चनजंगा बचत खाता', '/products/savings/kanchanjunga-saving-account', 8);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 134, 'एभरेस्ट बचत खाता', '/products/savings/everest-saving-account', 9);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 134, 'सुपर बचत खाता', '/products/savings/super-saving-account', 10);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 134, 'गोल्ड बचत खाता', '/products/savings/gold-saving-account', 11);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 134, 'डायमन्ड बचत खाता', '/products/savings/diamond-saving-account', 12);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 134, 'सारथी बचत खाता', '/products/savings/sarathi-saving-account', 13);

INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (2, 108, 'मुद्दती', '/products/fixed-deposits', 'हाम्रा मुद्दती निक्षेप योजनाहरूसँग ग्यारेन्टीड रिटर्न कमाउनुहोस्', 1);
-- Fixed = id 149
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 149, 'मुद्दती निक्षेप', '/products/fixed-deposits', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 149, 'व्यक्तिगत मुद्दती निक्षेप', '/products/fixed-deposits/individual-fixed-deposit', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 149, 'संस्थागत मुद्दती निक्षेप', '/products/fixed-deposits/corporate-fixed-deposit', 2);

INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (2, 108, 'ऋण', '/products/loans', 'हरेक आवश्यकताको लागि लचिलो ऋण समाधान', 2);
-- Loan = id 153
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 153, 'कृषि ऋण', '/products/loans/agricultural-loan', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 153, 'अटो ऋण', '/products/loans/auto-loan', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 153, 'हायर पर्चेज ऋण', '/products/loans/hire-purchase-loan', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 153, 'शिक्षा ऋण', '/products/loans/education-loan', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 153, 'सेयर ऋण', '/products/loans/share-loan', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 153, 'गृह ऋण', '/products/loans/home-loan', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 153, 'FD ऋण', '/products/loans/fd-loan', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 153, 'व्यक्तिगत ऋण', '/products/loans/personal-loan', 7);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 153, 'व्यवसाय ऋण', '/products/loans/business-loan', 8);

INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (2, 108, 'उपकरणहरू', NULL, 'वित्तीय क्याल्कुलेटर र तुलना उपकरणहरू', 3);
-- Tools = id 163
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 163, 'उत्पादन तुलना', '/products/compare', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 163, 'सबै क्याल्कुलेटर', '/calculators', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 163, 'ऋण योग्यता', '/loan-eligibility', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 163, 'EMI क्याल्कुलेटर', '/emi-calculator', 3);

-- Rates children (parent = 109)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 109, 'ब्याज दर', '/rates', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 109, 'आधार दर / स्प्रेड दर', '/rates/base-rate-spread-rate', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 109, 'मापदण्ड शुल्क', '/rates/standard-tariff-charges', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 109, 'विदेशी विनिमय दर', '/rates/forex-rates', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 109, 'सुन / चाँदीको दर', '/rates/gold-silver', 4);

-- Publications children (parent = 110)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (2, 110, 'सूचना', NULL, 'आधिकारिक सूचना र घोषणाहरू', 0);
-- Notice = id 173
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 173, 'AGM सूचना', '/publications/notices/agm-notice', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 173, 'लाभांश घोषणा', '/publications/notices/dividend-declaration', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 173, 'दावी नगरिएको लाभांश', '/publications/notices/unclaimed-dividend', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 173, 'सूचनाको हक', '/publications/notices/right-to-information', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 173, 'अनुदान ऋण सूची', '/publications/notices/subsidy-loan-list', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 173, 'बोलपत्र सूचना', '/publications/notices/tender-notice', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 173, 'सामान्य सूचना', '/publications/notices/general-notice', 6);

INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 110, 'समाचार', '/publications/news', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 110, 'कार्यक्रम', '/publications/events', 2);

INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (2, 110, 'प्रतिवेदन', NULL, 'वार्षिक प्रतिवेदन, खुलासा र दर्ताहरू', 3);
-- Report = id 183
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 183, 'AGM मिनेट', '/publications/reports/agm-minute', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 183, 'वार्षिक प्रतिवेदन', '/publications/reports/annual-report', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 183, 'त्रैमासिक प्रतिवेदन', '/publications/reports/quarterly-reports', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 183, 'बासेल II खुलासा', '/publications/reports/basel-ii-disclosure', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 183, 'SEBON प्रतिवेदन', '/publications/reports/sebon-report', 4);

INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 110, 'प्रशिक्षण सूची', '/publications/training-list', 4);

-- Services children (parent = 112)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 112, 'मोबाइल बैंकिङ', '/services/mobile-banking', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 112, 'QR टेलर', '/services/qr-teller', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 112, 'connectRTGS', '/services/connect-rtgs', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 112, 'CORPORATEPAY', '/services/corporatepay', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 112, 'C-ASBA', '/services/c-asba', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 112, 'डेबिट कार्ड', '/services/debit-card', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 112, 'ABBS', '/services/abbs', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 112, 'रेमिट्यान्स', '/services/remittance', 7);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 112, 'SMS बैंकिङ', '/services/sms-banking', 8);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 112, 'Connect IPS', '/services/connect-ips', 9);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 112, 'Interbank IPS', '/services/interbank-ips', 10);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 112, 'ECC', '/services/ecc', 11);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 112, 'अपाङ्ग-मैत्री शाखा', '/services/disabled-friendly-branch', 12);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 112, '२४/७ खाता ब्लक', '/services/24-7-account-block', 13);

-- Our Network children (parent = 113)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 113, 'हाम्रा साझेदार', '/partner', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 113, 'शाखाहरू', '/branches', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 113, 'सम्पर्क', '/contact', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 113, 'व्यापारी र प्रस्ताव', '/merchant-offers', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 113, 'RFL ऋण सोधपुछ', '/loan-enquiry', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 113, 'भेटघाट बुक गर्नुहोस्', '/appointments', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 113, 'ग्राहक अनुभव', '/testimonials', 6);
