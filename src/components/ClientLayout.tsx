"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="relative z-10 pt-20 min-h-screen bg-[#23262b]">
        {children}
        <Footer />
      </div>
    </>
  );
} 