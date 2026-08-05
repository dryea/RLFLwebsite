"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import { getEvents } from "@/lib/public-api";
import { useLang } from "@/contexts/LanguageContext";

export default function EventsListPage() {
  const lang = useLang();
  const [events, setEvents] = useState<any[]>([]);
  useEffect(() => { getEvents().then(setEvents).catch(() => {}); }, []);

  const now = new Date();
  const upcoming = events.filter((e: any) => !e.eventDate || new Date(e.eventDate) >= now);
  const past = events.filter((e: any) => e.eventDate && new Date(e.eventDate) < now);

  const formatDate = (d: string) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString(lang === "en" ? "en-US" : "ne-NP", {
      year: "numeric", month: "long", day: "numeric",
    });
  };

  const EventCard = ({ event }: { event: any }) => (
    <div className="rounded-xl border p-5 transition-shadow hover:shadow-md">
      {event.coverImage && (
        <div className="mb-4 h-40 w-full overflow-hidden rounded-lg">
          <img src={event.coverImage} alt={`${event.title} — Reliance Finance Limited event`} width={400} height={225} className="h-full w-full object-cover" loading="lazy" />
        </div>
      )}
      <h3 className="font-semibold text-gray-900">{event.title}</h3>
      {event.summary && <p className="mt-1 text-sm text-gray-600 line-clamp-2">{event.summary}</p>}
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
        {event.eventDate && <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {formatDate(event.eventDate)}</span>}
        {event.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {event.location}</span>}
        {event.time && <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {event.time}</span>}
      </div>
    </div>
  );

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 py-14 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{lang === "en" ? "Events" : "कार्यक्रमहरू"}</h1>
          <p className="mt-2 text-primary-100">{lang === "en" ? "Upcoming events and programs" : "आगामी कार्यक्रम र कार्यक्रमहरू"}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          {events.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed p-12 text-center text-gray-500">
              <Calendar className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="text-lg font-medium">{lang === "en" ? "No events scheduled" : "कुनै कार्यक्रम तय गरिएको छैन"}</p>
            </div>
          ) : (
            <>
              {upcoming.length > 0 && (
                <>
                  <h2 className="mb-4 text-xl font-bold text-gray-900">{lang === "en" ? "Upcoming Events" : "आगामी कार्यक्रमहरू"}</h2>
                  <div className="mb-12 grid gap-6 md:grid-cols-2">
                    {upcoming.map((event: any) => <EventCard key={event.id || event.slug} event={event} />)}
                  </div>
                </>
              )}
              {past.length > 0 && (
                <>
                  <h2 className="mb-4 text-xl font-bold text-gray-900">{lang === "en" ? "Past Events" : "विगतका कार्यक्रमहरू"}</h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {past.map((event: any) => <EventCard key={event.id || event.slug} event={event} />)}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
