"use client";

import { useEffect, useState } from "react";
import { getBranches } from "@/lib/public-api";
import BranchList from "@/components/shared/BranchList";
import { useLang } from "@/contexts/LanguageContext";

export default function LangBranchesPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [branches, setBranches] = useState<any[]>([]);

  useEffect(() => {
    getBranches().then(setBranches).catch(() => {});
  }, []);

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{isNp ? "शाखाहरू" : "Branches"}</h1>
          <p className="mt-2 text-primary-100">{isNp ? "तपाईंको नजिकको शाखा पत्ता लगाउनुहोस्" : "Find a branch near you"}</p>
        </div>
      </section>
      <section className="py-12">
        <div className="container-page">
          <BranchList branches={branches} lang={lang} />
        </div>
      </section>
    </>
  );
}
