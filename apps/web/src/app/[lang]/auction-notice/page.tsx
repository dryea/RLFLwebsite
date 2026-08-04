"use client";

import { useEffect, useState } from "react";
import { Hammer, MapPin, Calendar, IndianRupee, Search, ChevronRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { API } from "@/lib/api";
import { nepalProvinces } from "@/lib/nepal-admin";

const PROPERTY_TYPES = ["land", "building", "vehicle", "other"];

export default function AuctionPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [auctions, setAuctions] = useState<any[]>([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [propType, setPropType] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API}/api/auctions`)
      .then((r) => r.json())
      .then((j) => setAuctions(Array.isArray(j) ? j : []))
      .catch(() => {});
  }, []);

  const selectedProvince = nepalProvinces.find((p) => p.name === province);
  const districts = selectedProvince ? selectedProvince.districts : [];

  const filtered = auctions.filter((a) => {
    if (province && !(a.location || "").toLowerCase().includes(province.toLowerCase())) return false;
    if (district && !(a.location || "").toLowerCase().includes(district.toLowerCase())) return false;
    if (propType !== "all" && a.propertyType !== propType) return false;
    if (search && !(a.title || "").toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const fmtPrice = (p: number) => p ? `Rs. ${Number(p).toLocaleString()}` : "—";

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <Hammer className="h-7 w-7" /> {isNp ? "लिलाम सूचना" : "Auction Notices"}
          </h1>
          <p className="mt-2 text-primary-100">{isNp ? "हाम्रा लिलाम अवसरहरू हेर्नुहोस्" : "Discover auction opportunities"}</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page">
          {/* Filters */}
          <div className="mb-8 rounded-2xl border bg-white p-5 shadow-sm">
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "प्रदेश" : "Province"}</label>
                <select value={province} onChange={(e) => { setProvince(e.target.value); setDistrict(""); }} className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500">
                  <option value="">{isNp ? "सबै" : "All"}</option>
                  {nepalProvinces.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "जिल्ला" : "District"}</label>
                <select value={district} onChange={(e) => setDistrict(e.target.value)} disabled={!province} className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500 disabled:bg-gray-50">
                  <option value="">{isNp ? "सबै" : "All"}</option>
                  {districts.map((d) => <option key={d.name} value={d.name}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "सम्पत्ति प्रकार" : "Property Type"}</label>
                <select value={propType} onChange={(e) => setPropType(e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500">
                  <option value="all">{isNp ? "सबै" : "All"}</option>
                  {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "खोज्नुहोस्" : "Search"}</label>
                <div className="flex items-center rounded-lg border px-3 focus-within:border-primary-500">
                  <Search className="h-4 w-4 text-gray-400" />
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={isNp ? "शीर्षक..." : "Title..."} className="w-full px-2 py-2 text-sm outline-none" />
                </div>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed p-16 text-center text-gray-500">
              <Hammer className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="text-lg font-medium">{isNp ? "हाल कुनै लिलाम छैन" : "No auctions available"}</p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((a) => (
                <div key={a.id} className="group flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium capitalize text-primary-700">{a.propertyType || "Property"}</span>
                    {a.auctionDate && (
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3.5 w-3.5" /> {new Date(a.auctionDate).toLocaleDateString(isNp ? "ne-NP" : "en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">{isNp && a.titleNp ? a.titleNp : a.title}</h3>
                  {a.location && (
                    <p className="flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin className="h-4 w-4 shrink-0 text-primary-600" /> {a.location}
                    </p>
                  )}
                  {a.minimumPrice != null && (
                    <p className="mt-3 flex items-center gap-1.5 text-lg font-bold text-primary-700">
                      <IndianRupee className="h-5 w-5" /> {fmtPrice(a.minimumPrice)}
                    </p>
                  )}
                  {a.description && <p className="mt-2 line-clamp-3 text-sm text-gray-500">{a.description}</p>}
                  <div className="mt-auto pt-4">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-700 group-hover:underline">
                      {isNp ? "थप जानकारी" : "View Details"} <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
