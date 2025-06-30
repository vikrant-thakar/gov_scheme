"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const defaultAvatar = "https://randomuser.me/api/portraits/men/32.jpg";

type User = {
  name: string;
  mobile: string;
  pin: string;
  email?: string;
  avatar?: string;
};

export default function ProfilePage() {
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
    localStorage.removeItem("currentUser");
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", "false");
    setDeleteMsg("");
    router.push("/auth/register");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#23262b] text-[#ededed] flex flex-col items-center py-10">
      <div className="w-full max-w-5xl bg-[#181a20] rounded-lg shadow-lg p-12 flex flex-col gap-12">
        {/* Personal Info Section */}
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="font-bold text-lg mb-2">Personal Information</div>
            <div className="text-sm text-gray-400 mb-4 text-center">Use a permanent address where you can receive mail.</div>
            <div className="flex flex-col items-center gap-2">
              <Image src={avatar} alt="avatar" width={96} height={96} className="rounded-lg object-cover" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleAvatarChange}
              />
              <button
                className="px-3 py-1 bg-[#23262b] text-[#ededed] rounded hover:bg-[#2d3036] border border-gray-600 text-sm"
                onClick={() => fileInputRef.current?.click()}
              >
                Change avatar
              </button>
              <div className="text-xs text-gray-400">JPG, GIF or PNG. 1MB max.</div>
            </div>
          </div>
          {/* Main Content */}
          <div className="md:w-2/3 flex flex-col gap-4 justify-center">
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm mb-1">First name</label>
                <input
                  className="w-full px-3 py-2 rounded bg-[#23262b] border border-gray-700 text-[#ededed]"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm mb-1">Last name</label>
                <input
                  className="w-full px-3 py-2 rounded bg-[#23262b] border border-gray-700 text-[#ededed]"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Email address</label>
              <input
                className="w-full px-3 py-2 rounded bg-[#23262b] border border-gray-700 text-[#ededed]"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Username</label>
              <input
                className="w-full px-3 py-2 rounded bg-[#23262b] border border-gray-700 text-gray-400"
                value={`example.com/${firstName.toLowerCase()}${lastName ? lastName.toLowerCase() : ''}`}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Timezone</label>
              <select
                className="w-full px-3 py-2 rounded bg-[#23262b] border border-gray-700 text-[#ededed]"
                value="Pacific Standard Time"
                disabled
              >
                <option>Pacific Standard Time</option>
              </select>
            </div>
            <button
              className="px-5 py-2 bg-[#6c47ff] hover:bg-[#7d5fff] rounded text-white font-semibold mt-2 w-32"
              onClick={handleSavePersonal}
            >
              Save
            </button>
          </div>
        </div>
        {/* Change Pin Section */}
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <div className="font-semibold mb-2">Change pin</div>
            <div className="text-sm text-gray-400 mb-2">Update your pin associated with your account.</div>
          </div>
          <div className="md:w-2/3 flex flex-col gap-4 justify-center">
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm mb-1">Current pin</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 rounded bg-[#23262b] border border-gray-700 text-[#ededed]"
                  value={pin}
                  disabled
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm mb-1">New pin</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 rounded bg-[#23262b] border border-gray-700 text-[#ededed]"
                  value={newPin}
                  onChange={e => setNewPin(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm mb-1">Confirm pin</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 rounded bg-[#23262b] border border-gray-700 text-[#ededed]"
                  value={confirmPin}
                  onChange={e => setConfirmPin(e.target.value)}
                />
              </div>
            </div>
            {pinMsg && <div className="text-sm text-green-400 mb-2">{pinMsg}</div>}
            <button
              className="px-5 py-2 bg-[#6c47ff] hover:bg-[#7d5fff] rounded text-white font-semibold w-32"
              onClick={handleChangePin}
            >
              Save
            </button>
          </div>
        </div>
        {/* Logout section (was 'Log out other sessions') */}
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <div className="font-semibold mb-2">Logout</div>
            <div className="text-sm text-gray-400 mb-2">Please enter your pin to confirm logout.</div>
          </div>
          <div className="md:w-2/3 flex flex-col gap-4 justify-center">
            <div className="mb-4">
              <label className="block text-sm mb-1">Your pin</label>
              <input
                type="password"
                className="w-full px-3 py-2 rounded bg-[#23262b] border border-gray-700 text-[#ededed]"
                value={deletePin}
                onChange={e => setDeletePin(e.target.value)}
              />
            </div>
            {deleteMsg && <div className="text-sm text-red-400 mb-2">{deleteMsg}</div>}
            <button
              className="px-5 py-2 bg-white text-[#23262b] hover:bg-gray-200 rounded font-semibold w-48"
              onClick={() => {
                if (deletePin !== pin) {
                  setDeleteMsg("Incorrect pin.");
                  return;
                }
                localStorage.setItem("isLoggedIn", "false");
                localStorage.removeItem("currentUser");
                window.location.href = "/auth/signin";
              }}
            >
              Logout
            </button>
          </div>
        </div>
        {/* Delete Account Section */}
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <div className="font-semibold mb-2">Delete account</div>
            <div className="text-sm text-gray-400 mb-2">No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.</div>
          </div>
          <div className="md:w-2/3 flex flex-col gap-4 justify-center">
            <div className="mb-4">
              <input
                type="password"
                className="w-full px-3 py-2 rounded bg-[#23262b] border border-gray-700 text-[#ededed]"
                placeholder="Enter your pin to confirm"
                value={deletePin}
                onChange={e => setDeletePin(e.target.value)}
              />
            </div>
            {deleteMsg && <div className="text-sm text-red-400 mb-2">{deleteMsg}</div>}
            <button
              className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold w-56"
              onClick={handleDeleteAccount}
            >
              Yes, delete my account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 