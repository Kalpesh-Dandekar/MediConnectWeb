"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStaffDashboardData } from "../../services/staff/dashboardService";

/* ================= COMPONENT ================= */

const StaffDashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getStaffDashboardData();
    setData(res);
  };

  if (!data) {
    return <p className="text-white p-10">Loading...</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto space-y-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold">Staff Dashboard</h1>

      {/* 🔥 STATS (MATCH FLUTTER) */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex justify-between">

        <Stat value={data.appointments} label="Appointments" />
        <Stat value={data.pendingReports} label="Pending" />
        <Stat value={data.completedReports} label="Completed" />

      </div>

      {/* 🚨 EMERGENCY */}
      <div
        onClick={() => navigate("/staff/emergency")}
        className="p-5 rounded-xl border border-red-400/30 bg-red-500/10 flex items-center gap-3 cursor-pointer"
      >
        <span className="text-red-400 text-xl">⚠️</span>

        <p className="font-semibold">
          {data.emergencies} Active Emergency Alerts
        </p>
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <p className="text-xs text-white/50 mb-3">
          QUICK ACTIONS
        </p>

        <div className="space-y-3">

          <Action
            label="Add New Report"
            onClick={() => navigate("/staff/reports")}
          />

          <Action
            label="View Appointments"
            onClick={() => navigate("/staff/appointments")}
          />

          <Action
            label="Emergency Panel"
            onClick={() => navigate("/staff/emergency")}
          />

        </div>
      </div>

    </div>
  );
};

export default StaffDashboard;

/* ================= COMPONENTS ================= */

const Stat = ({ value, label }: any) => (
  <div className="text-center">
    <p className="text-xl font-bold">{value}</p>
    <p className="text-xs text-white/60">{label}</p>
  </div>
);

const Action = ({ label, onClick }: any) => (
  <div
    onClick={onClick}
    className="p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10"
  >
    {label}
  </div>
);