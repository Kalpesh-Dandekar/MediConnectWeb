"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getRelativeProfile,
  updateRelativeProfile,
} from "../../services/relative/profileService";
import { auth } from "../../services/firebase";

/* ================= TYPES ================= */

type ProfileData = {
  name: string;
  phone: string;
  relationship: string;
  patientName: string;
  email: string;
};

type InputProps = {
  label: string;
  value: string;
  onChange: (v: string) => void; // ✅ FIX
  disabled: boolean;
};

/* ================= COMPONENT ================= */

const RelativeProfile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [data, setData] = useState<ProfileData>({
    name: "",
    phone: "",
    relationship: "",
    patientName: "",
    email: "",
  });

  /* INIT */
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getRelativeProfile();
    if (res) setData(res);
    setLoading(false);
  };

  /* SAVE */
  const handleSave = async () => {
    await updateRelativeProfile({
      name: data.name,
      phone: data.phone,
      relationship: data.relationship,
    });

    setEditing(false);
  };

  /* LOGOUT */
  const handleLogout = async () => {
    await auth.signOut();
    localStorage.clear();
    navigate("/auth/login");
  };

  /* INITIALS */
  const initials = data.name
    ? data.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
    : "--";

  if (loading) return <p className="text-white p-10">Loading...</p>;

  return (
    <div className="max-w-screen-xl mx-auto space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Profile</h1>

        <button
          onClick={editing ? handleSave : () => setEditing(true)}
          className="text-teal-400 text-sm"
        >
          {editing ? "Save" : "Edit"}
        </button>
      </div>

      {/* PROFILE CARD */}
      <div className="p-5 bg-white/5 rounded-xl border border-white/10 flex gap-4">

        <div className="w-14 h-14 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-400 font-bold">
          {initials}
        </div>

        <div>
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm text-white/60">{data.email}</p>
        </div>

      </div>

      {/* FORM */}
      <div className="space-y-3">

        <Input
          label="Name"
          value={data.name}
          onChange={(v: string) => setData({ ...data, name: v })}
          disabled={!editing}
        />

        <Input
          label="Phone"
          value={data.phone}
          onChange={(v: string) => setData({ ...data, phone: v })}
          disabled={!editing}
        />

        <Input
          label="Relationship"
          value={data.relationship}
          onChange={(v: string) =>
            setData({ ...data, relationship: v })
          }
          disabled={!editing}
        />

        <Info label="Linked Patient" value={data.patientName} />

      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="w-full py-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20"
      >
        Logout
      </button>

    </div>
  );
};

export default RelativeProfile;

/* ================= INPUT ================= */

const Input = ({ label, value, onChange, disabled }: InputProps) => (
  <div className="p-3 bg-white/5 rounded-xl border border-white/10">

    <p className="text-xs text-white/50">{label}</p>

    <input
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)} // ✅ FIX
      className="w-full bg-transparent outline-none text-white mt-1"
    />

  </div>
);

/* ================= INFO ================= */

const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex justify-between">
    <span className="text-white/50">{label}</span>
    <span className="text-white">{value}</span>
  </div>
);