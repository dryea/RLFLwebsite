const API = process.env.NEXT_PUBLIC_API_URL || "https://rfil-api.sudeepdhakal.workers.dev";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Strategic Framework" : "रणनीतिक ढाँचा",
    description: lang === "en"
      ? "The strategic framework and business plan of Reliance Finance Limited."
      : "रिलायन्स फाइनान्स लिमिटेडको रणनीतिक ढाँचा र व्यवसाय योजना।",
  };
}

export default async function StrategicFrameworkPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  let page: any = null;
  try {
    const res = await fetch(`${API}/api/cms/strategic-framework`);
    if (res.ok) page = await res.json();
  } catch {}

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-4 text-4xl font-bold">
            {lang === "en" ? "Strategic Framework" : "रणनीतिक ढाँचा"}
          </h1>
          <p className="max-w-3xl text-lg text-primary-100">
            {lang === "en"
              ? "Our strategic blueprint for sustainable growth and excellence"
              : "दिगो वृद्धि र उत्कृष्टताको लागि हाम्रो रणनीतिक खाका"}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        {page ? (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: page.content || page.body || "" }} />
        ) : (
          <div className="space-y-10">
            <div className="rounded-xl border bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {lang === "en" ? "Strategic Overview" : "रणनीतिक सिंहावलोकन"}
              </h2>
              <p className="leading-relaxed text-gray-700">
                {lang === "en"
                  ? "Reliance Finance Limited's strategic framework is built on a foundation of sustainable growth, customer-centricity, digital transformation, and operational excellence. Our strategy aligns with the regulatory vision of Nepal Rastra Bank and addresses the evolving financial needs of the Nepali people."
                  : "रिलायन्स फाइनान्स लिमिटेडको रणनीतिक ढाँचा दिगो वृद्धि, ग्राहक-केन्द्रितता, डिजिटल रूपान्तरण र परिचालन उत्कृष्टताको जगमा निर्मित छ। हाम्रो रणनीति नेपाल राष्ट्र बैंकको नियामक दृष्टिकोणसँग मेल खान्छ र नेपाली जनताको विकसित वित्तीय आवश्यकताहरूलाई सम्बोधन गर्दछ।"}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {(
                lang === "en"
                  ? [
                      {
                        title: "Digital Transformation",
                        icon: "💻",
                        items: [
                          "Implement robust core banking system upgrades",
                          "Launch mobile and internet banking platforms",
                          "Develop digital lending and onboarding capabilities",
                          "Deploy data analytics for personalized customer insights",
                        ],
                      },
                      {
                        title: "Branch & Network Expansion",
                        icon: "🏦",
                        items: [
                          "Expand to provincial and municipal headquarters",
                          "Establish customer touchpoints in key market areas",
                          "Develop alternate delivery channels (ATMs, agent banking)",
                          "Strengthen rural and semi-urban presence",
                        ],
                      },
                      {
                        title: "Product Innovation",
                        icon: "💡",
                        items: [
                          "Introduce tailored products for SMEs and women entrepreneurs",
                          "Develop competitive deposit and loan schemes",
                          "Launch remittance-linked financial products",
                          "Create bundled offerings for different customer segments",
                        ],
                      },
                      {
                        title: "Risk & Compliance",
                        icon: "🛡️",
                        items: [
                          "Strengthen enterprise risk management framework",
                          "Ensure full compliance with NRB directives and Basel norms",
                          "Enhance internal audit and control mechanisms",
                          "Implement robust AML/CFT procedures",
                        ],
                      },
                    ]
                  : [
                      {
                        title: "डिजिटल रूपान्तरण",
                        icon: "💻",
                        items: [
                          "बलियो कोर बैंकिङ प्रणाली स्तरोन्नति कार्यान्वयन",
                          "मोबाइल र इन्टरनेट बैंकिङ प्लेटफर्म सुरूवात",
                          "डिजिटल ऋण र अनबोर्डिङ क्षमताहरूको विकास",
                          "व्यक्तिगत ग्राहक अन्तरदृष्टिको लागि डेटा विश्लेषण प्रयोग",
                        ],
                      },
                      {
                        title: "शाखा र सञ्जाल विस्तार",
                        icon: "🏦",
                        items: [
                          "प्रादेशिक र नगरपालिका मुख्यालयहरूमा विस्तार",
                          "प्रमुख बजार क्षेत्रहरूमा ग्राहक सम्पर्क बिन्दुहरू स्थापना",
                          "वैकल्पिक वितरण च्यानलहरूको विकास (एटिएम, एजेन्ट बैंकिङ)",
                          "ग्रामीण र अर्ध-शहरी उपस्थिति सुदृढीकरण",
                        ],
                      },
                      {
                        title: "उत्पादन नवाचार",
                        icon: "💡",
                        items: [
                          "साना तथा मझौला उद्यम र महिला उद्यमीहरूको लागि अनुकूलित उत्पादनहरूको सुरूवात",
                          "प्रतिस्पर्धी निक्षेप र ऋण योजनाहरूको विकास",
                          "रेमिट्यान्स-लिंक्ड वित्तीय उत्पादनहरूको सुरूवात",
                          "विभिन्न ग्राहक वर्गहरूको लागि बन्डल प्याकेजहरू सिर्जना",
                        ],
                      },
                      {
                        title: "जोखिम र अनुपालन",
                        icon: "🛡️",
                        items: [
                          "उद्यम जोखिम व्यवस्थापन ढाँचा सुदृढीकरण",
                          "NRB निर्देशन र बासेल मापदण्डहरूको पूर्ण अनुपालन सुनिश्चित",
                          "आन्तरिक लेखापरीक्षण र नियन्त्रण संयन्त्रहरूको वृद्धि",
                          "बलियो AML/CFT प्रक्रियाहरूको कार्यान्वयन",
                        ],
                      },
                    ]
              ).map((pillar, i) => (
                <div key={i} className="rounded-xl border bg-white p-6 shadow-sm">
                  <div className="mb-3 text-3xl">{pillar.icon}</div>
                  <h3 className="mb-3 text-lg font-bold text-gray-900">{pillar.title}</h3>
                  <ul className="space-y-2">
                    {pillar.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-700" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="rounded-xl border-l-4 border-primary-700 bg-primary-50/30 p-6">
              <h3 className="mb-2 font-semibold text-gray-900">
                {lang === "en" ? "Our Commitment" : "हाम्रो प्रतिबद्धता"}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {lang === "en"
                  ? "Reliance Finance Limited is committed to executing this strategic framework with discipline and transparency. We regularly review our progress against strategic objectives and adapt our approach to changing market conditions, always keeping our customers' best interests at heart."
                  : "रिलायन्स फाइनान्स लिमिटेड यस रणनीतिक ढाँचालाई अनुशासन र पारदर्शिताका साथ कार्यान्वयन गर्न प्रतिबद्ध छ। हामी रणनीतिक उद्देश्यहरू विरुद्ध हाम्रो प्रगतिको नियमित समीक्षा गर्दछौं र बदलिँदो बजार अवस्थाहरूमा हाम्रो दृष्टिकोण अनुकूलन गर्दछौं, सधैं हाम्रा ग्राहकहरूको सर्वोत्तम हितलाई ध्यानमा राख्दै।"}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
