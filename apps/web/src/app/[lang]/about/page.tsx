import Link from "next/link";
import { ArrowRight } from "lucide-react";

const sections = [
  { slug: "introduction", en: "Introduction", np: "परिचय" },
  { slug: "mission-goals", en: "Mission & Goals", np: "लक्ष्य र उद्देश्य" },
  { slug: "strategic-framework", en: "Strategic Framework", np: "रणनीतिक ढाँचा" },
  { slug: "milestones", en: "Milestones", np: "कोशेढुङ्गाहरू" },
  { slug: "capital-structure", en: "Capital Structure", np: "पुँजी संरचना" },
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "About Us" : "हाम्रो बारेमा",
    description: lang === "en"
      ? "Learn more about Reliance Finance Limited — our mission, values, leadership, and milestones."
      : "रिलायन्स फाइनान्स लिमिटेडको बारेमा जान्नुहोस् — हाम्रो मिशन, मूल्यहरू, नेतृत्व, र कोशेढुङ्गाहरू।",
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-4 text-4xl font-bold">
            {lang === "en" ? "About Us" : "हाम्रो बारेमा"}
          </h1>
          <p className="max-w-3xl text-lg text-primary-100">
            {lang === "en"
              ? "Learn more about Reliance Finance Limited — our journey, mission, and the values that drive us."
              : "रिलायन्स फाइनान्स लिमिटेडको बारेमा जान्नुहोस् — हाम्रो यात्रा, मिशन र हामीलाई प्रेरित गर्ने मूल्यहरू।"}
          </p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <p className="mb-8 leading-relaxed text-gray-600">
            {lang === "en"
              ? "Reliance Finance Limited is a trusted financial institution in Nepal, committed to providing innovative banking solutions and exceptional customer service. With a wide range of products and services, we strive to meet the diverse needs of our customers."
              : "रिलायन्स फाइनान्स लिमिटेड नेपालको एक विश्वसनीय वित्तीय संस्था हो, जो अभिनव बैंकिङ समाधान र उत्कृष्ट ग्राहक सेवा प्रदान गर्न प्रतिबद्ध छ। उत्पादन र सेवाहरूको विस्तृत श्रृंखलाको साथ, हामी आफ्ना ग्राहकहरूको विविध आवश्यकताहरू पूरा गर्न प्रयासरत छौं।"}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {sections.map((s) => (
              <Link
                key={s.slug}
                href={`/about/${s.slug}`}
                className="flex items-center justify-between rounded-lg border bg-white px-6 py-4 transition-shadow hover:shadow-sm"
              >
                <span className="font-medium text-gray-900">
                  {lang === "en" ? s.en : s.np}
                </span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
