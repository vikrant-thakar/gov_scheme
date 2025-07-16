"use client";
import React, { useState, useEffect, memo } from "react";
import { User, IdCard, GraduationCap, Building2, SlidersHorizontal, X, DollarSign, Briefcase } from "lucide-react";
import { states, categories, ministries } from "@/data/categoriesData";
import LoginModal from "./LoginModal";
import { StylesConfig, GroupBase } from "react-select";
import {
  genderOptions,
  casteOptions,
  maritalStatusOptions,
  employmentStatusOptions,
  occupationOptions,
  benefitTypeOptions,
  dbtSchemeOptions,
  residenceOptions,
  applicationModeOptions,
  schemeTypeOptions,
  economicDistressOptions,
  belowPovertyLineOptions,
  differentlyAbledOptions,
  governmentEmployeeOptions,
  studentOptions,
} from "@/data/schemes/filterOptions";
import dynamic from "next/dynamic";

type OptionType = { value: string; label: string };
const ClientOnlySelect = dynamic(
  () =>
    import("./ClientOnlySelect").then((mod) => mod.default) as Promise<
      React.ComponentType<import("react-select").Props<OptionType, false, import("react-select").GroupBase<OptionType>>>
    >,
  { ssr: false }
);

const filterGroups = [
  {
    header: "Personal",
    filters: [
      { label: "Gender", type: "select", icon: <User className="w-5 h-5" /> },
      { label: "Age", type: "input", icon: <IdCard className="w-5 h-5" /> },
      { label: "Caste", type: "select", icon: <GraduationCap className="w-5 h-5" /> },
      { label: "Marital Status", type: "select", icon: <User className="w-5 h-5" /> },
      { label: "Disability Percentage", type: "input", icon: <SlidersHorizontal className="w-5 h-5" /> },
    ],
  },
  {
    header: "Economic",
    filters: [
      { label: "Below Poverty Line", type: "select", icon: <DollarSign className="w-5 h-5" /> },
      { label: "Economic Distress", type: "select", icon: <DollarSign className="w-5 h-5" /> },
      { label: "Benefit Type", type: "select", icon: <DollarSign className="w-5 h-5" /> },
      { label: "DBT Scheme", type: "select", icon: <DollarSign className="w-5 h-5" /> },
    ],
  },
  {
    header: "Employment",
    filters: [
      { label: "Government Employee", type: "select", icon: <Building2 className="w-5 h-5" /> },
      { label: "Employment Status", type: "select", icon: <Briefcase className="w-5 h-5" /> },
      { label: "Student", type: "select", icon: <GraduationCap className="w-5 h-5" /> },
      { label: "Occupation", type: "select", icon: <Briefcase className="w-5 h-5" /> },
      { label: "Differently Abled", type: "select", icon: <SlidersHorizontal className="w-5 h-5" /> },
    ],
  },
  {
    header: "Scheme Details",
    filters: [
      { label: "State", type: "select", icon: <Building2 className="w-5 h-5" /> },
      { label: "Scheme Category", type: "select", icon: <SlidersHorizontal className="w-5 h-5" /> },
      { label: "Ministry Name", type: "select", icon: <Building2 className="w-5 h-5" /> },
      { label: "Application Mode", type: "select", icon: <SlidersHorizontal className="w-5 h-5" /> },
      { label: "Scheme Type", type: "select", icon: <SlidersHorizontal className="w-5 h-5" /> },
    ],
  },
];

const accentColors = [
  "bg-gradient-to-r from-green-400 to-blue-500",
  "bg-gradient-to-r from-pink-400 to-purple-500",
  "bg-gradient-to-r from-yellow-400 to-green-500",
  "bg-gradient-to-r from-blue-400 to-indigo-500",
  "bg-gradient-to-r from-red-400 to-pink-500",
];

