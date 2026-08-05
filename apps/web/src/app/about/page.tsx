import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";

const links = [
  { label: "Introduction", href: "#" },
  { label: "Mission & Goals", href: "#" },
  { label: "Strategic Framework", href: "#" },
  { label: "Milestones", href: "#" },
  { label: "Capital Structure", href: "#" },
  { label: "Board of Directors", href: "/team/board-of-directors" },
  { label: "Privacy Policy", href: "#" },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page"><h1 className="text-3xl font-bold">About Us</h1><p className="mt-2 text-primary-100">Learn more about Reliance Finance</p></div>
      </section>
      <section className="py-12">
        <div className="container-page">
          <p className="mb-8 leading-relaxed text-gray-600">
            Reliance Finance Limited is a trusted financial institution in Nepal, committed to providing innovative banking solutions
            and exceptional customer service. With a wide range of products and services, we strive to meet the diverse needs of our customers.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {links.map((l) => (
              <Link key={l.label} href={l.href} className="flex items-center justify-between rounded-lg border bg-white px-6 py-4 transition-shadow hover:shadow-sm">
                <span className="font-medium text-gray-900">{l.label}</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
