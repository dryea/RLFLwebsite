"use client";

import { useEffect, useState } from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { getAlbums } from "@/lib/public-api";

export default function GalleryPage() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  useEffect(() => { getAlbums().then(setAlbums).catch(() => {}); }, []);

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page"><h1 className="text-3xl font-bold">Gallery</h1><p className="mt-2 text-primary-100">Photo gallery of events and activities</p></div>
      </section>
      <section className="py-12">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album: any) => (
              <button key={album.id} onClick={() => setSelected(album)} className="group overflow-hidden rounded-xl border bg-white text-left shadow-sm transition-shadow hover:shadow-md">
                <div className="aspect-video overflow-hidden bg-gray-100">
                  {album.coverImage ? <img src={album.coverImage} alt={album.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-gray-400">📷</div>}
                </div>
                <div className="p-4"><h3 className="font-semibold text-gray-900">{album.title}</h3></div>
              </button>
            ))}
          </div>
        </div>
      </section>
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setSelected(null)}>
          <div className="max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img src={selected.coverImage} alt={selected.title} className="max-h-[80vh] rounded-lg" />
            <p className="mt-3 text-center text-white">{selected.title}</p>
          </div>
        </div>
      )}
    </PublicLayout>
  );
}
