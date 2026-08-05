"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCareers } from "@/lib/public-api";
import { API } from "@/lib/api";
import { useLang } from "@/contexts/LanguageContext";
import AddressFields from "@/components/shared/AddressFields";

export default function ApplyPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", province: "", district: "", localBody: "", coverLetter: "" });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getCareers().then((jobs: any[]) => {
      const found = jobs.find((j: any) => String(j.id) === id);
      if (found) setJob(found);
    }).catch(() => {});
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("jobId", id);
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("address", form.address);
      fd.append("province", form.province);
      fd.append("district", form.district);
      fd.append("localBody", form.localBody);
      fd.append("coverLetter", form.coverLetter);
      if (file) fd.append("cv", file);
      await fetch(`${API}/api/careers/apply`, {
        method: "POST",
        body: fd,
      });
      setSubmitted(true);
    } catch {
      alert(isNp ? "आवेदन पेश गर्न सकिएन। फेरि प्रयास गर्नुहोस्।" : "Failed to submit application. Try again.");
    }
    setLoading(false);
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{isNp ? "आवेदन" : "Apply"}</h1>
          <p className="mt-2 text-primary-100">{isNp ? "आफ्नो आवेदन पेश गर्नुहोस्" : "Submit your application"}</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page">
          <a href={`/${lang}/careers`} className="mb-6 inline-flex items-center gap-1 text-sm text-gray-600 hover:text-primary-700">
            <ArrowLeft className="h-4 w-4" /> {isNp ? "करियरमा फर्कनुहोस्" : "Back to Careers"}
          </a>

          {!job ? (
            <div className="rounded-lg border-2 border-dashed p-12 text-center text-gray-500">
              <p className="text-lg font-medium">{isNp ? "जागिर फेला परेन" : "Job not found"}</p>
            </div>
          ) : submitted ? (
            <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">✓</div>
              <h2 className="text-xl font-bold text-gray-900">{isNp ? "आवेदन पेश भयो!" : "Application Submitted!"}</h2>
              <p className="mt-2 text-gray-600">{isNp ? "हामी तपाईंको आवेदन समीक्षा गरी सम्पर्क गर्नेछौं।" : "We'll review your application and get back to you."}</p>
            </div>
          ) : (
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-6 border-b pb-4">
                <h2 className="text-xl font-bold text-gray-900">{isNp && job.titleNp ? job.titleNp : job.title}</h2>
                <p className="mt-1 text-sm text-gray-500">
                  {[job.department, job.location, job.type].filter(Boolean).join(" · ")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "पूरा नाम *" : "Full Name *"}</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Email *</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "फोन *" : "Phone *"}</label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "ठेगाना" : "Address"}</label>
                  <AddressFields
                    value={{ province: form.province, district: form.district, localBody: form.localBody, address: form.address }}
                    onChange={(v) => setForm((prev) => ({ ...prev, province: v.province, district: v.district, localBody: v.localBody, address: v.address }))}
                    lang={lang}
                    showAddress
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "सीभी / रिजुमे *" : "CV / Resume *"}</label>
                  <input type="file" required accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full rounded-lg border px-4 py-2 text-sm outline-none file:mr-3 file:rounded file:border-0 file:bg-primary-50 file:px-3 file:py-1 file:text-sm file:font-medium file:text-primary-700 focus:border-primary-500" />
                  <p className="mt-1 text-xs text-gray-400">PDF {isNp ? "वा" : "or"} Word {isNp ? "कागजात" : "document"}</p>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "कभर लेटर" : "Cover Letter"}</label>
                  <textarea rows={5} value={form.coverLetter} onChange={(e) => setForm({ ...form, coverLetter: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
                </div>
                <button type="submit" disabled={loading} className="w-full rounded-lg bg-primary-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-800 disabled:opacity-60">
                  {loading ? (isNp ? "पेश गर्दै..." : "Submitting...") : (isNp ? "आवेदन पेश गर्नुहोस्" : "Submit Application")}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
