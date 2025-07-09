"use client";
import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";

export default function FullPageLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      try {
        const anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "/loader.json", // Change to your file if needed
        });

        // Add error handling
        anim.addEventListener('error', () => {
          console.warn('Lottie animation failed to load, showing fallback');
          setError(true);
        });

        return () => anim.destroy();
      } catch (err) {
        console.warn('Lottie failed to initialize:', err);
        setError(true);
      }
    }
  }, []);

  // Fallback if lottie fails
  if (error) {
    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-400"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black">
      <div 
        ref={containerRef}
        style={{ height: "200px", width: "200px" }}
      />
    </div>
  );
} 