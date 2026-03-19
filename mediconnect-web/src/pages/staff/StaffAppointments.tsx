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

  const waitingCount = appointments.filter((a) => a.status === "Waiting").length;
  const completedCount = appointments.filter((a) => a.status === "Completed").length;
  const cancelledCount = appointments.filter((a) => a.status === "Cancelled").length;

  return (
    <div className="w-full max-w-screen-xl mx-auto space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Today's Appointments</h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            {appointments.length} scheduled today
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-white/50">
          <Calendar size={14} />
          Live Schedule
        </div>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <SummaryCard label="Waiting" count={waitingCount} icon={Clock} color="orange" />
        <SummaryCard label="Completed" count={completedCount} icon={CheckCircle} color="green" />
        <SummaryCard label="Cancelled" count={cancelledCount} icon={XCircle} color="red" />
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {["All", "Waiting", "Completed", "Cancelled"].map((item) => (
          <button
            key={item}
            onClick={() => setSelectedFilter(item)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition ${
              selectedFilter === item
                ? "bg-blue-500 text-white"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* MOBILE CARDS */}
      <div className="space-y-3 sm:hidden">
        {filteredAppointments.map((a, i) => (
          <div key={i} className="bg-[#14283C] p-4 rounded-xl border border-white/5">

            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">{a.name}</span>
              <StatusBadge status={a.status} />
            </div>

            <p className="text-xs text-white/60">Age: {a.age}</p>
            <p className="text-xs text-white/60 mt-1">{a.doctor}</p>
            <p className="text-xs text-white/50">{a.dept}</p>

            <div className="flex justify-between items-center mt-3">
              <span className="text-xs bg-white/5 px-2 py-1 rounded">
                {a.time}
              </span>

              <button className="px-3 py-1 text-xs bg-blue-500 rounded-lg">
                Open
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden sm:block bg-[#14283C] rounded-xl overflow-hidden border border-white/5">
        <table className="w-full text-left">

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

          <tbody>
            {filteredAppointments.map((a, i) => (
              <tr key={i} className="border-t border-white/5 hover:bg-white/5">
                <td className="p-4">{a.time}</td>
                <td>{a.name}</td>
                <td>{a.doctor}</td>
                <td>{a.dept}</td>
                <td><StatusBadge status={a.status} /></td>
                <td className="text-right pr-6">
                  <button className="px-4 py-1.5 bg-blue-500 rounded-lg text-sm">
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
    <span className={`px-2 py-1 rounded-full text-[10px] sm:text-xs ${color}`}>
      {status}
    </span>
  );
};

/* ===== SUMMARY CARD ===== */

const SummaryCard = ({ label, count, icon: Icon, color }: any) => {
  const styles: any = {
    orange: "text-orange-400",
    green: "text-green-400",
    red: "text-red-400",
  };

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-[#14283C] flex items-center justify-between">
      <div>
        <p className="text-xs sm:text-sm text-white/70">{label}</p>
        <h2 className={`text-xl sm:text-2xl font-bold mt-1 ${styles[color]}`}>
          {count}
        </h2>
      </div>

      <div className="p-2 sm:p-3 bg-white/5 rounded-lg">
        <Icon size={16} className={styles[color]} />
      </div>
    </div>
  );
};