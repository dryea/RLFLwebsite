"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { API } from "@/lib/api";
import { trackEvent } from "@/components/shared/Analytics";
import { useToast } from "@/components/ui/Toast";
import SuccessCheck from "@/components/ui/SuccessCheck";

export default function LangContactClient() {
  const lang = useLang();
  const isNp = lang === "np";
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${API}/api/cms/contact-submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
      trackEvent("conversion", "contact_form");
    } catch { toast("error", isNp ? "पठाउन सकिएन। फेरि प्रयास गर्नुहोस्।" : "Failed to send. Try again."); }
    setLoading(false);
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{isNp ? "सम्पर्क गर्नुहोस्" : "Contact Us"}</h1>
          <p className="mt-2 text-primary-100">{isNp ? "रिलायन्स फाइनान्ससँग सम्पर्क गर्नुहोस्" : "Get in touch with Reliance Finance"}</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6">
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">{isNp ? "हाम्रो कार्यालय" : "Our Office"}</h2>
                <div className="space-y-4 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" />
                    <span>{isNp ? "रिलायन्स भवन, कमलादी, काठमाडौं, नेपाल" : "Reliance Bhawan, Kamaladi, Kathmandu, Nepal"}</span>
                  </div>
                  <a href="tel:+977015361104" className="flex items-center gap-3 transition-colors hover:text-primary-700">
                    <Phone className="h-5 w-5 shrink-0 text-primary-700" /> +977–01–5361104
                  </a>
                  <a href="mailto:info@reliancenepal.com.np" className="flex items-center gap-3 transition-colors hover:text-primary-700">
                    <Mail className="h-5 w-5 shrink-0 text-primary-700" /> info@reliancenepal.com.np
                  </a>
                </div>
              </div>
              <div className="h-64 overflow-hidden rounded-xl">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4!2d85.3!3d27.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQyJzAwLjAiTiA4NcKwMTgnMDAuMCJF!5e0!3m2!1sen!2snp!4v1" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title={isNp ? "रिलायन्स फाइनान्स नक्सा" : "Reliance Finance map"} />
              </div>
            </div>

            <div className="lg:col-span-2">
              {submitted ? (
                <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
                  <SuccessCheck size={64} />
                  <h2 className="text-xl font-bold text-gray-900">{isNp ? "सन्देश पठाइयो!" : "Message Sent!"}</h2>
                  <p className="mt-2 text-gray-600">{isNp ? "हामी चाँडै सम्पर्क गर्नेछौं।" : "We'll get back to you soon."}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900">{isNp ? "सन्देश पठाउनुहोस्" : "Send a Message"}</h2>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "नाम *" : "Name *"}</label>
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Email *</label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "फोन" : "Phone"}</label>
                      <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "विषय *" : "Subject *"}</label>
                      <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "सन्देश *" : "Message *"}</label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
                  </div>
                  <button type="submit" disabled={loading} className="w-full rounded-lg bg-primary-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-800 disabled:opacity-60">
                    {loading ? (isNp ? "पठाउँदै..." : "Sending...") : (isNp ? "सन्देश पठाउनुहोस्" : "Send Message")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
