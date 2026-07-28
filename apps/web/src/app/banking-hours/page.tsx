"use client";

import { Clock } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";

export default function BankingHoursPage() {
  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page"><h1 className="text-3xl font-bold">Banking Hours</h1></div>
      </section>
      <section className="py-12">
        <div className="container-page max-w-2xl">
          <div className="rounded-xl border bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3 text-primary-700"><Clock className="h-8 w-8" /><h2 className="text-xl font-bold text-gray-900">Service Hours</h2></div>
            <div className="space-y-4 text-gray-700">
              {[["Sunday - Thursday", "10:00 AM - 5:00 PM"], ["Friday", "10:00 AM - 12:00 PM"], ["Saturday & Holidays", "Closed"]].map(([day, time]) => (
                <div key={day} className="flex justify-between border-b pb-2 last:border-0"><span className="font-medium">{day}</span><span>{time}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
