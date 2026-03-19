"use client";

import { useState } from "react";
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
  Menu,
  X,
} from "lucide-react";

type MenuItem = {
  label: string;
  icon: any;
  path: string;
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false); // 🔥 mobile toggle

  /* ================= ROLE FIX ================= */

  const rawRole = localStorage.getItem("role");
  let role = rawRole?.trim().toLowerCase() || "patient";

  if (role === "caregiver") role = "relative";

  /* ================= MENUS ================= */

  const patientMenu: MenuItem[] = [
    { label: "Home", icon: LayoutDashboard, path: "/patient/dashboard" },
    { label: "Appointments", icon: CalendarDays, path: "/patient/appointments" },
    { label: "Emergency", icon: AlertTriangle, path: "/patient/emergency" },
    { label: "Medicines", icon: Pill, path: "/patient/medicines" },
    { label: "Reports", icon: FileText, path: "/patient/reports" },
  ];

  const doctorMenu: MenuItem[] = [
    { label: "Home", icon: LayoutDashboard, path: "/doctor/dashboard" },
    { label: "Appointments", icon: CalendarDays, path: "/doctor/appointments" },
    { label: "Patients", icon: Users, path: "/doctor/patients" },
    { label: "Profile", icon: User, path: "/doctor/profile" },
  ];

  const staffMenu: MenuItem[] = [
    { label: "Home", icon: LayoutDashboard, path: "/staff/dashboard" },
    { label: "Appointments", icon: CalendarDays, path: "/staff/appointments" },
    { label: "Reports", icon: FileText, path: "/staff/reports" },
    { label: "Patients", icon: Users, path: "/staff/patients" },
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

  /* ================= COLORS ================= */

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

  /* ================= SIDEBAR UI ================= */

  const SidebarContent = (
    <div className="h-full flex flex-col p-6">

      {/* LOGO */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-11 h-11 rounded-full bg-orange-500/20 flex items-center justify-center">
          <span className="font-bold text-lg text-orange-400">M</span>
        </div>
        <span className="text-lg font-semibold tracking-wide">
          MediConnect
        </span>
      </div>

      {/* MENU */}
      <nav className="flex-1 space-y-2">
        {menu.map((item, index) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;

          return (
            <button
              key={index}
              onClick={() => {
                navigate(item.path);
                setIsOpen(false); // 🔥 auto close mobile
              }}
              className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
              ${
                isActive
                  ? `bg-white/10 ${activeColor}`
                  : `text-gray-400 hover:bg-white/5 hover:text-white`
              }`}
            >
              <Icon
                size={20}
                className={isActive ? activeColor : "group-hover:text-white"}
              />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="pt-6 border-t border-white/10 mt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* 🔥 MOBILE TOP BAR */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#0E1F31] border-b border-white/10">
        <button onClick={() => setIsOpen(true)}>
          <Menu className="text-white" />
        </button>

        <span className="font-semibold">MediConnect</span>
      </div>

      {/* 🔥 DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-64 bg-[#0E1F31] border-r border-white/10">
        {SidebarContent}
      </aside>

      {/* 🔥 MOBILE DRAWER */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <aside className="fixed top-0 left-0 w-64 h-full bg-[#0E1F31] z-50 border-r border-white/10 shadow-xl">
            <div className="flex justify-end p-4">
              <button onClick={() => setIsOpen(false)}>
                <X className="text-white" />
              </button>
            </div>

            {SidebarContent}
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;