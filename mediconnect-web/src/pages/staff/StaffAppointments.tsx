"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  listenToAppointments,
  updateAppointmentStatus,
} from "../../services/staff/appointmentService";

/* ================= TYPES ================= */

type Appointment = {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  department: string;
  time: string;
  status: string;
};

/* ================= COMPONENT ================= */

const StaffAppointments = () => {
  const [list, setList] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = listenToAppointments((data: Appointment[]) => {
      setList(data);
      setLoading(false);
    });

    return () => unsub && unsub();
  }, []);

  if (loading) return <p className="text-white p-10">Loading...</p>;

  return (
    <div className="max-w-screen-xl mx-auto">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <p className="text-white/60 text-sm">
          Manage and update appointments
        </p>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {list.map((a) => (
          <Card key={a.id} appointment={a} />
        ))}
      </div>

    </div>
  );
};

export default StaffAppointments;

/* ================= CARD ================= */

const Card = ({ appointment }: { appointment: Appointment }) => {
  const navigate = useNavigate();

  const normalize = (raw: string) => {
    const s = raw?.toLowerCase();
    if (s === "completed") return "Completed";
    if (s === "cancelled") return "Cancelled";
    return "Waiting";
  };

  const flow = ["Waiting", "Completed", "Cancelled"];

  const [status, setStatus] = useState(normalize(appointment.status));

  const cycleStatus = async () => {
    const i = flow.indexOf(status);
    const next = flow[(i + 1) % flow.length];

    setStatus(next);

    await updateAppointmentStatus(appointment.id, next);
  };

  const getColor = () => {
    if (status === "Completed") return "text-green-400 bg-green-400/10";
    if (status === "Cancelled") return "text-red-400 bg-red-400/10";
    return "text-orange-400 bg-orange-400/10";
  };

  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">

      {/* TIME */}
      <div className="px-3 py-1 bg-white/10 rounded text-xs text-white/70">
        {appointment.time || "--"}
      </div>

      {/* INFO */}
      <div className="flex-1">
        <p className="text-white font-semibold">
          {appointment.patientName || "Unknown"}
        </p>
        <p className="text-xs text-white/50">
          {appointment.doctorName || ""}
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col items-end gap-2">

        {/* STATUS */}
        <button
          onClick={cycleStatus}
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getColor()}`}
        >
          {status}
        </button>

        {/* UPLOAD */}
        <button
          onClick={() =>
            navigate("/staff/reports", {
              state: {
                patientId: appointment.patientId,
                patientName: appointment.patientName,
              },
            })
          }
          className="px-3 py-1 text-xs rounded bg-gradient-to-r from-[#FF9F1C] to-[#FFB703] text-black font-semibold"
        >
          Upload
        </button>

      </div>

    </div>
  );
};