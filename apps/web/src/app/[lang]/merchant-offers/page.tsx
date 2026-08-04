"use client";

import { useEffect, useState } from "react";
import { Store, Percent, Phone, Globe, MapPin, TicketPercent } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { API } from "@/lib/api";

interface Merchant {
  id: number;
  merchantName: string;
  logo?: string;
  description?: string;
  offerDetails?: string;
  discountPercent?: string;
  validUntil?: string;
  website?: string;
  phone?: string;
  address?: string;
}

export default function MerchantOffersPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/merchants`)
      .then((r) => r.json())
      .then((d) => setMerchants(Array.isArray(d) ? d : []))
      .catch(() => setMerchants([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <Store className="h-7 w-7" /> {isNp ? "व्यापारी र प्रस्ताव" : "Merchant & Offers"}
          </h1>
          <p className="mt-2 text-primary-100">
            {isNp ? "हाम्रा व्यापारी साझेदार र विशेष प्रस्तावहरू" : "Exclusive discounts and offers from our merchant partners"}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="mb-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50">
                <TicketPercent className="h-6 w-6 text-primary-700" />
              </div>
              <h3 className="font-semibold text-gray-900">{isNp ? "विशेष छुटहरू" : "Special Discounts"}</h3>
              <p className="mt-1 text-sm text-gray-500">{isNp ? "RFL कार्डधारकहरूका लागि साझेदार व्यापारीहरूमा छुट।" : "Enjoy exclusive discounts at partner merchants with your RFL card."}</p>
            </div>
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-green-50">
                <Store className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="font-semibold text-gray-900">{isNp ? "व्यापारी सञ्जाल" : "Merchant Network"}</h3>
              <p className="mt-1 text-sm text-gray-500">{isNp ? "देशभरका विभिन्न व्यापारीहरूसँग साझेदारी।" : "A growing network of partner merchants across the country."}</p>
            </div>
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-amber-50">
                <Percent className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="font-semibold text-gray-900">{isNp ? "दैनिक लाभ" : "Everyday Benefits"}</h3>
              <p className="mt-1 text-sm text-gray-500">{isNp ? "किनमेल, भोजन र सेवाहरूमा नियमित बचत।" : "Save on shopping, dining, and services every day."}</p>
            </div>
          </div>

          <div className="mb-6 flex items-center gap-2">
            <Store className="h-5 w-5 text-primary-700" />
            <h2 className="text-xl font-bold text-gray-900">
              {isNp ? "व्यापारी साझेदारहरू" : "Merchant Partners"}
            </h2>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => <div key={i} className="h-44 animate-pulse rounded-xl bg-gray-100" />)}
            </div>
          ) : merchants.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {merchants.map((m) => (
                <div key={m.id} className="flex flex-col rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  {m.discountPercent && (
                    <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700">
                      <Percent className="h-3 w-3" /> {m.discountPercent}
                    </span>
                  )}
                  <h3 className="font-semibold text-gray-900">{m.merchantName}</h3>
                  {m.description && <p className="mt-1 text-sm text-gray-500">{m.description}</p>}
                  {m.offerDetails && <p className="mt-2 text-sm text-gray-600">{m.offerDetails}</p>}
                  <div className="mt-auto space-y-1.5 pt-4 text-xs text-gray-500">
                    {m.address && <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {m.address}</p>}
                    {m.phone && <a href={`tel:${m.phone}`} className="flex items-center gap-1.5 hover:text-primary-700"><Phone className="h-3.5 w-3.5" /> {m.phone}</a>}
                    {m.website && <a href={m.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary-700"><Globe className="h-3.5 w-3.5" /> {m.website.replace(/^https?:\/\//, "")}</a>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed p-16 text-center text-gray-400">
              <Store className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="text-sm">
                {isNp ? "व्यापारी प्रस्तावहरू चाँडै आउँदैछन्।" : "Merchant offers are being added. Please check back soon."}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
