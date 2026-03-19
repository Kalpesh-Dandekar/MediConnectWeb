"use client";

import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  Users,
  User,
} from "lucide-react";

const StaffLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { icon: LayoutDashboard, label: "Home", path: "/staff/dashboard" },
    { icon: CalendarDays, label: "Appointments", path: "/staff/appointments" },
    { icon: FileText, label: "Reports", path: "/staff/reports" },
    { icon: Users, label: "Patients", path: "/staff/patients" },
    { icon: User, label: "Profile", path: "/staff/profile" },
  ];

  return (
    <div className="flex h-screen w-full bg-[#0C1B2A] text-white overflow-x-hidden">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 lg:pb-6 bg-gradient-to-br from-[#0C1B2A] via-[#0E1F31] to-[#16263A]">
        <Outlet />
      </main>

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0E1F31] border-t border-white/10 flex justify-around items-center py-2 lg:hidden">

        {menu.map((item, index) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center text-[10px] transition ${
                isActive ? "text-blue-400" : "text-gray-400"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}

      </div>

    </div>
  );
};

export default StaffLayout;