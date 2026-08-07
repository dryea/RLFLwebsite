import Link from "next/link";
import ProductGrid from "@/components/sections/ProductGrid";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: lang === "en" ? "Savings Accounts | Reliance Finance Limited" : "बचत खाताहरू | रिलायन्स फाइनान्स लिमिटेड" };
}

export default async function SavingsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <>
      <section className="section" style={{ background: "linear-gradient(rgba(142,68,173,0.85),rgba(82,33,107,0.95)),url('/assets/slider-savings.jpg') center/cover no-repeat", padding: "6rem 0" }}>
        <div className="container-page text-center text-white">
          <h1 className="mb-2 text-white">{lang === "en" ? "Savings Deposit Accounts" : "बचत निक्षेप खाताहरू"}</h1>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-secondary-500">
            {lang === "en" ? "Compare Features & Open Your Account Online" : "सुविधाहरू तुलना गर्नुहोस् र आफ्नो खाता अनलाइन खोल्नुहोस्"}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <ProductGrid type="savings" lang={lang} basePath="/products/savings" />
        </div>
      </section>
    </>
  );
}
