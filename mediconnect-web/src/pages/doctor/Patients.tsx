"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Patient = {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  diagnosis: string;
  status: "Active" | "Follow-up";
  visitedToday: boolean;
};

const Patients = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<
    "All" | "Active" | "Follow-up"
  >("All");

  const patients: Patient[] = [
    {
      id: "P-1021",
      name: "Rahul Sharma",
      age: 34,
      lastVisit: "24 Mar 2025",
      diagnosis: "Gastritis",
      status: "Active",
      visitedToday: false,
    },
    {
      id: "P-1044",
      name: "Priya Mehta",
      age: 29,
      lastVisit: "18 Mar 2025",
      diagnosis: "Vitamin D Deficiency",
      status: "Follow-up",
      visitedToday: true,
    },
  ];

  const filteredPatients = patients.filter((p) => {
    const matchFilter =
      selectedFilter === "All" || p.status === selectedFilter;

    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0C1B2A] text-white p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Patients</h1>
        <p className="text-gray-400 text-sm mt-1">
          {patients.length} registered patients
        </p>
      </div>

      {/* SEARCH */}
      <div className="mb-5">
        <input
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none"
        />
      </div>

      {/* FILTER */}
      <div className="flex gap-3 mb-6">
        {["All", "Active", "Follow-up"].map((f) => (
          <button
            key={f}
            onClick={() => setSelectedFilter(f as any)}
            className={`px-4 py-2 rounded-xl text-sm transition ${
              selectedFilter === f
                ? "bg-teal-400/20 text-teal-300"
                : "text-gray-400 hover:bg-white/5"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {filteredPatients.map((p, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >

            {/* TOP */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                {/* AVATAR */}
                <div className="w-10 h-10 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-300 font-bold">
                  {p.name[0]}
                </div>

                {/* INFO */}
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-xs text-gray-400">
                    {p.id} • Age: {p.age}
                  </p>
                </div>
              </div>

              {/* STATUS */}
              <span className="px-3 py-1 rounded-full text-xs bg-teal-400/20 text-teal-300">
                {p.status}
              </span>
            </div>

            {/* DETAILS */}
            <div className="mt-3 text-sm text-gray-300">
              <p>Diagnosis: {p.diagnosis}</p>
              <p className="text-gray-500 text-xs mt-1">
                Last Visit: {p.lastVisit}
              </p>
            </div>

            {/* BUTTON */}
            <button
              onClick={() =>
                navigate("/doctor/consultation", {
                  state: {
                    patientId: p.id,
                    patientName: p.name,
                  },
                })
              }
              className="mt-4 w-full py-2 rounded-lg bg-teal-400 text-black font-semibold hover:scale-[1.02] transition"
            >
              {p.visitedToday
                ? "Continue Consultation"
                : "Start Consultation"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patients;