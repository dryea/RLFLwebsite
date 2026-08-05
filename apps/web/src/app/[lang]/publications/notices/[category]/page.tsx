"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Megaphone, FileDown, ExternalLink, Calendar, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getNotices } from "@/lib/public-api";
import { useLang } from "@/contexts/LanguageContext";
import { localize } from "@/lib/localize";

const categoryMeta: Record<string, { en: string; np: string; descEn: string; descNp: string }> = {
  "agm-notice": {
    en: "AGM Notice",
    np: "एजीएम सूचना",
    descEn: "Annual General Meeting notices, agenda details, and shareholder book closure announcements.",
    descNp: "वार्षिक साधारण सभा (AGM) सम्बन्धी सूचना, एजेन्डा र सेयरधनी दर्ता किताब बन्द हुने सम्बन्धी विवरण।"
  },
  "dividend-declaration": {
    en: "Dividend Declaration",
    np: "लाभांश घोषणा",
    descEn: "Official dividend announcements approved by the Board of Directors and Nepal Rastra Bank.",
    descNp: "सञ्चालक समिति र नेपाल राष्ट्र बैंकबाट स्वीकृत लाभांश घोषणा सूचनाहरू।"
  },
  "unclaimed-dividend": {
    en: "Unclaimed Dividend List",
    np: "दावी नगरिएको लाभांश सूची",
    descEn: "List of shareholders with unclaimed dividends eligible for collection or transfer to Investor Protection Fund.",
    descNp: "सङ्कलन गर्न बाँकी लाभांश भएका सेयरधनीहरूको सूची र सङ्कलन प्रक्रिया।"
  },
  "right-to-information": {
    en: "Right to Information",
    np: "सूचनाको हक (RTI)",
    descEn: "Disclosures published quarterly under the Right to Information Act 2064 of Nepal.",
    descNp: "सूचनाको हक सम्बन्धी ऐन, २०६४ बमोजिम सार्वजनिक गरिएका त्रैमासिक विवरणहरू।"
  },
  "subsidy-loan-list": {
    en: "Subsidy Loan List",
    np: "अनुदान ऋण सूची",
    descEn: "Public disclosure of subsidized interest rate loan beneficiaries as mandated by Nepal Rastra Bank.",
    descNp: "नेपाल राष्ट्र बैंकको निर्देशन अनुसार प्रकाशित सहुलियतपूर्ण कर्जा प्राप्त गर्ने ऋणीहरूको विवरण।"
  },
  "tender-notice": {
    en: "Tender Notice",
    np: "बोलपत्र / टेन्डर सूचना",
    descEn: "Invitations for bids, procurement notices, and RFP documents for goods, services, and construction.",
    descNp: "वस्तु, सेवा तथा निर्माण कार्यका लागि आह्वान गरिएका सिलबन्दी बोलपत्र तथा टेन्डर सूचनाहरू।"
  },
  "general-notice": {
    en: "General Notice",
    np: "साधारण सूचना",
    descEn: "General public announcements, holiday schedule notices, and operational updates.",
    descNp: "सर्वसाधारण, ग्राहक वर्ग तथा सरोकारवालाहरूका लागि प्रकाशित सामान्य सूचनाहरू।"
  },
};

const sampleNoticesData: Record<string, any[]> = {
  "agm-notice": [
    {
      id: "agm-26",
      title: "Notice for 26th Annual General Meeting (AGM) FY 2080/81",
      publishedAt: "2025-01-15",
      summary: "Official notice inviting all shareholders to the 26th AGM to be held at Kathmandu.",
      fileUrl: "/assets/sample-notice.pdf",
    },
    {
      id: "agm-book-closure",
      title: "Notice Regarding Book Closure for 26th AGM & Dividend Eligibility",
      publishedAt: "2025-01-05",
      summary: "Information regarding share transfer book closure date for upcoming AGM.",
      fileUrl: "/assets/sample-notice.pdf",
    },
  ],
  "dividend-declaration": [
    {
      id: "div-2080-81",
      title: "Dividend Declaration Notice for Financial Year 2080/81",
      publishedAt: "2024-12-20",
      summary: "Board decision regarding bonus shares and cash dividend distribution for shareholders.",
      fileUrl: "/assets/sample-notice.pdf",
    },
  ],
  "unclaimed-dividend": [
    {
      id: "unclaimed-2080",
      title: "List of Shareholders with Unclaimed Dividend Up to FY 2079/80",
      publishedAt: "2024-11-10",
      summary: "Shareholders are requested to submit valid identification to claim overdue dividends.",
      fileUrl: "/assets/sample-notice.pdf",
    },
  ],
  "right-to-information": [
    {
      id: "rti-q2-2081",
      title: "Right to Information (RTI) Quarterly Disclosure — Q2 FY 2081/82",
      publishedAt: "2025-01-01",
      summary: "Quarterly disclosure published under Section 5(2) of Right to Information Act 2064.",
      fileUrl: "/assets/sample-notice.pdf",
    },
  ],
  "subsidy-loan-list": [
    {
      id: "subsidy-2081-q2",
      title: "List of Subsidized Loan Beneficiaries — Q2 FY 2081/82",
      publishedAt: "2024-12-30",
      summary: "Disclosure of subsidized credit lines extended under NRB Directives.",
      fileUrl: "/assets/sample-notice.pdf",
    },
  ],
  "tender-notice": [
    {
      id: "tender-cbs",
      title: "Tender Notice: Supply and Installation of Core Banking System Hardware",
      publishedAt: "2025-02-01",
      summary: "Sealed bids are invited from authorized vendors for enterprise server deployment.",
      fileUrl: "/assets/sample-notice.pdf",
    },
    {
      id: "tender-branch-interior",
      title: "Invitation for Bids: Interior Decoration & Furnishing for New Branch",
      publishedAt: "2025-01-18",
      summary: "RFP for interior layout and security counter installation.",
      fileUrl: "/assets/sample-notice.pdf",
    },
  ],
  "general-notice": [
    {
      id: "general-banking-hours",
      title: "Notice Regarding Winter Season Banking Hours",
      publishedAt: "2024-11-15",
      summary: "Updated counter operating timings across all 21 branches in Nepal.",
      fileUrl: "/assets/sample-notice.pdf",
    },
    {
      id: "general-cyber-awareness",
      title: "Public Advisory: Beware of Phishing SMS, Fake Social Pages & Unverified OTP Calls",
      publishedAt: "2024-10-01",
      summary: "Important security guidelines for RFL Smart Mobile Banking users.",
      fileUrl: "/assets/sample-notice.pdf",
    },
  ],
};

