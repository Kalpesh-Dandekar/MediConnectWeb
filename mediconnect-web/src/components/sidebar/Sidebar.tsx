"use client";

import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  Users,
  User,
  Pill,
  LogOut,
  AlertTriangle,
} from "lucide-react";

type MenuItem = {
  label: string;
  icon: any;
  path: string;
  danger?: boolean;
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* ================= ROLE FIX ================= */

  const rawRole = localStorage.getItem("role");
  let role = rawRole?.trim().toLowerCase() || "patient";

  if (role === "caregiver") role = "relative";

  /* ================= MENUS ================= */

  const patientMenu: MenuItem[] = [
    { label: "Home", icon: LayoutDashboard, path: "/patient/dashboard" },
    { label: "Appointments", icon: CalendarDays, path: "/patient/appointments" },
    { label: "Emergency", icon: AlertTriangle, path: "/patient/emergency", danger: true },
    { label: "Medicines", icon: Pill, path: "/patient/medicines" },
    { label: "Reports", icon: FileText, path: "/patient/reports" },
  ];

  const doctorMenu: MenuItem[] = [
    { label: "Home", icon: LayoutDashboard, path: "/doctor/dashboard" },
    { label: "Appointments", icon: CalendarDays, path: "/doctor/appointments" },
    { label: "Patients", icon: Users, path: "/doctor/patients" },
    { label: "Profile", icon: User, path: "/doctor/profile" },
  ];

  /* 🔥 FIXED STAFF MENU (MATCHES FLUTTER EXACTLY) */
  const staffMenu: MenuItem[] = [
    { label: "Home", icon: LayoutDashboard, path: "/staff/dashboard" },
    { label: "Appointments", icon: CalendarDays, path: "/staff/appointments" },
    { label: "Emergency", icon: AlertTriangle, path: "/staff/emergency", danger: true },
    { label: "Profile", icon: User, path: "/staff/profile" },
  ];

  const relativeMenu: MenuItem[] = [
    { label: "Home", icon: LayoutDashboard, path: "/relative/dashboard" },
    { label: "Medications", icon: Pill, path: "/relative/medications" },
    { label: "Reports", icon: FileText, path: "/relative/reports" },
    { label: "Profile", icon: User, path: "/relative/profile" },
  ];

  const menuByRole: Record<string, MenuItem[]> = {
    patient: patientMenu,
    doctor: doctorMenu,
    staff: staffMenu,
    relative: relativeMenu,
  };

  const menu = menuByRole[role] || patientMenu;

  /* ================= ROLE COLORS ================= */

  const roleColors: any = {
    doctor: "text-teal-400",
    staff: "text-blue-400",
    relative: "text-purple-400",
    patient: "text-orange-400",
  };

  const activeColor = roleColors[role] || roleColors["patient"];

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  /* ================= UI ================= */

  return (
    <aside className="hidden lg:flex w-64 bg-[#0E1F31] border-r border-white/10 flex-col p-6">

      {/* ===== LOGO ===== */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-11 h-11 rounded-full bg-orange-500/20 flex items-center justify-center shadow-inner">
          <span className="font-bold text-lg text-orange-400">M</span>
        </div>

        <span className="text-lg font-semibold tracking-wide">
          MediConnect
        </span>
      </div>

      {/* ===== MENU ===== */}
      <nav className="flex-1 space-y-2">
        {menu.map((item, index) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;
          const isDanger = item.danger;

          const activeStyles = isDanger
            ? "bg-red-500/10 text-red-400"
            : `bg-white/10 ${activeColor}`;

          const inactiveStyles = isDanger
            ? "text-red-300 hover:bg-red-500/10 hover:text-red-400"
            : "text-gray-400 hover:bg-white/5 hover:text-white";

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
              ${isActive ? activeStyles : inactiveStyles}`}
            >
              <Icon
                size={20}
                className={`transition ${
                  isActive
                    ? isDanger
                      ? "text-red-400"
                      : activeColor
                    : "group-hover:text-white"
                }`}
              />

              <span className="text-sm font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* ===== LOGOUT ===== */}
      <div className="pt-6 border-t border-white/10 mt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl 
                     text-red-400 hover:bg-red-500/10 transition"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;