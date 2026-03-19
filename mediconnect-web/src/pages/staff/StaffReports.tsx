"use client";

import { FileText, CheckCircle } from "lucide-react";

type Report = {
  patient: string;
  reportType: string;
  collectedDate: string;
  status: "Pending" | "Uploaded";
};

const StaffReports = () => {
  const reports: Report[] = [
    {
      patient: "Rahul Sharma",
      reportType: "Complete Blood Count (CBC)",
      collectedDate: "22 Mar 2025",
      status: "Pending",
    },
    {
      patient: "Amit Verma",
      reportType: "Liver Function Test",
      collectedDate: "23 Mar 2025",
      status: "Pending",
    },
    {
      patient: "Priya Mehta",
      reportType: "Vitamin D Test",
      collectedDate: "18 Mar 2025",
      status: "Uploaded",
    },
  ];

  const pending = reports.filter((r) => r.status === "Pending");
  const uploaded = reports.filter((r) => r.status === "Uploaded");

  return (
    <div className="w-full space-y-8">

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Report Management</h1>
          <p className="text-white/60 text-sm mt-1">
            Manage lab report processing
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-white/50">
          <FileText size={14} />
          Lab System
        </div>
      </div>

      {/* ===== SUMMARY ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <SummaryCard
          label="Pending"
          count={pending.length}
          icon={FileText}
          color="orange"
        />
        <SummaryCard
          label="Uploaded"
          count={uploaded.length}
          icon={CheckCircle}
          color="green"
        />
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* ===== PENDING ===== */}
        <div>
          <SectionTitle title="Pending Reports" />

          <div className="space-y-4 mt-4">
            {pending.map((r, i) => (
              <ReportCard key={i} {...r} />
            ))}
          </div>
        </div>

        {/* ===== UPLOADED ===== */}
        <div>
          <SectionTitle title="Uploaded Reports" />

          <div className="space-y-4 mt-4">
            {uploaded.map((r, i) => (
              <ReportCard key={i} {...r} />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default StaffReports;

/* ===== SECTION TITLE ===== */

const SectionTitle = ({ title }: { title: string }) => (
  <p className="text-xs tracking-widest text-white/50 uppercase">
    {title}
  </p>
);

/* ===== SUMMARY CARD ===== */

const SummaryCard = ({
  label,
  count,
  icon: Icon,
  color,
}: {
  label: string;
  count: number;
  icon: any;
  color: "orange" | "green";
}) => {
  const styles: any = {
    orange: "text-orange-400 bg-orange-500/10",
    green: "text-green-400 bg-green-500/10",
  };

  return (
    <div className="p-6 bg-[#14283C] rounded-xl flex items-center justify-between">
      <div>
        <p className="text-sm text-white/70">{label}</p>
        <h2 className={`text-3xl font-bold mt-1 ${styles[color].split(" ")[0]}`}>
          {count}
        </h2>
      </div>

      <div className="p-3 bg-white/5 rounded-lg">
        <Icon size={18} className={styles[color].split(" ")[0]} />
      </div>
    </div>
  );
};

/* ===== REPORT CARD ===== */

const ReportCard = ({
  patient,
  reportType,
  collectedDate,
  status,
}: Report) => {
  const isPending = status === "Pending";

  const statusColor = isPending
    ? "text-orange-400 bg-orange-500/10"
    : "text-green-400 bg-green-500/10";

  return (
    <div className="flex rounded-xl bg-[#14283C] overflow-hidden hover:bg-[#1b3550] transition">

      {/* LEFT STRIP */}
      <div
        className={`w-1.5 ${
          isPending ? "bg-orange-400" : "bg-green-400"
        }`}
      />

      {/* CONTENT */}
      <div className="p-5 flex-1">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{patient}</h3>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
          >
            {status}
          </span>
        </div>

        {/* DETAILS */}
        <div className="mt-3 text-sm text-white/70">
          {reportType}
        </div>

        <div className="text-xs text-white/50 mt-1">
          Collected: {collectedDate}
        </div>

        {/* ACTION */}
        <div className="flex justify-end mt-4">
          <button
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
              isPending
                ? "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
            }`}
          >
            {isPending ? "Upload Result" : "View Details"}
          </button>
        </div>

      </div>
    </div>
  );
};