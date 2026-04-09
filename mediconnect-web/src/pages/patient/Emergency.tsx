"use client";

import { useState } from "react";
import { createEmergency } from "../../services/patient/emergencyService";

const Emergency = () => {

  const [loadingType, setLoadingType] = useState<string | null>(null);

  const handleEmergency = async (type: string, msg: string) => {
    try {
      if (loadingType) return;

      setLoadingType(type);

      console.log("🚨 Triggering emergency:", type);

      await createEmergency(type);

      alert(msg);

    } catch (err: any) {
      console.error("❌ Emergency Failed:", err);
      alert(err.message || "Failed to send emergency");
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

      {/* HEADER */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-white">
        Emergency Assistance
      </h1>
      <p className="text-gray-400 mt-2 text-sm">
        Immediate help & urgent medical support
      </p>

      {/* 🔴 CRITICAL */}
      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#8B1E1E] to-[#5C1212] shadow-lg">

        <div className="flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <h2 className="text-lg font-semibold text-white">
            Critical Emergency
          </h2>
        </div>

        <p className="text-white/70 mt-3 text-sm">
          For severe symptoms, accidents, chest pain or breathing difficulty.
        </p>

        <button
          onClick={() => handleEmergency("ambulance", "Ambulance requested 🚑")}
          className="mt-5 w-full py-3 rounded-xl bg-red-500 text-white font-semibold"
        >
          {loadingType === "ambulance" ? "Sending..." : "CALL AMBULANCE (108)"}
        </button>

      </div>

      {/* 🩺 DOCTOR */}
      <div className="mt-6 p-6 rounded-2xl bg-white/5 border border-white/10">

        <h2 className="text-white font-semibold">
          Connect to Available Doctor
        </h2>

        <p className="text-gray-400 text-sm mt-2">
          Doctors Online: 3 • Avg wait time: 2 mins
        </p>

        <button
          onClick={() => handleEmergency("doctor", "Doctor request sent 👨‍⚕️")}
          className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-[#FF9F1C] to-[#FFB703] text-black font-semibold"
        >
          {loadingType === "doctor" ? "Connecting..." : "CONNECT NOW"}
        </button>

      </div>

      {/* CONTACTS */}
      <div className="mt-8">
        <p className="text-xs tracking-widest text-gray-500 mb-4">
          EMERGENCY CONTACTS
        </p>

        <Contact title="City Care Hospital" sub="2.3 km away" />
        <Contact title="Primary Doctor" sub="Dr. Smith" />
        <Contact title="Emergency Contact" sub="Relative" />
      </div>

      {/* CAREGIVER */}
      <button
        onClick={() => handleEmergency("caregiver", "Caregiver alerted 👨‍👩‍👧")}
        className="mt-8 w-full py-3 rounded-xl border border-white/10 text-teal-400"
      >
        {loadingType === "caregiver" ? "Sending..." : "Alert Caregiver"}
      </button>

    </div>
  );
};

export default Emergency;

/* ================= CONTACT ================= */

const Contact = ({ title, sub }: any) => {
  return (
    <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
      <div>
        <p className="text-white font-medium">{title}</p>
        <p className="text-gray-400 text-sm">{sub}</p>
      </div>
      <span className="text-teal-400">📞</span>
    </div>
  );
};