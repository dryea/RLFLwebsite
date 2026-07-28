const API = process.env.NEXT_PUBLIC_API_URL || "https://rfil-api.sudeepdhakal.workers.dev";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Introduction" : "परिचय",
    description: lang === "en"
      ? "Learn about Reliance Finance Limited — a trusted C-class finance company in Nepal."
      : "रिलायन्स फाइनान्स लिमिटेडको बारेमा जान्नुहोस् — नेपालको एक विश्वसनीय वित्तीय संस्था।",
  };
}

export default async function IntroductionPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  let page: any = null;
  try {
    const res = await fetch(`${API}/api/cms/introduction`);
    if (res.ok) page = await res.json();
  } catch {}

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-4 text-4xl font-bold">
            {lang === "en" ? "Introduction" : "परिचय"}
          </h1>
          <p className="max-w-3xl text-lg text-primary-100">
            {lang === "en"
              ? "Reliance Finance Limited — a trusted name in Nepali banking"
              : "रिलायन्स फाइनान्स लिमिटेड — नेपाली बैंकिङमा एक विश्वसनीय नाम"}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        {page ? (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: page.content || page.body || "" }} />
        ) : (
          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-6">
            {lang === "en" ? (
              <>
                <p>
                  Reliance Finance Limited is a C-class finance company registered under the Companies Act of Nepal and licensed by Nepal Rastra Bank (NRB). Established with a vision to provide accessible and reliable financial services, the company has grown steadily to become a respected name in Nepal's financial sector.
                </p>
                <p>
                  Headquartered in Kamaladi, Kathmandu, Reliance Finance operates through a network of branch offices across key cities including New Road, Pokhara, and other strategic locations. Our presence continues to expand as we bring banking services closer to communities nationwide.
                </p>
                <p>
                  We offer a comprehensive range of financial products and services including savings accounts, fixed deposits, various loan products (marginal nature, hire purchase, personal, education, and house loans), and digital banking services. Our customer-centric approach ensures that every product is designed to meet the evolving needs of individuals, businesses, and institutions.
                </p>
                <p>
                  At Reliance Finance, we pride ourselves on our commitment to transparency, integrity, and innovation. We adhere strictly to the regulatory guidelines of Nepal Rastra Bank and maintain the highest standards of corporate governance. Our dedicated team of professionals works tirelessly to deliver exceptional service and build lasting relationships with our customers.
                </p>
                <p>
                  As we look to the future, Reliance Finance remains focused on leveraging technology to enhance customer experience, expanding our reach to underserved areas, and contributing to the economic development of Nepal.
                </p>
              </>
            ) : (
              <>
                <p>
                  रिलायन्स फाइनान्स लिमिटेड नेपालको कम्पनी ऐन अन्तर्गत दर्ता भएको र नेपाल राष्ट्र बैंक (NRB) द्वारा इजाजतपत्र प्राप्त एक वर्ग 'ग' को वित्तीय कम्पनी हो। सुलभ र भरपर्दो वित्तीय सेवाहरू प्रदान गर्ने दृष्टिकोणका साथ स्थापित, कम्पनी नेपालको वित्तीय क्षेत्रमा एक सम्मानित नामको रूपमा विकसित भएको छ।
                </p>
                <p>
                  कमलादी, काठमाडौंमा केन्द्रिय कार्यालय रहेको रिलायन्स फाइनान्सले नयाँ सडक, पोखरा लगायत प्रमुख सहरहरूमा शाखा कार्यालयहरू मार्फत सेवा प्रदान गर्दै आएको छ। बैंकिङ सेवाहरूलाई समुदायको नजिक पुर्याउँदै हाम्रो उपस्थिति निरन्तर विस्तार हुँदै गइरहेको छ।
                </p>
                <p>
                  हामी बचत खाता, मुद्दती निक्षेप, विभिन्न ऋण उत्पादनहरू (मार्जिन प्रकृति, हायर पर्चेज, व्यक्तिगत, शिक्षा र घर ऋण), र डिजिटल बैंकिङ सेवाहरू सहित वित्तीय उत्पादन र सेवाहरूको एक विस्तृत श्रृंखला प्रदान गर्दछौं। हाम्रो ग्राहक-केन्द्रित दृष्टिकोणले प्रत्येक उत्पादन व्यक्ति, व्यवसाय र संस्थाहरूको आवश्यकता पूरा गर्न डिजाइन गरिएको सुनिश्चित गर्दछ।
                </p>
                <p>
                  रिलायन्स फाइनान्समा, हामी पारदर्शिता, इमानदारी र नवाचारप्रति हाम्रो प्रतिबद्धतामा गर्व गर्दछौं। हामी नेपाल राष्ट्र बैंकको नियामक दिशानिर्देशहरूको कडाईका साथ पालना गर्दछौं र कर्पोरेट प्रशासनको उच्चतम मापदण्डहरू कायम राख्दछौं। हाम्रो समर्पित पेशेवरहरूको टोलीले असाधारण सेवा प्रदान गर्न र ग्राहकहरूसँग दीर्घकालीन सम्बन्ध निर्माण गर्न निरन्तर प्रयास गर्दछ।
                </p>
                <p>
                  भविष्यको दृष्टिकोणले, रिलायन्स फाइनान्सले ग्राहक अनुभव बृद्धि गर्न प्रविधिको उपयोग, कम सेवा भएका क्षेत्रहरूमा पहुँच विस्तार, र नेपालको आर्थिक विकासमा योगदान पुर्याउन केन्द्रित रहेको छ।
                </p>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
