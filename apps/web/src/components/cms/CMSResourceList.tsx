"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Column {
  key: string;
  label: string;
  type?: "text" | "image" | "date" | "badge" | "money" | "boolean";
  badgeColors?: Record<string, string>;
  truncate?: number;
  render?: (val: any, row: any) => React.ReactNode;
}

interface FilterOption {
  key: string;
  label: string;
  value?: string;
}

function renderCell(col: Column, row: any) {
  if (col.render) return col.render(row[col.key], row);
  const val = row[col.key];
  if (val == null || val === "") return <span className="text-gray-300">—</span>;

  switch (col.type) {
    case "image":
      return val ? (
        <img src={val} alt="" className="h-10 w-14 rounded object-cover" />
      ) : <span className="text-gray-300">—</span>;
    case "date": {
      if (!val) return <span className="text-gray-300">—</span>;
      const d = new Date(val);
      if (isNaN(d.getTime())) return <span>{String(val).slice(0, 10)}</span>;
      return <span className="whitespace-nowrap text-gray-600">{d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>;
    }
    case "badge": {
      const color = col.badgeColors?.[val] || "bg-gray-100 text-gray-600";
      return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>{String(val)}</span>;
    }
    case "money":
      return <span className="font-semibold text-gray-900">{Number(val).toLocaleString()}{typeof val === "number" ? "" : "%"}</span>;
    case "boolean":
      return val
        ? <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">✓</span>
        : <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-400">–</span>;
    default: {
      const s = String(val);
      return col.truncate && s.length > col.truncate
        ? <span title={s}>{s.slice(0, col.truncate)}…</span>
        : <span className="text-gray-900">{s}</span>;
    }
  }
}

export default function CMSResourceList({
  title,
  newLabel,
  basePath,
  columns,
  fetchItems,
  onDelete,
  filters,
  pageSize = 10,
}: {
  title: string;
  newLabel: string;
  basePath: string;
  columns: Column[];
  fetchItems: () => Promise<any[]>;
  onDelete: (id: number) => Promise<void>;
  filters?: FilterOption[];
  pageSize?: number;
}) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchItems().then(setItems).catch(console.error).finally(() => setLoading(false));
  }, [fetchItems]);

  // Reset page when search/filter changes
  useEffect(() => { setPage(1); }, [search, activeFilter]);

  const filtered = useMemo(() => {
    let result = items;
    if (activeFilter !== "all") {
      result = result.filter((item) => item.status === activeFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((item) =>
        columns.some((col) => String(item[col.key] ?? "").toLowerCase().includes(q))
      );
    }
    return result;
  }, [items, search, activeFilter, columns]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  async function handleDelete(id: number) {
    if (!confirm("Delete this item?")) return;
    await onDelete(id);
    setItems((p) => p.filter((x) => x.id !== id));
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-900">
          {title} <span className="text-sm font-normal text-gray-400">({filtered.length})</span>
        </h2>
        <Link
          href={`${basePath}/new`}
          className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
        >
          <Plus className="h-4 w-4" /> {newLabel}
        </Link>
      </div>

      {/* Search + Filters */}
      <div className="mb-4 space-y-3">
        <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full text-sm outline-none"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
          )}
        </div>

        {filters && filters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeFilter === f.key
                    ? "bg-primary-700 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-12 animate-pulse rounded-lg bg-gray-200" />)}
        </div>
      ) : paginated.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed p-12 text-center text-gray-500">
          <p className="text-lg font-medium">No items found</p>
          {search && <p className="mt-1 text-sm">Try a different search term.</p>}
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  {columns.map((col) => (
                    <th key={col.key} className="whitespace-nowrap px-4 py-3 font-medium text-gray-600">{col.label}</th>
                  ))}
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y">
                {paginated.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-gray-50">
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 align-middle">
                        {renderCell(col, item)}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link href={`${basePath}/${item.id}`} className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700">
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button onClick={() => handleDelete(item.id)} className="rounded p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600">
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

      {/* Pagination */}
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
                    className={`h-8 w-8 rounded text-sm transition-colors ${
                      currentPage === p ? "bg-primary-700 text-white" : "text-gray-600 hover:bg-gray-100"
                    }`}
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
    </div>
  );
}
