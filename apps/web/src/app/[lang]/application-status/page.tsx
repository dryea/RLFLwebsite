"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, Clock, FileText, UserCheck, Landmark, XCircle } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { API } from "@/lib/api";
import Button from "@/components/ui/Button";

export default function ApplicationStatusPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [ref, setRef] = useState("");
  const [type, setType] = useState("account");
  const [result, setResult] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const statusMeta: Record<string, { en: string; np: string; icon: any; color: string }> = {
    submitted: { en: "Submitted", np: "पेश गरियो", icon: Clock, color: "text-blue-600 bg-blue-50" },
    under_review: { en: "Under Review", np: "समीक्षामा", icon: FileText, color: "text-amber-600 bg-amber-50" },
    verified: { en: "Documents Verified", np: "कागजात प्रमाणित", icon: UserCheck, color: "text-purple-600 bg-purple-50" },
    approved: { en: "Approved", np: "स्वीकृत", icon: CheckCircle2, color: "text-green-600 bg-green-50" },
    processing: { en: "Processing", np: "प्रशोधन", icon: Landmark, color: "text-blue-600 bg-blue-50" },
    rejected: { en: "Rejected", np: "अस्वीकृत", icon: XCircle, color: "text-red-600 bg-red-50" },
  };

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    if (!ref.trim()) return;
    setLoading(true);
    setNotFound(false);
    setResult(null);
    try {
      const res = await fetch(`${API}/api/applications/status?ref=${encodeURIComponent(ref)}&type=${type}`);
      if (res.ok) setResult(await res.json());
      else setNotFound(true);
    } catch {
      setNotFound(true);
    }
    setLoading(false);
  }

  const inputCls = "w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20";

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <Search className="h-7 w-7" /> {isNp ? "आवेदन स्थिति" : "Application Status"}
          </h1>
          <p className="mt-2 text-primary-100">{isNp ? "आफ्नो सन्दर्भ नम्बरले स्थिति जाँच गर्नुहोस्" : "Track your application with your reference number"}</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page">
          <form onSubmit={lookup} className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">
            <div className="mb-4 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setType("account")} className={`rounded-lg border px-4 py-2.5 text-sm font-medium ${type === "account" ? "border-primary-500 bg-primary-50 text-primary-700" : "border-gray-200 text-gray-600"}`}>
                {isNp ? "खाता" : "Account"}
              </button>
              <button type="button" onClick={() => setType("loan")} className={`rounded-lg border px-4 py-2.5 text-sm font-medium ${type === "loan" ? "border-primary-500 bg-primary-50 text-primary-700" : "border-gray-200 text-gray-600"}`}>
                {isNp ? "ऋण" : "Loan"}
              </button>
            </div>
            <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "सन्दर्भ नम्बर" : "Reference Number"}</label>
            <div className="flex gap-2">
              <input className={inputCls} value={ref} onChange={(e) => setRef(e.target.value)} placeholder="ACC-XXXXX or LON-XXXXX" />
              <Button type="submit" disabled={loading}>{loading ? "..." : isNp ? "जाँच गर्नुहोस्" : "Check"}</Button>
            </div>
          </form>

          <AnimatePresence>
            {notFound && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                <XCircle className="mx-auto mb-2 h-10 w-10 text-red-500" />
                <p className="font-semibold text-red-700">{isNp ? "आवेदन फेला परेन" : "Application not found"}</p>
                <p className="mt-1 text-sm text-red-600">{isNp ? "सन्दर्भ नम्बर जाँच गर्नुहोस्।" : "Please check your reference number."}</p>
              </motion.div>
            )}

            {result && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-lg font-bold text-primary-700">{result.referenceNo}</p>
                    <p className="text-sm text-gray-500">
                      {result.loanType ? (isNp ? `ऋण: ${result.loanType}` : `Loan: ${result.loanType}`) : result.accountType ? (isNp ? `खाता: ${result.accountType}` : `Account: ${result.accountType}`) : ""}
                    </p>
                  </div>
                  {(() => {
                    const meta = statusMeta[result.status] || statusMeta.submitted;
                    const Icon = meta.icon;
                    return (
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${meta.color}`}>
                        <Icon className="h-4 w-4" /> {isNp ? meta.np : meta.en}
                      </span>
                    );
                  })()}
                </div>

                {result.timeline && result.timeline.length > 0 && (
                  <div className="mt-6 space-y-0">
                    {result.timeline.map((t: any, i: number) => {
                      const meta = statusMeta[t.status] || statusMeta.submitted;
                      const Icon = meta.icon;
                      return (
                        <div key={i} className="relative flex gap-3 pb-6 last:pb-0">
                          {i < result.timeline.length - 1 && <div className="absolute left-[13px] top-7 h-full w-0.5 bg-gray-200" />}
                          <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${meta.color}`}>
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{isNp ? meta.np : meta.en}</p>
                            {t.note && <p className="text-xs text-gray-500">{t.note}</p>}
                            <p className="text-xs text-gray-400">{new Date(t.date).toLocaleString()}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
