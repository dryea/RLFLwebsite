"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API } from "@/lib/api";
import StaggerChildren, { StaggerItem } from "@/components/motion/StaggerChildren";

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  publishedDate: string;
  imageUrl?: string;
}

const defaultNews: NewsItem[] = [
  { id: 1, title: "Reliance Finance announces strong Q3 financial results with double-digit growth", slug: "q3-results", publishedDate: "2025-03-15" },
  { id: 2, title: "New branch inaugurated in Pokhara to expand service network across Gandaki Province", slug: "pokhara-branch", publishedDate: "2025-02-28" },
  { id: 3, title: "Reliance Finance launches enhanced mobile banking platform with new features", slug: "mobile-banking-update", publishedDate: "2025-02-10" },
  { id: 4, title: "Financial literacy program reaches 5,000 students across Nepal", slug: "financial-literacy", publishedDate: "2025-01-20" },
];

const defaultEvents: NewsItem[] = [
  { id: 1, title: "26th Annual General Meeting of Reliance Finance Limited", slug: "agm-2025", publishedDate: "2025-04-20" },
  { id: 2, title: "Free Health Camp organized in Bardiya district in collaboration with Red Cross", slug: "health-camp-bardiya", publishedDate: "2025-03-25" },
  { id: 3, title: "Employee training workshop on digital banking services and compliance", slug: "digital-training", publishedDate: "2025-03-05" },
  { id: 4, title: "Tree plantation drive for environmental sustainability across 5 districts", slug: "tree-plantation", publishedDate: "2025-02-15" },
];

export default function NewsEventsSection({ lang }: { lang: string }) {
  const [tab, setTab] = useState<"news" | "events">("news");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const isNp = lang === "np";

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

  const liveItems = tab === "news" ? news : events;
  const displayItems = liveItems.length ? liveItems : (tab === "news" ? defaultNews : defaultEvents);

  return (
    <div>
      {/* Section header with integrated tab toggle */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="mb-1 block text-xs font-bold uppercase tracking-[0.12em] text-secondary-600">
            {isNp ? "अपडेटहरू" : "Stay Updated"}
          </span>
          <h2 className="text-3xl font-bold text-primary-800 md:text-4xl">
            {isNp ? "पछिल्लो हाइलाइट्स" : "Latest Highlights"}
          </h2>
        </div>
        {/* Tab toggle — acts as section navigation */}
        <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
          <button
            onClick={() => setTab("news")}
            className={`px-5 py-2.5 text-sm font-semibold transition-all ${
              tab === "news"
                ? "bg-primary-500 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {isNp ? "समाचार" : "News"}
          </button>
          <button
            onClick={() => setTab("events")}
            className={`px-5 py-2.5 text-sm font-semibold transition-all ${
              tab === "events"
                ? "bg-primary-500 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {isNp ? "कार्यक्रमहरू" : "Events"}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <StaggerChildren className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {displayItems.map((item) => (
              <StaggerItem key={item.id} className="h-full">
                <Link
                  href={`/${lang}/${tab}/${item.slug}`}
                  className="group relative block h-full overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
                >
                  <div
                    className="flex h-44 items-end bg-cover bg-center"
                    style={{
                      backgroundImage: item.imageUrl
                        ? `url(${item.imageUrl})`
                        : `linear-gradient(135deg, #702B86 0%, #5a226b 100%)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="relative p-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                        <Calendar className="h-3 w-3" />
                        {item.publishedDate}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-3 line-clamp-2 font-heading text-sm font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary-700">
                      {item.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 transition-colors group-hover:text-secondary-600">
                      {isNp ? "थप पढ्नुहोस्" : "Read More"}
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
