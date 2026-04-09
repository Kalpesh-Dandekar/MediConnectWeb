"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import {
  getLinkedPatient,
  getRelativeDashboard,
} from "../../services/relative/dashboardService";
import { connectToPatient } from "../../services/relative/linkService";
import { listenToNotifications } from "../../services/relative/notificationService";

const RelativeDashboard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [linked, setLinked] = useState(false);
  const [patient, setPatient] = useState<any>(null);
  const [code, setCode] = useState("");

  const [alerts, setAlerts] = useState<any[]>([]);

  const [data, setData] = useState({
    taken: 0,
    total: 0,
    nextDose: "--",
    nextVisitDate: "--",
    nextVisitDoctor: "",
    reportStatus: "--",
  });

  /* ================= INIT ================= */

  useEffect(() => {
    init();

    const unsub = listenToNotifications((data: any[]) => {
      setAlerts(data);
    });

    return () => unsub && unsub();
  }, []);

  const init = async () => {
    setLoading(true);

    try {
      const p = await getLinkedPatient();

      if (p) {
        setLinked(true);
        setPatient(p);

        const dash = await getRelativeDashboard(p.id);
        setData(dash);
      } else {
        setLinked(false);
      }
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };

  /* ================= CONNECT ================= */

  const handleConnect = async () => {
    const user = auth.currentUser;
    if (!user) return;

    if (!code.trim()) return alert("Enter code");

    try {
      await connectToPatient(code.trim(), user.uid);
      setCode("");
      await init();
    } catch (e: any) {
      alert(e.message);
    }
  };

  /* ================= UI ================= */

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Care Overview</h1>
        <p className="text-white/60">
          {linked
            ? `Monitoring: ${patient.name}`
            : "No patient connected"}
        </p>
      </div>

      {/* 🔥 ALERT (NEW) */}
      {alerts.length > 0 && (
        <div
          onClick={() => navigate("/relative/notifications")}
          className="cursor-pointer p-4 rounded-xl bg-red-500/10 border border-red-400/40 flex items-center gap-3 hover:bg-red-500/20 transition"
        >
          <span className="text-red-400 text-lg">⚠️</span>

          <div className="flex-1 text-sm text-white">
            {alerts.some((a) => a.type === "emergency")
              ? "🚨 Emergency alert received!"
              : `You have ${alerts.length} alerts`}
          </div>

          <span className="text-white/50 text-xs">→</span>
        </div>
      )}

      {/* CONNECT */}
      {!linked && (
        <div className="p-4 bg-white/5 rounded-xl border border-white/10">

          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            className="w-full p-3 bg-black/20 rounded text-white outline-none"
          />

          <button
            onClick={handleConnect}
            className="mt-3 w-full py-3 rounded-xl bg-gradient-to-r from-[#FF9F1C] to-[#FFB703] text-black font-semibold"
          >
            Connect
          </button>

        </div>
      )}

      {/* DASHBOARD */}
      {linked && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <Card title="Medication" value={`${data.taken} / ${data.total}`} />
          <Card title="Next Dose" value={data.nextDose} />
          <Card title="Next Visit" value={data.nextVisitDate} />
          <Card title="Reports" value={data.reportStatus} />

        </div>
      )}

    </div>
  );
};

export default RelativeDashboard;

/* ================= CARD ================= */

const Card = ({ title, value }: { title: string; value: string }) => (
  <div className="p-4 bg-white/5 rounded-xl border border-white/10">

    <p className="text-xl font-semibold text-white">
      {value}
    </p>

    <p className="text-gray-400 text-sm mt-1">
      {title}
    </p>

  </div>
);