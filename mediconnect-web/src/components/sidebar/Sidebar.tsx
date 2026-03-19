"use client";

import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  AlertTriangle,
  Pill,
  FileText,
  Users,
  User,
  LogOut,
} from "lucide-react";

type MenuItem = {
  label: string;
  icon: any;
  path: string;
  isEmergency?: boolean;
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role") || "Patient";

  /* ================= MENUS ================= */

  const patientMenu: MenuItem[] = [
    { label: "Home", icon: LayoutDashboard, path: "/patient/dashboard" },
    { label: "Appointments", icon: CalendarDays, path: "/patient/appointments" },
    { label: "Emergency", icon: AlertTriangle, path: "/patient/emergency", isEmergency: true },
    { label: "Medicines", icon: Pill, path: "/patient/medicines" },
    { label: "Reports", icon: FileText, path: "/patient/reports" },
  ];

  const doctorMenu: MenuItem[] = [
    { label: "Home", icon: LayoutDashboard, path: "/doctor/dashboard" },
    { label: "Appointments", icon: CalendarDays, path: "/doctor/appointments" },
    { label: "Patients", icon: Users, path: "/doctor/patients" },
    { label: "Profile", icon: User, path: "/doctor/profile" },
  ];

  const menuByRole: Record<string, MenuItem[]> = {
    Patient: patientMenu,
    Doctor: doctorMenu,
  };

  const menu = menuByRole[role] || patientMenu;

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  return (
    <aside className="w-64 bg-[#0E1F31] border-r border-white/10 flex flex-col p-6">

      {/* LOGO */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <span
            className={`font-bold text-lg ${
              role === "Doctor" ? "text-teal-400" : "text-orange-400"
            }`}
          >
            {role === "Doctor" ? "D" : "M"}
          </span>
        </div>
        <span className="text-lg font-semibold">
          {role === "Doctor" ? "Doctor Panel" : "MediConnect"}
        </span>
      </div>

      {/* MENU */}
      <nav className="flex-1 space-y-2">
        {menu.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          const activeColor =
            role === "Doctor"
              ? "text-teal-400"
              : item.isEmergency
              ? "text-red-500"
              : "text-orange-400";

          const inactiveColor =
            item.isEmergency && role === "Patient"
              ? "text-red-400/70"
              : "text-gray-400";

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition
              ${
                isActive
                  ? `bg-white/10 ${activeColor}`
                  : `${inactiveColor} hover:bg-white/5`
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition mt-6"
      >
        <LogOut size={20} />
        <span className="text-sm">Logout</span>
      </button>

    </aside>
  );
};

export default Sidebar;