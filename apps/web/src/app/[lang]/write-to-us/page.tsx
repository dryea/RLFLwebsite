"use client";

import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { API } from "@/lib/api";
import { Mail, Send } from "lucide-react";

export default function WriteToUsPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${API}/api/cms/contact-submissions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, type: "grievance" }),
        }
      );
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", subject: "", message: "" });
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <Mail className="h-7 w-7" /> {isNp ? "हामीलाई लेख्नुहोस्" : "Write to Us"}
          </h1>
          <p className="mt-2 text-primary-100">
            {isNp ? "तपाईंको गुनासो वा प्रश्न पठाउनुहोस्" : "Submit your grievance or inquiry"}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page max-w-2xl">
          {submitted ? (
            <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {isNp ? "धन्यवाद!" : "Thank you!"}
              </h2>
              <p className="mt-2 text-gray-600">
                {isNp
                  ? "तपाईंको सन्देश प्राप्त भयो। हामी छिट्टै सम्पर्क गर्नेछौं।"
                  : "Your message has been received. We will get back to you shortly."}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-lg bg-primary-700 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
              >
                {isNp ? "अर्को सन्देश पठाउनुहोस्" : "Send Another Message"}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5 rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">
                {isNp ? "गुनासो / प्रश्न फारम" : "Grievance / Inquiry Form"}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "नाम *" : "Name *"}</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border px-4 py-2 text-sm outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border px-4 py-2 text-sm outline-none focus:border-primary-500"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "विषय *" : "Subject *"}</label>
                <input
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full rounded-lg border px-4 py-2 text-sm outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "सन्देश *" : "Message *"}</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-lg border px-4 py-2 text-sm outline-none focus:border-primary-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-800 disabled:opacity-60"
              >
                <Send className="h-4 w-4" /> {loading ? (isNp ? "पठाउँदै..." : "Sending...") : (isNp ? "पठाउनुहोस्" : "Submit")}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
