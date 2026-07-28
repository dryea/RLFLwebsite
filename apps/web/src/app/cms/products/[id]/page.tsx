"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import { api } from "@/lib/api";

export default function ProductEditorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({
    categoryId: "", title: "", titleNp: "", slug: "", summary: "", content: "",
    icon: "", bannerImage: "", features: [""], eligibility: [""],
    documentsRequired: [""], interestRateInfo: "", minAmount: "", maxAmount: "",
    maxTenure: "", metaTitle: "", metaDescription: "", status: "draft", sortOrder: "0",
  });

  useEffect(() => {
    async function load() {
      try {
        const cats = await api.getProductCategories();
        setCategories(cats);
        if (!isNew) {
          const item = await api.getProductsById(parseInt(id));
          setForm({
            categoryId: String(item.categoryId || ""), title: item.title || "", titleNp: item.titleNp || "",
            slug: item.slug || "", summary: item.summary || "", content: item.content || "",
            icon: item.icon || "", bannerImage: item.bannerImage || "",
            features: item.features?.length ? item.features : [""],
            eligibility: item.eligibility?.length ? item.eligibility : [""],
            documentsRequired: item.documentsRequired?.length ? item.documentsRequired : [""],
            interestRateInfo: item.interestRateInfo || "",
            minAmount: item.minAmount?.toString() || "", maxAmount: item.maxAmount?.toString() || "",
            maxTenure: item.maxTenure || "", metaTitle: item.metaTitle || "",
            metaDescription: item.metaDescription || "", status: item.status || "draft",
            sortOrder: String(item.sortOrder || 0),
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

  function updateArrayField(field: string, index: number, value: string) {
    setForm((prev) => {
      const arr = [...(prev as any)[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  }

  function addArrayItem(field: string) {
    setForm((prev) => ({ ...prev, [field]: [...(prev as any)[field], ""] }));
  }

  function removeArrayItem(field: string, index: number) {
    setForm((prev) => {
      const arr = [...(prev as any)[field]];
      arr.splice(index, 1);
      return { ...prev, [field]: arr.length ? arr : [""] };
    });
  }

  async function handleSave() {
    setSaving(true);
    try {
      const data = {
        ...form,
        categoryId: parseInt(form.categoryId),
        minAmount: form.minAmount ? parseFloat(form.minAmount) : null,
        maxAmount: form.maxAmount ? parseFloat(form.maxAmount) : null,
        sortOrder: parseInt(form.sortOrder),
        features: form.features.filter(Boolean),
        eligibility: form.eligibility.filter(Boolean),
        documentsRequired: form.documentsRequired.filter(Boolean),
      };
      if (isNew) await api.createProducts(data);
      else await api.updateProducts(parseInt(id), data);
      router.push("/cms/products");
    } catch (e) { console.error(e); }
    setSaving(false);
  }

  if (loading) return <CMSLayout><div className="p-8 text-center text-gray-500">Loading...</div></CMSLayout>;

  return (
    <CMSLayout>
      <div className="mb-6 flex items-center gap-4">
        <button onClick={() => router.back()} className="rounded-lg p-2 hover:bg-gray-100"><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-xl font-bold">{isNew ? "New Product" : "Edit Product"}</h1>
        <div className="ml-auto flex gap-2">
          <select value={form.status} onChange={(e) => updateField("status", e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
            <option value="draft">Draft</option><option value="published">Published</option>
          </select>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800">
            <Save className="h-4 w-4" />{saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div><label className="mb-1 block text-sm font-medium">Category</label>
            <select value={form.categoryId} onChange={(e) => updateField("categoryId", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm">
              <option value="">Select...</option>
              {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select></div>
          <div><label className="mb-1 block text-sm font-medium">Title</label>
            <input value={form.title} onChange={(e) => updateField("title", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          <div><label className="mb-1 block text-sm font-medium">Title (Nepali)</label>
            <input value={form.titleNp} onChange={(e) => updateField("titleNp", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          <div><label className="mb-1 block text-sm font-medium">Slug</label>
            <input value={form.slug} onChange={(e) => updateField("slug", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          <div><label className="mb-1 block text-sm font-medium">Summary</label>
            <textarea value={form.summary} onChange={(e) => updateField("summary", e.target.value)} rows={3} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          <div><label className="mb-1 block text-sm font-medium">Content (HTML)</label>
            <textarea value={form.content} onChange={(e) => updateField("content", e.target.value)} rows={8} className="w-full rounded-lg border px-3 py-2 font-mono text-sm" /></div>
        </div>

        <div className="space-y-4">
          <div><label className="mb-1 block text-sm font-medium">Icon</label>
            <input value={form.icon} onChange={(e) => updateField("icon", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          <div><label className="mb-1 block text-sm font-medium">Banner Image URL</label>
            <input value={form.bannerImage} onChange={(e) => updateField("bannerImage", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          <div className="grid grid-cols-3 gap-3">
            <div><label className="mb-1 block text-sm font-medium">Min Amount</label>
              <input type="number" value={form.minAmount} onChange={(e) => updateField("minAmount", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div><label className="mb-1 block text-sm font-medium">Max Amount</label>
              <input type="number" value={form.maxAmount} onChange={(e) => updateField("maxAmount", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div><label className="mb-1 block text-sm font-medium">Max Tenure</label>
              <input value={form.maxTenure} onChange={(e) => updateField("maxTenure", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          </div>
          <div><label className="mb-1 block text-sm font-medium">Interest Rate Info</label>
            <textarea value={form.interestRateInfo} onChange={(e) => updateField("interestRateInfo", e.target.value)} rows={2} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>

          <div><label className="mb-1 block text-sm font-medium">Features</label>
            {form.features.map((f, i) => (
              <div key={i} className="mb-2 flex gap-2">
                <input value={f} onChange={(e) => updateArrayField("features", i, e.target.value)} className="flex-1 rounded-lg border px-3 py-2 text-sm" />
                <button onClick={() => removeArrayItem("features", i)} className="rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
            <button onClick={() => addArrayItem("features")} className="flex items-center gap-1 text-sm text-primary-700"><Plus className="h-4 w-4" /> Add feature</button></div>

          <div><label className="mb-1 block text-sm font-medium">Eligibility</label>
            {form.eligibility.map((f, i) => (
              <div key={i} className="mb-2 flex gap-2">
                <input value={f} onChange={(e) => updateArrayField("eligibility", i, e.target.value)} className="flex-1 rounded-lg border px-3 py-2 text-sm" />
                <button onClick={() => removeArrayItem("eligibility", i)} className="rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
            <button onClick={() => addArrayItem("eligibility")} className="flex items-center gap-1 text-sm text-primary-700"><Plus className="h-4 w-4" /> Add eligibility criteria</button></div>

          <div><label className="mb-1 block text-sm font-medium">Documents Required</label>
            {form.documentsRequired.map((f, i) => (
              <div key={i} className="mb-2 flex gap-2">
                <input value={f} onChange={(e) => updateArrayField("documentsRequired", i, e.target.value)} className="flex-1 rounded-lg border px-3 py-2 text-sm" />
                <button onClick={() => removeArrayItem("documentsRequired", i)} className="rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
            <button onClick={() => addArrayItem("documentsRequired")} className="flex items-center gap-1 text-sm text-primary-700"><Plus className="h-4 w-4" /> Add document</button></div>

          <div><label className="mb-1 block text-sm font-medium">Meta Title</label>
            <input value={form.metaTitle} onChange={(e) => updateField("metaTitle", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          <div><label className="mb-1 block text-sm font-medium">Meta Description</label>
            <textarea value={form.metaDescription} onChange={(e) => updateField("metaDescription", e.target.value)} rows={2} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
        </div>
      </div>
    </CMSLayout>
  );
}
