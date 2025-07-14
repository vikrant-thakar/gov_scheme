import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

const FaqList = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${apiUrl}/faqs/`)
      .then((res) => res.json())
      .then((data) => {
        setFaqs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching FAQs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading FAQs...</div>;

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
            <div
              key={faq.id}
              className={`border-b border-gray-700 transition-colors duration-200 ${openIndex === idx ? "bg-[#2d2f36]" : ""}`}
            >
              <button
                className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <span className="text-2xl text-gray-400">
                  {openIndex === idx ? <ChevronUp /> : <ChevronDown />}
                </span>
              </button>
              <div
                id={`faq-answer-${faq.id}`}
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === idx
                    ? "max-h-40 opacity-100 py-2 px-4"
                    : "max-h-0 opacity-0 py-0 px-4"
                }`}
                aria-hidden={openIndex !== idx}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqList; 