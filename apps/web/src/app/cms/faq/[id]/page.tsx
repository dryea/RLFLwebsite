"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import LanguageTabs from "@/components/cms/LanguageTabs";
import { api } from "@/lib/api";

export default function FaqEditorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({
    categoryId: "", question: "", questionNp: "", answer: "", answerNp: "",
    sortOrder: "0", isActive: true,
  });

  useEffect(() => {
    async function load() {
      try {
        const cats = await api.getFaqCategories().catch(() => []);
        setCategories(cats || []);
        if (!isNew) {
          const item = await api.getFaqById(parseInt(id));
          setForm({
            categoryId: String(item.categoryId || ""), question: item.question || "",
            questionNp: item.questionNp || "", answer: item.answer || "",
            answerNp: item.answerNp || "", sortOrder: String(item.sortOrder || 0),
            isActive: item.isActive ?? true,
          });
        }
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, [id, isNew]);

  async function handleSave() {
    if (!form.question.trim()) { alert("Question is required"); return; }
    if (!form.answer.trim()) { alert("Answer is required"); return; }
    setSaving(true);
    try {
      const data = {
        ...form,
        categoryId: form.categoryId ? parseInt(form.categoryId) : null,
        sortOrder: parseInt(form.sortOrder || "0") || 0,
      };
      if (isNew) await api.createFaq(data);
      else await api.updateFaq(parseInt(id), data);
      router.push("/cms/faq");
    } catch (e) { alert("Save failed: " + e); }
    setSaving(false);
  }

  if (loading) return <CMSLayout><div className="h-96 animate-pulse rounded-lg bg-gray-200" /></CMSLayout>;

  const inputCls = "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500";

  return (
    <CMSLayout>
      <div className="mb-6 flex items-center gap-4">
        <button onClick={() => router.back()} className="rounded-lg p-2 hover:bg-gray-100"><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-xl font-bold">{isNew ? "New FAQ" : "Edit FAQ"}</h1>
        <div className="ml-auto flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="rounded" />
            Active
          </label>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800 disabled:opacity-50">
            <Save className="h-4 w-4" />{saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <LanguageTabs active={activeLang} onChange={setActiveLang} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
            <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className={inputCls}>
              <option value="">Uncategorized</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          {activeLang === "en" ? (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Question *</label>
                <textarea value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} rows={2} className={inputCls} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Answer *</label>
                <textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={6} className={inputCls} />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Question (Nepali)</label>
                <textarea value={form.questionNp} onChange={(e) => setForm({ ...form, questionNp: e.target.value })} rows={2} className={inputCls} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Answer (Nepali)</label>
                <textarea value={form.answerNp} onChange={(e) => setForm({ ...form, answerNp: e.target.value })} rows={6} className={inputCls} />
              </div>
            </>
          )}
        </div>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Sort Order</label>
            <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} className={inputCls} />
          </div>
        </div>
      </div>
    </CMSLayout>
  );
}
