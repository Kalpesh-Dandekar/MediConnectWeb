"use client";

import {
  Pill,
  Clock,
  Calendar,
  FileText,
  AlertTriangle,
} from "lucide-react";

const RelativeDashboard = () => {
  const cards = [
    {
      icon: Pill,
      title: "Medication",
      value: "2 / 3",
      subtitle: "Taken Today",
    },
    {
      icon: Clock,
      title: "Next Dose",
      value: "8:00 PM",
      subtitle: "Pantoprazole",
    },
    {
      icon: Calendar,
      title: "Next Visit",
      value: "12 Apr",
      subtitle: "Dr. Smith",
    },
    {
      icon: FileText,
      title: "Reports",
      value: "1 Pending",
      subtitle: "Lab Processing",
    },
  ];

  return (
    <div className="w-full space-y-10">

      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-3xl font-bold">Care Overview</h1>
        <p className="text-sm text-white/60 mt-1">
          Monitoring: Rahul Sharma
        </p>
      </div>

      {/* ===== STATS GRID ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#14283C] to-[#1a3654] border border-white/5 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
            >
              {/* ICON */}
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-500/10 mb-6">
                <Icon size={18} className="text-purple-400" />
              </div>

              {/* CONTENT */}
              <h2 className="text-2xl font-bold">{item.value}</h2>

              <p className="text-xs text-white/70 mt-1">
                {item.title}
              </p>

              <p className="text-xs text-white/50">
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="grid grid-cols-12 gap-6">

        {/* LEFT */}
        <div className="col-span-12 xl:col-span-8 space-y-6">

          {/* ALERT */}
          <div>
            <p className="text-xs tracking-widest text-white/50 mb-3">
              ALERTS
            </p>

            <div className="p-6 rounded-2xl border border-orange-400/30 bg-gradient-to-r from-orange-500/10 to-orange-400/5 flex items-start gap-4 hover:shadow-lg transition">
              
              <div className="p-2 rounded-lg bg-orange-500/20">
                <AlertTriangle className="text-orange-400" size={18} />
              </div>

              <div className="text-sm text-orange-300 leading-relaxed">
                1 dose was missed yesterday.
                <br />
                Please check medication adherence.
              </div>
            </div>
          </div>

          {/* ADHERENCE */}
          <div>
            <p className="text-xs tracking-widest text-white/50 mb-3">
              WEEKLY ADHERENCE
            </p>

            <div className="p-6 rounded-2xl bg-[#14283C] border border-white/5">

              <div className="flex justify-between items-center">
                <p className="text-sm text-white/70">
                  Adherence Rate
                </p>
                <span className="text-sm text-purple-400 font-semibold">
                  75%
                </span>
              </div>

              {/* PROGRESS */}
              <div className="mt-4 w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: "75%" }}
                />
              </div>

              <p className="text-xs text-white/50 mt-3">
                75% adherence this week
              </p>

            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="col-span-12 xl:col-span-4 space-y-6">

          {/* QUICK INFO */}
          <div className="p-6 rounded-2xl bg-[#14283C] border border-white/5">
            <p className="text-xs tracking-widest text-white/50 mb-5">
              QUICK INFO
            </p>

            <div className="space-y-4 text-sm">

              <InfoRow label="Patient" value="Rahul Sharma" />
              <InfoRow label="Doctor" value="Dr. Smith" />
              <InfoRow label="Condition" value="Stable" highlight />

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default RelativeDashboard;

/* ===== INFO ROW ===== */

const InfoRow = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-white/60">{label}</span>
      <span className={highlight ? "text-green-400 font-medium" : ""}>
        {value}
      </span>
    </div>
  );
};