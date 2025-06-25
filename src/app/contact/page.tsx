import React from "react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      {/* Blurred Background Image (no blur) */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src="/contact.jpg"
          alt="Contact Background"
          fill
          className="object-cover w-full h-full blur-none"
          style={{ zIndex: 0 }}
          priority
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto py-16 px-4 space-y-16">
        <h1 className="text-4xl  font-bold text-center text-white mb-20">Contact Us</h1>
        <div className="flex flex-col md:flex-row gap-12">
          {/* Contact Information */}
          <div className="w-full ml-15 mb-20 md:w-1/2 flex flex-col justify-center items-center md:items-start -rotate-2 ">
            <div className="bg-transparent  p-8 w-full md:w-96 space-y-4">
              <h2 className="text-3xl font-bold text-blue-900 mb-2">Contact Information</h2>
              <div className="text-black space-y-2 text-lg">
                <div><span className="font-semibold">Email:</span> support@zycoon.com</div>
                <div><span className="font-semibold">Phone:</span> (011) 24303714</div>
                <div><span className="font-semibold">Address:</span> 4th Floor, NeGD, Electronics Niketan, 6 CGO Complex, Lodhi Road, New Delhi - 110003, India</div>
              </div>
            </div>
          </div>
          {/* Message Form */}
          <div className="w-full ml-50 md:w-1/2 flex flex-col justify-center items-center md:items-end">
            <form className="w-full bg-white/60 rounded-xl shadow-lg p-8 space-y-6 md:w-96">
              <div>
                <label htmlFor="name" className="block text-black font-semibold mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 rounded bg-black/25 text-gray-100 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-black font-semibold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded bg-black/25 text-gray-100 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-black font-semibold mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about your query"
                  className="w-full px-4 py-2 rounded bg-black/25 text-gray-100 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded bg-green-600/50 hover:bg-green-600 text-black font-bold text-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 