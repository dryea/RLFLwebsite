"use client";

import { useEffect, useState, useMemo } from "react";
import { Store, Percent, Phone, Globe, MapPin, TicketPercent, ShieldCheck, CreditCard, QrCode } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { API } from "@/lib/api";
import PageWrapper from "@/components/layout/PageWrapper";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { Heading, Text, GradientText } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";

interface Merchant {
  id: number;
  merchantName: string;
  category: "dining" | "health" | "travel" | "retail";
  logo?: string;
  description?: string;
  offerDetails?: string;
  discountPercent?: string;
  validUntil?: string;
  website?: string;
  phone?: string;
  address?: string;
}

const SAMPLE_MERCHANTS: Merchant[] = [
  {
    id: 1,
    merchantName: "Grande International Hospital",
    category: "health",
    discountPercent: "15% OFF",
    offerDetails: "15% discount on OPD Consultation, Diagnostics, and In-Patient Bed Charges with RFIL Debit Cards.",
    address: "Dhapasi, Kathmandu",
    phone: "01-5159266",
    website: "https://grandehospital.com",
  },
  {
    id: 2,
    merchantName: "Hotel Yak & Yeti",
    category: "travel",
    discountPercent: "20% OFF",
    offerDetails: "20% discount on Fine Dining & Bakery, and 15% discount on Luxury Room Bookings.",
    address: "Durbar Marg, Kathmandu",
    phone: "01-4248999",
    website: "https://yakandyeti.com",
  },
  {
    id: 3,
    merchantName: "Bhat-Bhateni Superstore",
    category: "retail",
    discountPercent: "10% CASHBACK",
    offerDetails: "10% cashback (up to Rs. 500) on grocery purchases paid via RFIL Mobile Banking Fonepay QR.",
    address: "All Outlets Nationwide",
    phone: "01-4419181",
    website: "https://bbsm.com.np",
  },
  {
    id: 4,
    merchantName: "Himalayan Java Coffee",
    category: "dining",
    discountPercent: "12% OFF",
    offerDetails: "12% instant discount on all food & beverage orders when paying with RFIL Visa Card.",
    address: "Thamel, New Road, Durbar Marg, Pokhara",
    phone: "01-4422519",
    website: "https://himalayanjava.com",
  },
  {
    id: 5,
    merchantName: "CG Digital Electronics",
    category: "retail",
    discountPercent: "7% OFF",
    offerDetails: "Additional 7% discount on home appliances & electronics with 0% EMI financing scheme.",
    address: "Kumaripati, Lalitpur",
    phone: "01-5545678",
    website: "https://cgdigital.com.np",
  },
  {
    id: 6,
    merchantName: "Norvic International Hospital",
    category: "health",
    discountPercent: "10% OFF",
    offerDetails: "10% discount on annual health checkup packages and pathology tests for RFIL account holders.",
    address: "Thapathali, Kathmandu",
    phone: "01-5970032",
    website: "https://norvichospital.com",
  },
];

export default function MerchantOffersPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [merchants, setMerchants] = useState<Merchant[]>(SAMPLE_MERCHANTS);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  useEffect(() => {
    fetch(`${API}/api/merchants`)
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d) && d.length > 0) {
          setMerchants(d);
        }
      })
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    if (categoryFilter === "all") return merchants;
    return merchants.filter((m) => m.category === categoryFilter);
  }, [categoryFilter, merchants]);

  return (
    <PageWrapper
      title={isNp ? "व्यापारी साझेदार र छुट योजनाहरू" : "Merchant Discounts & Partner Offers"}
      description={isNp ? "रिलायन्स फाइनान्स डेबिट कार्ड तथा मोबाइल बैंकिङ Fonepay QR बाट भुक्तानी गर्दा प्राप्त हुने विशेष छुटहरू।" : "Exclusive cashback and discounts at leading hospital, dining, supermarket, and travel partners across Nepal using RFIL Debit Cards & QR."}
      breadcrumbs={[{ label: isNp ? "व्यापारी प्रस्ताव" : "Merchant Offers" }]}
    >
      <Section variant="light" className="py-12 md:py-16">
        <Container>
          {/* Banner Metric Cards */}
          <div className="mb-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-900/5">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <TicketPercent className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-base font-bold text-slate-900">{isNp ? "२०% सम्म छुट" : "Up to 20% Discount"}</h3>
              <p className="mt-1 text-xs text-slate-500">{isNp ? "अस्पताल, होटल, सुपरमार्केट र क्याफेहरूमा बिशेष बचत।" : "Save on medical checkups, luxury hotels, dining, and daily groceries."}</p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-900/5">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-base font-bold text-slate-900">{isNp ? "RFIL डेबिट कार्ड" : "RFIL Visa Debit Card"}</h3>
              <p className="mt-1 text-xs text-slate-500">{isNp ? "सबै साझेदार आउटलेटहरूमा POS मेसिन मार्फत भुक्तानी गर्दा छुट।" : "Tap & Pay instantly at partner POS terminals across Nepal."}</p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-900/5">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                <QrCode className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-base font-bold text-slate-900">{isNp ? "Fonepay QR क्यासब्याक" : "Fonepay QR Cashback"}</h3>
              <p className="mt-1 text-xs text-slate-500">{isNp ? "RFIL स्मार्ट बैंकिङ एप मार्फत QR स्क्यान गरी तत्काल क्यासब्याक।" : "Scan QR with RFIL Smart Banking app for instant cash rewards."}</p>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-8 flex flex-wrap gap-2">
            {[
              { id: "all", en: "All Partners", np: "सबै साझेदारहरू" },
              { id: "health", en: "Healthcare & Hospitals", np: "स्वास्थ्य तथा अस्पताल" },
              { id: "dining", en: "Dining & Cafes", np: "भोजन तथा क्याफे" },
              { id: "travel", en: "Hotels & Travel", np: "होटल तथा यात्रा" },
              { id: "retail", en: "Supermarkets & Retail", np: "सुपरमार्केट र खुद्रा" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  categoryFilter === cat.id
                    ? "bg-primary-700 text-white shadow-md shadow-primary-900/20"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {isNp ? cat.np : cat.en}
              </button>
            ))}
          </div>

          {/* Merchants Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m) => (
              <div key={m.id} className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-900/5 transition-all hover:-translate-y-1">
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-extrabold text-emerald-700">
                    <Percent className="h-3.5 w-3.5" /> {m.discountPercent}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Verified Merchant</span>
                </div>

                <h3 className="font-heading text-lg font-bold text-slate-900">{m.merchantName}</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">{m.offerDetails}</p>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500 font-medium">
                  {m.address && (
                    <p className="flex items-center gap-2 text-slate-700">
                      <MapPin className="h-4 w-4 text-primary-600 shrink-0" /> {m.address}
                    </p>
                  )}
                  {m.phone && (
                    <a href={`tel:${m.phone}`} className="flex items-center gap-2 hover:text-primary-700">
                      <Phone className="h-4 w-4 text-slate-400 shrink-0" /> {m.phone}
                    </a>
                  )}
                  {m.website && (
                    <a href={m.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-700 text-primary-600 font-semibold">
                      <Globe className="h-4 w-4 text-slate-400 shrink-0" /> {m.website.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
