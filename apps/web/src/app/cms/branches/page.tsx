"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, ChevronLeft, ChevronRight, MapPin, Building } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import { api } from "@/lib/api";

const REGION_LABELS: Record<string, string> = {
  "head-office": "Head Office",
  "inside-valley": "Inside Valley",
  "outside-valley": "Outside Valley",
};

const REGION_COLORS: Record<string, string> = {
  "head-office": "bg-purple-100 text-purple-800",
  "inside-valley": "bg-blue-100 text-blue-800",
  "outside-valley": "bg-green-100 text-green-800",
};

export default function CmsBranchesPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    api.getBranches().then((b: any[]) => { setBranches(b || []); }).catch(console.error).finally(() => setLoading(false));
  }, []);

  useEffect(() => { setPage(1); }, [search, activeFilter]);

  const filtered = useMemo(() => {
    let result = branches;
    if (activeFilter !== "all") result = result.filter((b) => b.region === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((b) =>
        String(b.name || "").toLowerCase().includes(q) ||
        String(b.address || "").toLowerCase().includes(q) ||
        String(b.phone || "").toLowerCase().includes(q)
      );
    }
    return result;
  }, [branches, search, activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  async function handleDelete(id: number) {
    if (!confirm("Delete this branch?")) return;
    await api.deleteBranches(id);
    setBranches((p) => p.filter((x) => x.id !== id));
  }

  return (
    <CMSLayout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-900">
          Branches <span className="text-sm font-normal text-gray-400">({filtered.length})</span>
        </h2>
        <Link href="/cms/branches/new" className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-800">
          <Plus className="h-4 w-4" /> New Branch
        </Link>
      </div>

      <div className="mb-4 space-y-3">
        <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, address, phone..."
            className="w-full text-sm outline-none"
          />
          {search && <button onClick={() => setSearch("")} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter("all")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${activeFilter === "all" ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            All
          </button>
          {Object.entries(REGION_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${activeFilter === key ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-14 animate-pulse rounded-lg bg-gray-200" />)}</div>
      ) : paginated.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed p-12 text-center text-gray-500">
          <Building className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <p className="text-lg font-medium">No branches found</p>
          {search && <p className="mt-1 text-sm">Try a different search term.</p>}
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-600">Branch</th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-600">Address</th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-600">Phone</th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-600">Region</th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y">
                {paginated.map((b) => (
                  <tr key={b.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-100">
                          {b.image ? (
                            <img src={b.image} alt={b.name} className="h-full w-full object-cover" width={36} height={36} />
                          ) : (
                            <MapPin className="h-4 w-4 text-primary-600" />
                          )}
                        </div>
                        <span className="font-medium text-gray-900">{b.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{b.address}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-600">{b.phone || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${REGION_COLORS[b.region] || "bg-gray-100 text-gray-600"}`}>
                        {REGION_LABELS[b.region] || b.region || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${b.isActive ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {b.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link href={`/cms/branches/${b.id}`} className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button onClick={() => handleDelete(b.id)} className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600">
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
