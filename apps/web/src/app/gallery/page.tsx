import PublicLayout from "@/components/layout/PublicLayout";
import { serverFetchAPI } from "@/lib/server-api";
import GalleryGrid from "@/components/shared/GalleryGrid";

export const revalidate = 300;

export default async function GalleryPage() {
  const albums = await serverFetchAPI("/api/cms/albums");

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page"><h1 className="text-3xl font-bold">Gallery</h1><p className="mt-2 text-primary-100">Photo gallery of events and activities</p></div>
      </section>
      <section className="py-12">
        <div className="container-page">
          <GalleryGrid albums={albums} />
        </div>
      </section>
    </PublicLayout>
  );
}
