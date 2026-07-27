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
      { en: "Gallery", np: "ग्यालरी", href: "/gallery" },
      { en: "Calendar", np: "पात्रो", href: "/calendar" },
      { en: "Interest Rates", np: "ब्याज दर", href: "/rates/interest-rates" },
      { en: "Base Rate / Spread Rate", np: "आधार दर", href: "/rates/base-rate-spread-rate" },
      { en: "Check Right Share Eligibility", np: "अधिकार शेयर योग्यता जाँच", href: "https://sunrisecapital.com.np/Right-Eligibility", external: true },
      { en: "Check Web Mail", np: "वेब मेल जाँच", href: "https://makuri.accessworld.net:2096/", external: true },
    ],
  },
  links: [
    { en: "Career", np: "करियर", href: "/careers" },
    { en: "Vacancy", np: "रिक्त पद", href: "/careers" },
    { en: "Branches", np: "शाखाहरू", href: "/branches" },
    { en: "Banking Hours", np: "बैंकिङ समय", href: "/banking-hours" },
    { en: "Downloads", np: "डाउनलोड", href: "/downloads" },
  ],
};

export const mainNav: NavItem[] = [
  { label: "Home", labelNp: "गृहपृष्ठ", href: "/" },
  {
    label: "About", labelNp: "बारे",
    children: [
      { label: "Introduction", labelNp: "परिचय", href: "/about/introduction" },
      { label: "Mission & Goals", labelNp: "लक्ष्य र उद्देश्य", href: "/about/mission-goals" },
      { label: "Strategic Framework", labelNp: "रणनीतिक ढाँचा", href: "/about/strategic-framework" },
      { label: "Milestones", labelNp: "उपलब्धिहरू", href: "/about/milestones" },
      { label: "Capital Structure", labelNp: "पुँजी संरचना", href: "/about/capital-structure" },
      { label: "Board of Directors", labelNp: "संचालक समिति", href: "/team/board-of-directors" },
      {
        label: "Governance", labelNp: "सुशासन",
        children: [
          { label: "Committee of Directors", labelNp: "संचालक समिति", href: "/committee-of-directors" },
          { label: "Management Team", labelNp: "व्यवस्थापन टोली", href: "/team/management-team" },
          { label: "Head of Department", labelNp: "विभाग प्रमुख", href: "/team/head-of-department" },
          { label: "Branch Manager", labelNp: "शाखा प्रबन्धक", href: "/team/branch-manager" },
          { label: "Grievance Officer", labelNp: "गुनासो अधिकृत", href: "/grievance-handling-officer" },
          { label: "Sustainable Banking", labelNp: "दिगो बैंकिङ", href: "/sustainable-banking" },
          { label: "Environmental Activities", labelNp: "वातावरणीय गतिविधि", href: "/environmental-financial-activities" },
          { label: "Compliance Officer", labelNp: "अनुपालन अधिकृत", href: "/compliance-officer" },
          { label: "Company Secretary", labelNp: "कम्पनी सचिव", href: "/company-secretary" },
          { label: "CSR", labelNp: "CSR", href: "/csr" },
        ],
      },
      { label: "Privacy Policy", labelNp: "गोपनीयता नीति", href: "/about/privacy-policy" },
      { label: "FAQ", labelNp: "प्रायः सोधिने प्रश्न", href: "/faq" },
    ],
  },
  {
    label: "Products", labelNp: "उत्पादनहरू",
    children: [
      {
        label: "Saving", labelNp: "बचत",
        children: [
          { label: "Saving Deposit", labelNp: "बचत निक्षेप", href: "/products/savings" },
          { label: "Normal Saving Account", labelNp: "सामान्य बचत खाता", href: "/products/savings/normal-saving-account" },
          { label: "Investor's Saving Account", labelNp: "लगानीकर्ता बचत खाता", href: "/products/savings/investor-saving-account" },
          { label: "Special Saving Account", labelNp: "विशेष बचत खाता", href: "/products/savings/special-saving-account" },
          { label: "Student Saving Account", labelNp: "विद्यार्थी बचत खाता", href: "/products/savings/student-saving-account" },
          { label: "Shareholder's Saving Account", labelNp: "सेयरधनी बचत खाता", href: "/products/savings/shareholder-saving-account" },
          { label: "PWD Saving Account", labelNp: "अपाङ्ग बचत खाता", href: "/products/savings/pwd-saving-account" },
          { label: "Dhaulagiri Saving Account", labelNp: "धौलागिरी बचत खाता", href: "/products/savings/dhaulagiri-saving-account" },
          { label: "Kanchanjunga Saving Account", labelNp: "कञ्चनजंगा बचत खाता", href: "/products/savings/kanchanjunga-saving-account" },
          { label: "Everest Saving Account", labelNp: "एभरेस्ट बचत खाता", href: "/products/savings/everest-saving-account" },
          { label: "Super Saving Account", labelNp: "सुपर बचत खाता", href: "/products/savings/super-saving-account" },
          { label: "Gold Saving Account", labelNp: "गोल्ड बचत खाता", href: "/products/savings/gold-saving-account" },
          { label: "Diamond Saving Account", labelNp: "डायमन्ड बचत खाता", href: "/products/savings/diamond-saving-account" },
          { label: "Sarathi Saving Account", labelNp: "सारथी बचत खाता", href: "/products/savings/sarathi-saving-account" },
        ],
      },
      {
        label: "Fixed", labelNp: "मुद्दती",
        children: [
          { label: "Fixed Deposit", labelNp: "मुद्दती निक्षेप", href: "/products/fixed-deposits" },
          { label: "Individual Fixed Deposit", labelNp: "व्यक्तिगत मुद्दती निक्षेप", href: "/products/fixed-deposits/individual-fixed-deposit" },
          { label: "Corporate Fixed Deposit", labelNp: "संस्थागत मुद्दती निक्षेप", href: "/products/fixed-deposits/corporate-fixed-deposit" },
        ],
      },
      {
        label: "Loan", labelNp: "ऋण",
        children: [
          { label: "Agricultural Loan", labelNp: "कृषि ऋण", href: "/products/loans/agricultural-loan" },
          { label: "Auto Loan", labelNp: "अटो ऋण", href: "/products/loans/auto-loan" },
          { label: "Hire Purchase Loan", labelNp: "हायर पर्चेज ऋण", href: "/products/loans/hire-purchase-loan" },
          { label: "Education Loan", labelNp: "शिक्षा ऋण", href: "/products/loans/education-loan" },
          { label: "Share Loan", labelNp: "सेयर ऋण", href: "/products/loans/share-loan" },
          { label: "Home Loan", labelNp: "गृह ऋण", href: "/products/loans/home-loan" },
          { label: "FD Loan", labelNp: "FD ऋण", href: "/products/loans/fd-loan" },
          { label: "Personal Loan", labelNp: "व्यक्तिगत ऋण", href: "/products/loans/personal-loan" },
          { label: "Business Loan", labelNp: "व्यवसाय ऋण", href: "/products/loans/business-loan" },
        ],
      },
    ],
  },
  {
    label: "Rates", labelNp: "दरहरू",
    children: [
      { label: "Interest Rate", labelNp: "ब्याज दर", href: "/rates/interest-rates" },
      { label: "Base Rate / Spread Rate", labelNp: "आधार दर / स्प्रेड दर", href: "/rates/base-rate-spread-rate" },
      { label: "Standard Tariff Charges", labelNp: "मापदण्ड शुल्क", href: "/rates/standard-tariff-charges" },
      { label: "Forex Rates", labelNp: "विदेशी विनिमय दर", href: "/rates/forex-rates" },
    ],
  },
  {
    label: "Publications", labelNp: "प्रकाशनहरू",
    children: [
      {
        label: "Notice", labelNp: "सूचना",
        children: [
          { label: "AGM Notice", labelNp: "AGM सूचना", href: "/publications/notices/agm-notice" },
          { label: "Dividend Declaration", labelNp: "लाभांश घोषणा", href: "/publications/notices/dividend-declaration" },
          { label: "Unclaimed Dividend", labelNp: "दावी नगरिएको लाभांश", href: "/publications/notices/unclaimed-dividend" },
          { label: "Right to Information", labelNp: "सूचनाको हक", href: "/publications/notices/right-to-information" },
          { label: "Subsidy Loan List", labelNp: "अनुदान ऋण सूची", href: "/publications/notices/subsidy-loan-list" },
          { label: "Tender Notice", labelNp: "बोलपत्र सूचना", href: "/publications/notices/tender-notice" },
          { label: "General Notice", labelNp: "सामान्य सूचना", href: "/publications/notices/general-notice" },
        ],
      },
      { label: "News", labelNp: "समाचार", href: "/publications/news" },
      { label: "Events", labelNp: "कार्यक्रम", href: "/publications/events" },
      {
        label: "Report", labelNp: "प्रतिवेदन",
        children: [
          { label: "AGM Minute", labelNp: "AGM मिनेट", href: "/publications/reports/agm-minute" },
          { label: "Annual Report", labelNp: "वार्षिक प्रतिवेदन", href: "/publications/reports/annual-report" },
          { label: "Quarterly Reports", labelNp: "त्रैमासिक प्रतिवेदन", href: "/publications/reports/quarterly-reports" },
          { label: "Base Rate / Spread Rate", labelNp: "आधार दर", href: "/rates/base-rate-spread-rate" },
          { label: "Basel II Disclosure", labelNp: "बासेल II खुलासा", href: "/publications/reports/basel-ii-disclosure" },
          { label: "SEBON Report", labelNp: "SEBON प्रतिवेदन", href: "/publications/reports/sebon-report" },
        ],
      },
      { label: "Training List", labelNp: "प्रशिक्षण सूची", href: "/publications/training-list" },
    ],
  },
  { label: "Auction Notice", labelNp: "लिलाम सूचना", href: "/auction-notice" },
  {
    label: "Services", labelNp: "सेवाहरू",
    children: [
      { label: "Mobile Banking", labelNp: "मोबाइल बैंकिङ", href: "/services/mobile-banking" },
      { label: "QR Teller", labelNp: "QR टेलर", href: "/services/qr-teller" },
      { label: "connectRTGS", labelNp: "connectRTGS", href: "/services/connect-rtgs" },
      { label: "CORPORATEPAY", labelNp: "CORPORATEPAY", href: "/services/corporatepay" },
      { label: "C-ASBA", labelNp: "C-ASBA", href: "/services/c-asba" },
      { label: "Debit Card", labelNp: "डेबिट कार्ड", href: "/services/debit-card" },
      { label: "ABBS", labelNp: "ABBS", href: "/services/abbs" },
      { label: "Remittance", labelNp: "रेमिट्यान्स", href: "/services/remittance" },
      { label: "SMS Banking", labelNp: "SMS बैंकिङ", href: "/services/sms-banking" },
      { label: "Connect IPS", labelNp: "Connect IPS", href: "/services/connect-ips" },
      { label: "Interbank IPS", labelNp: "Interbank IPS", href: "/services/interbank-ips" },
      { label: "ECC", labelNp: "ECC", href: "/services/ecc" },
      { label: "Disabled-Friendly Branch", labelNp: "अपाङ्ग-मैत्री शाखा", href: "/services/disabled-friendly-branch" },
      { label: "24/7 Account Block", labelNp: "२४/७ खाता ब्लक", href: "/services/24-7-account-block" },
    ],
  },
  {
    label: "Our Network", labelNp: "हाम्रो सञ्जाल",
    children: [
      { label: "Our Partners", labelNp: "हाम्रा साझेदार", href: "/partner" },
      { label: "Branches", labelNp: "शाखाहरू", href: "/branches" },
      { label: "Contact Us", labelNp: "सम्पर्क", href: "/contact" },
      { label: "Merchant & Offers", labelNp: "व्यापारी र प्रस्ताव", href: "/merchant-offers" },
      { label: "RFL Loan Enquiry", labelNp: "RFL ऋण सोधपुछ", href: "/loan-enquiry" },
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
      { en: "Notice", np: "सूचना", href: "/publications/notices/general-notice" },
      { en: "News", np: "समाचार", href: "/publications/news" },
      { en: "Events", np: "कार्यक्रम", href: "/publications/events" },
      { en: "Training List", np: "प्रशिक्षण सूची", href: "/publications/training-list" },
    ],
  },
  {
    title: { en: "Rates", np: "दरहरू" },
    links: [
      { en: "Interest Rate", np: "ब्याज दर", href: "/rates/interest-rates" },
      { en: "Base Rate / Spread Rate", np: "आधार दर / स्प्रेड दर", href: "/rates/base-rate-spread-rate" },
      { en: "Standard Tariff Charges", np: "मापदण्ड शुल्क", href: "/rates/standard-tariff-charges" },
      { en: "Forex Rates", np: "विदेशी विनिमय दर", href: "/rates/forex-rates" },
    ],
  },
  {
    title: { en: "EMI Calculator", np: "EMI क्याल्कुलेटर" },
    links: [
      { en: "Calculate EMI", np: "EMI गणना गर्नुहोस्", href: "/emi-calculator" },
    ],
  },
];

