"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, ExternalLink } from "lucide-react";
import { API } from "@/lib/api";

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  publishedDate: string;
  imageUrl?: string;
}

export default function NewsEventsSection({ lang }: { lang: string }) {
  const [tab, setTab] = useState<"news" | "events">("news");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [newsRes, eventsRes] = await Promise.all([
          fetch(`${API}/api/news`).then((r) => r.json()),
          fetch(`${API}/api/events`).then((r) => r.json()),
        ]);
        setNews((newsRes.data || newsRes).slice(0, 4));
        setEvents((eventsRes.data || eventsRes).slice(0, 4));
      } catch {
        setNews([]);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const items = tab === "news" ? news : events;

  const defaultNews: NewsItem[] = [
    { id: 1, title: "Reliance Finance announces Q3 financial results with strong growth", slug: "q3-results", publishedDate: "2025-03-15", imageUrl: "" },
    { id: 2, title: "New branch inaugurated in Pokhara to expand service network", slug: "pokhara-branch", publishedDate: "2025-02-28", imageUrl: "" },
    { id: 3, title: "Reliance Finance launches enhanced mobile banking platform", slug: "mobile-banking-update", publishedDate: "2025-02-10", imageUrl: "" },
    { id: 4, title: "Financial literacy program reaches 5,000 students across Nepal", slug: "financial-literacy", publishedDate: "2025-01-20", imageUrl: "" },
  ];

  const defaultEvents: NewsItem[] = [
    { id: 1, title: "26th Annual General Meeting of Reliance Finance Limited", slug: "agm-2025", publishedDate: "2025-04-20", imageUrl: "" },
    { id: 2, title: "Free Health Camp organized in Bardiya district", slug: "health-camp-bardiya", publishedDate: "2025-03-25", imageUrl: "" },
    { id: 3, title: "Employee training workshop on digital banking services", slug: "digital-training", publishedDate: "2025-03-05", imageUrl: "" },
    { id: 4, title: "Tree plantation drive for environmental sustainability", slug: "tree-plantation", publishedDate: "2025-02-15", imageUrl: "" },
  ];

  const displayItems = items.length ? items : (tab === "news" ? defaultNews : defaultEvents);

  return (
    <div>
      <div className="mb-8 flex justify-center gap-2">
        <button
          onClick={() => setTab("news")}
          className={`rounded-lg px-6 py-2.5 font-heading font-semibold transition-all ${tab === "news" ? "bg-primary-500 text-white shadow-md" : "bg-white text-gray-600 hover:bg-primary-50"}`}
        >
          {lang === "en" ? "Latest News" : "पछिल्लो समाचार"}
        </button>
        <button
          onClick={() => setTab("events")}
          className={`rounded-lg px-6 py-2.5 font-heading font-semibold transition-all ${tab === "events" ? "bg-primary-500 text-white shadow-md" : "bg-white text-gray-600 hover:bg-primary-50"}`}
        >
          {lang === "en" ? "Events" : "कार्यक्रमहरू"}
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {displayItems.map((item) => (
          <Link
            key={item.id}
            href={`/${lang}/${tab}/${item.slug}`}
            className="group relative overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              className="flex h-44 items-end bg-gradient-to-t from-primary-900/80 via-primary-900/40 to-primary-700/20 bg-cover bg-center"
              style={{
                backgroundImage: item.imageUrl
                  ? `url(${item.imageUrl})`
                  : `linear-gradient(135deg, #702B86 0%, #5a226b 100%)`,
              }}
            >
              <div className="p-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  <Calendar className="h-3 w-3" />
                  {item.publishedDate}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="mb-2 line-clamp-2 font-heading font-bold text-gray-900 transition-colors group-hover:text-primary-700">
                {item.title}
              </h3>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-700 group-hover:text-secondary-600">
                {lang === "en" ? "Read More" : "थप पढ्नुहोस्"}
                <ExternalLink className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
