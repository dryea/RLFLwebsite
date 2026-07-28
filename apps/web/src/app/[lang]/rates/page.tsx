import { Percent } from "lucide-react";
import { serverFetchAPI } from "@/lib/server-api";

export const dynamic = "force-dynamic";

const categoryLabels: Record<string, { en: string; np: string }> = {
  savings: { en: "Savings Interest Rates", np: "बचत ब्याज दरहरू" },
  fixed: { en: "Fixed Deposit Interest Rates", np: "मुद्दती निक्षेप ब्याज दरहरू" },
  loan: { en: "Loan Interest Rates", np: "ऋण ब्याज दरहरू" },
  tariff: { en: "Service Charges & Tariffs", np: "सेवा शुल्क र दरहरू" },
  forex: { en: "Foreign Exchange Rates", np: "विदेशी विनिमय दरहरू" },
};

const categoryOrder = ["savings", "fixed", "loan", "tariff", "forex"];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Interest Rates | Reliance Finance Limited" : "ब्याज दरहरू | रिलायन्स फाइनान्स लिमिटेड",
    description: lang === "en" ? "Current interest rates and service charges" : "हालको ब्याज दर र सेवा शुल्कहरू",
  };
}

export default async function RatesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const rates = await serverFetchAPI("/api/rates", { cache: "no-store" });

  const grouped: Record<string, any[]> = {};
  rates.forEach((r: any) => {
    const cat = r.category || "other";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(r);
  });

  const t = (obj: { en: string; np: string }) => (lang === "en" ? obj.en : obj.np);

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{lang === "en" ? "Interest Rates" : "ब्याज दरहरू"}</h1>
          <p className="mt-2 text-primary-100">
            {lang === "en" ? "Current interest rates and service charges" : "हालको ब्याज दर र सेवा शुल्कहरू"}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          {rates.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed p-12 text-center text-gray-500">
              <Percent className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="text-lg font-medium">{lang === "en" ? "No rates available" : "कुनै दरहरू उपलब्ध छैनन्"}</p>
              <p className="mt-1 text-sm">{lang === "en" ? "Rates will be updated soon." : "दरहरू चाँडै अद्यावधिक गरिनेछ।"}</p>
            </div>
          ) : (
            <div className="space-y-10">
              {categoryOrder.map((cat) => {
                const items = grouped[cat];
                if (!items || items.length === 0) return null;
                return (
                  <div key={cat}>
                    <h2 className="mb-4 text-xl font-bold text-gray-900">{t(categoryLabels[cat] || { en: cat, np: cat })}</h2>
                    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-700">
                          <tr>
                            <th className="px-5 py-3 font-semibold">{lang === "en" ? "Description" : "विवरण"}</th>
                            <th className="px-5 py-3 font-semibold">{lang === "en" ? "Rate" : "दर"}</th>
                            {items.some((i: any) => i.period) && (
                              <th className="px-5 py-3 font-semibold">{lang === "en" ? "Period" : "अवधि"}</th>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {items.map((rate: any, i: number) => (
                            <tr key={rate.id || i} className="transition-colors hover:bg-gray-50">
                              <td className="px-5 py-3 font-medium text-gray-900">{rate.title || rate.description}</td>
                              <td className="px-5 py-3 font-semibold text-primary-700">{rate.rate || rate.value}</td>
                              {items.some((r: any) => r.period) && (
                                <td className="px-5 py-3 text-gray-500">{rate.period || "-"}</td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {items.some((i: any) => i.effectiveDate) && (
                      <p className="mt-2 text-xs text-gray-400">{lang === "en" ? "Effective from" : "देखि लागू"}: {items[0].effectiveDate}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="border-t bg-gray-50 py-8">
        <div className="container-page text-center text-sm text-gray-500">
          <p>{lang === "en" ? "Rates are subject to change as per Nepal Rastra Bank directives." : "दरहरू नेपाल राष्ट्र बैंकको निर्देशन अनुसार परिवर्तन हुन सक्छन्।"}</p>
        </div>
      </section>
    </>
  );
}
