import { serverFetchAPI } from "@/lib/server-api";
import Link from "next/link";
import { PiggyBank, Lock, HandCoins, ChevronRight, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Our Products" : "हाम्रा उत्पादनहरू",
    description:
      lang === "en"
        ? "Savings accounts, fixed deposits, and loan products from Reliance Finance Limited."
        : "रिलायन्स फाइनान्स लिमिटेडका बचत खाता, मुद्दती निक्षेप र ऋण उत्पादनहरू।",
  };
}

export default async function ProductsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const divisions = [
    {
      id: "savings",
      title: { en: "Savings Accounts", np: "बचत खाताहरू" },
      subtitle: { en: "Division 01", np: "भाग ०१" },
      description: {
        en: "Explore our diversified portfolio of savings accounts designed for every segment — from students and homemakers to corporates and senior citizens. Whether you need daily transaction access or high-yield fixed deposit growth, we have a tailored solution for you.",
        np: "विद्यार्थीदेखि गृहिणी, संस्थादेखि वरिष्ठ नागरिकसम्मका लागि डिजाइन गरिएको बचत खाताहरूको विविध पोर्टफोलियो। दैनिक कारोबार वा उच्च-उपज मुद्दती निक्षेप — हरेक आवश्यकताको लागि उपयुक्त समाधान।",
      },
      icon: PiggyBank,
      image: "/assets/slider-savings.jpg",
      cta: { en: "Explore Savings", np: "बचत हेर्नुहोस्" },
      link: `/${lang}/products/savings`,
    },
    {
      id: "fixed-deposits",
      title: { en: "Fixed Deposits (FD)", np: "मुद्दती निक्षेप" },
      subtitle: { en: "Division 02", np: "भाग ०२" },
      description: {
        en: "Maximize your financial returns. Placements of corporate funds, trust capital, or private individual savings into high-yield, secure portfolios. Choose flexible tenures starting from 3 months to over 5 years. Remittance depositors enjoy a premium +1.0% interest yield compared to standard rates.",
        np: "आफ्नो वित्तीय प्रतिफल अधिकतम बनाउनुहोस्। कर्पोरेट कोष, ट्रस्ट पुँजी वा व्यक्तिगत बचतलाई उच्च-उपज, सुरक्षित पोर्टफोलियोमा राख्नुहोस्। ३ महिनादेखि ५ वर्षभन्दा बढी लचिलो अवधि। रेमिट्यान्स निक्षेपकर्ताहरूले मानक दरभन्दा +१.०% थप ब्याज पाउनुहुन्छ।",
      },
      icon: Lock,
      image: "/assets/partners-n-tieups.png",
      cta: { en: "Go to FD Calculator", np: "FD क्याल्कुलेटर" },
      link: `/${lang}/products/fixed-deposits`,
    },
    {
      id: "loans",
      title: { en: "Loan & Credit Schemes", np: "ऋण र क्रेडिट योजनाहरू" },
      subtitle: { en: "Division 03", np: "भाग ०३" },
      description: {
        en: "Fuel your dreams with our comprehensive range of loan products. From home ownership and vehicle financing to business expansion and agricultural development — our competitive rates and flexible repayment plans make borrowing simple and accessible.",
        np: "हाम्रो व्यापक ऋण उत्पादनहरूले तपाईंको सपनालाई बल दिनुहोस्। घर स्वामित्व, सवारी साधन वित्तदेखि व्यवसाय विस्तार र कृषि विकाससम्म — प्रतिस्पर्धी ब्याजदर र लचिलो भुक्तानी योजनाले ऋण सरल र सुलभ बनाउँछ।",
      },
      icon: HandCoins,
      image: "/assets/slider-loans.jpg",
      cta: { en: "Explore Loans", np: "ऋण हेर्नुहोस्" },
      link: `/${lang}/products/loans`,
    },
  ];

  return (
    <>
      <section
        className="section"
        style={{
          background:
            "linear-gradient(rgba(112,43,134,0.85),rgba(62,12,78,0.95)),url('/assets/slider-savings.jpg') center/cover no-repeat",
          padding: "6rem 0",
        }}
      >
        <div className="container-page text-center text-white">
          <h1 className="mb-2 text-white">
            {lang === "en" ? "Financial Product Divisions" : "वित्तीय उत्पादन विभागहरू"}
          </h1>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-secondary-500">
            {lang === "en"
              ? "Explore Savings, High-Yield Deposits & Personal/Business Loans"
              : "बचत, उच्च-उपज निक्षेप र व्यक्तिगत/व्यावसायिक ऋण अन्वेषण गर्नुहोस्"}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page flex flex-col gap-16">
          {divisions.map((div, idx) => {
            const Icon = div.icon;
            return (
              <div key={div.id}>
                <div
                  className={`grid items-center gap-12 ${idx % 2 === 0 ? "lg:grid-cols-[0.9fr_1.1fr]" : "lg:grid-cols-[1.1fr_0.9fr]"}`}
                >
                  {idx % 2 === 0 ? (
                    <>
                      <img
                        src={div.image}
                        alt={`${lang === "en" ? div.title.en : div.title.np} — Reliance Finance Limited`}
                        width={560}
                        height={280}
                        loading="lazy"
                        className="h-[280px] w-full rounded-xl object-cover shadow-lg"
                      />
                      <div>
                        <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.1em] text-secondary-500">
                          {lang === "en" ? div.subtitle.en : div.subtitle.np}
                        </h4>
                        <h2 className="mb-4 text-3xl font-bold text-primary-500">
                          <Icon className="mr-2 inline h-7 w-7" />
                          {lang === "en" ? div.title.en : div.title.np}
                        </h2>
                        <p className="mb-6 leading-relaxed text-gray-500">
                          {lang === "en" ? div.description.en : div.description.np}
                        </p>
                        <Link href={div.link} className="btn btn-primary">
                          {lang === "en" ? div.cta.en : div.cta.np}{" "}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.1em] text-secondary-500">
                          {lang === "en" ? div.subtitle.en : div.subtitle.np}
                        </h4>
                        <h2 className="mb-4 text-3xl font-bold text-primary-500">
                          <Icon className="mr-2 inline h-7 w-7" />
                          {lang === "en" ? div.title.en : div.title.np}
                        </h2>
                        <p className="mb-6 leading-relaxed text-gray-500">
                          {lang === "en" ? div.description.en : div.description.np}
                        </p>
                        <Link href={div.link} className="btn btn-primary">
                          {lang === "en" ? div.cta.en : div.cta.np}{" "}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                      <img
                        src={div.image}
                        alt={`${lang === "en" ? div.title.en : div.title.np} — Reliance Finance Limited`}
                        width={560}
                        height={280}
                        loading="lazy"
                        className="h-[280px] w-full rounded-xl object-cover shadow-lg"
                      />
                    </>
                  )}
                </div>
                {idx < divisions.length - 1 && <hr className="my-8 border-gray-100" />}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
