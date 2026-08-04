"use client";

import { useEffect, useMemo, useState } from "react";
import { GraduationCap, Search, Download, ChevronLeft, ChevronRight, Users, Building2, BookOpen } from "lucide-react";
import { fetchAPI } from "@/lib/public-api";
import { useLang } from "@/contexts/LanguageContext";
import { formatBsDate, toNepaliDigits } from "@/lib/nepali-date";

const PAGE_SIZE = 25;

export default function TrainingListPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [items, setItems] = useState<any[]>([]);
  const [filters, setFilters] = useState<{ years: string[]; branches: string[]; programs: string[] }>({ years: [], branches: [], programs: [] });
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [program, setProgram] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    Promise.all([
      fetchAPI("/api/trainings"),
      fetchAPI("/api/trainings/filters"),
    ]).then(([data, flt]) => {
      setItems(data || []);
      setFilters(flt || { years: [], branches: [], programs: [] });
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => { setPage(1); }, [year, branch, program, search]);

  const filtered = useMemo(() => {
    let result = items;
    if (year) result = result.filter((r) => r.year === year);
    if (branch) result = result.filter((r) => r.branch === branch);
    if (program) result = result.filter((r) => r.program === program);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((r) =>
        String(r.name || "").toLowerCase().includes(q) ||
        String(r.program || "").toLowerCase().includes(q) ||
        String(r.position || "").toLowerCase().includes(q) ||
        String(r.organizer || "").toLowerCase().includes(q) ||
        String(r.resourcePerson || "").toLowerCase().includes(q)
      );
    }
    return result;
  }, [items, year, branch, program, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function exportCsv() {
    const header = ["SN", "Year", "Date", "Name", "Position", "Branch", "Program", "Organizer", "Resource Person", "Duration"];
    const rows = filtered.map((r, i) => [
      i + 1, r.year || "", r.date || "", r.name || "", r.position || "",
      r.branch || "", r.program || "", r.organizer || "", r.resourcePerson || "", r.duration || "",
    ]);
    const csv = [header, ...rows].map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rfl-training-list-${year || "all"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const selectCls = "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500";

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <GraduationCap className="h-7 w-7" /> {isNp ? "प्रशिक्षण सूची" : "Staff Training List"}
          </h1>
          <p className="mt-2 text-primary-100">{isNp ? "कर्मचारी प्रशिक्षण र विकास कार्यक्रमहरूको अभिलेख" : "Staff training & development records"}</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page">
          {/* Summary cards */}
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <Users className="mb-2 h-6 w-6 text-primary-600" />
              <p className="text-2xl font-bold text-gray-900">{toNepaliDigits(items.length)}</p>
              <p className="text-sm text-gray-500">{isNp ? "कुल प्रशिक्षण अभिलेख" : "Total Records"}</p>
            </div>
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <Building2 className="mb-2 h-6 w-6 text-secondary-500" />
              <p className="text-2xl font-bold text-gray-900">{toNepaliDigits(new Set(items.map(r => r.branch).filter(Boolean)).size)}</p>
              <p className="text-sm text-gray-500">{isNp ? "शाखाहरू" : "Branches"}</p>
            </div>
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <BookOpen className="mb-2 h-6 w-6 text-green-600" />
              <p className="text-2xl font-bold text-gray-900">{toNepaliDigits(new Set(items.map(r => r.program).filter(Boolean)).size)}</p>
              <p className="text-sm text-gray-500">{isNp ? "प्रशिक्षण कार्यक्रमहरू" : "Training Programs"}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 rounded-2xl border bg-white p-5 shadow-sm">
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "वर्ष" : "Year"}</label>
                <select value={year} onChange={(e) => setYear(e.target.value)} className={selectCls}>
                  <option value="">{isNp ? "सबै वर्ष" : "All Years"}</option>
                  {filters.years.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "शाखा" : "Branch"}</label>
                <select value={branch} onChange={(e) => setBranch(e.target.value)} className={selectCls}>
                  <option value="">{isNp ? "सबै शाखा" : "All Branches"}</option>
                  {filters.branches.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "कार्यक्रम" : "Program"}</label>
                <select value={program} onChange={(e) => setProgram(e.target.value)} className={selectCls}>
                  <option value="">{isNp ? "सबै कार्यक्रम" : "All Programs"}</option>
                  {filters.programs.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{isNp ? "खोज्नुहोस्" : "Search"}</label>
                <div className="flex items-center rounded-lg border px-3 focus-within:border-primary-500">
                  <Search className="h-4 w-4 text-gray-400" />
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={isNp ? "नाम, कार्यक्रम..." : "Name, program..."} className="w-full px-2 py-2 text-sm outline-none" />
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {isNp ? "जम्मा" : "Showing"} <span className="font-semibold">{toNepaliDigits(filtered.length)}</span> {isNp ? "अभिलेखहरू" : "records"}
              </p>
              <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-lg border border-primary-200 px-4 py-2 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-50">
                <Download className="h-4 w-4" /> {isNp ? "CSV डाउनलोड" : "Export CSV"}
              </button>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-12 animate-pulse rounded-lg bg-gray-200" />)}</div>
          ) : paginated.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed p-16 text-center text-gray-500">
              <GraduationCap className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="text-lg font-medium">{isNp ? "कुनै अभिलेख फेला परेन" : "No records found"}</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-primary-50 text-gray-800">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-3 font-semibold">S.No</th>
                      <th className="whitespace-nowrap px-4 py-3 font-semibold">{isNp ? "मिति" : "Date"}</th>
                      <th className="whitespace-nowrap px-4 py-3 font-semibold">{isNp ? "नाम" : "Staff Name"}</th>
                      <th className="whitespace-nowrap px-4 py-3 font-semibold">{isNp ? "पद" : "Position"}</th>
                      <th className="whitespace-nowrap px-4 py-3 font-semibold">{isNp ? "शाखा" : "Branch"}</th>
                      <th className="px-4 py-3 font-semibold">{isNp ? "कार्यक्रम" : "Program"}</th>
                      <th className="whitespace-nowrap px-4 py-3 font-semibold">{isNp ? "आयोजक" : "Organizer"}</th>
                      <th className="whitespace-nowrap px-4 py-3 font-semibold">{isNp ? "स्रोत व्यक्ति" : "Resource Person"}</th>
                      <th className="whitespace-nowrap px-4 py-3 font-semibold">{isNp ? "अवधि" : "Duration"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginated.map((r, i) => (
                      <tr key={r.id} className="transition-colors hover:bg-gray-50">
                        <td className="whitespace-nowrap px-4 py-2.5 text-gray-500">{toNepaliDigits((currentPage - 1) * PAGE_SIZE + i + 1)}</td>
                        <td className="whitespace-nowrap px-4 py-2.5 font-medium text-primary-700">{formatBsDate(r.date, lang)}</td>
                        <td className="whitespace-nowrap px-4 py-2.5 font-medium text-gray-900">{r.name || "—"}</td>
                        <td className="whitespace-nowrap px-4 py-2.5 text-gray-600">{r.position || "—"}</td>
                        <td className="whitespace-nowrap px-4 py-2.5">
                          <span className="rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">{r.branch || "—"}</span>
                        </td>
                        <td className="px-4 py-2.5 text-gray-700">{r.program}</td>
                        <td className="whitespace-nowrap px-4 py-2.5 text-gray-600">{r.organizer || "—"}</td>
                        <td className="whitespace-nowrap px-4 py-2.5 text-gray-600">{r.resourcePerson || "—"}</td>
                        <td className="whitespace-nowrap px-4 py-2.5 text-gray-600">{r.duration || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                {isNp ? "देखाउँदै" : "Showing"} {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} {isNp ? "को" : "of"} {toNepaliDigits(filtered.length)}
              </p>
              <div className="flex items-center gap-1">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="rounded border p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-40" aria-label="Previous">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                  .map((p, idx, arr) => (
                    <span key={p} className="flex items-center">
                      {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-1 text-gray-400">…</span>}
                      <button onClick={() => setPage(p)} className={`h-8 w-8 rounded text-sm transition-colors ${currentPage === p ? "bg-primary-700 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
                        {toNepaliDigits(p)}
                      </button>
                    </span>
                  ))}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="rounded border p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-40" aria-label="Next">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
