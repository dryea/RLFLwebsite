"use client";

import { useCallback, use } from "react";
import CMSLayout from "@/components/cms/CMSLayout";
import CMSResourceList from "@/components/cms/CMSResourceList";
import { api } from "@/lib/api";
import { cmsResources } from "@/lib/cms-resources";

export default function CmsResourceListPage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = use(params);
  const config = cmsResources[resource];

  const fetchItems = useCallback(() => {
    const method = `get${config.apiName}` as keyof typeof api;
    return (api as any)[method]();
  }, [config.apiName]);

  const handleDelete = useCallback((id: number) => {
    const method = `delete${config.apiName}` as keyof typeof api;
    return (api as any)[method](id);
  }, [config.apiName]);

  if (!config) return <CMSLayout><div className="text-red-600">Resource not found</div></CMSLayout>;

  return (
    <CMSLayout>
      <CMSResourceList
        title={config.title}
        newLabel={config.newLabel}
        basePath={config.basePath}
        columns={[
          { key: "title" as string, label: "Title" },
          { key: "status", label: "Status", render: (v: string) => (
            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
              v === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
            }`}>{v}</span>
          )},
        ]}
        fetchItems={fetchItems}
        onDelete={handleDelete}
      />
    </CMSLayout>
  );
}
