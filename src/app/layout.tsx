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
        {/* Top half background image */}
        <div
          className="absolute top-0 left-0 w-full h-140 z-0"
          style={{
            backgroundImage: "url('/building.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Content overlay */}
        <div className="relative z-10">
          <Navbar />
          {children}
          <div className="mt-20">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
