import EMICalculator from "@/components/shared/EMICalculator";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "EMI Calculator" : "EMI क्याल्कुलेटर",
    description: lang === "en" ? "Plan your loan with accurate monthly payments" : "सही मासिक भुक्तानीको साथ आफ्नो ऋण योजना बनाउनुहोस्",
  };
}

export default async function LangEMICalculatorPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isNp = lang === "np";
  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{isNp ? "EMI क्याल्कुलेटर" : "EMI Calculator"}</h1>
          <p className="mt-2 text-primary-100">{isNp ? "सही मासिक भुक्तानीको साथ आफ्नो ऋण योजना बनाउनुहोस्" : "Plan your loan with accurate monthly payments"}</p>
        </div>
      </section>
      <EMICalculator lang={lang} />
    </>
  );
}