export default function NoticesByCategoryPage() {
  const lang = useLang();
  const params = useParams();
  const category = (params.category as string) || "general-notice";
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const meta = categoryMeta[category] || {
    en: category.replace(/-/g, " ").toUpperCase(),
    np: "सूचनाहरू",
    descEn: "Official notices and disclosures published by Reliance Finance Limited.",
    descNp: "रिलायन्स फाइनान्स लिमिटेडबाट प्रकाशित आधिकारिक सूचनाहरू।",
  };

  useEffect(() => {
    if (!category) return;
    setLoading(true);
    getNotices()
      .then((all: any[]) => {
        const filtered = Array.isArray(all)
          ? all.filter((n: any) => n.category?.toLowerCase().replace(/\s+/g, "-") === category)
          : [];
        setNotices(filtered.length > 0 ? filtered : sampleNoticesData[category] || sampleNoticesData["general-notice"]);
      })
      .catch(() => {
        setNotices(sampleNoticesData[category] || sampleNoticesData["general-notice"]);
      })
      .finally(() => setLoading(false));
  }, [category]);

  const formatDate = (d: string) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString(lang === "en" ? "en-US" : "ne-NP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 py-14 text-white">
        <div className="container-page">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary-400 mb-2">
            <Megaphone className="h-4 w-4 text-secondary-400" />
            <span>{lang === "en" ? "Publications & Notices" : "प्रकाशन र सूचनाहरू"}</span>
          </div>
          <h1 className="text-3xl font-bold md:text-4xl">{lang === "en" ? meta.en : meta.np}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80">
            {lang === "en" ? meta.descEn : meta.descNp}
          </p>
        </div>
      </section>

      {/* Category Tabs Strip */}
      <div className="border-b border-gray-100 bg-gray-50/80 sticky top-[68px] z-20 backdrop-blur">
        <div className="container-page flex items-center gap-2 overflow-x-auto py-3 no-scrollbar text-xs">
          {Object.entries(categoryMeta).map(([catKey, catVal]) => {
            const isActive = catKey === category;
            return (
              <Link
                key={catKey}
                href={localize(`/publications/notices/${catKey}`, lang)}
                className={`shrink-0 rounded-xl px-3.5 py-2 font-semibold transition-all ${
                  isActive
                    ? "bg-primary-600 text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {lang === "en" ? catVal.en : catVal.np}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content List */}
      <section className="py-12">
        <div className="container-page">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-28 animate-pulse rounded-2xl bg-gray-100" />
              ))}
            </div>
          ) : notices.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center text-gray-500">
              <Megaphone className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="text-lg font-bold text-gray-700">
                {lang === "en" ? `No ${meta.en} available at this time.` : `${meta.np} अहिले उपलब्ध छैन।`}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {lang === "en" ? "Check back soon for new updates." : "कृपया पछि पुन: प्रयास गर्नुहोस्।"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notices.map((notice: any) => (
                <div
                  key={notice.id || notice.slug}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lg"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-bold text-primary-700">
                          {lang === "en" ? meta.en : meta.np}
                        </span>
                        {notice.publishedAt && (
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Calendar className="h-3.5 w-3.5 text-gray-400" />
                            {formatDate(notice.publishedAt)}
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-lg font-bold text-gray-900 transition-colors group-hover:text-primary-700">
                        {notice.title}
                      </h3>
                      {notice.summary && (
                        <p className="mt-1 text-sm leading-relaxed text-gray-500 line-clamp-2">
                          {notice.summary}
                        </p>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center gap-2 pt-2 sm:pt-0">
                      {notice.fileUrl ? (
                        <a
                          href={notice.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl bg-primary-600 px-4 py-2.5 text-xs font-bold text-white shadow transition-all hover:bg-primary-700 hover:shadow-md"
                        >
                          <FileDown className="h-4 w-4" />
                          {lang === "en" ? "Download PDF" : "PDF डाउनलोड"}
                        </a>
                      ) : notice.externalUrl ? (
                        <a
                          href={notice.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {lang === "en" ? "View Notice" : "हेर्नुहोस्"}
                        </a>
                      ) : null}
                    </div>
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
