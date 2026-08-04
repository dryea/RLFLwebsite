"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Pencil, Trash2, Plus, Users } from "lucide-react";
import Link from "next/link";
import CMSLayout from "@/components/cms/CMSLayout";
import { api } from "@/lib/api";

export default function CmsTeamCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ slug: "", name: "", nameNp: "", description: "", sortOrder: "0" });

  useEffect(() => {
    api.getTeamCategories().then((c: any[]) => { setCategories(c || []); }).catch(console.error).finally(() => setLoading(false));
  }, []);

  function startEdit(cat?: any) {
    if (!cat) {
      setEditing({ id: null });
      setForm({ slug: "", name: "", nameNp: "", description: "", sortOrder: String(categories.length + 1) });
    } else {
      setEditing({ id: cat.id });
      setForm({ slug: cat.slug || "", name: cat.name || "", nameNp: cat.nameNp || "", description: cat.description || "", sortOrder: String(cat.sortOrder || 0) });
    }
  }

  async function handleSave() {
    if (!form.name.trim()) { alert("Name is required"); return; }
    const data = { ...form, sortOrder: parseInt(form.sortOrder || "0") || 0 };
    try {
      if (editing?.id) {
        await api.updateTeamCategories(editing.id, data);
      } else {
        await api.createTeamCategories(data);
      }
      setEditing(null);
      const c = await api.getTeamCategories();
      setCategories(c || []);
    } catch (e) { alert("Save failed: " + e); }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this category? Members in it may break.")) return;
    await api.deleteTeamCategories(id);
    setCategories((p) => p.filter((x) => x.id !== id));
  }

  const inputCls = "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500";

  return (
    <CMSLayout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/cms/team" className="rounded p-1.5 text-gray-400 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h2 className="text-xl font-bold text-gray-900">Team Categories <span className="text-sm font-normal text-gray-400">({categories.length})</span></h2>
        </div>
        <button onClick={() => startEdit()} className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800">
          <Plus className="h-4 w-4" /> New Category
        </button>
      </div>

      {editing && (
        <div className="mb-6 rounded-lg border bg-white p-6">
          <h3 className="mb-4 font-semibold text-gray-900">{editing.id ? "Edit Category" : "New Category"}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Name *</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="e.g. Board of Directors" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Slug *</label>
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inputCls} placeholder="e.g. board-of-directors" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Name (Nepali)</label>
              <input value={form.nameNp} onChange={(e) => setForm({ ...form, nameNp: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} className={inputCls} />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className={inputCls} />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={handleSave} className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800">
              <Save className="h-4 w-4" /> Save
            </button>
            <button onClick={() => setEditing(null)} className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-12 animate-pulse rounded-lg bg-gray-200" />)}</div>
      ) : categories.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed p-12 text-center text-gray-500">
          <Users className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <p className="text-lg font-medium">No categories yet</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="px-4 py-3 font-medium text-gray-600">Slug</th>
                <th className="px-4 py-3 font-medium text-gray-600">Sort</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{cat.name}</td>
                  <td className="px-4 py-3 text-gray-500">{cat.slug}</td>
                  <td className="px-4 py-3 text-gray-500">{cat.sortOrder || 0}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => startEdit(cat)} className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(cat.id)} className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600">
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
    </CMSLayout>
  );
}
