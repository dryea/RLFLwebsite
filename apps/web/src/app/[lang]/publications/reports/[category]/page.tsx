"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FileText, FileDown, ExternalLink, Calendar, BarChart3 } from "lucide-react";
import Link from "next/link";
import { getReports } from "@/lib/public-api";
import { useLang } from "@/contexts/LanguageContext";
import { localize } from "@/lib/localize";

const categoryMeta: Record<string, { en: string; np: string; descEn: string; descNp: string }> = {
  "annual-report": {
    en: "Annual Report",
    np: "वार्षिक प्रतिवेदन",
    descEn: "Audited financial statements, Director's report, and balance sheet disclosures for previous fiscal years.",
    descNp: "अघिल्ला आर्थिक वर्षहरूको लेखापरीक्षण गरिएको वित्तीय विवरण र सञ्चालक समितिको प्रतिवेदन।"
  },
  "quarterly-reports": {
    en: "Quarterly Reports",
    np: "त्रैमासिक प्रतिवेदनहरू",
    descEn: "Unaudited quarterly financial results published in accordance with NRB Unified Directives.",
    descNp: "नेपाल राष्ट्र बैंकको निर्देशन अनुसार प्रकाशित त्रैमासिक वित्तीय विवरणहरू।"
  },
  "agm-minute": {
    en: "AGM Minute",
    np: "एजीएम मिनेट / निर्णयहरू",
    descEn: "Official proceedings and shareholder resolutions passed during Annual General Meetings.",
    descNp: "वार्षिक साधारण सभाका आधिकारिक निर्णयहरू र बैठक मिनेट।"
  },
  "basel-ii-disclosure": {
    en: "Basel II Disclosure",
    np: "बासेल II खुलासा (Capital Adequacy)",
    descEn: "Capital Adequacy Framework disclosures published as mandated by NRB.",
    descNp: "नेपाल राष्ट्र बैंकद्वारा तोकिएको बासेल II पुँजी कोष सम्बन्धी प्रतिवेदनहरू।"
  },
  "sebon-report": {
    en: "SEBON Report",
    np: "सेबोन वार्षिक प्रतिवेदन",
    descEn: "Annual corporate governance and financial disclosures submitted to Securities Board of Nepal (SEBON).",
    descNp: "नेपाल धितोपत्र बोर्ड (SEBON) मा पेश गरिएका संस्थागत सुशासन प्रतिवेदनहरू।"
  },
};

const sampleReportsData: Record<string, any[]> = {
  "annual-report": [
    {
      id: "ar-2080-81",
      title: "Reliance Finance Limited 26th Annual Report (FY 2080/81)",
      publishedAt: "2024-12-15",
      description: "Complete audited balance sheet, profit & loss statement, NFRS disclosures, and auditor's report.",
      fileUrl: "/assets/sample-report.pdf",
    },
    {
      id: "ar-2079-80",
      title: "Reliance Finance Limited 25th Annual Report (FY 2079/80)",
      publishedAt: "2023-12-10",
      description: "Audited financial statements and corporate highlights for FY 2079/80.",
      fileUrl: "/assets/sample-report.pdf",
    },
  ],
  "quarterly-reports": [
    {
      id: "qr-2081-q2",
      title: "Un-Audited Financial Results for Q2 FY 2081/82 (Poush 2081)",
      publishedAt: "2025-01-28",
      description: "Quarterly key financial metrics, base rate (8.45%), spread rate, and NPA ratios.",
      fileUrl: "/assets/sample-report.pdf",
    },
    {
      id: "qr-2081-q1",
      title: "Un-Audited Financial Results for Q1 FY 2081/82 (Ashwin 2081)",
      publishedAt: "2024-10-25",
      description: "First quarter financial performance & capital adequacy summary.",
      fileUrl: "/assets/sample-report.pdf",
    },
  ],
  "agm-minute": [
    {
      id: "agm-min-25",
      title: "Minutes & Resolutions of the 25th Annual General Meeting",
      publishedAt: "2024-02-10",
      description: "Approved resolutions regarding dividend distribution and auditor appointment.",
      fileUrl: "/assets/sample-report.pdf",
    },
  ],
  "basel-ii-disclosure": [
    {
      id: "basel-2081-q2",
      title: "Basel II Capital Adequacy Framework Disclosure — Q2 FY 2081/82",
      publishedAt: "2025-01-29",
      description: "Risk weighted exposure, Tier I capital ratio, and total capital adequacy breakdown.",
      fileUrl: "/assets/sample-report.pdf",
    },
  ],
  "sebon-report": [
    {
      id: "sebon-2080-81",
      title: "SEBON Annual Corporate Governance & Disclosure Report FY 2080/81",
      publishedAt: "2024-11-20",
      description: "Compliance report submitted to Securities Board of Nepal.",
      fileUrl: "/assets/sample-report.pdf",
    },
  ],
};

export default function ReportsByCategoryPage() {
  const lang = useLang();
  const params = useParams();
  const category = (params.category as string) || "annual-report";
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const meta = categoryMeta[category] || {
    en: category.replace(/-/g, " ").toUpperCase(),
    np: "प्रतिवेदनहरू",
    descEn: "Financial reports and disclosures published by Reliance Finance Limited.",
    descNp: "रिलायन्स फाइनान्स लिमिटेडबाट प्रकाशित वित्तीय प्रतिवेदनहरू।",
  };

  useEffect(() => {
    if (!category) return;
    setLoading(true);
    getReports()
      .then((all: any[]) => {
        const filtered = Array.isArray(all)
          ? all.filter((r: any) => r.category?.toLowerCase().replace(/\s+/g, "-") === category)
          : [];
        setReports(filtered.length > 0 ? filtered : sampleReportsData[category] || sampleReportsData["annual-report"]);
      })
      .catch(() => {
        setReports(sampleReportsData[category] || sampleReportsData["annual-report"]);
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
            <BarChart3 className="h-4 w-4 text-secondary-400" />
            <span>{lang === "en" ? "Financial Reports & Disclosures" : "वित्तीय प्रतिवेदनहरू"}</span>
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
                href={localize(`/publications/reports/${catKey}`, lang)}
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
          ) : reports.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center text-gray-500">
              <FileText className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="text-lg font-bold text-gray-700">
                {lang === "en" ? `No ${meta.en} available at this time.` : `${meta.np} अहिले उपलब्ध छैन।`}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {lang === "en" ? "Check back soon for new reports." : "कृपया पछि पुन: प्रयास गर्नुहोस्।"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report: any) => (
                <div
                  key={report.id || report.slug}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lg"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-bold text-primary-700">
                          {lang === "en" ? meta.en : meta.np}
                        </span>
                        {report.publishedAt && (
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Calendar className="h-3.5 w-3.5 text-gray-400" />
                            {formatDate(report.publishedAt)}
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-lg font-bold text-gray-900 transition-colors group-hover:text-primary-700">
                        {report.title}
                      </h3>
                      {report.description && (
                        <p className="mt-1 text-sm leading-relaxed text-gray-500 line-clamp-2">
                          {report.description}
                        </p>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center gap-2 pt-2 sm:pt-0">
                      {report.fileUrl ? (
                        <a
                          href={report.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl bg-primary-600 px-4 py-2.5 text-xs font-bold text-white shadow transition-all hover:bg-primary-700 hover:shadow-md"
                        >
                          <FileDown className="h-4 w-4" />
                          {lang === "en" ? "Download PDF" : "PDF डाउनलोड"}
                        </a>
                      ) : report.externalUrl ? (
                        <a
                          href={report.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {lang === "en" ? "View Report" : "हेर्नुहोस्"}
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
