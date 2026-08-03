"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Sun } from "lucide-react";
import { fetchAPI } from "@/lib/public-api";

interface CalendarEvent {
  id: number;
  title: string;
  titleNp?: string;
  date: string;
  type?: string;
  description?: string;
  isHoliday?: boolean;
}

const TYPE_LABELS: Record<string, { en: string; np: string }> = {
  all: { en: "All", np: "सबै" },
  festival: { en: "Festival", np: "चाडपर्व" },
  holiday: { en: "Holiday", np: "बिदा" },
  event: { en: "Event", np: "कार्यक्रम" },
  meeting: { en: "Meeting", np: "बैठक" },
};

export default function CalendarPage({ lang = "en" }: { lang?: string }) {
  const isNp = lang === "np";
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchAPI("/api/cms/calendar-events")
      .then(setEvents)
      .catch(() => {});
  }, []);

  const filteredEvents = filter === "all" ? events : events.filter((ev) => ev.type === filter);

  return (
    <section className="py-10">
      <div className="container-page max-w-4xl">
        <div className="mb-6 flex flex-wrap gap-2">
          {["all", "festival", "holiday", "event", "meeting"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                filter === t ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {TYPE_LABELS[t][isNp ? "np" : "en"]}
            </button>
          ))}
        </div>

        {filteredEvents.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed p-12 text-center text-gray-500">
            <CalendarDays className="mx-auto mb-2 h-10 w-10 text-gray-300" />
            <p className="text-lg font-medium">{isNp ? "कुनै कार्यक्रम फेला परेन" : "No events found"}</p>
            <p className="mt-1 text-sm">{isNp ? "आगामी कार्यक्रमहरूको लागि पछि जाँच गर्नुहोस्।" : "Check back later for upcoming events."}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(
              filteredEvents.reduce<Record<string, CalendarEvent[]>>((acc, ev) => {
                const m = ev.date?.slice(0, 7) || "unknown";
                if (!acc[m]) acc[m] = [];
                acc[m].push(ev);
                return acc;
              }, {})
            )
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([month, evts]) => (
                <div key={month}>
                  <h2 className="mb-4 text-xl font-bold text-gray-900">{month}</h2>
                  <div className="space-y-3">
                    {evts.map((ev) => (
                      <div
                        key={ev.id}
                        className={`rounded-xl border p-4 shadow-sm ${
                          ev.isHoliday ? "border-red-200 bg-red-50" : "bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{ev.date}</p>
                            <h3 className="mt-1 font-semibold text-gray-900">
                              {isNp && ev.titleNp ? ev.titleNp : ev.title}
                            </h3>
                            {ev.description && <p className="mt-1 text-sm text-gray-600">{ev.description}</p>}
                          </div>
                          <div className="flex items-center gap-1.5">
                            {ev.isHoliday && (
                              <span className="flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
                                <Sun className="h-3 w-3" /> {isNp ? "बिदा" : "Holiday"}
                              </span>
                            )}
                            {ev.type && ev.type !== "holiday" && (
                              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium capitalize text-blue-700">
                                {TYPE_LABELS[ev.type]?.[isNp ? "np" : "en"] || ev.type}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
