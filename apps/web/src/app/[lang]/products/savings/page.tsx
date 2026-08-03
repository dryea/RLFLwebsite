import Link from "next/link";
import { PiggyBank, TrendingUp, GraduationCap, Coins, Star, Building, HeartHandshake, Mountain, Sparkles, Award, Gem, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return { title: lang === "en" ? "Savings Accounts | Reliance Finance Limited" : "बचत खाताहरू | रिलायन्स फाइनान्स लिमिटेड" };
}

const savingsProducts = [
  { slug: "normal-saving-account", title: "Normal Saving Account", icon: PiggyBank, minBalance: "NPR 100", features: ["Free Mobile Banking (1st Year)", "Free statement facility", "Daily transaction access"], type: "general", enquireLink: "#" },
  { slug: "investor-saving-account", title: "Investor's Saving Account", icon: TrendingUp, minBalance: "NPR 100", features: ["Demat Account Setup assistance", "C-ASBA activation enabled", "Share market integrated"], type: "general" },
  { slug: "student-saving-account", title: "Student Saving Account", icon: GraduationCap, minBalance: "NPR 500", features: ["Free Mobile Banking", "Discount on education loan", "Zero maintenance fees"], type: "general" },
  { slug: "khutruke-saving-account", title: "Khutruke Saving Account", icon: Coins, minBalance: "NPR 500", features: ["High flexibility deposits", "Free statement books", "Micro-saving focus"], type: "general" },
  { slug: "special-saving-account", title: "Special Saving Account", icon: Star, minBalance: "NPR 0", features: ["Zero balance account", "Free digital banking", "Lifestyle benefits"], type: "special" },
  { slug: "shareholder-saving-account", title: "Shareholder Saving Account", icon: Building, minBalance: "NPR 5,000", features: ["Dividend auto-transfer", "Easy share management", "Priority services"], type: "peak" },
  { slug: "pwd-saving-account", title: "PWD Saving Account", icon: HeartHandshake, minBalance: "NPR 0", features: ["Zero balance for PWD", "Free insurance cover", "Special assistance"], type: "special" },
  { slug: "dhaulagiri-saving-account", title: "Dhaulagiri Saving Account", icon: Mountain, minBalance: "NPR 5,000", features: ["Higher interest rates", "Free ATM withdrawals", "Premium banking"], type: "peak" },
  { slug: "kanchanjunga-saving-account", title: "Kanchanjunga Saving Account", icon: Mountain, minBalance: "NPR 10,000", features: ["Premium interest rates", "Dedicated RM", "Lounge access"], type: "peak" },
  { slug: "everest-saving-account", title: "Everest Saving Account", icon: Mountain, minBalance: "NPR 20,000", features: ["Top tier interest", "Free insurance", "Concierge services"], type: "peak" },
  { slug: "super-saving-account", title: "Super Saving Account", icon: Sparkles, minBalance: "NPR 50,000", features: ["Super saver benefits", "Higher FD rates", "Priority lending"], type: "peak" },
  { slug: "gold-saving-account", title: "Gold Saving Account", icon: Award, minBalance: "NPR 50,000", features: ["Gold tier interest", "Free locker facility", "Premium cards"], type: "peak" },
  { slug: "diamond-saving-account", title: "Diamond Saving Account", icon: Gem, minBalance: "NPR 200,000", features: ["Highest interest rates", "All premium benefits", "Exclusive events"], type: "peak" },
];

export default async function SavingsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <>
      <section className="section" style={{ background: "linear-gradient(rgba(112,43,134,0.85),rgba(62,12,78,0.95)),url('https://reliancenepal.com.np/uploads/slider/214dd0a0bdac9c93312f3f57d3e0f9f3de0504b2.jpg') center/cover no-repeat", padding: "6rem 0" }}>
        <div className="container-page text-center text-white">
          <h1 className="mb-2 text-white">{lang === "en" ? "Savings Deposit Accounts" : "बचत निक्षेप खाताहरू"}</h1>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-secondary-500">
            {lang === "en" ? "Compare Features & Open Your Account Online" : "सुविधाहरू तुलना गर्नुहोस् र आफ्नो खाता अनलाइन खोल्नुहोस्"}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savingsProducts.map((product) => {
              const Icon = product.icon;
              return (
                <div key={product.slug} className="product-card group flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-500 hover:shadow-lg">
                  <Icon className="mb-4 h-8 w-8 text-primary-500" />
                  <h3 className="mb-3 font-heading text-lg font-bold text-gray-900">{product.title}</h3>
                  <p className="mb-4 text-sm text-gray-500">Min Balance: <span className="font-semibold text-primary-700">{product.minBalance}</span></p>
                  <ul className="product-features mb-6 space-y-2">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="text-green-500">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex gap-2">
                    <Link href={`/${lang}/products/savings/${product.slug}`} className="btn btn-outline flex-1 py-2 text-xs">View Details</Link>
                    <Link href={`/${lang}/emi-calculator`} className="btn btn-primary flex-1 py-2 text-xs">Calculate EMI</Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
