"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FileText, FileDown, ExternalLink, Calendar } from "lucide-react";
import { getReports } from "@/lib/public-api";
import { useLang } from "@/contexts/LanguageContext";

const categoryMeta: Record<string, { en: string; np: string }> = {
  "annual-report": { en: "Annual Report", np: "वार्षिक प्रतिवेदन" },
  "quarterly-reports": { en: "Quarterly Reports", np: "त्रैमासिक प्रतिवेदनहरू" },
  "agm-minute": { en: "AGM Minute", np: "एजीएम मिनेट" },
  "basel-ii-disclosure": { en: "Basel II Disclosure", np: "बासेल II खुलासा" },
  "sebon-report": { en: "SEBON Report", np: "सेबोन प्रतिवेदन" },
};

export default function ReportsByCategoryPage() {
  const lang = useLang();
  const params = useParams();
  const category = (params.category as string) || "";
  const [reports, setReports] = useState<any[]>([]);
  const meta = categoryMeta[category] || { en: "Reports", np: "प्रतिवेदनहरू" };

  useEffect(() => {
    if (!category) return;
    getReports().then((all: any[]) => {
      setReports(all.filter((r: any) => r.category?.toLowerCase().replace(/\s+/g, "-") === category));
    }).catch(() => {});
  }, [category]);

  const formatDate = (d: string) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString(lang === "en" ? "en-US" : "ne-NP", {
      year: "numeric", month: "long", day: "numeric",
    });
  };

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 py-14 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{lang === "en" ? meta.en : meta.np}</h1>
          <p className="mt-2 text-primary-100">{lang === "en" ? `${meta.en} from Reliance Finance` : `रिलायन्स फाइनान्सबाट ${meta.np}`}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page max-w-4xl">
          {reports.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed p-12 text-center text-gray-500">
              <FileText className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="text-lg font-medium">{lang === "en" ? `No ${meta.en.toLowerCase()} available` : `${meta.np} उपलब्ध छैन`}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report: any) => (
                <div key={report.id || report.slug} className="rounded-xl border p-5 transition-shadow hover:shadow-md">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{report.title}</h3>
                      {report.description && <p className="mt-1 text-sm text-gray-600">{report.description}</p>}
                      {report.publishedAt && (
                        <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" /> {formatDate(report.publishedAt)}
                        </p>
                      )}
                    </div>
                    <div className="flex shrink-0 gap-2">
                      {report.fileUrl && (
                        <a href={report.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100">
                          <FileDown className="h-3.5 w-3.5" />{lang === "en" ? "Download" : "डाउनलोड"}
                        </a>
                      )}
                      {report.externalUrl && (
                        <a href={report.externalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100">
                          <ExternalLink className="h-3.5 w-3.5" />{lang === "en" ? "View" : "हेर्नुहोस्"}
                        </a>
                      )}
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
