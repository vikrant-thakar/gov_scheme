/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react'
import Link from 'next/link'

const sectionIcons = {
    details: (
        <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
    ),
    benefits: (
        <svg className="w-6 h-6 text-green-400 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" /></svg>
    ),
    eligibility: (
        <svg className="w-6 h-6 text-yellow-400 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
    ),
    application: (
        <svg className="w-6 h-6 text-indigo-400 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01-8 0M12 11v8m-4 0h8" /></svg>
    ),
    documents: (
        <svg className="w-6 h-6 text-pink-400 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6" /></svg>
    ),
    faq: (
        <svg className="w-6 h-6 text-purple-400 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 14h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" /></svg>
    ),
    source: (
        <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 015.656 5.656l-3.535 3.535a4 4 0 01-5.656-5.656m1.414-1.414a4 4 0 015.656 5.656" /></svg>
    ),
};

const heroIcon = (
    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-blue-400 shadow-lg mb-4 animate-fade-in">
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01-8 0M12 11v8m-4 0h8" /></svg>
    </div>
);

type SchemesDetailedProps = { scheme: any };

function SchemesDetailed({ scheme }: SchemesDetailedProps) {
    // All sections open by default
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        details: true,
        benefits: true,
        eligibility: true,
        application: true,
        documents: true,
        faq: true,
        source: true,
    });


    const toggleSection = (key: string) => {
        setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
    };

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

    return (
        <>
            <div className="relative min-h-screen bg-[#23262b] pb-16">
                <div className="w-full bg-[#181a20] rounded-none shadow-lg p-4 sm:p-8 my-8 mt-10 border border-gray-800 animate-fade-in">
                    {/* Back to Schemes link at top right */}
                    <div className="flex justify-end mb-2">
                        <Link href="/schemes" className="text-blue-400 hover:underline font-semibold text-sm">← Back to Schemes</Link>
                    </div>
                    {/* Hero Section */}
                    <div className="flex flex-col items-center mb-8">
                        {heroIcon}
                        <h2 className="text-3xl font-extrabold text-[#ededed] text-center mb-2 animate-slide-in">{scheme.title}</h2>
                        <div className="text-green-400 font-medium flex items-center animate-fade-in">
                            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                            <span>{scheme.location}</span>
                        </div>
                    </div>
                    {/* Collapsible Sections */}
                    <div className="space-y-4">
                        {/* Details */}
                        {scheme.details && (
                            <div className="rounded-lg border border-blue-900 bg-[#23262b]">
                                <button onClick={() => toggleSection('details')} className="w-full flex items-center justify-between px-4 py-3 focus:outline-none">
                                    <span className="flex items-center font-semibold text-blue-400 text-lg">{sectionIcons.details} Details</span>
                                    <svg className={`w-5 h-5 text-blue-400 transition-transform ${openSections.details ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openSections.details ? 'max-h-96 opacity-100 py-2 px-4' : 'max-h-0 opacity-0 py-0 px-4'}`}>
                                    <p className="text-[#ededed]">{scheme.details}</p>
                                </div>
                            </div>
                        )}
                        {/* Benefits */}
                        {scheme.benefits && scheme.benefits.length > 0 && (
                            <div className="rounded-lg border border-green-900 bg-[#23262b]">
                                <button onClick={() => toggleSection('benefits')} className="w-full flex items-center justify-between px-4 py-3 focus:outline-none">
                                    <span className="flex items-center font-semibold text-green-400 text-lg">{sectionIcons.benefits} Benefits</span>
                                    <svg className={`w-5 h-5 text-green-400 transition-transform ${openSections.benefits ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openSections.benefits ? 'max-h-96 opacity-100 py-2 px-4' : 'max-h-0 opacity-0 py-0 px-4'}`}>
                                    <ul className="list-disc ml-8 text-[#ededed]">
                                        {scheme.benefits.map((b: any) => <li key={b}>{b}</li>)}
                                    </ul>
                                </div>
                            </div>
                        )}
                        {/* Eligibility */}
                        {scheme.eligibility && (
                            <div className="rounded-lg border border-yellow-900 bg-[#23262b]">
                                <button onClick={() => toggleSection('eligibility')} className="w-full flex items-center justify-between px-4 py-3 focus:outline-none">
                                    <span className="flex items-center font-semibold text-yellow-400 text-lg">{sectionIcons.eligibility} Eligibility</span>
                                    <svg className={`w-5 h-5 text-yellow-400 transition-transform ${openSections.eligibility ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openSections.eligibility ? 'max-h-96 opacity-100 py-2 px-4' : 'max-h-0 opacity-0 py-0 px-4'}`}>
                                    <p className="text-[#ededed]">{scheme.eligibility}</p>
                                </div>
                            </div>
                        )}
                        {/* Application Process */}
                        {scheme.applicationProcess && (
                            <div className="rounded-lg border border-indigo-900 bg-[#23262b]">
                                <button onClick={() => toggleSection('application')} className="w-full flex items-center justify-between px-4 py-3 focus:outline-none">
                                    <span className="flex items-center font-semibold text-indigo-400 text-lg">{sectionIcons.application} Application Process</span>
                                    <svg className={`w-5 h-5 text-indigo-400 transition-transform ${openSections.application ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openSections.application ? 'max-h-96 opacity-100 py-2 px-4' : 'max-h-0 opacity-0 py-0 px-4'}`}>
                                    <p className="text-[#ededed]">{scheme.applicationProcess}</p>
                                </div>
                            </div>
                        )}
                        {/* Documents Required */}
                        {scheme.documentsRequired && scheme.documentsRequired.length > 0 && (
                            <div className="rounded-lg border border-pink-900 bg-[#23262b]">
                                <button onClick={() => toggleSection('documents')} className="w-full flex items-center justify-between px-4 py-3 focus:outline-none">
                                    <span className="flex items-center font-semibold text-pink-400 text-lg">{sectionIcons.documents} Documents Required</span>
                                    <svg className={`w-5 h-5 text-pink-400 transition-transform ${openSections.documents ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openSections.documents ? 'max-h-96 opacity-100 py-2 px-4' : 'max-h-0 opacity-0 py-0 px-4'}`}>
                                    <ul className="list-disc ml-8 text-[#ededed]">
                                        {scheme.documentsRequired.map((doc: any) => <li key={doc}>{doc}</li>)}
                                    </ul>
                                </div>
                            </div>
                        )}
                        {/* FAQ */}
                        {scheme.faqs && scheme.faqs.length > 0 && (
                            <div className="rounded-lg border border-purple-900 bg-[#23262b]">
                                <button onClick={() => toggleSection('faq')} className="w-full flex items-center justify-between px-4 py-3 focus:outline-none">
                                    <span className="flex items-center font-semibold text-purple-400 text-lg">{sectionIcons.faq} Frequently Asked Questions</span>
                                    <svg className={`w-5 h-5 text-purple-400 transition-transform ${openSections.faq ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openSections.faq ? 'max-h-96 opacity-100 py-2 px-4' : 'max-h-0 opacity-0 py-0 px-4'}`}>
                                    <div className="space-y-2">
                                        {scheme.faqs.map((faq: any) => (
                                            <div key={faq.question} className="mb-2">
                                                <div className="font-semibold text-purple-300">Q: {faq.question}</div>
                                                <div className="ml-4 text-[#ededed]">A: {faq.answer}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Visit Official Website Button */}
                        {scheme.sourceUrl && (
                            <div className="flex justify-center mt-8">
                                <a
                                    href={scheme.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg text-center shadow transition"
                                >
                                    Visit Official Website
                                </a>
                            </div>
                        )}
                    </div>
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
        </>
    )
}


export default SchemesDetailed;
