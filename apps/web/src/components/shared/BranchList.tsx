"use client";

import { useMemo, useState } from "react";
import { MapPin, Phone, Mail, User, List, Map as MapIcon, Search, Clock, Building } from "lucide-react";
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

export default function BranchList({ branches = [], lang = "en" }: { branches: Branch[]; lang?: string }) {
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
    if (regionFilter !== "all") {
      const isHeadOffice = b.region === "head-office" || b.name?.toLowerCase().includes("head office");
      const isValley =
        b.region === "inside-valley" ||
        ["Kathmandu", "Lalitpur", "Bhaktapur"].includes(b.district || "") ||
        b.address?.toLowerCase().includes("kathmandu") ||
        b.address?.toLowerCase().includes("lalitpur");

      if (regionFilter === "head-office" && !isHeadOffice) return false;
      if (regionFilter === "inside-valley" && (!isValley || isHeadOffice)) return false;
      if (regionFilter === "outside-valley" && (isHeadOffice || isValley)) return false;
    }
    if (provinceFilter !== "all" && b.province !== provinceFilter) return false;
    if (query) {
      const q = query.toLowerCase();
      const name = (b.name || "").toLowerCase();
      const nameNp = (b.nameNp || "").toLowerCase();
      const addr = (b.address || "").toLowerCase();
      const addrNp = (b.addressNp || "").toLowerCase();
      const dist = (b.district || "").toLowerCase();
      const prov = (b.province || "").toLowerCase();
      if (!name.includes(q) && !nameNp.includes(q) && !addr.includes(q) && !addrNp.includes(q) && !dist.includes(q) && !prov.includes(q)) return false;
    }
    return true;
  });

  const regionLabels: Record<string, string> = {
    all: isNp ? "सबै क्षेत्र" : "All Regions",
    "head-office": isNp ? "प्रमुख कार्यालय" : "Head Office",
    "inside-valley": isNp ? "उपत्यका भित्र" : "Inside Valley",
    "outside-valley": isNp ? "उपत्यका बाहिर" : "Outside Valley",
  };

  const provinceLabels: Record<string, string> = {
    all: isNp ? "सबै प्रदेश" : "All Provinces",
  };

  const filterBtn = (active: boolean) =>
    `rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
      active
        ? "bg-primary-700 text-white shadow-sm"
        : "bg-white text-gray-600 border border-gray-200 hover:bg-primary-50 hover:border-primary-300"
    }`;

  return (
    <>
      <div className="mb-6 space-y-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {["all", "head-office", "inside-valley", "outside-valley"].map((r) => (
              <button key={r} onClick={() => setRegionFilter(r)} className={filterBtn(regionFilter === r)}>
                {regionLabels[r]}
              </button>
            ))}
          </div>
          <div className="flex overflow-hidden rounded-xl border border-gray-200">
            <button
              onClick={() => setView("list")}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold transition-colors ${
                view === "list" ? "bg-primary-700 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <List className="h-3.5 w-3.5" /> {isNp ? "सूची" : "List"}
            </button>
            <button
              onClick={() => setView("map")}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold transition-colors ${
                view === "map" ? "bg-primary-700 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <MapIcon className="h-3.5 w-3.5" /> {isNp ? "नक्सा" : "Map"}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {provinces.length > 0 && (
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
          )}
          <div className="relative sm:ml-auto sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isNp ? "शाखा, जिल्ला, ठेगाना खोज्नुहोस्..." : "Search branch, district, address..."}
              className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-xs outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>
        </div>
      </div>

      {view === "map" ? (
        <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
          <BranchMap branches={filtered} lang={lang} />
          <div className="border-t bg-white px-5 py-3 text-xs font-medium text-gray-500">
            {isNp ? `${filtered.length} शाखाहरू देखाइएको` : `Showing ${filtered.length} branch locations`}
          </div>
        </div>
      ) : (
        <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b) => (
            <StaggerItem key={b.id} className="h-full">
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg">
                <div>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                        <Building className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-bold text-gray-900 transition-colors group-hover:text-primary-700">
                          {isNp && b.nameNp ? b.nameNp : b.name}
                        </h3>
                        {b.province && (
                          <span className="inline-block rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-bold text-primary-700">
                            {b.province} Province
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs leading-relaxed text-gray-600">
                    <p className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                      <span>
                        {isNp && b.addressNp ? b.addressNp : b.address}
                        {b.district && b.localBody && (
                          <span className="block text-[11px] font-medium text-gray-400">
                            {b.localBody}, {b.district}
                          </span>
                        )}
                      </span>
                    </p>

                    {b.phone && (
                      <a
                        href={`tel:${b.phone.split(",")[0].trim()}`}
                        className="flex items-center gap-2 transition-colors hover:text-primary-700"
                      >
                        <Phone className="h-4 w-4 shrink-0 text-primary-600" />
                        <span className="font-mono">{b.phone}</span>
                      </a>
                    )}

                    {b.email && (
                      <a
                        href={`mailto:${b.email}`}
                        className="flex items-center gap-2 transition-colors hover:text-primary-700"
                      >
                        <Mail className="h-4 w-4 shrink-0 text-primary-600" />
                        <span>{b.email}</span>
                      </a>
                    )}

                    {b.managerName && (
                      <p className="flex items-center gap-2">
                        <User className="h-4 w-4 shrink-0 text-primary-600" />
                        <span>
                          <span className="text-gray-400">{isNp ? "प्रबन्धक: " : "Manager: "}</span>
                          <strong className="text-gray-800">{b.managerName}</strong>
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {b.bankingHours && (
                  <div className="mt-4 flex items-center gap-1.5 border-t border-gray-100 pt-3 text-[11px] font-medium text-gray-400">
                    <Clock className="h-3.5 w-3.5 text-primary-500" />
                    <span>{b.bankingHours}</span>
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      )}

      {view === "list" && filtered.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center text-gray-400">
          <p className="text-sm font-semibold">{isNp ? "कुनै शाखा फेला परेन" : "No branches found matching your filters"}</p>
        </div>
      )}
    </>
  );
}
