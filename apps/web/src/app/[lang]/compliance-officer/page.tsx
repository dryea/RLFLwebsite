import { serverFetchAPI } from "@/lib/server-api";

export const dynamic = "force-dynamic";

const defaultContent: Record<string, any> = {
  en: {
    title: "Compliance Officer",
    subtitle: "Ensuring regulatory compliance and ethical business practices.",
    officerName: "Mr. Binod Poudel",
    officerRole: "Chief Risk Officer & Compliance Officer",
    about: "The Compliance Officer ensures that Reliance Finance Limited operates in accordance with all applicable laws, regulations, and internal policies. They oversee regulatory reporting, AML/CFT compliance, and ethical standards.",
    responsibilities: [
      "Regulatory compliance monitoring and reporting",
      "Anti-Money Laundering (AML) and Counter Financing of Terrorism (CFT)",
      "Internal policy development and enforcement",
      "Regulatory liaison with Nepal Rastra Bank and other authorities",
      "Employee training on compliance matters",
    ],
    whistleblower: "Reliance Finance Limited maintains a strict whistleblower protection policy. Employees and stakeholders can report concerns confidentially and without fear of retaliation.",
    contact: "Contact: 01-5971000 | Email: compliance@reliancenepal.com.np",
  },
  np: {
    title: "अनुपालन अधिकृत",
    subtitle: "नियामक अनुपालन र नैतिक व्यावसायिक अभ्यास सुनिश्चित गर्दै।",
    officerName: "श्री विनोद पौडेल",
    officerRole: "प्रमुख जोखिम अधिकृत र अनुपालन अधिकृत",
    about: "अनुपालन अधिकृतले रिलायन्स फाइनान्स लिमिटेड सबै लागू कानून, नियम र आन्तरिक नीतिहरू अनुसार सञ्चालन हुन्छ भन्ने सुनिश्चित गर्नुहुन्छ। उहाँ नियामक रिपोर्टिङ, एएमएल/सीएफटी अनुपालन र नैतिक मापदण्डहरूको निरीक्षण गर्नुहुन्छ।",
    responsibilities: [
      "नियामक अनुपालन अनुगमन र रिपोर्टिङ",
      "सम्पत्ति शुद्धीकरण विरोधी (एएमएल) र आतंकवाद वित्तपोषण प्रतिरोध (सीएफटी)",
      "आन्तरिक नीति विकास र कार्यान्वयन",
      "नेपाल राष्ट्र बैंक र अन्य निकायहरूसँग नियामक समन्वय",
      "अनुपालन विषयमा कर्मचारी तालिम",
    ],
    whistleblower: "रिलायन्स फाइनान्स लिमिटेडले कडा सूचक संरक्षण नीति कायम राखेको छ। कर्मचारी र सरोकारवालाले गोप्य र प्रतिशोधको डर बिना सरोकारहरू रिपोर्ट गर्न सक्छन्।",
    contact: "सम्पर्क: ०१-५९७१००० | इमेल: compliance@reliancenepal.com.np",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Compliance Officer | Reliance Finance Limited" : "अनुपालन अधिकृत | रिलायन्स फाइनान्स लिमिटेड",
    description: lang === "en" ? "Regulatory compliance and whistleblower information." : "नियामक अनुपालन र सूचक संरक्षण जानकारी।",
  };
}

export default async function CompliancePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  let cms: any = null;
  try {
    cms = await serverFetchAPI("/api/pages/compliance-officer");
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
          {cmsHtml && (
            <div className="prose max-w-none rounded-xl border bg-white p-6 shadow-sm" dangerouslySetInnerHTML={{ __html: cmsHtml }} />
          )}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">{content.officerName}</h2>
              <p className="text-sm text-primary-700">{content.officerRole}</p>
              <p className="mt-4 text-gray-600">{content.about}</p>
              <p className="mt-3 text-sm text-gray-500">{content.contact}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-bold text-gray-900">
                {lang === "en" ? "Key Responsibilities" : "प्रमुख जिम्मेवारीहरू"}
              </h2>
              <ul className="mt-4 space-y-2">
                {content.responsibilities.map((r: string, i: number) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary-500" />
                    <span className="text-gray-600">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-xl border bg-blue-50 p-6">
              <h2 className="text-lg font-bold text-gray-900">
                {lang === "en" ? "Whistleblower Policy" : "सूचक संरक्षण नीति"}
              </h2>
              <p className="mt-2 text-gray-600">{content.whistleblower}</p>
            </div>
        </div>
      </section>
    </>
  );
}
