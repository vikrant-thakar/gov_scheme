import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonSchemeCard() {
  return (
    <div className="bg-[#181a20] rounded-lg p-6 shadow border border-gray-800 mb-4 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
        <span className="text-lg font-bold text-green-400">
          <Skeleton width={220} height={24} baseColor="#1e293b" highlightColor="#22c55e" />
        </span>
        <span className="text-xs text-gray-400">
          <Skeleton width={100} height={16} baseColor="#1e293b" highlightColor="#22c55e" />
        </span>
      </div>
      <Skeleton count={2} height={16} className="mb-3" baseColor="#1e293b" highlightColor="#22c55e" />
      <div className="flex flex-wrap gap-2 mt-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            key={i}
            width={90}
            height={24}
            borderRadius={9999}
            baseColor="#23262b"
            highlightColor="#22c55e"
            style={{ display: 'inline-block' }}
          />
        ))}
      </div>
    </div>
  );
} 