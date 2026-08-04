import { serverFetchAPI } from "@/lib/server-api";
import HeroSlider from "@/components/sections/HeroSlider";
import RatesTicker from "@/components/sections/RatesTicker";
import OfferingsGrid from "@/components/sections/OfferingsGrid";
import AboutSection from "@/components/sections/AboutSection";
import EMISection from "@/components/sections/EMISection";
import NewsEventsSection from "@/components/sections/NewsEventsSection";
import CSRGrid from "@/components/sections/CSRGrid";
import AppBanner from "@/components/sections/AppBanner";
import HomepageSections from "@/components/sections/HomepageSections";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: {
      absolute: lang === "en" ? "Reliance Finance Limited" : "रिलायन्स फाइनान्स लिमिटेड",
    },
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
      <RatesTicker lang={lang} />

      <HomepageSections
        offerings={<OfferingsGrid offerings={data.offerings} lang={lang} />}
        about={
          <AboutSection
            lang={lang}
            stats={data.stats}
            imageUrl={data.aboutImageUrl}
          />
        }
        emi={<EMISection />}
        news={<NewsEventsSection lang={lang} />}
        csr={(data.csrActivities?.length ?? 0) > 0 ? <CSRGrid activities={data.csrActivities} lang={lang} /> : null}
        appBanner={<AppBanner data={data.appBanner} lang={lang} />}
        lang={lang}
      />
    </>
  );
}
