"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface NotificationType {
  id: number;
  title: string;
  message: string;
  eligibility?: string;
  priority: string;
  read: boolean;
  timestamp: string;
}

export default function NotificationsPage() {
  const [notificationsList, setNotificationsList] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("http://127.0.0.1:8000/notifications", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setNotificationsList(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const markAsRead = (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("http://127.0.0.1:8000/notifications/mark-read", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ notification_id: id }),
    })
      .then(() => {
        setNotificationsList((prev) => prev.map(n => n.id === id ? { ...n, read: true } : n));
      });
  };

  // Defensive: ensure notificationsList is always an array
  const safeNotificationsList = Array.isArray(notificationsList) ? notificationsList : [];

  const markAllAsRead = () => {
    safeNotificationsList.forEach(n => {
      if (!n.read) markAsRead(n.id);
    });
  };

  const unreadCount = safeNotificationsList.filter(n => !n.read).length;

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/notification-bg.jpg"
          alt="Notification Background"
          fill
          className="object-cover w-full h-full"
          style={{ zIndex: 0 }}
          priority
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>
      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Sticky Header Section */}
        <div className="sticky top-16 z-30 w-full bg-black backdrop-blur-md border-b border-gray-800">
          <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 py-4">
              <h1 className="text-2xl sm:text-4xl font-bold text-green-400">Inbox</h1>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="mt-2 sm:mt-0 px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white font-semibold transition text-sm sm:text-base"
                >
                  Mark All as Read
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Scrollable Notifications Section */}
        <div className="w-full max-w-2xl mx-auto px-2 sm:px-4 pb-32 pt-6 flex-1 mt-2 sm:mt-4">
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-xl">Loading notifications...</p>
              </div>
            ) : safeNotificationsList.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-xl">No notifications found</p>
              </div>
            ) : (
              safeNotificationsList.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 sm:p-6 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl ${
                    notification.read 
                      ? 'bg-black/20 border-gray-700' 
                      : 'bg-[#1a2231]/80 border-gray-700'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 mb-2">
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
                    <h3 className="text-base sm:text-lg font-semibold text-gray-100 mb-1">
                      {notification.title}
                    </h3>
                    <p className="text-gray-300 mb-2 text-sm sm:text-base">
                      {notification.message}
                    </p>
                    <div className="mb-2">
                      <span className="text-sm text-green-400 font-semibold">Eligibility: </span>
                      <span className="text-sm text-gray-300">{notification.eligibility}</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-400">
                      {notification.timestamp}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 