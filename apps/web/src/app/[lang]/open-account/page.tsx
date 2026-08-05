"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, ShieldCheck, CheckCircle2, Upload, FileText, Sparkles, Building, Search } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { API } from "@/lib/api";
import { trackEvent } from "@/components/shared/Analytics";
import { useToast } from "@/components/ui/Toast";
import Stepper from "@/components/ui/Stepper";
import AddressFields from "@/components/shared/AddressFields";
import Button from "@/components/ui/Button";

const accountTypes = [
  { id: "normal-savings", en: "Normal Savings Account", np: "सामान्य बचत खाता", desc: "6.25% p.a. • Daily Interest" },
  { id: "fixed-deposit", en: "Fixed Deposit Account", np: "मुद्दती निक्षेप खाता", desc: "Up to 8.25% p.a. • High Growth" },
  { id: "student-savings", en: "Student Savings Account", np: "विद्यार्थी बचत खाता", desc: "Zero Min Balance • Special Rate" },
  { id: "senior-citizen", en: "Senior Citizen Savings", np: "ज्येष्ठ नागरिक बचत", desc: "Premium Interest Yield" },
  { id: "remittance-savings", en: "Remittance Savings Account", np: "रेमिट्यान्स बचत खाता", desc: "Bonus Yield for Foreign Earnings" },
  { id: "shareholder-savings", en: "Shareholder Savings", np: "शेयरधनी बचत खाता", desc: "Exclusive Member Benefits" },
];

