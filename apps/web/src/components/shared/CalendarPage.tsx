"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Sun, ShieldAlert, Award, FileSpreadsheet, Sparkles, Clock } from "lucide-react";
import { fetchAPI } from "@/lib/public-api";
import Container from "@/components/ui/Container";

interface CalendarEvent {
  id: number;
  title: string;
  titleNp?: string;
  date: string;
  bsDate?: string;
  type?: "festival" | "holiday" | "nrb" | "agm" | "tax";
  description?: string;
  isHoliday?: boolean;
}

const DEFAULT_EVENTS: CalendarEvent[] = [
  { id: 1, title: "Nepali New Year 2082 (Baisakh 1)", titleNp: "नयाँ वर्ष २०८२ (वैशाख १)", date: "2025-04-14", bsDate: "2082 Baisakh 01", type: "holiday", isHoliday: true, description: "Official National Holiday — All RFIL Branches Closed." },
  { id: 2, title: "Q3 Financial Reporting Deadline", titleNp: "तेस्रो त्रैमासिक वित्तीय विवरण प्रकाशन", date: "2025-04-30", bsDate: "2082 Baisakh 17", type: "nrb", isHoliday: false, description: "Un-audited quarterly financial statements release under NRB directives." },
  { id: 3, title: "Buddha Jayanti", titleNp: "बुद्ध जयन्ती", date: "2025-05-12", bsDate: "2082 Baisakh 29", type: "festival", isHoliday: true, description: "Public Holiday across Nepal." },
  { id: 4, title: "Republic Day (Ganatantra Diwas)", titleNp: "गणतन्त्र दिवस", date: "2025-05-29", bsDate: "2082 Jestha 15", type: "holiday", isHoliday: true, description: "National Holiday." },
  { id: 5, title: "Fiscal Year Ending (Asar 31)", titleNp: "आर्थिक वर्ष समाप्त (असार ३१)", date: "2025-07-16", bsDate: "2082 Asar 31", type: "tax", isHoliday: false, description: "Annual Interest Capitalization and Tax Filing Close." },
  { id: 6, title: "NRB Annual Monetary Policy Announcement", titleNp: "राष्ट्र बैंक मौद्रिक नीति सार्वजनिक", date: "2025-07-25", bsDate: "2082 Shrawan 09", type: "nrb", isHoliday: false, description: "Nepal Rastra Bank publishes policy interest rates and cash reserve requirements." },
  { id: 7, title: "Dashain Festival (Phulpati to Ekadashi)", titleNp: "बडा दशैं बिदा", date: "2025-10-01", bsDate: "2082 Ashwin 15", type: "festival", isHoliday: true, description: "Major Nepalese Festival Holiday — Emergency Online Banking Available 24/7." },
  { id: 8, title: "Tihar & Laxmi Puja Holidays", titleNp: "तिहार तथा लक्ष्मी पूजा बिदा", date: "2025-10-21", bsDate: "2082 Kartik 04", type: "festival", isHoliday: true, description: "Deepawali Festival Holidays." },
  { id: 9, title: "Annual General Meeting (AGM) Notice", titleNp: "वार्षिक साधारण सभा सूचना", date: "2025-11-15", bsDate: "2082 Kartik 29", type: "agm", isHoliday: false, description: "Shareholder assembly for dividend approval and annual audited report." },
];

const TYPE_LABELS: Record<string, { en: string; np: string; icon: any; color: string }> = {
  all: { en: "All Events", np: "सबै कार्यक्रमहरू", icon: CalendarDays, color: "bg-slate-900 text-white" },
  holiday: { en: "Bank Holidays", np: "सार्वजनिक बिदा", icon: Sun, color: "bg-rose-100 text-rose-800 border-rose-200" },
  festival: { en: "Festivals", np: "चाडपर्व", icon: Sparkles, color: "bg-amber-100 text-amber-800 border-amber-200" },
  nrb: { en: "NRB / Compliance", np: "राष्ट्र बैंक / नियमन", icon: ShieldAlert, color: "bg-primary-100 text-primary-800 border-primary-200" },
  tax: { en: "Tax & Quarter Close", np: "कर तथा वित्तीय समापन", icon: FileSpreadsheet, color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  agm: { en: "Shareholder AGM", np: "साधारण सभा", icon: Award, color: "bg-purple-100 text-purple-800 border-purple-200" },
};

export default function CalendarPage({ lang = "en" }: { lang?: string }) {
  const isNp = lang === "np";
  const [events, setEvents] = useState<CalendarEvent[]>(DEFAULT_EVENTS);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchAPI("/api/cms/calendar-events")
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setEvents(data);
      })
      .catch(() => {});
  }, []);

  const filteredEvents = filter === "all" ? events : events.filter((ev) => ev.type === filter);

  return (
    <section className="py-12 bg-slate-50 min-h-[600px]">
      <Container>
        {/* Filter Pills */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {Object.keys(TYPE_LABELS).map((t) => {
            const label = TYPE_LABELS[t];
            const Icon = label.icon;
            const isActive = filter === t;
            return (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all border ${
                  isActive
                    ? "border-primary-600 bg-primary-600 text-white shadow-md shadow-primary-900/20"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label[isNp ? "np" : "en"]}
              </button>
            );
          })}
        </div>

        {/* Event Cards Grid */}
        <div className="mx-auto max-w-4xl space-y-4">
          {filteredEvents.map((ev) => {
            const badgeInfo = TYPE_LABELS[ev.type || "holiday"] || TYPE_LABELS.holiday;
            const BadgeIcon = badgeInfo.icon;
            return (
              <div
                key={ev.id}
                className={`group flex flex-col justify-between rounded-2xl border p-5 transition-all hover:shadow-md md:flex-row md:items-center ${
                  ev.isHoliday ? "border-rose-200/80 bg-rose-50/40" : "border-slate-200/80 bg-white"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 p-3 text-center min-w-[80px]">
                    <span className="font-mono text-xs font-extrabold text-primary-700">{ev.date.split("-")[0]}</span>
                    <span className="font-heading text-lg font-black text-slate-900">{ev.date.split("-")[1]}/{ev.date.split("-")[2]}</span>
                    {ev.bsDate && <span className="mt-1 text-[9px] font-bold text-slate-500">{ev.bsDate}</span>}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-bold ${badgeInfo.color}`}>
                        <BadgeIcon className="h-3 w-3" />
                        {badgeInfo[isNp ? "np" : "en"]}
                      </span>
                      {ev.isHoliday && (
                        <span className="rounded-md bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white">
                          {isNp ? "शाखा बिदा" : "Branches Closed"}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 font-heading text-base font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                      {isNp && ev.titleNp ? ev.titleNp : ev.title}
                    </h3>
                    {ev.description && <p className="mt-1 text-xs text-slate-600 leading-relaxed">{ev.description}</p>}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end border-t border-slate-100 pt-3 md:mt-0 md:border-t-0 md:pt-0">
                  <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-slate-400">
                    <Clock className="h-3.5 w-3.5" /> 2081-2082 BS
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
