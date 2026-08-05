export interface NavItem {
  label: string;
  labelNp?: string;
  href?: string;
  children?: NavItem[];
}

export const topBarLinks = {
  phone: "+977–01–5361104",
  email: "info@reliancenepal.com.np",
  loanEnquiry: { en: "Loan Enquiry Form", np: "ऋण सोधपुछ फारम", href: "/loan-enquiry" },
  grievance: {
    label: { en: "Grievance", np: "गुनासो" },
    items: [
      { en: "RFL Grievance", np: "RFL गुनासो", href: "/write-to-us" },
      { en: "NRB Grievance", np: "NRB गुनासो", href: "https://gunaso.nrb.org.np/", external: true },
      { en: "Grievance Officer", np: "गुनासो अधिकृत", href: "/grievance-handling-officer" },
      { en: "Compliance Officer", np: "अनुपालन अधिकृत", href: "/compliance-officer" },
    ],
  },
  quickLinks: {
    label: { en: "Quick Links", np: "द्रुत लिङ्क" },
    items: [
      { en: "Introduction", np: "परिचय", href: "/about/introduction" },
      { en: "EMI Calculator", np: "EMI क्याल्कुलेटर", href: "/emi-calculator" },
      { en: "All Calculators", np: "सबै क्याल्कुलेटर", href: "/calculators" },
      { en: "Loan Eligibility", np: "ऋण योग्यता", href: "/loan-eligibility" },
      { en: "Product Compare", np: "उत्पादन तुलना", href: "/products/compare" },
      { en: "Gallery", np: "ग्यालरी", href: "/gallery" },
      { en: "Calendar", np: "पात्रो", href: "/calendar" },
      { en: "Interest Rates", np: "ब्याज दर", href: "/rates" },
      { en: "Base Rate / Spread Rate", np: "आधार दर", href: "/rates/base-rate-spread-rate" },
      { en: "Check Right Share Eligibility", np: "अधिकार शेयर योग्यता जाँच", href: "https://sunrisecapital.com.np/Right-Eligibility", external: true },
      { en: "Check Web Mail", np: "वेब मेल जाँच", href: "https://makuri.accessworld.net:2096/", external: true },
    ],
  },
  links: [
    { en: "Career", np: "करियर", href: "/careers" },
    { en: "Branches", np: "शाखाहरू", href: "/branches" },
    { en: "Banking Hours", np: "बैंकिङ समय", href: "/banking-hours" },
    { en: "Downloads", np: "डाउनलोड", href: "/downloads" },
  ],
};

