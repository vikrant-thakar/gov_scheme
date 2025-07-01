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
        className="text-xl font-semibold px-10 py-4 rounded-md flex items-center gap-3 transition bg-green-500 hover:bg-green-600 text-white"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onFindSchemeClick}
      >
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
      </button>
    </div>
  );
}