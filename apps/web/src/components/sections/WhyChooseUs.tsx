"use client";

import { ShieldCheck, Award, Clock, Headphones, PiggyBank, RefreshCw, Send, Landmark } from "lucide-react";
import StaggerChildren, { StaggerItem } from "@/components/motion/StaggerChildren";
import Section from "@/components/ui/Section";
import Grid from "@/components/ui/Grid";

export default function WhyChooseUs({ lang }: { lang: string }) {
  const isNp = lang === "np";

  const benefits = [
    {
      icon: ShieldCheck,
      title: isNp ? "नेपाल राष्ट्र बैंक इजाजतपत्र" : "NRB Class 'C' Licensed",
      desc: isNp ? "नेपाल राष्ट्र बैंकद्वारा विनियमित र नियन्त्रित, सुरक्षित र भरपर्दो।" : "Regulated by Nepal Rastra Bank — maximum security and institutional transparency.",
      badge: "Regulatory Trust",
      variant: "green",
    },
    {
      icon: Award,
      title: isNp ? "१७+ वर्षको निरन्तर सेवा" : "17+ Years of Excellence",
      desc: isNp ? "वि.सं. २०६६ देखि नेपाली बैंकिङमा विश्वास र सुशासनको पर्याय।" : "A legacy of trust, stability, and growth in Nepali banking since B.S. 2066.",
      badge: "Institutional Heritage",
      variant: "blue",
    },
    {
      icon: PiggyBank,
      title: isNp ? "प्रतिस्पर्धी ब्याज दरहरू" : "High-Yield Interest Rates",
      desc: isNp ? "मुद्दती निक्षेपमा ६.२५% सम्म र उच्च प्रतिफल दिने बचत खाताहरू।" : "Up to 6.25% p.a. on Fixed Deposits with maximum returns on savings.",
      badge: "High Growth",
      variant: "gold",
    },
    {
      icon: Send,
      title: isNp ? "द्रुत रेमिट्यान्स सेवा" : "Global Remittance Network",
      desc: isNp ? "विश्वभरिबाट पठाइएको रकम तुरुन्तै खातामा वा शाखाहरूमा प्राप्त गर्नुहोस्।" : "Fast and safe remittance transfers directly to accounts or cash payouts.",
      badge: "Remittance Access",
      variant: "blue",
    },
    {
      icon: Clock,
      title: isNp ? "२१+ देशव्यापी शाखाहरू" : "21+ Branch Network",
      desc: isNp ? "काठमाडौं, बुटवल, पोखरा, कोहलपुरलगायत प्रमुख सहरहरूमा शाखा संजाल।" : "Comprehensive nationwide branch presence across major commercial hubs.",
      badge: "Wide Network",
      variant: "green",
    },
    {
      icon: RefreshCw,
      title: isNp ? "RFL स्मार्ट डिजिटल बैंकिङ" : "Smart Mobile Banking",
      desc: isNp ? "RFL Smart एप, QR भुक्तानी र २४/७ अनलाइन बैंकिङ सेवाहरू।" : "24/7 mobile banking, instant QR scanning, and online transaction portals.",
      badge: "24/7 Access",
      variant: "gold",
    },
  ];

  return (
    <Section
      variant="alt"
      badge={isNp ? "हाम्रा सबल पक्षहरू" : "Why Choose Us"}
      title={isNp ? "किन रिलायन्स फाइनान्स छान्ने?" : "Why Trust Reliance Finance?"}
      subtitle={
        isNp
          ? "हामी उच्च वित्तीय सुशासन, पारदर्शिता, र आधुनिक प्रविधिसँगै नेपाली नागरिकको समृद्धिमा समर्पित छौं।"
          : "Built on institutional trust, transparency, and modern digital banking tailored for Nepal."
      }
    >
      <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b) => {
          const Icon = b.icon;
          return (
            <StaggerItem key={b.title} className="h-full">
              <div className="group relative flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-brand hover:border-primary-200">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-500 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-600 group-hover:bg-primary-50 group-hover:text-primary-700">
                    {b.badge}
                  </span>
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-primary-950 group-hover:text-primary-600 transition-colors">
                  {b.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-text-secondary">
                  {b.desc}
                </p>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerChildren>
    </Section>
  );
}
