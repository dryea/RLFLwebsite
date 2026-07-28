import { serverFetchAPI } from "@/lib/server-api";
import HeroSlider from "@/components/sections/HeroSlider";
import OfferingsGrid from "@/components/sections/OfferingsGrid";
import AboutSection from "@/components/sections/AboutSection";
import EMISection from "@/components/sections/EMISection";
import NewsEventsSection from "@/components/sections/NewsEventsSection";
import CSRGrid from "@/components/sections/CSRGrid";
import AppBanner from "@/components/sections/AppBanner";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Reliance Finance Limited" : "रिलायन्स फाइनान्स लिमिटेड",
    description: lang === "en"
      ? "Your trusted financial partner in Nepal — savings, loans, fixed deposits, and digital banking services."
      : "नेपालमा तपाईंको विश्वसनीय वित्तीय साझेदार — बचत, ऋण, मुद्दती निक्षेप र डिजिटल बैंकिङ सेवाहरू।",
  };
}

interface HomepageData {
  slides: any[];
  offerings: any[];
  stats: any[];
  csrActivities: any[];
  appBanner: any | null;
  aboutTitle?: string;
  aboutTitleNp?: string;
  aboutDescription?: string;
  aboutDescriptionNp?: string;
  aboutImageUrl?: string;
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  let data: HomepageData = { slides: [], offerings: [], stats: [], csrActivities: [], appBanner: null };
  try {
    const res = await serverFetchAPI("/api/homepage/full");
    data = res.data || res;
  } catch {
    // Use default/empty data so the page always renders
  }

  return (
    <>
      <HeroSlider slides={data.slides} lang={lang} />

      <section className="section bg-white">
        <div className="container-page">
          <div className="section-header">
            <h2>{lang === "en" ? "Our Core Offerings" : "हाम्रा मुख्य सेवाहरू"}</h2>
            <p>{lang === "en" ? "Explore our wide range of tailored financial products designed to build your future and foster mutual growth." : "तपाईंको भविष्य निर्माण गर्न र पारस्परिक वृद्धिलाई बढावा दिन डिजाइन गरिएका हाम्रा अनुकूलित वित्तीय उत्पादनहरूको विस्तृत श्रृंखला अन्वेषण गर्नुहोस्।"}</p>
          </div>
          <OfferingsGrid offerings={data.offerings} lang={lang} />
        </div>
      </section>

      <AboutSection
        lang={lang}
        stats={data.stats}
        title={data.aboutTitle}
        titleNp={data.aboutTitleNp}
        description={data.aboutDescription}
        descriptionNp={data.aboutDescriptionNp}
        imageUrl={data.aboutImageUrl}
      />

      <section className="section bg-white">
        <div className="container-page">
          <div className="section-header">
            <h2>{lang === "en" ? "Quick Loan EMI Estimator" : "द्रुत ऋण EMI अनुमानक"}</h2>
            <p>{lang === "en" ? "Plan your expenses efficiently. Adjust the sliders below to get a quick estimate of your monthly installments." : "आफ्नो खर्च कुशलतापूर्वक योजना गर्नुहोस्। आफ्नो मासिक किस्ताको द्रुत अनुमान प्राप्त गर्न तलका स्लाइडरहरू समायोजन गर्नुहोस्।"}</p>
          </div>
          <EMISection />
        </div>
      </section>

      <section className="section bg-surface-alt">
        <div className="container-page">
          <div className="section-header">
            <h2>{lang === "en" ? "Latest Highlights & Events" : "पछिल्लो हाइलाइट्स र कार्यक्रमहरू"}</h2>
            <p>{lang === "en" ? "Stay up to date with our recent corporate announcements, community services, and public notices." : "हाम्रो हालैका कर्पोरेट घोषणाहरू, सामुदायिक सेवाहरू र सार्वजनिक सूचनाहरूसँग अद्यावधिक रहनुहोस्।"}</p>
          </div>
          <NewsEventsSection lang={lang} />
        </div>
      </section>

      {(data.csrActivities?.length ?? 0) > 0 && (
        <section className="section bg-white">
          <div className="container-page">
            <div className="section-header">
              <h2>{lang === "en" ? "Corporate Social Responsibility" : "कर्पोरेट सामाजिक उत्तरदायित्व"}</h2>
              <p>{lang === "en" ? "Making a difference where it matters. We commit ourselves to enhancing public health, education, and relief efforts across Nepal." : "जहाँ महत्त्व छ त्यहाँ परिवर्तन ल्याउँदै। हामी नेपालभर सार्वजनिक स्वास्थ्य, शिक्षा र राहत प्रयासहरू बढाउन प्रतिबद्ध छौं।"}</p>
            </div>
            <CSRGrid activities={data.csrActivities} lang={lang} />
          </div>
        </section>
      )}

      <section className="section bg-surface-alt">
        <div className="container-page">
          <AppBanner data={data.appBanner} lang={lang} />
        </div>
      </section>
    </>
  );
}
