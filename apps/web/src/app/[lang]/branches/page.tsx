import type { Metadata } from "next";
import { getSeoSettings } from "@/lib/seo";
import LangBranchesClient from "./client";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const settings = await getSeoSettings();
  const siteUrl = settings.siteUrl || "https://reliancenepal.com.np";
  const isNp = lang === "np";
  const title = isNp ? "शाखाहरू" : "Branches";
  return {
    title,
    description: isNp
      ? "देशभरका रिलायन्स फाइनान्स शाखाहरू, ATM र सेवा स्थानहरू खोज्नुहोस्।"
      : "Find Reliance Finance branches, ATMs, and service locations across Nepal.",
    alternates: { canonical: `${siteUrl}/${lang}/branches` },
  };
}

export default function Page() {
  return <LangBranchesClient />;
}
