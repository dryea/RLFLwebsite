"use client";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "https://rfil-api.sudeepdhakal.workers.dev";

export default function GrievanceForm({ lang }: { lang: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "grievance" }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-700">
        {lang === "en" ? "Your complaint has been submitted successfully. We will contact you within 3 working days." : "तपाईंको उजुरी सफलतापूर्वक पेश गरिएको छ। हामी ३ कार्य दिनभित्र तपाईंलाई सम्पर्क गर्नेछौं।"}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {lang === "en" ? "Full Name" : "पूरा नाम"} *
          </label>
          <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {lang === "en" ? "Email" : "इमेल"} *
          </label>
          <input type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {lang === "en" ? "Phone" : "फोन"}
          </label>
          <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {lang === "en" ? "Subject" : "विषय"} *
          </label>
          <input required value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {lang === "en" ? "Message" : "सन्देश"} *
        </label>
        <textarea required rows={4} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500" />
      </div>
      <button type="submit" disabled={status === "loading"}
        className="rounded-lg bg-primary-700 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-800 disabled:opacity-60">
        {status === "loading" ? "..." : lang === "en" ? "Submit Complaint" : "उजुरी पेश गर्नुहोस्"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">
          {lang === "en" ? "Something went wrong. Please try again." : "केही गलत भयो। कृपया पुनः प्रयास गर्नुहोस्।"}
        </p>
      )}
    </form>
  );
}
