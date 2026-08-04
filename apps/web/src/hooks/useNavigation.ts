"use client";

import { useState, useEffect } from "react";

export interface NavItemData {
  id: number;
  label: string;
  href: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  description: string | null;
  isOpenInNewTab: boolean;
  children: NavItemData[];
}

const API = process.env.NEXT_PUBLIC_API_URL || "https://rfil-api.sudeepdhakal.workers.dev";

export function useNavigation(slug: string, lang: string): NavItemData[] {
  const [items, setItems] = useState<NavItemData[]>([]);

  useEffect(() => {
    const locale = lang || "en";
    fetch(`${API}/api/navigation/${slug}?locale=${locale}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setItems(data);
      })
      .catch(() => {});
  }, [slug, lang]);

  return items;
}
