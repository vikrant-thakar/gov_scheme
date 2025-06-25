'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen bg-[#23262b] text-gray-100`}
        style={{ minHeight: "100vh" }}
      >
        {/* <BackgroundCarousel /> Removed from layout */}
        {/* Navbar OUTSIDE the z-10 container, with z-50 */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>
        <div className="relative z-10 pt-20">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
