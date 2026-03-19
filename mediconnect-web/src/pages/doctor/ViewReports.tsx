"use client";

import { useLocation } from "react-router-dom";

type Report = {
  id: string;
  testName: string;
  date: string;
  status: "Normal" | "Critical";
};

const ViewReports = () => {
  const { state } = useLocation();
  const patientName = state?.patientName || "Patient";

  // 🔥 Dummy Data (replace later with API)
  const reports: Report[] = [
    {
      id: "R1",
      testName: "Blood Test",
      date: "24 Mar 2025",
      status: "Normal",
    },
    {
      id: "R2",
      testName: "MRI Scan",
      date: "20 Mar 2025",
      status: "Critical",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0C1B2A] text-white p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {patientName}
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Patient Reports & Records
        </p>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between"
          >
            {/* LEFT */}
            <div>
              <p className="font-semibold">
                {report.testName}
              </p>
              <p className="text-xs text-gray-400">
                {report.date}
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">

              {/* STATUS DOT */}
              <span
                className={`h-2 w-2 rounded-full ${
                  report.status === "Normal"
                    ? "bg-green-400"
                    : "bg-red-400"
                }`}
              />

              <span
                className={`text-xs ${
                  report.status === "Normal"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {report.status}
              </span>

              {/* ACTION */}
              <button
                className="px-3 py-1 text-sm bg-teal-400 text-black rounded-lg font-semibold"
                onClick={() => alert("Open Report (Dummy)")}
              >
                View
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {reports.length === 0 && (
        <div className="text-center mt-20 text-gray-500">
          No reports available
        </div>
      )}
    </div>
  );
};

export default ViewReports;