// Custom styles for react-select
const customSelectStyles: StylesConfig<{ value: string; label: string }, false, GroupBase<{ value: string; label: string }>> = {
  control: (provided, state) => ({
    ...provided,
    background: "rgba(30, 41, 59, 0.7)",
    borderColor: state.isFocused ? "#22d3ee" : "#334155",
    boxShadow: state.isFocused ? "0 0 0 2px #22d3ee55" : "none",
    borderRadius: "0.75rem",
    minHeight: 44,
    color: "#e0e7ef",
    fontSize: 15,
    fontWeight: 500,
    transition: "all 0.2s",
  }),
  menu: (provided) => ({
    ...provided,
    background: "rgba(30, 41, 59, 0.98)",
    borderRadius: "0.75rem",
    color: "#e0e7ef",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    marginTop: 4,
    zIndex: 100,
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected
      ? "linear-gradient(90deg, #22d3ee 0%, #6366f1 100%)"
      : state.isFocused
      ? "rgba(34, 211, 238, 0.15)"
      : "transparent",
    color: state.isSelected ? "#18181b" : "#e0e7ef",
    fontWeight: state.isSelected ? 700 : 500,
    cursor: "pointer",
    borderRadius: 8,
    padding: "10px 16px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#e0e7ef",
  }),
  input: (provided) => ({
    ...provided,
    color: "#e0e7ef",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#a3a3a3",
    fontWeight: 400,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "#22d3ee" : "#a3a3a3",
    transition: "color 0.2s",
  }),
  indicatorSeparator: () => ({ display: "none" }),
};

interface SchemesSidebarProps {
  filters: Record<string, string>;
  onFiltersChange: (filters: Record<string, string>) => void;
}

