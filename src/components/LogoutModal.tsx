"use client";
import React from "react";

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ open, onClose, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-800 p-10 flex flex-col items-center gap-8 animate-fade-in">
        <button
          className="absolute top-4 right-4 text-gray-300 hover:text-white text-3xl font-bold z-10"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {/* Warning Icon */}
        <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center">
          <svg
            width="40"
            height="40"
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-100 mb-3">Confirm Logout</h3>
          <p className="text-gray-300 text-base">
            Are you sure you want to logout from your account?
          </p>
        </div>
        <div className="flex gap-4 w-full">
          <button
            className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition text-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg font-semibold transition text-lg"
            onClick={onConfirm}
          >
            Logout
          </button>
        </div>
      </div>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

export default LogoutModal; 