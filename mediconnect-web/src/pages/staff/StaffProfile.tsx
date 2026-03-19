"use client";

import { useNavigate } from "react-router-dom";
import { User, Mail, Building2, Clock, Shield } from "lucide-react";

const StaffProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  return (
    <div className="w-full space-y-8">

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Profile</h1>

        <div className="hidden md:flex items-center gap-2 text-xs text-white/50">
          <Shield size={14} />
          Secure Account
        </div>
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ===== LEFT PROFILE CARD ===== */}
        <div className="bg-[#14283C] rounded-2xl p-8 flex flex-col items-center text-center shadow-md">

          {/* AVATAR */}
          <div className="h-24 w-24 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-2xl font-bold">
            ST
          </div>

          {/* INFO */}
          <h2 className="mt-5 text-xl font-semibold">
            Anjali Deshmukh
          </h2>

          <span className="mt-2 px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">
            Staff Member
          </span>

          <p className="mt-2 text-sm text-white/60">
            Employee ID: ST-2045
          </p>

        </div>

        {/* ===== RIGHT CONTENT ===== */}
        <div className="xl:col-span-2 space-y-6">

          {/* WORK INFO */}
          <div>
            <SectionTitle title="Work Information" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">

              <InfoCard
                label="Department"
                value="Front Desk Administration"
                icon={Building2}
              />

              <InfoCard
                label="Hospital"
                value="City Care Hospital"
                icon={User}
              />

              <InfoCard
                label="Shift Timing"
                value="9:00 AM - 6:00 PM"
                icon={Clock}
              />

              <InfoCard
                label="Email"
                value="staff@mediconnect.com"
                icon={Mail}
              />

            </div>
          </div>

          {/* ACCOUNT */}
          <div>
            <SectionTitle title="Account" />

            <div className="space-y-3 mt-4">

              <ActionCard label="Change Password" />

              <ActionCard
                label="Logout"
                danger
                onClick={handleLogout}
              />

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default StaffProfile;

/* ===== SECTION TITLE ===== */

const SectionTitle = ({ title }: { title: string }) => (
  <p className="text-xs tracking-widest text-white/50 uppercase">
    {title}
  </p>
);

/* ===== INFO CARD ===== */

const InfoCard = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: any;
}) => {
  return (
    <div className="bg-[#14283C] p-5 rounded-xl flex items-center gap-4 hover:bg-[#1b3550] transition">
      <div className="p-3 bg-white/5 rounded-lg">
        <Icon size={18} className="text-blue-400" />
      </div>

      <div>
        <p className="text-xs text-white/50">{label}</p>
        <p className="text-sm font-medium mt-1">{value}</p>
      </div>
    </div>
  );
};

/* ===== ACTION CARD ===== */

const ActionCard = ({
  label,
  onClick,
  danger,
}: {
  label: string;
  onClick?: () => void;
  danger?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#14283C] transition ${
        danger
          ? "text-red-400 hover:bg-red-500/10"
          : "text-white/80 hover:bg-white/5"
      }`}
    >
      <span className="text-sm font-medium">{label}</span>
      <span className="text-white/30">→</span>
    </button>
  );
};