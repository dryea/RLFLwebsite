"use client";

import { useEffect, useState } from "react";
import { Megaphone, FileText, Download } from "lucide-react";
import NoticeBoard from "@/components/shared/NoticeBoard";
import NoticeSubscribe from "@/components/shared/NoticeSubscribe";
import { getNotices } from "@/lib/public-api";
import { useLang } from "@/contexts/LanguageContext";
import PageWrapper from "@/components/layout/PageWrapper";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

const SAMPLE_NOTICES = [
  {
    id: 101,
    title: "15th Annual General Meeting (AGM) Notice & Book Closure Date",
    description: "Notice regarding the upcoming 15th Annual General Meeting of Reliance Finance Limited to be held at Hotel Royal Singi, Kamaladi, Kathmandu.",
    category: "AGM Notice",
    fileUrl: "/docs/AGM_15th_Notice_RFIL.pdf",
    publishedAt: "2026-03-15T00:00:00.000Z",
  },
  {
    id: 102,
    title: "Unclaimed Dividend & Fractional Share List for FY 2079/80",
    description: "Shareholders are requested to collect their unclaimed cash dividend within 35 days from the shares registrar office.",
    category: "Dividend Notice",
    fileUrl: "/docs/Unclaimed_Dividend_RFIL_2080.pdf",
    publishedAt: "2026-02-28T00:00:00.000Z",
  },
  {
    id: 103,
    title: "Unaudited Q2 Financial Report for FY 2081/82",
    description: "Quarterly disclosure of balance sheet, income statement, base rate (10.15%), and non-performing loan (NPL) ratio under NRB Directive 14.",
    category: "Financial Report",
    fileUrl: "/docs/RFIL_Q2_Financials_2081.pdf",
    publishedAt: "2026-01-30T00:00:00.000Z",
  },
  {
    id: 104,
    title: "Sealed Tender Auction Notice for Non-Banking Assets (NBA)",
    description: "Auction notice for sale of commercial properties located in Kathmandu and Pokhara on as-is-where-is basis.",
    category: "Auction Notice",
    fileUrl: "/docs/Auction_Notice_RFIL_2081.pdf",
    publishedAt: "2026-01-15T00:00:00.000Z",
  },
];

export default function NoticesPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [notices, setNotices] = useState<any[]>(SAMPLE_NOTICES);

  useEffect(() => {
    getNotices()
      .then((res: any) => {
        if (Array.isArray(res) && res.length > 0) {
          setNotices(res);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <PageWrapper
      title={isNp ? "सूचना तथा सार्वजनिक प्रकाशनहरू" : "Official Notices & Disclosures"}
      description={isNp ? "रिलायन्स फाइनान्सका पछिल्ला साधारण सभा सूचना, वित्तीय विवरण र सार्वजनिक लिलामी सूचनाहरू।" : "Official announcements, AGM notices, quarterly financial reports, and regulatory disclosures of Reliance Finance Limited."}
      breadcrumbs={[{ label: isNp ? "सूचनाहरू" : "Notices" }]}
    >
      <Section variant="light" className="py-12 md:py-16">
        <Container>
          <div className="mb-10 rounded-3xl border border-primary-100 bg-white p-6 shadow-xl shadow-slate-900/5 md:p-8">
            <NoticeSubscribe />
          </div>

          <NoticeBoard notices={notices} lang={lang} />
        </Container>
      </Section>
    </PageWrapper>
  );
}
