import { HandCoins } from "lucide-react";
import ProductGrid from "@/components/sections/ProductGrid";

export const dynamic = "force-dynamic";

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
        <div className="absolute inset-0 bg-[url('/assets/slider-loans.jpg')] bg-cover bg-center opacity-10" />
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
          <ProductGrid type="loan" lang={lang} basePath="/products/loans" showEmi />
        </div>
      </section>
    </>
  );
}
