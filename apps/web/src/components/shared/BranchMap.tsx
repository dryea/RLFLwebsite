"use client";
import { useEffect, useRef } from "react";

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
  bankingHours?: string;
  managerName?: string;
}

export default function BranchMap({ branches, lang }: { branches: Branch[]; lang: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    async function initMap() {
      const L = await import("leaflet");

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      if (!mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current).setView([27.7172, 85.3240], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      branches.forEach((b) => {
        if (!b.latitude || !b.longitude) return;
        const marker = L.marker([b.latitude, b.longitude])
          .addTo(map)
          .bindPopup(`
            <strong>${lang === "np" && b.nameNp ? b.nameNp : b.name}</strong><br/>
            ${lang === "np" && b.addressNp ? b.addressNp : b.address}<br/>
            ${b.phone ? `📞 ${b.phone}<br/>` : ""}
            ${b.email ? `✉️ ${b.email}<br/>` : ""}
            ${b.bankingHours ? `🕐 ${b.bankingHours}` : ""}
          `);
        markersRef.current.push(marker);
      });

      if (markersRef.current.length > 0) {
        const group = L.featureGroup(markersRef.current);
        map.fitBounds(group.getBounds().pad(0.1));
      }

      mapInstanceRef.current = map;
    }

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [branches, lang]);

  return <div ref={mapRef} className="h-[500px] w-full rounded-xl border z-0" />;
}
