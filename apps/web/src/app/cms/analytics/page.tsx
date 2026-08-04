"use client";

import { useEffect, useState } from "react";
import { BarChart3, Eye, MousePointerClick, RefreshCw } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import { API } from "@/lib/api";
import { getCmsToken } from "@/lib/cms-auth";

interface AnalyticsData {
  totalViews: number;
  totalEvents: number;
  topPaths: [string, number][];
  byEvent: Record<string, number>;
}

export default function CmsAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    fetch(`${API}/api/cms/analytics`, { headers: { Authorization: `Bearer ${getCmsToken()}` } })
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  const maxViews = data?.topPaths?.[0]?.[1] || 1;

  return (
    <CMSLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <BarChart3 className="h-5 w-5" /> Analytics
        </h1>
        <button onClick={load} className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="h-96 animate-pulse rounded-lg bg-gray-200" />
      ) : (
        <>
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                <Eye className="h-5 w-5 text-primary-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{data?.totalViews || 0}</p>
              <p className="text-sm text-gray-500">Total Page Views</p>
            </div>
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                <MousePointerClick className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{data?.totalEvents || 0}</p>
              <p className="text-sm text-gray-500">Total Events</p>
            </div>
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                <BarChart3 className="h-5 w-5 text-amber-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{data ? Object.keys(data.byEvent || {}).length : 0}</p>
              <p className="text-sm text-gray-500">Event Types</p>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-semibold text-gray-900">Top Pages</h2>
            {data?.topPaths?.length ? (
              <div className="space-y-3">
                {data.topPaths.map(([path, count]) => (
                  <div key={path}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="font-mono text-gray-600">{path}</span>
                      <span className="font-semibold text-gray-800">{count}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <div className="h-full rounded-full bg-primary-500" style={{ width: `${(count / maxViews) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-gray-400">No page views recorded yet. Visit the site to start tracking.</p>
            )}
          </div>
        </>
      )}
    </CMSLayout>
  );
}
