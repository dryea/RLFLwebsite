"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Accessibility, ZoomIn, ZoomOut, Sun, RotateCcw,
  Eye, Image as ImageIcon, MousePointer2, Activity, Focus
} from "lucide-react";

export default function AccessibilityToolbar() {
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [hideImages, setHideImages] = useState(false);
  const [pauseAnimations, setPauseAnimations] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [readingGuide, setReadingGuide] = useState(false);
  const [readingMask, setReadingMask] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("a11y_prefs");
    if (saved) {
      try {
        const prefs = JSON.parse(saved);
        setFontSize(prefs.fontSize ?? 100);
        setHighContrast(prefs.highContrast ?? false);
        setHideImages(prefs.hideImages ?? false);
        setPauseAnimations(prefs.pauseAnimations ?? false);
        setHighlightLinks(prefs.highlightLinks ?? false);
      } catch {}
    }
  }, []);

  const savePrefs = useCallback((overrides: Record<string, any>) => {
    try {
      const existing = JSON.parse(localStorage.getItem("a11y_prefs") || "{}");
      const next = { ...existing, ...overrides };
      localStorage.setItem("a11y_prefs", JSON.stringify(next));
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", highContrast);
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.classList.toggle("hide-images", hideImages);
  }, [hideImages]);

  useEffect(() => {
    document.documentElement.classList.toggle("pause-animations", pauseAnimations);
  }, [pauseAnimations]);

  useEffect(() => {
    document.documentElement.classList.toggle("highlight-links", highlightLinks);
  }, [highlightLinks]);

  useEffect(() => {
    if (!readingGuide) return;
    const guide = document.createElement("div");
    guide.id = "reading-guide";
    guide.style.cssText = "position:fixed;left:0;right:0;height:2px;background:#f00;z-index:99999;pointer-events:none;opacity:0.7;transition:top 0.1s;";
    document.body.appendChild(guide);
    const handler = (e: MouseEvent) => { guide.style.top = `${e.clientY}px`; };
    document.addEventListener("mousemove", handler);
    return () => {
      document.removeEventListener("mousemove", handler);
      guide.remove();
    };
  }, [readingGuide]);

  useEffect(() => {
    if (!readingMask) {
      document.querySelectorAll(".reading-mask").forEach(el => el.remove());
      return;
    }
    const mask = document.createElement("div");
    mask.className = "reading-mask";
    mask.style.cssText = "position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:99998;pointer-events:none;";
    const highlight = document.createElement("div");
    highlight.style.cssText = "position:absolute;left:0;right:0;height:120px;background:transparent;border-top:2px solid #fff;border-bottom:2px solid #fff;";
    mask.appendChild(highlight);
    document.body.appendChild(mask);
    const handler = (e: MouseEvent) => { highlight.style.top = `${Math.max(e.clientY - 60, 0)}px`; };
    document.addEventListener("mousemove", handler);
    return () => {
      document.removeEventListener("mousemove", handler);
      mask.remove();
    };
  }, [readingMask]);

  function resetAll() {
    setFontSize(100);
    setHighContrast(false);
    setHideImages(false);
    setPauseAnimations(false);
    setHighlightLinks(false);
    setReadingGuide(false);
    setReadingMask(false);
    localStorage.removeItem("a11y_prefs");
  }

  function togglePref(key: string, setter: (v: boolean) => void, current: boolean) {
    setter(!current);
    savePrefs({ [key]: !current });
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 text-white shadow-lg hover:bg-primary-800"
        aria-label="Accessibility options"
      >
        <Accessibility className="h-5 w-5" />
      </button>
      {open && (
        <div className="fixed bottom-16 left-4 z-50 max-h-[70vh] w-64 overflow-y-auto rounded-xl border bg-white p-4 shadow-xl">
          <div className="mb-3 text-sm font-semibold text-gray-700">Accessibility</div>
          <div className="flex flex-col gap-1.5">
            <button onClick={() => setFontSize(f => { const n = Math.min(f + 10, 150); savePrefs({fontSize:n}); return n; })} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
              <ZoomIn className="h-4 w-4 text-gray-500" /> Increase Font
            </button>
            <button onClick={() => setFontSize(f => { const n = Math.max(f - 10, 70); savePrefs({fontSize:n}); return n; })} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
              <ZoomOut className="h-4 w-4 text-gray-500" /> Decrease Font
            </button>
            <button onClick={() => togglePref("highContrast", setHighContrast, highContrast)} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 ${highContrast ? "bg-amber-50" : ""}`}>
              <Sun className="h-4 w-4 text-gray-500" /> {highContrast ? "✓ High Contrast" : "High Contrast"}
            </button>
            <button onClick={() => togglePref("hideImages", setHideImages, hideImages)} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 ${hideImages ? "bg-amber-50" : ""}`}>
              <ImageIcon className="h-4 w-4 text-gray-500" /> {hideImages ? "✓ Hide Images" : "Hide Images"}
            </button>
            <button onClick={() => togglePref("pauseAnimations", setPauseAnimations, pauseAnimations)} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 ${pauseAnimations ? "bg-amber-50" : ""}`}>
              <Activity className="h-4 w-4 text-gray-500" /> {pauseAnimations ? "✓ Pause Animations" : "Pause Animations"}
            </button>
            <button onClick={() => togglePref("highlightLinks", setHighlightLinks, highlightLinks)} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 ${highlightLinks ? "bg-amber-50" : ""}`}>
              <MousePointer2 className="h-4 w-4 text-gray-500" /> {highlightLinks ? "✓ Highlight Links" : "Highlight Links"}
            </button>
            <button onClick={() => { setReadingGuide(!readingGuide); }} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 ${readingGuide ? "bg-amber-50" : ""}`}>
              <Eye className="h-4 w-4 text-gray-500" /> {readingGuide ? "✓ Reading Guide" : "Reading Guide"}
            </button>
            <button onClick={() => { setReadingMask(!readingMask); }} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 ${readingMask ? "bg-amber-50" : ""}`}>
              <Focus className="h-4 w-4 text-gray-500" /> {readingMask ? "✓ Reading Mask" : "Reading Mask"}
            </button>
            <hr className="my-2" />
            <button onClick={resetAll} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50">
              <RotateCcw className="h-4 w-4" /> Reset All
            </button>
          </div>
          <div className="mt-3 text-xs text-gray-400">Font: {fontSize}%</div>
        </div>
      )}
    </>
  );
}
