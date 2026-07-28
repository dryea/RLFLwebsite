const API = process.env.NEXT_PUBLIC_API_URL || "https://rfil-api.sudeepdhakal.workers.dev";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Mission & Goals" : "लक्ष्य र उद्देश्य",
    description: lang === "en"
      ? "The mission, vision, and strategic goals of Reliance Finance Limited."
      : "रिलायन्स फाइनान्स लिमिटेडको मिशन, दृष्टिकोण र रणनीतिक लक्ष्यहरू।",
  };
}

export default async function MissionGoalsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  let page: any = null;
  try {
    const res = await fetch(`${API}/api/cms/mission-goals`);
    if (res.ok) page = await res.json();
  } catch {}

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-4 text-4xl font-bold">
            {lang === "en" ? "Mission & Goals" : "लक्ष्य र उद्देश्य"}
          </h1>
          <p className="max-w-3xl text-lg text-primary-100">
            {lang === "en"
              ? "Our vision, mission, and the goals that guide us forward"
              : "हाम्रो दृष्टिकोण, मिशन र हामीलाई अगाडि बढाउने लक्ष्यहरू"}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        {page ? (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: page.content || page.body || "" }} />
        ) : (
          <div className="space-y-12">
            <div className="rounded-xl border bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {lang === "en" ? "Our Vision" : "हाम्रो दृष्टिकोण"}
              </h2>
              <blockquote className="border-l-4 border-primary-700 bg-primary-50/50 px-6 py-4 italic text-gray-700">
                {lang === "en"
                  ? "To be the most trusted and customer-centric financial institution in Nepal, empowering individuals and businesses to achieve their financial aspirations through innovative solutions and unparalleled service."
                  : "नवीन समाधान र अतुलनीय सेवा मार्फत व्यक्ति र व्यवसायहरूलाई उनीहरूको वित्तीय आकांक्षाहरू प्राप्त गर्न सशक्त बनाउँदै, नेपालको सबैभन्दा विश्वसनीय र ग्राहक-केन्द्रित वित्तीय संस्था बन्ने।"}
              </blockquote>
            </div>

            <div className="rounded-xl border bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {lang === "en" ? "Our Mission" : "हाम्रो मिशन"}
              </h2>
              <blockquote className="border-l-4 border-accent-500 bg-accent-50/50 px-6 py-4 italic text-gray-700">
                {lang === "en"
                  ? "To provide accessible, reliable, and innovative financial products and services that meet the diverse needs of our customers, while ensuring sustainable growth and creating value for all stakeholders."
                  : "दिगो वृद्धि सुनिश्चित गर्दै र सबै सरोकारवालाहरूको लागि मूल्य सिर्जना गर्दै, हाम्रा ग्राहकहरूको विविध आवश्यकताहरू पूरा गर्ने सुलभ, भरपर्दो र अभिनव वित्तीय उत्पादन र सेवाहरू प्रदान गर्ने।"}
              </blockquote>
            </div>

            <div className="rounded-xl border bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {lang === "en" ? "Core Values" : "मूल मान्यताहरू"}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  {
                    title: lang === "en" ? "Integrity" : "इमानदारी",
                    desc: lang === "en"
                      ? "Upholding the highest ethical standards in all our dealings, ensuring transparency and honesty."
                      : "हाम्रो सबै व्यवहारमा उच्चतम नैतिक मापदण्डहरू कायम राख्दै, पारदर्शिता र इमानदारी सुनिश्चित गर्ने।",
                  },
                  {
                    title: lang === "en" ? "Customer Focus" : "ग्राहक केन्द्रित",
                    desc: lang === "en"
                      ? "Placing our customers at the heart of everything we do, understanding and exceeding their expectations."
                      : "हामीले गर्ने हरेक काममा ग्राहकहरूलाई केन्द्रमा राख्दै, उनीहरूको अपेक्षाहरू बुझ्ने र पार गर्ने।",
                  },
                  {
                    title: lang === "en" ? "Innovation" : "नवाचार",
                    desc: lang === "en"
                      ? "Embracing technology and creative thinking to deliver modern, efficient financial solutions."
                      : "आधुनिक, कुशल वित्तीय समाधानहरू प्रदान गर्न प्रविधि र रचनात्मक सोचलाई अँगाल्ने।",
                  },
                  {
                    title: lang === "en" ? "Excellence" : "उत्कृष्टता",
                    desc: lang === "en"
                      ? "Striving for the highest quality in service delivery, operations, and customer experience."
                      : "सेवा प्रवाह, सञ्चालन र ग्राहक अनुभवमा उच्चतम गुणस्तरको लागि प्रयासरत।",
                  },
                  {
                    title: lang === "en" ? "Teamwork" : "सहकार्य",
                    desc: lang === "en"
                      ? "Fostering a collaborative culture where every employee contributes to our collective success."
                      : "सहयोगी संस्कृतिलाई बढावा दिँदै जहाँ प्रत्येक कर्मचारीले हाम्रो सामूहिक सफलतामा योगदान पुर्याउँछ।",
                  },
                  {
                    title: lang === "en" ? "Social Responsibility" : "सामाजिक उत्तरदायित्व",
                    desc: lang === "en"
                      ? "Contributing positively to the communities we serve and promoting sustainable financial practices."
                      : "हामीले सेवा गर्ने समुदायहरूमा सकारात्मक योगदान र दिगो वित्तीय अभ्यासहरूको प्रवर्द्धन।",
                  },
                ].map((v) => (
                  <div key={v.title} className="rounded-lg border border-gray-100 bg-gray-50/50 p-5">
                    <h3 className="mb-2 font-semibold text-primary-700">{v.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {lang === "en" ? "Strategic Goals" : "रणनीतिक लक्ष्यहरू"}
              </h2>
              <ul className="space-y-3 text-gray-700">
                {(
                  lang === "en"
                    ? [
                        "Expand our branch network to reach underserved regions and bring banking closer to every Nepali.",
                        "Enhance digital banking capabilities to provide seamless, 24/7 financial services.",
                        "Introduce innovative products tailored to the evolving needs of individuals, SMEs, and corporates.",
                        "Strengthen risk management frameworks to ensure financial stability and regulatory compliance.",
                        "Attract, develop, and retain top talent to build a high-performance organizational culture.",
                        "Increase shareholder value through sustainable growth and operational efficiency.",
                      ]
                    : [
                        "प्रत्येक नेपालीको नजिक बैंकिङ पुर्याउन शाखा सञ्जाल विस्तार गर्ने।",
                        "सहज, २४/७ वित्तीय सेवाहरू प्रदान गर्न डिजिटल बैंकिङ क्षमताहरू बृद्धि गर्ने।",
                        "व्यक्ति, साना तथा मझौला उद्यम र कर्पोरेटहरूको आवश्यकता अनुरूप अभिनव उत्पादनहरू ल्याउने।",
                        "वित्तीय स्थिरता र नियामक अनुपालन सुनिश्चित गर्न जोखिम व्यवस्थापन ढाँचालाई सुदृढ गर्ने।",
                        "उच्च प्रदर्शन गर्ने संगठनात्मक संस्कृति निर्माण गर्न उत्कृष्ट प्रतिभाहरू आकर्षित, विकास र कायम राख्ने।",
                        "दिगो विकास र परिचालन दक्षता मार्फत सेयरधनीको मूल्य वृद्धि गर्ने।",
                      ]
                ).map((goal, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-700 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
