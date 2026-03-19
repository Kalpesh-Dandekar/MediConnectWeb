"use client";

import {
  Activity,
  Calendar,
  FileText,
  Users,
  AlertTriangle,
} from "lucide-react";

const StaffDashboard = () => {
  const stats = [
    { value: "18", label: "Appointments", icon: Calendar },
    { value: "5", label: "Pending Reports", icon: FileText },
    { value: "12", label: "Reports Uploaded", icon: Activity },
  ];

  const activities = [
    {
      text: "CBC Report uploaded for Rahul Sharma",
      time: "10 min ago",
    },
    {
      text: "Appointment completed - Dr. Mehta",
      time: "30 min ago",
    },
    {
      text: "Emergency triggered (Room 204)",
      time: "1 hr ago",
    },
  ];

  return (
    <div className="w-full space-y-8">

      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Staff Dashboard</h1>
          <p className="text-sm text-white/60 mt-1">
            Hospital Operations Control
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-white/50">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          Live System
        </div>
      </div>

      {/* ===== SYSTEM STATUS ===== */}
      <div className="flex items-center justify-between p-5 rounded-xl border border-white/5 bg-gradient-to-r from-[#13273B] to-[#142F4D]">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-green-400 rounded-full"></span>
          <span className="font-semibold">System Operational</span>
        </div>
        <span className="text-xs text-white/50">
          Last sync: 2 mins ago
        </span>
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="grid grid-cols-12 gap-6">

        {/* ===== LEFT (MAIN AREA) ===== */}
        <div className="col-span-12 xl:col-span-9 space-y-6">

          {/* ===== STATS ===== */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#14283C] to-[#16324F] w-full">
            <p className="text-xs tracking-widest text-white/60">
              TODAY'S OPERATIONS
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 w-full">
              {stats.map((item, i) => {
                const Icon = item.icon;

                return (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="mb-3 p-3 rounded-lg bg-white/5">
                      <Icon size={18} className="text-blue-400" />
                    </div>

                    <h2 className="text-3xl font-bold">
                      {item.value}
                    </h2>

                    <p className="text-xs text-white/70 mt-1">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ===== QUICK ACTIONS ===== */}
          <div>
            <p className="text-xs tracking-widest text-white/50 mb-4">
              QUICK ACTIONS
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <ActionCard label="Add New Report" icon={FileText} />
              <ActionCard label="View Schedule" icon={Calendar} />
              <ActionCard label="Manage Patients" icon={Users} />
            </div>
          </div>

        </div>

        {/* ===== RIGHT PANEL ===== */}
        <div className="col-span-12 xl:col-span-3 space-y-6">

          {/* ===== EMERGENCY ===== */}
          <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/10 flex items-center gap-4">
            <AlertTriangle className="text-red-400" />
            <div className="flex-1 font-semibold">
              2 Active Emergency Alerts
            </div>
            <div className="text-white/40 text-sm">→</div>
          </div>

          {/* ===== ACTIVITY ===== */}
          <div className="p-5 rounded-xl bg-[#14283C]">
            <p className="text-xs tracking-widest text-white/50 mb-4">
              RECENT ACTIVITY
            </p>

            <div className="space-y-4">
              {activities.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>

                  <span className="flex-1 text-sm">
                    {item.text}
                  </span>

                  <span className="text-xs text-white/50">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default StaffDashboard;

/* ===== ACTION CARD ===== */

const ActionCard = ({
  label,
  icon: Icon,
}: {
  label: string;
  icon: any;
}) => {
  return (
    <div className="p-4 rounded-xl bg-[#14283C] hover:bg-[#1b3550] transition cursor-pointer flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <Icon size={16} className="text-blue-400" />
        <span className="text-sm font-medium">{label}</span>
      </div>

      <span className="text-white/30">→</span>
    </div>
  );
};