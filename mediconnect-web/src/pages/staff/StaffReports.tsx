"use client";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  listenToReports,
  uploadReport,
} from "../../services/staff/reportService";

/* ================= TYPES ================= */

type Report = {
  id: string;
  patientId: string;
  testName: string;
  givenOn: string;
  status: string;
};

/* ================= COMPONENT ================= */

const StaffReports = () => {
  const location = useLocation();

  const [list, setList] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  /* FORM */
  const [patientId, setPatientId] = useState(
    location.state?.patientId || ""
  );
  const [testName, setTestName] = useState("");
  const [labName, setLabName] = useState("");
  const [summary, setSummary] = useState("");

  /* INIT */
  useEffect(() => {
    const unsub = listenToReports((data: Report[]) => {
      setList(data);
      setLoading(false);
    });

    return () => unsub && unsub();
  }, []);

  /* UPLOAD */
  const handleUpload = async () => {
    if (!patientId || !testName || !summary) {
      return alert("Fill all required fields");
    }

    await uploadReport({
      patientId,
      testName,
      labName,
      resultSummary: summary,
    });

    alert("Report Uploaded ✅");

    setTestName("");
    setLabName("");
    setSummary("");
  };

  const pending = list.filter((r) => r.status !== "completed");
  const uploaded = list.filter((r) => r.status === "completed");

  if (loading) return <p className="text-white p-10">Loading...</p>;

  return (
    <div className="max-w-screen-xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Report Management</h1>
        <p className="text-white/60 text-sm">
          Upload and manage reports
        </p>
      </div>

      {/* 🔥 UPLOAD FORM */}
      <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">

        <input
          placeholder="Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="w-full p-3 bg-black/20 rounded text-white"
        />

        <input
          placeholder="Test Name"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          className="w-full p-3 bg-black/20 rounded text-white"
        />

        <input
          placeholder="Lab Name"
          value={labName}
          onChange={(e) => setLabName(e.target.value)}
          className="w-full p-3 bg-black/20 rounded text-white"
        />

        <textarea
          placeholder="Result Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full p-3 bg-black/20 rounded text-white"
        />

        <button
          onClick={handleUpload}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF9F1C] to-[#FFB703] text-black font-semibold"
        >
          Upload Report
        </button>

      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 gap-4">
        <Summary label="Pending" value={pending.length} />
        <Summary label="Uploaded" value={uploaded.length} />
      </div>

      {/* LIST */}
      <div className="space-y-3">

        {list.map((r) => (
          <Card key={r.id} {...r} />
        ))}

      </div>

    </div>
  );
};

export default StaffReports;

/* ================= CARD ================= */

const Card = ({ testName, givenOn, status }: any) => {
  const done = status === "completed";

  return (
    <div className="p-4 bg-white/5 rounded-xl border border-white/10">

      <div className="flex justify-between">
        <p className="text-white">{testName}</p>
        <span className={done ? "text-green-400" : "text-orange-400"}>
          {done ? "Uploaded" : "Pending"}
        </span>
      </div>

      <p className="text-xs text-white/50 mt-1">
        {givenOn || "--"}
      </p>

    </div>
  );
};

/* ================= SUMMARY ================= */

const Summary = ({ label, value }: any) => (
  <div className="p-4 bg-white/5 rounded-xl text-center">
    <p className="text-xl text-white font-semibold">{value}</p>
    <p className="text-xs text-white/50">{label}</p>
  </div>
);