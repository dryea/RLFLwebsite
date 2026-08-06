import { CMSNavItem } from "@/types/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "https://rfil-api.sudeepdhakal.workers.dev";

export const fallbackCMSNav: CMSNavItem[] = [
  { id: 1, label: "Home", labelNp: "गृहपृष्ठ", href: "/" },
  {
    id: 2,
    label: "About",
    labelNp: "बारे",
    href: "/about/introduction",
    children: [
      {
        id: 21,
        label: "Organization & Strategy",
        labelNp: "संस्था र रणनीति",
        groupTitle: "Corporate Profile",
        children: [
          { id: 211, label: "Introduction", labelNp: "परिचय", href: "/about/introduction", icon: "Building2", description: "Our legacy, vision & core values" },
          { id: 212, label: "Mission & Goals", labelNp: "लक्ष्य र उद्देश्य", href: "/about/mission-goals", icon: "Target", description: "Strategic principles guiding RFL" },
          { id: 213, label: "Strategic Framework", labelNp: "रणनीतिक ढाँचा", href: "/about/strategic-framework", icon: "Sparkles", description: "Long-term operational roadmap" },
          { id: 214, label: "Key Milestones", labelNp: "उपलब्धिहरू", href: "/about/milestones", icon: "Award", description: "Key achievements since B.S. 2066" },
          { id: 215, label: "Capital Structure", labelNp: "पुँजी संरचना", href: "/about/capital-structure", icon: "PieChart", description: "Shareholding & paid-up capital" },
        ],
      },
      {
        id: 22,
        label: "Leadership & Governance",
        labelNp: "सुशासन र टोली",
        groupTitle: "Leadership & Governance",
        children: [
          { id: 221, label: "Board of Directors", labelNp: "संचालक समिति", href: "/team/board-of-directors", icon: "Users", description: "Board leadership & guidance" },
          { id: 222, label: "Management Team", labelNp: "व्यवस्थापन टोली", href: "/team/management-team", icon: "UserCheck", description: "Executive leadership team" },
          { id: 223, label: "Department Heads", labelNp: "विभाग प्रमुख", href: "/team/head-of-department", icon: "Users", description: "Departmental managers" },
          { id: 224, label: "Branch Managers", labelNp: "शाखा प्रबन्धक", href: "/team/branch-manager", icon: "Building", description: "Branch leadership across Nepal" },
          { id: 225, label: "Committee of Directors", labelNp: "संचालक समिति", href: "/committee-of-directors", icon: "ShieldCheck", description: "Board oversight sub-committees" },
        ],
      },
      {
        id: 23,
        label: "Compliance & Responsibility",
        labelNp: "अनुपालन र उत्तरदायित्व",
        groupTitle: "Compliance & Responsibility",
        children: [
          { id: 231, label: "Grievance Officer", labelNp: "गुनासो अधिकृत", href: "/grievance-handling-officer", icon: "ShieldAlert", description: "Nodal officer for customer concerns" },
          { id: 232, label: "Compliance Officer", labelNp: "अनुपालन अधिकृत", href: "/compliance-officer", icon: "FileCheck", description: "Regulatory compliance officer" },
          { id: 233, label: "Company Secretary", labelNp: "कम्पनी सचिव", href: "/company-secretary", icon: "FileText", description: "Secretarial compliance" },
          { id: 234, label: "Information Officer", labelNp: "सूचना अधिकृत", href: "/information-officer", icon: "HelpCircle", description: "Right to Information contact" },
          { id: 235, label: "Sustainable Banking", labelNp: "दिगो बैंकिङ", href: "/sustainable-banking", icon: "Leaf", description: "E&S risk management & green initiatives" },
          { id: 236, label: "CSR Initiatives", labelNp: "CSR पहलहरू", href: "/csr", icon: "Heart", description: "Social responsibility projects" },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Products",
    labelNp: "उत्पादनहरू",
    href: "/products",
    children: [
      {
        id: 31,
        label: "Savings & Fixed Deposits",
        labelNp: "बचत र मुद्दती",
        groupTitle: "Deposit Schemes",
        children: [
          { id: 311, label: "Savings Accounts Overview", labelNp: "बचत खाताहरूको अवलोकन", href: "/products/savings", icon: "Wallet", badgeText: "Overview", badgeColor: "primary" },
          { id: 312, label: "Everest Saving Account", labelNp: "एभरेस्ट बचत खाता", href: "/products/savings/everest-saving-account", icon: "Sparkles", badgeText: "5.50% p.a.", badgeColor: "secondary" },
          { id: 313, label: "Gold Saving Account", labelNp: "गोल्ड बचत खाता", href: "/products/savings/gold-saving-account", icon: "Coins", badgeText: "5.75% p.a.", badgeColor: "accent" },
          { id: 314, label: "Normal Saving Account", labelNp: "सामान्य बचत खाता", href: "/products/savings/normal-saving-account", icon: "Wallet", badgeText: "4.25% p.a." },
          { id: 315, label: "Fixed Deposits Overview", labelNp: "मुद्दती निक्षेपको अवलोकन", href: "/products/fixed-deposits", icon: "Lock", badgeText: "FD" },
          { id: 316, label: "Individual Fixed Deposit", labelNp: "व्यक्तिगत मुद्दती निक्षेप", href: "/products/fixed-deposits/individual-fixed-deposit", icon: "Lock", badgeText: "Up to 6.25%", badgeColor: "success" },
          { id: 317, label: "Corporate Fixed Deposit", labelNp: "संस्थागत मुद्दती निक्षेप", href: "/products/fixed-deposits/corporate-fixed-deposit", icon: "Building", badgeText: "High Yield" },
        ],
      },
      {
        id: 32,
        label: "Loans & Credit Schemes",
        labelNp: "ऋण र कर्जा योजना",
        groupTitle: "Credit Solutions",
        children: [
          { id: 321, label: "Loans Overview", labelNp: "ऋण सेवाहरूको अवलोकन", href: "/products/loans", icon: "Briefcase", badgeText: "Overview" },
          { id: 322, label: "Home & Land Loan", labelNp: "गृह तथा जग्गा ऋण", href: "/products/loans/home-loan", icon: "Home", badgeText: "Low Interest", badgeColor: "secondary" },
          { id: 323, label: "Auto & Vehicle Loan", labelNp: "अटो तथा सवारी ऋण", href: "/products/loans/auto-loan", icon: "Car", description: "Up to 80% vehicle financing" },
          { id: 324, label: "Business & SME Loan", labelNp: "व्यवसाय तथा SME ऋण", href: "/products/loans/business-loan", icon: "Briefcase", badgeText: "Flexible", badgeColor: "primary" },
          { id: 325, label: "Agricultural Loan", labelNp: "कृषि ऋण", href: "/products/loans/agricultural-loan", icon: "Sprout", description: "Subsidized rates for farmers" },
          { id: 326, label: "Education Loan", labelNp: "शिक्षा ऋण", href: "/products/loans/education-loan", icon: "GraduationCap" },
          { id: 327, label: "Share Loan", labelNp: "सेयर ऋण", href: "/products/loans/share-loan", icon: "LineChart", description: "Against demat shares" },
          { id: 328, label: "Hire Purchase Loan", labelNp: "हायर पर्चेज ऋण", href: "/products/loans/hire-purchase-loan", icon: "Car" },
        ],
      },
      {
        id: 33,
        label: "Calculators & Tools",
        labelNp: "क्याल्कुलेटर र उपकरणहरू",
        groupTitle: "Financial Tools",
        children: [
          { id: 331, label: "EMI Calculator", labelNp: "EMI क्याल्कुलेटर", href: "/emi-calculator", icon: "Calculator", badgeText: "Interactive", badgeColor: "secondary" },
          { id: 332, label: "Financial Calculators Hub", labelNp: "सबै क्याल्कुलेटर", href: "/calculators", icon: "Calculator" },
          { id: 333, label: "Compare Products", labelNp: "उत्पादन तुलना", href: "/products/compare", icon: "Scale" },
          { id: 334, label: "Check Loan Eligibility", labelNp: "ऋण योग्यता जाँच", href: "/loan-eligibility", icon: "CheckCircle2" },
          { id: 335, label: "Loan Enquiry Form", labelNp: "ऋण सोधपुछ फारम", href: "/loan-enquiry", icon: "FileText", badgeText: "Apply" },
        ],
      },
    ],
  },
  {
    id: 4,
    label: "Rates",
    labelNp: "दरहरू",
    href: "/rates",
    children: [
      {
        id: 41,
        label: "Rate Schedules",
        labelNp: "दर अनुसूचीहरू",
        groupTitle: "Official Tariffs & Rates",
        children: [
          { id: 411, label: "Interest Rate Schedule", labelNp: "ब्याज दर अनुसूची", href: "/rates", icon: "Percent", badgeText: "Updated", badgeColor: "success" },
          { id: 412, label: "Base Rate & Spread Rate", labelNp: "आधार दर / स्प्रेड दर", href: "/rates/base-rate-spread-rate", icon: "TrendingUp" },
          { id: 413, label: "Standard Tariff Charges", labelNp: "मापदण्ड शुल्क", href: "/rates/standard-tariff-charges", icon: "Receipt" },
          { id: 414, label: "Forex Exchange Rates", labelNp: "विदेशी मुद्रा दर", href: "/rates/forex-rates", icon: "ArrowLeftRight" },
          { id: 415, label: "Gold & Silver Rates", labelNp: "सुन / चाँदीको दर", href: "/rates/gold-silver", icon: "Coins" },
        ],
      },
    ],
  },
  {
    id: 5,
    label: "Publications",
    labelNp: "प्रकाशनहरू",
    href: "/publications/news",
    children: [
      {
        id: 51,
        label: "Notices & Disclosures",
        labelNp: "सूचना र खुलासहरू",
        groupTitle: "Notices & Disclosures",
        children: [
          { id: 511, label: "General Notices", labelNp: "सामान्य सूचना", href: "/publications/notices/general-notice", icon: "BellRing", badgeText: "Active", badgeColor: "primary" },
          { id: 512, label: "Auction Notices", labelNp: "लिलाम सूचना", href: "/auction-notice", icon: "BellRing", badgeText: "Auctions", badgeColor: "secondary" },
          { id: 513, label: "AGM Notices", labelNp: "AGM सूचना", href: "/publications/notices/agm-notice", icon: "FileText" },
          { id: 514, label: "Dividend Declarations", labelNp: "लाभांश घोषणा", href: "/publications/notices/dividend-declaration", icon: "Coins" },
          { id: 515, label: "Unclaimed Dividend List", labelNp: "दावी नगरिएको लाभांश", href: "/publications/notices/unclaimed-dividend", icon: "Receipt" },
          { id: 516, label: "Right to Information", labelNp: "सूचनाको हक", href: "/publications/notices/right-to-information", icon: "HelpCircle" },
        ],
      },
      {
        id: 52,
        label: "Financial Reports",
        labelNp: "वित्तीय प्रतिवेदनहरू",
        groupTitle: "Financial Disclosures",
        children: [
          { id: 521, label: "Annual Reports", labelNp: "वार्षिक प्रतिवेदन", href: "/publications/reports/annual-report", icon: "FileText" },
          { id: 522, label: "Quarterly Reports", labelNp: "त्रैमासिक प्रतिवेदन", href: "/publications/reports/quarterly-reports", icon: "FileBarChart" },
          { id: 523, label: "Basel II Disclosures", labelNp: "बासेल II खुलासा", href: "/publications/reports/basel-ii-disclosure", icon: "ShieldCheck" },
          { id: 524, label: "SEBON Reports", labelNp: "SEBON प्रतिवेदन", href: "/publications/reports/sebon-report", icon: "FileCheck" },
        ],
      },
      {
        id: 53,
        label: "News, Events & Media",
        labelNp: "समाचार, कार्यक्रम र मिडिया",
        groupTitle: "Media & Events",
        children: [
          { id: 531, label: "News & Press Releases", labelNp: "समाचार र विज्ञप्ति", href: "/publications/news", icon: "Newspaper" },
          { id: 532, label: "Events & Workshops", labelNp: "कार्यक्रमहरू", href: "/publications/events", icon: "Calendar" },
          { id: 533, label: "Training List", labelNp: "प्रशिक्षण सूची", href: "/publications/training-list", icon: "GraduationCap" },
          { id: 534, label: "Photo & Video Gallery", labelNp: "ग्यालरी", href: "/gallery", icon: "Sparkles" },
        ],
      },
    ],
  },
  {
    id: 6,
    label: "Services",
    labelNp: "सेवाहरू",
    href: "/services",
    children: [
      {
        id: 61,
        label: "Digital & Electronic Banking",
        labelNp: "डिजिटल र इलेक्ट्रोनिक बैंकिङ",
        groupTitle: "Digital Payments & Portals",
        children: [
          { id: 611, label: "RFL Smart Mobile Banking", labelNp: "स्मार्ट मोबाइल बैंकिङ", href: "/services/mobile-banking", icon: "Smartphone", badgeText: "Fonepay", badgeColor: "secondary" },
          { id: 612, label: "connectIPS Payments", labelNp: "ConnectIPS सञ्जाल", href: "/services/connect-ips", icon: "Zap" },
          { id: 613, label: "CORPORATEPAY Portal", labelNp: "कारोबार पे", href: "/services/corporatepay", icon: "Building2" },
          { id: 614, label: "Debit Card Services", labelNp: "डेबिट कार्ड", href: "/services/debit-card", icon: "CreditCard" },
          { id: 615, label: "QR Teller Counter", labelNp: "QR काउन्टर", href: "/services/qr-teller", icon: "QrCode" },
          { id: 616, label: "C-ASBA Online Application", labelNp: "C-ASBA सेवा", href: "/services/c-asba", icon: "CheckCircle2" },
        ],
      },
      {
        id: 62,
        label: "Remittance & Branch Services",
        labelNp: "रेमिट्यान्स र शाखा सेवाहरू",
        groupTitle: "Remittance & Counter Services",
        children: [
          { id: 621, label: "Remittance Services", labelNp: "रेमिट्यान्स सेवा", href: "/services/remittance", icon: "Globe", badgeText: "Global" },
          { id: 622, label: "ABBS Any Branch Banking", labelNp: "ABBS बैंकिङ", href: "/services/abbs", icon: "Building" },
          { id: 623, label: "SMS Banking Alerts", labelNp: "SMS बैंकिङ", href: "/services/sms-banking", icon: "Smartphone" },
          { id: 624, label: "ECC Cheque Clearing", labelNp: "ECC चेकिङ", href: "/services/ecc", icon: "Receipt" },
          { id: 625, label: "Disabled-Friendly Branches", labelNp: "अपाङ्ग-मैत्री शाखा", href: "/services/disabled-friendly-branch", icon: "Users" },
          { id: 626, label: "24/7 Account Blocking", labelNp: "२४/७ खाता ब्लक", href: "/services/24-7-account-block", icon: "ShieldAlert", badgeText: "Emergency" },
        ],
      },
    ],
  },
  {
    id: 7,
    label: "Our Network",
    labelNp: "हाम्रो सञ्जाल",
    href: "/branches",
    children: [
      {
        id: 71,
        label: "Locations & Partners",
        labelNp: "शाखा र साझेदारहरू",
        groupTitle: "Reach & Network",
        children: [
          { id: 711, label: "Branch Network Directory", labelNp: "शाखाहरू", href: "/branches", icon: "MapPin", badgeText: "21 Branches", badgeColor: "primary" },
          { id: 712, label: "Our Network Overview", labelNp: "सञ्जाल अवलोकन", href: "/our-network", icon: "Globe" },
          { id: 713, label: "Remittance Partners", labelNp: "रेमिट्यान्स साझेदार", href: "/partner", icon: "Users" },
          { id: 714, label: "Merchant Offers & Discounts", labelNp: "व्यापारी र प्रस्ताव", href: "/merchant-offers", icon: "ShoppingBag", badgeText: "Offers", badgeColor: "secondary" },
        ],
      },
      {
        id: 72,
        label: "Contact & Support",
        labelNp: "सम्पर्क र समर्थन",
        groupTitle: "Customer Support",
        children: [
          { id: 721, label: "Contact Us", labelNp: "सम्पर्क", href: "/contact", icon: "Phone" },
          { id: 722, label: "Open Account Online", labelNp: "खाता खोल्नुहोस्", href: "/open-account", icon: "Wallet", badgeText: "Online", badgeColor: "success" },
          { id: 723, label: "Application Status Check", labelNp: "आवेदन स्थिति", href: "/application-status", icon: "CheckCircle2" },
          { id: 724, label: "Book Appointment", labelNp: "भेटघाट बुक गर्नुहोस्", href: "/appointments", icon: "Calendar" },
          { id: 725, label: "Career Opportunities", labelNp: "करियर", href: "/careers", icon: "Briefcase" },
          { id: 726, label: "Banking Hours", labelNp: "बैंकिङ समय", href: "/banking-hours", icon: "Receipt" },
          { id: 727, label: "Downloads & Forms", labelNp: "डाउनलोडहरू", href: "/downloads", icon: "FileText" },
          { id: 728, label: "Write to Us / Feedback", labelNp: "हामीलाई लेख्नुहोस्", href: "/write-to-us", icon: "HelpCircle" },
        ],
      },
    ],
  },
];

export async function fetchCMSNavigation(slug: string, locale = "en"): Promise<CMSNavItem[]> {
  try {
    const res = await fetch(`${API}/api/navigation/${slug}?locale=${locale}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return fallbackCMSNav;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return data;
    return fallbackCMSNav;
  } catch {
    return fallbackCMSNav;
  }
}
