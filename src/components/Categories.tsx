"use client";
import React, { useState } from "react";
import { categories, states, ministries } from "@/data/categoriesData";

const tabs = [
    { label: "Categories", value: "categories" },
    { label: "States/UTs", value: "states" },
    { label: "Central Ministries", value: "ministries" },
];

export default function Categories() {
    const [activeTab, setActiveTab] = useState("categories");
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [showAllStates, setShowAllStates] = useState(false);
    const [showAllMinistries, setShowAllMinistries] = useState(false);

    const categoriesToShow = showAllCategories ? categories : categories.slice(0, 15);
    const statesToShow = showAllStates ? states : states.slice(0, 15);
    const ministriesToShow = showAllMinistries ? ministries : ministries.slice(0, 15);

    return (
        <section className="w-full max-w-6xl mx-auto mt-12 px-4">
            {/* Tabs */}
            <div className="flex justify-center mb-8 gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => {
                            setActiveTab(tab.value);
                            setShowAllCategories(false);
                            setShowAllStates(false);
                            setShowAllMinistries(false);
                        }}
                        className={`px-4 py-2 rounded font-semibold ${
                            activeTab === tab.value
                                ? "bg-white text-black"
                                : "bg-[#23262b] text-gray-200 border border-gray-600"
                        } transition`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Heading */}
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-100 mb-8">
                {activeTab === "categories" && "Find schemes based on categories"}
                {activeTab === "states" && "Explore schemes of States/UTs"}
                {activeTab === "ministries" && "Explore schemes of Central Ministries"}
            </h2>

            {/* Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {activeTab === "categories" &&
                    categoriesToShow.map((cat) => (
                        <div
                            key={cat.name}
                            className="flex flex-col items-center bg-transparent p-4 rounded   hover:scale-120 transition cursor-pointer"
                        >
                            <span className="text-4xl mb-2">{cat.icon}</span>
                            <span className="text-green-400 font-bold text-sm mb-1">
                                {cat.count} Schemes
                            </span>
                            <span className="text-center text-gray-200 text-sm">
                                {cat.name}
                            </span>
                        </div>
                    ))}

                {activeTab === "states" &&
                    statesToShow.map((state) => (
                        <div
                            key={state.name}
                            className="flex flex-col items-center bg-transparent p-4 rounded  hover:scale-120 transition cursor-pointer"
                        >
                            <span className="text-4xl mb-2">{state.icon}</span>
                            <span className="text-green-400 font-bold text-sm mb-1">
                                {state.state} State{" "}
                                <span className="text-gray-400">/ {state.central} Central</span>
                            </span>
                            <span className="text-center text-gray-200 text-sm">
                                {state.name}
                            </span>
                        </div>
                    ))}

                {activeTab === "ministries" &&
                    ministriesToShow.map((min) => (
                        <div
                            key={min.name}
                            className="flex flex-col items-center bg-transparent p-4 rounded  hover:scale-120 transition cursor-pointer"
                        >
                            <span className="text-4xl mb-2">{min.icon}</span>
                            <span className="text-green-400 font-bold text-sm mb-1">
                                {min.schemes} Schemes
                            </span>
                            <span className="text-center text-gray-200 text-sm">
                                {min.name}
                            </span>
                        </div>
                    ))}
            </div>

            {/* View More Buttons */}
            {activeTab === "categories" && categories.length > 15 && !showAllCategories && (
                <div className="flex justify-center mt-8">
                    <button
                        className="px-6 py-2 rounded border border-gray-400 text-gray-200 hover:bg-gray-700 transition"
                        onClick={() => setShowAllCategories(true)}
                    >
                        View All
                    </button>
                </div>
            )}
            {activeTab === "categories" && categories.length > 15 && showAllCategories && (
                <div className="flex justify-center mt-4">
                    <button
                        className="px-6 py-2 rounded border border-gray-400 text-gray-200 hover:bg-gray-700 transition"
                        onClick={() => setShowAllCategories(false)}
                    >
                        Show Less
                    </button>
                </div>
            )}
            {activeTab === "states" && states.length > 15 && !showAllStates && (
                <div className="flex justify-center mt-8">
                    <button
                        className="px-6 py-2 rounded border border-gray-400 text-gray-200 hover:bg-gray-700 transition"
                        onClick={() => setShowAllStates(true)}
                    >
                        View All
                    </button>
                </div>
            )}
            {activeTab === "states" && states.length > 15 && showAllStates && (
                <div className="flex justify-center mt-4">
                    <button
                        className="px-6 py-2 rounded border border-gray-400 text-gray-200 hover:bg-gray-700 transition"
                        onClick={() => setShowAllStates(false)}
                    >
                        Show Less
                    </button>
                </div>
            )}
            {activeTab === "ministries" && ministries.length > 15 && !showAllMinistries && (
                <div className="flex justify-center mt-8">
                    <button
                        className="px-6 py-2 rounded border border-gray-400 text-gray-200 hover:bg-gray-700 transition"
                        onClick={() => setShowAllMinistries(true)}
                    >
                        View All
                    </button>
                </div>
            )}
            {activeTab === "ministries" && ministries.length > 15 && showAllMinistries && (
                <div className="flex justify-center mt-4">
                    <button
                        className="px-6 py-2 rounded border border-gray-400 text-gray-200 hover:bg-gray-700 transition"
                        onClick={() => setShowAllMinistries(false)}
                    >
                        Show Less
                    </button>
                </div>
            )}
        </section>
    );
}