import { Download } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import { serverFetchAPI } from "@/lib/server-api";

export const dynamic = "force-dynamic";

export default async function DownloadsPage() {
  const items = await serverFetchAPI("/api/downloads");

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page"><h1 className="text-3xl font-bold">Downloads</h1><p className="mt-2 text-primary-100">Download forms, brochures and documents</p></div>
      </section>
      <section className="py-12">
        <div className="container-page max-w-3xl">
          <div className="space-y-3">
            {items.map((item: any) => (
              <a key={item.id} href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-lg border bg-white px-6 py-4 transition-shadow hover:shadow-sm">
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
                </div>
                <Download className="h-5 w-5 shrink-0 text-primary-700" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
