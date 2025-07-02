"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FilterPreferences from "@/components/FilterPreferences";
import LogoutModal from "@/components/LogoutModal";

const defaultAvatar = "https://randomuser.me/api/portraits/men/32.jpg";

type User = {
  name: string;
  mobile: string;
  pin: string;
  email?: string;
  avatar?: string;
};

function PersonalProfileSection({ onLogoutClick }: { onLogoutClick: () => void }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [avatar, setAvatar] = useState<string>(defaultAvatar);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [pin, setPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinMsg, setPinMsg] = useState("");
  const [deleteMsg, setDeleteMsg] = useState("");
  const [deletePin, setDeletePin] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setMobile(u.mobile || "");
      setPin(u.pin || "");
      setEmail(u.email || "");
      setAvatar(u.avatar || defaultAvatar);
    }
  }, [router]);

  useEffect(() => {
    if (user) setPin(user.pin);
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatar(ev.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSavePersonal = () => {
    const updated: User = {
      name: `${firstName} ${lastName}`.trim() || "",
      email: email || "",
      mobile: mobile || "",
      avatar: avatar || defaultAvatar,
      pin: user?.pin || "",
    };
    setUser(updated);
    localStorage.setItem("currentUser", JSON.stringify(updated));
    localStorage.setItem("user", JSON.stringify(updated));
  };

  const handleChangePin = () => {
    if (!newPin || newPin !== confirmPin) {
      setPinMsg("Pins do not match.");
      return;
    }
    const updated: User = {
      name: user?.name || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      avatar: user?.avatar || defaultAvatar,
      pin: newPin,
    };
    setUser(updated);
    setPin(newPin);
    setNewPin("");
    setConfirmPin("");
    setPinMsg("Pin updated successfully.");
    localStorage.setItem("currentUser", JSON.stringify(updated));
    localStorage.setItem("user", JSON.stringify(updated));
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
            <Image src={avatar} alt="avatar" width={96} height={96} className="rounded-full object-cover border-4 border-green-400 shadow-lg transition-transform hover:scale-105" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleAvatarChange}
            />
            <button
              className="px-3 py-1 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:scale-105 transition border-none text-sm font-semibold shadow"
              onClick={() => fileInputRef.current?.click()}
            >
              Change avatar
            </button>
            <div className="text-xs text-gray-400">JPG, GIF or PNG. 1MB max.</div>
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
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1 font-semibold text-gray-300">Last name</label>
              <input
                className="w-full px-4 py-2 rounded-xl bg-[#23262b]/80 border border-gray-700 text-[#ededed] focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1 font-semibold text-gray-300">Email address</label>
            <input
              className="w-full px-4 py-2 rounded-xl bg-[#23262b]/80 border border-gray-700 text-[#ededed] focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1 font-semibold text-gray-300">Username</label>
            <input
              className="w-full px-4 py-2 rounded-xl bg-[#23262b]/80 border border-gray-700 text-gray-400"
              value={`example.com/${firstName.toLowerCase()}${lastName ? lastName.toLowerCase() : ''}`}
              disabled
            />
          </div>
          <button
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl text-white font-bold mt-2 w-36 shadow transition-transform hover:scale-105"
            onClick={handleSavePersonal}
          >
            Save
          </button>
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
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm mb-1 font-semibold text-gray-300">Current pin</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-xl bg-[#23262b]/80 border border-gray-700 text-[#ededed] focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                value={pin}
                disabled
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1 font-semibold text-gray-300">New pin</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-xl bg-[#23262b]/80 border border-gray-700 text-[#ededed] focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                value={newPin}
                onChange={e => setNewPin(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1 font-semibold text-gray-300">Confirm new pin</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-xl bg-[#23262b]/80 border border-gray-700 text-[#ededed] focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                value={confirmPin}
                onChange={e => setConfirmPin(e.target.value)}
              />
            </div>
          </div>
          <button
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl text-white font-bold w-36 shadow transition-transform hover:scale-105"
            onClick={handleChangePin}
          >
            Change Pin
          </button>
          {pinMsg && <div className="text-green-400 text-sm mt-2">{pinMsg}</div>}
        </div>
      </div>
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