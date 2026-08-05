"use client";

import { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";
import { getAlbums } from "@/lib/public-api";
import GalleryGrid from "@/components/shared/GalleryGrid";
import { useLang } from "@/contexts/LanguageContext";
import { SkeletonGrid } from "@/components/ui/Skeleton";

export default function LangGalleryPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAlbums().then(setAlbums).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{isNp ? "ग्यालरी" : "Gallery"}</h1>
          <p className="mt-2 text-primary-100">{isNp ? "घटना र गतिविधिहरूको फोटो ग्यालरी" : "Photo gallery of events and activities"}</p>
        </div>
      </section>
      <section className="py-12">
        <div className="container-page">
          {loading ? (
            <SkeletonGrid count={6} columns={3} />
          ) : albums.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-2xl border-2 border-dashed p-12 text-center">
              <ImageIcon className="mx-auto mb-4 h-12 w-12 text-primary-200" />
              <h2 className="text-xl font-bold text-gray-900">{isNp ? "फोटोहरू चाँडै आउँदैछन्" : "Photos coming soon"}</h2>
              <p className="mt-2 text-sm text-gray-500">
                {isNp
                  ? "हाम्रा कार्यक्रम र गतिविधिका तस्बिरहरू चाँडै यहाँ सार्वजनिक गरिनेछन्।"
                  : "Photos from our events and activities will be published here soon."}
              </p>
            </div>
          ) : (
            <GalleryGrid albums={albums} />
          )}
        </div>
      </section>
    </>
  );
}
