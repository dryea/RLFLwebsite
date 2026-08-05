"use client";
import { useState } from "react";

const BRANCHES: Record<string, string> = {
  kamaladi: "+977-01-5361104 / 5323117",
  butwal: "+977-071-550992 / 550993",
  pokhara: "+977-061-538188 / 538189",
  kohalpur: "+977-081-542131 / 542132",
};

export default function BranchWidget() {
  const [branch, setBranch] = useState("kamaladi");

  return (
    <div className="mt-auto mb-5 rounded-xl bg-gray-50 p-3 border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[0.7rem] font-bold uppercase tracking-wider text-gray-500">Hub Directory</span>
        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
      </div>
      <label htmlFor="branch-select" className="sr-only">Select branch</label>
      <select
        id="branch-select"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs mb-2 focus:border-primary-500 focus:outline-none"
      >
        <option value="kamaladi">Kamaladi H.O. (Kathmandu)</option>
        <option value="butwal">Butwal (Lumbini)</option>
        <option value="pokhara">Pokhara (Gandaki)</option>
        <option value="kohalpur">Kohalpur (Banke)</option>
      </select>
      <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-primary-600 text-center">
        {BRANCHES[branch]}
      </div>
    </div>
  );
}
