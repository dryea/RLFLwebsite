"use client";

import { useEffect, useState, useRef } from "react";
import { Upload, Trash2, Copy, FolderOpen } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import { api } from "@/lib/api";

interface MediaItem {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: string;
}

export default function CmsMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    api.getMedia().then(setItems).catch(console.error).finally(() => setLoading(false));
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await api.uploadMedia(file);
      setItems((prev) => [result, ...prev]);
    } catch (err) {
      alert("Upload failed: " + err);
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this file?")) return;
    await api.deleteMedia(id);
    setItems((p) => p.filter((x) => x.id !== id));
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  function isImage(mime: string) {
    return mime.startsWith("image/");
  }

  return (
    <CMSLayout>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Media Library</h2>
        <div>
          <input ref={fileRef} type="file" onChange={handleUpload} className="hidden" />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-800 disabled:opacity-60"
          >
            <Upload className="h-4 w-4" /> {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-square animate-pulse rounded-lg bg-gray-200" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed p-12 text-center text-gray-500">
          <FolderOpen className="mx-auto mb-2 h-10 w-10 text-gray-300" />
          <p className="text-lg font-medium">No files yet</p>
          <p className="mt-1 text-sm">Upload images, PDFs, and documents here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-lg border bg-white">
              <div className="aspect-square overflow-hidden bg-gray-100">
                {isImage(item.mimeType) ? (
                  <img src={item.url} alt={item.originalName} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    <span className="text-xs font-medium uppercase">{item.mimeType.split("/")[1]}</span>
                  </div>
                )}
              </div>
              <div className="p-2">
                <p className="truncate text-xs font-medium text-gray-700">{item.originalName}</p>
                <p className="text-xs text-gray-400">{formatSize(item.size)}</p>
              </div>
              <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button onClick={() => copyUrl(item.url)} className="rounded bg-white/90 p-1.5 text-gray-600 shadow-sm hover:bg-white" title="Copy URL">
                  <Copy className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="rounded bg-white/90 p-1.5 text-red-600 shadow-sm hover:bg-white" title="Delete">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </CMSLayout>
  );
}
