"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Package, Newspaper, Image } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import { api } from "@/lib/api";

const modules = [
  { label: "Pages", icon: FileText, href: "/cms/pages", color: "bg-blue-50 text-blue-700", key: "pages" as const },
  { label: "Products", icon: Package, href: "/cms/products", color: "bg-green-50 text-green-700", key: "products" as const },
  { label: "News", icon: Newspaper, href: "/cms/news", color: "bg-purple-50 text-purple-700", key: "news" as const },
  { label: "Media", icon: Image, href: "/cms/media", color: "bg-amber-50 text-amber-700", key: "media" as const },
];

export default function CmsDashboardPage() {
  const [stats, setStats] = useState<Record<string, number>>({});

  useEffect(() => {
    api.getStats().then(setStats).catch(console.error);
  }, []);

  return (
    <CMSLayout>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <Link key={m.href} href={m.href} className="rounded-xl border bg-white p-6 transition-shadow hover:shadow-md">
              <div className={m.color}>
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="font-semibold text-gray-900">{m.label}</h2>
              <p className="mt-1 text-2xl font-bold text-gray-900">{stats[m.key] ?? "—"}</p>
            </Link>
          );
        })}
      </div>
    </CMSLayout>
  );
}

