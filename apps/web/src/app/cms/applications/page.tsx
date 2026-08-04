"use client";

import { useEffect, useState } from "react";
import { UserPlus, Landmark, RefreshCw } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import { API } from "@/lib/api";
import { getCmsToken } from "@/lib/cms-auth";

interface AppItem {
  id: number;
  referenceNo: string;
  fullName: string;
  email: string;
  phone: string;
  status: string;
  accountType?: string;
  loanType?: string;
  requestedAmount?: number;
  createdAt: string;
  timeline?: any[];
}

export default function CmsApplicationsPage() {
  const [accounts, setAccounts] = useState<AppItem[]>([]);
  const [loans, setLoans] = useState<AppItem[]>([]);
  const [tab, setTab] = useState<"accounts" | "loans">("accounts");

  const token = () => getCmsToken();

  useEffect(() => {
    load();
  }, []);

  function load() {
    Promise.all([
      fetch(`${API}/api/cms/applications/accounts`, { headers: { Authorization: `Bearer ${token()}` } }).then((r) => r.json()),
      fetch(`${API}/api/cms/applications/loans`, { headers: { Authorization: `Bearer ${token()}` } }).then((r) => r.json()),
    ]).then(([a, l]) => {
      setAccounts(Array.isArray(a) ? a : []);
      setLoans(Array.isArray(l) ? l : []);
    }).catch(() => {});
  }

  async function updateStatus(item: AppItem, status: string) {
    const type = item.loanType ? "loan" : "account";
    await fetch(`${API}/api/cms/applications/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ type, id: item.id, status }),
    });
    load();
  }

  const statusBadge = (s: string) =>
    `inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
      s === "approved" ? "bg-green-100 text-green-700" : s === "rejected" ? "bg-red-100 text-red-700" : s === "under_review" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
    }`;

  const items = tab === "accounts" ? accounts : loans;

  return (
    <CMSLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          {tab === "accounts" ? <UserPlus className="h-5 w-5" /> : <Landmark className="h-5 w-5" />}
          {tab === "accounts" ? "Account Applications" : "Loan Applications"}
        </h1>
        <button onClick={load} className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      <div className="mb-5 flex gap-2">
        <button onClick={() => setTab("accounts")} className={`rounded-lg px-4 py-2 text-sm font-medium ${tab === "accounts" ? "bg-primary-700 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
          Accounts ({accounts.length})
        </button>
        <button onClick={() => setTab("loans")} className={`rounded-lg px-4 py-2 text-sm font-medium ${tab === "loans" ? "bg-primary-700 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
          Loans ({loans.length})
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Update</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-primary-700">{item.referenceNo}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{item.fullName}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{item.email}<br />{item.phone}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{item.accountType || item.loanType}</td>
                <td className="px-4 py-3">{statusBadge(item.status)}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—"}</td>
                <td className="px-4 py-3">
                  <select
                    value={item.status}
                    onChange={(e) => updateStatus(item, e.target.value)}
                    className="rounded border px-2 py-1 text-xs outline-none focus:border-primary-500"
                  >
                    <option value="submitted">Submitted</option>
                    <option value="under_review">Under Review</option>
                    <option value="verified">Verified</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-400">No applications yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </CMSLayout>
  );
}
