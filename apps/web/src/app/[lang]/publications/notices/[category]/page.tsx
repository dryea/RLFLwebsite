import { Megaphone, FileDown, ExternalLink, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import { serverFetchAPI } from "@/lib/server-api";

const categoryMeta: Record<string, { en: string; np: string }> = {
  "agm-notice": { en: "AGM Notice", np: "एजीएम सूचना" },
  "dividend-declaration": { en: "Dividend Declaration", np: "लाभांश घोषणा" },
  "unclaimed-dividend": { en: "Unclaimed Dividend", np: "बाँडफाँड नभएको लाभांश" },
  "right-to-information": { en: "Right to Information", np: "सूचनाको हक" },
  "subsidy-loan-list": { en: "Subsidy Loan List", np: "अनुदान ऋण सूची" },
  "tender-notice": { en: "Tender Notice", np: "बोलपत्र सूचना" },
  "general-notice": { en: "General Notice", np: "साधारण सूचना" },
};

export const dynamic = "force-dynamic";


export async function generateStaticParams() {
  return Object.keys(categoryMeta).map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; category: string }> }) {
  const { lang, category } = await params;
  const meta = categoryMeta[category];
  if (!meta) return { title: "Not Found" };
  return {
    title: `${lang === "en" ? meta.en : meta.np} | Reliance Finance Limited`,
    description: lang === "en" ? `${meta.en} notices` : `${meta.np} सूचनाहरू`,
  };
}

export default async function NoticesByCategoryPage({ params }: { params: Promise<{ lang: string; category: string }> }) {
  const { lang, category } = await params;
  const meta = categoryMeta[category];
  if (!meta) notFound();

  const allNotices: any[] = await serverFetchAPI("/api/notices", { cache: "no-store" });
  const notices = allNotices.filter((n: any) => n.category?.toLowerCase().replace(/\s+/g, "-") === category);

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
          <p className="mt-2 text-primary-100">
            {lang === "en" ? `${meta.en} notices` : `${meta.np} सूचनाहरू`}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page max-w-4xl">
          {notices.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed p-12 text-center text-gray-500">
              <Megaphone className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="text-lg font-medium">
                {lang === "en" ? `No ${meta.en.toLowerCase()} notices` : `${meta.np} सूचनाहरू छैनन्`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notices.map((notice: any) => (
                <div key={notice.id || notice.slug} className="rounded-xl border p-5 transition-shadow hover:shadow-md">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{notice.title}</h3>
                      {notice.summary && <p className="mt-1 text-sm text-gray-600">{notice.summary}</p>}
                      {notice.publishedAt && (
                        <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" /> {formatDate(notice.publishedAt)}
                        </p>
                      )}
                    </div>
                    <div className="flex shrink-0 gap-2">
                      {notice.fileUrl && (
                        <a
                          href={notice.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100"
                        >
                          <FileDown className="h-3.5 w-3.5" />
                          {lang === "en" ? "Download" : "डाउनलोड"}
                        </a>
                      )}
                      {notice.externalUrl && (
                        <a
                          href={notice.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          {lang === "en" ? "View" : "हेर्नुहोस्"}
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
