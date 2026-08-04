import Link from "next/link";
import { Handshake, MapPin, Phone, Store, FileSearch, CalendarClock, Star, Building2 } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Our Network | Reliance Finance Limited" : "हाम्रो सञ्जाल | रिलायन्स फाइनान्स लिमिटेड",
    description: lang === "en" ? "Our partners, branches, and service network." : "हाम्रा साझेदार, शाखा र सेवा सञ्जाल।",
  };
}

export default async function OurNetworkPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isNp = lang === "np";

  const cards = [
    {
      icon: Handshake,
      title: isNp ? "हाम्रा साझेदार" : "Our Partners",
      desc: isNp ? "हाम्रा सहकार्य साझेदारहरूको बारेमा जान्नुहोस्।" : "Learn about our trusted collaborators and partners.",
      href: "/partner",
      color: "bg-blue-50 text-blue-700",
    },
    {
      icon: Building2,
      title: isNp ? "शाखाहरू" : "Branches",
      desc: isNp ? "देशभरका हाम्रा शाखाहरू पत्ता लगाउनुहोस्।" : "Find our branches across the country.",
      href: "/branches",
      color: "bg-green-50 text-green-700",
    },
    {
      icon: Phone,
      title: isNp ? "सम्पर्क" : "Contact Us",
      desc: isNp ? "हामीसँग सम्पर्क गर्नुहोस्।" : "Get in touch with our team.",
      href: "/contact",
      color: "bg-purple-50 text-purple-700",
    },
    {
      icon: Store,
      title: isNp ? "व्यापारी र प्रस्ताव" : "Merchant & Offers",
      desc: isNp ? "हाम्रा व्यापारी साझेदार र विशेष प्रस्तावहरू।" : "Explore merchant partners and exclusive offers.",
      href: "/merchant-offers",
      color: "bg-amber-50 text-amber-700",
    },
    {
      icon: FileSearch,
      title: isNp ? "ऋण सोधपुछ" : "Loan Enquiry",
      desc: isNp ? "ऋण सोधपुछ फारम भर्नुहोस्।" : "Submit a loan enquiry form.",
      href: "/loan-enquiry",
      color: "bg-red-50 text-red-700",
    },
    {
      icon: CalendarClock,
      title: isNp ? "भेटघाट बुक" : "Book Appointment",
      desc: isNp ? "हाम्रो शाखामा भेटघाट तय गर्नुहोस्।" : "Schedule a meeting at our branch.",
      href: "/appointments",
      color: "bg-cyan-50 text-cyan-700",
    },
    {
      icon: Star,
      title: isNp ? "ग्राहक अनुभव" : "Testimonials",
      desc: isNp ? "हाम्रा ग्राहकहरूको अनुभव पढ्नुहोस्।" : "Read what our customers say.",
      href: "/testimonials",
      color: "bg-pink-50 text-pink-700",
    },
    {
      icon: MapPin,
      title: isNp ? "बैंकिङ समय" : "Banking Hours",
      desc: isNp ? "हाम्रा बैंकिङ समयहरू हेर्नुहोस्।" : "Check our banking hours.",
      href: "/banking-hours",
      color: "bg-indigo-50 text-indigo-700",
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{isNp ? "हाम्रो सञ्जाल" : "Our Network"}</h1>
          <p className="mt-2 text-primary-100">{isNp ? "हाम्रा साझेदार, शाखा र सेवाहरू" : "Our partners, branches, and services"}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className={`mb-4 inline-flex rounded-lg p-3 ${card.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-1 font-semibold text-gray-900">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
