"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SearchCheck, Settings, LineChart, ArrowRightLeft, FileText, Package, Newspaper } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import { API } from "@/lib/api";
import { getCmsToken } from "@/lib/cms-auth";
import SeoScoreRing from "@/components/cms/seo/SeoScoreRing";

export default function CmsSeoDashboardPage() {
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getCmsToken();
    Promise.all([
      fetch(`${API}/api/cms/seo/analyses`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch(`${API}/api/cms/seo/settings`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
    ]).then(([a, s]) => {
      setAnalyses(Array.isArray(a) ? a : []);
      setSettings(s || {});
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const avgScore = analyses.length ? Math.round(analyses.reduce((sum, a) => sum + (a.score || 0), 0) / analyses.length) : 0;
  const good = analyses.filter((a) => (a.score || 0) >= 80).length;
  const needsWork = analyses.filter((a) => (a.score || 0) < 55).length;

  return (
    <CMSLayout>
      <h1 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
        <SearchCheck className="h-5 w-5" /> SEO Suite
      </h1>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/cms/seo/settings" className="group rounded-xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <Settings className="mb-3 h-6 w-6 text-gray-400 group-hover:text-primary-600" />
          <p className="font-semibold text-gray-900">SEO Settings</p>
          <p className="mt-1 text-xs text-gray-500">Site title, social profiles, schema defaults, sitemap & robots</p>
        </Link>
        <Link href="/cms/seo/analysis" className="group rounded-xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <SearchCheck className="mb-3 h-6 w-6 text-gray-400 group-hover:text-primary-600" />
          <p className="font-semibold text-gray-900">Content Analysis</p>
          <p className="mt-1 text-xs text-gray-500">SEO scores for all pages, products & services</p>
        </Link>
        <Link href="/cms/seo/rank-tracker" className="group rounded-xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <LineChart className="mb-3 h-6 w-6 text-gray-400 group-hover:text-primary-600" />
          <p className="font-semibold text-gray-900">Rank Tracker</p>
          <p className="mt-1 text-xs text-gray-500">Track keyword positions over time</p>
        </Link>
        <Link href="/cms/seo/redirects" className="group rounded-xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <ArrowRightLeft className="mb-3 h-6 w-6 text-gray-400 group-hover:text-primary-600" />
          <p className="font-semibold text-gray-900">Redirects</p>
          <p className="mt-1 text-xs text-gray-500">Manage 301 redirects to preserve rankings</p>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">Average SEO Score</h2>
          <div className="flex items-center gap-5">
            <SeoScoreRing score={avgScore} size={110} />
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-green-500" /> {good} strong ({analyses.length ? Math.round((good / analyses.length) * 100) : 0}%)</p>
              <p className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> {needsWork} need work</p>
              <p className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-gray-300" /> {analyses.length} analyzed</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Recent Analysis</h2>
            <Link href="/cms/seo/analysis" className="text-xs font-medium text-primary-600 hover:underline">View all →</Link>
          </div>
          {analyses.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">No analysis yet. Open a page, product, or service and run SEO analysis.</p>
          ) : (
            <div className="divide-y">
              {analyses.slice(0, 6).map((a) => (
                <div key={a.id} className="flex items-center gap-3 py-2.5">
                  <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${(a.score || 0) >= 80 ? "bg-green-100 text-green-700" : (a.score || 0) >= 55 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                    {a.score || 0}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-800 capitalize">{a.resourceType} #{a.resourceId}</p>
                    <p className="truncate text-xs text-gray-400">{a.focusKeyword || "No focus keyword"}</p>
                  </div>
                  <span className="text-xs text-gray-400">{a.analyzedAt ? new Date(a.analyzedAt).toLocaleDateString() : "—"}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </CMSLayout>
  );
}
