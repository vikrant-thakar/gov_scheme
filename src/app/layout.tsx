import "./globals.css";
// import { Geist, Geist_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
   import { GeistMono } from "geist/font/mono";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

// const geistSans = GeistSans;
// const geistMono = GeistMono;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Adhikaar - Government Schemes Made Simple</title>
        <link rel="icon" href="/Adhikaar logo.png" type="image/jpeg" /> 
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased relative min-h-screen bg-[#23262b] text-gray-100`}
        style={{ minHeight: "100vh" }}
      >
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
