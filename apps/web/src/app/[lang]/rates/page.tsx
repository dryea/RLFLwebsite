import type { Metadata } from "next";
import { getSeoSettings } from "@/lib/seo";
import RatesClient from "./client";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const settings = await getSeoSettings();
  const siteUrl = settings.siteUrl || "https://reliancenepal.com.np";
  const isNp = lang === "np";
  const title = isNp ? "ब्याज दरहरू" : "Interest Rates";
  return {
    title,
    description: isNp
      ? "बचत, मुद्दती, ऋण र विदेशी मुद्रा दरहरू — रिलायन्स फाइनान्स लिमिटेड।"
      : "Current savings, fixed deposit, loan, and foreign exchange rates at Reliance Finance Limited.",
    alternates: { canonical: `${siteUrl}/${lang}/rates` },
  };
}

export default function Page() {
  return <RatesClient />;
}
