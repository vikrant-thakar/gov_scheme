import React from "react";
import Image from "next/image";
import ZycoonDescription from "@/components/ZycoonDescription";

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function AboutPage() {
  await wait(2500); // 2.5 second delay for demo
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 space-y-24">
      {/* Vision & Mission Section */}
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Video */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-lg border border-gray-700">
            <video
              className="w-full h-64 object-cover bg-black"
              poster="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              controls
            >
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        {/* Vision & Mission */}
        <div className="w-full md:w-1/2 flex flex-col gap-10">
          <div className="flex items-start gap-4">
            <span className="text-4xl mt-1">👁️</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-1">Our Vision</h2>
              <p className="text-lg text-gray-300">Our vision is to make citizens life easier</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-4xl mt-1">🎯</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-1">Our Mission</h2>
              <p className="text-lg text-gray-300">Our mission is to streamline the government – user interface for government schemes and benefits.<br />Reduce time and effort required to find and avail a government scheme</p>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Description Section */}
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Description */}
        <div className="w-full md:w-1/2 space-y-6 text-gray-100 text-lg">
        <ZycoonDescription />
        </div>
        {/* Illustration */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/sallubhai.jpg"
            alt="Search Illustration"
            width={500}
            height={500}
            className="w-full h-full object-contain"
            style={{ filter: 'brightness(0.9)' }}
            unoptimized
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {/* Feature 1 */}
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/candidates.png"
            alt="Eligibility Check"
            width={128}
            height={128}
            className="w-32 h-32 object-contain mb-2"
            unoptimized
          />
          <h3 className="text-xl font-bold text-gray-100 mb-1">Eligibility Check</h3>
          <p className="text-gray-300">You can check your eligibility for schemes using different criteria and personal attribute</p>
        </div>
        {/* Feature 2 */}
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/bonus.png"
            alt="Scheme Finder"
            width={128}
            height={128}
            className="w-32 h-32 object-contain mb-2"
            unoptimized
          />
          <h3 className="text-xl font-bold text-gray-100 mb-1">Scheme Finder</h3>
          <p className="text-gray-300">Fast and easy searching with filter based drill downs for various Government Schemes</p>
        </div>
        {/* Feature 3 */}
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/meticulous.png"
            alt="Scheme in detail"
            width={128}
            height={128}
            className="w-32 h-32 object-contain mb-2"
            unoptimized
          />
          <h3 className="text-xl font-bold text-gray-100 mb-1">Scheme in detail</h3>
          <p className="text-gray-300">Deep dive into dedicated scheme pages for fine grained scheme details before you apply</p>
        </div>
      </div>
      
    </div>
  );
}