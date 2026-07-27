import type { Metadata } from "next";
import { Rubik, Roboto } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Reliance Finance Limited",
    template: "%s | Reliance Finance Limited",
  },
  description: "Reliance Finance Limited — Your trusted financial partner in Nepal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${rubik.variable} ${roboto.variable}`}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
