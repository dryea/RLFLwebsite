import { serverFetchAPI } from "@/lib/server-api";

export const dynamic = "force-dynamic";

const defaultContent: Record<string, any> = {
  en: {
    title: "Sustainable Banking",
    subtitle: "Integrating environmental and social considerations into our banking operations.",
    description: "Reliance Finance Limited is committed to sustainable banking practices that balance economic growth with environmental stewardship and social responsibility. We integrate ESG (Environmental, Social, and Governance) principles into our lending, investment, and operational decisions.",
    pillars: [
      { title: "Green Financing", description: "Promoting loans and financial products that support renewable energy, energy efficiency, and environmentally friendly projects." },
      { title: "Responsible Lending", description: "Assessing environmental and social risks in our lending portfolio and promoting responsible borrowing practices." },
      { title: "Digital Transformation", description: "Reducing paper usage and carbon emissions through digital banking solutions and paperless processes." },
      { title: "Stakeholder Engagement", description: "Working with customers, employees, and communities to promote environmental awareness and sustainable practices." },
    ],
    commitment: "We are committed to the United Nations Sustainable Development Goals (SDGs) and align our banking practices with national environmental policies and international best practices.",
  },
  np: {
    title: "दिगो बैंकिङ",
    subtitle: "वातावरणीय र सामाजिक पक्षहरूलाई हाम्रो बैंकिङ सञ्चालनमा एकीकृत गर्दै।",
    description: "रिलायन्स फाइनान्स लिमिटेड दिगो बैंकिङ अभ्यासहरूप्रति प्रतिबद्ध छ जसले आर्थिक वृद्धिलाई वातावरणीय संरक्षण र सामाजिक उत्तरदायित्वसँग सन्तुलन गर्दछ। हामी हाम्रो ऋण, लगानी र सञ्चालन निर्णयहरूमा ईएसजी (वातावरणीय, सामाजिक र प्रशासन) सिद्धान्तहरू एकीकृत गर्छौं।",
    pillars: [
      { title: "हरित वित्तपोषण", description: "नवीकरणीय ऊर्जा, ऊर्जा दक्षता र वातावरणमैत्री परियोजनाहरूलाई समर्थन गर्ने ऋण र वित्तीय उत्पादनहरू प्रवर्द्धन गर्दै।" },
      { title: "जिम्मेवार ऋण", description: "हाम्रो ऋण पोर्टफोलियोमा वातावरणीय र सामाजिक जोखिमहरूको मूल्यांकन र जिम्मेवार उधारो अभ्यासहरू प्रवर्द्धन।" },
      { title: "डिजिटल रूपान्तरण", description: "डिजिटल बैंकिङ समाधान र पेपरलेस प्रक्रियाहरू मार्फत कागजको प्रयोग र कार्बन उत्सर्जन घटाउँदै।" },
      { title: "सरोकारवाला संलग्नता", description: "वातावरणीय जागरूकता र दिगो अभ्यासहरू प्रवर्द्धन गर्न ग्राहक, कर्मचारी र समुदायहरूसँग काम गर्दै।" },
    ],
    commitment: "हामी संयुक्त राष्ट्र दिगो विकास लक्ष्यहरू (एसडीजी) प्रति प्रतिबद्ध छौं र राष्ट्रिय वातावरणीय नीति र अन्तर्राष्ट्रिय उत्कृष्ट अभ्यासहरूसँग हाम्रो बैंकिङ अभ्यासहरूलाई पङ्क्तिबद्ध गर्छौं।",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Sustainable Banking | Reliance Finance Limited" : "दिगो बैंकिङ | रिलायन्स फाइनान्स लिमिटेड",
    description: lang === "en" ? "Our commitment to sustainable banking and ESG principles." : "दिगो बैंकिङ र ईएसजी सिद्धान्तहरूप्रति हाम्रो प्रतिबद्धता।",
  };
}

export default async function SustainableBankingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  let cms: any = null;
  try {
    cms = await serverFetchAPI("/api/pages/sustainable-banking");
  } catch {}
  const content = defaultContent;
  const cmsHtml = lang === "np" ? (cms?.contentNp || cms?.content) : (cms?.content || cms?.contentNp);
  const langContent = content[lang];

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{cms?.title || langContent.title}</h1>
          <p className="mt-2 text-primary-100">{cms?.titleNp && lang === "np" ? cms.titleNp : langContent.subtitle}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="mx-auto max-w-4xl">
            {cmsHtml && (
              <div className="prose max-w-none text-lg leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: cmsHtml }} />
            )}
            {!cmsHtml && (
              <p className="text-lg leading-relaxed text-gray-600">
                {langContent.description}
              </p>
            )}

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {langContent.pillars.map((item: any, i: number) => (
                <div key={i} className="rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-lg font-bold text-green-700">{i + 1}</div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl border bg-green-50 p-6">
              <h2 className="text-lg font-bold text-gray-900">
                {lang === "en" ? "Our Commitment" : "हाम्रो प्रतिबद्धता"}
              </h2>
              <p className="mt-2 text-gray-600">{langContent.commitment}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
