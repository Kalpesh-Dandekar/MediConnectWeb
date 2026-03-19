"use client";

import { useState } from "react";
import { Users, Search } from "lucide-react";

type Patient = {
  id: string;
  name: string;
  age: string;
  phone: string;
  dept: string;
  status: string;
};

const StaffPatients = () => {
  const [search, setSearch] = useState("");

  const patients: Patient[] = [
    {
      id: "P-1021",
      name: "Rahul Sharma",
      age: "34",
      phone: "9876543210",
      dept: "Gastroenterology",
      status: "Active",
    },
    {
      id: "P-1044",
      name: "Priya Mehta",
      age: "29",
      phone: "9988776655",
      dept: "General Medicine",
      status: "Follow-up",
    },
    {
      id: "P-1088",
      name: "Amit Verma",
      age: "42",
      phone: "9123456780",
      dept: "Orthopedics",
      status: "Inactive",
    },
  ];

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full space-y-6">

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Patient Records</h1>
          <p className="text-white/60 text-sm mt-1">
            {patients.length} registered patients
          </p>
        </div>

        <button className="bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium flex items-center gap-2">
          <Users size={16} />
          Add Patient
        </button>
      </div>

      {/* ===== SEARCH ===== */}
      <div className="w-full max-w-xl bg-white/5 rounded-xl px-4 py-3 flex items-center gap-3 border border-white/5 focus-within:border-blue-500/50 transition">
        <Search size={16} className="text-white/50" />
        <input
          type="text"
          placeholder="Search by name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none text-white w-full text-sm placeholder:text-white/40"
        />
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-[#14283C] rounded-xl overflow-hidden border border-white/5">

        <table className="w-full text-left">

          {/* HEADER */}
          <thead className="bg-white/5 text-white/60 text-sm">
            <tr>
              <th className="p-4">Patient</th>
              <th>ID</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Status</th>
              <th className="text-right pr-6">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {filteredPatients.map((p, i) => (
              <tr
                key={i}
                className="border-t border-white/5 hover:bg-white/5 transition"
              >
                {/* PATIENT */}
                <td className="p-4">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-white/50">
                    Age: {p.age}
                  </div>
                </td>

                {/* ID */}
                <td className="text-white/70">{p.id}</td>

                {/* PHONE */}
                <td className="text-white/70">{p.phone}</td>

                {/* DEPT */}
                <td className="text-white/60">{p.dept}</td>

                {/* STATUS */}
                <td>
                  <StatusBadge status={p.status} />
                </td>

                {/* ACTIONS */}
                <td className="text-right pr-6 space-x-2">
                  <button className="px-3 py-1 text-sm text-white/60 hover:text-white transition">
                    Edit
                  </button>

                  <button className="px-4 py-1.5 bg-blue-500 rounded-lg text-sm hover:bg-blue-600 transition">
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default StaffPatients;

/* ===== STATUS BADGE ===== */

const StatusBadge = ({ status }: { status: string }) => {
  let style = "";

  if (status === "Active")
    style = "bg-teal-500/20 text-teal-400";
  else if (status === "Follow-up")
    style = "bg-orange-500/20 text-orange-400";
  else
    style = "bg-gray-500/20 text-gray-400";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${style}`}>
      {status}
    </span>
  );
};