// components/BackgroundCarousel.tsx
"use client";
import React, { useState, useEffect } from "react";

// Use your actual images from the public folder
const images = [
  "/1-full.webp",
  "/2-full.webp",
  "/3-full.webp",
  "/4-full.webp",
  "/5-full.webp",
];

export default function BackgroundCarousel() {
  const [index, setIndex] = useState(0);

  // Auto-swipe logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="absolute top-0 left-0 w-full h-60 sm:h-80 md:h-96 lg:h-140 z-30 overflow-hidden">
      <div className="relative w-full h-full">
        {images.map((img, i) => {
          let translate = 0;
          if (i === index) {
            translate = 0;
          } else if (
            (i === index - 1) ||
            (index === 0 && i === images.length - 1)
          ) {
            translate = -100;
          } else if (
            (i === index + 1) ||
            (index === images.length - 1 && i === 0)
          ) {
            translate = 100;
          } else {
            translate = 1000;
          }
          return (
            <div
              key={img}
              className="absolute top-0 left-0 w-full h-full transition-transform duration-500"
              style={{
                backgroundImage: `url('${img}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                transform: `translateX(${translate}%)`,
                opacity: Math.abs(translate) === 1000 ? 0 : 1,
                zIndex: i === index ? 2 : 1,
              }}
            />
          );
        })}
        {/* Arrow buttons */}
        <button
          aria-label="Previous image"
          onClick={handlePrev}
          className="pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full w-10 h-10 flex items-center justify-center z-40 border border-white shadow-lg"
          style={{ outline: "none", border: "none" }}
        >
          <span className="text-black text-2xl">&#8592;</span>
        </button>
        <button
          aria-label="Next image"
          onClick={handleNext}
          className="pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full w-10 h-10 flex items-center justify-center z-40 border border-white shadow-lg"
          style={{ outline: "none", border: "none" }}
        >
          <span className="text-black text-2xl">&#8594;</span>
        </button>
      </div>
    </div>
  );
}