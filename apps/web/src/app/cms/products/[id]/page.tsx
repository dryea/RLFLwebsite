"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save, ArrowLeft, Plus, Trash2, Star, Flame } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import LanguageTabs from "@/components/cms/LanguageTabs";
import PhotoUpload from "@/components/cms/PhotoUpload";
import { api } from "@/lib/api";

const AUDIENCES = [
  { value: "personal", label: "Personal" },
  { value: "business", label: "Business" },
  { value: "digital", label: "Digital" },
];

// Common savings-account params
const DETAIL_FIELDS: Record<string, { key: string; label: string; placeholder?: string; type?: string; options?: string[] }[]> = {
  savings: [
    { key: "minBalance", label: "Minimum Balance (Rs.)", type: "number", placeholder: "e.g. 100" },
    { key: "interestPosting", label: "Interest Posting", type: "text", placeholder: "e.g. Quarterly" },
    { key: "freeDebitCard", label: "Free Debit Card", type: "text", placeholder: "e.g. First Year" },
    { key: "chequeBook", label: "Cheque Book", type: "text", placeholder: "e.g. Free first year" },
    { key: "monthlyAvgBalance", label: "Monthly Avg. Balance (Rs.)", type: "number", placeholder: "e.g. 500" },
    { key: "insuranceCover", label: "Insurance Cover (Rs.)", type: "number", placeholder: "e.g. 100000" },
  ],
  fixed: [
    { key: "tenureOptions", label: "Tenure Options", type: "text", placeholder: "e.g. 3 months to 5 years" },
    { key: "prematureWithdrawal", label: "Premature Withdrawal", type: "text", placeholder: "e.g. 0.5% penalty" },
    { key: "loanAgainstFd", label: "Loan Against FD", type: "text", placeholder: "e.g. up to 90%" },
    { key: "autoRenewal", label: "Auto Renewal", type: "text", placeholder: "e.g. Yes" },
    { key: "remittancePremium", label: "Remittance Premium", type: "text", placeholder: "e.g. +1.0%" },
  ],
  loan: [
    { key: "maxFinancing", label: "Max Financing", type: "text", placeholder: "e.g. up to 70% of property value" },
    { key: "maxTenureYears", label: "Max Tenure (years)", type: "number", placeholder: "e.g. 25" },
    { key: "interestStructure", label: "Interest Structure", type: "text", placeholder: "e.g. Base Rate + Premium 0.5-2.25%" },
    { key: "moratorium", label: "Moratorium Period", type: "text", placeholder: "e.g. up to 12 months" },
    { key: "collateral", label: "Collateral", type: "text", placeholder: "e.g. Property/hypothecation" },
    { key: "processingFee", label: "Processing Fee", type: "text", placeholder: "e.g. 1% of loan amount" },
  ],
};

