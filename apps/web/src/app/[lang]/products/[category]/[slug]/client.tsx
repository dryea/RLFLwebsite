"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, FileText, Users, Percent, Banknote } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { getProducts } from "@/lib/public-api";
import JsonLdScript from "@/components/shared/JsonLdScript";

const categoryLabels: Record<string, { en: string; np: string; href: string }> = {
  savings: { en: "Savings", np: "बचत", href: "/products/savings" },
  "fixed-deposits": { en: "Fixed Deposits", np: "मुद्दती निक्षेप", href: "/products/fixed-deposits" },
  loans: { en: "Loans", np: "ऋण", href: "/products/loans" },
};

export default function ProductDetailClient() {
  const lang = useLang();
  const params = useParams();
  const category = params.category as string;
  const slug = params.slug as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((products: any[]) => {
        const normalize = (str: string) => (str || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        const normSlug = normalize(slug);
        const found = products.find(
          (p: any) =>
            p.slug === slug ||
            normalize(p.slug) === normSlug ||
            normalize(p.slug).includes(normSlug) ||
            normSlug.includes(normalize(p.slug))
        );
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

  const cat = categoryLabels[category];

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
          <Link href={cat?.href || "/products"} className="rounded-lg bg-accent-500 px-6 py-3 font-semibold text-white hover:bg-accent-600">
            {lang === "en" ? "View All Products" : "सबै उत्पादनहरू हेर्नुहोस्"}
          </Link>
        </div>
      </section>
    );
  }

  const features = Array.isArray(product.features) ? product.features : [];
  const eligibility = Array.isArray(product.eligibility) ? product.eligibility : [];
  const documents = Array.isArray(product.documentsRequired) ? product.documentsRequired : [];

  return (
    <>
      <JsonLdScript data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description: product.summary || product.interestRateInfo || "",
        ...(product.bannerImage ? { image: product.bannerImage } : {}),
        url: `https://rfil-web.sudeepdhakal.workers.dev${cat?.href || "/products"}/${product.slug}`,
        brand: { "@type": "Brand", name: "Reliance Finance Limited" },
        offers: {
          "@type": "Offer",
          priceCurrency: "NPR",
          availability: "https://schema.org/InStock",
          seller: { "@type": "Organization", name: "Reliance Finance Limited" },
        },
      }} />
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "गृह", item: `https://rfil-web.sudeepdhakal.workers.dev/${lang}` },
            { "@type": "ListItem", position: 2, name: lang === "en" ? "Products" : "उत्पादनहरू", item: `https://rfil-web.sudeepdhakal.workers.dev/${lang}/products` },
            ...(cat
              ? [{ "@type": "ListItem", position: 3, name: lang === "np" ? cat.np : cat.en, item: `https://rfil-web.sudeepdhakal.workers.dev${lang}${cat.href}` }]
              : []),
            { "@type": "ListItem", position: 4, name: lang === "np" && product.titleNp ? product.titleNp : product.title },
          ],
        }}
      />
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 py-14 text-white">
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-primary-200">
              <li>
                <Link href={`/${lang}`} className="transition-colors hover:text-white">{lang === "en" ? "Home" : "गृह"}</Link>
              </li>
              <li aria-hidden="true" className="text-primary-300">/</li>
              <li>
                <Link href={`/${lang}/products`} className="transition-colors hover:text-white">{lang === "en" ? "Products" : "उत्पादनहरू"}</Link>
              </li>
              {cat && (
                <>
                  <li aria-hidden="true" className="text-primary-300">/</li>
                  <li>
                    <Link href={`/${lang}${cat.href}`} className="transition-colors hover:text-white">{lang === "np" ? cat.np : cat.en}</Link>
                  </li>
                </>
              )}
              <li aria-hidden="true" className="text-primary-300">/</li>
              <li className="font-medium text-white" aria-current="page">
                {lang === "np" && product.titleNp ? product.titleNp : product.title}
              </li>
            </ol>
          </nav>
          <h1 className="text-3xl font-bold md:text-4xl">{lang === "np" && product.titleNp ? product.titleNp : product.title}</h1>
          {product.summary && <p className="mt-3 max-w-2xl text-lg text-primary-100">{product.summary}</p>}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-primary-200">
            {cat && (
              <span className="flex items-center gap-1">
                <Banknote className="h-4 w-4" /> {lang === "np" ? cat.np : cat.en}
              </span>
            )}
            {product.interestRateInfo && (
              <span className="flex items-center gap-1">
                <Percent className="h-4 w-4" /> {product.interestRateInfo}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              {product.bannerImage && (
                <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                  <img
                    src={product.bannerImage}
                    alt={lang === "np" && product.titleNp ? `${product.titleNp} — रिलायन्स फाइनान्स लिमिटेड` : `${product.title} — Reliance Finance Limited`}
                    width={1200}
                    height={400}
                    loading="lazy"
                    className="h-auto w-full object-cover"
                  />
                </div>
              )}

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
              {product.interestRateInfo && (
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
                    <Percent className="h-5 w-5 text-accent-600" />
                    {lang === "en" ? "Interest Rate" : "ब्याज दर"}
                  </h3>
                  <p className="text-lg font-bold text-primary-700">{product.interestRateInfo}</p>
                </div>
              )}

              {product.minAmount && (
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                  <h3 className="mb-3 font-semibold text-gray-900">
                    {lang === "en" ? "Minimum Balance" : "न्यूनतम ब्यालेन्स"}
                  </h3>
                  <p className="text-lg font-bold text-primary-700">Rs. {Number(product.minAmount).toLocaleString()}</p>
                </div>
              )}

              {product.maxTenure && (
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                  <h3 className="mb-3 font-semibold text-gray-900">
                    {lang === "en" ? "Maximum Tenure" : "अधिकतम अवधि"}
                  </h3>
                  <p className="text-lg font-bold text-primary-700">{product.maxTenure}</p>
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

              <div className="rounded-xl border bg-primary-50/60 p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900">
                  {lang === "en" ? "Interested?" : "चासो छ?"}
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  {lang === "en" ? "Apply online or visit our nearest branch." : "अनलाइन आवेदन गर्नुहोस् वा हाम्रो नजिकको शाखामा जानुहोस्।"}
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    href={
                      category === "savings" || category === "fixed" || category === "deposits"
                        ? `/${lang}/open-account?product=${slug}`
                        : `/${lang}/loan-enquiry?product=${slug}`
                    }
                    className="rounded-xl bg-secondary-500 px-4 py-2.5 text-center text-sm font-bold text-gray-900 shadow-sm transition-all hover:bg-secondary-400 hover:shadow-md"
                  >
                    {lang === "en" ? "Apply Now" : "अहिले नै आवेदन दिनुहोस्"}
                  </Link>
                  <Link href={`/${lang}/contact`} className="rounded-xl border bg-white px-4 py-2.5 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
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
