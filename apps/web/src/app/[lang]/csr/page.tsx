import { serverFetchAPI } from "@/lib/server-api";

export const dynamic = "force-dynamic";

const defaultContent: Record<string, any> = {
  en: {
    title: "Corporate Social Responsibility",
    subtitle: "Giving back to the communities we serve.",
    description: "At Reliance Finance Limited, CSR is integral to our mission. We invest in community development, environmental sustainability, education, and health initiatives that create lasting positive impact in Nepal.",
    initiatives: [
      { title: "Financial Literacy Programs", description: "Free workshops and resources to promote financial awareness and inclusion across rural and urban communities." },
      { title: "Environmental Sustainability", description: "Tree plantation drives, paperless banking initiatives, and energy-efficient operations to reduce our carbon footprint." },
      { title: "Education Support", description: "Scholarships and educational materials for underprivileged students in partnership with local schools and NGOs." },
      { title: "Community Health Camps", description: "Free health check-up camps and awareness programs in collaboration with healthcare organizations." },
      { title: "Disaster Relief", description: "Emergency relief funds and volunteer support during natural disasters and crisis situations." },
    ],
  },
  np: {
    title: "कर्पोरेट सामाजिक उत्तरदायित्व",
    subtitle: "हामीले सेवा गर्ने समुदायहरूलाई फिर्ता दिँदै।",
    description: "रिलायन्स फाइनान्स लिमिटेडमा, कर्पोरेट सामाजिक उत्तरदायित्व हाम्रो मिशनको अभिन्न अंग हो। हामी नेपालमा दिगो सकारात्मक प्रभाव सिर्जना गर्ने सामुदायिक विकास, वातावरणीय दिगोपना, शिक्षा र स्वास्थ्य पहलहरूमा लगानी गर्छौं।",
    initiatives: [
      { title: "वित्तीय साक्षरता कार्यक्रम", description: "ग्रामीण र शहरी समुदायहरूमा वित्तीय जागरूकता र समावेशीकरण प्रवर्द्धन गर्न निःशुल्क कार्यशाला र स्रोतहरू।" },
      { title: "वातावरणीय दिगोपना", description: "हाम्रो कार्बन फुटप्रिन्ट कम गर्न रूख रोपण अभियान, पेपरलेस बैंकिङ पहल र ऊर्जा-कुशल सञ्चालन।" },
      { title: "शिक्षा सहयोग", description: "स्थानीय विद्यालय र गैरसरकारी संस्थाहरूसँगको साझेदारीमा विपन्न विद्यार्थीहरूको लागि छात्रवृत्ति र शैक्षिक सामग्री।" },
      { title: "सामुदायिक स्वास्थ्य शिविर", description: "स्वास्थ्य संस्थाहरूसँगको सहकार्यमा निःशुल्क स्वास्थ्य जाँच शिविर र जागरूकता कार्यक्रमहरू।" },
      { title: "प्रकोप राहत", description: "प्राकृतिक प्रकोप र संकटको समयमा आपतकालीन राहत कोष र स्वयंसेवक सहयोग।" },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "CSR | Reliance Finance Limited" : "कर्पोरेट सामाजिक उत्तरदायित्व | रिलायन्स फाइनान्स लिमिटेड",
    description: lang === "en" ? "Our corporate social responsibility initiatives and community impact." : "हाम्रो कर्पोरेट सामाजिक उत्तरदायित्व पहल र सामुदायिक प्रभाव।",
  };
}

export default async function CSRPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  let cms: any = null;
  try {
    cms = await serverFetchAPI("/api/cms/pages?slug=csr");
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
            <p className="text-lg leading-relaxed text-gray-600">
              {content.description || defaultContent[lang].description}
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {(content.initiatives || defaultContent[lang].initiatives).map((item: any, i: number) => (
                <div key={i} className="rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-lg font-bold text-green-700">{i + 1}</div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
