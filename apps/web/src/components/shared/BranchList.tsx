"use client";

import { useState } from "react";
import { MapPin, Phone } from "lucide-react";
import BranchMap from "./BranchMap";

interface Branch {
  id: number;
  name: string;
  address: string;
  phone?: string;
  region?: string;
  bankingHours?: string;
  latitude?: number;
  longitude?: number;
  nameNp?: string;
  addressNp?: string;
  email?: string;
  managerName?: string;
}

export default function BranchList({ branches, lang = "en" }: { branches: Branch[]; lang?: string }) {
  const [filter, setFilter] = useState<string>("all");
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
      <div className="mb-6 flex flex-wrap gap-2">
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((b) => (
          <div
            key={b.id}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >
            <h3 className="font-semibold text-gray-900">
              {isNp && b.nameNp ? b.nameNp : b.name}
            </h3>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" />
                {isNp && b.addressNp ? b.addressNp : b.address}
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
            </div>
            {b.bankingHours && (
              <p className="mt-3 text-xs text-gray-400">{b.bankingHours}</p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8">
        <BranchMap branches={filtered} lang={lang} />
      </div>
    </>
  );
}
