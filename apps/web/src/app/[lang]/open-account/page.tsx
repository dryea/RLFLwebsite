"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, ShieldCheck, CheckCircle2, Upload, FileText } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { API } from "@/lib/api";
import Stepper from "@/components/ui/Stepper";
import AddressFields from "@/components/shared/AddressFields";
import Button from "@/components/ui/Button";

export default function OpenAccountPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", dateOfBirth: "", citizenshipNo: "",
    accountType: "savings", province: "", district: "", localBody: "", address: "",
    preferredBranch: "", occupation: "", initialDeposit: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const steps = [
    { title: isNp ? "पहिचान" : "Identity" },
    { title: isNp ? "ठेगाना" : "Address" },
    { title: isNp ? "खाता" : "Account" },
    { title: isNp ? "कागजात" : "Documents" },
  ];

  const inputCls = "w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20";

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
        setReference(data.referenceNo);
        setStep(4);
      } else {
        alert(isNp ? "पेश गर्न सकिएन। फेरि प्रयास गर्नुहोस्।" : "Submission failed. Please try again.");
      }
    } catch {
      alert(isNp ? "पेश गर्न सकिएन।" : "Submission failed.");
    }
    setSubmitting(false);
  }

  if (reference) {
    return (
      <section className="flex flex-1 items-center justify-center py-20">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 14 }} className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900">{isNp ? "आवेदन प्राप्त भयो!" : "Application Received!"}</h1>
          <p className="mt-2 text-gray-600">{isNp ? "तपाईंको सन्दर्भ नम्बर:" : "Your reference number is:"}</p>
          <div className="mt-3 inline-block rounded-lg bg-primary-50 px-6 py-3 font-mono text-xl font-bold text-primary-700">{reference}</div>
          <p className="mt-4 text-sm text-gray-500">{isNp ? "यो नम्बर सुरक्षित राख्नुहोस्। हाम्रो टोलीले तपाईंलाई प्रक्रिया पूरा गर्न सम्पर्क गर्नेछ।" : "Keep this number safe. Our team will contact you to complete the process."}</p>
          <button onClick={() => (window.location.href = `/${lang}/application-status`)} className="mt-6 rounded-lg bg-primary-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-800">
            {isNp ? "स्थिति जाँच गर्नुहोस्" : "Track Application Status"}
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <UserPlus className="h-7 w-7" /> {isNp ? "खाता खोल्नुहोस्" : "Open an Account"}
          </h1>
          <p className="mt-2 text-primary-100">{isNp ? "केवल केही चरणमा आफ्नो खाता खोल्नुहोस्" : "Open your account in a few simple steps"}</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page">
          <div className="mb-8">
            <Stepper steps={steps} current={step} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border bg-white p-6 shadow-sm md:p-8"
            >
              {step === 0 && (
                <div className="space-y-4">
                  <h2 className="font-heading text-lg font-bold text-gray-900">{isNp ? "तपाईंको पहिचान" : "Your Identity"}</h2>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "पूरा नाम *" : "Full Name *"}</label>
                    <input className={inputCls} value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Ram Bahadur Thapa" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Email *</label>
                      <input type="email" className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "फोन *" : "Phone *"}</label>
                      <input className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="98XXXXXXXX" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "जन्म मिति" : "Date of Birth"}</label>
                      <input type="date" className={inputCls} value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "नागरिकता नम्बर" : "Citizenship No."}</label>
                      <input className={inputCls} value={form.citizenshipNo} onChange={(e) => setForm({ ...form, citizenshipNo: e.target.value })} placeholder="123-45-6789" />
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="font-heading text-lg font-bold text-gray-900">{isNp ? "तपाईंको ठेगाना" : "Your Address"}</h2>
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
                <div className="space-y-4">
                  <h2 className="font-heading text-lg font-bold text-gray-900">{isNp ? "खाता विवरण" : "Account Details"}</h2>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "खाता प्रकार *" : "Account Type *"}</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "savings", en: "Normal Savings", np: "सामान्य बचत" },
                        { id: "fixed", en: "Fixed Deposit", np: "मुद्दती निक्षेप" },
                        { id: "student", en: "Student Savings", np: "विद्यार्थी बचत" },
                        { id: "gold", en: "Gold Savings", np: "गोल्ड बचत" },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setForm({ ...form, accountType: t.id })}
                          className={`rounded-lg border px-4 py-3 text-sm font-medium transition-all ${form.accountType === t.id ? "border-primary-500 bg-primary-50 text-primary-700" : "border-gray-200 text-gray-600 hover:border-primary-300"}`}
                        >
                          {isNp ? t.np : t.en}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "पेशा" : "Occupation"}</label>
                      <input className={inputCls} value={form.occupation} onChange={(e) => setForm({ ...form, occupation: e.target.value })} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "प्रारम्भिक जम्मा (रु.)" : "Initial Deposit (Rs.)"}</label>
                      <input type="number" className={inputCls} value={form.initialDeposit} onChange={(e) => setForm({ ...form, initialDeposit: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "रुचाइएको शाखा" : "Preferred Branch"}</label>
                    <input className={inputCls} value={form.preferredBranch} onChange={(e) => setForm({ ...form, preferredBranch: e.target.value })} placeholder="Kamaladi Head Office" />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-gray-900">
                    <FileText className="h-5 w-5 text-primary-600" /> {isNp ? "कागजातहरू" : "Documents"}
                  </h2>
                  <p className="text-sm text-gray-500">{isNp ? "कृपया नागरिकता र फोटो अपलोड गर्नुहोस्।" : "Please upload your citizenship and photo."}</p>
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 p-10 text-center transition-colors hover:border-primary-400 hover:bg-primary-50/30">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">{file ? file.name : isNp ? "कागजात चयन गर्नुहोस्" : "Choose document"}</span>
                    <span className="text-xs text-gray-400">PDF, JPG, PNG — max 5MB</span>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                  </label>
                  <div className="rounded-lg bg-gray-50 p-4 text-xs text-gray-500">
                    <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-green-600" /> {isNp ? "तपाईंको डाटा सुरक्षित र गोप्य राखिन्छ।" : "Your data is secure and confidential."}</p>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                {step > 0 && step < 4 && (
                  <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>{isNp ? "पछाडि" : "Back"}</Button>
                )}
                {step < 3 ? (
                  <Button onClick={next} className="ml-auto">{isNp ? "अर्को" : "Next"}</Button>
                ) : (
                  <Button onClick={submit} disabled={submitting} className="ml-auto">
                    {submitting ? (isNp ? "पेश गर्दै..." : "Submitting...") : (isNp ? "आवेदन पेश गर्नुहोस्" : "Submit Application")}
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