export const footerAboutLinks = {
  title: { en: "About", np: "बारे" },
  links: [
    { en: "Introduction", np: "परिचय", href: "/about/introduction" },
    { en: "Mission & Goals", np: "लक्ष्य र उद्देश्य", href: "/about/mission-goals" },
    { en: "Board of Directors", np: "संचालक समिति", href: "/team/board-of-directors" },
    { en: "CSR", np: "CSR", href: "/csr" },
    { en: "FAQ", np: "प्रायः सोधिने प्रश्न", href: "/faq" },
  ],
};

export const footerServices = {
  title: { en: "Services", np: "सेवाहरू" },
  links: [
    { en: "Mobile Banking", np: "मोबाइल बैंकिङ", href: "/services/mobile-banking" },
    { en: "Debit Card", np: "डेबिट कार्ड", href: "/services/debit-card" },
    { en: "Remittance", np: "रेमिट्यान्स", href: "/services/remittance" },
    { en: "SMS Banking", np: "SMS बैंकिङ", href: "/services/sms-banking" },
    { en: "QR Teller", np: "QR टेलर", href: "/services/qr-teller" },
  ],
};

export const footerContact = {
  title: { en: "Contact", np: "सम्पर्क" },
  phone: "+977–01–5361104",
  email: "info@reliancenepal.com.np",
  address: { en: "Reliance Bhawan, Kamaladi, Kathmandu, Nepal", np: "रिलायन्स भवन, कमलादी, काठमाडौं, नेपाल" },
};

export const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/reliancenepal/", icon: "facebook" },
  { name: "Twitter", href: "https://twitter.com/reliancenepal", icon: "twitter" },
  { name: "YouTube", href: "https://www.youtube.com/@reliancenepal", icon: "youtube" },
  { name: "LinkedIn", href: "https://np.linkedin.com/company/reliancenepal", icon: "linkedin" },
  { name: "Instagram", href: "https://www.instagram.com/reliancenepal/", icon: "instagram" },
];
