import { HandCoins, Home, Car, Briefcase, Sprout, GraduationCap, FileText, Truck, TrendingUp, User, ArrowRight, Calculator } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const loanIcons: Record<string, typeof Home> = {
  home: Home,
  auto: Car,
  business: Briefcase,
  agricultural: Sprout,
  education: GraduationCap,
  fd: FileText,
  "hire-purchase": Truck,
  share: TrendingUp,
  personal: User,
};

type LoanData = {
  slug: string;
  title: { en: string; np: string };
  subtitle: { en: string; np: string };
  description: { en: string; np: string };
  features: { en: string[]; np: string[] };
};

const loans: LoanData[] = [
  {
    slug: "home-loan",
    title: { en: "Home Loan", np: "गृह ऋण" },
    subtitle: { en: "Own Your Dream Home", np: "आफ्नै सपनाको घर" },
    description: {
      en: "Make your dream of owning a home a reality with our competitive home loan options. Whether you're buying a new home, constructing, or renovating, we offer attractive interest rates and flexible repayment terms tailored to your needs.",
      np: "हाम्रो प्रतिस्पर्धी गृह ऋण विकल्पहरूसँग घरको मालिक बन्ने आफ्नो सपनालाई साकार पार्नुहोस्। नयाँ घर किन्दै, निर्माण गर्दै वा मर्मत गर्दै, हामी तपाईंको आवश्यकता अनुसार आकर्षक ब्याज दर र लचिलो भुक्तानी सर्तहरू प्रदान गर्दछौं।",
    },
    features: {
      en: [
        "Up to 60% of property valuation",
        "Repayment tenure up to 25 years",
        "Competitive interest rates",
        "Coverage for purchase, construction & renovation",
        "Simple documentation process",
      ],
      np: [
        "सम्पत्ति मूल्याङ्कनको ६०% सम्म",
        "२५ वर्षसम्म भुक्तानी अवधि",
        "प्रतिस्पर्धी ब्याज दरहरू",
        "खरिद, निर्माण र मर्मतको कभरेज",
        "सरल कागजात प्रक्रिया",
      ],
    },
  },
  {
    slug: "auto-loan",
    title: { en: "Auto Loan", np: "अटो ऋण" },
    subtitle: { en: "Drive Your Dream Vehicle", np: "आफ्नो सपनाको सवारी चलाउनुहोस्" },
    description: {
      en: "Get behind the wheel of your dream vehicle with our hassle-free auto loans. We finance both new and used vehicles with competitive rates and quick approval processes.",
      np: "हाम्रो सहज अटो ऋणको साथ आफ्नो सपनाको सवारी साधन चलाउनुहोस्। हामी प्रतिस्पर्धी दर र द्रुत स्वीकृति प्रक्रियाको साथ नयाँ र प्रयोग गरिएका सवारी साधनहरू दुवैलाई वित्त प्रदान गर्दछौं।",
    },
    features: {
      en: [
        "Up to 80% financing for electric vehicles",
        "Financing for new & used vehicles",
        "Repayment term up to 7 years",
        "Competitive interest rates",
        "Quick approval & disbursement",
      ],
      np: [
        "इलेक्ट्रिक सवारीको लागि ८०% सम्म वित्तपोषण",
        "नयाँ र प्रयोग गरिएका सवारी साधनको वित्तपोषण",
        "७ वर्षसम्म भुक्तानी अवधि",
        "प्रतिस्पर्धी ब्याज दरहरू",
        "द्रुत स्वीकृति र भुक्तानी",
      ],
    },
  },
  {
    slug: "business-loan",
    title: { en: "Business Loan", np: "व्यवसाय ऋण" },
    subtitle: { en: "Fuel Your Business Growth", np: "आफ्नो व्यवसाय वृद्धिलाई बल दिनुहोस्" },
    description: {
      en: "Expand your business with our flexible business loan solutions. From working capital to expansion projects, we provide funding that helps your enterprise thrive in Nepal's growing economy.",
      np: "हाम्रो लचिलो व्यवसाय ऋण समाधानहरूसँग आफ्नो व्यवसाय विस्तार गर्नुहोस्। कार्यशील पुँजीदेखि विस्तार परियोजनाहरूसम्म, हामी नेपालको बढ्दो अर्थतन्त्रमा तपाईंको उद्यमलाई फस्टाउन मद्दत गर्ने कोष प्रदान गर्दछौं।",
    },
    features: {
      en: [
        "Working capital & term loans available",
        "Overdraft facility for flexible fund access",
        "Funding for business expansion & equipment",
        "Customized repayment schedules",
        "Competitive interest rates",
      ],
      np: [
        "कार्यशील पुँजी र मुद्दती ऋण उपलब्ध",
        "लचिलो कोष पहुँचको लागि ओभरड्राफ्ट सुविधा",
        "व्यवसाय विस्तार र उपकरणको लागि कोष",
        "अनुकूलित भुक्तानी तालिका",
        "प्रतिस्पर्धी ब्याज दरहरू",
      ],
    },
  },
  {
    slug: "agricultural-loan",
    title: { en: "Agricultural Loan", np: "कृषि ऋण" },
    subtitle: { en: "Supporting Nepalese Farmers", np: "नेपाली किसानहरूलाई सहयोग गर्दै" },
    description: {
      en: "Empowering Nepal's agricultural sector with specialized loan products. We support farmers, agribusinesses, and cooperatives with subsidized rates and flexible terms tailored to agricultural cycles.",
      np: "विशेष ऋण उत्पादनहरूसँग नेपालको कृषि क्षेत्रलाई सशक्त बनाउँदै। हामी किसान, कृषि व्यवसाय र सहकारी संस्थाहरूलाई अनुदानित दर र कृषि चक्र अनुसार लचिलो सर्तहरूको साथ सहयोग गर्दछौं।",
    },
    features: {
      en: [
        "Subsidized interest rates as per NRB directives",
        "No collateral required for small farmers",
        "Flexible repayment aligned with harvest cycles",
        "Financing for livestock, crops & equipment",
        "Support for commercial farming ventures",
      ],
      np: [
        "नेपाल राष्ट्र बैंक निर्देशन अनुसार अनुदानित ब्याज दर",
        "साना किसानहरूको लागि धितो आवश्यक छैन",
        "बाली चक्र अनुसार लचिलो भुक्तानी",
        "पशुधन, बाली र उपकरणको लागि वित्तपोषण",
        "व्यावसायिक कृषि उद्यमहरूको लागि सहयोग",
      ],
    },
  },
  {
    slug: "education-loan",
    title: { en: "Education Loan", np: "शिक्षा ऋण" },
    subtitle: { en: "Invest in Your Future", np: "आफ्नो भविष्यमा लगानी गर्नुहोस्" },
    description: {
      en: "Pursue your academic dreams without financial worries. Our education loans cover tuition, accommodation, and other educational expenses for studies in Nepal and abroad.",
      np: "आर्थिक चिन्ता बिना आफ्नो शैक्षिक सपना पूरा गर्नुहोस्। हाम्रो शिक्षा ऋणले नेपाल र विदेशमा अध्ययनको लागि शुल्क, आवास र अन्य शैक्षिक खर्चहरू कभर गर्दछ।",
    },
    features: {
      en: [
        "Funding for studies in Nepal & abroad",
        "Covers tuition, accommodation & living expenses",
        "Moratorium period until course completion",
        "Competitive interest rates",
        "Easy repayment options post-employment",
      ],
      np: [
        "नेपाल र विदेशमा अध्ययनको लागि कोष",
        "शुल्क, आवास र जीवन खर्च कभर गर्दछ",
        "पाठ्यक्रम पूरा नभएसम्म स्थगन अवधि",
        "प्रतिस्पर्धी ब्याज दरहरू",
        "रोजगारी पछि सजिलो भुक्तानी विकल्प",
      ],
    },
  },
  {
    slug: "fd-loan",
    title: { en: "Loan Against Fixed Deposit", np: "मुद्दती निक्षेप विरुद्ध ऋण" },
    subtitle: { en: "Borrow Against Your Savings", np: "आफ्नो बचत विरुद्ध ऋण" },
    description: {
      en: "Get instant loans against your fixed deposit receipts without breaking your deposit. Enjoy lower interest rates and quick processing while your FD continues to earn interest.",
      np: "आफ्नो मुद्दती निक्षेप नतोडीकन तुरुन्त ऋण प्राप्त गर्नुहोस्। कम ब्याज दर र द्रुत प्रक्रियाको आनन्द लिनुहोस् जबकि तपाईंको एफडीले ब्याज कमाइरहन्छ।",
    },
    features: {
      en: [
        "Loan up to 90% of FD amount",
        "Lower interest rate than personal loans",
        "Your FD continues to earn interest",
        "Quick processing & disbursement",
        "No additional collateral required",
      ],
      np: [
        "एफडी रकमको ९०% सम्म ऋण",
        "व्यक्तिगत ऋण भन्दा कम ब्याज दर",
        "तपाईंको एफडीले ब्याज कमाइरहन्छ",
        "द्रुत प्रक्रिया र भुक्तानी",
        "अतिरिक्त धितो आवश्यक छैन",
      ],
    },
  },
  {
    slug: "hire-purchase-loan",
    title: { en: "Hire Purchase Loan", np: "हायर पर्चेज ऋण" },
    subtitle: { en: "Own Now, Pay Later", np: "अहिले लिनुहोस्, पछि भुक्तानी गर्नुहोस्" },
    description: {
      en: "Acquire vehicles, machinery, and equipment through our convenient hire purchase scheme. Enjoy flexible ownership while making affordable monthly payments.",
      np: "हाम्रो सुविधाजनक हायर पर्चेज योजना मार्फत सवारी साधन, मेसिनरी र उपकरण प्राप्त गर्नुहोस्। किफायती मासिक भुक्तानी गर्दै लचिलो स्वामित्वको आनन्द लिनुहोस्।",
    },
    features: {
      en: [
        "Vehicle & equipment financing",
        "Flexible down payment options",
        "Affordable monthly installments",
        "Ownership transferred after full payment",
        "Competitive interest rates",
      ],
      np: [
        "सवारी साधन र उपकरण वित्तपोषण",
        "लचिलो डाउन पेमेन्ट विकल्प",
        "किफायती मासिक किस्ता",
        "पूर्ण भुक्तानी पछि स्वामित्व हस्तान्तरण",
        "प्रतिस्पर्धी ब्याज दरहरू",
      ],
    },
  },
  {
    slug: "share-loan",
    title: { en: "Share Loan", np: "शेयर ऋण" },
    subtitle: { en: "Leverage Your Investments", np: "आफ्नो लगानी परिचालन गर्नुहोस्" },
    description: {
      en: "Unlock the value of your shares without selling them. Our share loan facility allows you to borrow against your listed shares while retaining ownership and benefiting from market appreciation.",
      np: "आफ्नो शेयर नबेचीकन तिनको मूल्य अनलक गर्नुहोस्। हाम्रो शेयर ऋण सुविधाले तपाईंलाई आफ्नो सूचीकृत शेयरहरू विरुद्ध ऋण लिन अनुमति दिन्छ जबकि स्वामित्व कायम रहन्छ।",
    },
    features: {
      en: [
        "Loan against listed shares",
        "Retain ownership & dividend benefits",
        "Competitive interest rates",
        "Quick processing & disbursement",
        "Flexible repayment terms",
      ],
      np: [
        "सूचीकृत शेयर विरुद्ध ऋण",
        "स्वामित्व र लाभांश लाभ कायम राख्नुहोस्",
        "प्रतिस्पर्धी ब्याज दरहरू",
        "द्रुत प्रक्रिया र भुक्तानी",
        "लचिलो भुक्तानी सर्तहरू",
      ],
    },
  },
  {
    slug: "personal-loan",
    title: { en: "Personal Loan", np: "व्यक्तिगत ऋण" },
    subtitle: { en: "For Your Personal Needs", np: "तपाईंको व्यक्तिगत आवश्यकताको लागि" },
    description: {
      en: "Meet your personal financial needs with our quick and hassle-free personal loans. Whether it's a wedding, medical emergency, travel, or any other personal expense, we've got you covered.",
      np: "हाम्रो द्रुत र सहज व्यक्तिगत ऋणको साथ आफ्नो व्यक्तिगत वित्तीय आवश्यकताहरू पूरा गर्नुहोस्। विवाह, चिकित्सा आपतकालीन, यात्रा वा अन्य कुनै व्यक्तिगत खर्च होस्, हामी तपाईंलाई कभर गर्दछौं।",
    },
    features: {
      en: [
        "Multipurpose lending for any personal need",
        "Minimal documentation required",
        "Quick approval & same-day disbursement",
        "Flexible repayment tenure",
        "Competitive interest rates",
      ],
      np: [
        "कुनै पनि व्यक्तिगत आवश्यकताको लागि बहुउद्देश्यीय ऋण",
        "न्यूनतम कागजात आवश्यक",
        "द्रुत स्वीकृति र सोही दिन भुक्तानी",
        "लचिलो भुक्तानी अवधि",
        "प्रतिस्पर्धी ब्याज दरहरू",
      ],
    },
  },
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Loan Products | Reliance Finance Limited" : "ऋण उत्पादनहरू | रिलायन्स फाइनान्स लिमिटेड",
    description: lang === "en" ? "Explore our comprehensive range of loan products including home, auto, business, agricultural, education, and more." : "हाम्रो व्यापक ऋण उत्पादनहरू हेर्नुहोस् जसमा गृह, अटो, व्यवसाय, कृषि, शिक्षा र थप समावेश छन्।",
  };
}

