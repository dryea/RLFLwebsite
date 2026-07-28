"use client";

import { useEffect, useState } from "react";
import { MapPin, Phone } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import BranchMap from "@/components/shared/BranchMap";
import { getBranches } from "@/lib/public-api";

export default function BranchesPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("all");
  useEffect(() => { getBranches().then(setBranches).catch(() => {}); }, []);

  const filtered = filter === "all" ? branches : branches.filter((b: any) => b.region === filter);

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page"><h1 className="text-3xl font-bold">Branches</h1><p className="mt-2 text-primary-100">Find a branch near you</p></div>
      </section>
      <section className="py-12">
        <div className="container-page">
          <div className="mb-6 flex flex-wrap gap-2">
            {["all", "head-office", "inside-valley", "outside-valley"].map((r) => (
              <button key={r} onClick={() => setFilter(r)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${filter === r ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                {r === "all" ? "All" : r === "head-office" ? "Head Office" : r === "inside-valley" ? "Inside Valley" : "Outside Valley"}
              </button>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((b: any) => (
              <div key={b.id} className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900">{b.name}</h3>
                <div className="mt-3 space-y-2 text-sm text-gray-600">
                  <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" />{b.address}</p>
                  {b.phone && <a href={`tel:${b.phone}`} className="flex items-center gap-2 transition-colors hover:text-primary-700"><Phone className="h-4 w-4 shrink-0 text-primary-700" />{b.phone}</a>}
                </div>
                {b.bankingHours && <p className="mt-3 text-xs text-gray-400">{b.bankingHours}</p>}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <BranchMap branches={filtered} lang="en" />
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
