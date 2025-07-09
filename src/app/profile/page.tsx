"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FilterPreferences from "@/components/FilterPreferences";
import LogoutModal from "@/components/LogoutModal";

type User = {
  name: string;
  pin: string;
  email?: string;
  avatar?: string;
  mobile?: string;
};

function PersonalProfileSection({ onLogoutClick }: { onLogoutClick: () => void }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [deleteMsg, setDeleteMsg] = useState("");
  const [deletePin, setDeletePin] = useState("");
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '' });
  const [saveMsg, setSaveMsg] = useState("");
  // Add state for pin modal
  const [showPinModal, setShowPinModal] = useState(false);
  const [oldPin, setOldPin] = useState("");
  const [newPinModal, setNewPinModal] = useState("");
  const [confirmPinModal, setConfirmPinModal] = useState("");
  const [pinModalMsg, setPinModalMsg] = useState("");

  const handleOpenPinModal = () => {
    setOldPin("");
    setNewPinModal("");
    setConfirmPinModal("");
    setPinModalMsg("");
    setShowPinModal(true);
  };

  const handleChangePinModal = () => {
    if (oldPin !== pin) {
      setPinModalMsg("Old pin is incorrect.");
      return;
    }
    if (!newPinModal || newPinModal !== confirmPinModal) {
      setPinModalMsg("New pins do not match.");
      return;
    }
    const updated = {
      ...user,
      name: user?.name || "",
      pin: newPinModal,
    };
    setUser(updated);
    setPin(newPinModal);
    localStorage.setItem("currentUser", JSON.stringify(updated));
    localStorage.setItem("user", JSON.stringify(updated));
    setPinModalMsg("Pin updated successfully.");
    setTimeout(() => {
      setShowPinModal(false);
      setPinModalMsg("");
    }, 1200);
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userStr = localStorage.getItem("currentUser");
    if (isLoggedIn !== "true" || !userStr) {
      router.replace("/auth/signin");
    } else {
      const u = JSON.parse(userStr);
      setUser(u);
      setFirstName(u.name?.split(" ")[0] || "");
      setLastName(u.name?.split(" ").slice(1).join(" ") || "");
      setEmail(u.email || "");
    }
  }, [router]);

  useEffect(() => {
    if (user) setPin(user.pin);
  }, [user]);

  const validate = () => {
    let valid = true;
    const newErrors = { firstName: '', lastName: '', email: '' };
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required.';
      valid = false;
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
      valid = false;
    }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Email is invalid.';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSavePersonal = () => {
    if (!validate()) return;
    const updated = {
      name: `${firstName} ${lastName}`.trim() || '',
      email: email || '',
      pin: user?.pin || '',
    };
    setUser(updated);
    localStorage.setItem('currentUser', JSON.stringify(updated));
    localStorage.setItem('user', JSON.stringify(updated));
    setSaveMsg("Profile updated successfully!");
    setTimeout(() => setSaveMsg(""), 2000);
  };

  const handleDeleteAccount = () => {
    if (deletePin !== pin) {
      setDeleteMsg("Incorrect pin.");
      return;
    }
    // Remove from users array
    const usersStr = localStorage.getItem("users");
    if (usersStr && user) {
      let users = [];
      try {
        users = JSON.parse(usersStr);
      } catch {}
      users = users.filter(
        (u: User) =>
          u.mobile !== user.mobile &&
          (user.email ? u.email !== user.email : true)
      );
      localStorage.setItem("users", JSON.stringify(users));
    }
    localStorage.removeItem("currentUser");
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("profileFilterPreferences");
    if (user?.mobile) localStorage.removeItem(`profileFilterPreferences_${user.mobile}`);
    if (user?.email) localStorage.removeItem(`profileFilterPreferences_${user.email}`);
    setDeleteMsg("");
    router.push("/auth/register");
  };

  if (!user) return null;

  return (
    <div className="w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-800 p-8 flex flex-col gap-12 animate-fade-in">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-block w-2 h-8 rounded-full bg-gradient-to-b from-green-400 to-blue-500"></span>
        <h2 className="text-2xl font-extrabold text-gray-100 tracking-wide">Profile</h2>
      </div>
      {/* Personal Info Section */}
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/3 flex flex-col items-center">
          <div className="font-bold text-lg mb-2">Personal Information</div>
          <div className="text-sm text-gray-400 mb-4 text-center">Use a permanent address where you can receive mail.</div>
          <div className="flex flex-col items-center gap-2">
          </div>
        </div>
        <div className="md:w-2/3 flex flex-col gap-6 justify-center">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm mb-1 font-semibold text-gray-300">First name</label>
              <input
                className="w-full px-4 py-2 rounded-xl bg-[#23262b]/80 border border-gray-700 text-[#ededed] focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              {errors.firstName && <div className="text-red-400 text-xs mt-1">{errors.firstName}</div>}
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1 font-semibold text-gray-300">Last name</label>
              <input
                className="w-full px-4 py-2 rounded-xl bg-[#23262b]/80 border border-gray-700 text-[#ededed] focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
              {errors.lastName && <div className="text-red-400 text-xs mt-1">{errors.lastName}</div>}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1 font-semibold text-gray-300">Email address</label>
            <input
              className="w-full px-4 py-2 rounded-xl bg-[#23262b]/80 border border-gray-700 text-[#ededed] focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {errors.email && <div className="text-red-400 text-xs mt-1">{errors.email}</div>}
          </div>
          <button
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl text-white font-bold mt-2 w-36 shadow transition-transform hover:scale-105"
            onClick={handleSavePersonal}
          >
            Save
          </button>
          {saveMsg && <div className="text-green-400 text-sm mt-2">{saveMsg}</div>}
        </div>
      </div>
      <div className="my-4 border-t border-gray-700" />
      {/* Change Pin Section */}
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/3">
          <div className="font-semibold mb-2 text-green-400">Change pin</div>
          <div className="text-sm text-gray-400 mb-2">Update your pin associated with your account.</div>
        </div>
        <div className="md:w-2/3 flex flex-col gap-4 justify-center">
          <button
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl text-white font-bold w-36 shadow transition-transform hover:scale-105"
            onClick={handleOpenPinModal}
          >
            Change Pin
          </button>
        </div>
      </div>
      {/* Pin Change Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative w-full max-w-xs p-0">
            <div className="bg-gradient-to-br from-green-400 via-blue-500 to-indigo-500 rounded-2xl p-1 shadow-2xl">
              <div className="bg-[#181a20]/80 backdrop-blur-xl rounded-2xl p-8">
                <button
                  className="absolute top-4 right-6 text-gray-400 hover:text-white text-2xl font-bold z-10"
                  onClick={() => setShowPinModal(false)}
                  aria-label="Close"
                >
                  ×
                </button>
                <div className="flex flex-col items-center mb-4">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-blue-400 shadow-lg mb-2">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10V7a4.5 4.5 0 00-9 0v3m12 0H3m15 0a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2m12 0V7a6 6 0 10-12 0v3" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#ededed] text-center mb-1">Change Pin</h3>
                  <div className="text-gray-400 text-sm text-center">Secure your account by updating your pin.</div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1 font-semibold text-gray-300">Old Pin</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 rounded-xl bg-[#23262b]/80 border border-gray-700 text-[#ededed] focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                    value={oldPin}
                    onChange={e => setOldPin(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1 font-semibold text-gray-300">New Pin</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 rounded-xl bg-[#23262b]/80 border border-gray-700 text-[#ededed] focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    value={newPinModal}
                    onChange={e => setNewPinModal(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1 font-semibold text-gray-300">Confirm New Pin</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 rounded-xl bg-[#23262b]/80 border border-gray-700 text-[#ededed] focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                    value={confirmPinModal}
                    onChange={e => setConfirmPinModal(e.target.value)}
                  />
                </div>
                {pinModalMsg && <div className={`text-sm mt-2 ${pinModalMsg.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{pinModalMsg}</div>}
                <div className="flex gap-2 mt-6">
                  <button
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl font-bold shadow transition-transform hover:scale-105"
                    onClick={handleChangePinModal}
                  >
                    Save
                  </button>
                  <button
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white rounded-xl font-bold shadow transition-transform hover:scale-105"
                    onClick={() => setShowPinModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="my-4 border-t border-gray-700" />
      {/* Logout Section */}
      <div className="flex flex-col md:flex-row gap-12 mt-8">
        <div className="md:w-1/3">
          <div className="font-semibold mb-2 text-gray-200">Logout</div>
          <div className="text-sm text-gray-400 mb-2">Logout from your account.</div>
        </div>
        <div className="md:w-2/3 flex flex-col gap-4 justify-center">
          <button
            className="px-6 py-2 bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900 rounded-xl text-white font-bold w-36 shadow transition-transform hover:scale-105"
            onClick={onLogoutClick}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="my-4 border-t border-gray-700" />
      {/* Delete Account Section */}
      <div className="flex flex-col md:flex-row gap-12 mt-8">
        <div className="md:w-1/3">
          <div className="font-semibold mb-2 text-red-400">Delete Account</div>
          <div className="text-sm text-gray-400 mb-2">Permanently delete your account.</div>
        </div>
        <div className="md:w-2/3 flex flex-col gap-4 justify-center">
          <div className="flex gap-4 items-center mt-2">
            <input
              type="password"
              className="w-full px-4 py-2 rounded-xl bg-[#23262b]/80 border border-gray-700 text-[#ededed] focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
              placeholder="Enter pin to delete account"
              value={deletePin}
              onChange={e => setDeletePin(e.target.value)}
            />
            <button
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-xl text-white font-bold shadow transition-transform hover:scale-105"
              onClick={handleDeleteAccount}
            >
              Delete
            </button>
          </div>
          {deleteMsg && <div className="text-red-400 text-sm mt-2">{deleteMsg}</div>}
        </div>
      </div>
      
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}

export default function ProfilePage() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    window.dispatchEvent(new Event("storage"));
    router.push("/auth/signin");
  };
  return (
    <>
      <div className="min-h-screen bg-[#23262b] text-[#ededed] flex flex-col items-center py-10">
        <div className="w-full max-w-full flex flex-col md:flex-row gap-14 px-4 md:px-8">
          <div className="flex-[1.3] min-w-0">
            <PersonalProfileSection onLogoutClick={() => setShowLogoutModal(true)} />
          </div>
          <div className="flex-1 min-w-0">
            <FilterPreferences />
          </div>
        </div>
      </div>
      <LogoutModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
} 