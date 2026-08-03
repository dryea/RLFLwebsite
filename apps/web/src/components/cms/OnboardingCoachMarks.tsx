"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronRight, ChevronLeft, HelpCircle } from "lucide-react";

interface Step {
  target: string; // CSS selector to highlight
  title: string;
  content: string;
  placement?: "top" | "bottom" | "left" | "right";
}

const steps: Step[] = [
  {
    target: "[data-coach='sidebar']",
    title: "Sidebar Navigation",
    content:
      "Use the sidebar to manage all content. Click any section — Pages, Products, News, Media, and more — to start editing your website.",
    placement: "right",
  },
  {
    target: "[data-coach='user-menu']",
    title: "Your Account",
    content:
      "Your email shows here. Use the Sign Out button when you're done to keep the CMS secure.",
    placement: "left",
  },
  {
    target: "[data-coach='main-content']",
    title: "Content Area",
    content:
      "This is where you create and edit content. Every page you publish appears immediately on the public website.",
    placement: "left",
  },
  {
    target: "[data-coach='pages']",
    title: "Manage Pages",
    content:
      "Start with Pages — create About sections, Governance pages, and more. Click the + New button to add a page.",
    placement: "right",
  },
  {
    target: "[data-coach='media']",
    title: "Media Library",
    content:
      "Upload images and documents here. You can insert them into any page with the editor's image button.",
    placement: "right",
  },
  {
    target: "[data-coach='new-page']",
    title: "Create Your First Page",
    content:
      "Click + New to begin. Fill in the title, write content with the editor, and hit Publish to go live.",
    placement: "bottom",
  },
];

export default function OnboardingCoachMarks({ onComplete }: { onComplete?: () => void }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const isDismissed = () => {
    try {
      return localStorage.getItem("cms_onboarding_done") === "true";
    } catch {
      return false;
    }
  };

  useEffect(() => {
    // Auto-open onboarding for first-time users
    if (!isDismissed()) {
      const timer = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const updatePosition = useCallback(() => {
    const step = steps[current];
    if (!step) return;
    const el = document.querySelector(step.target);
    if (!el) {
      // Fallback: center of screen
      setPosition({ top: Math.max(20, window.innerHeight / 2 - 80), left: Math.max(20, window.innerWidth / 2 - 200) });
      return;
    }
    const rect = el.getBoundingClientRect();
    const tooltipW = 320;
    const tooltipH = 180;
    let top = rect.top;
    let left = rect.left;
    const placement = step.placement || "bottom";

    if (placement === "bottom") top = rect.bottom + 10;
    else if (placement === "top") top = rect.top - tooltipH - 10;
    else if (placement === "right") left = rect.right + 10;
    else if (placement === "left") left = rect.left - tooltipW - 10;

    // Keep within viewport
    top = Math.max(10, Math.min(top, window.innerHeight - tooltipH - 10));
    left = Math.max(10, Math.min(left, window.innerWidth - tooltipW - 10));

    setPosition({ top, left });
  }, [current]);

  useEffect(() => {
    if (open) updatePosition();
  }, [open, current, updatePosition]);

  useEffect(() => {
    const onResize = () => updatePosition();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updatePosition]);

  function finish() {
    try {
      localStorage.setItem("cms_onboarding_done", "true");
    } catch {}
    setOpen(false);
    onComplete?.();
  }

  function skip() {
    setOpen(false);
  }

  // Floating button to re-open if dismissed
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-[100] flex h-11 w-11 items-center justify-center rounded-full bg-primary-700 text-white shadow-lg transition-transform hover:scale-105"
        aria-label="Show onboarding help"
        title="Show onboarding help"
      >
        <HelpCircle className="h-5 w-5" />
      </button>
    );
  }

  const step = steps[current];

  return (
    <>
      {/* Spotlight overlay */}
      <div
        className="fixed inset-0 z-[200] bg-black/40 transition-opacity"
        onClick={skip}
        style={{ pointerEvents: "all" }}
      />

      {/* Tooltip card */}
      <div
        className="fixed z-[201] w-80 rounded-xl bg-white p-5 shadow-2xl"
        style={{ top: position.top, left: position.left }}
        role="dialog"
        aria-label="Onboarding help"
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
            Step {current + 1} of {steps.length}
          </span>
          <button onClick={skip} aria-label="Close" className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <X className="h-4 w-4" />
          </button>
        </div>
        <h3 className="mb-1 font-heading text-lg font-bold text-gray-900">{step.title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-gray-600">{step.content}</p>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${i === current ? "bg-primary-700" : "bg-gray-300"}`}
              />
            ))}
          </div>
          {current < steps.length - 1 ? (
            <button
              onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
              className="flex items-center gap-1 rounded-lg bg-primary-700 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={finish}
              className="rounded-lg bg-primary-700 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </>
  );
}
