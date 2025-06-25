"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 w-full px-4 md:px-6 py-3 flex items-center justify-between bg-black/20 backdrop-blur-lg shadow-sm transition-colors duration-300"
      style={{ zIndex: 50 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-4 md:gap-6">
        <a
          href="https://www.digitalindia.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <Image
            src="https://cdn.digitalindiacorporation.in/wp-content/themes/di-child/assets/images/digital-india.svg.gzip"
            alt="Digital India"
            width={80}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </a>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden ml-2"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Open menu"
        >
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Nav links: visible on desktop only */}
        <div className="hidden md:flex gap-2">
          <Link
            href="/"
            className={`px-3 py-1 rounded ${pathname === "/" ? "bg-white  text-black font-semibold" : "text-gray-200 hover:bg-[#1a2231]"}`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`px-3 py-1 rounded ${pathname === "/about" ? "bg-white  text-black font-semibold" : "text-gray-200 hover:bg-[#1a2231]"}`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`px-3 py-1 rounded ${pathname === "/contact" ? "bg-white  text-black font-semibold" : "text-gray-200 hover:bg-[#1a2231]"}`}
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Search bar: always visible */}
      <div className="flex-1 flex justify-center">
        <div
          className="flex items-center px-4 py-2 rounded-md w-full max-w-md bg-white/70 backdrop-blur"
        >
          <svg
            className="w-5 h-5 mr-2 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <line
              x1="21"
              y1="21"
              x2="16.65"
              y2="16.65"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            className="bg-transparent outline-none w-full text-black placeholder:text-gray-800"
            type="text"
            placeholder="Search for Schemes"
          />
        </div>
      </div>

      {/* Right side: bell, avatar */}
      <div className="flex items-center gap-2 md:gap-4 ml-2 md:ml-4">
        {/* Notification bell */}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#1a2231] relative"
          title="Notifications"
        >
          <svg
            width="30"
            height="30"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {/* Notification badge */}
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5  border-black">10</span>
        </button>
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden border-2 border-gray-200">
          <Image
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            width={36}
            height={36}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Mobile menu: only nav links, not search */}
      {menuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-[#232e3e]/95 md:hidden flex flex-col items-center pt-20 z-50 transition-all"
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-gray-200 text-3xl"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
          <Link
            href="/"
            className={`py-3 px-6 w-full text-center ${pathname === "/" ? "bg-[#1a2231] text-white font-semibold" : "text-white hover:bg-[#1a2231]"}`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`py-3 px-6 w-full text-center ${pathname === "/about" ? "bg-[#1a2231] text-white font-semibold" : "text-white hover:bg-[#1a2231]"}`}
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`py-3 px-6 w-full text-center ${pathname === "/contact" ? "bg-[#1a2231] text-white font-semibold" : "text-white hover:bg-[#1a2231]"}`}
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}