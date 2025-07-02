"use client";
import { Player } from "@lottiefiles/react-lottie-player";

export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black">
      <Player
        autoplay
        loop
        src="/loader.json" // Change to your file if needed
        style={{ height: "200px", width: "200px" }}
      />
    </div>
  );
} 