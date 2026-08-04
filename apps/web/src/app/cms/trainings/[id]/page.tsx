"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import { api } from "@/lib/api";

export default function TrainingEditorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    year: "", date: "", name: "", position: "", branch: "",
    program: "", organizer: "", resourcePerson: "", duration: "",
  });

  useEffect(() => {
    async function load() {
      try {
        if (!isNew) {
          const item = await api.getTrainingsById(parseInt(id));
          setForm({
            year: item.year || "", date: item.date || "", name: item.name || "",
            position: item.position || "", branch: item.branch || "",
            program: item.program || "", organizer: item.organizer || "",
            resourcePerson: item.resourcePerson || "", duration: item.duration || "",
          });
        }
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, [id, isNew]);

  async function handleSave() {
    if (!form.program.trim()) { alert("Program name is required"); return; }
    if (!form.date.trim()) { alert("Date is required"); return; }
    setSaving(true);
    try {
      const data = { ...form };
      // Derive year from date if empty
      if (!data.year && data.date) data.year = data.date.slice(0, 4);
      if (isNew) await api.createTrainings(data);
      else await api.updateTrainings(parseInt(id), data);
      router.push("/cms/trainings");
    } catch (e) { alert("Save failed: " + e); }
    setSaving(false);
  }

  if (loading) return <CMSLayout><div className="h-96 animate-pulse rounded-lg bg-gray-200" /></CMSLayout>;

  const inputCls = "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500";
  const labelCls = "mb-1 block text-sm font-medium text-gray-700";

  return (
    <CMSLayout>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="rounded p-1.5 text-gray-400 hover:bg-gray-100"><ArrowLeft className="h-5 w-5" /></button>
          <h1 className="text-xl font-bold">{isNew ? "New Training Record" : "Edit Training Record"}</h1>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800 disabled:opacity-50">
          <Save className="h-4 w-4" />{saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="rounded-lg border bg-white p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelCls}>Program Name *</label>
            <input value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Date (BS) *</label>
            <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="e.g. 2082-04-10" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Year (BS)</label>
            <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="e.g. 2082-2083" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Staff Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Position</label>
            <input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Branch</label>
            <input value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Organizer</label>
            <input value={form.organizer} onChange={(e) => setForm({ ...form, organizer: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Resource Person</label>
            <input value={form.resourcePerson} onChange={(e) => setForm({ ...form, resourcePerson: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Duration</label>
            <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 1 Day" className={inputCls} />
          </div>
        </div>
      </div>
    </CMSLayout>
  );
}
