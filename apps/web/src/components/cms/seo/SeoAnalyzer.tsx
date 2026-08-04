"use client";

import { useState, useCallback, useEffect } from "react";
import { Search, RefreshCw } from "lucide-react";
import { API } from "@/lib/api";
import { getCmsToken } from "@/lib/cms-auth";
import SeoScoreRing from "./SeoScoreRing";
import SeoIssuesList, { type SeoIssue } from "./SeoIssuesList";

export interface SeoAnalyzerProps {
  resourceType: string;
  resourceId: number;
  initialTitle?: string;
  initialDescription?: string;
  initialContent?: string;
  initialKeyword?: string;
  slug?: string;
  compact?: boolean;
  onSaveAnalysis?: (result: any) => void;
}

export default function SeoAnalyzer({
  resourceType,
  resourceId,
  initialTitle,
  initialDescription,
  initialContent,
  initialKeyword,
  slug,
  compact,
  onSaveAnalysis,
}: SeoAnalyzerProps) {
  const [title, setTitle] = useState(initialTitle || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [content, setContent] = useState(initialContent || "");
  const [keyword, setKeyword] = useState(initialKeyword || "");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setTitle(initialTitle || "");
    setDescription(initialDescription || "");
    setContent(initialContent || "");
    setKeyword(initialKeyword || "");
  }, [initialTitle, initialDescription, initialContent, initialKeyword, resourceId]);

  const runAnalysis = useCallback(async (save: boolean) => {
    setLoading(true);
    setSaved(false);
    try {
      const res = await fetch(`${API}/api/cms/seo/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getCmsToken()}` },
        body: JSON.stringify({
          resourceType,
          resourceId,
          title,
          description,
          content,
          focusKeyword: keyword,
          slug,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setResult(data);
        if (save) setSaved(true);
        if (onSaveAnalysis) onSaveAnalysis(data);
      }
    } catch {
      // silent
    }
    setLoading(false);
  }, [resourceType, resourceId, title, description, content, keyword, slug, onSaveAnalysis]);

  const stats = result?.data;

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <Search className="h-4 w-4 text-primary-600" /> SEO Analysis
        </h3>
        <div className="flex items-center gap-2">
          {saved && <span className="text-xs text-green-600">Saved ✓</span>}
          <button
            onClick={() => runAnalysis(true)}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-800 disabled:opacity-50"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} /> {loading ? "Analyzing..." : "Run Analysis"}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Focus Keyword</label>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. savings account"
            className="w-full rounded-lg border px-3 py-1.5 text-sm outline-none focus:border-primary-500"
          />
        </div>

        {!compact && (
          <>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">SEO Title ({title.length}/60)</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border px-3 py-1.5 text-sm outline-none focus:border-primary-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Meta Description ({description.length}/160)</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full rounded-lg border px-3 py-1.5 text-sm outline-none focus:border-primary-500" />
            </div>
          </>
        )}
      </div>

      {result && (
        <div className="mt-5 border-t pt-4">
          <div className="mb-4 flex items-center gap-4">
            <SeoScoreRing score={result.score} />
            {stats && (
              <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
                <Metric label="Words" value={stats.wordCount} />
                <Metric label="Keyword density" value={`${stats.keywordDensity}%`} />
                <Metric label="Readability" value={`${stats.readability?.score || 0}`} />
                <Metric label="Images w/ alt" value={`${stats.imagesWithAlt}/${stats.imageCount}`} />
                <Metric label="Internal links" value={stats.internalLinks} />
                <Metric label="Headings" value={stats.headingCount} />
              </div>
            )}
          </div>
          <SeoIssuesList issues={result.issues as SeoIssue[]} />
        </div>
      )}

      {!result && !loading && (
        <p className="mt-4 text-xs text-gray-400">Enter a focus keyword and click "Run Analysis" to get an SEO score with recommendations.</p>
      )}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-lg bg-gray-50 px-2 py-1.5">
      <p className="font-semibold text-gray-900">{value}</p>
      <p className="text-[10px] text-gray-500">{label}</p>
    </div>
  );
}
