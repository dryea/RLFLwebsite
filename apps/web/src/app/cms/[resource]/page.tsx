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

  const columns = config.columns;

  const hasStatusFilter = columns.some((c) => c.key === "status");

  return (
    <CMSLayout>
      <CMSResourceList
        title={config.title}
        newLabel={config.newLabel}
        basePath={config.basePath}
        columns={columns}
        filters={hasStatusFilter ? [
          { key: "all", label: "All" },
          { key: "published", label: "Published" },
          { key: "draft", label: "Draft" },
          { key: "active", label: "Active" },
          { key: "pending", label: "Pending" },
        ] : undefined}
        fetchItems={fetchItems}
        onDelete={handleDelete}
      />
    </CMSLayout>
  );
}
