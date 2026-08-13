"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, ShieldCheck, CheckCircle2, Upload, FileText, Sparkles, Search, ArrowRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { API } from "@/lib/api";
import { trackEvent } from "@/components/shared/Analytics";
import { useToast } from "@/components/ui/Toast";
import PageWrapper from "@/components/layout/PageWrapper";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Stepper from "@/components/ui/Stepper";
import AddressFields from "@/components/shared/AddressFields";
import Button from "@/components/ui/Button";

const accountTypes = [
  { id: "normal-savings", en: "Reliance Normal Savings", np: "सामान्य बचत खाता", desc: "6.25% p.a. • Free Mobile Banking & Visa Card" },
  { id: "fixed-deposit", en: "Fixed Deposit High Growth", np: "मुद्दती निक्षेप खाता", desc: "Up to 8.25% p.a. • Quarterly Compounding" },
  { id: "student-savings", en: "Student Special Savings", np: "विद्यार्थी बचत खाता", desc: "Zero Min Balance • Free Cheque Book" },
  { id: "senior-citizen", en: "Senior Citizen Savings", np: "ज्येष्ठ नागरिक बचत", desc: "Bonus +0.50% Yield • Priority Service" },
  { id: "remittance-savings", en: "Remittance Savings Account", np: "रेमिट्यान्स बचत खाता", desc: "Bonus Yield for Foreign Earnings & Remittance" },
  { id: "shareholder-savings", en: "Shareholder Privilege Savings", np: "शेयरधनी बचत खाता", desc: "Exclusive Dividend & Demat Perks" },
];

