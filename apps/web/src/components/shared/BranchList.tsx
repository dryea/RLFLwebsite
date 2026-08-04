"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, User, List, Map as MapIcon } from "lucide-react";
import BranchMap from "./BranchMap";

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
  const [filter, setFilter] = useState<string>("all");
  const [view, setView] = useState<"list" | "map">("list");
  const filtered =
    filter === "all"
      ? branches
      : branches.filter((b) => b.region === filter);

  const isNp = lang === "np";
  const labels = {
    all: isNp ? "सबै" : "All",
    "head-office": isNp ? "प्रधान कार्यालय" : "Head Office",
    "inside-valley": isNp ? "उपत्यका भित्र" : "Inside Valley",
    "outside-valley": isNp ? "उपत्यका बाहिर" : "Outside Valley",
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {["all", "head-office", "inside-valley", "outside-valley"].map(
            (r) => (
              <button
                key={r}
                onClick={() => setFilter(r)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  filter === r
                    ? "bg-primary-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {labels[r as keyof typeof labels]}
              </button>
            ),
          )}
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

      {view === "map" ? (
        <BranchMap branches={filtered} lang={lang} />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b) => (
            <div
              key={b.id}
              className="flex flex-col rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
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
              <h3 className="font-semibold text-gray-900">
                {isNp && b.nameNp ? b.nameNp : b.name}
              </h3>
              <div className="mt-3 space-y-2 text-sm text-gray-600">
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
                  <a
                    href={`tel:${b.phone}`}
                    className="flex items-center gap-2 transition-colors hover:text-primary-700"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-primary-700" />
                    {b.phone}
                  </a>
                )}
                {b.email && (
                  <a
                    href={`mailto:${b.email}`}
                    className="flex items-center gap-2 transition-colors hover:text-primary-700"
                  >
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
              {b.bankingHours && (
                <p className="mt-3 text-xs text-gray-400">{b.bankingHours}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
