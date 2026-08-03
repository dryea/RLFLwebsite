"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import { getServices } from "@/lib/public-api";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  useEffect(() => { getServices().then(setServices).catch(() => {}); }, []);

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page"><h1 className="text-3xl font-bold">Our Services</h1><p className="mt-2 text-primary-100">Digital banking services at your fingertips</p></div>
      </section>
      <section className="py-12">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc: any) => (
              <Link key={svc.id} href={`/services/${svc.slug}`} className="group rounded-xl border bg-white p-6 transition-shadow hover:shadow-md">
                <div className="mb-3 text-2xl">{svc.icon || "📱"}</div>
                <h3 className="font-semibold text-gray-900">{svc.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{svc.summary}</p>
                <span className="mt-3 flex items-center gap-1 text-sm font-medium text-primary-700 group-hover:underline">Learn More <ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
