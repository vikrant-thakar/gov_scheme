"use client";
import React, { useState } from "react";
import { placeholderSchemes } from "@/data/schemes";
import SchemesSidebar from "@/components/SchemesSidebar";

const tabs = [
  { label: "All Schemes", value: "all" },
  { label: "State Schemes", value: "state" },
  { label: "Central Schemes", value: "central" },
];

const SCHEMES_PER_PAGE = 10;

export default function SchemesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Filtering logic
  const filteredSchemes = placeholderSchemes.filter(scheme => {
    // Search logic: match title, description, or tags
    const searchLower = search.toLowerCase();
    const matchesSearch =
      !searchLower ||
      scheme.title.toLowerCase().includes(searchLower) ||
      scheme.description.toLowerCase().includes(searchLower) ||
      (scheme.tags && scheme.tags.some(tag => tag.toLowerCase().includes(searchLower)));
    // Filter logic: match all selected filters (if present in scheme)
    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      // Example: match state/location
      if (key === "State") return scheme.location === value;
      // Add more filter logic as needed for real data
      return true;
    });
    return matchesSearch && matchesFilters;
  });

  // Pagination logic
  const currentSchemes = filteredSchemes.slice((currentPage - 1) * SCHEMES_PER_PAGE, currentPage * SCHEMES_PER_PAGE);

  return (
    <div className="flex min-h-screen bg-[#23262b] text-gray-100">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <SchemesSidebar filters={filters} onFiltersChange={setFilters} />
      </div>
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-x-auto">
        {/* Search Bar & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
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
        {/* Results Count & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
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
        {/* Schemes List */}
        <div className="flex flex-col gap-6">
          {currentSchemes.map((scheme, idx) => (
            <div key={idx} className="bg-[#181a20] rounded-lg p-6 shadow border border-gray-800">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                <span className="text-lg font-bold text-green-400">{scheme.title}</span>
                <span className="text-xs text-gray-400">{scheme.location}</span>
              </div>
              <p className="text-gray-200 mb-3 text-sm">{scheme.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {scheme.tags.map((tag, i) => (
                  <span key={i} className="bg-[#23262b] text-green-400 px-3 py-1 rounded-full text-xs font-semibold border border-green-700">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="flex items-center gap-2">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-300 hover:bg-[#23262b] disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              &lt;
            </button>
            {Array.from({ length: Math.ceil(filteredSchemes.length / SCHEMES_PER_PAGE) }, (_, i) => i + 1).map(page => (
              <button
                key={`page-${page}`}
                className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold ${currentPage === page ? 'bg-green-500 text-white' : 'text-gray-200 hover:bg-[#23262b]'}`}
                onClick={() => setCurrentPage(page)}
                disabled={currentPage === page}
              >
                {page}
              </button>
            ))}
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-300 hover:bg-[#23262b] disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(Math.ceil(filteredSchemes.length / SCHEMES_PER_PAGE), p + 1))}
              disabled={currentPage === Math.ceil(filteredSchemes.length / SCHEMES_PER_PAGE)}
              aria-label="Next page"
            >
              &gt;
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
} 