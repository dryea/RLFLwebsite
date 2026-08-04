"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, ChevronLeft, ChevronRight, Users } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import { api } from "@/lib/api";

export default function CmsTeamPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    Promise.all([
      api.getTeamMembers(),
      api.getTeamCategories().catch(() => []),
    ]).then(([m, c]) => {
      setMembers(m || []);
      setCategories(c || []);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const catName = (id: number) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.name : `#${id}`;
  };

  useEffect(() => { setPage(1); }, [search, activeFilter]);

  const filtered = useMemo(() => {
    let result = members;
    if (activeFilter !== "all") {
      result = result.filter((m) => String(m.categoryId) === activeFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((m) =>
        String(m.name || "").toLowerCase().includes(q) ||
        String(m.designation || "").toLowerCase().includes(q) ||
        String(m.email || "").toLowerCase().includes(q)
      );
    }
    return result;
  }, [members, search, activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  async function handleDelete(id: number) {
    if (!confirm("Delete this team member?")) return;
    await api.deleteTeamMembers(id);
    setMembers((p) => p.filter((x) => x.id !== id));
  }

  return (
    <CMSLayout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-900">
          Team Members <span className="text-sm font-normal text-gray-400">({filtered.length})</span>
        </h2>
        <div className="flex items-center gap-2">
          <Link href="/cms/team-categories" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50">
            <Users className="h-4 w-4" /> Categories
          </Link>
          <Link href="/cms/team/new" className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-800">
            <Plus className="h-4 w-4" /> New Member
          </Link>
        </div>
      </div>

      <div className="mb-4 space-y-3">
        <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, designation, email..."
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
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <div key={i} className="h-44 animate-pulse rounded-lg bg-gray-200" />)}
        </div>
      ) : paginated.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed p-12 text-center text-gray-500">
          <Users className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <p className="text-lg font-medium">No team members found</p>
          {search && <p className="mt-1 text-sm">Try a different search term.</p>}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginated.map((m) => (
            <div key={m.id} className="group rounded-lg border bg-white p-4 transition-shadow hover:shadow-md">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-100">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} className="h-full w-full object-cover" width={48} height={48} />
                  ) : (
                    <span className="text-lg font-bold text-primary-700">{(m.name || "?").charAt(0)}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-gray-900">{m.name}</h3>
                  <p className="truncate text-sm text-gray-500">{m.designation}</p>
                  <span className="mt-1 inline-block rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-medium text-primary-700">
                    {catName(m.categoryId)}
                  </span>
                </div>
                <div className="flex shrink-0 gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <Link href={`/cms/team/${m.id}`} className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button onClick={() => handleDelete(m.id)} className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {!m.isActive && (
                <span className="mt-2 inline-block rounded-full bg-yellow-100 px-2 py-0.5 text-[11px] font-medium text-yellow-800">Inactive</span>
              )}
            </div>
          ))}
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
