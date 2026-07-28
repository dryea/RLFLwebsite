import Link from "next/link";
import { ShieldCheck, Building2, Mail, Percent, HandCoins, Clock, ArrowRight } from "lucide-react";
import FDMaturityCalculator from "@/components/sections/FDMaturityCalculator";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Fixed Deposits | Reliance Finance Limited" : "मुद्दती निक्षेप | रिलायन्स फाइनान्स लिमिटेड",
    description: lang === "en"
      ? "Explore Reliance Finance's high-yield fixed deposit schemes — Individual, Corporate, and Remittance FD with competitive interest rates up to 7.25% p.a."
      : "रिलायन्स फाइनान्सको उच्च-उपज मुद्दती निक्षेप योजनाहरू — व्यक्तिगत, संस्थागत र रेमिट्यान्स FD प्रतिस्पर्धी ब्याजदर ७.२५% सम्म।",
  };
}

const fdProducts = [
  {
    slug: "individual-fixed-deposit",
    title: { en: "Individual Fixed Deposit", np: "व्यक्तिगत मुद्दती निक्षेप" },
    icon: ShieldCheck,
    rate: "up to 6.25% p.a.",
    highlights: [
      { en: "Loan up to 90% of deposit", np: "निक्षेपको ९०% सम्म ऋण" },
      { en: "Flexible tenures from 3 months to 5 years", np: "३ महिनादेखि ५ वर्षसम्म लचिलो अवधि" },
      { en: "Quarterly interest payout option", np: "त्रैमासिक ब्याज भुक्तानी विकल्प" },
      { en: "Nomination facility available", np: "नामांकन सुविधा उपलब्ध" },
    ],
    linkText: { en: "View Details", np: "विवरण हेर्नुहोस्" },
  },
  {
    slug: "corporate-fixed-deposit",
    title: { en: "Corporate Fixed Deposit", np: "संस्थागत मुद्दती निक्षेप" },
    icon: Building2,
    rate: "up to 5.75% p.a.",
    highlights: [
      { en: "For institutions, trusts & corporates", np: "संस्था, ट्रस्ट र कर्पोरेटहरूको लागि" },
      { en: "Bulk deposit placement facility", np: "थोक निक्षेप राख्ने सुविधा" },
      { en: "Competitive institutional rates", np: "प्रतिस्पर्धी संस्थागत दरहरू" },
      { en: "Auto-renewal option available", np: "स्वतः नवीकरण विकल्प उपलब्ध" },
    ],
    linkText: { en: "View Details", np: "विवरण हेर्नुहोस्" },
  },
  {
    slug: "remittance-fixed-deposit",
    title: { en: "Remittance Fixed Deposit", np: "रेमिट्यान्स मुद्दती निक्षेप" },
    icon: Mail,
    rate: "up to 7.25% p.a.",
    highlights: [
      { en: "+1% premium interest for NRNs", np: "NRN हरूको लागि +१% प्रिमियम ब्याज" },
      { en: "Deposit through remittance channels", np: "रेमिट्यान्स माध्यमबाट निक्षेप" },
      { en: "Special NRN customer support", np: "विशेष NRN ग्राहक सहायता" },
      { en: "Flexible repatriation facility", np: "लचिलो फिर्ता सुविधा" },
    ],
    linkText: { en: "View Details", np: "विवरण हेर्नुहोस्" },
  },
];

export default async function FixedDepositsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <>
      <section
        className="section"
        style={{
          background:
            "linear-gradient(rgba(112,43,134,0.85),rgba(62,12,78,0.95)),url('https://reliancenepal.com.np/assets/images/reliance/partners-n-tieups.png') center/cover no-repeat",
          padding: "6rem 0",
        }}
      >
        <div className="container-page text-center text-white">
          <h1 className="mb-2 text-white">
            {lang === "en" ? "Fixed Deposits (FD)" : "मुद्दती निक्षेप"}
          </h1>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-secondary-500">
            {lang === "en"
              ? "Secure Your Savings with High-Yield Fixed Deposit Schemes"
              : "उच्च-उपज मुद्दती निक्षेप योजनाहरूसँग आफ्नो बचत सुरक्षित गर्नुहोस्"}
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {fdProducts.map((product) => {
              const Icon = product.icon;
              return (
                <div
                  key={product.slug}
                  className="group flex flex-col rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-500 hover:shadow-lg"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 transition-all duration-300 group-hover:bg-secondary-500">
                    <Icon className="h-7 w-7 text-primary-500 transition-all duration-300 group-hover:text-white" />
                  </div>

                  <h3 className="mb-3 font-heading text-xl font-bold text-gray-900">
                    {lang === "en" ? product.title.en : product.title.np}
                  </h3>

                  <div className="mb-4 inline-block rounded-full bg-green-50 px-3 py-1 text-sm font-bold text-green-700">
                    {product.rate}
                  </div>

                  <ul className="mb-6 space-y-3">
                    {product.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-primary-50 text-center text-[10px] font-bold leading-4 text-primary-700">
                          ✓
                        </span>
                        {lang === "en" ? h.en : h.np}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Link
                      href={`/${lang}/products/fixed-deposits/${product.slug}`}
                      className="btn btn-primary w-full text-center"
                    >
                      {lang === "en" ? product.linkText.en : product.linkText.np}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-surface-alt">
        <div className="container-page">
          <div className="section-header">
            <h2>
              {lang === "en" ? "FD Maturity Calculator" : "FD परिपक्वता क्याल्कुलेटर"}
            </h2>
            <p>
              {lang === "en"
                ? "Estimate your returns — adjust the amount, customer type, and tenure to see your maturity amount and total interest earned."
                : "आफ्नो प्रतिफल अनुमान गर्नुहोस् — रकम, ग्राहक प्रकार र अवधि समायोजन गरेर परिपक्वता रकम र कुल ब्याज हेर्नुहोस्।"}
            </p>
          </div>
          <FDMaturityCalculator lang={lang} />
        </div>
      </section>
    </>
  );
}