function OpenAccountFormContent() {
  const lang = useLang();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const isNp = lang === "np";

  // Pre-selected product slug from URL parameter e.g. ?product=reliance-normal-savings
  const productParam = searchParams.get("product") || searchParams.get("accountType") || searchParams.get("type") || "";

  const matchedType = accountTypes.find(
    (t) =>
      t.id === productParam ||
      productParam.toLowerCase().includes(t.id) ||
      t.id.includes(productParam.toLowerCase()) ||
      (productParam.includes("savings") && t.id === "normal-savings") ||
      (productParam.includes("fixed") && t.id === "fixed-deposit")
  )?.id || "normal-savings";

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    citizenshipNo: "",
    accountType: matchedType,
    province: "",
    district: "",
    localBody: "",
    address: "",
    preferredBranch: "",
    occupation: "",
    initialDeposit: "",
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (matchedType) {
      setForm((prev) => ({ ...prev, accountType: matchedType }));
    }
  }, [matchedType]);

  const steps = [
    { title: isNp ? "पहिचान" : "Identity" },
    { title: isNp ? "ठेगाना" : "Address" },
    { title: isNp ? "खाता छनोट" : "Account Setup" },
    { title: isNp ? "कागजात" : "Documents" },
  ];

  const inputCls =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-100";

  function next() {
    if (step === 0 && (!form.fullName || !form.email || !form.phone)) return;
    setStep((s) => Math.min(s + 1, 3));
  }

  async function submit() {
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/api/account-applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setReference(data.referenceNo || `RFL-${Math.floor(100000 + Math.random() * 900000)}`);
        trackEvent("conversion", "account_opening");
        setStep(4);
      } else {
        toast("error", isNp ? "पेश गर्न सकिएन। फेरि प्रयास गर्नुहोस्।" : "Submission failed. Please try again.");
      }
    } catch {
      toast("error", isNp ? "नेटवर्क त्रुटि। पुन: प्रयास गर्नुहोस्।" : "Network error. Please try again.");
    }
    setSubmitting(false);
  }

  const selectedProductInfo = accountTypes.find((t) => t.id === form.accountType);

  if (reference) {
    return (
      <section className="flex flex-1 items-center justify-center py-20">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 14 }} className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900">{isNp ? "आवेदन सफलतापूर्वक प्राप्त भयो!" : "Application Successfully Received!"}</h1>
          <p className="mt-2 text-gray-600">{isNp ? "तपाईंको आवेदन सन्दर्भ नम्बर:" : "Your application reference number is:"}</p>
          <div className="mt-3 inline-block rounded-2xl bg-primary-50 px-6 py-3 font-mono text-xl font-bold text-primary-700">{reference}</div>
          <p className="mt-4 text-xs leading-relaxed text-gray-500">{isNp ? "यो नम्बर सुरक्षित राख्नुहोस्। हाम्रो टोलीले तपाईंलाई सम्पर्क गर्नेछ।" : "Keep this reference safe. Our customer onboarding team will reach out to finalize your account setup."}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => (window.location.href = `/${lang}/application-status`)} className="inline-flex items-center gap-2 rounded-xl bg-primary-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 shadow-sm">
              <Search className="h-4 w-4" />
              {isNp ? "आवेदन स्थिति ट्र्याक गर्नुहोस्" : "Track Application Status"}
            </button>
            <button onClick={() => (window.location.href = `/${lang}`)} className="rounded-xl border px-6 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50">
              {isNp ? "मुख्य पृष्ठमा फर्कनुहोस्" : "Return to Home"}
            </button>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-950 py-12 text-white shadow-inner">
        <div className="container-page">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="flex items-center gap-3 text-3xl font-bold">
                <UserPlus className="h-8 w-8 text-secondary-400" />
                {isNp ? "अनलाइन खाता खोल्नुहोस्" : "Online Account Opening"}
              </h1>
              <p className="mt-2 text-sm text-primary-100">
                {isNp ? "डिजिटल माध्यमबाट ५ मिनेटमै खाता आवेदन दिनुहोस्" : "Apply for your savings or deposit account digitally in under 5 minutes"}
              </p>
            </div>

            {productParam && selectedProductInfo && (
              <div className="flex items-center gap-3 rounded-2xl border border-secondary-400/40 bg-white/10 px-5 py-3 backdrop-blur-md">
                <Sparkles className="h-5 w-5 text-secondary-400" />
                <div>
                  <span className="block text-[10px] font-extrabold uppercase tracking-widest text-secondary-400">Pre-Selected Product</span>
                  <span className="text-sm font-bold text-white">{isNp ? selectedProductInfo.np : selectedProductInfo.en}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page max-w-3xl">
          <div className="mb-8">
            <Stepper steps={steps} current={step} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl md:p-8"
            >
              {step === 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h2 className="font-heading text-lg font-bold text-gray-900">{isNp ? "तपाईंको पहिचान विवरण" : "Personal Identity Details"}</h2>
                    <span className="text-xs font-semibold text-primary-600">Step 1 of 4</span>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">{isNp ? "पूरा नाम *" : "Full Name *"}</label>
                    <input className={inputCls} value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="e.g. Ram Bahadur Thapa" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">Email Address *</label>
                      <input type="email" className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">{isNp ? "मोबाइल नम्बर *" : "Mobile Phone *"}</label>
                      <input className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="98XXXXXXXX" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">{isNp ? "जन्म मिति" : "Date of Birth"}</label>
                      <input type="date" className={inputCls} value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">{isNp ? "नागरिकता नम्बर" : "Citizenship No."}</label>
                      <input className={inputCls} value={form.citizenshipNo} onChange={(e) => setForm({ ...form, citizenshipNo: e.target.value })} placeholder="123-45-6789" />
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h2 className="font-heading text-lg font-bold text-gray-900">{isNp ? "स्थायी तथा हालको ठेगाना" : "Address & Location"}</h2>
                    <span className="text-xs font-semibold text-primary-600">Step 2 of 4</span>
                  </div>
                  <AddressFields
                    value={{ province: form.province, district: form.district, localBody: form.localBody, address: form.address }}
                    onChange={(v) => setForm({ ...form, province: v.province, district: v.district, localBody: v.localBody, address: v.address })}
                    lang={lang}
                    showAddress
                    required
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h2 className="font-heading text-lg font-bold text-gray-900">{isNp ? "खाता प्रकार तथा शाखा छनोट" : "Account Product & Branch"}</h2>
                    <span className="text-xs font-semibold text-primary-600">Step 3 of 4</span>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-700">{isNp ? "खाता प्रकार छान्नुहोस् *" : "Select Account Product *"}</label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {accountTypes.map((t) => {
                        const isSelected = form.accountType === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setForm({ ...form, accountType: t.id })}
                            className={`flex flex-col items-start justify-between rounded-2xl border p-4 text-left transition-all ${
                              isSelected
                                ? "border-primary-600 bg-primary-50/80 shadow-sm ring-2 ring-primary-600/20"
                                : "border-gray-200 bg-white hover:border-primary-300 hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex w-full items-center justify-between">
                              <span className={`text-xs font-bold ${isSelected ? "text-primary-800" : "text-gray-900"}`}>
                                {isNp ? t.np : t.en}
                              </span>
                              <span className={`h-4 w-4 rounded-full border flex items-center justify-center ${isSelected ? "border-primary-600 bg-primary-600 text-white" : "border-gray-300"}`}>
                                {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                              </span>
                            </div>
                            <span className="mt-1 text-[11px] font-medium text-gray-500">{t.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">{isNp ? "पेशा" : "Occupation"}</label>
                      <input className={inputCls} value={form.occupation} onChange={(e) => setForm({ ...form, occupation: e.target.value })} placeholder="e.g. Service / Business / Student" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">{isNp ? "प्रारम्भिक जम्मा (रु.)" : "Initial Deposit (Rs.)"}</label>
                      <input type="number" className={inputCls} value={form.initialDeposit} onChange={(e) => setForm({ ...form, initialDeposit: e.target.value })} placeholder="1000" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">{isNp ? "रुचाइएको शाखा *" : "Preferred Branch *"}</label>
                    <input className={inputCls} value={form.preferredBranch} onChange={(e) => setForm({ ...form, preferredBranch: e.target.value })} placeholder="e.g. Kamaladi Head Office / New Road Branch" />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-gray-900">
                      <FileText className="h-5 w-5 text-primary-600" /> {isNp ? "कागजात अपलोड" : "Document Upload"}
                    </h2>
                    <span className="text-xs font-semibold text-primary-600">Step 4 of 4</span>
                  </div>

                  <p className="text-xs text-gray-500">{isNp ? "कृपया आफ्नो नागरिकता वा राहदानीको प्रतिलिपि अपलोड गर्नुहोस्।" : "Please upload a clear copy of your Citizenship, Passport, or Identity Document."}</p>

                  <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center transition-colors hover:border-primary-400 hover:bg-primary-50/20">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-xs font-bold text-gray-700">{file ? file.name : isNp ? "कागजात अपलोड गर्नुहोस्" : "Click to select document file"}</span>
                    <span className="text-[10px] text-gray-400">PDF, JPG, PNG — max 5MB</span>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                  </label>

                  <div className="rounded-xl bg-gray-50 p-3 text-xs text-gray-500 border border-gray-100">
                    <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" /> {isNp ? "तपाईंको व्यक्तिगत डाटा नेपाल राष्ट्र बैंकको निर्देशन अनुसार सुरक्षित छ।" : "Your personal data is encrypted and handled in compliance with NRB Guidelines."}</p>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-between border-t pt-4">
                {step > 0 && step < 4 && (
                  <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>{isNp ? "पछाडि" : "Back"}</Button>
                )}
                {step < 3 ? (
                  <Button onClick={next} className="ml-auto">{isNp ? "अर्को चरण →" : "Next Step →"}</Button>
                ) : (
                  <Button onClick={submit} disabled={submitting} className="ml-auto bg-primary-700 hover:bg-primary-800">
                    {submitting ? (isNp ? "पेश गर्दै..." : "Submitting...") : (isNp ? "आवेदन पेश गर्नुहोस्" : "Submit Account Application")}
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

export default function OpenAccountPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-400">Loading account opening portal...</div>}>
      <OpenAccountFormContent />
    </Suspense>
  );
}
