"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, ChevronLeft, ChevronRight, Percent } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import { api } from "@/lib/api";

const CATEGORY_LABELS: Record<string, string> = {
  savings: "Savings",
  fixed: "Fixed Deposit",
  loan: "Loan",
  tariff: "Tariff",
  forex: "Forex",
  "base-rate-spread-rate": "Base Rate",
};

export default function CmsRatesPage() {
  const [rates, setRates] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    Promise.all([
      api.getRates(),
      api.getRateCategories().catch(() => []),
    ]).then(([r, c]) => {
      setRates(r || []);
      setCategories(c || []);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const catName = (id: number) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? (CATEGORY_LABELS[cat.slug] || cat.name || cat.slug) : `#${id}`;
  };

  useEffect(() => { setPage(1); }, [search, activeFilter]);

  const filtered = useMemo(() => {
    let result = rates;
    if (activeFilter !== "all") {
      result = result.filter((r) => catName(r.categoryId).toLowerCase() === activeFilter || String(r.categoryId) === activeFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((r) =>
        String(r.productName || "").toLowerCase().includes(q) ||
        String(r.tenure || "").toLowerCase().includes(q) ||
        String(r.notes || "").toLowerCase().includes(q)
      );
    }
    return result;
  }, [rates, search, activeFilter, categories]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const rateValue = (r: any) => {
    if (r.singleRate != null) return `${r.singleRate}%`;
    if (r.minRate != null && r.maxRate != null) return `${r.minRate} – ${r.maxRate}%`;
    if (r.minRate != null) return `${r.minRate}%`;
    return r.notes || "—";
  };

  async function handleDelete(id: number) {
    if (!confirm("Delete this rate?")) return;
    await api.deleteRates(id);
    setRates((p) => p.filter((x) => x.id !== id));
  }

  return (
    <CMSLayout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-900">
          Interest Rates <span className="text-sm font-normal text-gray-400">({filtered.length})</span>
        </h2>
        <Link href="/cms/rates/new" className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-800">
          <Plus className="h-4 w-4" /> New Rate
        </Link>
      </div>

      <div className="mb-4 space-y-3">
        <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product, tenure, notes..."
            className="w-full text-sm outline-none"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter("all")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${activeFilter === "all" ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(String(cat.id))}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${activeFilter === String(cat.id) ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {CATEGORY_LABELS[cat.slug] || cat.name || cat.slug}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-12 animate-pulse rounded-lg bg-gray-200" />)}
        </div>
      ) : paginated.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed p-12 text-center text-gray-500">
          <Percent className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <p className="text-lg font-medium">No rates found</p>
          {search && <p className="mt-1 text-sm">Try a different search term.</p>}
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-600">Category</th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-600">Product</th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-600">Tenure</th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-600">Rate</th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-600">Effective Date</th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y">
                {paginated.map((r) => (
                  <tr key={r.id} className="transition-colors hover:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className="rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">{catName(r.categoryId)}</span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{r.productName}</td>
                    <td className="px-4 py-3 text-gray-600">{r.tenure || "—"}</td>
                    <td className="px-4 py-3 font-semibold text-primary-700">{rateValue(r)}</td>
                    <td className="px-4 py-3 text-gray-600">{r.effectiveDate || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${r.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{r.status || "draft"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link href={`/cms/rates/${r.id}`} className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700">
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button onClick={() => handleDelete(r.id)} className="rounded p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded border p-1.5 text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
              .map((p, idx, arr) => (
                <span key={p} className="flex items-center">
                  {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-1 text-gray-400">…</span>}
                  <button
                    onClick={() => setPage(p)}
                    className={`h-8 w-8 rounded text-sm transition-colors ${currentPage === p ? "bg-primary-700 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                  >
                    {p}
                  </button>
                </span>
              ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded border p-1.5 text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </CMSLayout>
  );
}
