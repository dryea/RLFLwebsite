"use client";

import { ShieldCheck, Award, Clock, Headphones, PiggyBank, RefreshCw } from "lucide-react";
import StaggerChildren, { StaggerItem } from "@/components/motion/StaggerChildren";

export default function WhyChooseUs({ lang }: { lang: string }) {
  const isNp = lang === "np";

  const benefits = [
    {
      icon: ShieldCheck,
      title: isNp ? "NRB इजाजतपत्र" : "NRB Licensed",
      desc: isNp ? "नेपाल राष्ट्र बैंकद्वारा विनियमित, सुरक्षित र भरपर्दो।" : "Regulated by Nepal Rastra Bank — safe and trustworthy.",
      color: "bg-green-50 text-green-700",
    },
    {
      icon: Award,
      title: isNp ? "१७+ वर्षको विरासत" : "17+ Years",
      desc: isNp ? "२०६६ देखि नेपाली बैंकिङमा विश्वासको विरासत।" : "A legacy of trust in Nepali banking since 2066 B.S.",
      color: "bg-primary-50 text-primary-700",
    },
    {
      icon: PiggyBank,
      title: isNp ? "प्रतिस्पर्धी दरहरू" : "Competitive Rates",
      desc: isNp ? "उच्च बचत र मुद्दती ब्याज दरहरू।" : "Attractive savings and fixed deposit rates.",
      color: "bg-amber-50 text-amber-700",
    },
    {
      icon: Headphones,
      title: isNp ? "समर्पित समर्थन" : "Dedicated Support",
      desc: isNp ? "औसत समाधान समय सहित ग्राहक सेवा।" : "Customer service with fast resolution times.",
      color: "bg-blue-50 text-blue-700",
    },
    {
      icon: Clock,
      title: isNp ? "२१+ शाखाहरू" : "21+ Branches",
      desc: isNp ? "देशभर सजिलो पहुँचको लागि विस्तृत सञ्जाल।" : "Nationwide network for easy access.",
      color: "bg-purple-50 text-purple-700",
    },
    {
      icon: RefreshCw,
      title: isNp ? "डिजिटल बैंकिङ" : "Digital Banking",
      desc: isNp ? "RFL Smart एप र २४/७ अनलाइन सेवाहरू।" : "RFL Smart app and 24/7 online services.",
      color: "bg-cyan-50 text-cyan-700",
    },
  ];

  return (
    <section className="section bg-surface-alt">
      <div className="container-page">
        <div className="section-header">
          <h2>{isNp ? "किन रिलायन्स फाइनान्स?" : "Why Choose Reliance Finance?"}</h2>
          <p>{isNp ? "हामी पारदर्शिता, सुरक्षा र ग्राहक सेवामा विश्वास गर्छौं।" : "We're built on transparency, security, and customer service."}</p>
        </div>
        <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <StaggerItem key={b.title} className="h-full">
                <div className="h-full rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${b.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-1.5 font-heading text-lg font-bold text-gray-900">{b.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{b.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
