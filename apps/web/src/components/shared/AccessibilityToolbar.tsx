"use client";
import { useState, useEffect } from "react";
import { Accessibility, ZoomIn, ZoomOut, Sun, Volume2, RotateCcw } from "lucide-react";

export default function AccessibilityToolbar() {
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  function toggleContrast() {
    document.documentElement.classList.toggle("high-contrast");
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
        <div className="fixed bottom-16 left-4 z-50 rounded-xl border bg-white p-4 shadow-xl">
          <div className="mb-3 text-sm font-semibold text-gray-700">Accessibility</div>
          <div className="flex flex-col gap-2">
            <button onClick={() => setFontSize(f => Math.min(f + 10, 150))} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
              <ZoomIn className="h-4 w-4" /> Increase Font
            </button>
            <button onClick={() => setFontSize(f => Math.max(f - 10, 70))} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
              <ZoomOut className="h-4 w-4" /> Decrease Font
            </button>
            <button onClick={toggleContrast} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
              <Sun className="h-4 w-4" /> Toggle Contrast
            </button>
            <button onClick={() => setFontSize(100)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>
        </div>
      )}
    </>
  );
}
