"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import LanguageTabs from "@/components/cms/LanguageTabs";
import PhotoUpload from "@/components/cms/PhotoUpload";
import { api } from "@/lib/api";

export default function TeamEditorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({
    categoryId: "", name: "", nameNp: "", designation: "", designationNp: "",
    photo: "", bio: "", email: "", phone: "", sortOrder: "0", isActive: true,
  });

  useEffect(() => {
    async function load() {
      try {
        const cats = await api.getTeamCategories();
        setCategories(cats);
        if (!isNew) {
          const item = await api.getTeamMembersById(parseInt(id));
          setForm({
            categoryId: String(item.categoryId || ""), name: item.name || "",
            nameNp: item.nameNp || "", designation: item.designation || "",
            designationNp: item.designationNp || "", photo: item.photo || "",
            bio: item.bio || "", email: item.email || "", phone: item.phone || "",
            sortOrder: String(item.sortOrder || 0), isActive: item.isActive ?? true,
          });
        }
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, [id, isNew]);

  function updateField(field: string, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    if (!form.name.trim()) { alert("Name is required"); return; }
    if (!form.categoryId) { alert("Please select a category"); return; }
    setSaving(true);
    try {
      const data = {
        ...form,
        categoryId: parseInt(form.categoryId),
        sortOrder: parseInt(form.sortOrder || "0") || 0,
      };
      if (isNew) await api.createTeamMembers(data);
      else await api.updateTeamMembers(parseInt(id), data);
      router.push("/cms/team");
    } catch (e) { alert("Save failed: " + e); }
    setSaving(false);
  }

  if (loading) return <CMSLayout><div className="h-96 animate-pulse rounded-lg bg-gray-200" /></CMSLayout>;

  const inputCls = "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500";

  return (
    <CMSLayout>
      <div className="mb-6 flex items-center gap-4">
        <button onClick={() => router.back()} className="rounded-lg p-2 hover:bg-gray-100"><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-xl font-bold">{isNew ? "New Team Member" : "Edit Team Member"}</h1>
        <div className="ml-auto flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.isActive} onChange={(e) => updateField("isActive", e.target.checked)} className="rounded" />
            Active
          </label>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800 disabled:opacity-50">
            <Save className="h-4 w-4" />{saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <LanguageTabs active={activeLang} onChange={setActiveLang} />

      <div className="mb-6 max-w-md">
        <label className="mb-1 block text-sm font-medium text-gray-700">Category *</label>
        <select value={form.categoryId} onChange={(e) => updateField("categoryId", e.target.value)} className={inputCls}>
          <option value="">Select category...</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {activeLang === "en" ? (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Name *</label>
                <input value={form.name} onChange={(e) => updateField("name", e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Designation *</label>
                <input value={form.designation} onChange={(e) => updateField("designation", e.target.value)} className={inputCls} placeholder="e.g. Chairman" />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Name (Nepali)</label>
                <input value={form.nameNp} onChange={(e) => updateField("nameNp", e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Designation (Nepali)</label>
                <input value={form.designationNp} onChange={(e) => updateField("designationNp", e.target.value)} className={inputCls} />
              </div>
            </>
          )}
          <PhotoUpload value={form.photo} onChange={(url) => updateField("photo", url)} label="Member Photo" />
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Bio</label>
            <textarea value={form.bio} onChange={(e) => updateField("bio", e.target.value)} rows={5} className={inputCls} />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
            <input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Sort Order</label>
            <input type="number" value={form.sortOrder} onChange={(e) => updateField("sortOrder", e.target.value)} className={inputCls} />
          </div>
        </div>
      </div>
    </CMSLayout>
  );
}
