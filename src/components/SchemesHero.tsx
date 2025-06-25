"use client";
import { useEffect, useState } from "react";

export default function SchemesHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <div className="w-full flex flex-col items-center py-12 bg-transparent transition-colors duration-300">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center transition-colors duration-300 text-gray-100">
        Find the schemes you&apos;re eligible for
      </h1>
      <button className="text-xl font-semibold px-10 py-4 rounded-md flex items-center gap-3 transition bg-green-500 hover:bg-green-600 text-white">
        Find Schemes For You
        <span>
          <svg
            className="inline-block"
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </button>
    </div>
  );
}