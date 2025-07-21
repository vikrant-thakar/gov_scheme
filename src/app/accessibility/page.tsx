import React from "react";

export default function AccessibilityPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-green-400 text-center">Accessibility Statement</h1>
      <section className="mb-8">
        <p className="text-lg mb-4">
          <span className="font-semibold">Adhikaar</span> is committed to ensuring that our platform is accessible to all users, regardless of device, technology, or ability. Our goal is to provide maximum accessibility and usability for every visitor.
        </p>
        <p className="text-lg mb-4">
          The platform is designed to be responsive and can be accessed from a wide range of devices, including desktop and laptop computers, as well as web-enabled mobile devices.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-green-300">Accessibility for People with Disabilities</h2>
        <p className="mb-4">
          We have made every effort to ensure that all information on this platform is accessible to people with disabilities. For example, users with visual impairments can access the platform using assistive technologies such as screen readers and screen magnifiers.
        </p>
        <p className="mb-4">
          We strive to follow best practices in usability and universal design, making the platform easier to use for everyone.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-green-300">Standards Compliance</h2>
        <p className="mb-4">
          Adhikaar is built using modern technologies such as React JS and Next JS, and is designed to meet the <span className="font-semibold">Guidelines for Indian Government Websites</span> as well as <span className="font-semibold">Level A of the Web Content Accessibility Guidelines (WCAG) 2.0</span> set by the World Wide Web Consortium (W3C).
        </p>
        <p className="mb-4">
          Some information on this platform is provided through links to external websites, which are maintained by their respective departments. These departments are responsible for ensuring the accessibility of their sites.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-green-300">Current Limitations</h2>
        <ul className="list-disc pl-6 mb-4 text-gray-200">
          <li className="mb-2">PDF files on the platform are currently not accessible.</li>
          <li>Information provided in Hindi language is also not accessible at this time.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-green-300">Feedback &amp; Contact</h2>
        <p className="mb-4">
          We are continuously working to improve the accessibility of Adhikaar. If you encounter any issues or have suggestions, please contact us at:
        </p>
        <div className="bg-[#232e3e] rounded-lg p-4 mb-4">
          <span className="font-semibold text-green-300">Email:</span> <a href="mailto:support-Adhikaar@Adhikaar.gov.in" className="text-blue-400 underline">support-Adhikaar@Adhikaar.gov.in</a>
        </div>
        <p>
          Please describe the nature of the problem and include your contact information so we can assist you effectively.
        </p>
      </section>
    </div>
  );
}
