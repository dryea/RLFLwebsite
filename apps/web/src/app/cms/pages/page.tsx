"use client";

import { useCallback } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import CMSResourceList from "@/components/cms/CMSResourceList";
import { api } from "@/lib/api";

export default function CmsPagesPage() {
  const fetchItems = useCallback(() => api.getPages(), []);
  const handleDelete = useCallback((id: number) => api.deletePage(id), []);

  return (
    <CMSLayout>
      <CMSResourceList
        title="Pages"
        newLabel="New Page"
        basePath="/cms/pages"
        columns={[
          { key: "title", label: "Title" },
          { key: "slug", label: "Slug", render: (v: string) => <span className="text-gray-500">/{v}</span> },
          {
            key: "status",
            label: "Status",
            render: (v: string) => (
              <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                v === "published" ? "bg-green-100 text-green-800" : v === "scheduled" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
              }`}>{v}</span>
            ),
          },
          { key: "language", label: "Lang", render: (v: string) => <span className="uppercase text-gray-500">{v}</span> },
          {
            key: "updatedAt",
            label: "Updated",
            render: (v: string) => <span className="text-gray-500">{v ? new Date(v).toLocaleDateString() : "—"}</span>,
          },
          {
            key: "id",
            label: "View",
            render: (_: any, row: any) => (
              <a href={`/${row.language}/${row.slug}`} target="_blank" className="inline-flex rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700">
                <ExternalLink className="h-4 w-4" />
              </a>
            ),
          },
        ]}
        filters={[
          { key: "all", label: "All" },
          { key: "published", label: "Published" },
          { key: "draft", label: "Draft" },
          { key: "scheduled", label: "Scheduled" },
        ]}
        fetchItems={fetchItems}
        onDelete={handleDelete}
      />
      <div className="mt-4">
        <Link href="/cms/pages/new" data-coach="new-page" className="hidden">New Page</Link>
      </div>
    </CMSLayout>
  );
}
