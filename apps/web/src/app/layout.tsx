import type { Metadata } from "next";
import { Outfit, Inter, Noto_Sans_Devanagari } from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading", display: "swap", preload: false });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap", preload: false });
const devanagari = Noto_Sans_Devanagari({ subsets: ["latin"], variable: "--font-devanagari", display: "swap", preload: false });

export const metadata: Metadata = {
  title: {
    default: "Reliance Finance Limited",
    template: "%s | Reliance Finance Limited",
  },
  description: "Reliance Finance Limited — Your trusted financial partner in Nepal",
  metadataBase: new URL("https://rfil-web.sudeepdhakal.workers.dev"),
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
    title: "Reliance Finance Limited",
    description: "Your trusted financial partner in Nepal — savings, loans, fixed deposits, and digital banking services.",
    url: "https://rfil-web.sudeepdhakal.workers.dev",
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
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${devanagari.variable} font-body antialiased overflow-x-clip`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8E44AD" />
      </head>
      <body className="flex min-h-screen flex-col overflow-x-clip">
        <ToastProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-primary-700 focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to main content
          </a>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
