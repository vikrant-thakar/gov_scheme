"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import LoginModal from "./LoginModal";
import { useRouter } from "next/navigation";

interface NotificationType {
  id: number;
  title: string;
  message: string;
  eligibility?: string;
  priority: string;
  read: boolean;
  timestamp: string;
}

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationDropdown({ isOpen, onClose }: NotificationDropdownProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("token"));
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && isLoggedIn) {
      // Fetch notifications from backend
      const token = localStorage.getItem("token");
      if (token) {
        fetch("http://127.0.0.1:8000/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then(res => res.json())
          .then(data => setNotifications(data))
          .catch(() => setNotifications([]));
      }
    }
  }, [isOpen, isLoggedIn]);

  const markAsRead = (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("http://127.0.0.1:8000/notifications/mark-read", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ notification_id: id }),
    })
      .then(() => {
        setNotifications((prev) => prev.map(n => n.id === id ? { ...n, read: true } : n));
      });
  };

  const markAllAsRead = () => {
    notifications.forEach(n => {
      if (!n.read) markAsRead(n.id);
    });
  };

  useEffect(() => {
    if (isOpen && !isLoggedIn) {
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [isOpen, isLoggedIn]);

  // Defensive: ensure notifications is always an array
  const safeNotifications = Array.isArray(notifications) ? notifications : [];

  // Get only the 3 latest notifications
  const latestNotifications = safeNotifications.slice(0, 3);
  const unreadCount = safeNotifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur effect */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      {/* Login Modal if not logged in */}
      <LoginModal
        open={showLoginModal}
        onClose={onClose}
        message="Please log in to stay updated with notifications."
        onLogin={() => {
          onClose();
          router.push("/auth/signin");
        }}
      />
      {/* Notification dropdown, only if logged in */}
      {isLoggedIn && (
        <div className="fixed top-20 left-0 right-0 mx-auto w-full max-w-sm md:right-4 md:left-auto md:mx-0 md:w-100 max-h-[80vh] bg-[#232e3e]/90 rounded-lg shadow-2xl border border-gray-700 z-50 overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-white">
            <h3 className="text-lg font-semibold text-gray-100">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
              {safeNotifications.length > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-green-400 hover:text-green-600 transition px-2 py-1 rounded focus:outline-none"
                  title="Mark all as read"
                >
                  Mark all as read
                </button>
              )}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>
          </div>
          {/* Notifications list */}
          <div className="max-h-[60vh] overflow-y-auto">
            {latestNotifications.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <p>No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-700">
                {latestNotifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-4 hover:bg-[#1a2231] transition-all cursor-pointer ${
                      !notification.read ? 'bg-[#1a2231]' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            notification.priority === 'high' ? 'bg-red-500 text-white' :
                            notification.priority === 'medium' ? 'bg-yellow-500 text-black' :
                            'bg-blue-500 text-white'
                          }`}>
                            {notification.priority.toUpperCase()}
                          </span>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          )}
                        </div>
                        <h4 className="font-semibold text-gray-100 text-sm mb-1 truncate">
                          {notification.title}
                        </h4>
                        <p className="text-gray-300 text-xs mb-2 line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="mb-2">
                          <span className="text-xs text-green-400 font-semibold">Eligibility: </span>
                          <span className="text-xs text-gray-300">{notification.eligibility}</span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {notification.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Footer: Only show if logged in */}
          <div className="p-4 border-t border-gray-700 bg-[#232e3e]/90 sticky bottom-0">
            <Link
              href="/notifications"
              className="block w-full text-center py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded font-semibold transition"
              onClick={() => {
                onClose();
              }}
            >
              View All Notifications
            </Link>
          </div>
        </div>
      )}
    </>
  );
} 