"use client";

import { FileText, Clock, CheckCircle } from "lucide-react";

type Report = {
  title: string;
  date: string;
  status: "Pending" | "Uploaded";
};

const RelativeReports = () => {
  const reports: Report[] = [
    {
      title: "Liver Function Test",
      date: "Collected: 22 Mar 2025",
      status: "Pending",
    },
    {
      title: "Complete Blood Count (CBC)",
      date: "Uploaded: 18 Mar 2025",
      status: "Uploaded",
    },
  ];

  const pending = reports.filter((r) => r.status === "Pending");
  const uploaded = reports.filter((r) => r.status === "Uploaded");

  return (
    <div className="w-full space-y-10">

      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-sm text-white/60 mt-1">
          Monitoring: Rahul Sharma
        </p>
      </div>

      {/* ===== SUMMARY ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <SummaryCard label="Total" value="6" icon={FileText} color="blue" />
        <SummaryCard label="Pending" value="2" icon={Clock} color="orange" />
        <SummaryCard label="Available" value="4" icon={CheckCircle} color="green" />
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="grid grid-cols-12 gap-6">

        {/* ===== LEFT ===== */}
        <div className="col-span-12 xl:col-span-6">
          <SectionTitle title="Pending Reports" />

          <div className="space-y-4 mt-4">
            {pending.map((r, i) => (
              <ReportCard key={i} {...r} />
            ))}
          </div>
        </div>

        {/* ===== RIGHT ===== */}
        <div className="col-span-12 xl:col-span-6">
          <SectionTitle title="Available Reports" />

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

export default RelativeReports;

/* ===== SUMMARY CARD ===== */

const SummaryCard = ({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  icon: any;
  color: "blue" | "orange" | "green";
}) => {
  const styles: any = {
    blue: "text-blue-400 bg-blue-500/10",
    orange: "text-orange-400 bg-orange-500/10",
    green: "text-green-400 bg-green-500/10",
  };

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#14283C] to-[#1a3654] border border-white/5 shadow-lg hover:scale-[1.02] transition">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm text-white/70">{label}</p>
          <h2 className={`text-3xl font-bold mt-2 ${styles[color].split(" ")[0]}`}>
            {value}
          </h2>
        </div>

        <div className="p-3 bg-white/5 rounded-lg">
          <Icon size={18} className={styles[color].split(" ")[0]} />
        </div>

      </div>

    </div>
  );
};

/* ===== SECTION TITLE ===== */

const SectionTitle = ({ title }: { title: string }) => (
  <p className="text-xs tracking-widest text-white/50 uppercase">
    {title}
  </p>
);

/* ===== REPORT CARD ===== */

const ReportCard = ({
  title,
  date,
  status,
}: Report) => {
  const isUploaded = status === "Uploaded";

  const statusColor = isUploaded
    ? "text-green-400 bg-green-500/10"
    : "text-orange-400 bg-orange-500/10";

  return (
    <div className="p-5 rounded-2xl bg-[#14283C] border border-white/5 hover:scale-[1.01] hover:shadow-lg transition-all duration-300">

      <div className="flex items-center gap-4">

        {/* ICON */}
        <div className="p-3 bg-white/5 rounded-lg">
          <FileText size={16} className="text-purple-400" />
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          <p className="font-semibold">{title}</p>
          <p className="text-xs text-white/50 mt-1">{date}</p>
        </div>

        {/* ACTION */}
        {isUploaded ? (
          <button className="px-4 py-1.5 text-sm rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition">
            View
          </button>
        ) : (
          <span className={`px-3 py-1 text-xs rounded-full font-medium ${statusColor}`}>
            Pending
          </span>
        )}

      </div>

    </div>
  );
};