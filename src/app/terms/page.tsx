import React from "react";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-green-400 text-center">Terms &amp; Conditions</h1>
      <section className="mb-8">
        <p className="text-lg mb-4">
          Welcome to <span className="font-semibold">Zycoon</span>. By accessing or using this platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-green-300">1. Acceptance of Terms</h2>
        <p>
          By using Zycoon, you acknowledge that you have read, understood, and agree to be bound by these Terms &amp; Conditions and all applicable laws and regulations.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-green-300">2. Use of the Platform</h2>
        <ul className="list-disc pl-6 mb-4 text-gray-200">
          <li className="mb-2">Zycoon is intended for informational purposes to help users discover and understand government schemes.</li>
          <li className="mb-2">You agree to use the platform only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else&apos;s use of the platform.</li>
          <li>Unauthorized use of this platform may give rise to a claim for damages and/or be a criminal offense.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-green-300">3. Intellectual Property</h2>
        <p className="mb-4">
          All content, design, graphics, and other materials on Zycoon are the intellectual property of Zycoon or its licensors. You may not reproduce, distribute, or create derivative works without explicit permission.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-green-300">4. User Responsibilities</h2>
        <ul className="list-disc pl-6 mb-4 text-gray-200">
          <li className="mb-2">You are responsible for ensuring that any information you provide is accurate and up to date.</li>
          <li className="mb-2">You must not misuse the platform by knowingly introducing viruses or other harmful material.</li>
          <li>You must not attempt to gain unauthorized access to the platform, its server, or any connected database.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-green-300">5. Limitation of Liability</h2>
        <p className="mb-4">
          Zycoon strives to provide accurate and up-to-date information, but does not guarantee the completeness, accuracy, or reliability of any content. Zycoon is not liable for any loss or damage arising from your use of the platform.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-green-300">6. Changes to Terms</h2>
        <p className="mb-4">
          Zycoon reserves the right to modify these Terms &amp; Conditions at any time. Changes will be posted on this page. Continued use of the platform after changes constitutes acceptance of those changes.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-green-300">7. Contact</h2>
        <p>
          If you have any questions or concerns about these Terms &amp; Conditions, please contact us at:
        </p>
        <div className="bg-[#232e3e] rounded-lg p-4 mt-2">
          <span className="font-semibold text-green-300">Email:</span> <a href="mailto:support-zycoon@zycoon.gov.in" className="text-blue-400 underline">support-zycoon@zycoon.gov.in</a>
        </div>
      </section>
    </div>
  );
} 