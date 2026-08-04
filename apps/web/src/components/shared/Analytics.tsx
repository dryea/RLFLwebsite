"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "https://rfil-api.sudeepdhakal.workers.dev";

/**
 * Privacy-first analytics: no cookies, no personal data, just page views + events.
 * Reports to the CMS analytics endpoint.
 */
export default function Analytics() {
  const pathname = usePathname();
  const lastPath = useRef("");

  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    const payload = { path: pathname, referrer: document.referrer || null };
    try {
      navigator.sendBeacon(`${API}/api/analytics/view`, JSON.stringify(payload));
    } catch {
      fetch(`${API}/api/analytics/view`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    }
  }, [pathname]);

  return null;
}

export function trackEvent(event: string, label?: string) {
  const payload = { event, path: window.location.pathname, label: label || null };
  try {
    navigator.sendBeacon(`${API}/api/analytics/event`, JSON.stringify(payload));
  } catch {
    fetch(`${API}/api/analytics/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }
}
