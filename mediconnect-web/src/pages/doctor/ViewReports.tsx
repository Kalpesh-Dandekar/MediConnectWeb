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
    <div className="w-full max-w-screen-xl mx-auto">

      {/* HEADER */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold">
          {patientName}
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          Patient Reports & Records
        </p>
      </div>

      {/* LIST */}
      <div className="space-y-3 sm:space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >

            {/* LEFT */}
            <div className="min-w-0">
              <p className="font-semibold text-sm sm:text-base truncate">
                {report.testName}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400">
                {report.date}
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center justify-between sm:justify-end gap-3">

              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    report.status === "Normal"
                      ? "bg-green-400"
                      : "bg-red-400"
                  }`}
                />

                <span
                  className={`text-[10px] sm:text-xs ${
                    report.status === "Normal"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {report.status}
                </span>
              </div>

              {/* ACTION */}
              <button
                className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-teal-400 text-black rounded-lg font-semibold"
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
        <div className="text-center mt-16 sm:mt-20 text-gray-500 text-sm">
          No reports available
        </div>
      )}

    </div>
  );
};

export default ViewReports;