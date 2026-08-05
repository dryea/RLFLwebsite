import { serverFetchAPI } from "@/lib/server-api";

export const dynamic = "force-dynamic";

const defaultContent: Record<string, any> = {
  en: {
    title: "Information Officer",
    subtitle: "Your designated contact for Right to Information (RTI) requests.",
    officerName: "Information Officer",
    about:
      "As per the Right to Information Act, 2064, Reliance Finance Limited has designated an Information Officer to facilitate public access to information held by the company, ensuring transparency and accountability.",
    responsibilities: [
      "Providing information requested by citizens under the Right to Information Act, 2064",
      "Maintaining and updating public information records",
      "Processing information requests within the statutory time frame",
      "Maintaining the information register and providing updates on request status",
      "Assisting the Public Information Committee in discharging its duties",
    ],
    howToRequest:
      "To submit an information request, write to the Information Officer in the prescribed format with your name, address, and the specific information required. Requests are processed within 15 working days as per the Act.",
    contact: "Contact: +977–01–5361104 | Email: info@reliancenepal.com.np",
  },
  np: {
    title: "सूचना अधिकृत",
    subtitle: "सूचनाको हक (RTI) आवेदनहरूको लागि तपाईंको तोकिएको सम्पर्क।",
    officerName: "सूचना अधिकृत",
    about:
      "सूचनाको हक ऐन, २०६४ अनुसार, रिलायन्स फाइनान्स लिमिटेडले पारदर्शिता र जवाफदेहिता सुनिश्चित गर्दै कम्पनीले राखेको जानकारीमा सार्वजनिक पहुँच सहज बनाउन सूचना अधिकृत तोकेको छ।",
    responsibilities: [
      "सूचनाको हक ऐन, २०६४ अन्तर्गत नागरिकहरूले माग गरेको जानकारी प्रदान गर्ने",
      "सार्वजनिक जानकारीका अभिलेखहरू व्यवस्थापन र अद्यावधिक गर्ने",
      "कानूनले तोकेको समय सीमाभित्र सूचना आवेदनहरू प्रशोधन गर्ने",
      "सूचना दर्ता किताब व्यवस्थापन र आवेदन स्थितिको जानकारी प्रदान गर्ने",
      "सूचना समितिलाई आफ्नो कर्तव्य पालनमा सहयोग गर्ने",
    ],
    howToRequest:
      "सूचना माग गर्न, निर्धारित ढाँचामा आफ्नो नाम, ठेगाना र आवश्यक विशेष जानकारीसहित सूचना अधिकृतलाई पत्र लेख्नुहोस्। ऐन अनुसार आवेदनहरू १५ कार्यदिनभित्र प्रशोधन गरिन्छ।",
    contact: "सम्पर्क: +977–01–5361104 | इमेल: info@reliancenepal.com.np",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Information Officer | Reliance Finance Limited" : "सूचना अधिकृत | रिलायन्स फाइनान्स लिमिटेड",
    description: lang === "en" ? "Designated Information Officer for Right to Information requests." : "सूचनाको हक आवेदनका लागि तोकिएको सूचना अधिकृत।",
  };
}

export default async function InformationOfficerPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  let cms: any = null;
  try {
    cms = await serverFetchAPI("/api/pages/information-officer");
  } catch {}
  const content = defaultContent[lang];
  const cmsHtml = lang === "np" ? (cms?.contentNp || cms?.content) : (cms?.content || cms?.contentNp);

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{cms?.title || content.title}</h1>
          <p className="mt-2 text-primary-100">{cms?.titleNp && lang === "np" ? cms.titleNp : content.subtitle}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page space-y-8">
          {cmsHtml && <div className="prose max-w-none rounded-xl border bg-white p-6 shadow-sm" dangerouslySetInnerHTML={{ __html: cmsHtml }} />}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">{content.officerName}</h2>
              <p className="mt-4 text-gray-600">{content.about}</p>
              <p className="mt-3 text-sm text-gray-500">{content.contact}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-bold text-gray-900">{lang === "en" ? "Key Responsibilities" : "प्रमुख जिम्मेवारीहरू"}</h2>
              <ul className="mt-4 space-y-2">
                {content.responsibilities.map((r: string, i: number) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary-500" />
                    <span className="text-gray-600">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-xl border bg-primary-50 p-6">
              <h2 className="text-lg font-bold text-gray-900">{lang === "en" ? "How to Request Information" : "सूचना कसरी माग्ने"}</h2>
              <p className="mt-2 text-gray-600">{content.howToRequest}</p>
            </div>
        </div>
      </section>
    </>
  );
}
