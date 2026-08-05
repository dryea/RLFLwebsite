"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { Upload, Trash2, Copy, FolderOpen, Search, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import { api } from "@/lib/api";
import { suggestAltText } from "@/lib/alt-text";

interface MediaItem {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  altText?: string | null;
  createdAt: string;
}

const PAGE_SIZE = 20;

export default function CmsMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    api.getMedia().then(setItems).catch(console.error).finally(() => setLoading(false));
  }, []);

  useEffect(() => { setPage(1); }, [search, typeFilter]);

  const filtered = useMemo(() => {
    let result = items;
    if (typeFilter === "images") result = result.filter((i) => i.mimeType.startsWith("image/"));
    else if (typeFilter === "documents") result = result.filter((i) => !i.mimeType.startsWith("image/"));
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((i) => i.originalName.toLowerCase().includes(q) || i.filename.toLowerCase().includes(q));
    }
    return result;
  }, [items, search, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await api.uploadMedia(file);
      // Auto-suggest alt text from filename (best effort)
      if (result && !result.altText && file.type.startsWith("image/")) {
        const alt = suggestAltText(file.name);
        try {
          await api.updateMedia(result.id, { altText: alt });
          result.altText = alt;
        } catch { /* non-blocking */ }
      }
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

  function copyAlt(item: MediaItem) {
    const alt = item.altText || suggestAltText(item.originalName || item.filename);
    navigator.clipboard?.writeText(alt).then(() => alert("Alt text copied"));
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-900">Media Library <span className="text-sm font-normal text-gray-400">({filtered.length})</span></h2>
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

      {/* Search + Type filter */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex flex-1 min-w-[200px] items-center gap-2 rounded-lg border bg-white px-3 py-2">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search files..."
            className="w-full text-sm outline-none"
          />
          {search && <button onClick={() => setSearch("")} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>}
        </div>
        <div className="flex gap-2">
          {["all", "images", "documents"].map((f) => (
            <button
              key={f}
              onClick={() => setTypeFilter(f)}
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
                typeFilter === f ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div key={i} className="aspect-square animate-pulse rounded-lg bg-gray-200" />
          ))}
        </div>
      ) : paginated.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed p-12 text-center text-gray-500">
          <FolderOpen className="mx-auto mb-2 h-10 w-10 text-gray-300" />
          <p className="text-lg font-medium">{filtered.length === 0 && !search ? "No files yet" : "No files match your search"}</p>
          <p className="mt-1 text-sm">Upload images, PDFs, and documents here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {paginated.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-lg border bg-white">
              <div className="aspect-square overflow-hidden bg-gray-100">
                {isImage(item.mimeType) ? (
                  <img src={item.url} alt={item.originalName} className="h-full w-full object-cover" loading="lazy" />
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
                {item.mimeType.startsWith("image/") && (
                  <button onClick={() => copyAlt(item)} className="rounded bg-white/90 p-1.5 text-primary-600 shadow-sm hover:bg-white" title="Copy alt text">
                    <FileText className="h-3.5 w-3.5" />
                  </button>
                )}
                <button onClick={() => handleDelete(item.id)} className="rounded bg-white/90 p-1.5 text-red-600 shadow-sm hover:bg-white" title="Delete">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded border p-1.5 text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
              .map((p, idx, arr) => (
                <span key={p} className="flex items-center">
                  {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-1 text-gray-400">…</span>}
                  <button
                    onClick={() => setPage(p)}
                    className={`h-8 w-8 rounded text-sm transition-colors ${
                      currentPage === p ? "bg-primary-700 text-white" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                </span>
              ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded border p-1.5 text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </CMSLayout>
  );
}
