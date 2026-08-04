"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import LanguageTabs from "@/components/cms/LanguageTabs";
import PhotoUpload from "@/components/cms/PhotoUpload";
import AddressFields from "@/components/shared/AddressFields";
import { api } from "@/lib/api";

const REGION_OPTIONS = [
  { value: "head-office", label: "Head Office" },
  { value: "inside-valley", label: "Inside Valley" },
  { value: "outside-valley", label: "Outside Valley" },
];

const SERVICE_OPTIONS = [
  "Savings Account", "Fixed Deposit", "Loan Services", "Mobile Banking",
  "SMS Banking", "Debit Card", "Remittance", "ABBS", "Connect IPS",
  "Lockers", "Trade Finance", "Bill Payment",
];

export default function BranchEditorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const [form, setForm] = useState({
    name: "", nameNp: "", address: "", addressNp: "",
    province: "", district: "", localBody: "",
    phone: "", email: "",
    latitude: "", longitude: "", region: "", services: [] as string[],
    bankingHours: "", bankingHoursNp: "", managerName: "", image: "",
    sortOrder: "0", isActive: true,
  });

  useEffect(() => {
    async function load() {
      try {
        if (!isNew) {
          const item = await api.getBranchesById(parseInt(id));
          setForm({
            name: item.name || "", nameNp: item.nameNp || "",
            address: item.address || "", addressNp: item.addressNp || "",
            province: item.province || "", district: item.district || "", localBody: item.localBody || "",
            phone: item.phone || "", email: item.email || "",
            latitude: item.latitude?.toString() || "", longitude: item.longitude?.toString() || "",
            region: item.region || "",
            services: Array.isArray(item.services) ? item.services : [],
            bankingHours: item.bankingHours || "", bankingHoursNp: item.bankingHoursNp || "",
            managerName: item.managerName || "", image: item.image || "",
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

  function toggleService(svc: string) {
    setForm((prev) => {
      const has = prev.services.includes(svc);
      return { ...prev, services: has ? prev.services.filter((s) => s !== svc) : [...prev.services, svc] };
    });
  }

  async function handleSave() {
    if (!form.name.trim()) { alert("Branch name is required"); return; }
    if (!form.region) { alert("Please select a region"); return; }
    if (!form.province || !form.district || !form.localBody) {
      alert("Please select province, district, and local body"); return;
    }
    setSaving(true);
    try {
      const data = {
        ...form,
        latitude: form.latitude ? parseFloat(form.latitude) : null,
        longitude: form.longitude ? parseFloat(form.longitude) : null,
        sortOrder: parseInt(form.sortOrder || "0") || 0,
        services: form.services,
      };
      if (isNew) await api.createBranches(data);
      else await api.updateBranches(parseInt(id), data);
      router.push("/cms/branches");
    } catch (e) { alert("Save failed: " + e); }
    setSaving(false);
  }

  if (loading) return <CMSLayout><div className="h-96 animate-pulse rounded-lg bg-gray-200" /></CMSLayout>;

  const inputCls = "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500";

  return (
    <CMSLayout>
      <div className="mb-6 flex items-center gap-4">
        <button onClick={() => router.back()} className="rounded-lg p-2 hover:bg-gray-100"><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-xl font-bold">{isNew ? "New Branch" : "Edit Branch"}</h1>
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
        <label className="mb-1 block text-sm font-medium text-gray-700">Region *</label>
        <select value={form.region} onChange={(e) => updateField("region", e.target.value)} className={inputCls}>
          <option value="">Select region...</option>
          {REGION_OPTIONS.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {activeLang === "en" ? (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Branch Name *</label>
              <input value={form.name} onChange={(e) => updateField("name", e.target.value)} className={inputCls} placeholder="e.g. Butwal Branch" />
            </div>
          ) : (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Branch Name (Nepali)</label>
              <input value={form.nameNp} onChange={(e) => updateField("nameNp", e.target.value)} className={inputCls} />
            </div>
          )}

          <div className="rounded-lg border border-gray-100 bg-gray-50/60 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
              {activeLang === "en" ? "Location (Province → District → Local Body)" : "स्थान (प्रदेश → जिल्ला → स्थानीय तह)"}
            </p>
            <AddressFields
              value={{ province: form.province, district: form.district, localBody: form.localBody, address: form.address }}
              onChange={(v) => setForm((prev) => ({ ...prev, province: v.province, district: v.district, localBody: v.localBody, address: v.address }))}
              lang="en"
              showAddress
              required
            />
            {activeLang === "np" && (
              <div className="mt-3">
                <label className="mb-1 block text-sm font-medium text-gray-700">Address (Nepali)</label>
                <input value={form.addressNp} onChange={(e) => updateField("addressNp", e.target.value)} className={inputCls} />
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
              <input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className={inputCls} placeholder="+977-..." />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Latitude</label>
              <input type="number" step="any" value={form.latitude} onChange={(e) => updateField("latitude", e.target.value)} className={inputCls} placeholder="e.g. 27.6958" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Longitude</label>
              <input type="number" step="any" value={form.longitude} onChange={(e) => updateField("longitude", e.target.value)} className={inputCls} placeholder="e.g. 83.4496" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Manager Name</label>
            <input value={form.managerName} onChange={(e) => updateField("managerName", e.target.value)} className={inputCls} />
          </div>
        </div>

        <div className="space-y-4">
          <PhotoUpload value={form.image} onChange={(url) => updateField("image", url)} label="Branch Image" />

          {activeLang === "en" ? (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Banking Hours</label>
              <textarea value={form.bankingHours} onChange={(e) => updateField("bankingHours", e.target.value)} rows={2} className={inputCls} placeholder="Sun-Thu: 10:00 AM - 5:00 PM" />
            </div>
          ) : (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Banking Hours (Nepali)</label>
              <textarea value={form.bankingHoursNp} onChange={(e) => updateField("bankingHoursNp", e.target.value)} rows={2} className={inputCls} />
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Services</label>
            <div className="flex flex-wrap gap-1.5">
              {SERVICE_OPTIONS.map((svc) => {
                const active = form.services.includes(svc);
                return (
                  <button
                    key={svc}
                    type="button"
                    onClick={() => toggleService(svc)}
                    className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${active ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  >
                    {svc}
                  </button>
                );
              })}
            </div>
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
