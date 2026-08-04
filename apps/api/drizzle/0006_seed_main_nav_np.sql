-- Seed Nepali navigation
INSERT INTO navigation (name, slug, locale) VALUES ('मुख्य नेभिगेसन', 'main-nav', 'np');

-- Level 1 items (Nepali menu = id 2)
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'गृहपृष्ठ', '/', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'बारे', '/about', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'उत्पादनहरू', '/products', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'दरहरू', '/rates', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'प्रकाशनहरू', '/publications', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'लिलाम सूचना', '/auction-notice', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'सेवाहरू', '/services', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, NULL, 'हाम्रो सञ्जाल', '/our-network', 7);

-- About children
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 2, 'परिचय', '/about/introduction', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 2, 'लक्ष्य र उद्देश्य', '/about/mission-goals', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 2, 'रणनीतिक ढाँचा', '/about/strategic-framework', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 2, 'उपलब्धिहरू', '/about/milestones', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 2, 'पुँजी संरचना', '/about/capital-structure', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 2, 'संचालक समिति', '/team/board-of-directors', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (2, 2, 'सुशासन', NULL, 'सुशासन र नेतृत्व संरचना', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 15, 'संचालक समिति', '/committee-of-directors', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 15, 'व्यवस्थापन टोली', '/team/management-team', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 15, 'विभाग प्रमुख', '/team/head-of-department', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 15, 'शाखा प्रबन्धक', '/team/branch-manager', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 15, 'गुनासो अधिकृत', '/grievance-handling-officer', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 15, 'दिगो बैंकिङ', '/sustainable-banking', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 15, 'वातावरणीय गतिविधि', '/environmental-financial-activities', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 15, 'अनुपालन अधिकृत', '/compliance-officer', 7);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 15, 'कम्पनी सचिव', '/company-secretary', 8);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 15, 'CSR', '/csr', 9);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 2, 'गोपनीयता नीति', '/about/privacy-policy', 7);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 2, 'प्रायः सोधिने प्रश्न', '/faq', 8);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 2, 'ग्राहक अनुभव', '/testimonials', 9);

-- Products children
INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (2, 3, 'बचत', '/products/savings', 'हाम्रा बचत खाता विकल्पहरू अन्वेषण गर्नुहोस्', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 26, 'बचत निक्षेप', '/products/savings', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 26, 'सामान्य बचत खाता', '/products/savings/normal-saving-account', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 26, 'लगानीकर्ता बचत खाता', '/products/savings/investor-saving-account', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 26, 'विशेष बचत खाता', '/products/savings/special-saving-account', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 26, 'विद्यार्थी बचत खाता', '/products/savings/student-saving-account', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 26, 'सेयरधनी बचत खाता', '/products/savings/shareholder-saving-account', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 26, 'अपाङ्ग बचत खाता', '/products/savings/pwd-saving-account', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 26, 'धौलागिरी बचत खाता', '/products/savings/dhaulagiri-saving-account', 7);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 26, 'कञ्चनजंगा बचत खाता', '/products/savings/kanchanjunga-saving-account', 8);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 26, 'एभरेस्ट बचत खाता', '/products/savings/everest-saving-account', 9);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 26, 'सुपर बचत खाता', '/products/savings/super-saving-account', 10);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 26, 'गोल्ड बचत खाता', '/products/savings/gold-saving-account', 11);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 26, 'डायमन्ड बचत खाता', '/products/savings/diamond-saving-account', 12);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 26, 'सारथी बचत खाता', '/products/savings/sarathi-saving-account', 13);

INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (2, 3, 'मुद्दती', '/products/fixed-deposits', 'हाम्रा मुद्दती निक्षेप योजनाहरूसँग ग्यारेन्टीड रिटर्न कमाउनुहोस्', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 42, 'मुद्दती निक्षेप', '/products/fixed-deposits', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 42, 'व्यक्तिगत मुद्दती निक्षेप', '/products/fixed-deposits/individual-fixed-deposit', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 42, 'संस्थागत मुद्दती निक्षेप', '/products/fixed-deposits/corporate-fixed-deposit', 2);

INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (2, 3, 'ऋण', '/products/loans', 'हरेक आवश्यकताको लागि लचिलो ऋण समाधान', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 46, 'कृषि ऋण', '/products/loans/agricultural-loan', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 46, 'अटो ऋण', '/products/loans/auto-loan', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 46, 'हायर पर्चेज ऋण', '/products/loans/hire-purchase-loan', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 46, 'शिक्षा ऋण', '/products/loans/education-loan', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 46, 'सेयर ऋण', '/products/loans/share-loan', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 46, 'गृह ऋण', '/products/loans/home-loan', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 46, 'FD ऋण', '/products/loans/fd-loan', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 46, 'व्यक्तिगत ऋण', '/products/loans/personal-loan', 7);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 46, 'व्यवसाय ऋण', '/products/loans/business-loan', 8);

INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (2, 3, 'उपकरणहरू', NULL, 'वित्तीय क्याल्कुलेटर र तुलना उपकरणहरू', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 56, 'उत्पादन तुलना', '/products/compare', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 56, 'सबै क्याल्कुलेटर', '/calculators', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 56, 'ऋण योग्यता', '/loan-eligibility', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 56, 'EMI क्याल्कुलेटर', '/emi-calculator', 3);

-- Rates children
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 4, 'ब्याज दर', '/rates', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 4, 'आधार दर / स्प्रेड दर', '/rates/base-rate-spread-rate', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 4, 'मापदण्ड शुल्क', '/rates/standard-tariff-charges', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 4, 'विदेशी विनिमय दर', '/rates/forex-rates', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 4, 'सुन / चाँदीको दर', '/rates/gold-silver', 4);

-- Publications children
INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (2, 5, 'सूचना', NULL, 'आधिकारिक सूचना र घोषणाहरू', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 63, 'AGM सूचना', '/publications/notices/agm-notice', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 63, 'लाभांश घोषणा', '/publications/notices/dividend-declaration', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 63, 'दावी नगरिएको लाभांश', '/publications/notices/unclaimed-dividend', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 63, 'सूचनाको हक', '/publications/notices/right-to-information', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 63, 'अनुदान ऋण सूची', '/publications/notices/subsidy-loan-list', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 63, 'बोलपत्र सूचना', '/publications/notices/tender-notice', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 63, 'सामान्य सूचना', '/publications/notices/general-notice', 6);

INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 5, 'समाचार', '/publications/news', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 5, 'कार्यक्रम', '/publications/events', 2);

INSERT INTO navigation_items (navigation_id, parent_id, label, href, description, sort_order) VALUES (2, 5, 'प्रतिवेदन', NULL, 'वार्षिक प्रतिवेदन, खुलासा र दर्ताहरू', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 72, 'AGM मिनेट', '/publications/reports/agm-minute', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 72, 'वार्षिक प्रतिवेदन', '/publications/reports/annual-report', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 72, 'त्रैमासिक प्रतिवेदन', '/publications/reports/quarterly-reports', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 72, 'बासेल II खुलासा', '/publications/reports/basel-ii-disclosure', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 72, 'SEBON प्रतिवेदन', '/publications/reports/sebon-report', 4);

INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 5, 'प्रशिक्षण सूची', '/publications/training-list', 4);

-- Services children
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 7, 'मोबाइल बैंकिङ', '/services/mobile-banking', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 7, 'QR टेलर', '/services/qr-teller', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 7, 'connectRTGS', '/services/connect-rtgs', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 7, 'CORPORATEPAY', '/services/corporatepay', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 7, 'C-ASBA', '/services/c-asba', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 7, 'डेबिट कार्ड', '/services/debit-card', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 7, 'ABBS', '/services/abbs', 6);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 7, 'रेमिट्यान्स', '/services/remittance', 7);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 7, 'SMS बैंकिङ', '/services/sms-banking', 8);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 7, 'Connect IPS', '/services/connect-ips', 9);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 7, 'Interbank IPS', '/services/interbank-ips', 10);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 7, 'ECC', '/services/ecc', 11);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 7, 'अपाङ्ग-मैत्री शाखा', '/services/disabled-friendly-branch', 12);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 7, '२४/७ खाता ब्लक', '/services/24-7-account-block', 13);

-- Our Network children
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 8, 'हाम्रा साझेदार', '/partner', 0);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 8, 'शाखाहरू', '/branches', 1);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 8, 'सम्पर्क', '/contact', 2);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 8, 'व्यापारी र प्रस्ताव', '/merchant-offers', 3);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 8, 'RFL ऋण सोधपुछ', '/loan-enquiry', 4);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 8, 'भेटघाट बुक गर्नुहोस्', '/appointments', 5);
INSERT INTO navigation_items (navigation_id, parent_id, label, href, sort_order) VALUES (2, 8, 'ग्राहक अनुभव', '/testimonials', 6);
