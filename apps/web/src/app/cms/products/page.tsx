"use client";

import { useCallback, useEffect, useState } from "react";
import CMSLayout from "@/components/cms/CMSLayout";
import CMSResourceList from "@/components/cms/CMSResourceList";
import { api } from "@/lib/api";
import { cmsResources } from "@/lib/cms-resources";

export default function CmsProductsPage() {
  const [items, setItems] = useState<any[]>([]);
  const config = cmsResources.products;

  useEffect(() => {
    Promise.all([
      api.getProducts(),
      api.getProductCategories().catch(() => []),
    ]).then(([products, categories]) => {
      const catMap = new Map((categories || []).map((c: any) => [c.id, c]));
      setItems((products || []).map((p: any) => ({
        ...p,
        categoryName: (catMap.get(p.categoryId) as any)?.name || "—",
      })));
    }).catch(console.error);
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    await api.deleteProducts(id);
    setItems((p) => p.filter((x) => x.id !== id));
  }, []);

  return (
    <CMSLayout>
      <CMSResourceList
        title={config.title}
        newLabel={config.newLabel}
        basePath={config.basePath}
        columns={config.columns}
        filters={[
          { key: "all", label: "All" },
          { key: "published", label: "Published" },
          { key: "draft", label: "Draft" },
        ]}
        fetchItems={() => Promise.resolve(items)}
        onDelete={handleDelete}
      />
    </CMSLayout>
  );
}
