import Link from "next/link";
import { Landmark, ShieldCheck, FileText, Scale, AlertTriangle, Building2 } from "lucide-react";
import StaggerChildren, { StaggerItem } from "@/components/motion/StaggerChildren";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Regulator & Compliance | Reliance Finance Limited" : "नियामक र अनुपालन | रिलायन्स फाइनान्स लिमिटेड",
    description: lang === "en" ? "NRB license, DEPC deposit insurance, and regulatory disclosures." : "नेपाल राष्ट्र बैंक इजाजतपत्र, DEPC निक्षेप बीमा, र नियामक खुलासा।",
  };
}

export default async function RegulatorHubPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isNp = lang === "np";

  const cards = [
    {
      icon: Landmark,
      title: isNp ? "नेपाल राष्ट्र बैंक इजाजतपत्र" : "NRB License",
      desc: isNp ? "नेपाल राष्ट्र बैंकबाट इजाजतपत्र प्राप्त 'ग' वर्गको वित्तीय संस्था।" : "A 'C' class financial institution licensed by Nepal Rastra Bank.",
      href: "/about/introduction",
    },
    {
      icon: ShieldCheck,
      title: isNp ? "DEPC निक्षेप बीमा" : "DEPC Deposit Insurance",
      desc: isNp ? "Deposit and Credit Guarantee Corporation द्वारा निक्षेप सुरक्षित।" : "Deposits insured by the Deposit and Credit Guarantee Corporation.",
      href: "https://www.depc.gov.np/",
      external: true,
    },
    {
      icon: Scale,
      title: isNp ? "कर्पोरेट प्रशासन" : "Corporate Governance",
      desc: isNp ? "हाम्रो सुशासन संरचना र समितिहरू।" : "Our governance structure and board committees.",
      href: "/governance",
    },
    {
      icon: FileText,
      title: isNp ? "वित्तीय प्रतिवेदन" : "Financial Disclosures",
      desc: isNp ? "वार्षिक, त्रैमासिक प्रतिवेदन र बासेल II खुलासा।" : "Annual, quarterly reports and Basel II disclosures.",
      href: "/publications/reports/annual-report",
    },
    {
      icon: AlertTriangle,
      title: isNp ? "वित्तीय साक्षरता" : "Financial Literacy",
      desc: isNp ? "वित्तीय सुरक्षा र जागरूकता स्रोतहरू।" : "Resources on financial safety and awareness.",
      href: "/beware-of-digital-fraud",
    },
    {
      icon: Building2,
      title: isNp ? "शाखा सञ्जाल" : "Branch Network",
      desc: isNp ? "देशभरका हाम्रा शाखाहरू।" : "Our branches across the country.",
      href: "/branches",
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <Landmark className="h-7 w-7" /> {isNp ? "नियामक र अनुपालन" : "Regulator & Compliance"}
          </h1>
          <p className="mt-2 text-primary-100">{isNp ? "पारदर्शिता र विश्वास" : "Transparency and trust"}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.icon;
              const inner = (
                <>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50">
                    <Icon className="h-6 w-6 text-primary-700" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-bold text-gray-900">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{card.desc}</p>
                </>
              );
              return (
                <StaggerItem key={card.title} className="h-full">
                  {card.external ? (
                    <a href={card.href} target="_blank" rel="noopener noreferrer" className="block h-full rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      {inner}
                    </a>
                  ) : (
                    <Link href={card.href} className="block h-full rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      {inner}
                    </Link>
                  )}
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