export const mainNav: NavItem[] = [
  { label: "Home", labelNp: "गृहपृष्ठ", href: "/" },
  {
    label: "About", labelNp: "बारे", href: "/about/introduction",
    children: [
      { label: "Introduction", labelNp: "परिचय", href: "/about/introduction" },
      { label: "Mission & Goals", labelNp: "लक्ष्य र उद्देश्य", href: "/about/mission-goals" },
      { label: "Strategic Framework", labelNp: "रणनीतिक ढाँचा", href: "/about/strategic-framework" },
      { label: "Milestones", labelNp: "उपलब्धिहरू", href: "/about/milestones" },
      { label: "Capital Structure", labelNp: "पुँजी संरचना", href: "/about/capital-structure" },
      { label: "Board of Directors", labelNp: "संचालक समिति", href: "/team/board-of-directors" },
      { label: "Management Team", labelNp: "व्यवस्थापन टोली", href: "/team/management-team" },
      { label: "Department Heads", labelNp: "विभाग प्रमुख", href: "/team/head-of-department" },
      { label: "Branch Managers", labelNp: "शाखा प्रबन्धक", href: "/team/branch-manager" },
      { label: "Committee of Directors", labelNp: "संचालक समिति समिति", href: "/committee-of-directors" },
      { label: "Grievance Officer", labelNp: "गुनासो अधिकृत", href: "/grievance-handling-officer" },
      { label: "Compliance Officer", labelNp: "अनुपालन अधिकृत", href: "/compliance-officer" },
      { label: "Company Secretary", labelNp: "कम्पनी सचिव", href: "/company-secretary" },
      { label: "Information Officer", labelNp: "सूचना अधिकृत", href: "/information-officer" },
      { label: "Sustainable Banking", labelNp: "दिगो बैंकिङ", href: "/sustainable-banking" },
      { label: "CSR Initiatives", labelNp: "CSR पहलहरू", href: "/csr" },
    ],
  },
  {
    label: "Products", labelNp: "उत्पादनहरू", href: "/products",
    children: [
      { label: "Savings Accounts", labelNp: "बचत खाताहरू", href: "/products/savings" },
      { label: "Everest Saving Account", labelNp: "एभरेस्ट बचत खाता", href: "/products/savings/everest-saving-account" },
      { label: "Gold Saving Account", labelNp: "गोल्ड बचत खाता", href: "/products/savings/gold-saving-account" },
      { label: "Normal Saving Account", labelNp: "सामान्य बचत खाता", href: "/products/savings/normal-saving-account" },
      { label: "Fixed Deposits", labelNp: "मुद्दती निक्षेप", href: "/products/fixed-deposits" },
      { label: "Individual Fixed Deposit", labelNp: "व्यक्तिगत मुद्दती निक्षेप", href: "/products/fixed-deposits/individual-fixed-deposit" },
      { label: "Corporate Fixed Deposit", labelNp: "संस्थागत मुद्दती निक्षेप", href: "/products/fixed-deposits/corporate-fixed-deposit" },
      { label: "Loans Overview", labelNp: "ऋण सेवाहरू", href: "/products/loans" },
      { label: "Home & Land Loan", labelNp: "गृह तथा जग्गा ऋण", href: "/products/loans/home-loan" },
      { label: "Auto & Vehicle Loan", labelNp: "अटो तथा सवारी ऋण", href: "/products/loans/auto-loan" },
      { label: "Business & SME Loan", labelNp: "व्यवसाय तथा SME ऋण", href: "/products/loans/business-loan" },
      { label: "Agricultural Loan", labelNp: "कृषि ऋण", href: "/products/loans/agricultural-loan" },
      { label: "Education Loan", labelNp: "शिक्षा ऋण", href: "/products/loans/education-loan" },
      { label: "Share Loan", labelNp: "सेयर ऋण", href: "/products/loans/share-loan" },
      { label: "Hire Purchase Loan", labelNp: "हायर पर्चेज ऋण", href: "/products/loans/hire-purchase-loan" },
      { label: "EMI Calculator", labelNp: "EMI क्याल्कुलेटर", href: "/emi-calculator" },
      { label: "All Calculators", labelNp: "सबै क्याल्कुलेटर", href: "/calculators" },
      { label: "Compare Products", labelNp: "उत्पादन तुलना", href: "/products/compare" },
      { label: "Loan Eligibility", labelNp: "ऋण योग्यता", href: "/loan-eligibility" },
      { label: "Loan Enquiry Form", labelNp: "ऋण सोधपुछ", href: "/loan-enquiry" },
    ],
  },
  {
    label: "Rates", labelNp: "दरहरू", href: "/rates",
    children: [
      { label: "Interest Rate Schedule", labelNp: "ब्याज दर", href: "/rates" },
      { label: "Base Rate / Spread Rate", labelNp: "आधार दर / स्प्रेड दर", href: "/rates/base-rate-spread-rate" },
      { label: "Standard Tariff Charges", labelNp: "मापदण्ड शुल्क", href: "/rates/standard-tariff-charges" },
      { label: "Forex Rates", labelNp: "विदेशी विनिमय दर", href: "/rates/forex-rates" },
      { label: "Gold / Silver Rates", labelNp: "सुन / चाँदीको दर", href: "/rates/gold-silver" },
    ],
  },
  {
    label: "Publications", labelNp: "प्रकाशनहरू", href: "/publications/news",
    children: [
      { label: "General Notices", labelNp: "सामान्य सूचना", href: "/publications/notices/general-notice" },
      { label: "Auction Notices", labelNp: "लिलाम सूचना", href: "/auction-notice" },
      { label: "AGM Notices", labelNp: "AGM सूचना", href: "/publications/notices/agm-notice" },
      { label: "Dividend Declarations", labelNp: "लाभांश घोषणा", href: "/publications/notices/dividend-declaration" },
      { label: "Unclaimed Dividend", labelNp: "दावी नगरिएको लाभांश", href: "/publications/notices/unclaimed-dividend" },
      { label: "Right to Information", labelNp: "सूचनाको हक", href: "/publications/notices/right-to-information" },
      { label: "Annual Reports", labelNp: "वार्षिक प्रतिवेदन", href: "/publications/reports/annual-report" },
      { label: "Quarterly Reports", labelNp: "त्रैमासिक प्रतिवेदन", href: "/publications/reports/quarterly-reports" },
      { label: "Basel II Disclosure", labelNp: "बासेल II खुलासा", href: "/publications/reports/basel-ii-disclosure" },
      { label: "SEBON Report", labelNp: "SEBON प्रतिवेदन", href: "/publications/reports/sebon-report" },
      { label: "News & Press Releases", labelNp: "समाचार र विज्ञप्ति", href: "/publications/news" },
      { label: "Events & Workshops", labelNp: "कार्यक्रमहरू", href: "/publications/events" },
      { label: "Training List", labelNp: "प्रशिक्षण सूची", href: "/publications/training-list" },
      { label: "Gallery", labelNp: "ग्यालरी", href: "/gallery" },
    ],
  },
  {
    label: "Services", labelNp: "सेवाहरू", href: "/services",
    children: [
      { label: "Mobile Banking", labelNp: "मोबाइल बैंकिङ", href: "/services/mobile-banking" },
      { label: "connectIPS", labelNp: "connectIPS", href: "/services/connect-ips" },
      { label: "CORPORATEPAY", labelNp: "CORPORATEPAY", href: "/services/corporatepay" },
      { label: "Debit Card", labelNp: "डेबिट कार्ड", href: "/services/debit-card" },
      { label: "QR Teller", labelNp: "QR टेलर", href: "/services/qr-teller" },
      { label: "C-ASBA", labelNp: "C-ASBA", href: "/services/c-asba" },
      { label: "Remittance", labelNp: "रेमिट्यान्स", href: "/services/remittance" },
      { label: "ABBS", labelNp: "ABBS", href: "/services/abbs" },
      { label: "SMS Banking", labelNp: "SMS बैंकिङ", href: "/services/sms-banking" },
      { label: "ECC", labelNp: "ECC", href: "/services/ecc" },
      { label: "Disabled-Friendly Branch", labelNp: "अपाङ्ग-मैत्री शाखा", href: "/services/disabled-friendly-branch" },
      { label: "24/7 Account Block", labelNp: "२४/७ खाता ब्लक", href: "/services/24-7-account-block" },
    ],
  },
  {
    label: "Our Network", labelNp: "हाम्रो सञ्जाल", href: "/branches",
    children: [
      { label: "Branch Locations", labelNp: "शाखाहरू", href: "/branches" },
      { label: "Our Network Overview", labelNp: "सञ्जाल अवलोकन", href: "/our-network" },
      { label: "Remittance Partners", labelNp: "साझेदारहरू", href: "/partner" },
      { label: "Merchant & Offers", labelNp: "व्यापारी र प्रस्ताव", href: "/merchant-offers" },
      { label: "Contact Us", labelNp: "सम्पर्क", href: "/contact" },
      { label: "Open Account Online", labelNp: "खाता खोल्नुहोस्", href: "/open-account" },
      { label: "Application Status", labelNp: "आवेदन स्थिति", href: "/application-status" },
      { label: "Book Appointment", labelNp: "भेटघाट बुक गर्नुहोस्", href: "/appointments" },
      { label: "Careers", labelNp: "करियर", href: "/careers" },
      { label: "Banking Hours", labelNp: "बैंकिङ समय", href: "/banking-hours" },
      { label: "Downloads", labelNp: "डाउनलोड", href: "/downloads" },
      { label: "Write to Us", labelNp: "हामीलाई लेख्नुहोस्", href: "/write-to-us" },
    ],
  },
];

