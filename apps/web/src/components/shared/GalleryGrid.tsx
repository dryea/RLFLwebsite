"use client";

import { useState } from "react";

interface Album {
  id: number;
  title: string;
  coverImage?: string;
}

export default function GalleryGrid({ albums }: { albums: Album[] }) {
  const [selected, setSelected] = useState<Album | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <button
            key={album.id}
            onClick={() => setSelected(album)}
            className="group overflow-hidden rounded-xl border bg-white text-left shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="aspect-video overflow-hidden bg-gray-100">
              {album.coverImage ? (
                <img
                  src={album.coverImage}
                  alt={`${album.title} — Reliance Finance Limited gallery`}
                  width={640}
                  height={360}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  📷
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{album.title}</h3>
            </div>
          </button>
        ))}
      </div>
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
        >
          <div className="max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={selected.coverImage}
              alt={`${selected.title} — Reliance Finance Limited`}
              width={1200}
              height={675}
              className="max-h-[80vh] rounded-lg"
            />
            <p className="mt-3 text-center text-white">{selected.title}</p>
          </div>
        </div>
      )}
    </>
  );
}