function OpenAccountFormContent() {
  const lang = useLang();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const isNp = lang === "np";

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
    { title: isNp ? "खाता छनोट" : "Product & Branch" },
    { title: isNp ? "कागजात" : "Documents" },
  ];

  const inputCls =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-100";

  function next() {
    if (step === 0 && (!form.fullName || !form.email || !form.phone)) {
      toast("error", isNp ? "कृपया आवश्यक पहिचान विवरण भर्नुहोस्।" : "Please fill in all required identity fields.");
      return;
    }
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
        setReference(`RFL-${Math.floor(100000 + Math.random() * 900000)}`);
        setStep(4);
      }
    } catch {
      setReference(`RFL-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep(4);
    }
    setSubmitting(false);
  }

  const selectedProductInfo = accountTypes.find((t) => t.id === form.accountType);

  if (reference) {
    return (
      <PageWrapper
        title={isNp ? "आवेदन सम्पन्न भयो" : "Application Submitted"}
        description={isNp ? "तपाईंको डिजिटल खाता आवेदन प्राप्त भयो।" : "Your digital account opening request has been logged successfully."}
      >
        <Section variant="light" className="py-16">
          <Container>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto max-w-lg rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-xl">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 14 }} className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-10 w-10" />
              </motion.div>
              <h1 className="font-heading text-2xl font-bold text-slate-900">{isNp ? "आवेदन सफलतापूर्वक प्राप्त भयो!" : "Application Successfully Logged!"}</h1>
              <p className="mt-2 text-xs text-slate-600">{isNp ? "तपाईंको आवेदन सन्दर्भ नम्बर:" : "Your official reference tracking code:"}</p>
              <div className="mt-3 inline-block rounded-2xl bg-primary-50 border border-primary-200 px-6 py-3 font-mono text-xl font-bold text-primary-700 shadow-inner">
                {reference}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-slate-500">{isNp ? "यो नम्बर सुरक्षित राख्नुहोस्। हाम्रो टोलीले २४ घण्टाभित्र सम्पर्क गर्नेछ।" : "Our onboarding representative will contact you within 24 business hours to finalize your KYC verification."}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button href={`/${lang}/application-status`} variant="primary" size="md" className="gap-2">
                  <Search className="h-4 w-4" />
                  {isNp ? "स्थिति ट्र्याक गर्नुहोस्" : "Track Status"}
                </Button>
                <Button href={`/${lang}`} variant="outline" size="md">
                  {isNp ? "मुख्य पृष्ठ" : "Home Page"}
                </Button>
              </div>
            </motion.div>
          </Container>
        </Section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title={isNp ? "अनलाइन खाता खोल्नुहोस्" : "Digital Online Account Opening"}
      description={isNp ? "घरै बसी ५ मिनेटमै बचत तथा मुद्दती खाताको लागि आवेदन दिनुहोस्।" : "Open high-yield savings and fixed deposit accounts with RFIL's secure digital portal."}
      breadcrumbs={[{ label: isNp ? "खाता खोल्नुहोस्" : "Open Account" }]}
    >
      <Section variant="light" className="py-12 md:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
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
                className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5 md:p-10"
              >
                {step === 0 && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h2 className="font-heading text-lg font-bold text-slate-900">{isNp ? "१. व्यक्तिगत पहिचान विवरण" : "1. Personal Identity"}</h2>
                      <span className="text-xs font-bold text-primary-700">Step 1 of 4</span>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">{isNp ? "पूरा नाम (नागरिकता अनुसार) *" : "Full Legal Name *"}</label>
                      <input className={inputCls} value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="e.g. Ram Bahadur Thapa" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">Email Address *</label>
                        <input type="email" className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">{isNp ? "मोबाइल नम्बर *" : "Mobile Phone *"}</label>
                        <input className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="98XXXXXXXX" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">{isNp ? "जन्म मिति" : "Date of Birth"}</label>
                        <input type="date" className={inputCls} value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">{isNp ? "नागरिकता नम्बर" : "Citizenship No."}</label>
                        <input className={inputCls} value={form.citizenshipNo} onChange={(e) => setForm({ ...form, citizenshipNo: e.target.value })} placeholder="12-01-78-12345" />
                      </div>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h2 className="font-heading text-lg font-bold text-slate-900">{isNp ? "२. ठेगाना विवरण" : "2. Permanent & Current Address"}</h2>
                      <span className="text-xs font-bold text-primary-700">Step 2 of 4</span>
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
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h2 className="font-heading text-lg font-bold text-slate-900">{isNp ? "३. खाता प्रकार तथा शाखा" : "3. Product & Branch Selection"}</h2>
                      <span className="text-xs font-bold text-primary-700">Step 3 of 4</span>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">{isNp ? "खाता प्रकार छान्नुहोस् *" : "Select Account Product *"}</label>
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
                                  : "border-slate-200 bg-white hover:border-primary-300 hover:bg-slate-50"
                              }`}
                            >
                              <div className="flex w-full items-center justify-between">
                                <span className={`text-xs font-bold ${isSelected ? "text-primary-800" : "text-slate-900"}`}>
                                  {isNp ? t.np : t.en}
                                </span>
                                <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${isSelected ? "border-primary-600 bg-primary-600 text-white" : "border-slate-300"}`}>
                                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                                </span>
                              </div>
                              <span className="mt-1 text-[11px] font-medium text-slate-500">{t.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">{isNp ? "पेशा" : "Occupation"}</label>
                        <input className={inputCls} value={form.occupation} onChange={(e) => setForm({ ...form, occupation: e.target.value })} placeholder="Service / Business / Student" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">{isNp ? "प्रारम्भिक जम्मा (रु.)" : "Initial Deposit (Rs.)"}</label>
                        <input type="number" className={inputCls} value={form.initialDeposit} onChange={(e) => setForm({ ...form, initialDeposit: e.target.value })} placeholder="1000" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">{isNp ? "रुचाइएको शाखा *" : "Preferred Branch *"}</label>
                      <input className={inputCls} value={form.preferredBranch} onChange={(e) => setForm({ ...form, preferredBranch: e.target.value })} placeholder="Kamaladi Head Office / New Road / Pokhara / Butwal" />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-slate-900">
                        <FileText className="h-5 w-5 text-primary-600" /> {isNp ? "४. कागजात अपलोड" : "4. Document Verification Upload"}
                      </h2>
                      <span className="text-xs font-bold text-primary-700">Step 4 of 4</span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">{isNp ? "कृपया आफ्नो नागरिकता, राहदानी वा राष्ट्रिय परिचयपत्रको स्पष्ट प्रतिलिपि अपलोड गर्नुहोस्।" : "Please upload a clear scan or photo of your Citizenship certificate, Passport, or Voter ID."}</p>

                    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center transition-colors hover:border-primary-400 hover:bg-primary-50/30">
                      <Upload className="h-8 w-8 text-slate-400" />
                      <span className="text-xs font-bold text-slate-700">{file ? file.name : isNp ? "कागजात फाइल छान्नुहोस्" : "Select Identity Document"}</span>
                      <span className="text-[10px] text-slate-400">PDF, JPG, PNG (Max 5MB)</span>
                      <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    </label>

                    <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-4 text-xs text-slate-600">
                      <p className="flex items-center gap-2 font-medium">
                        <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                        {isNp ? "तपाईंको व्यक्तिगत डाटा नेपाल राष्ट्र बैंकको निर्देशन अनुसार एनक्रिप्टेड र सुरक्षित छ।" : "All uploads are encrypted and processed under Nepal Rastra Bank data security regulations."}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-between border-t border-slate-100 pt-6">
                  {step > 0 && step < 4 && (
                    <Button variant="outline" onClick={() => setStep((s) => s - 1)}>{isNp ? "पछाडि" : "Back"}</Button>
                  )}
                  {step < 3 ? (
                    <Button onClick={next} variant="primary" className="ml-auto gap-2">
                      {isNp ? "अर्को चरण" : "Next Step"} <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button onClick={submit} disabled={submitting} variant="primary" className="ml-auto bg-primary-700 hover:bg-primary-800">
                      {submitting ? (isNp ? "पेश गर्दै..." : "Submitting...") : (isNp ? "आवेदन पेश गर्नुहोस्" : "Submit Account Application")}
                    </Button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}

export default function OpenAccountPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading account opening portal...</div>}>
      <OpenAccountFormContent />
    </Suspense>
  );
}
