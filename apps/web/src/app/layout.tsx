import type { Metadata } from "next";
import { Mukta, Inter, Noto_Sans_Devanagari } from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const mukta = Mukta({ weight: ["400", "600", "700", "800"], subsets: ["devanagari", "latin"], variable: "--font-heading", display: "swap", preload: false });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap", preload: false });
const devanagari = Noto_Sans_Devanagari({ subsets: ["devanagari", "latin"], variable: "--font-devanagari", display: "swap", preload: false });

export const metadata: Metadata = {
  title: {
    default: "Reliance Finance Limited — Trust in Technology, Prosperity in Tradition",
    template: "%s | Reliance Finance Limited",
  },
  description: "Reliance Finance Limited — Class 'C' licensed financial institution regulated by Nepal Rastra Bank offering high-yield fixed deposits, SME loans, savings accounts, and digital banking services.",
  metadataBase: new URL("https://reliancenepal.com.np"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Reliance Finance Limited",
    title: "Reliance Finance Limited — Nepal",
    description: "Your trusted financial partner in Nepal — high-yield savings, SME loans, fixed deposits, and smart digital banking.",
    url: "https://reliancenepal.com.np",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Reliance Finance Limited",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reliance Finance Limited",
    description: "Your trusted financial partner in Nepal — savings, loans, fixed deposits, and digital banking services.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${mukta.variable} ${inter.variable} ${devanagari.variable} font-body antialiased overflow-x-clip`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0F4C81" />
      </head>
      <body className="flex min-h-screen flex-col overflow-x-clip bg-surface-alt text-slate-900">
        <ToastProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-xl focus:bg-primary-600 focus:px-4 focus:py-2.5 focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary-400"
          >
            Skip to main content
          </a>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