const SchemesSidebar: React.FC<SchemesSidebarProps> = memo(({ filters, onFiltersChange }) => {
  const [openGroups, setOpenGroups] = useState(Array(filterGroups.length).fill(true));
  const [profileApplied, setProfileApplied] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // On mount, check for tempSchemeFilters
  useEffect(() => {
    const temp = localStorage.getItem('tempSchemeFilters');
    if (temp) {
      onFiltersChange(JSON.parse(temp));
      localStorage.removeItem('tempSchemeFilters');
    }
  }, [onFiltersChange]);

  // Helper to get the correct profile filter key
  const getProfileFilterKey = async () => {
    const LOCAL_STORAGE_KEY = "profileFilterPreferences";
    const token = localStorage.getItem("token");
    let key = LOCAL_STORAGE_KEY;
    if (token) {
      try {
        const res = await fetch("http://127.0.0.1:8000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const user = await res.json();
          if (user && user.mobile) {
            key = `profileFilterPreferences_${user.mobile}`;
          } else if (user && user.id) {
            key = `profileFilterPreferences_${user.id}`;
          }
        }
      } catch {}
    }
    return key;
  };

  const handleUseMyProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    const key = await getProfileFilterKey();
    const savedPrefs = localStorage.getItem(key);
    if (savedPrefs) {
      onFiltersChange(JSON.parse(savedPrefs));
      setProfileApplied(true);
      setTimeout(() => setProfileApplied(false), 1500);
    }
  };

  const handleAccordion = (idx: number) => {
    setOpenGroups((prev) => prev.map((open, i) => (i === idx ? !open : open)));
  };

  const handleFilterChange = (label: string, value: string) => {
    // Mutually exclusive logic on change
    const newFilters = { ...filters, [label]: value };
    // Differently Abled & Disability Percentage
    if (label === "Differently Abled" && value === "No") {
      newFilters["Disability Percentage"] = "";
    }
    // BPL & Economic Distress
    if (label === "Below Poverty Line" && value === "Yes") {
      newFilters["Economic Distress"] = "";
    }
    if (label === "Economic Distress" && value === "Yes") {
      newFilters["Below Poverty Line"] = "";
    }
    // Benefit Type & DBT Scheme
    if (label === "Benefit Type" && value) {
      newFilters["DBT Scheme"] = "";
    }
    if (label === "DBT Scheme" && value) {
      newFilters["Benefit Type"] = "";
    }
    // Student & Occupation
    if (label === "Student" && value === "Yes") {
      newFilters["Occupation"] = "Student";
    }
    if (label === "Occupation" && value !== "Student" && filters["Student"] === "Yes") {
      newFilters["Student"] = "";
    }
    // Government Employee & Employment Status
    if (label === "Government Employee" && value === "Yes") {
      newFilters["Employment Status"] = "";
    }
    if (label === "Employment Status" && value === "Unemployed" && filters["Government Employee"] === "Yes") {
      newFilters["Government Employee"] = "";
    }
    // Age & Marital Status
    if (label === "Age" && Number(value) < 18) {
      if (filters["Marital Status"] === "Married") {
        newFilters["Marital Status"] = "";
      }
    }
    if (label === "Marital Status" && value === "Married" && Number(filters["Age"]) < 18) {
      newFilters["Age"] = "";
    }
    // Scheme Type & Benefit Type
    if (label === "Scheme Type" && value) {
      newFilters["Benefit Type"] = "";
    }
    if (label === "Benefit Type" && value) {
      newFilters["Scheme Type"] = "";
    }
    // Scheme Category & Ministry Name
    if (label === "Scheme Category" && value) {
      newFilters["Ministry Name"] = "";
    }
    if (label === "Ministry Name" && value) {
      newFilters["Scheme Category"] = "";
    }
    onFiltersChange(newFilters);
  };

  const clearFilter = (label: string) => {
    const copy = { ...filters };
    delete copy[label];
    onFiltersChange(copy);
  };

  const handleReset = () => {
    onFiltersChange({});
    setResetting(true);
    setTimeout(() => setResetting(false), 1500);
  };

  return (
    <>
      <aside className="w-72 h-[80vh] rounded-2xl shadow-2xl border border-gray-800 bg-white/10 backdrop-blur-lg p-0 flex flex-col sticky top-0">
        {/* Sticky header */}
        <div className="sticky top-0 z-10 bg-[#181a20]/80 backdrop-blur px-6 py-4 flex items-center justify-between border-b border-gray-700">
          <span className="font-extrabold text-xl text-gray-100 tracking-wide flex items-center gap-2">
            <span className="inline-block w-2 h-6 rounded-full bg-gradient-to-b from-green-400 to-blue-500 mr-2"></span>
            Filter By
          </span>
          <button
            className={`flex items-center gap-1 text-green-400 text-xs font-semibold px-3 py-1 rounded-lg transition hover:bg-green-500/20 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm ${resetting ? 'opacity-70 cursor-default' : ''}`}
            onClick={handleReset}
            disabled={resetting}
          >
            <span className="text-base">🔄</span> {resetting ? 'Reset!' : 'Reset'}
          </button>
        </div>
        {/* Use my profile button */}
        <div className="px-6 pt-4 pb-2">
          <button
            className={`w-full py-2 rounded-xl font-semibold text-white transition bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow ${profileApplied ? 'opacity-70 cursor-default' : ''}`}
            onClick={handleUseMyProfile}
            disabled={profileApplied}
          >
            {profileApplied ? 'Applied!' : 'Use my profile'}
          </button>
        </div>
        {/* Scrollable filter area */}
        <div className="flex-1 overflow-y-auto px-2 py-4 flex flex-col gap-4 custom-scrollbar animate-fade-in">
          {filterGroups.map((group, groupIdx) => (
            <div key={group.header} className="mb-2 rounded-xl bg-white/5 shadow-inner border border-gray-800">
              {/* Accordion header */}
              <button
                className="w-full flex items-center justify-between px-4 py-3 font-bold text-gray-200 text-base focus:outline-none hover:bg-white/10 rounded-t-xl transition"
                onClick={() => handleAccordion(groupIdx)}
                aria-expanded={openGroups[groupIdx]}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-6 rounded-full ${accentColors[groupIdx % accentColors.length]}`}></span>
                  {group.header}
                </span>
                <span className={`transform transition-transform duration-300 ${openGroups[groupIdx] ? "rotate-90" : "rotate-0"}`}>▶</span>
              </button>
              {/* Accordion content */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openGroups[groupIdx] ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="px-4 py-2 flex flex-col gap-3">
                  {group.filters.map((filter) => {
                    // Mutually exclusive/hide logic
                    if (
                      (filter.label === "Disability Percentage" && filters["Differently Abled"] === "No") ||
                      (filter.label === "Economic Distress" && filters["Below Poverty Line"] === "Yes") ||
                      (filter.label === "Below Poverty Line" && filters["Economic Distress"] === "Yes") ||
                      (filter.label === "DBT Scheme" && filters["Benefit Type"]) ||
                      (filter.label === "Benefit Type" && (filters["DBT Scheme"] || filters["Scheme Type"])) ||
                      (filter.label === "Student" && (filters["Occupation"] && filters["Occupation"] !== "Student" || filters["Government Employee"] === "Yes")) ||
                      (filter.label === "Occupation" && (filters["Student"] === "Yes" && filters["Occupation"] !== "Student" || filters["Government Employee"] === "Yes")) ||
                      (filter.label === "Employment Status" && filters["Government Employee"] === "Yes") ||
                      (filter.label === "Government Employee" && (filters["Employment Status"] === "Unemployed" || filters["Student"] === "Yes")) ||
                      (filter.label === "Marital Status" && Number(filters["Age"]) > 0 && Number(filters["Age"]) < 18) ||
                      (filter.label === "Scheme Type" && filters["Benefit Type"]) ||
                      (filter.label === "Benefit Type" && filters["Scheme Type"]) ||
                      (filter.label === "Scheme Category" && filters["Ministry Name"]) ||
                      (filter.label === "Ministry Name" && filters["Scheme Category"])
                    ) {
                      return null;
                    }
                    return (
                      <div key={filter.label} className={`relative group flex flex-col gap-1 p-2 rounded-lg transition-all duration-200 ${filters[filter.label] ? "border-2 border-green-400 bg-green-400/10 shadow-lg" : "border border-gray-700 bg-white/10"}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="relative group">
                            <span className="inline-block align-middle text-gray-300" title={filter.label}>
                              {filter.icon}
                            </span>
                            <span className="absolute left-1/2 -translate-x-1/2 mt-7 px-2 py-1 rounded bg-black/80 text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20 whitespace-nowrap">
                              {filter.label}
                            </span>
                          </span>
                          <label className="text-xs text-gray-300 font-semibold tracking-wide select-none cursor-pointer">
                            {filter.label}
                          </label>
                          {filters[filter.label] && (
                            <button
                              className="ml-auto text-gray-400 hover:text-red-400 transition p-1 rounded-full focus:outline-none"
                              onClick={() => clearFilter(filter.label)}
                              title="Clear filter"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        {filter.type === "select" ? (
                          mounted ? (
                            <ClientOnlySelect
                              classNamePrefix="premium-select"
                              styles={{
                                ...customSelectStyles,
                                menuPortal: base => ({ ...base, zIndex: 9999 })
                              }}
                              menuPortalTarget={mounted ? document.body : undefined}
                              menuPosition="fixed"
                              isSearchable={true}
                              placeholder="Select"
                              value={(() => {
                                const val = filters[filter.label] || "";
                                if (!val) return null;
                                let options: { value: string; label: string }[] = [];
                                if (filter.label === "State") options = states.map(s => ({ value: s.name, label: s.name }));
                                else if (filter.label === "Scheme Category") options = categories.map(c => ({ value: c.name, label: c.name }));
                                else if (filter.label === "Ministry Name") options = ministries.map(m => ({ value: m.name, label: m.name }));
                                else if (filter.label === "Gender") options = genderOptions.map(opt => ({ value: opt, label: opt }));
                                else if (filter.label === "Caste") options = casteOptions.map(opt => ({ value: opt, label: opt }));
                                else if (filter.label === "Marital Status") options = maritalStatusOptions.map(opt => ({ value: opt, label: opt }));
                                else if (filter.label === "Employment Status") options = employmentStatusOptions.map(opt => ({ value: opt, label: opt }));
                                else if (filter.label === "Occupation") options = occupationOptions.map(opt => ({ value: opt, label: opt }));
                                else if (filter.label === "Benefit Type") options = benefitTypeOptions.map(opt => ({ value: opt, label: opt }));
                                else if (filter.label === "DBT Scheme") options = dbtSchemeOptions.map(opt => ({ value: opt, label: opt }));
                                else if (filter.label === "Residence") options = residenceOptions.map(opt => ({ value: opt, label: opt }));
                                else if (filter.label === "Application Mode") options = applicationModeOptions.map(opt => ({ value: opt, label: opt }));
                                else if (filter.label === "Scheme Type") options = schemeTypeOptions.map(opt => ({ value: opt, label: opt }));
                                else if (filter.label === "Economic Distress") options = economicDistressOptions.map(opt => ({ value: opt, label: opt }));
                                else if (filter.label === "Below Poverty Line") options = belowPovertyLineOptions.map(opt => ({ value: opt, label: opt }));
                                else if (filter.label === "Differently Abled") options = differentlyAbledOptions.map(opt => ({ value: opt, label: opt }));
                                else if (filter.label === "Government Employee") options = governmentEmployeeOptions.map(opt => ({ value: opt, label: opt }));
                                else if (filter.label === "Student") options = studentOptions.map(opt => ({ value: opt, label: opt }));
                                return options.find(o => o.value === val) || null;
                              })()}
                              onChange={option => handleFilterChange(filter.label, option ? option.value : "")}
                              options={(() => {
                                if (filter.label === "State") return states.map(s => ({ value: s.name, label: s.name }));
                                if (filter.label === "Scheme Category") return categories.map(c => ({ value: c.name, label: c.name }));
                                if (filter.label === "Ministry Name") return ministries.map(m => ({ value: m.name, label: m.name }));
                                if (filter.label === "Gender") return genderOptions.map(opt => ({ value: opt, label: opt }));
                                if (filter.label === "Caste") return casteOptions.map(opt => ({ value: opt, label: opt }));
                                if (filter.label === "Marital Status") return maritalStatusOptions.map(opt => ({ value: opt, label: opt }));
                                if (filter.label === "Employment Status") return employmentStatusOptions.map(opt => ({ value: opt, label: opt }));
                                if (filter.label === "Occupation") return occupationOptions.map(opt => ({ value: opt, label: opt }));
                                if (filter.label === "Benefit Type") return benefitTypeOptions.map(opt => ({ value: opt, label: opt }));
                                if (filter.label === "DBT Scheme") return dbtSchemeOptions.map(opt => ({ value: opt, label: opt }));
                                if (filter.label === "Residence") return residenceOptions.map(opt => ({ value: opt, label: opt }));
                                if (filter.label === "Application Mode") return applicationModeOptions.map(opt => ({ value: opt, label: opt }));
                                if (filter.label === "Scheme Type") return schemeTypeOptions.map(opt => ({ value: opt, label: opt }));
                                if (filter.label === "Economic Distress") return economicDistressOptions.map(opt => ({ value: opt, label: opt }));
                                if (filter.label === "Below Poverty Line") return belowPovertyLineOptions.map(opt => ({ value: opt, label: opt }));
                                if (filter.label === "Differently Abled") return differentlyAbledOptions.map(opt => ({ value: opt, label: opt }));
                                if (filter.label === "Government Employee") return governmentEmployeeOptions.map(opt => ({ value: opt, label: opt }));
                                if (filter.label === "Student") return studentOptions.map(opt => ({ value: opt, label: opt }));
                                return [];
                              })()}
                            />
                          ) : (
                            <div style={{ height: 44 }} />
                          )
                        ) : (
                          <input
                            className="w-full bg-white/10 border border-gray-700 rounded-xl px-3 py-2 text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition shadow-sm group-hover:border-green-400 group-hover:bg-white/20"
                            type="text"
                            value={filters[filter.label] || ""}
                            onChange={e => handleFilterChange(filter.label, e.target.value)}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} message="Please log in to use your profile preferences." />
    </>
  );
});

SchemesSidebar.displayName = 'SchemesSidebar';

export default SchemesSidebar; 