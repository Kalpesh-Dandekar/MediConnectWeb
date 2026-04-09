"use client";

import { useEffect, useState } from "react";
import {
  listenToActiveEmergencies,
  acceptEmergency,
  completeEmergency,
} from "../../services/doctor/emergencyService";

/* ================= COMPONENT ================= */

const Emergencies = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const unsub = listenToActiveEmergencies((list: any[]) => {
      setData(list);
    });

    return () => unsub && unsub();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">
        🚨 Emergency Panel
      </h1>

      {data.length === 0 ? (
        <p className="text-gray-400">No active emergencies</p>
      ) : (
        data.map((e) => (
          <EmergencyCard key={e.id} {...e} />
        ))
      )}

    </div>
  );
};

export default Emergencies;

/* ================= CARD ================= */

const EmergencyCard = (e: any) => {
  const isAccepted = e.status === "accepted";
  const isCompleted = e.status === "completed";

  const getColor = () => {
    if (e.type === "ambulance") return "text-red-400";
    if (e.type === "doctor") return "text-teal-400";
    if (e.type === "caregiver") return "text-orange-400";
    return "text-gray-400";
  };

  const getTitle = () => {
    if (e.type === "ambulance") return "Ambulance Request";
    if (e.type === "doctor") return "Doctor Assistance";
    if (e.type === "caregiver") return "Caregiver Alert";
    return "Emergency";
  };

  const formatTime = () => {
    if (!e.createdAt) return "--";
    const d = e.createdAt.toDate();
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-5 mb-4 bg-white/5 border border-white/10 rounded-2xl">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <p className="font-semibold">{getTitle()}</p>
        <span className={`text-xs ${getColor()}`}>
          {e.type?.toUpperCase()}
        </span>
      </div>

      {/* INFO */}
      <p className="mt-2">Patient: {e.patientName || "Unknown"}</p>

      <p className="text-sm text-gray-400 mt-1">
        Time: {formatTime()}
      </p>

      {/* STATUS */}
      <p className="text-xs mt-2 text-orange-400">
        {e.status?.toUpperCase()}
      </p>

      {/* BUTTONS */}
      <div className="mt-4">

        {!isAccepted && !isCompleted && (
          <button
            onClick={() => acceptEmergency(e.id)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF9F1C] to-[#FFB703] text-black font-semibold"
          >
            Accept Emergency
          </button>
        )}

        {isAccepted && !isCompleted && (
          <button
            onClick={() => completeEmergency(e.id)}
            className="w-full py-3 rounded-xl bg-green-400 text-black font-semibold"
          >
            Mark Completed
          </button>
        )}

        {isCompleted && (
          <p className="text-green-400 text-center font-semibold">
            COMPLETED
          </p>
        )}

      </div>

    </div>
  );
};