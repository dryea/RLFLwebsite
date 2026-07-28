import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
  title,
  titleNp,
  description,
  descriptionNp,
}: {
  lang: string;
  stats: Stat[];
  imageUrl?: string;
  title?: string;
  titleNp?: string;
  description?: string;
  descriptionNp?: string;
}) {
  const defaultTitle = "About Reliance Finance Limited";
  const defaultTitleNp = "रिलायन्स फाइनान्स लिमिटेडको बारेमा";
  const defaultDesc = "Reliance Finance Limited is a trusted C-class financial institution licensed by Nepal Rastra Bank. We are dedicated to providing innovative financial solutions and exceptional service to our customers across Nepal.";
  const defaultDescNp = "रिलायन्स फाइनान्स लिमिटेड नेपाल राष्ट्र बैंकबाट इजाजतपत्र प्राप्त एक विश्वसनीय वर्ग 'ग' को वित्तीय संस्था हो। हामी नेपालभरका ग्राहकहरूलाई अभिनव वित्तीय समाधान र उत्कृष्ट सेवा प्रदान गर्न समर्पित छौं।";
  const defaultStats: Stat[] = [
    { label: "Years of Trust", labelNp: "वर्षको विश्वास", value: "25", suffix: "+" },
    { label: "Branches", labelNp: "शाखाहरू", value: "30", suffix: "+" },
    { label: "Happy Customers", labelNp: "सन्तुष्ट ग्राहक", value: "100000", suffix: "+" },
    { label: "Awards", labelNp: "पुरस्कार", value: "15", suffix: "+" },
  ];

  const s = stats.length ? stats : defaultStats;

  return (
    <section className="section bg-surface-alt">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={imageUrl || "https://reliancenepal.com.np/assets/images/reliance/reliance_building.jpg"}
                alt="Reliance Finance"
                className="h-[400px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-xl bg-primary-500 p-6 text-white shadow-lg lg:-bottom-8 lg:-right-8 lg:p-8">
              <div className="text-4xl font-extrabold lg:text-5xl">25+</div>
              <div className="mt-1 text-sm font-medium text-primary-100">
                {lang === "en" ? "Years of Trust" : "वर्षको विश्वास"}
              </div>
            </div>
          </div>

          <div>
            <h2 className="relative mb-4 pb-3 text-3xl font-bold text-primary-800 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-secondary-500 md:text-4xl">
              {lang === "np" && titleNp ? titleNp : title || defaultTitle}
            </h2>
            <p className="mb-8 leading-relaxed text-gray-600">
              {lang === "np" && descriptionNp ? descriptionNp : description || defaultDesc}
            </p>

            <div className="mb-8 grid grid-cols-2 gap-4">
              {s.map((stat) => (
                <div key={stat.label} className="border-b-2 border-secondary-500 pb-3">
                  <div className="text-2xl font-extrabold text-primary-700 lg:text-3xl">
                    {stat.value}{stat.suffix || ""}
                  </div>
                  <div className="text-xs font-medium uppercase tracking-wide text-gray-500 lg:text-sm">
                    {lang === "np" && stat.labelNp ? stat.labelNp : stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={`/${lang}/about/introduction`}
              className="btn btn-primary"
            >
              {lang === "en" ? "Learn More About Us" : "हाम्रो बारेमा थप जान्नुहोस्"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
