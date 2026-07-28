"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import LanguageTabs from "@/components/cms/LanguageTabs";
import { api } from "@/lib/api";

export default function BranchEditorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const [form, setForm] = useState({
    name: "", nameNp: "", address: "", addressNp: "", phone: "", email: "",
    latitude: "", longitude: "", region: "", services: [""],
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
            phone: item.phone || "", email: item.email || "",
            latitude: item.latitude?.toString() || "", longitude: item.longitude?.toString() || "",
            region: item.region || "",
            services: item.services?.length ? item.services : [""],
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
        latitude: form.latitude ? parseFloat(form.latitude) : null,
        longitude: form.longitude ? parseFloat(form.longitude) : null,
        sortOrder: parseInt(form.sortOrder),
        services: form.services.filter(Boolean),
      };
      if (isNew) await api.createBranches(data);
      else await api.updateBranches(parseInt(id), data);
      router.push("/cms/branches");
    } catch (e) { console.error(e); }
    setSaving(false);
  }

  if (loading) return <CMSLayout><div className="p-8 text-center text-gray-500">Loading...</div></CMSLayout>;

  return (
    <CMSLayout>
      <div className="mb-6 flex items-center gap-4">
        <button onClick={() => router.back()} className="rounded-lg p-2 hover:bg-gray-100"><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-xl font-bold">{isNew ? "New Branch" : "Edit Branch"}</h1>
        <div className="ml-auto flex gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.isActive} onChange={(e) => updateField("isActive", e.target.checked)} className="rounded" />
            Active
          </label>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800">
            <Save className="h-4 w-4" />{saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <LanguageTabs active={activeLang} onChange={setActiveLang} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {activeLang === "en" ? (
            <>
              <div><label className="mb-1 block text-sm font-medium">Name</label>
                <input value={form.name} onChange={(e) => updateField("name", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
              <div><label className="mb-1 block text-sm font-medium">Address</label>
                <input value={form.address} onChange={(e) => updateField("address", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            </>
          ) : (
            <>
              <div><label className="mb-1 block text-sm font-medium">Name (Nepali)</label>
                <input value={form.nameNp} onChange={(e) => updateField("nameNp", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
              <div><label className="mb-1 block text-sm font-medium">Address (Nepali)</label>
                <input value={form.addressNp} onChange={(e) => updateField("addressNp", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            </>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1 block text-sm font-medium">Phone</label>
              <input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div><label className="mb-1 block text-sm font-medium">Email</label>
              <input value={form.email} onChange={(e) => updateField("email", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1 block text-sm font-medium">Latitude</label>
              <input type="number" step="any" value={form.latitude} onChange={(e) => updateField("latitude", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
            <div><label className="mb-1 block text-sm font-medium">Longitude</label>
              <input type="number" step="any" value={form.longitude} onChange={(e) => updateField("longitude", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          </div>
          <div><label className="mb-1 block text-sm font-medium">Region</label>
            <input value={form.region} onChange={(e) => updateField("region", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
        </div>

        <div className="space-y-4">
          {activeLang === "en" ? (
            <div><label className="mb-1 block text-sm font-medium">Banking Hours</label>
              <textarea value={form.bankingHours} onChange={(e) => updateField("bankingHours", e.target.value)} rows={2} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          ) : (
            <div><label className="mb-1 block text-sm font-medium">Banking Hours (Nepali)</label>
              <textarea value={form.bankingHoursNp} onChange={(e) => updateField("bankingHoursNp", e.target.value)} rows={2} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          )}
          <div><label className="mb-1 block text-sm font-medium">Manager Name</label>
            <input value={form.managerName} onChange={(e) => updateField("managerName", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          <div><label className="mb-1 block text-sm font-medium">Image URL</label>
            <input value={form.image} onChange={(e) => updateField("image", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
          <div><label className="mb-1 block text-sm font-medium">Sort Order</label>
            <input type="number" value={form.sortOrder} onChange={(e) => updateField("sortOrder", e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>

          <div><label className="mb-1 block text-sm font-medium">Services</label>
            {form.services.map((f, i) => (
              <div key={i} className="mb-2 flex gap-2">
                <input value={f} onChange={(e) => updateArrayField("services", i, e.target.value)} className="flex-1 rounded-lg border px-3 py-2 text-sm" />
                <button onClick={() => removeArrayItem("services", i)} className="rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
            <button onClick={() => addArrayItem("services")} className="flex items-center gap-1 text-sm text-primary-700"><Plus className="h-4 w-4" /> Add service</button></div>
        </div>
      </div>
    </CMSLayout>
  );
}
