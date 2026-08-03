"use client";

import { useEffect, useState } from "react";
import { getAlbums } from "@/lib/public-api";
import GalleryGrid from "@/components/shared/GalleryGrid";
import { useLang } from "@/contexts/LanguageContext";

export default function LangGalleryPage() {
  const lang = useLang();
  const isNp = lang === "np";
  const [albums, setAlbums] = useState<any[]>([]);

  useEffect(() => {
    getAlbums().then(setAlbums).catch(() => {});
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
          <GalleryGrid albums={albums} />
        </div>
      </section>
    </>
  );
}
