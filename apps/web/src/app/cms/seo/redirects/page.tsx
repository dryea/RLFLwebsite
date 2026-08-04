"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import { API } from "@/lib/api";
import { getCmsToken } from "@/lib/cms-auth";

interface RedirectItem {
  id: number;
  source: string;
  target: string;
  type: number;
  isActive: boolean;
}

export default function CmsRedirectsPage() {
  const [items, setItems] = useState<RedirectItem[]>([]);
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [type, setType] = useState(301);
  const [showForm, setShowForm] = useState(false);

  const token = () => getCmsToken();

  useEffect(() => {
    fetch(`${API}/api/cms/seo/redirects`, { headers: { Authorization: `Bearer ${token()}` } })
      .then((r) => r.json())
      .then((d) => setItems(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  async function addRedirect() {
    if (!source.trim() || !target.trim()) return;
    const res = await fetch(`${API}/api/cms/seo/redirects`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ source: source.trim(), target: target.trim(), type }),
    });
    if (res.ok) {
      const created = await res.json();
      setItems([created, ...items]);
      setSource(""); setTarget(""); setShowForm(false);
    }
  }

  async function toggleActive(item: RedirectItem) {
    const res = await fetch(`${API}/api/cms/seo/redirects/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ isActive: !item.isActive }),
    });
    if (res.ok) setItems(items.map((i) => (i.id === item.id ? { ...i, isActive: !item.isActive } : i)));
  }

  async function deleteItem(id: number) {
    if (!confirm("Delete this redirect?")) return;
    await fetch(`${API}/api/cms/seo/redirects/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token()}` } });
    setItems(items.filter((i) => i.id !== id));
  }

  return (
    <CMSLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Redirects</h1>
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-1.5 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800">
          <Plus className="h-4 w-4" /> Add Redirect
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Source Path *</label>
              <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="/old-page" className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Target *</label>
              <input value={target} onChange={(e) => setTarget(e.target.value)} placeholder="/en/new-page" className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Type</label>
              <select value={type} onChange={(e) => setType(parseInt(e.target.value))} className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500">
                <option value={301}>301 Moved Permanently</option>
                <option value={302}>302 Found</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button onClick={addRedirect} className="rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800">Add</button>
              <button onClick={() => setShowForm(false)} className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Target</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-gray-700">{item.source}</td>
                <td className="px-4 py-3 font-mono text-xs text-primary-700">{item.target}</td>
                <td className="px-4 py-3"><span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">{item.type}</span></td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleActive(item)} className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${item.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {item.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <a href={item.source} target="_blank" rel="noopener noreferrer" className="rounded p-1 text-gray-400 hover:text-gray-600"><ExternalLink className="h-3.5 w-3.5" /></a>
                    <button onClick={() => deleteItem(item.id)} className="rounded p-1 text-gray-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-sm text-gray-400">No redirects yet. Add redirects to preserve rankings when URLs change.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </CMSLayout>
  );
}
