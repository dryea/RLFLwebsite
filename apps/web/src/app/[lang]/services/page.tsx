import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serverFetchAPI } from "@/lib/server-api";

export const dynamic = "force-dynamic";

const copy = {
  en: {
    title: "Our Services",
    subtitle: "Digital banking services at your fingertips",
    learnMore: "Learn More",
  },
  np: {
    title: "हाम्रा सेवाहरू",
    subtitle: "तपाईंको औंलामा डिजिटल बैंकिङ सेवाहरू",
    learnMore: "थप जान्नुहोस्",
  },
};

export default async function LangServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = lang === "np" ? copy.np : copy.en;
  const services = await serverFetchAPI("/api/services");

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page"><h1 className="text-3xl font-bold">{t.title}</h1><p className="mt-2 text-primary-100">{t.subtitle}</p></div>
      </section>
      <section className="py-12">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc: any) => (
              <Link key={svc.id} href={`/${lang}/services/${svc.slug}`} className="group rounded-xl border bg-white p-6 transition-shadow hover:shadow-md">
                <div className="mb-3 text-2xl">{svc.icon || "📱"}</div>
                <h3 className="font-semibold text-gray-900">{lang === "np" && svc.titleNp ? svc.titleNp : svc.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{lang === "np" && svc.summaryNp ? svc.summaryNp : svc.summary}</p>
                <span className="mt-3 flex items-center gap-1 text-sm font-medium text-primary-700 group-hover:underline">{t.learnMore} <ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
