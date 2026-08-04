"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, TrendingUp, TrendingDown, Minus, Search } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import { API } from "@/lib/api";
import { getCmsToken } from "@/lib/cms-auth";

interface RankItem {
  id: number;
  keyword: string;
  url: string | null;
  position: number | null;
  previousPosition: number | null;
  searchEngine: string;
  location: string | null;
  trend: string;
  history: { date: string; position: number | null }[];
  lastChecked: string | null;
}

function TrendBadge({ trend }: { trend: string }) {
  if (trend === "up") return <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700"><TrendingUp className="h-3 w-3" /> Up</span>;
  if (trend === "down") return <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700"><TrendingDown className="h-3 w-3" /> Down</span>;
  if (trend === "same") return <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"><Minus className="h-3 w-3" /> Same</span>;
  return <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700"><Search className="h-3 w-3" /> New</span>;
}

function MiniSparkline({ history }: { history: { position: number | null }[] }) {
  const pts = history.filter((h) => h.position != null).map((h) => h.position!);
  if (pts.length < 2) return <span className="text-xs text-gray-400">—</span>;
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const coords = pts.map((p, i) => `${(i / (pts.length - 1)) * w},${h - ((p - min) / range) * (h - 4) - 2}`).join(" ");
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={coords} fill="none" stroke={pts[pts.length - 1] <= pts[0] ? "#22c55e" : "#ef4444"} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default function CmsRankTrackerPage() {
  const [items, setItems] = useState<RankItem[]>([]);
  const [keyword, setKeyword] = useState("");
  const [url, setUrl] = useState("");
  const [position, setPosition] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editPosition, setEditPosition] = useState<{ id: number; value: string } | null>(null);

  const token = () => getCmsToken();

  useEffect(() => {
    fetch(`${API}/api/cms/seo/rank-tracker`, { headers: { Authorization: `Bearer ${token()}` } })
      .then((r) => r.json())
      .then((d) => setItems(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  async function addKeyword() {
    if (!keyword.trim()) return;
    const res = await fetch(`${API}/api/cms/seo/rank-tracker`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ keyword: keyword.trim(), url: url.trim() || null, position: position ? parseInt(position) : null }),
    });
    if (res.ok) {
      const created = await res.json();
      setItems([created, ...items]);
      setKeyword(""); setUrl(""); setPosition(""); setShowForm(false);
    }
  }

  async function updatePosition(id: number) {
    if (!editPosition) return;
    const res = await fetch(`${API}/api/cms/seo/rank-tracker/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ position: parseInt(editPosition.value) }),
    });
    if (res.ok) {
      const updated = await res.json();
      setItems(items.map((i) => (i.id === id ? updated : i)));
      setEditPosition(null);
    }
  }

  async function deleteItem(id: number) {
    if (!confirm("Delete this tracked keyword?")) return;
    await fetch(`${API}/api/cms/seo/rank-tracker/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token()}` } });
    setItems(items.filter((i) => i.id !== id));
  }

  return (
    <CMSLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Rank Tracker</h1>
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-1.5 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800">
          <Plus className="h-4 w-4" /> Track Keyword
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Keyword *</label>
              <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="e.g. savings account Nepal" className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">URL</label>
              <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="/en/products/savings" className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Current Position</label>
              <input type="number" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="e.g. 12" className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500" />
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button onClick={addKeyword} className="rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800">Add</button>
            <button onClick={() => setShowForm(false)} className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Keyword</th>
              <th className="px-4 py-3">URL</th>
              <th className="px-4 py-3">Position</th>
              <th className="px-4 py-3">Trend</th>
              <th className="px-4 py-3">History</th>
              <th className="px-4 py-3">Last Checked</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{item.keyword}</td>
                <td className="max-w-[180px] truncate px-4 py-3 text-xs text-gray-500">{item.url || "—"}</td>
                <td className="px-4 py-3">
                  {editPosition?.id === item.id ? (
                    <div className="flex items-center gap-1.5">
                      <input type="number" value={editPosition.value} onChange={(e) => setEditPosition({ id: item.id, value: e.target.value })} className="w-16 rounded border px-2 py-1 text-sm" autoFocus />
                      <button onClick={() => updatePosition(item.id)} className="rounded bg-primary-600 px-2 py-1 text-xs text-white hover:bg-primary-700">Save</button>
                      <button onClick={() => setEditPosition(null)} className="rounded bg-gray-200 px-2 py-1 text-xs">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setEditPosition({ id: item.id, value: String(item.position ?? "") })} className="font-bold text-gray-900 hover:text-primary-600">
                      {item.position != null ? `#${item.position}` : "—"}
                    </button>
                  )}
                </td>
                <td className="px-4 py-3"><TrendBadge trend={item.trend} /></td>
                <td className="px-4 py-3"><MiniSparkline history={item.history || []} /></td>
                <td className="px-4 py-3 text-xs text-gray-500">{item.lastChecked ? new Date(item.lastChecked).toLocaleDateString() : "—"}</td>
                <td className="px-4 py-3">
                  <button onClick={() => deleteItem(item.id)} className="rounded p-1 text-gray-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-400">No tracked keywords yet. Add your first keyword to monitor rankings.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </CMSLayout>
  );
}
