"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  listenToDoctorProfile,
  updateDoctorField,
} from "../../services/doctor/profileService";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const unsub = listenToDoctorProfile((profile: any) => {
      setData(profile || {});
    });

    return () => unsub && unsub();
  }, []);

  const handleEdit = async (field: string, value: string) => {
    const newValue = prompt(`Edit ${field}`, value || "");
    if (newValue !== null) {
      await updateDoctorField(field, newValue);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  const name = data?.name || "Doctor";
  const experience = data?.experience || "-";
  const department = data?.department || "General";

  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">Doctor Profile</h1>

      <Tile title="Name" value={name} onClick={() => handleEdit("name", name)} />
      <Tile title="Experience" value={experience} onClick={() => handleEdit("experience", experience)} />
      <Tile title="Department" value={department} onClick={() => handleEdit("department", department)} />

      <button onClick={handleLogout} className="mt-6 text-red-500">
        Logout
      </button>

    </div>
  );
};

export default DoctorProfile;

/* COMPONENT */

const Tile = ({ title, value, onClick }: any) => (
  <div
    onClick={onClick}
    className="flex justify-between p-4 bg-white/5 rounded-xl mb-3 cursor-pointer"
  >
    <span>{title}</span>
    <span>{value || "-"} ✏️</span>
  </div>
);