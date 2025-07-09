"use client";
import React, { useRef, useCallback, memo } from 'react';
import Link from 'next/link';
import { VariableSizeList as List, VariableSizeList } from 'react-window';

interface Scheme {
  title: string;
  description: string;
  location: string;
  tags: string[];
}

interface VirtualizedSchemesListProps {
  schemes: Scheme[];
  containerHeight?: number;
  overscan?: number;
}

const DEFAULT_HEIGHT = 180;

const VirtualizedSchemesList: React.FC<VirtualizedSchemesListProps> = memo(({
  schemes,
  containerHeight = 600,
  overscan = 5
}) => {
  // Store measured heights
  const sizeMap = useRef<{ [key: number]: number }>({});
  const listRef = useRef<VariableSizeList | null>(null);

  // Callback to set the size for an item
  const setSize = useCallback((index: number, size: number) => {
    if (sizeMap.current[index] !== size) {
      sizeMap.current = { ...sizeMap.current, [index]: size };
      if (listRef.current) {
        listRef.current.resetAfterIndex(index);
      }
    }
  }, []);

  // Get the size for an item
  const getSize = (index: number) => sizeMap.current[index] || DEFAULT_HEIGHT;

  // Render a single row
  const Row = memo(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const scheme = schemes[index];
    const rowRef = useCallback((node: HTMLDivElement | null) => {
      if (node) {
        const height = node.getBoundingClientRect().height;
        setSize(index, height);
      }
    }, [index, setSize]);
    const id = scheme.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return (
      <div ref={rowRef} style={{ ...style, left: 0, right: 0, width: '100%' }}>
        <Link href={`/schemes/${id}`} className="block group">
          <div className="bg-[#181a20] rounded-lg p-6 shadow border border-gray-800 group-hover:border-green-500 transition mb-4 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
              <span className="text-lg font-bold text-green-400">{scheme.title}</span>
              <span className="text-xs text-gray-400">{scheme.location}</span>
            </div>
            <p className="text-gray-200 mb-3 text-sm">{scheme.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {scheme.tags.map((tag, i) => (
                <span key={i} className="bg-[#23262b] text-green-400 px-3 py-1 rounded-full text-xs font-semibold border border-green-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </div>
    );
  });
  Row.displayName = 'SchemeRow';

  return (
    <List
      height={containerHeight}
      itemCount={schemes.length}
      itemSize={getSize}
      width={"100%"}
      overscanCount={overscan}
      ref={listRef}
      style={{ willChange: 'transform' }}
    >
      {Row}
    </List>
  );
});

VirtualizedSchemesList.displayName = 'VirtualizedSchemesList';

export default VirtualizedSchemesList;

// Add global fade-in animation style
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
    .animate-fade-in { animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1); }
  `;
  document.head.appendChild(style);
} 