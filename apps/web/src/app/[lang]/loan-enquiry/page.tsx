"use client";

import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { API } from "@/lib/api";
import AddressFields from "@/components/shared/AddressFields";

export default function LangLoanEnquiryPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [form, setForm] = useState({ name: "", address: "", province: "", district: "", localBody: "", phone: "", email: "", nationality: isNp ? "नेपाली" : "Nepali", customerProfile: "individual", loanType: "", proposedAmount: "", preferredBranch: "", remarks: "", consent: false });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.consent) return alert(isNp ? "कृपया सर्तहरू स्वीकार गर्नुहोस्" : "Please accept the terms");
    if (!form.province || !form.district || !form.localBody) return alert(isNp ? "कृपया प्रदेश, जिल्ला र स्थानीय तह चयन गर्नुहोस्" : "Please select province, district, and local body");
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/cms/loan-enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, proposedAmount: form.proposedAmount ? Number(form.proposedAmount) : null }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      alert(isNp ? "पेश गर्न सकिएन। फेरि प्रयास गर्नुहोस्।" : "Submission failed. Please try again.");
    }
    setLoading(false);
  }

  if (submitted) {
    return (
      <section className="flex flex-1 items-center justify-center py-20">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">✓</div>
          <h2 className="text-2xl font-bold text-gray-900">{isNp ? "सोधपुछ पेश भयो" : "Enquiry Submitted"}</h2>
          <p className="mt-2 text-gray-600">{isNp ? "हामी चाँडै सम्पर्क गर्नेछौं।" : "We will contact you shortly."}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{isNp ? "ऋण सोधपुछ फारम" : "Loan Enquiry Form"}</h1>
          <p className="mt-2 text-primary-100">{isNp ? "आफ्नो सोधपुछ पेश गर्नुहोस्" : "Submit your enquiry and we'll get back to you"}</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page">
          <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border bg-white p-6 shadow-sm">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "पूरा नाम *" : "Full Name *"}</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Email *</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "फोन *" : "Phone *"}</label>
                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "ठेगाना *" : "Address *"}</label>
                <AddressFields
                  value={{ province: form.province, district: form.district, localBody: form.localBody, address: form.address }}
                  onChange={(v) => setForm((prev) => ({ ...prev, province: v.province, district: v.district, localBody: v.localBody, address: v.address }))}
                  lang={lang}
                  showAddress
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "राष्ट्रियता" : "Nationality"}</label>
                <input value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "ग्राहक प्रोफाइल" : "Customer Profile"}</label>
                <select value={form.customerProfile} onChange={(e) => setForm({ ...form, customerProfile: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500">
                  <option value="individual">{isNp ? "व्यक्तिगत" : "Individual"}</option>
                  <option value="corporate">{isNp ? "संस्थागत" : "Corporate"}</option>
                  <option value="joint">{isNp ? "संयुक्त" : "Joint"}</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "ऋण प्रकार *" : "Loan Type *"}</label>
                <select required value={form.loanType} onChange={(e) => setForm({ ...form, loanType: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500">
                  <option value="">{isNp ? "छान्नुहोस्..." : "Select..."}</option>
                  <option value="agricultural">{isNp ? "कृषि ऋण" : "Agricultural Loan"}</option>
                  <option value="auto">{isNp ? "अटो ऋण" : "Auto Loan"}</option>
                  <option value="education">{isNp ? "शिक्षा ऋण" : "Education Loan"}</option>
                  <option value="home">{isNp ? "गृह ऋण" : "Home Loan"}</option>
                  <option value="personal">{isNp ? "व्यक्तिगत ऋण" : "Personal Loan"}</option>
                  <option value="business">{isNp ? "व्यवसाय ऋण" : "Business Loan"}</option>
                  <option value="share">{isNp ? "सेयर ऋण" : "Share Loan"}</option>
                  <option value="hire-purchase">{isNp ? "हायर पर्चेज" : "Hire Purchase"}</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "प्रस्तावित रकम (रु.)" : "Proposed Amount (Rs.)"}</label>
                <input type="number" value={form.proposedAmount} onChange={(e) => setForm({ ...form, proposedAmount: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "टिप्पणी" : "Remarks"}</label>
              <textarea rows={3} value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
            </div>
            <label className="flex items-start gap-2 text-sm text-gray-600">
              <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1" />
              <span>{isNp ? "म यो सोधपुछको लागि रिलायन्स फाइनान्सलाई मेरो व्यक्तिगत डाटा प्रशोधन गर्न अनुमति दिन्छु" : "I consent to Reliance Finance processing my personal data for this enquiry"}</span>
            </label>
            <button type="submit" disabled={loading} className="w-full rounded-lg bg-primary-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-800 disabled:opacity-60">
              {loading ? (isNp ? "पेश गर्दै..." : "Submitting...") : (isNp ? "सोधपुछ पेश गर्नुहोस्" : "Submit Enquiry")}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
