import { Megaphone } from "lucide-react";
import { serverFetchAPI } from "@/lib/server-api";
import NoticeBoard from "@/components/shared/NoticeBoard";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Notices | Reliance Finance Limited" : "सूचनाहरू | रिलायन्स फाइनान्स लिमिटेड",
    description: lang === "en" ? "Official notices and announcements" : "आधिकारिक सूचना र घोषणाहरू",
  };
}

export default async function NoticesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const notices = await serverFetchAPI("/api/cms/notices", { cache: "no-store" });

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{lang === "en" ? "Notices" : "सूचनाहरू"}</h1>
          <p className="mt-2 text-primary-100">{lang === "en" ? "Official notices and announcements" : "आधिकारिक सूचना र घोषणाहरू"}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page max-w-4xl">
          {notices.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed p-12 text-center text-gray-500">
              <Megaphone className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="text-lg font-medium">{lang === "en" ? "No notices yet" : "अहिलेसम्म कुनै सूचना छैन"}</p>
              <p className="mt-1 text-sm">{lang === "en" ? "Notices will be posted here when available." : "उपलब्ध हुँदा सूचनाहरू यहाँ पोस्ट गरिनेछ।"}</p>
            </div>
          ) : (
            <NoticeBoard notices={notices} lang={lang} />
          )}
        </div>
      </section>
    </>
  );
}