export default async function LoansPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <>
      <section className="relative bg-gradient-to-r from-primary-800 via-primary-700 to-primary-900 py-16 text-white">
        <div className="absolute inset-0 bg-[url('https://reliancenepal.com.np/uploads/slider/d6515bd5f4c1b099740dde56a7faa2ec3c852757.jpg')] bg-cover bg-center opacity-10" />
        <div className="container-page relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-secondary-300">
              {lang === "en" ? "Division 03" : "भाग ०३"}
            </span>
            <h1 className="mb-3 text-4xl font-bold md:text-5xl">
              <HandCoins className="mr-3 inline-block h-10 w-10" />
              {lang === "en" ? "Loan & Credit Schemes" : "ऋण र क्रेडिट योजनाहरू"}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-primary-100">
              {lang === "en"
                ? "Fuel your dreams with our comprehensive range of loan products — from home ownership and vehicle financing to business expansion and agricultural development."
                : "हाम्रो व्यापक ऋण उत्पादनहरूले तपाईंको सपनालाई बल दिनुहोस् — घर स्वामित्व, सवारी साधन वित्तदेखि व्यवसाय विस्तार र कृषि विकाससम्म।"}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loans.map((loan) => {
              const Icon = loanIcons[loan.slug] || HandCoins;
              return (
                <div
                  key={loan.slug}
                  className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center gap-4 border-b bg-gradient-to-r from-primary-50 to-white px-6 py-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700 transition-colors group-hover:bg-primary-700 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {lang === "en" ? loan.title.en : loan.title.np}
                      </h3>
                      <p className="text-xs font-medium uppercase tracking-wide text-secondary-600">
                        {lang === "en" ? loan.subtitle.en : loan.subtitle.np}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 px-6 py-4">
                    <p className="mb-4 text-sm leading-relaxed text-gray-500">
                      {lang === "en" ? loan.description.en : loan.description.np}
                    </p>
                    <ul className="space-y-2">
                      {(lang === "en" ? loan.features.en : loan.features.np).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3 border-t bg-gray-50 px-6 py-4">
                    <Link
                      href={`/${lang}/products/loans/${loan.slug}`}
                      className="btn btn-primary flex-1 text-center text-sm"
                    >
                      {lang === "en" ? "View Details" : "विवरण हेर्नुहोस्"}{" "}
                      <ArrowRight className="ml-1 inline h-4 w-4" />
                    </Link>
                    <Link
                      href="/emi-calculator"
                      className="btn btn-secondary flex-1 text-center text-sm"
                    >
                      <Calculator className="mr-1 inline h-4 w-4" />
                      {lang === "en" ? "Calculate EMI" : "ईएमआई गणना गर्नुहोस्"}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
