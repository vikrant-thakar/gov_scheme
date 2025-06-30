"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Notification } from "@/data/notificationsData";

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
}

export default function NotificationDropdown({ 
  isOpen, 
  onClose, 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead 
}: NotificationDropdownProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    }
  }, [isOpen]);

  // Get only the 3 latest notifications
  const latestNotifications = notifications.slice(0, 3);
  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur effect */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Notification dropdown */}
      <div className="fixed top-20 right-4 w-100 max-h-[80vh] bg-[#232e3e]/90 rounded-lg shadow-2xl border border-gray-700 z-50 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white">
          <h3 className="text-lg font-semibold text-gray-100">Notifications</h3>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
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
          {!isLoggedIn ? (
            <div className="p-8 text-center text-gray-400 flex flex-col items-center gap-4">
              <p>Please log in to stay updated.</p>
              <Link href="/auth/signin">
                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded font-semibold transition">Login</button>
              </Link>
            </div>
          ) : (
            latestNotifications.length === 0 ? (
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
                    onClick={() => onMarkAsRead(notification.id)}
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
            )
          )}
        </div>

        {/* Footer: Only show if logged in */}
        {isLoggedIn && (
          <div className="p-4 border-t border-gray-700 bg-[#232e3e]/90 sticky bottom-0">
            <Link
              href="/notifications"
              className="block w-full text-center py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded font-semibold transition"
              onClick={() => {
                onClose();
                onMarkAllAsRead();
              }}
            >
              View All Notifications
            </Link>
          </div>
        )}
      </div>
    </>
  );
} 