"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getServices } from "@/lib/public-api";
import { useLang } from "@/contexts/LanguageContext";
import { SkeletonGrid } from "@/components/ui/Skeleton";

export default function LangServicesPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices().then(setServices).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{isNp ? "हाम्रा सेवाहरू" : "Our Services"}</h1>
          <p className="mt-2 text-primary-100">{isNp ? "तपाईंको औंलामा डिजिटल बैंकिङ सेवाहरू" : "Digital banking services at your fingertips"}</p>
        </div>
      </section>
      <section className="py-12">
        <div className="container-page">
          {loading ? (
            <SkeletonGrid count={6} columns={3} />
          ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc: any) => (
              <Link key={svc.id} href={`/${lang}/services/${svc.slug}`} className="group rounded-xl border bg-white p-6 transition-shadow hover:shadow-md">
                <div className="mb-3 text-2xl">{svc.icon || "📱"}</div>
                <h3 className="font-semibold text-gray-900">{isNp && svc.titleNp ? svc.titleNp : svc.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{isNp && svc.summaryNp ? svc.summaryNp : svc.summary}</p>
                <span className="mt-3 flex items-center gap-1 text-sm font-medium text-primary-700 group-hover:underline">{isNp ? "थप जान्नुहोस्" : "Learn More"} <ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
          )}
        </div>
      </section>
    </>
  );
}
