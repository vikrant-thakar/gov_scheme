"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SignInPage() {
  const [mobile, setMobile] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!mobile || !pin) {
      setError("Please enter both mobile number and pin.");
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, pin }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || 'Login failed');
        return;
      }
      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      setError("");
      window.location.href = "/";
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Login failed');
      } else {
        setError('Login failed');
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        window.location.href = "/";
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8 md:rounded-l-2xl shadow-lg">
        {/* Logo (replace with your logo if needed) */}
        <div className="mb-8 flex items-center gap-2">
          <span className="inline-block w-8 h-8 bg-green-400 rounded-full" />
          <span className="text-2xl font-bold text-gray-800">Zycoon</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 w-full text-left">Sign in to your account</h1>
        <p className="text-gray-500 mb-6 w-full text-left text-sm">
          Not a member?{' '}
          <Link href="/auth/register" className="text-green-500 hover:underline font-semibold">Register now</Link>
        </p>
        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
          <label className="text-gray-700 text-sm font-semibold">Mobile Number</label>
          <input
            type="tel"
            placeholder="Mobile Number"
            className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-green-400 bg-gray-50 text-gray-900"
            value={mobile}
            onChange={e => setMobile(e.target.value)}
            autoComplete="tel"
            pattern="[0-9]{10}"
            maxLength={10}
          />
          <label className="text-gray-700 text-sm font-semibold mt-2">Pin</label>
          <div className="relative">
            <input
              type={showPin ? "text" : "password"}
              placeholder="Pin"
              className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-green-400 bg-gray-50 text-gray-900 w-full"
              value={pin}
              onChange={e => setPin(e.target.value)}
              autoComplete="current-password"
              maxLength={6}
              pattern="[0-9]{4,6}"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400"
              onClick={() => setShowPin(v => !v)}
              tabIndex={-1}
            >
              {showPin ? "Hide" : "Show"}
            </button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center gap-2 text-gray-600 text-sm">
              <input type="checkbox" className="accent-green-500" />
              Remember me
            </label>
            <Link href="#" className="text-green-500 hover:underline text-sm font-semibold">Forgot pin?</Link>
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="mt-2 py-3 rounded bg-green-500 hover:bg-green-600 text-white font-semibold text-lg transition"
          >
            Sign in
          </button>
        </form>
      </div>
      {/* Right: Image */}
      <div className="w-full md:w-1/2 h-64 md:h-auto relative hidden md:block rounded-r-2xl overflow-hidden">
        <Image
          src="/sign-in.jpg"
          alt="Sign in illustration"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </div>
  );
} 