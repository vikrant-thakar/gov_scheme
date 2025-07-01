"use client";
import SchemesHero from "@/components/SchemesHero";
import Categories from "@/components/Categories";
import BackgroundCarousel from "../components/BackgroundCarousel";
import ZycoonDescription from "@/components/ZycoonDescription";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FilterPreferences from "@/components/FilterPreferences";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  return (
    <>
      {showModal && (
        <div className="fixed mt-12 inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-300 hover:text-white text-2xl font-bold z-10"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <FilterPreferences
              modalMode
              initialPreferences={{}}
              saveToLocalStorage={false}
              onContinue={(prefs) => {
                localStorage.setItem('tempSchemeFilters', JSON.stringify(prefs));
                setShowModal(false);
                router.push('/schemes');
              }}
            />
          </div>
        </div>
      )}
      <BackgroundCarousel />
      <div className="pt-0 sm:pt-80 md:pt-96 lg:pt-[28rem]">
        <SchemesHero onFindSchemeClick={() => setShowModal(true)} />
        <Categories />
        <ZycoonDescription />
      </div>
    </>
  );
}
