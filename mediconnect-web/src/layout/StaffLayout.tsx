"use client";

import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import {
  LayoutDashboard,
  CalendarDays,
  TriangleAlert,
  User,
} from "lucide-react";

const StaffLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* 🔥 MATCH FLUTTER EXACTLY */
  const menu = [
    { icon: LayoutDashboard, label: "Home", path: "/staff/dashboard" },
    { icon: CalendarDays, label: "Appointments", path: "/staff/appointments" },
    { icon: TriangleAlert, label: "Emergency", path: "/staff/emergency", danger: true },
    { icon: User, label: "Profile", path: "/staff/profile" },
  ];

  return (
    <div className="flex h-screen w-full bg-[#0C1B2A] text-white overflow-x-hidden">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 lg:pb-6 bg-gradient-to-br from-[#0C1B2A] via-[#0E1F31] to-[#16263A]">
        <Outlet />
      </main>

      {/* 🔥 MOBILE FLOATING NAV (FLUTTER STYLE) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 lg:hidden">

        <div className="w-[92%] h-[70px] bg-[#1E3148] rounded-[28px] border border-white/10 shadow-2xl flex items-center justify-around">

          {menu.map((item, index) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;

            const activeColor = item.danger
              ? "text-red-400"
              : "text-teal-400";

            const inactiveColor = item.danger
              ? "text-red-300"
              : "text-gray-400";

            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="flex-1 flex justify-center"
              >
                <div
                  className={`flex flex-col items-center px-2 py-1 rounded-xl transition ${
                    isActive ? "bg-white/10" : ""
                  }`}
                >
                  <Icon
                    size={22}
                    className={isActive ? activeColor : inactiveColor}
                  />

                  <span
                    className={`text-[10px] mt-1 ${
                      isActive ? activeColor : inactiveColor
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}

        </div>

      </div>

    </div>
  );
};

export default StaffLayout;