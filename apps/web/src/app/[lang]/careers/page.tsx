"use client";

import { useEffect, useState } from "react";
import { Briefcase, MapPin, Clock, Send, Mail } from "lucide-react";
import Link from "next/link";
import { getCareers } from "@/lib/public-api";
import { useLang } from "@/contexts/LanguageContext";

export default function LangCareersPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [jobs, setJobs] = useState<any[]>([]);
  useEffect(() => { getCareers().then(setJobs).catch(() => {}); }, []);

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{isNp ? "करियर" : "Careers"}</h1>
          <p className="mt-2 text-primary-100">{isNp ? "रिलायन्स फाइनान्स टोलीमा सामेल हुनुहोस्" : "Join the Reliance Finance team"}</p>
        </div>
      </section>
      <section className="py-12">
        <div className="container-page">
          {jobs.length === 0 ? (
            <div className="mx-auto max-w-2xl rounded-2xl border-2 border-dashed p-12 text-center">
              <Briefcase className="mx-auto mb-4 h-12 w-12 text-primary-200" />
              <h2 className="text-xl font-bold text-gray-900">{isNp ? "अहिले कुनै रिक्त पद छैन" : "No openings right now"}</h2>
              <p className="mt-2 text-sm text-gray-500">
                {isNp
                  ? "नयाँ अवसरहरू चाँडै पोस्ट गरिनेछन्। यसै बीच, तपाईंको CV सहित आफ्नो विवरण हामीलाई पठाउन सक्नुहुन्छ।"
                  : "New opportunities will be posted soon. Meanwhile, feel free to send us your CV and details for future consideration."}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a href="mailto:careers@reliancenepal.com.np?subject=Speculative%20Application" className="inline-flex items-center gap-2 rounded-xl bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-800">
                  <Send className="h-4 w-4" /> careers@reliancenepal.com.np
                </a>
                <a href="mailto:info@reliancenepal.com.np" className="inline-flex items-center gap-2 rounded-xl border border-primary-200 px-5 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-50">
                  <Mail className="h-4 w-4" /> {isNp ? "सामान्य सम्पर्क" : "General Contact"}
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job: any) => (
                <div key={job.id} className="rounded-xl border bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{isNp && job.titleNp ? job.titleNp : job.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                        {job.department && <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" />{job.department}</span>}
                        {job.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</span>}
                        {job.type && <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{job.type}</span>}
                      </div>
                    </div>
                    <Link href={`/${lang}/careers/apply/${job.id}`} className="rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800">
                      {isNp ? "आवेदन गर्नुहोस्" : "Apply"}
                    </Link>
                  </div>
                  {job.description && <p className="mt-4 text-sm text-gray-600">{job.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
