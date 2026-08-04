"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StaggerChildren, { StaggerItem } from "@/components/motion/StaggerChildren";

interface Album {
  id: number;
  title: string;
  coverImage?: string;
}

export default function GalleryGrid({ albums }: { albums: Album[] }) {
  const [selected, setSelected] = useState<Album | null>(null);

  return (
    <>
      <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <StaggerItem key={album.id} className="h-full">
            <button
              onClick={() => setSelected(album)}
              className="group h-full w-full overflow-hidden rounded-xl border bg-white text-left shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="aspect-video overflow-hidden bg-gray-100">
                {album.coverImage ? (
                  <img
                    src={album.coverImage}
                    alt={`${album.title} — Reliance Finance Limited gallery`}
                    width={640}
                    height={360}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
          </StaggerItem>
        ))}
      </StaggerChildren>
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selected.coverImage}
                alt={`${selected.title} — Reliance Finance Limited`}
                width={1200}
                height={675}
                className="max-h-[80vh] rounded-lg"
              />
              <p className="mt-3 text-center text-white">{selected.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
