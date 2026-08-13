"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

interface Branch {
  id: number;
  name: string;
  nameNp?: string;
  address: string;
  addressNp?: string;
  phone?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
  region?: string;
  province?: string;
  bankingHours?: string;
  managerName?: string;
}

const markerIcon = `<svg width="30" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 0C7.03 0 3 4.03 3 9c0 5.25 7.5 13.5 9 15 .75.9 1.5.9 2.25 0 1.5-1.5 9-9.75 9-15 0-4.97-4.03-9-9-9z" fill="#0F4C81"/>
  <circle cx="12" cy="9" r="4" fill="#D4AF37"/>
</svg>`;

export default function BranchMap({ branches, lang }: { branches: Branch[]; lang: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function initMap() {
      const L = await import("leaflet");
      if (cancelled || !mapRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersRef.current = [];
      }

      const divIcon = L.divIcon({
        className: "",
        html: markerIcon,
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        popupAnchor: [0, -38],
      });

      const map = L.map(mapRef.current, { scrollWheelZoom: false }).setView([27.7172, 85.324], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      branches.forEach((b) => {
        if (!b.latitude || !b.longitude) return;
        const marker = L.marker([b.latitude, b.longitude], { icon: divIcon })
          .addTo(map)
          .bindPopup(`
            <div style="min-width:180px;font-family:system-ui,sans-serif;padding:4px;">
              <strong style="color:#0F4C81;font-size:14px;">${lang === "np" && b.nameNp ? b.nameNp : b.name}</strong><br/>
              <span style="font-size:12px;color:#555;">${lang === "np" && b.addressNp ? b.addressNp : b.address}</span><br/>
              ${b.phone ? `<span style="font-size:12px;">📞 ${b.phone}</span><br/>` : ""}
              ${b.email ? `<span style="font-size:12px;">✉️ ${b.email}</span><br/>` : ""}
              ${b.bankingHours ? `<span style="font-size:12px;">🕐 ${b.bankingHours}</span>` : ""}
            </div>
          `);
        markersRef.current.push(marker);
      });

      if (markersRef.current.length > 0) {
        const group = L.featureGroup(markersRef.current);
        map.fitBounds(group.getBounds().pad(0.15));
      }

      setTimeout(() => map.invalidateSize(), 200);
      mapInstanceRef.current = map;
    }

    initMap();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markersRef.current = [];
    };
  }, [branches, lang]);

  return <div ref={mapRef} className="h-[500px] w-full rounded-2xl border border-slate-200 shadow-sm z-0" />;
}
