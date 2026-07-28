"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import CMSLayout from "@/components/cms/CMSLayout";
import { api } from "@/lib/api";
import { cmsResources } from "@/lib/cms-resources";

export default function CmsResourceEditPage({ params }: { params: Promise<{ resource: string; id: string }> }) {
  const { resource, id } = use(params);
  const router = useRouter();
  const config = cmsResources[resource];
  const isNew = id === "new";
  const [data, setData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew && config) {
      const method = `get${config.apiName}` as keyof typeof api;
      (api as any)[method](Number(id))
        .then((d: Record<string, any>) => setData(d))
        .catch(() => router.push(`/cms/${resource}`))
        .finally(() => setLoading(false));
    }
  }, [isNew, config, id, resource, router]);

  async function handleSave() {
    setSaving(true);
    try {
      if (isNew) {
        const method = `create${config.apiName}` as keyof typeof api;
        await (api as any)[method](data);
      } else {
        const method = `update${config.apiName}` as keyof typeof api;
        await (api as any)[method](Number(id), data);
      }
      router.push(`/cms/${resource}`);
    } catch (e) {
      alert("Save failed: " + e);
    }
    setSaving(false);
  }

  if (!config) return <CMSLayout><div className="text-red-600">Unknown resource</div></CMSLayout>;
  if (loading) return <CMSLayout><div className="h-96 animate-pulse rounded-lg bg-gray-200" /></CMSLayout>;

  return (
    <CMSLayout>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/cms/${resource}`} className="rounded p-1.5 text-gray-400 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h2 className="text-xl font-bold text-gray-900">
            {isNew ? `New ${config.title.slice(0, -1)}` : `Edit ${config.title.slice(0, -1)}`}
          </h2>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800 disabled:opacity-50">
          <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="rounded-lg border bg-white p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
            <input
              value={data.title || ""}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
            <select
              value={data.status || "draft"}
              onChange={(e) => setData({ ...data, status: e.target.value })}
              className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Language</label>
            <select
              value={data.language || "en"}
              onChange={(e) => setData({ ...data, language: e.target.value })}
              className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500"
            >
              <option value="en">English</option>
              <option value="np">नेपाली</option>
            </select>
          </div>
          {resource === "products" && (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Type</label>
                <select value={data.type || "savings"} onChange={(e) => setData({ ...data, type: e.target.value })}
                  className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500">
                  <option value="savings">Savings</option>
                  <option value="fixed">Fixed Deposit</option>
                  <option value="loan">Loan</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Sort Order</label>
                <input type="number" value={data.sortOrder || 0}
                  onChange={(e) => setData({ ...data, sortOrder: parseInt(e.target.value) })}
                  className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
              </div>
            </>
          )}
          {resource === "faq" && (
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Answer</label>
              <textarea rows={4} value={data.answer || ""}
                onChange={(e) => setData({ ...data, answer: e.target.value })}
                className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
            </div>
          )}
        </div>
      </div>
    </CMSLayout>
  );
}
