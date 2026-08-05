import { serverFetchAPI } from "@/lib/server-api";

export const dynamic = "force-dynamic";

const defaultContent: Record<string, any> = {
  en: {
    title: "Beware of Digital Fraud",
    subtitle: "Stay alert and protect yourself from online fraud and scams.",
    description:
      "Reliance Finance Limited never asks for your PIN, OTP, passwords, or card details over phone calls, SMS, or email. Be cautious of fraudulent calls, messages, and websites pretending to be us.",
    warnings: [
      { title: "Never Share OTP/PIN", description: "We never ask for your OTP, PIN, CVV, or internet banking password. Sharing these gives fraudsters access to your accounts." },
      { title: "Beware of Fake Calls", description: "Fraudsters may call posing as bank officials. We never request money transfers or sensitive information over the phone." },
      { title: "Verify Links & Websites", description: "Only use the official RFL Smart app and our verified website. Check URLs carefully before entering credentials." },
      { title: "Don't Trust 'Lottery' or 'Prize' Offers", description: "Ignore unsolicited messages promising prizes, lottery winnings, or loan approvals in exchange for advance payment." },
      { title: "Report Suspicious Activity", description: "If you receive suspicious calls or messages, contact us immediately at our official numbers." },
      { title: "Keep Your Devices Secure", description: "Use strong passwords, update your apps regularly, and avoid public Wi-Fi for banking transactions." },
    ],
    contact: "For any suspicious activity, call +977–01–5361104 or email info@reliancenepal.com.np immediately.",
  },
  np: {
    title: "डिजिटल धोखाधडीबाट सजग रहनुहोस्",
    subtitle: "अनलाइन ठगी र धोखाधडीबाट आफूलाई सुरक्षित राख्नुहोस्।",
    description:
      "रिलायन्स फाइनान्स लिमिटेडले तपाईंको PIN, OTP, पासवर्ड वा कार्ड विवरण फोन कल, SMS वा इमेल मार्फत कहिल्यै सोध्दैन। हामी बनेको नक्कली कल, सन्देश र वेबसाइटहरूबाट सजग रहनुहोस्।",
    warnings: [
      { title: "OTP/PIN कहिल्यै साझा नगर्नुहोस्", description: "हामी तपाईंको OTP, PIN, CVV वा इन्टरनेट बैंकिङ पासवर्ड कहिल्यै सोध्दैनौं। यी साझा गर्दा ठगहरूलाई तपाईंको खातामा पहुँच मिल्छ।" },
      { title: "नक्कली कलहरूबाट सजग रहनुहोस्", description: "ठगहरू बैंक कर्मचारी बनेर फोन गर्न सक्छन्। हामी फोन मार्फत पैसा सार्न वा संवेदनशील जानकारी कहिल्यै माग्दैनौं।" },
      { title: "लिङ्क र वेबसाइट प्रमाणित गर्नुहोस्", description: "आधिकारिक RFL Smart एप र हाम्रो प्रमाणित वेबसाइट मात्र प्रयोग गर्नुहोस्। क्रेडेन्सियल प्रविष्ट गर्नु अघि URL ध्यानपूर्वक जाँच्नुहोस्।" },
      { title: "'लटरी' वा 'पुरस्कार' प्रस्तावहरूमा विश्वास नगर्नुहोस्", description: "अग्रिम भुक्तानीको बदलामा पुरस्कार, लटरी जित वा ऋण स्वीकृतिको प्रतिज्ञा गर्ने अनावश्यक सन्देशहरूलाई बेवास्ता गर्नुहोस्।" },
      { title: "शंकास्पद गतिविधि रिपोर्ट गर्नुहोस्", description: "यदि तपाईंलाई शंकास्पद कल वा सन्देश आयो भने, तुरुन्तै हाम्रो आधिकारिक नम्बरमा सम्पर्क गर्नुहोस्।" },
      { title: "आफ्ना यन्त्रहरू सुरक्षित राख्नुहोस्", description: "बलियो पासवर्ड प्रयोग गर्नुहोस्, नियमित रूपमा एपहरू अपडेट गर्नुहोस्, र बैंकिङ कारोबारका लागि सार्वजनिक Wi-Fi बेवास्ता गर्नुहोस्।" },
    ],
    contact: "शंकास्पद गतिविधिको लागि, तुरुन्तै +977–01–5361104 मा कल गर्नुहोस् वा info@reliancenepal.com.np मा इमेल गर्नुहोस्।",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Beware of Digital Fraud | Reliance Finance Limited" : "डिजिटल धोखाधडीबाट सजग रहनुहोस् | रिलायन्स फाइनान्स लिमिटेड",
    description: lang === "en" ? "Protect yourself from online fraud and scams." : "अनलाइन ठगी र धोखाधडीबाट आफूलाई सुरक्षित राख्नुहोस्।",
  };
}

export default async function BewareOfDigitalFraudPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  let cms: any = null;
  try {
    cms = await serverFetchAPI("/api/pages/beware-of-digital-fraud");
  } catch {}
  const content = defaultContent[lang];
  const cmsHtml = lang === "np" ? (cms?.contentNp || cms?.content) : (cms?.content || cms?.contentNp);

  return (
    <>
      <section className="bg-gradient-to-br from-red-800 to-red-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{cms?.title || content.title}</h1>
          <p className="mt-2 text-red-100">{cms?.titleNp && lang === "np" ? cms.titleNp : content.subtitle}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            {cmsHtml && <div className="prose max-w-none text-lg leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: cmsHtml }} />}
            {!cmsHtml && <p className="text-lg leading-relaxed text-gray-600">{content.description}</p>}

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {content.warnings.map((item: any, i: number) => (
                <div key={i} className="rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-lg font-bold text-red-700">!</div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl border bg-red-50 p-6">
              <h2 className="text-lg font-bold text-gray-900">{lang === "en" ? "Report Fraud" : "ठगी रिपोर्ट गर्नुहोस्"}</h2>
              <p className="mt-2 text-gray-600">{content.contact}</p>
            </div>
        </div>
        </div>
      </section>
    </>
  );
}
