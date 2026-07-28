"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, FileText } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { getServices } from "@/lib/public-api";

export default function ServiceDetailPage() {
  const lang = useLang();
  const params = useParams();
  const slug = params.slug as string;
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then((services: any[]) => {
        const found = services.find((s: any) => s.slug === slug);
        setService(found || null);
      })
      .catch(() => setService(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <section className="flex flex-1 items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-700 border-t-transparent" />
      </section>
    );
  }

  if (!service) {
    return (
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-20 text-white">
        <div className="container-page text-center">
          <h1 className="mb-2 text-3xl font-bold">
            {lang === "en" ? "Service Not Found" : "सेवा फेला परेन"}
          </h1>
          <p className="mb-6 text-primary-100">
            {lang === "en" ? "The service you're looking for doesn't exist." : "तपाईंले खोज्नुभएको सेवा अवस्थित छैन।"}
          </p>
          <Link href="/services" className="rounded-lg bg-accent-500 px-6 py-3 font-semibold text-white hover:bg-accent-600">
            {lang === "en" ? "View All Services" : "सबै सेवाहरू हेर्नुहोस्"}
          </Link>
        </div>
      </section>
    );
  }

  const features = Array.isArray(service.features) ? service.features : [];
  const documents = Array.isArray(service.requiredDocuments) ? service.requiredDocuments : [];

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 py-14 text-white">
        <div className="container-page">
          <Link href="/services" className="mb-4 inline-flex items-center gap-1 text-sm text-primary-200 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> {lang === "en" ? "Back to Services" : "सेवाहरूमा फर्कनुहोस्"}
          </Link>
          <div className="mb-3 text-4xl">{service.icon || "📱"}</div>
          <h1 className="text-3xl font-bold md:text-4xl">{service.title}</h1>
          {service.summary && <p className="mt-3 max-w-2xl text-lg text-primary-100">{service.summary}</p>}
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              {service.content && (
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                  <h2 className="mb-4 text-xl font-bold text-gray-900">
                    {lang === "en" ? "Overview" : "सामान्य जानकारी"}
                  </h2>
                  <div className="prose prose-gray max-w-none leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: service.content }} />
                </div>
              )}

              {features.length > 0 && (
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    {lang === "en" ? "Key Features & Benefits" : "मुख्य विशेषताहरू र लाभहरू"}
                  </h2>
                  <div className="space-y-3">
                    {features.map((f: string, i: number) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                        <span className="text-gray-600">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {documents.length > 0 && (
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
                    <FileText className="h-5 w-5 text-primary-700" />
                    {lang === "en" ? "Required Documents" : "आवश्यक कागजातहरू"}
                  </h3>
                  <div className="space-y-3">
                    {documents.map((d: string, i: number) => (
                      <div key={i} className="flex items-start gap-3">
                        <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" />
                        <span className="text-gray-600">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-xl border bg-accent-50 p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">
                  {lang === "en" ? "Need Help?" : "मद्दत चाहियो?"}
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  {lang === "en" ? "Contact our support team for assistance." : "सहायताको लागि हाम्रो समर्थन टोलीलाई सम्पर्क गर्नुहोस्।"}
                </p>
                <Link href="/contact" className="block rounded-lg bg-primary-700 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-800">
                  {lang === "en" ? "Contact Us" : "सम्पर्क गर्नुहोस्"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
