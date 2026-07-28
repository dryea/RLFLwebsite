import Link from "next/link";
import { Newspaper, Calendar, Megaphone, FileText } from "lucide-react";

const sections = [
  {
    icon: Newspaper,
    titleEn: "News",
    titleNp: "समाचार",
    descEn: "Latest news and updates from Reliance Finance",
    descNp: "रिलायन्स फाइनान्सबाट ताजा समाचार र अपडेटहरू",
    href: "news",
    color: "bg-blue-50 text-blue-700",
  },
  {
    icon: Calendar,
    titleEn: "Events",
    titleNp: "कार्यक्रमहरू",
    descEn: "Upcoming events and programs",
    descNp: "आगामी कार्यक्रम र कार्यक्र��mहरू",
    href: "events",
    color: "bg-green-50 text-green-700",
  },
  {
    icon: Megaphone,
    titleEn: "Notices",
    titleNp: "सूचनाहरू",
    descEn: "Official notices categorized by type",
    descNp: "प्रकार अनुसार आधिकारिक सूचनाहरू",
    href: "notices",
    color: "bg-amber-50 text-amber-700",
  },
  {
    icon: FileText,
    titleEn: "Reports",
    titleNp: "प्रतिवेदनहरू",
    descEn: "Financial and regulatory reports",
    descNp: "वित्तीय र नियामक प्रतिवेदनहरू",
    href: "reports",
    color: "bg-purple-50 text-purple-700",
  },
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Publications | Reliance Finance Limited" : "प्रकाशनहरू | रिलायन्स फाइनान्स लिमिटेड",
    description: lang === "en" ? "News, events, notices, and reports" : "समाचार, कार्यक्रम, सूचना र प्रतिवेदनहरू",
  };
}

export default async function PublicationsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 py-14 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold md:text-4xl">
            {lang === "en" ? "Publications" : "प्रकाशनहरू"}
          </h1>
          <p className="mt-2 text-primary-100">
            {lang === "en" ? "News, events, notices, and reports" : "समाचार, कार्यक्रम, सूचना र प्रतिवेदनहरू"}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.href}
                  href={`/${lang}/publications/${s.href}`}
                  className="group rounded-xl border p-6 transition-shadow hover:shadow-lg"
                >
                  <div className={`mb-4 inline-flex rounded-lg p-3 ${s.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mb-1 text-xl font-semibold text-gray-900">
                    {lang === "en" ? s.titleEn : s.titleNp}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {lang === "en" ? s.descEn : s.descNp}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
