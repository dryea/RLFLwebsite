"use client";
import Link from "next/link";
import { Heart, Leaf, BookOpen, Users, ArrowRight } from "lucide-react";
import StaggerChildren, { StaggerItem } from "@/components/motion/StaggerChildren";

interface CSRActivity {
  id: number;
  title: string;
  titleNp?: string;
  description: string;
  descriptionNp?: string;
  imageUrl?: string;
}

// Map activity title keywords to contextual icons
function getIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("education") || t.includes("literacy") || t.includes("scholarship")) return BookOpen;
  if (t.includes("environment") || t.includes("tree") || t.includes("green") || t.includes("sustain")) return Leaf;
  if (t.includes("community") || t.includes("social") || t.includes("people")) return Users;
  return Heart; // default: health / general
}

const iconColors: Record<string, { bg: string; text: string; hoverBg: string }> = {
  BookOpen: { bg: "bg-blue-50", text: "text-blue-600", hoverBg: "group-hover:bg-blue-500" },
  Leaf: { bg: "bg-green-50", text: "text-green-600", hoverBg: "group-hover:bg-green-500" },
  Users: { bg: "bg-amber-50", text: "text-amber-600", hoverBg: "group-hover:bg-amber-500" },
  Heart: { bg: "bg-red-50", text: "text-red-500", hoverBg: "group-hover:bg-red-500" },
};

export default function CSRGrid({ activities, lang }: { activities: CSRActivity[]; lang: string }) {
  const isNp = lang === "np";

  const defaultActivities: CSRActivity[] = [
    { id: 1, title: "Financial Literacy Programs", titleNp: "वित्तीय साक्षरता कार्यक्रम", description: "Free workshops promoting financial awareness and inclusion across rural and urban communities.", descriptionNp: "ग्रामीण र शहरी समुदायहरूमा वित्तीय जागरूकता र समावेशीकरण प्रवर्द्धन गर्न निःशुल्क कार्यशालाहरू।" },
    { id: 2, title: "Environmental Sustainability", titleNp: "वातावरणीय दिगोपना", description: "Tree plantation drives, paperless banking, and energy-efficient operations to reduce our carbon footprint.", descriptionNp: "हाम्रो कार्बन फुटप्रिन्ट कम गर्न रूख रोपण अभियान, पेपरलेस बैंकिङ।" },
    { id: 3, title: "Education Support", titleNp: "शिक्षा सहयोग", description: "Scholarships and educational materials for underprivileged students across Nepal.", descriptionNp: "नेपालभरका विपन्न विद्यार्थीहरूको लागि छात्रवृत्ति र शैक्षिक सामग्री।" },
    { id: 4, title: "Community Health Camps", titleNp: "सामुदायिक स्वास्थ्य शिविर", description: "Free health check-up camps and awareness programs in collaboration with healthcare organizations.", descriptionNp: "स्वास्थ्य संस्थाहरूसँगको सहकार्यमा निःशुल्क स्वास्थ्य जाँच शिविर।" },
  ];

  const items = activities.length ? activities : defaultActivities;

  return (
    <div>
      {/* Section header */}
      <div className="section-header">
        <h2>{isNp ? "कर्पोरेट सामाजिक उत्तरदायित्व" : "Corporate Social Responsibility"}</h2>
        <p>{isNp ? "जहाँ महत्त्व छ त्यहाँ परिवर्तन ल्याउँदै। हामी नेपालभर सार्वजनिक स्वास्थ्य, शिक्षा र राहत प्रयासहरू बढाउन प्रतिबद्ध छौं।" : "Making a meaningful difference. We commit to enhancing public health, education, and relief efforts across Nepal."}</p>
      </div>

      <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map((activity) => {
          const Icon = getIcon(activity.title);
          const iconName = Icon.displayName || Icon.name || "Heart";
          const colors = iconColors[iconName] || iconColors.Heart;
          return (
            <StaggerItem key={activity.id} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-xl">
                {/* Pure Tailwind hover border — no DOM mutation */}
                <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 rounded-t-2xl bg-primary-500 transition-transform duration-300 group-hover:scale-x-100" />

                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${colors.bg} ${colors.hoverBg} transition-colors duration-300`}>
                  <Icon className={`h-7 w-7 ${colors.text} group-hover:text-white transition-colors duration-300`} />
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-gray-900">
                  {isNp && activity.titleNp ? activity.titleNp : activity.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-500">
                  {isNp && activity.descriptionNp ? activity.descriptionNp : activity.description}
                </p>
                <Link
                  href={`/${lang}/csr`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors hover:text-secondary-600"
                >
                  {isNp ? "थप जान्नुहोस्" : "Learn More"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerChildren>
    </div>
  );
}
