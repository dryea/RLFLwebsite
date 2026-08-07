import { serverFetchAPI } from "@/lib/server-api";
import HeroSlider from "@/components/sections/HeroSlider";
import RatesTicker from "@/components/sections/RatesTicker";
import OfferingsGrid from "@/components/sections/OfferingsGrid";
import AboutSection from "@/components/sections/AboutSection";
import EMISection from "@/components/sections/EMISection";
import NewsEventsSection from "@/components/sections/NewsEventsSection";
import CSRGrid from "@/components/sections/CSRGrid";
import AppBanner from "@/components/sections/AppBanner";
import HeroQuickActions from "@/components/sections/HeroQuickActions";
import HeroRatesWidget from "@/components/sections/HeroRatesWidget";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import HomepageSections from "@/components/sections/HomepageSections";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: {
      absolute: lang === "en" ? "Reliance Finance Limited" : "रिलायन्स फाइनान्स लिमिटेड",
    },
    description:
      lang === "en"
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
    // Render with defaults — all sections have built-in fallbacks
  }

  return (
    <>
      {/* 1. Hero — Full viewport, cinematic */}
      <HeroSlider slides={data.slides} lang={lang} />

      {/* 2. Quick Actions + Live Rates — below hero */}
      <div className="relative z-20 -mt-4 pb-6">
        <div className="container-page">
          <div className="grid items-end gap-4 lg:grid-cols-[1fr_280px]">
            <HeroQuickActions lang={lang} />
            <div className="hidden lg:block">
              <HeroRatesWidget lang={lang} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Live Rates Ticker */}
      <RatesTicker lang={lang} />

      {/* 4. Why Choose Us — trust & benefits */}
      <WhyChooseUs lang={lang} />

      {/* 5–10: Main homepage sections */}
      <HomepageSections
        offerings={<OfferingsGrid offerings={data.offerings} lang={lang} />}
        about={
          <AboutSection
            lang={lang}
            stats={data.stats}
            imageUrl={data.aboutImageUrl}
          />
        }
        emi={<EMISection lang={lang} />}
        news={<NewsEventsSection lang={lang} />}
        csr={(data.csrActivities?.length ?? 0) > 0 ? <CSRGrid activities={data.csrActivities} lang={lang} /> : null}
        appBanner={<AppBanner data={data.appBanner} lang={lang} />}
        lang={lang}
      />
    </>
  );
}
