"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type User = { name: string; mobile: string; pin: string };

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [pinError, setPinError] = useState("");
  const [confirmPinError, setConfirmPinError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNameError("");
    setMobileError("");
    setPinError("");
    setConfirmPinError("");
    setError("");

    if (!name || !mobile || !pin || !confirmPin) {
      setError("Please fill in all fields.");
      if (!name) setNameError("Name is required.");
      if (!mobile) setMobileError("Mobile number is required.");
      if (!pin) setPinError("Pin is required.");
      if (!confirmPin) setConfirmPinError("Confirm pin is required.");
      return;
    }
    if (!/^[A-Za-z ]{1,20}$/.test(name)) {
      setNameError("Name must be alphabetic and up to 20 characters.");
      return;
    }
    if (!/^[0-9]{10}$/.test(mobile)) {
      setMobileError("Mobile number must be exactly 10 digits.");
      return;
    }
    if (!/^[0-9]{6,}$/.test(pin)) {
      setPinError("Pin must be at least 6 digits and only numbers.");
      return;
    }
    if (pin !== confirmPin) {
      setConfirmPinError("Pins do not match.");
      return;
    }
    // Check for duplicate mobile number
    let users: User[] = [];
    const usersStr = localStorage.getItem("users");
    if (usersStr) {
      try {
        users = JSON.parse(usersStr);
      } catch {}
    }
    if (users.some((u: User) => u.mobile === mobile)) {
      setMobileError("This mobile number is already registered.");
      return;
    }
    // Save user to users array in localStorage
    const user = { name, mobile, pin };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    setError("");
    window.location.href = "/";
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
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
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 w-full text-left">Create your account</h1>
        <p className="text-gray-500 mb-6 w-full text-left text-sm">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-green-500 hover:underline font-semibold">Sign in</Link>
        </p>
        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
          <label className="text-gray-700 text-sm font-semibold">Name</label>
          <input
            type="text"
            placeholder="Full Name"
            className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-green-400 bg-gray-50 text-gray-900"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="name"
            maxLength={50}
          />
          {nameError && <div className="text-red-500 text-xs mt-1">{nameError}</div>}
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
          {mobileError && <div className="text-red-500 text-xs mt-1">{mobileError}</div>}
          <label className="text-gray-700 text-sm font-semibold mt-2">Pin</label>
          <div className="relative">
            <input
              type={showPin ? "text" : "password"}
              placeholder="Pin"
              className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-green-400 bg-gray-50 text-gray-900 w-full"
              value={pin}
              onChange={e => setPin(e.target.value)}
              autoComplete="new-password"
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
          {pinError && <div className="text-red-500 text-xs mt-1">{pinError}</div>}
          <label className="text-gray-700 text-sm font-semibold mt-2">Confirm Pin</label>
          <input
            type={showPin ? "text" : "password"}
            placeholder="Confirm Pin"
            className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-green-400 bg-gray-50 text-gray-900"
            value={confirmPin}
            onChange={e => setConfirmPin(e.target.value)}
            autoComplete="new-password"
            maxLength={6}
            pattern="[0-9]{4,6}"
          />
          {confirmPinError && <div className="text-red-500 text-xs mt-1">{confirmPinError}</div>}
          {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}
          <button
            type="submit"
            className="mt-2 py-3 rounded bg-green-500 hover:bg-green-600 text-white font-semibold text-lg transition"
          >
            Register
          </button>
        </form>
      </div>
      {/* Right: Image */}
      <div className="w-full md:w-1/2 h-64 md:h-auto relative hidden md:block rounded-r-2xl overflow-hidden">
        <Image
          src="/sign-in.jpg"
          alt="Register illustration"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </div>
  );
} 