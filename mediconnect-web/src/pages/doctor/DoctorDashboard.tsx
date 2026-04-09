"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDoctorDashboardData,
  listenToNextPatients,
} from "../../services/doctor/dashboardService";

/* ================= COMPONENT ================= */

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    total: 0,
    waiting: 0,
    done: 0,
    emergency: 0,
  });

  const [patients, setPatients] = useState<any[]>([]);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    loadDashboard();

    const unsub = listenToNextPatients((list: any[]) => {
      setPatients(list);
    });

    return () => unsub && unsub();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDoctorDashboardData();
      setData(res);
    } catch (err) {
      console.error(err);
    }
  };

  const greeting = getGreeting();

  /* ================= UI ================= */

  return (
    <div className="w-full max-w-screen-xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          {greeting}, Doctor 👋
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {new Date().toDateString()}
        </p>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card value={data.total} label="Appointments" />
        <Card value={data.waiting} label="Waiting" />
        <Card value={data.done} label="Completed" />

        {/* 🔥 CLICKABLE EMERGENCY */}
        <Card
          value={data.emergency}
          label="Emergency"
          alert
          onClick={() => navigate("/doctor/emergency")}
        />
      </div>

      {/* ACTIONS */}
      <div className="mb-8 space-y-3">

        <button
          onClick={() => {
            if (!patients.length) return alert("No patient");
            navigate("/doctor/consultation", {
              state: {
                patientId: patients[0]?.patientId,
                patientName: patients[0]?.patientName,
                appointmentId: patients[0]?.id,
              },
            });
          }}
          className="w-full p-4 rounded-xl bg-teal-400 text-black font-semibold"
        >
          ▶ Start Consultation
        </button>

        <button
          onClick={() => navigate("/doctor/view-reports")}
          className="w-full p-4 rounded-xl bg-white/5 border border-white/10"
        >
          📄 Review Reports
        </button>

      </div>

      {/* PATIENT LIST */}
      <div>
        <p className="text-xs text-gray-500 mb-3">NEXT PATIENTS</p>

        {patients.length === 0 ? (
          <p className="text-gray-400">No patients</p>
        ) : (
          patients.map((p, i) => (
            <PatientCard key={i} {...p} />
          ))
        )}
      </div>

    </div>
  );
};

export default DoctorDashboard;

/* ================= HELPERS ================= */

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

/* ================= COMPONENTS ================= */

const Card = ({ value, label, alert, onClick }: any) => (
  <div
    onClick={onClick}
    className={`p-4 rounded-xl bg-white/5 border ${
      alert ? "border-red-400/30 cursor-pointer hover:scale-[1.03]" : "border-white/10"
    } transition`}
  >
    <p className="text-xl font-semibold">{value}</p>
    <p className="text-gray-400 text-sm">{label}</p>
  </div>
);

const PatientCard = (p: any) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 mb-3 bg-white/5 rounded-xl border border-white/10">

      <p className="font-semibold">{p.patientName}</p>
      <p className="text-sm text-gray-400">{p.department}</p>

      <button
        onClick={() =>
          navigate("/doctor/consultation", {
            state: {
              patientId: p.patientId,
              patientName: p.patientName,
              appointmentId: p.id,
            },
          })
        }
        className="mt-2 text-teal-400 text-sm"
      >
        Start →
      </button>

    </div>
  );
};