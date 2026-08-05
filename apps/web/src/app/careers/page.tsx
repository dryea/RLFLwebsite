"use client";

import { useEffect, useState } from "react";
import { Briefcase, MapPin, Clock, ExternalLink } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import { getCareers } from "@/lib/public-api";

export default function CareersPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  useEffect(() => { getCareers().then(setJobs).catch(() => {}); }, []);

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page"><h1 className="text-3xl font-bold">Careers</h1><p className="mt-2 text-primary-100">Join the Reliance Finance team</p></div>
      </section>
      <section className="py-12">
        <div className="container-page">
          {jobs.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed p-12 text-center text-gray-500">
              <Briefcase className="mx-auto mb-2 h-10 w-10 text-gray-300" />
              <p className="text-lg font-medium">No openings right now</p>
              <p className="mt-1 text-sm">Check back later or drop your CV.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job: any) => (
                <div key={job.id} className="rounded-xl border bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                        {job.department && <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" />{job.department}</span>}
                        {job.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</span>}
                        {job.type && <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{job.type}</span>}
                      </div>
                    </div>
                    <a href={`/careers/apply/${job.id}`} className="flex items-center gap-1 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-800">
                      Apply <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  {job.description && <p className="mt-4 text-sm text-gray-600">{job.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
