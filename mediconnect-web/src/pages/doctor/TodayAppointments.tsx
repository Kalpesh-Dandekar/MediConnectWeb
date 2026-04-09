"use client";

import { useEffect, useState } from "react";
import {
  listenToTodayAppointments,
  startConsultation,
  completeConsultation,
} from "../../services/doctor/appointmentService";

/* ================= TYPES ================= */

type Appointment = {
  id: string;
  token: string;
  name: string;
  age: string;
  time: string;
  reason: string;
  status: "Waiting" | "In Consultation" | "Completed";
};

/* ================= COMPONENT ================= */

const TodayAppointments = () => {
  const [selectedFilter, setSelectedFilter] = useState<
    "Waiting" | "In Consultation" | "Completed"
  >("Waiting");

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= REALTIME ================= */

  useEffect(() => {
    const unsub = listenToTodayAppointments((snapshot: any) => {
      const data: Appointment[] = snapshot.docs.map((doc: any) => {
        const d = doc.data();

        return {
          id: doc.id,
          token: d.token?.toString() || "",
          name: d.patientName || "Patient",
          age: d.age?.toString() || "--",
          time: d.timeSlot || "--",
          reason: d.reason || "General Checkup",
          status: d.status || "Waiting",
        };
      });

      setAppointments(data);
      setLoading(false);
    });

    return () => {
      if (unsub) unsub();
    };
  }, []);

  /* ================= FILTER ================= */

  const filtered = appointments.filter(
    (a) => a.status === selectedFilter
  );

  const countByStatus = (status: string) =>
    appointments.filter((a) => a.status === status).length;

  /* ================= STYLES ================= */

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

  /* ================= ACTION ================= */

  const handleAction = async (item: Appointment) => {
    try {
      if (item.status === "Waiting") {
        await startConsultation(item.id);
      } else if (item.status === "In Consultation") {
        await completeConsultation(item.id);
      }
    } catch (err) {
      console.error("Action error:", err);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="w-full max-w-screen-xl mx-auto space-y-6 sm:space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">
          Today's Appointments
        </h1>
        <p className="text-white/60 text-xs sm:text-sm mt-1">
          {filtered.length} {selectedFilter} patients
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {["Waiting", "In Consultation", "Completed"].map((f) => (
          <button
            key={f}
            onClick={() => setSelectedFilter(f as any)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm transition ${
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
      <div className="space-y-3 sm:space-y-4">

        {loading ? (
          <div className="p-4 rounded-xl bg-[#14283C] text-white/60 text-sm">
            Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-4 rounded-xl bg-[#14283C] text-white/60 text-sm">
            No patients in {selectedFilter}
          </div>
        ) : (
          filtered.map((item) => {
            const style = getStyles(item.status);

            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-5 rounded-2xl 
                           bg-[#14283C] border border-white/5 
                           hover:scale-[1.01] hover:shadow-lg transition-all duration-300"
              >

                {/* LEFT */}
                <div className="flex items-center gap-3 sm:gap-4">

                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full font-bold text-black text-xs sm:text-sm ${style.dot}`}
                  >
                    {item.token}
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-sm sm:text-base truncate">
                      {item.name} ({item.age})
                    </p>
                    <p className="text-xs sm:text-sm text-white/60 truncate">
                      {item.reason}
                    </p>
                    <p className="text-[10px] sm:text-xs text-white/40">
                      {item.time}
                    </p>
                  </div>

                </div>

                {/* RIGHT */}
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">

                  <span className={`px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded-full ${style.badge}`}>
                    {item.status}
                  </span>

                  <button
                    onClick={() => handleAction(item)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition ${style.btn}`}
                  >
                    {item.status === "Completed"
                      ? "Done"
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">

        <Summary label="Waiting" count={countByStatus("Waiting")} color="text-orange-400" />
        <Summary label="In Progress" count={countByStatus("In Consultation")} color="text-blue-400" />
        <Summary label="Completed" count={countByStatus("Completed")} color="text-green-400" />

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
    <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-[#14283C] to-[#1a3654] border border-white/5 text-center hover:scale-[1.02] transition">
      <p className={`text-2xl sm:text-3xl font-bold ${color}`}>
        {count}
      </p>
      <p className="text-[10px] sm:text-xs text-white/60 mt-1">
        {label}
      </p>
    </div>
  );
};