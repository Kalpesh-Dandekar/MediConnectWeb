"use client";

import { useEffect, useState } from "react";
import * as ReportService from "../../services/patient/reportService";

/* ================= COMPONENT ================= */

const Reports = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = ReportService.listenToPatientReports((snapshot: any) => {
      const data = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReports(data);
      setLoading(false);
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  const pending = reports.filter((r) => r.status === "pending");
  const available = reports.filter((r) => r.status === "available");

  return (
    <div className="w-full max-w-screen-xl mx-auto">

      {/* HEADER */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold">Reports</h1>
        <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm">
          Clinical records & lab results overview
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <SummaryCard label="Total" value={reports.length} />
        <SummaryCard label="Pending" value={pending.length} />
        <SummaryCard label="Available" value={available.length} />
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading reports...</p>
      ) : (
        <>
          <Section title="PENDING REPORTS">
            {pending.length === 0
              ? <Empty text="No pending reports" />
              : pending.map((r) => <Pending key={r.id} {...r} />)}
          </Section>

          <Section title="AVAILABLE REPORTS">
            {available.length === 0
              ? <Empty text="No reports available" />
              : available.map((r) => <Available key={r.id} {...r} />)}
          </Section>
        </>
      )}

    </div>
  );
};

export default Reports;

/* ================= UI ================= */

const SummaryCard = ({ label, value }: any) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <p className="text-xl font-semibold">{value}</p>
    <p className="text-xs text-gray-400 mt-1">{label}</p>
  </div>
);

const Section = ({ title, children }: any) => (
  <div className="mb-8">
    <p className="text-xs tracking-widest text-gray-500 mb-4">{title}</p>
    <div className="space-y-4">{children}</div>
  </div>
);

const Empty = ({ text }: any) => (
  <p className="text-gray-500 text-sm">{text}</p>
);

const Pending = ({ testName, givenOn, expectedOn, labName }: any) => (
  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
    <p className="font-semibold">{testName}</p>
    <p className="text-sm text-gray-400">Given: {givenOn}</p>
    <p className="text-sm text-gray-400">Expected: {expectedOn}</p>
    <p className="text-xs text-gray-500 mt-1">Lab: {labName}</p>
  </div>
);

const Available = ({ testName, uploadedOn, doctorName, resultStatus }: any) => (
  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
    <p className="font-semibold">{testName}</p>
    <p className="text-sm text-gray-400">Uploaded: {uploadedOn}</p>
    <p className="text-sm text-gray-400">Doctor: {doctorName}</p>
    <p className="text-sm mt-1">{resultStatus}</p>
  </div>
);