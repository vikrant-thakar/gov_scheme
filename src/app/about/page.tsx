import React from "react";
import Image from "next/image";

export default function AboutPage() {
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
            {/* Play button overlay (for style, not functional) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                <svg width="36" height="36" fill="white" viewBox="0 0 24 24">
                  <polygon points="9,7 20,12 9,17" />
                </svg>
              </div>
            </div>
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
          <p>zycoon is a National Platform that aims to offer one-stop search and discovery of the Government schemes.</p>
          <p>It provides an innovative, technology-based solution to discover scheme information based upon the eligibility of the citizen.</p>
          <p>The platform helps the citizen to find the right Government schemes for them. It also guides on how to apply for different Government schemes. Thus no need to visit multiple Government websites.</p>
          <p>zycoon platform is Developed, Managed, and Operated by National e-Governance Division (NeGD), with the Support of Ministry of Electronics and Information Technology (MeitY), Department of Administrative Reforms and Public Grievance (DARPG) and in partnership with other Central and State Ministries/Departments.</p>
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