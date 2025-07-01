"use client";
import React, { useState, useEffect } from "react";
import { UserIcon, IdentificationIcon, AcademicCapIcon, BuildingOffice2Icon, AdjustmentsHorizontalIcon, CurrencyDollarIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
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
import { states, categories, ministries } from "@/data/categoriesData";

const filterGroups = [
  {
    header: "Personal",
    filters: [
      { label: "Gender", type: "select", icon: <UserIcon className="w-5 h-5" /> },
      { label: "Age", type: "input", icon: <IdentificationIcon className="w-5 h-5" /> },
      { label: "Caste", type: "select", icon: <AcademicCapIcon className="w-5 h-5" /> },
      { label: "Marital Status", type: "select", icon: <UserIcon className="w-5 h-5" /> },
      { label: "Disability Percentage", type: "input", icon: <AdjustmentsHorizontalIcon className="w-5 h-5" /> },
    ],
  },
  {
    header: "Economic",
    filters: [
      { label: "Below Poverty Line", type: "select", icon: <CurrencyDollarIcon className="w-5 h-5" /> },
      { label: "Economic Distress", type: "select", icon: <CurrencyDollarIcon className="w-5 h-5" /> },
      { label: "Benefit Type", type: "select", icon: <CurrencyDollarIcon className="w-5 h-5" /> },
      { label: "DBT Scheme", type: "select", icon: <CurrencyDollarIcon className="w-5 h-5" /> },
    ],
  },
  {
    header: "Employment",
    filters: [
      { label: "Government Employee", type: "select", icon: <BuildingOffice2Icon className="w-5 h-5" /> },
      { label: "Employment Status", type: "select", icon: <BriefcaseIcon className="w-5 h-5" /> },
      { label: "Student", type: "select", icon: <AcademicCapIcon className="w-5 h-5" /> },
      { label: "Occupation", type: "select", icon: <BriefcaseIcon className="w-5 h-5" /> },
      { label: "Differently Abled", type: "select", icon: <AdjustmentsHorizontalIcon className="w-5 h-5" /> },
    ],
  },
  {
    header: "Scheme Details",
    filters: [
      { label: "State", type: "select", icon: <BuildingOffice2Icon className="w-5 h-5" /> },
      { label: "Scheme Category", type: "select", icon: <AdjustmentsHorizontalIcon className="w-5 h-5" /> },
      { label: "Ministry Name", type: "select", icon: <BuildingOffice2Icon className="w-5 h-5" /> },
      { label: "Application Mode", type: "select", icon: <AdjustmentsHorizontalIcon className="w-5 h-5" /> },
      { label: "Scheme Type", type: "select", icon: <AdjustmentsHorizontalIcon className="w-5 h-5" /> },
    ],
  },
];

const LOCAL_STORAGE_KEY = "profileFilterPreferences";

interface FilterPreferencesProps {
  modalMode?: boolean;
  onContinue?: (prefs: Record<string, string>) => void;
  initialPreferences?: Record<string, string>;
  saveToLocalStorage?: boolean;
}

const FilterPreferences: React.FC<FilterPreferencesProps> = ({ modalMode = false, onContinue, initialPreferences = {}, saveToLocalStorage = true }) => {
  const [preferences, setPreferences] = useState<Record<string, string>>(initialPreferences);
  const [saved, setSaved] = useState(false);
  const [storageKey, setStorageKey] = useState(LOCAL_STORAGE_KEY);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      if (Object.keys(initialPreferences).length > 0) {
        setPreferences(initialPreferences);
      } else if (saveToLocalStorage) {
        // Get current user from localStorage
        const userStr = localStorage.getItem("currentUser");
        let key = LOCAL_STORAGE_KEY;
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            if (user && user.mobile) {
              key = `profileFilterPreferences_${user.mobile}`;
            } else if (user && user.email) {
              key = `profileFilterPreferences_${user.email}`;
            }
          } catch {}
        }
        setStorageKey(key);
        const savedPrefs = localStorage.getItem(key);
        if (savedPrefs) {
          setPreferences(JSON.parse(savedPrefs));
        }
      }
      setInitialized(true);
    }

    // Contradictory: Differently Abled = No & Disability Percentage > 0
    if (Number(preferences["Disability Percentage"]) > 0) {
      setPreferences((prev) => ({ ...prev, "Disability Percentage": "" }));
    }
    // Contradictory: Student = Yes & Occupation ≠ Student
    if (preferences["Student"] === "Yes" && preferences["Occupation"] !== "Student") {
      setPreferences((prev) => ({ ...prev, "Occupation": "Student" }));
    }
    // Contradictory: Government Employee = Yes & Employment Status = Unemployed
    if (preferences["Government Employee"] === "Yes" && preferences["Employment Status"] === "Unemployed") {
      setPreferences((prev) => ({ ...prev, "Employment Status": "" }));
    }
    // Contradictory: Age < 18 & Marital Status = Married
    if (Number(preferences["Age"]) > 0 && Number(preferences["Age"]) < 18 && preferences["Marital Status"] === "Married") {
      setPreferences((prev) => ({ ...prev, "Marital Status": "" }));
    }
  }, [initialPreferences, saveToLocalStorage, initialized, preferences["Disability Percentage"], preferences["Student"], preferences["Occupation"], preferences["Government Employee"], preferences["Employment Status"], Number(preferences["Age"]), preferences["Marital Status"]]);

  const handleChange = (label: string, value: string) => {
    // Mutually exclusive logic on change
    const newPrefs = { ...preferences, [label]: value };
    // Differently Abled & Disability Percentage
    if (label === "Differently Abled" && value === "No") {
      newPrefs["Disability Percentage"] = "";
    }
    // BPL & Economic Distress
    if (label === "Below Poverty Line" && value === "Yes") {
      newPrefs["Economic Distress"] = "";
    }
    if (label === "Economic Distress" && value === "Yes") {
      newPrefs["Below Poverty Line"] = "";
    }
    // Benefit Type & DBT Scheme
    if (label === "Benefit Type" && value) {
      newPrefs["DBT Scheme"] = "";
    }
    if (label === "DBT Scheme" && value) {
      newPrefs["Benefit Type"] = "";
    }
    // Student & Occupation
    if (label === "Student" && value === "Yes") {
      newPrefs["Occupation"] = "Student";
    }
    if (label === "Occupation" && value !== "Student" && preferences["Student"] === "Yes") {
      newPrefs["Student"] = "";
    }
    // Government Employee & Employment Status
    if (label === "Government Employee" && value === "Yes") {
      newPrefs["Employment Status"] = "";
    }
    if (label === "Employment Status" && value === "Unemployed" && preferences["Government Employee"] === "Yes") {
      newPrefs["Government Employee"] = "";
    }
    // Age & Marital Status
    if (label === "Age" && Number(value) < 18) {
      if (preferences["Marital Status"] === "Married") {
        newPrefs["Marital Status"] = "";
      }
    }
    if (label === "Marital Status" && value === "Married" && Number(preferences["Age"]) < 18) {
      newPrefs["Age"] = "";
    }
    // Scheme Type & Benefit Type
    if (label === "Scheme Type" && value) {
      newPrefs["Benefit Type"] = "";
    }
    if (label === "Benefit Type" && value) {
      newPrefs["Scheme Type"] = "";
    }
    // Scheme Category & Ministry Name
    if (label === "Scheme Category" && value) {
      newPrefs["Ministry Name"] = "";
    }
    if (label === "Ministry Name" && value) {
      newPrefs["Scheme Category"] = "";
    }
    setPreferences(newPrefs);
    setSaved(false);
  };

  const handleSave = () => {
    if (saveToLocalStorage) {
      localStorage.setItem(storageKey, JSON.stringify(preferences));
    }
    setSaved(true);
  };

  const handleContinue = () => {
    if (onContinue) onContinue(preferences);
  };

  return (
    <form className="w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-800 p-8 flex flex-col gap-10 animate-fade-in">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-block w-2 h-8 rounded-full bg-gradient-to-b from-green-400 to-blue-500"></span>
        <h2 className="text-2xl font-extrabold text-gray-100 tracking-wide">Your Filter Preferences</h2>
      </div>
      {filterGroups.map((group, idx) => (
        <div key={group.header} className="mb-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-6 rounded-full bg-gradient-to-b from-green-400 to-blue-500"></span>
            <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">{group.header}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {group.filters.map((filter) => {
              // Mutually exclusive/hide logic
              if (
                (filter.label === "Disability Percentage" && preferences["Differently Abled"] === "No") ||
                (filter.label === "Economic Distress" && preferences["Below Poverty Line"] === "Yes") ||
                (filter.label === "Below Poverty Line" && preferences["Economic Distress"] === "Yes") ||
                (filter.label === "DBT Scheme" && preferences["Benefit Type"]) ||
                (filter.label === "Benefit Type" && (preferences["DBT Scheme"] || preferences["Scheme Type"])) ||
                (filter.label === "Student" && (preferences["Occupation"] && preferences["Occupation"] !== "Student" || preferences["Government Employee"] === "Yes")) ||
                (filter.label === "Occupation" && (preferences["Student"] === "Yes" && preferences["Occupation"] !== "Student" || preferences["Government Employee"] === "Yes")) ||
                (filter.label === "Employment Status" && preferences["Government Employee"] === "Yes") ||
                (filter.label === "Government Employee" && (preferences["Employment Status"] === "Unemployed" || preferences["Student"] === "Yes")) ||
                (filter.label === "Marital Status" && Number(preferences["Age"]) > 0 && Number(preferences["Age"]) < 18) ||
                (filter.label === "Scheme Type" && preferences["Benefit Type"]) ||
                (filter.label === "Benefit Type" && preferences["Scheme Type"]) ||
                (filter.label === "Scheme Category" && preferences["Ministry Name"]) ||
                (filter.label === "Ministry Name" && preferences["Scheme Category"])
              ) {
                return null;
              }
              return (
                <div key={filter.label} className="flex flex-col gap-1 bg-[#181a20]/80 rounded-xl p-4 border border-gray-700 shadow-md">
                  <label className="flex items-center gap-2 text-sm text-gray-300 font-semibold mb-1">
                    {filter.icon}
                    {filter.label}
                  </label>
                  {filter.type === "select" ? (
                    <select
                      className="bg-[#23262b]/80 border border-gray-700 rounded-xl px-3 py-2 text-gray-200 text-sm focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                      value={preferences[filter.label] || ""}
                      onChange={e => handleChange(filter.label, e.target.value)}
                    >
                      <option value="">Select</option>
                      {filter.label === "Gender" && genderOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                      {filter.label === "Caste" && casteOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                      {filter.label === "Marital Status" && maritalStatusOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                      {filter.label === "Employment Status" && employmentStatusOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                      {filter.label === "Occupation" && occupationOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                      {filter.label === "Benefit Type" && benefitTypeOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                      {filter.label === "DBT Scheme" && dbtSchemeOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                      {filter.label === "Residence" && residenceOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                      {filter.label === "Application Mode" && applicationModeOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                      {filter.label === "Scheme Type" && schemeTypeOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                      {filter.label === "Economic Distress" && economicDistressOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                      {filter.label === "Below Poverty Line" && belowPovertyLineOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                      {filter.label === "Differently Abled" && differentlyAbledOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                      {filter.label === "Government Employee" && governmentEmployeeOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                      {filter.label === "Student" && studentOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                      {filter.label === "State" && states.map(opt => (
                        <option key={opt.name} value={opt.name}>{opt.name}</option>
                      ))}
                      {filter.label === "Scheme Category" && categories.map(opt => (
                        <option key={opt.name} value={opt.name}>{opt.name}</option>
                      ))}
                      {filter.label === "Ministry Name" && ministries.map(opt => (
                        <option key={opt.name} value={opt.name}>{opt.name}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="bg-[#23262b]/80 border border-gray-700 rounded-xl px-3 py-2 text-gray-200 text-sm focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                      type="text"
                      value={preferences[filter.label] || ""}
                      onChange={e => handleChange(filter.label, e.target.value)}
                    />
                  )}
                  {/* Helper text for disabled fields */}
                  {filter.label === "Disability Percentage" && preferences["Differently Abled"] === "No" && (
                    <span className="text-xs text-red-400 mt-1">Enable by selecting &apos;Yes&apos; for Differently Abled.</span>
                  )}
                  {filter.label === "Economic Distress" && preferences["Below Poverty Line"] === "Yes" && (
                    <span className="text-xs text-red-400 mt-1">Cannot select with Below Poverty Line = Yes.</span>
                  )}
                  {filter.label === "Below Poverty Line" && preferences["Economic Distress"] === "Yes" && (
                    <span className="text-xs text-red-400 mt-1">Cannot select with Economic Distress = Yes.</span>
                  )}
                  {filter.label === "DBT Scheme" && preferences["Benefit Type"] && (
                    <span className="text-xs text-red-400 mt-1">Cannot select with Benefit Type selected.</span>
                  )}
                  {filter.label === "Benefit Type" && (preferences["DBT Scheme"] || preferences["Scheme Type"]) && (
                    <span className="text-xs text-red-400 mt-1">Cannot select with DBT Scheme or Scheme Type selected.</span>
                  )}
                  {filter.label === "Student" && preferences["Occupation"] && preferences["Occupation"] !== "Student" && (
                    <span className="text-xs text-red-400 mt-1">Occupation must be &apos;Student&apos; to enable this.</span>
                  )}
                  {filter.label === "Occupation" && preferences["Student"] === "Yes" && (
                    <span className="text-xs text-red-400 mt-1">Disabled when Student = Yes.</span>
                  )}
                  {filter.label === "Employment Status" && preferences["Government Employee"] === "Yes" && (
                    <span className="text-xs text-red-400 mt-1">Disabled when Government Employee = Yes.</span>
                  )}
                  {filter.label === "Government Employee" && preferences["Employment Status"] === "Unemployed" && (
                    <span className="text-xs text-red-400 mt-1">Cannot be selected with Employment Status = Unemployed.</span>
                  )}
                  {filter.label === "Marital Status" && Number(preferences["Age"]) > 0 && Number(preferences["Age"]) < 18 && (
                    <span className="text-xs text-red-400 mt-1">Cannot be married if age is under 18.</span>
                  )}
                  {filter.label === "Scheme Type" && preferences["Benefit Type"] && (
                    <span className="text-xs text-red-400 mt-1">Cannot select with Benefit Type selected.</span>
                  )}
                  {filter.label === "Benefit Type" && preferences["Scheme Type"] && (
                    <span className="text-xs text-red-400 mt-1">Cannot select with Scheme Type selected.</span>
                  )}
                  {filter.label === "Scheme Category" && preferences["Ministry Name"] && (
                    <span className="text-xs text-red-400 mt-1">Cannot select with Ministry Name selected.</span>
                  )}
                  {filter.label === "Ministry Name" && preferences["Scheme Category"] && (
                    <span className="text-xs text-red-400 mt-1">Cannot select with Scheme Category selected.</span>
                  )}
                </div>
              );
            })}
          </div>
          {idx < filterGroups.length - 1 && <div className="my-6 border-t border-gray-700" />}
        </div>
      ))}
      {modalMode ? (
        <button
          type="button"
          className="self-end px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl text-white font-bold shadow transition-transform hover:scale-105 mt-2"
          onClick={handleContinue}
        >
          Continue
        </button>
      ) : (
        <>
          <button
            type="button"
            className="self-end px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl text-white font-bold shadow transition-transform hover:scale-105 mt-2"
            onClick={handleSave}
          >
            Save Preferences
          </button>
          {saved && <div className="text-green-400 text-sm mt-2 self-end">Preferences saved!</div>}
        </>
      )}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </form>
  );
};

export default FilterPreferences; 