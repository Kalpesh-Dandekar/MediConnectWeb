"use client";

import { useState } from "react";
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react";

type Appointment = {
  time: string;
  name: string;
  age: string;
  doctor: string;
  dept: string;
  status: string;
};

const StaffAppointments = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const appointments: Appointment[] = [
    {
      time: "09:30 AM",
      name: "Rahul Sharma",
      age: "34",
      doctor: "Dr. Michael Smith",
      dept: "Gastroenterology",
      status: "Waiting",
    },
    {
      time: "10:00 AM",
      name: "Priya Mehta",
      age: "29",
      doctor: "Dr. Anita Sharma",
      dept: "General Medicine",
      status: "Completed",
    },
    {
      time: "10:30 AM",
      name: "Amit Verma",
      age: "42",
      doctor: "Dr. Michael Smith",
      dept: "Gastroenterology",
      status: "Cancelled",
    },
  ];

  const filteredAppointments =
    selectedFilter === "All"
      ? appointments
      : appointments.filter((a) => a.status === selectedFilter);

  const waitingCount = appointments.filter(
    (a) => a.status === "Waiting"
  ).length;

  const completedCount = appointments.filter(
    (a) => a.status === "Completed"
  ).length;

  const cancelledCount = appointments.filter(
    (a) => a.status === "Cancelled"
  ).length;

  return (
    <div className="w-full space-y-6">

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Today's Appointments</h1>
          <p className="text-white/60 text-sm mt-1">
            {appointments.length} scheduled today
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-white/50">
          <Calendar size={14} />
          Live Schedule
        </div>
      </div>

      {/* ===== SUMMARY ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          label="Waiting"
          count={waitingCount}
          icon={Clock}
          color="orange"
        />
        <SummaryCard
          label="Completed"
          count={completedCount}
          icon={CheckCircle}
          color="green"
        />
        <SummaryCard
          label="Cancelled"
          count={cancelledCount}
          icon={XCircle}
          color="red"
        />
      </div>

      {/* ===== FILTERS ===== */}
      <div className="flex flex-wrap gap-3">
        {["All", "Waiting", "Completed", "Cancelled"].map((item) => (
          <button
            key={item}
            onClick={() => setSelectedFilter(item)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedFilter === item
                ? "bg-blue-500 text-white"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-[#14283C] rounded-xl overflow-hidden border border-white/5">

        <table className="w-full text-left">

          {/* HEADER */}
          <thead className="bg-white/5 text-white/60 text-sm">
            <tr>
              <th className="p-4">Time</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th className="text-right pr-6">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {filteredAppointments.map((a, i) => (
              <tr
                key={i}
                className="border-t border-white/5 hover:bg-white/5 transition"
              >
                {/* TIME */}
                <td className="p-4">
                  <span className="px-3 py-1 bg-white/5 rounded-lg text-sm">
                    {a.time}
                  </span>
                </td>

                {/* PATIENT */}
                <td>
                  <div className="font-medium">
                    {a.name}
                  </div>
                  <div className="text-xs text-white/50">
                    Age: {a.age}
                  </div>
                </td>

                {/* DOCTOR */}
                <td className="text-white/80">{a.doctor}</td>

                {/* DEPT */}
                <td className="text-white/60">{a.dept}</td>

                {/* STATUS */}
                <td>
                  <StatusBadge status={a.status} />
                </td>

                {/* ACTION */}
                <td className="text-right pr-6">
                  <button className="px-4 py-1.5 bg-blue-500 rounded-lg text-sm hover:bg-blue-600 transition">
                    Open
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

export default StaffAppointments;

/* ===== STATUS BADGE ===== */

const StatusBadge = ({ status }: { status: string }) => {
  let color = "";

  if (status === "Completed") color = "bg-green-500/20 text-green-400";
  else if (status === "Cancelled") color = "bg-red-500/20 text-red-400";
  else color = "bg-orange-500/20 text-orange-400";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
      {status}
    </span>
  );
};

/* ===== SUMMARY CARD ===== */

const SummaryCard = ({
  label,
  count,
  icon: Icon,
  color,
}: {
  label: string;
  count: number;
  icon: any;
  color: "orange" | "green" | "red";
}) => {
  const styles: any = {
    orange: "text-orange-400 bg-orange-500/10",
    green: "text-green-400 bg-green-500/10",
    red: "text-red-400 bg-red-500/10",
  };

  return (
    <div className="p-5 rounded-xl bg-[#14283C] flex items-center justify-between">
      <div>
        <p className="text-sm text-white/70">{label}</p>
        <h2 className={`text-2xl font-bold mt-1 ${styles[color]}`}>
          {count}
        </h2>
      </div>

      <div className="p-3 bg-white/5 rounded-lg">
        <Icon size={18} className={styles[color].split(" ")[0]} />
      </div>
    </div>
  );
};