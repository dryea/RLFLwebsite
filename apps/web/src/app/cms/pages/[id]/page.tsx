"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Send, Clock } from "lucide-react";
import Link from "next/link";
import CMSLayout from "@/components/cms/CMSLayout";
import TipTapEditor from "@/components/cms/TipTapEditor";
import { api } from "@/lib/api";

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
    const data = { title, slug, content, status: publish ? "published" : "draft", language, metaTitle, metaDescription };
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
              status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
            }`}>{status}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => handleSave(false)} disabled={saving} className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50">
            <Save className="h-4 w-4" /> Save Draft
          </button>
          <button onClick={() => handleSave(true)} disabled={saving} className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-800 disabled:opacity-50">
            <Send className="h-4 w-4" /> Publish
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <input
            type="text"
            value={title}
            onChange={(e) => { setTitle(e.target.value); generateSlug(e.target.value); }}
            placeholder="Page title"
            className="w-full rounded-lg border px-4 py-3 text-lg font-bold outline-none transition-colors focus:border-primary-500"
          />

          <TipTapEditor content={content} onChange={setContent} />
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
                </select>
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
