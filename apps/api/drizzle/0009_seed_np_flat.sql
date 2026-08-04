-- Step 1: Insert all Nepali items flat (no parent relationships)
-- Step 2: Update parent_id using subqueries based on labels

-- Level 1 items
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'गृहपृष्ठ', '/', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'बारे', '/about', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'उत्पादनहरू', '/products', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'दरहरू', '/rates', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'प्रकाशनहरू', '/publications', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'लिलाम सूचना', '/auction-notice', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'सेवाहरू', '/services', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'हाम्रो सञ्जाल', '/our-network', 7);

-- About children (flat)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'परिचय', '/about/introduction', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'लक्ष्य र उद्देश्य', '/about/mission-goals', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'रणनीतिक ढाँचा', '/about/strategic-framework', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'उपलब्धिहरू', '/about/milestones', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'पुँजी संरचना', '/about/capital-structure', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'संचालक समिति', '/team/board-of-directors', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (2, NULL, 'सुशासन', NULL, 'सुशासन र नेतृत्व संरचना', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'गोपनीयता नीति', '/about/privacy-policy', 7);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'प्रायः सोधिने प्रश्न', '/faq', 8);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'ग्राहक अनुभव', '/testimonials', 9);

-- Governance children (flat)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'संचालक समिति', '/committee-of-directors', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'व्यवस्थापन टोली', '/team/management-team', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'विभाग प्रमुख', '/team/head-of-department', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'शाखा प्रबन्धक', '/team/branch-manager', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'गुनासो अधिकृत', '/grievance-handling-officer', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'दिगो बैंकिङ', '/sustainable-banking', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'वातावरणीय गतिविधि', '/environmental-financial-activities', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'अनुपालन अधिकृत', '/compliance-officer', 7);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'कम्पनी सचिव', '/company-secretary', 8);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'CSR', '/csr', 9);

-- Products children (flat)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (2, NULL, 'बचत', '/products/savings', 'हाम्रा बचत खाता विकल्पहरू अन्वेषण गर्नुहोस्', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'बचत निक्षेप', '/products/savings', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'सामान्य बचत खाता', '/products/savings/normal-saving-account', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'लगानीकर्ता बचत खाता', '/products/savings/investor-saving-account', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'विशेष बचत खाता', '/products/savings/special-saving-account', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'विद्यार्थी बचत खाता', '/products/savings/student-saving-account', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'सेयरधनी बचत खाता', '/products/savings/shareholder-saving-account', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'अपाङ्ग बचत खाता', '/products/savings/pwd-saving-account', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'धौलागिरी बचत खाता', '/products/savings/dhaulagiri-saving-account', 7);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'कञ्चनजंगा बचत खाता', '/products/savings/kanchanjunga-saving-account', 8);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'एभरेस्ट बचत खाता', '/products/savings/everest-saving-account', 9);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'सुपर बचत खाता', '/products/savings/super-saving-account', 10);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'गोल्ड बचत खाता', '/products/savings/gold-saving-account', 11);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'डायमन्ड बचत खाता', '/products/savings/diamond-saving-account', 12);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'सारथी बचत खाता', '/products/savings/sarathi-saving-account', 13);

INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (2, NULL, 'मुद्दती', '/products/fixed-deposits', 'हाम्रा मुद्दती निक्षेप योजनाहरूसँग ग्यारेन्टीड रिटर्न कमाउनुहोस्', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'मुद्दती निक्षेप', '/products/fixed-deposits', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'व्यक्तिगत मुद्दती निक्षेप', '/products/fixed-deposits/individual-fixed-deposit', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'संस्थागत मुद्दती निक्षेप', '/products/fixed-deposits/corporate-fixed-deposit', 2);

INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (2, NULL, 'ऋण', '/products/loans', 'हरेक आवश्यकताको लागि लचिलो ऋण समाधान', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'कृषि ऋण', '/products/loans/agricultural-loan', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'अटो ऋण', '/products/loans/auto-loan', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'हायर पर्चेज ऋण', '/products/loans/hire-purchase-loan', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'शिक्षा ऋण', '/products/loans/education-loan', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'सेयर ऋण', '/products/loans/share-loan', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'गृह ऋण', '/products/loans/home-loan', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'FD ऋण', '/products/loans/fd-loan', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'व्यक्तिगत ऋण', '/products/loans/personal-loan', 7);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'व्यवसाय ऋण', '/products/loans/business-loan', 8);

INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (2, NULL, 'उपकरणहरू', NULL, 'वित्तीय क्याल्कुलेटर र तुलना उपकरणहरू', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'उत्पादन तुलना', '/products/compare', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'सबै क्याल्कुलेटर', '/calculators', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'ऋण योग्यता', '/loan-eligibility', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'EMI क्याल्कुलेटर', '/emi-calculator', 3);

-- Rates children
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'ब्याज दर', '/rates', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'आधार दर / स्प्रेड दर', '/rates/base-rate-spread-rate', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'मापदण्ड शुल्क', '/rates/standard-tariff-charges', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'विदेशी विनिमय दर', '/rates/forex-rates', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'सुन / चाँदीको दर', '/rates/gold-silver', 4);

-- Publications children
INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (2, NULL, 'सूचना', NULL, 'आधिकारिक सूचना र घोषणाहरू', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'AGM सूचना', '/publications/notices/agm-notice', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'लाभांश घोषणा', '/publications/notices/dividend-declaration', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'दावी नगरिएको लाभांश', '/publications/notices/unclaimed-dividend', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'सूचनाको हक', '/publications/notices/right-to-information', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'अनुदान ऋण सूची', '/publications/notices/subsidy-loan-list', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'बोलपत्र सूचना', '/publications/notices/tender-notice', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'सामान्य सूचना', '/publications/notices/general-notice', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'समाचार', '/publications/news', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'कार्यक्रम', '/publications/events', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (2, NULL, 'प्रतिवेदन', NULL, 'वार्षिक प्रतिवेदन, खुलासा र दर्ताहरू', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'AGM मिनेट', '/publications/reports/agm-minute', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'वार्षिक प्रतिवेदन', '/publications/reports/annual-report', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'त्रैमासिक प्रतिवेदन', '/publications/reports/quarterly-reports', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'बासेल II खुलासा', '/publications/reports/basel-ii-disclosure', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'SEBON प्रतिवेदन', '/publications/reports/sebon-report', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'प्रशिक्षण सूची', '/publications/training-list', 4);

-- Services children
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'मोबाइल बैंकिङ', '/services/mobile-banking', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'QR टेलर', '/services/qr-teller', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'connectRTGS', '/services/connect-rtgs', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'CORPORATEPAY', '/services/corporatepay', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'C-ASBA', '/services/c-asba', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'डेबिट कार्ड', '/services/debit-card', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'ABBS', '/services/abbs', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'रेमिट्यान्स', '/services/remittance', 7);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'SMS बैंकिङ', '/services/sms-banking', 8);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'Connect IPS', '/services/connect-ips', 9);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'Interbank IPS', '/services/interbank-ips', 10);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'ECC', '/services/ecc', 11);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'अपाङ्ग-मैत्री शाखा', '/services/disabled-friendly-branch', 12);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, '२४/७ खाता ब्लक', '/services/24-7-account-block', 13);

-- Our Network children
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'हाम्रा साझेदार', '/partner', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'शाखाहरू', '/branches', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'सम्पर्क', '/contact', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'व्यापारी र प्रस्ताव', '/merchant-offers', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'RFL ऋण सोधपुछ', '/loan-enquiry', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'भेटघाट बुक गर्नुहोस्', '/appointments', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'ग्राहक अनुभव', '/testimonials', 6);
