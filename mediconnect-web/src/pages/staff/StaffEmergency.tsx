"use client";

import { useEffect, useState } from "react";
import {
  listenToEmergencies,
  updateEmergencyStatus,
} from "../../services/staff/emergencyService";

/* ================= TYPES ================= */

type Emergency = {
  id: string;
  type?: string;
  patientId?: string;
  message?: string;
  status?: string;
};

/* ================= COMPONENT ================= */

const StaffEmergency = () => {
  const [list, setList] = useState<Emergency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = listenToEmergencies((data: Emergency[]) => {
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
        <h1 className="text-2xl font-bold">Emergency</h1>
        <p className="text-white/60 text-sm">
          Handle urgent patient alerts
        </p>
      </div>

      {/* EMPTY */}
      {list.length === 0 && (
        <p className="text-white/50 text-center mt-10">
          No emergencies
        </p>
      )}

      {/* LIST */}
      <div className="space-y-4">
        {list.map((e) => (
          <Card key={e.id} {...e} />
        ))}
      </div>

    </div>
  );
};

export default StaffEmergency;

/* ================= CARD ================= */

const Card = ({
  id,
  type,
  patientId,
  message,
  status = "pending",
}: Emergency) => {
  const done = status.toLowerCase() === "completed";

  const getColor = () => {
    if (done) return "text-green-400 bg-green-400/10";
    return "text-orange-400 bg-orange-400/10";
  };

  const handleClick = async () => {
    if (done) return;

    await updateEmergencyStatus(id, "completed");
  };

  return (
    <div className="p-4 rounded-xl bg-white/5 border border-red-400/30 flex gap-3">

      {/* ICON */}
      <div className="p-3 bg-red-400/10 rounded-lg">
        <span className="text-red-400 text-lg">⚠️</span>
      </div>

      {/* DETAILS */}
      <div className="flex-1">

        <p className="text-white font-semibold">
          {type || "Emergency"}
        </p>

        <p className="text-xs text-white/60 mt-1">
          Patient: {patientId || "--"}
        </p>

        {message && (
          <p className="text-xs text-white/50 mt-1">
            {message}
          </p>
        )}

      </div>

      {/* STATUS */}
      <button
        onClick={handleClick}
        className={`px-3 py-1 text-xs rounded-full font-semibold ${getColor()}`}
      >
        {done ? "Completed" : "Pending"}
      </button>

    </div>
  );
};