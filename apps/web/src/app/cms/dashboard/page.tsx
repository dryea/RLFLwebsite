import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  Package,
  Settings,
  Users,
  Newspaper,
  Image,
  LogOut,
} from "lucide-react";

const modules = [
  { label: "Pages", icon: FileText, href: "/cms/pages", count: "—" },
  { label: "Products", icon: Package, href: "/cms/products", count: "—" },
  { label: "News", icon: Newspaper, href: "/cms/news", count: "—" },
  { label: "Media", icon: Image, href: "/cms/media", count: "—" },
  { label: "Users", icon: Users, href: "/cms/users", count: "—" },
  { label: "Settings", icon: Settings, href: "/cms/settings", count: "—" },
];

export default async function CmsDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/cms/login");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col bg-white shadow-sm lg:flex">
        <div className="flex items-center gap-3 border-b px-6 py-5">
          <img
            src="https://reliancenepal.com.np/assets/images/reliance/logo.png"
            alt=""
            className="h-8"
          />
          <span className="text-sm font-semibold text-gray-700">CMS</span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {modules.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
            >
              <m.icon className="h-4 w-4 text-gray-400" />
              {m.label}
            </Link>
          ))}
        </nav>
        <div className="border-t px-3 py-3">
          <div className="mb-2 px-3 text-xs text-gray-500">
            {session.user.email}
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100"
          >
            <LogOut className="h-4 w-4" />
            View Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1">
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
          <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
          <span className="text-sm text-gray-500">
            Welcome, {session.user.name}
          </span>
        </header>

        <main className="p-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => {
              const Icon = m.icon;
              return (
                <Link
                  key={m.href}
                  href={m.href}
                  className="rounded-xl border bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 inline-flex rounded-lg bg-primary-50 p-3 text-primary-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="font-semibold text-gray-900">{m.label}</h2>
                  <p className="mt-1 text-sm text-gray-500">{m.count} items</p>
                </Link>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
