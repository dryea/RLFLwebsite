import Link from "next/link";
import { ArrowRight, Building, PiggyBank, Landmark, Handshake } from "lucide-react";

const products = [
  {
    icon: PiggyBank,
    title: { en: "Savings", np: "बचत" },
    desc: { en: "Explore our range of savings accounts", np: "हाम्रो बचत खाताहरू हेर्नुहोस्" },
    href: "/products/savings",
    color: "bg-blue-50 text-blue-700",
  },
  {
    icon: Landmark,
    title: { en: "Fixed Deposits", np: "मुद्दती निक्षेप" },
    desc: { en: "Secure your future with fixed deposits", np: "मुद्दती निक्षेपमा लगानी गर्नुहोस्" },
    href: "/products/fixed-deposits",
    color: "bg-green-50 text-green-700",
  },
  {
    icon: Building,
    title: { en: "Loans", np: "ऋण" },
    desc: { en: "Easy loans for your needs", np: "तपाईंको आवश्यकताको लागि सहज ऋण" },
    href: "/products/loans",
    color: "bg-purple-50 text-purple-700",
  },
  {
    icon: Handshake,
    title: { en: "Services", np: "सेवाहरू" },
    desc: { en: "Digital banking services at your fingertips", np: "डिजिटल बैंकिङ सेवाहरू" },
    href: "/services",
    color: "bg-amber-50 text-amber-700",
  },
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Reliance Finance Limited" : "रिलायन्स फाइनान्स लिमिटेड",
    description: lang === "en"
      ? "Your trusted financial partner in Nepal — savings, loans, fixed deposits, and digital banking services."
      : "नेपालमा तपाईंको विश्वसनीय वित्तीय साझेदार — बचत, ऋण, मुद्दती निक्षेप र डिजिटल बैंकिङ सेवाहरू।",
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 py-20 text-white">
        <div className="container-page text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            {lang === "en" ? "Reliance Finance Limited" : "रिलायन्स फाइनान्स लिमिटेड"}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-100">
            {lang === "en" ? "Your trusted financial partner in Nepal" : "नेपालमा तपाईंको विश्वसनीय वित्तीय साझेदार"}
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/loan-enquiry" className="rounded-lg bg-accent-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-600">
              {lang === "en" ? "Apply for Loan" : "ऋणको लागि आवेदन दिनुहोस्"}
            </Link>
            <Link href="/contact" className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10">
              {lang === "en" ? "Contact Us" : "सम्पर्क गर्नुहोस्"}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
            {lang === "en" ? "Our Products & Services" : "हाम्रा उत्पादन र सेवाहरू"}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => {
              const Icon = p.icon;
              return (
                <Link key={p.href} href={p.href} className="group rounded-xl border p-6 transition-shadow hover:shadow-lg">
                  <div className={`mb-4 inline-flex rounded-lg p-3 ${p.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">{lang === "en" ? p.title.en : p.title.np}</h3>
                  <p className="mb-4 text-sm text-gray-600">{lang === "en" ? p.desc.en : p.desc.np}</p>
                  <span className="flex items-center gap-1 text-sm font-medium text-primary-700 group-hover:underline">
                    {lang === "en" ? "Learn More" : "थप जान्नुहोस्"} <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
