"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { notifications, Notification } from "@/data/notificationsData";

export default function NotificationsPage() {
  const [notificationsList, setNotificationsList] = useState<Notification[]>(notifications);

  // Sync with localStorage to persist state across components
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotificationsList(JSON.parse(savedNotifications));
    }
  }, []);

  const markAsRead = (id: number) => {
    const updatedNotifications = notificationsList.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotificationsList(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const markAllAsRead = () => {
    const updatedNotifications = notificationsList.map(notification => ({ ...notification, read: true }));
    setNotificationsList(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const unreadCount = notificationsList.filter(n => !n.read).length;

  return (
    <div className="relative">
      
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
      <div className="relative z-10 ">
        {/* Sticky Header Section */}
        <div className="sticky top-20 z-30 bg-transparent ">
          <div className="w-full px-10">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold text-green-400">Inbox</h1>
              <div className="flex gap-4 ">
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="px-3 py-2 rounded bg-green-500 hover:bg-green-600 text-white font-semibold transition"
                  >
                    Mark All as Read
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Notifications Section */}
        <div className="w-260 mx-55 px-4 pb-32 pt-6">
          <div className="space-y-4">
            {notificationsList.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-xl">No notifications found</p>
              </div>
            ) : (
              notificationsList.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-6 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl ${
                    notification.read 
                      ? 'bg-black/20 border-gray-700' 
                      : 'bg-[#1a2231]/80 border-gray-700'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
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
                      <h3 className="text-lg font-semibold text-gray-100 mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-gray-300 mb-2">
                        {notification.message}
                      </p>
                      <div className="mb-2">
                        <span className="text-sm text-green-400 font-semibold">Eligibility: </span>
                        <span className="text-sm text-gray-300">{notification.eligibility}</span>
                      </div>
                      <span className="text-sm text-gray-400">
                        {notification.timestamp}
                      </span>
                    </div>
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