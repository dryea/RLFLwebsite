"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import CMSLayout from "@/components/cms/CMSLayout";
import { api } from "@/lib/api";

export default function CmsRateEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const isNew = id === "new";
  const [data, setData] = useState<Record<string, any>>({
    categoryId: "",
    productName: "",
    tenure: "",
    rateType: "fixed",
    minRate: "",
    maxRate: "",
    singleRate: "",
    effectiveDate: "",
    notes: "",
    status: "active",
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.getRateCategories().then(setCategories).catch(() => {});
    if (!isNew) {
      api.getRatesById(Number(id))
        .then((d: any) => {
          setData({
            ...d,
            categoryId: d.categoryId ?? "",
            minRate: d.minRate ?? "",
            maxRate: d.maxRate ?? "",
            singleRate: d.singleRate ?? "",
          });
        })
        .catch(() => router.push("/cms/rates"))
        .finally(() => setLoading(false));
    }
  }, [isNew, id, router]);

  const set = (k: string, v: any) => setData((p) => ({ ...p, [k]: v }));

  async function handleSave() {
    if (!data.productName.trim()) { alert("Product name is required"); return; }
    if (!data.categoryId) { alert("Category is required"); return; }
    const payload: Record<string, any> = {
      categoryId: Number(data.categoryId),
      productName: data.productName.trim(),
      tenure: data.tenure || null,
      rateType: data.rateType || "fixed",
      minRate: data.minRate === "" ? null : Number(data.minRate),
      maxRate: data.maxRate === "" ? null : Number(data.maxRate),
      singleRate: data.singleRate === "" ? null : Number(data.singleRate),
      effectiveDate: data.effectiveDate || new Date().toISOString().slice(0, 10),
      notes: data.notes || null,
      status: data.status || "active",
    };
    setSaving(true);
    try {
      if (isNew) {
        await api.createRates(payload);
      } else {
        await api.updateRates(Number(id), payload);
      }
      router.push("/cms/rates");
    } catch (e) {
      alert("Save failed: " + e);
    }
    setSaving(false);
  }

  if (loading) return <CMSLayout><div className="h-96 animate-pulse rounded-lg bg-gray-200" /></CMSLayout>;

  const inputCls = "w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500";

  return (
    <CMSLayout>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/cms/rates" className="rounded p-1.5 text-gray-400 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h2 className="text-xl font-bold text-gray-900">{isNew ? "New Rate" : "Edit Rate"}</h2>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800 disabled:opacity-50">
          <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="rounded-lg border bg-white p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Category *</label>
            <select value={data.categoryId} onChange={(e) => set("categoryId", e.target.value)} className={inputCls}>
              <option value="">Select category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name || cat.slug}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
            <select value={data.status || "active"} onChange={(e) => set("status", e.target.value)} className={inputCls}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">Product Name *</label>
            <input value={data.productName || ""} onChange={(e) => set("productName", e.target.value)} placeholder="e.g. Normal Saving Account" className={inputCls} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Tenure</label>
            <input value={data.tenure || ""} onChange={(e) => set("tenure", e.target.value)} placeholder="e.g. 1 Year" className={inputCls} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Rate Type</label>
            <select value={data.rateType || "fixed"} onChange={(e) => set("rateType", e.target.value)} className={inputCls}>
              <option value="fixed">Fixed</option>
              <option value="floating">Floating</option>
              <option value="minimum">Minimum</option>
              <option value="maximum">Maximum</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Single Rate (%)</label>
            <input type="number" step="0.01" value={data.singleRate ?? ""} onChange={(e) => set("singleRate", e.target.value)} placeholder="e.g. 5.5" className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Min Rate (%)</label>
              <input type="number" step="0.01" value={data.minRate ?? ""} onChange={(e) => set("minRate", e.target.value)} placeholder="e.g. 6" className={inputCls} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Max Rate (%)</label>
              <input type="number" step="0.01" value={data.maxRate ?? ""} onChange={(e) => set("maxRate", e.target.value)} placeholder="e.g. 12" className={inputCls} />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Effective Date</label>
            <input type="date" value={data.effectiveDate || ""} onChange={(e) => set("effectiveDate", e.target.value)} className={inputCls} />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">Notes</label>
            <textarea rows={3} value={data.notes || ""} onChange={(e) => set("notes", e.target.value)} placeholder="e.g. Minimum Balance: Rs 1000" className={inputCls} />
          </div>
        </div>
      </div>
    </CMSLayout>
  );
}
