"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#181c20] text-gray-200 pt-8 pb-4 mt-16 relative z-20">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row md:justify-between items-center gap-6">
        {/* Temporary Logo */}
        <div className="flex flex-col items-center gap-2 mb-2 md:mb-0">
          <Link href="/"><Image
            src="/zycoon.jpeg"
            alt="Temporary Logo"
            width={100}
            height={100}
            className="h-20 w-auto rounded bg-gray-700"
          /></Link>
          <span className="text-xs text-gray-400 mt-2">Powered by Digital India Corporation (DIC)</span>
        </div>
        {/* Links */}
        <div className="flex flex-col items-center gap-2 text-sm">
          <a href="/about" className="hover:underline">About Us</a>
          <a href="/contact" className="hover:underline">Contact Us</a>
          <a href="/faq" className="hover:underline">FAQ</a>
          <a href="/accessibility" className="hover:underline">Accessibility</a>
          <a href="/terms" className="hover:underline">Terms & Conditions</a>
        </div>
        {/* Contact */}
        <div className="text-xs text-gray-400 text-center md:text-right">
          <div>support-zycoon[at]digitalindia[dot]gov[dot]in</div>
          <div>(011) 24303714</div>
          <div>4th Floor, NeGD, Electronics Niketan,<br />6 CGO Complex, Lodhi Road, New Delhi - 110003, India</div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} zycoon. All rights reserved.
      </div>
    </footer>
  );
}