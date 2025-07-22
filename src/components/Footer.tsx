"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#181c20] text-gray-200 pt-8 pb-4 mt-16 relative z-20">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row md:justify-between items-center gap-6">
        {/* Adhikaar Logo (main logo spot) */}
        <div className="flex flex-col items-center gap-2 mb-2 md:mb-0">
          <Link href="/">
            <Image
              src="/Adhikaar.png"
              alt="Adhikaar Logo"
              width={160}
              height={160}
              className="h-32 w-auto rounded"
              priority
            />
          </Link>
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
        <div className="flex flex-col items-center md:items-end gap-2 text-xs text-gray-400 text-center md:text-right">
          <div>support-Adhikaar[at]digitalindia[dot]gov[dot]in</div>
          <div>(011) 24303714</div>
          <div>4th Floor, NeGD, Electronics Niketan,<br />6 CGO Complex, Lodhi Road, New Delhi - 110003, India</div>
        </div>
        {/* Digital India Logo at far right */}
        <div className="flex flex-col items-end">
          <a
            href="https://www.digitalindia.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2"
          >
            <Image
              src="https://cdn.digitalindiacorporation.in/wp-content/themes/di-child/assets/images/digital-india.svg.gzip"
              alt="Digital India Logo"
              width={100}
              height={40}
              className="h-12 w-auto"
              priority
            />
          </a>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} Adhikaar. All rights reserved.
      </div>
    </footer>
  );
}