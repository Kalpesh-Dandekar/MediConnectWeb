"use client";

import { useState } from "react";

type Appointment = {
  token: string;
  name: string;
  age: string;
  time: string;
  reason: string;
  status: "Waiting" | "In Consultation" | "Completed";
};

const TodayAppointments = () => {
  const [selectedFilter, setSelectedFilter] = useState<
    "Waiting" | "In Consultation" | "Completed"
  >("Waiting");

  const appointments: Appointment[] = [
    {
      token: "12",
      name: "Rahul Sharma",
      age: "34",
      time: "10:30 AM",
      reason: "Gastric Pain",
      status: "Waiting",
    },
    {
      token: "13",
      name: "Priya Mehta",
      age: "29",
      time: "10:45 AM",
      reason: "Follow-up Visit",
      status: "Completed",
    },
  ];

  const filtered = appointments.filter(
    (a) => a.status === selectedFilter
  );

  const countByStatus = (status: string) =>
    appointments.filter((a) => a.status === status).length;

  const getColor = (status: string) => {
    if (status === "Waiting") return "bg-orange-400";
    if (status === "In Consultation") return "bg-blue-400";
    return "bg-green-400";
  };

  return (
    <div className="min-h-screen bg-[#0C1B2A] text-white">

      <div className="px-8 py-6 max-w-[1200px] mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Today's Appointments
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {filtered.length} {selectedFilter} patients
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex gap-3 mb-6">
          {["Waiting", "In Consultation", "Completed"].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f as any)}
              className={`px-4 py-2 rounded-xl text-sm transition ${
                selectedFilter === f
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5"
              }`}
            >
              {f} ({countByStatus(f)})
            </button>
          ))}
        </div>

        {/* LIST */}
        <div className="space-y-4">

          {filtered.length === 0 ? (
            <p className="text-gray-400">
              No patients in {selectedFilter}
            </p>
          ) : (
            filtered.map((item, i) => (
              <div
                key={i}
                className="flex items-center bg-white/5 rounded-xl overflow-hidden border border-white/10"
              >

                {/* STATUS STRIP */}
                <div
                  className={`w-1 h-full ${getColor(item.status)}`}
                />

                {/* CONTENT */}
                <div className="flex items-center justify-between w-full p-4">

                  {/* LEFT */}
                  <div className="flex items-center gap-4">

                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-black font-bold ${getColor(
                        item.status
                      )}`}
                    >
                      {item.token}
                    </div>

                    <div>
                      <p className="font-semibold">
                        {item.name} ({item.age})
                      </p>
                      <p className="text-sm text-gray-400">
                        {item.reason}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.time}
                      </p>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <button
                    className={`px-4 py-2 rounded-lg text-black text-sm font-semibold ${getColor(
                      item.status
                    )}`}
                  >
                    {item.status === "Completed"
                      ? "View"
                      : item.status === "In Consultation"
                      ? "Continue"
                      : "Start"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* SUMMARY */}
        <div className="mt-10 flex justify-around bg-white/5 p-4 rounded-xl border border-white/10">
          <Summary label="Waiting" count={countByStatus("Waiting")} color="text-orange-400" />
          <Summary label="In Progress" count={countByStatus("In Consultation")} color="text-blue-400" />
          <Summary label="Completed" count={countByStatus("Completed")} color="text-green-400" />
        </div>

      </div>
    </div>
  );
};

export default TodayAppointments;

/* ================= SUMMARY ================= */

const Summary = ({
  label,
  count,
  color,
}: {
  label: string;
  count: number;
  color: string;
}) => {
  return (
    <div className="text-center">
      <p className={`font-bold ${color}`}>{count}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  );
};