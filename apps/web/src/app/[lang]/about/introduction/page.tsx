import { API } from "@/lib/api";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import StaggerChildren, { StaggerItem } from "@/components/motion/StaggerChildren";
import AnimatedBar from "@/components/sections/AnimatedBar";
import MilestoneTimeline from "@/components/sections/MilestoneTimeline";
import {
  Target,
  Eye,
  Sparkles,
  HeartHandshake,
  Lightbulb,
  Trophy,
  Users,
  Globe,
  Building2,
  Smartphone,
  ShieldCheck,
  Landmark,
} from "lucide-react";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Who We Are | Reliance Finance Limited" : "हामी को हौं | रिलायन्स फाइनान्स लिमिटेड",
    description:
      lang === "en"
        ? "Discover Reliance Finance Limited — our mission, vision, core values, strategic framework, milestones, and capital strength."
        : "रिलायन्स फाइनान्स लिमिटेड बारेमा जान्नुहोस् — हाम्रो मिशन, दृष्टिकोण, मूल मान्यता, रणनीतिक ढाँचा, कोशेढुङ्गा र पुँजी बल।",
  };
}

async function getPage(slug: string): Promise<any | null> {
  try {
    const res = await fetch(`${API}/api/pages/${slug}`, { next: { revalidate: 300 } });
    if (res.ok) return res.json();
  } catch {}
  return null;
}

const cmsContent = (page: any, lang: string) => {
  if (!page) return null;
  const html = (lang === "np" && page.contentNp ? page.contentNp : page.content) || page.body || "";
  return html && html.trim().length > 0 && !/^\s*<p>\s*<\/p>\s*$/.test(html) ? html : null;
};

const sectionIds = [
  { id: "who-we-are", en: "Who We Are", np: "हामी को हौं" },
  { id: "mission-goals", en: "Mission & Goals", np: "लक्ष्य र उद्देश्य" },
  { id: "strategic-framework", en: "Strategic Framework", np: "रणनीतिक ढाँचा" },
  { id: "milestones", en: "Milestones", np: "कोशेढुङ्गाहरू" },
  { id: "capital-structure", en: "Capital Structure", np: "पुँजी संरचना" },
];

