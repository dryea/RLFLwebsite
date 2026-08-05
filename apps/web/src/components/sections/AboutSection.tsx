import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";

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
  const isNp = lang === "np";

  const defaultStats: Stat[] = [
    { label: "Active Branches", labelNp: "सक्रिय शाखाहरू", value: "21", suffix: "+" },
    { label: "Happy Customers", labelNp: "सन्तुष्ट ग्राहक", value: "100000", suffix: "+" },
    { label: "Years of Legacy", labelNp: "वर्षको विरासत", value: "17", suffix: "+" },
    { label: "NRB Licensed", labelNp: "NRB इजाजतपत्र", value: "C", suffix: "-Class" },
  ];

  const s = stats.length ? stats : defaultStats;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
      {/* Text Content */}
      <Reveal type="slideInLeft">
        <div>
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.12em] text-secondary-600">
            {isNp ? "परिचय" : "Who We Are"}
          </span>
          <h2 className="relative mb-6 pb-4 text-3xl font-bold text-primary-800 md:text-4xl">
            {isNp ? "एक दशक भन्दा बढीको विश्वसनीय वित्तीय साझेदार" : "Your Trusted Financial Partner for Over a Decade"}
            <span className="absolute bottom-0 left-0 h-1 w-20 rounded-full" style={{ background: "linear-gradient(90deg, #702B86, #F2A900)" }} />
          </h2>
          <p className="mb-5 text-base leading-relaxed text-gray-500">
            {isNp
              ? "रिलायन्स फाइनान्स लिमिटेड, इजाजतपत्र प्राप्त 'ग' वर्गको वित्तीय संस्था, वि.सं. २०६६ मा स्थापना भएको थियो।"
              : 'Reliance Finance Limited is a licensed "C" class financial institution incorporated in B.S. 2066, promoted by experienced business leaders and bankers committed to Nepal\'s growth.'}
          </p>
          <p className="mb-8 text-base leading-relaxed text-gray-500">
            {isNp
              ? "हाम्रा सञ्चालक समितिको दृष्टिकोण र ग्राहकको वफादारीबाट प्रेरित भई, हामी देशभरका शाखाहरूको विस्तृत नेटवर्क मार्फत बलियो खुद्रा बैंकिङ, ऋण र कर्पोरेट समाधानहरू प्रदान गर्दछौं।"
              : "Guided by our board's vision and inspired by customer loyalty, we deliver robust retail banking, lending, and corporate solutions across a growing nationwide branch network."}
          </p>

          {/* Stats Grid */}
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {s.map((stat) => {
              const label = isNp && stat.labelNp ? stat.labelNp : stat.label;
              const numeric = parseInt(stat.value.replace(/[^0-9]/g, ""), 10);
              const isNumeric = !isNaN(numeric) && stat.value !== "C";
              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm"
                >
                  <div
                    className="mb-1 text-2xl font-extrabold lg:text-3xl"
                    style={{ background: "linear-gradient(135deg, #702B86, #F2A900)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    {isNumeric ? (
                      <CountUp target={numeric} suffix={stat.suffix || ""} compact={numeric >= 1000} />
                    ) : (
                      `${stat.value}${stat.suffix || ""}`
                    )}
                  </div>
                  <div className="text-xs font-medium text-gray-500">{label}</div>
                </div>
              );
            })}
          </div>

          <Link
            href={`/${lang}/about/introduction`}
            className="btn btn-primary inline-flex"
          >
            {isNp ? "हाम्रो बारेमा थप पढ्नुहोस्" : "Read More About Us"}
          </Link>
        </div>
      </Reveal>

      {/* Image Panel */}
      <Reveal type="slideInRight" delay={0.1}>
        <div className="relative">
          {/* Radial glow behind image */}
          <div
            className="absolute -inset-4 rounded-3xl opacity-30"
            style={{ background: "radial-gradient(ellipse at center, #702B86 0%, transparent 70%)" }}
          />
          <img
            src={imageUrl || "/assets/about-building.jpg"}
            alt="Reliance Finance Limited office"
            className="relative w-full rounded-2xl object-cover shadow-2xl"
            style={{ transform: "rotate(1.5deg)" }}
          />
          {/* Overlay card */}
          <div
            className="absolute -bottom-5 -left-5 max-w-[200px] rounded-2xl p-5 text-white shadow-2xl"
            style={{ background: "linear-gradient(135deg, #702B86, #4a1a58)", transform: "rotate(-1.5deg)" }}
          >
            <div className="text-3xl font-extrabold text-secondary-400">B.S. 2066</div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-white/80">
              {isNp ? "नेपाल राष्ट्र बैंकद्वारा स्थापित र इजाजतपत्र प्राप्त।" : "Established & Licensed by Nepal Rastra Bank."}
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
