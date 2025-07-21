"use client";
import React from "react";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  const handleFormSubmit = (formData: { name: string; email: string; message: string }) => {
    // Handle form submission here
    console.log("Form submitted:", formData);
    //  add API call, email service, etc.
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image: hidden on mobile */}
      <div className="absolute inset-0 z-0 h-full w-full hidden md:block">
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
        <h1 className="text-4xl font-bold text-center text-white mb-20">Contact Us</h1>
        <div className="flex flex-col md:flex-row gap-12">
          {/* Contact Information: hidden on mobile */}
          <div className="w-full ml-15 mb-20 md:w-1/2 flex-col justify-center items-center md:items-start -rotate-2 hidden md:flex">
            <div className="bg-transparent p-8 w-full md:w-96 space-y-4">
              <h2 className="text-3xl font-bold text-blue-900 mb-2">Contact Information</h2>
              <div className="text-black space-y-2 text-lg">
                <div><span className="font-semibold">Email:</span> support@Adhikaar.com</div>
                <div><span className="font-semibold">Phone:</span> (011) 24303714</div>
                <div><span className="font-semibold">Address:</span> 4th Floor, NeGD, Electronics Niketan, 6 CGO Complex, Lodhi Road, New Delhi - 110003, India</div>
              </div>
            </div>
          </div>
          {/* Message Form: always visible */}
          <div className="w-full flex flex-col justify-center items-center md:w-1/2 md:items-end">
            <ContactForm onSubmit={handleFormSubmit} className="w-full max-w-md" />
          </div>
        </div>
      </div>
    </div>
  );
} 