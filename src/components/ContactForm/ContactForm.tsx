"use client";
import React, { useState } from "react";
import { EnvelopeIcon, UserIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

// Types for form state
interface FormState {
  name: string;
  email: string;
  message: string;
}
interface ErrorState {
  name: string;
  email: string;
  message: string;
}
interface TouchedState {
  name: boolean;
  email: boolean;
  message: boolean;
}

interface ContactFormProps {
  onSubmit?: (formData: FormState) => void;
  className?: string;
}

export default function ContactForm({ onSubmit, className = "" }: ContactFormProps) {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<ErrorState>({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState<TouchedState>({ name: false, email: false, message: false });
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Validation logic
  const validate = (field: keyof FormState, value: string): string => {
    switch (field) {
      case "name":
        return value.trim().length < 2 ? "Name must be at least 2 characters." : "";
      case "email":
        return !/^\S+@\S+\.\S+$/.test(value) ? "Enter a valid email address." : "";
      case "message":
        return value.trim().length < 10 ? "Message must be at least 10 characters." : "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFocusedField(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: ErrorState = {
      name: validate("name", form.name),
      email: validate("email", form.email),
      message: validate("message", form.message),
    };
    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });
    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      setSuccess(true);
      if (onSubmit) {
        onSubmit(form);
      }
      setForm({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <form
      className={`w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-800 p-8 space-y-8 animate-fade-in ${className}`}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div className="flex items-center gap-3 mb-8">
        <span className="inline-block w-2 h-8 rounded-full bg-gradient-to-b from-green-400 to-blue-500"></span>
        <h2 className="text-2xl font-extrabold text-gray-100 tracking-wide">Send us a message</h2>
      </div>
      
      {/* Name Field */}
      <div className="relative mb-10">
        <UserIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none" />
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={() => setFocusedField('name')}
          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#23262b]/80 border ${errors.name && touched.name ? "border-red-500" : "border-gray-700"} text-gray-100 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition peer`}
        />
        <label
          htmlFor="name"
          className={`absolute transition-all duration-200 pointer-events-none px-1
            ${(form.name || focusedField === 'name')
              ? 'left-1 top-[-2.4rem] text-2xl font-normal text-blue-500  bg-transparent mt-2'
              : 'left-10 top-1/2 -translate-y-1/2 text-lg text-gray-400 bg-transparent'}
          `}
        >
          Name
        </label>
        {errors.name && touched.name && (
          <p className="text-red-400 text-xs mt-1 ml-2">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="relative mb-10">
        <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none" />
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={() => setFocusedField('email')}
          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#23262b]/80 border ${errors.email && touched.email ? "border-red-500" : "border-gray-700"} text-gray-100 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition peer`}
        />
        <label
          htmlFor="email"
          className={`absolute transition-all duration-200 pointer-events-none px-1
            ${(form.email || focusedField === 'email')
              ? 'left-1 top-[-2.4rem] text-2xl font-normal text-blue-500 bg-transparent mt-2'
              : 'left-10 top-1/2 -translate-y-1/2 text-lg text-gray-400 bg-transparent'}
          `}
        >
          Email
        </label>
        {errors.email && touched.email && (
          <p className="text-red-400 text-xs mt-1 ml-2">{errors.email}</p>
        )}
      </div>

      {/* Message Field */}
      <div className="relative mb-4">
        <ChatBubbleLeftRightIcon className="w-5 h-5 absolute left-3 top-4 text-blue-400 pointer-events-none" />
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={() => setFocusedField('message')}
          rows={5}
          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#23262b]/80 border ${errors.message && touched.message ? "border-red-500" : "border-gray-700"} text-gray-100 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition peer resize-none`}
        />
        <label
          htmlFor="message"
          className={`absolute transition-all duration-200 pointer-events-none px-1
            ${(form.message || focusedField === 'message')
              ? 'left-1 top-[-2.6rem] text-2xl font-normal text-blue-500 bg-transparent mt-2'
              : 'left-10 top-4 text-lg text-gray-400 bg-transparent'}
          `}
        >
          Message
        </label>
        {errors.message && touched.message && (
          <p className="text-red-400 text-xs mt-1 ml-2">{errors.message}</p>
        )}
      </div>

      {/* Submit Button with Ripple */}
      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-lg shadow transition-transform hover:scale-105 mt-2 relative overflow-hidden ripple"
      >
        <span className="relative z-10">Send Message</span>
      </button>

      {/* Success Snackbar */}
      {success && (
        <div className="fixed left-1/2 bottom-8 -translate-x-1/2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in z-50">
          Thank you! Your message has been sent.
        </div>
      )}

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        /* Button Ripple Effect */
        .ripple:after {
          content: "";
          display: block;
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          background: rgba(255,255,255,0.3);
          border-radius: 100%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          transition: width 0.4s cubic-bezier(0.4,0,0.2,1), height 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .ripple:active:after {
          width: 200px;
          height: 200px;
          transition: 0s;
        }
      `}</style>
    </form>
  );
} 