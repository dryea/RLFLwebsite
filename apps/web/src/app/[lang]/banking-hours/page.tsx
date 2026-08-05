import { Clock } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Banking Hours | Reliance Finance Limited" : "बैंकिङ समय | रिलायन्स फाइनान्स लिमिटेड",
  };
}

export default async function LangBankingHoursPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isNp = lang === "np";

  const hours = [
    { day: isNp ? "आइतबार - बिहीबार" : "Sunday - Thursday", time: isNp ? "बिहान १० - बेलुका ५" : "10:00 AM - 5:00 PM" },
    { day: isNp ? "शुक्रबार" : "Friday", time: isNp ? "बिहान १० - मध्याह्न १२" : "10:00 AM - 12:00 PM" },
    { day: isNp ? "शनिबार र बिदा" : "Saturday & Holidays", time: isNp ? "बन्द" : "Closed" },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page"><h1 className="text-3xl font-bold">{isNp ? "बैंकिङ समय" : "Banking Hours"}</h1></div>
      </section>
      <section className="py-12">
        <div className="container-page">
          <div className="rounded-xl border bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3 text-primary-700">
              <Clock className="h-8 w-8" />
              <h2 className="text-xl font-bold text-gray-900">{isNp ? "सेवा समय" : "Service Hours"}</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              {hours.map((h) => (
                <div key={h.day} className="flex justify-between border-b pb-2 last:border-0">
                  <span className="font-medium">{h.day}</span>
                  <span>{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
