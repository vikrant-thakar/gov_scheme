"use client";
import React, { useState, useRef, useEffect } from "react";
import SchemesSidebar from "@/components/SchemesSidebar";
import VirtualizedSchemesList from "@/components/VirtualizedSchemesList";
import SkeletonSchemeCard from '@/components/SkeletonSchemeCard';

const tabs = [
  { label: "All Schemes", value: "all" },
  { label: "State Schemes", value: "state" },
  { label: "Central Schemes", value: "central" },
];

interface Scheme {
  id: string;
  title: string;
  details: string;
  location: string;
  tags: string[];
}

interface BackendScheme {
  id: number;
  title: string;
  details: string;
  location?: string;
  tags?: string[];
}

export default function SchemesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Relevance");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Fetch schemes from backend on filter/search change
  useEffect(() => {
    const fetchFilteredSchemes = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
        const response = await fetch(`${apiUrl}/schemes/filter`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            searchTerm: search,
            filters: filters,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch schemes');
        }

        const data: BackendScheme[] = await response.json();
        const mapped: Scheme[] = data.map((scheme) => ({
          id: String(scheme.id),
          title: scheme.title,
          details: scheme.details,
          location: scheme.location || "",
          tags: Array.isArray(scheme.tags) ? scheme.tags : [],
        }));
        
        setFilteredSchemes(mapped);
      } catch (err) {
        console.error("Error fetching schemes:", err);
        setFilteredSchemes([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(() => {
        fetchFilteredSchemes();
    }, 300); // 300ms debounce

    return () => clearTimeout(debounceFetch);
  }, [search, filters]);


  return (
    <div className="flex min-h-screen bg-[#23262b] text-gray-100">
      {/* Sidebar: hidden on mobile, shown on md+ */}
      <div className="sticky top-0 h-screen hidden md:block">
        <SchemesSidebar filters={filters} onFiltersChange={setFilters} />
      </div>
      {/* Mobile Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80">
          {/* Overlay click closes modal */}
          <div className="absolute inset-0" onClick={() => setShowFilter(false)} />
          <div className="relative w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto bg-[#23262b] rounded-xl p-4 z-10 mt-20">
            <button
              className="absolute top-2 right-2 text-gray-300 hover:text-white text-2xl font-bold z-20"
              onClick={() => setShowFilter(false)}
              aria-label="Close"
            >
              ×
            </button>
            <SchemesSidebar filters={filters} onFiltersChange={setFilters} />
          </div>
        </div>
      )}
      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-4 p-6">
        {/* Mobile: Filter & Sort Buttons */}
        <div className="flex md:hidden gap-2 mb-4">
          <button
            className="flex-1 px-4 py-2 bg-white text-gray-900 rounded font-semibold flex items-center justify-center gap-2 shadow"
            onClick={() => setShowFilter(true)}
          >
            {/* Filter icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-4.586a1 1 0 00-.293-.707L2.293 6.707A1 1 0 012 6V4z" /></svg>
            Filter
          </button>
          <button
            className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold flex items-center justify-center gap-2 shadow"
            onClick={() => setShowSort(true)}
          >
            {/* Sort icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 16h13M3 8h13M3 12h7" /><path d="M21 16v-8m0 0l-4 4m4-4l4 4" /></svg>
            Sort
          </button>
        </div>
        {/* Sort Modal for Mobile */}
        {showSort && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80">
            <div className="relative w-full max-w-xs mx-auto bg-[#23262b] rounded-xl p-6 flex flex-col gap-4">
              <button
                className="absolute top-2 right-2 text-gray-300 hover:text-white text-2xl font-bold z-10"
                onClick={() => setShowSort(false)}
                aria-label="Close"
              >
                ×
              </button>
              <span className="text-lg font-bold text-gray-100 mb-2">Sort By</span>
              <select
                className="bg-[#23262b] border border-gray-700 rounded px-2 py-2 text-gray-200 text-base focus:outline-none"
                value={sort}
                onChange={e => { setSort(e.target.value); setShowSort(false); }}
              >
                <option>Relevance</option>
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </div>
          </div>
        )}
        {/* Search Bar & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <div className="flex-1 flex items-center gap-2 bg-[#181a20] rounded px-4 py-2 border border-gray-700">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" strokeWidth="2" /><line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" strokeLinecap="round" /></svg>
            <input
              className="bg-transparent outline-none w-full text-gray-200 placeholder:text-gray-400"
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {tabs.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 rounded font-semibold ${activeTab === tab.value ? "bg-green-500 text-white" : "bg-[#23262b] text-gray-200 border border-gray-600"} transition`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {/* Results Count & Sort (hidden on mobile) */}
        <div className="hidden md:flex items-center justify-between mb-2">
          <span className="text-gray-300 text-sm">We found <span className="text-green-400 font-bold">{filteredSchemes.length}</span> schemes based on your preferences</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs">Sort :</span>
            <select className="bg-[#23262b] border border-gray-700 rounded px-2 py-1 text-gray-200 text-sm focus:outline-none" value={sort} onChange={e => setSort(e.target.value)}>
              <option>Relevance</option>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>
        {/* Results Count for mobile */}
        <div className="flex sm:hidden mb-2">
          <span className="text-gray-300 text-sm">We found <span className="text-green-400 font-bold">{filteredSchemes.length}</span> schemes based on your preferences</span>
        </div>
        {/* Schemes List */}
        <div className="flex flex-col gap-6" ref={listContainerRef} style={{ height: "70vh", overflowY: "auto" }}>
          {loading ? (
            <div className="flex flex-col gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonSchemeCard key={i} />)}
            </div>
          ) : (
            <VirtualizedSchemesList schemes={filteredSchemes} containerHeight={500} />
          )}
        </div>
        {/* Pagination removed, infinite scroll handles loading more */}
      </main>
    </div>
  );
} 