"use client";

import { useState } from "react";
import { BellRing, CheckCircle2 } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { API } from "@/lib/api";

const CATEGORIES = [
  { id: "notices", en: "Notices", np: "सूचना" },
  { id: "news", en: "News", np: "समाचार" },
  { id: "events", en: "Events", np: "कार्यक्रम" },
  { id: "rates", en: "Rate Updates", np: "दर अपडेट" },
];

export default function NoticeSubscribe() {
  const lang = useLang();
  const isNp = lang === "np";
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<string[]>(["notices"]);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  function toggle(cat: string) {
    setSelected((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  }

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    setError(false);
    try {
      const res = await fetch(`${API}/api/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, language: lang === "np" ? "np" : "en", preferences: selected }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setError(true);
    }
  }

  if (done) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
        <CheckCircle2 className="h-5 w-5 shrink-0" />
        {isNp ? "तपाईंलाई सूचना अपडेटहरूको लागि सदस्यता दिइयो।" : "You're subscribed. Watch your inbox for updates."}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-primary-100 bg-primary-50/50 p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
          <BellRing className="h-5 w-5" />
        </span>
        <div>
          <p className="font-semibold text-gray-900">{isNp ? "सूचना अपडेटहरू प्राप्त गर्नुहोस्" : "Get notified of updates"}</p>
          <p className="text-xs text-gray-500">{isNp ? "रुचि अनुसार श्रेणीहरू छान्नुहोस्।" : "Choose the categories you care about."}</p>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => toggle(c.id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              selected.includes(c.id) ? "border-primary-500 bg-primary-700 text-white" : "border-gray-200 bg-white text-gray-600 hover:border-primary-300"
            }`}
          >
            {isNp ? c.np : c.en}
          </button>
        ))}
      </div>

      <form onSubmit={subscribe} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={isNp ? "तपाईंको इमेल" : "Your email"}
          className="w-full flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary-500"
        />
        <button type="submit" className="shrink-0 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800">
          {isNp ? "सदस्यता" : "Subscribe"}
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-red-600">{isNp ? "केही गलत भयो।" : "Something went wrong."}</p>}
    </div>
  );
}
