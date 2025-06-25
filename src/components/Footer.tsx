import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#181c20] text-gray-200 pt-8 pb-4 mt-16">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row md:justify-between items-center gap-6">
        {/* Temporary Logo */}
        <div className="flex flex-col items-center gap-2 mb-2 md:mb-0">
          <Image
            src="https://placehold.co/80x40?text=Logo"
            alt="Temporary Logo"
            width={80}
            height={40}
            className="h-10 w-auto rounded bg-gray-700"
          />
          <span className="text-xs text-gray-400 mt-2">Powered by Digital India Corporation (DIC)</span>
        </div>
        {/* Links */}
        <div className="flex flex-col items-center gap-2 text-sm">
          <a href="#" className="hover:underline">About Us</a>
          <a href="#" className="hover:underline">Contact Us</a>
          <a href="#" className="hover:underline">FAQ</a>
          <a href="#" className="hover:underline">Accessibility</a>
          <a href="#" className="hover:underline">Terms & Conditions</a>
        </div>
        {/* Contact */}
        <div className="text-xs text-gray-400 text-center md:text-right">
          <div>support-myscheme[at]digitalindia[dot]gov[dot]in</div>
          <div>(011) 24303714</div>
          <div>4th Floor, NeGD, Electronics Niketan,<br />6 CGO Complex, Lodhi Road, New Delhi - 110003, India</div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} myScheme. All rights reserved.
      </div>
    </footer>
  );
}