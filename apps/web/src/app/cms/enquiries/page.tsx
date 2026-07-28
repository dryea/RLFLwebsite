"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Check, ExternalLink } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import { api } from "@/lib/api";

type Enquiry = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  loanType?: string;
  amount?: string;
  message?: string;
  createdAt: string;
  readAt?: string | null;
};

export default function EnquiriesPage() {
  const [tab, setTab] = useState<"contact" | "loan">("contact");
  const [contacts, setContacts] = useState<Enquiry[]>([]);
  const [loans, setLoans] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Enquiry | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [c, l] = await Promise.all([
          api.getContactSubmissions(),
          api.getLoanEnquiries(),
        ]);
        setContacts(Array.isArray(c) ? c : []);
        setLoans(Array.isArray(l) ? l : []);
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, []);

  async function markRead(enquiry: Enquiry) {
    try {
      if (tab === "contact") {
        await api.updateContactSubmissions(enquiry.id, { readAt: new Date().toISOString() });
        setContacts((prev) => prev.map((e) => e.id === enquiry.id ? { ...e, readAt: new Date().toISOString() } : e));
      } else {
        await api.updateLoanEnquiries(enquiry.id, { readAt: new Date().toISOString() });
        setLoans((prev) => prev.map((e) => e.id === enquiry.id ? { ...e, readAt: new Date().toISOString() } : e));
      }
    } catch (e) { console.error(e); }
  }

  const currentList = tab === "contact" ? contacts : loans;
  const unread = currentList.filter((e) => !e.readAt).length;

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <CMSLayout>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Enquiries</h1>
        <p className="mt-1 text-sm text-gray-500">Manage contact submissions and loan enquiries</p>
      </div>

      <div className="mb-4 flex gap-1 rounded-lg bg-gray-100 p-1">
        <button onClick={() => { setTab("contact"); setSelected(null); }} className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${tab === "contact" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
          Contact Submissions {contacts.filter((e) => !e.readAt).length > 0 && <span className="ml-1.5 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white">{contacts.filter((e) => !e.readAt).length}</span>}
        </button>
        <button onClick={() => { setTab("loan"); setSelected(null); }} className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${tab === "loan" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
          Loan Enquiries {loans.filter((e) => !e.readAt).length > 0 && <span className="ml-1.5 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white">{loans.filter((e) => !e.readAt).length}</span>}
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 animate-pulse rounded-lg bg-gray-200" />)}</div>
      ) : currentList.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed p-12 text-center text-gray-500">
          <p className="text-lg font-medium">No {tab === "contact" ? "contact submissions" : "loan enquiries"} yet</p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            {currentList.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className={`w-full rounded-lg border p-4 text-left transition-colors hover:bg-gray-50 ${selected?.id === item.id ? "border-primary-500 bg-primary-50" : ""} ${!item.readAt ? "border-l-4 border-l-primary-700 bg-white" : "bg-white"}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">{item.name}</p>
                    <p className="truncate text-xs text-gray-500">{item.email}</p>
                  </div>
                  <span className="shrink-0 text-xs text-gray-400">{formatDate(item.createdAt)}</span>
                </div>
                <p className="mt-1 truncate text-xs text-gray-500">
                  {tab === "loan" ? (item.loanType || "—") : (item.subject || "—")}
                </p>
              </button>
            ))}
          </div>

          <div className="rounded-lg border bg-white p-6">
            {selected ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{selected.name}</h3>
                    <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{selected.email}</span>
                      {selected.phone && <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{selected.phone}</span>}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{formatDate(selected.createdAt)}</span>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  {tab === "loan" && selected.loanType && (
                    <div className="mb-2 grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-500">Loan Type:</span> <span className="font-medium">{selected.loanType}</span></div>
                      {selected.amount && <div><span className="text-gray-500">Amount:</span> <span className="font-medium">Rs. {selected.amount}</span></div>}
                    </div>
                  )}
                  {tab === "contact" && selected.subject && (
                    <p className="mb-2 text-sm"><span className="text-gray-500">Subject:</span> <span className="font-medium">{selected.subject}</span></p>
                  )}
                  {selected.message && <p className="whitespace-pre-wrap text-sm text-gray-700">{selected.message}</p>}
                </div>

                <div className="flex items-center gap-2">
                  {!selected.readAt && (
                    <button onClick={() => markRead(selected)} className="flex items-center gap-1.5 rounded-lg bg-primary-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-800">
                      <Check className="h-3.5 w-3.5" /> Mark as Read
                    </button>
                  )}
                  {selected.readAt && <span className="text-xs text-gray-400">Read {formatDate(selected.readAt)}</span>}
                  <a href={`mailto:${selected.email}`} className="ml-auto flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
                    <ExternalLink className="h-3.5 w-3.5" /> Reply
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                Select an enquiry to view details
              </div>
            )}
          </div>
        </div>
      )}
    </CMSLayout>
  );
}
