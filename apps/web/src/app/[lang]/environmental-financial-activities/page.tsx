import { serverFetchAPI } from "@/lib/server-api";

export const dynamic = "force-dynamic";

const defaultContent: Record<string, any> = {
  en: {
    title: "Environmental & Financial Activities",
    subtitle: "Our approach to integrating environmental considerations into financial activities.",
    description: "Reliance Finance Limited recognizes the critical role financial institutions play in addressing environmental challenges. We are committed to integrating environmental risk assessment into our lending and investment activities while promoting green finance initiatives.",
    activities: [
      { title: "Environmental Risk Assessment", description: "Systematic evaluation of environmental risks in project financing and large-scale lending to ensure compliance with national environmental regulations." },
      { title: "Green Bond Investments", description: "Investment in green bonds and other sustainable financial instruments that fund environmentally beneficial projects." },
      { title: "Climate Risk Management", description: "Identifying, assessing, and managing climate-related financial risks across our portfolio in line with international frameworks." },
      { title: "Energy Efficiency Financing", description: "Specialized loan products for energy efficiency improvements in buildings, industrial processes, and transportation." },
      { title: "Environmental Reporting", description: "Transparent disclosure of our environmental footprint and the environmental impact of our financial activities." },
      { title: "Sustainable Supply Chain", description: "Promoting environmental responsibility throughout our supply chain and vendor selection processes." },
    ],
    reporting: "We publish an annual Environmental & Social Report detailing our environmental performance, green financing portfolio, and future sustainability targets.",
  },
  np: {
    title: "वातावरणीय र वित्तीय गतिविधिहरू",
    subtitle: "वित्तीय गतिविधिहरूमा वातावरणीय पक्षहरू एकीकृत गर्ने हाम्रो दृष्टिकोण।",
    description: "रिलायन्स फाइनान्स लिमिटेडले वातावरणीय चुनौतीहरू समाधान गर्न वित्तीय संस्थाहरूको महत्वपूर्ण भूमिकालाई मान्यता दिन्छ। हामी हरित वित्त पहलहरू प्रवर्द्धन गर्दै हाम्रो ऋण र लगानी गतिविधिहरूमा वातावरणीय जोखिम मूल्यांकन एकीकृत गर्न प्रतिबद्ध छौं।",
    activities: [
      { title: "वातावरणीय जोखिम मूल्यांकन", description: "राष्ट्रिय वातावरणीय नियमहरूको अनुपालन सुनिश्चित गर्न परियोजना वित्तपोषण र ठूलो-स्तरीय ऋणमा वातावरणीय जोखिमहरूको व्यवस्थित मूल्यांकन।" },
      { title: "हरित बन्ड लगानी", description: "वातावरणीय रूपमा लाभदायक परियोजनाहरूलाई कोष गर्ने हरित बन्ड र अन्य दिगो वित्तीय साधनहरूमा लगानी।" },
      { title: "जलवायु जोखिम व्यवस्थापन", description: "अन्तर्राष्ट्रिय ढाँचा अनुसार हाम्रो पोर्टफोलियोभरि जलवायु-सम्बन्धित वित्तीय जोखिमहरू पहिचान, मूल्यांकन र व्यवस्थापन।" },
      { title: "ऊर्जा दक्षता वित्तपोषण", description: "भवन, औद्योगिक प्रक्रिया र यातायातमा ऊर्जा दक्षता सुधारको लागि विशेष ऋण उत्पादनहरू।" },
      { title: "वातावरणीय रिपोर्टिङ", description: "हाम्रो वातावरणीय पदचिह्न र हाम्रो वित्तीय गतिविधिहरूको वातावरणीय प्रभावको पारदर्शी खुलासा।" },
      { title: "दिगो आपूर्ति श्रृंखला", description: "हाम्रो आपूर्ति श्रृंखला र विक्रेता चयन प्रक्रियामा वातावरणीय उत्तरदायित्व प्रवर्द्धन।" },
    ],
    reporting: "हामी हाम्रो वातावरणीय प्रदर्शन, हरित वित्त पोर्टफोलियो र भविष्यको दिगोपना लक्ष्यहरू विवरण गर्दै वार्षिक वातावरणीय र सामाजिक प्रतिवेदन प्रकाशित गर्छौं।",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Environmental & Financial Activities | Reliance Finance Limited" : "वातावरणीय र वित्तीय गतिविधिहरू | रिलायन्स फाइनान्स लिमिटेड",
    description: lang === "en" ? "Environmental risk management and green finance initiatives." : "वातावरणीय जोखिम व्यवस्थापन र हरित वित्त पहलहरू।",
  };
}

export default async function EnvironmentalPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  let cms: any = null;
  try {
    cms = await serverFetchAPI("/api/pages/environmental-financial-activities");
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
              {(content.activities || defaultContent[lang].activities).map((item: any, i: number) => (
                <div key={i} className="rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-lg font-bold text-green-700">{i + 1}</div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl border bg-green-50 p-6">
              <h2 className="text-lg font-bold text-gray-900">
                {lang === "en" ? "Environmental Reporting" : "वातावरणीय रिपोर्टिङ"}
              </h2>
              <p className="mt-2 text-gray-600">{content.reporting || defaultContent[lang].reporting}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