export interface FooterSection {
  title: { en: string; np: string };
  links: { en: string; np: string; href: string; external?: boolean }[];
}

export const footerColumns: FooterSection[] = [
  {
    title: { en: "Report", np: "प्रतिवेदन" },
    links: [
      { en: "Annual Report", np: "वार्षिक प्रतिवेदन", href: "/publications/reports/annual-report" },
      { en: "Quarterly Reports", np: "त्रैमासिक प्रतिवेदन", href: "/publications/reports/quarterly-reports" },
      { en: "AGM Minute", np: "AGM मिनेट", href: "/publications/reports/agm-minute" },
      { en: "Basel II Disclosure", np: "बासेल II खुलासा", href: "/publications/reports/basel-ii-disclosure" },
      { en: "SEBON Report", np: "SEBON प्रतिवेदन", href: "/publications/reports/sebon-report" },
    ],
  },
  {
    title: { en: "Media", np: "मिडिया" },
    links: [
      { en: "General Notice", np: "सामान्य सूचना", href: "/publications/notices/general-notice" },
      { en: "Auction Notice", np: "लिलाम सूचना", href: "/auction-notice" },
      { en: "News", np: "समाचार", href: "/publications/news" },
      { en: "Events", np: "कार्यक्रम", href: "/publications/events" },
      { en: "Training List", np: "प्रशिक्षण सूची", href: "/publications/training-list" },
    ],
  },
  {
    title: { en: "Rates", np: "दरहरू" },
    links: [
      { en: "Interest Rate", np: "ब्याज दर", href: "/rates" },
      { en: "Base Rate / Spread Rate", np: "आधार दर / स्प्रेड दर", href: "/rates/base-rate-spread-rate" },
      { en: "Standard Tariff Charges", np: "मापदण्ड शुल्क", href: "/rates/standard-tariff-charges" },
      { en: "Forex Rates", np: "विदेशी विनिमय दर", href: "/rates/forex-rates" },
      { en: "Gold & Silver Rates", np: "सुन / चाँदीको दर", href: "/rates/gold-silver" },
    ],
  },
  {
    title: { en: "EMI Calculator", np: "EMI क्याल्कुलेटर" },
    links: [
      { en: "Calculate EMI", np: "EMI गणना गर्नुहोस्", href: "/emi-calculator" },
      { en: "Loan Eligibility", np: "ऋण योग्यता", href: "/loan-eligibility" },
      { en: "Compare Products", np: "उत्पादन तुलना", href: "/products/compare" },
    ],
  },
];

