import type { Metadata } from "next";
import { getSeoSettings } from "@/lib/seo";
import LangContactClient from "./client";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const settings = await getSeoSettings();
  const siteUrl = settings.siteUrl || "https://reliancenepal.com.np";
  const isNp = lang === "np";
  const title = isNp ? "सम्पर्क" : "Contact Us";
  return {
    title,
    description: isNp
      ? "रिलायन्स फाइनान्स लिमिटेडसँग सम्पर्क गर्नुहोस् — फोन, इमेल वा शाखा भ्रमण।"
      : "Contact Reliance Finance Limited — by phone, email, or visit a branch.",
    alternates: { canonical: `${siteUrl}/${lang}/contact` },
  };
}

export default function Page() {
  return <LangContactClient />;
}
