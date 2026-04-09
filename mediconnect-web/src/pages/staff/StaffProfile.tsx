"use client";

import { useEffect, useState } from "react";
import { auth } from "../../services/firebase";
import {
  listenToStaffProfile,
  updateStaffField,
} from "../../services/staff/profileService";
import { useNavigate } from "react-router-dom";

/* ================= COMPONENT ================= */

const StaffProfile = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const unsub = listenToStaffProfile((d: any) => {
      setData(d);
    });

    return () => unsub && unsub();
  }, []);

  const logout = async () => {
    await auth.signOut();
    localStorage.clear();
    navigate("/auth/login");
  };

  /* 🔥 EDIT */
  const editField = async (
    title: string,
    field: string,
    value: string
  ) => {
    const newVal = prompt(`Edit ${title}`, value);
    if (!newVal || newVal.trim() === "") return;

    await updateStaffField(field, newVal.trim());
  };

  if (!data) {
    return <p className="text-white p-10">Loading...</p>;
  }

  const profile = data.profile || {};

  const name = data.name || "Staff";
  const email = data.email || "--";

  const department = profile.department || "--";
  const designation = profile.designation || "--";
  const contact = profile.contactNumber || "--";

  return (
    <div className="max-w-screen-xl mx-auto space-y-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold">Profile</h1>

      {/* PROFILE CARD */}
      <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">

        <div className="w-14 h-14 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-400 font-bold text-xl">
          {name[0]}
        </div>

        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-white/60">{email}</p>
        </div>

      </div>

      {/* WORK INFO */}
      <div>
        <p className="text-xs text-white/50 mb-3">
          WORK INFORMATION
        </p>

        <Tile
          title="Department"
          value={department}
          onClick={() =>
            editField("Department", "department", department)
          }
        />

        <Tile
          title="Designation"
          value={designation}
          onClick={() =>
            editField("Designation", "designation", designation)
          }
        />

        <Tile
          title="Contact"
          value={contact}
          onClick={() =>
            editField("Contact", "contactNumber", contact)
          }
        />
      </div>

      {/* LOGOUT */}
      <div className="pt-10">
        <button
          onClick={logout}
          className="w-full py-3 rounded-xl border border-red-400 text-red-400 hover:bg-red-400/10"
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default StaffProfile;

/* ================= TILE ================= */

const Tile = ({
  title,
  value,
  onClick,
}: {
  title: string;
  value: string;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="p-4 mb-3 rounded-xl bg-white/5 border border-white/10 flex justify-between cursor-pointer hover:bg-white/10"
    >
      <span className="text-white/60">{title}</span>

      <div className="flex items-center gap-2">
        <span>{value}</span>
        <span className="text-white/40 text-sm">✏️</span>
      </div>
    </div>
  );
};