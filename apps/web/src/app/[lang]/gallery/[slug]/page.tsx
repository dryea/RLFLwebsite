"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, X, ChevronLeft, ChevronRight, Image } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { getAlbums } from "@/lib/public-api";

export default function AlbumDetailPage() {
  const lang = useLang();
  const params = useParams();
  const slug = params.slug as string;
  const [album, setAlbum] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    getAlbums()
      .then((albums: any[]) => {
        const found = albums.find((a: any) => a.slug === slug);
        setAlbum(found || null);
        if (found?.images) {
          setImages(found.images);
        } else if (found?.photos) {
          setImages(found.photos);
        } else if (found?.coverImage) {
          setImages([found.coverImage]);
        }
      })
      .catch(() => setAlbum(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex !== null && lightboxIndex < images.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  const goPrev = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, images.length]);

  if (loading) {
    return (
      <section className="flex flex-1 items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-700 border-t-transparent" />
      </section>
    );
  }

  if (!album) {
    return (
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-20 text-white">
        <div className="container-page text-center">
          <h1 className="mb-2 text-3xl font-bold">
            {lang === "en" ? "Album Not Found" : "एल्बम फेला परेन"}
          </h1>
          <p className="mb-6 text-primary-100">
            {lang === "en" ? "The album you're looking for doesn't exist." : "तपाईंले खोज्नुभएको एल्बम अवस्थित छैन।"}
          </p>
          <Link href="/gallery" className="rounded-lg bg-accent-500 px-6 py-3 font-semibold text-white hover:bg-accent-600">
            {lang === "en" ? "View All Albums" : "सबै एल्बमहरू हेर्नुहोस्"}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 py-14 text-white">
        <div className="container-page">
          <Link href="/gallery" className="mb-4 inline-flex items-center gap-1 text-sm text-primary-200 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> {lang === "en" ? "Back to Gallery" : "ग्यालरीमा फर्कनुहोस्"}
          </Link>
          <h1 className="text-3xl font-bold md:text-4xl">{album.title}</h1>
          {album.description && <p className="mt-3 max-w-2xl text-lg text-primary-100">{album.description}</p>}
          <p className="mt-2 text-sm text-primary-200">
            {images.length} {lang === "en" ? "photos" : "फोटोहरू"}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          {images.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed p-12 text-center text-gray-500">
              <Image className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="text-lg font-medium">
                {lang === "en" ? "No photos in this album" : "यस एल्बममा कुनै फोटो छैन"}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => openLightbox(i)}
                  className="group overflow-hidden rounded-xl border bg-gray-100 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={img}
                      alt={`${album.title} ${i + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                disabled={lightboxIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 disabled:opacity-30"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                disabled={lightboxIndex === images.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 disabled:opacity-30"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="max-h-[85vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightboxIndex]}
              alt={`${album.title} ${lightboxIndex + 1}`}
              className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            />
            <p className="mt-3 text-center text-sm text-white/70">
              {lightboxIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
