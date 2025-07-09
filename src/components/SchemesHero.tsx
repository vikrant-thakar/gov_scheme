"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface SchemesHeroProps {
  onFindSchemeClick?: () => void;
}

export default function SchemesHero({ onFindSchemeClick }: SchemesHeroProps) {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <div className="w-full flex flex-col items-center py-12 bg-transparent transition-colors duration-300">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center transition-colors duration-300 text-gray-100">
        Find the schemes you&apos;re eligible for
      </h1>
      <button
        className="relative text-xl font-extrabold px-12 py-5 rounded-2xl flex items-center gap-4 transition-all duration-300
          bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 text-white shadow-2xl
          hover:scale-105 hover:shadow-[0_8px_32px_0_rgba(16,185,129,0.25)]
          before:absolute before:inset-0 before:rounded-2xl before:bg-white/10 before:backdrop-blur-md before:opacity-60 before:pointer-events-none overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onFindSchemeClick}
        style={{ zIndex: 1 }}
      >
        <span className="relative z-10 flex items-center gap-2">
          Find Schemes For You
          <span className="inline-block w-7 h-7 align-middle">
            {!hovered ? (
              <Image
                src="/Right-Arrow-unscreen1.png"
                alt="Right Arrow Static"
                width={28}
                height={28}
                className="w-7 h-7 object-contain inline-block"
                style={{ display: 'inline-block', verticalAlign: 'middle' }}
                unoptimized
              />
            ) : (
              <Image
                src="/Right-Arrow-unscreen.gif"
                alt="Right Arrow Animation"
                width={28}
                height={28}
                className="w-7 h-7 object-contain inline-block"
                style={{ display: 'inline-block', verticalAlign: 'middle' }}
                unoptimized
              />
            )}
          </span>
        </span>
      </button>
    </div>
  );
}