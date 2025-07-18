import type { Metadata } from "next";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "استخراج متن از تصویر | OCR App",
  description: "استخراج متن از تصویر با استفاده از هوش مصنوعی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  lang="fa" dir="rtl" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vazirmatn.variable} antialiased font-vazirmatn`}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
