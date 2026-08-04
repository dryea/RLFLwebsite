import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import AnimatedStat from "./AnimatedStat";

interface Stat {
  label: string;
  labelNp?: string;
  value: string;
  suffix?: string;
}

export default function AboutSection({
  lang,
  stats,
  imageUrl,
}: {
  lang: string;
  stats: Stat[];
  imageUrl?: string;
}) {
  const defaultStats: Stat[] = [
    { label: "Active Branches", labelNp: "सक्रिय शाखाहरू", value: "21", suffix: "+" },
    { label: "Happy Customers", labelNp: "सन्तुष्ट ग्राहक", value: "100000", suffix: "+" },
    { label: "Years of Legacy", labelNp: "वर्षको विरासत", value: "17", suffix: "+" },
  ];

  const s = stats.length ? stats : defaultStats;

  return (
    <section className="section bg-white">
      <div className="container-page">
        <div className="about-section-grid grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal type="slideInLeft" className="about-text-content">
            <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.1em] text-secondary-700">
              {lang === "en" ? "Introduction" : "परिचय"}
            </h4>
            <h2 className="relative mb-6 pb-3 text-3xl font-bold text-primary-800 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-secondary-500 md:text-4xl">
              {lang === "en" ? "Trusted Financial Partner for Over a Decade" : "एक दशक भन्दा बढीको विश्वसनीय वित्तीय साझेदार"}
            </h2>
            <p className="mb-6 text-[1.05rem] leading-relaxed text-gray-500">
              {lang === "en"
                ? 'Reliance Finance Limited, a licensed "C" class financial institution, was incorporated in the year 2066 B.S. Promoted by a highly qualified team of diverse business leaders and bankers, we have built a legacy of trust and financial solidity in Nepal.'
                : "रिलायन्स फाइनान्स लिमिटेड, इजाजतपत्र प्राप्त 'ग' वर्गको वित्तीय संस्था, वि.सं. २०६६ मा स्थापना भएको थियो। विविध व्यवसायिक नेताहरू र बैंकरहरूको अत्यधिक योग्य टोलीद्वारा प्रवर्द्धित, हामीले नेपालमा विश्वास र वित्तीय सुदृढताको विरासत निर्माण गरेका छौं।"}
            </p>
            <p className="mb-6 text-[1.05rem] leading-relaxed text-gray-500">
              {lang === "en"
                ? "Led by the vision of our board members and inspired by customer loyalty, we offer robust retail banking, lending, and corporate solutions through a wide network of branches across the country."
                : "हाम्रा सञ्चालक समितिको दृष्टिकोण र ग्राहकको वफादारीबाट प्रेरित भई, हामी देशभरका शाखाहरूको विस्तृत नेटवर्क मार्फत बलियो खुद्रा बैंकिङ, ऋण र कर्पोरेट समाधानहरू प्रदान गर्दछौं।"}
            </p>

            <div className="stats-grid mt-8 grid grid-cols-3 gap-5">
              {s.map((stat) => (
                <AnimatedStat
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={lang === "np" && stat.labelNp ? stat.labelNp : stat.label}
                />
              ))}
            </div>

            <Link
              href={`/${lang}/about/introduction`}
              className="btn btn-primary mt-8 inline-flex"
            >
              {lang === "en" ? "Read More About Us" : "हाम्रो बारेमा थप पढ्नुहोस्"}
            </Link>
          </Reveal>

          <Reveal type="slideInRight" className="about-image-frame relative" delay={0.1}>
            <img
              src={imageUrl || "/assets/about-building.jpg"}
              alt="Reliance Finance"
              className="w-full rounded-xl"
            />
            <div className="about-image-overlay-card absolute -bottom-4 -left-4 max-w-[220px] rounded-xl bg-primary-500 p-5 text-white shadow-lg">
              <div className="text-3xl font-extrabold text-secondary-700 lg:text-4xl">
                {lang === "en" ? "B.S. 2066" : "वि.सं. २०६६"}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-white">
                {lang === "en"
                  ? "Established & Licensed by Nepal Rastra Bank to deliver absolute excellence."
                  : "नेपाल राष्ट्र बैंकद्वारा स्थापित र इजाजतपत्र प्राप्त।"}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
