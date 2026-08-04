"use client";

import { useLang } from "@/contexts/LanguageContext";
import { Users, ShieldCheck, Activity, Landmark } from "lucide-react";
import StaggerChildren, { StaggerItem } from "@/components/motion/StaggerChildren";

const committees = [
  {
    icon: ShieldCheck,
    title: { en: "Audit Committee", np: "लेखापरीक्षण समिति" },
    color: "bg-blue-50 text-blue-700",
    members: [
      { name: "Tulsi Prasad Baral", role: { en: "Co-ordinator", np: "संयोजक" } },
      { name: "Pradeep Guragain", role: { en: "Member", np: "सदस्य" } },
      { name: "Santosh Trital", role: { en: "Member Secretary", np: "सदस्य सचिव" } },
    ],
  },
  {
    icon: Activity,
    title: { en: "Risk Management Committee", np: "जोखिम व्यवस्थापन समिति" },
    color: "bg-green-50 text-green-700",
    members: [
      { name: "Yugesh Lal Bijukchhe", role: { en: "Co-ordinator", np: "संयोजक" } },
      { name: "Tulsi Prasad Baral", role: { en: "Member", np: "सदस्य" } },
      { name: "Rakesh Dangol", role: { en: "Member", np: "सदस्य" } },
      { name: "Pradeep Guragain", role: { en: "Member Secretary", np: "सदस्य सचिव" } },
      { name: "Dr. Buddhi Malla", role: { en: "Member", np: "सदस्य" } },
      { name: "Anashru Bartaula", role: { en: "Member", np: "सदस्य" } },
      { name: "Pranjal Timsina", role: { en: "Member Secretary", np: "सदस्य सचिव" } },
    ],
  },
  {
    icon: Landmark,
    title: { en: "AML-CFT Committee", np: "एएमएल-सीएफटी समिति" },
    color: "bg-purple-50 text-purple-700",
    members: [
      { name: "Saraswati Pathak", role: { en: "Co-ordinator", np: "संयोजक" } },
      { name: "Pradeep Guragain", role: { en: "Member", np: "सदस्य" } },
      { name: "Akhanda Shrestha", role: { en: "Member Secretary", np: "सदस्य सचिव" } },
    ],
  },
];

export default function CommitteeOfDirectorsPage() {
  const lang = useLang();
  const isNp = lang === "np";

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <Users className="h-7 w-7" /> {isNp ? "संचालक समिति" : "Committee of Directors"}
          </h1>
          <p className="mt-2 text-primary-100">
            {isNp ? "हाम्रा समिति सदस्यहरू" : "Our board committees and members"}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <StaggerChildren className="grid gap-6 md:grid-cols-2">
            {committees.map((committee) => {
              const Icon = committee.icon;
              return (
                <StaggerItem key={committee.title.en} className="h-full">
                  <div className="h-full rounded-xl border bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-3">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${committee.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {isNp ? committee.title.np : committee.title.en}
                      </h2>
                    </div>
                    <div className="divide-y">
                      {committee.members.map((m) => (
                        <div key={m.name} className="flex items-center justify-between gap-2 py-2.5">
                          <span className="text-sm font-medium text-gray-800">{m.name}</span>
                          <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                            {isNp ? m.role.np : m.role.en}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
