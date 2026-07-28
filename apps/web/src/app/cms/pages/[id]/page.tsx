"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Send, Calendar } from "lucide-react";
import Link from "next/link";
import CMSLayout from "@/components/cms/CMSLayout";
import TipTapEditor from "@/components/cms/TipTapEditor";
import LanguageTabs from "@/components/cms/LanguageTabs";
import { api, API } from "@/lib/api";

export default function CmsPageEditorPage() {
  const params = useParams();
  const router = useRouter();
  const isNew = params.id === "new";
  const pageId = isNew ? null : Number(params.id);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [language, setLanguage] = useState("en");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [scheduledAt, setScheduledAt] = useState<string | null>(null);
  const [titleNp, setTitleNp] = useState("");
  const [contentNp, setContentNp] = useState("");
  const [activeLang, setActiveLang] = useState("en");
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (pageId) {
      api.getPage(pageId).then((p: any) => {
        setTitle(p.title);
        setSlug(p.slug);
        setContent(p.content || "");
        setStatus(p.status);
        setLanguage(p.language);
        setMetaTitle(p.metaTitle || "");
        setMetaDescription(p.metaDescription || "");
        setScheduledAt(p.scheduledAt || null);
        setTitleNp(p.titleNp || "");
        setContentNp(p.contentNp || "");
        setLoading(false);
      }).catch(() => router.push("/cms/pages"));
    }
  }, [pageId, router]);

  function generateSlug(val: string) {
    if (isNew && !slug) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    }
  }

  async function handleSave(publish = false) {
    setSaving(true);
    const data = { title, slug, content, titleNp, contentNp, status: publish ? "published" : "draft", language, metaTitle, metaDescription };
    try {
      if (pageId) {
        await api.updatePage(pageId, data);
      } else {
        const created = await api.createPage(data);
        router.replace(`/cms/pages/${created.id}`);
      }
    } catch (e) {
      alert("Failed to save: " + e);
    }
    setSaving(false);
  }

  async function handleSchedule() {
    if (!pageId) return;
    setSaving(true);
    try {
      await api.updatePage(pageId, { title, slug, content, titleNp, contentNp, language, metaTitle, metaDescription });
      const scheduleAt = scheduledAt || new Date(Date.now() + 3600000).toISOString();
      await fetch(`${API}/api/cms/pages/${pageId}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("cms_token")}` },
        body: JSON.stringify({ scheduledAt: scheduleAt }),
      });
      router.refresh();
    } catch (e) { console.error(e); }
    setSaving(false);
  }

  if (loading) return <CMSLayout><div className="h-96 animate-pulse rounded-lg bg-gray-200" /></CMSLayout>;

  return (
    <CMSLayout>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/cms/pages" className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h2 className="text-xl font-bold text-gray-900">{isNew ? "New Page" : "Edit Page"}</h2>
          {!isNew && (
            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
              status === "published" ? "bg-green-100 text-green-800" : status === "scheduled" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
            }`}>{status}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => handleSave(false)} disabled={saving} className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50">
            <Save className="h-4 w-4" /> Save Draft
          </button>
          <button
            onClick={handleSchedule}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg border border-primary-700 px-4 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50"
          >
            <Calendar className="h-4 w-4" />
            {scheduledAt ? "Reschedule" : "Schedule"}
          </button>
          <button onClick={() => handleSave(true)} disabled={saving} className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-800 disabled:opacity-50">
            <Send className="h-4 w-4" /> Publish
          </button>
        </div>
      </div>

      <LanguageTabs active={activeLang} onChange={setActiveLang} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {activeLang === "en" ? (
            <>
              <input
                type="text"
                value={title}
                onChange={(e) => { setTitle(e.target.value); generateSlug(e.target.value); }}
                placeholder="Page title"
                className="w-full rounded-lg border px-4 py-3 text-lg font-bold outline-none transition-colors focus:border-primary-500"
              />
              <TipTapEditor content={content} onChange={setContent} />
            </>
          ) : (
            <>
              <input
                type="text"
                value={titleNp}
                onChange={(e) => setTitleNp(e.target.value)}
                placeholder="पृष्ठ शीर्षक"
                className="w-full rounded-lg border px-4 py-3 text-lg font-bold outline-none transition-colors focus:border-primary-500"
              />
              <TipTapEditor content={contentNp} onChange={setContentNp} />
            </>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border bg-white p-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">Page Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Slug</label>
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <span>/</span>
                  <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full rounded border px-2 py-1 text-sm outline-none focus:border-primary-500" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full rounded border px-2 py-1.5 text-sm outline-none focus:border-primary-500">
                  <option value="en">English</option>
                  <option value="np">नेपाली</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded border px-2 py-1.5 text-sm outline-none focus:border-primary-500">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
              <div className="border-t pt-4 mt-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">Schedule Publication</label>
                <input
                  type="datetime-local"
                  value={scheduledAt ? scheduledAt.slice(0, 16) : ""}
                  onChange={(e) => setScheduledAt(e.target.value ? new Date(e.target.value).toISOString() : null)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
                {scheduledAt && (
                  <p className="mt-1 text-xs text-amber-600">
                    Scheduled for: {new Date(scheduledAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">SEO</h3>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Meta Title</label>
                <input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="w-full rounded border px-2 py-1.5 text-sm outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Meta Description</label>
                <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={3} className="w-full rounded border px-2 py-1.5 text-sm outline-none focus:border-primary-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CMSLayout>
  );
}
