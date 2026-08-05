"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TABS = [
  { id: "mobile", label: "Mobile", features: "✓ Fonepay QR ✓ Bill Pay ✓ Real-time" },
  { id: "ips", label: "connectIPS", features: "✓ Bank Transfer ✓ Govt Taxes ✓ High Limit" },
  { id: "qr", label: "QR Pay", features: "✓ Cashless ✓ Scan-to-Pay ✓ Free Setup" },
];

export default function DigitalTabsWidget() {
  const [tab, setTab] = useState("mobile");
  const current = TABS.find((t) => t.id === tab)!;

  return (
    <div className="mt-auto mb-5 rounded-xl bg-gray-50 p-3 border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[0.7rem] font-bold uppercase tracking-wider text-gray-500">Feature Benefits</span>
        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
      </div>
      <div className="flex gap-1 mb-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-lg border px-1 py-1 text-[0.65rem] font-bold transition-colors ${
              tab === t.id ? "bg-primary-500 text-white border-primary-500" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-primary-600 text-center"
        >
          {current.features}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
