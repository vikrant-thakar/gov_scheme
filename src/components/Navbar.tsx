"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import NotificationDropdown from "./NotificationDropdown";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  interface NotificationType {
    id: number;
    title: string;
    message: string;
    eligibility?: string;
    priority: string;
    read: boolean;
    timestamp: string;
  }
  const [notificationsList, setNotificationsList] = useState<NotificationType[]>([]);
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch notifications from backend for badge
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setNotificationsList([]);
      return;
    }
    fetch('http://127.0.0.1:8000/notifications', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setNotificationsList(data))
      .catch(() => setNotificationsList([]));
  }, [notificationDropdownOpen, isLoggedIn]);

  // Update login state on mount and on storage event
  useEffect(() => {
    const syncAuth = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
    syncAuth(); // run on mount
    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, []);

  // Defensive: ensure notificationsList is always an array
  const safeNotificationsList = Array.isArray(notificationsList) ? notificationsList : [];

  // Calculate unread notifications count
  const unreadCount = safeNotificationsList.filter(n => !n.read).length;

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (menuOpen) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
      return () => {
        document.body.classList.remove("overflow-hidden");
      };
    }
  }, [menuOpen]);

  // Profile icon click handler
  const handleProfileClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/profile");
    } else {
      router.push("/auth/signin");
    }
  };

  if (!mounted) return null;

  return (
    <>
      <nav
        className={`sticky top-0 w-full px-4 md:px-6 py-3 flex items-center justify-between shadow-sm transition-colors duration-300 ${
          pathname === "/notifications" ? "bg-black" : "bg-black/20 backdrop-blur-lg"
        }`}
        style={{ zIndex: 50 }}
      >
        {/* Emblem and Logo */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Hamburger for mobile - now first on mobile */}
          <button
            className="md:hidden ml-0 order-1"
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
          {/* Digital India Logo - second on mobile */}
          <a
            href="https://www.digitalindia.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center order-2 md:order-none"
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
          
          {/* Nav links: visible on desktop only */}
          <div className="hidden md:flex gap-2">
            <Link
              href="/"
              className={`px-3 py-1 rounded transition-all duration-200 ${pathname === "/" ? "text-white border-b-2 border-white" : "text-gray-200 hover:bg-[#1a2231]"}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`px-3 py-1 rounded transition-all duration-200 ${pathname === "/about" ? "text-white border-b-2 border-white" : "text-gray-200 hover:bg-[#1a2231]"}`}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={`px-3 py-1 rounded transition-all duration-200 ${pathname === "/contact" ? "text-white border-b-2 border-white" : "text-gray-200 hover:bg-[#1a2231]"}`}
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Search bar: only show if not on /schemes */}
        <div className="flex-1 flex justify-center">
          {pathname !== "/schemes" && (
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
                onFocus={() => {
                  router.push("/schemes");
                }}
              />
            </div>
          )}
        </div>

        {/* Right side: bell, avatar or login button */}
        <div className="flex items-center gap-2 md:gap-4 ml-2 md:ml-4">
          {/* Notification bell */}
          <button
            onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
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
            {/* Notification badge - only show if there are unread notifications and user is logged in */}
            {isLoggedIn && unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 border-2 border-black">
                {unreadCount}
              </span>
            )}
          </button>
          {/* Show login button if not logged in, else show profile avatar */}
          {!isLoggedIn ? (
            <Link href="/auth/signin">
              <button
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded font-semibold transition"
              >
                Login
              </button>
            </Link>
          ) : (
            <div
              className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-blue-400  cursor-pointer flex items-center justify-center hover:from-blue-400 hover:to-green-600 transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={handleProfileClick}
              title="Profile"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="text-white"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
          )}
        </div>

        {/* Mobile menu: only nav links, not search */}
        {menuOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/40 z-[9998] md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            {/* Drawer */}
            <div
              className="fixed inset-y-0 left-0 w-50 max-w-xs bg-[#232e3e] z-[9999] md:hidden flex flex-col pt-20 transition-all"
              style={{ minHeight: '100vh' }}
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
          </>
        )}
      </nav>

      {/* Notification Dropdown */}
      <NotificationDropdown 
        isOpen={notificationDropdownOpen} 
        onClose={() => setNotificationDropdownOpen(false)}
      />
    </>
  );
}