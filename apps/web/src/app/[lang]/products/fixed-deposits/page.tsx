import ProductGrid from "@/components/sections/ProductGrid";
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

export default async function FixedDepositsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <>
      <section
        className="section"
        style={{
          background:
            "linear-gradient(rgba(112,43,134,0.85),rgba(62,12,78,0.95)),url('/assets/partners-n-tieups.png') center/cover no-repeat",
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
          <ProductGrid type="fixed" lang={lang} basePath="/products/fixed-deposits" />
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
