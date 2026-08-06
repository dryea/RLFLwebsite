import type { Metadata } from "next";
import { getSeoSettings } from "@/lib/seo";
import LangServicesClient from "./client";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const settings = await getSeoSettings();
  const siteUrl = settings.siteUrl || "https://reliancenepal.com.np";
  const isNp = lang === "np";
  const title = isNp ? "सेवाहरू" : "Services";
  return {
    title,
    description: isNp
      ? "मोबाइल बैंकिङ, डेबिट कार्ड, रेमिट्यान्स र अन्य बैंकिङ सेवाहरू रिलायन्स फाइनान्स लिमिटेडबाट।"
      : "Mobile banking, debit cards, remittance, and other banking services from Reliance Finance Limited.",
    alternates: { canonical: `${siteUrl}/${lang}/services` },
  };
}

export default function Page() {
  return <LangServicesClient />;
}
