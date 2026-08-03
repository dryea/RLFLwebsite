import CalendarPage from "@/components/shared/CalendarPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Calendar | Reliance Finance Limited" : "पात्रो | रिलायन्स फाइनान्स लिमिटेड",
    description: lang === "en" ? "Upcoming events, festivals & holidays" : "आगामी कार्यक्रम, चाडपर्व र बिदाहरू",
  };
}

export default async function LangCalendarPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isNp = lang === "np";
  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{isNp ? "पात्रो" : "Calendar"}</h1>
          <p className="mt-2 text-primary-100">{isNp ? "आगामी कार्यक्रम, चाडपर्व र बिदाहरू" : "Upcoming events, festivals & holidays"}</p>
        </div>
      </section>
      <CalendarPage lang={lang} />
    </>
  );
}
