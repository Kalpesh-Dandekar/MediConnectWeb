"use client";

import { useEffect, useState } from "react";
import {
  listenToPatientReports,
} from "../../services/relative/reportService";
import { getLinkedPatient } from "../../services/relative/dashboardService";

/* ================= TYPES ================= */

type Report = {
  id: string;
  testName: string;
  status: "pending" | "available";
  givenOn?: string;
  expectedOn?: string;
  labName?: string;
  uploadedOn?: string;
  doctorName?: string;
  resultStatus?: string;
};

/* ================= COMPONENT ================= */

const RelativeReports = () => {
  const [patient, setPatient] = useState<any>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const p = await getLinkedPatient();

    if (!p) {
      setLoading(false);
      return;
    }

    setPatient(p);

    const unsub = listenToPatientReports(p.id, (list: any[]) => {
      setReports(list);
      setLoading(false);
    });

    return () => unsub && unsub();
  };

  /* FILTER */

  const pending = reports.filter((r) => r.status === "pending");
  const available = reports.filter((r) => r.status === "available");

  if (loading) return <p className="text-white p-10">Loading...</p>;

  return (
    <div className="max-w-screen-xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-white/60">
          Monitoring: {patient?.name || "Patient"}
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-4">
        <Summary label="Total" value={reports.length} />
        <Summary label="Pending" value={pending.length} />
        <Summary label="Available" value={available.length} />
      </div>

      {/* PENDING */}
      <Section title="Pending Reports">
        {pending.length === 0
          ? <Empty text="No pending reports" />
          : pending.map((r) => (
              <PendingCard key={r.id} {...r} />
            ))}
      </Section>

      {/* AVAILABLE */}
      <Section title="Available Reports">
        {available.length === 0
          ? <Empty text="No reports available" />
          : available.map((r) => (
              <AvailableCard key={r.id} {...r} />
            ))}
      </Section>

    </div>
  );
};

export default RelativeReports;

/* ================= COMPONENTS ================= */

const Summary = ({ label, value }: any) => (
  <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
    <p className="text-xl font-semibold text-white">{value}</p>
    <p className="text-xs text-white/50">{label}</p>
  </div>
);

const Section = ({ title, children }: any) => (
  <div>
    <p className="text-xs text-white/50 uppercase mb-3">{title}</p>
    <div className="space-y-3">{children}</div>
  </div>
);

const Empty = ({ text }: any) => (
  <p className="text-white/40 text-sm">{text}</p>
);

/* ================= PENDING CARD ================= */

const PendingCard = ({
  testName,
  givenOn,
  expectedOn,
  labName,
  status,
}: Report) => (
  <div className="p-4 bg-white/5 rounded-xl border border-white/10">

    <div className="flex justify-between">
      <p className="text-white font-medium">{testName}</p>
      <span className="text-orange-400 text-xs">{status}</span>
    </div>

    <p className="text-xs text-white/60 mt-2">
      Given: {givenOn || "--"}
    </p>
    <p className="text-xs text-white/60">
      Expected: {expectedOn || "--"}
    </p>
    <p className="text-xs text-white/40">
      Lab: {labName || "--"}
    </p>

  </div>
);

/* ================= AVAILABLE CARD ================= */

const AvailableCard = ({
  testName,
  uploadedOn,
  doctorName,
  resultStatus,
  labName,
}: Report) => {
  const color =
    resultStatus === "Normal"
      ? "text-green-400"
      : "text-red-400";

  return (
    <div className="p-4 bg-white/5 rounded-xl border border-white/10">

      <div className="flex justify-between">
        <p className="text-white font-medium">{testName}</p>
        <span className={color}>●</span>
      </div>

      <p className="text-xs text-white/60 mt-2">
        Uploaded: {uploadedOn || "--"}
      </p>

      <p className="text-xs text-white/60">
        Doctor: {doctorName || "--"}
      </p>

      <p className={`text-xs mt-2 font-semibold ${color}`}>
        Result: {resultStatus || "--"}
      </p>

      <p className="text-xs text-white/40 mt-1">
        Lab: {labName || "--"}
      </p>

      <button className="mt-3 w-full py-2 rounded bg-orange-400 text-black text-sm">
        View Summary
      </button>

    </div>
  );
};