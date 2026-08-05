"use client";

import { useEffect, useState } from "react";
import { CalendarClock, Phone, Building2, CheckCircle2 } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { getBranches } from "@/lib/public-api";
import { API } from "@/lib/api";
import { trackEvent } from "@/components/shared/Analytics";

export default function AppointmentPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [branches, setBranches] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", meetingType: "in-person", branch: "", service: "", reason: "", preferredDate: "", preferredTime: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBranches().then((b: any[]) => setBranches(b || [])).catch(() => {});
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      trackEvent("conversion", "appointment_booking");
    } catch {
      alert(isNp ? "पेश गर्न सकिएन। फेरि प्रयास गर्नुहोस्।" : "Submission failed. Try again.");
    }
    setLoading(false);
  }

  const inputCls = "w-full rounded-lg border px-4 py-2 text-sm outline-none focus:border-primary-500";

  if (submitted) {
    return (
      <section className="flex flex-1 items-center justify-center py-20">
        <div className="text-center">
          <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
          <h2 className="text-2xl font-bold text-gray-900">{isNp ? "भेटघाट बुक भयो" : "Appointment Booked"}</h2>
          <p className="mt-2 text-gray-600">{isNp ? "हामी चाँडै पुष्टि गर्न सम्पर्क गर्नेछौं।" : "We will contact you shortly to confirm."}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <CalendarClock className="h-7 w-7" /> {isNp ? "भेटघाट बुक गर्नुहोस्" : "Book an Appointment"}
          </h1>
          <p className="mt-2 text-primary-100">{isNp ? "हाम्रो शाखामा वा फोनमा भेटघाट तय गर्नुहोस्" : "Schedule a meeting at our branch or by phone"}</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page">
          <form onSubmit={submit} className="space-y-5 rounded-2xl border bg-white p-6 shadow-sm md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "पूरा नाम *" : "Full Name *"}</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Email *</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "फोन *" : "Phone *"}</label>
                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "भेटघाट तरिका" : "Meeting Type"}</label>
                <select value={form.meetingType} onChange={(e) => setForm({ ...form, meetingType: e.target.value })} className={inputCls}>
                  <option value="in-person">{isNp ? "प्रत्यक्ष" : "In Person"}</option>
                  <option value="by-phone">{isNp ? "फोनबाट" : "By Phone"}</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "रुचाइएको शाखा" : "Preferred Branch"}</label>
                <select value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} className={inputCls}>
                  <option value="">{isNp ? "छान्नुहोस्..." : "Select..."}</option>
                  {branches.map((b) => <option key={b.id} value={b.name}>{b.name}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "सेवा" : "Service"}</label>
                <input value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} placeholder={isNp ? "जस्तै: खाता खोल्ने" : "e.g. Account Opening"} className={inputCls} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "मिति" : "Date"}</label>
                <input type="date" value={form.preferredDate} onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "समय" : "Time"}</label>
                <input type="time" value={form.preferredTime} onChange={(e) => setForm({ ...form, preferredTime: e.target.value })} className={inputCls} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "कारण" : "Reason"}</label>
              <textarea rows={3} value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} className={inputCls} />
            </div>
            <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-800 disabled:opacity-60">
              <CalendarClock className="h-4 w-4" /> {loading ? (isNp ? "पेश गर्दै..." : "Submitting...") : (isNp ? "भेटघाट बुक गर्नुहोस्" : "Book Appointment")}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
