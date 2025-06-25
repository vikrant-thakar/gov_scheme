"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const faqs = [
  {
    question: "What is zycoon?",
    answer: "zycoon is a National Platform that aims to offer one-stop search and discovery of Government schemes.",
  },
  {
    question: "How zycoon will help common citizens?",
    answer: "zycoon helps citizens discover, understand, and apply for various government schemes easily.",
  },
  {
    question: "Can I apply for the schemes through zycoon?",
    answer: "You can find information and application guides for schemes, but the actual application process may redirect you to the respective government portal.",
  },
  {
    question: "How does zycoon work? How do I check for my eligibility through zycoon ?",
    answer: "You can browse schemes, check eligibility, and get step-by-step guides for application through zycoon.",
  },
  {
    question: "What all information about a particular scheme can I find on zycoon ?",
    answer: "You can find eligibility, benefits, required documents, application process, and FAQs for each scheme.",
  },
  {
    question: "What are the broad sectors across which the schemes are available in zycoon ?",
    answer: "Schemes are available across sectors like education, health, agriculture, social welfare, and more.",
  },
  {
    question: "Does the zycoon platform provide multilingual support?",
    answer: "Yes, zycoon aims to provide information in multiple Indian languages.",
  },
  {
    question: "Does zycoon showcase Central as well as State - specific schemes ?",
    answer: "Yes, you can find both Central and State-specific schemes on zycoon.",
  },
  {
    question: "I could not find a scheme XYZ on the zycoon platform.",
    answer: "If you can't find a scheme, please use the feedback option to let us know.",
  },
  {
    question: "I found some errors in the content of the schemes.",
    answer: "You can report errors using the feedback form on the platform.",
  },
  {
    question: "I want to explore the schemes under which Legal Assistance is provided to the citizens.Would it be possible through zycoon?",
    answer: "Yes, you can search and filter schemes related to legal assistance on zycoon.",
  },
  {
    question: "I want to apply for a specific scheme but I need to know the documents that I am needed to provide to apply.Can I find this information in zycoon?",
    answer: "Yes, each scheme page lists the required documents for application.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#23262b] text-gray-100">
      {/* Top Section: Title */}
      <div className="max-w-6xl mx-auto pt-12 pb-8 px-4">
        <h1 className="text-4xl font-bold mb-4 ">Frequently Asked Questions</h1>
      </div>
      {/* Main Section: Illustration + FAQ */}
      <div className="max-w-full mx-auto flex flex-col md:flex-row gap-8 px-4">
        {/* Left: Illustration and message */}
        <div className="md:w-1/2 flex flex-col justify-start items-center gap-4">
          <Image
            src="/faq.jpg"
            alt="FAQ Illustration"
            width={400}
            height={400}
            className="object-contain"
            unoptimized
          />
          <div className="text-center mt-10">
            <p className="text-lg text-gray-200 mb-2">Still have questions? Contact us and we’ll get you the answers you need.</p>
            <Link
              href="/contact"
              className="inline-block px-6 py-2 rounded bg-green-500 hover:bg-green-600 text-white font-semibold transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
        {/* Right: FAQ Accordion */}
        <div className="md:w-1/2 w-full flex flex-col gap-2">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-gray-700">
              <button
                className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <span className="text-2xl text-gray-400">
                  {openIndex === idx ? "▲" : "▼"}
                </span>
              </button>
              {openIndex === idx && (
                <div className="pb-4 pl-2 text-gray-300 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
