"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, Package, Newspaper, Image, Users, Settings, LogOut, LayoutDashboard, MapPin, HelpCircle, Briefcase, Download, ImageIcon } from "lucide-react";
import { getCmsUser, cmsLogout, type CmsUser } from "@/lib/cms-auth";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/cms/dashboard" },
  { label: "Pages", icon: FileText, href: "/cms/pages" },
  { label: "Products", icon: Package, href: "/cms/products" },
  { label: "Services", icon: Package, href: "/cms/services" },
  { label: "Team", icon: Users, href: "/cms/team" },
  { label: "Branches", icon: Users, href: "/cms/branches" },
  { label: "Rates", icon: FileText, href: "/cms/rates" },
  { label: "News", icon: Newspaper, href: "/cms/news" },
  { label: "Notices", icon: FileText, href: "/cms/notices" },
  { label: "Reports", icon: FileText, href: "/cms/reports" },
  { label: "Gallery", icon: Image, href: "/cms/gallery" },
  { label: "Downloads", icon: FileText, href: "/cms/downloads" },
  { label: "FAQ", icon: FileText, href: "/cms/faq" },
  { label: "Careers", icon: FileText, href: "/cms/careers" },
  { label: "Media", icon: Image, href: "/cms/media" },
  { label: "Settings", icon: Settings, href: "/cms/settings" },
];

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<CmsUser | null>(null);

  useEffect(() => {
    const u = getCmsUser();
    if (!u) router.replace("/cms/login");
    else setUser(u);
  }, [router]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="hidden w-64 flex-col bg-white shadow-sm lg:flex">
        <div className="flex items-center gap-3 border-b px-6 py-5">
          <img src="https://reliancenepal.com.np/assets/images/reliance/logo.png" alt="" className="h-8" />
          <span className="text-sm font-semibold text-gray-700">CMS</span>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
            >
              <item.icon className="h-4 w-4 text-gray-400" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t px-3 py-3">
          <div className="mb-2 px-3 text-xs text-gray-500">{user.email}</div>
          <button onClick={cmsLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
          <h1 className="text-lg font-bold text-gray-900">CMS</h1>
          <span className="text-sm text-gray-500">{user.name}</span>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
