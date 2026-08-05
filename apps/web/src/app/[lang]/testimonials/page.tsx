"use client";

import { useEffect, useState } from "react";
import { Star, Quote, Send } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { API } from "@/lib/api";

export default function TestimonialsPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [reviews, setReviews] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", email: "", rating: 5, review: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/reviews`)
      .then((r) => r.json())
      .then((j) => setReviews(Array.isArray(j) ? j : []))
      .catch(() => {});
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.review.trim()) return;
    const res = await fetch(`${API}/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setSubmitted(true);
      setForm({ name: "", email: "", rating: 5, review: "" });
    }
  }

  const avg = reviews.length ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : "0";

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <Quote className="h-7 w-7" /> {isNp ? "ग्राहक अनुभव" : "Customer Testimonials"}
          </h1>
          <p className="mt-2 text-primary-100">{isNp ? "हाम्रा ग्राहकहरूको अनुभव" : "What our customers say about us"}</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page">
          {/* Rating summary */}
          {reviews.length > 0 && (
            <div className="mb-8 flex items-center gap-4 rounded-2xl border bg-white p-6 shadow-sm">
              <span className="text-4xl font-bold text-gray-900">{avg}</span>
              <div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className={`h-5 w-5 ${i <= Math.round(parseFloat(avg)) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                  ))}
                </div>
                <p className="mt-1 text-sm text-gray-500">{reviews.length} {isNp ? "समीक्षाहरू" : "reviews"}</p>
              </div>
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Reviews grid */}
            <div className="space-y-4">
              {reviews.length === 0 && (
                <div className="rounded-2xl border-2 border-dashed p-12 text-center text-gray-500">
                  <p className="text-lg font-medium">{isNp ? "अहिले सम्म कुनै समीक्षा छैन" : "No reviews yet — be the first!"}</p>
                </div>
              )}
              {reviews.map((r) => (
                <div key={r.id} className="rounded-2xl border bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{r.name}</span>
                    <span className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className={`h-4 w-4 ${i <= r.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                      ))}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{r.review}</p>
                  <p className="mt-2 text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString(isNp ? "ne-NP" : "en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                </div>
              ))}
            </div>

            {/* Write review form */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-900">{isNp ? "समीक्षा लेख्नुहोस्" : "Write a Review"}</h2>
              {submitted && (
                <div className="mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-700">
                  {isNp ? "धन्यवाद! तपाईंको समीक्षा मध्यस्थता पछि प्रकाशित हुनेछ।" : "Thank you! Your review will be published after moderation."}
                </div>
              )}
              <form onSubmit={submit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "पूरा नाम *" : "Full Name *"}</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border px-4 py-2 text-sm outline-none focus:border-primary-500" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border px-4 py-2 text-sm outline-none focus:border-primary-500" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "रेटिङ" : "Rating"}</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <button key={i} type="button" onClick={() => setForm({ ...form, rating: i })}>
                        <Star className={`h-7 w-7 transition-colors ${i <= form.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "समीक्षा *" : "Your Review *"}</label>
                  <textarea required rows={4} value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} className="w-full rounded-lg border px-4 py-2 text-sm outline-none focus:border-primary-500" />
                </div>
                <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-800">
                  <Send className="h-4 w-4" /> {isNp ? "समीक्षा पेश गर्नुहोस्" : "Submit Review"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