export default function ProductEditorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({
    categoryId: "", title: "", titleNp: "", slug: "", summary: "", content: "",
    icon: "", bannerImage: "", features: [""], eligibility: [""],
    documentsRequired: [""], interestRateInfo: "", minAmount: "", maxAmount: "",
    maxTenure: "", metaTitle: "", metaDescription: "", status: "draft", sortOrder: "0",
    audience: "personal", isFeatured: false, isPopular: false, details: {} as Record<string, string>,
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
            audience: item.audience || "personal",
            isFeatured: item.isFeatured ?? false,
            isPopular: item.isPopular ?? false,
            details: item.details || {},
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

  function updateDetail(key: string, value: string) {
    setForm((prev) => ({ ...prev, details: { ...prev.details, [key]: value } }));
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
    if (!form.title.trim()) { alert("Title is required"); return; }
    if (!form.categoryId) { alert("Please select a category"); return; }
    setSaving(true);
    try {
      const data = {
        ...form,
        categoryId: parseInt(form.categoryId),
        minAmount: form.minAmount ? parseFloat(form.minAmount) : null,
        maxAmount: form.maxAmount ? parseFloat(form.maxAmount) : null,
        sortOrder: parseInt(form.sortOrder || "0") || 0,
        features: form.features.filter(Boolean),
        eligibility: form.eligibility.filter(Boolean),
        documentsRequired: form.documentsRequired.filter(Boolean),
        details: form.details,
      };
      if (isNew) await api.createProducts(data);
      else await api.updateProducts(parseInt(id), data);
      router.push("/cms/products");
    } catch (e) { alert("Save failed: " + e); }
    setSaving(false);
  }

  if (loading) return <CMSLayout><div className="h-96 animate-pulse rounded-lg bg-gray-200" /></CMSLayout>;

  const inputCls = "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500";
  const labelCls = "mb-1 block text-sm font-medium text-gray-700";

  const selectedCat = categories.find((c) => String(c.id) === form.categoryId);
  const catType = (selectedCat?.type || "savings") as keyof typeof DETAIL_FIELDS;
  const detailFields = DETAIL_FIELDS[catType] || [];

  return (
    <CMSLayout>
      <div className="mb-6 flex items-center gap-4">
        <button onClick={() => router.back()} className="rounded-lg p-2 hover:bg-gray-100"><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-xl font-bold">{isNew ? "New Product" : "Edit Product"}</h1>
        <div className="ml-auto flex items-center gap-2">
          <select value={form.status} onChange={(e) => updateField("status", e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
            <option value="draft">Draft</option><option value="published">Published</option>
          </select>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800">
            <Save className="h-4 w-4" />{saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <LanguageTabs active={activeLang} onChange={setActiveLang} />

      {/* Type + Audience + Badges */}
      <div className="mb-6 grid gap-4 rounded-lg border bg-white p-5 md:grid-cols-4">
        <div>
          <label className={labelCls}>Category *</label>
          <select value={form.categoryId} onChange={(e) => updateField("categoryId", e.target.value)} className={inputCls}>
            <option value="">Select...</option>
            {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Audience</label>
          <select value={form.audience} onChange={(e) => updateField("audience", e.target.value)} className={inputCls}>
            {AUDIENCES.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Product Flags</label>
          <div className="flex items-center gap-4 pt-2">
            <label className="flex items-center gap-1.5 text-sm text-gray-700">
              <input type="checkbox" checked={form.isPopular} onChange={(e) => updateField("isPopular", e.target.checked)} className="rounded" />
              <Flame className="h-3.5 w-3.5 text-orange-500" /> Popular
            </label>
            <label className="flex items-center gap-1.5 text-sm text-gray-700">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => updateField("isFeatured", e.target.checked)} className="rounded" />
              <Star className="h-3.5 w-3.5 text-amber-500" /> Featured
            </label>
          </div>
        </div>
        <div>
          <label className={labelCls}>Sort Order</label>
          <input type="number" value={form.sortOrder} onChange={(e) => updateField("sortOrder", e.target.value)} className={inputCls} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {activeLang === "en" ? (
            <div>
              <label className={labelCls}>Title *</label>
              <input value={form.title} onChange={(e) => updateField("title", e.target.value)} className={inputCls} />
            </div>
          ) : (
            <div>
              <label className={labelCls}>Title (Nepali)</label>
              <input value={form.titleNp} onChange={(e) => updateField("titleNp", e.target.value)} className={inputCls} />
            </div>
          )}
          <div>
            <label className={labelCls}>Slug</label>
            <input value={form.slug} onChange={(e) => updateField("slug", e.target.value)} className={inputCls} placeholder="auto-generated if empty" />
          </div>
          <div>
            <label className={labelCls}>Summary</label>
            <textarea value={form.summary} onChange={(e) => updateField("summary", e.target.value)} rows={3} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Content (HTML)</label>
            <textarea value={form.content} onChange={(e) => updateField("content", e.target.value)} rows={8} className={`${inputCls} font-mono`} />
          </div>
          <div>
            <label className={labelCls}>Icon</label>
            <input value={form.icon} onChange={(e) => updateField("icon", e.target.value)} className={inputCls} placeholder="emoji or icon name" />
          </div>
          <PhotoUpload value={form.bannerImage} onChange={(url) => updateField("bannerImage", url)} label="Banner Image" />
        </div>

        <div className="space-y-4">
          {/* Type-specific details */}
          {detailFields.length > 0 && (
            <div className="rounded-lg border border-primary-100 bg-primary-50/40 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-primary-700">
                {catType === "savings" ? "Savings Account Parameters" : catType === "fixed" ? "Fixed Deposit Parameters" : "Loan Parameters"}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {detailFields.map((f) => (
                  <div key={f.key}>
                    <label className={labelCls}>{f.label}</label>
                    <input
                      type={f.type === "number" ? "number" : "text"}
                      value={form.details[f.key] || ""}
                      onChange={(e) => updateDetail(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      className={inputCls}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={labelCls}>Min Amount</label>
              <input type="number" value={form.minAmount} onChange={(e) => updateField("minAmount", e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Max Amount</label>
              <input type="number" value={form.maxAmount} onChange={(e) => updateField("maxAmount", e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Max Tenure</label>
              <input value={form.maxTenure} onChange={(e) => updateField("maxTenure", e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Interest Rate Info</label>
            <textarea value={form.interestRateInfo} onChange={(e) => updateField("interestRateInfo", e.target.value)} rows={2} className={inputCls} />
          </div>

          <ArrayEditor label="Features" field="features" form={form} updateArrayField={updateArrayField} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} inputCls={inputCls} />
          <ArrayEditor label="Eligibility" field="eligibility" form={form} updateArrayField={updateArrayField} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} inputCls={inputCls} />
          <ArrayEditor label="Documents Required" field="documentsRequired" form={form} updateArrayField={updateArrayField} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} inputCls={inputCls} />

          <div>
            <label className={labelCls}>Meta Title</label>
            <input value={form.metaTitle} onChange={(e) => updateField("metaTitle", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Meta Description</label>
            <textarea value={form.metaDescription} onChange={(e) => updateField("metaDescription", e.target.value)} rows={2} className={inputCls} />
          </div>
        </div>
      </div>
    </CMSLayout>
  );
}

function ArrayEditor({ label, field, form, updateArrayField, addArrayItem, removeArrayItem, inputCls }: any) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      {form[field].map((v: string, i: number) => (
        <div key={i} className="mb-2 flex gap-2">
          <input value={v} onChange={(e) => updateArrayField(field, i, e.target.value)} className={`flex-1 ${inputCls}`} />
          <button onClick={() => removeArrayItem(field, i)} className="rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
        </div>
      ))}
      <button onClick={() => addArrayItem(field)} className="flex items-center gap-1 text-sm text-primary-700"><Plus className="h-4 w-4" /> Add</button>
    </div>
  );
}
