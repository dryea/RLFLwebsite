"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, FileText, Users, Percent, Banknote } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { getProducts } from "@/lib/public-api";

export default function ProductDetailPage() {
  const lang = useLang();
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((products: any[]) => {
        const found = products.find((p: any) => p.slug === slug);
        setProduct(found || null);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <section className="flex flex-1 items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-700 border-t-transparent" />
      </section>
    );
  }

  if (!product) {
    return (
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-20 text-white">
        <div className="container-page text-center">
          <h1 className="mb-2 text-3xl font-bold">
            {lang === "en" ? "Product Not Found" : "उत्पादन फेला परेन"}
          </h1>
          <p className="mb-6 text-primary-100">
            {lang === "en" ? "The product you're looking for doesn't exist." : "तपाईंले खोज्नुभएको उत्पादन अवस्थित छैन।"}
          </p>
          <Link href="/products" className="rounded-lg bg-accent-500 px-6 py-3 font-semibold text-white hover:bg-accent-600">
            {lang === "en" ? "View All Products" : "सबै उत्पादनहरू हेर्नुहोस्"}
          </Link>
        </div>
      </section>
    );
  }

  const features = Array.isArray(product.features) ? product.features : [];
  const eligibility = Array.isArray(product.eligibility) ? product.eligibility : [];
  const documents = Array.isArray(product.requiredDocuments) ? product.requiredDocuments : [];

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 py-14 text-white">
        <div className="container-page">
          <Link href="/" className="mb-4 inline-flex items-center gap-1 text-sm text-primary-200 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> {lang === "en" ? "Back to Products" : "उत्पादनहरूमा फर्कनुहोस्"}
          </Link>
          <h1 className="text-3xl font-bold md:text-4xl">{product.title}</h1>
          {product.summary && <p className="mt-3 max-w-2xl text-lg text-primary-100">{product.summary}</p>}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-primary-200">
            {product.category && (
              <span className="flex items-center gap-1">
                <Banknote className="h-4 w-4" /> {product.category}
              </span>
            )}
            {product.interestRate && (
              <span className="flex items-center gap-1">
                <Percent className="h-4 w-4" /> {product.interestRate}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              {product.content && (
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                  <h2 className="mb-4 text-xl font-bold text-gray-900">
                    {lang === "en" ? "Overview" : "सामान्य जानकारी"}
                  </h2>
                  <div className="prose prose-gray max-w-none leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: product.content }} />
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

              {documents.length > 0 && (
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                    <FileText className="h-5 w-5 text-primary-700" />
                    {lang === "en" ? "Required Documents" : "आवश्यक कागजातहरू"}
                  </h2>
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
            </div>

            <div className="space-y-6">
              {product.interestRate && (
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
                    <Percent className="h-5 w-5 text-accent-600" />
                    {lang === "en" ? "Interest Rate" : "ब्याज दर"}
                  </h3>
                  <p className="text-2xl font-bold text-primary-700">{product.interestRate}</p>
                </div>
              )}

              {eligibility.length > 0 && (
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
                    <Users className="h-5 w-5 text-purple-600" />
                    {lang === "en" ? "Eligibility" : "योग्यता"}
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {eligibility.map((e: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-xl border bg-accent-50 p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">
                  {lang === "en" ? "Interested?" : "चासो छ?"}
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  {lang === "en" ? "Apply online or visit our nearest branch." : "अनलाइन आवेदन गर्नुहोस् वा हाम्रो नजिकको शाखामा जानुहोस्।"}
                </p>
                <div className="flex flex-col gap-2">
                  <Link href="/loan-enquiry" className="rounded-lg bg-accent-500 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-600">
                    {lang === "en" ? "Apply Now" : "अहिले नै आवेदन दिनुहोस्"}
                  </Link>
                  <Link href="/contact" className="rounded-lg border bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                    {lang === "en" ? "Contact Us" : "सम्पर्क गर्नुहोस्"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
