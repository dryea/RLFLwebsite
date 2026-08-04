"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Mail, Phone, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { fetchAPI } from "@/lib/public-api";
import { useLang } from "@/contexts/LanguageContext";

const categoryMeta: Record<string, { en: string; np: string }> = {
  "board-of-directors": { en: "Board of Directors", np: "सञ्चालक समिति" },
  "management-team": { en: "Management Team", np: "व्यवस्थापन टोली" },
  "head-of-department": { en: "Head of Department", np: "विभाग प्रमुख" },
  "branch-manager": { en: "Branch Managers", np: "शाखा प्रबन्धक" },
  "branch-managers": { en: "Branch Managers", np: "शाखा प्रबन्धक" },
  "committee-of-directors": { en: "Committee of Directors", np: "संचालक समिति" },
};

export default function TeamCategoryPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const params = useParams();
  const category = (params.category as string) || "";
  const [members, setMembers] = useState<any[]>([]);

  const meta = categoryMeta[category] || { en: category, np: category };

  useEffect(() => {
    if (!category) return;
    // Try the category slug directly, fall back to all members filtered by category name
    fetchAPI(`/api/team/${category}`)
      .then((d) => { if (Array.isArray(d) && d.length) setMembers(d); })
      .catch(() => {
        fetchAPI("/api/team/categories").then(async (cats: any[]) => {
          const match = cats.find((c) => c.slug === category || c.slug === category.replace(/s$/, ""));
          if (match) {
            const m = await fetchAPI(`/api/team/${match.slug}`).catch(() => []);
            if (Array.isArray(m)) setMembers(m);
          }
        }).catch(() => {});
      });
  }, [category]);

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <Link href={`/${lang}/governance`} className="mb-4 inline-flex items-center gap-1 text-sm text-primary-200 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> {isNp ? "सुशासनमा फर्कनुहोस्" : "Back to Governance"}
          </Link>
          <h1 className="text-3xl font-bold">{isNp ? meta.np : meta.en}</h1>
          <p className="mt-2 text-primary-100">{isNp ? `हाम्रो ${meta.np}` : `Our ${meta.en}`}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {members.length === 0 ? (
              <div className="col-span-full rounded-lg border-2 border-dashed p-12 text-center text-gray-500">
                <p className="text-lg font-medium">{isNp ? "कुनै सदस्य फेला परेन" : "No members found"}</p>
              </div>
            ) : members.map((m: any) => (
              <div key={m.id} className="rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-primary-100">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} className="h-full w-full object-cover" width={64} height={64} />
                  ) : (
                    <span className="text-xl font-bold text-primary-700">{(m.name || "?").charAt(0)}</span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900">{isNp && m.nameNp ? m.nameNp : m.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{isNp && m.designationNp ? m.designationNp : m.designation}</p>
                {(m.email || m.phone) && (
                  <div className="mt-3 space-y-1 text-xs text-gray-400">
                    {m.email && <a href={`mailto:${m.email}`} className="flex items-center gap-1 hover:text-primary-700"><Mail className="h-3 w-3" /> {m.email}</a>}
                    {m.phone && <a href={`tel:${m.phone}`} className="flex items-center gap-1 hover:text-primary-700"><Phone className="h-3 w-3" /> {m.phone}</a>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
