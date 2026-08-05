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
        label: "Company Profile",
        labelNp: "कम्पनी परिचय",
        groupTitle: "Corporate Profile",
        children: [
          { id: 211, label: "Introduction", labelNp: "परिचय", href: "/about/introduction", icon: "Building2", description: "Our legacy, vision & core values" },
          { id: 212, label: "Mission & Goals", labelNp: "लक्ष्य र उद्देश्य", href: "/about/mission-goals", icon: "Target", description: "Strategic principles guiding RFL" },
          { id: 213, label: "Milestones", labelNp: "उपलब्धिहरू", href: "/about/milestones", icon: "Award", description: "Key achievements since B.S. 2066" },
          { id: 214, label: "Capital Structure", labelNp: "पुँजी संरचना", href: "/about/capital-structure", icon: "PieChart", description: "Shareholding & paid-up capital" },
        ],
      },
      {
        id: 22,
        label: "Governance & Team",
        labelNp: "सुशासन र टोली",
        groupTitle: "Leadership & Governance",
        children: [
          { id: 221, label: "Board of Directors", labelNp: "संचालक समिति", href: "/team/board-of-directors", icon: "Users", description: "Board leadership & guidance" },
          { id: 222, label: "Management Team", labelNp: "व्यवस्थापन टोली", href: "/team/management-team", icon: "UserCheck", description: "Executive leadership team" },
          { id: 223, label: "Grievance Officer", labelNp: "गुनासो अधिकृत", href: "/grievance-handling-officer", icon: "ShieldAlert", description: "Nodal officer for customer concerns" },
          { id: 224, label: "Compliance Officer", labelNp: "अनुपालन अधिकृत", href: "/compliance-officer", icon: "FileCheck", description: "Regulatory compliance officer" },
          { id: 225, label: "CSR Initiatives", labelNp: "CSR पहलहरू", href: "/csr", icon: "Heart", description: "Social responsibility projects" },
        ],
      },
      {
        id: 23,
        label: "Featured Governance",
        groupTitle: "Institutional Trust",
        isPromoCard: true,
        imageUrl: "/assets/about-building.jpg",
        description: "Regulated Class C Institution by Nepal Rastra Bank since B.S. 2066.",
        href: "/about/introduction",
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
          { id: 311, label: "Normal Saving Account", labelNp: "सामान्य बचत खाता", href: "/products/savings/normal-saving-account", icon: "Wallet", badgeText: "4.25% p.a.", badgeColor: "primary" },
          { id: 312, label: "Everest Saving Account", labelNp: "एभरेस्ट बचत खाता", href: "/products/savings/everest-saving-account", icon: "Sparkles", badgeText: "5.50% p.a.", badgeColor: "secondary" },
          { id: 313, label: "Gold Saving Account", labelNp: "गोल्ड बचत खाता", href: "/products/savings/gold-saving-account", icon: "Coins", badgeText: "5.75% p.a.", badgeColor: "accent" },
          { id: 314, label: "Individual Fixed Deposit", labelNp: "व्यक्तिगत मुद्दती निक्षेप", href: "/products/fixed-deposits/individual-fixed-deposit", icon: "Lock", badgeText: "Up to 6.25%", badgeColor: "success" },
          { id: 315, label: "Corporate Fixed Deposit", labelNp: "संस्थागत मुद्दती निक्षेप", href: "/products/fixed-deposits/corporate-fixed-deposit", icon: "Building", badgeText: "Competitive", badgeColor: "primary" },
        ],
      },
      {
        id: 32,
        label: "Loans & Credit Schemes",
        labelNp: "ऋण र कर्जा योजना",
        groupTitle: "Credit Solutions",
        children: [
          { id: 321, label: "Home & Land Loan", labelNp: "गृह तथा जग्गा ऋण", href: "/products/loans/home-loan", icon: "Home", badgeText: "Low Interest", badgeColor: "secondary" },
          { id: 322, label: "Auto & Vehicle Loan", labelNp: "अटो तथा सवारी ऋण", href: "/products/loans/auto-loan", icon: "Car", description: "Up to 80% financing" },
          { id: 323, label: "Business & SME Loan", labelNp: "व्यवसाय तथा SME ऋण", href: "/products/loans/business-loan", icon: "Briefcase", badgeText: "Flexible", badgeColor: "primary" },
          { id: 324, label: "Agricultural Loan", labelNp: "कृषि ऋण", href: "/products/loans/agricultural-loan", icon: "Sprout", description: "Subsidized rates for farmers" },
          { id: 325, label: "Share Loan", labelNp: "सेयर ऋण", href: "/products/loans/share-loan", icon: "LineChart", description: "Against demat shares" },
        ],
      },
      {
        id: 33,
        label: "Tools & Comparison",
        groupTitle: "Financial Tools",
        children: [
          { id: 331, label: "EMI Calculator", labelNp: "EMI क्याल्कुलेटर", href: "/emi-calculator", icon: "Calculator", badgeText: "Interactive", badgeColor: "secondary" },
          { id: 332, label: "Compare Products", labelNp: "उत्पादन तुलना", href: "/products/compare", icon: "Scale" },
          { id: 333, label: "Loan Eligibility", labelNp: "ऋण योग्यता", href: "/loan-eligibility", icon: "CheckCircle2" },
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
        groupTitle: "Official Tariffs",
        children: [
          { id: 411, label: "Interest Rate Schedule", labelNp: "ब्याज दर अनुसूची", href: "/rates", icon: "Percent", badgeText: "Updated", badgeColor: "success" },
          { id: 412, label: "Base Rate & Spread Rate", labelNp: "आधार दर / स्प्रेड दर", href: "/rates/base-rate-spread-rate", icon: "TrendingUp" },
          { id: 413, label: "Standard Tariff Charges", labelNp: "मापदण्ड शुल्क", href: "/rates/standard-tariff-charges", icon: "Receipt" },
          { id: 414, label: "Forex Rates", labelNp: "विदेशी मुद्रा दर", href: "/rates/forex-rates", icon: "ArrowLeftRight" },
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
        label: "Reports & Notices",
        groupTitle: "Disclosures & Notices",
        children: [
          { id: 511, label: "General & Auction Notices", labelNp: "सामान्य तथा लिलाम सूचना", href: "/publications/notices/general-notice", icon: "BellRing", badgeText: "Active", badgeColor: "primary" },
          { id: 512, label: "Annual Financial Reports", labelNp: "वार्षिक प्रतिवेदन", href: "/publications/reports/annual-report", icon: "FileText" },
          { id: 513, label: "Quarterly Reports", labelNp: "त्रैमासिक प्रतिवेदन", href: "/publications/reports/quarterly-reports", icon: "FileBarChart" },
          { id: 514, label: "AGM Minutes & Notices", labelNp: "AGM सूचना तथा निर्णय", href: "/publications/reports/agm-minute", icon: "FileCheck" },
        ],
      },
      {
        id: 52,
        label: "Media & Events",
        groupTitle: "Latest Media",
        children: [
          { id: 521, label: "News & Press Releases", labelNp: "समाचार र विज्ञप्ति", href: "/publications/news", icon: "Newspaper" },
          { id: 522, label: "Events & Workshops", labelNp: "कार्यक्रमहरू", href: "/publications/events", icon: "Calendar" },
          { id: 523, label: "Staff Training List", labelNp: "प्रशिक्षण सूची", href: "/publications/training-list", icon: "GraduationCap" },
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
        label: "Digital Services",
        groupTitle: "Digital & Payment Services",
        children: [
          { id: 611, label: "RFL Smart Mobile Banking", labelNp: "स्मार्ट मोबाइल बैंकिङ", href: "/services/mobile-banking", icon: "Smartphone", badgeText: "Fonepay", badgeColor: "secondary" },
          { id: 612, label: "connectIPS & Interbank", labelNp: "ConnectIPS सञ्जाल", href: "/services/connect-ips", icon: "Zap" },
          { id: 613, label: "CORPORATEPAY Portal", labelNp: "कारोबार पे", href: "/services/corporatepay", icon: "Building2" },
          { id: 614, label: "Debit Card Services", labelNp: "डेबिट कार्ड", href: "/services/debit-card", icon: "CreditCard" },
          { id: 615, label: "QR Teller Counter", labelNp: "QR काउन्टर", href: "/services/qr-teller", icon: "QrCode" },
          { id: 616, label: "Remittance Services", labelNp: "रेमिट्यान्स सेवा", href: "/services/remittance", icon: "Globe" },
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
        label: "Network & Reach",
        groupTitle: "Locate Us",
        children: [
          { id: 711, label: "Branch Locations", labelNp: "शाखाहरू", href: "/branches", icon: "MapPin", badgeText: "21 Branches", badgeColor: "primary" },
          { id: 712, label: "Merchant Partners & Offers", labelNp: "व्यापारी र प्रस्ताव", href: "/merchant-offers", icon: "ShoppingBag", badgeText: "Discounts", badgeColor: "secondary" },
          { id: 713, label: "Loan Enquiry Form", labelNp: "ऋण सोधपुछ फारम", href: "/loan-enquiry", icon: "HelpCircle" },
          { id: 714, label: "Contact Us", labelNp: "सम्पर्क", href: "/contact", icon: "Phone" },
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
