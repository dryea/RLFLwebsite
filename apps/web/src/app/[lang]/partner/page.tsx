"use client";

import { useLang } from "@/contexts/LanguageContext";
import { Handshake, ShieldCheck, Send, Landmark, Building2 } from "lucide-react";
import StaggerChildren, { StaggerItem } from "@/components/motion/StaggerChildren";

const partners = [
  { name: "SmartChoice Technologies (SCT - ATM)", type: "professional" },
  { name: "F1Soft International Pvt. Ltd.", type: "professional" },
  { name: "Nepal Clearing House Ltd. (NCHL)", type: "professional" },
  { name: "Inorins Technologies", type: "professional" },
  { name: "CDS and Clearing Ltd", type: "professional" },
];

const remittancePartners = [
  "Himal Remit", "City Express Money Transfer", "IME Remit", "Western Union Money Transfer",
  "Prabhu Money Transfer", "Samsara Money Transfer", "iPay Remit", "Easy Link Remit",
  "GME Remit", "World Remit",
];

export default function PartnerPage() {
  const lang = useLang();
  const isNp = lang === "np";

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <Handshake className="h-7 w-7" /> {isNp ? "हाम्रा साझेदार" : "Our Partners"}
          </h1>
          <p className="mt-2 text-primary-100">
            {isNp ? "हाम्रा सहकार्य साझेदारहरू" : "Our trusted collaborators"}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="mb-10 rounded-xl border bg-white p-8 text-center shadow-sm">
            <p className="text-lg leading-relaxed text-gray-600">
              {isNp
                ? "हामीले आफ्ना मूल्यवान् ग्राहकहरूलाई वित्तीय सेवाहरू सहज बनाउन केही व्यावसायिक कम्पनीहरूसँग साझेदारी गरेका छौं।"
                : "We have partnered with some of the Professional Companies to ease the Financial Services to our valued Customers."}
            </p>
          </div>

          <StaggerChildren className="grid gap-6 sm:grid-cols-2">
            <StaggerItem className="h-full">
              <div className="h-full rounded-xl border bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50">
                  <Building2 className="h-6 w-6 text-primary-700" />
                </div>
                <h2 className="mb-4 text-lg font-bold text-gray-900">
                  {isNp ? "व्यावसायिक साझेदारहरू" : "Professional Partners"}
                </h2>
                <ul className="space-y-2.5">
                  {partners.map((p) => (
                    <li key={p.name} className="flex items-center gap-2 text-sm text-gray-600">
                      <ShieldCheck className="h-4 w-4 shrink-0 text-green-600" />
                      {p.name}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>

            <StaggerItem className="h-full">
              <div className="h-full rounded-xl border bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
                  <Send className="h-6 w-6 text-green-700" />
                </div>
                <h2 className="mb-4 text-lg font-bold text-gray-900">
                  {isNp ? "रेमिट्यान्स साझेदारहरू" : "Remittance Partners"}
                </h2>
                <ul className="space-y-2.5">
                  {remittancePartners.map((r) => (
                    <li key={r} className="flex items-center gap-2 text-sm text-gray-600">
                      <Landmark className="h-4 w-4 shrink-0 text-primary-600" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
