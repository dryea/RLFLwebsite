"use client";

import { useMemo, useState } from "react";
import { MapPin, Phone, Mail, User, List, Map as MapIcon, Search } from "lucide-react";
import BranchMap from "./BranchMap";
import StaggerChildren, { StaggerItem } from "@/components/motion/StaggerChildren";

interface Branch {
  id: number;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  managerName?: string;
  region?: string;
  bankingHours?: string;
  latitude?: number;
  longitude?: number;
  nameNp?: string;
  addressNp?: string;
  image?: string;
  province?: string;
  district?: string;
  localBody?: string;
}

export default function BranchList({ branches, lang = "en" }: { branches: Branch[]; lang?: string }) {
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [provinceFilter, setProvinceFilter] = useState<string>("all");
  const [view, setView] = useState<"list" | "map">("list");
  const [query, setQuery] = useState("");

  const isNp = lang === "np";

  const provinces = useMemo(() => {
    const set = new Set<string>();
    branches.forEach((b) => {
      if (b.province) set.add(b.province);
    });
    return Array.from(set).sort();
  }, [branches]);

  const filtered = branches.filter((b) => {
    if (regionFilter !== "all" && b.region !== regionFilter) return false;
    if (provinceFilter !== "all" && b.province !== provinceFilter) return false;
    if (query) {
      const q = query.toLowerCase();
      const name = (b.name || "").toLowerCase();
      const addr = (b.address || "").toLowerCase();
      const dist = (b.district || "").toLowerCase();
      if (!name.includes(q) && !addr.includes(q) && !dist.includes(q)) return false;
    }
    return true;
  });

  const regionLabels: Record<string, string> = {
    all: isNp ? "सबै क्षेत्र" : "All Regions",
    "head-office": isNp ? "प्रधान कार्यालय" : "Head Office",
    "inside-valley": isNp ? "उपत्यका भित्र" : "Inside Valley",
    "outside-valley": isNp ? "उपत्यका बाहिर" : "Outside Valley",
  };

  const provinceLabels: Record<string, string> = {
    all: isNp ? "सबै प्रदेश" : "All Provinces",
  };

  const filterBtn = (active: boolean) =>
    `rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
      active ? "bg-primary-700 text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200 hover:bg-primary-50 hover:border-primary-300"
    }`;

  return (
    <>
      <div className="mb-5 space-y-4 rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {["all", "head-office", "inside-valley", "outside-valley"].map((r) => (
              <button key={r} onClick={() => setRegionFilter(r)} className={filterBtn(regionFilter === r)}>
                {regionLabels[r]}
              </button>
            ))}
          </div>
          <div className="flex overflow-hidden rounded-lg border">
            <button
              onClick={() => setView("list")}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium transition-colors ${view === "list" ? "bg-primary-700 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              <List className="h-4 w-4" /> {isNp ? "सूची" : "List"}
            </button>
            <button
              onClick={() => setView("map")}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium transition-colors ${view === "map" ? "bg-primary-700 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              <MapIcon className="h-4 w-4" /> {isNp ? "नक्सा" : "Map"}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setProvinceFilter("all")} className={filterBtn(provinceFilter === "all")}>
              {provinceLabels.all}
            </button>
            {provinces.map((p) => (
              <button key={p} onClick={() => setProvinceFilter(p)} className={filterBtn(provinceFilter === p)}>
                {p}
              </button>
            ))}
          </div>
          <div className="relative sm:ml-auto sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isNp ? "शाखा, जिल्ला खोज्नुहोस्..." : "Search branch or district..."}
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      {view === "map" ? (
        <div className="overflow-hidden rounded-xl border shadow-sm">
          <BranchMap branches={filtered} lang={lang} />
          <div className="border-t bg-white px-4 py-2 text-xs text-gray-500">
            {isNp ? `${filtered.length} शाखाहरू देखाइएको` : `Showing ${filtered.length} branches`}
          </div>
        </div>
      ) : (
        <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b) => (
            <StaggerItem key={b.id} className="h-full">
              <div className="flex h-full flex-col rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                {b.image && (
                  <img
                    src={b.image}
                    alt={b.name}
                    width={400}
                    height={160}
                    loading="lazy"
                    className="mb-4 h-32 w-full rounded-lg object-cover"
                  />
                )}
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{isNp && b.nameNp ? b.nameNp : b.name}</h3>
                  {b.province && (
                    <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-medium text-primary-700">{b.province}</span>
                  )}
                </div>
                <div className="mt-1 space-y-2 text-sm text-gray-600">
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" />
                    <span>
                      {isNp && b.addressNp ? b.addressNp : b.address}
                      {b.localBody && (
                        <span className="block text-xs text-gray-500">
                          {b.localBody}, {b.district}, {b.province}
                        </span>
                      )}
                    </span>
                  </p>
                  {b.phone && (
                    <a href={`tel:${b.phone}`} className="flex items-center gap-2 transition-colors hover:text-primary-700">
                      <Phone className="h-4 w-4 shrink-0 text-primary-700" />
                      {b.phone}
                    </a>
                  )}
                  {b.email && (
                    <a href={`mailto:${b.email}`} className="flex items-center gap-2 transition-colors hover:text-primary-700">
                      <Mail className="h-4 w-4 shrink-0 text-primary-700" />
                      {b.email}
                    </a>
                  )}
                  {b.managerName && (
                    <p className="flex items-center gap-2">
                      <User className="h-4 w-4 shrink-0 text-primary-700" />
                      <span>
                        <span className="text-xs text-gray-400">{isNp ? "शाखा प्रबन्धक: " : "Branch Manager: "}</span>
                        {b.managerName}
                      </span>
                    </p>
                  )}
                </div>
                {b.bankingHours && <p className="mt-3 text-xs text-gray-400">{b.bankingHours}</p>}
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      )}

      {view === "list" && filtered.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed p-12 text-center text-gray-400">
          <p className="text-sm">{isNp ? "कुनै शाखा फेला परेन" : "No branches found matching your filters"}</p>
        </div>
      )}
    </>
  );
}
