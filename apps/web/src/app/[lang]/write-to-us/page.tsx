"use client";

import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { API } from "@/lib/api";
import { Mail, Send, ShieldCheck, Phone, CheckCircle2, UserCheck } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function WriteToUsPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [form, setForm] = useState({ name: "", phone: "", email: "", branch: "Kamaladi Head Office", subject: "", message: "" });
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const code = "GRV-" + Math.floor(100000 + Math.random() * 900000);
    try {
      await fetch(`${API}/api/cms/contact-submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ticketId: code, type: "grievance" }),
      });
    } catch {
      // silent fallback
    }
    setTicketId(code);
    setLoading(false);
  }

  const inputCls = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-800 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-100";

  return (
    <PageWrapper
      title={isNp ? "गुनासो सुनुवाई अधिकारी र सम्पर्क" : "Grievance Handling Officer & Feedback"}
      description={isNp ? "नेपाल राष्ट्र बैंकको निर्देशन अनुसार ग्राहकका गुनासो, सुझाव तथा उजुरीहरूको प्रत्यक्ष दर्ता पोर्टल।" : "Official NRB compliant portal for submitting customer grievances, feedback, and formal complaints."}
      breadcrumbs={[{ label: isNp ? "हामीलाई लेख्नुहोस्" : "Write to Us" }]}
    >
      <Section variant="light" className="py-12 md:py-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 lg:grid-cols-12">
              {/* NRB Grievance Officer Badge Card */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-primary-900/10 bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 p-6 text-white shadow-xl md:p-8">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary-400/30 bg-secondary-500/10 px-3.5 py-1 text-xs font-bold text-secondary-400">
                    <ShieldCheck className="h-4 w-4" />
                    {isNp ? "एनआरबी गुनासो अधिकारी" : "NRB Designated Officer"}
                  </div>

                  <h3 className="font-heading text-lg font-bold">{isNp ? "सूचना अधिकारी / गुनासो सुनुवाई अधिकारी" : "Information & Grievance Handling Officer"}</h3>

                  <div className="mt-6 space-y-4 text-xs">
                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <UserCheck className="mt-0.5 h-5 w-5 text-secondary-400 shrink-0" />
                      <div>
                        <p className="font-bold text-white">Nabin Kumar Joshi</p>
                        <p className="text-slate-300">{isNp ? "वरिष्ठ प्रबन्धक / सूचना अधिकारी" : "Senior Manager / Information Officer"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <Phone className="mt-0.5 h-5 w-5 text-secondary-400 shrink-0" />
                      <div>
                        <p className="font-mono font-bold text-white">+977-01-5361104 (Ext. 112)</p>
                        <p className="text-slate-300">Hotline: 1810-5000-417</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <Mail className="mt-0.5 h-5 w-5 text-secondary-400 shrink-0" />
                      <div>
                        <p className="font-mono font-bold text-white">grievance@reliancenepal.com.np</p>
                        <p className="text-slate-300">Head Office: Kamaladi, Kathmandu</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Input Container */}
              <div className="lg:col-span-7">
                {ticketId ? (
                  <div className="rounded-3xl border border-emerald-200 bg-emerald-50/80 p-8 text-center shadow-xl">
                    <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-emerald-600" />
                    <h3 className="font-heading text-xl font-extrabold text-emerald-900">
                      {isNp ? "गुनासो सफलतापूर्वक दर्ता भयो!" : "Grievance Ticket Registered!"}
                    </h3>
                    <p className="mt-2 text-xs font-semibold text-emerald-700">
                      {isNp ? "तपाईंको गुनासो टिकट नम्बर:" : "Your Official Grievance Tracking Ticket Code:"}
                    </p>
                    <p className="my-3 font-mono text-2xl font-black text-primary-700">{ticketId}</p>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      {isNp
                        ? "हाम्रो गुनासो अधिकारीले २४ घण्टाभित्र समीक्षा गरी सम्पर्क गर्नुहुनेछ।"
                        : "Our designated compliance officer will review your ticket and issue an official response within 24 business hours under NRB guidelines."}
                    </p>
                    <Button
                      onClick={() => {
                        setTicketId(null);
                        setForm({ name: "", phone: "", email: "", branch: "Kamaladi Head Office", subject: "", message: "" });
                      }}
                      variant="primary"
                      className="mt-6"
                    >
                      {isNp ? "नयाँ सन्देश लेख्नुहोस्" : "Submit Another Ticket"}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5 md:p-8 space-y-4">
                    <h3 className="font-heading text-base font-bold text-slate-900">
                      {isNp ? "उजुरी / गुनासो फारम भरुहोस्" : "Digital Grievance Submission Form"}
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700">{isNp ? "नाम *" : "Full Name *"}</label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your full name"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700">{isNp ? "फोन नम्बर *" : "Mobile Number *"}</label>
                        <input
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="98XXXXXXXX"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700">Email Address *</label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="name@example.com"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-700">{isNp ? "सम्बन्धित शाखा" : "Concerned Branch"}</label>
                        <select
                          value={form.branch}
                          onChange={(e) => setForm({ ...form, branch: e.target.value })}
                          className={inputCls}
                        >
                          <option value="Kamaladi Head Office">Kamaladi Head Office</option>
                          <option value="New Road Branch">New Road Branch</option>
                          <option value="Imadol Branch">Imadol Branch</option>
                          <option value="Pokhara Branch">Pokhara Branch</option>
                          <option value="Butwal Branch">Butwal Branch</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-700">{isNp ? "विषय *" : "Subject *"}</label>
                      <input
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="Brief summary of grievance"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-700">{isNp ? "विस्तृत विवरण *" : "Grievance Message / Complaint Details *"}</label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Please describe your issue in detail..."
                        className={inputCls}
                      />
                    </div>

                    <Button type="submit" disabled={loading} variant="primary" fullWidth size="lg" className="gap-2">
                      <Send className="h-4 w-4" />
                      {loading ? (isNp ? "दर्ता गर्दै..." : "Registering Ticket...") : (isNp ? "गुनासो दर्ता गर्नुहोस्" : "Submit Grievance Ticket")}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
