"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

interface Column {
  key: string;
  label: string;
  render?: (val: any, row: any) => React.ReactNode;
}

export default function CMSResourceList({
  title,
  newLabel,
  basePath,
  columns,
  fetchItems,
  onDelete,
}: {
  title: string;
  newLabel: string;
  basePath: string;
  columns: Column[];
  fetchItems: () => Promise<any[]>;
  onDelete: (id: number) => Promise<void>;
}) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchItems().then(setItems).catch(console.error).finally(() => setLoading(false));
  }, [fetchItems]);

  const filtered = items.filter((item) =>
    columns.some((col) => String(item[col.key] || "").toLowerCase().includes(search.toLowerCase()))
  );

  async function handleDelete(id: number) {
    if (!confirm("Delete this item?")) return;
    await onDelete(id);
    setItems((p) => p.filter((x) => x.id !== id));
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <Link
          href={`${basePath}/new`}
          className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
        >
          <Plus className="h-4 w-4" /> {newLabel}
        </Link>
      </div>

      <div className="mb-4 flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
        <Search className="h-4 w-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full text-sm outline-none"
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-12 animate-pulse rounded-lg bg-gray-200" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed p-12 text-center text-gray-500">
          <p className="text-lg font-medium">No items found</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-4 py-3 font-medium text-gray-600">{col.label}</th>
                ))}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-gray-900">
                      {col.render ? col.render(item[col.key], item) : item[col.key]}
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
      )}
    </div>
  );
}
