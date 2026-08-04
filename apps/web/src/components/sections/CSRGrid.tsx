"use client";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import StaggerChildren, { StaggerItem } from "@/components/motion/StaggerChildren";

interface CSRActivity {
  id: number;
  title: string;
  titleNp?: string;
  description: string;
  descriptionNp?: string;
  imageUrl?: string;
}

export default function CSRGrid({ activities, lang }: { activities: CSRActivity[]; lang: string }) {
  const defaultActivities: CSRActivity[] = [
    { id: 1, title: "Financial Literacy Programs", titleNp: "वित्तीय साक्षरता कार्यक्रम", description: "Free workshops promoting financial awareness and inclusion across rural and urban communities.", descriptionNp: "ग्रामीण र शहरी समुदायहरूमा वित्तीय जागरूकता र समावेशीकरण प्रवर्द्धन गर्न निःशुल्क कार्यशालाहरू।" },
    { id: 2, title: "Environmental Sustainability", titleNp: "वातावरणीय दिगोपना", description: "Tree plantation drives, paperless banking, and energy-efficient operations to reduce our carbon footprint.", descriptionNp: "हाम्रो कार्बन फुटप्रिन्ट कम गर्न रूख रोपण अभियान, पेपरलेस बैंकिङ र ऊर्जा-कुशल सञ्चालन।" },
    { id: 3, title: "Education Support", titleNp: "शिक्षा सहयोग", description: "Scholarships and educational materials for underprivileged students across Nepal.", descriptionNp: "नेपालभरका विपन्न विद्यार्थीहरूको लागि छात्रवृत्ति र शैक्षिक सामग्री।" },
    { id: 4, title: "Community Health Camps", titleNp: "सामुदायिक स्वास्थ्य शिविर", description: "Free health check-up camps and awareness programs in collaboration with healthcare organizations.", descriptionNp: "स्वास्थ्य संस्थाहरूसँगको सहकार्यमा निःशुल्क स्वास्थ्य जाँच शिविर र जागरूकता कार्यक्रमहरू।" },
  ];

  const items = activities.length ? activities : defaultActivities;

  return (
    <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {items.map((activity) => (
        <StaggerItem key={activity.id} className="h-full">
        <div
          className="group relative h-full overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          style={{ borderTop: "3px solid transparent" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderTop = "3px solid #702B86"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderTop = "3px solid transparent"; }}
        >
          <div className="mb-4 flex h-[60px] w-[60px] items-center justify-center rounded-xl bg-red-50 text-red-500 transition-all duration-300 group-hover:bg-red-500 group-hover:text-white">
            <Heart className="h-7 w-7" />
          </div>
          <h3 className="mb-2 font-heading text-lg font-bold text-gray-900">
            {lang === "np" && activity.titleNp ? activity.titleNp : activity.title}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-gray-500">
            {lang === "np" && activity.descriptionNp ? activity.descriptionNp : activity.description}
          </p>
          <Link
            href={`/${lang}/csr`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 transition-colors hover:text-secondary-600"
          >
            {lang === "en" ? "Learn More About Our CSR Initiatives" : "हाम्रा CSR पहलहरूको बारेमा थप जान्नुहोस्"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}
