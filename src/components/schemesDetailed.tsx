/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react'
import Link from 'next/link'

const sectionIcons = {
  description: (
    <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
  ),
  eligibility: (
    <svg className="w-6 h-6 text-yellow-400 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
  ),
  target_groups: (
    <svg className="w-6 h-6 text-green-400 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" /></svg>
  ),
  category: (
    <svg className="w-6 h-6 text-purple-400 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>
  ),
  ministry: (
    <svg className="w-6 h-6 text-pink-400 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
  ),
  apply: (
    <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01-8 0M12 11v8m-4 0h8" /></svg>
  ),
};

type SchemesDetailedProps = { scheme: any };

function renderTagList(arr: any[] | undefined) {
  if (!arr || arr.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2 mt-1">
      {arr.map((item, idx) => (
        <li key={idx} className="bg-[#23262b] text-green-400 px-3 py-1 rounded-full text-xs font-semibold border border-green-700">
          {item}
        </li>
      ))}
    </ul>
  );
}

function renderEligibility(eligibility: any) {
  if (!eligibility) return null;
  if (typeof eligibility === 'string') {
    try {
      eligibility = JSON.parse(eligibility);
    } catch {
      return <div className="text-[#ededed]">{eligibility}</div>;
    }
  }
  return (
    <div className="space-y-2">
      {Object.entries(eligibility).map(([key, value]) => (
        key === 'target_groups' ? null : (
          <div key={key} className="flex items-start gap-2">
            <span className="font-semibold text-green-400 min-w-[120px]">{key.replace(/_/g, ' ')}:</span>
            {Array.isArray(value) ? renderTagList(value) : <span className="text-[#ededed]">{String(value)}</span>}
          </div>
        )
      ))}
    </div>
  );
}

