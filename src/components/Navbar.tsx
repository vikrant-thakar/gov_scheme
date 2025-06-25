"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <a
            href="#"
            className="px-3 py-1 rounded bg-[#1a2231] text-white font-semibold"
          >
            Home
          </a>
          <a
            href="#"
            className="px-3 py-1 rounded text-gray-200 hover:bg-[#1a2231]"
          >
            About Us
          </a>
          <a
            href="#"
            className="px-3 py-1 rounded text-gray-200 hover:bg-[#1a2231]"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Search bar: always visible */}
      <div className="flex-1 flex justify-center">
        <div
          className="flex items-center px-4 py-2 rounded-md w-full max-w-md bg-[#2d3a4d]/70 backdrop-blur"
        >
          <svg
            className="w-5 h-5 mr-2 text-gray-400"
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
            className="bg-transparent outline-none w-full text-gray-200 placeholder:text-gray-400"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      {/* Right side: bell, avatar */}
      <div className="flex items-center gap-2 md:gap-4 ml-2 md:ml-4">
        {/* Notification bell */}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#1a2231]"
          title="Notifications"
        >
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
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
          <a
            href="#"
            className="py-3 px-6 text-white w-full text-center hover:bg-[#1a2231]"
          >
            Home
          </a>
          <a
            href="#"
            className="py-3 px-6 text-white w-full text-center hover:bg-[#1a2231]"
          >
            About Us
          </a>
          <a
            href="#"
            className="py-3 px-6 text-white w-full text-center hover:bg-[#1a2231]"
          >
            Contact Us
          </a>
        </div>
      )}
    </nav>
  );
}