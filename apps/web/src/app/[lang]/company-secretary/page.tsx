import { serverFetchAPI } from "@/lib/server-api";

export const revalidate = 300;

const defaultContent: Record<string, any> = {
  en: {
    title: "Company Secretary",
    subtitle: "Corporate governance, statutory filings, and board administration.",
    officerName: "Mr. Pradeep Kumar Shrestha",
    officerRole: "Company Secretary",
    about: "The Company Secretary ensures compliance with corporate governance standards, manages board meetings, maintains statutory records, and oversees regulatory filings with the Office of the Company Registrar and other authorities.",
    responsibilities: [
      "Board meeting coordination and minutes",
      "Statutory filings with the Office of the Company Registrar",
      "Shareholder communication and annual general meetings",
      "Maintenance of statutory registers and records",
      "Corporate governance compliance",
    ],
    contact: "Contact: 01-5971000 | Email: secretary@reliancenepal.com.np",
  },
  np: {
    title: "कम्पनी सचिव",
    subtitle: "कर्पोरेट प्रशासन, वैधानिक दाखिल र बोर्ड प्रशासन।",
    officerName: "श्री प्रदीप कुमार श्रेष्ठ",
    officerRole: "कम्पनी सचिव",
    about: "कम्पनी सचिवले कर्पोरेट प्रशासन मापदण्डहरूको अनुपालन सुनिश्चित गर्ने, बोर्ड बैठकहरू व्यवस्थापन गर्ने, वैधानिक अभिलेखहरू राख्ने र कम्पनी रजिष्ट्रारको कार्यालय र अन्य निकायहरूमा नियामक दाखिल गर्ने जिम्मेवारी वहन गर्नुहुन्छ।",
    responsibilities: [
      "बोर्ड बैठक समन्वय र कार्यविवरण",
      "कम्पनी रजिष्ट्रारको कार्यालयमा वैधानिक दाखिल",
      "सेयरधनी सञ्चार र वार्षिक साधारण सभा",
      "वैधानिक रजिष्टर र अभिलेखको व्यवस्थापन",
      "कर्पोरेट प्रशासन अनुपालन",
    ],
    contact: "सम्पर्क: ०१-५९७१००० | इमेल: secretary@reliancenepal.com.np",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Company Secretary | Reliance Finance Limited" : "कम्पनी सचिव | रिलायन्स फाइनान्स लिमिटेड",
    description: lang === "en" ? "Corporate governance and statutory information." : "कर्पोरेट प्रशासन र वैधानिक जानकारी।",
  };
}

export default async function CompanySecretaryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  let cms: any = null;
  try {
    cms = await serverFetchAPI("/api/cms/pages?slug=company-secretary");
  } catch {}
  const content = cms?.data?.[0] || defaultContent;

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{content.title?.[lang] || defaultContent[lang].title}</h1>
          <p className="mt-2 text-primary-100">{content.subtitle?.[lang] || defaultContent[lang].subtitle}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">{content.officerName || defaultContent[lang].officerName}</h2>
              <p className="text-sm text-primary-700">{content.officerRole || defaultContent[lang].officerRole}</p>
              <p className="mt-4 text-gray-600">{content.about || defaultContent[lang].about}</p>
              <p className="mt-3 text-sm text-gray-500">{content.contact || defaultContent[lang].contact}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-bold text-gray-900">
                {lang === "en" ? "Key Responsibilities" : "प्रमुख जिम्मेवारीहरू"}
              </h2>
              <ul className="mt-4 space-y-2">
                {(content.responsibilities || defaultContent[lang].responsibilities).map((r: string, i: number) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary-500" />
                    <span className="text-gray-600">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-xl border bg-gray-50 p-6">
              <h2 className="text-lg font-bold text-gray-900">
                {lang === "en" ? "Statutory Filings" : "वैधानिक दाखिल"}
              </h2>
              <p className="mt-2 text-gray-600">
                {lang === "en"
                  ? "Annual returns, financial statements, and other statutory documents are filed with the Office of the Company Registrar, Nepal Rastra Bank, and the Inland Revenue Department as per applicable laws."
                  : "वार्षिक प्रतिवेदन, वित्तीय विवरण र अन्य वैधानिक कागजातहरू कम्पनी रजिष्ट्रारको कार्यालय, नेपाल राष्ट्र बैंक र आन्तरिक राजस्व विभागमा लागू कानून अनुसार दाखिल गरिन्छ।"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
