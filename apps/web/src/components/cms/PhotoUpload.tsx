"use client";

import { useRef, useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { api } from "@/lib/api";

export default function PhotoUpload({
  value,
  onChange,
  label = "Photo",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await api.uploadMedia(file);
      onChange(result.url);
    } catch (err) {
      alert("Upload failed: " + err);
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-start gap-3">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-gray-50">
          {value ? (
            <img src={value} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-8 w-8 text-gray-300" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex gap-2">
            <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary-200 px-3 py-1.5 text-xs font-medium text-primary-700 transition-colors hover:bg-primary-50 disabled:opacity-60"
            >
              <Upload className="h-3.5 w-3.5" /> {uploading ? "Uploading..." : "Upload"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-50"
              >
                <X className="h-3.5 w-3.5" /> Remove
              </button>
            )}
          </div>
          <input
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="...or paste image URL"
            className="w-full rounded-lg border px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-primary-500"
          />
        </div>
      </div>
    </div>
  );
}
