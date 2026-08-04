"use client";

import { useState } from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import AddressFields from "@/components/shared/AddressFields";

export default function LoanEnquiryPage() {
  const [form, setForm] = useState({ name: "", address: "", province: "", district: "", localBody: "", phone: "", email: "", nationality: "Nepali", customerProfile: "individual", loanType: "", proposedAmount: "", preferredBranch: "", remarks: "", consent: false });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.consent) return alert("Please accept the terms");
    if (!form.province || !form.district || !form.localBody) return alert("Please select province, district, and local body");
    setLoading(true);
    try {
      const res = await fetch("/api/loan-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, proposedAmount: form.proposedAmount ? Number(form.proposedAmount) : null }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      alert("Submission failed. Please try again.");
    }
    setLoading(false);
  }

  if (submitted) {
    return (
      <PublicLayout>
        <section className="flex flex-1 items-center justify-center py-20">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">✓</div>
            <h2 className="text-2xl font-bold text-gray-900">Enquiry Submitted</h2>
            <p className="mt-2 text-gray-600">We will contact you shortly.</p>
          </div>
        </section>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">Loan Enquiry Form</h1>
          <p className="mt-2 text-primary-100">Submit your enquiry and we&apos;ll get back to you</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border bg-white p-6 shadow-sm">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Full Name *</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Email *</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Phone *</label>
                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">Address *</label>
                <AddressFields
                  value={{ province: form.province, district: form.district, localBody: form.localBody, address: form.address }}
                  onChange={(v) => setForm((prev) => ({ ...prev, province: v.province, district: v.district, localBody: v.localBody, address: v.address }))}
                  lang="en"
                  showAddress
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Nationality</label>
                <input value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Customer Profile</label>
                <select value={form.customerProfile} onChange={(e) => setForm({ ...form, customerProfile: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500">
                  <option value="individual">Individual</option>
                  <option value="corporate">Corporate</option>
                  <option value="joint">Joint</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Loan Type *</label>
                <select required value={form.loanType} onChange={(e) => setForm({ ...form, loanType: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500">
                  <option value="">Select...</option>
                  <option value="agricultural">Agricultural Loan</option>
                  <option value="auto">Auto Loan</option>
                  <option value="education">Education Loan</option>
                  <option value="home">Home Loan</option>
                  <option value="personal">Personal Loan</option>
                  <option value="business">Business Loan</option>
                  <option value="share">Share Loan</option>
                  <option value="hire-purchase">Hire Purchase</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Proposed Amount (Rs.)</label>
                <input type="number" value={form.proposedAmount} onChange={(e) => setForm({ ...form, proposedAmount: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Remarks</label>
              <textarea rows={3} value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:border-primary-500" />
            </div>
            <label className="flex items-start gap-2 text-sm text-gray-600">
              <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1" />
              <span>I consent to Reliance Finance processing my personal data for this enquiry</span>
            </label>
            <button type="submit" disabled={loading} className="w-full rounded-lg bg-primary-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-800 disabled:opacity-60">
              {loading ? "Submitting..." : "Submit Enquiry"}
            </button>
          </form>
        </div>
      </section>
    </PublicLayout>
  );
}