export const footerAboutLinks = {
  title: { en: "About", np: "बारे" },
  links: [
    { en: "Introduction", np: "परिचय", href: "/about/introduction" },
    { en: "Mission & Goals", np: "लक्ष्य र उद्देश्य", href: "/about/mission-goals" },
    { en: "Board of Directors", np: "संचालक समिति", href: "/team/board-of-directors" },
    { en: "Management Team", np: "व्यवस्थापन टोली", href: "/team/management-team" },
    { en: "CSR", np: "CSR", href: "/csr" },
    { en: "FAQ", np: "प्रायः सोधिने प्रश्न", href: "/faq" },
  ],
};

export const footerServices = {
  title: { en: "Services", np: "सेवाहरू" },
  links: [
    { en: "Mobile Banking", np: "मोबाइल बैंकिङ", href: "/services/mobile-banking" },
    { en: "connectIPS", np: "connectIPS", href: "/services/connect-ips" },
    { en: "CORPORATEPAY", np: "CORPORATEPAY", href: "/services/corporatepay" },
    { en: "Debit Card", np: "डेबिट कार्ड", href: "/services/debit-card" },
    { en: "Remittance", np: "रेमिट्यान्स", href: "/services/remittance" },
    { en: "QR Teller", np: "QR टेलर", href: "/services/qr-teller" },
  ],
};

export const footerContact = {
  title: { en: "Contact", np: "सम्पर्क" },
  phone: "+977–01–5361104",
  phones: ["+977–01–5361104", "5323117", "5361041", "5361167", "5903698"],
  tollFree: "18105000417",
  email: "info@reliancenepal.com.np",
  feedbackEmail: "feedback@reliancenepal.com.np",
  poBox: "20136",
  address: {
    en: "Reliance Bhawan, Kamaladi, Kathmandu-01, Kathmandu Metropolitan, Bagmati Pradesh, Nepal",
    np: "रिलायन्स भवन, कमलादी, काठमाडौं-०१, काठमाडौं महानगरपालिका, बागमती प्रदेश, नेपाल",
  },
};

export const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/reliancefinanceltd/", icon: "facebook" },
  { name: "Instagram", href: "https://www.instagram.com/reliancefinanceltd/", icon: "instagram" },
  { name: "Viber", href: "https://invite.viber.com/?g2=AQBrZz8OAV%2BDHEyStTd00AxchrcNvPbNEo%2Ffod8KjA0xzbM1A6Pw8V7LaSI0EDgv", icon: "viber" },
  { name: "YouTube", href: "https://www.youtube.com/@reliancenepal", icon: "youtube" },
  { name: "LinkedIn", href: "https://np.linkedin.com/company/reliancenepal", icon: "linkedin" },
  { name: "Twitter", href: "https://twitter.com/reliancenepal", icon: "twitter" },
];