export default function SchemesDetailed({ scheme }: SchemesDetailedProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    description: true,
    eligibility: true,
    target_groups: true,
    category: true,
    ministry: true,
    apply: true,
  });

  if (!scheme) {
    return (
      <div className="max-w-2xl mx-auto mt-16 p-8 bg-[#181a20] rounded-xl shadow text-center border border-gray-800 animate-fade-in">
        <h1 className="text-2xl font-bold mb-4 text-green-400">Scheme not found</h1>
        <p className="text-[#ededed]">The requested scheme does not exist.</p>
        <Link href="/schemes" className="inline-block mt-6 text-blue-400 hover:underline font-semibold">
          Back to Schemes
        </Link>
      </div>
    );
  }

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="relative min-h-screen bg-[#23262b] pb-16">
      <div className="w-full max-w-6xl mx-auto bg-[#181a20] rounded-xl shadow-lg p-6 sm:p-10 my-8 mt-10 border border-gray-800 animate-fade-in">
        <div className="flex justify-end mb-2">
          <Link href="/schemes" className="text-blue-400 hover:underline font-semibold text-sm">← Back to Schemes</Link>
        </div>
        <h2 className="text-4xl font-extrabold text-[#ededed] text-center mb-8 animate-slide-in">{scheme.name || scheme.title}</h2>
        {/* Collapsible Sections */}
        {/* Description */}
        {(scheme.description || scheme.details) && (
          <div className="rounded-lg border border-blue-900 bg-[#23262b] mb-4">
            <button onClick={() => toggleSection('description')} className="w-full flex items-center justify-between px-4 py-3 focus:outline-none">
              <span className="flex items-center font-semibold text-blue-400 text-lg">{sectionIcons.description} Description</span>
              <svg className={`w-5 h-5 text-blue-400 transition-transform ${openSections.description ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openSections.description ? 'max-h-96 opacity-100 py-2 px-4' : 'max-h-0 opacity-0 py-0 px-4'}`}>
              <p className="text-[#ededed]">{scheme.description || scheme.details}</p>
            </div>
          </div>
        )}
        {/* Eligibility Criteria */}
        {(scheme.eligibility_criteria || scheme.eligibility) && (
          <div className="rounded-lg border border-yellow-900 bg-[#23262b] mb-4">
            <button onClick={() => toggleSection('eligibility')} className="w-full flex items-center justify-between px-4 py-3 focus:outline-none">
              <span className="flex items-center font-semibold text-yellow-400 text-lg">{sectionIcons.eligibility} Eligibility Criteria</span>
              <svg className={`w-5 h-5 text-yellow-400 transition-transform ${openSections.eligibility ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openSections.eligibility ? 'max-h-96 opacity-100 py-2 px-4' : 'max-h-0 opacity-0 py-0 px-4'}`}>
              {renderEligibility(scheme.eligibility_criteria || scheme.eligibility)}
            </div>
          </div>
        )}
        {/* Target Groups */}
        {scheme.target_groups && scheme.target_groups.length > 0 && (
          <div className="rounded-lg border border-green-900 bg-[#23262b] mb-4">
            <button onClick={() => toggleSection('target_groups')} className="w-full flex items-center justify-between px-4 py-3 focus:outline-none">
              <span className="flex items-center font-semibold text-green-400 text-lg">{sectionIcons.target_groups} Target Groups</span>
              <svg className={`w-5 h-5 text-green-400 transition-transform ${openSections.target_groups ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openSections.target_groups ? 'max-h-96 opacity-100 py-2 px-4' : 'max-h-0 opacity-0 py-0 px-4'}`}>
              {renderTagList(scheme.target_groups)}
            </div>
          </div>
        )}
        {/* Category */}
        {scheme.category && (
          <div className="rounded-lg border border-purple-900 bg-[#23262b] mb-4">
            <button onClick={() => toggleSection('category')} className="w-full flex items-center justify-between px-4 py-3 focus:outline-none">
              <span className="flex items-center font-semibold text-purple-400 text-lg">{sectionIcons.category} Category</span>
              <svg className={`w-5 h-5 text-purple-400 transition-transform ${openSections.category ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openSections.category ? 'max-h-40 opacity-100 py-2 px-4' : 'max-h-0 opacity-0 py-0 px-4'}`}>
              <span className="text-[#ededed]">{scheme.category}</span>
            </div>
          </div>
        )}
        {/* Ministry */}
        {scheme.ministry && (
          <div className="rounded-lg border border-pink-900 bg-[#23262b] mb-4">
            <button onClick={() => toggleSection('ministry')} className="w-full flex items-center justify-between px-4 py-3 focus:outline-none">
              <span className="flex items-center font-semibold text-pink-400 text-lg">{sectionIcons.ministry} Ministry</span>
              <svg className={`w-5 h-5 text-pink-400 transition-transform ${openSections.ministry ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openSections.ministry ? 'max-h-40 opacity-100 py-2 px-4' : 'max-h-0 opacity-0 py-0 px-4'}`}>
              <span className="text-[#ededed]">{scheme.ministry}</span>
            </div>
          </div>
        )}
        {/* Benefits */}
        {scheme.benefits && Array.isArray(scheme.benefits) && scheme.benefits.length > 0 && (
          <div className="rounded-lg border border-green-700 bg-[#23262b] mb-4">
            <button onClick={() => toggleSection('benefits')} className="w-full flex items-center justify-between px-4 py-3 focus:outline-none">
              <span className="flex items-center font-semibold text-green-400 text-lg">💡 Benefits</span>
              <svg className={`w-5 h-5 text-green-400 transition-transform ${openSections.benefits ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openSections.benefits ? 'max-h-96 opacity-100 py-2 px-4' : 'max-h-0 opacity-0 py-0 px-4'}`}>
              <ul className="list-disc pl-6 text-[#ededed]">
                {scheme.benefits.map((benefit: string, idx: number) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {/* Application Process */}
        {scheme.application_process && (
          <div className="rounded-lg border border-blue-700 bg-[#23262b] mb-4">
            <button onClick={() => toggleSection('application_process')} className="w-full flex items-center justify-between px-4 py-3 focus:outline-none">
              <span className="flex items-center font-semibold text-blue-400 text-lg">📝 Application Process</span>
              <svg className={`w-5 h-5 text-blue-400 transition-transform ${openSections.application_process ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openSections.application_process ? 'max-h-96 opacity-100 py-2 px-4' : 'max-h-0 opacity-0 py-0 px-4'}`}>
              <p className="text-[#ededed] whitespace-pre-line">{scheme.application_process}</p>
            </div>
          </div>
        )}
        {/* Documents Required */}
        {scheme.documents_required && Array.isArray(scheme.documents_required) && scheme.documents_required.length > 0 && (
          <div className="rounded-lg border border-yellow-700 bg-[#23262b] mb-4">
            <button onClick={() => toggleSection('documents_required')} className="w-full flex items-center justify-between px-4 py-3 focus:outline-none">
              <span className="flex items-center font-semibold text-yellow-400 text-lg">📄 Documents Required</span>
              <svg className={`w-5 h-5 text-yellow-400 transition-transform ${openSections.documents_required ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openSections.documents_required ? 'max-h-96 opacity-100 py-2 px-4' : 'max-h-0 opacity-0 py-0 px-4'}`}>
              <ul className="list-disc pl-6 text-[#ededed]">
                {scheme.documents_required.map((doc: string, idx: number) => (
                  <li key={idx}>{doc}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {/* FAQs */}
        {scheme.faqs && Array.isArray(scheme.faqs) && scheme.faqs.length > 0 && (
          <div className="rounded-lg border border-cyan-700 bg-[#23262b] mb-4">
            <button onClick={() => toggleSection('faqs')} className="w-full flex items-center justify-between px-4 py-3 focus:outline-none">
              <span className="flex items-center font-semibold text-cyan-400 text-lg">❓ FAQs</span>
              <svg className={`w-5 h-5 text-cyan-400 transition-transform ${openSections.faqs ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openSections.faqs ? 'max-h-96 opacity-100 py-2 px-4' : 'max-h-0 opacity-0 py-0 px-4'}`}>
              <ul className="space-y-4">
                {scheme.faqs.map((faq: any, idx: number) => (
                  <li key={idx}>
                    <span className="font-semibold text-cyan-300">Q: {faq.question}</span>
                    <br />
                    <span className="text-[#ededed]">A: {faq.answer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {/* Tags */}
        {scheme.tags && Array.isArray(scheme.tags) && scheme.tags.length > 0 && (
          <div className="mb-4">
            <span className="font-semibold text-green-400">Tags: </span>
            {renderTagList(scheme.tags)}
          </div>
        )}
        {/* Location */}
        {scheme.location && (
          <div className="mb-4">
            <span className="font-semibold text-blue-400">Location: </span>
            <span className="text-[#ededed]">{scheme.location}</span>
          </div>
        )}
        {/* Apply Link */}
        {scheme.apply_link || scheme.sourceUrl ? (
          <div className="flex justify-center mt-8">
            <a
              href={scheme.apply_link || scheme.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg text-center shadow transition"
            >
              Visit Official Website
            </a>
          </div>
        ) : null}
      </div>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .animate-slide-in {
          animation: slideIn 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
