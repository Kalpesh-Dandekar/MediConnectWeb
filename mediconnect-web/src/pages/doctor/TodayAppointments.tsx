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

  const getStyles = (status: string) => {
    if (status === "Waiting")
      return {
        dot: "bg-orange-400",
        badge: "bg-orange-500/10 text-orange-400",
        btn: "bg-orange-500/20 text-orange-300 hover:bg-orange-500/30",
      };
    if (status === "In Consultation")
      return {
        dot: "bg-blue-400",
        badge: "bg-blue-500/10 text-blue-400",
        btn: "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30",
      };
    return {
      dot: "bg-green-400",
      badge: "bg-green-500/10 text-green-400",
      btn: "bg-green-500/20 text-green-300 hover:bg-green-500/30",
    };
  };

  return (
    <div className="w-full space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Today's Appointments
        </h1>
        <p className="text-white/60 text-sm mt-1">
          {filtered.length} {selectedFilter} patients
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-3">
        {["Waiting", "In Consultation", "Completed"].map((f) => (
          <button
            key={f}
            onClick={() => setSelectedFilter(f as any)}
            className={`px-4 py-2 rounded-xl text-sm transition ${
              selectedFilter === f
                ? "bg-white/10 text-white"
                : "text-white/60 hover:bg-white/5"
            }`}
          >
            {f} ({countByStatus(f)})
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="space-y-4">

        {filtered.length === 0 ? (
          <div className="p-6 rounded-xl bg-[#14283C] text-white/60">
            No patients in {selectedFilter}
          </div>
        ) : (
          filtered.map((item, i) => {
            const style = getStyles(item.status);

            return (
              <div
                key={i}
                className="flex items-center justify-between p-5 rounded-2xl 
                           bg-[#14283C] border border-white/5 
                           hover:scale-[1.01] hover:shadow-lg transition-all duration-300"
              >

                {/* LEFT */}
                <div className="flex items-center gap-4">

                  {/* TOKEN */}
                  <div
                    className={`w-11 h-11 flex items-center justify-center rounded-full font-bold text-black ${style.dot}`}
                  >
                    {item.token}
                  </div>

                  {/* INFO */}
                  <div>
                    <p className="font-semibold">
                      {item.name} ({item.age})
                    </p>
                    <p className="text-sm text-white/60">
                      {item.reason}
                    </p>
                    <p className="text-xs text-white/40">
                      {item.time}
                    </p>
                  </div>

                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">

                  {/* STATUS BADGE */}
                  <span className={`px-3 py-1 text-xs rounded-full ${style.badge}`}>
                    {item.status}
                  </span>

                  {/* ACTION */}
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${style.btn}`}
                  >
                    {item.status === "Completed"
                      ? "View"
                      : item.status === "In Consultation"
                      ? "Continue"
                      : "Start"}
                  </button>

                </div>

              </div>
            );
          })
        )}
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-6">

        <Summary
          label="Waiting"
          count={countByStatus("Waiting")}
          color="text-orange-400"
        />

        <Summary
          label="In Progress"
          count={countByStatus("In Consultation")}
          color="text-blue-400"
        />

        <Summary
          label="Completed"
          count={countByStatus("Completed")}
          color="text-green-400"
        />

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
    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#14283C] to-[#1a3654] border border-white/5 text-center hover:scale-[1.02] transition">
      <p className={`text-3xl font-bold ${color}`}>{count}</p>
      <p className="text-xs text-white/60 mt-1">{label}</p>
    </div>
  );
};