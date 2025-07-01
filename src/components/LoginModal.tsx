"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  message?: string;
  onLogin?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, message, onLogin }) => {
  const router = useRouter();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-sm mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-800 p-8 flex flex-col items-center gap-6 animate-fade-in">
        <button
          className="absolute top-2 right-2 text-gray-300 hover:text-white text-2xl font-bold z-10"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="text-lg text-gray-100 font-semibold text-center">
          {message || "Please log in to use this feature."}
        </div>
        <button
          className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-xl text-white font-bold shadow transition-transform hover:scale-105"
          onClick={() => {
            if (onLogin) {
              onLogin();
            } else {
              router.push("/auth/signin");
            }
          }}
        >
          Login
        </button>
      </div>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

export default LoginModal; 