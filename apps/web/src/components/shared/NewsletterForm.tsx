"use client";
import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { Mail } from "lucide-react";
import { API } from "@/lib/api";

export default function NewsletterForm() {
  const lang = useLang();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${API}/api/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
        {lang === "en" ? "Newsletter" : "समाचार पत्र"}
      </h3>
      {status === "success" ? (
        <p className="text-sm text-green-400">
          {lang === "en" ? "Subscribed successfully!" : "सफलतापूर्वक सदस्यता लिनुभयो!"}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={lang === "en" ? "Your email" : "तपाईंको इमेल"}
              className="w-full rounded-lg bg-gray-800 py-2 pl-9 pr-3 text-sm text-white outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-800 disabled:opacity-60"
          >
            {status === "loading" ? "..." : lang === "en" ? "Subscribe" : "सदस्यता"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="mt-1 text-xs text-red-400">
          {lang === "en" ? "Something went wrong." : "केही गलत भयो।"}
        </p>
      )}
    </div>
  );
}