export default async function WhoWeArePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isNp = lang === "np";

  const [intro, mission, framework, milestonesPage, capital] = await Promise.all([
    getPage("introduction"),
    getPage("mission-goals"),
    getPage("strategic-framework"),
    getPage("milestones"),
    getPage("capital-structure"),
  ]);

  const introHtml = cmsContent(intro, lang);
  const missionHtml = cmsContent(mission, lang);
  const frameworkHtml = cmsContent(framework, lang);
  const milestonesHtml = cmsContent(milestonesPage, lang);
  const capitalHtml = cmsContent(capital, lang);

  const coreValues = isNp
    ? [
        { title: "इमानदारी", desc: "हाम्रो सबै व्यवहारमा उच्चतम नैतिक मापदण्डहरू कायम राख्दै, पारदर्शिता र इमानदारी सुनिश्चित गर्ने।", icon: ShieldCheck },
        { title: "ग्राहक केन्द्रित", desc: "हामीले गर्ने हरेक काममा ग्राहकहरूलाई केन्द्रमा राख्दै, उनीहरूको अपेक्षाहरू बुझ्ने र पार गर्ने।", icon: HeartHandshake },
        { title: "नवाचार", desc: "आधुनिक, कुशल वित्तीय समाधानहरू प्रदान गर्न प्रविधि र रचनात्मक सोचलाई अँगाल्ने।", icon: Lightbulb },
        { title: "उत्कृष्टता", desc: "सेवा प्रवाह, सञ्चालन र ग्राहक अनुभवमा उच्चतम गुणस्तरको लागि प्रयासरत।", icon: Trophy },
        { title: "सहकार्य", desc: "सहयोगी संस्कृतिलाई बढावा दिँदै जहाँ प्रत्येक कर्मचारीले हाम्रो सामूहिक सफलतामा योगदान पुर्‍याउँछ।", icon: Users },
        { title: "सामाजिक उत्तरदायित्व", desc: "हामीले सेवा गर्ने समुदायहरूमा सकारात्मक योगदान र दिगो वित्तीय अभ्यासहरूको प्रवर्द्धन।", icon: Globe },
      ]
    : [
        { title: "Integrity", desc: "Upholding the highest ethical standards in all our dealings, ensuring transparency and honesty.", icon: ShieldCheck },
        { title: "Customer Focus", desc: "Placing our customers at the heart of everything we do, understanding and exceeding their expectations.", icon: HeartHandshake },
        { title: "Innovation", desc: "Embracing technology and creative thinking to deliver modern, efficient financial solutions.", icon: Lightbulb },
        { title: "Excellence", desc: "Striving for the highest quality in service delivery, operations, and customer experience.", icon: Trophy },
        { title: "Teamwork", desc: "Fostering a collaborative culture where every employee contributes to our collective success.", icon: Users },
        { title: "Social Responsibility", desc: "Contributing positively to the communities we serve and promoting sustainable financial practices.", icon: Globe },
      ];

  const strategicGoals = isNp
    ? [
        "प्रत्येक नेपालीको नजिक बैंकिङ पुर्‍याउन शाखा सञ्जाल विस्तार गर्ने।",
        "सहज, २४/७ वित्तीय सेवाहरू प्रदान गर्न डिजिटल बैंकिङ क्षमताहरू बृद्धि गर्ने।",
        "व्यक्ति, साना तथा मझौला उद्यम र कर्पोरेटहरूको आवश्यकता अनुरूप अभिनव उत्पादनहरू ल्‍याउने।",
        "वित्तीय स्थिरता र नियामक अनुपालन सुनिश्चित गर्न जोखिम व्यवस्थापन ढाँचालाई सुदृढ गर्ने।",
        "उच्च प्रदर्शन गर्ने संगठनात्मक संस्कृति निर्माण गर्न उत्कृष्ट प्रतिभाहरू आकर्षित, विकास र कायम राख्ने।",
        "दिगो विकास र परिचालन दक्षता मार्फत सेयरधनीको मूल्य वृद्धि गर्ने।",
      ]
    : [
        "Expand our branch network to reach underserved regions and bring banking closer to every Nepali.",
        "Enhance digital banking capabilities to provide seamless, 24/7 financial services.",
        "Introduce innovative products tailored to the evolving needs of individuals, SMEs, and corporates.",
        "Strengthen risk management frameworks to ensure financial stability and regulatory compliance.",
        "Attract, develop, and retain top talent to build a high-performance organizational culture.",
        "Increase shareholder value through sustainable growth and operational efficiency.",
      ];

  const pillars = isNp
    ? [
        { title: "डिजिटल रूपान्तरण", icon: Smartphone, items: ["बलियो कोर बैंकिङ प्रणाली स्तरोन्नति", "मोबाइल र इन्टरनेट बैंकिङ प्लेटफर्म सुरूवात", "डिजिटल ऋण र अनबोर्डिङ क्षमताहरूको विकास"] },
        { title: "शाखा र सञ्जाल विस्तार", icon: Building2, items: ["प्रादेशिक र नगरपालिका मुख्यालयहरूमा विस्तार", "प्रमुख बजार क्षेत्रहरूमा ग्राहक सम्पर्क बिन्दुहरू", "वैकल्पिक वितरण च्यानलहरूको विकास"] },
        { title: "उत्पादन नवाचार", icon: Lightbulb, items: ["साना तथा मझौला उद्यमहरूको लागि अनुकूलित उत्पादन", "प्रतिस्पर्धी निक्षेप र ऋण योजनाहरूको विकास", "रेमिट्यान्स-लिंक्ड वित्तीय उत्पादनहरूको सुरूवात"] },
        { title: "जोखिम र अनुपालन", icon: ShieldCheck, items: ["उद्यम जोखिम व्यवस्थापन ढाँचा सुदृढीकरण", "NRB निर्देशन र बासेल मापदण्डहरूको पूर्ण अनुपालन", "बलियो AML/CFT प्रक्रियाहरूको कार्यान्वयन"] },
      ]
    : [
        { title: "Digital Transformation", icon: Smartphone, items: ["Implement robust core banking system upgrades", "Launch mobile and internet banking platforms", "Develop digital lending and onboarding capabilities"] },
        { title: "Branch & Network Expansion", icon: Building2, items: ["Expand to provincial and municipal headquarters", "Establish customer touchpoints in key market areas", "Develop alternate delivery channels (ATMs, agent banking)"] },
        { title: "Product Innovation", icon: Lightbulb, items: ["Introduce tailored products for SMEs and women entrepreneurs", "Develop competitive deposit and loan schemes", "Launch remittance-linked financial products"] },
        { title: "Risk & Compliance", icon: ShieldCheck, items: ["Strengthen enterprise risk management framework", "Ensure full compliance with NRB directives and Basel norms", "Implement robust AML/CFT procedures"] },
      ];

  const milestones = isNp
    ? [
        { year: "२००१", title: "कम्पनी स्थापना", description: "रिलायन्स फाइनान्स लिमिटेड कम्पनी ऐन अन्तर्गत सार्वजनिक लिमिटेड कम्पनीको रूपमा स्थापित भयो।" },
        { year: "२००२", title: "NRB इजाजतपत्र", description: "नेपाल राष्ट्र बैंकबाट वर्ग 'ग' वित्तीय कम्पनीको रूपमा सञ्चालन इजाजतपत्र प्राप्त।" },
        { year: "२००३", title: "पहिलो शाखा उद्घाटन", description: "कमलादी, काठमाडौंमा पहिलो शाखा कार्यालय खोली बैंकिङ सञ्चालन सुरू गरियो।" },
        { year: "२००५", title: "सञ्जाल विस्तार", description: "नयाँ सडक र पोखरामा नयाँ शाखाहरू सहित सञ्चालन विस्तार।" },
        { year: "२००८", title: "डिजिटल बैंकिङ सुरूवात", description: "एसएमएस बैंकिङ र अनलाइन खाता पहुँच सहित डिजिटल बैंकिङ सेवाहरूको सुरूवात।" },
        { year: "२०१०", title: "पुँजी वृद्धि", description: "NRB को संशोधित न्यूनतम पुँजी आवश्यकता पूरा गर्न चुक्ता पुँजी वृद्धि।" },
        { year: "२०१३", title: "उत्पादन विविधीकरण", description: "घर ऋण, शिक्षा ऋण र हायर पर्चेज योजनाहरू सहित नयाँ ऋण उत्पादनहरूको सुरूवात।" },
        { year: "२०१५", title: "विपद् पुनरुत्थान", description: "२०७२ को भूकम्प पछि द्रुत रूपमा सञ्चालन पुनः सुरू गरी समुदायको राहत प्रयासहरूमा सहयोग।" },
        { year: "२०१८", title: "कोर बैंकिङ स्तरोन्नति", description: "सुधारिएको दक्षता र ग्राहक सेवाको लागि आधुनिक कोर बैंकिङ प्रणालीको कार्यान्वयन।" },
        { year: "२०२०", title: "डिजिटल प्रवेग", description: "महामारीको प्रतिक्रियामा डिजिटल रूपान्तरणलाई गति दिँदै परिष्कृत मोबाइल बैंकिङ सेवाहरू सुरूवात।" },
        { year: "२०२२", title: "पुँजी कोशेढुङ्गा", description: "महत्वपूर्ण पुँजी वृद्धि हासिल गर्दै कम्पनीको वित्तीय शक्तिलाई सुदृढ पारियो।" },
        { year: "२०२४", title: "रणनीतिक वृद्धि", description: "निरन्तर शाखा विस्तार र उत्पादन नवाचार, बजार स्थिति सुदृढीकरण।" },
      ]
    : [
        { year: "2001", title: "Company Incorporation", description: "Reliance Finance Limited was incorporated as a public limited company under the Companies Act." },
        { year: "2002", title: "NRB License", description: "Received operating license from Nepal Rastra Bank as a C-class finance company." },
        { year: "2003", title: "First Branch Opening", description: "Opened our first branch office in Kamaladi, Kathmandu, commencing banking operations." },
        { year: "2005", title: "Network Expansion", description: "Expanded operations with new branches in New Road and Pokhara." },
        { year: "2008", title: "Digital Banking Launch", description: "Introduced digital banking services including SMS banking and online account access." },
        { year: "2010", title: "Capital Enhancement", description: "Increased paid-up capital to meet NRB's revised minimum capital requirement." },
        { year: "2013", title: "Product Diversification", description: "Launched new loan products including home loans, education loans, and hire purchase schemes." },
        { year: "2015", title: "Disaster Recovery", description: "Demonstrated resilience by quickly resuming operations after the 2015 earthquake, supporting community relief efforts." },
        { year: "2018", title: "Core Banking Upgrade", description: "Implemented modern core banking system for improved efficiency and customer service." },
        { year: "2020", title: "Digital Acceleration", description: "Accelerated digital transformation in response to the pandemic, launching enhanced mobile banking services." },
        { year: "2022", title: "Capital Milestone", description: "Achieved significant capital growth, reinforcing the company's financial strength." },
        { year: "2024", title: "Strategic Growth", description: "Continued branch expansion and product innovation, strengthening market position in Nepal's financial sector." },
      ];

  const capitalRows = isNp
    ? [
        { label: "अधिकृत पुँजी", amount: "५०,००,००,०००" },
        { label: "जारी पुँजी", amount: "३५,००,००,०००" },
        { label: "चुक्ता पुँजी", amount: "३५,००,००,०००" },
        { label: "आरक्षित कोष", amount: "१२,००,००,०००" },
        { label: "कुल सेयरधनी कोष", amount: "४७,००,००,०००" },
      ]
    : [
        { label: "Authorized Capital", amount: "500,000,000" },
        { label: "Issued Capital", amount: "350,000,000" },
        { label: "Paid-up Capital", amount: "350,000,000" },
        { label: "Reserve & Surplus", amount: "120,000,000" },
        { label: "Total Shareholders' Equity", amount: "470,000,000" },
      ];

  const shareholding = isNp
    ? [
        { group: "प्रवर्द्धक / प्रायोजक सेयरधनीहरू", x: 60, color: "bg-primary-700" },
        { group: "सर्वसाधारण", x: 25, color: "bg-primary-500" },
        { group: "संस्थागत लगानीकर्ता", x: 10, color: "bg-primary-400" },
        { group: "कर्मचारी र अन्य", x: 5, color: "bg-primary-300" },
      ]
    : [
        { group: "Promoter / Sponsor Shareholders", x: 60, color: "bg-primary-700" },
        { group: "General Public", x: 25, color: "bg-primary-500" },
        { group: "Institutional Investors", x: 10, color: "bg-primary-400" },
        { group: "Employees & Others", x: 5, color: "bg-primary-300" },
      ];

  const compliance = isNp
    ? [
        "पुँजी पर्याप्तता अनुपात (CAR): NRB न्यूनतम आवश्यकता भन्दा माथि कायम",
        "स्तर १ पुँजी: चुक्ता पुँजी, आरक्षित कोष र संचित मुनाफा समावेश",
        "स्तर २ पुँजी: अधिनस्थ ऋण र सामान्य ऋण नोक्सान प्रावधान",
        "CCD अनुपात: नेपाल राष्ट्र बैंकले तोकेको नियामक सीमा भित्र",
        "सबै वित्तीय जानकारी लेखापरीक्षण गरी NRB मा पेश",
      ]
    : [
        "Capital Adequacy Ratio (CAR): Maintained above NRB minimum requirement",
        "Tier 1 Capital: Comprising paid-up capital, reserves, and retained earnings",
        "Tier 2 Capital: Subordinated debt and general loan loss provisions",
        "CCD Ratio: Within regulatory limits prescribed by Nepal Rastra Bank",
        "All financial disclosures audited and filed with NRB as per regulatory schedule",
      ];

  const sectionTitle = (title: string, sub: string) => (
    <div className="mb-10 text-center">
      <span className="mb-3 inline-block rounded-full bg-primary-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary-700">
        {isNp ? "रिलायन्स फाइनान्स" : "Reliance Finance"}
      </span>
      <h2 className="relative mb-4 text-3xl font-bold text-primary-800 md:text-4xl">
        {title}
        <span
          className="absolute bottom-0 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full"
          style={{ background: "linear-gradient(90deg, #8E44AD, #F2A900)" }}
        />
      </h2>
      {sub && <p className="mx-auto max-w-2xl text-lg text-text-secondary">{sub}</p>}
    </div>
  );

  const cmsBlock = (html: string | null) =>
    html ? (
      <Reveal>
        <div
          className="prose prose-lg mx-auto max-w-4xl leading-relaxed text-gray-600 [&_p]:mb-4"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Reveal>
    ) : null;

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 py-20 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse at 20% 20%, #F2A900 0%, transparent 50%)" }}
        />
        <div className="container-page relative">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-primary-200">
            <ol className="flex items-center gap-2">
              <li><Link href={`/${lang}`} className="hover:text-white transition-colors">{isNp ? "गृहपृष्ठ" : "Home"}</Link></li>
              <li aria-hidden>›</li>
              <li aria-current="page" className="text-white/90">{isNp ? "हामी को हौं" : "Who We Are"}</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-secondary-300 backdrop-blur">
              <Landmark className="h-3.5 w-3.5" />
              {isNp ? "हाम्रो परिचय" : "About Us"}
            </span>
            <h1 className="mb-5 text-4xl font-bold leading-tight md:text-5xl">
              {isNp ? "हामी को हौं" : "Who We Are"}
            </h1>
            <p className="max-w-2xl text-lg text-primary-100">
              {isNp
                ? "हाम्रो यात्रा, मिशन, मूल्यहरू र रणनीतिक आकांक्षाहरू एकै ठाउँमा — भरपर्दो वित्तीय साझेदारको रूपमा।"
                : "Our journey, mission, values, and strategic ambitions — all in one place, as your trusted financial partner."}
            </p>
          </div>
        </div>
      </section>

      {/* ── Section quick nav ── */}
      <div className="sticky top-[76px] z-30 border-b border-gray-100 bg-white/90 py-2 backdrop-blur-lg">
        <div className="container-page flex gap-2 overflow-x-auto">
          {sectionIds.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="whitespace-nowrap rounded-full border border-gray-200 px-4 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:border-primary-500 hover:text-primary-700"
            >
              {isNp ? s.np : s.en}
            </a>
          ))}
        </div>
      </div>

      {/* ── Who We Are ── */}
      <section id="who-we-are" className="section scroll-mt-28 bg-surface-alt">
        <div className="container-page">
          {sectionTitle(isNp ? "हाम्रो परिचय" : "Who We Are", isNp ? "कम्पनी ऐन र नेपाल राष्ट्र बैंकको इजाजतपत्र सहितको भरपर्दो वित्तीय संस्था" : "A C-class finance company registered under the Companies Act and licensed by Nepal Rastra Bank")}
          {cmsBlock(introHtml)}
          <StaggerChildren className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: isNp ? "शाखाहरू" : "Branches", value: "21", suffix: "+" },
              { label: isNp ? "सन्तुष्ट ग्राहक" : "Happy Customers", value: "100000", suffix: "+" },
              { label: isNp ? "वर्षको विरासत" : "Years of Legacy", value: "17", suffix: "+" },
              { label: isNp ? "इजाजतपत्र" : "NRB Licensed", value: "C", suffix: "-Class" },
            ].map((stat, i) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <div
                    className="mb-1 text-3xl font-extrabold"
                    style={{ background: "linear-gradient(135deg, #8E44AD, #F2A900)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm font-medium text-gray-500">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Mission & Goals ── */}
      <section id="mission-goals" className="section scroll-mt-28">
        <div className="container-page">
          {sectionTitle(isNp ? "लक्ष्य र उद्देश्य" : "Mission & Goals", isNp ? "हाम्रो दृष्टिकोण, मिशन र हामीलाई अगाडि बढाउने लक्ष्यहरू" : "Our vision, mission, and the goals that guide us forward")}
          {cmsBlock(missionHtml)}

          <StaggerChildren className="mb-12 grid gap-6 md:grid-cols-2">
            <StaggerItem>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-primary-50 to-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-700 text-white shadow-md transition-transform group-hover:scale-110">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-primary-800">{isNp ? "हाम्रो दृष्टिकोण" : "Our Vision"}</h3>
                <blockquote className="border-l-4 border-secondary-500 pl-4 text-gray-700 italic">
                  {isNp
                    ? "नवीन समाधान र अतुलनीय सेवा मार्फत व्यक्ति र व्यवसायहरूलाई उनीहरूको वित्तीय आकांक्षाहरू प्राप्त गर्न सशक्त बनाउँदै, नेपालको सबैभन्दा विश्वसनीय र ग्राहक-केन्द्रित वित्तीय संस्था बन्ने।"
                    : "To be the most trusted and customer-centric financial institution in Nepal, empowering individuals and businesses to achieve their financial aspirations through innovative solutions and unparalleled service."}
                </blockquote>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-secondary-50 to-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-500 text-gray-900 shadow-md transition-transform group-hover:scale-110">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-primary-800">{isNp ? "हाम्रो मिशन" : "Our Mission"}</h3>
                <blockquote className="border-l-4 border-primary-500 pl-4 text-gray-700 italic">
                  {isNp
                    ? "दिगो वृद्धि सुनिश्चित गर्दै र सबै सरोकारवालाहरूको लागि मूल्य सिर्जना गर्दै, हाम्रा ग्राहकहरूको विविध आवश्यकताहरू पूरा गर्ने सुलभ, भरपर्दो र अभिनव वित्तीय उत्पादन र सेवाहरू प्रदान गर्ने।"
                    : "To provide accessible, reliable, and innovative financial products and services that meet the diverse needs of our customers, while ensuring sustainable growth and creating value for all stakeholders."}
                </blockquote>
              </div>
            </StaggerItem>
          </StaggerChildren>

          <Reveal>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-primary-800">
                <Sparkles className="h-6 w-6 text-secondary-500" />
                {isNp ? "मूल मान्यताहरू" : "Core Values"}
              </h3>
              <StaggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {coreValues.map((v) => {
                  const Icon = v.icon;
                  return (
                    <StaggerItem key={v.title}>
                      <div className="group h-full rounded-xl border border-gray-100 bg-gray-50/50 p-5 transition-all hover:border-primary-200 hover:bg-white hover:shadow-md">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700 transition-colors group-hover:bg-primary-700 group-hover:text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h4 className="mb-1.5 font-bold text-gray-900">{v.title}</h4>
                        <p className="text-sm leading-relaxed text-gray-600">{v.desc}</p>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerChildren>
            </div>
          </Reveal>

          <Reveal className="mt-8">
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-primary-800">
                <Trophy className="h-6 w-6 text-secondary-500" />
                {isNp ? "रणनीतिक लक्ष्यहरू" : "Strategic Goals"}
              </h3>
              <StaggerChildren className="grid gap-4 md:grid-cols-2">
                {strategicGoals.map((goal, i) => (
                  <StaggerItem key={i}>
                    <div className="flex items-start gap-3 rounded-xl border border-gray-100 p-4 transition-colors hover:border-primary-200 hover:bg-primary-50/40">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-800 text-xs font-bold text-white shadow-sm">
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-gray-700">{goal}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Strategic Framework ── */}
      <section id="strategic-framework" className="section scroll-mt-28 bg-surface-alt">
        <div className="container-page">
          {sectionTitle(isNp ? "रणनीतिक ढाँचा" : "Strategic Framework", isNp ? "दिगो वृद्धि र उत्कृष्टताको लागि हाम्रो रणनीतिक खाका" : "Our strategic blueprint for sustainable growth and excellence")}
          {cmsBlock(frameworkHtml)}
          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <StaggerItem key={p.title}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-lg">
                    <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary-50 transition-transform group-hover:scale-150" />
                    <div className="relative">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-700 text-white shadow-md transition-transform group-hover:scale-110">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-3 text-lg font-bold text-gray-900">{p.title}</h3>
                      <ul className="space-y-2.5">
                        {p.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
          <Reveal className="mt-8">
            <div className="flex items-start gap-4 rounded-2xl border-l-4 border-secondary-500 bg-gradient-to-r from-secondary-50 to-white p-6 shadow-sm">
              <HeartHandshake className="mt-0.5 h-7 w-7 shrink-0 text-secondary-600" />
              <div>
                <h3 className="mb-1.5 font-bold text-gray-900">{isNp ? "हाम्रो प्रतिबद्धता" : "Our Commitment"}</h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {isNp
                    ? "रिलायन्स फाइनान्स लिमिटेड यस रणनीतिक ढाँचालाई अनुशासन र पारदर्शिताका साथ कार्यान्वयन गर्न प्रतिबद्ध छ। हामी रणनीतिक उद्देश्यहरू विरुद्ध हाम्रो प्रगतिको नियमित समीक्षा गर्दछौं र बदलिँदो बजार अवस्थाहरूमा हाम्रो दृष्टिकोण अनुकूलन गर्दछौं।"
                    : "Reliance Finance Limited is committed to executing this strategic framework with discipline and transparency. We regularly review our progress against strategic objectives and adapt our approach to changing market conditions, always keeping our customers' best interests at heart."}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Milestones ── */}
      <section id="milestones" className="section scroll-mt-28">
        <div className="container-page">
          {sectionTitle(isNp ? "कोशेढुङ्गाहरू" : "Milestones", isNp ? "हाम्रो यात्राका प्रमुख कोशेढुङ्गा र उपलब्धिहरू" : "Key milestones and achievements throughout our journey")}
          {cmsBlock(milestonesHtml)}
          <div className="mx-auto max-w-3xl">
            <MilestoneTimeline items={milestones} />
          </div>
        </div>
      </section>

      {/* ── Capital Structure ── */}
      <section id="capital-structure" className="section scroll-mt-28 bg-surface-alt">
        <div className="container-page">
          {sectionTitle(isNp ? "पुँजी संरचना" : "Capital Structure", isNp ? "हाम्रो पुँजी आधार र सेयरधनी जानकारी" : "Our capital base and shareholding information")}
          {cmsBlock(capitalHtml)}

          <StaggerChildren className="mb-8 grid gap-6 lg:grid-cols-2">
            <StaggerItem>
              <div className="h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-primary-800">
                  <Landmark className="h-5 w-5 text-secondary-500" />
                  {isNp ? "पुँजी सिंहावलोकन" : "Capital Overview"}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b-2 border-primary-100">
                        <th className="pb-3 font-semibold text-gray-900">{isNp ? "विवरण" : "Particulars"}</th>
                        <th className="pb-3 text-right font-semibold text-gray-900">{isNp ? "रकम (नेपाली रूपैयाँ)" : "Amount (NPR)"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {capitalRows.map((row, i) => (
                        <tr key={row.label} className={i === capitalRows.length - 1 ? "bg-primary-50/50 font-semibold" : ""}>
                          <td className="py-3 text-gray-700">{row.label}</td>
                          <td className="py-3 text-right text-gray-900">{row.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-primary-800">
                  <Users className="h-5 w-5 text-secondary-500" />
                  {isNp ? "सेयरधनी स्वामित्व संरचना" : "Shareholding Pattern"}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-gray-600">
                  {isNp
                    ? "कम्पनीको सेयरहरू संस्थागत र व्यक्तिगत लगानीकर्ताहरूको विविध समूहसँग छ।"
                    : "The company's shares are held by a diverse group of institutional and individual investors, reflecting broad-based ownership."}
                </p>
                <div className="space-y-5">
                  {shareholding.map((s, i) => (
                    <div key={s.group}>
                      <div className="mb-1.5 flex justify-between text-sm">
                        <span className="font-medium text-gray-700">{s.group}</span>
                        <span className="text-gray-500">{s.x}%</span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                        <AnimatedBar value={s.x} color={s.color} delay={i * 0.12} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          </StaggerChildren>

          <Reveal>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-primary-800">
                <ShieldCheck className="h-5 w-5 text-secondary-500" />
                {isNp ? "नियामक अनुपालन" : "Regulatory Compliance"}
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-gray-600">
                {isNp
                  ? "रिलायन्स फाइनान्स लिमिटेडले बासेल III ढाँचा अन्तर्गत नेपाल राष्ट्र बैंकले तोकेको पुँजी पर्याप्तता आवश्यकताहरूको पूर्ण पालना गर्दछ।"
                  : "Reliance Finance Limited fully complies with the capital adequacy requirements prescribed by Nepal Rastra Bank under the Basel III framework."}
              </p>
              <StaggerChildren className="grid gap-3 md:grid-cols-2">
                {compliance.map((item, i) => (
                  <StaggerItem key={i}>
                    <div className="flex items-start gap-2.5 rounded-xl border border-gray-100 p-3.5 text-sm text-gray-600 transition-colors hover:border-primary-200 hover:bg-primary-50/40">
                      <span className="mt-0.5 text-primary-700">✓</span>
                      {item}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 py-16 text-center text-white">
        <div className="container-page">
          <Reveal>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              {isNp ? "रिलायन्स फाइनान्ससँग साझेदारी गर्नुहोस्" : "Partner With Reliance Finance"}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-100">
              {isNp
                ? "हामीले प्रदान गर्ने उत्पादन र सेवाहरू अन्वेषण गर्नुहोस्, वा आजै खाता खोल्नुहोस्।"
                : "Explore our products and services, or open an account today."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${lang}/products`} className="btn btn-secondary">
                {isNp ? "उत्पादनहरू हेर्नुहोस्" : "Explore Products"}
              </Link>
              <Link href={`/${lang}/open-account`} className="btn btn-ghost">
                {isNp ? "खाता खोल्नुहोस्" : "Open Account"}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
