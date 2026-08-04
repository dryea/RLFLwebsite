"use client";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "https://rfil-api.sudeepdhakal.workers.dev";

// Service cascade: category -> types -> sub-types
const SERVICE_CASCADE: Record<string, { types: Record<string, string[]> }> = {
  "Deposit / Account": {
    types: {
      "Savings Account": ["Account Opening", "Account Closing", "Balance/Statement", "Nominee Change", "KYC Update", "Other"],
      "Fixed Deposit": ["FD Placement", "FD Renewal", "FD Encashment", "Interest Issue", "Other"],
      "Remittance": ["Deposit Issue", "Withdrawal Issue", "Delay in Credit", "Other"],
    },
  },
  "Loan": {
    types: {
      "Home Loan": ["Application", "Disbursement", "Interest Rate", "Installment/EMI", "Statement", "Other"],
      "Auto Loan": ["Application", "Disbursement", "EMI", "Statement", "Other"],
      "Business Loan": ["Application", "Disbursement", "EMI", "Statement", "Other"],
      "Personal Loan": ["Application", "Disbursement", "EMI", "Statement", "Other"],
    },
  },
  "Cards / Digital": {
    types: {
      "Debit Card": ["Card Delivery", "Card Blocked", "PIN Issue", "Transaction Issue", "Other"],
      "Mobile Banking": ["Login Issue", "Transaction Issue", "OTP Issue", "Other"],
      "Connect IPS": ["Payment Issue", "OTP Issue", "Other"],
    },
  },
  "Other Services": {
    types: {
      "Branch Service": ["Queue/Time", "Staff Behaviour", "Information", "Other"],
      "Online Enquiry": ["Loan Enquiry", "Complaint", "Feedback", "Suggestion", "Other"],
    },
  },
};

export default function GrievanceForm({ lang }: { lang: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", category: "", type: "", subType: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const isNp = lang === "np";

  const types = form.category ? SERVICE_CASCADE[form.category]?.types || {} : {};
  const subTypes = form.type ? types[form.type] || [] : [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: `${form.category} - ${form.type}${form.subType ? " - " + form.subType : ""}`,
          message: form.message,
          type: "grievance",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", category: "", type: "", subType: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-700">
        {isNp ? "तपाईंको उजुरी सफलतापूर्वक पेश गरिएको छ। हामी ३ कार्य दिनभित्र तपाईंलाई सम्पर्क गर्नेछौं।" : "Your complaint has been submitted successfully. We will contact you within 3 working days."}
      </div>
    );
  }

  const inputCls = "mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50";
  const labelCls = "block text-sm font-medium text-gray-700";

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>{isNp ? "पूरा नाम" : "Full Name"} *</label>
          <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Email *</label>
          <input type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>{isNp ? "फोन" : "Phone"}</label>
          <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className={inputCls} />
        </div>
      </div>

      {/* Service cascade */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelCls}>{isNp ? "सेवा श्रेणी" : "Service Category"} *</label>
          <select required value={form.category}
            onChange={e => setForm(p => ({ ...p, category: e.target.value, type: "", subType: "" }))}
            className={inputCls}>
            <option value="">{isNp ? "छान्नुहोस्..." : "Select..."}</option>
            {Object.keys(SERVICE_CASCADE).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>{isNp ? "सेवा प्रकार" : "Service Type"} *</label>
          <select required value={form.type} disabled={!form.category}
            onChange={e => setForm(p => ({ ...p, type: e.target.value, subType: "" }))}
            className={inputCls}>
            <option value="">{!form.category ? (isNp ? "पहिले श्रेणी छान्नुहोस्" : "Select category first") : (isNp ? "छान्नुहोस्..." : "Select...")}</option>
            {Object.keys(types).map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>{isNp ? "उप-प्रकार" : "Sub-Type"}</label>
          <select value={form.subType} disabled={!form.type}
            onChange={e => setForm(p => ({ ...p, subType: e.target.value }))}
            className={inputCls}>
            <option value="">{!form.type ? (isNp ? "पहिले प्रकार छान्नुहोस्" : "Select type first") : (isNp ? "छान्नुहोस्..." : "Select...")}</option>
            {subTypes.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>{isNp ? "सन्देश" : "Message"} *</label>
        <textarea required rows={4} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} className={inputCls} />
      </div>
      <button type="submit" disabled={status === "loading"}
        className="rounded-lg bg-primary-700 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-800 disabled:opacity-60">
        {status === "loading" ? "..." : isNp ? "उजुरी पेश गर्नुहोस्" : "Submit Complaint"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">
          {isNp ? "केही गलत भयो। कृपया पुनः प्रयास गर्नुहोस्।" : "Something went wrong. Please try again."}
        </p>
      )}
    </form>
  );
}
