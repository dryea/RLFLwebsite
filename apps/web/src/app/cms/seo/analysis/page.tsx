"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SearchCheck, Trash2, Filter } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import { API } from "@/lib/api";
import { getCmsToken } from "@/lib/cms-auth";

interface AnalysisItem {
  id: number;
  resourceType: string;
  resourceId: number;
  score: number;
  focusKeyword: string | null;
  issues: any[];
  analyzedAt: string | null;
}

export default function CmsSeoAnalysisPage() {
  const [items, setItems] = useState<AnalysisItem[]>([]);
  const [filter, setFilter] = useState("all");
  const token = () => getCmsToken();

  useEffect(() => {
    load();
  }, []);

  function load() {
    fetch(`${API}/api/cms/seo/analyses`, { headers: { Authorization: `Bearer ${token()}` } })
      .then((r) => r.json())
      .then((d) => setItems(Array.isArray(d) ? d : []))
      .catch(() => {});
  }

  async function deleteAnalysis(type: string, id: number) {
    if (!confirm("Delete this analysis?")) return;
    await fetch(`${API}/api/cms/seo/analyses/${type}/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token()}` } });
    load();
  }

  const filtered = filter === "all" ? items : items.filter((i) => i.resourceType === filter);
  const types = ["all", ...Array.from(new Set(items.map((i) => i.resourceType)))];

  const scoreBadge = (score: number) =>
    `inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-bold ${
      score >= 80 ? "bg-green-100 text-green-700" : score >= 55 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
    }`;

  return (
    <CMSLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <SearchCheck className="h-5 w-5" /> Content Analysis
        </h1>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-lg border px-3 py-1.5 text-sm outline-none focus:border-primary-500">
            {types.map((t) => <option key={t} value={t}>{t === "all" ? "All types" : t}</option>)}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Resource</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Focus Keyword</th>
              <th className="px-4 py-3">Issues</th>
              <th className="px-4 py-3">Analyzed</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((item) => {
              const errors = item.issues?.filter((i) => i.severity === "error").length || 0;
              const warnings = item.issues?.filter((i) => i.severity === "warning").length || 0;
              return (
                <tr key={`${item.resourceType}-${item.resourceId}`} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link href={`/cms/${item.resourceType === "page" ? "pages" : item.resourceType}s/${item.resourceId}`} className="font-medium text-primary-700 hover:underline">
                      #{item.resourceId}
                    </Link>
                  </td>
                  <td className="px-4 py-3 capitalize text-gray-600">{item.resourceType}</td>
                  <td className="px-4 py-3"><span className={scoreBadge(item.score)}>{item.score}</span></td>
                  <td className="px-4 py-3 text-xs text-gray-500">{item.focusKeyword || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5 text-xs">
                      {errors > 0 && <span className="rounded-full bg-red-100 px-2 py-0.5 font-medium text-red-700">{errors} err</span>}
                      {warnings > 0 && <span className="rounded-full bg-amber-100 px-2 py-0.5 font-medium text-amber-700">{warnings} warn</span>}
                      {errors === 0 && warnings === 0 && <span className="text-gray-400">—</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{item.analyzedAt ? new Date(item.analyzedAt).toLocaleString() : "—"}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => deleteAnalysis(item.resourceType, item.resourceId)} className="rounded p-1 text-gray-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-400">No analyses yet. Open a page, product, or service and use the SEO panel to run an analysis.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </CMSLayout>
  );
}
