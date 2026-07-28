"use client";

import { useState } from "react";
import { Search, FileText, Package, Newspaper } from "lucide-react";
import Link from "next/link";
import PublicLayout from "@/components/layout/PublicLayout";
import { search } from "@/lib/public-api";

const typeIcons: Record<string, any> = { page: FileText, product: Package, news: Newspaper };

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    const data = await search(query);
    setResults(data);
    setSearched(true);
  }

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page"><h1 className="text-3xl font-bold">Search</h1></div>
      </section>
      <section className="py-12">
        <div className="container-page max-w-3xl">
          <form onSubmit={handleSubmit} className="relative mb-8">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search pages, products, news..." className="w-full rounded-xl border bg-white py-4 pl-12 pr-4 text-lg shadow-sm outline-none focus:border-primary-500" />
          </form>
          {searched && (
            <p className="mb-4 text-sm text-gray-500">{results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;</p>
          )}
          <div className="space-y-3">
            {results.map((r: any, i: number) => {
              const Icon = typeIcons[r.type] || FileText;
              return (
                <Link key={i} href={`/${r.slug}`} className="flex items-center gap-4 rounded-lg border bg-white px-6 py-4 transition-shadow hover:shadow-sm">
                  <Icon className="h-5 w-5 shrink-0 text-primary-700" />
                  <div>
                    <p className="font-medium text-gray-900">{r.title}</p>
                    <p className="text-xs text-gray-400 capitalize">{r.type}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
